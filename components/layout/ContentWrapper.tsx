import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function ContentWrapper({
  children,
  className = "",
}: ContentWrapperProps) {
  return (
    <div className={`max-w-content mx-auto ${className}`}>{children}</div>
  );
}
