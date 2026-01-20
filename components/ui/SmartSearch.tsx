"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchResult {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  _type: "article" | "video";
}

export default function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Open search with CMD+K or CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const result = results[selectedIndex];
      navigateToResult(result);
    }
  };

  const navigateToResult = (result: SearchResult) => {
    const path =
      result._type === "article"
        ? `/artikels/${result.slug.current}`
        : `/video/${result.slug.current}`;
    router.push(path);
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border hover:border-accent transition-colors text-sm text-text/60"
        aria-label="Open search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Zoeken...</span>
        <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-background rounded border border-border">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery("");
          setResults([]);
        }}
      />

      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
            <Search className="w-5 h-5 text-text/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Zoek artikels en video's..."
              className="flex-1 bg-transparent outline-none text-text placeholder:text-text/40"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
                className="p-1 hover:bg-background-secondary rounded"
              >
                <X className="w-4 h-4 text-text/40" />
              </button>
            )}
          </div>

          {/* Results */}
          {query && (
            <div
              ref={resultsRef}
              className="max-h-[60vh] overflow-y-auto overscroll-contain"
            >
              {isLoading ? (
                <div className="px-4 py-8 text-center text-text/60">
                  Zoeken...
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result._id}
                      onClick={() => navigateToResult(result)}
                      className={`w-full text-left px-4 py-3 hover:bg-background-secondary transition-colors ${
                        index === selectedIndex ? "bg-background-secondary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-text truncate">
                              {result.title}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent capitalize flex-shrink-0">
                              {result._type === "article" ? "Artikel" : "Video"}
                            </span>
                          </div>
                          <p className="text-sm text-text/60 line-clamp-2">
                            {result.excerpt}
                          </p>
                          <p className="text-xs text-text/40 mt-1 capitalize">
                            {result.category}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-text/60">
                  Geen resultaten gevonden voor &quot;{query}&quot;
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-background-secondary/50">
            <div className="flex items-center justify-between text-xs text-text/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">
                    ↓
                  </kbd>
                  <span className="ml-1">navigeren</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">
                    ↵
                  </kbd>
                  <span className="ml-1">selecteren</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">
                  esc
                </kbd>
                <span className="ml-1">sluiten</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
