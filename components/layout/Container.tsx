import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "content" | "layout";
  className?: string;
}

export default function Container({
  children,
  size = "layout",
  className = "",
}: ContainerProps) {
  const maxWidth = size === "content" ? "max-w-content" : "max-w-layout";

  return (
    <div className={`${maxWidth} mx-auto px-6 ${className}`}>{children}</div>
  );
}
