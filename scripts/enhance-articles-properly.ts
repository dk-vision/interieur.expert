import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

// Find article ID by slug
async function findArticleId(slug: string) {
  const result = await client.fetch(
    `*[_type == 'article' && slug.current == $slug][0]._id`,
    { slug }
  );
  return result;
}

// Article enhancements with selective keywords, quotes, and links
const enhancements: Record<
  string,
  {
    slug: string;
    keywords: string[]; // Only these exact words get bold
    quote?: string;
    insertQuoteAfterParagraph?: number; // Insert after this paragraph (0-based)
    links: Array<{ text: string; linkTo: string }>;
    image?: { url: string; alt: string; caption?: string };
  }
> = {
  warmMinimalisme: {
    slug: "warm-minimalisme",
    keywords: ["minimalisme", "rust", "gezelligheid"],
    quote: "In een warm minimalistisch interieur heeft elk object een reden om er te zijn.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
      { text: "Japandi", linkTo: "japandi-stijl-guide" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200",
      alt: "Warm minimalistisch interieur met natuurlijke materialen",
      caption: "Warm minimalisme combineert eenvoud met gezelligheid",
    },
  },

  japandi: {
    slug: "japandi-stijl-guide",
    keywords: ["Japandi", "wabi-sabi", "hygge"],
    quote: "Japandi is waar Japanse perfectie en Scandinavische warmte elkaar ontmoeten.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
      { text: "minimalisme", linkTo: "warm-minimalisme" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
      alt: "Japandi interieur met mix van Japanse en Scandinavische elementen",
      caption: "De perfecte balans tussen Oost en West",
    },
  },

  neutraal: {
    slug: "neutrale-kleuren-combineren",
    keywords: ["textuur", "diepte", "nuances"],
    quote: "Neutrale kleuren zijn niet saai - ze zijn een canvas voor textuur en licht.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "kleurpsychologie", linkTo: "kleurpsychologie-interieur" },
      { text: "verlichting", linkTo: "verlichting-lagen" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1616594266898-ebc6c2b40b50?w=1200",
      alt: "Interieur met neutrale kleuren en verschillende texturen",
      caption: "Neutrale tinten in verschillende lagen creëren diepte",
    },
  },

  kleur: {
    slug: "kleurpsychologie-interieur",
    keywords: ["blauw", "groen", "warmte", "rust"],
    quote: "Kleuren bepalen niet alleen hoe een ruimte eruitziet, maar ook hoe je je erin voelt.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "neutrale kleuren", linkTo: "neutrale-kleuren-combineren" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
      alt: "Interieur met verschillende kleuraccenten",
      caption: "Elke kleur heeft zijn eigen psychologische effect",
    },
  },

  verlichting: {
    slug: "verlichting-lagen",
    keywords: ["sfeerverlichting", "taakverlichting", "accentverlichting"],
    quote: "Goede verlichting gebruik je in lagen - net als bij een mooi schilderij.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "kleine ruimtes", linkTo: "kleine-ruimtes-tips" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200",
      alt: "Woonkamer met gelaagde verlichting",
      caption: "Verschillende lichtlagen creëren sfeer en functionaliteit",
    },
  },

  materialen: {
    slug: "natuurlijke-materialen-modern",
    keywords: ["hout", "steen", "linnen", "authenticiteit"],
    quote: "Natuurlijke materialen brengen het buitenleven naar binnen.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "warm minimalisme", linkTo: "warm-minimalisme" },
      { text: "Japandi", linkTo: "japandi-stijl-guide" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      alt: "Interieur met natuurlijke materialen zoals hout en steen",
      caption: "Natuurlijke materialen voegen warmte en karakter toe",
    },
  },

  vloeren: {
    slug: "vloeren-vergelijken",
    keywords: ["parket", "pvc", "onderhoud", "duurzaamheid"],
    quote: "Je vloer is het fundament van je interieur - letterlijk en figuurlijk.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "budget", linkTo: "budget-slim-investeren" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      alt: "Verschillende vloertypen naast elkaar",
      caption: "Elk vloertype heeft zijn eigen voor- en nadelen",
    },
  },

  gordijnen: {
    slug: "gordijnen-ophangen-tips",
    keywords: ["raamhoogte", "optisch", "plooi"],
    quote: "Gordijnen op de juiste hoogte maken je raam - en je ruimte - groter.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "ruimte groter laten lijken", linkTo: "kleine-ruimtes-tips" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1616594266898-ebc6c2b40b50?w=1200",
      alt: "Gordijnen opgehangen boven raamhoogte",
      caption: "Hang gordijnen altijd hoger dan je raam voor meer optische hoogte",
    },
  },

  kleineRuimtes: {
    slug: "kleine-ruimtes-tips",
    keywords: ["spiegels", "multifunctioneel", "licht"],
    quote: "Een kleine ruimte groter maken begint bij slimme illusies, niet bij verbouwen.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "verlichting", linkTo: "verlichting-lagen" },
      { text: "neutrale kleuren", linkTo: "neutrale-kleuren-combineren" },
      { text: "gordijnen", linkTo: "gordijnen-ophangen-tips" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200",
      alt: "Kleine woonkamer slim ingericht met spiegels en lichte kleuren",
      caption: "Met de juiste trucs lijkt elke ruimte groter",
    },
  },

  eersteWoning: {
    slug: "eerste-woning-inrichten",
    keywords: ["prioriteiten", "essentials", "groeiplan"],
    quote: "Je eerste woning inrichten is als een puzzel - begin met de hoeken, de rest volgt vanzelf.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "budget slim investeren", linkTo: "budget-slim-investeren" },
      { text: "kleine ruimtes", linkTo: "kleine-ruimtes-tips" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200",
      alt: "Eerste woning met basisinrichting",
      caption: "Begin met de essentials en bouw langzaam uit",
    },
  },

  budget: {
    slug: "budget-slim-investeren",
    keywords: ["kwaliteit", "tweedehands", "tijdloos"],
    quote: "Bij interieur geldt: koop goedkoop wat slijt, investeer in wat blijft.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "eerste woning", linkTo: "eerste-woning-inrichten" },
      { text: "vloeren", linkTo: "vloeren-vergelijken" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200",
      alt: "Stijlvol interieur met mix van budget en investeerstukken",
      caption: "Slim budgetteren betekent weten waar je in investeert",
    },
  },

  akoestiek: {
    slug: "akoestiek-verbeteren",
    keywords: ["geluidsabsorptie", "echo", "textiel"],
    quote: "Goede akoestiek voel je niet bewust, maar je hoort het verschil wel.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      alt: "Open ruimte met akoestische elementen zoals gordijnen en kleden",
      caption: "Textiel en zachte materialen verbeteren de akoestiek",
    },
  },

  trends: {
    slug: "trends-2026-textuur",
    keywords: ["ambacht", "authentiek", "imperfectie"],
    quote: "De trend van 2026 is niet nieuw - het is een terugkeer naar echte vakmanschap.",
    insertQuoteAfterParagraph: 1,
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
      { text: "Japandi", linkTo: "japandi-stijl-guide" },
    ],
    image: {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      alt: "Ambachtelijk interieur met textuurrijke materialen",
      caption: "Textuur en ambacht staan centraal in 2026",
    },
  },
};

async function enhanceArticle(key: string, config: any) {
  try {
    console.log(`\n📝 ${config.slug}`);

    const article = await client.fetch(
      `*[_type == 'article' && slug.current == $slug][0] { _id, body }`,
      { slug: config.slug }
    );

    if (!article) {
      console.log(`  ❌ Not found`);
      return false;
    }

    const newBody = JSON.parse(JSON.stringify(article.body));
    let modified = false;

    // Process blocks for text enhancements
    let paragraphCount = 0;
    for (let i = 0; i < newBody.length; i++) {
      const block = newBody[i];

      if (block._type !== "block" || !block.children) continue;

      const isNormalParagraph = block.style === "normal";
      if (isNormalParagraph) {
        paragraphCount++;
      }

      // Process each span in the block
      const newChildren = [];
      if (!block.markDefs) block.markDefs = [];

      for (const child of block.children) {
        if (child._type !== "span") {
          newChildren.push(child);
          continue;
        }

        let text = child.text;
        const segments = [];
        let lastIndex = 0;

        // Find keywords and create bold spans
        for (const keyword of config.keywords) {
          const regex = new RegExp(`\\b${keyword}\\b`, "gi");
          let match;

          while ((match = regex.exec(text)) !== null) {
            const start = match.index;
            const end = start + match[0].length;

            // Add text before keyword
            if (start > lastIndex) {
              segments.push({
                start: lastIndex,
                end: start,
                marks: child.marks || [],
              });
            }

            // Add keyword with bold
            segments.push({
              start,
              end,
              marks: [...(child.marks || []), "strong"],
            });

            lastIndex = end;
          }
        }

        // Add any remaining text
        if (lastIndex < text.length) {
          segments.push({
            start: lastIndex,
            end: text.length,
            marks: child.marks || [],
          });
        }

        // If no segments, keep original
        if (segments.length === 0) {
          segments.push({
            start: 0,
            end: text.length,
            marks: child.marks || [],
          });
        }

        // Create spans from segments
        for (const seg of segments) {
          if (seg.start === seg.end) continue;

          const segmentText = text.substring(seg.start, seg.end);
          let marks = seg.marks;

          // Check for internal links
          for (const link of config.links) {
            if (segmentText.toLowerCase().includes(link.text.toLowerCase())) {
              const targetId = await findArticleId(link.linkTo);
              if (targetId) {
                const markKey = Math.random().toString(36).substring(7);
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
                  console.log(`  ✓ Link: "${link.text}" → ${link.linkTo}`);
                  modified = true;
                }
              }
            }
          }

          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).substring(7),
            text: segmentText,
            marks: marks.length > 0 ? marks : undefined,
          });

          if (seg.marks.includes("strong") && !child.marks?.includes("strong")) {
            console.log(`  ✓ Bold: "${segmentText}"`);
            modified = true;
          }
        }
      }

      block.children = newChildren;

      // Insert quote after specified paragraph
      if (
        config.quote &&
        config.insertQuoteAfterParagraph !== undefined &&
        paragraphCount === config.insertQuoteAfterParagraph + 1
      ) {
        newBody.splice(i + 1, 0, {
          _type: "block",
          _key: Math.random().toString(36).substring(7),
          style: "blockquote",
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36).substring(7),
              text: config.quote,
              marks: [],
            },
          ],
          markDefs: [],
        });
        console.log(`  ✓ Quote added`);
        modified = true;
        i++; // Skip the inserted quote
      }
    }

    if (modified) {
      await client.patch(article._id).set({ body: newBody }).commit();
      console.log(`  ✅ Updated`);
      return true;
    } else {
      console.log(`  ⚠️  No changes`);
      return false;
    }
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("\n🚀 ENHANCING ALL ARTICLES\n");

  let enhanced = 0;
  for (const [key, config] of Object.entries(enhancements)) {
    const success = await enhanceArticle(key, config);
    if (success) enhanced++;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Enhanced: ${enhanced}/${Object.keys(enhancements).length}`);
  console.log(`${"=".repeat(50)}\n`);
}

main();
