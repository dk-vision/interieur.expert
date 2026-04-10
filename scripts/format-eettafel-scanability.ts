/**
 * Add scanability elements to all 4 eettafel dossier articles:
 * - Bold key words/terms (not full sentences) in section intros and bullets
 * - Convert strategic paragraphs to blockquotes (pull quotes)
 */
import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const envFile = readFileSync(".env.local", "utf-8");
const token = envFile.match(/SANITY_API_TOKEN="?([^"\n]+)"?/)?.[1];
if (!token) throw new Error("No SANITY_API_TOKEN found in .env.local");

const PROJECT = "uf111z1c";
const DATASET = "production";
const k = () => randomUUID().replace(/-/g, "").slice(0, 12);

/* ── Sanity helpers ─────────────────────────────────── */

async function fetchBody(docId: string): Promise<any[]> {
  const query = encodeURIComponent(`*[_id=="${docId}"][0]{body}`);
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  return data.result.body;
}

async function pushBody(docId: string, body: any[]): Promise<void> {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [{ patch: { id: docId, set: { body } } }],
      }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data));
  console.log(`  ✓ Patched ${docId} (${body.length} blocks)`);
}

/* ── Formatting helpers ─────────────────────────────── */

/**
 * Bold the first occurrence of `phrase` inside block at `idx`.
 * Splits the containing span into [before, bold, after].
 */
function boldPhrase(body: any[], idx: number, phrase: string): void {
  const block = body[idx];
  if (!block?.children) return;

  const out: any[] = [];
  let found = false;

  for (const child of block.children) {
    if (found || !child.text) {
      out.push(child);
      continue;
    }
    const pos = child.text.indexOf(phrase);
    if (pos === -1) {
      out.push(child);
      continue;
    }
    found = true;
    const marks = child.marks || [];
    const before = child.text.slice(0, pos);
    const after = child.text.slice(pos + phrase.length);

    if (before) out.push({ _type: "span", _key: k(), text: before, marks: [...marks] });
    out.push({ _type: "span", _key: k(), text: phrase, marks: [...marks, "strong"] });
    if (after) out.push({ _type: "span", _key: k(), text: after, marks: [...marks] });
  }

  if (found) block.children = out;
  else console.warn(`  ⚠ "${phrase}" not found in block [${idx}]`);
}

/** Bold ALL text in a block (adds "strong" to every child span). */
function boldAll(body: any[], idx: number): void {
  const block = body[idx];
  if (!block?.children) return;
  for (const child of block.children) {
    if (!child.marks) child.marks = [];
    if (!child.marks.includes("strong")) child.marks.push("strong");
  }
}

/** Convert a block's style to "blockquote". */
function toBlockquote(body: any[], idx: number): void {
  if (body[idx]) body[idx].style = "blockquote";
}

/* ── Main ───────────────────────────────────────────── */

async function main() {
  const IDS = {
    welkMateriaal: "4097593f-d8d0-4066-9c8f-368f44fb7d0c",
    onderhoud: "4918863a-1ca5-4f21-8e55-7ee302d167eb",
    besteGezin: "66789cda-0dcf-4bdd-9c1d-10b892eb62aa",
    afmetingen: "a2ca64c5-3d5e-43e3-8a8d-be2b43c716d4",
  };

  /* ═══ 1. WELK MATERIAAL (73 blocks) ═══════════════ */
  console.log("\n1. welk-materiaal-voor-je-eettafel");
  const wm = await fetchBody(IDS.welkMateriaal);

  // Bold key terms in section intro paragraphs
  boldPhrase(wm, 7, "referentie");                 // massief hout intro
  boldPhrase(wm, 9, "hygroscopisch");              // hout technisch
  boldPhrase(wm, 21, "gebruiksvriendelijke");      // keramiek intro
  boldPhrase(wm, 33, "dunne laag echt hout");      // fineer intro
  boldPhrase(wm, 44, "esthetiek");                  // glas intro
  boldPhrase(wm, 55, "prijs en variatie");          // MDF intro

  // Bold all "Wanneer kiezen?" lines (visual sub-headings)
  for (const i of [18, 30, 41, 52, 64]) boldAll(wm, i);

  // Convert 2 "when to choose" answers to blockquotes (pull quotes)
  toBlockquote(wm, 19); // "Massief hout is ideaal als je kiest voor sfeer..."
  toBlockquote(wm, 65); // "Ideaal voor starters, budgetgerichte keuzes..."

  await pushBody(IDS.welkMateriaal, wm);

  /* ═══ 2. ONDERHOUD (60 blocks) ════════════════════ */
  console.log("\n2. eettafel-onderhoud");
  const oh = await fetchBody(IDS.onderhoud);

  // Bold key terms in section intros
  boldPhrase(oh, 7, "levend materiaal");            // massief hout intro
  boldPhrase(oh, 18, "onderhoudsvriendelijke");     // keramiek intro
  boldPhrase(oh, 26, "dunne houten toplaag");       // fineer intro
  boldPhrase(oh, 34, "frequenter onderhoud");       // glas intro
  boldPhrase(oh, 42, "vlekbestendig");              // laminaat/MDF intro

  // Bold key words in common mistakes bullets
  boldPhrase(oh, 50, "Verkeerde producten");
  boldPhrase(oh, 51, "Vlekken te lang");
  boldPhrase(oh, 52, "Geen bescherming");
  boldPhrase(oh, 53, "Schurende materialen");

  // Convert 2 paragraphs to blockquotes
  toBlockquote(oh, 24); // "Hoewel keramiek als materiaal bijzonder sterk is..."
  toBlockquote(oh, 56); // "Goed onderhoud begint niet bij het poetsen..."

  await pushBody(IDS.onderhoud, oh);

  /* ═══ 3. BESTE GEZIN (40 blocks) ══════════════════ */
  console.log("\n3. beste-eettafel-voor-gezin");
  const bg = await fetchBody(IDS.besteGezin);

  // Bold criteria keywords in bullets
  boldPhrase(bg, 5, "Onderhoudsgemak");
  boldPhrase(bg, 6, "Duurzaamheid");
  boldPhrase(bg, 7, "Veiligheid");
  boldPhrase(bg, 8, "Ruimte");

  // Bold key terms in section paragraphs
  boldPhrase(bg, 13, "meest praktische keuze");     // keramiek section
  boldPhrase(bg, 16, "warme uitstraling");           // hout section
  boldPhrase(bg, 24, "meer ruimte nodig");           // size section

  // Bold key words in mistake bullets
  boldPhrase(bg, 29, "delicate materialen");
  boldPhrase(bg, 30, "te kleine tafel");

  // Convert 1 paragraph to blockquote
  toBlockquote(bg, 36); // "Een materiaal dat je snel en eenvoudig schoon kunt maken..."

  await pushBody(IDS.besteGezin, bg);

  /* ═══ 4. AFMETINGEN (30 blocks) ═══════════════════ */
  console.log("\n4. eettafel-afmetingen");
  const af = await fetchBody(IDS.afmetingen);

  // Bold key terms in paragraphs
  boldPhrase(af, 8, "minstens even belangrijk");     // ruimte-rond section
  boldPhrase(af, 11, "breedte");                      // breedte section intro
  boldPhrase(af, 17, "praktische impact");            // vorm section

  // Bold measurement values in width bullets
  boldPhrase(af, 12, "80 cm");
  boldPhrase(af, 13, "90 tot 100 cm");
  boldPhrase(af, 14, "100 cm en meer");

  // Bold key words in mistake bullets
  boldPhrase(af, 21, "te grote tafel");
  boldPhrase(af, 24, "doorloopruimte");

  // Convert 1 paragraph to blockquote
  toBlockquote(af, 15); // "Bij smallere tafels wordt het snel krap..."

  await pushBody(IDS.afmetingen, af);

  /* ═══ Revalidate all pages ════════════════════════ */
  console.log("\nRevalidating...");
  const secret = "revalidate_3e8f1a6d9c2b5e7a4f1d8c3b6e9a2d5f";
  const paths = [
    "/advies/welk-materiaal-voor-je-eettafel",
    "/advies/eettafel-onderhoud",
    "/advies/beste-eettafel-voor-gezin",
    "/advies/eettafel-afmetingen",
  ];
  for (const p of paths) {
    try {
      await fetch(`https://interieur.expert/api/revalidate?secret=${secret}&path=${p}`);
      console.log(`  ✓ ${p}`);
    } catch (e) {
      console.warn(`  ⚠ ${p}: ${e}`);
    }
  }

  console.log("\n✅ All 4 articles formatted for scanability!");
}

main().catch(console.error);
