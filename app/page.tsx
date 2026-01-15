import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import FeaturedCard from "@/components/editorial/FeaturedCard";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { Mail } from "lucide-react";

function NewsletterCTA() {
  return (
    <div className="bg-accent/5 border border-accent/10 rounded-sm p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <Mail size={32} className="text-accent" />
        </div>
        <h3 className="text-2xl font-semibold text-text">
          Wekelijkse interieurinspiratie in je inbox
        </h3>
        <p className="text-text/70 leading-relaxed">
          Ontvang elke week de beste artikelen, tips en trends. Geen spam, altijd relevante content.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="je@email.nl"
            className="flex-1 px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
          />
          <button className="px-6 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent hover:text-text transition-colors">
            Inschrijven
          </button>
        </div>
        <p className="text-xs text-text/50">
          Je kunt je altijd weer uitschrijven. Privacy gegarandeerd.
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12 lg:space-y-16">
            {/* Intro */}
            <div className="max-w-content space-y-4">
              <h1 className="text-5xl lg:text-6xl font-semibold text-text leading-tight">
                Inspiratie voor je interieur
              </h1>
              <p className="text-xl text-text/70 leading-relaxed">
                Eerlijk advies, trends en verhalen over interieur. Zonder poespas.
              </p>
            </div>

            {/* Featured Article */}
            <FeaturedCard
              title="De kracht van natuurlijke materialen in moderne interieurs"
              excerpt="Natuurlijke materialen brengen niet alleen warmte en karakter, maar ook een gevoel van rust en authenticiteit. Ontdek waarom hout, steen en linnen meer zijn dan een trend."
              href="/artikels/natuurlijke-materialen"
              type="article"
              category="Materialen"
              publishedAt="12 januari 2026"
              readingTime={7}
              isSponsored={false}
              image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
            />
          </div>
        </Container>
      </Section>

      {/* Recent Articles Grid */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <h2 className="text-3xl font-semibold text-text">Recent</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              <ContentCard
                title="Minimalisme zonder koud te worden"
                excerpt="Hoe je een minimalistisch interieur creëert dat warm en uitnodigend blijft, zonder in clichés te vervallen."
                href="/artikels/warm-minimalisme"
                type="article"
                category="Stijlen"
                publishedAt="10 januari 2026"
                readingTime={5}
                tags={["Minimalisme", "Warmte"]}
                image="https://images.unsplash.com/photo-1615874694520-474822394e73?w=800&q=80"
                size="wide"
              />

              <ContentCard
                title="Kleur kiezen voor je woonkamer"
                excerpt="Een praktische gids om de juiste kleuren te vinden die bij jouw ruimte en levensstijl passen."
                href="/artikels/kleur-kiezen"
                type="article"
                category="Advies"
                publishedAt="8 januari 2026"
                readingTime={6}
                tags={["Kleur", "Woonkamer"]}
                image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
              />

              <ContentCard
                title="Verlichting als basis van je interieur"
                excerpt="Waarom goede verlichting het fundament is van elk geslaagd interieur, en hoe je het goed aanpakt."
                href="/artikels/verlichting-basis"
                type="article"
                category="Techniek"
                publishedAt="5 januari 2026"
                readingTime={8}
                tags={["Verlichting", "Basis"]}
                isSponsored={true}
                partnerName="Lumina Lighting"
                partnerUrl="https://lumina-lighting.example"
                image="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80"
              />

              <ContentCard
                title="Kleine ruimtes groter laten lijken"
                excerpt="Slimme inrichtingstips die écht werken, zonder trucjes of gimmicks."
                href="/artikels/kleine-ruimtes"
                type="article"
                category="Tips"
                publishedAt="2 januari 2026"
                readingTime={5}
                image="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80"
              />

              <ContentCard
                title="Duurzaam inrichten zonder concessies"
                excerpt="Kwaliteit en duurzaamheid hoeven elkaar niet uit te sluiten. Zo kies je meubels die een leven lang meegaan."
                href="/artikels/duurzaam-inrichten"
                type="dossier"
                category="Duurzaamheid"
                publishedAt="30 december 2025"
                readingTime={12}
                image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80"
              />

              {/* Ad Slot after 5th card */}
              <AdSlot position="listing-inline" />

              <ContentCard
                title="De comeback van ambachtelijk meubelwerk"
                excerpt="Waarom steeds meer mensen kiezen voor op maat gemaakt meubilair, en wat je moet weten voordat je begint."
                href="/artikels/ambachtelijk-meubelwerk"
                type="article"
                category="Ambacht"
                publishedAt="28 december 2025"
                readingTime={6}
                image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Video Section */}
      <Section spacing="lg" background="accent">
        <Container>
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-text">Video&apos;s</h2>
              <a
                href="/video"
                className="text-sm text-accent hover:text-text transition-colors font-medium"
              >
                Alle video&apos;s →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              <ContentCard
                title="Interieur tour: Modern landelijk in Utrecht"
                excerpt="Bekijk hoe Sarah haar jaren '30 huis transformeerde naar een moderne landelijke stijl met respect voor originele details."
                href="/video/tour-utrecht"
                type="video"
                category="Tours"
                publishedAt="11 januari 2026"
                readingTime={15}
                image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
              />

              <ContentCard
                title="DIY: Industriële wandkast maken"
                excerpt="Stap voor stap uitleg om zelf een industriële wandkast te bouwen met staal en hout."
                href="/video/diy-wandkast"
                type="video"
                category="DIY"
                publishedAt="7 januari 2026"
                readingTime={22}
                image="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80"
              />

              <ContentCard
                title="Kleuradvies voor kleine ruimtes"
                excerpt="Interieurstyliste Lisa legt uit welke kleuren kleine ruimtes groter en luchtiger maken."
                href="/video/kleuradvies"
                type="video"
                category="Advies"
                publishedAt="3 januari 2026"
                readingTime={12}
                image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section spacing="lg">
        <Container>
          <NewsletterCTA />
        </Container>
      </Section>
    </div>
  );
}
