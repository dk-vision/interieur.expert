"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface Story {
  _key: string;
  caption?: string;
  link?: string;
  linkLabel?: string;
  publishedAt?: string;
  image: {
    asset: {
      _id?: string;
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
      };
    };
  };
  video?: {
    asset: {
      _id?: string;
      url: string;
      mimeType?: string;
    };
  };
}

interface StoryViewerProps {
  stories: Story[];
  partnerName: string;
  partnerLogo?: string;
  brandColor?: string;
  initialIndex?: number;
  onClose: () => void;
  onStoryView?: (index: number) => void;
}

const STORY_DURATION = 5000; // 5 seconds per image story

export default function StoryViewer({
  stories,
  partnerName,
  partnerLogo,
  brandColor,
  initialIndex = 0,
  onClose,
  onStoryView,
}: StoryViewerProps) {
  const [index, setIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const elapsedRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoDurationRef = useRef<number>(0);

  const story = stories[index];
  const isVideo = !!story.video?.asset?.url;

  const goNext = useCallback(() => {
    if (index < stories.length - 1) {
      setIndex((i) => i + 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      onClose();
    }
  }, [index, stories.length, onClose]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setProgress(0);
      elapsedRef.current = 0;
    }
  }, [index]);

  // Progress timer — for image stories, use fixed duration; for video, track video time
  useEffect(() => {
    if (paused) return;

    if (isVideo) {
      // Video progress is driven by the <video> onTimeUpdate; just handle pause/play
      const vid = videoRef.current;
      if (vid) {
        vid.play().catch(() => {});
      }
      return;
    }

    // Image story — fixed timer
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed =
        elapsedRef.current + (Date.now() - startTimeRef.current);
      const pct = Math.min(elapsed / STORY_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        goNext();
      }
    }, 30);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      elapsedRef.current += Date.now() - startTimeRef.current;
    };
  }, [index, paused, goNext, isVideo]);

  // Reset elapsed when index changes
  useEffect(() => {
    elapsedRef.current = 0;
    videoDurationRef.current = 0;
    onStoryView?.(index);
  }, [index, onStoryView]);

  // Handle video pause/play
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    if (paused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [paused, isVideo]);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  // Tap zones: left 30% = prev, right 70% = next
  function handleTap(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) {
      goPrev();
    } else {
      goNext();
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      {/* Story container — IG Stories 9:16 ratio */}
      <div
        className="relative aspect-[9/16] h-full max-h-[100dvh] sm:max-h-[90vh] mx-auto bg-black overflow-hidden sm:rounded-xl"
        style={{ maxWidth: "min(100vw, calc(90vh * 9 / 16))" }}
        onClick={handleTap}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 px-3 pt-3">
          {stories.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width:
                    i < index
                      ? "100%"
                      : i === index
                        ? `${progress * 100}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-5 left-0 right-0 z-30 flex items-center justify-between px-3 pt-2">
          <div className="flex items-center gap-2.5">
            {partnerLogo && (
              <div
                className="w-8 h-8 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: brandColor || "white" }}
              >
                <Image
                  src={partnerLogo}
                  alt={partnerName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="text-white text-sm font-semibold drop-shadow">
              {partnerName}
            </span>
            {story.publishedAt && (
              <span className="text-white/60 text-xs">
                {timeAgo(story.publishedAt)}
              </span>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 text-white/80 hover:text-white"
            aria-label="Sluiten"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Media — Video or Image */}
        {isVideo ? (
          <video
            ref={videoRef}
            key={story._key}
            src={story.video!.asset.url}
            poster={story.image.asset.url}
            autoPlay
            playsInline
            muted={false}
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={(e) => {
              videoDurationRef.current = e.currentTarget.duration;
            }}
            onTimeUpdate={(e) => {
              const vid = e.currentTarget;
              if (vid.duration) {
                setProgress(vid.currentTime / vid.duration);
              }
            }}
            onEnded={goNext}
          />
        ) : (
          <Image
            src={story.image.asset.url}
            alt={story.caption || `${partnerName} story`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 50vh"
          />
        )}

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-20" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5 pb-8">
          {story.caption && (
            <p className="text-white text-body font-medium drop-shadow-lg mb-3">
              {story.caption}
            </p>
          )}
          {story.link && (
            <a
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              {story.linkLabel || "Meer bekijken"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Outside click to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "zojuist";
  if (hours < 24) return `${hours}u`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}
