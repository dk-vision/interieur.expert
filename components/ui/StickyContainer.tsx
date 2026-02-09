"use client";

import { useEffect, useRef, useState } from "react";

interface StickyContainerProps {
  children: React.ReactNode;
  offset?: number;
}

export default function StickyContainer({ children, offset = 32 }: StickyContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [width, setWidth] = useState<number>(0);
  const [top, setTop] = useState<number>(offset);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !placeholderRef.current) return;

      const placeholder = placeholderRef.current.getBoundingClientRect();
      const footer = document.querySelector('footer');
      
      // Check if we should become sticky
      const shouldBeSticky = placeholder.top <= offset;
      
      if (shouldBeSticky && footer) {
        // Check if we're approaching the footer
        const footerRect = footer.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const stopPoint = footerRect.top - containerHeight - 32; // 32px gap before footer
        
        if (stopPoint < offset) {
          // We're near the footer, adjust position to stop before it
          setTop(Math.max(stopPoint, placeholder.top));
          setIsSticky(placeholder.top < 0);
        } else {
          // Normal sticky behavior
          setTop(offset);
          setIsSticky(true);
        }
        setWidth(placeholderRef.current.offsetWidth);
      } else {
        setIsSticky(false);
        setTop(offset);
      }
    };

    // Set initial width
    if (placeholderRef.current) {
      setWidth(placeholderRef.current.offsetWidth);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [offset]);

  return (
    <>
      <div ref={placeholderRef} style={isSticky ? { height: containerRef.current?.offsetHeight || 0 } : undefined}>
        <div
          ref={containerRef}
          style={
            isSticky
              ? {
                  position: "fixed",
                  top: `${top}px`,
                  width: width || "auto",
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
