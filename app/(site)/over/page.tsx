import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";

export default function OverPage() {
  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Over interieur.expert
            </h1>
            <p className="text-xl text-text/70 leading-relaxed">
              Eerlijk advies, inspiratie en trends voor een interieur dat bij je
              past. Zonder poespas, met respect voor vakmanschap en duurzaamheid.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section spacing="md">
        <Container size="content">
          <ContentWrapper>
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-text prose-p:text-text prose-p:leading-relaxed">
              <h2>Wat we doen</h2>

              <p>
                interieur.expert is een editorial platform voor iedereen die houdt
                van goed interieurontwerp. We geloven dat een goed interieur niet
                per se duur of ingewikkeld hoeft te zijn, maar wel doordacht en
                eerlijk.
              </p>

              <p>
                Onze missie is simpel: inspireren, informeren en adviseren. We
                schrijven over materialen, kleuren, licht en ruimte. We duiken in
                trends, maar zonder te vervallen in hypes. We praten met makers,
                ontwerpers en bewoners die hun huis hebben getransformeerd.
              </p>

              <h2>Onze aanpak</h2>

              <p>
                We kiezen voor diepgang boven snelheid. Elk artikel is grondig
                uitgewerkt, met aandacht voor praktische bruikbaarheid. We testen
                niet alleen wat werkt, maar leggen ook uit waaróm het werkt.
              </p>

              <p>
                Onze video&apos;s geven je een blik in echte huizen, met echte
                verhalen. Geen geënsceneerde perfectie, maar authentieke interieurs
                van mensen die bewust hebben gekozen voor hun inrichting.
              </p>

              <h2>Transparantie</h2>

              <p>
                We werken met geselecteerde partners die passen bij onze waarden:
                kwaliteit, duurzaamheid en vakmanschap. Gesponsorde content is
                altijd duidelijk gelabeld en blijft onderworpen aan onze
                redactionele standaarden.
              </p>

              <p>
                Onze redactie blijft onafhankelijk. Commerciële samenwerking
                beïnvloedt nooit onze mening of de keuze van onze onderwerpen.
              </p>

              <h2>Ons team</h2>

              <p>
                interieur.expert wordt gemaakt door een team van interieurliefhebbers,
                schrijvers en makers. Sommigen hebben een achtergrond in design,
                anderen in journalistiek of ambacht. Wat ons bindt is de passie
                voor goed interieur en het verlangen om die passie te delen.
              </p>

              <h2>Contact</h2>

              <p>
                Heb je vragen, suggesties of wil je samenwerken? We horen graag van
                je. Bezoek onze{" "}
                <a href="/contact" className="text-accent hover:underline">
                  contactpagina
                </a>{" "}
                of stuur ons een bericht.
              </p>
            </div>
          </ContentWrapper>
        </Container>
      </Section>

      {/* Values Section */}
      <Section spacing="lg" background="accent">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-text">Eerlijk</h3>
              <p className="text-text/70 leading-relaxed">
                We vertellen het zoals het is. Geen verborgen agenda&apos;s, geen
                misleidende claims. Gesponsorde content is altijd duidelijk
                gelabeld.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-text">Toegankelijk</h3>
              <p className="text-text/70 leading-relaxed">
                Goed interieurontwerp is voor iedereen. We schrijven begrijpelijk,
                zonder jargon, en geven praktische tips die echt werken.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-text">Duurzaam</h3>
              <p className="text-text/70 leading-relaxed">
                We kiezen voor kwaliteit en vakmanschap. Voor meubels die een
                leven lang meegaan. Voor materialen die respectvol zijn voor mens
                en milieu.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
