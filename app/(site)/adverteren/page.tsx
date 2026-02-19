import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Adverteren | interieur.expert",
  description:
    "Bereik een geengageerd publiek van interieurliefhebbers en professionals via interieur.expert.",
};

const options = [
  {
    number: "01",
    title: "Display advertising",
    body: "Banners op prominente posities &mdash; homepage, artikelpagina&apos;s en dossiers. Beschikbare formaten: Billboard (970x250), Leaderboard (728x90), Half Page (300x600) en Medium Rectangle (300x250).",
  },
  {
    number: "02",
    title: "Gesponsorde content",
    body: "Redactionele artikels of inspiratiepagina&apos;s die aansluiten bij de editorial lijn van interieur.expert, duidelijk gelabeld als gesponsord.",
  },
  {
    number: "03",
    title: "Dossier sponsoring",
    body: "Exclusieve zichtbaarheid binnen een specifiek thema-dossier &mdash; keuken, badkamer, verlichting of buitenleven &mdash; met vermelding als hoofdsponsor.",
  },
  {
    number: "04",
    title: "Partner profiel",
    body: "Een vaste aanwezigheid als merkpartner: logo in de footer, vermelding in de partnerspagina en doorlopende zichtbaarheid in relevante categorie&euml;n.",
  },
];

export default function AdverterenPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-4">
            <p className="text-body-sm font-semibold uppercase tracking-widest text-accent">
              Samenwerken
            </p>
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Adverteren
            </h1>
            <p className="text-body-lg text-text/70 max-w-xl">
              Bereik een ge&euml;ngageerd publiek van interieurliefhebbers en
              professionals via interieur.expert.
            </p>
          </div>
        </Container>
      </Section>

      {/* Options grid */}
      <Section spacing="sm" className="!py-6">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {options.map((opt) => (
              <div
                key={opt.number}
                className="group bg-white border border-text/10 rounded-sm p-5 flex flex-col gap-3 hover:border-accent/40 hover:shadow-sm transition-all"
              >
                <span className="text-meta font-semibold tabular-nums text-accent/60 tracking-widest">
                  {opt.number}
                </span>
                <h2 className="text-h6 font-semibold text-text">{opt.title}</h2>
                <p
                  className="text-body text-text/65 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: opt.body }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container size="content">
          <div className="px-8 py-12 text-center">
            <h2 className="text-h4 font-semibold text-text mb-3">
              Interesse? Neem contact op.
            </h2>
            <p className="text-body-lg text-text/65 mb-8">
              We bespreken graag welke formule het beste past bij jouw merk en
              doelstellingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:partnerships@interieur.expert"
                className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
              >
                partnerships@interieur.expert
              </a>
              <Link
                href="/contact"
                className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
              >
                Contactformulier
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
