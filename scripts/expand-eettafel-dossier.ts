import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const envFile = readFileSync(".env.local", "utf-8");
const token = envFile.match(/SANITY_API_TOKEN="([^"]+)"/)?.[1];
if (!token) throw new Error("No Sanity token found");

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function block(text: string, style = "normal"): any {
  return {
    _key: key(), _type: "block",
    children: [{ _key: key(), _type: "span", marks: [], text }],
    markDefs: [], style,
  };
}

function richBlock(children: { text: string; marks?: string[]; markKey?: string }[], style = "normal", markDefs: any[] = []): any {
  return {
    _key: key(), _type: "block",
    children: children.map((c) => ({
      _key: key(), _type: "span", marks: c.marks || (c.markKey ? [c.markKey] : []), text: c.text,
    })),
    markDefs, style,
  };
}

function bullet(text: string): any {
  return {
    _key: key(), _type: "block",
    children: [{ _key: key(), _type: "span", marks: [], text }],
    level: 1, listItem: "bullet", markDefs: [], style: "normal",
  };
}

function richBullet(children: { text: string; marks?: string[]; markKey?: string }[], markDefs: any[] = []): any {
  return {
    _key: key(), _type: "block",
    children: children.map((c) => ({
      _key: key(), _type: "span", marks: c.marks || (c.markKey ? [c.markKey] : []), text: c.text,
    })),
    level: 1, listItem: "bullet", markDefs, style: "normal",
  };
}

function rawHtml(code: string): any {
  return { _key: key(), _type: "rawHtml", code };
}

function internalLink(href: string) {
  const k = key();
  return { markKey: k, markDef: { _key: k, _type: "link", href } };
}

// ════════════════════════════════════════════════════════════
// 1. WELK MATERIAAL VOOR JE EETTAFEL
// ════════════════════════════════════════════════════════════
const welkMateriaalBody = (() => {
  const linkAfmetingen = internalLink("https://interieur.expert/advies/eettafel-afmetingen");
  
  return [
    // INTRO
    richBlock([
      { text: "Het materiaal van je eettafel bepaalt " },
      { text: "hoe je tafel eruitziet, aanvoelt en veroudert.", marks: ["strong"] },
      { text: " Het is een van de belangrijkste keuzes bij het inrichten van je eetruimte, en toch wordt die keuze vaak puur op uitstraling gemaakt. In de praktijk leidt dat snel tot frustraties: kringen op hout, vlekken die zichtbaar blijven of een oppervlak dat niet bestand is tegen dagelijks gebruik." },
    ]),
    block("In dit artikel krijg je een helder en realistisch overzicht van de belangrijkste materialen voor eettafels. Per materiaal bespreken we de eigenschappen, beperkingen en het type gebruik waarvoor het geschikt is. Zo maak je een keuze die niet alleen mooi oogt, maar ook past bij hoe je echt leeft."),
    richBlock([
      { text: "Belangrijk: ", marks: ["strong"] },
      { text: "het 'beste' materiaal bestaat niet. De juiste keuze hangt af van hoe je je tafel gebruikt, hoeveel onderhoud je wil doen en welke uitstraling je zoekt. Wat voor het ene gezin perfect werkt, is voor het andere een bron van frustratie." },
    ], "blockquote"),

    // OVERZICHT
    block("Overzicht: welk materiaal kies je best?", "h2"),
    block("Voordat we elk materiaal in detail bespreken, geven we je een overzichtstabel. Zo zie je in een oogopslag hoe de materialen zich verhouden op vlak van uitstraling, onderhoud, gevoeligheden en prijsniveau. Gebruik deze tabel als startpunt en lees vervolgens de secties die voor jou relevant zijn."),
    rawHtml('<table><tbody><tr><th>Materiaal</th><th>Uitstraling</th><th>Onderhoud</th><th>Gevoeligheden</th><th>Prijsniveau</th><th>Ideaal voor</th></tr><tr><td>Massief hout</td><td>Warm, natuurlijk</td><td>Gemiddeld</td><td>Vocht, krassen, vlekken</td><td>\u20ac\u20ac\u20ac</td><td>Sfeer en karakter</td></tr><tr><td>Fineer</td><td>Houtlook, strak</td><td>Laag</td><td>Diepe krassen, vocht</td><td>\u20ac\u20ac</td><td>Budget met houtlook</td></tr><tr><td>Keramiek</td><td>Modern, strak</td><td>Laag</td><td>Weinig</td><td>\u20ac\u20ac\u20ac</td><td>Gezinnen, intensief gebruik</td></tr><tr><td>Glas</td><td>Licht, modern</td><td>Gemiddeld</td><td>Vingerafdrukken, krassen</td><td>\u20ac\u20ac</td><td>Kleine ruimtes</td></tr><tr><td>MDF / Laminaat</td><td>Variabel</td><td>Laag</td><td>Vocht bij beschadiging</td><td>\u20ac</td><td>Starters, budget</td></tr></tbody></table>'),

    // MASSIEF HOUT
    block("Massief hout: warm en karaktervol", "h2"),
    block("Massief hout is voor veel mensen de referentie als het over eettafels gaat. Het voelt natuurlijk aan en heeft een uitstraling die moeilijk te evenaren is met andere materialen. Elke tafel is uniek, met eigen nerven, kleurverschillen en textuur. Dat maakt hout visueel heel sterk, maar tegelijk minder voorspelbaar dan synthetische alternatieven."),
    block("Technisch belangrijk", "h3"),
    block("Hout is een hygroscopisch materiaal. Dat betekent dat het vocht opneemt en afgeeft afhankelijk van de luchtvochtigheid in de ruimte. Hierdoor kan een tafelblad licht krimpen, uitzetten of werken naargelang het seizoen. Dat is geen gebrek, maar een eigenschap waar je rekening mee moet houden bij de plaatsing en het onderhoud."),
    block("Voordelen", "h3"),
    bullet("Unieke en warme uitstraling die met de jaren alleen maar mooier wordt. Geen twee tafels zijn identiek, wat hout een zeer persoonlijk karakter geeft."),
    bullet("Herstelbaar bij schade: krassen en vlekken kun je in de meeste gevallen wegschuren en opnieuw afwerken met olie of vernis. Dat maakt hout op lange termijn duurzaam."),
    bullet("Lange levensduur bij correct gebruik. Een goed onderhouden houten tafel kan generaties meegaan en wint aan charme naarmate hij ouder wordt."),
    block("Nadelen", "h3"),
    bullet("Gevoelig voor kringen, vlekken en krassen. Vooral geolied hout reageert snel op vocht en hitte, wat zichtbare sporen achterlaat als je geen onderzetters gebruikt."),
    bullet("Regelmatig onderhoud nodig. Afhankelijk van de afwerking moet je het tafelblad periodiek oliën of vernissen om de beschermende laag in stand te houden."),
    bullet("Reageert op klimaatveranderingen. In vochtige periodes kan het hout licht uitzetten, in droge wintermaanden kan het krimpen. Dit is normaal, maar vraagt om een stabiel binnenklimaat."),
    block("Wanneer kiezen?"),
    block("Massief hout is ideaal als je kiest voor sfeer, authenticiteit en een tafel die mag leven en evolueren. Het past bij mensen die bereid zijn om hun tafel regelmatig te onderhouden en die schoonheid zien in de sporen van dagelijks gebruik."),

    // KERAMIEK
    block("Keramiek: praktisch en sterk", "h2"),
    block("Keramiek is een van de meest gebruiksvriendelijke materialen voor eettafels en wordt steeds populairder, vooral in gezinnen of bij intensief gebruik. De lage waterabsorptie maakt keramiek bijzonder bestand tegen vlekken en vocht. In de praktijk betekent dat: minder stress bij etentjes en een blad dat er na jaren nog fris uitziet."),
    block("Voordelen", "h3"),
    bullet("Zeer onderhoudsvriendelijk. In de meeste gevallen volstaat een vochtige doek om het blad helemaal schoon te krijgen. Geen speciale producten nodig."),
    bullet("Uitstekend bestand tegen vocht, vlekken en hitte. Je kunt zonder zorgen een hete pan neerzetten of een glas wijn morsen zonder dat er sporen achterblijven."),
    bullet("Geschikt voor dagelijks intensief gebruik. Keramiek is krasbestendig en houdt zijn uitstraling ook na jaren van frequent gebruik goed vast."),
    block("Nadelen", "h3"),
    bullet("Hoger prijsniveau. Keramische tafelbladen zijn doorgaans duurder dan hout of fineer, wat het een grotere investering maakt."),
    bullet("Minder warme uitstraling dan hout. Keramiek oogt eerder strak en modern, wat niet in elk interieur past. Wie warmte en textuur zoekt, zal eerder naar hout grijpen."),
    bullet("Kwaliteit en prestaties verschillen per product en fabrikant. Niet alle keramische bladen zijn gelijkwaardig, dus informeer je goed voor je koopt."),
    block("Wanneer kiezen?"),
    block("Keramiek is een logische keuze als gebruiksgemak en onderhoudsvrij wonen belangrijker zijn dan warmte of textuur. Het is bijzonder geschikt voor gezinnen met kinderen die dagelijks intensief aan tafel zitten."),

    // FINEER
    block("Fineer: balans tussen prijs en uitstraling", "h2"),
    block("Fineer bestaat uit een dunne laag echt hout op een drager zoals MDF of multiplex. Daardoor combineert het de uitstraling van hout met een stabielere opbouw en een lager prijspunt. Het resultaat is een strak, mooi afgewerkt tafelblad dat er op het eerste gezicht uitziet als massief hout."),
    block("Voordelen", "h3"),
    bullet("Betaalbaarder dan massief hout, terwijl je wel de warme houtlook behoudt. Ideaal als je het budget wil bewaken zonder op uitstraling in te boeten."),
    bullet("Stabieler materiaal dan massief hout. Fineer werkt minder door klimaatveranderingen, waardoor het minder gevoelig is voor krimpen of uitzetten."),
    bullet("Strakke, uniforme afwerking mogelijk. Fineer leent zich goed voor moderne, minimalistische interieurs waar een clean look gewenst is."),
    block("Nadelen", "h3"),
    bullet("Moeilijk te herstellen bij beschadiging. De toplaag is slechts enkele millimeters dik, waardoor diepe krassen of slijtplekken niet zomaar weggeschuurd kunnen worden."),
    bullet("Kwaliteit sterk afhankelijk van de opbouw. Goedkopere varianten gebruiken een dunnere houtlaag op een minder stevige drager, wat de levensduur beperkt."),
    block("Wanneer kiezen?"),
    block("Fineer is interessant als je een houtlook wil met een beperkter budget en minder gevoeligheid voor werking. Het werkt goed in situaties waar de tafel niet al te intensief gebruikt wordt en je de strakke afwerking waardeert."),

    // GLAS
    block("Glas: visueel licht en modern", "h2"),
    block("Glas wordt vooral gekozen om zijn esthetiek. Het maakt ruimtes visueel groter en lichter, wat het bijzonder geschikt maakt voor kleinere eetkamers of open leefruimtes. Een glazen tafel trekt de aandacht naar de stoelen en de omgeving, in plaats van naar het tafelblad zelf."),
    block("Voordelen", "h3"),
    bullet("Sterk ruimtelijk effect. Een glazen tafelblad voelt minder massief aan en laat licht erdoorheen, waardoor je kamer groter lijkt dan ze is."),
    bullet("Moderne, elegante uitstraling die goed past bij strakke of minimalistische interieurs. Glas combineert bovendien makkelijk met vrijwel elk type onderstel."),
    block("Nadelen", "h3"),
    bullet("Vingerafdrukken en vlekken zijn direct zichtbaar. Je merkt elke aanraking, wat betekent dat je het blad vaker moet reinigen om het er netjes uit te laten zien."),
    bullet("Intensiever onderhoud dan je zou verwachten. Hoewel glas makkelijk te reinigen is, moet je het veel frequenter doen om een smetteloos resultaat te houden."),
    bullet("Gevoelig voor krassen bij verkeerd gebruik. Borden, bestek of decoratie die over het blad schuift, kan na verloop van tijd zichtbare microschade veroorzaken."),
    block("Wanneer kiezen?"),
    block("Glas is geschikt wanneer esthetiek en lichtheid primeren boven praktisch dagelijks gebruik. Het werkt het best in huishoudens zonder jonge kinderen, waar de tafel eerder voor sfeer dan voor intensief gebruik dient."),

    // MDF EN LAMINAAT
    block("MDF en laminaat: functioneel en budgetvriendelijk", "h2"),
    block("Deze materialen worden vaak gebruikt in instapmodellen of designcollecties met specifieke afwerkingen. Ze bieden een goede verhouding tussen prijs en variatie, wat ze aantrekkelijk maakt voor wie een eerste eettafel koopt of het budget beperkt wil houden."),
    block("Voordelen", "h3"),
    bullet("Lage prijs vergeleken met alle andere materialen. Ideaal als je net samenwoont, een studentenkamer inricht of gewoon een functionele tafel nodig hebt zonder grote investering."),
    bullet("Enorm veel variatie in afwerking, kleur en stijl. Van houtimitatie tot betonlook: laminaat biedt voor elk interieur een passend resultaat."),
    bullet("Onderhoudsvriendelijk bij normaal gebruik. Een vochtige doek volstaat voor de dagelijkse reiniging en je hoeft niet te investeren in speciale onderhoudsmiddelen."),
    block("Nadelen", "h3"),
    bullet("Gevoelig voor vochtschade bij beschadiging. Zodra de beschermende toplaag beschadigd raakt, kan vocht in de kern (MDF) dringen en het materiaal doen opzwellen."),
    bullet("Kwaliteit varieert sterk tussen merken en prijsklassen. Een goedkoop model kan er na een jaar al versleten uitzien, terwijl duurdere varianten veel langer meegaan."),
    bullet("Minder herstelbaar dan hout. Schade is in de meeste gevallen permanent, omdat je de toplaag niet kunt opschuren of opnieuw afwerken."),
    block("Wanneer kiezen?"),
    block("Ideaal voor starters, budgetgerichte keuzes of situaties waar je weet dat de tafel over enkele jaren plaats zal maken voor een duurzamer alternatief."),

    // WELK MATERIAAL PAST BIJ JOU
    block("Welk materiaal past bij jouw situatie?", "h2"),
    block("Iedereen heeft andere prioriteiten. In onderstaande tabel matchen we typische situaties met het materiaal dat daar het best bij past. Gebruik dit als richtlijn, niet als absolute waarheid: er zijn altijd uitzonderingen."),
    rawHtml('<table><tbody><tr><th>Situatie</th><th>Aanbevolen materiaal</th><th>Waarom</th></tr><tr><td>Gezin met kinderen</td><td>Keramiek</td><td>Onderhoudsvriendelijk en robuust</td></tr><tr><td>Design en sfeer</td><td>Massief hout</td><td>Warme uitstraling</td></tr><tr><td>Beperkt budget</td><td>Fineer / MDF</td><td>Houtlook aan lage prijs</td></tr><tr><td>Kleine ruimte</td><td>Glas</td><td>Visueel licht</td></tr><tr><td>Intensief gebruik</td><td>Keramiek</td><td>Zeer onderhoudsvriendelijk</td></tr></tbody></table>'),

    // COMBINEER MET AFMETINGEN
    block("Combineer materiaal met afmetingen", "h2"),
    richBlock([
      { text: "Het materiaal heeft ook impact op de grootte van je tafel. Grotere tafels vragen vaak een stabielere opbouw, wat invloed heeft op het gewicht en de constructie. Een grote massief houten tafel weegt al snel meer dan 80 kg, terwijl een keramisch blad lichter kan zijn bij dezelfde afmetingen. Lees daarom ook: " },
      { text: "hoe groot je eettafel moet zijn", markKey: linkAfmetingen.markKey },
      { text: "." },
    ], "normal", [linkAfmetingen.markDef]),

    // CONCLUSIE
    block("Conclusie", "h2"),
    richBlock([
      { text: "Het juiste materiaal kies je " },
      { text: "niet op basis van uiterlijk alleen.", marks: ["strong"] },
      { text: " Elk materiaal heeft zijn eigen sterktes en beperkingen, en de beste keuze hangt altijd af van je persoonlijke situatie. Denk na over hoe intensief je de tafel gebruikt, hoeveel onderhoud je bereid bent te doen en hoe lang je verwacht dat de tafel meegaat. Pas wanneer je die vragen beantwoord hebt, ga je kijken naar stijl en uitstraling." },
    ]),
  ];
})();

// ════════════════════════════════════════════════════════════
// 2. BESTE EETTAFEL VOOR GEZIN
// ════════════════════════════════════════════════════════════
const gezinBody = (() => {
  const linkMateriaal = internalLink("https://interieur.expert/advies/welk-materiaal-voor-je-eettafel");
  const linkAfmetingen = internalLink("https://interieur.expert/advies/eettafel-afmetingen");
  const linkOnderhoud = internalLink("https://interieur.expert/advies/eettafel-onderhoud");

  return [
    // INTRO
    richBlock([
      { text: "Een eettafel in een gezin " },
      { text: "moet tegen een stootje kunnen.", marks: ["strong"] },
      { text: " Het is niet alleen een plek om te eten, maar ook om te knutselen, huiswerk te maken en samen te leven. Dat betekent dat je andere eisen stelt aan je tafel dan wanneer je alleen of met twee woont." },
    ]),
    richBlock([
      { text: "Waar je bij een designinterieur vooral kijkt naar uitstraling, draait het bij een gezin om " },
      { text: "praktisch gebruik, duurzaamheid en onderhoud.", marks: ["strong"] },
      { text: " Een mooie tafel die na zes maanden vol vlekken en krassen zit, levert alleen maar frustratie op. Daarom is het slim om je keuze te baseren op hoe je echt leeft, niet op hoe het er in een woonmagazine uitziet." },
    ]),
    richBlock([
      { text: "Realiteit: ", marks: ["strong"] },
      { text: "morsen, krassen en intensief gebruik zijn geen uitzonderingen in een gezin, maar dagelijkse kost. Een goede gezinstafel houdt daar rekening mee en ziet er na jaren nog steeds goed uit." },
    ], "blockquote"),

    // WAT MAAKT EEN TAFEL GESCHIKT
    block("Wat maakt een eettafel geschikt voor een gezin?", "h2"),
    block("Een gezinstafel moet aan andere eisen voldoen dan een tafel voor een koppel of alleenstaande. Je hebt te maken met meer personen, meer activiteiten en meer kans op ongelukjes. Dit zijn de belangrijkste criteria waar je op moet letten:"),
    bullet("Onderhoudsgemak: de tafel moet snel en eenvoudig schoon te maken zijn. Na elke maaltijd, na elke knutselbeurt, na elke huiswerksessie. Hoe minder moeite dat kost, hoe beter."),
    bullet("Duurzaamheid: het materiaal moet bestand zijn tegen dagelijks intensief gebruik. Denk aan bestek dat valt, glazen die omstoten en kinderen die met speelgoed over het blad schuiven."),
    bullet("Veiligheid: vermijd scherpe randen en hoeken, zeker als je jonge kinderen hebt die net leren lopen. Afgeronde hoeken of een ovale vorm kunnen ongelukken voorkomen."),
    bullet("Ruimte: zorg voor voldoende plaats zodat iedereen comfortabel kan zitten. In een gezin heb je al snel meer ruimte nodig dan je denkt, zeker als kinderen groter worden."),

    // WELK MATERIAAL
    block("Welk materiaal kies je best met kinderen?", "h2"),
    block("Het materiaal is de belangrijkste factor bij het kiezen van een gezinstafel. De juiste keuze bespaart je jarenlang frustratie over vlekken, krassen en intensief onderhoud."),
    rawHtml('<table><tbody><tr><th>Materiaal</th><th>Geschikt voor gezin?</th><th>Waarom</th></tr><tr><td>Keramiek</td><td>\u2605\u2605\u2605\u2605\u2605</td><td>Zeer onderhoudsvriendelijk, weinig gevoelig voor vlekken</td></tr><tr><td>Massief hout</td><td>\u2605\u2605\u2605\u2606\u2606</td><td>Mooi, maar gevoelig voor krassen en vlekken</td></tr><tr><td>Fineer</td><td>\u2605\u2605\u2606\u2606\u2606</td><td>Moeilijk herstelbaar bij schade</td></tr><tr><td>Glas</td><td>\u2605\u2606\u2606\u2606\u2606</td><td>Niet praktisch met kinderen</td></tr></tbody></table>'),

    block("Keramiek als referentie", "h3"),
    block("Keramiek is in de meeste gevallen de meest praktische keuze voor een gezin. Het oppervlak is weinig gevoelig voor vocht en vlekken, wat het dagelijks gebruik veel eenvoudiger maakt. Een omgevallen beker sap of een etensrest die blijft liggen? Geen probleem. Keramiek neemt nauwelijks iets op en is met een vochtige doek weer schoon."),
    block("Dat betekent niet dat keramiek onverwoestbaar is, maar wel dat het beter bestand is tegen de typische gezinssituaties waar je dagelijks mee te maken krijgt. Het bespaart je veel stress en onderhoudstijd."),

    block("Massief hout: mooi maar gevoelig", "h3"),
    block("Massief hout blijft populair in gezinnen, en terecht: de warme uitstraling is ongeëvenaard. Maar het vraagt wel meer tolerantie voor gebruikssporen. Kringen van glazen, krassen van speelgoed of slijtplekken van dagelijks gebruik zijn onvermijdelijk. Sommige gezinnen vinden dat net charmant, anderen ervaren het als storend."),
    richBlock([
      { text: "Belangrijk: ", marks: ["strong"] },
      { text: "kies je voor hout, dan kies je bewust voor een materiaal dat mag leven. Het is geen keuze voor wie een vlekkeloos tafelblad wil houden." },
    ]),
    richBlock([
      { text: "Lees ook: " },
      { text: "welk materiaal het best bij je past", markKey: linkMateriaal.markKey },
      { text: " voor een uitgebreide vergelijking van alle opties." },
    ], "normal", [linkMateriaal.markDef]),

    // VORM
    block("Welke vorm is het meest praktisch?", "h2"),
    block("De vorm van je tafel heeft een grote impact op veiligheid en dagelijks gebruik in een gezin. Het is niet alleen een kwestie van smaak, maar vooral van hoe je ruimte functioneert met kinderen erbij."),
    rawHtml('<table><tbody><tr><th>Vorm</th><th>Voordelen voor gezin</th><th>Nadelen</th></tr><tr><td>Rechthoekig</td><td>Efficiënt, veel zitplaatsen</td><td>Scherpe hoeken</td></tr><tr><td>Rond</td><td>Geen hoeken, veiliger</td><td>Minder plaats</td></tr><tr><td>Ovaal</td><td>Zachter, combineert beide</td><td>Minder efficiënt qua ruimte</td></tr></tbody></table>'),
    richBlock([
      { text: "Praktisch advies: ", marks: ["strong"] },
      { text: "ronde of ovale tafels zijn vaak veiliger voor jonge kinderen, omdat ze geen scherpe hoeken hebben. Zodra kinderen ouder worden en de veiligheid minder een factor is, kan een rechthoekige tafel efficiënter zijn qua zitplaatsen." },
    ]),

    // HOE GROOT
    block("Hoe groot moet een gezinstafel zijn?", "h2"),
    block("In een gezin heb je bijna altijd meer ruimte nodig dan je in eerste instantie denkt. Kinderen groeien, er komen vriendjes eten en bij huiswerk of knutselactiviteiten heb je extra tafeloppervlak nodig. Kies daarom liever iets te groot dan te klein."),
    rawHtml('<table><tbody><tr><th>Gezinssituatie</th><th>Aanbevolen grootte</th></tr><tr><td>4 personen</td><td>160 - 180 cm</td></tr><tr><td>5-6 personen</td><td>180 - 220 cm</td></tr><tr><td>Groot gezin</td><td>220 cm +</td></tr></tbody></table>'),
    richBlock([
      { text: "Lees ook: " },
      { text: "hoe groot je eettafel moet zijn", markKey: linkAfmetingen.markKey },
      { text: " voor gedetailleerde richtlijnen inclusief de ruimte die je rondom de tafel nodig hebt." },
    ], "normal", [linkAfmetingen.markDef]),

    // FOUTEN
    block("Veelgemaakte fouten bij gezinnen", "h2"),
    block("We zien in de praktijk steeds dezelfde fouten terugkomen bij gezinnen die een eettafel kiezen. Het goede nieuws: ze zijn allemaal makkelijk te vermijden als je er op voorhand over nadenkt."),
    bullet("Te delicate materialen kiezen. Glas of onbehandeld fineer zien er mooi uit in de showroom, maar houden het nauwelijks vol in een druk gezin met jonge kinderen."),
    bullet("Een te kleine tafel nemen. Wat nu comfortabel lijkt voor vier personen, voelt krap aan zodra er een vriendje mee-eet of de kinderen groter worden. Kies ruimer dan je denkt."),
    bullet("Geen rekening houden met dagelijks gebruik. Een tafel die alleen voor diners wordt gekozen, maar ook dient als huiswerkplek en knutseltafel, moet dat aankunnen."),
    bullet("Te veel focussen op design en te weinig op praktisch gebruik. Een designtafel die er na zes maanden versleten uitziet, is geen goede investering."),
    richBlock([
      { text: "Tip: ", marks: ["strong"] },
      { text: "kies een tafel die past bij hoe je leeft, niet bij hoe je wil leven. Eerlijkheid over je dagelijks gebruik bespaart je frustratie op lange termijn." },
    ], "blockquote"),

    // ONDERHOUD
    block("Onderhoud: onderschat dit niet", "h2"),
    block("Onderhoud bepaalt hoe je tafel er na een paar jaar uitziet. Een materiaal dat weinig onderhoud vraagt, zorgt voor minder frustratie in het dagelijks leven van een gezin. Niemand wil na elke maaltijd een speciaal schoonmaakritueel uitvoeren of zich zorgen maken over elke vlek."),
    block("Een materiaal dat je snel en eenvoudig schoon kunt maken, wint het op termijn altijd van een materiaal dat mooier lijkt maar meer aandacht vraagt. Denk daaraan wanneer je je keuze maakt."),
    richBlock([
      { text: "Lees ook: " },
      { text: "onderhoud per materiaal", markKey: linkOnderhoud.markKey },
      { text: " voor concrete onderhoudstips per oppervlak." },
    ], "normal", [linkOnderhoud.markDef]),

    // CONCLUSIE
    block("Conclusie", "h2"),
    richBlock([
      { text: "De beste eettafel voor een gezin is " },
      { text: "niet de mooiste, maar de meest praktische.", marks: ["strong"] },
      { text: " Denk bij je keuze altijd in functie van de intensiteit van gebruik, het aantal personen en het onderhoud dat je bereid bent te doen. Daarna pas kies je stijl en design. Een goed gekozen tafel groeit mee met je gezin en ziet er ook na jaren dagelijks gebruik nog goed uit." },
    ]),
  ];
})();

// ════════════════════════════════════════════════════════════
// 3. EETTAFEL AFMETINGEN
// ════════════════════════════════════════════════════════════
const afmetingenBody = (() => {
  const linkMateriaal = internalLink("https://interieur.expert/advies/welk-materiaal-voor-je-eettafel");

  return [
    // INTRO
    richBlock([
      { text: "Een eettafel die niet past, voelt nooit goed." },
    ]),
    block("Te klein betekent krap zitten, met borden die tegen elkaar stoten en stoelen die niet ver genoeg naar achter kunnen. Te groot betekent dat je ruimte verliest, je eetkamer uit balans raakt en de tafel dominant wordt in plaats van uitnodigend. De juiste afmetingen bepalen niet alleen hoeveel mensen er comfortabel kunnen zitten, maar ook hoe je ruimte aanvoelt en functioneert in het dagelijks leven."),
    richBlock([
      { text: "Belangrijk: ", marks: ["strong"] },
      { text: "kies je tafel niet alleen op basis van het aantal personen, maar ook op basis van de beschikbare ruimte rondom. Een tafel die perfect is qua lengte maar te weinig doorloopruimte overlaat, voelt altijd te groot aan." },
    ], "blockquote"),

    // HOE GROOT
    block("Hoe groot moet je eettafel zijn?", "h2"),
    block("De lengte van je eettafel hangt in eerste instantie af van het aantal personen dat er regelmatig aan zit. Onderstaande tabel geeft een realistische richtlijn. Houd er rekening mee dat de 'comfortabele' maat altijd de voorkeur verdient als je de ruimte hebt, want in de praktijk zit je al snel krapper dan verwacht."),
    rawHtml('<table><tbody><tr><th>Aantal personen</th><th>Minimale lengte</th><th>Comfortabele lengte</th></tr><tr><td>4 personen</td><td>120 cm</td><td>140 cm</td></tr><tr><td>6 personen</td><td>160 cm</td><td>180 cm</td></tr><tr><td>8 personen</td><td>200 cm</td><td>220 - 240 cm</td></tr><tr><td>10 personen</td><td>240 cm</td><td>280 cm +</td></tr></tbody></table>'),
    richBlock([
      { text: "Vuistregel: ", marks: ["strong"] },
      { text: "reken ongeveer 60 cm per persoon voor comfortabel zitten. Dat is de breedte die iemand nodig heeft om zijn bord, bestek en een glas kwijt te kunnen zonder in de weg te zitten van de buren." },
    ]),

    // RUIMTE ROND TAFEL
    block("Hoeveel ruimte heb je nodig rond de tafel?", "h2"),
    block("Veel mensen focussen alleen op de tafel zelf, maar de ruimte eromheen is minstens even belangrijk. Je moet stoelen comfortabel kunnen verschuiven en vrij kunnen bewegen. Een tafel die te groot is voor de ruimte, voelt benauwend aan en maakt de kamer moeilijk te gebruiken. Meet daarom altijd de volledige zone uit, niet alleen het tafelblad."),
    rawHtml('<table><tbody><tr><th>Situatie</th><th>Minimale ruimte</th><th>Comfortabele ruimte</th></tr><tr><td>Stoel naar achter schuiven</td><td>70 cm</td><td>80 cm</td></tr><tr><td>Doorlopen achter stoel</td><td>90 cm</td><td>100 - 120 cm</td></tr><tr><td>Volledige comfortzone</td><td>90 cm</td><td>120 cm+</td></tr></tbody></table>'),

    // BREEDTE
    block("Wat is de ideale breedte van een eettafel?", "h2"),
    block("De breedte van een eettafel bepaalt hoeveel ruimte je hebt voor borden, glazen en eventueel decoratie in het midden. Het wordt een factor die mensen vaak over het hoofd zien, maar die een groot verschil maakt in het dagelijks comfort."),
    bullet("80 cm: dit is het absolute minimum. Het werkt als je een heel compacte ruimte hebt, maar het voelt krap zodra je met meerdere personen tegenover elkaar zit en er schalen in het midden staan."),
    bullet("90 tot 100 cm: de standaard en comfortabele breedte. Je hebt voldoende ruimte voor borden tegenover elkaar, met nog wat plaats in het midden voor schalen, broodmanden of decoratie."),
    bullet("100 cm en meer: ruim en luxueus. Ideaal als je regelmatig met meerdere personen eet en graag schalen in het midden plaatst. Het voelt meteen gastvrij en genereus aan."),
    block("Bij smallere tafels wordt het snel krap, zeker als je met meerdere personen tegenover elkaar zit en er een kaarsje of vaas in het midden moet passen."),

    // VORM
    block("Welke vorm kies je best?", "h2"),
    block("De vorm van je tafel heeft niet alleen een visueel effect, maar ook een praktische impact op hoe je ruimte aanvoelt en hoeveel personen er comfortabel kunnen zitten. Elke vorm heeft zijn eigen voor- en nadelen."),
    rawHtml('<table><tbody><tr><th>Vorm</th><th>Voordelen</th><th>Nadelen</th></tr><tr><td>Rechthoekig</td><td>Meest praktisch, effici\u00ebnt</td><td>Kan dominant zijn in kleine ruimtes</td></tr><tr><td>Rond</td><td>Socialer, zachter</td><td>Minder effici\u00ebnt qua ruimte</td></tr><tr><td>Ovaal</td><td>Combinatie van beide</td><td>Minder standaardaanbod</td></tr></tbody></table>'),

    // FOUTEN
    block("Veelgemaakte fouten", "h2"),
    block("Dit zijn de meest voorkomende fouten die we tegenkomen bij mensen die een eettafel kiezen op basis van afmetingen. Ze zijn gelukkig allemaal te vermijden met een beetje voorbereiding."),
    bullet("Een te grote tafel kiezen voor de ruimte. In de showroom lijkt een tafel van 240 cm heel normaal, maar thuis in een eetkamer van 3,5 bij 4 meter wordt het meteen benauwd."),
    bullet("Geen rekening houden met stoelen. De stoelen zijn er niet alleen wanneer iemand zit. Ze staan altijd ergens, en dat neemt meer ruimte in dan je verwacht."),
    bullet("De tafel tegen de muur plaatsen terwijl die vrij hoort te staan. Als je van plan bent om aan alle zijden te zitten, moet er ook aan alle kanten voldoende ruimte zijn."),
    bullet("Te weinig doorloopruimte voorzien. Iemand die achter een bezette stoel moet passen om naar de keuken te lopen, ervaart dat elke dag als een irritatie."),
    richBlock([
      { text: "Praktische tip: ", marks: ["strong"] },
      { text: "plak de afmetingen van je gewenste tafel op de vloer met schilderstape. Zet er stoelen bij en loop een paar dagen rond. Zo voel je meteen of het werkt in je ruimte voordat je investeert." },
    ], "blockquote"),

    // COMBINEER MET MATERIAAL
    block("Afmetingen combineren met materiaal", "h2"),
    richBlock([
      { text: "De grootte van je tafel heeft ook impact op het materiaal dat je kiest. Grotere tafels vragen vaak een stabielere en stevigere opbouw, wat invloed heeft op gewicht, prijs en constructiemogelijkheden. Een tafel van 240 cm in massief eik weegt al snel meer dan 100 kg, terwijl een keramisch blad op een metalen onderstel een stuk lichter kan zijn. Lees daarom ook: " },
      { text: "welk materiaal je best kiest voor je eettafel", markKey: linkMateriaal.markKey },
      { text: "." },
    ], "normal", [linkMateriaal.markDef]),

    // CONCLUSIE
    block("Conclusie", "h2"),
    richBlock([
      { text: "De juiste afmetingen zorgen voor " },
      { text: "comfort, rust en gebruiksgemak.", marks: ["strong"] },
      { text: " Meet je ruimte grondig op, houd rekening met de stoelen en de doorloopzone, en kies bij twijfel altijd iets ruimer. Een tafel waar iedereen comfortabel aan kan zitten zonder zich krap te voelen, maakt het verschil tussen fijne maaltijden en dagelijkse irritatie." },
    ]),
  ];
})();

// ════════════════════════════════════════════════════════════
// PUSH TO SANITY
// ════════════════════════════════════════════════════════════
const articles = [
  { id: "4097593f-d8d0-4066-9c8f-368f44fb7d0c", slug: "welk-materiaal-voor-je-eettafel", body: welkMateriaalBody },
  { id: "66789cda-0dcf-4bdd-9c1d-10b892eb62aa", slug: "beste-eettafel-voor-gezin", body: gezinBody },
  { id: "a2ca64c5-3d5e-43e3-8a8d-be2b43c716d4", slug: "eettafel-afmetingen", body: afmetingenBody },
];

async function run() {
  for (const article of articles) {
    console.log(`Patching ${article.slug} (${article.id}) with ${article.body.length} blocks...`);
    
    const res = await fetch(
      `https://uf111z1c.api.sanity.io/v2024-01-01/data/mutate/production`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mutations: [{
            patch: { id: article.id, set: { body: article.body } },
          }],
        }),
      }
    );
    
    const data = await res.json();
    if (!res.ok) {
      console.error(`  FAILED: ${JSON.stringify(data)}`);
    } else {
      console.log(`  OK: ${data.transactionId}`);
    }
  }
}

run();
