"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PlayIcon from "@/components/ui/PlayIcon";

interface VideoThumbnailProps {
  href: string;
  title: string;
  thumbnail: string;
  previewVideo?: string;
  duration?: number;
  publishedAt: string;
  size?: "featured" | "grid";
  excerpt?: string;
}

export default function VideoThumbnail({
  href,
  title,
  thumbnail,
  previewVideo,
  duration,
  publishedAt,
  size = "grid",
  excerpt,
}: VideoThumbnailProps) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isFeatured = size === "featured";

  useEffect(() => {
    if (isHovering && previewVideo) {
      // Delay before showing preview to avoid accidental triggers
      hoverTimeoutRef.current = setTimeout(() => {
        setShowPreview(true);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            // Autoplay might be blocked, ignore
          });
        }
      }, 500); // 500ms delay
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setShowPreview(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovering, previewVideo]);

  return (
    <div
      onClick={() => router.push(href)}
      className="group block cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={isFeatured ? "space-y-3" : "space-y-3"}>
        <div className="aspect-video bg-text/5 rounded-sm overflow-hidden relative">
          {/* Static thumbnail */}
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              showPreview ? "opacity-0" : "opacity-100 group-hover:scale-110 group-hover:brightness-75"
            }`}
          />

          {/* Preview video (only rendered if exists) */}
          {previewVideo && (
            <video
              ref={videoRef}
              src={previewVideo}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                showPreview ? "opacity-100" : "opacity-0"
              }`}
              muted
              loop
              playsInline
              preload="none" // Don't preload to save bandwidth
            />
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
              <PlayIcon size={isFeatured ? "lg" : "md"} className="text-white group-hover:text-[#0000FF] drop-shadow-2xl transition-colors duration-300" />
            </div>
          </div>

          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {duration} min
            </div>
          )}
        </div>

        {/* Title and metadata */}
        {isFeatured ? (
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-text leading-tight group-hover:text-accent transition-colors">
              {title}
            </h3>
            {excerpt && <p className="text-text/70 line-clamp-2">{excerpt}</p>}
            <p className="text-sm text-text/50">{publishedAt}</p>
          </div>
        ) : (
          <div className="space-y-1">
            <h3 className="font-semibold text-text leading-snug group-hover:text-accent transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-text/50">{publishedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
