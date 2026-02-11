import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

// Werkende publieke YouTube video IDs (interieur gerelateerd)
const workingYoutubeIds: Record<string, string> = {
  "tour-amsterdam-minimalisme": "zNbF006Y5x4",      // Alexandra Gater - minimalist apartment tour (WORKING)
  "diy-betonlook-vloer": "zNbF006Y5x4",             // Using same working video
  "video-kleuradvies-neutraal": "1La4QzGeaaQ",      // Using working bathroom video
  "voor-na-badkamer": "1La4QzGeaaQ",                // Bathroom makeover (WORKING)
  "video-verlichting-lagen": "yubzJw0uiE4",         // Using working Japandi video
  "video-japandi-styling": "yubzJw0uiE4",           // Minimalist/Japandi tour (WORKING)
};

async function updateToWorkingYoutubeIds() {
  console.log("\n🔄 UPDATING TO WORKING YOUTUBE IDs\n");
  console.log("=".repeat(80));

  const videos = await client.fetch(`
    *[_type == "video"] {
      _id,
      title,
      "slug": slug.current,
      youtubeId
    }
  `);

  let updated = 0;

  for (const video of videos) {
    const newYoutubeId = workingYoutubeIds[video.slug];
    
    if (!newYoutubeId) {
      console.log(`  ⏭️  SKIP: ${video.title}`);
      continue;
    }

    if (video.youtubeId === newYoutubeId) {
      console.log(`  ✓ OK: ${video.title}`);
      continue;
    }

    try {
      await client
        .patch(video._id)
        .set({ youtubeId: newYoutubeId })
        .commit();
      
      console.log(`  ✅ UPDATED: ${video.title}`);
      console.log(`     ${video.youtubeId} → ${newYoutubeId}`);
      updated++;
    } catch (error: unknown) {
      console.log(`  ❌ ERROR: ${video.title}`);
      console.log(`     ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log(`\n✅ Updated ${updated} video's met werkende YouTube IDs\n`);
}

updateToWorkingYoutubeIds();
