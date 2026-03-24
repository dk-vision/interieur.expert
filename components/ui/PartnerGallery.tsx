"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  _key: string;
  caption?: string;
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
}

interface PartnerGalleryProps {
  images: GalleryImage[];
  partnerName: string;
}

export default function PartnerGallery({
  images,
  partnerName,
}: PartnerGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null ? (i - 1 + images.length) % images.length : null
      ),
    [images.length]
  );

  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null ? (i + 1) % images.length : null
      ),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  if (!images || images.length === 0) return null;

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      {/* Instagram-style grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5">
        {images.map((img, i) => (
          <button
            key={img._key}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={img.caption || `Foto ${i + 1} van ${partnerName}`}
          >
            <Image
              src={img.asset.url}
              alt={img.caption || `${partnerName} foto ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-text/0 group-hover:bg-text/10 transition-colors duration-200" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-text/90"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${activeIndex + 1} van ${images.length}`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 text-background/80 hover:text-background transition-colors"
            aria-label="Sluiten"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-background/60 hover:text-background transition-colors"
              aria-label="Vorige foto"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.asset.url}
              alt={active.caption || `${partnerName} foto ${activeIndex + 1}`}
              width={active.asset.metadata?.dimensions?.width || 1200}
              height={active.asset.metadata?.dimensions?.height || 800}
              className="object-contain max-h-[85vh] w-auto mx-auto"
              priority
            />
            {/* Caption + counter */}
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              {active.caption && (
                <p className="text-background/80 text-body mb-1">{active.caption}</p>
              )}
              <p className="text-background/50 text-meta">
                {activeIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-background/60 hover:text-background transition-colors"
              aria-label="Volgende foto"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
