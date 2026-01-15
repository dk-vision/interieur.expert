import SponsoredBadge from "./SponsoredBadge";

interface ArticleMetaProps {
  date: string;
  readTime: string;
  isSponsored?: boolean;
}

export default function ArticleMeta({
  date,
  readTime,
  isSponsored = false,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 text-sm text-text/60">
        <time dateTime={date}>{date}</time>
        <span>·</span>
        <span>{readTime}</span>
      </div>
      {isSponsored && <SponsoredBadge />}
    </div>
  );
}
