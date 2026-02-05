import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const p = (text: string) => ({
  _type: "block",
  _key: `p-${Math.random().toString(36).substr(2, 9)}`,
  style: "normal",
  children: [{ _type: "span", text, marks: [] }],
});

const h2 = (text: string) => ({
  _type: "block",
  _key: `h2-${Math.random().toString(36).substr(2, 9)}`,
  style: "h2",
  children: [{ _type: "span", text, marks: [] }],
});

const vincentSheppardAbout = [
  p("Vincent Sheppard ontwerpt en produceert sinds 1992 binnen- en buitenmeubilair met uitzonderlijk zitcomfort. Het Belgische familiebedrijf is wereldwijd marktleider in 'Lloyd Loom' meubels, een unieke weeftechniek waarbij kraftpapier rond een metalen draad wordt gedraaid en tot duurzame meubelstukken wordt geweven."),
  
  h2("Traditie en vakmanschap"),
  p("Het bedrijf is begonnen met het doel om de traditie en geschiedenis van de Lloyd Loom weeftechniek in ere te houden. Om dit te bereiken, ontwikkelde Vincent Sheppard een nauwe samenwerking met lokale ambachtslieden in Cirebon, Indonesië - een regio die bekend staat om zijn traditie in het weven en buigen van rotan."),
  p("De kennis en vaardigheden van deze ambachtslieden verheffen de producten tot kunstwerken, die stuk voor stuk tot in de perfectie met de hand zijn gemaakt. De ontwerpen worden gemaakt in België en daar ook afgewerkt, precies zoals oorspronkelijk bedoeld. Schilders, naaisters en ontwerpers werken samen om de cirkel rond te maken, met veel zorg en oog voor detail."),
  
  h2("Duurzaamheid en verantwoordelijkheid"),
  p("Vanaf het begin koos Vincent Sheppard bewust voor natuurlijke grondstoffen. Maar het bedrijf is ervan overtuigd dat de verantwoordelijkheid verder gaat dan het product zelf. Transparantie en eerlijkheid staan centraal - klanten moeten het bedrijf kunnen vertrouwen."),
  p("De productie is ecologisch georganiseerd: recyclage, reiniging van afvalwater en het gebruik van ecologische reinigingsproducten zijn standaard. Het hoofdkantoor in België is bijna zelfvoorzienend dankzij zonne-energie. In 2013 ontving Vincent Sheppard het FSC®-label van de Forest Stewardship Council, een symbool van ecologische, sociale en economische duurzaamheid."),
  
  h2("Collecties voor binnen en buiten"),
  p("Naast het beroemde Lloyd Loom assortiment, maakt Vincent Sheppard gebruik van andere natuurlijke en duurzame materialen zoals rotan, eiken, beuken en teak, in combinatie met staal en aluminium. De binnencollectie bestaat uit stoelen, tafels, banken, verlichting en accessoires met een uitgesproken design."),
  p("De buitencollectie biedt zeer kwalitatieve ontwerpen die karakter geven aan elke buitenruimte. Naast het behandelde outdoor Lloyd Loom assortiment, is er ook een collectie synthetische meubels die het hele jaar door buiten kunnen blijven staan."),
  
  h2("Wereldwijd aanwezig"),
  p("Vincent Sheppard meubels worden geëxporteerd naar meer dan 80 landen op zes continenten. Met trots kunnen ze zeggen dat hun meubels te vinden zijn in de mooiste hotels, huizen en restaurants over de hele wereld - van Botanic Sanctuary in Antwerpen tot luxe resorts wereldwijd."),
];

async function updateVincentSheppard() {
  console.log("Updating Vincent Sheppard partner info...\n");

  // Find Vincent Sheppard partner
  const partner = await client.fetch(`*[_type == "partner" && slug.current == "vincent-sheppard"][0]`);

  if (!partner) {
    console.log("❌ Vincent Sheppard partner not found. Please create it first.");
    return;
  }

  console.log(`Found partner: ${partner.name}`);
  console.log(`Current description: ${partner.description || 'NONE'}`);
  console.log(`\nUpdating...`);

  await client
    .patch(partner._id)
    .set({
      description: "Belgisch familiebedrijf en wereldleider in Lloyd Loom meubilair. Vakmanschap, natuurlijke materialen en duurzaam design voor binnen en buiten.",
      website: "https://www.vincentsheppard.com",
      about: vincentSheppardAbout,
      featured: true,
      brandColor: "#2C5F2D", // Natural green from their branding
    })
    .commit();

  console.log("\n✅ Vincent Sheppard updated successfully!");
  console.log("\nUpdated fields:");
  console.log("- Description: Short marketing copy");
  console.log("- Website: https://www.vincentsheppard.com");
  console.log("- About: Full rich text biography");
  console.log("- Featured: true");
  console.log("- Brand Color: #2C5F2D");
}

updateVincentSheppard().catch(console.error);
