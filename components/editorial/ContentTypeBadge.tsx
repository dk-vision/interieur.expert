import Pill from "@/components/ui/Pill";
import { FileText, PlayCircle, Layers } from "lucide-react";

interface ContentTypeBadgeProps {
  type: "article" | "video" | "dossier";
  size?: "sm" | "md";
}

export default function ContentTypeBadge({ type, size = "md" }: ContentTypeBadgeProps) {
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
    <Pill variant="default" size={size}>
      <Icon size={size === "sm" ? 12 : 14} className="mr-1" />
      {label}
    </Pill>
  );
}
