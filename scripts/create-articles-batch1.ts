import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
});

// Helper functions
const p = (text: string) => ({
  _type: 'block',
  _key: `p-${Math.random().toString(36).substr(2, 9)}`,
  style: 'normal',
  children: [{ _type: 'span', text, marks: [] }],
});

const bold = (text: string, before = '', after = '') => ({
  _type: 'block',
  _key: `p-${Math.random().toString(36).substr(2, 9)}`,
  style: 'normal',
  children: [
    ...(before ? [{ _type: 'span', text: before, marks: [] }] : []),
    { _type: 'span', text, marks: ['strong'] },
    ...(after ? [{ _type: 'span', text: after, marks: [] }] : []),
  ],
});

const h2 = (text: string) => ({
  _type: 'block',
  _key: `h2-${Math.random().toString(36).substr(2, 9)}`,
  style: 'h2',
  children: [{ _type: 'span', text, marks: [] }],
});

const h3 = (text: string) => ({
  _type: 'block',
  _key: `h3-${Math.random().toString(36).substr(2, 9)}`,
  style: 'h3',
  children: [{ _type: 'span', text, marks: [] }],
});

const quote = (text: string) => ({
  _type: 'block',
  _key: `q-${Math.random().toString(36).substr(2, 9)}`,
  style: 'blockquote',
  children: [{ _type: 'span', text, marks: [] }],
});

const link = (text: string, before = '', after = '', slug: string) => ({
  _type: 'block',
  _key: `p-${Math.random().toString(36).substr(2, 9)}`,
  style: 'normal',
  children: [
    ...(before ? [{ _type: 'span', text: before, marks: [] }] : []),
    {
      _type: 'span',
      text,
      marks: [{
        _type: 'internalArticleLink',
        _key: `link-${Math.random().toString(36).substr(2, 9)}`,
        reference: {
          _type: 'reference',
          _ref: slug,
        },
      }],
    },
    ...(after ? [{ _type: 'span', text: after, marks: [] }] : []),
  ],
});

const articles = [
  {
    title: 'Warm minimalisme: rust zonder kaalheid',
    slug: 'warm-minimalisme',
    excerpt: 'Warm minimalisme combineert de rust van minimalistisch design met de warmte van natuurlijke materialen. Zo creëer je een ruimte die opgeruimd maar uitnodigend is.',
    category: 'Stijlen',
    tags: ['warm minimalisme', 'minimalistisch', 'scandinavisch', 'natuurlijke materialen'],
    body: [
      p('Klassiek minimalisme heeft een probleem: het voelt vaak kil. Strak, wit, onpersoonlijk. Warm minimalisme lost dat op door natuurlijke materialen, zachte tinten en tactiele texturen toe te voegen. Je houdt de rust en ruimte, maar krijgt er gezelligheid bij.'),
      p('Het werkt zo goed omdat het aansluit bij hoe we nu willen wonen. Minder spullen, meer rust. Maar dan wel in een ruimte waar je je thuis voelt.'),
      
      h2('De basis: minder, maar beter'),
      p('Begin met opruimen. Niet alles weg, maar alles wat blijft moet een reden hebben. Gebruik of schoonheid – liefst beide. Een mooie vaas die alleen stof vangt: weg ermee.'),
      bold('Kwaliteit boven kwantiteit', '', ' is hier niet zomaar een kreet. Het betekent investeren in een goede bank waar je tien jaar plezier van hebt, in plaats van een goedkope die je na drie jaar weer vervangt. Het betekent een massief houten tafel kiezen boven een fineerlaagje. Dingen die blijven, die mooier worden met gebruik.'),
      p('Voor meubels betekent dit: simpele lijnen, geen overbodige details, neutrale kleuren. Denk aan een strak leren fauteuil, een eiken salontafel zonder franjes, een linnen bank in warm grijs. Tijdloos, dus je wordt het niet snel zat.'),
      
      h2('Materialen die warmte brengen'),
      p('Hier maak je het verschil tussen kil en knus.'),
      bold('Hout is de basis', '', '. Eiken, walnoot, teak – kies voor warme houtsoorten met zichtbare nerf. Gelakt of geolied, maar niet te donker. Het hout mag je zien en voelen.'),
      p('Voeg daar textiel aan toe: linnen gordijnen die licht doorlaten, wollen kleden die zacht aanvoelen, katoenen kussens in aardse tinten. Laag op laag textuur, allemaal in dezelfde neutrale toonladder.'),
      quote('Warm minimalisme draait niet om wat je toevoegt, maar om hoe het voelt.'),
      p('Verder: natuursteen (travertin, zandsteen), klei, leer, rotan. Materialen die leven, die niet perfect zijn. Een klein scheurtje in aardewerk, variatie in de houtnerfprint – dat hoort erbij. Het maakt je interieur menselijk in plaats van showroom.'),
      
      h2('Kleurpalet: warm neutraal'),
      bold('Basis: beige, zand, warm grijs', '', '. Niet het koude grijs van beton, maar tinten die naar taupe en greige neigen. Denk aan de kleur van ruwe linnen, ongeglazuurd aardewerk, licht eikenhout.'),
      p('Bouw daar variatie in. Lichtere tinten voor muren (gebroken wit, licht zandkleur), iets donkerder voor meubels en textiel. Geen harde contrasten, maar wel voldoende verschil om diepte te creëren.'),
      p('Accenten? Heel spaarzaam. Een enkele terracotta vaas, een olijfgroene plaid, mosterdgeel in kussens. Eén of twee kleuren, niet meer. En kies altijd voor gedempte tinten – geen felle primaire kleuren die schreeuwen om aandacht.'),
      
      h2('Verlichting: zacht en gelaagd'),
      p('Hard plafondlicht maakt elke ruimte kil. Gebruik meerdere zachte lichtbronnen.'),
      p('Een staande leeslamp bij de bank, een tafellamp op het dressoir, een hanglamp boven de eettafel met warm LED. Kies voor lampen in natuurlijke materialen: papier, linnen, rotan, keramiek. Ze filteren het licht en maken het zachter.'),
      bold('Dimbare verlichting', '', ' is essentieel. Je wilt overdag helder licht kunnen hebben, maar \'s avonds een warme gloed. Met een paar dimmers verander je de hele sfeer van je ruimte.'),
      
      h2('Praktisch toepassen'),
      p('Start met één ruimte – meestal de woonkamer. Haal eruit wat niet nodig is. Echt alles. Dan breng je terug wat essentieel is, maar dan in betere kwaliteit.'),
      p('Werk in lagen: eerst de grote items (bank, tafel, kast), dan de texturen (vloerkleed, gordijnen, kussens), dan de accenten (kunst, vazen, planten). Neem de tijd tussen elke laag. Het mag groeien.'),
      p('Denk ook aan opberging. Warm minimalisme vraagt om verborgen opbergruimte – kasten met vlakke fronten, manden onder de bank, laden in de salontafel. Je spullen zijn er wel, maar ze hoeven niet constant zichtbaar te zijn.'),
      
      h2('Veelgemaakte fouten'),
      p('Te wit. Wit is makkelijk, maar zonder warmte wordt het steriel. Kies voor gebroken wit, zandtinten, warm grijs.'),
      p('Te leeg. Minimalisme betekent niet kaal. Je hebt textiel nodig, planten, wat persoonlijke objecten. Anders voel je je ongemakkelijk in je eigen huis.'),
      bold('Te perfect', '', '. Als alles matcht en alles nieuw is, wordt het een catalogus. Durf een vintage item toe te voegen, een erfstuk, iets met geschiedenis.'),
      quote('Je huis is klaar als je niets meer kunt weghalen, maar ook niets wilt toevoegen.'),
    ],
  },
  {
    title: 'Bohemian interieur: persoonlijk zonder rommelig',
    slug: 'bohemian-interieur',
    excerpt: 'Bohemian interieur draait om laagjes, kleuren en verhalen. Zo creëer je die relaxte bohostijl zonder dat het chaotisch wordt.',
    category: 'Stijlen',
    tags: ['bohemian', 'boho', 'eclectisch', 'vintage'],
    body: [
      p('Bohemian interieur ademt vrijheid. Verschillende stijlen, tijdperken en culturen door elkaar. Maar het is een misverstand dat boho betekent: alles kan. Er zit wel degelijk een systeem in die relaxte chaos.'),
      p('Het verschil tussen boho en rommel? Alles heeft een reden om er te zijn. Elk kussen, elk vintage object, elke plant vertelt een verhaal of voegt iets toe aan het geheel. Dus wel gelaagd en rijk, maar niet willekeurig.'),
      
      h2('De kern: verzamelen en combineren'),
      bold('Bohemian is persoonlijk', '', '. Het zijn jouw reizen, jouw vondsten, jouw smaak. Geen catalog-look waar alles matcht. Juist de mix maakt het interessant.'),
      p('Begin met een basis van neutrale meubels – een vintage leren bank, een houten salontafel, rieten stoelen. Dat is je fundament. Daaroverheen bouw je de lagen: textiel, kunst, planten, verzamelde objecten.'),
      p('Het geheim? Werk met een kleurpalet. Kies 3-4 basiskleuren die goed samen werken. Voor boho zijn dat vaak warme aardse tinten: terracotta, oker, roestbruin, olijfgroen. Met daarnaast wat diepere accenten: bordeaux, diep blauw, donkergroen.'),
      
      h2('Textiel: laag op laag'),
      p('Dit is waar boho echt van leeft. Stapels kussens, gehaakte plaids, vintage tapijten, geweven wandkleden. Veel textiel, verschillende texturen, maar wel in je kleurpalet.'),
      bold('Begin met de vloer', '', ': een groot vintage tapijt als basis. Perzisch, Berber, kilim – wat past bij jouw stijl. Liefst een beetje versleten, met karakter. Daaroverheen, in de zithoek, een kleiner kleed of een schapenvacht.'),
      p('Op de bank: verschillende kussens in texturen en patronen. Fluweel naast linnen naast geweven katoen. Geometrisch naast bloemig naast uni. Het werkt omdat je kleurpalet klopt en omdat je texturen varieert – niet alles glad of niet alles ruw.'),
      quote('Meer is meer, maar alleen als het een verhaal vertelt.'),
      p('Vergeet de muren niet: macramé wandkleden, vintage textiel als wanddecoratie, een tafelkleed als gordijn. Bohemian durft onconventioneel te zijn.'),
      
      h2('Meubels: vintage en karakter'),
      p('Nieuwe meubels kunnen, maar ze moeten wel persoonlijkheid hebben. Een rotan fauteuil, een fluwelen poef, een houten vintage kist als salontafel.'),
      p('Mix tijdperken en stijlen. Een art deco spiegel boven een mid-century dressoir met daarop een Marokkaanse lamp. Klinkt gek, maar als de kleuren kloppen en de stijlen een gemeenschappelijke rijkheid delen, werkt het.'),
      bold('Geen matching sets', '', '. Vier verschillende stoelen rond je eettafel is perfect boho. Ze hoeven alleen dezelfde hoogte te hebben en ongeveer dezelfde kleur. De rest mag verschillen.'),
      
      h2('Planten: hoe meer hoe beter'),
      p('Bohemian zonder planten is geen bohemian. Grote bladeren, hangende planten, cactussen, kruiden op de vensterbank. Veel groen, verschillende hoogtes, verschillende soorten.'),
      p('Gebruik bijzondere plantenbakken: vintage manden, keramiek uit de jaren 70, rotan hangers, oude theepotten. Ook hier: variatie, maar wel binnen je stijl.'),
      
      h2('Verzamelingen tonen'),
      p('Dat is waar boho persoonlijk wordt. Jouw vintage camera\'s, je verzameling kaarsen, je koper, je boeken. Laat het zien.'),
      bold('Groepeer objecten', '', '. Drie of vijf stuks bij elkaar werkt beter dan alles verspreid. Speel met hoogtes – gebruik stapels boeken, kleine kratjes of schalen om niveaus te creëren.'),
      p('Open kasten zijn je vriend. Boekenkasten volgestopt met boeken en hier en daar een object. Vintage dressoirs met je mooiste spullen erop. Ladders tegen de muur voor plaids of tijdschriften.'),
      quote('Als je twijfelt of het te veel wordt: het is waarschijnlijk precies goed.'),
      
      h2('Verlichting: warm en sfeervol'),
      p('Vergeet kil LED. Bohemian vraagt om warme gloed: een Marokkaanse hanglamp met geperforeerd metaal, een schemerlamp met textiel kap, kaarsen overal.'),
      p('Veel lichtbronnen, allemaal zacht. Lichtslinger kan, maar dan wel warm wit en niet de feestelijke uitvoering. Denk meer aan een zachte gloed die schaduwen creëert.'),
      
      h2('Zo houd je het overzichtelijk'),
      p('De uitdaging bij boho: de grens tussen gezellig vol en te vol is dun. Hier is het geheim: alles heeft zijn plek.'),
      p('Gebruik manden, vintage koffers, kratjes voor opberging. Ze zijn decoratief én functioneel. Rotzooi verdwijnt erin, maar het ziet er nog steeds boho uit.'),
      bold('Edit regelmatig', '', '. Boho groeit organisch, maar soms moet je ook wat weghalen. Als je iets niet meer ziet staan, of als een hoek te vol wordt, neem dan de tijd om te herschikken. Wissel objecten om, berg sommige tijdelijk op, geef ruimte aan andere.'),
      p('En onthoud: bohemian bouw je niet in een weekend. Het is een verzameling die groeit met je leven. Elk stuk komt langzaam binnen: van reizen, markten, vintage winkels. Dat proces is onderdeel van de charme.'),
    ],
  },
  {
    title: 'Japandi: Japanse rust ontmoet Scandinavische warmte',
    slug: 'japandi',
    excerpt: 'Japandi combineert Japans minimalisme met Scandinavische gezelligheid. Het resultaat: een stijl die zowel sereen als warm is.',
    category: 'Stijlen',
    tags: ['japandi', 'japans', 'scandinavisch', 'wabi-sabi', 'hygge'],
    body: [
      p('Japandi is geen trend die weer verdwijnt. Het is de logische combinatie van twee culturen die functionaliteit, eenvoud en natuurlijke materialen eren. Japanse wabi-sabi (schoonheid in imperfectie) ontmoet Scandinavische hygge (gezellige eenvoud).'),
      bold('Wat beide delen', '', ': respect voor materiaal, liefde voor vakmanschap, voorkeur voor ruimte en licht. Het verschil: Japan is minimalistisch en contemplatief, Scandinavië is warm en gezellig. Japandi pakt het beste van beide.'),
      
      h2('Kleurpalet: neutraal met diepte'),
      p('Denk niet aan wit. Japandi gebruikt gebroken kleuren: warm grijs, greige, beige, zand, zacht roze-beige. Daarnaast zwart of heel donkerbruin voor contrast en diepte.'),
      p('Geen felle kleuren, maar wel textuur en variatie binnen je neutrale palet. Verschillende tinten beige naast elkaar, van licht tot diep. Een donkergrijs detail tegen warm grijs. Subtiel, maar met impact.'),
      bold('Hout in natuurlijke tonen', '', ' – eiken, essen, bamboe. Liefst onbehandeld of alleen geolied. Je wilt de nerf zien, de levendigheid van het materiaal.'),
      
      h2('Meubels: laag en functioneel'),
      p('Japanse invloed: lage meubels. Een lage bank, een salontafel die niet hoger is dan je knieën, lage kasten. Het creëert rust in je ruimte – het plafond lijkt hoger, alles voelt meer open.'),
      quote('Elk meubel heeft een functie. Alles wat alleen mooi is, moet heel mooi zijn.'),
      p('Scandinavische invloed: comfort. Zachte zittingen, warme textiel, ruimte om te ontspannen. Een Japanse ruimte kan ascetisch voelen, Japandi is uitnodigend.'),
      p('Combineer strakke lijnen met organische vormen. Een rechthoekige eettafel, maar met stoelen die zachte rondingen hebben. Een strak dressoir met daarop een organisch gevormde keramische vaas.'),
      
      h2('Materialen: natuurlijk en echt'),
      bold('Hout, linnen, wol, klei, steen', '', ' – allemaal in hun meest pure vorm. Geen namaak, geen plastic dat op hout lijkt, geen hoogglans laminaat.'),
      p('Japanse keramiek: stoneware met onregelmatige glazuur, handgemaakte kommen met variatie. Imperfectie is deel van de schoonheid. Scandinavisch textiel: grove weving, natuurlijke garens, zichtbare structuur.'),
      p('Dit geldt ook voor kleine dingen. Een eenvoudige houten lepel voor het koken, linnen servetten, een aardewerken broodpot. Mooie alledaagse objecten die je dagelijks gebruikt.'),
      
      h2('Ruimte en leegte'),
      p('Japandi ademt. Er is ruimte tussen meubels, lege muren, oppervlakken waar niets op staat. Die leegte is geen gebrek maar een keuze.'),
      p('In de praktijk: niet elke muur hoeft iets, niet elk vlak moet gevuld. Een enkele tak in een vaas is genoeg decoratie. Een leeg hoekje met alleen een vloerkleed en een kussen is een plek om te zijn.'),
      bold('Maar', '', ': deze minimaliteit voelt niet kil omdat de materialen warm zijn en omdat er net genoeg textiel is. Een wollen plaid over de bank, een handgeweven kleed op de vloer, linnen gordijnen.'),
      
      h2('Licht: natuurlijk en diffuus'),
      p('Maximaal daglicht, maar gefilterd. Japanse shoji-schermen of Scandinavische linnen gordijnen die licht doorlaten zonder te verblinden.'),
      p('Kunstlicht: papieren lampen (zeer Japans), houten hanglampen (Scandinavisch), keramische tafellampen. Alles in natuurlijke materialen, alles met een warm licht.'),
      quote('Licht is onderdeel van je interieur – behandel het met respect.'),
      
      h2('Planten: selectief en bewust'),
      p('Niet de jungle van bohemian, niet de kaalheid van streng minimalisme. Een paar zorgvuldig gekozen planten met schoonheid in hun structuur.'),
      p('Denk aan: bamboe (natuurlijk), een enkele mooie bonsai, een monstera met grote bladeren, eucalyptus takken. Geplaatst met intentie, niet overal verspreid.'),
      p('Plantenbakken: eenvoudige keramiek, natuurlijk cement, bamboe. Geen plastic, geen felle kleuren.'),
      
      h2('Toepassen in jouw huis'),
      p('Je hoeft niet Japans of Scandinavisch te wonen om Japandi te doen. Begin met opruimen – veel weghalen. Dan kies je voor elk item dat blijft: is het mooi, functioneel, of beide? Als geen van beide: weg ermee.'),
      bold('Investeer in kwaliteit', '', '. Eén goede houten tafel is Japandi. Vijf goedkope meubels zijn het niet. Hetzelfde voor textiel, keramiek, verlichting. Minder, maar beter.'),
      p('Werk met een strikt kleurpalet. Alle neutrale tinten moeten bij elkaar passen. Leg stalen naast elkaar, kijk bij daglicht én kunstlicht. Japandi vraagt om harmonie, niet om verrassing.'),
      p('En onthoud: Japandi is niet alleen een look, het is een manier van leven. Minder spullen, meer aandacht voor wat je hebt. Respect voor materialen en vakmanschap. Rust in je omgeving die je hoofd ook rust geeft.'),
    ],
  },
];

async function createArticles() {
  console.log('Creating articles...\n');
  
  for (const article of articles) {
    try {
      const doc = {
        _type: 'article',
        title: article.title,
        slug: { _type: 'slug', current: article.slug },
        excerpt: article.excerpt,
        category: article.category,
        tags: article.tags,
        body: article.body,
        publishedAt: new Date().toISOString(),
        featured: false,
      };
      
      const result = await client.create(doc);
      console.log(`✓ Created: ${article.title}`);
    } catch (error) {
      console.error(`✗ Failed: ${article.title}`, error);
    }
  }
  
  console.log('\nDone! Created 3 articles.');
}

createArticles().catch(console.error);
