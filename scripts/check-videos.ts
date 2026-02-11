import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function checkVideos() {
  const videos = await client.fetch(`
    *[_type == "video"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      youtubeId,
      excerpt
    }
  `);

  console.log("\n📹 VIDEO's IN DATABASE:\n");
  console.log("=".repeat(80));
  
  videos.forEach((video: any, index: number) => {
    console.log(`\n${index + 1}. ${video.title}`);
    console.log(`   Slug: ${video.slug}`);
    console.log(`   YouTube ID: ${video.youtubeId}`);
    console.log(`   Excerpt: ${video.excerpt?.substring(0, 60)}...`);
  });
  
  console.log("\n" + "=".repeat(80));
  console.log(`Totaal: ${videos.length} video's\n`);
}

checkVideos();
