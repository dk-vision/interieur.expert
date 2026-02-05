import AdLabel from "@/components/ui/AdLabel";
import AdTracker from "@/components/ads/AdTracker";
import { FallbackAd } from "@/components/ads/FallbackAd";
import { getActiveCampaign } from "@/lib/ads/campaigns";
import { urlForImage } from "@/lib/sanity/image";

interface AdSlotProps {
  position:
    | "homepage-hero"
    | "homepage-newsletter"
    | "homepage-card"
    | "listing-sidebar"
    | "article-inline"
    | "article-sidebar";
  className?: string;
  category?: string;
  tags?: string[];
}

export default async function AdSlot({
  position,
  className = "",
  category,
  tags,
}: AdSlotProps) {
  const positionClasses = {
    "homepage-hero": "w-full",
    "homepage-newsletter": "w-full",
    "homepage-card": "w-full",
    "listing-sidebar": "hidden lg:block w-full lg:sticky lg:top-24",
    "article-inline": "w-full max-w-content mx-auto my-8",
    "article-sidebar": "hidden lg:block w-full lg:sticky lg:top-24",
  };

  const fallbackType = {
    "homepage-hero": "horizontal" as const,
    "homepage-newsletter": "horizontal" as const,
    "homepage-card": "card" as const,
    "listing-sidebar": "vertical" as const,
    "article-inline": "horizontal" as const,
    "article-sidebar": "vertical" as const,
  };

  // Fetch active campaign for this slot
  const campaign = await getActiveCampaign(position, category, tags);

  return (
    <div
      className={`${positionClasses[position]} ${className}`}
      aria-label="Advertisement"
    >
      <div className="space-y-3">
        <AdLabel />

        {campaign ? (
          <AdTracker campaignId={campaign._id}>
            <a
              href={campaign.creative.linkUrl}
              target="_blank"
              rel="noopener sponsored"
              className="block bg-background border-2 border-brand/20 rounded-sm overflow-hidden hover:border-brand/40 transition-colors cursor-pointer group"
            >
              {campaign.creative.format === "image" &&
              campaign.creative.image?.asset ? (
                <div className="relative w-full overflow-hidden">
                  <img
                    src={urlForImage(campaign.creative.image).url()}
                    alt={campaign.creative.altText || campaign.creative.title}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : campaign.creative.format === "html" &&
                campaign.creative.html ? (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: campaign.creative.html }}
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-background border border-brand/10 flex items-center justify-center">
                  <p className="text-text/40 text-sm">{campaign.creative.title}</p>
                </div>
              )}
            </a>
          </AdTracker>
        ) : (
          <FallbackAd slot={fallbackType[position]} />
        )}
      </div>
    </div>
  );
}
