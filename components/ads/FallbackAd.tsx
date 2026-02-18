type SizeSpec = { label: string; activeClass: string };

interface FallbackAdProps {
  slot: "horizontal" | "vertical" | "square" | "card";
  className?: string;
  /** Per-breakpoint size specs. The activeClass on each makes it bold when rendered. */
  sizes?: SizeSpec[];
}

export function FallbackAd({ slot, className = "", sizes }: FallbackAdProps) {
  const isVertical = slot === "vertical";

  return (
    <a
      href="mailto:partnerships@interieur.expert"
      className={`w-full h-full flex flex-col items-center justify-center gap-3 bg-amber-50 border-2 border-dashed border-amber-300 rounded-sm hover:border-accent hover:bg-accent/10 transition-colors group cursor-pointer select-none ${className}`}
      title="Adverteren op interieur.expert"
    >
      <span className="text-3xl opacity-50 group-hover:opacity-70 transition-opacity">
        📢
      </span>
      <span
        className={`font-semibold text-neutral-800 group-hover:text-text transition-colors text-center leading-snug ${
          isVertical ? "text-base px-4" : "text-base px-3"
        }`}
      >
        Jouw advertentie hier
      </span>
      {sizes && sizes.length > 0 && (
        <span className="flex items-center gap-1.5 font-mono text-sm flex-wrap justify-center px-2">
          {sizes.map((s, i) => (
            <>
              {i > 0 && (
                <span key={`sep-${i}`} className="text-neutral-300">/</span>
              )}
              <span
                key={s.label}
                className={`${s.activeClass} text-neutral-600`}
              >
                {s.label}
              </span>
            </>
          ))}
        </span>
      )}
      <span className="text-sm text-neutral-600 group-hover:text-accent transition-colors font-medium bg-amber-100 group-hover:bg-accent/20 rounded px-3 py-1">
        Adverteer nu →
      </span>
    </a>
  );
}
