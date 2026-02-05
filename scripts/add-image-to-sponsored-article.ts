import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function addImageToSponsoredArticle() {
  // Luxury bedding stock photo from Unsplash
  const imageUrl = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"; // Luxury bed linen

  try {
    // Upload image to Sanity using URL
    console.log("📥 Uploading image to Sanity...");
    const imageAsset = await client.assets.upload("image", imageUrl);

    console.log("✅ Image uploaded:", imageAsset._id);

    // Find the article
    const article = await client.fetch(
      '*[_type == "article" && slug.current == "luxe-beddengoed-wat-maakt-een-bed-echt-goed"][0]'
    );

    if (!article) {
      console.error("❌ Article not found");
      return;
    }

    // Update article with featured image
    await client
      .patch(article._id)
      .set({
        featuredImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      })
      .commit();

    console.log("✅ Article updated with featured image!");
    console.log(`   Article: ${article.title}`);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

addImageToSponsoredArticle();
