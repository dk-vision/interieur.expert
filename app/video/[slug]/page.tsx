import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import MetaRow from "@/components/editorial/MetaRow";
import SponsoredDisclosure from "@/components/editorial/SponsoredDisclosure";
import AdSlot from "@/components/ads/AdSlot";

export default function VideoDetailPage() {
  // In productie zou dit data uit CMS/database zijn
  const isSponsored = false;
  const partnerName = "Partner Name";
  const partnerUrl = "https://example.com";
  const youtubeId = "dQw4w9WgXcQ"; // placeholder

  return (
    <article>
      {/* Header */}
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-6">
            <MetaRow
              publishedAt="11 januari 2026"
              readingTime={15}
              type="video"
              isSponsored={isSponsored}
            />

            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Interieur tour: Modern landelijk in Utrecht
            </h1>

            <p className="text-xl text-text/70 leading-relaxed">
              Bekijk hoe Sarah haar jaren &apos;30 huis transformeerde naar een
              moderne landelijke stijl met respect voor originele details.
              Ontdek slimme oplossingen voor het combineren van oud en nieuw.
            </p>

            {isSponsored && (
              <SponsoredDisclosure
                partnerName={partnerName}
                partnerUrl={partnerUrl}
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Video Embed */}
      <Section spacing="md">
        <Container size="layout">
          <div className="aspect-video bg-text/90 rounded-sm overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </Container>
      </Section>

      {/* Transcript / Description */}
      <Section spacing="md">
        <Container size="content">
          <ContentWrapper>
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-text prose-p:text-text prose-p:leading-relaxed">
              <h2>Over deze video</h2>

              <p>
                Sarah woont met haar gezin in een karakteristieke jaren &apos;30
                woning in Utrecht. Na jaren van kleine aanpassingen besloot ze
                het huis volledig te renoveren, met als doel een moderne
                landelijke stijl die past bij het karakter van het huis.
              </p>

              <p>
                In deze video tour laat ze zien hoe ze originele details zoals
                glas-in-lood ramen, houten kozijnen en de oorspronkelijke
                plavuizenvloer heeft behouden, terwijl ze tegelijkertijd de
                ruimtes heeft gemoderniseerd met een lichte kleurenpalet en
                natuurlijke materialen.
              </p>

              <h3>Highlights uit de tour:</h3>

              <ul>
                <li>
                  Keuken: Een op maat gemaakte keuken met eiken fronten en een
                  betonnen werkblad
                </li>
                <li>
                  Woonkamer: Hoe Sarah speelt met verschillende tinten wit en
                  beige voor een rustige basis
                </li>
                <li>
                  Badkamer: Combinatie van authentieke tegels met moderne
                  sanitair
                </li>
                <li>
                  Slaapkamers: Rustgevende kleuren en natuurlijke textiel voor
                  een hotelgevoel
                </li>
              </ul>

              {/* Ad slot inline */}
              <div className="my-12">
                <AdSlot position="article-inline" />
              </div>

              <h3>Wat Sarah heeft geleerd:</h3>

              <p>
                &quot;Het belangrijkste is om het karakter van je huis te
                respecteren. Ik had een ultramodern interieur kunnen maken, maar
                dat zou niet hebben gepast bij de uitstraling van het huis. Door
                originele elementen te behouden en daar moderne accenten aan toe
                te voegen, krijg je het beste van beide werelden.&quot;
              </p>

              <h3>Praktische tips:</h3>

              <ol>
                <li>
                  Begin met de basis: vloeren en muren vormen de basis van je
                  interieur
                </li>
                <li>
                  Investeer in op maat: vooral in een oud huis zijn
                  standaardmaten vaak niet ideaal
                </li>
                <li>
                  Zoek goede vakmensen: authentieke details vragen om
                  ambachtelijk werk
                </li>
                <li>
                  Neem de tijd: haast leidt tot compromissen waar je later spijt
                  van krijgt
                </li>
              </ol>

              <h3>Producten en merken:</h3>

              <ul>
                <li>Keuken: Op maat gemaakt door lokale meubelmaker</li>
                <li>Werkblad: Beton door BetonAtelier Amsterdam</li>
                <li>Verlichting: Combinatie van Flos en vintage vondsten</li>
                <li>Textiel: Linnen van Libeco, wol van Melin Tregwynt</li>
              </ul>

              <p>
                Meer weten over Sarah&apos;s renovatie? Check haar Instagram{" "}
                <a href="#" className="text-accent hover:underline">
                  @sarahs_huis
                </a>{" "}
                waar ze het hele proces heeft gedocumenteerd.
              </p>
            </div>
          </ContentWrapper>
        </Container>
      </Section>
    </article>
  );
}
