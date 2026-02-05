import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { getDossiers } from "@/lib/content";

export const metadata = {
  title: "Dossiers | Interieur.Expert",
  description:
    "Verdiep je in specifieke interieurthema's met onze uitgebreide dossiers. Van verlichting tot duurzaamheid, ontdek verzamelingen van gerelateerde artikelen en video's.",
};

export default async function DossiersPage() {
  const dossiers = await getDossiers();

  return (
    <div>
      {/* Header */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Dossiers
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Verzamelingen van artikelen en video&apos;s rond specifieke
              interieurthema&apos;s. Verdiep je in onderwerpen die je
              interesseren.
            </p>
          </div>
        </Container>
      </Section>

      {/* Dossiers Grid */}
      <Section spacing="lg">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1">
              {dossiers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-text/70">
                    Er zijn nog geen dossiers gepubliceerd.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {dossiers.map((dossier, index) => (
                    <ContentCard
                      key={dossier.href}
                      {...dossier}
                      size={index % 4 === 0 ? "large" : "normal"}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 space-y-8">
              <AdSlot position="sidebar" />

              {/* Categories */}
              <div className="bg-surface p-6 rounded-sm">
                <h3 className="font-semibold mb-4">Categorieën</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/dossiers?category=Verlichting"
                      className="text-text/70 hover:text-text transition-colors"
                    >
                      Verlichting
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dossiers?category=Duurzaamheid"
                      className="text-text/70 hover:text-text transition-colors"
                    >
                      Duurzaamheid
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dossiers?category=Wonen"
                      className="text-text/70 hover:text-text transition-colors"
                    >
                      Wonen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dossiers?category=Materialen"
                      className="text-text/70 hover:text-text transition-colors"
                    >
                      Materialen
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
