import AdLabel from "@/components/ui/AdLabel";
import { getActiveCampaign } from "@/lib/ads/campaigns";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";

interface AdSlotProps {
  position: "listing-inline" | "article-inline" | "sidebar" | "dossier-banner";
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
    "listing-inline": "w-full",
    "article-inline": "w-full max-w-content mx-auto",
    sidebar: "hidden lg:block w-full",
    "dossier-banner": "w-full",
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
          <a
            href={campaign.creative.linkUrl}
            target="_blank"
            rel="noopener sponsored"
            className="block bg-background border-2 border-brand/20 rounded-sm overflow-hidden hover:border-brand/40 transition-colors cursor-pointer group"
          >
            {campaign.creative.format === "image" &&
            campaign.creative.image?.asset ? (
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={urlForImage(campaign.creative.image)
                    .width(600)
                    .height(338)
                    .url()}
                  alt={campaign.creative.altText || campaign.creative.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
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
        ) : (
          <div className="block bg-background border-2 border-brand/20 rounded-sm p-8 min-h-[250px] flex items-center justify-center">
            <p className="text-text/30 text-sm font-medium">
              Advertentieruimte
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
