import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import ArticleBody from "@/components/editorial/ArticleBody";
import MetaRow from "@/components/editorial/MetaRow";
import SponsoredDisclosure from "@/components/editorial/SponsoredDisclosure";
import AdSlot from "@/components/ads/AdSlot";

export default function ArtikelPage() {
  // In productie zou dit data uit CMS/database zijn
  const isSponsored = true; // Changed to true for demo
  const partnerName = "Lumina Lighting";
  const partnerUrl = "https://example.com";

  return (
    <article>
      {/* Hero */}
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-6">
            <MetaRow
              publishedAt="12 januari 2026"
              readingTime={7}
              type="article"
              isSponsored={isSponsored}
            />

            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              De kracht van natuurlijke materialen in moderne interieurs
            </h1>

            <p className="text-xl text-text/70 leading-relaxed">
              In een tijd waarin we steeds meer tijd binnenshuis doorbrengen,
              wordt de keuze voor de juiste materialen belangrijker dan ooit.
              Natuurlijke materialen brengen niet alleen warmte en karakter,
              maar ook een gevoel van rust en authenticiteit.
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

      {/* Featured Image */}
      <Section spacing="sm">
        <Container size="layout">
          <div className="aspect-[16/9] bg-accent/10 rounded-sm" />
        </Container>
      </Section>

      {/* Article Content */}
      <Section spacing="md">
        <Container size="content">
          <ContentWrapper>
            <ArticleBody>
              <h2>Waarom natuurlijke materialen?</h2>

              <p>
                Natuurlijke materialen zoals hout, steen, linnen en leer hebben
                een tijdloze uitstraling die perfect past bij zowel moderne als
                klassieke interieurs. Ze brengen textuur en diepte, zonder dat
                het opzichtig of overdreven wordt.
              </p>

              <blockquote>
                Een interieur met natuurlijke materialen voelt als thuiskomen.
                Het heeft die warme, tactiele kwaliteit die kunstmatige
                materialen simpelweg niet kunnen evenaren.
              </blockquote>

              <p>
                De voordelen gaan verder dan esthetiek. Natuurlijke materialen
                zijn vaak duurzamer, zowel in gebruik als in productie. Ze
                verouderen mooi en ontwikkelen patina, wat betekent dat ze
                eigenlijk mooier worden naarmate de tijd vordert.
              </p>

              {/* Ad slot after intro */}
              <div className="my-12">
                <AdSlot position="article-inline" />
              </div>

              <h2>Hout als basis</h2>

              <p>
                Hout blijft het meest veelzijdige natuurlijke materiaal in
                interieurontwerp. Of je nu kiest voor eiken, walnoot, of een
                zachter grenenhout, elke houtsoort brengt zijn eigen karakter:
              </p>

              <ul>
                <li>
                  <strong>Eikenhout:</strong> Robuust en tijdloos, perfect voor
                  vloeren en meubels die lang meegaan
                </li>
                <li>
                  <strong>Walnoot:</strong> Elegant en verfijnd, met een rijke
                  donkere tint die luxe uitstraalt
                </li>
                <li>
                  <strong>Grenenhout:</strong> Lichter en toegankelijker, ideaal
                  voor een Scandinavische uitstraling
                </li>
              </ul>

              <p>
                De keuze voor een specifieke houtsoort hangt af van de sfeer die
                je wilt creëren. Donker hout voegt drama toe, licht hout opent
                de ruimte. Maar ongeacht de keuze, hout brengt altijd warmte.
              </p>

              <h2>Steen en beton</h2>

              <p>
                Waar hout warmte brengt, voegen steen en beton kracht en
                karakter toe. Een marmeren werkblad in de keuken, een betonnen
                vloer, of een natuurstenen wand in de badkamer—deze elementen
                geven een interieur direct meer gewicht en substantie.
              </p>

              <p>
                Het mooie van deze materialen is hun eerlijkheid. Ze zijn wat ze
                zijn, zonder pretenties. En juist die directheid maakt ze zo
                krachtig in modern design.
              </p>

              <h2>Textiel en zachte materialen</h2>

              <p>
                Een goed interieur heeft balans nodig. Naast de hardere
                materialen zijn zachte texturen essentieel: linnen gordijnen,
                wollen kleden, leren banken. Deze materialen maken een ruimte
                leefbaar en comfortabel.
              </p>

              <ol>
                <li>Begin met een basis van neutrale tinten</li>
                <li>Voeg verschillende texturen toe in natuurlijke materialen</li>
                <li>Laat materialen voor zichzelf spreken, zonder teveel accessoires</li>
              </ol>

              <h2>Duurzaamheid en onderhoud</h2>

              <p>
                Een veelgestelde vraag is of natuurlijke materialen meer
                onderhoud vragen. Het antwoord: ja en nee. Ze vragen aandacht,
                maar geen intensief onderhoud. Een houten vloer moet af en toe
                behandeld worden, een stenen werkblad moet geïmpregneerd worden.
              </p>

              <p>
                Maar dit onderhoud is onderdeel van de charme. Het houdt je
                verbonden met je interieur, met de materialen waar je mee leeft.
                En het resultaat—een interieur dat meebeweegt, dat patina
                ontwikkelt, dat écht wordt—is alle moeite waard.
              </p>

              <h2>Praktische tips</h2>

              <p>
                Als je overweegt om meer natuurlijke materialen in je interieur
                te gebruiken, begin dan klein. Een houten bijzettafel, een
                stenen vaas, een linnen kussen. Voel hoe deze materialen je
                ruimte veranderen.
              </p>

              <p>
                Let bij de aankoop op de herkomst. FSC-gecertificeerd hout,
                lokaal gewonnen steen, biologisch linnen—het maakt een verschil,
                niet alleen voor het milieu, maar ook voor de kwaliteit.
              </p>

              <p>
                En vergeet niet: natuurlijke materialen hoeven niet perfect te
                zijn. Die knoop in het hout, die onregelmatigheid in de steen—
                dat zijn geen gebreken, maar kenmerken. Het zijn de sporen van
                de natuur, en juist die maken elk stuk uniek.
              </p>

              <h2>Tot slot</h2>

              <p>
                Het resultaat van werken met natuurlijke materialen is een
                interieur dat niet alleen mooi is om naar te kijken, maar vooral
                fijn is om in te leven. Een ruimte die ademt, die warm aanvoelt,
                die authentiek is. En dat is uiteindelijk waar het om draait:
                een huis dat echt voelt als thuis.
              </p>
            </ArticleBody>
          </ContentWrapper>
        </Container>
      </Section>

      {/* Related content could go here */}
    </article>
  );
}
