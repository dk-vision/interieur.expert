import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { calculateReadingTime } from "../lib/utils/reading-time";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: [];
  children: PortableTextSpan[];
};

type Segment = string | { text: string; marks: string[] };

type RewriteDefinition = {
  excerpt: string;
  body: PortableTextBlock[];
  tags: string[];
};

let keyIndex = 0;

function nextKey() {
  keyIndex += 1;
  return `k${keyIndex.toString(36)}`;
}

function strong(text: string): Segment {
  return { text, marks: ["strong"] };
}

function block(style: string, segments: Segment[]): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style,
    markDefs: [],
    children: segments.map((segment) =>
      typeof segment === "string"
        ? {
            _type: "span",
            _key: nextKey(),
            text: segment,
            marks: [],
          }
        : {
            _type: "span",
            _key: nextKey(),
            text: segment.text,
            marks: segment.marks,
          }
    ),
  };
}

function p(...segments: Segment[]) {
  return block("normal", segments);
}

function h2(text: string) {
  return block("h2", [text]);
}

function quote(...segments: Segment[]) {
  return block("blockquote", segments);
}

const rewrites: Record<string, RewriteDefinition> = {
  "kleine-ruimtes": {
    excerpt:
      "Een kleine woning hoeft niet benauwd aan te voelen. Met licht, ritme en slimme keuzes maak je zelfs compacte kamers merkbaar ruimer.",
    tags: ["budget", "wonen"],
    body: [
      p(
        "Een kleine ruimte voelt zelden klein door het aantal vierkante meters alleen. Vaak zit het probleem in een optelsom van te zware meubels, een onrustig kleurenpalet en licht dat niet goed verdeeld is. Zodra je die drie factoren rechtzet, verandert de beleving van de kamer meteen. ",
        strong("Dat is precies waar slim inrichten het verschil maakt."),
      ),
      p(
        "Je hoeft dus niet te verbouwen om een compacte woonkamer, slaapkamer of studio aangenamer te maken. Wie goed kijkt naar zichtlijnen, opbergruimte en schaal, kan een kleine woning verrassend ruim laten aanvoelen zonder karakter te verliezen."
      ),
      h2("Begin bij licht en rust"),
      p(
        "Licht is bijna altijd de snelste winst. Laat ramen zoveel mogelijk vrij, kies gordijnen die het daglicht filteren in plaats van blokkeren, en vermijd dat één donkere hoek de hele ruimte naar beneden trekt. Werk liever met meerdere lichtpunten dan met één felle plafondlamp. Een vloerlamp naast de zetel, een wandlamp bij een leeshoek en een zachte tafellamp op een kast geven diepte en maken een kamer breder in plaats van platter."
      ),
      quote(
        "Een kleine ruimte voelt groter zodra je oog niet meer botst op donkerte, rommel of harde overgangen."
      ),
      h2("Kies minder, maar beter passende meubels"),
      p(
        "In kleine ruimtes gaat het niet om mini-meubels, maar om proportie. Een zetel die net iets te diep is, slorpt meteen alle lucht op. Een salontafel met een zware sokkel maakt de vloer optisch korter. Kies liever voor meubels met poten, afgeronde hoeken en voldoende ruimte errond. Daardoor blijft de vloer zichtbaar en krijgt de kamer ademruimte."
      ),
      p(
        "Denk ook na over multifunctionele stukken die er niet tijdelijk uitzien. Een bank met opbergruimte, een uitschuifbare eettafel of een slanke wandkast tot aan het plafond helpt pas echt als het meubel visueel rustig blijft. ",
        strong("Compact wonen vraagt niet om meer meubels, maar om minder twijfelgevallen."),
      ),
      h2("Werk met een doorlopend ritme"),
      p(
        "Wie een kleine woning groter wil laten lijken, doet er goed aan lijnen te herhalen. Gebruik dezelfde vloer in aangrenzende ruimtes als dat praktisch kan, laat kleuren terugkomen tussen muren en textiel, en vermijd abrupte stijlwissels. Een ruimte oogt groter wanneer het geheel logisch doorloopt."
      ),
      p(
        "Ook spiegels werken beter wanneer ze iets zinvols reflecteren. Richt ze op daglicht, op een mooie zichtlijn of op een open stuk muur. Een spiegel tegenover een chaotische hoek vergroot vooral de onrust."
      ),
      h2("Opbergen zonder alles weg te stoppen"),
      p(
        "Opbergruimte is essentieel, maar dat betekent niet dat alles achter gesloten deuren moet verdwijnen. Een kleine woning wordt aangenamer als ze een helder onderscheid maakt tussen wat functioneel is en wat sfeer brengt. Hou dagelijkse spullen dicht bij de hand, maar geef ze een vaste plek. Laat tegelijk genoeg lege ruimte over op planken, tafels en vensterbanken. Zo krijgt het interieur ritme en rust."
      ),
      p(
        "De beste kleine ruimtes voelen niet volgepropt aan, maar precies. Er staat niets te weinig, en ook niets te veel. Wanneer je die balans vindt, lijkt een kamer niet alleen groter, maar woont ze ook merkbaar lichter."
      ),
    ],
  },
  "coastal-interieur": {
    excerpt:
      "Coastal interieur draait niet om ankers en schelpen, maar om licht, textuur en een ontspannen ritme dat doet denken aan de kust.",
    tags: ["trends", "wonen"],
    body: [
      p(
        "Een coastal interieur wordt vaak verkeerd begrepen. Veel mensen denken meteen aan touw, schelpjes en een blauwe accentmuur, terwijl de stijl in werkelijkheid veel rustiger en verfijnder is. De aantrekkingskracht zit in de sfeer van een huis dicht bij zee: licht, luchtig, natuurlijk en ontspannen zonder nonchalance te worden."
      ),
      p(
        "Wie het goed aanpakt, vertaalt dus geen stranddecor naar de woonkamer, maar wel het gevoel dat daarbij hoort. ",
        strong("Een goed coastal interieur oogt helder en zacht, niet thematisch."),
      ),
      h2("Licht is belangrijker dan kleur"),
      p(
        "De basis van coastal wonen begint bij licht. Witte muren zijn niet verplicht, maar een lichte ondertoon helpt wel. Denk aan zand, kalk, gebroken wit, vergrijsd beige en zachte kleitinten. Die kleuren reflecteren het daglicht mooi en geven een ruimte vanzelf een open gevoel. Blauw kan, maar dan liever als subtiele nuance in textiel, keramiek of kunst dan als vanzelfsprekende hoofdtoon."
      ),
      quote(
        "De kustsfeer zit niet in marineblauw, maar in het soort kalmte dat ontstaat wanneer licht en materiaal elkaar versterken."
      ),
      h2("Textuur maakt het geloofwaardig"),
      p(
        "Coastal interieurs leven van natuurlijke materialen met reliëf. Linnen gordijnen, een wollen of jute vloerkleed, keramiek met een matte glazuurlaag, hout dat niet te glad werd afgewerkt: dat soort elementen brengt het zachte, eerlijke karakter binnen. Een ruimte met alleen lichte kleuren maar zonder textuur oogt snel vlak."
      ),
      p(
        "Ook bij meubels werkt eenvoud beter dan effect. Kies voor een comfortabele zetel met zachte lijnen, een houten tafel met een rustige nerf en opberging die niet massief aanvoelt. Wanneer alles laag, zwaar en strak wordt, verlies je het ontspannen gevoel dat coastal net sterk maakt."
      ),
      h2("Houd het open, niet leeg"),
      p(
        "Een coastal woning heeft lucht nodig, maar mag gerust warmte tonen. Gebruik daarom niet te veel kleine accessoires. Werk liever met een paar grotere gebaren: een royaal vloerkleed, een brede lampenkap in linnen, een sculpturale vaas of een groot kunstwerk met een zachte horizonwerking. Daarmee blijft het beeld rustig."
      ),
      p(
        "Planten passen hier goed, zeker wanneer ze de natuurlijke sfeer ondersteunen. Denk aan olijf, vijg of een losse tak in een stenen kruik. Vermijd decor dat letterlijk naar de zee verwijst als het niets toevoegt aan de ruimte zelf."
      ),
      h2("Waarom deze stijl zo goed werkt"),
      p(
        "Coastal interieur voelt toegankelijk omdat het niet schreeuwt. De stijl geeft een huis ademruimte, maakt daglicht belangrijker en legt de nadruk op materialen die mooi verouderen. Daardoor werkt hij zowel in een appartement in de stad als in een landelijke woning."
      ),
      p(
        "Als de basis klopt, heb je geen clichés nodig. Dan voelt een ruimte vanzelf alsof de ramen open kunnen, ook wanneer je ver van de kust woont."
      ),
    ],
  },
  "kleurpsychologie": {
    excerpt:
      "Kleurpsychologie wordt pas interessant wanneer je ze vertaalt naar echte woonruimtes. Niet elke kleur werkt overal hetzelfde, maar elke kleur stuurt wel de sfeer.",
    tags: ["trends", "wonen"],
    body: [
      p(
        "We kiezen kleuren vaak op intuïtie, en dat is niet vreemd. Een kleur doet iets met een ruimte nog voor je bewust kunt benoemen waarom. Ze kan vertragen, opwarmen, activeren of net de achtergrond stiller maken. Daarom is kleurpsychologie in huis geen theoretisch spelletje, maar een praktisch hulpmiddel voor wie wil dat een ruimte ook goed aanvoelt."
      ),
      p(
        "Dat betekent niet dat er voor elke kamer één juiste kleur bestaat. Wel dat je beter vertrekt van de functie van de ruimte en het moment waarop je ze gebruikt. ",
        strong("Een kleur die in een keuken fris en energiek voelt, kan in een slaapkamer te wakker blijven."),
      ),
      h2("Rustige kleuren werken door in je ritme"),
      p(
        "Blauw en groen blijven populaire keuzes omdat ze visueel rust geven. Blauw koelt af, ordent en brengt focus, zeker in zachtere of grijzere varianten. Groen voelt natuurlijker en milder. Het verbindt een interieur snel met hout, planten en textiel in aardetinten. In ruimtes waar je wil landen, zijn dat vaak betrouwbare basiskleuren."
      ),
      p(
        "Toch zit het effect niet alleen in de kleur zelf, maar in de dosering. Een volledige kamer in donkerblauw kan zwaar worden als het daglicht beperkt is. Een vergrijsde groentint kan dan weer prachtig werken wanneer je ze combineert met kalkverf, linnen en warm hout."
      ),
      quote(
        "Kleur werkt het sterkst wanneer ze niet losstaat van materiaal, licht en schaal."
      ),
      h2("Warme tinten geven energie, maar vragen nuance"),
      p(
        "Geel, terracotta, roest en zachte oranjevarianten brengen beweging in een interieur. Ze maken een eetruimte socialer, geven een werkplek pit en laten noordgerichte kamers minder koel aanvoelen. Het risico zit vooral in de intensiteit. Te fel, te glanzend of op te veel vlakken tegelijk voelt snel onrustig."
      ),
      p(
        "Wie warmte wil zonder drukte, kiest beter voor gedempte tonen en laat die terugkomen in verschillende lagen: verf, kussens, keramiek of een tapijt. Op die manier ontstaat samenhang in plaats van kleur als los effect."
      ),
      h2("Neutrale kleuren zijn nooit neutraal"),
      p(
        "Wit, beige, greige, taupe en grijs lijken veilig, maar ze bepalen juist sterk hoe een ruimte wordt gelezen. Een koel wit maakt een kamer helder, maar ook afstandelijk als er weinig textuur tegenover staat. Een warm beige kan een woonkamer meteen zachter maken. Grijs vraagt bijna altijd om materiaal en licht met voldoende warmte, anders wordt het vlak."
      ),
      p(
        "Daarom is testen belangrijk. Kijk niet alleen naar een kleurstaal op zich, maar naar wat er gebeurt in ochtendlicht, avondlicht en naast je vloer of gordijnen. Dezelfde kleur kan in twee huizen totaal anders voelen."
      ),
      h2("Kies op gevoel, maar stuur bewust bij"),
      p(
        "Het sterkste interieur is zelden opgebouwd uit trendkleuren alleen. Het voelt persoonlijk omdat de kleuren ook aansluiten bij hoe je wilt wonen. Misschien zoek je rust in de slaapkamer, concentratie in je bureau of meer warmte in een open leefruimte. Wanneer je dat vertrekpunt helder hebt, wordt kleurkeuze meteen minder willekeurig."
      ),
      p(
        "Kleurpsychologie hoeft dus niet streng te zijn. Ze helpt je vooral om bewuster te zien waarom een ruimte wel of niet klopt, en hoe je daar met relatief kleine ingrepen veel aan kunt veranderen."
      ),
    ],
  },
  "verlichting-lagen": {
    excerpt:
      "Goede verlichting begint niet bij een mooie lamp, maar bij een plan. Met lagen van basislicht, taaklicht en sfeerlicht voelt een ruimte meteen rijker en rustiger.",
    tags: ["wonen"],
    body: [
      p(
        "Veel interieurs lopen vast op verlichting, zelfs wanneer de meubels en kleuren goed gekozen zijn. Dat komt omdat licht vaak pas laat in het proces aandacht krijgt. Dan hangt er één centrale lamp en moet die plots alles oplossen: sfeer, zicht, gezelligheid, functionaliteit. Dat lukt bijna nooit."
      ),
      p(
        "Een sterke lichtopbouw werkt in lagen. Niet omdat dat technisch klinkt, maar omdat een huis op verschillende momenten iets anders nodig heeft. ",
        strong("Je wilt kunnen koken, lezen, ontvangen en ontspannen zonder dat één soort licht al die situaties moet dragen."),
      ),
      h2("Start met rustig basislicht"),
      p(
        "Algemene verlichting vormt de eerste laag. Dat is het licht dat je veilig door een ruimte laat bewegen en het geheel leesbaar maakt. In de praktijk zijn dat plafondspots, een rail, indirecte wandverlichting of een centrale hanglamp. Het belangrijkste is niet het type armatuur, maar de zachtheid en de mogelijkheid om te dimmen. Basislicht dat altijd te fel staat, maakt een ruimte vlak en vermoeiend."
      ),
      h2("Voeg taaklicht toe waar je echt leeft"),
      p(
        "De tweede laag is functioneler. Denk aan een leeslamp naast de zetel, verlichting boven het werkblad in de keuken, een bureaulamp of goed licht bij de spiegel in de badkamer. Taaklicht voorkomt dat je de hele ruimte moet verlichten voor één handeling. Daardoor krijg je automatisch meer rust."
      ),
      quote(
        "Goede verlichting verlicht niet overal evenveel. Ze verlicht precies waar het nodig is."
      ),
      h2("Sfeer ontstaat in de derde laag"),
      p(
        "Accent- en sfeerlicht maken een interieur menselijk. Een tafellamp op een dressoir, een subtiele spot op kunst, een wandlamp in een donkere hoek of indirect licht achter een open kast geeft diepte. Net die laag zorgt ervoor dat een huis 's avonds nog steeds uitnodigend aanvoelt wanneer het plafondlicht uit mag."
      ),
      p(
        "Let ook op kleurtemperatuur. In leefruimtes werkt warm wit meestal het best, ongeveer tussen 2700 en 3000 kelvin. Koeler licht kan nuttig zijn in een werkruimte, maar voelt in een woonkamer snel zakelijk. Hou bovendien dezelfde lichtkleur zoveel mogelijk consequent binnen één zone. Gemengde wittonen maken een interieur onrustig."
      ),
      h2("Verlichting is mee-interieur"),
      p(
        "Lampen zijn niet alleen lichtbronnen, maar ook visuele ankerpunten. Een grote lamp boven de eettafel geeft schaal, een lage wandlamp maakt een zithoek intiemer en een sculpturale tafellamp kan zelfs overdag iets toevoegen. Toch werkt dat pas echt als de functie klopt. Een mooie lamp op de verkeerde plek blijft een gemiste kans."
      ),
      p(
        "Wie opnieuw naar verlichting kijkt, merkt vaak dat het huis niet per se meer lampen nodig heeft, maar betere verhoudingen. Zodra basis, taak en sfeer elkaar aanvullen, voelt een ruimte rijker, warmer en veel bewuster ingericht."
      ),
    ],
  },
  "industrieel-wonen": {
    excerpt:
      "Industrieel wonen hoeft niet hard of kil te zijn. De stijl werkt pas echt wanneer ruwe materialen in balans komen met comfort, textuur en warm licht.",
    tags: ["materialen", "wonen"],
    body: [
      p(
        "Industrieel wonen spreekt veel mensen aan omdat het eerlijk voelt. Je ziet materiaal, structuur en constructie. Baksteen mag baksteen zijn, staal hoeft niet verstopt te worden en hout mag sporen van gebruik tonen. Maar precies daar gaat het soms mis: wanneer het stoere deel alle aandacht krijgt en het huis vooral hard begint aan te voelen."
      ),
      p(
        "Een geslaagd industrieel interieur draait juist om evenwicht. ",
        strong("Ruw materiaal krijgt pas karakter als er genoeg zachtheid naast staat."),
        " Zonder die tegenhanger oogt de ruimte al snel als decor."
      ),
      h2("Denk in contrasten, niet in clichés"),
      p(
        "De industriële sfeer ontstaat uit materiaalcontrast: staal naast hout, beton naast wol, een strakke lamp boven een royale tafel. Je hebt geen loft of oude fabriekshal nodig om dat effect te bereiken. Zelfs in een gewone woning kan een zwarte stalen kast, een sobere kalkmuur of een massief houten blad voldoende zijn om de toon te zetten."
      ),
      p(
        "Wat je beter vermijdt, zijn letterlijke verwijzingen die de stijl te thematisch maken. Oude verkeersborden, overdreven vintage objecten of te veel pseudo-fabrieksdecor halen de rust uit het interieur. De stijl wordt sterker wanneer hij vanzelfsprekend oogt."
      ),
      quote(
        "Industrieel wonen gaat niet over harder worden, maar over materiaal laten spreken zonder comfort op te geven."
      ),
      h2("Warmte zit in textiel en licht"),
      p(
        "Wie industrieel wil wonen, moet bijna altijd extra aandacht geven aan textiel. Een groot vloerkleed, linnen gordijnen, een wollen plaid of kussens met reliëf verzachten de rechte lijnen en donkere accenten. Daardoor voelt een ruimte niet alleen beter aan, maar klinkt ze vaak ook aangenamer."
      ),
      p(
        "Verlichting is minstens zo belangrijk. Metaal en donkere kleuren slikken licht op, dus één hanglamp volstaat zelden. Werk liever met meerdere bronnen: een stoere wandlamp, een lamp met warme kap op een bijzettafel en zacht indirect licht dat baksteen of kalkverf laat leven."
      ),
      h2("Kies meubels met massa, maar geef ze ruimte"),
      p(
        "In een industrieel interieur mogen meubels stevig ogen, zolang ze de ruimte niet dichtdrukken. Een royale tafel met een sober onderstel, een leren of stoffen zetel met voldoende zitcomfort en open rekken met lucht tussen de planken werken beter dan een verzameling zware blokken. Laat dus ook lege ruimte bestaan. Net die ademruimte zorgt ervoor dat de materialen gelezen kunnen worden."
      ),
      p(
        "Kleur mag donker zijn, maar hoeft niet somber te worden. Zwart, roest, houtbruin en grijsgroene tinten geven diepte. Wanneer je ze combineert met beige, wolwit of warm licht, ontstaat er een industriële sfeer die stoer blijft zonder afstandelijk te worden."
      ),
      h2("Waarom deze stijl blijft werken"),
      p(
        "Industrieel wonen blijft relevant omdat het niet draait om perfecte oppervlakken. De stijl laat ruimte voor gebruik, patina en objecten met gewicht. Dat maakt hem duurzaam in de beste zin van het woord: niet snel uitgekeken, niet te glad en niet afhankelijk van één trendkleur."
      ),
      p(
        "Zodra je begrijpt dat warmte even belangrijk is als ruwheid, wordt industrieel wonen geen pose meer, maar een heel leefbare manier van inrichten."
      ),
    ],
  },
};

const tagUpdates: Record<string, string[]> = {
  "beste-eettafel-voor-gezin": ["budget", "wonen"],
  "bohemian-interieur": ["trends", "wonen"],
  "budget-investeren": ["budget", "wonen"],
  "coastal-interieur": ["trends", "wonen"],
  "duurzaam-wonen-interieurontwerp": ["materialen", "wonen"],
  "eettafel-onderhoud": ["materialen", "wonen"],
  "eerste-woning": ["budget", "wonen"],
  "eettafel-afmetingen": ["wonen"],
  "industrieel-wonen": ["materialen", "wonen"],
  japandi: ["scandinavisch", "wonen"],
  "kleine-ruimtes": ["budget", "wonen"],
  kleurpsychologie: ["trends", "wonen"],
  "luxe-beddengoed-wat-maakt-een-bed-echt-goed": ["materialen", "wonen"],
  "natuurlijke-materialen": ["materialen", "scandinavisch"],
  "neutrale-kleuren": ["trends", "wonen"],
  "organische-vormen-in-het-interieur-zachtheid-met-karakter": ["trends", "wonen"],
  "trends-2026": ["trends", "wonen"],
  "verlichting-lagen": ["wonen"],
  vloeren: ["materialen", "wonen"],
  "warm-minimalisme": ["scandinavisch", "wonen"],
  "welk-materiaal-voor-je-eettafel": ["materialen", "wonen"],
};

type ArticleRecord = {
  _id: string;
  slug: string;
  title: string;
  sponsored?: boolean;
  body: PortableTextBlock[] | null;
  excerpt?: string;
  tags?: string[];
};

async function main() {
  const targetSlugs = Array.from(new Set([...Object.keys(rewrites), ...Object.keys(tagUpdates)]));

  const articles = await client.fetch<ArticleRecord[]>(
    `*[_type == "article" && slug.current in $slugs] {
      _id,
      title,
      "slug": slug.current,
      sponsored,
      excerpt,
      tags,
      body
    }`,
    { slugs: targetSlugs }
  );

  const articlesBySlug = new Map(articles.map((article) => [article.slug, article]));

  for (const slug of targetSlugs) {
    if (!articlesBySlug.has(slug)) {
      console.warn(`Missing article for slug: ${slug}`);
    }
  }

  for (const [slug, article] of articlesBySlug) {
    if (article.sponsored) {
      console.log(`Skipping sponsored article: ${article.title}`);
      continue;
    }

    const patch: Record<string, unknown> = {};
    const rewrite = rewrites[slug];
    const tags = tagUpdates[slug];

    if (rewrite) {
      patch.excerpt = rewrite.excerpt;
      patch.body = rewrite.body;
      patch.tags = rewrite.tags;
      patch.readingTime = calculateReadingTime(rewrite.body);
      console.log(`Rewriting ${article.title}`);
    } else if (tags) {
      patch.tags = tags;
      patch.readingTime = calculateReadingTime(article.body || []);
      console.log(`Retagging ${article.title} -> ${tags.join(", ")}`);
    }

    if (Object.keys(patch).length > 0) {
      await client.patch(article._id).set(patch).commit();
    }
  }

  const updatedTagCounts = await client.fetch<Array<{ tag: string; articleCount: number } | null>>(`
    array::unique(*[_type == "article" && !sponsored && defined(publishedAt) && publishedAt <= now()].tags[])[defined(@)]{
      "tag": @,
      "articleCount": count(*[_type == "article" && !sponsored && defined(publishedAt) && publishedAt <= now() && @ in tags])
    }
  `);

  console.log("Updated non-sponsored tag counts:");
  updatedTagCounts
    .filter(
      (entry): entry is { tag: string; articleCount: number } =>
        Boolean(entry && typeof entry.tag === "string" && typeof entry.articleCount === "number")
    )
    .sort((left, right) => right.articleCount - left.articleCount)
    .forEach(({ tag, articleCount }) => {
      console.log(`- ${tag}: ${articleCount}`);
    });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});