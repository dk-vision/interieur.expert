import { createClient } from "@sanity/client";
import { config } from "dotenv";

// Load .env.local explicitly
config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function checkDossierArticles() {
  try {
    // Get all dossiers
    const dossiers = await client.fetch(`
      *[_type == "dossier"] {
        _id,
        title,
        "slug": slug.current,
        "articleCount": count(articles),
        "articles": articles[]->{
          _id,
          title,
          _type,
          "slug": slug.current
        }
      }
    `);

    console.log(`\nFound ${dossiers.length} dossiers:\n`);

    dossiers.forEach((dossier: any) => {
      console.log(`\n📁 ${dossier.title}`);
      console.log(`   Slug: /dossiers/${dossier.slug}`);
      console.log(`   Articles: ${dossier.articleCount}`);
      
      if (dossier.articles && dossier.articles.length > 0) {
        dossier.articles.forEach((article: any) => {
          console.log(`   - ${article.title} (${article._type})`);
        });
      } else {
        console.log(`   ⚠️ No articles assigned!`);
      }
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

checkDossierArticles();
