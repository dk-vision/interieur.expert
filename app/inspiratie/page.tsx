import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";

export default function InspiratiePage() {
  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Inspiratie
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Ontdek stijlen, kleuren en materialen die je interieur naar een hoger
              niveau tillen. Van tijdloze klassiekers tot verfrissende nieuwe trends.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <ContentCard
              title="Japandi: De perfecte mix van Japans en Scandinavisch"
              excerpt="Ontdek hoe je minimalisme combineert met warmte in deze populaire stijl die het beste van twee werelden verenigt."
              href="/artikels/japandi-stijl"
              type="article"
              category="Stijlen"
              publishedAt="13 januari 2026"
              readingTime={8}
              tags={["Japandi", "Minimalisme"]}
              image="https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=800&q=80"
            />

            <ContentCard
              title="Kleurpsychologie in je interieur"
              excerpt="Hoe kleuren je stemming beïnvloeden en welke tinten het beste werken in verschillende ruimtes. Van kalmerend blauw tot energiek geel, ontdek de wetenschap achter kleurkeuzes en leer hoe je dit toepast in je eigen huis."
              href="/artikels/kleurpsychologie"
              type="article"
              category="Kleur"
              publishedAt="11 januari 2026"
              readingTime={6}
              tags={["Kleur", "Psychologie"]}
              size="large"
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
            />

            {/* Ad slot */}
            <AdSlot position="listing-inline" />

            <ContentCard
              title="Maximalistisch maar niet chaotisch"
              excerpt="Tips om met veel kleur, patroon en textuur te werken zonder dat het overweldigend wordt."
              href="/artikels/maximalistisch"
              type="article"
              category="Stijlen"
              publishedAt="9 januari 2026"
              readingTime={6}
              image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
            />

            <ContentCard
              title="Vintage meubels stijlvol integreren"
              excerpt="Hoe je vintage vondsten combineert met moderne elementen voor een eclectische maar coherente look."
              href="/artikels/vintage-modern"
              type="article"
              category="Styling"
              publishedAt="7 januari 2026"
              readingTime={7}
              image="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80"
            />

            <ContentCard
              title="Biophilic design: Natuur naar binnen halen"
              excerpt="Meer dan planten alleen. Ontdek hoe je je verbinding met de natuur versterkt door design."
              href="/artikels/biophilic-design"
              type="article"
              category="Trends"
              publishedAt="5 januari 2026"
              readingTime={9}
              image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
