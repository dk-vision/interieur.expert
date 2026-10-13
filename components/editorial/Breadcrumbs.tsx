import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  centered?: boolean;
}

// Visible counterpart to the BreadcrumbList JSON-LD built via lib/seo.ts buildBreadcrumbJsonLd().
export default function Breadcrumbs({ items, centered = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Broodkruimel" className={`text-sm text-text/60 ${centered ? "flex justify-center" : ""}`}>
      <ol className="inline-flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {isLast ? (
                <span aria-current="page" className="text-text/80">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
