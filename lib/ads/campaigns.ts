import { groq } from "next-sanity";
import { client } from "@/lib/sanity/client";
import { unstable_noStore as noStore } from "next/cache";
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
  ] {
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

export async function getActiveCampaign(
  slot: string,
  category?: string,
  tags?: string[]
): Promise<Campaign | null> {
  noStore(); // Opt out of caching for ad selection
  
  try {
    const campaigns = await client.fetch<Campaign[]>(
      activeCampaignsQuery,
      { slot },
      { next: { revalidate: 0 } }
    );

    if (!campaigns || campaigns.length === 0) {
      return null;
    }

    // Filter by category and tags if provided
    const eligibleCampaigns = campaigns.filter((campaign) => {
      // If campaign has targetCategory, check if it matches
      if (campaign.targetCategory && category) {
        if (campaign.targetCategory !== category) return false;
      }

      // If campaign has targetTags, check if any match
      if (campaign.targetTags && campaign.targetTags.length > 0 && tags) {
        const hasMatchingTag = campaign.targetTags.some((tag) =>
          tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });

    if (eligibleCampaigns.length === 0) {
      return null;
    }

    // Weighted random selection based on priority
    const totalWeight = eligibleCampaigns.reduce(
      (sum, campaign) => sum + campaign.priority,
      0
    );

    let random = Math.random() * totalWeight;

    for (const campaign of eligibleCampaigns) {
      random -= campaign.priority;
      if (random <= 0) {
        return campaign;
      }
    }

    // Fallback to first campaign
    return eligibleCampaigns[0];
  } catch (error) {
    console.error("Error fetching ad campaign:", error);
    return null;
  }
}
