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
      <Section spacing="sm" className="!pt-0">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                  {/* 3-col grid for more visual variety - dossiers are collections */}
                  {dossiers.map((dossier) => (
                    <ContentCard
                      key={dossier.href}
                      {...dossier}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80">
              <div className="lg:!sticky lg:top-8">
                <AdSlot position="listing-sidebar" />
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
