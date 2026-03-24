"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import StoryViewer, { type Story } from "./StoryViewer";

interface PartnerStoriesProps {
  stories: Story[];
  partnerName: string;
  partnerLogo?: string;
  brandColor?: string;
}

function getSeenStories(): Set<string> {
  try {
    const raw = localStorage.getItem("seen-stories");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function markStorySeen(key: string) {
  try {
    const seen = getSeenStories();
    seen.add(key);
    localStorage.setItem("seen-stories", JSON.stringify([...seen]));
  } catch {
    // silent
  }
}

export default function PartnerStories({
  stories,
  partnerName,
  partnerLogo,
  brandColor,
}: PartnerStoriesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [seenKeys, setSeenKeys] = useState<string[]>([]);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Read localStorage once mounted
  const refreshSeen = useCallback(() => {
    if (mounted) setSeenKeys([...getSeenStories()]);
  }, [mounted]);

  // Initial load on mount
  if (mounted && seenKeys.length === 0) {
    const initial = getSeenStories();
    if (initial.size > 0) setSeenKeys([...initial]);
  }

  const handleOpen = useCallback((i: number) => {
    markStorySeen(stories[i].image.asset.url);
    refreshSeen();
    setActiveIndex(i);
  }, [stories, refreshSeen]);

  const handleStoryView = useCallback((i: number) => {
    markStorySeen(stories[i].image.asset.url);
    refreshSeen();
  }, [stories, refreshSeen]);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  if (!stories || stories.length === 0) return null;

  const seenSet = new Set(seenKeys);

  // Sort: unseen first, seen last (preserve original order within each group)
  const indexed = stories.map((story, i) => ({ story, originalIndex: i }));
  const sorted = mounted
    ? [
        ...indexed.filter((s) => !seenSet.has(s.story.image.asset.url)),
        ...indexed.filter((s) => seenSet.has(s.story.image.asset.url)),
      ]
    : indexed;

  return (
    <>
      <div className="flex justify-center gap-4 overflow-x-auto py-2 px-4 sm:px-0 scrollbar-hide">
        {sorted.map(({ story, originalIndex }) => {
          const isSeen = mounted && seenSet.has(story.image.asset.url);
          return (
            <button
              key={`${story._key}-${originalIndex}`}
              type="button"
              onClick={() => handleOpen(originalIndex)}
              className="flex-shrink-0 group p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label={story.caption || `Story ${originalIndex + 1}`}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] transition-transform group-hover:scale-110"
                style={{
                  background: isSeen
                    ? "rgba(0,0,0,0.12)"
                    : "linear-gradient(135deg, #0000ff 0%, #2222ff 50%, #4444ff 100%)",
                }}
              >
                <div className="w-full h-full rounded-full bg-background p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src={story.image.asset.url}
                      alt={story.caption || `Story ${originalIndex + 1}`}
                      width={72}
                      height={72}
                      className="w-full h-full object-cover"
                    />
                    {story.video?.asset?.url && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg opacity-80">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <StoryViewer
          stories={stories}
          partnerName={partnerName}
          partnerLogo={partnerLogo}
          brandColor={brandColor}
          initialIndex={activeIndex}
          onClose={handleClose}
          onStoryView={handleStoryView}
        />
      )}
    </>
  );
}
