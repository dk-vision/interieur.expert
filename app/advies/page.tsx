import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";

export default function AdviesPage() {
  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Advies
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Praktisch en eerlijk advies voor het inrichten van je huis. Van budgetvriendelijke
              tips tot grondige uitleg over materialen en technieken.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <ContentCard
              title="Je eerste huis inrichten met een beperkt budget"
              excerpt="Slimme keuzes maken zonder concessies te doen. Waar investeer je in en waar kun je besparen?"
              href="/artikels/budget-inrichten"
              type="article"
              category="Budget"
              publishedAt="13 januari 2026"
              readingTime={10}
              tags={["Budget", "Starters"]}
              image="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80"
            />

            <ContentCard
              title="Verlichting plannen: De complete gids"
              excerpt="Alles wat je moet weten over algemene, taak- en accentverlichting voor elke ruimte. Van de basis van lichttemperatuur tot geavanceerde planning voor optimaal comfort en functionaliteit in je huis."
              href="/artikels/verlichting-gids"
              type="dossier"
              category="Verlichting"
              publishedAt="11 januari 2026"
              readingTime={15}
              tags={["Verlichting", "Techniek"]}
              size="large"
              image="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80"
            />

            <ContentCard
              title="Kleine ruimtes slim inrichten"
              excerpt="Praktische tips om je kleine woning groter en functioneler te maken zonder trucjes."
              href="/artikels/kleine-ruimtes"
              type="article"
              category="Ruimte"
              publishedAt="9 januari 2026"
              readingTime={7}
              image="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80"
            />

            {/* Ad slot */}
            <AdSlot position="listing-inline" />

            <ContentCard
              title="Vloeren vergelijken: Voor- en nadelen"
              excerpt="Hout, tegel, vinyl of beton? Een eerlijke vergelijking op duurzaamheid, onderhoud en kosten."
              href="/artikels/vloeren-vergelijken"
              type="article"
              category="Materialen"
              publishedAt="7 januari 2026"
              readingTime={12}
              isSponsored={true}
              partnerName="FloorMasters"
              partnerUrl="https://floormasters.example"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
            />

            <ContentCard
              title="Keuken indeling: De werkdriehoek en meer"
              excerpt="Praktisch advies voor een functionele keuken waar koken een plezier is."
              href="/artikels/keuken-indeling"
              type="article"
              category="Keuken"
              publishedAt="5 januari 2026"
              readingTime={9}
              image="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
            />

            <ContentCard
              title="Akoestiek verbeteren in open ruimtes"
              excerpt="Eenvoudige aanpassingen die galm verminderen en je wooncomfort vergroten."
              href="/artikels/akoestiek"
              type="article"
              category="Techniek"
              publishedAt="3 januari 2026"
              readingTime={6}
              image="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
            />

            <ContentCard
              title="Gordijnen of rolgordijnen: Welke past bij jou?"
              excerpt="Praktische overwegingen voor raamdecoratie. Functie, esthetiek en onderhoud vergeleken."
              href="/artikels/raamdecoratie-kiezen"
              type="article"
              category="Textiel"
              publishedAt="1 januari 2026"
              readingTime={5}
              image="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=800&q=80"
            />

            <ContentCard
              title="Duurzaam renoveren: Waar begin je?"
              excerpt="Stap voor stap naar een duurzamere woning. Prioriteiten stellen en slimme keuzes maken. Van isolatie tot materialenkeuze, ontdek hoe je je huis toekomstbestendig maakt zonder je budget te overschrijden."
              href="/artikels/duurzaam-renoveren"
              type="dossier"
              category="Duurzaamheid"
              publishedAt="29 december 2025"
              readingTime={18}
              size="large"
              image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&q=80"
            />

            <ContentCard
              title="Kleuradvies: Welke tinten passen bij elkaar?"
              excerpt="De basis van kleurenleer toegepast op interieurs. Inclusief praktische voorbeelden."
              href="/artikels/kleur-combineren"
              type="article"
              category="Kleur"
              publishedAt="27 december 2025"
              readingTime={8}
              image="https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=800&q=80"
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
