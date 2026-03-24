import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Placeholder images from Unsplash (interior/furniture themed, free to use)
const placeholderImages = [
  {
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
    caption: "XOOON Elementen bank — modulair en eigentijds",
  },
  {
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
    caption: "Woonkamer met XOOON collectie",
  },
  {
    url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop",
    caption: "Minimalistisch design met warme materialen",
  },
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop",
    caption: "Eetkamertafel in massief hout",
  },
  {
    url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=800&fit=crop",
    caption: "Sfeervolle woonkamer — zachte tinten",
  },
  {
    url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop",
    caption: "Fauteuil in boucléstof",
  },
];

async function main() {
  // Find XOOON partner
  const partner = await client.fetch(
    `*[_type == "partner" && name match "XOOON*"][0]{_id, name}`
  );

  if (!partner) {
    console.error("XOOON partner niet gevonden in Sanity");
    process.exit(1);
  }

  console.log(`Gevonden: ${partner.name} (${partner._id})`);

  // Upload images and build gallery array
  const gallery = [];

  for (const img of placeholderImages) {
    console.log(`Uploading: ${img.caption}...`);
    const response = await fetch(img.url);
    const buffer = Buffer.from(await response.arrayBuffer());

    const asset = await client.assets.upload("image", buffer, {
      filename: img.caption.replace(/[^a-z0-9]/gi, "-").toLowerCase() + ".jpg",
    });

    gallery.push({
      _type: "image",
      _key: asset._id.replace("image-", "").slice(0, 12),
      caption: img.caption,
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    });
  }

  // Patch the partner document
  await client.patch(partner._id).set({ gallery }).commit();

  console.log(
    `\n✅ ${gallery.length} foto's toegevoegd aan ${partner.name} galerij`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
