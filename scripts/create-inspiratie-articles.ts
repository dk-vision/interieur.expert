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

const inspiratieArticles = [
  {
    title: "Coastal interieur: strandhuis sfeer in elk huis",
    slug: "coastal-interieur",
    excerpt: "Breng strandhuis sfeer in je interieur met natuurlijke materialen, lichte kleuren en ontspannen styling. Praktische tips.",
    category: "inspiratie",
    tags: ["coastal", "strandhuis", "stijlen", "licht"],
    author: "Sophie van der Berg",
    seoTitle: "Coastal interieur: strandhuis sfeer creëren thuis",
    seoDescription: "Coastal interieur styling: natuurlijke materialen, lichte tinten en ontspannen sfeer. Zo creëer je strandhuis look zonder clichés.",
    content: async () => {
      const neutraleKleurenId = await getArticleId("neutrale-kleuren");
      const materialenId = await getArticleId("natuurlijke-materialen");
      
      const neutraleLink = neutraleKleurenId ? linkMark(neutraleKleurenId) : null;
      const materialenLink = materialenId ? linkMark(materialenId) : null;

      return [
        block([
          span("Coastal interieur is meer dan schelpen en maritieme strepen. Het gaat om "),
          span("licht", ["strong"]),
          span(", "),
          span("ruimte", ["strong"]),
          span(" en een ontspannen sfeer. Geen thema-park, maar de essentie van het strand: rust, natuur en eenvoud."),
        ]),
        block([span("Kleurenpalet: licht en natuurlijk")], "h2"),
        block([
          span("Basis: wit, zand, beige. Accenten: blauw (denim, navy), grijs (leisteen), groen (zeegras). Vermijd felle kleuren - de kust is zacht en gedempt. "),
          ...(neutraleLink ? [span("Neutrale kleuren", [neutraleLink.key])] : [span("Neutrale kleuren")]),
          span(" vormen de basis voor elke coastal look."),
        ], "normal", neutraleLink ? [neutraleLink.def] : []),
        quote("Coastal is niet thema - het is een gevoel van rust en ruimte."),
        block([span("Materialen: natuurlijk en verweerd")], "h2"),
        block([
          span("Hout: verweerd, gebleekt, driftwood-look. Linnen en katoen: stonewashed, losjes. Rotan en riet: licht en luchtig. Steen: leisteen, zandsteen, kalksteen. "),
          ...(materialenLink ? [span("Natuurlijke materialen", [materialenLink.key])] : [span("Natuurlijke materialen")]),
          span(" zijn essentieel voor authenticiteit."),
        ], "normal", materialenLink ? [materialenLink.def] : []),
        block([span("Meubels: licht en eenvoudig")], "h2"),
        block([
          span("Gebleekt hout, witgewassen finishes. Rotan stoelen, linnen banken. Lage meubels (creëert ruimte). Open kasten (geen zware volumes). Geen donker hout - dat is te zwaar."),
        ]),
        block([span("Textiel: zacht en natuurlijk")], "h2"),
        block([span("Linnen kussens in off-white en zand. Geweven plaids in grijs en blauw. Jute kleden (textuur zonder kleur). Dunne gordijnen (licht binnen laten). Vermijd glimmende stoffen.")]),
        block([span("Decoratie: minimaal en gevonden")], "h2"),
        block([span("Drijfhout in vazen. Stenen in schalen. Katoenen manden voor opslag. Glazen vazen met takken. Geen schelpen-overdaad - subtiel suggereert meer.")]),
        block([span("Verlichting: zacht en diffuus")], "h2"),
        block([span("Natuurlijk licht maximaliseren (dunne gordijnen). Rieten lampen (rotan, bamboe). Kaarsen in lantaarns. Indirecte verlichting. Vermijd felle spots.")]),
        block([span("Vloeren: licht en natuurlijk")], "h2"),
        block([span("Gebleekt hout (parket, planken). Lichte tegels (zand, beton-look). Jute/sisal kleden. Vermijd donkere vloeren - absorbeert licht.")]),
        block([span("Wat coastal NIET is")], "h2"),
        block([span("• Maritieme strepen overal")]),
        block([span("• Schelpen op elk oppervlak")]),
        block([span("• Nautische decoratie (ankers, reddingsboeien)")]),
        block([span("• Felblauwe accenten")]),
        block([span("• Thematisch - het is een sfeer, geen themapark")]),
        block([span("Coastal per ruimte")], "h2"),
        block([span("Woonkamer: linnen bank, rotan fauteuils, jute kleed, gebleekt houten salontafel")]),
        block([span("Slaapkamer: wit linnen beddengoed, lage houten bed, rieten manden, minimale decoratie")]),
        block([span("Badkamer: witte tegels, houten accenten, natuursteen, geweven manden")]),
        block([span("Keuken: witte kasten, houten werkblad, open planken, natuursteen")]),
        block([span("Budget-friendly coastal")], "h2"),
        block([span("• Verf meubels wit/zandkleur (bestaande stukken transformeren)")]),
        block([span("• Koop tweedehands rotan (Marktplaats)")]),
        block([span("• Gebruik jute koord in plaats van duur tapijt")]),
        block([span("• Verzamel takken/stenen op strand (gratis decoratie)")]),
        block([span("• IKEA linnen (goedkoop, goede kwaliteit)")]),
        block([span("Veelgemaakte fouten")], "h2"),
        block([span("• Te veel blauw (wordt thematisch)")]),
        block([span("• Schelpen overal (kitscherig)")]),
        block([span("• Donkere accenten (breekt de lichtheid)")]),
        block([span("• Te veel decoratie (coastal is minimaal)")]),
        block([span("• Maritieme prints (te letterlijk)")]),
        block([span("Praktische tips")], "h2"),
        block([span("• Begin met wit/zand basis")]),
        block([span("• Voeg textuur toe via materialen (rotan, linnen, jute)")]),
        block([span("• Gebruik blauw subtiel (1-2 kussens)")]),
        block([span("• Kies verweerd boven nieuw")]),
        block([span("• Laat licht centraal staan")]),
        block([
          span("Coastal interieur werkt omdat het universele thema's raakt: licht, ruimte, rust. Het is niet regionaal - deze principes werken overal. Geen strand nodig, wel gevoel voor balans."),
        ]),
      ];
    },
  },
  {
    title: "Industrieel interieur: ruw en stoer zonder koud te worden",
    slug: "industrieel-interieur",
    excerpt: "Industrieel interieur is meer dan beton en staal. Ontdek hoe je industrial look warm en leefbaar maakt.",
    category: "inspiratie",
    tags: ["industrieel", "stijlen", "loft", "stoer"],
    author: "Sophie van der Berg",
    seoTitle: "Industrieel interieur warm maken: tips voor industrial style",
    seoDescription: "Industrieel interieur styling zonder koud effect: combineer ruw met warm, stoer met zacht. Praktische tips voor industrial look.",
    content: async () => {
      const verlichtingId = await getArticleId("verlichting-lagen");
      const verlichtingLink = verlichtingId ? linkMark(verlichtingId) : null;

      return [
        block([
          span("Industrieel interieur heeft een imagoprobleem: te koud, te hard, te mannelijk. Onterecht. Goed gedaan combineert industrial "),
          span("karakter", ["strong"]),
          span(" met "),
          span("warmte", ["strong"]),
          span(". Ruw naast zacht, stoer naast comfortabel."),
        ]),
        block([span("Basis: materialen met verhaal")], "h2"),
        block([
          span("Beton: muren, vloeren (warmte toevoegen via kleden). Staal: kozijnen, lampen, kasten. Hout: oud, gebruikt, onbehandeld (geen glad lakwerk). Baksteen: bloot, origineel, rood of wit. Leer: vintage, verweerd (geen nieuw glimmend leer)."),
        ]),
        quote("Industrieel werkt als je ruw combineert met warm - niet ruw op ruw."),
        block([span("Kleurenpalet: neutraal met punch")], "h2"),
        block([
          span("Basis: grijs, zwart, wit, beton. Hout: warme bruintinten. Accenten: roest, oker, donkergroen, cognac (leer). Vermijd: pastelkleuren (te zacht), felle kleuren (te druk)."),
        ]),
        block([span("Meubels: robuust met karakter")], "h2"),
        block([
          span("Houten tafels met stalen onderstel. Leren banken (vintage look). Metalen kasten (fabriekssfeer). Houten planken op stalen buizen. Vintage werkbanken als dressoir. Geen nieuwe IKEA - zoek tweedehands met verhaal."),
        ]),
        block([span("Verlichting: icoon van industrial")], "h2"),
        block([
          span("Losse snoeren (geen inbouw). Metalen hangende lampen. Fabriekslampen (origineel of replica). Edison gloeilampen (warm licht). Spotjes op rails. "),
          ...(verlichtingLink ? [span("Verlichting in lagen", [verlichtingLink.key])] : [span("Verlichting in lagen")]),
          span(" is cruciaal voor sfeer."),
        ], "normal", verlichtingLink ? [verlichtingLink.def] : []),
        block([span("Warmte toevoegen (essentieel!)")], "h2"),
        block([span("• Textiel: wollen plaids, linnen kussens, vloerkleden")]),
        block([span("• Groen: grote planten (verzacht harde lijnen)")]),
        block([span("• Hout: massief, onbehandeld, met nerven")]),
        block([span("• Leer: cognac/bruin (warmer dan zwart)")]),
        block([span("• Verlichting: warm wit (geen koud wit!)")]),
        block([span("Wat industrial NIET is")], "h2"),
        block([span("• All-beton kantoorruimte")]),
        block([span("• Zwart-wit alleen (te steriel)")]),
        block([span("• Overdaad aan metaal (te koud)")]),
        block([span("• Nieuwe meubels met 'industrial look' (te glad)")]),
        block([span("• Lege fabriekslook (te kaal)")]),
        block([span("Industrieel per ruimte")], "h2"),
        block([span("Woonkamer: leren bank, houten salontafel met staal, metalen kast, betonlook vloer, wollen kleed")]),
        block([span("Keuken: open planken op buizen, betonnen blad, zwarte kranen, stalen fronten")]),
        block([span("Slaapkamer: houten bed, metalen nachtkastjes, linnen beddengoed, wollen plaid, fabriekslamp")]),
        block([span("Badkamer: betonlook tegels, zwarte kranen, houten plank, metalen spiegel")]),
        block([span("Budget-friendly industrial")], "h2"),
        block([span("• Steigerhout voor tafels/planken (goedkoop, authentiek)")]),
        block([span("• Marktplaats voor vintage fabriekslampen")]),
        block([span("• Betonlook verf (goedkoper dan echte betonvloer)")]),
        block([span("• Steigerbuizen voor stellen (zelf bouwen)")]),
        block([span("• Kringloop voor oude metalen kasten")]),
        block([span("Mix industrial met andere stijlen")], "h2"),
        block([
          span("Industrial + Scandinavisch = warme minimalisme. Industrial + Bohemian = ruw met kleur. Industrial + Modern = strak en stoer. Industrial werkt als basis, niet als dictatuur."),
        ]),
        block([span("Veelgemaakte fouten")], "h2"),
        block([span("• Te veel metaal (wordt koud)")]),
        block([span("• Geen textiel (te hard)")]),
        block([span("• Alles nieuw (verliest authenticiteit)")]),
        block([span("• Geen groen (te steriel)")]),
        block([span("• Koud wit licht (industrieel vraagt warm licht)")]),
        block([span("Praktische tips")], "h2"),
        block([span("• Begin met één statement piece (vintage kast, fabriekslamp)")]),
        block([span("• Voeg direct warmte toe (kleed, plaid, kussens)")]),
        block([span("• Kies warm wit licht (2700K)")]),
        block([span("• Mix oud en nieuw (niet alles hoeft vintage)")]),
        block([span("• Gebruik groen (grote planten verzachten)")]),
        block([
          span("Industrieel interieur werkt omdat het eerlijk is: materialen zonder poespas, functionaliteit zonder flauwekul. Maar eerlijk is niet hetzelfde als kaal. Warmte maakt industrial leefbaar."),
        ]),
      ];
    },
  },
  {
    title: "Bohemian interieur: vrije geest zonder rommel",
    slug: "bohemian-interieur",
    excerpt: "Bohemian interieur is kleurrijk en persoonlijk zonder chaotisch te worden. Ontdek hoe je boho stijl toepast met balans.",
    category: "inspiratie",
    tags: ["bohemian", "boho", "stijlen", "kleurrijk"],
    author: "Sophie van der Berg",
    seoTitle: "Bohemian interieur: boho styling met balans en rust",
    seoDescription: "Bohemian interieur zonder chaos: kleurrijke boho styling met structuur. Praktische tips voor eclectic look met rust.",
    content: async () => {
      const kleurpsychologieId = await getArticleId("kleurpsychologie");
      const kleurLink = kleurpsychologieId ? linkMark(kleurpsychologieId) : null;

      return [
        block([
          span("Bohemian interieur lijdt aan een pr-probleem: mensen denken chaos, rommel, hippie-overdaad. Fout. Echte boho is "),
          span("vrijheid", ["strong"]),
          span(" binnen "),
          span("structuur", ["strong"]),
          span(", kleur met balans, persoonlijkheid zonder puinhoop."),
        ]),
        block([span("Wat is bohemian eigenlijk?")], "h2"),
        block([
          span("Mix van culturen, tijdperken en stijlen. Reisherinneringen en vintage vondsten. Textuur en laagjes. Kleur met beheersing. Persoonlijkheid boven perfectie. Het is niet stijl - het is mentaliteit."),
        ]),
        quote("Bohemian is vrijheid binnen structuur - niet chaos zonder regels."),
        block([span("Kleurenpalet: rijk maar coherent")], "h2"),
        block([
          span("Basis: natuurlijke tinten (terracotta, oker, mosterd). Accenten: diep rood, turquoise, paars, roestoranje. Neutraal: crème, beige (geen fel wit). Groen: via planten (veel!). "),
          ...(kleurLink ? [span("Kleurpsychologie", [kleurLink.key])] : [span("Kleurpsychologie")]),
          span(" helpt kleuren te combineren zonder chaos."),
        ], "normal", kleurLink ? [kleurLink.def] : []),
        block([span("Materialen: natuurlijk en gevarieerd")], "h2"),
        block([
          span("Hout: donker, gedateerd, exotisch. Textiel: katoen, linnen, wol, fluweel. Rotan en riet: stoelen, manden, lampenkappen. Leer: vintage, patches, verweerd. Keramiek: handgemaakt, imperfect. Metaal: messing, koper (geen chroom)."),
        ]),
        block([span("Meubels: mix en persoonlijk")], "h2"),
        block([
          span("Vintage bank met moderne fauteuil. Houten kist als salontafel. Rieten stoel naast fluwelen poef. Oude ladder als plantenrek. Geen sets - elke stuk eigen verhaal."),
        ]),
        block([span("Textiel: laagjes en textuur")], "h2"),
        block([span("Kleden op kleden (klein op groot). Kussens in verschillende patronen (maar binnen kleurenschema). Plaids over banken en stoelen. Gordijnen in natuurlijke stoffen. Macramé wandkleden (subtiel!).")]),
        block([span("Planten: essentieel element")], "h2"),
        block([span("Veel groen: grote planten (monstera, ficus), hangplanten, kleine cactussen. Gevarieerde potten (keramiek, manden, terracotta). Op planken, in hangende manden, op vloer. Groen verbindt kleuren en verzacht.")]),
        block([span("Decoratie: persoonlijk en gevonden")], "h2"),
        block([span("Reisherinneringen (maar selectief). Vintage vondsten met verhaal. Handgemaakt (keramiek, textiel). Boeken (zichtbaar, gestapeld). Kaarsen en wierook. Spiegels met frames (messing, hout).")]),
        block([span("Verlichting: warm en gevarieerd")], "h2"),
        block([span("Rieten lampenkappen. Marokkaanse lantaarns. Lichtketjes (subtiel, niet kermis). Kaarsen overal. Warme gloeilampen (geen LED koud wit).")]),
        block([span("Structuur binnen vrijheid")], "h2"),
        block([span("• Kies één kleurenschema (blijf erbij)")]),
        block([span("• Groepeer decoratie (niet overal verspreid)")]),
        block([span("• Ruimte tussen spullen (niet volproppen)")]),
        block([span("• Neutrale basis (muren, grote meubels)")]),
        block([span("• Opbergen (manden, dozen - rommel weg)")]),
        block([span("Wat bohemian NIET is")], "h2"),
        block([span("• Rommel en chaos")]),
        block([span("• Alles paars/roze/turquoise (kleurenoverload)")]),
        block([span("• Hippie-kostuum (te thematisch)")]),
        block([span("• Geen focus (boho vraagt balans)")]),
        block([span("• Goedkoop-exotisch (kies kwaliteit)")]),
        block([span("Bohemian per ruimte")], "h2"),
        block([span("Woonkamer: fluwelen bank, vintage vloerkleed, veel kussens, rotan fauteuil, grote planten")]),
        block([span("Slaapkamer: laagjes textiel, macramé boven bed, planten, zachte verlichting, kleurrijke kussens")]),
        block([span("Keuken: open planken met kleurrijke servies, planten op aanrecht, houten accessoires")]),
        block([span("Werkkamer: vintage bureau, kleurrijke stoel, veel groen, persoonlijke decoratie")]),
        block([span("Budget-friendly boho")], "h2"),
        block([span("• Kringloop voor vintage meubels en decoratie")]),
        block([span("• Marktplaats voor rotan (vaak goedkoop)")]),
        block([span("• Zelf maken: macramé, kussens, geverfde potten")]),
        block([span("• Planten stekken (gratis groen)")]),
        block([span("• Textiel bij Xenos/HEMA (goedkoop maar boho-look)")]),
        block([span("Veelgemaakte fouten")], "h2"),
        block([span("• Te veel kleuren tegelijk (kies schema)")]),
        block([span("• Alles nieuw kopen (boho is vintage)")]),
        block([span("• Geen editing (te veel decoratie)")]),
        block([span("• Perfectie zoeken (boho is imperfectie)")]),
        block([span("• Geen groen (planten zijn essentieel)")]),
        block([span("Praktische tips")], "h2"),
        block([span("• Begin met neutrale basis")]),
        block([span("• Kies 3-4 kleuren max")]),
        block([span("• Koop geleidelijk (niet alles tegelijk)")]),
        block([span("• Verzamel met verhaal (niet random)")]),
        block([span("• Opruimen is onderdeel van boho (edit regelmatig)")]),
        block([
          span("Bohemian werkt omdat het menselijk is: imperfect, persoonlijk, gelaagd. Maar menselijk zonder structuur is chaos. De kunst is balans vinden tussen vrijheid en controle."),
        ]),
      ];
    },
  },
];

async function createInspiratieArticles() {
  console.log("\n✍️  CREATING 3 INSPIRATIE ARTICLES\n");

  for (const article of inspiratieArticles) {
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
  console.log(`✅ Created ${inspiratieArticles.length} articles`);
  console.log(`${"=".repeat(60)}\n`);
}

createInspiratieArticles();
