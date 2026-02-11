import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

interface VideoCheck {
  _id: string;
  title: string;
  slug: string;
  youtubeId: string;
  excerpt?: string;
  transcriptLength: number;
  firstBlock?: string;
}

async function checkVideoContent() {
  const videos = await client.fetch(`
    *[_type == "video"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      youtubeId,
      excerpt,
      "transcriptLength": length(transcript),
      "firstBlock": transcript[0].children[0].text
    }
  `);

  console.log("\n📹 VIDEO CONTENT CHECK:\n");
  console.log("=".repeat(80));
  
  videos.forEach((video: VideoCheck, index: number) => {
    console.log(`\n${index + 1}. ${video.title}`);
    console.log(`   ID: ${video._id}`);
    console.log(`   Slug: ${video.slug}`);
    console.log(`   YouTube ID: ${video.youtubeId}`);
    console.log(`   Transcript blocks: ${video.transcriptLength || 0}`);
    console.log(`   First text: ${video.firstBlock?.substring(0, 80)}...`);
  });
  
  console.log("\n" + "=".repeat(80));
  
  // Check if all have same YouTube ID
  const uniqueYoutubeIds = [...new Set(videos.map((v: VideoCheck) => v.youtubeId))];
  console.log(`\n⚠️  Unieke YouTube IDs: ${uniqueYoutubeIds.length}`);
  if (uniqueYoutubeIds.length === 1) {
    console.log(`   → PROBLEEM: Alle video's hebben dezelfde YouTube ID: ${uniqueYoutubeIds[0]}`);
  }
  
  // Check if content is different
  const uniqueFirstBlocks = [...new Set(videos.map((v: VideoCheck) => v.firstBlock))];
  console.log(`\n📝 Unieke eerste tekst blocks: ${uniqueFirstBlocks.length}`);
  if (uniqueFirstBlocks.length === videos.length) {
    console.log(`   ✅ Content is VERSCHILLEND voor elke video`);
  } else {
    console.log(`   ⚠️  Sommige video's hebben dezelfde content`);
  }
  
  console.log("\n");
}

checkVideoContent();
