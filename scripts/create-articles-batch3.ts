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
    title: 'Natuurlijke materialen: warmte en karakter',
    slug: 'natuurlijke-materialen',
    excerpt: 'Natuurlijke materialen brengen leven in je interieur. Hout, linnen, klei – materialen die ademen en mooier worden met de tijd.',
    category: 'Materialen',
    tags: ['natuurlijke materialen', 'hout', 'linnen', 'duurzaam'],
    body: [
      p('Er is een reden waarom natuurlijke materialen nooit uit de mode raken: ze voelen goed. Letterlijk. Hout onder je hand, linnen tegen je huid, een klei vaas die koelte uitstraalt. Deze materialen hebben textuur, variatie, imperfectie. Ze zijn echt.'),
      bold('En ze worden mooier met de tijd', '', '. Plastic veroudert – lelijk. Hout veroudert – patina. Dat verschil maakt alles.'),
      
      h2('Hout: het fundament'),
      p('Hout is basis. Het brengt warmte, het isoleert geluid, het voelt prettig. En het is oneindig veelzijdig – van ruwe balken tot verfijnd fineer.'),
      p('Voor meubels: kies massief waar het kan. Een massief houten tafelblad overleeft generaties. Je kunt het schuren, oliën, repareren. Fineer of spaanplaat? Na tien jaar ben je het zat en kun je het niet meer redden.'),
      quote('Massief hout is een investering die zichzelf terugbetaalt – letterlijk.'),
      bold('Houtsoorten kiezen', '', ': eiken en essen voor lichte, Scandinavische look. Walnoot en teak voor warmte en rijkdom. Grenenhout voor budgetvriendelijke projecten, maar dan wel mooi behandeld.'),
      p('Afwerking: olie laat de textuur en kleur het best zien. Was geeft bescherming met een naturlijke look. Lak werkt als je bescherming nodig hebt (tafelblad, vloer), maar kies dan matte lak – hoogglans lak doet hout teniet.'),
      
      h2('Linnen en katoen: textiel dat ademt'),
      p('Synthetische textiel voelt altijd een beetje... off. Te glad, te perfect, geen ademing. Natuurlijk textiel leeft mee met seizoenen, met gebruik, met was.'),
      bold('Linnen is koning', '', ' voor interieur. Gordijnen, kussens, beddengoed, tafellakens. Het kreukelt (en dat is prima), het wordt zachter na elke wasbeurt, het werkt zomer en winter.'),
      p('Katoen is de werkpaard. Duurzaam, wasbaar, betaalbaar. Kies voor zwaarder gewicht katoen (canvas, geweven katoen) voor banken en kussens – lichter katoen is voor kleding, niet voor interieur.'),
      p('Wol: voor warmte. Wollen kleden, plaids, kussens. Ja, het is duurder. Ja, het is het waard. Een goed wollen kleed gaat dertig jaar mee en wordt alleen maar mooier.'),
      
      h2('Klei en keramiek: handwerk voelbaar'),
      p('Industrieel geproduceerd aardewerk is prima. Maar handgemaakt keramiek heeft iets wat machine-made mist: variatie. Geen twee stuks zijn hetzelfde. Je ziet de hand van de maker.'),
      p('Gebruik keramiek voor de dingen die je dagelijks ziet: een broodpot op het aanrecht, vazen voor bloemen, schalen voor fruit. Deze objecten krijgen betekenis door gebruik.'),
      quote('Schoonheid in imperfectie – dat is wabi-sabi, en dat is waarom handmade keramiek werkt.'),
      bold('Terracotta', '', ' verdient speciale vermelding. Warm, aards, tijdloos. Voor plantenpotten, schalen, zelfs vloertegels. Het brengt direct warmte in elk interieur.'),
      
      h2('Steen en beton: ruw en edel'),
      p('Natuursteen – marmer, graniet, kalksteen, travertijn – heeft luxe zonder opzichtig te zijn. Het is gewoon... mooi materiaal.'),
      p('Gebruik het selectief. Een marmeren salontafel, een travertijn vensterbank, kalkstenen tegels. Het zijn investeringen, maar ze gaan letterlijk een leven lang mee.'),
      bold('Beton is het alternatief', '', ' als steen te duur is. Betonnen werkblad, betonnen wasbak, betonnen plantenbak. Het heeft dezelfde eerlijkheid als steen – het is wat het is, geen imitatie.'),
      p('Belangrijk: laat de textuur zien. Gepolijst beton met zichtbare luchtbellen, steen met natuurlijke variatie, niet de perfect gladde showroom versie.'),
      
      h2('Rotan en riet: luchtig vakmanschap'),
      p('Deze materialen zijn terug van weggeweest. Niet de jaren-70 donkere rotan, maar lichte, moderne designs in natuurlijke tinten.'),
      p('Rotan fauteuils, rieten manden, gevlochten lampenkappen. Het brengt textuur zonder gewicht. Perfect voor stijlen die lucht en licht nodig hebben – denk coastal, Scandinavisch, Japandi.'),
      p('En het is handwerk. Elke rieten mand is gevlochten door iemand die het vak kent. Dat respect voor vakmanschap past bij de filosofie van natuurlijke materialen.'),
      
      h2('Leer: patina door gebruik'),
      bold('Echt leer', '', ', niet de nep versie. Ja, het is duurder. Maar leer wordt mooier naarmate je het gebruikt. Het kleurt, het wordt soepeler, het krijgt glans op de plekken waar je vaak zit.'),
      p('Een leren bank is een investering voor tien tot twintig jaar. Kies voor vegetaal gelooid leer (beter voor milieu, mooiere veroudering) in natuurlijke kleuren – cognac, donkerbruin, zwart.'),
      p('Gebruik leer ook voor kleine dingen: leren handvatten aan kasten, leren kussens, een leren vloerkleed (ja, dat bestaat). Het voegt instant warmte en rijkdom toe.'),
      
      h2('Combineren van materialen'),
      p('De kunst is het mengen. Te veel van één materiaal wordt monotoon. De juiste mix geeft diepte.'),
      quote('Elke ruimte heeft hard en zacht nodig, ruw en glad, mat en glanzend.'),
      p('Voorbeeld woonkamer: houten vloer, leren bank, linnen kussen, wollen kleed, keramische vaas, marmeren salontafel. Elk materiaal heeft zijn plek, ze versterken elkaar.'),
      bold('Regel', '', ': minimaal drie verschillende natuurlijke materialen per ruimte. Anders wordt het te eendimensionaal.'),
      
      h2('Waarom het werkt'),
      p('Natuurlijke materialen sluiten aan bij hoe we evolved zijn. Duizenden jaren hebben we tussen hout, steen, vezels geleefd. Plastic is honderd jaar oud. Ons brein herkent natural als "thuis".'),
      p('Daarnaast: natural materials veranderen met seizoenen. Hout expand in vochtige maanden, trekt samen in droge. Linnen voelt koel in zomer, hugs je in winter. Ze leven mee, in plaats van statisch te zijn.'),
      p('En ten slotte: ze verouderen goed. Schade en slijtage worden patina in plaats van afval. Dat maakt ze duurzaam – niet alleen ecologisch, maar ook emotioneel. Je gooit ze niet weg na vijf jaar.'),
    ],
  },
  {
    title: 'Kleurpsychologie in interieur: hoe kleuren je beïnvloeden',
    slug: 'kleurpsychologie',
    excerpt: 'Kleuren doen meer dan mooi zijn – ze beïnvloeden je stemming en energie. Zo gebruik je kleurpsychologie slim in je interieur.',
    category: 'Kleur',
    tags: ['kleur', 'psychologie', 'interieur kleuren', 'stemming'],
    body: [
      p('Kleur doet iets met je. Wetenschappelijk bewezen. Blauw vertraagt je hartslag. Rood verhoogt je alertheid. Groen ontspant. Dit is geen soft science, maar gemeten effect.'),
      bold('Voor interieur betekent dit', '', ': de kleuren die je kiest bepalen mede hoe je je voelt in een ruimte. Slim gebruik maakt je huis niet alleen mooier, maar ook prettiger om in te zijn.'),
      
      h2('Blauw: rust en focus'),
      p('Blauw is de meest universeel geliefde kleur. Het is gekoppeld aan luchten zee – dingen die we als rustig ervaren. Het verlaagt bloeddruk en hartslag. Perfect voor ruimtes waar je wilt ontspannen of concentreren.'),
      p('In de praktijk: slaapkamers, badkamers, werkruimtes. Kies wel de juiste tint. Licht blauw (hemelsblauw) is sereen en luchtig. Diep blauw (navy) is sophisticated maar kan somber worden in kleine ruimtes zonder veel licht.'),
      quote('Blauwe ruimtes voelen koeler – letterlijk. Je thermostat instelling kan een graadje lager.'),
      bold('Combineer blauw met warm', '', ' om het toegankelijker te maken. Blauw met hout, blauw met terracotta, blauw met brass. Anders wordt het kil.'),
      
      h2('Groen: balans en natuur'),
      p('Groen is de kleur die ons brein het minst inspanning kost om te verwerken. Het is de achtergrondkleur van natuur – where we evolved. Het brengt balans en rust, zonder slaapverwekkend te zijn.'),
      p('Groen werkt overal: woonkamers, keukens, badkamers, slaapkamers. De tint bepaalt de vibe. Licht mintgroen is fris en luchtig. Olijfgroen is aards en sophisticated. Donkergroen (forest green) is rijk en omkullend.'),
      p('Makkelijkste manier om groen toe te voegen: planten, natuurlijk. Maar ook: groene muren (in de juiste tint), groene textiel, groene keramiek. Het is een kleur die  nooit te veel wordt.'),
      
      h2('Geel: energie en vrolijkheid'),
      bold('Geel is de vrolijkste kleur', '', ' – het activeert de same brain areas as happiness. Maar let op: te veel geel, te fel, of in de verkeerde ruimte kan stress veroorzaken.'),
      p('Gebruik geel als accent, niet als dominant kleur. Geel in kussens, kunst, een enkele gele stoel. In ruimtes waar energie welkom is: keuken, werkplek, hal.'),
      p('Voor muren: alleen als je gedempt geel kiest (mosterd, oker, bleek geel) en in ruimtes met veel licht. Fel geel in een kleine ruimte zonder daglicht is overweldigend.'),
      quote('Geel is als cafeïne voor je ruimte – een beetje maakt het levendig, te veel maakt het nerveus.'),
      
      h2('Rood: passie en energie'),
      p('Rood is de meest activerende kleur. Het verhoogt je hartslag en alertheid. Spannend, maar ook uitputtend. Je wilt er niet 24/7 door omringd zijn.'),
      p('Gebruik rood spaarzaam. Een rood accent muur in de eetruimte (rood stimuleert eetlust en conversatie). Rode kussens in de woonkamer. Een rood kunstwerk.'),
      bold('Vermijd rood in slaapkamers', '', ' (te activerend) en werkruimtes (te afleidend). Tenzij je heel gedempt rood doet – terracotta, roestoranje, donkerrood. Die tinten hebben de warmte zonder de intensiteit.'),
      
      h2('Paars: creativiteit en luxe'),
      p('Paars is historically de kleur van royalty – het was duur om te maken. Die associatie met luxe blijft. Het stimuleert ook creative thinking.'),
      p('Gebruik paars in creatieve ruimtes: atelier, kantoor, leeshoek. Kies wel de juiste tint. Licht lavendel is kalmerend. Diep aubergine is rijk en luxe. Fel paars is... veel.'),
      p('Paars is lastig te combineren. Het werkt met: grijs, wit, hout, goud. Het botst met: de meeste other colors. Dus: paars als accent in een neutrale basis.'),
      
      h2('Oranje: warmte en socialiteit'),
      bold('Oranje is de sociable kleur', '', '. Het moedigt gesprek en interactie aan. Perfect voor ruimtes waar mensen samenkomen: eetkamer, woonkamer, keuken.'),
      p('Maar oranje kan snel overwelming worden. Gebruik het in gedempt tinten: terracotta, roestoranje, abrikoos, perzik. Deze aardse tinten hebben de warmte zonder de intensity.'),
      p('Combineer met neutrale: oranje met beige, oranje met grijs, oranje met hout. En use it sparingly – een oranje plaid, terracotta potten, een roestoranje kussen.'),
      
      h2('Roze: zacht en kalmerend'),
      p('Roze heeft een bad reputation (te girlish), maar de juiste tint is universally calming. Er is zelfs een specifieke tint (Baker-Miller pink) die proven aggressive gedrag vermindert.'),
      quote('Roze is de meest underused kleur in interieur – terwijl het zo effectief is.'),
      p('Use het in zachte tinten: blush, dusty rose, terracotta-roze. Perfect voor slaapkamers, badkamers, leeshoeken. Het is warm zonder activerend te zijn.'),
      bold('Combineer met grijs of groen', '', ' voor sophisticated look. Roze en grijs is classic en elegant. Roze en groen is natuurlijk en balanced.'),
      
      h2('Zwart, wit, grijs: de non-colors'),
      p('Deze hebben ook psychologisch effect, al zijn het technically geen kleuren.'),
      p('Wit: ruimtelijk, clean, minimalistisch. Maar te veel wit kan steriel voelen. Zwart: sophisticated, grounding, maar kan somber worden. Grijs: balans tussen de twee, maar risico van saaiheid.'),
      p('De kunst: combineer ze met kleur en textuur. Een witte ruimte met hout en groen is sereen. Een zwarte muur met warme verlichting is cozy. Grijs met terracotta is warm.'),
      
      h2('Praktisch toepassen'),
      bold('Stap 1', '', ': bepaal de functie van de ruimte. Ontspanning? Kies blauw of groen. Energie? Kies geel of oranje accenten. Focus? Kies blauw of grijs.'),
      p('Stap 2: kies je dominant kleur (vaak neutraal) en je accent kleur (de psychologische kleur). 70% neutraal, 30% kleur.'),
      p('Stap 3: test het. Verf een groot stuk karton en hang het een week in de ruimte. Kijk hoe het je laat voelen op different momenten van de dag.'),
      p('En onthoud: jouw reactie is leading. Kleurpsychologie geeft guidelines, maar jouw persoonlijke associatie met kleuren is sterker. Als jouw oma een blauwe keuken had waar je fijne herinneringen aan hebt, dan werkt blauw voor jou in de keuken – ook al is dat niet de typische kleurkeuze.'),
    ],
  },
];

// Add remaining articles...
const moreArticles = [
  {
    title: 'Kleine ruimtes groter laten lijken: tricks die werken',
    slug: 'kleine-ruimtes',
    excerpt: 'Een kleine ruimte hoeft geen beperking te zijn. Met de juiste trucs maak je elke ruimte groter zonder verbouwen.',
    category: 'Tips',
    tags: ['kleine ruimtes', 'ruimte creëren', 'optische illusie', 'interieur tips'],
    body: [
      p('Kleine ruimte, groot probleem? Niet per se. Je kunt geen vierkante meters tovoegen zonder verbouwen, maar je kunt wel de ruimte optisch groter maken. En dat perceptie-verschil is vaak genoeg.'),
      bold('De trucs die echt werken', '', ': licht, spiegels, kleur, meubel keuze. Niet één ding maakt het verschil, maar de combinatie.'),
      
      h2('Licht: de belangrijkste factor'),
      p('Donkere ruimtes voelen klein. Lichte ruimtes voelen groot. Maximaliseer je daglicht, voeg kunstlicht toe in lagen.'),
      p('Houd ramen vrij – geen zware gordijnen die licht blokkeren. Gebruik transparante of lichte gordijnen die privacy geven maar licht doorlaten. Of helemaal geen gordijnen als het kan.'),
      quote('Meer licht = meer ruimte. Altijd.'),
      bold('Kunstlicht in alle hoeken', '', '. Een donkere hoek maakt een ruimte kleiner. Light up elke hoek met floor lamps, wall sconces, of tafellampen. Je ruimte voelt instant groter.'),
      
      h2('Spiegels: de nummer één trick'),
      p('Spiegels verdubbelen je ruimte visueel. Een grote spiegel tegenover een raam reflecteert daglicht en uitzicht – je ruimte lijkt twee keer zo groot.'),
      p('Hang spiegels strategisch: tegenover ramen, achter lichtbronnen, in donkere hoeken. Een spiegel achter een plank of console geeft instant diepte.'),
      bold('Grote spiegel werkt beter', '', ' dan veel kleine. Eén floor-to-ceiling spiegel heeft meer impact dan een gallery wall van kleine spiegels.'),
      p('Let op: spiegel niet tegenover rommelige plekken. Dan verdubbel je de rommel in plaats van de ruimte.'),
      
      h2('Kleur: licht en uniform'),
      p('Lichte kleuren reflecteren licht, donkere absorberen. Voor kleine ruimtes: light and bright.'),
      p('Verf muren, plafond en kozijnen in dezelfde lichte kleur. Dat elimineert visuele breaks en maakt de ruimte groter. Gebroken wit, lichtgrijs, zacht beige – alles wat licht weerkaatst.'),
      p('En ja, je kunt donkere accenten hebben. Maar gebruik ze minimaal en strategisch – een donkere zwevende plank, een zwart frame. Niet een hele donkere muur in een kleine ruimte.'),
      
      h2('Meubels: laag en less'),
      bold('Lagere meubels maken plafonds hoger', '', '. Een lage bank, lage salontafel, lage kasten. Er is meer space tussen meubel en plafond, wat de ruimte opener maakt.'),
      p('Fewer meubels = meer vloer visible = ruimte lijkt groter. Edit hard: alleen essentials. Een kleine woonkamer needs een bank en salontafel, niet ook nog twee fauteuils en een bijzettafel.'),
      p('Kies meubels met legs – floating meubels laten vloer zien, wat ruimte geeft. Solid blocks tot de grond maken een ruimte zwaar.'),
      quote('Als de vloer zichtbaar is, lijkt de ruimte groter.'),
      
      h2('Multi-functionele meubels'),
      p('In kleine ruimtes moet elk meubel meerdere jobs doen. Een bank met opbergruimte onder de zitting. Een salontafel die omhoog kan als eettafel. Een bed met laden eronder.'),
      bold('Murphy bed', '', ' (opklapbed) is de ultimate space saver. Overdag is het een kast, \'s nachts een bed. Perfect voor studio\'s.'),
      p('Nesting tables: kleine tafeltjes die onder elkaar schuiven. Je hebt ze alleen uit als je ze nodig hebt.'),
      
      h2('Verticale ruimte benutten'),
      p('Kleine ruimte = beperkte vloer. Maar je hebt wél muren en hoogte. Use it.'),
      p('Floor-to-ceiling boekenkasten in plaats van lage. Hoge kasten in plaats van brede. Je krijgt meer opbergruimte zonder vloer te offeren.'),
      bold('Hang dingen op', '', ': fietsen aan de muur, plants hangend, wandplanken voor opslag. Alles wat niet op de vloer staat, geeft ruimte.'),
      
      h2('Minder spullen'),
      p('Klinkt simpel, maar dit is vaak het probleem. Te veel stuff maakt elke ruimte klein, hoe groot ook.'),
      p('Edit agressief. Als je het niet gebruikt of het brengt geen blijdschap: weg. Minder visuele clutter = meer ruimte.'),
      quote('Je ruimte is groot genoeg als je minder spullen hebt.'),
      p('Hidden storage: alles wat je nodig hebt maar niet mooi is, moet weg in kasten, dozen, manden. Alleen items die mooi zijn mogen zichtbaar zijn.'),
      
      h2('Vloeren en lijnen'),
      p('Langwerpige patronen maken ruimtes langer. Horizontale planken verbreden een smalle ruimte. Verticale strepen maken het plafond hoger.'),
      bold('Vloer doorleggen', '', ' in meerdere ruimtes (geen drempels, geen kleurverschil) maakt je hele huis groter. Het oog stopt niet bij elke deuropening.'),
      p('Large scale patterns werken better dan small. Een groot vloerkleed geeft rust, een klein patroon maakt het druk. En druk = kleiner.'),
    ],
  },
  {
    title: 'Verlichting in lagen: algemeen, taak en accent',
    slug: 'verlichting-lagen',
    excerpt: 'Goede verlichting werk je in lagen. Één plafondlamp is niet genoeg – je hebt algemeen, taak en accent licht nodig.',
    category: 'Verlichting',
    tags: ['verlichting', 'lampen', 'licht ontwerp', 'sfeer'],
    body: [
      p('Eén plafondlamp is rookie mistake nummer één. Het geeft vlak licht, harde schaduwen, geen sfeer. Professionele lighting bestaat uit drie lagen: algemeen licht (overall brightness), taak licht (functioneel), accent licht (sfeer en diepte).'),
      bold('Elk heeft een rol', '', ', en je hebt ze alle drie nodig voor een ruimte die works.'),
      
      h2('Laag 1: algemene verlichting'),
      p('Dit is je basis licht – overall visibility. Het hoeft niet bright te zijn, wel voldoende om veilig te kunnen bewegen en de ruimte als geheel te zien.'),
      p('Meestal: plafondverlichting. Centraal armatuur, inbouwspots, rails, of een hanglamp. Maar hier is de trick: het moet dimbaar zijn. Bright when you need it, soft when you don\'t.'),
      quote('Algemene verlichting op volle kracht is alleen nodig als je aan het schoonmaken bent.'),
      bold('Indirect light werkt beter', '', ' dan direct. Uplighters die het plafond verlichten, inbouwspots die naar de muren schijnen. Het geeft soft overall light zonder scherp te zijn.'),
      
      h2('Laag 2: taakverlichting'),
      p('Dit is functioneel licht voor specifieke activities: lezen, koken, werken, make-up.'),
      p('Woonkamer: leeslamp bij de bank, staande lamp bij de fauteuil. Keuken: onderkastverlichting boven het aanrecht, goede verlichting boven het kookeiland. Badkamer: direct licht bij de spiegel voor scheren/make-up. Werkkamer: bureaulamp.'),
      bold('Taak licht moet bright genoeg zijn', '', ' voor de taak, maar alleen dáár. Een leeslamp verlicht je boek, niet de hele kamer. Dat focus geeft sfeer.'),
      
      h2('Laag 3: accentverlichting'),
      p('Dit is waar het mooi wordt. Accent light geeft depth, drama, sfeer. Het verlicht objecten, kunst, architectuur.'),
      p('Picture lights boven kunst. Spotjes die een plant van onderen verlichten. LED strips achter de TV of onder kasten. Kaarsen (yes, ook verlichting). String lights (als het niet te festival wordt).'),
      quote('Accent licht maakt het verschil tussen "ruimte is verlicht" en "ruimte heeft sfeer".'),
      p('Use it om eye te trekken naar wat mooi is: een mooie vaas, een kunst stuk, een bijzonder meubel. En om diepte te creëren – een verlichte hoek in een verder dimly lit ruimte geeft dimensie.'),
      
      h2('De balans tussen de lagen'),
      bold('Je wilt contrast tussen je lagen', '', '. Als alles even bright is, wordt het vlak. Als je taak licht harder is dan je algemeen licht, krijg je focus. Als je accent licht spots van beauty creëert, krijg je interesse.'),
      p('In de praktijk: dim je algemeen licht naar 30-50%, gebruik taak licht waar je actief bent, laat accent licht drama geven.'),
      p('\'s Avonds: algemeen licht laag (of uit), taak licht waar nodig, accent licht aan. Dat geeft die cozy atmosphere die plafondlicht nooit kan geven.'),
      
      h2('Kleurtemperatuur: warm versus koel'),
      p('Kelvins – de maat voor kleurtemperatuur. 2700K is warm (gelig), 4000K is neutraal, 6000K is koel (blauwit).'),
      p('Voor woonruimtes: 2700-3000K. Warm licht is cozy en flattering. Voor werkruimtes: 3500-4000K. Iets cooler houdt je alert zonder harsh te zijn. Badkamer: 3000-3500K. Warm genoeg voor flattery, bright genoeg voor functie.'),
      bold('Mix geen kleurtemperaturen', '', ' in één ruimte. Alle lampen same kelvin, anders wordt het unharmonious.'),
      
      h2('Dimmen is essentieel'),
      p('Ik herhaal: dimbare verlichting is not optional. Je wilt verschillende licht levels voor verschillende momenten.'),
      p('Ochtend: meer licht. Avond: minder licht. Feestje: ambient low. Schoonmaken: alles aan. Romantics: minimal. Je hebt controle nodig.'),
      quote('Een ruimte zonder dimmers is een ruimte zonder nuance.'),
      p('Modern: smart bulbs. Je regelt kleur én brightness met je phone. Worth it als je van control houdt. Anders: gewoon goede dimmer switches.'),
      
      h2('Praktisch per ruimte'),
      h3('Woonkamer'),
      p('Algemeen: plafond spots of central fixture (dimbaar). Taak: floor lamp bij bank, table lamp op sideboard. Accent: picture light boven kunst, uplight achter plant, kaarsen.'),
      
      h3('Keuken'),
      p('Algemeen: plafond spots. Taak: onderkast LED strips, pendant lights boven eiland. Accent: in-kast verlichting (glazen kastdeuren van binnen verlicht).'),
      
      h3('Slaapkamer'),
      bold('Algemeen: ceiling light', '', ' (barely gebruikt). Taak: nachtlamp/leeslamp beide zijden van het bed. Accent: string lights, candles, soft lamp op dresser.'),
      
      h3('Badkamer'),
      p('Algemeen: ceiling lights. Taak: verlichting beide zijden van spiegel (niet van boven – dat geeft schaduwen). Accent: LED strip achter spiegel, dimbare spots.'),
      
      h2('Budget allocatie'),
      p('Je hebt niet oneindige budget. Waar investeer je?'),
      bold('Priority 1', '', ': dimbare algemene verlichting. Dit is je foundation. Priority 2: goede taak licht waar je het most gebruikt (keuken, leeshoek, werkkamer). Priority 3: accent waar het most impact heeft (boven kunst, in donkere hoeken).'),
      p('Je hoeft niet alles in één keer. Start met basics, add accent licht over tijd. Maar doe het wel methodisch – niet random lampen kopen, maar denken in lagen.'),
    ],
  },
  {
    title: 'Trends 2026: wat blijft en wat gaat',
    slug: 'trends-2026',
    excerpt: 'Interieurtrends 2026 laten een verschuiving zien: weg van perfectie, terug naar vakmanschap en textuur. Dit zijn de trends die blijven.',
    category: 'Trends',
    tags: ['trends 2026', 'interieur trends', 'design trends'],
    body: [
      p('Trends komen en gaan. Maar 2026 markeert een duidelijke shift: weg van mass-productie en Instagram-perfectie, terug naar ambacht, textuur en bewust consumeren.'),
      bold('Dit zijn de trends die blijven', '', ' – en die je kunt negeren.'),
      
      h2('Trend 1: ambachtelijk boven perfect'),
      p('Goodbye gladde, perfecte finishes. Hello handmade, imperfect, characterful. Mensen zijn moe van de gelikte showroom look. Ze willen realness.'),
      p('Zie het in: handgemaakt keramiek met irregular glazuur, houten tafels met visible knopen, handgewoven textiel met slight imperfections. Wabi-sabi (Japanse beauty in imperfectie) is mainstream geworden.'),
      quote('Perfect is uit. Persoonlijk is in.'),
      bold('Wat dit betekent', '', ': investeer in handmade waar het telt. Niet alles hoeft artisanaal, maar je signature pieces wel. Die vaas op je dining table, dat kunstwerk, je servies.'),
      
      h2('Trend 2: textuur over kleur'),
      p('2024-2025 draaide om neutrals. 2026 draait nog steeds om neutrals, maar nú met texture. Kleur is subtiel, texture is loud.'),
      p('Denk aan: bouclé stoffen, chunky knits, ribbed textiel, raw linnen, travertijn stone, textured walls. Alles wat je voelen kunt, wat dimensie heeft.'),
      p('Dit past bij de ambachtstrend – texture impliceert handwork. En het maakt neutrale interieurs interessant zonder kleur te hoeven toevoegen.'),
      
      h2('Trend 3: curves everywhere'),
      bold('Rechte hoeken zijn uit', '', '. Curves zijn in. Ronde tafels, gebogen banken, arched doorways, organic shapes.'),
      p('Waarom: curves zijn softer, more human. After jaren van strakke minimalism is er verlangen naar zachtheid. Ook: curves take up more visual space, wat small rooms actually bigger laat lijken.'),
      p('Apply it: één curved element per ruimte is genoeg. Een round dining table, a curved sofa, an arched mirror. Te veel curves wordt cartoonish.'),
      
      h2('Trend 4: donkerder interieurs'),
      p('Light and bright is not the only way anymore. Donkere muren, rich tones, moody spaces zijn growing.'),
      p('Kleuren: forest green, navy, aubergine, chocolate brown, charcoal. Gebruikt met warmte (brass, wood, texture) wordt het cozy in plaats van dreary.'),
      quote('Donker is het nieuwe neutral – als je het goed doet.'),
      bold('Maar', '', ': alleen als je voldoende licht hebt. Donkere muren in een ruimte zonder daglicht wordt depressing. Donkere muren in a light-filled ruimte wordt dramatic.'),
      
      h2('Trend 5: maximalism (maar make it tasteful'),
      p('Minimalism dominated for years. Nu is er counter-movement: people want MORE. Meer color, meer pattern, meer personality.'),
      p('Maar niet chaos. Tasteful maximalism heeft nog steeds structure. Een strict color palette met lots of pattern. Of lots of objects, maar carefully curated.'),
      p('Think: gallery walls die heel wall innemen, shelves packed with books and objects, layered textiel, bold wallpaper. Gecontroleerde abundance.'),
      
      h2('Wat gaat weg'),
      p('All-white interiors. Te steriel, te impersonal. Fast furniture – IKEA-achtige meubels die je na 5 jaar weggooit. Matchy-matchy sets. Instagram-ready "perfect" corners die niet lived-in voelen.'),
      bold('Ook weg: ultra-minimalism', '', '. Not enough warmth. People want comfort. En: hyper-masculine industrial. Te hard, te cold. Modern industrial is softer, warmer.'),
      
      h2('Wat tijdloos blijft'),
      p('Natural materials (hout, stone, linen). Quality over quantity. Neutral bases met personality via accessories. Comfort boven aesthetics. Goede verlichting in layers.'),
      quote('Trends are fun, maar je basis moet tijdloos zijn.'),
      p('The trick: follow trends in easily changeable elementen (kussens, kunst, small furniture). Keep big investments (bank, eettafel, kasten) klassiek.'),
    ],
  },
];

const allArticles = [...articles, ...moreArticles];

async function createArticles() {
  console.log('Creating final batch...\n');
  
  for (const article of allArticles) {
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
  
  console.log(`\nFinal batch done! Created ${allArticles.length} articles.`);
}

createArticles().catch(console.error);
