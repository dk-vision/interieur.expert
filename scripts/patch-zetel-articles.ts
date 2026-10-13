import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const APPLY = process.env.APPLY_PATCH === "true";

let keyCounter = Date.now() % 1000000;
const nextKey = () => `zk${(keyCounter++).toString(36)}`;

function blockText(block: any): string {
  return (block.children || []).map((c: any) => c.text).join("");
}

// Split a single-span block's matching child to wrap `phrase` in a "strong" mark.
// Only handles blocks where the phrase appears in exactly one child span, and that
// span currently has no marks that would conflict (keeps existing marks + adds "strong").
function applyBold(block: any, phrase: string): boolean {
  const children = block.children || [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child._type !== "span" || typeof child.text !== "string") continue;
    const idx = child.text.indexOf(phrase);
    if (idx === -1) continue;
    const before = child.text.slice(0, idx);
    const match = child.text.slice(idx, idx + phrase.length);
    const after = child.text.slice(idx + phrase.length);
    const newSpans: any[] = [];
    if (before) newSpans.push({ _type: "span", _key: nextKey(), text: before, marks: [...(child.marks || [])] });
    newSpans.push({ _type: "span", _key: nextKey(), text: match, marks: [...(child.marks || []), "strong"] });
    if (after) newSpans.push({ _type: "span", _key: nextKey(), text: after, marks: [...(child.marks || [])] });
    children.splice(i, 1, ...newSpans);
    return true;
  }
  return false;
}

// Build a new paragraph block with internalArticleLink marks for the given link phrases.
function buildLinkParagraph(prefix: string, links: { phrase: string; articleId: string }[], suffix: string): any {
  const markDefs: any[] = [];
  const children: any[] = [];
  if (prefix) children.push({ _type: "span", _key: nextKey(), text: prefix, marks: [] });
  links.forEach((link, i) => {
    const key = nextKey();
    markDefs.push({ _key: key, _type: "internalArticleLink", reference: { _type: "reference", _ref: link.articleId } });
    children.push({ _type: "span", _key: nextKey(), text: link.phrase, marks: [key] });
    if (i < links.length - 1) {
      children.push({ _type: "span", _key: nextKey(), text: " en ", marks: [] });
    }
  });
  if (suffix) children.push({ _type: "span", _key: nextKey(), text: suffix, marks: [] });
  return { _type: "block", _key: nextKey(), style: "normal", markDefs, children };
}

interface Patch {
  slug: string;
  articleId: string;
  boldPhrases: string[];
  linkPrefix: string;
  links: { phrase: string; targetSlug: string }[];
  linkSuffix: string;
}

const patches: Patch[] = [
  {
    slug: "kwalitatieve-zetel-herkennen",
    articleId: "article-kwalitatieve-zetel-herkennen",
    boldPhrases: ["ruggengraat van de zetel", "Goede vering voelt gecontroleerd.", "Een iets stevigere vulling blijft vaak beter in vorm."],
    linkPrefix: "Wil je de aankoop zelf ook goed aanpakken? Lees ook ",
    links: [
      { phrase: "Zetel kopen: waar moet je echt op letten?", targetSlug: "zetel-kopen-waarop-letten" },
      { phrase: "Een zetel testen in de winkel: 9 dingen die je echt moet doen", targetSlug: "zetel-testen-in-de-winkel" },
    ],
    linkSuffix: ".",
  },
  {
    slug: "stof-of-leren-zetel-kiezen",
    articleId: "article-stof-of-leren-zetel-kiezen",
    boldPhrases: ["Materiaal bepaalt hoe een zetel aanvoelt", "moderne performancestoffen", "Daarnaast ontwikkelt echt leder karakter."],
    linkPrefix: "Wil je dit combineren met kwaliteit en levensstijl? Lees ook ",
    links: [
      { phrase: "Hoe herken je een kwalitatieve zetel in de winkel?", targetSlug: "kwalitatieve-zetel-herkennen" },
      { phrase: "Welke zetel past bij jouw leven?", targetSlug: "welke-zetel-past-bij-jou" },
    ],
    linkSuffix: ".",
  },
  {
    slug: "welke-zetel-past-bij-jou",
    articleId: "article-welke-zetel-past-bij-jou",
    boldPhrases: ["past bij jouw manier van wonen", "middelhoge modellen", "proportie belangrijker dan bravoure"],
    linkPrefix: "Twijfel je ook over de juiste afmeting of hoe je een model in de winkel goed test? Lees ook ",
    links: [
      { phrase: "Welke afmeting van zetel werkt in jouw woonkamer?", targetSlug: "zetel-afmetingen-woonkamer" },
      { phrase: "Een zetel testen in de winkel: 9 dingen die je echt moet doen", targetSlug: "zetel-testen-in-de-winkel" },
    ],
    linkSuffix: ".",
  },
  {
    slug: "zetel-afmetingen-woonkamer",
    articleId: "article-zetel-afmetingen-woonkamer",
    boldPhrases: ["meest voorkomende oorzaken van spijt", "de kamer nog goed laat functioneren", "je woonkamer beter laat werken"],
    linkPrefix: "Wil je naast de juiste maat ook weten welk materiaal of model bij je past? Lees ook ",
    links: [
      { phrase: "Welke zetel past bij jouw leven?", targetSlug: "welke-zetel-past-bij-jou" },
      { phrase: "Stof of lederen zetel? Zo maak je de juiste keuze", targetSlug: "stof-of-leren-zetel-kiezen" },
    ],
    linkSuffix: ".",
  },
  {
    slug: "zetel-testen-in-de-winkel",
    articleId: "article-zetel-testen-in-de-winkel",
    boldPhrases: ["test dus niet beleefd, maar bewust", "Test twee of drie modellen vlak na elkaar."],
    linkPrefix: "Wil je ook weten waar je op moet letten vóór je de winkel binnenstapt? Lees ook ",
    links: [
      { phrase: "Zetel kopen: waar moet je echt op letten?", targetSlug: "zetel-kopen-waarop-letten" },
      { phrase: "Hoe herken je een kwalitatieve zetel in de winkel?", targetSlug: "kwalitatieve-zetel-herkennen" },
    ],
    linkSuffix: ".",
  },
];

async function main() {
  const slugToId: Record<string, string> = {};
  const idRows = await client.fetch(
    `*[_type=="article" && !(_id in path("drafts.**")) && slug.current in $slugs]{_id, "slug": slug.current}`,
    { slugs: patches.flatMap((p) => p.links.map((l) => l.targetSlug)) }
  );
  for (const row of idRows as any[]) slugToId[row.slug] = row._id;

  for (const patch of patches) {
    console.log(`\n=== ${patch.slug} ===`);
    const doc = await client.fetch(`*[_id==$id][0]{body}`, { id: patch.articleId });
    if (!doc?.body) {
      console.log("  SKIP: document not found");
      continue;
    }
    const body = JSON.parse(JSON.stringify(doc.body));

    let boldApplied = 0;
    for (const phrase of patch.boldPhrases) {
      let applied = false;
      for (const block of body) {
        if (block._type !== "block") continue;
        if (applyBold(block, phrase)) {
          applied = true;
          break;
        }
      }
      if (applied) boldApplied++;
      else console.log(`  WARNING: bold phrase not found: "${phrase}"`);
    }

    const links = patch.links.map((l) => ({ phrase: l.phrase, articleId: slugToId[l.targetSlug] }));
    const missingLink = links.find((l) => !l.articleId);
    if (missingLink) {
      console.log(`  ERROR: could not resolve article id for link phrase "${missingLink.phrase}" — skipping link insertion`);
    } else {
      const newBlock = buildLinkParagraph(patch.linkPrefix, links, patch.linkSuffix);
      let insertIdx = body.length;
      for (let i = 0; i < body.length; i++) {
        const b = body[i];
        if (b._type === "block" && b.style === "h2" && blockText(b).trim().toLowerCase().startsWith("conclusie")) {
          insertIdx = i;
          break;
        }
        if (b._type === "block" && b.style === "h2" && blockText(b).trim().toLowerCase().startsWith("welke conclusie")) {
          insertIdx = i;
          break;
        }
      }
      body.splice(insertIdx, 0, newBlock);
      console.log(`  inserted link paragraph at index ${insertIdx}/${body.length - 1}`);
    }

    console.log(`  bold applied: ${boldApplied}/${patch.boldPhrases.length}`);

    if (APPLY) {
      await client.patch(patch.articleId).set({ body }).commit();
      console.log("  APPLIED to", patch.articleId);
    } else {
      console.log("  (dry run, not written)");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
