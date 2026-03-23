"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <Section spacing="lg">
        <Container size="content">
          <div className="text-center space-y-6 py-12">
            <p className="text-meta font-semibold uppercase tracking-widest text-accent">
              Fout
            </p>
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Er ging iets mis
            </h1>
            <p className="text-body-lg text-text/70 max-w-lg mx-auto">
              We konden deze pagina niet laden. Probeer het opnieuw of ga terug
              naar de homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                type="button"
                onClick={reset}
                className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
              >
                Probeer opnieuw
              </button>
              <Link
                href="/"
                className="px-8 py-3 border border-text/20 text-text font-medium rounded-sm hover:border-accent hover:text-accent transition-colors"
              >
                Naar de homepage
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
