import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function checkPreviewVideos() {
  const videos = await client.fetch(`
    *[_type == "video"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      "hasPreviewVideo": defined(previewVideo),
      "previewVideoUrl": previewVideo.asset->url
    }
  `);

  console.log("\n🎬 PREVIEW VIDEO CHECK:\n");
  console.log("=".repeat(80));
  
  videos.forEach((video: any, index: number) => {
    console.log(`\n${index + 1}. ${video.title}`);
    console.log(`   Has preview: ${video.hasPreviewVideo ? '✅ YES' : '❌ NO'}`);
    if (video.previewVideoUrl) {
      console.log(`   URL: ${video.previewVideoUrl.substring(0, 60)}...`);
    }
  });
  
  console.log("\n" + "=".repeat(80));
  
  const withPreview = videos.filter((v: any) => v.hasPreviewVideo).length;
  console.log(`\n📊 ${withPreview} van ${videos.length} video's hebben preview video\n`);
}

checkPreviewVideos();
