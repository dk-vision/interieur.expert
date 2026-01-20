import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import crypto from 'crypto';

config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

function generateKey() {
  return crypto.randomBytes(12).toString('hex');
}

const articleImprovements: Record<string, any> = {
  'japandi-stijl-guide': {
    seoTitle: 'Japandi Stijl: Hoe Je Japans en Scandinavisch Design Combineert | Interieur Expert',
    seoDescription: 'Ontdek de Japandi stijl: perfect minimalisme met warmte. Praktische tips voor het combineren van Japans en Scandinavisch interieur design in jouw huis.',
    body: [
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Japandi is meer dan een trend - het is een tijdloze ontwerpfilosofie die functionaliteit, kwaliteit en rust voorop stelt. Deze stijl combineert het beste van twee werelden: de warme minimalisme van Scandinavisch design en de verfijnde eenvoud van Japanse esthetiek.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'De kern van Japandi' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Beiden culturen delen een waardering voor natuurlijke materialen, vakmanschap en de schoonheid van imperfectie. Waar Scandinavisch design gezelligheid (hygge) benadrukt, brengt Japans design een zen-achtige rust (wabi-sabi). Samen creëren ze een harmonieuze balans.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Kleurenpalet' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Kies voor een basis van zachte neutralen: warme grijzen, beiges, zachte witte tinten. Voeg accenten toe met aardse kleuren zoals terracotta, zachte groentinten of donkerblauw. Vermijd felle kleuren en houd het palet kalm en samenhangend.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Materialen en texturen' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Natuurlijk hout is essentieel - denk aan lichte eiken, beuk of bamboe. Combineer dit met linnen, wol, katoen en riet. Voeg textuur toe met handgeweven dekens, keramiek met zichtbare imperfecties en plantaardige vezels. Vermi jd plastic en synthetische materialen.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Meubels en indeling' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Kies voor meubels met strakke, functionele lijnen maar met warmte. Lage zitmeubels, simpele houten tafels en open opbergruimte. Elke item moet een functie hebben - geen overbodige decoratie. Creëer ruimte om te ademen; overvol is het tegenovergestelde van Japandi.' }] },
    ],
  },
  'warm-minimalisme': {
    seoTitle: 'Warm Minimalisme: Minimalistisch Wonen Zonder Koud Te Zijn | Gids',
    seoDescription: 'Leer hoe je een warm minimalistisch interieur creëert met natuurlijke materialen en doordachte details. Tips voor gezellig minimalistisch wonen.',
    body: [
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Het geheim van warm minimalisme ligt in de combinatie van strakke lijnen met tactiele, natuurlijke materialen zoals hout, linnen en wol. Het resultaat: een rustige, opgeruimde ruimte die toch uitnodigt en geborgenheid biedt.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Materialen maken het verschil' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Koud minimalisme gebruikt vaak veel wit, glas en staal. Warm minimalisme daarentegen kiest voor hout, natuursteen, linnen en wol. Deze materialen voegen textuur en warmte toe zonder de rust te verstoren. Kies voor onafgewerkt hout met zichtbare nerf, handgeweven textiel en natuurlijke vezels.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Kleur met bedoeling' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'In plaats van strak wit, kies voor warme off-white tinten, zachte beiges en warme grijzen. Voeg accenten toe met terracotta, camel, olijfgroen of mosterdgeel. Houd de kleurschema\'s rustig en aards - felle kleuren doorbreken de harmonie.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Licht en textuur' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Warm licht is cruciaal. Gebruik lampen met een kleurtemperatuur van 2700-3000K. Meerdere lichtbronnen op verschillende hoogtes creëren diepte en gezelligheid. Combineer dit met zachte texturen: een handgeknoopt vloerkleed, linnen gordijnen, een wollen plaid - ze voegen warmte toe zonder visuele ruis.' }] },
    ],
  },
  'kleurpsychologie-interieur': {
    seoTitle: 'Kleurpsychologie in Interieur: Hoe Kleuren Je Stemming Beïnvloeden',
    seoDescription: 'Ontdek hoe kleuren je stemming en energie beïnvloeden. Praktisch advies voor het kiezen van de juiste kleuren voor elke ruimte in je huis.',
    body: [
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Kleuren hebben een directe, meetbare invloed op je gemoedstoestand en energie. Blauw verlaagt je hartslag, geel stimuleert creativiteit, en rood verhoogt je alertheid. Door bewust te kiezen kun je de sfeer van elke ruimte optimaliseren.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Blauw: kalmte en concentratie' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Blauw verlaagt de hartslag en creëert rust - perfect voor slaapkamers en badkamers. Lichtblauw opent de ruimte, donkerblauw voegt diepte toe. Let op: te veel blauw kan kil aanvoelen, dus combineer met warme accenten in hout of textiel.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Groen: balans en vitaliteit' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Groen is de meest rustgevende kleur voor het oog en brengt natuur binnen. Ideaal voor werkruimtes (concentratie) en woonkamers (ontspanning). Olijfgroen voegt warmte toe, saliegroen is rustgevend, donkergroen creëert luxe.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Geel: energie en positiviteit' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Geel stimuleert creativiteit en vrolijkheid. Perfect voor keukens, werkruimtes en gangen. Doseer wel - te veel geel kan onrustig maken. Kies voor zachte, warme gele tinten zoals mosterd of honing in plaats van fel citroengeel.' }] },
      { _type: 'block', _key: generateKey(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Rood en aardse tinten: warmte en gezelligheid' }] },
      { _type: 'block', _key: generateKey(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: generateKey(), text: 'Roodtinten verhogen de hartslag en stimuleren conversatie - gebruik dit in eetkamers. Zachte terracotta, roze en koraal brengen warmte zonder te overweldigen. Vermijd fel rood in slaapkamers, het stimuleert te veel.' }] },
    ],
  },
};

async function improveArticles() {
  console.log('📝 Improving article content and SEO...\n');

  for (const [slug, improvements] of Object.entries(articleImprovements)) {
    try {
      const articles = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
      
      if (!articles) {
        console.log(`⚠️  Article not found: ${slug}`);
        continue;
      }

      await client
        .patch(articles._id)
        .set({
          seoTitle: improvements.seoTitle,
          seoDescription: improvements.seoDescription,
          body: improvements.body,
        })
        .commit();

      console.log(`✅ Improved: ${slug}`);
    } catch (error: any) {
      console.error(`❌ Error improving ${slug}:`, error.message);
    }
  }

  console.log('\n✨ Done!');
}

improveArticles().catch(console.error);
