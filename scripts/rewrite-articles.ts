/**
 * Script to rewrite article content for better readability and SEO/GEO
 * Transforms short, choppy paragraphs into flowing, engaging content
 */

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

// Improved article bodies with natural flow
const improvedBodies: Record<string, any[]> = {
  "bohemian-interieur": [
    {
      _type: "block",
      _key: "intro1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Een bohemian interieur ademt vrijheid en creativiteit, maar dat betekent niet dat het rommelig moet zijn. De bohostijl draait juist om het creëren van een persoonlijke, warme ruimte waarin elk object een verhaal vertelt. Het is een stijl die verschillende culturen, tijdperken en materialen samenbrengt op een manier die organisch aanvoelt, alsof de inrichting door de jaren heen is gegroeid. Voor veel mensen is dit de perfecte balans tussen comfort en karakter.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-1",
      style: "h2",
      children: [{ _type: "span", text: "De essentie van bohemian wonen", marks: [] }],
    },
    {
      _type: "block",
      _key: "essence1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Bohemian interieur is ontstaan uit de levensstijl van kunstenaars en reizigers die bewust kozen voor vrijheid boven conventie. Deze filosofie zie je terug in de inrichting: geen strakke regels, maar wel een doordachte chaos waarin elk element zijn plek heeft. Denk aan vintage vondsten van rommelmarkten, handgemaakte textiel uit verre landen, en erfstukken die generaties meegaan. Het gaat om laagjes bouwen – niet alleen in kleuren en patronen, maar ook in texturen en verhalen.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-2",
      style: "h2",
      children: [{ _type: "span", text: "Kleurgebruik: warm en aards", marks: [] }],
    },
    {
      _type: "block",
      _key: "color1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Het kleurpalet van een bohemian interieur is geïnspireerd op de natuur: warme terracotta, diep bordeauxrood, olijfgroen en mosterdgeel vormen de basis. Deze aardse tinten creëren een rustgevende sfeer en maken het makkelijk om verschillende elementen te combineren. Je kunt best wat kleuraccenten toevoegen – een felgekleurd kussen hier, een vintage tapijt daar – maar de kunst is om het in balans te houden. Begin met een neutrale basis en bouw dan laag voor laag op met textiel, kunst en decoraties die kleur toevoegen zonder overweldigend te worden.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-3",
      style: "h2",
      children: [{ _type: "span", text: "Materialen en texturen", marks: [] }],
    },
    {
      _type: "block",
      _key: "materials1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Natuurlijke materialen zijn de ruggengraat van de bohostijl. Rotan, riet en verweerd hout brengen warmte en textuur in je interieur, terwijl ze ook zorgen voor die relaxte, ongedwongen uitstraling. Combineer verschillende textiel: een Marokkaans berber tapijt onder een leren vintage bank, met daarbij kussens van geweven katoen en macramé wandkleden. Het spel van verschillende texturen – ruw tegen glad, mat tegen glanzend – maakt het interieur visueel interessant zonder dat je veel kleur hoeft toe te voegen. Vergeet ook de planten niet: rotan manden gevuld met groen voegen leven en frisheid toe.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-4",
      style: "h2",
      children: [{ _type: "span", text: "Persoonlijkheid door verzamelen", marks: [] }],
    },
    {
      _type: "block",
      _key: "personal1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Het mooie van bohemian interieur is dat het vraagt om persoonlijke objecten. Dat vintage vaasje van de vlooienmarkt, die schaal die je kocht tijdens een vakantie in Marokko, de poster van je favoriete kunstenaar – dit zijn de dingen die jouw interieur uniek maken. Creëer kleine verzamelingen op open planken of sideboards, maar houd het overzichtelijk. Groepeer objecten per drie of vijf, speel met hoogtes, en laat ruimte tussen de groepjes. Zo blijft het interessant en persoonlijk, zonder dat het overkomt als rommel.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2-5",
      style: "h2",
      children: [
        { _type: "span", text: "Praktisch: bohemian zonder chaos", marks: [] },
      ],
    },
    {
      _type: "block",
      _key: "practical1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "De uitdaging bij bohemian wonen is om het evenwicht te vinden tussen gelaagdheid en orde. Begin met goede opbergsystemen: rieten manden, vintage koffers en houten kratten zijn functioneel én decoratief. Kies meubels met karakter maar ook met praktische waarde – een vintage dressoir biedt opbergruimte én persoonlijkheid. Houd één kleurthema aan per ruimte en beperk het aantal verschillende patronen tot drie of vier die goed samen werken. En het belangrijkste: neem de tijd. Bohemian interieur bouw je niet in één weekend, maar groeit organisch terwijl je nieuwe schatten vindt die passen bij jouw verhaal.",
          marks: [],
        },
      ],
    },
  ],
};

async function rewriteArticles() {
  try {
    console.log("Starting article rewrite process...\n");

    // For now, let's do one article as example
    const articleSlug = "bohemian-interieur";
    
    console.log(`Fetching article: ${articleSlug}`);
    const articles = await client.fetch(`*[_type == "article" && slug.current == $slug][0]`, {
      slug: articleSlug,
    });

    if (!articles) {
      console.log(`Article not found: ${articleSlug}`);
      return;
    }

    console.log(`\nRewriting: ${articles.title}`);
    console.log(`Current body blocks: ${articles.body?.length || 0}`);

    const newBody = improvedBodies[articleSlug];
    
    if (!newBody) {
      console.log(`No improved body content found for ${articleSlug}`);
      return;
    }

    console.log(`New body blocks: ${newBody.length}`);
    console.log(`\nUpdating in Sanity...`);

    await client
      .patch(articles._id)
      .set({ body: newBody })
      .commit();

    console.log(`✅ Successfully updated: ${articles.title}\n`);
    console.log("Preview of new content:");
    console.log("─".repeat(60));
    console.log(newBody[0].children[0].text.substring(0, 200) + "...");
    console.log("─".repeat(60));

  } catch (error) {
    console.error("Error rewriting articles:", error);
  }
}

rewriteArticles();
