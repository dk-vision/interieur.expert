import { Calendar, Clock } from "lucide-react";
import ContentTypeBadge from "./ContentTypeBadge";
import SponsoredBadge from "./SponsoredBadge";

interface MetaRowProps {
  publishedAt: string;
  readingTime?: number;
  type: "article" | "video" | "dossier";
  isSponsored?: boolean;
}

export default function MetaRow({
  publishedAt,
  readingTime,
  type,
  isSponsored = false,
}: MetaRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-meta text-text/60">
      <ContentTypeBadge type={type} size="sm" />
      
      {isSponsored && <SponsoredBadge size="sm" showIcon={true} />}
      
      <div className="flex items-center gap-1.5">
        <Calendar size={14} />
        <time dateTime={publishedAt}>{publishedAt}</time>
      </div>

      {readingTime && (
        <>
          <span className="text-text/30">·</span>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{readingTime} min</span>
          </div>
        </>
      )}
    </div>
  );
}
