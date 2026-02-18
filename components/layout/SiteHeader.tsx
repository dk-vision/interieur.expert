"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./Container";
import SmartSearch from "@/components/ui/SmartSearch";

const navItems = [
  { label: "Inspiratie", href: "/inspiratie" },
  { label: "Advies", href: "/advies" },
  { label: "Trends", href: "/trends" },
  { label: "Dossiers", href: "/dossiers" },
  { label: "Video", href: "/video" },
  { label: "Partners", href: "/partners" },
  { label: "Over", href: "/over" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-text/10 bg-background sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-6 gap-4">
          <Link
            href="/"
            className="text-text hover:text-accent transition-colors flex-shrink-0"
          >
            <span className="sr-only">interieur.expert</span>
            <Image
              src="/icons/logo.svg"
              alt=""
              width={220}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-4 md:gap-8">
            <SmartSearch />
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm transition-all duration-200 whitespace-nowrap relative pb-1 ${
                        isActive(item.href)
                          ? "text-text font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:transition-all"
                          : "text-text/70 hover:text-text after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-accent/50 hover:after:left-0 hover:after:right-0 after:transition-all after:duration-200"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-text/20 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-text/10">
            <span className="text-lg font-semibold text-text">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-text hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-4 text-base transition-colors border-l-4 ${
                      isActive(item.href)
                        ? "text-text font-medium bg-surface border-accent"
                        : "text-text/80 hover:text-text hover:bg-surface border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-text/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-text/60 hover:text-text transition-colors"
            >
              © 2026 interieur.expert
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
