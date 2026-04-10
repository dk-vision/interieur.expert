import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const envFile = readFileSync(".env.local", "utf-8");
const token = envFile.match(/SANITY_API_TOKEN="([^"]+)"/)?.[1];
if (!token) throw new Error("No Sanity token found");

const ARTICLE_ID = "4918863a-1ca5-4f21-8e55-7ee302d167eb";

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function block(
  text: string,
  style: string = "normal",
  marks: string[] = []
): any {
  return {
    _key: key(),
    _type: "block",
    children: [{ _key: key(), _type: "span", marks, text }],
    markDefs: [],
    style,
  };
}

function richBlock(
  children: { text: string; marks?: string[] }[],
  style: string = "normal"
): any {
  return {
    _key: key(),
    _type: "block",
    children: children.map((c) => ({
      _key: key(),
      _type: "span",
      marks: c.marks || [],
      text: c.text,
    })),
    markDefs: [],
    style,
  };
}

function bullet(text: string): any {
  return {
    _key: key(),
    _type: "block",
    children: [{ _key: key(), _type: "span", marks: [], text }],
    level: 1,
    listItem: "bullet",
    markDefs: [],
    style: "normal",
  };
}

function rawHtml(code: string): any {
  return { _key: key(), _type: "rawHtml", code };
}

const body = [
  // ── INTRO ──
  richBlock([
    { text: "Een eettafel gaat jaren mee — op voorwaarde dat je ze " },
    { text: "correct onderhoudt", marks: ["strong"] },
    {
      text: ". Het juiste onderhoud voorkomt vlekken, slijtage en blijvende schade. Toch merken we dat veel mensen het onderhoud van hun tafel uitstellen of — erger nog — de verkeerde producten gebruiken.",
    },
  ]),
  block(
    "Wat veel mensen onderschatten: elk materiaal vraagt een andere aanpak. Wat goed werkt voor keramiek, kan net schadelijk zijn voor hout. Een eenvoudige allesreiniger uit de supermarkt kan op het ene oppervlak prima functioneren en op het andere onherstelbare schade aanrichten. Daarom loont het om even stil te staan bij wat je tafel echt nodig heeft."
  ),
  richBlock([
    { text: "Belangrijk: ", marks: ["strong"] },
    {
      text: "verkeerd onderhoud is een van de belangrijkste oorzaken van vroegtijdige schade aan eettafels. Met de juiste kennis kun je dat eenvoudig voorkomen.",
    },
  ], "blockquote"),

  // ── OVERZICHT ──
  block("Overzicht: onderhoud per materiaal", "h2"),
  block(
    "Voordat we elk materiaal in detail bespreken, geven we je een handig overzicht. In onderstaande tabel zie je per materiaal wat het dagelijkse onderhoud inhoudt, wat je beter vermijdt en of er extra periodiek onderhoud nodig is."
  ),
  rawHtml(
    '<table><tbody><tr><th>Materiaal</th><th>Dagelijks onderhoud</th><th>Wat vermijden?</th><th>Extra onderhoud</th></tr><tr><td>Massief hout</td><td>Droge of licht vochtige doek</td><td>Stilstaand water, agressieve producten</td><td>Olie of vernis (periodiek)</td></tr><tr><td>Keramiek</td><td>Vochtige doek</td><td>Schurende producten</td><td>Nauwelijks nodig</td></tr><tr><td>Fineer</td><td>Licht vochtige doek</td><td>Te nat reinigen</td><td>Beperkt</td></tr><tr><td>Glas</td><td>Glasreiniger</td><td>Schurende doeken</td><td>Regelmatig reinigen</td></tr><tr><td>Laminaat</td><td>Vochtige doek</td><td>Overmatig water</td><td>Minimaal</td></tr></tbody></table>'
  ),

  // ── MASSIEF HOUT ──
  block("Massief hout onderhouden", "h2"),
  block(
    "Massief hout is een levend materiaal dat reageert op vocht, temperatuur en licht. Dat maakt het zo mooi — het vertelt een verhaal — maar het vraagt ook aandacht. Met correct onderhoud behoud je niet alleen de beschermende laag, maar ook de warme uitstraling die hout zo geliefd maakt."
  ),
  block("Dagelijks onderhoud", "h3"),
  bullet(
    "Neem het tafelblad na elke maaltijd af met een droge of licht vochtige doek. Gebruik liefst een zachte katoenen of microvezeldoek die geen pluizen achterlaat."
  ),
  bullet(
    "Verwijder gemorste vloeistoffen meteen. Hoe langer vocht op het blad blijft staan, hoe groter de kans op vlekken die intrekken in de houtnerf."
  ),
  block("Wat absoluut vermijden", "h3"),
  bullet(
    "Stilstaand water op het oppervlak — zelfs een vergeten onderzetter met condenswater kan een vlek achterlaten die er lastig uit gaat."
  ),
  bullet(
    "Agressieve schoonmaakmiddelen zoals bleekwater, ammoniak of allesreinigers. Die tasten de beschermende olie- of vernislaag aan en maken het hout kwetsbaar."
  ),
  bullet(
    "Schurende sponzen of microvezeldoeken met een ruwe kant. Die veroorzaken haast onzichtbare krasjes die na verloop van tijd een dof oppervlak geven."
  ),
  block("Periodiek onderhoud", "h3"),
  block(
    "Afhankelijk van de afwerking — olie of vernis — moet je de tafel periodiek opnieuw behandelen. Olie dringt in het hout en beschermt van binnenuit; je brengt ze opnieuw aan met een zachte doek, doorgaans twee tot vier keer per jaar. Vernis vormt een beschermende laag bovenop het hout en hoeft minder vaak vernieuwd te worden, maar als de laag beschadigd raakt, is een grondiger herstel nodig. Controleer regelmatig of water nog afparelt op het blad: zodra het intrekken vertoont, is het tijd voor een nieuwe behandeling."
  ),

  // ── KERAMIEK ──
  block("Keramiek onderhouden", "h2"),
  block(
    "Keramiek is een van de meest onderhoudsvriendelijke materialen voor eettafels. Het is krasbestendig, hittebestendig en vlekken krijgen nauwelijks vat op het oppervlak. Ideaal voor wie dagelijks intensief kookt en een gezin met kinderen heeft."
  ),
  block("Dagelijks onderhoud", "h3"),
  bullet(
    "Neem het blad af met een gewone vochtige doek. In de meeste gevallen is dat ruim voldoende om etensresten en vingerafdrukken te verwijderen."
  ),
  bullet(
    "Bij hardnekkigere vlekken kun je gerust een mild schoonmaakmiddel gebruiken. Keramiek is bestand tegen de meeste huishoudelijke producten, maar overdrijf niet."
  ),
  block("Wat vermijden", "h3"),
  bullet(
    "Schurende producten of schuursponsjes. Hoewel keramiek zelf krasbestendig is, kan de afwerkingslaag of coating van de fabrikant wél gevoelig zijn voor abrasie."
  ),
  block(
    "Hoewel keramiek als materiaal bijzonder sterk is, kan de afwerking of onderstructuur per fabrikant sterk verschillen. Sommige keramische bladen hebben een matte coating die met verkeerde producten dof kan worden. Raadpleeg bij twijfel altijd de onderhoudstips van de fabrikant of vraag ernaar bij je interieurzaak."
  ),

  // ── FINEER ──
  block("Fineer onderhouden", "h2"),
  block(
    "Fineer combineert een dunne houten toplaag met een stabiele onderstructuur, meestal van MDF of multiplex. Je krijgt daardoor de warme uitstraling van hout, maar het materiaal is gevoeliger voor schade dan massief hout. De toplaag is immers slechts enkele millimeters dik, waardoor diepe krassen of intensief schuren het fineer onherstelbaar beschadigen."
  ),
  block("Dagelijks onderhoud", "h3"),
  bullet(
    "Gebruik een licht vochtige doek en droog het blad daarna meteen af. Waterdruppels die lang blijven staan, kunnen de randen of naden van het fineer aantasten."
  ),
  bullet(
    "Vermijd het schuiven van borden of voorwerpen over het oppervlak — gebruik altijd placemats of onderzetters om krasvorming te beperken."
  ),
  block("Wat vermijden", "h3"),
  bullet(
    "Overmatig vocht, vooral bij de randen en naden. Water dat in de naden dringt, kan de onderlaag doen opzwellen en het fineer doen loskomen."
  ),
  bullet(
    "Scherpe of ruwe voorwerpen die krassen in de dunne toplaag. In tegenstelling tot massief hout kun je fineer niet zomaar opnieuw opschuren en behandelen."
  ),

  // ── GLAS ──
  block("Glas onderhouden", "h2"),
  block(
    "Glas is eenvoudig te reinigen, maar vraagt wel frequenter onderhoud dan andere materialen. Vingerafdrukken, waterkringen en stof zijn op een glasblad meteen zichtbaar. Het goede nieuws: met de juiste techniek heb je in een halve minuut weer een smetteloos blad."
  ),
  block("Dagelijks onderhoud", "h3"),
  bullet(
    "Reinig het blad met een goede glasreiniger en een zachte, pluisvrije doek. Spuit de reiniger liefst op de doek in plaats van rechtstreeks op het glas, zo vermijd je strepen."
  ),
  bullet(
    "Droog het blad altijd af in dezelfde richting. Cirkelvormige bewegingen zorgen voor meer zichtbare strepen dan rechte, evenwijdige halen."
  ),
  block("Wat vermijden", "h3"),
  bullet(
    "Schurende materialen of een droog doekje met stofdeeltjes. Kleine zandkorrels of vuil die je over het glas wrijft, veroorzaken onherstelbare microkrassen."
  ),
  bullet(
    "Droog vuil wegvegen zonder eerst vochtig te reinigen. Die korrels fungeren als schuurpapier en maken het oppervlak na verloop van tijd dof en mat."
  ),

  // ── LAMINAAT ──
  block("Laminaat en MDF onderhouden", "h2"),
  block(
    "Tafels in laminaat of MDF zijn ontworpen voor dagelijks gebruiksgemak. Ze zijn vlekbestendig, betaalbaar en vragen minimale aandacht. Toch zijn er een paar aandachtspunten om de levensduur te maximaliseren."
  ),
  block("Dagelijks onderhoud", "h3"),
  bullet(
    "Een vochtige doek volstaat voor de dagelijkse reiniging. Bij hardnekkige vlekken kun je een mild afwasmiddel verdund in water gebruiken."
  ),
  bullet(
    "Droog het blad na het reinigen altijd even af, vooral in de buurt van naden en randen waar vocht kan binnendringen."
  ),
  block("Wat vermijden", "h3"),
  bullet(
    "Overmatig water, vooral bij de naden. Laminaat en MDF zijn niet waterbestendig aan de kern: zodra vocht in de naden dringt, zwelt het materiaal op en vervormt het onherstelbaar."
  ),

  // ── VEELGEMAAKTE FOUTEN ──
  block("Veelgemaakte fouten", "h2"),
  block(
    "We zien in de praktijk steeds dezelfde fouten terugkomen. Hieronder de meest voorkomende — en hoe je ze eenvoudig voorkomt."
  ),
  bullet(
    "Verkeerde producten gebruiken. Een agressieve allesreiniger of schuurmiddel lijkt efficiënt, maar richt op termijn meer schade aan dan het vuil dat je probeert te verwijderen."
  ),
  bullet(
    "Vlekken te lang laten liggen. Hoe sneller je een vlek behandelt, hoe kleiner de kans dat ze permanent intrekt. Bij hout en fineer telt elke minuut."
  ),
  bullet(
    "Geen bescherming gebruiken bij hout. Onderzetters, placemats en tafellopers zijn niet alleen decoratief — ze beschermen je blad tegen hitte, krassen en vochtkringen."
  ),
  bullet(
    "Schurende materialen gebruiken. Een ruwe spons of een oude vaatdoek met vuil erin is een recept voor microkrassen. Gebruik altijd een schone, zachte doek."
  ),
  richBlock([
    { text: "Praktische tip: ", marks: ["strong"] },
    {
      text: "leg altijd onderzetters en placemats klaar, ook als je gasten krijgt. De meeste schade aan eettafels ontstaat tijdens etentjes, wanneer hete pannen, glazen en bestek vrij op het blad staan.",
    },
  ], "blockquote"),

  // ── MATERIAALKEUZE ──
  block("Onderhoud combineren met materiaalkeuze", "h2"),
  block(
    "Goed onderhoud begint niet bij het poetsen, maar bij het kiezen van het juiste materiaal. Wie zo weinig mogelijk onderhoud wil, kiest best voor keramiek of laminaat. Wie kiest voor de warmte en authenticiteit van hout, kiest ook voor het onderhoud dat daarbij hoort — en dat hoeft helemaal niet ingewikkeld te zijn, zolang je het consequent doet."
  ),
  block(
    "Lees ook ons uitgebreide artikel over welk materiaal het best bij je levensstijl en gezinssituatie past."
  ),

  // ── CONCLUSIE ──
  block("Conclusie", "h2"),
  richBlock([
    {
      text: "Goed onderhoud verlengt niet alleen de levensduur van je tafel, maar ",
    },
    { text: "behoudt ook de uitstraling", marks: ["strong"] },
    {
      text: " die je bij aankoop zo mooi vond. Het hoeft niet ingewikkeld te zijn: stem je routine af op het materiaal, de afwerking en de intensiteit van dagelijks gebruik. Met een paar minuten aandacht per week blijft je eettafel jarenlang de centrale, mooie plek in huis die het verdient te zijn.",
    },
  ]),
];

async function run() {
  console.log(`Patching article ${ARTICLE_ID} with expanded body (${body.length} blocks)...`);

  const res = await fetch(
    `https://uf111z1c.api.sanity.io/v2024-01-01/data/mutate/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: ARTICLE_ID,
              set: { body },
            },
          },
        ],
      }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    console.error("Failed:", JSON.stringify(data, null, 2));
    process.exit(1);
  }
  console.log("Success:", JSON.stringify(data));
}

run();
