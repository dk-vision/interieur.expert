/**
 * CLI wrapper around lib/geo-audit/analyze.ts for terminal use.
 *
 * Usage:
 *   tsx scripts/geo-audit.ts <url-or-path> [--json] [--out=report.json]
 *
 * Examples:
 *   pnpm geo-audit /advies/transparante-lichtdoorlatende-of-verduisterende-gordijnen-kiezen
 *   pnpm geo-audit https://interieur.expert/dossiers/zetel-kopen
 */
import { runAudit, scoreCategory, type Category, type Status } from "../lib/geo-audit/analyze";

const STATUS_ICON: Record<Status, string> = { pass: "\u2713", warn: "!", fail: "\u2715", info: "i" };

function printReport(url: string, pageType: string, overall: number, categories: Category[]) {
  console.log(`\nGEO/SEO deep-audit — ${url}`);
  console.log(`Pagetype: ${pageType}\n`);
  console.log(`OVERALL SCORE: ${overall}/100\n`);

  const fixes: { category: string; label: string; fix: string }[] = [];

  for (const cat of categories) {
    const score = scoreCategory(cat);
    console.log(`## ${cat.title}${score !== null ? ` — ${score}/100` : ""}`);
    for (const check of cat.checks) {
      console.log(`  [${STATUS_ICON[check.status]}] ${check.label}`);
      if (check.detail) console.log(`      ${check.detail}`);
      if (check.fix) {
        console.log(`      FIX -> ${check.fix}`);
        fixes.push({ category: cat.title, label: check.label, fix: check.fix });
      }
    }
    console.log("");
  }

  if (fixes.length > 0) {
    console.log("## Geprioriteerde fixes met exacte locatie in de repo\n");
    fixes.forEach((f, i) => {
      console.log(`${i + 1}. [${f.category}] ${f.label}`);
      console.log(`   -> ${f.fix}\n`);
    });
  }
}

async function main() {
  const [, , rawInput, ...flags] = process.argv;
  if (!rawInput) {
    console.error("Gebruik: tsx scripts/geo-audit.ts <url-of-pad> [--json] [--out=report.json]");
    process.exit(1);
  }

  const result = await runAudit(rawInput);
  printReport(result.url, result.pageType, result.overall, result.categories);

  const jsonFlag = flags.includes("--json");
  const outFlag = flags.find((f) => f.startsWith("--out="));
  if (jsonFlag || outFlag) {
    const payload = JSON.stringify(result, null, 2);
    if (outFlag) {
      const fs = await import("node:fs/promises");
      await fs.writeFile(outFlag.split("=")[1], payload, "utf8");
    } else {
      console.log("\n--- JSON ---");
      console.log(payload);
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
