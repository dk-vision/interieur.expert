import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

// Get all articles to find related ones for internal links
async function getAllArticles() {
  return await client.fetch(`
    *[_type == 'article'] {
      _id,
      title,
      'slug': slug.current,
      tags,
      category
    }
  `);
}

// Helper to find related article by tag or topic
function findRelatedArticle(
  currentSlug: string,
  topic: string,
  allArticles: any[]
) {
  const topicMap: Record<string, string[]> = {
    minimalism: ["minimalisme", "minimalistisch", "warm-minimalisme"],
    scandinavian: ["japandi", "scandinavisch"],
    color: ["kleurpsychologie", "neutrale-kleuren"],
    lighting: ["verlichting-in-lagen"],
    materials: ["natuurlijke-materialen", "vloeren-vergelijken"],
    budget: ["budget-slim-investeren", "eerste-woning-inrichten"],
    space: ["kleine-ruimtes", "akoestiek-verbeteren"],
  };

  const slugs = topicMap[topic] || [];
  const related = allArticles.find(
    (a) => slugs.includes(a.slug) && a.slug !== currentSlug
  );
  return related;
}

// Article enhancements with bold, quotes, and internal links
const articleEnhancements: Record<string, any> = {
  "warm-minimalisme": {
    updates: [
      {
        // Add bold to first key concept
        search: "Warm minimalisme combineert",
        replace:
          "**Warm minimalisme** combineert de **rust en ordelijkheid** van minimalisme",
      },
      {
        // Add blockquote
        search:
          "Het gaat om bewuste keuzes maken: elk item in je ruimte moet een functie hebben of je blij maken.",
        replace: `Het gaat om bewuste keuzes maken: elk item in je ruimte moet een functie hebben of je blij maken.

> "In een warm minimalistisch interieur heeft elk object een reden om er te zijn - functie, emotie, of beide."`,
      },
      {
        // Add internal link to related article
        search: "natuurlijke materialen zoals hout, linnen en wol",
        replace:
          "natuurlijke materialen zoals hout, linnen en wol",
        internalLink: { topic: "materials", text: "natuurlijke materialen" },
      },
    ],
  },

  "minimalisme-zonder-koud": {
    updates: [
      {
        search: "Minimalisme hoeft niet koud",
        replace: "**Minimalisme** hoeft niet **koud of onpersoonlijk** te zijn",
      },
      {
        search:
          "Door te focussen op wat echt belangrijk is, creëer je ruimte - letterlijk en figuurlijk.",
        replace: `Door te focussen op wat echt belangrijk is, creëer je ruimte - letterlijk en figuurlijk.

> "Less is more - maar alleen als je bewust kiest wat blijft."`,
      },
    ],
  },

  "japandi": {
    updates: [
      {
        search: "Japandi is de perfecte balans",
        replace:
          "**Japandi** is de perfecte balans tussen **Japanse eenvoud** en **Scandinavische warmte**",
      },
      {
        search: "functioneel design met natuurlijke materialen",
        replace: "functioneel design met natuurlijke materialen",
        internalLink: {
          topic: "scandinavian",
          text: "natuurlijke materialen",
        },
      },
    ],
  },

  "neutrale-kleuren-slim-combineren": {
    updates: [
      {
        search: "Neutrale kleuren zijn veel meer",
        replace:
          "**Neutrale kleuren** zijn veel meer dan alleen **grijs en beige**",
      },
      {
        search: "verschillende tinten binnen hetzelfde kleurenpalet",
        replace: "verschillende tinten binnen hetzelfde kleurenpalet",
        internalLink: { topic: "color", text: "kleurenpalet" },
      },
      {
        search:
          "Een goed neutraal kleurenschema geeft rust, maar nooit verveling.",
        replace: `Een goed neutraal kleurenschema geeft rust, maar nooit verveling.

> "De kracht van neutrale kleuren zit in de nuances - dezelfde tint in verschillende texturen creëert diepte."`,
      },
    ],
  },

  "kleurpsychologie-in-interieur": {
    updates: [
      {
        search: "Kleuren hebben een directe invloed",
        replace: "**Kleuren** hebben een **directe invloed op je stemming**",
      },
      {
        search: "Blauwtinten hebben een kalmerend effect",
        replace:
          "**Blauwtinten** hebben een kalmerend effect, terwijl **rood energie** geeft",
      },
    ],
  },

  "verlichting-in-lagen": {
    updates: [
      {
        search: "Goede verlichting werkt in drie lagen",
        replace:
          "**Goede verlichting** werkt in **drie essentiële lagen**: algemeen, taak en accent",
      },
      {
        search: "Elke ruimte heeft verschillende verlichtingsbehoeften",
        replace: `Elke ruimte heeft verschillende verlichtingsbehoeften.

> "Licht is niet alleen functioneel - het bepaalt de hele sfeer van je ruimte."`,
      },
    ],
  },

  "natuurlijke-materialen-in-moderne-interieurs": {
    updates: [
      {
        search: "Natuurlijke materialen brengen warmte",
        replace:
          "**Natuurlijke materialen** brengen **warmte en karakter** in moderne interieurs",
      },
      {
        search: "Hout, steen, linnen en leer",
        replace:
          "**Hout, steen, linnen en leer** - deze materialen blijven tijdloos",
      },
    ],
  },

  "vloeren-vergelijken": {
    updates: [
      {
        search: "De keuze van je vloer bepaalt",
        replace:
          "De keuze van je **vloer bepaalt de basis** van je hele interieur",
      },
      {
        search: "Hout is warm en tijdloos",
        replace: "**Hout** is warm en tijdloos, **beton** is stoer en modern",
      },
    ],
  },

  "gordijnen-ophangen-hoogte-breedte": {
    updates: [
      {
        search: "De manier waarop je gordijnen ophangt",
        replace:
          "De manier waarop je **gordijnen ophangt** maakt een **enorm verschil**",
      },
      {
        search: "Hang gordijnen altijd hoger dan je raam",
        replace:
          "**Hang gordijnen altijd hoger dan je raam** - minimaal 15-20 cm",
      },
      {
        search: "goed opgehangen gordijnen maken je ruimte groter",
        replace: "goed opgehangen gordijnen maken je ruimte groter",
        internalLink: { topic: "space", text: "ruimte groter" },
      },
    ],
  },

  "kleine-ruimtes-groter-laten-lijken": {
    updates: [
      {
        search: "Kleine ruimtes vraagom slimme keuzes",
        replace: "Kleine ruimtes vragen om **slimme, doordachte keuzes**",
      },
      {
        search: "Lichte kleuren reflecteren licht",
        replace:
          "**Lichte kleuren** reflecteren licht en maken de ruimte **optisch groter**",
      },
      {
        search: "goede verlichting",
        replace: "goede verlichting",
        internalLink: { topic: "lighting", text: "goede verlichting" },
      },
    ],
  },

  "eerste-woning-inrichten": {
    updates: [
      {
        search: "Je eerste eigen woning inrichten",
        replace: "Je **eerste eigen woning** inrichten kan **overweldigend** zijn",
      },
      {
        search: "Begin met de basis",
        replace:
          "**Begin met de basis**: bed, bank, eettafel - de rest komt later",
      },
      {
        search: "budget slim investeren",
        replace: "budget slim investeren",
        internalLink: { topic: "budget", text: "budget slim" },
      },
    ],
  },

  "budget-slim-investeren": {
    updates: [
      {
        search: "Met een beperkt budget inrichten",
        replace:
          "Met een **beperkt budget** kun je toch een **mooi interieur** creëren",
      },
      {
        search: "Investeer in kwaliteit waar je dagelijks gebruik van maakt",
        replace: `**Investeer in kwaliteit** waar je dagelijks gebruik van maakt.

> "Koop goedkoop wat je vaak vervangt, koop kwaliteit wat je dagelijks gebruikt."`,
      },
    ],
  },

  "akoestiek-verbeteren-in-open-ruimtes": {
    updates: [
      {
        search: "Open ruimtes kunnen echoën en geluid versterken",
        replace:
          "**Open ruimtes** kunnen **echoën en galmen** - goede akoestiek is essentieel",
      },
      {
        search: "Textiel absorbeert geluid",
        replace:
          "**Textiel absorbeert geluid**: gordijnen, tapijten, kussens maken een groot verschil",
      },
    ],
  },

  "interieurtrends-2026-textuur-ambacht": {
    updates: [
      {
        search: "2026 draait om authenticiteit",
        replace: "**2026** draait om **authenticiteit en ambacht**",
      },
      {
        search: "Textuur wordt belangrijker dan kleur",
        replace:
          "**Textuur** wordt belangrijker dan kleur - denk aan **grove linnen, gebeeldhouwd hout, handgemaakt aardewerk**",
      },
    ],
  },
};

async function enhanceArticles() {
  console.log("\n📝 ENHANCING ARTICLES WITH BETTER FORMATTING\n");
  console.log("Adding: Bold text, quotes, internal links\n");

  const allArticles = await getAllArticles();
  let enhanced = 0;
  let failed = 0;

  for (const [slug, data] of Object.entries(articleEnhancements)) {
    try {
      console.log(`\n🔧 Processing: ${slug}`);

      // Get current article
      const article = await client.fetch(
        `*[_type == 'article' && slug.current == $slug][0] { _id, body }`,
        { slug }
      );

      if (!article) {
        console.log(`  ⚠️  Article not found, skipping`);
        continue;
      }

      // This is a simplified approach - in reality we'd need to parse and modify the portable text structure
      console.log(
        `  ✅ Found article (would apply ${data.updates.length} enhancements)`
      );
      console.log(`  → Bold text for key concepts`);
      console.log(`  → Blockquotes for important insights`);
      console.log(`  → Internal links to related articles`);

      enhanced++;
    } catch (error: any) {
      console.log(`  ❌ Failed: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n\n${"=".repeat(60)}`);
  console.log(`✅ Would enhance: ${enhanced} articles`);
  console.log(`❌ Failed: ${failed} articles`);
  console.log(`${"=".repeat(60)}`);
  console.log(
    "\n💡 Note: Due to portable text complexity, manual editing recommended"
  );
  console.log("   Use Sanity Studio to add formatting as shown above");
}

enhanceArticles();
