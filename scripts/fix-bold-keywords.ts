import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function findArticleId(slug: string) {
  return await client.fetch(
    `*[_type == 'article' && slug.current == $slug][0]._id`,
    { slug }
  );
}

const enhancements: Record<
  string,
  {
    slug: string;
    keywords: string[];
    quote?: string;
    links: Array<{ text: string; linkTo: string }>;
  }
> = {
  warmMinimalisme: {
    slug: "warm-minimalisme",
    keywords: ["minimalisme", "rust", "gezelligheid"],
    quote: "In een warm minimalistisch interieur heeft elk object een reden om er te zijn.",
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
      { text: "Japandi", linkTo: "japandi-stijl-guide" },
    ],
  },
  japandi: {
    slug: "japandi-stijl-guide",
    keywords: ["Japandi", "wabi-sabi", "hygge"],
    quote: "Japandi is waar Japanse perfectie en Scandinavische warmte elkaar ontmoeten.",
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
      { text: "minimalisme", linkTo: "warm-minimalisme" },
    ],
  },
  neutraal: {
    slug: "neutrale-kleuren-combineren",
    keywords: ["textuur", "diepte", "nuances"],
    quote: "Neutrale kleuren zijn niet saai - ze zijn een canvas voor textuur en licht.",
    links: [
      { text: "kleurpsychologie", linkTo: "kleurpsychologie-interieur" },
      { text: "verlichting", linkTo: "verlichting-lagen" },
    ],
  },
  kleur: {
    slug: "kleurpsychologie-interieur",
    keywords: ["blauw", "groen", "warmte", "rust"],
    quote: "Kleuren bepalen niet alleen hoe een ruimte eruitziet, maar ook hoe je je erin voelt.",
    links: [{ text: "neutrale kleuren", linkTo: "neutrale-kleuren-combineren" }],
  },
  verlichting: {
    slug: "verlichting-lagen",
    keywords: ["sfeerverlichting", "taakverlichting", "accentverlichting"],
    quote: "Goede verlichting gebruik je in lagen - net als bij een mooi schilderij.",
    links: [{ text: "kleine ruimtes", linkTo: "kleine-ruimtes-tips" }],
  },
  materialen: {
    slug: "natuurlijke-materialen-modern",
    keywords: ["hout", "steen", "linnen", "authenticiteit"],
    quote: "Natuurlijke materialen brengen het buitenleven naar binnen.",
    links: [
      { text: "warm minimalisme", linkTo: "warm-minimalisme" },
      { text: "Japandi", linkTo: "japandi-stijl-guide" },
    ],
  },
  vloeren: {
    slug: "vloeren-vergelijken",
    keywords: ["parket", "pvc", "onderhoud", "duurzaamheid"],
    quote: "Je vloer is het fundament van je interieur - letterlijk en figuurlijk.",
    links: [{ text: "budget", linkTo: "budget-slim-investeren" }],
  },
  gordijnen: {
    slug: "gordijnen-ophangen-tips",
    keywords: ["raamhoogte", "optisch", "plooi"],
    quote: "Gordijnen op de juiste hoogte maken je raam - en je ruimte - groter.",
    links: [{ text: "ruimte groter laten lijken", linkTo: "kleine-ruimtes-tips" }],
  },
  kleineRuimtes: {
    slug: "kleine-ruimtes-tips",
    keywords: ["spiegels", "multifunctioneel", "licht"],
    quote: "Een kleine ruimte groter maken begint bij slimme illusies, niet bij verbouwen.",
    links: [
      { text: "verlichting", linkTo: "verlichting-lagen" },
      { text: "neutrale kleuren", linkTo: "neutrale-kleuren-combineren" },
      { text: "gordijnen", linkTo: "gordijnen-ophangen-tips" },
    ],
  },
  eersteWoning: {
    slug: "eerste-woning-inrichten",
    keywords: ["prioriteiten", "essentials", "groeiplan"],
    quote: "Je eerste woning inrichten is als een puzzel - begin met de hoeken, de rest volgt vanzelf.",
    links: [
      { text: "budget slim investeren", linkTo: "budget-slim-investeren" },
      { text: "kleine ruimtes", linkTo: "kleine-ruimtes-tips" },
    ],
  },
  budget: {
    slug: "budget-slim-investeren",
    keywords: ["kwaliteit", "tweedehands", "tijdloos"],
    quote: "Bij interieur geldt: koop goedkoop wat slijt, investeer in wat blijft.",
    links: [
      { text: "eerste woning", linkTo: "eerste-woning-inrichten" },
      { text: "vloeren", linkTo: "vloeren-vergelijken" },
    ],
  },
  akoestiek: {
    slug: "akoestiek-verbeteren",
    keywords: ["geluidsabsorptie", "echo", "textiel"],
    quote: "Goede akoestiek voel je niet bewust, maar je hoort het verschil wel.",
    links: [{ text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" }],
  },
  trends: {
    slug: "trends-2026-textuur",
    keywords: ["ambacht", "authentiek", "imperfectie"],
    quote: "De trend van 2026 is niet nieuw - het is een terugkeer naar echte vakmanschap.",
    links: [
      { text: "natuurlijke materialen", linkTo: "natuurlijke-materialen-modern" },
      { text: "Japandi", linkTo: "japandi-stijl-guide" },
    ],
  },
};

async function cleanAndEnhanceArticle(key: string, config: any) {
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

    const newBody: any[] = [];
    let modified = false;
    let paragraphCount = 0;
    let quoteAdded = false;

    for (const block of article.body) {
      if (block._type === "blockquote") {
        // Skip existing quotes, we'll add a fresh one
        console.log(`  ✓ Removed old quote`);
        modified = true;
        continue;
      }

      if (block._type !== "block" || !block.children) {
        newBody.push(block);
        continue;
      }

      // Count paragraphs
      if (block.style === "normal") {
        paragraphCount++;
      }

      // Clean all strong marks and rebuild with only specific keywords
      const newChildren: any[] = [];
      const newMarkDefs: any[] = [];
      const processedLinks = new Set<string>();

      for (const child of block.children) {
        if (child._type !== "span") {
          newChildren.push(child);
          continue;
        }

        const text = child.text;
        const cleanMarks = (child.marks || []).filter((m: string) => m !== "strong");

        // Find all keyword positions
        const keywordMatches: Array<{ start: number; end: number; keyword: string }> = [];
        
        for (const keyword of config.keywords) {
          const regex = new RegExp(`\\b${keyword}\\b`, "gi");
          let match;
          while ((match = regex.exec(text)) !== null) {
            keywordMatches.push({
              start: match.index,
              end: match.index + match[0].length,
              keyword: match[0],
            });
          }
        }

        // Sort matches by position
        keywordMatches.sort((a, b) => a.start - b.start);

        // If no keywords found, just add as clean text
        if (keywordMatches.length === 0) {
          // Check for links
          let marks = [...cleanMarks];
          for (const link of config.links) {
            if (text.toLowerCase().includes(link.text.toLowerCase())) {
              const linkKey = `${link.text}-${link.linkTo}`;
              if (!processedLinks.has(linkKey)) {
                const targetId = await findArticleId(link.linkTo);
                if (targetId) {
                  const markKey = `link-${Math.random().toString(36).substring(7)}`;
                  newMarkDefs.push({
                    _key: markKey,
                    _type: "internalArticleLink",
                    reference: { _type: "reference", _ref: targetId },
                  });
                  marks.push(markKey);
                  processedLinks.add(linkKey);
                  console.log(`  ✓ Link: "${link.text}" → ${link.linkTo}`);
                  modified = true;
                }
              }
            }
          }

          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).substring(7),
            text,
            marks: marks.length > 0 ? marks : undefined,
          });
          continue;
        }

        // Split text around keywords
        let lastPos = 0;
        for (const match of keywordMatches) {
          // Text before keyword
          if (match.start > lastPos) {
            const beforeText = text.substring(lastPos, match.start);
            let marks = [...cleanMarks];
            
            // Check for links in this segment
            for (const link of config.links) {
              if (beforeText.toLowerCase().includes(link.text.toLowerCase())) {
                const linkKey = `${link.text}-${link.linkTo}`;
                if (!processedLinks.has(linkKey)) {
                  const targetId = await findArticleId(link.linkTo);
                  if (targetId) {
                    const markKey = `link-${Math.random().toString(36).substring(7)}`;
                    newMarkDefs.push({
                      _key: markKey,
                      _type: "internalArticleLink",
                      reference: { _type: "reference", _ref: targetId },
                    });
                    marks.push(markKey);
                    processedLinks.add(linkKey);
                    console.log(`  ✓ Link: "${link.text}" → ${link.linkTo}`);
                    modified = true;
                  }
                }
              }
            }

            newChildren.push({
              _type: "span",
              _key: Math.random().toString(36).substring(7),
              text: beforeText,
              marks: marks.length > 0 ? marks : undefined,
            });
          }

          // Keyword itself (bold)
          const keywordText = text.substring(match.start, match.end);
          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).substring(7),
            text: keywordText,
            marks: [...cleanMarks, "strong"],
          });
          console.log(`  ✓ Bold: "${keywordText}"`);
          modified = true;

          lastPos = match.end;
        }

        // Text after last keyword
        if (lastPos < text.length) {
          const afterText = text.substring(lastPos);
          let marks = [...cleanMarks];
          
          // Check for links in this segment
          for (const link of config.links) {
            if (afterText.toLowerCase().includes(link.text.toLowerCase())) {
              const linkKey = `${link.text}-${link.linkTo}`;
              if (!processedLinks.has(linkKey)) {
                const targetId = await findArticleId(link.linkTo);
                if (targetId) {
                  const markKey = `link-${Math.random().toString(36).substring(7)}`;
                  newMarkDefs.push({
                    _key: markKey,
                    _type: "internalArticleLink",
                    reference: { _type: "reference", _ref: targetId },
                  });
                  marks.push(markKey);
                  processedLinks.add(linkKey);
                  console.log(`  ✓ Link: "${link.text}" → ${link.linkTo}`);
                  modified = true;
                }
              }
            }
          }

          newChildren.push({
            _type: "span",
            _key: Math.random().toString(36).substring(7),
            text: afterText,
            marks: marks.length > 0 ? marks : undefined,
          });
        }
      }

      newBody.push({
        ...block,
        children: newChildren,
        markDefs: newMarkDefs.length > 0 ? newMarkDefs : block.markDefs,
      });

      // Add quote after paragraph 2
      if (config.quote && paragraphCount === 2 && !quoteAdded) {
        newBody.push({
          _type: "block",
          _key: `quote-${Math.random().toString(36).substring(7)}`,
          style: "blockquote",
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36).substring(7),
              text: config.quote,
            },
          ],
          markDefs: [],
        });
        console.log(`  ✓ Quote added`);
        quoteAdded = true;
        modified = true;
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
  console.log("\n🚀 FIXING BOLD + ADDING QUOTES & LINKS\n");

  let count = 0;
  for (const [key, config] of Object.entries(enhancements)) {
    const success = await cleanAndEnhanceArticle(key, config);
    if (success) count++;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Fixed: ${count}/${Object.keys(enhancements).length}`);
  console.log(`${"=".repeat(50)}\n`);
}

main();
