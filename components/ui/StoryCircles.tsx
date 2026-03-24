"use client";

import { useState } from "react";
import Image from "next/image";
import StoryViewer, { type Story } from "./StoryViewer";

interface PartnerWithStories {
  _id: string;
  name: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  brandColor?: string;
  storyCount: number;
  latestStory?: {
    _key: string;
    image: { asset: { url: string } };
  };
}

interface StoryCirclesProps {
  partners: PartnerWithStories[];
  /** Full story data per partner, keyed by partner _id */
  storiesByPartner: Record<
    string,
    { name: string; logo?: string; brandColor?: string; stories: Story[] }
  >;
}

export default function StoryCircles({
  partners,
  storiesByPartner,
}: StoryCirclesProps) {
  const [activePartner, setActivePartner] = useState<string | null>(null);

  if (!partners || partners.length === 0) return null;

  const activeData = activePartner
    ? storiesByPartner[activePartner]
    : null;

  return (
    <>
      {/* Scrollable story thumbnails */}
      <div className="flex justify-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {partners.map((partner) => {
          const logoUrl = partner.latestStory?.image?.asset?.url;
          return (
            <button
              key={partner._id}
              type="button"
              onClick={() => setActivePartner(partner._id)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
              aria-label={`Stories van ${partner.name} bekijken`}
            >
              {/* Rounded square with blue border */}
              <div
                className="w-24 h-24 rounded-xl p-[2.5px] transition-transform group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0000ff, #4444ff)",
                }}
              >
                <div className="w-full h-full rounded-[10px] bg-background p-[2px]">
                  <div className="w-full h-full rounded-[9px] overflow-hidden bg-surface">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={partner.name}
                        width={88}
                        height={88}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text/40 text-sm font-bold">
                        {partner.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Name */}
              <span className="text-xs text-text/70 max-w-24 truncate text-center">
                {partner.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Story viewer */}
      {activeData && activePartner && (
        <StoryViewer
          stories={activeData.stories}
          partnerName={activeData.name}
          partnerLogo={activeData.logo}
          brandColor={activeData.brandColor}
          onClose={() => setActivePartner(null)}
        />
      )}
    </>
  );
}
