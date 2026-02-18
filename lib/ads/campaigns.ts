import { groq } from "next-sanity";
import type { Campaign } from "./types";

// Preserved for when live advertisers are onboarded.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _activeCampaignsQuery = groq`
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
  _slot: string,
  _category?: string,
  _tags?: string[]
): Promise<Campaign | null> {
  // All ad slots currently show "Jouw advertentie hier" fallback banners.
  // Re-enable by restoring the Sanity query when going live with advertisers.
  return null;
}
