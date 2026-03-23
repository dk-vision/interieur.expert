import Pill from "@/components/ui/Pill";
import { FileText, PlayCircle, Layers } from "lucide-react";

interface ContentTypeBadgeProps {
  type: "article" | "video" | "dossier";
  size?: "sm" | "md";
  tone?: "default" | "inverse";
}

export default function ContentTypeBadge({
  type,
  size = "md",
  tone = "default",
}: ContentTypeBadgeProps) {
  const config = {
    article: {
      label: "Artikel",
      icon: FileText,
    },
    video: {
      label: "Video",
      icon: PlayCircle,
    },
    dossier: {
      label: "Dossier",
      icon: Layers,
    },
  };

  const { label, icon: Icon } = config[type];

  return (
    <Pill
      variant="default"
      size={size}
      className={tone === "inverse" ? "bg-white/12 text-white border border-white/15 backdrop-blur-sm" : ""}
    >
      <Icon size={size === "sm" ? 12 : 14} className="mr-1" />
      {label}
    </Pill>
  );
}
