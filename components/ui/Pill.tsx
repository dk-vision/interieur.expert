import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "accent";
  size?: "sm" | "md";
  className?: string;
}

export default function Pill({
  children,
  variant = "default",
  size = "md",
  className = "",
}: PillProps) {
  const variantClasses = {
    default: "bg-text/10 text-text",
    subtle: "bg-white/95 text-accent backdrop-blur-sm shadow-sm font-heading group-hover:bg-accent group-hover:text-white transition-colors",
    accent: "bg-accent/10 text-accent",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
