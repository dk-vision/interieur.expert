import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import type { Campaign } from "./types";

const activeCampaignsQuery = groq`
  *[_type == "adCampaign" 
    && active == true
    && startDate <= now()
    && endDate >= now()
    && slot == $slot
    && (
      !defined(maxImpressions) 
      || !defined(currentImpressions) 
      || currentImpressions < maxImpressions
    )
  ] | order(priority desc) {
    _id,
    title,
    slot,
    priority,
    targetCategory,
    targetTags,
    currentImpressions,
    maxImpressions,
    "creative": creative->{
      title,
      format,
      linkUrl,
      altText,
      image,
      imageMobile,
      imageTablet,
      imageDesktop,
      html
    }
  }
`;

/**
 * Fraction of impressions reserved for house ads ("Jouw advertentie hier").
 * 0.35 = 35% house ad, 65% client campaign.
 */
const HOUSE_AD_RATIO = 0.35;

export async function getActiveCampaign(
  slot: string,
  _category?: string,
  _tags?: string[]
): Promise<Campaign | null> {
  try {
    const campaigns = await sanityFetch<Campaign[]>({
      query: activeCampaignsQuery,
      params: { slot },
    });

    if (!campaigns?.length) return null;

    // Mix in house ads at the configured ratio.
    if (Math.random() < HOUSE_AD_RATIO) return null;

    // Pick randomly from all active campaigns for this slot.
    return campaigns[Math.floor(Math.random() * campaigns.length)];
  } catch (err) {
    console.error("Failed to fetch ad campaign:", err);
    return null;
  }
}
