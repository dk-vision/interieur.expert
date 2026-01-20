import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: Math.random().toString(36).substring(7),
  text,
  marks: marks.length > 0 ? marks : undefined,
});

const block = (children: any[], style = "normal", markDefs: any[] = []) => ({
  _type: "block",
  _key: Math.random().toString(36).substring(7),
  style,
  children,
  markDefs: markDefs.length > 0 ? markDefs : undefined,
});

const quote = (text: string) => block([span(text)], "blockquote");

const linkMark = (articleId: string) => {
  const key = Math.random().toString(36).substring(7);
  return {
    def: {
      _key: key,
      _type: "internalArticleLink",
      reference: { _type: "reference", _ref: articleId },
    },
    key,
  };
};

async function getArticleId(slug: string) {
  return await client.fetch(
    `*[_type == 'article' && slug.current == $slug][0]._id`,
    { slug }
  );
}

const moreArticles = [
  {
    title: "Kleine ruimtes groter laten lijken: wat werkt écht",
    slug: "kleine-ruimtes",
    excerpt: "Spiegels, lichte kleuren en slimme inrichting maken kleine ruimtes optisch groter. Ontdek welke trucjes echt werken.",
    category: "advies",
    tags: ["kleine-ruimtes", "interieur-tips", "ruimte"],
    author: "Sophie van der Berg",
    seoTitle: "Kleine ruimtes groter laten lijken: 10 trucjes die werken",
    seoDescription: "Leer hoe je kleine ruimtes optisch vergroot met spiegels, lichte kleuren, slim meubelgebruik en doordachte inrichting.",
    content: async () => {
      const verlichtingId = await getArticleId("verlichting-lagen");
      const verlichtingLink = verlichtingId ? linkMark(verlichtingId) : null;

      return [
        block([
          span("Een kleine ruimte hoef je niet te accepteren als beperking. Met de juiste tricks maak je elke ruimte optisch groter zonder muren te verzetten. "),
          span("Spiegels", ["strong"]),
          span(", "),
          span("licht", ["strong"]),
          span(" en slimme meubel keuzes doen wonderen. Hier zijn de trucjes die écht werken."),
        ]),
        block([span("Spiegels: de nummer één trick")], "h2"),
        block([
          span("Spiegels", ["strong"]),
          span(" verdubbelen visueel de ruimte. Hang een grote spiegel tegenover een raam - je krijgt twee keer zoveel "),
          span("licht", ["strong"]),
          span(" en de illusie van diepte. Een spiegelwand in een smalle gang creëert breedte. Vermijd kleine spiegeltjes - ga groot of ga niet."),
        ]),
        quote("Een kleine ruimte groter maken begint bij slimme illusies, niet bij verbouwen."),
        block([span("Lichte kleuren: ruimte begint bij de muren")], "h2"),
        block([
          span("Donkere muren sluiten een ruimte. "),
          span("Licht", ["strong"]),
          span("e kleuren (wit, crème, lichtgrijs) reflecteren licht en creëren openheid. Schilder plafond lichter dan muren voor extra hoogte. Vermijd contrast tussen muren en plafond - één kleur doorgetrokken vergroot optisch."),
        ]),
        block([span("Meubels: klein en multifunctioneel")], "h2"),
        block([
          span("Grote banken eten ruimte. Kies compacte meubels en gebruik "),
          span("multifunctioneel", ["strong"]),
          span(": een bank met opbergruimte, een eettafel die inklapt, een bed met lades. Transparant meubilair (acryl, glas) neemt geen visuele ruimte in. Meubels op poten laten vloer zien en creëren lucht."),
        ]),
        block([span("Verticale ruimte: denk omhoog")], "h2"),
        block([
          span("Gebruik hoogte. Hoge kasten tot het plafond creëren opbergruimte zonder vloeroppervlak te gebruiken. Hangende planken in plaats van dressoirs. Lange gordijnen van plafond tot vloer maken ramen groter dan ze zijn."),
        ]),
        block([span("Verlichting: meer dan één lamp")], "h2"),
        block([
          ...(verlichtingLink
            ? [
                span("Verlichting", [verlichtingLink.key]),
                span(" in lagen vergroot een ruimte. Eén plafondlamp maakt een ruimte plat. Voeg verlichting toe op verschillende hoogtes: vloerlamp, tafellamp, wandlamp. Dit creëert diepte. Vermijd donkere hoeken - elke hoek heeft "),
                span("licht", ["strong"]),
                span(" nodig."),
              ]
            : [
                span("Verlichting in lagen vergroot een ruimte. Eén plafondlamp maakt een ruimte plat. Voeg verlichting toe op verschillende hoogtes: vloerlamp, tafellamp, wandlamp. Dit creëert diepte. Vermijd donkere hoeken - elke hoek heeft "),
                span("licht", ["strong"]),
                span(" nodig."),
              ]),
        ], "normal", verlichtingLink ? [verlichtingLink.def] : []),
        block([span("Rommel: de grootste ruimte-eter")], "h2"),
        block([
          span("Rommel halveert visueel je ruimte. In kleine ruimtes is opruimen essentieel. Geen spullen op de vloer. Lege oppervlakken geven rust. Gebruik gesloten opbergruimte - open kasten zijn rommelig."),
        ]),
        block([span("Gordijnen: hang ze hoog en breed")], "h2"),
        block([
          span("Hang gordijnrails tot het plafond, niet boven je raam. Laat gordijnen breder hangen dan het raam - open lijkt het raam groter. Kies lichte, doorschijnende stof die "),
          span("licht", ["strong"]),
          span(" doorlaat."),
        ]),
        block([span("Strepen en patronen: verticaal is je vriend")], "h2"),
        block([
          span("Verticale strepen (behang, gordijnen) maken plafonds hoger. Horizontale strepen maken een ruimte breder. Kleine patronen werken beter dan grote - grote patronen overweldigen kleine ruimtes."),
        ]),
        block([span("Wat niet werkt (en waarom)")], "h2"),
        block([span("• Veel kleine meubels - creëert rommel")]),
        block([span("• Donkere vloeren - sluiten ruimte af")]),
        block([span("• Zware gordijnen - blokeren licht")]),
        block([span("• Grote patronen op muren - maken ruimte kleiner")]),
        block([span("• Meubels tegen alle muren - neemt ademruimte weg")]),
        block([span("Praktische tips")], "h2"),
        block([span("• Gebruik maximaal 3 kleuren in één ruimte")]),
        block([span("• Laat 30% van de muur leeg (geen kunst/decoratie)")]),
        block([span("• Kies meubels die 15cm vrije ruimte onder hebben")]),
        block([span("• Hang kunst hoger dan je denkt (op ooghoogte staand, niet zittend)")]),
        block([span("• Gebruik ronde meubels in plaats van hoekig (neemt minder visuele ruimte)")]),
        block([
          span("Kleine ruimtes zijn een uitdaging, maar forceren je om bewuste keuzes te maken. Elk object heeft een reden om er te zijn. Dat maakt kleine ruimtes vaak persoonlijker en gezelliger dan grote."),
        ]),
      ];
    },
  },
  {
    title: "Je eerste woning inrichten: waar begin je?",
    slug: "eerste-woning",
    excerpt: "Een eerste woning inrichten kan overweldigend zijn. Leer waar je begint, welke prioriteiten je stelt en hoe je slim investeert.",
    category: "advies",
    tags: ["beginners", "budget", "interieur-tips"],
    author: "Sophie van der Berg",
    seoTitle: "Je eerste woning inrichten: complete stappenplan en tips",
    seoDescription: "Eerste woning inrichten? Begin met de essentials, investeer slim en bouw langzaam uit. Complete gids voor beginners.",
    content: async () => [
      block([
        span("Je eerste eigen woning inrichten is overweldigend. Lege ruimtes, beperkt budget, geen ervaring. Waar begin je? Met de "),
        span("essentials", ["strong"]),
        span(". Niet alles tegelijk, maar stap voor stap. Dit is je stappenplan."),
      ]),
      block([span("Stap 1: de basis eerst")], "h2"),
      block([
        span("Start niet met decoratie. Begin met functie: bed, bank, eettafel, verlichting. Dit zijn je "),
        span("prioriteiten", ["strong"]),
        span(". Zonder deze kan je niet functioneren. Decoratie komt later. Focus op kwaliteit voor dagelijks gebruik, bespaar op de rest."),
      ]),
      quote("Je eerste woning inrichten is als een puzzel - begin met de hoeken, de rest volgt vanzelf."),
      block([span("Stap 2: meet voordat je koopt")], "h2"),
      block([
        span("Grootste fout: te grote meubels kopen. Meet je ruimtes nauwkeurig. Noteer raamhoogte, deuropening, plafond. Visualiseer meubels met karton op de vloer. Een bank van 2,40m in een ruimte van 3m laat geen loop meer over."),
      ]),
      block([span("Stap 3: investeer hier, bespaar daar")], "h2"),
      block([span("Investeer in:")]),
      block([span("• Matras (slaap = gezondheid)")]),
      block([span("• Bank (dagelijks gebruik)")]),
      block([span("• Eettafel (sociale hub)")]),
      block([span("• Verlichting (impact op sfeer)")]),
      block([span("Bespaar op:")]),
      block([span("• Decoratie (koop later, secondhand)")]),
      block([span("• Bijzettafels (tweedehands werkt prima)")]),
      block([span("• Kussens en plaids (IKEA is goed genoeg)")]),
      block([span("• Vazen en kunst (verzamel langzaam)")]),
      block([span("Stap 4: kies een kleurenschema")], "h2"),
      block([
        span("Begin simpel: 2 basiskleuren + 1 accentkleur. Bijvoorbeeld: grijs (muren), hout (meubels), groen (accenten). Dit creëert samenhang zonder dat je over elke aankoop twijfelt. Alles past automatisch."),
      ]),
      block([span("Stap 5: opbergruimte is essentieel")], "h2"),
      block([
        span("Rommel in eerste woningen is standaard - te klein, te veel spullen. Investeer vroeg in opbergruimte: kasten tot het plafond, bedden met lades, opbergbanken. Verborgen rommel = visuele rust."),
      ]),
      block([span("Stap 6: doe niet alles in één keer")], "h2"),
      block([
        span("Grootste vergissing: alles in één maand willen kopen. Geef jezelf een jaar. Woon eerst in de ruimte. Ontdek wat je mist. Sommige meubels blijken overbodig, andere essentieel. Haast leidt tot verkeerde aankopen."),
      ]),
      block([span("Stap 7: secondhand is goud")], "h2"),
      block([
        span("Vintage eettafel, tweedehands dressoir, Marktplaats bijzettafels. Kwaliteitsmeubels van 20 jaar oud zijn beter dan nieuwe IKEA rommel. Let op: probeer meubels voor je koopt. Zit die stoel écht goed?"),
      ]),
      block([span("Checklist per ruimte")], "h2"),
      block([span("Slaapkamer:")]),
      block([span("• Goed matras (180x200 minimaal voor 2 personen)")]),
      block([span("• Bedlinnen (2 sets)")]),
      block([span("• Kledingkast met genoeg ruimte")]),
      block([span("• Bedlampjes")]),
      block([span("Woonkamer:")]),
      block([span("• Comfortabele bank (test voor je koopt)")]),
      block([span("• Salontafel (rond is beter in kleine ruimtes)")]),
      block([span("• Verlichting (minimaal 3 bronnen)")]),
      block([span("• Gordijnen of rolgordijnen")]),
      block([span("Keuken:")]),
      block([span("• Basisservies voor 4 personen")]),
      block([span("• Pannenset")]),
      block([span("• Bestek, messen, snijplank")]),
      block([span("• Opbergpotten en bakjes")]),
      block([span("Eetkamer:")]),
      block([span("• Eettafel (80x80cm voor 2, 120x80cm voor 4)")]),
      block([span("• Comfortabele stoelen")]),
      block([span("• Hanglamp boven tafel")]),
      block([span("Wat kan wachten:")]),
      block([span("• Kunst aan de muur")]),
      block([span("• Designmeubels")]),
      block([span("• Extra stoelen")]),
      block([span("• Decoratieve objecten")]),
      block([span("• Vloerkleden (tenzij nodig voor akoestiek)")]),
      block([span("Budgettips")], "h2"),
      block([span("• Stel een maximum per meubel voordat je gaat kijken")]),
      block([span("• Gebruik Facebook Marktplaats voor vintage vondsten")]),
      block([span("• Koop uit showroom (outlet) voor kortingen")]),
      block([span("• Mix duur (bank) met goedkoop (bijzettafels)")]),
      block([span("• Wacht op sales (januari, juli)")]),
      block([
        span("Je eerste woning is een experiment. Sommige keuzes waren perfect, andere niet. Dat is oké. Leer van elke aankoop. Over 5 jaar ziet je huis er anders uit - en dat hoort zo."),
      ]),
    ],
  },
  {
    title: "Budget slim investeren: waar let je op?",
    slug: "budget-investeren",
    excerpt: "Beperkt budget betekent niet goedkoop interieur. Leer waar je investeert, waar je bespaart en hoe je kwaliteit herkent.",
    category: "advies",
    tags: ["budget", "interieur-tips", "kwaliteit"],
    author: "Sophie van der Berg",
    seoTitle: "Budget slim investeren in interieur: wat is het waard?",
    seoDescription: "Investeer slim met beperkt budget. Leer waar kwaliteit loont, waar je bespaart en hoe je tweedehands koopt zonder spijt.",
    content: async () => [
      block([
        span("Een mooi interieur vraagt geen onbeperkt budget. Het vraagt slimme keuzes. Waar investeer je in "),
        span("kwaliteit", ["strong"]),
        span(", waar koop je goedkoop, en wanneer kies je "),
        span("tweedehands", ["strong"]),
        span("? Dit zijn de regels."),
      ]),
      block([span("De basisregel: gebruik bepaalt waarde")], "h2"),
      block([
        span("Kwaliteit", ["strong"]),
        span(" loont bij dagelijks gebruik. Bank, bed, eettafel, bureau - hier zit of lig je uren per dag. Goedkope variant slijt snel en kost op termijn meer. Decoratie gebruik je niet - daar mag je besparen."),
      ]),
      quote("Bij interieur geldt: koop goedkoop wat slijt, investeer in wat blijft."),
      block([span("Waar je moet investeren")], "h2"),
      block([span("• Matras: je slaap bepaalt je gezondheid (€500-1500)")]),
      block([span("• Bank: dagelijks 3+ uur gebruik (€800-2000)")]),
      block([span("• Bureaust oel: als je thuiswerkt (€200-600)")]),
      block([span("• Verlichting: impact op sfeer en gebruik (€50-300 per lamp)")]),
      block([span("• Gordijnen: kwaliteit zichtbaar, jarenlang gebruik (€200-800)")]),
      block([span("Waar je mag besparen")], "h2"),
      block([span("• Bijzettafels: functie > design (€50-150)")]),
      block([span("• Kussens: snel te vervangen (€15-40)")]),
      block([span("• Vazen en decoratie: impact minimaal (€10-30)")]),
      block([span("• Serviesgoed: IKEA werkt prima (€40 voor set)")]),
      block([span("• Fotolijsten: de foto telt, niet de lijst (€5-20)")]),
      block([span("Tweedehands: goud of gruis?")], "h2"),
      block([
        span("Tweedehands", ["strong"]),
        span(" kan fantastisch zijn, maar let op: meubels van 20-30 jaar oud zijn vaak betere "),
        span("kwaliteit", ["strong"]),
        span(" dan nieuwe budgetspullen. Test altijd: zit een stoel goed? Zijn er beschadigingen? Ruikt het muf? Kan je het ophalen (bezorgen kost)?"),
      ]),
      block([span("Waar tweedehands goed werkt:")]),
      block([span("• Houten meubels (eettafels, dressoirs)")]),
      block([span("• Vintage verlichting")]),
      block([span("• Kasten (mits geen vocht/geur)")]),
      block([span("• Tafels en bijzettafels")]),
      block([span("• Spiegels en kunst")]),
      block([span("Waar tweedehands risicovol is:")]),
      block([span("• Matrassen (hygiëne)")]),
      block([span("• Banken met stof (geuren, vlekken)")]),
      block([span("• Stoelen met loszittende poten")]),
      block([span("• Kasten met schimmel/vocht")]),
      block([span("Kwaliteit herkennen")], "h2"),
      block([span("Hout:")]),
      block([span("• Massief hout > fineer > spaanplaat")]),
      block([span("• Zware meubels zijn vaak beter dan lichte")]),
      block([span("• Dovetail verbindingen > lijm/schroeven")]),
      block([span("• Nerven zichtbaar = massief")]),
      block([span("Stoffen:")]),
      block([span("• Natuurlijke vezels (katoen, linnen, wol) > polyester")]),
      block([span("• Hoge gramgewicht (500g+ per m²) = steviger")]),
      block([span("• Tight weave (strak weefsel) = duurzamer")]),
      block([span("Bank/stoelen:")]),
      block([span("• Hardhouten frame > softwood/spaanplaat")]),
      block([span("• Pocketvering > bonellvering > schuim")]),
      block([span("• Afneembare hoezen = praktisch")]),
      block([span("• Armleuningen stevig vastgeschroefd (niet wiebelend)")]),
      block([span("Budget per ruimte")], "h2"),
      block([span("Minimaal realistisch:")]),
      block([span("• Slaapkamer: €1000 (bed + matras + kast)")]),
      block([span("• Woonkamer: €1500 (bank + tafel + verlichting)")]),
      block([span("• Eetkamer: €500 (tafel + 4 stoelen)")]),
      block([span("• Keuken: €300 (servies + pannen + opslag)")]),
      block([span("Comfortabel:")]),
      block([span("• Slaapkamer: €2500")]),
      block([span("• Woonkamer: €3500")]),
      block([span("• Eetkamer: €1200")]),
      block([span("• Keuken: €600")]),
      block([span("Budgetfouten vermijden")], "h2"),
      block([span("• Goedkoop is duurkoop: slechte bank na 2 jaar vervangen = duurder")]),
      block([span("• Niet alles in één keer kopen: haast leidt tot verkeerde keuzes")]),
      block([span("• Niet testen voor kopen: online foto's liegen")]),
      block([span("• Impulsaankopen: geen plan = rommelig resultaat")]),
      block([span("• Trends achternalopen: trends verdwijnen, tijdloos blijft")]),
      block([span("Slimme bespaartips")], "h2"),
      block([span("• Koop uit showroom outlets (50-70% korting)")]),
      block([span("• Wacht op seizoenssales (januari, juli)")]),
      block([span("• Mix duur met goedkoop (niet alles hoeft duur)")]),
      block([span("• Koop tijdloze basis, cheap accenten")]),
      block([span("• Vraag om staaltjes voor je koopt")]),
      block([span("• Check Facebook Marktplaats dagelijks (beste spul gaat snel)")]),
      block([
        span("Budget is een beperking, maar dwingt je tot betere keuzes. Je koopt minder, maar bewuster. Dat maakt je interieur persoonlijker dan wanneer je alles in één keer bij één winkel koopt."),
      ]),
    ],
  },
];

async function createFinalArticles() {
  console.log("\n✍️  CREATING FINAL 3 ARTICLES\n");

  for (const article of moreArticles) {
    const body = await article.content();

    await client.create({
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags,
      author: article.author,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      body,
      publishedAt: new Date().toISOString(),
    });

    console.log(`  ✅ ${article.title}`);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Total articles created`);
  console.log(`${"=".repeat(60)}\n`);
}

createFinalArticles();
