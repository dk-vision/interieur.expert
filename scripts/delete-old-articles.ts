import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const articlesToDelete = [
  {
    id: "8793b048-a98e-4bf1-9a79-d954bf1bb84d",
    title: "Dit is een testartikel",
    reason: "Test article",
  },
  {
    id: "8sLbU849Ngr6bwLlc7nKYe",
    title: "Budget inrichten zonder concessies (134 chars)",
    reason: "Duplicate - better version exists",
  },
  {
    id: "HPyi3RetijOhyCWtAhOzru",
    title: "Kleur kiezen voor je woonkamer",
    reason: "No SEO, short content",
  },
  {
    id: "j3EW81XnW2YRbriXMIXN3s",
    title: "Vloeren kiezen: hout, tegel, vinyl of beton? (120 chars)",
    reason: "Duplicate - better version exists",
  },
  {
    id: "j3EW81XnW2YRbriXMIXOic",
    title: "Je eerste woning inrichten: waar begin je? (149 chars)",
    reason: "Duplicate - better version exists",
  },
  {
    id: "j3EW81XnW2YRbriXMIXPTa",
    title: "Kleine ruimtes groter laten lijken: wat werkt écht (157 chars)",
    reason: "Duplicate - better version exists",
  },
  {
    id: "qFjCUm0cQ7VYPPtd3LLsEp",
    title: "Verlichting als basis van je interieur",
    reason: "No SEO, short content",
  },
  {
    id: "qFjCUm0cQ7VYPPtd3LLsQN",
    title: "Kleine ruimtes groter laten lijken (885 chars)",
    reason: "Duplicate - better version exists",
  },
  {
    id: "uLnZjZPchgZxzAUHwxQVzy",
    title: "De kracht van natuurlijke materialen (989 chars)",
    reason: "Duplicate - better version exists",
  },
  {
    id: "uLnZjZPchgZxzAUHwxQX4E",
    title: "De comeback van ambachtelijk meubelwerk",
    reason: "No SEO, short content",
  },
];

async function deleteArticles() {
  console.log("\n🗑️  DELETING OLD ARTICLES WITHOUT PROPER SEO\n");
  console.log(`Total articles to delete: ${articlesToDelete.length}\n`);

  let deleted = 0;
  let failed = 0;

  for (const article of articlesToDelete) {
    try {
      console.log(`Deleting: ${article.title}`);
      console.log(`  Reason: ${article.reason}`);

      await client.delete(article.id);

      console.log(`  ✅ Deleted successfully\n`);
      deleted++;
    } catch (error: any) {
      console.log(`  ❌ Failed: ${error.message}\n`);
      failed++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`✅ Successfully deleted: ${deleted} articles`);
  if (failed > 0) {
    console.log(`❌ Failed to delete: ${failed} articles`);
  }
  console.log("=".repeat(60));
  console.log(
    "\n✨ Cleanup complete! All old articles without proper SEO have been removed."
  );
}

deleteArticles();
