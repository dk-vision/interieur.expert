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
        <div className="bg-background border-2 border-brand/20 rounded-sm p-8 flex items-center justify-center min-h-[250px]">
          <p className="text-text/30 text-sm font-medium">Advertentieruimte</p>
        </div>
      </div>
    </div>
  );
}
