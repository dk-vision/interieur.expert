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

const h3 = (text: string) => ({
  _type: "block",
  _key: `h3-${Math.random().toString(36).substr(2, 9)}`,
  style: "h3", 
  children: [{ _type: "span", text, marks: [] }],
});

const articles: Record<string, any[]> = {
  "warm-minimalisme": [
    p("Warm minimalisme is dé interieurtrend die laat zien dat minder écht meer kan zijn – zonder dat het kil of onpersoonlijk aanvoelt. In tegenstelling tot het strakke, koude minimalisme van de jaren 2000, draait warm minimalisme om het creëren van rust en ruimte met natuurlijke materialen en zachte tinten. Het is een stijl die perfect past bij de moderne behoefte aan onthaasting en een opgeruimd hoofd, maar dan wel in een omgeving die je uitnodigt om te blijven."),
    h2("De essentie: rust zonder kaalheid"),
    p("Het geheim van warm minimalisme ligt in het balanceren tussen leeg en levendig. Waar klassiek minimalisme draait om 'niets teveel', kiest warm minimalisme bewust voor natuurlijke elementen die warmte toevoegen: verweerd hout, zachte textiel, aardse kleurtonen. Je houdt het aantal objecten beperkt, maar elk stuk dat je kiest heeft betekenis en karakter. Denk aan een handgemaakt aardewerken vaas, een vintage houten kruk, of een wollen plaid. Deze items maken het verschil tussen een showroom en een thuis."),
    h2("Materialen die het verschil maken"),
    p("De materialenkeuze is cruciaal in warm minimalisme. Kies voor natuurlijke materialen die ouder worden met gratie: massief eiken of walnoot voor meubels, linnen voor textiel, klei voor decoratie. Deze materialen hebben textuur en diepte, wat voorkomt dat het interieur plat of eendimensionaal wordt. Een betonnen vloer wordt warmer met een handgeweven wollen kleed. Een witte muur krijgt karakter door de natuurlijke textuur van kalkverf."),
  ],

  "verlichting-in-lagen": [
    p("Goede verlichting is vaak het meest onderschatte element in interieur. Te veel mensen vertrouwen op één centrale hanglamp per ruimte, maar dat is niet hoe je een functionele én sfeervolle ruimte creëert. De geheime formule? Verlichting in lagen: algemene verlichting voor overzicht, taakverlichting voor specifieke activiteiten, en accentverlichting om sfeer te creëren. Deze combinatie zorgt ervoor dat je ruimte altijd precies de juiste lichtstemming heeft."),
    h2("Laag 1: Algemene verlichting"),
    p("Dit is je basislaag – de verlichting die zorgt dat je veilig door de ruimte kunt bewegen. Denk aan plafondspots, een centrale hanglamp, of ingebouwde LED-strips. Het doel is de hele ruimte gelijkmatig te verlichten zonder harde contrasten. In een woonkamer kan dit betekenen: een dimbare plafondlamp of meerdere spots die samen de ruimte bedekken. Algemene verlichting moet dimbaar zijn, anders zit je altijd op kantoorlicht-niveau en dat wil je 's avonds écht niet."),
    h2("Laag 2: Taakverlichting"),
    p("Taakverlichting is gericht licht voor specifieke activiteiten: een leeslamp naast de bank, werkverlichting boven het keukenblad, een bureaulamp op je werkplek. Deze laag is essentieel voor functionaliteit – je ogen vermoeien veel sneller als je probeert te lezen in algemeen licht dat niet sterk genoeg is. Bij taakverlichting wil je hogere lichtsterkte, maar dan wel precies waar je het nodig hebt."),
  ],

  "je-eerste-woning-inrichten": [
    p("Je eerste eigen woning inrichten is overweldigend en opwindend tegelijk. Eindelijk alle ruimte voor jezelf, maar ook: oneindig veel keuzes en een budget dat waarschijnlijk beperkter is dan je ambities. Geen paniek. De beste interieurs groeien organisch en worden niet in één weekend gecreëerd. Start slim, investeer verstandig, en bouw langzaam op."),
    h2("Begin bij de basis: wat heb je écht nodig"),
    p("Voor je naar de eerste meubelwinkel gaat: maak een lijst van absolute essentials per ruimte. Slaapkamer: bed, matras, beddengoed. Woonkamer: zitplek, salontafel, verlichting. Keuken: tafel, stoelen, basis kookspullen. Dit klinkt saai, maar het voorkomt dat je geld uitgeeft aan leuke-maar-niet-essentiële dingen terwijl je nog steeds geen fatsoentelijk bed hebt."),
    h2("Smart investeren"),
    p("Bepaalde items zijn het waard om in te investeren, andere niet. Investeer in: een goede matras, een degelijke bank, en solide basismeubels zoals een eettafel. Bespaar op decoratie, kussens, planten – dit zijn dingen die je makkelijk kunt upgraden als je budget groeit. Tweedehands is je vriend: vintage dressoirs en oude eikenhouten tafels zijn vaak beter én goedkoper dan nieuwe IKEA-meubels. Check Marktplaats en kringloopwinkels."),
  ],
  
  "interieurtrends-2026": [
    p("Elk jaar nieuwe trends, maar wat blijft en wat verdwijnt? Voor 2026 zien we een verschuiving: weg van de Instagram-perfectie en terug naar interieur met karakter. De trends die blijven zijn degene die authentiek en tijdloos zijn. De trends die verdwijnen zijn degene die té specifiek of gekunsteld waren. Laten we eerlijk zijn: sommige 'trends' waren eigenlijk nooit mooi, ze waren alleen populair."),
    h2("Blijft: Natuurlijke materialen"),
    p("De liefde voor natuurlijke materialen zoals hout, linnen, rotan en klei blijft groeien – en terecht. Deze materialen worden mooier met de jaren en passen in vrijwel elke stijl. Het aardse kleurpalet (terracotta, oker, zandtinten) blijft dominant omdat het rustgevend werkt. Dit is geen trend, dit is een terugkeer naar tijdloosheid. Investeer nu in massief houten meubels en kwalitatief linnen textiel."),
    h2("Verdwijnt: Overdadige boho"),
    p("Boho is niet dood, maar de over-the-top versie met laag na laag gedrapeerd textiel en macramé aan elke muur? Die tijd is voorbij. Wat blijft is boho light: natuurlijke materialen en warme tinten, maar met meer rust en ruimte. Ook het wilde mixen van patterns is voorbij zijn hoogtepunt. Wat nu werkt: één statement patroon per ruimte, gecombineerd met effen kleuren."),
  ],
  
  "japandi": [
    p("Japandi combineert de functionaliteit van Scandinavisch design met de sereniteit van Japanse esthetiek. Het resultaat? Een interieurstijl die rustig, opgeruimd en warm aanvoelt. Japandi draait om kwaliteit boven kwantiteit, natuurlijke materialen, en het creëren van ruimte om te ademen. Het is minimalisme, maar dan met ziel. Voor wie houdt van rust zonder kaalheid, is dit de perfecte stijl."),
    h2("De basis: minder is meer"),
    p("Japandi vraagt om discipline. Elk object in je ruimte moet zijn plek verdienen – functioneel of mooi, liefst beide. Dit betekent niet dat je ruimte leeg moet zijn, maar wel dat elk meubel, elke decoratie bewust gekozen is. Denk aan: een solide houten eettafel, een comfortabele maar strakke bank, handgemaakte keramiek. Niets mag er zomaar staan; alles heeft een reden."),
    h2("Kleurpalet: aards en rustig"),
    p("Het kleurenpalet van Japandi is gebaseerd op natuur: zandtinten, warm grijs, zachte beiges, en zwart voor contrast. Deze kleuren creëren een rustgevende basis waar je niet op uitgekeken raakt. Japandi gebruikt geen felle kleuren of drukke patronen – de schoonheid zit in de subtiliteit en de textuur van materialen. Denk aan een beige linnen bank tegen een lichtgrijze muur, met zwarte accenten in metaal of hout."),
  ],
  
  "natuurlijke-materialen": [
    p("Natuurlijke materialen brengen warmte, textuur en tijdloosheid in je interieur. In een wereld van plastic en mass-productie is er een verlangen naar dingen die echt zijn: hout dat je kunt voelen, linnen dat ademend is, klei met een onregelmatige textuur. Deze materialen worden mooier met de tijd, vertellen verhalen, en maken je interieur menselijker. Het is investeren in kwaliteit die generaties meegaat."),
    h2("Hout: het fundament"),
    p("Massief hout is de basis van een naturlijk interieur. Het voelt warm, het ruikt goed, en elk stuk is uniek door de nerven en kleurvariaties. Kies voor lokale houtsoorten zoals eiken of beuken voor duurzaamheid. Laat het hout onbehandeld of behandel het met natuurlijke olie – zo blijft de textuur voelbaar en blijft het hout ademen. Een solide houten tafel of kast is een investering die je leven lang meegaat."),
    h2("Linnen en katoen: textiel met karakter"),
    p("Natuurlijk textiel zoals linnen en katoen voelt anders dan synthetische stoffen – zachter, ademender, prettiger tegen je huid. Linnen is perfect voor gordijnen, beddengoed en bankkussens. Het kreukelt mooi en wordt zachter bij elke was. Ongebleekt katoen heeft een warme off-white kleur die knusser aanvoelt dan stralend wit. Deze materialen zijn niet alleen fijner om aan te raken, ze zijn ook beter voor het milieu."),
  ],
  
  "kleine-ruimtes-groter": [
    p("Een kleine ruimte hoeft niet krap aan te voelen. Met de juiste trucs kun je visueel ruimte creëren en ervoor zorgen dat je woning groter lijkt dan hij is. Het gaat niet om liegen met spiegels en witte muren alleen – het gaat om slim gebruik van kleur, licht, en meubels. Hier zijn de trucs die écht werken, plus wat je beter kunt laten."),
    h2("Licht: het geheim van ruimte"),
    p("Niets maakt een ruimte groter dan natuurlijk licht. Houd ramen vrij van zware gordijnen – gebruik sheer vitrage of helemaal niets als privacy het toelaat. Kies lichte vloeren en muren die licht reflecteren in plaats van absorberen. Donkere kleuren kunnen mooi zijn, maar in kleine ruimtes maken ze de ruimte optisch kleiner. Voeg meerdere lichtbronnen toe: een plafondlamp, een staande lamp, tafellampen. Hoe meer licht, hoe ruimtelijker het voelt."),
    h2("Meubels: minder en slimmer"),
    p("In een kleine ruimte is elk meubel belangrijk. Kies compact, maar niet te klein – minuscule meubeltjes maken de ruimte juist kleiner. Beter: normale meubelstukken, maar minder ervan. Een goede bank en een salontafel kunnen genoeg zijn. Kies meubels op pootjes in plaats van massieve blokken die op de grond rusten – dat creëert lucht en licht onder de meubels, wat ruimte suggereert."),
  ],
  
  "vloeren-vergelijken": [
    p("De keuze voor een vloer bepaalt voor een groot deel hoe je interieur aanvoelt. Het is letterlijk de basis van je ruimte. Maar welke vloer past bij jou? Hout, tegel, vinyl, beton – ze hebben allemaal voor- en nadelen. Laten we ze vergelijken op esthetiek, onderhoud, duurzaamheid en prijs, zodat je een geïnformeerde keuze kunt maken."),
    h2("Houten vloer: warm en tijdloos"),
    p("Een houten vloer is de klassieker: warm, natuurlijk, en wordt mooier met de jaren. Massief hout is duurzaam en kan meerdere keren geschuurd worden, maar is duurder. Lamelparket is betaalbaarder maar kan maar enkele keren geschuurd worden. Onderhoud: regelmatig dweilen met een vochtige doek, af en toe olieën. Nadeel: gevoelig voor vocht (dus niet ideaal voor badkamers) en kan krassen bij intensief gebruik. Prijs: €40-€150 per m² afhankelijk van houtsoort en kwaliteit."),
    h2("Tegelvloer: praktisch en veelzijdig"),
    p("Tegels zijn praktisch: waterbestendig, makkelijk schoon te maken, en verkrijgbaar in oneindig veel stijlen. Van Marrokaanse patronen tot strak beton-look. Ideaal voor badkamers, keukens en entrees. Nadeel: tegels voelen koud aan (maar dat los je op met vloerverwarming) en zijn hard, wat vermoeiend kan zijn als je er lang op staat. Prijs: €20-€100 per m², exclusief leggen."),
  ],
  
  "neutrale-kleuren": [
    p("Neutrale kleuren zijn de basis van tijdloos interieur, maar dat betekent niet dat ze saai moeten zijn. De kunst is om verschillende neutrale tinten slim te combineren, zodat je een rijk, gelaagd interieur krijgt zonder dat het kleurloos wordt. Vergeet het idee dat neutraal alleen wit en grijs betekent – er is een heel spectrum aan zandtinten, beiges, taupes en warme grijzen te ontdekken."),
    h2("Meer dan grijs en beige"),
    p("Neutrale kleuren omvatten veel meer dan alleen grijs en beige. Denk aan: warm zand, rokerig taupe, zachte greige (grijs-beige), olijfgroen-grijs, en warme off-whites. Deze tinten hebben allemaal een subtiele ondertoon – sommige neigen naar roze, andere naar groen of geel. De truc is om tinten met een vergelijkbare ondertoon te kiezen, zodat ze harmonisch samenwerken. Test verfstalen altijd in je eigen ruimte, want licht verandert hoe kleuren eruit zien."),
    h2("Textuur is key"),
    p("Als je met neutrale kleuren werkt, wordt textuur extra belangrijk. Het verschil tussen een saai en een interessant neutraal interieur zit hem in de variatie van materialen: een ruwe linnen bank, een gladde marmeren tafel, een wollig kleed, een strak stalen lamp. Deze verschillende texturen vangen licht op verschillende manieren en creëren diepte zonder dat je kleur nodig hebt. Mix mat en glans, ruw en glad, zwaar en licht."),
  ],
  
  "kleurpsychologie": [
    p("Kleur doet meer dan je ruimte mooi maken – het beïnvloedt direct hoe je je voelt. Wetenschappelijk bewezen is dat bepaalde kleuren je hartslag kunnen verlagen, andere je energie kunnen geven. Dit is geen new-age onzin, maar kleurpsychologie: hoe kleuren onze emoties en gedrag beïnvloeden. Slim gebruik van kleur kan je huis niet alleen mooier, maar ook prettiger maken om in te zijn."),
    h2("Blauw: rust en focus"),
    p("Blauw verlaagt de hartslag en bevordert concentratie. Het is de ideale kleur voor slaapkamers en werkplekken. Lichtblauw voelt fris en kalm, donkerblauw (navy) voelt stabiel en vertrouwenswekend. Vermijd té felle blauwtinten in slaapkamers – die werken te activerend. Kies gedempte, stoffige blauwtinten voor een rustgevende uitwerking. Nadeel van blauw: het kan kil aanvoelen, dus balanceer met warme accenten in hout of textiel."),
    h2("Groen: balans en natuur"),
    p("Groen staat voor groei, natuur en balans. Het is de kleur die het minst vermoeiend is voor de ogen, waardoor het perfect is voor vrijwel elke ruimte. Olijfgroen voelt volwassen en rustig, mintgroen fris en licht, donkergroen luxe en geborgen. Groen combineert makkelijk met andere kleuren en brengt letterlijk leven in je interieur. Het mooie: je kunt groen ook toevoegen via planten in plaats van verf."),
  ],
  
  "budget-slim-investeren": [
    p("Een mooi interieur hoeft niet duur te zijn, maar het vraagt wel om slimme keuzes. Als je budget beperkt is, moet je strategisch zijn over waar je wél veel uitgeeft en waar je kunt besparen. De truc? Investeer in tijdloze basics die lang meegaan, en bespaar op dingen die je makkelijk kunt vervangen. Zo bouw je stap voor stap een interieur op dat er duur uitziet, zonder je blauw te betalen."),
    h2("Investeer in: meubels die je dagelijks gebruikt"),
    p("Een goede matras, een solide bank, een degelijke eettafel – dit zijn de meubels waar je dagelijks tijd op doorbrengt. Hier wil je kwaliteit, want goedkoop is vaak duurkoop. Een kwalitatieve bank gaat twintig jaar mee en blijft comfortabel, terwijl een goedkope bank na vijf jaar doorzakt. Check tweedehands: vintage meubels zijn vaak beter en goedkoper dan nieuw. Een degelijke oude eikenhouten tafel kost op Marktplaats een fractie van een nieuwe én is mooier."),
    h2("Bespaar op: decoratie en accessoires"),
    p("Kussens, vazen, kaarsen, fotolijsten – dit zijn dingen die je makkelijk en goedkoop kunt kopen en wisselen. Hier hoef je niet te investeren in dure designstukken. Check HEMA, Søstrene Grene, of tweedehandswinkels voor betaalbare decoratie die er prima uitziet. Het mooie aan accessoires is dat je ze kunt veranderen als je smaak evolueert, zonder dat het veel kost. Investeer je geld liever in een goede bank dan in dure kussens erop."),
  ],
  
  "coastal-interieur": [
    p("Coastal interieur is meer dan schelpen en maritieme strepen. Het gaat om licht, ruimte en een ontspannen sfeer die je doet denken aan vakantie bij de zee. Geen thema-park, maar de essentie van kustleven: natuurlijke materialen, gedempte kleuren, en een bries van ongedwongenheid. Het mooie is dat deze stijl overal werkt – je hoeft niet aan zee te wonen om die relaxte coastal vibe te creëren."),
    h2("Kleuren: zacht en natuurlijk"),
    p("Het kleurenpalet van coastal is geïnspireerd op strand en zee: wit, zand, blauw en grijs. Maar geen felle kleuren – denk aan gedempte, verweerde tinten. Denim blauw in plaats van fel marine blauw. Zandbeige in plaats van stralend wit. Leisteen grijs in plaats van zwart. Deze zachte kleuren reflecteren licht mooi en creëren een rustige, luchtige sfeer. Voeg groen toe via planten voor een frisse touch, maar hou het subtiel."),
    h2("Materialen: natuurlijk en verweerd"),
    p("Coastal draait om materialen die je associeert met de kust: verweerd hout, linnen, rotan, steen. Kies voor houten meubels met een weathered look – alsof ze jaren aan de kust hebben gestaan. Linnen gordijnen die zacht wapperen. Rieten manden voor opslag. Deze materialen voelen ontspannen en organisch, niet strak of gelikt. Het gaat om die relaxte sfeer waar niets té perfect hoeft te zijn."),
  ],
  
  "industrieel-interieur": [
    p("Industrieel interieur heeft een imagoprobleem: te koud, te hard, te mannelijk. Onterecht. Goed gedaan combineert industrial karakter met warmte. Rauwe materialen zoals beton en staal krijgen gezelschap van zacht textiel en warm hout. Het is stoer zonder onpersoonlijk te zijn, en die balans maakt het interessant. Industrial werkt vooral goed in lofts en open ruimtes, maar ook in gewone woningen kun je elementen toevoegen."),
    h2("De basis: raw materials"),
    p("Industrial draait om materialen die je normaal verstopt: beton, staal, baksteen, onbehandeld hout. Deze raw materialen worden juist getoond en gevierd. Betonnen muren of vloeren vormen een stoere basis, gecombineerd met stalen kozijnen en metalen industriële lampen. Oud baksteen geeft karakter en textuur. Deze materialen zijn eerlijk en echt – geen imitatie, geen makeup. Maar om te voorkomen dat het kil wordt, voeg je warmte toe via hout en textiel."),
    h2("Balans: hard en zacht combineren"),
    p("De kunst van industrial is het balanceren van hard en zacht. Een betonnen vloer met een groot wollig kleed. Een stalen stellingkast met houten planken. Strakke metalen lampen boven een grote houten eettafel. Cognac leren stoelen voor warmte. Deze combinatie van ruw en zacht maakt industrial leefbaar en uitnodigend in plaats van showroom-koud. Vergeet ook planten niet – ze verzachten de harde lijnen en brengen leven in de ruimte."),
  ],
};

async function batchRewrite() {
  console.log("Starting batch rewrite of 13 articles...\n");
  
  let success = 0;
  let failed = 0;
  
  for (const [slug, body] of Object.entries(articles)) {
    try {
      console.log(`Processing: ${slug}`);
      
      const article = await client.fetch(
        `*[_type == "article" && slug.current == $slug][0]`,
        { slug }
      );
      
      if (!article) {
        console.log(`❌ Article not found: ${slug}\n`);
        failed++;
        continue;
      }
      
      await client.patch(article._id).set({ body }).commit();
      
      console.log(`✅ Updated: ${article.title}\n`);
      success++;
      
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
      failed++;
    }
  }
  
  console.log("================");
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log("================");
}

batchRewrite();
