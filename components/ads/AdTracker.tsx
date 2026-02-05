"use client";

import { useEffect, useRef } from "react";

interface AdTrackerProps {
  campaignId: string;
  children: React.ReactNode;
}

export default function AdTracker({ campaignId, children }: AdTrackerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!adRef.current || trackedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Ad is 50%+ visible, start 1-second timer
            if (!timerRef.current && !trackedRef.current) {
              timerRef.current = setTimeout(() => {
                // Track impression after 1 second
                fetch("/api/track/impression", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ campaignId }),
                }).catch((err) => console.error("Failed to track impression:", err));
                
                trackedRef.current = true;
              }, 1000);
            }
          } else {
            // Ad is no longer 50%+ visible, cancel timer
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(adRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      observer.disconnect();
    };
  }, [campaignId]);

  const handleClick = () => {
    // Track click
    fetch("/api/track/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId }),
    }).catch((err) => console.error("Failed to track click:", err));
  };

  return (
    <div ref={adRef} onClick={handleClick}>
      {children}
    </div>
  );
}
