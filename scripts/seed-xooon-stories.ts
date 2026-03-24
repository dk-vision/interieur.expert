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

const storyData = [
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1080&h=1920&fit=crop",
    caption: "Nieuw: de Elements collectie 2026",
    link: "https://www.xooon.com",
    linkLabel: "Ontdek Elements",
  },
  {
    url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1080&h=1920&fit=crop",
    caption: "Binnenkijken bij onze showroom Hasselt",
  },
  {
    url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1080&h=1920&fit=crop",
    caption: "Styling tip: mix materialen voor warmte",
  },
  {
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1080&h=1920&fit=crop",
    caption: "De Torano bank — nu in nieuwe kleuren",
    link: "https://www.xooon.com",
    linkLabel: "Bekijk de Torano",
  },
];

async function main() {
  const partner = await client.fetch(
    `*[_type == "partner" && name match "XOOON*"][0]{_id, name}`
  );

  if (!partner) {
    console.error("XOOON partner niet gevonden");
    process.exit(1);
  }

  console.log(`Gevonden: ${partner.name} (${partner._id})`);

  const stories = [];

  for (let i = 0; i < storyData.length; i++) {
    const s = storyData[i];
    console.log(`Uploading story ${i + 1}: ${s.caption}...`);

    const response = await fetch(s.url);
    const buffer = Buffer.from(await response.arrayBuffer());

    const asset = await client.assets.upload("image", buffer, {
      filename: `xooon-story-${i + 1}.jpg`,
    });

    const publishedAt = new Date(
      Date.now() - i * 6 * 60 * 60 * 1000
    ).toISOString(); // stagger: 0h, 6h, 12h, 18h ago

    stories.push({
      _type: "object",
      _key: `story-${asset._id.slice(-8)}`,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
      caption: s.caption,
      link: s.link || undefined,
      linkLabel: s.linkLabel || undefined,
      publishedAt,
    });
  }

  await client.patch(partner._id).set({ stories }).commit();

  console.log(`\n✅ ${stories.length} stories toegevoegd aan ${partner.name}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
