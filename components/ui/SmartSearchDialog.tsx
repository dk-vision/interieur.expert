"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  _type: "article" | "video" | "partner";
  sponsored?: boolean;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

interface SmartSearchDialogProps {
  onClose: () => void;
}

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

function CloseIcon({ className = "" }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const POPULAR_TOPICS = [
  "verlichting",
  "keuken",
  "badkamer",
  "woonkamer",
  "scandinavisch",
  "minimalistisch",
  "duurzaam",
  "kleur",
];

export default function SmartSearchDialog({ onClose }: SmartSearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dialogTitleId = "smart-search-title";
  const searchInputId = "smart-search-input";
  const lastTrackedQueryRef = useRef("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setSelectedIndex(-1);
      lastTrackedQueryRef.current = "";
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        if (typeof window !== "undefined" && lastTrackedQueryRef.current !== trimmedQuery) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "site_search",
            search_term: trimmedQuery,
          });
          lastTrackedQueryRef.current = trimmedQuery;
        }

        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`);

        if (response.ok) {
          const data = await response.json();
          const nextResults = data.results || [];

          if (typeof window !== "undefined" && window.dataLayer && nextResults.length === 0) {
            window.dataLayer.push({
              event: "search_no_results",
              search_term: trimmedQuery,
            });
          }

          setResults(nextResults);
          setSelectedIndex(-1);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const resetSearch = () => {
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);
  };

  const closeAndReset = () => {
    resetSearch();
    onClose();
  };

  const navigateToResult = (result: SearchResult) => {
    const trimmedQuery = query.trim();
    let path: string;

    if (result._type === "article") {
      path = `/${result.category || "artikels"}/${result.slug.current}`;
    } else if (result._type === "video") {
      path = `/video/${result.slug.current}`;
    } else {
      path = `/partners/${result.slug.current}`;
    }

    if (typeof window !== "undefined" && trimmedQuery) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "search_result_click",
        search_term: trimmedQuery,
        result_title: result.title,
        result_type: result._type,
      });
    }

    router.push(path);
    closeAndReset();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      return;
    }

    if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      navigateToResult(results[selectedIndex]);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={closeAndReset}
        aria-hidden="true"
      />

      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden" role="dialog" aria-modal="true" aria-labelledby={dialogTitleId}>
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
            <SearchIcon className="w-5 h-5 text-text/40 flex-shrink-0" />
            <label htmlFor={searchInputId} id={dialogTitleId} className="sr-only">
              Zoek artikels, video&apos;s en partners
            </label>
            <input
              id={searchInputId}
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Zoek artikels, video's en partners..."
              aria-controls="smart-search-results"
              className="flex-1 bg-transparent outline-none text-text placeholder:text-text/40"
            />
            {query && (
              <button
                type="button"
                onClick={resetSearch}
                className="p-1 hover:bg-background-secondary rounded"
                aria-label="Zoekopdracht wissen"
              >
                <CloseIcon className="w-4 h-4 text-text/40" />
              </button>
            )}
            <button
              type="button"
              onClick={closeAndReset}
              className="p-1 hover:bg-background-secondary rounded"
              aria-label="Zoekvenster sluiten"
            >
              <CloseIcon className="w-4 h-4 text-text/40" />
            </button>
          </div>

          {!query && (
            <div className="px-4 py-6">
              <p className="text-sm font-medium text-text/50 mb-3">Populaire onderwerpen</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setQuery(topic)}
                    className="px-3 py-1.5 text-sm rounded-full border border-text/15 text-text/70 hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div
              id="smart-search-results"
              ref={resultsRef}
              className="max-h-[60vh] overflow-y-auto overscroll-contain"
            >
              {isLoading ? (
                <div className="px-4 py-8 text-center text-text/60">Zoeken...</div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result._id}
                      onClick={() => navigateToResult(result)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        index === selectedIndex ? "bg-accent/5" : "hover:bg-background-secondary"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-text truncate">{result.title}</h3>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent capitalize">
                                {result._type === "article" ? "Artikel" : result._type === "video" ? "Video" : "Partner"}
                              </span>
                              {result.sponsored && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                                  Gesponsord
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-text/60 line-clamp-2">{result.excerpt}</p>
                          {result.category && (
                            <p className="text-xs text-text/40 mt-1 capitalize">{result.category}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-text/60 mb-4">
                    Geen resultaten gevonden voor &quot;{query}&quot;
                  </p>
                  <p className="text-sm text-text/50 mb-3">Probeer ook:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {POPULAR_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setQuery(topic)}
                        className="px-3 py-1.5 text-sm rounded-full border border-text/15 text-text/70 hover:border-accent/40 hover:text-accent transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="px-4 py-3 border-t border-border bg-background-secondary/50">
            <div className="flex items-center justify-between text-xs text-text/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↓</kbd>
                  <span className="ml-1">navigeren</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↵</kbd>
                  <span className="ml-1">selecteren</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">esc</kbd>
                <span className="ml-1">sluiten</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}