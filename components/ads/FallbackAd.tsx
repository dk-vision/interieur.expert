type SizeSpec = { label: string; activeClass: string };

interface FallbackAdProps {
  slot: "horizontal" | "vertical" | "square" | "card";
  className?: string;
  /** Per-breakpoint size specs. The activeClass on each makes it bold when rendered. */
  sizes?: SizeSpec[];
}

export function FallbackAd({ slot, className = "", sizes }: FallbackAdProps) {
  const isHorizontal = slot === "horizontal";

  const textSize = {
    horizontal: { heading: "text-lg", sizeLabel: "text-xs",  pill: "text-sm"  },
    card:       { heading: "text-lg", sizeLabel: "text-sm",  pill: "text-sm"  },
    vertical:   { heading: "text-lg", sizeLabel: "text-base",pill: "text-base"},
    square:     { heading: "text-lg", sizeLabel: "text-sm",  pill: "text-sm"  },
  }[slot];

  const sizeRow = sizes && sizes.length > 0 && (
    <span className={`flex items-center gap-1 font-mono flex-wrap ${isHorizontal ? "justify-start" : "justify-center"} ${textSize.sizeLabel}`}>
      {sizes.map((s, i) => (
        <>
          {i > 0 && <span key={`sep-${i}`} className="text-white/40">/</span>}
          <span key={s.label} className={`${s.activeClass} text-white/70`}>{s.label}</span>
        </>
      ))}
    </span>
  );

  if (isHorizontal) {
    return (
      <a
        href="mailto:partnerships@interieur.expert"
        className={`w-full h-full flex flex-row items-center justify-between px-6 bg-accent border-2 border-dashed border-white/60 rounded-sm hover:brightness-110 hover:border-white transition-all group cursor-pointer select-none ${className}`}
        title="Adverteren op interieur.expert"
      >
        {/* Left: title + sizes stacked */}
        <div className="flex flex-col justify-center gap-0.5">
          <span className={`font-bold text-white leading-tight ${textSize.heading}`}>
            Jouw advertentie hier
          </span>
          {sizeRow}
        </div>
        {/* Right: CTA button */}
        <span className={`text-accent font-bold bg-white group-hover:bg-white/90 rounded px-4 py-1.5 transition-colors whitespace-nowrap shrink-0 ${textSize.pill}`}>
          Adverteer nu →
        </span>
      </a>
    );
  }

  return (
    <a
      href="mailto:partnerships@interieur.expert"
      className={`w-full h-full flex flex-col items-center justify-center gap-3 bg-accent border-2 border-dashed border-white/60 rounded-sm hover:brightness-110 hover:border-white transition-all group cursor-pointer select-none ${className}`}
      title="Adverteren op interieur.expert"
    >
      <span className={`font-bold text-white text-center leading-snug px-3 ${textSize.heading}`}>
        Jouw advertentie hier
      </span>
      {sizeRow}
      <span className={`text-accent font-bold bg-white group-hover:bg-white/90 rounded px-3 py-1 transition-colors ${textSize.pill}`}>
        Adverteer nu →
      </span>
    </a>
  );
}
