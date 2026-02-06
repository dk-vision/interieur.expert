import { createClient } from "@sanity/client";
import { config } from "dotenv";

// Load .env.local explicitly
config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function recreateDossiers() {
  try {
    console.log("🗑️  Deleting all existing dossiers...\n");
    
    // Get all dossier IDs
    const dossiers = await client.fetch(`*[_type == "dossier"]._id`);
    console.log(`Found ${dossiers.length} dossiers to delete`);
    
    // Delete all dossiers
    for (const id of dossiers) {
      await client.delete(id);
      console.log(`Deleted: ${id}`);
    }
    
    console.log("\n✅ All dossiers deleted\n");
    console.log("📋 Fetching available content...\n");
    
    // Get available articles, videos, and partners
    const articles = await client.fetch(`
      *[_type == "article"] | order(publishedAt desc) {
        _id,
        title,
        category
      }
    `);
    
    const videos = await client.fetch(`
      *[_type == "video"] | order(publishedAt desc) {
        _id,
        title
      }
    `);
    
    const partners = await client.fetch(`
      *[_type == "partner"] {
        _id,
        name
      }
    `);
    
    console.log(`Available: ${articles.length} articles, ${videos.length} videos, ${partners.length} partners\n`);
    
    // Get available images from articles
    const images = await client.fetch(`
      *[_type == "article" && defined(featuredImage.asset._ref)][0..5] {
        'imageRef': featuredImage.asset._ref
      }
    `);
    
    console.log(`Available images: ${images.length}\n`);
    
    // Helper function to safely find article
    const findArticle = (searchTerms: string[]) => {
      for (const term of searchTerms) {
        const found = articles.find((a: any) => 
          a.title.toLowerCase().includes(term.toLowerCase())
        );
        if (found) return found._id;
      }
      // Fallback to first article if no match
      return articles[0]?._id;
    };
    
    // Helper function to get articles by category
    const getArticlesByCategory = (category: string, count: number) => {
      return articles
        .filter((a: any) => a.category === category)
        .slice(0, count)
        .map((a: any) => ({ _type: "reference" as const, _ref: a._id }));
    };
    
    // Helper function to get mixed content
    const getMixedContent = (count: number) => {
      const content = [];
      
      // Add some articles
      for (let i = 0; i < Math.min(count - 1, articles.length); i++) {
        content.push({ _type: "reference" as const, _ref: articles[i]._id });
      }
      
      // Add a video if available
      if (videos.length > 0 && count > content.length) {
        content.push({ _type: "reference" as const, _ref: videos[0]._id });
      }
      
      return content;
    };
    
    // Create 3 new dossiers
    const newDossiers = [
      {
        _type: "dossier",
        title: "Scandinavisch Interieur: De Complete Gids",
        slug: {
          _type: "slug",
          current: "scandinavisch-interieur-gids",
        },
        excerpt: "Ontdek alles over de Scandinavische stijl: van minimalistische esthetiek tot warme natuurlijke materialen. Een complete reis door het meest geliefde interieurtrendveld van Europa.",
        featuredImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: images[0]?.imageRef || articles[0]?.featuredImage?.asset?._ref,
          },
        },
        intro: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "De Scandinavische interieurstijl heeft de afgelopen jaren een enorme populariteit gewonnen, en dat is niet zonder reden. Deze tijdloze stijl combineert functionaliteit met esthetiek, minimalisme met warmte, en eenvoud met verfijning. In dit uitgebreide dossier duiken we diep in alle aspecten van het Scandinavische interieur.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Van de basis principes van licht en ruimte tot de nieuwste trends zoals Japandi - de fusie van Japanse en Scandinavische design - behandelen we alles wat je moet weten om jouw woning in Scandinavische stijl in te richten.",
              },
            ],
          },
        ],
        themes: ["scandinavisch", "minimalisme", "natuurlijk", "licht"],
        articles: [
          { _type: "reference", _ref: findArticle(["Japandi", "scandinavisch", "minimalistisch"]) },
          { _type: "reference", _ref: findArticle(["Natuurlijke materialen", "natuur", "hout"]) },
          { _type: "reference", _ref: findArticle(["licht", "kleuren", "warm"]) },
          ...(videos.length > 0 ? [{ _type: "reference" as const, _ref: videos[0]._id }] : []),
        ],
        sponsors: partners.length > 0 ? [
          { _type: "reference", _ref: partners[0]._id },
        ] : [],
        publishedAt: new Date("2026-02-01").toISOString(),
        featured: true,
        seoTitle: "Scandinavisch Interieur: Complete Gids 2026 | Interieur.Expert",
        seoDescription: "Alles over Scandinavisch interieur: minimalisme, natuurlijke materialen, Japandi en meer. Praktische tips en inspiratie voor jouw Scandinavische woning.",
      },
      {
        _type: "dossier",
        title: "Kleurpsychologie in Interieur",
        slug: {
          _type: "slug",
          current: "kleurpsychologie-interieur",
        },
        excerpt: "Welke invloed hebben kleuren op je gemoedstoestand? Leer hoe je met slimme kleurkeuzes de perfecte sfeer creëert in elke ruimte van je woning.",
        featuredImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: images[1]?.imageRef || articles[1]?.featuredImage?.asset?._ref,
          },
        },
        intro: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Kleuren hebben een enorme impact op hoe we ons voelen in een ruimte. Van kalmerende blauwtinten in de slaapkamer tot energieke gele accenten in de werkruimte - de juiste kleurkeuze kan het verschil maken tussen een ruimte waar je graag verblijft en een die je liever mijdt.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "In dit dossier onderzoeken we de psychologische effecten van verschillende kleuren en leren we je hoe je deze kennis praktisch toepast in je eigen interieur. Of je nu op zoek bent naar rust, energie, of creatieve inspiratie - de juiste kleuren helpen je daar.",
              },
            ],
          },
        ],
        themes: ["kleuren", "psychologie", "sfeer", "wooncomfort"],
        articles: [
          { _type: "reference", _ref: findArticle(["kleuren", "Neutrale", "kleur"]) },
          { _type: "reference", _ref: findArticle(["warm", "sfeer", "licht"]) },
          ...getArticlesByCategory("inspiratie", 2),
          ...(videos.length > 1 ? [{ _type: "reference" as const, _ref: videos[1]._id }] : []),
        ],
        sponsors: partners.length > 1 ? [
          { _type: "reference", _ref: partners[1]._id },
        ] : [],
        publishedAt: new Date("2026-01-28").toISOString(),
        featured: false,
        seoTitle: "Kleurpsychologie in Interieur: Zo Beïnvloeden Kleuren Je Woning",
        seoDescription: "Ontdek de psychologische impact van kleuren in je interieur. Praktische tips voor het kiezen van de perfecte kleuren voor elke ruimte.",
      },
      {
        _type: "dossier",
        title: "Duurzaam Wonen in 2026",
        slug: {
          _type: "slug",
          current: "duurzaam-wonen-2026",
        },
        excerpt: "Van gerecyclede materialen tot energiezuinige verlichting: ontdek hoe je jouw interieur duurzamer maakt zonder concessies te doen aan stijl of comfort.",
        featuredImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: images[2]?.imageRef || articles[2]?.featuredImage?.asset?._ref,
          },
        },
        intro: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Duurzaamheid is niet langer een optie, maar een noodzaak. Gelukkig hoef je daarvoor niet je interieurstijl op te offeren. Sterker nog: duurzame materialen en bewuste keuzes kunnen juist leiden tot authentiekere, karaktervollere interieurs met een verhaal.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Dit dossier biedt een praktische roadmap voor iedereen die zijn woning duurzamer wil maken. We behandelen alles van het kiezen van de juiste materialen tot het verminderen van energieverbruik, en van circulaire meubels tot het verlengen van de levensduur van je interieur.",
              },
            ],
          },
        ],
        themes: ["duurzaamheid", "ecologisch", "natuurlijk", "circulair"],
        articles: [
          { _type: "reference", _ref: findArticle(["Duurzame", "duurzaam", "ecologisch"]) },
          { _type: "reference", _ref: findArticle(["Natuurlijke materialen", "natuur"]) },
          { _type: "reference", _ref: findArticle(["eerste woning", "tips", "begin"]) },
          ...getArticlesByCategory("advies", 2),
          ...(videos.length > 2 ? [{ _type: "reference" as const, _ref: videos[2]._id }] : []),
        ],
        sponsors: partners.length > 0 ? [
          { _type: "reference", _ref: partners[0]._id },
        ] : [],
        publishedAt: new Date("2026-02-05").toISOString(),
        featured: true,
        seoTitle: "Duurzaam Wonen 2026: Complete Gids voor Groen Interieur",
        seoDescription: "Maak je interieur duurzamer met onze complete gids. Tips voor ecologische materialen, energiebesparing en circulaire meubels.",
      },
    ];
    
    console.log("📝 Creating 3 new dossiers...\n");
    
    for (const dossier of newDossiers) {
      const created = await client.create(dossier);
      console.log(`✅ Created: ${dossier.title}`);
      console.log(`   Slug: /dossiers/${dossier.slug.current}`);
      console.log(`   Articles: ${dossier.articles.length}`);
      console.log(`   Sponsors: ${dossier.sponsors.length}`);
      console.log(`   Featured: ${dossier.featured ? "Yes" : "No"}\n`);
    }
    
    console.log("🎉 All dossiers successfully created!\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

recreateDossiers();
