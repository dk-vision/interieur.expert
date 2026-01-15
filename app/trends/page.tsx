import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import FeaturedCard from "@/components/editorial/FeaturedCard";
import AdSlot from "@/components/ads/AdSlot";

export default function TrendsPage() {
  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
                Trends
              </h1>
              <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
                De laatste ontwikkelingen in interieurdesign. We volgen trends kritisch:
                wat is écht vernieuwend en wat verdwijnt weer snel?
              </p>
            </div>

            {/* Featured Trend */}
            <FeaturedCard
              title="2026: Het jaar van textuur en ambacht"
              excerpt="Na jaren van strakke minimalisme zien we een duidelijke verschuiving naar tactiele materialen en zichtbaar vakmanschap. Wat betekent dit voor jouw interieur?"
              href="/artikels/trends-2026"
              type="article"
              category="Jaaroverzicht"
              publishedAt="14 januari 2026"
              readingTime={12}
              image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80"
            />
          </div>
        </Container>
      </Section>

      {/* Current Trends Grid */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <h2 className="text-3xl font-semibold text-text">Actuele trends</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              <ContentCard
                title="Terracotta tinten: Van trendy naar tijdloos"
                excerpt="Waarom deze warme aardtinten blijven en hoe je ze subtiel integreert in je interieur."
                href="/artikels/terracotta"
                type="article"
                category="Kleur"
                publishedAt="12 januari 2026"
                readingTime={6}
                tags={["Kleur", "Materialen"]}
                image="https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=800&q=80"
              />

            <ContentCard
              title="Curved design: Ronde vormen winnen terrein"
              excerpt="Van meubels tot architectuur, zachte lijnen vervangen hoeken. Is dit iets voor jou? Ontdek waarom organische vormen niet alleen mooier zijn, maar ook comfortabeler en hoe je deze trend subtiel in je huis integreert."
              href="/artikels/curved-design"
              type="article"
              category="Stijl"
              publishedAt="10 januari 2026"
              readingTime={7}
              size="large"
              image="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80"
            />

            <ContentCard
                title="Bouclé: Van niche naar mainstream"
                excerpt="Dit zachte, gestructureerde textiel is overal. Hoe gebruik je het zonder dat het gedateerd raakt?"
                href="/artikels/boucle-textiel"
                type="article"
                category="Materialen"
                publishedAt="8 januari 2026"
                readingTime={5}
                isSponsored={true}
                partnerName="Fabric House"
                partnerUrl="https://fabrichouse.example"
                image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
              />

              {/* Ad slot */}
              <AdSlot position="listing-inline" />

              <ContentCard
                title="Grandmillennial: Oma's stijl, modern geïnterpreteerd"
                excerpt="Klassieke elementen als behang, porselein en antiek krijgen een frisse update."
                href="/artikels/grandmillennial"
                type="article"
                category="Stijl"
                publishedAt="6 januari 2026"
                readingTime={8}
                image="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80"
              />

              <ContentCard
                title="Dopamine decor: Vrolijke interieurs"
                excerpt="Kleurrijke, speelse inrichtingen die je humeur een boost geven. Hype of blijvertje?"
                href="/artikels/dopamine-decor"
                type="article"
                category="Psychologie"
                publishedAt="4 januari 2026"
                readingTime={6}
                image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
              />

              <ContentCard
                title="Textured walls: Van glad naar tactiel"
                excerpt="Lime wash, venetiaans stucwerk en clay paint maken muren interessant. Techniek en uitvoering."
                href="/artikels/textured-walls"
                type="article"
                category="Technieken"
                publishedAt="2 januari 2026"
                readingTime={9}
                image="https://images.unsplash.com/photo-1615876063052-0534733c35b6?w=800&q=80"
              />

              <ContentCard
                title="Checkerboard print: Het nieuwe grafische patroon"
                excerpt="Zwart-wit geblokte vloeren en wanden maken comeback. Hoe doe je dit goed?"
                href="/artikels/checkerboard"
                type="article"
                category="Patronen"
                publishedAt="31 december 2025"
                readingTime={5}
                image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              />

            <ContentCard
              title="Quiet luxury: Subtiele rijkdom"
              excerpt="Geen logomania, maar kwaliteit en vakmanschap. De nieuwe definitie van luxe interieur. Ontdek hoe je door materiaalgebruik, afwerking en aandacht voor detail een interieur creëert dat luxe uitstraalt zonder te pronken."
              href="/artikels/quiet-luxury"
              type="article"
              category="Stijl"
              publishedAt="29 december 2025"
              readingTime={10}
              size="large"
              image="https://images.unsplash.com/photo-1615874694520-474822394e73?w=1200&q=80"
            />

            <ContentCard
                title="Micro-living: Slimme oplossingen voor kleine ruimtes"
                excerpt="Transformeerbare meubels en ruimtebesparende innovaties voor de stedelijke nomade."
                href="/artikels/micro-living"
                type="dossier"
                category="Wonen"
                publishedAt="27 december 2025"
                readingTime={14}
                image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trend Watch */}
      <Section spacing="lg" background="accent">
        <Container size="content">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold text-text">Trend Watch</h2>
            <p className="text-lg text-text/70 leading-relaxed">
              Elke maand analyseren we opkomende trends. Schrijf je in voor onze
              nieuwsbrief en blijf op de hoogte van de laatste ontwikkelingen.
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
          </div>
        </Container>
      </Section>
    </div>
  );
}
