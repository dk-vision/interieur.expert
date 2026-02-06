import AdSlotClient from "@/components/ads/AdSlotClient";
import { getActiveCampaign } from "@/lib/ads/campaigns";

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
  // Fetch active campaign for this slot
  const campaign = await getActiveCampaign(position, category, tags);

  return <AdSlotClient position={position} className={className} campaign={campaign} />;
}
