import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  spacing?: "sm" | "md" | "lg";
  background?: "default" | "accent";
  className?: string;
}

export default function Section({
  children,
  spacing = "md",
  background = "default",
  className = "",
}: SectionProps) {
  const spacingClasses = {
    sm: "py-10",
    md: "py-16",
    lg: "py-16",
  };

  const backgroundClasses = {
    default: "bg-background",
    accent: "bg-accent/5",
  };

  return (
    <section
      className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
