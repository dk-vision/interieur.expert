import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import ContentTypeBadge from "./ContentTypeBadge";
import SponsoredBadge from "./SponsoredBadge";

interface MetaRowProps {
  publishedAt: string;
  readingTime?: number;
  type: "article" | "video" | "dossier";
  isSponsored?: boolean;
  tone?: "default" | "inverse";
  centered?: boolean;
  authorName?: string;
  authorHref?: string;
}

export default function MetaRow({
  publishedAt,
  readingTime,
  type,
  isSponsored = false,
  tone = "default",
  centered = false,
  authorName,
  authorHref,
}: MetaRowProps) {
  const isInverse = tone === "inverse";
  const dividerClass = isInverse ? "text-white/45" : "text-text/30";

  return (
    <div className={`flex flex-wrap items-center gap-3 text-meta ${centered ? "justify-center" : ""} ${isInverse ? "text-white/88" : "text-text/60"}`}>
      <ContentTypeBadge type={type} size="sm" tone={tone} />
      
      {isSponsored && <SponsoredBadge size="sm" showIcon={true} tone={tone} />}
      
      <div className="flex items-center gap-1.5">
        <Calendar size={14} />
        <time dateTime={publishedAt}>{publishedAt}</time>
      </div>

      {readingTime && (
        <>
          <span className={dividerClass}>·</span>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{readingTime} min</span>
          </div>
        </>
      )}

      {authorName && (
        <>
          <span className={dividerClass}>·</span>
          <div className="flex items-center gap-1.5">
            <User size={14} />
            {authorHref ? (
              <Link href={authorHref} className={`transition-colors hover:${isInverse ? "text-white" : "text-text"}`}>
                {authorName}
              </Link>
            ) : (
              <span>{authorName}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
