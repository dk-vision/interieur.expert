import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import crypto from 'crypto';

config({ path: '.env.local' });

// Helper to generate unique keys
function generateKey() {
  return crypto.randomBytes(12).toString('hex');
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const articles = [
  // Stijlen
  {
    _type: 'article',
    title: 'Japandi: de perfecte balans tussen Japans en Scandinavisch design',
    slug: { _type: 'slug', current: 'japandi-stijl-guide' },
    excerpt: 'Ontdek hoe je de minimalistische elegantie van Japans design combineert met de gezellige warmte van Scandinavisch interieur.',
    category: 'Stijlen',
    tags: ['Japandi', 'Minimalisme', 'Scandinavisch'],
    publishedAt: '2026-01-18T10:00:00Z',
    readingTime: 7,
    sponsored: false,
    body: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [{ _type: 'span', _key: generateKey(), text: 'Japandi is meer dan een trend - het is een tijdloze ontwerpfilosofie die functionaliteit, kwaliteit en rust voorop stelt.' }],
        style: 'normal',
        markDefs: [],
      }
    ],
  },
  {
    _type: 'article',
    title: 'Warm minimalisme: zo creëer je een minimalistisch interieur dat uitnodigt',
    slug: { _type: 'slug', current: 'warm-minimalisme' },
    excerpt: 'Minimalisme hoeft niet koud of steriel te zijn. Ontdek hoe je met natuurlijke materialen en doordachte details een warm en gastvrij minimalistisch interieur creëert.',
    category: 'Stijlen',
    tags: ['Minimalisme', 'Warmte', 'Natuurlijke materialen'],
    publishedAt: '2026-01-17T10:00:00Z',
    readingTime: 6,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Het geheim van warm minimalisme ligt in de combinatie van strakke lijnen met tactiele, natuurlijke materialen zoals hout, linnen en wol.' }],
        style: 'normal',
      }
    ],
  },
  // Kleur
  {
    _type: 'article',
    title: 'Kleurpsychologie in interieur: hoe kleuren je stemming beïnvloeden',
    slug: { _type: 'slug', current: 'kleurpsychologie-interieur' },
    excerpt: 'Kleuren hebben een directe invloed op je gemoedstoestand en energie. Leer welke tinten het beste werken in welke ruimtes en waarom.',
    category: 'Kleur',
    tags: ['Kleurpsychologie', 'Welbevinden', 'Ruimtegevoel'],
    publishedAt: '2026-01-16T10:00:00Z',
    readingTime: 8,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Blauw heeft een kalmerende werking en verlaagt zelfs je hartslag - ideaal voor slaapkamers. Geel stimuleert creativiteit en energie, perfect voor werkruimtes.' }],
        style: 'normal',
      }
    ],
  },
  {
    _type: 'article',
    title: 'Neutrale kleuren slim combineren: meer dan grijs en beige',
    slug: { _type: 'slug', current: 'neutrale-kleuren-combineren' },
    excerpt: 'Neutrale kleuren vormen de basis van tijdloos interieur. Ontdek hoe je verschillende tinten greige, taupe en olijfgroen combineert voor diepte en karakter.',
    category: 'Kleur',
    tags: ['Kleur', 'Neutrale tinten', 'Basiskleuren'],
    publishedAt: '2026-01-15T10:00:00Z',
    readingTime: 6,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greige - een mix van grijs en beige - is veelzijdig en werkt als perfecte canvas voor accentkleuren en texturen.' }],
        style: 'normal',
      }
    ],
  },
  // Materialen
  {
    _type: 'article',
    title: 'De kracht van natuurlijke materialen in moderne interieurs',
    slug: { _type: 'slug', current: 'natuurlijke-materialen-modern' },
    excerpt: 'Hout, steen, linnen en klei brengen warmte, authenticiteit en een gevoel van verbondenheid met de natuur. Ontdek waarom natuurlijke materialen essentieel zijn.',
    category: 'Materialen',
    tags: ['Natuurlijke materialen', 'Hout', 'Steen', 'Textiel'],
    publishedAt: '2026-01-14T10:00:00Z',
    readingTime: 7,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Natuurlijke materialen verouderen mooi en krijgen karakter in de loop der tijd - in tegenstelling tot synthetische alternatieven die vooral degraderen.' }],
        style: 'normal',
      }
    ],
  },
  {
    _type: 'article',
    title: 'Vloeren kiezen: hout, tegel, vinyl of beton?',
    slug: { _type: 'slug', current: 'vloeren-vergelijken' },
    excerpt: 'Een praktische vergelijking van populaire vloertypen op duurzaamheid, onderhoud, kosten en uitstraling. Welke past het beste bij jouw situatie?',
    category: 'Materialen',
    tags: ['Vloeren', 'Materialen', 'Onderhoud'],
    publishedAt: '2026-01-13T10:00:00Z',
    readingTime: 10,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Massief houten vloeren zijn duurder in aanschaf maar kunnen meerdere keren geschuurd worden en gaan generaties lang mee.' }],
        style: 'normal',
      }
    ],
  },
  // Advies
  {
    _type: 'article',
    title: 'Je eerste woning inrichten: waar begin je?',
    slug: { _type: 'slug', current: 'eerste-woning-inrichten' },
    excerpt: 'Stap voor stap uitleg over hoe je slim prioriteert, een coherente stijl ontwikkelt en voorkomt dat je te snel te veel koopt.',
    category: 'Advies',
    tags: ['Starters', 'Budget', 'Planning'],
    publishedAt: '2026-01-19T10:00:00Z',
    readingTime: 9,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Begin met de basis: een goed bed, zitplek en verlichting. De rest kun je in de loop van de tijd toevoegen als je weet hoe je echt leeft in de ruimte.' }],
        style: 'normal',
      }
    ],
  },
  {
    _type: 'article',
    title: 'Kleine ruimtes groter laten lijken: wat werkt écht',
    slug: { _type: 'slug', current: 'kleine-ruimtes-tips' },
    excerpt: 'Geen trucjes of gimmicks, maar werkelijk effectieve manieren om kleine ruimtes functioneler en ruimer te maken.',
    category: 'Advies',
    tags: ['Kleine ruimtes', 'Ruimtegevoel', 'Functionaliteit'],
    publishedAt: '2026-01-12T10:00:00Z',
    readingTime: 7,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Spiegels helpen wel degelijk - maar alleen als ze natuurlijk licht reflecteren of een interessant zicht verdubbelen. Random spiegels maken het juist drukker.' }],
        style: 'normal',
      }
    ],
  },
  // Tips
  {
    _type: 'article',
    title: 'Budget inrichten zonder concessies: waar investeer je in?',
    slug: { _type: 'slug', current: 'budget-slim-investeren' },
    excerpt: 'Leer onderscheid maken tussen items waar je in moet investeren voor kwaliteit en waar je kunt besparen zonder aan sfeer in te boeten.',
    category: 'Tips',
    tags: ['Budget', 'Investeringen', 'Prioriteiten'],
    publishedAt: '2026-01-11T10:00:00Z',
    readingTime: 8,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Investeer in items waar je dagelijks op zit, slaapt of loopt: bank, bed, vloer. Decoratie kun je goedkoper oplossen en later upgraden.' }],
        style: 'normal',
      }
    ],
  },
  {
    _type: 'article',
    title: 'Gordijnen ophangen: hoogte en breedte bepalen',
    slug: { _type: 'slug', current: 'gordijnen-ophangen-tips' },
    excerpt: 'De juiste manier om gordijnen op te hangen maakt een enorm verschil in hoe hoog je plafond lijkt en hoe ruim je ramen ogen.',
    category: 'Tips',
    tags: ['Gordijnen', 'Raamdecoratie', 'Styling'],
    publishedAt: '2026-01-10T10:00:00Z',
    readingTime: 5,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Hang gordijnroedes 15-20 cm boven het raam en laat gordijnen tot op de vloer vallen - dit trekt de ruimte optisch omhoog.' }],
        style: 'normal',
      }
    ],
  },
  // Techniek
  {
    _type: 'article',
    title: 'Verlichting in lagen: algemeen, taak en accent',
    slug: { _type: 'slug', current: 'verlichting-lagen' },
    excerpt: 'Goede verlichting bestaat uit meerdere lagen die je combineert afhankelijk van het moment van de dag en de activiteit. Zo plan je dit.',
    category: 'Techniek',
    tags: ['Verlichting', 'Sfeer', 'Functionaliteit'],
    publishedAt: '2026-01-09T10:00:00Z',
    readingTime: 9,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Algemene verlichting zorgt voor basishelderheld, taakverlichting maakt werken mogelijk, en accentverlichting creëert sfeer en diepte.' }],
        style: 'normal',
      }
    ],
  },
  {
    _type: 'article',
    title: 'Akoestiek verbeteren in open ruimtes',
    slug: { _type: 'slug', current: 'akoestiek-verbeteren' },
    excerpt: 'Open ruimtes galmen vaak. Ontdek eenvoudige aanpassingen met textiel, meubels en materialen die galm verminderen zonder je budget te sprengen.',
    category: 'Techniek',
    tags: ['Akoestiek', 'Geluid', 'Wooncomfort'],
    publishedAt: '2026-01-08T10:00:00Z',
    readingTime: 6,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Zachte oppervlakken absorberen geluid: vloerkleden, gordijnen, gestoffeerde meubels en wandpanelen maken een enorm verschil.' }],
        style: 'normal',
      }
    ],
  },
  // Trends
  {
    _type: 'article',
    title: 'Interieurtrends 2026: textuur en ambacht',
    slug: { _type: 'slug', current: 'trends-2026-textuur' },
    excerpt: 'Na jaren van gladde oppervlakken zien we een verschuiving naar tactiele materialen en zichtbaar vakmanschap. Wat betekent dit voor jouw interieur?',
    category: 'Trends',
    tags: ['Trends', 'Textuur', 'Ambacht'],
    publishedAt: '2026-01-07T10:00:00Z',
    readingTime: 8,
    sponsored: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Lime wash muren, handgeknoop textiel, ruw keramiek - we zien overal een verlangen naar tastbare kwaliteit en imperfectie.' }],
        style: 'normal',
      }
    ],
  },
];

async function importArticles() {
  console.log('🚀 Starting import of real content...\n');

  for (const article of articles) {
    try {
      const result = await client.create(article);
      console.log(`✅ Created: ${article.title}`);
    } catch (error: any) {
      if (error.statusCode === 409) {
        console.log(`⚠️  Already exists: ${article.title}`);
      } else {
        console.error(`❌ Error creating ${article.title}:`, error.message);
      }
    }
  }

  console.log('\n✨ Import complete!');
}

importArticles().catch(console.error);
