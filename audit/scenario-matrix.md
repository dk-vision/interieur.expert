# Scenario Matrix — interieur.expert

Datum: 12 maart 2026
Status: Definitief

---

## Legenda

- **UX-ernst**: HOOG = blokkeert taak | MIDDEL = vertraagt of verwart | LAAG = suboptimaal
- **Conversie**: DIRECT = leidt tot inkomsten | INDIRECT = beïnvloedt retentie | GEEN = informatief

---

| Story ID | Scenario | Instappagina | Bezochte pagina's | Interactiepunten | Verwarringsmomenten | Faalstaten | UX-ernst | Conversie |
|----------|----------|-------------|-------------------|-----------------|---------------------|------------|----------|-----------|
| US-01 | Inspiratie zoeken via Google | `/[category]/[slug]` (artikel) | Artikel → Tags → `/tags/[tag]` → `/inspiratie` → Nieuwsbrief CTA | Tags klikken, gerelateerde artikelen, nieuwsbrief-formulier | Tag-pagina's missen metadata; gerelateerde artikelen alleen in sidebar | Tag leidt naar pagina zonder SEO-context; geen "meer laden" bij veel resultaten | MIDDEL | INDIRECT |
| US-02 | Designmeubel + dealer zoeken | `/[category]/[slug]` (gesponsord) | Gesponsord artikel → `/partners` → `/partners/[slug]` | Partner-link in artikel, partnerspagina navigeren, showroom zoeken | Geen prijsindicatie; partner-listing niet filterbaar; showroom-adres zonder kaartlink | Partner niet gevonden; geen regionaal filter | HOOG | DIRECT |
| US-03 | Social media post terugvinden | `/` (homepage) | Homepage → Zoekdialoog → Resultaat → Artikel | Zoekicoon vinden, zoekterm invullen | Zoek niet direct zichtbaar; landt op homepage i.p.v. deeplink; geen "recent gedeeld" | Zoek levert geen resultaat; gebruiker herkent post niet tussen alle content | HOOG | INDIRECT |
| US-04 | Leverancier zoeken als professional | `/partners` | Partners → `/partners/[slug]` → Showroom-info → Contact | Partners browsen, showroom vinden, contact opnemen | Geen filter op regio/type; moet alle partners doorscrollen; adres zonder routelink | Geen partner in gewenste regio; showroom-info incompleet | HOOG | DIRECT |
| US-05 | Mobiel snel scrollen | `/` (homepage, mobiel) | Homepage → Video-sectie → `/video/[slug]` | Scrollen, op video tikken, video afspelen | WhatsApp-knop overlapt content; hero laadt traag; weinig visuele "stoppers" | Video laadt niet; afbeelding te traag → bounce | MIDDEL | INDIRECT |
| US-06 | Eerste bezoek, keuken zoeken | `/` (homepage) | Homepage → `/advies` → Zoekdialoog | Navigatie begrijpen, categorie kiezen, zoekfunctie vinden | Verschil Inspiratie/Advies/Trends onduidelijk; zoekicoon niet herkenbaar; ⌘K onbekend | Zoekfunctie niet gevonden; verkeerde categorie gekozen; geeft op | HOOG | INDIRECT |
| US-07 | Merken vergelijken | `/[category]/[slug]` | Artikel → (wil nieuwe tab) → Gerelateerde artikelen → Partners | Meerdere tabs openen, vergelijken | Kaarten niet in nieuwe tab te openen; geen vergelijkfunctie; geen prijsinfo | Kan niet multitasken; verliest context bij navigatie | MIDDEL | DIRECT |
| US-08 | Rage clicking | `/` (homepage) | Homepage → Kaarten → Artikelen | Snel klikken op kaarten, header-elementen | Dubbele navigatie; niet-klikbare afbeeldingen; trage response | UI reageert inconsistent op snel klikgedrag | LAAG | GEEN |
| US-09 | Nieuwsbrief-artikel lezen | `/[category]/[slug]` (direct) | Artikel → Gerelateerde artikelen → Volgende artikel | Artikel lezen, doorscroll, gerelateerd klikken | Gerelateerd alleen in sidebar (mobiel: ver onderaan); geen duidelijke "lees ook" CTA | Geen volgende stap na lezen; dead end onderaan artikel | MIDDEL | INDIRECT |
| US-10 | Adverteerder zoekt opties | `/adverteren` | Adverteren → Contact → `/contact` | Opties lezen, tarieven zoeken, contact zoeken | Geen tarieven; geen mediakit; CTA niet prominent | Verlaat zonder contact; kan aanbod niet beoordelen | HOOG | DIRECT |
| US-11 | Beelden pinnen/opslaan | `/[category]/[slug]` | Artikel → Afbeeldingen in body | Afbeeldingen bekijken, opslaan, pinnen | Geen galerij; beelden verspreid in tekst; geen Pinterest-integratie | Kan niet efficient beelden verzamelen | LAAG | INDIRECT |
| US-12 | Showroom in de buurt vinden | `/partners` | Partners → `/partners/[slug]` → Showroom-sectie | Partners browsen, locatie zoeken | Geen locatiefilter; geen kaart; tekst-adres zonder link | Kan showroom niet vinden; geen routenavigatie | HOOG | DIRECT |
| US-13 | Zoekt merk dat niet bestaat | Zoekdialoog | Zoekdialoog → Leeg resultaat | Zoekterm invullen, resultaten scannen | Leeg resultaat zonder alternatief; geen suggesties | Verlaat site na leeg resultaat; geen fallback | HOOG | INDIRECT |
| US-14 | Tabs openen voor vergelijking | `/` (homepage) | Homepage → (wil meerdere tabs) | Rechtskllik, Ctrl+Click, middelklik | Kaarten zijn geen echte `<a>` links; standaard browser-gedrag werkt niet | Kan niet multitasken; geforceerd single-tab navigatie | HOOG | INDIRECT |
| US-15 | Dossier doorlezen | `/dossiers/[slug]` | Dossier → Artikel → (wil terug naar dossier) | Dossier navigeren, artikel lezen, terug navigeren | Geen breadcrumbs; geen "terug naar dossier" link; context verlies | Verliest positie in dossier; moet opnieuw zoeken | MIDDEL | INDIRECT |
| US-16 | Video's kijken in serie | `/video` → `/video/[slug]` | Video-overzicht → Video-detail → (wil volgende video) | Video afspelen, volgende zoeken | Geen gerelateerde video's; geen autoplay/suggestie na video | Dead end; moet terug naar overzicht; bounce | MIDDEL | INDIRECT |
| US-17 | WhatsApp als chat gebruiken | Willekeurige pagina | Huidige pagina → WhatsApp | WhatsApp-knop klikken | Verwacht live chat, krijgt async WhatsApp; geen verwachtingsinfo | Teleurstelling door verkeerde verwachting; knop overlapt op mobiel | LAAG | INDIRECT |
| US-18 | SEO-analyse uitvoeren | Alle pagina's | Homepage → Artikelen → Tags → Partners | Metadata checken, schema's testen, images auditen | Hero-image niet geoptimaliseerd; tags missen metadata; geen breadcrumb-schema | Slechte Core Web Vitals; gemiste indexatie-kansen | MIDDEL | INDIRECT |
| US-19 | Keyboard-only navigatie | `/` (homepage) | Homepage → Zoek → Artikelen → Formulieren | Tab, Enter, ⌘K, pijltoetsen | Te veel tab-stops als kaarten niet-semantisch zijn; modaal focus-trapping | Keyboard-gebruiker kan interactie niet voltooien | MIDDEL | GEEN |
| US-20 | Nieuwe content ontdekken | `/` (homepage) | Homepage → "Recent" sectie | Scannen op nieuwe content | Geen "nieuw" badge; geen datumfilter; geen "sinds laatst" | Kan niet onderscheiden wat al gelezen is | LAAG | INDIRECT |

---

## Samenvattende risico's

### Geblokkeerde taken (UX-ernst HOOG)

| # | Risico | Getroffen story's |
|---|--------|-------------------|
| 1 | Partner-listing niet filterbaar/doorzoekbaar | US-02, US-04, US-12 |
| 2 | Zoekfunctie niet direct vindbaar | US-03, US-06, US-13 |
| 3 | Leeg zoekresultaat zonder alternatief | US-03, US-13 |
| 4 | Adverteerpagina zonder tarieven of mediakit | US-10 |
| 5 | ContentCard geen echte link (tab-openers geblokkeerd) | US-07, US-14 |

### Vertraagde taken (UX-ernst MIDDEL)

| # | Risico | Getroffen story's |
|---|--------|-------------------|
| 6 | Navigatie-labels onduidelijk voor nieuwe bezoekers | US-06 |
| 7 | Geen breadcrumbs / terug-naar-dossier | US-15 |
| 8 | Geen gerelateerde video's | US-16 |
| 9 | Gerelateerde artikelen niet prominent genoeg | US-09 |
| 10 | Geen "nieuw" markering voor terugkerende bezoekers | US-20 |

### Suboptimale ervaringen (UX-ernst LAAG)

| # | Risico | Getroffen story's |
|---|--------|-------------------|
| 11 | Geen galerij-view voor beeldmateriaal | US-11 |
| 12 | WhatsApp-knop geen verwachtingsmanagement | US-17 |
| 13 | Rage clicking zonder debounce | US-08 |
