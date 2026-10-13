/**
 * Review + publish the 10 drafted verlichting/gordijnen article rewrites.
 *
 * Step 1 (always): fetch draft + currently-published doc for each article, validate
 * structure (internal links resolve, tables look sane, readingTime set), and back up
 * the current published body to a local JSON file before touching anything.
 *
 * Step 2 (only with APPLY_PUBLISH=true): publish each draft (replace the published
 * document with the draft's content) and remove the draft.
 *
 * Usage:
 *   tsx scripts/publish-dossier-drafts.ts                  (review only)
 *   APPLY_PUBLISH=true tsx scripts/publish-dossier-drafts.ts (publish for real)
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const slugs = [
  "waarom-voelt-je-interieur-s-avonds-plots-anders-aan",
  "2700k-3000k-of-4000k-welke-lichtkleur-kies-je-waar",
  "verlichting-boven-de-eettafel-hoe-hoog-hang-je-een-lamp",
  "de-meest-gemaakte-fouten-bij-verlichting-in-huis",
  "hoeveel-licht-heb-je-nodig-in-woonkamer-keuken-en-slaapkamer",
  "indirecte-verlichting-waar-werkt-het-wel-en-waar-niet",
  "transparante-lichtdoorlatende-of-verduisterende-gordijnen-kiezen",
  "2-gordijnen-opmeten-de-juiste-lengte-en-breedte",
  "gordijnen-rolgordijnen-of-jaloezieen-wat-past-bij-je",
  "gordijnen-combineren-met-je-muren-zetel-en-vloer",
];

function wordCount(body: any[]): number {
  return (body || []).reduce((total, b) => {
    if (b._type !== "block" || !b.children) return total;
    return total + b.children.map((c: any) => c.text || "").join(" ").split(/\s+/).filter(Boolean).length;
  }, 0);
}

function validateBody(body: any[], validIds: Set<string>): string[] {
  const issues: string[] = [];
  for (const b of body || []) {
    if (b._type === "rawHtml") {
      if (!b.code || !b.code.includes("<table>") || !b.code.includes("</table>")) {
        issues.push(`rawHtml-blok zonder geldige <table>: ${JSON.stringify(b.code).slice(0, 80)}`);
      }
      continue;
    }
    if (b._type !== "block") continue;
    for (const def of b.markDefs || []) {
      if (def._type === "internalArticleLink") {
        const ref = def.reference?._ref;
        if (!ref || !validIds.has(ref)) {
          issues.push(`internalArticleLink verwijst naar onbekend document: ${ref}`);
        }
      }
    }
  }
  return issues;
}

async function main() {
  const APPLY = process.env.APPLY_PUBLISH === "true";

  // Explicitly exclude/include drafts by id path - never rely on the client's
  // default perspective, which can silently overlay a draft onto "_id" here.
  const [publishedDocs, draftDocs, allArticleIds] = await Promise.all([
    client.fetch(
      `*[_type == "article" && slug.current in $slugs && !(_id in path("drafts.**"))]`,
      { slugs }
    ),
    client.fetch(
      `*[_type == "article" && slug.current in $slugs && _id in path("drafts.**")]`,
      { slugs }
    ),
    client.fetch(`*[_type == "article" && !(_id in path("drafts.**"))]._id`),
  ]);

  const validIds = new Set<string>(
    (allArticleIds as string[]).map((id) => id.replace(/^drafts\./, ""))
  );

  const draftBySlug = new Map(draftDocs.map((d: any) => [d.slug.current, d]));
  const publishedBySlug = new Map(publishedDocs.map((d: any) => [d.slug.current, d]));

  const backup: Record<string, any> = {};
  let allOk = true;

  console.log("## Review\n");
  for (const slug of slugs) {
    const draft = draftBySlug.get(slug) as any;
    const published = publishedBySlug.get(slug) as any;
    if (!draft) {
      console.log(`✕ ${slug}: GEEN DRAFT GEVONDEN - overslaan`);
      allOk = false;
      continue;
    }
    if (!published) {
      console.log(`✕ ${slug}: GEEN GEPUBLICEERD DOCUMENT GEVONDEN - overslaan`);
      allOk = false;
      continue;
    }

    backup[published._id] = published;

    const issues = validateBody(draft.body, validIds);
    const words = wordCount(draft.body);
    const oldWords = wordCount(published.body);
    const hasReadingTime = typeof draft.readingTime === "number" && draft.readingTime > 0;

    const status = issues.length === 0 && hasReadingTime ? "✓" : "✕";
    if (status === "✕") allOk = false;

    console.log(`${status} ${draft.title}`);
    console.log(`   slug: ${slug}`);
    console.log(`   woorden: ${oldWords} (live) -> ${words} (concept), leestijd: ${draft.readingTime ?? "ONTBREEKT"} min`);
    if (issues.length) {
      issues.forEach((i) => console.log(`   PROBLEEM: ${i}`));
    }
  }

  const backupPath = path.join(os.tmpdir(), `interieur-expert-backup-${Date.now()}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log(`\nBackup van huidige live-versies weggeschreven naar: ${backupPath}`);

  if (!allOk) {
    console.log("\nEr zijn problemen gevonden - NIET gepubliceerd. Los de problemen op en draai opnieuw.");
    process.exitCode = 1;
    return;
  }

  if (!APPLY) {
    console.log("\nAlles ziet er goed uit. Herdraai met APPLY_PUBLISH=true om effectief te publiceren.");
    return;
  }

  console.log("\n## Publiceren\n");
  for (const slug of slugs) {
    const draft = draftBySlug.get(slug) as any;
    const published = publishedBySlug.get(slug) as any;
    const { _id: draftId, _rev: draftRev, ...draftRest } = draft;
    const publishedId = published._id;

    // Hard guard: never let a createOrReplace target a drafts.* id here - that
    // would just recreate-then-delete the draft and silently skip the real publish.
    if (publishedId.startsWith("drafts.") || !draftId.startsWith("drafts.")) {
      throw new Error(
        `Onverwachte id-vorm voor ${slug}: publishedId=${publishedId}, draftId=${draftId}. Publiceren afgebroken.`
      );
    }

    await client
      .transaction()
      .createOrReplace({ ...draftRest, _id: publishedId })
      .delete(draftId)
      .commit();

    console.log(`✓ gepubliceerd: ${slug} (${publishedId})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
