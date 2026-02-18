import dotenv from "dotenv";

// This repo stores Sanity env vars in `.env.local`.
dotenv.config({ path: ".env.local" });
dotenv.config();

type Partner = {
  _id: string;
  name: string;
  website: string;
};

type SanityDocStub = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

type Campaign = {
  _id: string;
  title: string;
  slot: string;
  active?: boolean;
};

const PARTNER_NAME = "Rolf Benz";

const SLOTS = [
  {
    slot: "homepage-hero" as const,
    sizeText: "970×250 (desktop) / 728×90 (tablet) / 320×100 (mobile)",
    label: "Homepage Hero",
  },
  {
    slot: "homepage-newsletter" as const,
    sizeText: "970×90 (desktop) / 728×90 (tablet) / 320×100 (mobile)",
    label: "Homepage Newsletter (Super Leaderboard)",
  },
  {
    slot: "homepage-card" as const,
    sizeText: "300×250",
    label: "Homepage Card (300×250)",
  },
  {
    slot: "listing-sidebar" as const,
    sizeText: "300×600",
    label: "Listing Sidebar (300×600)",
  },
  {
    slot: "article-inline" as const,
    sizeText: "728×90 (desktop/tablet) / 320×100 (mobile)",
    label: "Article Inline (Leaderboard)",
  },
  {
    slot: "article-sidebar" as const,
    sizeText: "300×600",
    label: "Article Sidebar (300×600)",
  },
];

function requireWriteToken() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error(
      "Missing SANITY_API_TOKEN. Add it to .env.local before running this script."
    );
  }
}

function htmlCreative({
  partnerName,
  slotLabel,
  sizeText,
}: {
  partnerName: string;
  slotLabel: string;
  sizeText: string;
}) {
  // Intentionally minimal HTML (no external assets) so we can validate slot sizing.
  return `\
<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#F6F4F1;border:2px solid rgba(0,0,255,0.25);box-sizing:border-box;">
  <div style="text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.2;">
    <div style="font-size:18px;font-weight:700;color:#2A2A2A;">${partnerName}</div>
    <div style="font-size:12px;margin-top:6px;color:rgba(42,42,42,0.75);">${slotLabel}</div>
    <div style="font-size:12px;margin-top:3px;color:rgba(42,42,42,0.55);">${sizeText}</div>
  </div>
</div>`;
}

async function main() {
  requireWriteToken();

  // Dynamic import so env vars are loaded before the client initializes.
  const { client } = await import("@/lib/sanity/client");

  const partner = await client.fetch<Partner | null>(
    `*[_type == "partner" && lower(name) == lower($name)][0]{ _id, name, website }`,
    { name: PARTNER_NAME }
  );

  if (!partner) {
    throw new Error(
      `Partner not found: "${PARTNER_NAME}". Create the Partner in Sanity first (logo is required), then re-run.`
    );
  }

  if (!partner.website) {
    throw new Error(
      `Partner "${partner.name}" has no website URL; please fill it in (used for ad click URL).`
    );
  }

  const otherCampaigns = await client.fetch<Campaign[]>(
    `*[_type == "adCampaign" && partner._ref != $partnerId]{ _id, title, slot, active }`,
    { partnerId: partner._id }
  );

  if (otherCampaigns.length > 0) {
    console.log(`Deactivating ${otherCampaigns.length} non-${PARTNER_NAME} campaigns...`);
    const tx = client.transaction();
    for (const c of otherCampaigns) {
      tx.patch(c._id, { set: { active: false } });
    }
    await tx.commit();
  } else {
    console.log(`No non-${PARTNER_NAME} campaigns found.`);
  }

  for (const slotSpec of SLOTS) {
    const existing = await client.fetch<Campaign[]>(
      `*[_type == "adCampaign" && partner._ref == $partnerId && slot == $slot] | order(active desc, priority desc){ _id, title, slot, active }`,
      { partnerId: partner._id, slot: slotSpec.slot }
    );

    if (existing.length > 0) {
      // Ensure at least one is active.
      const alreadyActive = existing.some((c) => c.active === true);
      if (!alreadyActive) {
        console.log(`Activating existing ${PARTNER_NAME} campaign for slot ${slotSpec.slot}...`);
        await client.patch(existing[0]._id).set({ active: true }).commit();
      } else {
        console.log(`Slot ${slotSpec.slot}: OK (campaign exists).`);
      }
      continue;
    }

    console.log(`Creating creative + campaign for slot ${slotSpec.slot}...`);

    const creativeId = `adCreative-rolfbenz-${slotSpec.slot}`;
    const campaignId = `adCampaign-rolfbenz-${slotSpec.slot}`;

    // Create or replace creative deterministically.
    const creativeDoc = {
      _id: creativeId,
      _type: "adCreative",
      title: `${PARTNER_NAME} — ${slotSpec.label}`,
      format: "html",
      html: htmlCreative({
        partnerName: PARTNER_NAME,
        slotLabel: slotSpec.label,
        sizeText: slotSpec.sizeText,
      }),
      linkUrl: partner.website,
      altText: `${PARTNER_NAME} — ${slotSpec.label}`,
    };

    // Create or replace campaign deterministically.
    const now = new Date();
    const startDate = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    const endDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString();

    const campaignDoc = {
      _id: campaignId,
      _type: "adCampaign",
      title: `${PARTNER_NAME} — ${slotSpec.label}`,
      partner: { _type: "reference", _ref: partner._id },
      slot: slotSpec.slot,
      creative: { _type: "reference", _ref: creativeId },
      startDate,
      endDate,
      priority: 10,
      active: true,
      maxImpressions: 1000000,
    };

    const tx = client.transaction();

    // Upsert creative
    tx.createOrReplace(creativeDoc as SanityDocStub);

    // Upsert campaign
    tx.createOrReplace(campaignDoc as SanityDocStub);

    await tx.commit();
  }

  console.log("Done. Only Rolf Benz campaigns should be active, with full slot coverage.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
