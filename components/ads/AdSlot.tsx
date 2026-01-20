import AdLabel from "@/components/ui/AdLabel";

interface AdSlotProps {
  position: "listing-inline" | "article-inline" | "sidebar";
  className?: string;
}

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const positionClasses = {
    "listing-inline": "w-full",
    "article-inline": "w-full max-w-content mx-auto",
    sidebar: "hidden lg:block w-full",
  };

  return (
    <div
      className={`${positionClasses[position]} ${className}`}
      aria-label="Advertisement"
    >
      <div className="space-y-3">
        <AdLabel />
        <a
          href="https://www.example.com"
          target="_blank"
          rel="noopener sponsored"
          className="block bg-background border-2 border-brand/20 rounded-sm p-8 hover:border-brand/40 transition-colors min-h-[250px] flex items-center justify-center cursor-pointer"
        >
          <p className="text-text/30 text-sm font-medium">Advertentieruimte</p>
        </a>
      </div>
    </div>
  );
}
