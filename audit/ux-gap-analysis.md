# UX Gap Analysis — interieur.expert

Datum: 12 maart 2026
Status: Definitief

---

## Structuur per gap

- **Gap ID** — unieke identificatie
- **Titel** — korte beschrijving
- **Gerelateerde user stories** — welke scenario's worden geraakt
- **Waar** — pagina, component, of flow
- **Probleembeschrijving** — wat er mis is
- **UX impact** — effect op gebruikerservaring
- **UI impact** — effect op visuele interface
- **Toegankelijkheid** — effect op accessibility
- **SEO impact** — effect op zoekmachine-optimalisatie
- **Ernst** — HOOG / MIDDEL / LAAG
- **Vertrouwen** — hoe zeker we zijn van de analyse
- **Aanbevolen oplossing** — wat te doen

---

## GAP-01 — Zoekfunctie: lege staat zonder suggesties

| Veld | Waarde |
|------|--------|
| **Stories** | US-03, US-06, US-13 |
| **Waar** | `SmartSearchDialog` — initial open state |
| **Probleem** | Bij openen van het zoekvenster zonder query, de dialoog is volledig leeg. Geen suggesties, geen populaire termen, geen recente artikelen. |
| **UX impact** | Gebruiker die niet weet wat te zoeken krijgt geen hulp. Social-media bezoekers die een post herkennen willen, hebben geen startpunt. |
| **UI impact** | Grote lege ruimte in modale dialoog — voelt onaf. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Geen directe impact. |
| **Ernst** | HOOG |
| **Vertrouwen** | Hoog — geverifieerd in codebase |
| **Oplossing** | Toon bij leeg zoekveld: populaire tags (uit footer-data) en/of recente artikelen. Max 8-10 items. |

---

## GAP-02 — Zoekfunctie: geen-resultaten zonder alternatieven

| Veld | Waarde |
|------|--------|
| **Stories** | US-13 |
| **Waar** | `SmartSearchDialog` — no-results state |
| **Probleem** | Bij geen zoekresultaten toont het venster alleen "Geen resultaten gevonden voor '{query}'". Geen alternatieve suggesties, geen populaire termen, geen "probeer ook". |
| **UX impact** | Dead end. Gebruiker verlaat de site. |
| **UI impact** | Minimale lege staat voelt als een fout. |
| **Toegankelijkheid** | Tekst is leesbaar voor screenreaders. |
| **SEO** | Indirect: hogere bounce rate. |
| **Ernst** | HOOG |
| **Vertrouwen** | Hoog |
| **Oplossing** | Na "Geen resultaten" tekst, toon populaire zoektermen als klikbare links. "Probeer ook: verlichting, woonkamer, scandinavisch, keuken". |

---

## GAP-03 — Video-detailpagina: dead end, geen gerelateerde video's

| Veld | Waarde |
|------|--------|
| **Stories** | US-16 |
| **Waar** | `app/(site)/video/[slug]/page.tsx` |
| **Probleem** | Na het bekijken van een video is er geen "volgende video" of "meer video's" sectie. De pagina eindigt na de transcript en ad-slot. |
| **UX impact** | Dead end. Gebruiker moet terug navigeren. Verlies van sessieduur en engagement. |
| **UI impact** | Pagina voelt onvolledig vergeleken met artikelpagina's (die wél gerelateerde content hebben). |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Minder internal linking → lagere PageRank-distributie. |
| **Ernst** | HOOG |
| **Vertrouwen** | Hoog |
| **Oplossing** | Voeg "Meer video's" sectie toe met 3 video-thumbnails op basis van tags of recency. Gebruik bestaande `VideoThumbnail` component. |

---

## GAP-04 — Navigatie-labels onduidelijk voor nieuwe bezoekers

| Veld | Waarde |
|------|--------|
| **Stories** | US-06 |
| **Waar** | `SiteHeader` — navigatiebalk |
| **Probleem** | Het verschil tussen "Inspiratie", "Advies", en "Trends" is niet duidelijk. Alle drie leiden naar dezelfde layout (artikelenlijst). Geen subtitels, geen iconen, geen visueel onderscheid. |
| **UX impact** | Nieuwe bezoekers kiezen willekeurig of navigeren niet. Eerste indruk van sitestructuur is verwarrend. |
| **UI impact** | Navigatie ziet er consistent uit, maar mist informatiedichtheid. |
| **Toegankelijkheid** | Labels zijn leesbaar. Geen technisch probleem. |
| **SEO** | Geen directe impact. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Middel — afgeleid uit user-story analyse, niet uit gebruikersdata |
| **Oplossing** | Voeg subtitels toe bij hover op desktop (tooltip of uitklap): "Inspiratie — Stijlen en sfeerbeelden", "Advies — Praktische tips", "Trends — Wat is nieuw". |

---

## GAP-05 — Geen breadcrumbs op detailpagina's

| Veld | Waarde |
|------|--------|
| **Stories** | US-15, US-18 |
| **Waar** | Artikelpagina's, video's, dossiers, partners |
| **Probleem** | Geen breadcrumb-navigatie. Gebruiker weet niet waar hij is in de sitestructuur. Geen "terug naar dossier" wanneer een artikel bij een dossier hoort. |
| **UX impact** | Contextverlies, vooral bij dossier-flow. Gebruiker moet browser-back gebruiken. |
| **UI impact** | Mist visuele locatie-indicator. |
| **Toegankelijkheid** | Breadcrumbs zijn een WCAG best practice (2.4.8 Location). |
| **SEO** | Google kan BreadcrumbList JSON-LD gebruiken voor rich snippets. Gemiste kans. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Hoog |
| **Oplossing** | Breadcrumb-component: Home > [Categorie/Dossier] > [Artikeltitel]. Met JSON-LD BreadcrumbList schema. |

---

## GAP-06 — Zoekfunctie moeilijk vindbaar op mobiel

| Veld | Waarde |
|------|--------|
| **Stories** | US-03, US-06 |
| **Waar** | `SmartSearch` trigger in `SiteHeader` |
| **Probleem** | Op mobiel is de zoektrigger alleen een icoon zonder label. Het ⌘K-shortcut is alleen voor desktop/power users. Er is geen zichtbaar zoekveld in de header. |
| **UX impact** | Niet-tech-savvy gebruikers (US-06) herkennen het zoekicoon niet. Social-media bezoekers (US-03) die snel willen zoeken, vinden de functie niet. |
| **UI impact** | Zoekicoon is klein en zonder context. |
| **Toegankelijkheid** | `aria-label="Zoeken"` is aanwezig, maar visueel mist context. |
| **SEO** | Indirect: hoger bouncepercentage bij gebruikers die niet vinden wat ze zoeken. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Middel |
| **Oplossing** | Overweeg: mini-zoekveld in header op desktop (placeholder "Zoek artikels...") en/of label "Zoek" naast icoon op mobiel. |

---

## GAP-07 — Partner-listing niet filterbaar

| Veld | Waarde |
|------|--------|
| **Stories** | US-02, US-04, US-12 |
| **Waar** | `app/(site)/partners/page.tsx` |
| **Probleem** | Geen filter op regio, type, of naam. Gebruiker moet alle partners handmatig doorlopen. |
| **UX impact** | Professionals (US-04) en winkelzoekers (US-12) kunnen niet efficiënt de juiste partner vinden. |
| **UI impact** | Pagina is functioneel maar niet optimaal bij groeiend partnership-bestand. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Geen impact. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Hoog — bij huidige kleine dataset acceptabel, bij groei problematisch |
| **Oplossing** | Client-side zoekveld (filtert op naam/beschrijving). Op termijn: regio-filter en categorie-filter. |

---

## GAP-08 — Showroom-adres niet klikbaar

| Veld | Waarde |
|------|--------|
| **Stories** | US-04, US-12 |
| **Waar** | `app/(site)/partners/[slug]/page.tsx` — showrooms sectie |
| **Probleem** | Showroom-adres is platte tekst. Gebruiker kan niet klikken om route te plannen. Telefoon is wél klikbaar (`tel:`). |
| **UX impact** | Gebruiker moet adres handmatig kopiëren. Extra stap voor mobiele gebruikers die routenavigatie willen. |
| **UI impact** | Inconsistent: telefoon is interactief, adres niet. |
| **Toegankelijkheid** | Geen technisch probleem, maar minder bruikbaar. |
| **SEO** | Geen impact. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Hoog |
| **Oplossing** | Wrap adres in link: `<a href="https://maps.google.com/?q={encoded address}" target="_blank">`. |

---

## GAP-09 — Taalconsistentie: Engelse labels op Nederlandse site

| Veld | Waarde |
|------|--------|
| **Stories** | Alle |
| **Waar** | Partners listing ("Featured Partners"), partner detail ("Gesponsorde Content"), contact ("Partnerships"), zoekresultaten ("Sponsored") |
| **Probleem** | Meerdere Engelse termen op een volledig Nederlandstalige site (`lang="nl"`). Inconsistent en verwarrend voor de doelgroep. |
| **UX impact** | Breekt de taalervaring. "Featured Partners" is niet direct begrijpelijk voor alle gebruikers. |
| **UI impact** | Visueel geen probleem, maar semantisch inconsistent. |
| **Toegankelijkheid** | Screenreader leest Engelse woorden voor met Nederlandse uitspraak. |
| **SEO** | `lang="nl"` site met Engelse content = mismatch. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Hoog |
| **Oplossing** | "Featured Partners" → "Uitgelichte partners", "Gesponsorde Content" → "Artikelen in samenwerking", "Partnerships" → "Samenwerking", "Sponsored" → "Gesponsord". |

---

## GAP-10 — Adverteerpagina: geen tarieven of mediakit

| Veld | Waarde |
|------|--------|
| **Stories** | US-10 |
| **Waar** | `app/(site)/adverteren/page.tsx` |
| **Probleem** | De pagina beschrijft vier advertentieopties maar geeft geen prijsindicatie, tarieven, of mediakit download. De CTA is "Neem contact op" — gebruiker moet blind aanvragen. |
| **UX impact** | Adverteerder kan aanbod niet beoordelen zonder contact. Drempel is te hoog voor verkennend bezoek. |
| **UI impact** | Geen vergelijkingstabel of feature-matrix. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Geen impact. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Hoog |
| **Oplossing** | Minimaal: "Vraag een voorstel aan" CTA met verwachting ("We bezorgen onze tarieven binnen 2 werkdagen"). Ideaal: indicatieve "vanaf" prijzen of een vergelijkingstabel. |

---

## GAP-11 — Geen social share-knoppen op artikelen

| Veld | Waarde |
|------|--------|
| **Stories** | US-03, US-11 |
| **Waar** | `app/(site)/[category]/[slug]/page.tsx` |
| **Probleem** | Artikelen hebben geen share-knoppen (WhatsApp, Facebook, Pinterest, kopieer-link). |
| **UX impact** | Gemiste virale groei. Pinterest-gebruikers (US-11) kunnen niet delen. |
| **UI impact** | Ruimte in sidebar of onder artikel is beschikbaar. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Social signals → indirect SEO-voordeel (backlinks). |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Middel |
| **Oplossing** | Minimaal: "Kopieer link" knop + WhatsApp + Pinterest share-links (geen externe scripts, alleen URL-schema's). |

---

## GAP-12 — WhatsApp-knop: geen verwachtingsmanagement

| Veld | Waarde |
|------|--------|
| **Stories** | US-17 |
| **Waar** | `components/ui/WhatsAppChat.tsx` |
| **Probleem** | Knop heeft geen tooltip, geen context. Gebruiker verwacht mogelijk live chat. Knop kan content overlappen op mobiel. |
| **UX impact** | Verkeerde verwachting → teleurstelling. Mobiel: overlapt laatste content. |
| **UI impact** | Knop is altijd zichtbaar zonder dismiss mogelijkheid. |
| **Toegankelijkheid** | `aria-label` is aanwezig. |
| **SEO** | Geen impact. |
| **Ernst** | LAAG |
| **Vertrouwen** | Middel |
| **Oplossing** | Voeg `title="Stuur ons een WhatsApp-bericht"` toe. Overweeg dismiss-optie op mobiel. |

---

## GAP-13 — Tags-pagina: introductietekst te karig

| Veld | Waarde |
|------|--------|
| **Stories** | US-01, US-18 |
| **Waar** | `app/(site)/tags/[tag]/page.tsx` |
| **Probleem** | Intro is alleen "{count} artikel(en) met deze tag" — droog, geen context, geen SEO-waarde. |
| **UX impact** | Pagina voelt als een database-uitzicht, niet als curated content. |
| **UI impact** | Veel witte ruimte in hero-sectie. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Gemiste kans voor long-tail content in description/intro. |
| **Ernst** | LAAG |
| **Vertrouwen** | Hoog |
| **Oplossing** | Verrijk intro: "Ontdek {count} artikelen over {tag}. Van inspiratie tot praktische tips." |

---

## GAP-14 — Geen paginering op listing- en tag-pagina's

| Veld | Waarde |
|------|--------|
| **Stories** | US-01, US-20 |
| **Waar** | Tag-pagina's, categoriepagina's |
| **Probleem** | Alle artikelen worden in één keer geladen. Bij groeiend contentvolume → trage pagina, groot HTML. |
| **UX impact** | Bij 50+ artikelen onpraktisch. Mobiel: eindeloos scrollen zonder progressie-indicatie. |
| **UI impact** | Geen visuele scheiding of progressie. |
| **Toegankelijkheid** | Geen impact bij huidige volumes. |
| **SEO** | Grote pagina's → langzamere crawl → Core Web Vitals. |
| **Ernst** | LAAG (momenteel) → MIDDEL (bij groei) |
| **Vertrouwen** | Middel |
| **Oplossing** | "Laad meer artikelen" knop na eerste 12-18 items. |

---

## GAP-15 — Eerste-bezoeker-helderheid: geen onboarding

| Veld | Waarde |
|------|--------|
| **Stories** | US-06 |
| **Waar** | Homepage + navigatie |
| **Probleem** | Nieuwe bezoekers begrijpen niet direct wat de site biedt. De hero-sectie toont een featured artikel maar geen overzicht van de site-inhoud. Geen "start hier" of categorieoverzicht boven de vouw. |
| **UX impact** | Eerste bezoeker moet zelf ontdekken wat de mogelijkheden zijn. |
| **UI impact** | Homepage start visueel sterk maar mist verduidelijking. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Bounce rate op homepage. |
| **Ernst** | LAAG |
| **Vertrouwen** | Middel |
| **Oplossing** | Overweeg: korte "blokken" onder de hero met Inspiratie/Advies/Trends/Video als visuele kaarten met beschrijving. Of: subtitel onder de hero die de site positioneert. |

---

## GAP-16 — Geen "terug naar dossier" contextlink

| Veld | Waarde |
|------|--------|
| **Stories** | US-15 |
| **Waar** | `app/(site)/[category]/[slug]/page.tsx` |
| **Probleem** | Als een artikel bij een dossier hoort, is dat nergens zichtbaar op de artikelpagina. Geen teruglink, geen dossierbadge, geen contextvermelding. |
| **UX impact** | Gebruiker verliest dossier-context. Moet browser-back gebruiken. |
| **UI impact** | Geen visuele indicatie dat het artikel deel uitmaakt van een groter thema. |
| **Toegankelijkheid** | Geen impact. |
| **SEO** | Gemiste internal link naar dossier. |
| **Ernst** | MIDDEL |
| **Vertrouwen** | Hoog |
| **Oplossing** | Als het artikel tot een dossier behoort: toon banner/link "Onderdeel van dossier: [Dossiernaam]" met link naar de dossierpagina. Vereist: GROQ-query uitbreiden om dossier-referentie op te halen. |

---

## GAP-17 — Contact "Partnerships" label in het Engels

| Veld | Waarde |
|------|--------|
| **Stories** | US-10 |
| **Waar** | `app/(site)/contact/page.tsx` — ContactCard #2 |
| **Probleem** | Kaarttitel "Partnerships" is Engels op een Nederlandse pagina. Actie "Meer informatie →" is vaag — waarheen? |
| **UX impact** | Lichte verwarring, maar context maakt het duidelijk. |
| **UI impact** | Inconsistent taalgebruik. |
| **Toegankelijkheid** | Screenreader leest "Partnerships" als Nederlands woord. |
| **SEO** | Geen impact. |
| **Ernst** | LAAG |
| **Vertrouwen** | Hoog |
| **Oplossing** | "Partnerships" → "Samenwerking". "Meer informatie →" → "Mail het team →". |

---

## GAP-18 — Mobiel: WhatsApp-knop overlapt content

| Veld | Waarde |
|------|--------|
| **Stories** | US-05, US-17 |
| **Waar** | `components/ui/WhatsAppChat.tsx` |
| **Probleem** | Fixed position `bottom-6 right-6` overlapt mogelijk de cookie-banner, footer-content, of laatste paragraaf op kleine schermen. Geen dismiss. |
| **UX impact** | Op kleine schermen bedekt de knop leesbare content. Samen met cookie-banner: visuele overload. |
| **UI impact** | Overlapt tot 56px² content. |
| **Toegankelijkheid** | Content achter de knop is niet bereikbaar via scroll. |
| **SEO** | Geen impact. |
| **Ernst** | LAAG |
| **Vertrouwen** | Middel — afhankelijk van schermgrootte en content |
| **Oplossing** | Verberg WhatsApp-knop wanneer cookie-banner zichtbaar is. Of: verplaats naar andere positie op mobiel. Of: maak dismissable. |

---

## GAP-19 — Geen vergelijkfunctionaliteit

| Veld | Waarde |
|------|--------|
| **Stories** | US-07 |
| **Waar** | Gehele site |
| **Probleem** | Geen mogelijkheid om merken, producten, of materialen naast elkaar te vergelijken. |
| **UX impact** | Vergelijkers (hoge koopintentie) worden niet bediend. |
| **UI impact** | Geen vergelijkings-UI. |
| **Toegankelijkheid** | N.v.t. |
| **SEO** | Gemiste kans voor vergelijkings-content. |
| **Ernst** | LAAG (structureel) |
| **Vertrouwen** | Middel |
| **Oplossing** | Toekomstige feature. Niet voor huidige sprint. |

---

## GAP-20 — Geen "nieuw" markering voor terugkerende bezoekers

| Veld | Waarde |
|------|--------|
| **Stories** | US-20 |
| **Waar** | Homepage, listing-pagina's |
| **Probleem** | Terugkerende bezoekers kunnen niet zien welke content nieuw is sinds hun laatste bezoek. |
| **UX impact** | Terugkerende bezoekers moeten zelf onthouden wat ze al gelezen hebben. |
| **UI impact** | Geen "nieuw" badge of visuele markering. |
| **Toegankelijkheid** | N.v.t. |
| **SEO** | Geen impact. |
| **Ernst** | LAAG |
| **Vertrouwen** | Laag — vereist client-side state of auth |
| **Oplossing** | Toekomstige feature. localStorage-based "last visit" markering. |

---

## Samenvatting per ernst

### HOOG (3)
- GAP-01: Zoek lege staat
- GAP-02: Zoek geen-resultaten
- GAP-03: Video dead end

### MIDDEL (8)
- GAP-04: Navigatie-labels onduidelijk
- GAP-05: Geen breadcrumbs
- GAP-06: Zoek op mobiel niet vindbaar
- GAP-07: Partner-filter ontbreekt
- GAP-08: Showroom-adres niet klikbaar
- GAP-09: Engelse labels
- GAP-10: Adverteren zonder tarieven
- GAP-16: Geen dossier-contextlink

### LAAG (9)
- GAP-11: Geen social share
- GAP-12: WhatsApp verwachtingsmanagement
- GAP-13: Tags intro te karig
- GAP-14: Geen paginering
- GAP-15: Geen onboarding
- GAP-17: Contact "Partnerships" label
- GAP-18: WhatsApp overlapt mobiel
- GAP-19: Geen vergelijkfunctie
- GAP-20: Geen "nieuw" markering
