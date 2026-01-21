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

const quote = (text: string) => ({
  _type: 'block',
  _key: `q-${Math.random().toString(36).substr(2, 9)}`,
  style: 'blockquote',
  children: [{ _type: 'span', text, marks: [] }],
});

const articles = [
  {
    title: 'Coastal interieur: strandhuis sfeer zonder clichés',
    slug: 'coastal-interieur',
    excerpt: 'Coastal interieur brengt de rust van de kust naar binnen, zonder maritieme clichés. Licht, natuurlijk en ontspannen.',
    category: 'Stijlen',
    tags: ['coastal', 'strand', 'zee', 'licht interieur'],
    body: [
      p('Coastal interieur is niet: schelpen plakken en blauw-wit strepen overal. Het is wel: de essentie van het strand vertalen naar je huis. Licht, lucht, natuurlijke materialen, gedempte kleuren. De rust die je voelt als je naar zee kijkt.'),
      p('Het werkt zelfs als je niet aan zee woont. Het gaat om de sfeer, niet om het letterlijk namaken van een strandhuis.'),
      
      h2('Kleurpalet: zacht en natuurlijk'),
      bold('Basis: zand, wit, lichtgrijs, bleek blauwgrijs', '', '. Tinten die je vindt op het strand: nat zand, droog zand, schelpen, drijfhout. Geen fel blauw tenzij je het doet als de zee – diep en gedempt, niet als een zwembad.'),
      p('Wit is belangrijk, maar niet ijskoud wit. Kies gebroken wit, off-white, crème. Het voelt zachter en warmer.'),
      p('Accenten in natuurlijke tinten: terracotta voor warmte, zacht groen (denk aan duingras), warm beige. Kleine touches die het palet menselijk maken zonder de luchtigheid te verstoren.'),
      
      h2('Materialen: verweerd en natuurlijk'),
      p('Hout moet eruitzien alsof het door de zon is gebleekt. Licht eiken, white-wash, verweerd teak. Geen donker hout, dat maakt het te zwaar.'),
      bold('Textiel: linnen, katoen, jute', '', '. Natuurlijke garens met structuur. Een juten vloerkleed, linnen gordijnen, katoenen kussens met grove weving. Alles wat het strand oproept zonder nautisch te worden.'),
      quote('Coastal draait om licht en luchtigheid – alles wat je toevoegt moet dat versterken.'),
      p('Rotan en riet werken perfect. Een rieten fauteuil, een rotan mand, een juten vloerkleed. Deze materialen zijn licht van karakter en laten licht door, wat de ruimte open houdt.'),
      
      h2('Meubels: laag en licht'),
      p('Kies meubels die niet zwaar ogen. Slanke poten, open constructies, lagere zitmeubels. Je wilt geen massieve blokken die de ruimte dicht maken.'),
      p('Een linnen slipcoverbank (een bank met een los, wasbaar linnen hoes) is iconisch coastal. Het ziet er casual uit, voelt comfortabel, en is praktisch. Kleur: natural beige of off-white.'),
      p('Verder: een lichte houten salontafel, rieten stoelen, een white-wash dressoir. Alles wat licht reflecteert in plaats van absorbeert.'),
      
      h2('Licht: maximaal en diffuus'),
      bold('Natural light is alles', '', ' bij coastal. Houd ramen vrij of gebruik lichte, transparante gordijnen. Geen zware drapes die licht blokkeren.'),
      p('Verlichting: denk aan papieren lampen, glazen hanglampen, gevlochten rotan lampenkappen. Alles wat zacht licht geeft zonder hard te worden.'),
      p('Mirrors helpen enorm. Een grote spiegel tegenover een raam verdubbelt het licht. Een serie kleine spiegels in drijfhout-achtige lijsten werkt ook – maar dan wel subtiel, niet als een discowand.'),
      
      h2('Decoratie: minimaal en natuurlijk'),
      p('Hier gaat het vaak mis. Mensen denken: coastal = schelpen verzamelen, ankers ophangen, alles met strepen.'),
      p('Doe dat niet. Een paar mooie schelpen in een schaal: prima. Een wandplank vol strandvondsten: te veel. Een enkel stuk drijfhout als sculptuur: mooi. Drie drijfhout-dingen: overkill.'),
      bold('Minder is echt meer', '', ' bij coastal. Een grote lege muur met alleen een spiegel is beter dan een vol aangeklede muur.'),
      quote('Als het eruitziet als een souvenirwinkel in een badplaats, ben je te ver gegaan.'),
      p('Planten: grassen en succulenten. Denk aan pampasgras in een grote vaas, eucalyptus takken, vetplanten in terracotta potten. Niets tropisch, niets te groen.'),
      
      h2('Vloeren en muren'),
      p('Licht hout voor de vloer – white-wash eiken of lichte laminaat. Of, als het budget het toelaat: natuursteen in lichte tinten (travertijn, wit kalksteen).'),
      p('Muren: wit of off-white. Je kunt één muur doen in zacht blauwgrijs of zandbeige voor diepte, maar houd het licht. Coastal werkt door reflectie – donkere muren zijn het einde van je luchtige sfeer.'),
      
      h2('De balans vinden'),
      p('Coastal kan snel saai worden (alles wit, geen persoonlijkheid) of te themtisch (maritiem museum). De kunst is de middleweg.'),
      p('Voeg persoonlijke elementen toe, maar kies ze zorgvuldig. Foto\'s in lichte lijsten, een kunstwerk met abstracte oceaankleuren, vintage strandfoto\'s in zwart-wit.'),
      bold('Textuur voorkomt saaih eid', '', '. Als je een neutraal palet hebt, moet je textuur stapelen: ruw linnen tegen glad hout tegen geweven jute tegen zacht katoen. Dat houdt het interessant.'),
      p('En onthoud: coastal gaat over het gevoel. De vraag is niet "heb ik genoeg strand-dingen?", maar "voelt mijn ruimte licht, rustig en ontspannen?". Als het antwoord ja is, doe je het goed.'),
    ],
  },
  {
    title: 'Industrieel interieur: ruw zonder koud',
    slug: 'industrieel-interieur',
    excerpt: 'Industrieel interieur combineert stoere materialen met warmte. Zo maak je die urban loft-sfeer toegankelijk en bewobaar.',
    category: 'Stijlen',
    tags: ['industrieel', 'loft', 'urban', 'raw materials'],
    body: [
      p('Industrieel interieur krijgt vaak het stempel "te koud" of "te mannelijk". Dat klopt als je het letterlijk doet – alles beton en staal. Maar goed gedaan combineert industrial stoerheid met warmte, en dat maakt het interessant.'),
      bold('De basis: raw materials', '', ' zoals beton, staal, baksteen, onbehandeld hout. Maar daartegenover zet je zacht leer, warm textiel, groen. Het contrast maakt het.'),
      
      h2('Materialen: hard en zacht'),
      p('Start met de harde elementen. Betonlook vloer of gepolijst cement, bakstenen muur (of betonnen wand), stalen kozijnen, zwart metaal in lampen en meubelpoten.'),
      p('Dan balanceer je met warmte: een cognac leren bank, wollen kleden, grove textiel. Hout in donkere of ruwe afwerking – oude eiken planken, gerecycled hout.'),
      quote('Industrial zonder warmte is een parkeergarage. Met warmte is het een thuis.'),
      p('Specifieke materialen die werken: cortenstaal (verroest staal), verweerd leer, beton met zichtbare luchtbellen, zwart staal, old wood. Alles wat een verhaal heeft, wat niet perfect is.'),
      
      h2('Kleurpalet: donker en neutraal'),
      bold('Basis: antraciet, zwart, donkergrijs, betongrijs', '', '. Daarnaast warm bruin (leer, hout), wit voor contrast, en touches van groen (planten).'),
      p('Geen felle kleuren. Wel roest-oranje als accent (past bij het industriële), of warm koper/brons in details.'),
      p('Het kleurschema is donkerder dan bij andere stijlen, maar dat hoeft niet somber te zijn als je verlichting goed doet en genoeg textuur hebt.'),
      
      h2('Meubels: robuust en functioneel'),
      p('Denk aan oude fabrieksmeubels. Houten werktafels met stalen frame, vintage industriële kasten, metalen stoelen. Veel van dit soort meubels zijn nu geproduceerde "vintage-look", en dat is prima – als ze maar stevig ogen.'),
      p('Combineer met modern comfort. Een grote leren bank (donkerbruin of zwart), een massieve houten eettafel, stalen boekenkasten. Alles met zichtbare structuur – geen verfijnde details, juist ruw en direct.'),
      bold('Open kasten werken goed', '', ' in industrial. Metalen frames met houten planken waar je boeken, objecten en plants op toont. Het is decoratie en opberging in één.'),
      
      h2('Verlichting: statement pieces'),
      p('Dit is waar industrial echt kan shinen. Grote hanglamp boven de eettafel – metaal, zwart of koper, liefst met zichtbare gloeilamp. Fabriekslampen, schijnwerpers, spots aan rails.'),
      p('Edison-lampen (die old-school gloeilampen met zichtbare gloeidraad) zijn iconisch industrial. Gebruik ze in opvallende armaturen: een hanglamp met meerdere peertjes, een staande lamp met geëxposeerde gloeilamp.'),
      quote('Je verlichting mag opvallen – het is onderdeel van de stijl.'),
      p('Combineer verschillende bronnen: overhead lighting (plafondspots of rails), task lighting (bureaulamp in metaal), accent lighting (wandlamp boven kunst). Industrial gebruikt vaak meer licht dan je denkt nodig hebt, omdat de donkere kleuren licht absorberen.'),
      
      h2('Muren: textuur en karakter'),
      bold('Bakstenen muur is het cliché', '', ', maar het werkt. Als je geen echte baksteen hebt, zijn er goede baksteenbehangen of baksteenlook panelen. Niet ideaal, maar beter dan een gladde witte muur.'),
      p('Alternatieven: betonlook verf (geeft textuur), wandpanelen in betonlook, of juist een paar muren in mat zwart of antraciet. Combineer gladde en ruwe muren voor diepte.'),
      p('Kunst aan de muur: zwart-wit fotografie werkt perfect (urban scenes, architectuur), industriële prints, of grote abstracte werken. Metalen wall art kan ook, maar pas op dat het niet te themtisch wordt.'),
      
      h2('Warmte toevoegen zonder te verzachten'),
      p('Het geheim van goed industrial: toevoegen van warmte zonder de edge te verliezen.'),
      p('Textiel: een groot wollen vloerkleed, leren kussens, een chunky knit plaid over de bank. Grove texturen die mannelijk blijven maar comfort toevoegen.'),
      bold('Planten zijn essentieel', '', '. Veel groen maakt industrial bewoonbaar. Grote plantenbakken in beton of metaal, hangplanten, een indoor boom (ficus, monstera). Het contrast tussen ruw en levend werkt.'),
      p('Hout in warme tinten: een oude houten ladder tegen de muur, houten kratten als opberging, een massieve houten plank als wandplank. Balanceert het metaal en beton.'),
      
      h2('Veelgemaakte fouten'),
      p('Te donker. Ja, industrial is donkerder dan andere stijlen, maar als je geen daglicht hebt, moet je wel oppassen. Compenseer met extra verlichting en lichtere accenten.'),
      p('Te koud. Alles metaal en beton zonder textiel of hout wordt onprettig. Je hebt de zachte elementen echt nodig.'),
      bold('Te themtisch', '', '. Stoplichten als decoratie, verkeersborden aan de muur, letterlijk een fabrieksmachine als salontafel – het wordt dan een karikatuur. Industrial hoeft niet letterlijk te zijn.'),
      p('En het belangrijkste: industrial is niet alleen voor grote lofts. Je kunt elementen toepassen in een normaal huis. Een bakstenen feature wall, industriële lampen, metalen meubelpoten. Het hoeft niet all-in.'),
    ],
  },
  {
    title: 'Neutrale kleuren slim combineren',
    slug: 'neutrale-kleuren',
    excerpt: 'Neutrale kleuren hoeven niet saai te zijn. Met de juiste combinaties creëer je een rijk, gelaagd interieur.',
    category: 'Kleur',
    tags: ['kleuren', 'neutraal', 'beige', 'grijs', 'interieur kleuren'],
    body: [
      p('Neutrale kleuren krijgen vaak het etiket "saai". Terwijl juist een neutraal palet de basis is van tijdloos design. Het probleem is niet het palet, maar hoe mensen het toepassen – alles in dezelfde tint, geen diepte, geen interesse.'),
      bold('Een goed neutraal interieur', '', ' speelt met undertones, contrasten en texturen. Het is allesbehalve vlak.'),
      
      h2('Meer dan grijs en beige'),
      p('Laten we het hebben over wat "neutraal" eigenlijk betekent. Het is een spectrum: van wit via beige, taupe, greige, grijs, naar bruin. En binnen elk van die kleuren zitten undertones – warme of koele tinten die bepalen hoe kleuren met elkaar praten.'),
      p('Beige kan naar geel neigen (warm) of naar grijs (koel). Grijs kan blauw undertones hebben (heel koel), groen (minder koel), of bruin (warm). Die undertones bepalen of kleuren samen werken.'),
      quote('Het geheim van neutraal is niet de kleur zelf, maar hoe kleuren elkaar aanvullen.'),
      
      h2('Undertones herkennen'),
      bold('Test je kleuren bij elkaar', '', '. Verf een stuk karton in je verschillende tinten en leg ze naast elkaar. Bij daglicht én kunstlicht. Je ziet dan direct of ze botsen of harmoniëren.'),
      p('Warm palet: beige met gele/roze ondertonen, warme grijzen met bruine undertones, crème wit, warm greige. Denk aan zand, kalksteen, ongebleekt linnen.'),
      p('Koel palet: grijs met blauwe undertones, beige met grijze undertones, koel wit, koel greige. Denk aan beton, steen, gebleekt linnen.'),
      p('Mix ze niet. Kies warm óf koel en blijf binnen die familie. Anders wordt je interieur rommelig zonder dat je precies weet waarom.'),
      
      h2('Contrast en diepte'),
      p('Een neutraal interieur werkt door contrasten. Niet van kleur, maar van toon – licht tegen donker.'),
      p('Maak een schaal van je kleuren, van licht naar donker. Je hebt ze allemaal nodig: heel licht voor muren en plafond, middentonen voor meubels, donker voor accenten en diepte.'),
      bold('De 60-30-10 regel', '', ': 60% dominant licht (muren, grote oppervlakken), 30% midtones (meubels, grote textiel), 10% donkere accenten (kussens, kunst, kleine objecten).'),
      p('Voorbeeld warm palet: muren in off-white, bank in warm beige, kussens en plaid in taupe en karamel, accenten in donkerbruin.'),
      p('Voorbeeld koel palet: muren in lichtgrijs, bank in medium grijs, kussens in antraciet en zilvergrijs, accenten in zwart.'),
      
      h2('Textuur is essentieel'),
      p('Hier gaat het mis bij veel neutrale interieurs. Zonder textuur is het inderdaad saai. Met textuur wordt het rijk en interessant.'),
      quote('In een neutraal interieur zie je niet alleen kleuren – je voelt ze.'),
      p('Varieer je materialen: glad tegen ruw, mat tegen glanzend, zacht tegen hard. Een fluwelen kussen naast grof linnen. Een hoogglans marmeren tafelblad naast een mat wollen kleed. Gladde muren naast een rotan mand.'),
      bold('Laag verschillende textiel', '', ': wol, linnen, katoen, fluweel, leer. Allemaal in je neutrale palet, maar met verschillende texturen. Dat houdt het visueel interessant.'),
      
      h2('Wit op wit'),
      p('Ja, dit kan. Maar je hebt variatie nodig in tint én textuur.'),
      p('Gebruik verschillende wittinten: warm off-white voor muren, bright white voor houtwerk, crème voor textiel. Voeg daar natuurlijke materialen aan toe: bleek hout, licht rotan, gebroken wit linnen.'),
      p('Het resultaat: een lichte, luchtige ruimte die niet steriel voelt omdat je textuur en subtiele toonverschillen hebt.'),
      
      h2('Accenten toevoegen'),
      p('Neutrale basis betekent niet dat je geen kleur mag gebruiken. Het betekent dat kleur bewust wordt ingezet, niet overal.'),
      bold('Kies één of twee accentkleuren', '', '. Voor warme neutrale: terracotta, roestoranje, olijfgroen, mosterd. Voor koele neutrale: navy, donkergroen, aubergine, donkerbruin.'),
      p('Gebruik je accenten spaarzaam: in kussens, een plaid, kunst, een enkele stoel. Ze mogen opvallen maar niet domineren.'),
      p('En onthoud: je kunt accenten makkelijk wisselen. Nieuwe kussens, andere kunst, en je hebt een andere sfeer – zonder je hele basis te veranderen. Dat is de kracht van een neutraal fundament.'),
      
      h2('Veelgemaakte fouten'),
      p('Alles in één tint. Variatie binnen neutraal is essentieel – van heel licht tot redelijk donker.'),
      p('Verkeerde undertones mixen. Je warme beige bank botst met je koele grijze muren. Kies één temperatuur.'),
      bold('Te weinig textuur', '', '. Een neutraal interieur zonder textuur is een hotelkamer. Voeg lagen toe.'),
      p('Te bang voor donker. Ook in een licht interieur heb je donkere accenten nodig voor diepte. Een zwart frame, donkerbruine kussens, een antraciet plaid – het anchoort het geheel.'),
    ],
  },
];

async function createArticles() {
  console.log('Creating batch 2...\n');
  
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
  
  console.log('\nBatch 2 done! 3 more articles created.');
}

createArticles().catch(console.error);
