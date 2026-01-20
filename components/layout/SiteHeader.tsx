import Link from "next/link";
import Container from "./Container";
import SmartSearch from "@/components/ui/SmartSearch";

const navItems = [
  { label: "Inspiratie", href: "/inspiratie" },
  { label: "Advies", href: "/advies" },
  { label: "Trends", href: "/trends" },
  { label: "Video", href: "/video" },
  { label: "Over", href: "/over" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-text/10 bg-background">
      <Container>
        <div className="flex items-center justify-between py-6 gap-8">
          <Link
            href="/"
            className="text-xl font-semibold text-text hover:text-accent transition-colors flex-shrink-0"
          >
            interieur.expert
          </Link>
          <div className="flex items-center gap-8">
            <SmartSearch />
            <nav>
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text/70 hover:text-text transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
