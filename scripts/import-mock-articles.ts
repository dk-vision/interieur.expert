import { createClient } from "@sanity/client";

// Load environment variables from .env.local
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uf111z1c";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || "ska3henGs9Dy4rdBO80zNw2YFeVRjYxFxpQx8QZMOALDhaQmBOJGHLEB6sjY037H42Sz6sgQaEVVjCROG4Uwu9ymD4PrTdvk9zPLA4yTFfC3HQ9GOkvS10UtOoZqa2kBMlxJbvzclqRS4qeyhSwNve1x7AaxEn4eOC97GdWeGf7JTvltiYbw";

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const mockArticles = [
  {
    title: "De kracht van natuurlijke materialen in moderne interieurs",
    slug: "natuurlijke-materialen",
    excerpt:
      "Natuurlijke materialen brengen niet alleen warmte en karakter, maar ook een gevoel van rust en authenticiteit. Ontdek waarom hout, steen en linnen meer zijn dan een trend.",
    category: "Materialen",
    tags: ["Natuurlijke materialen", "Hout", "Steen", "Linnen"],
    publishedAt: "2026-01-12",
    readingTime: 7,
    sponsored: false,
    featuredImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
  },
  {
    title: "Minimalisme zonder koud te worden",
    slug: "warm-minimalisme",
    excerpt:
      "Hoe je een minimalistisch interieur creëert dat warm en uitnodigend blijft, zonder in clichés te vervallen.",
    category: "Stijlen",
    tags: ["Minimalisme", "Warmte"],
    publishedAt: "2026-01-10",
    readingTime: 5,
    sponsored: false,
    featuredImage: "https://images.unsplash.com/photo-1615874694520-474822394e73?w=800&q=80",
  },
  {
    title: "Kleur kiezen voor je woonkamer",
    slug: "kleur-kiezen",
    excerpt:
      "Een praktische gids om de juiste kleuren te vinden die bij jouw ruimte en levensstijl passen.",
    category: "Advies",
    tags: ["Kleur", "Woonkamer"],
    publishedAt: "2026-01-08",
    readingTime: 6,
    sponsored: false,
    featuredImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
  {
    title: "Verlichting als basis van je interieur",
    slug: "verlichting-basis",
    excerpt:
      "Waarom goede verlichting het fundament is van elk geslaagd interieur, en hoe je het goed aanpakt.",
    category: "Techniek",
    tags: ["Verlichting", "Basis"],
    publishedAt: "2026-01-05",
    readingTime: 8,
    sponsored: false,
    featuredImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
  },
  {
    title: "Kleine ruimtes groter laten lijken",
    slug: "kleine-ruimtes",
    excerpt:
      "Slimme inrichtingstips die écht werken, zonder trucjes of gimmicks.",
    category: "Tips",
    tags: ["Kleine ruimtes", "Inrichting"],
    publishedAt: "2026-01-02",
    readingTime: 5,
    sponsored: false,
    featuredImage: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
  },
  {
    title: "De comeback van ambachtelijk meubelwerk",
    slug: "ambachtelijk-meubelwerk",
    excerpt:
      "Waarom steeds meer mensen kiezen voor op maat gemaakt meubilair, en wat je moet weten voordat je begint.",
    category: "Ambacht",
    tags: ["Ambacht", "Meubelwerk", "Maatwerk"],
    publishedAt: "2025-12-28",
    readingTime: 6,
    sponsored: false,
    featuredImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
  },
];

// Generate sample body content
function generateBodyContent(title: string, excerpt: string) {
  return [
    {
      _type: "block",
      _key: "intro",
      style: "normal",
      children: [
        {
          _type: "span",
          text: excerpt,
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "heading1",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Waarom dit belangrijk is",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "para1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "In de wereld van interieurontwerp zoeken steeds meer mensen naar manieren om hun huis persoonlijker en betekenisvoller in te richten. Het gaat niet alleen om esthetiek, maar ook om het creëren van een ruimte die echt bij je past.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "heading2",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Praktische tips",
          marks: [],
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
          text: "Begin klein en bouw langzaam op. Rome is ook niet op één dag gebouwd, en dat geldt ook voor je interieur. Focus op één ruimte tegelijk en geef jezelf de tijd om te experimenteren.",
          marks: [],
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
          text: "Let op de details en kies kwaliteit boven kwantiteit. Een paar goede stukken maken meer indruk dan een huis vol spullen die je niet echt mooi vindt.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "heading3",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Conclusie",
          marks: [],
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
          text: "Door bewust te kiezen voor wat echt bij je past, creëer je een interieur waar je elke dag weer blij van wordt. Het vraagt misschien wat meer tijd en aandacht, maar het resultaat is het meer dan waard.",
          marks: [],
        },
      ],
    },
  ];
}

async function importArticles() {
  console.log("Starting import of mock articles...\n");

  for (const article of mockArticles) {
    console.log(`Importing: ${article.title}`);

    try {
      const doc = {
        _type: "article",
        title: article.title,
        slug: {
          _type: "slug",
          current: article.slug,
        },
        excerpt: article.excerpt,
        category: article.category,
        tags: article.tags,
        publishedAt: article.publishedAt,
        readingTime: article.readingTime,
        sponsored: article.sponsored,
        body: generateBodyContent(article.title, article.excerpt),
        // Note: featuredImage omitted - add via Studio UI later
      };

      await client.create(doc);
      console.log(`✓ Created: ${article.title}\n`);
    } catch (error) {
      console.error(`✗ Failed to create ${article.title}:`, error);
    }
  }

  console.log("\nImport complete!");
  console.log(
    "\nNote: Featured images are set to placeholders. You can:"
  );
  console.log("1. Upload images through the Studio UI");
  console.log("2. Or download the Unsplash images and upload them manually");
}

importArticles().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
