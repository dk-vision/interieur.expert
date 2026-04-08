import Link from "next/link";

export default function PreviewBanner() {
  return (
    <div className="bg-amber-500 text-black text-center py-2 px-4 text-sm font-medium sticky top-0 z-50">
      <span>Preview-modus — </span>
      <Link
        href="/api/draft/disable"
        className="underline font-semibold hover:no-underline"
      >
        Preview sluiten
      </Link>
    </div>
  );
}
