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

async function main() {
  const partner = await client.fetch(
    `*[_type == "partner" && name match "XOOON*"][0]{_id, name}`
  );
  console.log("Found:", partner.name, partner._id);
  await client.patch(partner._id).unset(["gallery"]).commit();
  console.log("✅ Gallery cleared for", partner.name);
}

main();
