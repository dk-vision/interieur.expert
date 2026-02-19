import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Bericht ontvangen | interieur.expert",
};

export default function BedanktPage() {
  return (
    <Section spacing="lg">
      <Container size="content">
        <div className="text-center space-y-6 py-16">
          <div className="text-5xl">&#10003;</div>
          <h1 className="text-h3 font-semibold text-text">
            Bericht ontvangen
          </h1>
          <p className="text-body-lg text-text/70 max-w-md mx-auto">
            Bedankt voor je bericht. We nemen zo snel mogelijk contact met je
            op &mdash; meestal binnen 2 werkdagen.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
