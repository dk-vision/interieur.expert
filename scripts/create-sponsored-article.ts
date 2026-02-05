import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function createSponsoredArticle() {
  const partnerId = "7322008c-e3d5-41be-bd94-84a66eb3c9f7"; // Matthieu's Beddenbedrijf

  const article = {
    _type: "article",
    title: "Luxe beddengoed: wat maakt een bed echt goed?",
    slug: {
      _type: "slug",
      current: "luxe-beddengoed-wat-maakt-een-bed-echt-goed",
    },
    excerpt:
      "Een derde van je leven breng je slapend door. Ontdek waarom investeren in kwalitatief beddengoed niet alleen je slaapkwaliteit verbetert, maar ook je interieur een luxe upgrade geeft.",
    category: "advies",
    tags: ["slaapkamer", "luxe", "materialen", "comfort", "duurzaam"],
    publishedAt: new Date().toISOString(),
    sponsored: true,
    partner: {
      _type: "reference",
      _ref: partnerId,
    },
    sponsorDisclosure:
      "Dit artikel is mogelijk gemaakt door Matthieu's Beddenbedrijf. Alle informatie en aanbevelingen zijn onafhankelijk samengesteld door onze redactie.",
    readingTime: 6,
    seoTitle: "Luxe Beddengoed: De Ultieme Gids voor Kwalitatief Bedlinnen (2026)",
    seoDescription:
      "Ontdek wat echt luxe beddengoed maakt: van thread count tot materialen. Expertadvies over Egyptisch katoen, satijn, linnen en hoe je investeert in slaapcomfort.",
    body: [
      {
        _type: "block",
        _key: "intro1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro1-text",
            text: "We besteden gemiddeld acht uur per dag in bed. Dat is meer dan een derde van ons leven. Toch onderschatten veel mensen het belang van goed beddengoed. Het verschil tussen budget lakens en echt luxe beddengoed is niet alleen voelbaar in comfort, maar ook zichtbaar in je interieur en merkbaar in je slaapkwaliteit.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-1-text",
            text: "Wat maakt beddengoed 'luxe'?",
          },
        ],
      },
      {
        _type: "block",
        _key: "para2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para2-text",
            text: "Luxe beddengoed onderscheidt zich door drie essentiële factoren: materiaal, afwerking en duurzaamheid. Het gaat niet alleen om hoe het voelt, maar ook om hoe het gemaakt is en hoe lang het meegaat.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-1",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-1-text",
            text: "1. Thread count: hoger is niet altijd beter",
          },
        ],
      },
      {
        _type: "block",
        _key: "para3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para3-text",
            text: "De thread count (het aantal draden per vierkante inch) wordt vaak gezien als hét kwaliteitskenmerk, maar dat is een misvatting. Een thread count tussen 200 en 400 is ideaal voor ademend, zacht beddengoed. Alles boven de 600 kan juist minder comfortabel zijn omdat het de luchtstroom beperkt.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para4",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para4-text",
            text: "Belangrijker dan het aantal draden is de kwaliteit van het garen. Langvezelig Egyptisch katoen met een thread count van 300 voelt luxer aan dan synthetisch materiaal met een count van 1000.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-2",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-2-text",
            text: "2. Materialen: Egyptisch katoen, satijn of linnen?",
          },
        ],
      },
      {
        _type: "block",
        _key: "para5",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para5-text",
            marks: ["strong"],
            text: "Egyptisch katoen",
          },
          {
            _type: "span",
            _key: "para5-text2",
            text: " staat bekend om zijn extra lange vezels, wat zorgt voor zachte, sterke en glanzende stof. Het ademt uitstekend en wordt zachter na elke wasbeurt.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para6",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para6-text",
            marks: ["strong"],
            text: "Satijn",
          },
          {
            _type: "span",
            _key: "para6-text2",
            text: " is geen materiaal maar een weeftechniek die een gladde, glanzende oppervlakte creëert. Satijnen beddengoed voelt koel aan en is ideaal voor warme slapers of zomernachten.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para7",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para7-text",
            marks: ["strong"],
            text: "Linnen",
          },
          {
            _type: "span",
            _key: "para7-text2",
            text: " wint steeds meer terrein in luxe slaapkamers. Het heeft een natuurlijke, iets ruwere textuur die bijzonder goed ademt. Perfect voor zowel zomer als winter, en het krijgt een mooie vintage look door gebruik.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h3-3",
        style: "h3",
        children: [
          {
            _type: "span",
            _key: "h3-3-text",
            text: "3. Afwerking en details",
          },
        ],
      },
      {
        _type: "block",
        _key: "para8",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para8-text",
            text: "Echt luxe beddengoed herken je aan de details: dubbel gestikte naden, hoogwaardige ritsen of knoopsluiting, en eventueel handmatige afwerkingen zoals borduurwerk. Ook de verpassing (de brede rand aan het uiteinde van een hoeslaken) is een teken van kwaliteit.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-2-text",
            text: "De impact op je slaapkwaliteit",
          },
        ],
      },
      {
        _type: "block",
        _key: "para9",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para9-text",
            text: "Goede lakens reguleren je lichaamstemperatuur beter, wat essentieel is voor diepe slaap. Synthetische materialen kunnen vocht vasthouden en je laten zweten, terwijl natuurlijke vezels als katoen en linnen vocht afvoeren en je fris houden.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para10",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para10-text",
            text: "Daarnaast zijn luxe materialen vaak hypoallergeen en vriendelijker voor de huid. Mensen met een gevoelige huid of allergieën merken vaak direct verschil wanneer ze overstappen op kwalitatief beddengoed.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-3",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-3-text",
            text: "Investering die zich terugbetaalt",
          },
        ],
      },
      {
        _type: "block",
        _key: "para11",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para11-text",
            text: "Luxe beddengoed heeft een hogere aanschafprijs, maar gaat ook langer mee. Waar budget lakens na een paar jaar sleets zijn, behouden kwalitatieve sets hun zachtheid en kleur jarenlang. Reken op een levensduur van 5-10 jaar bij goed onderhoud.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para12",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para12-text",
            text: "Tel daarbij de verbeterde slaapkwaliteit en het visuele effect in je slaapkamer op, en de investering wordt een no-brainer. Een luxe opgemaakte bed tilt je hele interieur naar een hoger niveau.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-4",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-4-text",
            text: "Onderhoud: zo blijft het luxe",
          },
        ],
      },
      {
        _type: "block",
        _key: "para13",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para13-text",
            text: "Om je beddengoed in topconditie te houden: was het op maximaal 60 graden (check het etiket), gebruik mild wasmiddel zonder bleekmiddel, en droog bij voorkeur aan de lijn. Vermijd de droger waar mogelijk, vooral bij linnen en satijn.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para14",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para14-text",
            text: "Strijk beddengoed op lage temperatuur terwijl het nog licht vochtig is voor het mooiste resultaat. Of laat het juist kreuken bij linnen – die 'lived-in' look is momenteel zeer gewild in interieurstijling.",
          },
        ],
      },
      {
        _type: "block",
        _key: "h2-5",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "h2-5-text",
            text: "Waar begin je?",
          },
        ],
      },
      {
        _type: "block",
        _key: "para15",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para15-text",
            text: "Start met één goede set in een neutrale kleur zoals wit, beige of grijs. Deze vormt je basis en combineert met alles. Voel en vergelijk verschillende materialen in de winkel – wat voor de één heerlijk aanvoelt, vindt de ander misschien te glad of juist te ruw.",
          },
        ],
      },
      {
        _type: "block",
        _key: "para16",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "para16-text",
            text: "Let op certificeringen zoals OEKO-TEX (geen schadelijke stoffen) en GOTS (biologisch katoen) als duurzaamheid belangrijk voor je is. Deze labels garanderen dat je bed niet alleen luxe aanvoelt, maar ook verantwoord geproduceerd is.",
          },
        ],
      },
      {
        _type: "block",
        _key: "conclusion",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "conclusion-text",
            text: "Goed beddengoed is geen luxe maar een investering in dagelijkse kwaliteit van leven. Het verschil voel je elke nacht en zie je elke ochtend. En met de juiste zorg geniet je er jarenlang van.",
          },
        ],
      },
    ],
  };

  try {
    const result = await client.create(article);
    console.log("✅ Sponsored article created successfully!");
    console.log(`   Title: ${result.title}`);
    console.log(`   ID: ${result._id}`);
    console.log(`   URL: /artikels/${result.slug.current}`);
  } catch (error) {
    console.error("❌ Error creating article:", error);
  }
}

createSponsoredArticle();
