interface FallbackAdProps {
  slot: "horizontal" | "vertical" | "square" | "card";
  className?: string;
  /** Optional size label shown for context, e.g. "970×250" */
  sizeLabel?: string;
}

export function FallbackAd({ slot, className = "", sizeLabel }: FallbackAdProps) {
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
      {sizeLabel && (
        <span className="text-sm text-neutral-500 font-mono">{sizeLabel}</span>
      )}
      <span
        className="text-sm text-neutral-600 group-hover:text-accent transition-colors font-medium bg-amber-100 group-hover:bg-accent/20 rounded px-3 py-1"
      >
        Adverteer nu →
      </span>
    </a>
  );
}
