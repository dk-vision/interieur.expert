"use client";

import { useState, useEffect } from "react";
import AdLabel from "@/components/ui/AdLabel";
import AdTracker from "@/components/ads/AdTracker";
import { FallbackAd } from "@/components/ads/FallbackAd";
import { urlForImage } from "@/lib/sanity/image";
import type { Campaign } from "@/lib/ads/types";

interface AdSlotClientProps {
  position:
    | "homepage-hero"
    | "homepage-newsletter"
    | "homepage-card"
    | "listing-sidebar"
    | "article-inline"
    | "article-sidebar";
  className?: string;
  campaign: Campaign | null;
}

export default function AdSlotClient({
  position,
  className = "",
  campaign,
}: AdSlotClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const positionClasses = {
    "homepage-hero": "w-full flex justify-center",
    "homepage-newsletter": "w-full flex justify-center",
    "homepage-card": "w-full flex justify-center",
    "listing-sidebar": "hidden lg:block w-full flex justify-center",
    "article-inline": "w-full flex justify-center my-8",
    "article-sidebar": "hidden lg:block w-full flex justify-center",
  };

  // Fixed IAB slot boxes (scaled down if container is narrower).
  // The label above the creative is outside these dimensions.
  const slotBoxClasses = {
    // Large Mobile Banner / Leaderboard / Billboard
    "homepage-hero":
      "w-[min(100%,320px)] h-[100px] sm:w-[min(100%,728px)] sm:h-[90px] lg:w-[min(100%,970px)] lg:h-[250px]",

    // Large Mobile Banner / Leaderboard
    "homepage-newsletter":
      "w-[min(100%,320px)] h-[100px] sm:w-[min(100%,728px)] sm:h-[90px] lg:w-[min(100%,970px)] lg:h-[90px]",

    // Medium Rectangle
    "homepage-card": "w-[min(100%,300px)] h-[250px]",

    // Half Page
    "listing-sidebar": "w-[min(100%,300px)] h-[600px]",

    // Large Mobile Banner / Leaderboard
    "article-inline":
      "w-[min(100%,320px)] h-[100px] sm:w-[min(100%,728px)] sm:h-[90px]",

    // Half Page
    "article-sidebar": "w-[min(100%,300px)] h-[600px]",
  };

  const fallbackType = {
    "homepage-hero": "horizontal" as const,
    "homepage-newsletter": "horizontal" as const,
    "homepage-card": "card" as const,
    "listing-sidebar": "vertical" as const,
    "article-inline": "horizontal" as const,
    "article-sidebar": "vertical" as const,
  };

  const imageDimensionsByPosition = {
    "homepage-hero": {
      mobile: { w: 320, h: 100 },
      tablet: { w: 728, h: 90 },
      desktop: { w: 970, h: 250 },
    },
    "homepage-newsletter": {
      mobile: { w: 320, h: 100 },
      tablet: { w: 728, h: 90 },
      desktop: { w: 970, h: 90 },
    },
    "homepage-card": {
      single: { w: 300, h: 250 },
    },
    "listing-sidebar": {
      single: { w: 300, h: 600 },
    },
    "article-inline": {
      mobile: { w: 320, h: 100 },
      tablet: { w: 728, h: 90 },
      desktop: { w: 728, h: 90 },
    },
    "article-sidebar": {
      single: { w: 300, h: 600 },
    },
  } as const;

  function getImageUrl(
    image: NonNullable<Campaign["creative"]["image"]>,
    dims: { w: number; h: number }
  ) {
    return urlForImage(image).width(dims.w).height(dims.h).fit("max").url();
  }

  return (
    <div
      className={`${positionClasses[position]} ${className}`}
      aria-label="Advertisement"
    >
      <div className="space-y-3">
        <AdLabel />

        <div className={`${slotBoxClasses[position]}`}>

          {campaign ? (
            <AdTracker campaignId={campaign._id}>
              <a
                href={campaign.creative.linkUrl}
                target="_blank"
                rel="noopener sponsored"
                className="block w-full h-full bg-background border-2 border-brand/20 rounded-sm overflow-hidden hover:border-brand/40 transition-colors cursor-pointer group"
              >
                {campaign.creative.format === "image" &&
                  (campaign.creative.image?.asset ||
                    campaign.creative.imageMobile?.asset ||
                    campaign.creative.imageTablet?.asset ||
                    campaign.creative.imageDesktop?.asset) ? (
                  <div className="relative w-full h-full">
                      {(() => {
                        const dims = imageDimensionsByPosition[position];
                        const alt =
                          campaign.creative.altText || campaign.creative.title;

                        // Prefer breakpoint-specific images when available.
                        const desktopImg = campaign.creative.imageDesktop;
                        const tabletImg = campaign.creative.imageTablet;
                        const mobileImg = campaign.creative.imageMobile;
                        const singleImg = campaign.creative.image;

                        if ("single" in dims) {
                          const img = singleImg || desktopImg || tabletImg || mobileImg;
                          if (!img) return null;
                          return (
                            <img
                              src={getImageUrl(img, dims.single)}
                              alt={alt}
                              className="w-full h-full object-contain"
                            />
                          );
                        }

                        const fallback = mobileImg || tabletImg || desktopImg || singleImg;
                        if (!fallback) return null;

                        return (
                          <picture>
                            {desktopImg ? (
                              <source
                                media="(min-width: 1024px)"
                                srcSet={getImageUrl(desktopImg, dims.desktop)}
                              />
                            ) : null}
                            {tabletImg ? (
                              <source
                                media="(min-width: 640px)"
                                srcSet={getImageUrl(tabletImg, dims.tablet)}
                              />
                            ) : null}
                            {mobileImg ? (
                              <source
                                media="(max-width: 639px)"
                                srcSet={getImageUrl(mobileImg, dims.mobile)}
                              />
                            ) : null}
                            <img
                              src={
                                // Reasonable default: tablet (common) then desktop then mobile.
                                getImageUrl(
                                  tabletImg || desktopImg || mobileImg || fallback,
                                  dims.tablet
                                )
                              }
                              alt={alt}
                              className="w-full h-full object-contain"
                            />
                          </picture>
                        );
                      })()}
                  </div>
                ) : campaign.creative.format === "html" &&
                  campaign.creative.html ? (
                  isClient ? (
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: campaign.creative.html }}
                    />
                  ) : (
                    <div className="w-full h-full bg-background border border-brand/10 flex items-center justify-center">
                      <p className="text-text/40 text-sm">Loading...</p>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-background border border-brand/10 flex items-center justify-center">
                    <p className="text-text/40 text-sm">{campaign.creative.title}</p>
                  </div>
                )}
              </a>
            </AdTracker>
          ) : (
            <FallbackAd slot={fallbackType[position]} className="h-full" />
          )}
        </div>
      </div>
    </div>
  );
}
