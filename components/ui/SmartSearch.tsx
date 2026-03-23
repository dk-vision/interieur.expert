"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SmartSearchDialog = dynamic(() => import("@/components/ui/SmartSearchDialog"), {
  ssr: false,
});

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border hover:border-accent transition-colors text-sm text-text/60"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Zoeken...</span>
        <span className="sr-only">Zoeken</span>
        <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-background rounded border border-border">⌘K</kbd>
      </button>
      {isOpen ? <SmartSearchDialog onClose={() => setIsOpen(false)} /> : null}
    </>
  );
}
