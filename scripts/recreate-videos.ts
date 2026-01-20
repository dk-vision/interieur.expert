import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function deleteOldVideos() {
  console.log("\n🗑️  DELETING OLD VIDEOS\n");
  
  const videos = await client.fetch(`*[_type == "video"]._id`);
  
  if (videos.length === 0) {
    console.log("No videos found to delete.");
    return;
  }

  for (const id of videos) {
    await client.delete(id);
  }
  
  console.log(`✅ Deleted ${videos.length} videos\n`);
}

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: Math.random().toString(36).substring(7),
  text,
  marks: marks.length > 0 ? marks : undefined,
});

const block = (children: any[], style = "normal") => ({
  _type: "block",
  _key: Math.random().toString(36).substring(7),
  style,
  children,
});

const videoArticles = [
  {
    title: "Tour door een warm minimalistisch appartement in Amsterdam",
    slug: "tour-amsterdam-minimalisme",
    excerpt: "Rondleiding door een 75m² appartement waar warm minimalisme perfect is uitgevoerd. Zie hoe eigenaren Sanne en Tim ruimte creëren met minder.",
    category: "Tours",
    tags: ["minimalisme", "appartement", "amsterdam", "tour"],
    youtubeId: "dQw4w9WgXcQ",
    duration: 14,
    publishedAt: new Date("2026-01-18").toISOString(),
    transcript: [
      block([
        span("In deze video nemen Sanne en Tim je mee door hun minimalistisch ingerichte appartement in Amsterdam-Oost. Na jaren verzamelen besloten ze drastisch op te ruimen en alleen te houden wat echt waarde toevoegt."),
      ]),
      block([span("Wat je ziet:")]),
      block([span("• Neutrale basis met warme accenten (hout, linnen, keramiek)")]),
      block([span("• Slimme opbergoplossingen (ingebouwde kasten, geen losse meubels)")]),
      block([span("• Multifunctionele ruimtes (werkkamer = logeerkamer)")]),
      block([span("• Kwaliteit boven kwantiteit (elk stuk heeft een functie)")]),
      block([
        span("De tour laat zien dat minimalisme niet koud hoeft te zijn. Door natuurlijke materialen en warme verlichting voelt het appartement uitnodigend en persoonlijk."),
      ]),
    ],
  },
  {
    title: "DIY betonlook vloer aanbrengen (step-by-step)",
    slug: "diy-betonlook-vloer",
    excerpt: "Leer hoe je zelf een betonlook vloer aanbrengt. Complete handleiding van voorbereiding tot afwerking, inclusief kosten en materialen.",
    category: "DIY",
    tags: ["diy", "vloer", "beton", "renovatie"],
    youtubeId: "dQw4w9WgXcQ",
    duration: 24,
    publishedAt: new Date("2026-01-15").toISOString(),
    transcript: [
      block([
        span("In deze DIY video laat klusjesman Mark zien hoe hij zijn woonkamer van een betonlook vloer voorzag - zonder dure aannemer. Het resultaat is professioneel en de kosten blijven onder €30 per m²."),
      ]),
      block([span("Wat je leert:")]),
      block([span("• Ondergrond voorbereiden (schoonmaken, plamuren, primer)")]),
      block([span("• Betonlook mortier aanbrengen in dunne lagen")]),
      block([span("• Glad afwerken met spaan")]),
      block([span("• Sealen voor bescherming tegen vlekken en vocht")]),
      block([span("• Veelgemaakte fouten en hoe je ze voorkomt")]),
      block([
        span("Mark werkt met het systeem van CementDesign (eigen aankoop, geen sponsoring). De video laat zien dat betonlook vloeren toegankelijk zijn voor ervaren doe-het-zelvers met geduld en oog voor detail."),
      ]),
    ],
  },
  {
    title: "Kleuradvies: neutrale kleuren slim combineren",
    slug: "video-kleuradvies-neutraal",
    excerpt: "Interieurstyliste Emma legt uit hoe je neutrale kleuren combineert zonder saai te worden. Praktische tips voor kleur, textuur en licht.",
    category: "Advies",
    tags: ["kleuren", "advies", "neutraal", "styling"],
    youtubeId: "dQw4w9WgXcQ",
    duration: 16,
    publishedAt: new Date("2026-01-12").toISOString(),
    transcript: [
      block([
        span("Interieurstyliste Emma van Studio Kleur deelt haar expertise over neutraal kleurgebruik. Grijs en beige krijgen vaak het label 'saai', maar met de juiste aanpak creëer je rijkdom zonder rommel."),
      ]),
      block([span("Emma's tips:")]),
      block([span("• Werk met tinten (warm beige tot zand tot terracotta)")]),
      block([span("• Voeg textuur toe (glad naast ruw, glimmend naast mat)")]),
      block([span("• Gebruik licht strategisch (schaduwen creëren diepte)")]),
      block([span("• Beperk kleuren maar niet materialen")]),
      block([span("• Test verf op grote stukken karton (licht verandert kleur)")]),
      block([
        span("De video bevat praktijkvoorbeelden uit Emma's projecten, inclusief vóór-en-na beelden die het verschil laten zien tussen vlak grijs en gelaagd neutraal."),
      ]),
    ],
  },
  {
    title: "Voor & na: Kleine badkamer transformatie (5m²)",
    slug: "voor-na-badkamer",
    excerpt: "Zie hoe een kleine, gedateerde badkamer van 5m² transformeerde naar een moderne, functionele ruimte. Budget: €4500 all-in.",
    category: "Voor & Na",
    tags: ["badkamer", "renovatie", "klein", "budget"],
    youtubeId: "dQw4w9WgXcQ",
    duration: 19,
    publishedAt: new Date("2026-01-08").toISOString(),
    transcript: [
      block([
        span("Laura en Jasper lieten hun kleine badkamer compleet renoveren met een budget van €4500 inclusief arbeid. Deze video toont het volledige proces en eindresultaat."),
      ]),
      block([span("Wat ze deden:")]),
      block([span("• Oude tegels eruit, nieuwe lichte tegels erin (60x60 voor minder voegen)")]),
      block([span("• Inloopdouche i.p.v. bad (creëert ruimte)")]),
      block([span("• Zwevend toilet en meubel (visueel meer vloer)")]),
      block([span("• Grote spiegel zonder lijst (verdubbelt ruimte visueel)")]),
      block([span("• Indirecte LED verlichting (zachter dan spots)")]),
      block([span("Budget breakdown:")]),
      block([span("• Materialen: €2200 (tegels, sanitair, kranen)")]),
      block([span("• Arbeid: €2000 (loodgieter + tegelzetter)")]),
      block([span("• Verlichting: €300")]),
      block([
        span("Het resultaat laat zien dat kleine ruimtes met de juiste keuzes licht, groot en luxe kunnen voelen - zonder extreem budget."),
      ]),
    ],
  },
  {
    title: "Verlichting in lagen: van saai naar sfeer",
    slug: "video-verlichting-lagen",
    excerpt: "Lichtontwerper Rob legt uit hoe je met gelaagde verlichting sfeer creëert. Van algemeen licht tot accenten, stap voor stap.",
    category: "Advies",
    tags: ["verlichting", "advies", "sfeer", "licht"],
    youtubeId: "dQw4w9WgXcQ",
    duration: 18,
    publishedAt: new Date("2026-01-05").toISOString(),
    transcript: [
      block([
        span("Lichtontwerper Rob Hendriks vertelt over de meest gemaakte fout in interieurs: één lichtbron per ruimte. De oplossing: verlichting in lagen."),
      ]),
      block([span("De drie lagen:")]),
      block([span("1. Algemene verlichting: basis (plafondlamp, spots)")]),
      block([span("2. Taakverlichting: functioneel (bureaulamp, leeslamp)")]),
      block([span("3. Accentverlichting: sfeer (tafellamp, kaarsen, LED strips)")]),
      block([span("Rob's praktische tips:")]),
      block([span("• Gebruik dimmers (flexibiliteit in sterkte)")]),
      block([span("• Kies warm wit licht (2700K) voor woonruimtes")]),
      block([span("• Combineer lichtbronnen op verschillende hoogtes")]),
      block([span("• Vermijd centrale plafondlampen als enige bron")]),
      block([span("• Test verschillende posities voor optimaal effect")]),
      block([
        span("De video bevat vóór-en-na beelden van woonkamers waar alleen de verlichting veranderde - het verschil is dramatisch."),
      ]),
    ],
  },
  {
    title: "Japandi styling: balans tussen Japans en Scandinavisch",
    slug: "video-japandi-styling",
    excerpt: "Styliste Mei laat zien hoe je Japandi stijl toepast: minimalisme met warmte, functionaliteit met schoonheid.",
    category: "Styling",
    tags: ["japandi", "styling", "minimalisme", "wabi-sabi"],
    youtubeId: "dQw4w9WgXcQ",
    duration: 15,
    publishedAt: new Date("2026-01-02").toISOString(),
    transcript: [
      block([
        span("Interieurstyliste Mei Chen, gespecialiseerd in Japandi, deelt haar aanpak voor het creëren van deze gebalanceerde stijl. Japandi combineert Japanse wabi-sabi filosofie met Scandinavisch hygge."),
      ]),
      block([span("Mei's Japandi principes:")]),
      block([span("• Minder is meer (maar niet leeg)")]),
      block([span("• Natuurlijke materialen (hout, steen, linnen, keramiek)")]),
      block([span("• Neutrale kleuren met warme ondertoon")]),
      block([span("• Ambacht waarderen (handgemaakt, imperfectie)")]),
      block([span("• Functionaliteit eerst (schoonheid volgt)")]),
      block([span("Praktische toepassing:")]),
      block([span("• Kies laag meubilair (Japanse invloed)")]),
      block([span("• Gebruik licht hout (Scandinavische invloed)")]),
      block([span("• Voeg groen toe (bonsai, bamboe, grote planten)")]),
      block([span("• Creëer rust door lege ruimte te accepteren")]),
      block([
        span("Mei stylt live een woonkamer van leeg naar Japandi, legt elke keuze uit en toont hoe minder vaak meer impact heeft."),
      ]),
    ],
  },
];

async function createNewVideos() {
  console.log("\n✍️  CREATING NEW VIDEO ARTICLES\n");

  for (const video of videoArticles) {
    await client.create({
      _type: "video",
      title: video.title,
      slug: { _type: "slug", current: video.slug },
      excerpt: video.excerpt,
      category: video.category,
      tags: video.tags,
      youtubeId: video.youtubeId,
      duration: video.duration,
      publishedAt: video.publishedAt,
      transcript: video.transcript,
      sponsored: false,
    });

    console.log(`  ✅ ${video.title}`);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Created ${videoArticles.length} videos`);
  console.log(`${"=".repeat(60)}\n`);
}

async function run() {
  await deleteOldVideos();
  await createNewVideos();
}

run();
