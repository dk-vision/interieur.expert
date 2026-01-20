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

const newArticles = [
  {
    title: "Neutrale kleuren slim combineren: meer dan grijs en beige",
    slug: "neutrale-kleuren",
    excerpt: "Neutrale kleuren zijn niet saai als je weet hoe je ze combineert. Ontdek hoe textuur en diepte een neutraal palet laten leven.",
    category: "inspiratie",
    tags: ["kleuren", "interieurstijlen", "minimalisme"],
    author: "Sophie van der Berg",
    seoTitle: "Neutrale kleuren combineren: textuur en diepte in je interieur",
    seoDescription: "Leer hoe je neutrale kleuren slim combineert met textuur en verschillende tinten voor een interessant interieur zonder felle kleuren.",
    content: async () => [
      block([
        span("Neutrale kleuren krijgen vaak het stempel 'saai', maar dat komt alleen doordat mensen ze verkeerd gebruiken. De kracht van neutralen ligt niet in de kleuren zelf, maar in "),
        span("textuur", ["strong"]),
        span(", "),
        span("diepte", ["strong"]),
        span(" en "),
        span("nuances", ["strong"]),
        span(". Als je dat snapt, open je een wereld aan mogelijkheden."),
      ]),
      block([span("Wat zijn neutrale kleuren eigenlijk?")], "h2"),
      block([
        span("Denk breder dan grijs en beige. Neutrale kleuren zijn alle tinten die geen dominant kleurkarakter hebben: wit, crème, zand, taupe, warm grijs, koel grijs, charcoal, zwart. Zelfs zachte greige (grijs-beige) en mushroom vallen eronder. Het spectrum is groter dan je denkt."),
      ]),
      quote("Neutrale kleuren zijn niet saai - ze zijn een canvas voor textuur en licht."),
      block([span("De basis: verschillende tinten, één kleur")], "h2"),
      block([
        span("De eerste truc: gebruik meerdere "),
        span("nuances", ["strong"]),
        span(" van dezelfde neutrale kleur. Een beige muur met een iets donkerder beige bank en lichtbeige kussens creëert "),
        span("diepte", ["strong"]),
        span(" zonder contrast. Datzelfde principe werkt met grijs, wit, taupe - elke neutrale tint."),
      ]),
      block([span("Textuur is alles")], "h2"),
      block([
        span("Hier wint of verliest een neutraal interieur. Een volledig beige kamer met gladde oppervlakken is inderdaad saai. Maar voeg een ruw linnen gordijn toe, een wollen kleed, een fluwelen kussen, een houten bijzettafel - plots heeft diezelfde beige ruimte interesse en "),
        span("textuur", ["strong"]),
        span(". Licht valt verschillend op elk materiaal."),
      ]),
      block([span("Warm versus koel")], "h2"),
      block([
        span("Neutralen hebben een temperatuur. Beige, zand, crème zijn warm. Grijs, slate, steengrijs zijn koel. Mix ze niet roekeloos - kies één richting en blijf daar. Een warm grijs (greige) kan een brug zijn, maar hou het consistent. Een kamer met warme beige muren en koele grijze meubels voelt 'off'."),
      ]),
      block([span("Accent met zwart of wit")], "h2"),
      block([
        span("Voeg punch toe via zwart of wit, afhankelijk van je basis. Lichte neutrale ruimte? Zwarte kozijnen, een zwart kunstwerk, zwarte lampen. Donkere neutrale ruimte? Witte accenten via textiel, vazen, kaarsen. Deze contrasten geven definitie zonder kleur toe te voegen."),
      ]),
      block([span("Materialen die neutraal versterken")], "h2"),
      block([
        span("Hout (licht eiken, walnoothout), steen (marmer, graniet), metaal (brons, messing, zwart staal), glas, linnen, wol, suède. Elk materiaal heeft zijn eigen neutrale tint én textuur. Combineer minimaal drie materialen voor rijkdom."),
      ]),
      block([span("Wanneer voeg je kleur toe?")], "h2"),
      block([
        span("Hoeft niet. Maar als je wilt: doe het via kleine accenten. Een terracotta vaas, een groen kussen, een blauw kunstwerk. Hou het subtiel - een neutrale basis verdraagt geen felle kleurvlakken zonder intentie."),
      ]),
      block([span("Licht als medespeler")], "h2"),
      block([
        span("Neutralen veranderen met licht. Beige wordt goudkleurig bij zonsondergang. Grijs wordt blauw in ochtendlicht. Speel hiermee via verlichting - warme LED's voor gezelligheid, koele voor focus. Test verf altijd op alle muren en bekijk op verschillende momenten van de dag."),
      ]),
      block([span("Praktische tips")], "h2"),
      block([span("• Gebruik minimaal 3 tinten van dezelfde neutrale kleur")]),
      block([span("• Mix minimaal 3 verschillende texturen")]),
      block([span("• Kies warm of koel en blijf consistent")]),
      block([span("• Test verf op alle muren (licht verschilt per muur)")]),
      block([span("• Voeg zwart of wit toe voor definitie")]),
      block([span("• Laat materialen het werk doen, niet decoratie")]),
      block([
        span("Een neutraal interieur is niet het veilige keuze - het is de moeilijke keuze. Zonder kleur moet textuur, licht en materiaal het werk doen. Maar als je het goed doet, krijg je een tijdloos interieur dat nooit verveelt."),
      ]),
    ],
  },
  {
    title: "Kleurpsychologie in interieur: hoe kleuren je stemming beïnvloeden",
    slug: "kleurpsychologie",
    excerpt: "Kleuren hebben een directe impact op hoe je je voelt. Ontdek welke kleuren rust geven, energie brengen en focus versterken.",
    category: "advies",
    tags: ["kleuren", "psychologie", "interieur-tips"],
    author: "Sophie van der Berg",
    seoTitle: "Kleurpsychologie interieur: hoe kleuren je stemming beïnvloeden",
    seoDescription: "Blauw geeft rust, groen brengt balans, rood activeert. Leer hoe je kleurpsychologie toepast voor een interieur dat past bij jouw leven.",
    content: async () => {
      const neutraalId = await getArticleId("neutrale-kleuren");
      const neutraalLink = neutraalId ? linkMark(neutraalId) : null;

      return [
        block([
          span("Kleuren zijn niet neutraal - ze beïnvloeden je humeur, energie en concentratie. "),
          span("Blauw", ["strong"]),
          span(" kalmeert, "),
          span("groen", ["strong"]),
          span(" brengt balans, rood activeert, geel verheldert. Dit is geen mystiek, maar psychologie. Als je snapt hoe kleuren werken, kies je bewuster voor je ruimtes."),
        ]),
        block([span("Waarom werkt kleurpsychologie?")], "h2"),
        block([
          span("Mensen hebben millennia in natuurlijke omgevingen geleefd. "),
          span("Blauw", ["strong"]),
          span(" betekende water en hemel - veiligheid. "),
          span("Groen", ["strong"]),
          span(" betekende vegetatie - voedsel. Rood betekende gevaar of rijpe vruchten - alertheid. Onze hersenen zijn getraind om emotioneel te reageren op kleur. Ook in moderne interieurs."),
        ]),
        quote("Kleuren bepalen niet alleen hoe een ruimte eruitziet, maar ook hoe je je erin voelt."),
        block([span("Blauw: kalmte en focus")], "h2"),
        block([
          span("Blauw", ["strong"]),
          span(" verlaagt je hartslag en bloeddruk - letterlijk rustgevend. Perfect voor slaapkamers en werkruimtes waar focus nodig is. Lichtblauw voelt luchtig, marineblauw voelt stabiel. Vermijd "),
          span("blauw", ["strong"]),
          span(" in eetkamers - het onderdrukt eetlust (daarom is er bijna geen blauw voedsel)."),
        ]),
        block([span("Groen: balans en herstel")], "h2"),
        block([
          span("Groen", ["strong"]),
          span(" is de meest natuurlijke kleur voor onze ogen - we kunnen meer "),
          span("groen", ["strong"]),
          span("tinten onderscheiden dan enige andere kleur. Het brengt binnen en buiten samen, geeft balans en helpt bij herstel. Ideaal voor woonkamers en badkamers. Olijfgroen voelt volwassen, saliegroen voelt fris, donkergroen voelt luxe."),
        ]),
        block([span("Rood: energie en passie")], "h2"),
        block([
          span("Rood verhoogt je energie en stimuleert conversatie. Perfect voor eetkamers of sociale ruimtes, maar te intens voor slaapkamers (tenzij je het wilt). Gebruik rood als accent, niet als dominant kleur - het kan overweldigen. Terracotta is een rustiger alternatief."),
        ]),
        block([span("Geel: vrolijkheid en creativiteit")], "h2"),
        block([
          span("Geel stimuleert creativiteit en vrolijkheid, maar te veel kan onrust geven. Zacht mosterdgeel of okergeel werkt beter dan fel citroengeel in grote vlakken. Ideaal voor keukens, werkruimtes of hoeken die licht missen."),
        ]),
        block([span("Paars: luxe en introspectie")], "h2"),
        block([
          span("Paars combineert de kalmte van blauw met de energie van rood. Het voelt luxe maar ook spiritueel. Lavendel werkt rustgevend in slaapkamers, diep aubergine voelt dramatisch in eetkamers. Gebruik spaarzaam - paars domineert snel."),
      ]),
        block([span("Oranje: warmte en gezelligheid")], "h2"),
        block([
          span("Oranje is warm zonder de intensiteit van rood. Zachte tinten als terracotta, koraal of perzik creëren "),
          span("warmte", ["strong"]),
          span(" en gezelligheid. Perfect voor woonkamers en leeshoeken. Fel oranje werkt als accent in speelkamers of creatieve ruimtes."),
        ]),
        block([span("Neutraal: rust en tijdloosheid")], "h2"),
        block([
          ...(neutraalLink
            ? [
                span("Neutrale kleuren", [neutraalLink.key]),
                span(" (wit, beige, grijs, zwart) geven rust en laten andere elementen spreken. Ze beïnvloeden stemming niet direct, maar creëren een canvas waarop jij de toon zet. Perfect als je gevoelig bent voor kleur of veel spullen hebt die al kleur hebben."),
              ]
            : [
                span("Neutrale kleuren (wit, beige, grijs, zwart) geven rust en laten andere elementen spreken. Ze beïnvloeden stemming niet direct, maar creëren een canvas waarop jij de toon zet. Perfect als je gevoelig bent voor kleur of veel spullen hebt die al kleur hebben."),
              ]),
        ], "normal", neutraalLink ? [neutraalLink.def] : []),
        block([span("Kleur per ruimte")], "h2"),
        block([span("• Slaapkamer: blauw, groen, lavendel (rust)")]),
        block([span("• Woonkamer: groen, warm grijs, zachte aardtinten (balans)")]),
        block([span("• Keuken: wit, geel, warm hout (energie en hygiëne)")]),
        block([span("• Eetkamer: rood, oranje, donkergroen (sociaal, eetlust)")]),
        block([span("• Werkruimte: blauw, groen, grijs (focus en creativiteit)")]),
        block([span("• Badkamer: blauw, wit, groen (zuiverheid en rust)")]),
        block([span("Praktische tips")], "h2"),
        block([span("• Test verf op grote stukken karton voor je schildert")]),
        block([span("• Bekijk kleuren bij dag- en kunstlicht")]),
        block([span("• Start met kleine accenten als je onzeker bent")]),
        block([span("• Combineer rustgevende basis met energie-accenten")]),
        block([span("• Houd het 60-30-10: 60% basis, 30% secundair, 10% accent")]),
        block([
          span("Kleurpsychologie is geen exacte wetenschap - jouw ervaring met een kleur speelt mee. Maar als algemene richtlijn helpt het enorm bij het creëren van ruimtes die voelen zoals je wilt."),
        ]),
      ];
    },
  },
  {
    title: "Verlichting in lagen: algemeen, taak en accent",
    slug: "verlichting-lagen",
    excerpt: "Goede verlichting maak je in drie lagen. Leer hoe je algemene, taak- en accentverlichting combineert voor perfecte sfeer.",
    category: "advies",
    tags: ["verlichting", "interieur-tips", "sfeer"],
    author: "Sophie van der Berg",
    seoTitle: "Verlichting in lagen: algemeen, taak en accentverlichting",
    seoDescription: "Goede verlichting bestaat uit drie lagen: algemene, taak- en accentverlichting. Zo combineer je ze voor functionele én sfeervolle ruimtes.",
    content: async () => [
      block([
        span("Eén plafondlamp is niet genoeg. Goede verlichting werk je in lagen: "),
        span("algemene verlichting", ["strong"]),
        span(" (basishelderheid), "),
        span("taakverlichting", ["strong"]),
        span(" (functioneel licht) en "),
        span("accentverlichting", ["strong"]),
        span(" (sfeer en diepte). Elk heeft een rol. Samen creëren ze een ruimte die zowel praktisch als gezellig is."),
      ]),
      block([span("Laag 1: algemene verlichting")], "h2"),
      block([
        span("Dit is je basishelderheid - de verlichting die de hele ruimte verlicht. Plafondlampen, inbouwspots, grote hanglampen. Het doel is niet sfeer, maar zichtbaarheid. Dimbaar is ideaal - dan pas je de intensiteit aan naar moment van de dag."),
      ]),
      quote("Goede verlichting gebruik je in lagen - net als bij een mooi schilderij."),
      block([span("Laag 2: taakverlichting")], "h2"),
      block([
        span("Taakverlichting", ["strong"]),
        span(" is gericht licht voor specifieke activiteiten. Een bureaulamp voor werk, een leeslamp naast de bank, onderkastverlichting in de keuken. Dit licht is helderder en gerichter dan algemene verlichting. Het voorkomt vermoeidheid en frustratie."),
      ]),
      block([span("Laag 3: accentverlichting")], "h2"),
      block([
        span("Accentverlichting", ["strong"]),
        span(" creëert sfeer en trekt aandacht naar objecten. Een schilderij met spot, LED-strips achter een kast, kaarsen op tafel. Dit licht is zachter en decoratief. Het geeft diepte en warmte, vooral 's avonds als algemene verlichting gedimd is."),
      ]),
      block([span("Hoe combineer je de lagen?")], "h2"),
      block([
        span("Overdag: algemene verlichting aan (gedimd), "),
        span("taakverlichting", ["strong"]),
        span(" waar nodig. 's Avonds: algemene verlichting uit of minimaal, "),
        span("taakverlichting", ["strong"]),
        span(" bij activiteiten, "),
        span("accentverlichting", ["strong"]),
        span(" voor sfeer. Dit creëert variatie en voorkomt dat je ruimte altijd hetzelfde aanvoelt."),
      ]),
      block([span("Kleurtemperatuur: warm of koel?")], "h2"),
      block([
        span("Gemeten in Kelvin (K). Warm wit (2700-3000K) voelt gezellig, koel wit (4000-5000K) voelt alert. Gebruik warm wit in woonruimtes, koel wit in werkruimtes. Mix ze niet in één ruimte - dat voelt rommelig."),
      ]),
      block([span("Dimmen is essentieel")], "h2"),
        block([
        span("Elke lichtlaag moet dimbaar zijn, of in ieder geval de algemene verlichting. Dit geeft controle over sfeer. Felle verlichting om 20:00 's avonds voelt oncomfortabel. Gedimd licht overdag voelt deprimerend. Flexibiliteit is key."),
      ]),
      block([span("Verlichting per ruimte")], "h2"),
      block([span("• Woonkamer: plafondlamp (algemeen), staande lamp (taak), spots op kunst (accent)")]),
      block([span("• Keuken: plafondspots (algemeen), onderkast LED (taak), hanglamp boven tafel (accent)")]),
      block([span("• Slaapkamer: plafondlamp (algemeen), bedlampjes (taak), sfeerverlichting achter bed (accent)")]),
      block([span("• Badkamer: plafondspots (algemeen), spiegellamp (taak), LED-strip (accent)")]),
      block([span("• Werkruimte: plafondlamp (algemeen), bureaulamp (taak), wandlamp (accent)")]),
      block([span("Veelgemaakte fouten")], "h2"),
      block([span("• Alleen algemene verlichting - ruimte voelt plat")]),
      block([span("• Alles te fel - geen sfeer, vermoeiend voor ogen")]),
      block([span("• Verkeerde kleurtemperatuur - koel wit in slaapkamer voelt onprettig")]),
      block([span("• Niet dimbaar - geen controle over stemming")]),
      block([span("• Licht alleen vanaf plafond - geen diepte, harde schaduwen")]),
      block([span("Praktische tips")], "h2"),
      block([span("• Installeer minimaal 3 lichtbronnen per ruimte")]),
      block([span("• Zet licht op verschillende hoogtes (plafond, tafel, vloer)")]),
      block([span("• Gebruik LED voor energie-efficiëntie")]),
      block([span("• Test dimbare lampen voor algemene verlichting")]),
      block([span("• Vermijd direct licht in ogen - altijd indirect of afgeschermd")]),
      block([
        span("Verlichting is het meest onderschatte aspect van interieur. Het kost minder dan meubels, maar heeft meer impact op hoe een ruimte voelt. Investeer tijd in het goed doen - het verschil is enorm."),
      ]),
    ],
  },
];

async function createMoreArticles() {
  console.log("\n✍️  CREATING 3 MORE ARTICLES\n");

  for (const article of newArticles) {
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

    console.log(`  ✅ ${article.title}`);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Created ${newArticles.length} articles`);
  console.log(`${"=".repeat(60)}\n`);
}

createMoreArticles();
