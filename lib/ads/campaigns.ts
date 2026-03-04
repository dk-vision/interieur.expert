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
    return campaigns?.[0] ?? null;
  } catch (err) {
    console.error("Failed to fetch ad campaign:", err);
    return null;
  }
}
