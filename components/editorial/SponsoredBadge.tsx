import { Megaphone } from "lucide-react";

interface SponsoredBadgeProps {
  size?: "sm" | "md";
  showIcon?: boolean;
}

export default function SponsoredBadge({
  size = "md",
  showIcon = true,
}: SponsoredBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-brand/10 text-brand border border-brand/20 ${sizeClasses[size]}`}
    >
      {showIcon && <Megaphone size={iconSize} />}
      Gesponsord
    </span>
  );
}
