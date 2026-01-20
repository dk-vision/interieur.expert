import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

// Helper to create span
const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: Math.random().toString(36).substring(7),
  text,
  marks: marks.length > 0 ? marks : undefined,
});

// Helper to create block
const block = (children: any[], style = "normal", markDefs: any[] = []) => ({
  _type: "block",
  _key: Math.random().toString(36).substring(7),
  style,
  children,
  markDefs: markDefs.length > 0 ? markDefs : undefined,
});

// Helper to create quote
const quote = (text: string) => block([span(text)], "blockquote");

// Helper to create internal link markDef
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

const articles = [
  {
    title: "Warm minimalisme: zo creëer je een minimalistisch interieur dat uitnodigt",
    slug: "warm-minimalisme",
    excerpt: "Minimalisme hoeft niet koud te zijn. Ontdek hoe je een opgeruimd interieur creëert dat ook gezellig en uitnodigend aanvoelt.",
    category: "inspiratie",
    tags: ["minimalisme", "interieurstijlen", "warm-wonen"],
    author: "Sophie van der Berg",
    seoTitle: "Warm minimalisme: minimalistisch interieur met gezelligheid",
    seoDescription: "Warm minimalisme combineert rust en eenvoud met warmte en persoonlijkheid. Zo creëer je een minimalistisch interieur dat uitnodigt.",
    content: async () => {
      const japandiId = await client.fetch(`*[_type == 'article' && slug.current == 'japandi-stijl'][0]._id`);
      const materialenId = await client.fetch(`*[_type == 'article' && slug.current == 'natuurlijke-materialen'][0]._id`);
      
      const japandiLink = japandiId ? linkMark(japandiId) : null;
      const materialenLink = materialenId ? linkMark(materialenId) : null;

      return [
        block([
          span("Warm "),
          span("minimalisme", ["strong"]),
          span(" bewijst dat minder meer kan zijn zonder dat je je huis koud of onpersoonlijk aanvoelt. Deze interieurstijl combineert de "),
          span("rust", ["strong"]),
          span(" en ordelijkheid van minimalisme met warmte, textuur en persoonlijkheid. Het resultaat? Een huis dat zowel opgeruimd als uitnodigend is."),
        ]),
        block([span("Van koud naar knus")], "h2"),
        block([
          span("Traditioneel minimalisme kan steriel overkomen: witte muren, hard beton, strakke lijnen. Warm "),
          span("minimalisme", ["strong"]),
          span(" behoudt de 'less is more' filosofie maar voegt lagen van comfort toe. Het draait om balans: genoeg ruimte om te ademen, maar ook genoeg elementen om je thuis te voelen."),
        ]),
        quote("In een warm minimalistisch interieur heeft elk object een reden om er te zijn."),
        block([span("De basis: neutrale kleuren met diepte")], "h2"),
        block([
          span("Vergeet wit-op-wit. Warm minimalisme werkt met een palet van zachte tinten: beige, zand, warm grijs, terracotta. Deze kleuren geven "),
          span("rust", ["strong"]),
          span(" zonder saai te worden. Voeg verschillende texturen toe in dezelfde kleur - denk aan een linnen gordijn, een wollen kleed en een katoenen kussen - en je creëert diepte zonder rommel."),
        ]),
        block([span("Materialen die warmte toevoegen")], "h2"),
        block([
          span("Hier maakt warm minimalisme het verschil. Kies voor "),
          ...(materialenLink ? [
            span("natuurlijke materialen", [materialenLink.key]),
          ] : [span("natuurlijke materialen")]),
          span(" die leven en karakter hebben: ruw hout, zachte wol, gevlochten manden, aardewerk. Deze materialen voegen visuele warmte toe en voelen prettig aan - letterlijk en figuurlijk."),
        ], "normal", materialenLink ? [materialenLink.def] : []),
        block([span("Minder spullen, meer betekenis")], "h2"),
        block([
          span("De truc is niet om alles weg te gooien, maar om bewust te kiezen. Elk object moet functie hebben of je blij maken. Een mooie vaas op tafel? Prima. Vijf decoratieve objecten die je nooit ziet? Weg ermee. Deze selectiviteit geeft ruimte - mentaal en visueel."),
        ]),
        block([span("Licht en ruimte")], "h2"),
        block([
          span("Warm minimalisme houdt van daglicht. Houd ramen vrij of gebruik lichte, doorschijnende gordijnen. Voeg verlichting toe die sfeer creëert: een staande lamp naast de bank, een hanglamp boven de eettafel. Vermijd te veel spotjes - die maken een ruimte harder."),
        ]),
        block([span("Persoonlijkheid zonder rommel")], "h2"),
        block([
          span("Je huis mag persoonlijk zijn zonder vol te staan. Kies één of twee eyecatchers per ruimte: een kunstwerk, een vintage stoel, een bijzonder kleed. Laat deze stukken de aandacht trekken. De rest blijft rustig en ondersteunend."),
        ]),
        block([span("Praktische tips")], "h2"),
        block([
          span("• Begin met opruimen - je kunt geen warm minimalistisch interieur creëren in een rommelige ruimte"),
        ]),
        block([
          span("• Investeer in opbergruimte die wegwerkt: kasten tot het plafond, bedden met lades"),
        ]),
        block([
          span("• Kies meubels in natuurlijke tinten boven wit of zwart"),
        ]),
        block([
          span("• Voeg textiel toe: kleden, kussens, plaids in zachte stoffen"),
        ]),
        block([
          span("• Laat oppervlakken leeg - een lege vensterbank is mooier dan één vol snuisterijen"),
        ]),
        block([span("Inspiratie uit andere stijlen")], "h2"),
        block([
          span("Warm minimalisme leent zich perfect om te combineren met "),
          ...(japandiLink ? [
            span("Japandi", [japandiLink.key]),
          ] : [span("Japandi")]),
          span(" - de mix van Japanse eenvoud en Scandinavische "),
          span("gezelligheid", ["strong"]),
          span(". Beide stijlen delen de liefde voor rust, natuurlijke materialen en functionele schoonheid."),
        ], "normal", japandiLink ? [japandiLink.def] : []),
        block([
          span("Het mooie van warm minimalisme is dat het groeit met je mee. Begin met de basis - neutrale kleuren, opgeruimde ruimtes, kwaliteitsmeubels - en voeg langzaam toe wat past bij jouw leven. Geen regels, alleen richtlijnen. Jouw huis, jouw keuzes."),
        ]),
      ];
    },
  },
  {
    title: "Japandi: de perfecte balans tussen Japans en Scandinavisch design",
    slug: "japandi-stijl",
    excerpt: "Japandi combineert Japanse minimalisme met Scandinavische warmte. Ontdek hoe je deze harmonieuze stijl toepast in je interieur.",
    category: "inspiratie",
    tags: ["japandi", "interieurstijlen", "minimalisme"],
    author: "Sophie van der Berg",
    seoTitle: "Japandi interieur: perfecte mix van Japans en Scandinavisch design",
    seoDescription: "Japandi is de fusie van Japanse eenvoud en Scandinavische gezelligheid. Leer hoe je deze tijdloze interieurstijl creëert.",
    content: async () => {
      const minimalId = await client.fetch(`*[_type == 'article' && slug.current == 'warm-minimalisme'][0]._id`);
      const materialenId = await client.fetch(`*[_type == 'article' && slug.current == 'natuurlijke-materialen'][0]._id`);
      
      const minimalLink = minimalId ? linkMark(minimalId) : null;
      const materialenLink = materialenId ? linkMark(materialenId) : null;

      return [
        block([
          span("Japandi", ["strong"]),
          span(" is meer dan een trendnaam - het is de harmonieuze fusie van Japanse "),
          span("wabi-sabi", ["strong"]),
          span(" (schoonheid in imperfectie) en Scandinavische "),
          span("hygge", ["strong"]),
          span(" (gezellige eenvoud). Beide culturen delen de liefde voor functionaliteit, natuurlijke materialen en rust, maar elk brengt een unieke nuance."),
        ]),
        block([span("Waar twee werelden samenkomen")], "h2"),
        block([
          span("Japan leert ons om schoonheid te vinden in eenvoud en imperfectie. Scandinavië leert ons dat minimaal niet koud hoeft te zijn. "),
          span("Japandi", ["strong"]),
          span(" neemt het beste van beide: de discipline en sereniteit van Japans design, gecombineerd met de warmte en toegankelijkheid van Scandinavisch wonen."),
        ]),
        quote("Japandi is waar Japanse perfectie en Scandinavische warmte elkaar ontmoeten."),
        block([span("Kleurenpalet: zachte neutralen")], "h2"),
        block([
          span("Denk aan crème, beige, zacht grijs en warm wit als basis. Voeg donkerder accenten toe via hout en zwarte details. Vermijd felle kleuren - in Japandi draait alles om rust en harmonie. Een enkele groene plant of aarden vaas mag, maar houd het subtiel."),
        ]),
        block([span("Materialen: eerlijk en natuurlijk")], "h2"),
        block([
          span("Dit is waar Japandi schittert: "),
          ...(materialenLink ? [
            span("natuurlijke materialen", [materialenLink.key]),
          ] : [span("natuurlijke materialen")]),
          span(" in hun puurste vorm. Licht eikenhout, bamboe, linnen, katoen, keramiek, rotan. Laat de nerven in het hout zichtbaar, kies keramiek met kleine onregelmatigheden. Perfectie zit in de imperfectie."),
        ], "normal", materialenLink ? [materialenLink.def] : []),
        block([span("Meubels: laag en functioneel")], "h2"),
        block([
          span("Japanse esthetiek houdt van lage meubels die rust creëren. Scandinavisch design houdt van functionaliteit. Samen krijg je: eenvoudige, lage meubels in licht hout met slimme opbergruimte. Denk aan een laag platform bed, een strakke houten eettafel, een minimalistische bank op lage poten."),
        ]),
        block([span("De kunst van de lege ruimte")], "h2"),
        block([
          span("In het Japans heet dit 'ma' - de bewuste leegte tussen objecten. Niet elke hoek hoeft gevuld. Niet elke muur heeft kunst nodig. Lege ruimte geeft je ogen rust en maakt dat de objecten die er wél zijn meer opvallen. Een enkele vaas op een bijzettafel heeft meer impact dan vijf decoraties."),
        ]),
        block([span("Licht: zacht en natuurlijk")], "h2"),
        block([
          span("Japandi vermijdt harde spotjes en felle lampen. Ga voor zachte, warme verlichting via papieren lampen (akari), houten hanglampen of dimbare staande lampen. Houd gordijnen licht en doorschijnend om daglicht binnen te laten. Het doel is een ruimte die baadt in zacht, natuurlijk licht."),
        ]),
        block([span("Decoratie: minimaal maar betekenisvol")], "h2"),
        block([
          span("Kies decoratie met bedoeling. Een handgemaakt keramisch bord, een ikebana bloemstuk, een wollen plaid. Elk item vertelt een verhaal of heeft een functie. Display objecten met ruimte eromheen - laat ze ademen."),
        ]),
        block([span("Praktische tips voor Japandi")], "h2"),
        block([span("• Houd oppervlakken leeg en georganiseerd")]),
        block([span("• Investeer in kwaliteit boven kwantiteit")]),
        block([span("• Kies meubels met opbergruimte om rommel te verbergen")]),
        block([span("• Voeg planten toe voor leven (bonsai, bamboe, monstera)")]),
        block([span("• Mix lichte en donkere houttinten voor diepte")]),
        block([span("• Gebruik textiel om warmte toe te voegen zonder te overdrijven")]),
        block([span("Verbinding met andere stijlen")], "h2"),
        block([
          span("Japandi is eigenlijk een vorm van "),
          ...(minimalLink ? [
            span("warm minimalisme", [minimalLink.key]),
          ] : [span("warm minimalisme")]),
          span(". Beide stijlen delen de focus op eenvoud, natuurlijke materialen en doordachte inrichting. Het verschil zit in de details: Japandi is iets meer geïnspireerd op Oosterse filosofie, terwijl warm minimalisme breder is."),
        ], "normal", minimalLink ? [minimalLink.def] : []),
        block([
          span("De kracht van Japandi zit in de intentie. Elk object, elke kleur, elk meubel is een bewuste keuze. Dat maakt deze stijl tijdloos - het gaat niet om trends, maar om wat echt werkt voor jouw leven."),
        ]),
      ];
    },
  },
  {
    title: "Natuurlijke materialen in moderne interieurs: warmte en karakter",
    slug: "natuurlijke-materialen",
    excerpt: "Hout, steen, linnen: natuurlijke materialen voegen warmte en authenticiteit toe aan elk interieur. Ontdek hoe je ze slim inzet.",
    category: "advies",
    tags: ["materialen", "natuurlijk-wonen", "interieur-tips"],
    author: "Sophie van der Berg",
    seoTitle: "Natuurlijke materialen: hout, steen en linnen in je interieur",
    seoDescription: "Natuurlijke materialen zoals hout, steen en linnen brengen warmte en karakter in je huis. Praktische tips voor elk interieur.",
    content: async () => {
      const minimalId = await client.fetch(`*[_type == 'article' && slug.current == 'warm-minimalisme'][0]._id`);
      const japandiId = await client.fetch(`*[_type == 'article' && slug.current == 'japandi-stijl'][0]._id`);
      
      const minimalLink = minimalId ? linkMark(minimalId) : null;
      const japandiLink = japandiId ? linkMark(japandiId) : null;

      return [
        block([
          span("Natuurlijke materialen zijn de snelste manier om warmte en karakter toe te voegen aan elk interieur. "),
          span("Hout", ["strong"]),
          span(", "),
          span("steen", ["strong"]),
          span(", "),
          span("linnen", ["strong"]),
          span(", bamboe, rotan - deze materialen hebben een natuurlijke "),
          span("authenticiteit", ["strong"]),
          span(" die kunstmatige materialen simpelweg niet kunnen evenaren."),
        ]),
        block([span("Waarom natuurlijke materialen werken")], "h2"),
        block([
          span("Mensen reageren instinctief positief op natuurlijke materialen. We zijn miljoen jaar geëvolueerd in natuurlijke omgevingen, omringd door "),
          span("hout", ["strong"]),
          span(", "),
          span("steen", ["strong"]),
          span(" en planten. Moderne materialen zoals plastic en staal zijn pas enkele generaties oud. Natuurlijke materialen voelen vertrouwd en kalmeren ons."),
        ]),
        quote("Natuurlijke materialen brengen het buitenleven naar binnen."),
        block([span("Hout: de basis")], "h2"),
        block([
          span("Hout", ["strong"]),
          span(" is veelzijdig en past in vrijwel elke stijl. Licht eikenhout geeft een Scandinavisch gevoel, donker walnoothout voelt luxe, gerecycled "),
          span("hout", ["strong"]),
          span(" brengt karakter. Laat de nerven zichtbaar - dat is waar de schoonheid zit. Combineer verschillende houttinten in één ruimte voor diepte."),
        ]),
        block([span("Steen: robuust en tijdloos")], "h2"),
        block([
          span("Steen", ["strong"]),
          span(" voegt gewicht en permanentie toe. Een marmeren tafelblad, een leisteen vloer, een natuurstenen vaas. "),
          span("Steen", ["strong"]),
          span(" werkt het beste als accent - te veel maakt een ruimte koud. Mix het met zachte materialen zoals "),
          span("hout", ["strong"]),
          span(" en textiel voor balans."),
        ]),
        block([span("Linnen en katoen: zachte warmte")], "h2"),
        block([
          span("Linnen", ["strong"]),
          span(" gordijnen, katoenen kussens, wollen kleden - textiel in natuurlijke vezels voegt zowel visuele als tactiele warmte toe. "),
          span("Linnen", ["strong"]),
          span(" heeft een natuurlijke kreuk die charme geeft. Katoen ademt. Wol isoleert en voelt luxe aan. Vermijd polyester waar mogelijk."),
        ]),
        block([span("Rotan en bamboe: textuur en luchtigheid")], "h2"),
        block([
          span("Gevlochten materialen als rotan en bamboe voegen textuur toe zonder zwaar te worden. Een rotan stoel, bamboe lamellen, een rieten mand. Deze materialen brengen licht en luchtigheid, perfect voor zomerse of tropische stijlen."),
        ]),
        block([span("Keramiek en aardewerk: handgemaakt karakter")], "h2"),
        block([
          span("Handgemaakte keramiek heeft variaties en kleine imperfecties die machine-made spullen niet hebben. Een aarden vaas, keramische borden, terracotta potten. Deze objecten voelen ambachtelijk en uniek."),
        ]),
        block([span("Mix materialen voor diepte")], "h2"),
        block([
          span("De truc is om verschillende natuurlijke materialen te combineren. Een houten tafel met "),
          span("linnen", ["strong"]),
          span(" placemats en keramische borden. Een stenen vloer met een wollen kleed en houten meubels. Deze lagen creëren rijkdom zonder rommel."),
        ]),
        block([span("Onderhoud: imperfectie is schoonheid")], "h2"),
        block([
          span("Natuurlijke materialen veranderen met de tijd. "),
          span("Hout", ["strong"]),
          span(" krijgt patina, "),
          span("linnen", ["strong"]),
          span(" wordt zachter, leer ontwikkelt karakter. Zie dit niet als achteruitgang maar als veroudering - zoals een goede wijn. De krasjes en vlekken vertellen het verhaal van jouw leven."),
        ]),
        block([span("Praktische tips")], "h2"),
        block([span("• Combineer minimaal drie verschillende materialen per ruimte")]),
        block([span("• Mix texturen: glad hout met ruw linnen, zacht wol met hard steen")]),
        block([span("• Kies onbehandeld of licht behandeld hout voor natuurlijke uitstraling")]),
        block([span("• Voeg groen toe via planten - ook een natuurlijk materiaal")]),
        block([span("• Investeer in kwaliteit: natuurlijke materialen gaan decennia mee")]),
        block([span("Waar passen natuurlijke materialen?")], "h2"),
        block([
          span("Natuurlijke materialen passen perfect in "),
          ...(minimalLink ? [span("warm minimalisme", [minimalLink.key])] : [span("warm minimalisme")]),
          span(" en "),
          ...(japandiLink ? [span("Japandi", [japandiLink.key])] : [span("Japandi")]),
          span(", maar ook in landelijk, industrieel en modern interieur. Ze zijn de grote gemeenschappelijke deler - bijna elke stijl wordt beter met natuurlijke materialen."),
        ], "normal", [...(minimalLink ? [minimalLink.def] : []), ...(japandiLink ? [japandiLink.def] : [])]),
        block([
          span("Het mooie van natuurlijke materialen is hun eerlijkheid. Wat je ziet is wat je krijgt. Geen imitatie, geen facade. Gewoon puur, natuurlijk, en tijdloos."),
        ]),
      ];
    },
  },
];

async function recreateAllArticles() {
  console.log("\n🗑️  DELETING ALL EXISTING ARTICLES\n");

  // First, get all articles and remove their internal links
  const existingArticles = await client.fetch(`*[_type == 'article'] { _id, body }`);
  
  console.log("  → Removing internal references first...\n");
  for (const article of existingArticles) {
    const cleanBody = article.body.map((block: any) => {
      if (block._type === "block" && block.markDefs) {
        // Remove internal article link markDefs
        const cleanMarkDefs = block.markDefs.filter(
          (def: any) => def._type !== "internalArticleLink"
        );
        // Clean marks from children
        const cleanChildren = block.children.map((child: any) => {
          if (child.marks) {
            const cleanMarks = child.marks.filter(
              (mark: string) => !block.markDefs.some((def: any) => def._key === mark && def._type === "internalArticleLink")
            );
            return { ...child, marks: cleanMarks.length > 0 ? cleanMarks : undefined };
          }
          return child;
        });
        return { ...block, markDefs: cleanMarkDefs.length > 0 ? cleanMarkDefs : undefined, children: cleanChildren };
      }
      return block;
    });
    
    await client.patch(article._id).set({ body: cleanBody }).commit();
    console.log(`  ✓ Cleaned references: ${article._id}`);
  }
  
  console.log("\n  → Deleting articles...\n");
  // Now delete all articles
  for (const article of existingArticles) {
    await client.delete(article._id);
    console.log(`  ✓ Deleted: ${article._id}`);
  }

  console.log(`\n✅ Deleted ${existingArticles.length} articles\n`);
  console.log("✍️  CREATING NEW ARTICLES\n");

  // Create new articles
  for (const article of articles) {
    const body = await article.content();
    
    const newArticle = await client.create({
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

    console.log(`  ✅ Created: ${article.title}`);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Created ${articles.length} new articles`);
  console.log(`${"=".repeat(60)}\n`);
}

recreateAllArticles();
