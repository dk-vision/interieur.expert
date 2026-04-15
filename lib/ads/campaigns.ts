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
 * Virtual priority for the house ad ("Jouw advertentie hier").
 * Competes with real campaigns in weighted selection: 1 = lowest, 10 = highest.
 */
const HOUSE_AD_PRIORITY = 1;

/**
 * Weighted random pick: each campaign's priority is its relative weight.
 * The house ad participates with HOUSE_AD_PRIORITY so it naturally
 * appears less when surrounded by higher-priority campaigns.
 */
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

    // Build a weight pool: real campaigns + house ad.
    const totalWeight =
      campaigns.reduce((sum, c) => sum + (c.priority ?? 5), 0) +
      HOUSE_AD_PRIORITY;

    let roll = Math.random() * totalWeight;

    for (const campaign of campaigns) {
      roll -= campaign.priority ?? 5;
      if (roll <= 0) return campaign;
    }

    // Remaining weight belongs to the house ad → return null (fallback).
    return null;
  } catch (err) {
    console.error("Failed to fetch ad campaign:", err);
    return null;
  }
}
