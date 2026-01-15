import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export default function Icon({ icon: LucideIcon, size = 16, className = "" }: IconProps) {
  return <LucideIcon size={size} className={className} />;
}
