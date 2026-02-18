import Link from "next/link";

interface FallbackAdProps {
  slot: "horizontal" | "vertical" | "square" | "card";
  className?: string;
}

export function FallbackAd({ slot, className = "" }: FallbackAdProps) {
  return (
    <div
      className={`w-full bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center p-6 hover:border-neutral-400 transition-colors group ${className}`}
    >
      <div className="text-center">
        <div className="text-4xl mb-3 opacity-40 group-hover:opacity-60 transition-opacity">
          📢
        </div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
          Jouw advertentie hier?
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          Bereik duizenden interieurliefhebbers
        </p>
        <Link
          href="mailto:partnerships@interieur.expert"
          className="inline-block px-5 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors"
        >
          Contacteer ons
        </Link>
        <p className="text-xs text-neutral-500 mt-3">
          partnerships@interieur.expert
        </p>
      </div>
    </div>
  );
}
