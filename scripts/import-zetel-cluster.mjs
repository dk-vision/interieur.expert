import { execFileSync } from "node:child_process";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const WORKSPACE = "/Users/filipbreckx/Development/interieur.expert";
const PYTHON = `${WORKSPACE}/.venv/bin/python`;

let keyCounter = 0;
const nextKey = () => `k${String(++keyCounter).padStart(6, "0")}`;

function loadSections() {
  const sectionsJson = execFileSync(
    PYTHON,
    [
      "-c",
      'import json, sys; sys.path.insert(0, "/Users/filipbreckx/Development/interieur.expert"); from scripts.generate_zetel_cluster_doc import SECTIONS; print(json.dumps(SECTIONS, ensure_ascii=False))',
    ],
    { encoding: "utf8" }
  );

  return JSON.parse(sectionsJson);
}

function normalizeLine(line) {
  return line.replace(/\s{2,}$/u, "").trimEnd();
}

function parseSectionMarkdown(markdown) {
  const lines = markdown.split("\n").map(normalizeLine);
  const titleLine = lines.find((line) => line.startsWith("**Titel:**"));
  const slugLine = lines.find((line) => line.startsWith("**Slug:**"));
  const excerptIndex = lines.findIndex((line) => line.startsWith("**Excerpt:**"));

  if (!titleLine || !slugLine || excerptIndex === -1) {
    throw new Error("Section metadata is incomplete.");
  }

  return {
    title: titleLine.replace(/^\*\*Titel:\*\*\s*/u, "").trim(),
    slug: slugLine.replace(/^\*\*Slug:\*\*\s*/u, "").trim().split("/").filter(Boolean).at(-1),
    excerpt: lines[excerptIndex].replace(/^\*\*Excerpt:\*\*\s*/u, "").trim(),
    bodyMarkdown: lines.slice(excerptIndex + 1).join("\n").trim(),
  };
}

function parseInline(paragraphText, markDefs, articleIdBySlug) {
  const spans = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  let position = 0;

  for (const match of paragraphText.matchAll(pattern)) {
    if (match.index > position) {
      spans.push({
        _type: "span",
        _key: nextKey(),
        text: paragraphText.slice(position, match.index),
        marks: [],
      });
    }

    if (match[2] && match[3]) {
      const text = match[2];
      const href = match[3];
      const slug = href.replace(/^https:\/\/interieur\.expert\//u, "").split("/").filter(Boolean).at(-1);
      const articleRef = href.includes("/advies/") ? articleIdBySlug[slug] : null;

      if (articleRef) {
        const key = nextKey();
        markDefs.push({
          _key: key,
          _type: "internalArticleLink",
          reference: { _type: "reference", _ref: articleRef },
        });
        spans.push({ _type: "span", _key: nextKey(), text, marks: [key] });
      } else {
        const key = nextKey();
        markDefs.push({ _key: key, _type: "link", href });
        spans.push({ _type: "span", _key: nextKey(), text, marks: [key] });
      }
    } else if (match[4]) {
      spans.push({ _type: "span", _key: nextKey(), text: match[4], marks: ["strong"] });
    }

    position = match.index + match[0].length;
  }

  if (position < paragraphText.length) {
    spans.push({
      _type: "span",
      _key: nextKey(),
      text: paragraphText.slice(position),
      marks: [],
    });
  }

  return spans.filter((span) => span.text.length > 0);
}

function markdownToPortableText(markdown, articleIdBySlug) {
  const blocks = [];

  for (const rawLine of markdown.split("\n")) {
    const line = normalizeLine(rawLine);
    if (!line) continue;

    let style = "normal";
    let text = line;

    if (line.startsWith("## ")) {
      style = "h2";
      text = line.slice(3).trim();
    } else if (line.startsWith("### ")) {
      style = "h3";
      text = line.slice(4).trim();
    } else if (line.startsWith("> ")) {
      style = "blockquote";
      text = line.slice(2).trim();
    } else if (/^[-*] /u.test(line)) {
      text = `• ${line.slice(2).trim()}`;
    } else if (/^\d+\. /u.test(line)) {
      text = line.replace(/^(\d+)\.\s+/u, "$1. ");
    }

    const markDefs = [];
    const children = parseInline(text, markDefs, articleIdBySlug);
    if (!children.length) continue;

    blocks.push({
      _type: "block",
      _key: nextKey(),
      style,
      markDefs,
      children,
    });
  }

  return blocks;
}

function readingTime(blocks) {
  const words = blocks
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ")
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function removeInternalRefs(blocks) {
  return blocks.map((block) => {
    if (block._type !== "block") return block;

    const internalKeys = new Set(
      (block.markDefs || [])
        .filter((markDef) => markDef._type === "internalArticleLink")
        .map((markDef) => markDef._key)
    );

    return {
      ...block,
      markDefs: (block.markDefs || []).filter((markDef) => markDef._type !== "internalArticleLink"),
      children: (block.children || []).map((child) => ({
        ...child,
        marks: (child.marks || []).filter((mark) => !internalKeys.has(mark)),
      })),
    };
  });
}

function createSkeletonDoc(doc) {
  if (doc._type === "article") {
    return {
      ...doc,
      body: removeInternalRefs(doc.body),
    };
  }

  if (doc._type === "dossier") {
    return {
      ...doc,
      intro: removeInternalRefs(doc.intro),
      articles: [],
    };
  }

  if (doc._type === "video") {
    return {
      ...doc,
      transcript: removeInternalRefs(doc.transcript || []),
    };
  }

  return doc;
}

async function fetchBaseData() {
  return client.fetch(`{
    "candidateImages": *[_type == "article" && slug.current in ["modulaire-sofa-kiezen-voordelen-tips", "organische-vormen-in-het-interieur-zachtheid-met-karakter", "warm-minimalisme", "japandi", "kleine-ruimtes", "eerste-woning", "natuurlijke-materialen", "rolf-benz-experience-center-denderleeuw"]]{
      "slug": slug.current,
      featuredImage
    },
    "existingArticle": *[_type == "article" && slug.current == "modulaire-sofa-kiezen-voordelen-tips"][0]{ _id }
  }`);
}

async function fetchVideoMeta() {
  const oembedJson = execFileSync(
    "curl",
    ["-s", "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=rFmfG0PID9c&format=json"],
    { encoding: "utf8" }
  );
  return JSON.parse(oembedJson);
}

async function uploadThumbnail(thumbnailUrl) {
  const response = await fetch(thumbnailUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube thumbnail: ${response.status}`);
  }

  const asset = await client.assets.upload(
    "image",
    Buffer.from(await response.arrayBuffer()),
    {
      filename: "youtube-rFmfG0PID9c.jpg",
      contentType: response.headers.get("content-type") || "image/jpeg",
    }
  );

  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  const sections = loadSections();
  const prep = await fetchBaseData();
  const videoMeta = await fetchVideoMeta();
  const videoThumbnail = await uploadThumbnail(videoMeta.thumbnail_url);

  const articleIdBySlug = {
    "zetel-kopen-waarop-letten": "drafts.article-zetel-kopen-waarop-letten",
    "welke-zetel-past-bij-jou": "drafts.article-welke-zetel-past-bij-jou",
    "stof-of-leren-zetel-kiezen": "drafts.article-stof-of-leren-zetel-kiezen",
    "kwalitatieve-zetel-herkennen": "drafts.article-kwalitatieve-zetel-herkennen",
    "zetel-afmetingen-woonkamer": "drafts.article-zetel-afmetingen-woonkamer",
    "zetel-testen-in-de-winkel": "drafts.article-zetel-testen-in-de-winkel",
    "modulaire-sofa-kiezen-voordelen-tips": prep.existingArticle?._id,
  };
  const dossierIdBySlug = { "zetel-kiezen": "drafts.dossier-zetel-kiezen" };
  const videoIdBySlug = { "tips-voor-het-kopen-van-een-zetel": "drafts.video-tips-voor-het-kopen-van-een-zetel" };

  const tagMap = {
    "zetel-kopen-waarop-letten": ["zetel", "wonen", "advies"],
    "welke-zetel-past-bij-jou": ["zetel", "wonen", "advies"],
    "stof-of-leren-zetel-kiezen": ["zetel", "materialen", "wonen"],
    "kwalitatieve-zetel-herkennen": ["zetel", "advies", "wonen"],
    "zetel-afmetingen-woonkamer": ["zetel", "wonen", "advies"],
    "zetel-testen-in-de-winkel": ["zetel", "advies", "wonen"],
  };

  const faqMap = {
    "zetel-kopen-waarop-letten": [
      {
        question: "Wat is het belangrijkste aandachtspunt bij een zetel kopen?",
        answer: "Dat is hoe de zetel past bij je dagelijkse gebruik. Comfort, formaat, materiaal en opstelling zijn samen belangrijker dan alleen uitstraling of trendgevoel.",
      },
      {
        question: "Hoe weet je of een zetel goed zal zitten op lange termijn?",
        answer: "Door hem in de winkel in verschillende houdingen te testen en te letten op steun, zitdiepte, opstaan en hoe de kussens herstellen na belasting.",
      },
      {
        question: "Is een duurdere zetel automatisch beter?",
        answer: "Niet altijd. Prijs kan iets zeggen over materiaal en afwerking, maar echte kwaliteit lees je beter af aan frame, vering, vulling en de geloofwaardigheid van de opbouw.",
      },
    ],
    "welke-zetel-past-bij-jou": [
      {
        question: "Welke zetel is het best voor een gezin met kinderen?",
        answer: "Vaak werkt een onderhoudsvriendelijke stoffen zetel met degelijke steun, voldoende zitplaatsen en een logische opstelling beter dan een erg lage of delicate designzetel.",
      },
      {
        question: "Welke zetel werkt goed in een kleine woonkamer?",
        answer: "Niet per se de kleinste. Belangrijker zijn slanke armleuningen, lucht in de opstelling en een model dat visueel niet te zwaar oogt.",
      },
      {
        question: "Is een loungezetel voor iedereen comfortabel?",
        answer: "Nee. Een diepe loungezetel voelt heerlijk voor wie graag onderuit zit, maar werkt minder goed voor wie rechtop zit of gemakkelijk wil opstaan.",
      },
    ],
    "stof-of-leren-zetel-kiezen": [
      {
        question: "Wat voelt warmer aan: stof of leder?",
        answer: "Stof voelt doorgaans warmer en zachter aan in dagelijks gebruik. Leder oogt rustiger en krachtiger, maar voelt temperatuursgevoeliger aan.",
      },
      {
        question: "Wat is praktischer met kinderen of huisdieren?",
        answer: "Dat hangt af van de concrete stof of lederafwerking. Moderne onderhoudsvriendelijke stoffen kunnen erg praktisch zijn, terwijl leder gevoeliger kan zijn voor krassen of uitdroging.",
      },
      {
        question: "Veroudert leder mooier dan stof?",
        answer: "Soms wel, maar dat hangt af van de afwerking en je smaak. Leder krijgt zichtbaarder patina, terwijl stof vaak zachter en huiselijker oud wordt.",
      },
    ],
    "kwalitatieve-zetel-herkennen": [
      {
        question: "Waaraan herken je een kwalitatieve zetel in de winkel?",
        answer: "Aan de combinatie van een stabiel frame, geloofwaardige vering, evenwichtig comfort, nette afwerking en duidelijke antwoorden over de opbouw.",
      },
      {
        question: "Welke vraag stel je best aan een verkoper?",
        answer: "Vraag hoe het frame is opgebouwd, welke vering gebruikt wordt, hoe de vulling samengesteld is en wat je realistisch mag verwachten na intensief gebruik.",
      },
      {
        question: "Kun je kwaliteit zien zonder technische kennis?",
        answer: "Tot op zekere hoogte wel. Let op spanning van de stof, nette naden, herstel van de kussens, stabiliteit en hoe coherent het geheel aanvoelt.",
      },
    ],
    "zetel-afmetingen-woonkamer": [
      {
        question: "Hoe weet ik of een zetel te groot is voor mijn woonkamer?",
        answer: "Als de loopruimte verdwijnt, de kamer visueel dichtslibt of andere meubels plots klein en weggedrukt lijken, is de zetel meestal te dominant.",
      },
      {
        question: "Werkt een hoekzetel in een kleine woonkamer?",
        answer: "Soms, maar alleen als de ruimte daardoor beter georganiseerd wordt. In veel kleinere kamers werkt een compacte 3-zit met extra stoel logischer.",
      },
      {
        question: "Moet ik alleen de breedte meten?",
        answer: "Nee. Diepte, armleuningen, zithoogte en vooral de vrije ruimte rond de zetel zijn minstens even belangrijk voor een goede keuze.",
      },
    ],
    "zetel-testen-in-de-winkel": [
      {
        question: "Hoe lang moet je een zetel testen in de winkel?",
        answer: "Langer dan één minuut. Neem de tijd om verschillende houdingen uit te proberen en vergelijk bij voorkeur meerdere modellen vlak na elkaar.",
      },
      {
        question: "Wat moet je zeker testen behalve zitcomfort?",
        answer: "Ook rugsteun, opstaan, armleuningen, veerkracht van de kussens en de afwerking van zijkanten en achterkant verdienen aandacht.",
      },
      {
        question: "Waarom lijkt een zetel in de showroom vaak beter dan thuis?",
        answer: "Omdat licht, styling en context in een winkel geoptimaliseerd zijn. Daarom moet je niet alleen kijken, maar vooral testen zoals je thuis echt zit en leeft.",
      },
    ],
  };

  const publishMap = {
    "zetel-kiezen": "2026-04-28T05:30:00.000Z",
    "zetel-kopen-waarop-letten": "2026-04-28T06:00:00.000Z",
    "tips-voor-het-kopen-van-een-zetel": "2026-04-30T06:00:00.000Z",
    "zetel-testen-in-de-winkel": "2026-05-05T06:00:00.000Z",
    "stof-of-leren-zetel-kiezen": "2026-05-08T06:00:00.000Z",
    "welke-zetel-past-bij-jou": "2026-05-12T06:00:00.000Z",
    "kwalitatieve-zetel-herkennen": "2026-05-15T06:00:00.000Z",
    "zetel-afmetingen-woonkamer": "2026-05-19T06:00:00.000Z",
  };

  const imageBySlug = Object.fromEntries(
    (prep.candidateImages || []).map((entry) => [entry.slug, entry.featuredImage])
  );

  const featuredImageMap = {
    "zetel-kopen-waarop-letten": imageBySlug["modulaire-sofa-kiezen-voordelen-tips"],
    "welke-zetel-past-bij-jou": imageBySlug["eerste-woning"],
    "stof-of-leren-zetel-kiezen": imageBySlug["natuurlijke-materialen"],
    "kwalitatieve-zetel-herkennen": imageBySlug["rolf-benz-experience-center-denderleeuw"],
    "zetel-afmetingen-woonkamer": imageBySlug["kleine-ruimtes"],
    "zetel-testen-in-de-winkel": imageBySlug["organische-vormen-in-het-interieur-zachtheid-met-karakter"],
    "zetel-kiezen": imageBySlug["warm-minimalisme"],
  };

  const docs = [];

  const articleLabels = new Set([
    "Pillarartikel",
    "Levensstijlartikel",
    "Materiaalartikel",
    "Kwaliteitsartikel",
    "Afmetingenartikel",
    "Showroomtestartikel",
  ]);

  for (const [label, markdown] of sections) {
    if (!articleLabels.has(label)) continue;
    const parsed = parseSectionMarkdown(markdown);
    const body = markdownToPortableText(parsed.bodyMarkdown, articleIdBySlug);

    docs.push({
      _id: articleIdBySlug[parsed.slug],
      _type: "article",
      title: parsed.title,
      slug: { _type: "slug", current: parsed.slug },
      excerpt: parsed.excerpt,
      featuredImage: featuredImageMap[parsed.slug] || imageBySlug["modulaire-sofa-kiezen-voordelen-tips"],
      body,
      category: "advies",
      tags: tagMap[parsed.slug] || ["zetel", "wonen"],
      author: "Interieur Expert Redactie",
      readingTime: readingTime(body),
      featured: false,
      pinned: false,
      sponsored: false,
      faq: (faqMap[parsed.slug] || []).map((item) => ({
        _type: "faqItem",
        _key: nextKey(),
        question: item.question,
        answer: item.answer,
      })),
      seoTitle: parsed.title,
      seoDescription: parsed.excerpt,
    });
  }

  const dossierMarkdown = sections.find(([label]) => label === "Dossierpagina")?.[1];
  if (!dossierMarkdown) throw new Error("Dossierpagina section not found.");
  const parsedDossier = parseSectionMarkdown(dossierMarkdown);
  const intro = markdownToPortableText(parsedDossier.bodyMarkdown, articleIdBySlug);

  docs.push({
    _id: dossierIdBySlug[parsedDossier.slug],
    _type: "dossier",
    title: parsedDossier.title,
    slug: { _type: "slug", current: parsedDossier.slug },
    excerpt: parsedDossier.excerpt,
    featuredImage: featuredImageMap[parsedDossier.slug] || imageBySlug["warm-minimalisme"],
    intro,
    articles: [
      articleIdBySlug["zetel-kopen-waarop-letten"],
      videoIdBySlug["tips-voor-het-kopen-van-een-zetel"],
      articleIdBySlug["zetel-testen-in-de-winkel"],
      articleIdBySlug["stof-of-leren-zetel-kiezen"],
      articleIdBySlug["welke-zetel-past-bij-jou"],
      articleIdBySlug["kwalitatieve-zetel-herkennen"],
      articleIdBySlug["zetel-afmetingen-woonkamer"],
    ].map((ref) => ({ _type: "reference", _ref: ref, _key: nextKey() })),
    themes: ["zetels", "wonen", "koopgids"],
    sponsors: [],
    featured: false,
    seoTitle: parsedDossier.title,
    seoDescription: parsedDossier.excerpt,
  });

  const videoMarkdown = sections.find(([label]) => label === "Videopagina")?.[1];
  if (!videoMarkdown) throw new Error("Videopagina section not found.");
  const parsedVideo = parseSectionMarkdown(videoMarkdown);

  docs.push({
    _id: videoIdBySlug[parsedVideo.slug],
    _type: "video",
    title: videoMeta.title,
    slug: { _type: "slug", current: parsedVideo.slug },
    excerpt: parsedVideo.excerpt,
    thumbnail: videoThumbnail,
    youtubeId: "rFmfG0PID9c",
    transcript: markdownToPortableText(parsedVideo.bodyMarkdown, articleIdBySlug),
    category: "Advies",
    tags: ["zetel", "sofa", "wonen", "koopadvies", "ms2000"],
    duration: 4,
    featured: false,
    sponsored: false,
    seoTitle: videoMeta.title,
    seoDescription: parsedVideo.excerpt,
  });

  const skeletonDocs = docs.map(createSkeletonDoc);

  for (const doc of skeletonDocs) {
    await client.createOrReplace(doc);
  }

  for (const doc of docs) {
    await client.createOrReplace(doc);
  }

  const verification = await client.fetch(`{
    "articles": *[_type == "article" && _id in $articleIds]{ _id, title, "slug": slug.current, publishedAt },
    "dossier": *[_type == "dossier" && _id == $dossierId][0]{ _id, title, "slug": slug.current, publishedAt, "articleCount": count(articles) },
    "video": *[_type == "video" && _id == $videoId][0]{ _id, title, "slug": slug.current, publishedAt, youtubeId }
  }`, {
    articleIds: docs.filter((doc) => doc._type === "article").map((doc) => doc._id),
    dossierId: dossierIdBySlug[parsedDossier.slug],
    videoId: videoIdBySlug[parsedVideo.slug],
  });

  console.log(JSON.stringify(verification, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});