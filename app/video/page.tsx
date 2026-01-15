import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";

export default function VideoPage() {
  return (
    <div>
      {/* Header */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Video&apos;s
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Inspirerende interieur tours, praktische DIY-projecten en advies van experts.
            </p>
          </div>
        </Container>
      </Section>

      {/* Video Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <ContentCard
              title="Interieur tour: Modern landelijk in Utrecht"
              excerpt="Bekijk hoe Sarah haar jaren '30 huis transformeerde naar een moderne landelijke stijl met respect voor originele details. Van keuken tot badkamer, een complete rondleiding door haar zorgvuldig gerenoveerde woning."
              href="/video/tour-utrecht"
              type="video"
              category="Tours"
              publishedAt="11 januari 2026"
              readingTime={15}
              size="large"
              image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
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

            {/* Ad slot after 3rd video */}
            <AdSlot position="listing-inline" />

            <ContentCard
              title="Voor en na: Compacte stadskeuken"
              excerpt="Transformatie van een kleine keuken van 6m² naar een functionele en stijlvolle ruimte. Zie hoe slimme opbergoplossingen, kleurgebruik en materiaalkeuze een kleine ruimte groter en luchtiger maken."
              href="/video/stadskeuken"
              type="video"
              category="Voor & Na"
              publishedAt="29 december 2025"
              readingTime={18}
              size="large"
              image="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80"
            />

            <ContentCard
              title="Materialen vergelijken: Hout vs Composiet"
              excerpt="Wat zijn de echte voor- en nadelen van natuurlijk hout versus composiet materialen?"
              href="/video/materialen-vergelijken"
              type="video"
              category="Advies"
              publishedAt="25 december 2025"
              readingTime={14}
              isSponsored={true}
              partnerName="TimberTech"
              partnerUrl="https://timbertech.example"
              image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
            />

            <ContentCard
              title="Styling tips voor een knusse leeshoek"
              excerpt="Creëer de perfecte plek om te ontspannen met een boek. Advies over verlichting, zitcomfort en sfeer."
              href="/video/leeshoek"
              type="video"
              category="Styling"
              publishedAt="21 december 2025"
              readingTime={10}
              image="https://images.unsplash.com/photo-1615876063052-0534733c35b6?w=800&q=80"
            />

            <ContentCard
              title="Tour: Minimalistisch appartement in Amsterdam"
              excerpt="Monique laat zien hoe ze op 55m² een rustig en licht interieur creëerde met slimme opbergoplossingen."
              href="/video/minimalistisch-amsterdam"
              type="video"
              category="Tours"
              publishedAt="18 december 2025"
              readingTime={16}
              image="https://images.unsplash.com/photo-1615874694520-474822394e73?w=800&q=80"
            />

            <ContentCard
              title="DIY: Betonnen plantenbakken gieten"
              excerpt="Maak zelf unieke betonnen plantenbakken voor binnen en buiten. Geen speciale gereedschap nodig."
              href="/video/diy-plantenbakken"
              type="video"
              category="DIY"
              publishedAt="15 december 2025"
              readingTime={20}
              image="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80"
            />

            <ContentCard
              title="Gordijnen en raamdecoratie kiezen"
              excerpt="Expert advies over het kiezen van de juiste raamdecoratie voor functie én esthetiek."
              href="/video/raamdecoratie"
              type="video"
              category="Advies"
              publishedAt="12 december 2025"
              readingTime={13}
              image="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=800&q=80"
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
