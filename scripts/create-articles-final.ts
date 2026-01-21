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

const articles = [
  {
    title: 'Je eerste woning inrichten: waar begin je?',
    slug: 'eerste-woning',
    excerpt: 'Je eerste woning inrichten is overweldigend. Hier is het stappenplan: van essentials tot finishing touches.',
    category: 'Praktisch',
    tags: ['eerste woning', 'starters', 'budget', 'inrichten'],
    body: [
      p('Lege ruimte, beperkt budget, geen ervaring. En elk meubel dat je koopt voelt als een enormous commitment. Welkom bij je eerste woning. Het goede nieuws: je hoeft niet alles in één keer. Het betere nieuws: dit is je stappenplan.'),
      bold('Begin met essentials', '', ', bouw van daaruit op. Niet alles tegelijk, maar slim en gefaseerd.'),
      
      h2('Fase 1: de absolute basics'),
      p('Je eerste maand heb je nodig: een plek om te slapen, een plek om te eten, een plek om te zitten. Dat is het. Alles anders is nice to have.'),
      p('Concreet: bed met matras, eettafel met stoelen (of eerst een kleine tafel waar je zowel kunt eten als werken), bank of zitplek. Gordijnen of rolgordijnen voor privacy. Basisverlichting.'),
      quote('Je eerste aankopen zijn geen forever-meubels. Het is oké om basic te beginnen.'),
      bold('Budget allocatie fase 1', '', ': investeer in je matras (je slaapt 8 uur per dag erop). De rest mag goedkoper – je upgrade later wel.'),
      
      h2('Fase 2: functioneel compleet'),
      p('Als de basics staan, maak je het functioneel. Opberging, keukenspullen, badkamer essentials.'),
      p('Opberging eerst. Een kledingkast of open kledingrek. Boekenplank of kast voor spullen. Badkamerrek. Je hebt dit nodig om niet in chaos te leven.'),
      p('Keuken: basic pannenset, mes set, borden/glazen voor 4-6 personen. Niet alles in één keer – bouw op terwijl je ontdekt wat je echt gebruikt.'),
      
      h2('Waar investeer je, waar bespaar je?'),
      bold('Investeer in', '', ': matras, bank (je gebruikt het dagelijks), verlichting (maakt enormous verschil), eettafel (gaat jaren mee).'),
      p('Bespaar op: decoratie (komt later), accessoires, trendy items, kleine meubeltjes die "leuk" zijn maar niet nodig.'),
      p('Tweedehands werken voor: eethoek (Marktplaats barst van de goede tafels en stoelen), kasten (IKEA PAX is overal tweedehands), sideboards, lampen.'),
      quote('Tweedehands is niet "arm" – het is slim en duurzaam.'),
      
      h2('Kleurpalet kiezen'),
      p('Dit is overwhelming voor starters. Advies: kies neutraal basis, add personality later.'),
      bold('Grote items in neutrale kleuren', '', ': bank in grijs/beige/taupe, bed in natuurlijk hout of wit, kasten in neutrale tinten. Dat geeft flexibility – je kunt elke kant op met accessoires.'),
      p('Kleur toevoegen via: kussens, art, plaids, keuken accessoires. Dat kun je makkelijk (en goedkoop) wisselen als je smaak verandert.'),
      
      h2('De valkuil: te snel te veel'),
      p('Biggest mistake bij first home: alles in één weekend kopen bij IKEA. Je hebt een "complete" ruimte, maar niets past bij elkaar en je houdt er niet van.'),
      p('Better approach: koop alleen wat je echt nu nodig hebt. Leef een paar weken in je ruimte. Je ontdekt wat je mist, wat je irriteert, hoe je echt leeft. Dán koop je verder.'),
      bold('Geef jezelf 6 maanden', '', ' om je huis "af" te hebben. Echt, dat is snel genoeg. Persoonlijkheid en stijl komen met tijd.'),
      
      h2('Budget: realistische kosten'),
      p('Basis inrichten (fase 1+2) voor 1-persoons woning: €2000-€4000 als je slim koopt (mix nieuw/tweedehands). Voor 2-persoons: €3000-€6000.'),
      p('Breakdown: matras €400-€800. Bank €500-€1200 (nieuw basic) of €200-€600 (goede tweedehands). Eettafel+stoelen €300-€800. Verlichting €200-€400. Beddengoed, gordijnen, keuken basics €500-€1000. Opberging €400-€800.'),
      quote('Je hoeft het niet allemaal nu te hebben. Spaar voor quality items, vul in met budget pieces.'),
      
      h2('Praktische tips per ruimte'),
      h3('Woonkamer'),
      p('Prioriteit: comfortabele bank. Goedkoop mag, maar moet wel lekker zitten – je test dit in de winkel. Salontafel kan simpel (zelfs DIY met planken en schragen). Rek/kast voor opberging en styling.'),
      
      h3('Slaapkamer'),
      bold('Matras is koning', '', '. Hier investeer je. Frame mag simpel – zelfs een basis IKEA frame of DIY platform. Goed beddengoed maakt meer verschil dan je denkt – investeer in degelijke lakens.'),
      
      h3('Keuken'),
      p('Je hebt minder nodig dan je denkt. Start met: 2 pannen (klein en groot), 1 koekenpan, basis messenset, snijplank, maatbeker, spatel set. Uitbreiden kun je altijd, maar dit is genoeg om alles te kunnen maken.'),
      
      h3('Badkamer'),
      p('Handdoeken, douche gordijn/deur, basis toiletries opberging. Een spiegel als die er niet is. Planten voor leven. Meer heb je niet nodig.'),
      
      h2('Groeien met je interieur'),
      p('Over 2 jaar is je smaak veranderd. Over 5 jaar koop je misschen een groter huis. Dat is normaal. Zie je eerste woning als leerproces.'),
      p('Wat je nu koopt hoeft niet forever te zijn. Het is oké om over een paar jaar te upgraden. Het is ook oké om items mee te nemen naar je next place als je ervan houdt.'),
      bold('De les', '', ': begin simpel, build met intentie, laat het groeien. Je perfecte interieur komt niet in één keer, maar laag voor laag.'),
    ],
  },
  {
    title: 'Budget slim investeren in interieur',
    slug: 'budget-investeren',
    excerpt: 'Een mooi interieur vraagt geen onbeperkt budget, maar wel slimme keuzes. Waar investeer je, waar bespaar je?',
    category: 'Praktisch',
    tags: ['budget', 'investeren', 'kwaliteit', 'tweedehands'],
    body: [
      p('Mooi wonen = duur? Niet per se. Maar het vraagt wel slimme keuzes. Waar investeer je in kwaliteit, waar koop je goedkoop, wanneer kies je tweedehands? Dit zijn de regels.'),
      bold('De basis regel', '', ': investeer in wat je dagelijks gebruikt en wat jaren meegaat. Bespaar op trends en decoratie.'),
      
      h2('Investeer in: grote meubels'),
      p('Bank, bed, eettafel, kasten. Dit zijn je big purchases, en ze bepalen hoe je ruimte functioneert en voelt.'),
      p('Een goede bank kost €1500-€3000, maar gaat 10-15 jaar mee. Een goedkope IKEA bank (€400) gaat 3-5 jaar mee en voelt nooit echt comfortabel. Per jaar is de goede bank goedkoper én prettiger.'),
      quote('Kwaliteit voelt duurder dan het is. Goedkoop voelt goedkoop, altijd.'),
      bold('Wat maakt meubels quality', '', ': massief hout vs spaanplaat. Stof met hoge rub count vs dun textiel. Echte veren vs foam. Dovetail joints vs gelijmde hoeken.'),
      p('Je hoeft niet alles te weten, maar leer basics herkennen. Til een meubel op – voelt het zwaar en solide, of licht en wankel? Dat zegt genoeg.'),
      
      h2('Investeer in: matras en beddengoed'),
      p('Je slaapt 8 uur per dag. Dat is een third van je leven. Een goede matras (€800-€1500) is niet duur, het is essentieel.'),
      p('Hetzelfde geldt voor dekbed, kussen, lakens. Goedkope polyester lakens voelen plastic en maken je zweterig. Katoenen satijn (vanaf €80 voor set) voelt luxe en werkt better. Dat verschil voel je elke nacht.'),
      bold('Test je matras', '', '. Echt, ga naar een winkel, lig erop, 10 minuten minimum. Online reviews helpen, maar jouw rug bepaalt of een matras werkt.'),
      
      h2('Investeer in: verlichting'),
      p('Lighting maakt of breakt een interieur. Een mooie lamp kost €150-€400, maar het is wat je elke dag ziet én gebruikt.'),
      p('Goedkope lampen zijn false economy. Plastic kapjes, wankele constructies, lelijk licht. Investeer in een paar goede lampen – ze gaan decennia mee.'),
      quote('Licht is goedkoper dan meubels, maar heeft net zoveel impact.'),
      
      h2('Bespaar op: trendy items'),
      p('Dat fluffy bouclé krukje? Leuk nu, over 2 jaar is de trend voorbij. Koop goedkoop, geniet ervan, replace without guilt.'),
      bold('Trends mag je volgen', '', ', maar spend geen serious geld erop. H&M Home, IKEA, Zara Home – perfect voor trendy accessoires die je over een paar jaar toch wilt vervangen.'),
      
      h2('Bespaar op: decoratie'),
      p('Vazen, kaarsen, fotolijstjes, kleine objecten. Deze dingen maken je ruimte persoonlijk, maar ze hoeven niet duur te zijn.'),
      p('Winkels als Søstrene Grene, Action (yes, really), vintage winkels hebben mooie kleine items voor weinig geld. Mix één dure statement vaas met goedkope accenten – niemand ziet het verschil.'),
      
      h2('Tweedehands: waar het werkt'),
      p('Sommige items zijn better tweedehands. Ze zijn goedkoper én vaak betere kwaliteit dan nieuw budget meubels.'),
      bold('Perfect tweedehands', '', ': houten meubels (eettafels, kasten, dressoirs), vintage stoelen, verlichting, spiegels, keramiek.'),
      p('Waar te kopen: Marktplaats, Vinted (voor kleinere items), kringloop, vintage winkels. Facebook Marketplace. Estate sales.'),
      p('Check before buying: structurele soliditeit (wieble het?), vlekken/geuren in textiel, functionaliteit (laden openen smooth?). Kleine cosmetische damage is oké – dat kun je oplossen.'),
      quote('Tweedehands is niet een second choice – vaak is het een better choice.'),
      
      h2('Tweedehands: waar niet'),
      p('Matras (hygiene), banken met stoffering (tenzij je het opnieuw laat bekleden), goedkope IKEA meubels (zijn vaak kapot na 5 jaar gebruik).'),
      bold('Regel', '', ': tweedehands kopen moet quality zijn. Een 20 jaar oude massief eiken tafel is excellent. Een 5 jaar oude IKEA spaanplaat kast is afval.'),
      
      h2('DIY: waar het zin heeft'),
      p('Sommige dingen zijn makkelijk zelf te maken en besparen serious geld.'),
      p('Good DIY projects: planken (hout kopen + beugels), salontafel (planken + hairpin legs), headboard (multiplex + stof), verfwerk, styling. Basic, maar effectief.'),
      p('Bad DIY: structurele meubels (kasten, bedden), electrische installaties, complexe projecten waar vakmanschap required is. Als het fout gaat, betaal je dubbel.'),
      
      h2('Fasering: build over time'),
      p('Je hoeft niet alles nu te hebben. Phasing je aankopen spreads de kosten én geeft je tijd om juiste keuzes te maken.'),
      bold('Maand 1', '', ': essentials (bed, basis zitplek, tafel). Maand 2-3: comfort upgrades (goede bank, verlichting). Maand 4-6: opberging en functionaliteit. Maand 6-12: finishing touches en decoratie.'),
      p('Dit geeft je ook tijd om te leven in je ruimte, te ontdekken wat je echt nodig hebt, wat werkt, wat niet. Je maakt betere keuzes.'),
      
      h2('De 10-jaar regel'),
      quote('Als iets niet 10 jaar mee kan gaan, koop het niet – tenzij het een trend item is onder €50.'),
      p('Dure items moeten durable zijn. Goedkope items mogen disposable zijn. Maar niets in between – dat is waar je geld verspilt.'),
      p('Voorbeelden: €1200 leren bank (goes 15 jaar) = goed. €600 fabric bank (goes 8 jaar) = goed. €800 fake leer bank (goes 3 jaar) = bad investment.'),
      
      h2('Prioriteiten lijst maken'),
      bold('Stap 1', '', ': list wat je nodig hebt. Stap 2: categorize in essentieel, wenselijk, leuk-om-te-hebben. Stap 3: allocate budget naar essentials first.'),
      p('Essentials krijgen quality budget. Wenselijk krijgt mid-range budget. Leuk-om-te-hebben krijgt whatever is left, of komt later.'),
      p('Voorbeeld: essentials = bank, bed, verlichting (invest here). Wenselijk = eettafel, storage (good quality maar mag budget zijn). Leuk = decoratie, accessoires (cheap is fine).'),
    ],
  },
  {
    title: 'Vloeren kiezen: hout, tegel, vinyl of beton?',
    slug: 'vloeren',
    excerpt: 'Je vloer is fundamenteel. Verkeerde keuze zie je tien jaar lang. Dit moet je weten over hout, tegel, vinyl en beton.',
    category: 'Materialen',
    tags: ['vloeren', 'parket', 'tegels', 'vinyl', 'beton'],
    body: [
      p('Je vloer is letterlijk je fundament. Het is ook meestal je biggest investment in je interieur. En je kijkt er elke dag naar, voor jaren. Dus: deze beslissing verdient aandacht.'),
      bold('Hout, tegel, vinyl of beton', '', '? Elk heeft voor- en nadelen. Dit is wat je moet weten.'),
      
      h2('Houten parket: de klassieker'),
      p('Hout voelt warm, ziet er tijdloos uit, is te renoveren. Het is niet voor niets de most popular keuze.'),
      p('Voordelen: warme uitstraling, duurzaam (gaat 40+ jaar mee), herstelbaar (je kunt het schuren en oliën), verhoogt woningwaarde, voelt prettig onder je voeten.'),
      quote('Hout is een investering die zichzelf terugbetaalt – in plezier én in waarde.'),
      p('Nadelen: duur (€60-€150 per m²), gevoelig voor water (niet in badkamer), krast (vooral zachtere houtsoorten), needs maintenance (oliën/lakken elke 5-10 jaar).'),
      bold('Types hout', '', ': massief parket (dikker, vaker te renoveren), lamelparket (topla ag hout, goedkoper), visgraat (klassiek en mooi, wel duurder te leggen).'),
      
      h2('Tegels: praktisch en veelzijdig'),
      p('Tegels zijn onverwoestbaar, waterproof, makkelijk schoon. Perfect voor natte ruimtes en high-traffic areas.'),
      p('Voordelen: super durable, waterproof, easy cleaning, enorm veel keuze (van basic tot luxe), geschikt voor vloerverwarming.'),
      p('Nadelen: koud (letterlijk – tenzij je vloerverwarming hebt), hard (gevallen glas = broken), voelt minder warm dan hout, joints tussen tegels vangen vuil.'),
      bold('Types tegels', '', ': keramiek (goedkoop, praktisch), porselein (duurder, harder), natuursteen (marmer, travertijn – beautiful maar onderhoud needed), terrazzo (trendy, but pricey).'),
      
      h2('Vinyl en PVC: budget vriendelijk'),
      p('Modern vinyl is niet meer de cheap optie van vroeger. High-end LVT (luxury vinyl tiles) kan hout of steen zeer realistisch nabootsen.'),
      p('Voordelen: goedkoop (€20-€60 per m²), waterproof, warmer dan tegels, makkelijk te leggen (zelfs DIY), soft underfoot, low maintenance.'),
      quote('Vinyl is geen schaamte-optie meer – moderne kwaliteit is legit goed.'),
      p('Nadelen: niet echt (het blijft imitatie), kan verkleuren in zonlicht, niet te renoveren (damage = replace), minder duurzaam dan hout of tegel (15-20 jaar max).'),
      bold('Types vinyl', '', ': click-vinyl (makkelijk te leggen), plak-vinyl (permanenter), luxe LVT (dikker, realistischer), sheet vinyl (goedkoop, maar looks cheap).'),
      
      h2('Beton: industrieel en modern'),
      p('Beton is niet voor iedereen, maar goed gedaan is het stunning. Industrieel, minimalistisch, uniek.'),
      p('Voordelen: seamless (geen voegen), uniek (elke vloer is anders), modern look, durable, geschikt voor vloerverwarming, relatief easy maintenance.'),
      p('Nadelen: koud en hard, shows stains easily (needs sealing), kan scheuren, expensive (€80-€150 per m² gepolijst), lastig te repareren.'),
      bold('Types beton', '', ': gepolijst beton (glad en shiny), beton cire (dunne laag over bestaande vloer), industrieel (raw look), beton-look (vinyl of tegels die beton imiteren – cheaper alternatief).'),
      
      h2('Voor welke ruimte welke vloer?'),
      h3('Woonkamer en slaapkamer'),
      p('Best: hout (warm, comfortable). Alternatief: high-end vinyl (als budget beperkt is), tapijt in slaapkamer (extra warmth).'),
      
      h3('Keuken'),
      bold('Best: tegels', '', ' (waterproof, easy clean). Alternatief: vinyl (budget), geseald hout (als je de warmth wilt).'),
      
      h3('Badkamer'),
      p('Best: tegels (only logical choice voor natte ruimte). Alternatief: vinyl (als budget zeer beperkt is en proper waterproofing is done).'),
      
      h3('Hal en trappen'),
      p('Best: hout of tegels (high traffic = needs durability). Alternatief: high-quality vinyl.'),
      
      h2('Combi-vloeren: one type doorleggen'),
      p('Biggest tip: leg dezelfde vloer door in meerdere ruimtes. Het maakt je huis groter en rustiger.'),
      quote('Eén vloertype door heel je huis = visuele rust en perceived space.'),
      bold('Uitzondering', '', ': natte ruimtes (badkamer, toilets) mogen anders. Maar woonkamer-keuken-hal-slaapkamers het liefst hetzelfde.'),
      
      h2('Budget allocatie'),
      p('Vloeren are expensive, maar you get what you pay for. Te goedkoop = je ziet het en je betreuert het.'),
      p('Minimum investering: €40-50 per m² (vinyl, basic tegels). Mid-range: €60-90 per m² (good vinyl, decent hout, nice tegels). High-end: €100-150+ per m² (massief parket, natural stone, polished beton).'),
      bold('Don\'t forget', '', ': leggen kost ook. DIY kan bij vinyl, but hout en tegels better door professional (€15-30 per m² extra).'),
      
      h2('Maken van de keuze'),
      p('Stap 1: bepaal budget (realistisch). Stap 2: determine priorities (looks vs durability vs budget). Stap 3: kijk naar samples in je eigen ruimte (bij jouw licht). Stap 4: feel it (loop erop, raak het aan).'),
      p('Samples are gratis of goedkoop – order ze. Leg ze op je huidige vloer, kijk er een week naar. Bij daglicht en kunstlicht. Hoe voelt het? Past het bij je meubels?'),
      quote('Je vloer bepaalt 50% van hoe je ruimte voelt – neem de tijd voor deze keuze.'),
    ],
  },
];

async function createArticles() {
  console.log('Creating last 3 articles...\n');
  
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
  
  console.log(`\nAll done! Created final 3 articles. Total: 14 articles complete.`);
}

createArticles().catch(console.error);
