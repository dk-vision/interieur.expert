import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

// Helper to create a text span with optional marks
function createSpan(text: string, marks: string[] = []) {
  return {
    _type: "span",
    _key: Math.random().toString(36).substring(7),
    text,
    marks,
  };
}

// Helper to create a block
function createBlock(
  children: any[],
  style = "normal",
  markDefs: any[] = []
) {
  return {
    _type: "block",
    _key: Math.random().toString(36).substring(7),
    style,
    children,
    markDefs,
  };
}

// Helper to create blockquote
function createQuote(text: string) {
  return createBlock([createSpan(text)], "blockquote");
}

// Helper to find article ID by slug
async function findArticleId(slug: string) {
  const result = await client.fetch(
    `*[_type == 'article' && slug.current == $slug][0]._id`,
    { slug }
  );
  return result;
}

// Article enhancements
const enhancements: Record<
  string,
  {
    slug: string;
    bolds: Array<{ search: string; bold: string }>;
    quote?: string;
    quoteAfter?: string;
    internalLinks?: Array<{ search: string; linkTo: string }>;
  }
> = {
  warmMinimalisme: {
    slug: "warm-minimalisme",
    bolds: [
      {
        search: "Warm minimalisme",
        bold: "Warm minimalisme",
      },
      {
        search: "rust en ordelijkheid",
        bold: "rust en ordelijkheid",
      },
      {
        search: "natuurlijke materialen",
        bold: "natuurlijke materialen",
      },
    ],
    quote:
      "In een warm minimalistisch interieur heeft elk object een reden om er te zijn - functie, emotie, of beide.",
    quoteAfter: "functie hebben of je blij maken",
    internalLinks: [
      {
        search: "natuurlijke materialen",
        linkTo: "natuurlijke-materialen-modern",
      },
    ],
  },

  japandi: {
    slug: "japandi-stijl-guide",
    bolds: [
      { search: "Japandi", bold: "Japandi" },
      { search: "Japanse eenvoud", bold: "Japanse eenvoud" },
      { search: "Scandinavische warmte", bold: "Scandinavische warmte" },
    ],
    internalLinks: [
      {
        search: "natuurlijke materialen",
        linkTo: "natuurlijke-materialen-modern",
      },
    ],
  },

  neutraal: {
    slug: "neutrale-kleuren-combineren",
    bolds: [
      { search: "Neutrale kleuren", bold: "Neutrale kleuren" },
      { search: "grijs en beige", bold: "grijs en beige" },
      { search: "nuances", bold: "nuances" },
    ],
    quote:
      "De kracht van neutrale kleuren zit in de nuances - dezelfde tint in verschillende texturen creëert diepte.",
    quoteAfter: "nooit verveling",
    internalLinks: [
      {
        search: "kleurpsychologie",
        linkTo: "kleurpsychologie-interieur",
      },
    ],
  },

  kleur: {
    slug: "kleurpsychologie-interieur",
    bolds: [
      { search: "Kleuren", bold: "Kleuren" },
      { search: "directe invloed", bold: "directe invloed" },
      { search: "Blauwtinten", bold: "Blauwtinten" },
    ],
  },

  verlichting: {
    slug: "verlichting-lagen",
    bolds: [
      { search: "Goede verlichting", bold: "Goede verlichting" },
      { search: "drie lagen", bold: "drie lagen" },
    ],
    quote:
      "Licht is niet alleen functioneel - het bepaalt de hele sfeer van je ruimte.",
    quoteAfter: "verlichtingsbehoeften",
  },

  materialen: {
    slug: "natuurlijke-materialen-modern",
    bolds: [
      { search: "Natuurlijke materialen", bold: "Natuurlijke materialen" },
      { search: "warmte en karakter", bold: "warmte en karakter" },
    ],
  },

  vloeren: {
    slug: "vloeren-vergelijken",
    bolds: [
      { search: "vloer", bold: "vloer" },
      { search: "basis", bold: "basis" },
      { search: "Hout", bold: "Hout" },
    ],
  },

  gordijnen: {
    slug: "gordijnen-ophangen-tips",
    bolds: [
      { search: "gordijnen ophangt", bold: "gordijnen ophangt" },
      { search: "hoger dan je raam", bold: "hoger dan je raam" },
    ],
    internalLinks: [
      {
        search: "ruimte groter",
        linkTo: "kleine-ruimtes-tips",
      },
    ],
  },

  kleineRuimtes: {
    slug: "kleine-ruimtes-tips",
    bolds: [
      { search: "slimme keuzes", bold: "slimme keuzes" },
      { search: "Lichte kleuren", bold: "Lichte kleuren" },
      { search: "optisch groter", bold: "optisch groter" },
    ],
    internalLinks: [
      {
        search: "verlichting",
        linkTo: "verlichting-lagen",
      },
    ],
  },

  eersteWoning: {
    slug: "eerste-woning-inrichten",
    bolds: [
      { search: "eerste eigen woning", bold: "eerste eigen woning" },
      { search: "Begin met de basis", bold: "Begin met de basis" },
    ],
    quote: "De beste inrichting groeit met je mee - begin klein, bouw uit.",
    quoteAfter: "overzicht te houden",
    internalLinks: [
      {
        search: "budget",
        linkTo: "budget-slim-investeren",
      },
    ],
  },

  budget: {
    slug: "budget-slim-investeren",
    bolds: [
      { search: "beperkt budget", bold: "beperkt budget" },
      { search: "Investeer in kwaliteit", bold: "Investeer in kwaliteit" },
    ],
    quote:
      "Koop goedkoop wat je vaak vervangt, koop kwaliteit wat je dagelijks gebruikt.",
    quoteAfter: "dagelijks gebruik van maakt",
  },

  akoestiek: {
    slug: "akoestiek-verbeteren",
    bolds: [
      { search: "Open ruimtes", bold: "Open ruimtes" },
      { search: "Textiel", bold: "Textiel" },
    ],
  },

  trends: {
    slug: "trends-2026-textuur",
    bolds: [
      { search: "2026", bold: "2026" },
      { search: "authenticiteit", bold: "authenticiteit" },
      { search: "Textuur", bold: "Textuur" },
    ],
  },
};

async function enhanceArticle(key: string, config: any) {
  try {
    console.log(`\n📝 Enhancing: ${config.slug}`);

    // Fetch article
    const article = await client.fetch(
      `*[_type == 'article' && slug.current == $slug][0] { _id, body }`,
      { slug: config.slug }
    );

    if (!article) {
      console.log(`  ❌ Article not found`);
      return false;
    }

    let modified = false;
    const newBody = [...article.body];

    // Process each block
    for (let i = 0; i < newBody.length; i++) {
      const block = newBody[i];

      if (block._type !== "block" || !block.children) continue;

      // Track if we need to insert quote after this block
      let insertQuoteAfter = false;

      // Process children (text spans)
      for (let j = 0; j < block.children.length; j++) {
        const child = block.children[j];
        if (child._type !== "span") continue;

        let text = child.text;
        let marks = child.marks || [];

        // Apply bold
        if (config.bolds) {
          for (const { search, bold } of config.bolds) {
            if (text.includes(search) && !marks.includes("strong")) {
              // Check if this exact text should be bold
              if (text === search || text.includes(search)) {
                marks = [...marks, "strong"];
                modified = true;
                console.log(`  ✓ Made bold: "${search}"`);
              }
            }
          }
        }

        // Check if we should add quote after this block
        if (config.quote && config.quoteAfter && text.includes(config.quoteAfter)) {
          insertQuoteAfter = true;
        }

        // Apply internal links
        if (config.internalLinks) {
          for (const { search, linkTo } of config.internalLinks) {
            if (text.includes(search)) {
              // Find the target article ID
              const targetId = await findArticleId(linkTo);
              if (targetId) {
                const markKey = Math.random().toString(36).substring(7);
                if (!block.markDefs) block.markDefs = [];

                // Check if this mark already exists
                const existingMark = block.markDefs.find(
                  (m: any) =>
                    m._type === "internalArticleLink" &&
                    m.reference?._ref === targetId
                );

                if (!existingMark) {
                  block.markDefs.push({
                    _key: markKey,
                    _type: "internalArticleLink",
                    reference: {
                      _type: "reference",
                      _ref: targetId,
                    },
                  });

                  marks = [...marks, markKey];
                  modified = true;
                  console.log(`  ✓ Added link: "${search}" → ${linkTo}`);
                }
              }
            }
          }
        }

        // Update marks if changed
        if (marks.length > 0 && JSON.stringify(marks) !== JSON.stringify(child.marks)) {
          block.children[j] = { ...child, marks };
        }
      }

      // Insert quote after this block if needed
      if (insertQuoteAfter && config.quote) {
        newBody.splice(i + 1, 0, createQuote(config.quote));
        console.log(`  ✓ Added quote: "${config.quote.substring(0, 50)}..."`);
        modified = true;
        i++; // Skip the quote we just added
      }
    }

    // Update article if modified
    if (modified) {
      await client
        .patch(article._id)
        .set({ body: newBody })
        .commit();
      console.log(`  ✅ Article updated successfully`);
      return true;
    } else {
      console.log(`  ⚠️  No changes made`);
      return false;
    }
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}`);
    return false;
  }
}

async function enhanceAllArticles() {
  console.log("\n🚀 ENHANCING ALL ARTICLES\n");
  console.log("Adding bold text, quotes, and internal links...\n");

  let enhanced = 0;
  let failed = 0;

  for (const [key, config] of Object.entries(enhancements)) {
    const success = await enhanceArticle(key, config);
    if (success) enhanced++;
    else failed++;

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n\n${"=".repeat(60)}`);
  console.log(`✅ Enhanced: ${enhanced} articles`);
  console.log(`❌ Failed/Skipped: ${failed} articles`);
  console.log(`${"=".repeat(60)}\n`);
}

enhanceAllArticles();
