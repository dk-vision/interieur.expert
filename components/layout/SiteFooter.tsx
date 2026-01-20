import Link from "next/link";
import Container from "./Container";

const footerLinks = {
  content: [
    { label: "Inspiratie", href: "/inspiratie" },
    { label: "Advies", href: "/advies" },
    { label: "Trends", href: "/trends" },
    { label: "Video", href: "/video" },
  ],
  about: [
    { label: "Over ons", href: "/over" },
    { label: "Contact", href: "/contact" },
    { label: "Adverteren", href: "/adverteren" },
  ],
};

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-text/10 bg-background">
      <Container>
        <div className="py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">
                interieur.expert
              </h3>
              <p className="text-sm text-text/60 leading-relaxed">
                Inspiratie, advies en trends voor een interieur dat bij je past.
                Eerlijk, toegankelijk en zonder poespas.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-text">Content</h4>
              <ul className="space-y-2">
                {footerLinks.content.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text/60 hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-text">Over</h4>
              <ul className="space-y-2">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text/60 hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-text/10">
            <p className="text-sm text-text/60">
              © {currentYear} interieur.expert — Alle rechten voorbehouden
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
