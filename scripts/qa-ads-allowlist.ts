import dotenv from "dotenv";

// This repo stores Sanity env vars in `.env.local`.
dotenv.config({ path: ".env.local" });
dotenv.config();

type Campaign = {
  _id: string;
  active?: boolean;
  title?: string;
  partnerName?: string;
};

function requireWriteToken() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error(
      "Missing SANITY_API_TOKEN. Add it to .env.local before running this script."
    );
  }
}

function getArgValue(flag: string) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

function parsePartnerNames(input: string) {
  return input
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
}

async function main() {
  requireWriteToken();

  const partnersArg =
    getArgValue("--partners") || process.env.ADS_QA_PARTNERS || null;
  const dryRun = process.argv.includes("--dry-run");

  // Dynamic import so env vars are loaded before the client initializes.
  const { client } = await import("@/lib/sanity/client");

  const allCampaigns = await client.fetch<Campaign[]>(
    `*[_type == "adCampaign"]{ _id, active, title, "partnerName": partner->name }`
  );

  const partnerCounts = allCampaigns.reduce<Record<string, { total: number; active: number }>>(
    (acc, c) => {
      const name = c.partnerName || "(no partner)";
      acc[name] = acc[name] || { total: 0, active: 0 };
      acc[name].total += 1;
      if (c.active === true) acc[name].active += 1;
      return acc;
    },
    {}
  );

  if (!partnersArg) {
    const partners = Object.keys(partnerCounts).sort((a, b) => a.localeCompare(b));

    console.log("Missing --partners.");
    console.log("\nAvailable partners with campaigns:");
    for (const name of partners) {
      const { total, active } = partnerCounts[name];
      console.log(`- ${name}: ${active}/${total} active`);
    }
    console.log(
      "\nUsage:\n  pnpm run ads:qa-allowlist -- --partners \"Rolf Benz,Interieur.Expert\"\n  pnpm run ads:qa-allowlist -- --partners \"Rolf Benz,Interieur.Expert\" --dry-run"
    );
    process.exit(1);
  }

  const allowlist = parsePartnerNames(partnersArg);
  if (allowlist.length === 0) {
    throw new Error("--partners must contain at least one partner name.");
  }

  const desiredActiveById = new Map<string, boolean>();
  for (const c of allCampaigns) {
    const partnerName = c.partnerName || "";
    const shouldBeActive = allowlist.some(
      (p) => p.toLowerCase() === partnerName.toLowerCase()
    );
    desiredActiveById.set(c._id, shouldBeActive);
  }

  let willActivate = 0;
  let willDeactivate = 0;

  for (const c of allCampaigns) {
    const desired = desiredActiveById.get(c._id) ?? false;
    const current = c.active === true;
    if (desired !== current) {
      if (desired) willActivate += 1;
      else willDeactivate += 1;
    }
  }

  console.log(`Allowlist partners: ${allowlist.join(", ")}`);
  console.log(
    `${dryRun ? "[dry-run] " : ""}Will activate ${willActivate} campaigns and deactivate ${willDeactivate} campaigns.`
  );

  if (dryRun) return;

  const tx = client.transaction();
  for (const c of allCampaigns) {
    const desired = desiredActiveById.get(c._id) ?? false;
    tx.patch(c._id, { set: { active: desired } });
  }

  await tx.commit();
  console.log("Done. Campaign actives updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
