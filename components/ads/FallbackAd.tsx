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
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-sm hover:border-accent hover:bg-accent/5 transition-colors group cursor-pointer select-none ${className}`}
      title="Adverteren op interieur.expert"
    >
      <span className="text-2xl opacity-30 group-hover:opacity-50 transition-opacity">
        📢
      </span>
      <span
        className={`font-semibold text-neutral-700 group-hover:text-text transition-colors text-center leading-tight ${
          isVertical ? "text-sm px-3" : "text-xs px-2"
        }`}
      >
        Jouw advertentie hier
      </span>
      {sizeLabel && (
        <span className="text-[10px] text-neutral-400 font-mono">{sizeLabel}</span>
      )}
      <span
        className={`text-neutral-500 group-hover:text-accent transition-colors font-medium bg-neutral-200 group-hover:bg-accent/20 rounded px-2 py-0.5 ${
          isVertical ? "text-xs" : "text-[10px]"
        }`}
      >
        Adverteer nu →
      </span>
    </a>
  );
}
