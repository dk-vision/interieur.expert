import dotenv from "dotenv";
import sharp from "sharp";

// This repo stores Sanity env vars in `.env.local`.
dotenv.config({ path: ".env.local" });
dotenv.config();

type Partner = {
  _id: string;
  name: string;
  website: string;
};

type SanityImageField = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
};

type Creative = {
  _id: string;
  title?: string;
  format?: "image" | "html";
  image?: unknown;
  imageMobile?: unknown;
  imageTablet?: unknown;
  imageDesktop?: unknown;
  linkUrl?: string;
  altText?: string;
};

type SanityDocStub = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

const PARTNER_NAME = "Rolf Benz";

type VariantKey = "mobile" | "tablet" | "desktop";

type VariantSpec = {
  key: VariantKey;
  width: number;
  height: number;
  field: "imageMobile" | "imageTablet" | "imageDesktop";
};

type SlotSpec = {
  slot: string;
  label: string;
  variants: VariantSpec[];
  primaryVariant: VariantKey;
};

const SLOTS: SlotSpec[] = [
  {
    slot: "homepage-hero",
    label: "Homepage Hero",
    variants: [
      { key: "mobile", width: 320, height: 100, field: "imageMobile" },
      { key: "tablet", width: 728, height: 90, field: "imageTablet" },
      { key: "desktop", width: 970, height: 250, field: "imageDesktop" },
    ],
    primaryVariant: "desktop",
  },
  {
    slot: "homepage-newsletter",
    label: "Homepage Newsletter (Super Leaderboard)",
    variants: [
      { key: "mobile", width: 320, height: 100, field: "imageMobile" },
      { key: "tablet", width: 728, height: 90, field: "imageTablet" },
      { key: "desktop", width: 970, height: 90, field: "imageDesktop" },
    ],
    primaryVariant: "desktop",
  },
  {
    slot: "homepage-card",
    label: "Homepage Card",
    variants: [{ key: "desktop", width: 300, height: 250, field: "imageDesktop" }],
    primaryVariant: "desktop",
  },
  {
    slot: "listing-sidebar",
    label: "Listing Sidebar",
    variants: [{ key: "desktop", width: 300, height: 600, field: "imageDesktop" }],
    primaryVariant: "desktop",
  },
  {
    slot: "article-inline",
    label: "Article Inline (Leaderboard)",
    variants: [
      { key: "mobile", width: 320, height: 100, field: "imageMobile" },
      { key: "desktop", width: 728, height: 90, field: "imageDesktop" },
    ],
    primaryVariant: "desktop",
  },
  {
    slot: "article-sidebar",
    label: "Article Sidebar",
    variants: [{ key: "desktop", width: 300, height: 600, field: "imageDesktop" }],
    primaryVariant: "desktop",
  },
];

function requireWriteToken() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error(
      "Missing SANITY_API_TOKEN. Add it to .env.local before running this script."
    );
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function bannerSvg({
  width,
  height,
  title,
  subtitle,
  meta,
}: {
  width: number;
  height: number;
  title: string;
  subtitle: string;
  meta: string;
}) {
  const pad = clamp(Math.round(Math.min(width, height) * 0.08), 10, 40);
  const titleSize = clamp(Math.round(height * 0.35), 14, 36);
  const subSize = clamp(Math.round(height * 0.16), 10, 18);
  const metaSize = clamp(Math.round(height * 0.14), 10, 16);

  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeMeta = escapeXml(meta);

  const centerX = width / 2;
  const centerY = height / 2;

  const titleY = centerY - subSize * 0.6;
  const subY = centerY + titleSize * 0.55;
  const metaY = subY + metaSize * 1.4;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect x="0" y="0" width="${width}" height="${height}" fill="#F6F4F1" />
  <rect x="${pad / 2}" y="${pad / 2}" width="${width - pad}" height="${height - pad}" fill="none" stroke="rgba(0,0,255,0.25)" stroke-width="2" />

  <text x="${centerX}" y="${titleY}" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="${titleSize}" font-weight="700" fill="#2A2A2A">${safeTitle}</text>
  <text x="${centerX}" y="${subY}" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="${subSize}" font-weight="500" fill="rgba(42,42,42,0.75)">${safeSubtitle}</text>
  <text x="${centerX}" y="${metaY}" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="${metaSize}" font-weight="500" fill="rgba(42,42,42,0.55)">${safeMeta}</text>
</svg>`;
}

async function renderPng({
  width,
  height,
  title,
  subtitle,
  meta,
}: {
  width: number;
  height: number;
  title: string;
  subtitle: string;
  meta: string;
}) {
  const svg = bannerSvg({ width, height, title, subtitle, meta });

  const png = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#F6F4F1",
    },
  })
    .composite([{ input: Buffer.from(svg) }])
    .png()
    .toBuffer();

  return png;
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

  for (const slotSpec of SLOTS) {
    const creativeId = `adCreative-rolfbenz-${slotSpec.slot}`;

    const existing = await client.fetch<Creative | null>(
      `*[_type == "adCreative" && _id == $id][0]{ _id, title, format, image, imageMobile, imageTablet, imageDesktop, linkUrl, altText }`,
      { id: creativeId }
    );

    const needs: VariantSpec[] = [];
    for (const v of slotSpec.variants) {
      const has = Boolean((existing as Record<string, unknown>)?.[v.field]);
      if (!has) needs.push(v);
    }

    if (existing && needs.length === 0 && existing.format === "image") {
      console.log(`${slotSpec.slot}: OK (images already present).`);
      continue;
    }

    if (!existing) {
      console.log(`${slotSpec.slot}: creative missing; will create with images.`);
    } else if (needs.length > 0) {
      console.log(`${slotSpec.slot}: uploading ${needs.length} missing image(s).`);
    } else {
      console.log(`${slotSpec.slot}: converting to image format (no images missing detected).`);
    }

    const patchSet: Record<string, unknown> = {
      title: `${PARTNER_NAME} — ${slotSpec.label}`,
      format: "image",
      linkUrl: partner.website,
      altText: `${PARTNER_NAME} — ${slotSpec.label}`,
    };

    for (const v of needs) {
      const png = await renderPng({
        width: v.width,
        height: v.height,
        title: PARTNER_NAME,
        subtitle: slotSpec.label,
        meta: `${v.width}×${v.height}`,
      });

      const filename = `rolf-benz__${slotSpec.slot}__${v.key}__${v.width}x${v.height}.png`;
      const asset = await client.assets.upload("image", png, {
        filename,
        contentType: "image/png",
      });

      const imageField: SanityImageField = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };

      patchSet[v.field] = imageField;

      // Also populate base `image` for preview + fallback rendering.
      if (v.key === slotSpec.primaryVariant) {
        patchSet.image = imageField;
      }

      if (!patchSet.image) {
        patchSet.image = imageField;
      }
    }

    if (existing) {
      await client.patch(creativeId).set(patchSet).commit();
    } else {
      const doc: SanityDocStub = {
        _id: creativeId,
        _type: "adCreative",
        ...patchSet,
      };
      await client.create(doc as SanityDocStub & Record<string, unknown>);
    }
  }

  console.log("Done. Rolf Benz image creatives ensured (exact pixel sizes).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
