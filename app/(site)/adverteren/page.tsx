import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Adverteren op interieur.expert — Bereik jouw doelgroep",
  description:
    "Bereik een geëngageerd publiek van interieurliefhebbers. Ontdek onze advertentiemogelijkheden en target specifieke categorieën en onderwerpen.",
};

export default function AdverterenPage() {
  return (
    <Container>
      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Adverteren op interieur.expert
            </h1>
            <p className="text-xl text-text/70">
              Bereik een geëngageerd publiek van interieurliefhebbers en
              professionals die actief op zoek zijn naar inspiratie, advies en
              producten.
            </p>
          </div>

          {/* Why Advertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Waarom adverteren bij ons?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background-light p-6 rounded-lg">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-semibold mb-2">
                  Gerichte doelgroep
                </h3>
                <p className="text-text/70">
                  Bereik mensen die actief op zoek zijn naar interieurproducten
                  en -diensten.
                </p>
              </div>
              <div className="bg-background-light p-6 rounded-lg">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-xl font-semibold mb-2">
                  Kwalitatief verkeer
                </h3>
                <p className="text-text/70">
                  Lezers die tijd besteden aan onze uitgebreide artikelen en
                  video's.
                </p>
              </div>
              <div className="bg-background-light p-6 rounded-lg">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="text-xl font-semibold mb-2">
                  Flexibele targeting
                </h3>
                <p className="text-text/70">
                  Target specifieke categorieën of onderwerpen die bij jouw
                  product passen.
                </p>
              </div>
            </div>
          </div>

          {/* Ad Slots */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Advertentieposities</h2>
            <p className="text-lg text-text/70 mb-8">
              Wij bieden drie strategische advertentieposities, elk met unieke
              voordelen:
            </p>

            <div className="space-y-8">
              {/* Listing Inline */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-2xl font-bold mb-3">
                  Listing Inline (Premium)
                </h3>
                <p className="text-text/70 mb-4">
                  Jouw advertentie verschijnt tussen content cards op
                  overzichtspagina's zoals de homepage en categoriepagina's.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-text">Locatie:</strong>
                    <p className="text-text/70">
                      Homepage, Inspiratie, Advies, Trends
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Visibility:</strong>
                    <p className="text-text/70">
                      Zeer hoog — prime positie tussen content
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Formaat:</strong>
                    <p className="text-text/70">
                      Card-formaat (800×600px aanbevolen)
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Beste voor:</strong>
                    <p className="text-text/70">
                      Brand awareness, productlanceringen, campagnes
                    </p>
                  </div>
                </div>
              </div>

              {/* Article Inline */}
              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-2xl font-bold mb-3">Article Inline</h3>
                <p className="text-text/70 mb-4">
                  Jouw advertentie wordt getoond binnen artikelen, strategisch
                  geplaatst tussen paragrafen voor maximale aandacht.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-text">Locatie:</strong>
                    <p className="text-text/70">
                      Binnen alle artikelpagina's
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Visibility:</strong>
                    <p className="text-text/70">
                      Hoog — zichtbaar tijdens lezen
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Formaat:</strong>
                    <p className="text-text/70">
                      Full-width (1200×400px aanbevolen)
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Beste voor:</strong>
                    <p className="text-text/70">
                      Contextual ads, gerelateerde producten
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="border-l-4 border-text/30 pl-6">
                <h3 className="text-2xl font-bold mb-3">Sidebar (Desktop)</h3>
                <p className="text-text/70 mb-4">
                  Een vaste positie in de sidebar, altijd zichtbaar tijdens
                  scrollen op desktop.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-text">Locatie:</strong>
                    <p className="text-text/70">Rechter sidebar (desktop)</p>
                  </div>
                  <div>
                    <strong className="text-text">Visibility:</strong>
                    <p className="text-text/70">
                      Altijd zichtbaar tijdens scrollen
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Formaat:</strong>
                    <p className="text-text/70">
                      Verticaal (300×600px aanbevolen)
                    </p>
                  </div>
                  <div>
                    <strong className="text-text">Beste voor:</strong>
                    <p className="text-text/70">
                      Long-tail campagnes, consistente aanwezigheid
                    </p>
                  </div>
                </div>
                <p className="text-sm text-text/60 mt-3 italic">
                  Let op: Sidebar advertenties zijn alleen zichtbaar op
                  desktop. Op mobiel wordt geen sidebar getoond.
                </p>
              </div>
            </div>
          </div>

          {/* Ad Formats */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Advertentieformaten</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  🖼️ Image Advertenties
                </h3>
                <p className="text-text/70 mb-4">
                  Upload een afbeelding met een link naar jouw website of
                  landingspagina.
                </p>
                <ul className="space-y-2 text-sm text-text/70">
                  <li>✓ Eenvoudig te beheren</li>
                  <li>✓ Snelle laadtijd</li>
                  <li>✓ Formaten: JPG, PNG (max 2MB)</li>
                  <li>✓ Automatische optimalisatie</li>
                </ul>
              </div>
              <div className="bg-background-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  💻 HTML Advertenties
                </h3>
                <p className="text-text/70 mb-4">
                  Voor geavanceerde campagnes: gebruik HTML/JavaScript code
                  (bijv. Google Ads).
                </p>
                <ul className="space-y-2 text-sm text-text/70">
                  <li>✓ Volledige controle</li>
                  <li>✓ Interactieve elementen</li>
                  <li>✓ Google AdSense integratie</li>
                  <li>✓ A/B testing mogelijk</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Targeting Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Targeting Opties</h2>
            <p className="text-lg text-text/70 mb-6">
              Verhoog de effectiviteit van je campagne door specifiek te
              targeten op relevante content:
            </p>

            <div className="space-y-6">
              <div className="bg-background-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  📁 Categorie Targeting
                </h3>
                <p className="text-text/70 mb-3">
                  Toon je advertentie alleen op pagina's binnen een specifieke
                  categorie:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    Inspiratie
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    Advies
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    Trends
                  </span>
                </div>
                <p className="text-sm text-text/60 mt-3">
                  Voorbeeld: Verlichting-advertentie alleen bij artikelen in
                  categorie "Advies"
                </p>
              </div>

              <div className="bg-background-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">🏷️ Tag Targeting</h3>
                <p className="text-text/70 mb-3">
                  Nog specifieker: target op specifieke onderwerpen via tags:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    verlichting
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    minimalisme
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    DIY
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    budget
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    kleine ruimte
                  </span>
                </div>
                <p className="text-sm text-text/60 mt-3">
                  Voorbeeld: Meubel-advertentie alleen bij artikelen met tags
                  "minimalisme" of "scandinavisch"
                </p>
              </div>

              <div className="bg-background-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  🌐 Geen Targeting (Maximaal Bereik)
                </h3>
                <p className="text-text/70">
                  Laat targeting leeg om je advertentie op alle pagina's te
                  tonen voor maximaal bereik. Ideaal voor algemene producten of
                  brand awareness campagnes.
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Management */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Campagne Management</h2>
            <div className="bg-background-light p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Flexibel en gebruiksvriendelijk
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">📅 Planning</h4>
                  <p className="text-text/70 text-sm">
                    Stel start- en einddatum in. Campagnes starten en stoppen
                    automatisch.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⏸️ Pauzeren</h4>
                  <p className="text-text/70 text-sm">
                    Pauzeer campagnes tijdelijk zonder ze te verwijderen.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔄 Realtime Updates</h4>
                  <p className="text-text/70 text-sm">
                    Wijzigingen zijn direct zichtbaar op de website.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📊 Prioriteit Systeem</h4>
                  <p className="text-text/70 text-sm">
                    Bij meerdere campagnes voor dezelfde positie: hogere
                    prioriteit = vaker getoond.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Contact */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Tarieven & Contact</h2>
            <div className="bg-primary/5 border-2 border-primary p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Interesse in adverteren?
              </h3>
              <p className="text-lg text-text/70 mb-6">
                Neem contact met ons op voor een vrijblijvend gesprek over de
                mogelijkheden en tarieven. We denken graag met je mee over de
                beste strategie voor jouw merk.
              </p>
              <div className="space-y-3">
                <div>
                  <strong className="text-text">Email:</strong>
                  <a
                    href="mailto:adverteren@interieur.expert"
                    className="text-primary hover:underline ml-2"
                  >
                    adverteren@interieur.expert
                  </a>
                </div>
                <div>
                  <strong className="text-text">Of gebruik het:</strong>
                  <a
                    href="/contact"
                    className="text-primary hover:underline ml-2"
                  >
                    Contactformulier →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Links for Partners */}
          <div className="mb-16 bg-blue-50 border border-blue-200 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📚 Documentatie voor Partners</h2>
            <p className="text-text/70 mb-6">
              Ben je al partner of wil je meer details over onze advertising mogelijkheden? 
              Download onze uitgebreide handleidingen:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://github.com/dk-vision/interieur.expert/blob/main/ADVERTISING-GUIDE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-blue-300 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-3xl">💼</div>
                <div>
                  <div className="font-semibold text-lg">Advertising Guide</div>
                  <div className="text-sm text-text/70">
                    Display ads, sponsored content, pricing & voorbeelden
                  </div>
                </div>
              </a>
              <a
                href="https://github.com/dk-vision/interieur.expert/blob/main/HANDLEIDING-REDACTIE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-blue-300 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-3xl">✍️</div>
                <div>
                  <div className="font-semibold text-lg">Redactie Handleiding</div>
                  <div className="text-sm text-text/70">
                    CMS handleiding voor content makers
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Samengevat: Waarom interieur.expert?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">Doelgroep</h3>
                <p className="text-sm text-text/70">
                  Interieurliefhebbers met koopintentie
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="font-semibold mb-2">Flexibel</h3>
                <p className="text-sm text-text/70">
                  Target, pauzeer, pas aan wanneer je wilt
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-semibold mb-2">Effectief</h3>
                <p className="text-sm text-text/70">
                  Adverteer precies daar waar het telt
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-semibold mb-2">Professioneel</h3>
                <p className="text-sm text-text/70">
                  Kwalitatief platform met engaged lezers
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
