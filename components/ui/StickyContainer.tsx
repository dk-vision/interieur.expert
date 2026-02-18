import { ReactNode } from "react";

interface StickyContainerProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export default function StickyContainer({
  children,
  offset = 32,
  className = "",
}: StickyContainerProps) {
  return (
    <div
      className={`self-start ${className}`}
      style={{ position: "sticky", top: offset }}
    >
      {children}
    </div>
  );
}
