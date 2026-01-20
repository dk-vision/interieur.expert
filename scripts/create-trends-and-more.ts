import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: Math.random().toString(36).substring(7),
  text,
  marks: marks.length > 0 ? marks : undefined,
});

const block = (children: any[], style = "normal", markDefs: any[] = []) => ({
  _type: "block",
  _key: Math.random().toString(36).substring(7),
  style,
  children,
  markDefs: markDefs.length > 0 ? markDefs : undefined,
});

const quote = (text: string) => block([span(text)], "blockquote");

const linkMark = (articleId: string) => {
  const key = Math.random().toString(36).substring(7);
  return {
    def: {
      _key: key,
      _type: "internalArticleLink",
      reference: { _type: "reference", _ref: articleId },
    },
    key,
  };
};

async function getArticleId(slug: string) {
  return await client.fetch(
    `*[_type == 'article' && slug.current == $slug][0]._id`,
    { slug }
  );
}

const finalArticles = [
  {
    title: "Interieurtrends 2026: wat blijft en wat verdwijnt",
    slug: "trends-2026",
    excerpt: "Welke interieurtrends van 2026 zijn het waard om te volgen en welke verdwijnen weer snel? Een eerlijke analyse.",
    category: "trends",
    tags: ["trends", "2026", "interieur-tips"],
    author: "Sophie van der Berg",
    seoTitle: "Interieurtrends 2026: ambacht, textuur en duurzaamheid",
    seoDescription: "De grootste interieurtrends van 2026: terugkeer naar ambacht, natuurlijke texturen en bewust consumeren. Wat blijft en wat verdwijnt.",
    content: async () => {
      const materialenId = await getArticleId("natuurlijke-materialen");
      const japandiId = await getArticleId("japandi-stijl");
      
      const materialenLink = materialenId ? linkMark(materialenId) : null;
      const japandiLink = japandiId ? linkMark(japandiId) : null;

      return [
        block([
          span("Interieurtrends komen en gaan, maar 2026 markeert een duidelijke verschuiving. Weg van massa-productie en perfectie, terug naar "),
          span("ambacht", ["strong"]),
          span(", "),
          span("textuur", ["strong"]),
          span(" en bewust consumeren. Dit zijn de trends die blijven - en die je kunt negeren."),
        ]),
        block([span("Trend 1: ambachtelijk werk wint van perfectie")], "h2"),
        block([
          span("Massaproductie raakt uitgewerkt. Mensen zoeken unieke stukken met verhaal. Handgemaakte keramiek met kleine onregelmatigheden, gevlochten manden met zichtbare structuur, houten meubels met natuurlijke nerven. "),
          span("Ambacht", ["strong"]),
          span(" is geen trend - het is een correctie op jaren van identieke IKEA-interieurs."),
        ]),
        quote("De trend van 2026 is niet nieuw - het is een terugkeer naar echte vakmanschap."),
        block([span("Trend 2: textuur boven kleur")], "h2"),
        block([
          span("Felle kleuren maken plaats voor neutrale tinten met rijke "),
          span("textuur", ["strong"]),
          span(". Ruw linnen naast glad keramiek. Gebreide plaids op leren banken. Gevlochten rotan bij strakke muren. Textuur creëert interesse zonder visuele rommel. Deze trend sluit perfect aan bij "),
          ...(materialenLink ? [span("natuurlijke materialen", [materialenLink.key])] : [span("natuurlijke materialen")]),
          span("."),
        ], "normal", materialenLink ? [materialenLink.def] : []),
        block([span("Trend 3: curves en organische vormen")], "h2"),
        block([
          span("Strakke rechte lijnen worden zachter. Ronde tafels, gebogen banken, organische vazen. Deze vormen voelen menselijk en uitnodigend. Bonus: ronde meubels nemen minder visuele ruimte in en werken goed in kleine ruimtes."),
        ]),
        block([span("Trend 4: groen als basiskleur")], "h2"),
        block([
          span("Niet felgroen, maar zachte tinten: olijf, salie, mosgroen. Groen verbindt binnen met buiten en geeft rust zonder saai te worden. Combineer met hout en natuursteen voor een tijdloos palet. Deze kleur werkt in elke ruimte."),
        ]),
        block([span("Trend 5: duurzaamheid wordt standaard")], "h2"),
        block([
          span("Niet langer een niche, maar verwacht. Gerecycled hout, tweedehands meubels, lokaal geproduceerd. Mensen vragen naar herkomst en impact. Duurzaam is niet duurder - het is slimmer. Kwaliteit boven kwantiteit."),
        ]),
        block([span("Trend 6: warme minimalisme")], "h2"),
        block([
          span("Koud wit minimalisme is voorbij. Warme neutrale tinten (beige, zand, terracotta) combineren met minimale inrichting. Minder spullen, maar wat er is voelt warm en uitnodigend. Perfect voor wie rust wil zonder steriliteit."),
        ]),
        block([span("Wat verdwijnt (gelukkig)")], "h2"),
        block([span("• All-white interieurs: steriel en onpraktisch")]),
        block([span("• Fast furniture: goedkoop spul dat na 2 jaar kapot is")]),
        block([span("• Grijze monotonie: grijs-op-grijs-op-grijs is deprimerend")]),
        block([span("• Perfectie: gelikt magazine-look zonder persoonlijkheid")]),
        block([span("• Industrieel als standaard: beton en staal zijn koud")]),
        block([span("Hoe pas je trends toe zonder te overdrijven?")], "h2"),
        block([
          span("Kies één trend als basis, niet alle vijf. Bijvoorbeeld: focus op textuur via kussens, kleden en gordijnen. Of ga voor ambachtelijk via één handgemaakt meubel als eyecatcher. Trends zijn inspiratie, geen diktat."),
        ]),
        block([span("Tijdloze basis + trendy accenten")], "h2"),
        block([
          span("Investeer in tijdloze meubels (neutrale bank, houten tafel). Voeg trends toe via kleine dingen: kussens in mosgroen, handgemaakte vaas, gevlochten mand. Als de trend voorbij is, vervang je alleen de accenten."),
        ]),
        block([span("Kijk naar Japandi voor inspiratie")], "h2"),
        block([
          ...(japandiLink ? [
            span("Japandi", [japandiLink.key]),
            span(" combineert alle 2026-trends: ambacht, natuurlijke materialen, rustige kleuren, functionaliteit. Het is geen nieuwe trend maar een bewezen stijl die elke trend overleeft."),
          ] : [
            span("Japandi combineert alle 2026-trends: ambacht, natuurlijke materialen, rustige kleuren, functionaliteit. Het is geen nieuwe trend maar een bewezen stijl die elke trend overleeft."),
          ]),
        ], "normal", japandiLink ? [japandiLink.def] : []),
        block([span("Praktische tips")], "h2"),
        block([span("• Koop lokaal bij ambachtslieden (Marktplaats, lokale markten)")]),
        block([span("• Mix texturen in neutrale tinten voor rijkdom zonder rommel")]),
        block([span("• Kies ronde vormen waar mogelijk (tafel, spiegel, vazen)")]),
        block([span("• Test groen via kussens voor je muren schildert")]),
        block([span("• Investeer in kwaliteit, vermijd fast furniture")]),
        block([
          span("Trends zijn nuttig als inspiratie, niet als regel. Neem wat past bij jouw leven en negeer de rest. Het beste interieur in 2026 is het interieur dat jou blij maakt - niet wat Instagram dicteert."),
        ]),
      ];
    },
  },
  {
    title: "Vloeren vergelijken: hout, tegel, vinyl of beton?",
    slug: "vloeren",
    excerpt: "Houten parket, tegels, vinyl of beton? Elk vloertype heeft voor- en nadelen. Ontdek welke vloer past bij jouw situatie.",
    category: "advies",
    tags: ["vloeren", "materialen", "renovatie"],
    author: "Sophie van der Berg",
    seoTitle: "Vloeren vergelijken: hout, tegel, vinyl of beton kiezen",
    seoDescription: "Complete vergelijking van vloertypen: houten parket, tegels, vinyl en beton. Kosten, onderhoud, duurzaamheid en look.",
    content: async () => [
      block([
        span("Je "),
        span("vloer", ["strong"]),
        span(" is het fundament van je interieur - letterlijk. Een verkeerde keuze zie je tien jaar elke dag. "),
        span("Hout", ["strong"]),
        span(", tegel, vinyl of beton? Elk heeft voor- en nadelen. Dit is wat je moet weten."),
      ]),
      block([span("Houten parket: de klassieker")], "h2"),
      block([
        span("Voor:")]),
        block([span("• Warm en natuurlijk - voelt prettig aan voeten")]),
        block([span("• Verhoogt woningwaarde")]),
        block([span("• Kan meerdere keren geschuurd worden (levensduur 50+ jaar)")]),
        block([span("• Tijdloos - past bij elke stijl")]),
      block([span("Tegen:")]),
      block([span("• Duurder (€40-120 per m²)")]),
      block([span("• Gevoelig voor vocht (niet voor badkamers)")]),
      block([span("• Krast (maar dat geeft patina)")]),
      block([span("• Vraagt onderhoud (oliën/lakken)")]),
      quote("Je vloer is het fundament van je interieur - letterlijk en figuurlijk."),
      block([span("Tegelvloer: robuust en veelzijdig")], "h2"),
      block([span("Voor:")]),
      block([span("• Extreem duurzaam (levensduur 50+ jaar)")]),
      block([span("• Waterbestendig (perfect voor badkamers, keukens)")]),
      block([span("• Weinig onderhoud (dweilen is genoeg)")]),
      block([span("• Vloerverwarming werkt optimaal")]),
      block([span("Tegen:")]),
      block([span("• Koud en hard (onprettig blootsvoets)")]),
      block([span("• Duur (€30-100 per m²)")]),
      block([span("• Geluid draagt (echo in grote ruimtes)")]),
      block([span("• Arbeidsintensief leggen")]),
      block([span("Vinyl (PVC/LVT): praktische middenweg")], "h2"),
      block([span("Voor:")]),
      block([span("• Goedkoop (€15-50 per m²)")]),
      block([span("• Waterbestendig")]),
      block([span("• Makkelijk zelf te leggen (klik-systeem)")]),
      block([span("• Zachter dan tegel (prettiger op voeten)")]),
      block([span("• Verkrijgbaar in hout/tegel look")]),
      block([span("Tegen:")]),
      block([span("• Kunstmatig (geen echte textuur)")]),
      block([span("• Korter meegaand (10-20 jaar)")]),
      block([span("• Verlaagt mogelijk woningwaarde")]),
      block([span("• Kan verkleuren in zonlicht")]),
      block([span("Betonvloer: industrieel en minimaal")], "h2"),
      block([span("Voor:")]),
      block([span("• Modern en strak")]),
      block([span("• Naadloos (geen voegen)")]),
      block([span("• Duurzaam (levensduur 30+ jaar)")]),
      block([span("• Vloerverwarming ideaal")]),
      block([span("• Weinig onderhoud")]),
      block([span("Tegen:")]),
      block([span("• Duur (€60-150 per m² gepolijst)")]),
      block([span("• Koud en hard")]),
      block([span("• Kan scheurtjes krijgen")]),
      block([span("• Niet voor iedereen mooi")]),
      block([span("• Professioneel aanbrengen nodig")]),
      block([span("Welke vloer per ruimte?")], "h2"),
      block([span("Woonkamer:")]),
      block([span("• Beste: houten parket (warmte, comfort)")]),
      block([span("• Budget: vinyl in houtlook")]),
      block([span("• Modern: betonlook tegel")]),
      block([span("Keuken:")]),
      block([span("• Beste: tegel (waterbestendig, duurzaam)")]),
      block([span("• Budget: vinyl (waterdicht, makkelijk)")]),
      block([span("• Warm: hout maar met risico op vlekken")]),
      block([span("Badkamer:")]),
      block([span("• Beste: tegel (waterbestendig, hygiënisch)")]),
      block([span("• Budget: waterdicht vinyl")]),
      block([span("• NOOIT: echt hout (vocht verwoest het)")]),
      block([span("Slaapkamer:")]),
      block([span("• Beste: hout (warm, comfortabel blootsvoets)")]),
      block([span("• Budget: vinyl in houtlook")]),
      block([span("• Alternatief: tapijt voor extra warmte")]),
      block([span("Hal/gang:")]),
      block([span("• Beste: tegel (slijtvast, makkelijk schoon)")]),
      block([span("• Budget: robuust vinyl")]),
      block([span("• Vermijd: licht hout (vuil is zichtbaar)")]),
      block([span("Kosten vergelijking (per m² inclusief leggen)")], "h2"),
      block([span("• Massief parket: €70-150")]),
      block([span("• Lamel parket: €40-80")]),
      block([span("• Tegels: €50-120")]),
      block([span("• Vinyl klik: €25-60")]),
      block([span("• Gepolijst beton: €80-180")]),
      block([span("Levensduur en onderhoud")], "h2"),
      block([span("Parket:")]),
      block([span("• Levensduur: 50+ jaar (met onderhoud)")]),
      block([span("• Onderhoud: jaarlijks oliën/lakken, schuren elke 10-15 jaar")]),
      block([span("Tegels:")]),
      block([span("• Levensduur: 50+ jaar")]),
      block([span("• Onderhoud: dweilen, voegen reinigen")]),
      block([span("Vinyl:")]),
      block([span("• Levensduur: 10-20 jaar")]),
      block([span("• Onderhoud: dweilen")]),
      block([span("Beton:")]),
      block([span("• Levensduur: 30+ jaar")]),
      block([span("• Onderhoud: sealen elke 2-3 jaar, dweilen")]),
      block([span("Praktische tips")], "h2"),
      block([span("• Test staaltjes in je ruimte (licht verandert kleur)")]),
      block([span("• Bereken 10% extra voor snijverlies")]),
      block([span("• Leg vloer voor je meubels plaatst")]),
      block([span("• Overweeg vloerverwarming bij tegel/beton")]),
      block([span("• Vraag garantie bij professionele leggen")]),
      block([
        span("De perfecte vloer bestaat niet - alleen de vloer die past bij jouw budget, stijl en levenssituatie. Heb je kinderen? Vinyl is praktisch. Wil je tijdloos? Kies hout. Modern en minimaal? Beton. Elke keuze is goed als hij bewust is."),
      ]),
    ],
  },
];

async function createFinalBatch() {
  console.log("\n✍️  CREATING FINAL BATCH\n");

  for (const article of finalArticles) {
    const body = await article.content();

    await client.create({
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags,
      author: article.author,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      body,
      publishedAt: new Date().toISOString(),
    });

    console.log(`  ✅ ${article.title}`);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Created ${finalArticles.length} articles`);
  console.log(`${"=".repeat(60)}\n`);
}

createFinalBatch();
