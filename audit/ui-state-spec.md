# UI State Specification — interieur.expert

Datum: 12 maart 2026
Status: Definitief

---

## Legenda

- ✅ = Staat is geïmplementeerd en correct
- ⚠️ = Staat is gedeeltelijk geïmplementeerd of suboptimaal
- ❌ = Staat ontbreekt of is gebroken
- ➖ = Staat is niet van toepassing

---

## 1. Header Navigatie (`SiteHeader`)

| Staat | Desktop | Mobiel | Beoordeling |
|-------|---------|--------|-------------|
| Default | Logo links, 8 nav-items horizontaal, zoekicoon rechts | Logo links, hamburger rechts | ✅ |
| Hover | Underline-animatie vanuit midden op nav-items | ➖ (touch) | ✅ |
| Focus | `outline-2 offset-2 outline-accent` op alle interactieve elementen | Idem | ✅ |
| Active | `aria-current="page"`, underline + volle opacity | Idem | ✅ |
| Sticky | Sticky top-0, `bg-background/95 backdrop-blur-sm` | Idem | ✅ |
| Menu open | ➖ | Slide-in panel rechts (320px, max 85vw), donkere overlay, X-knop | ✅ |
| Menu gesloten | ➖ | Panel verborgen, overlay weg | ✅ |
| Keyboard | Tab door alle items, Enter activeert link | Tab + Enter, menu toggled met Escape? | ⚠️ Escape sluit menu niet expliciet |
| Screen reader | `<nav aria-label="Hoofdnavigatie">`, `aria-expanded` op hamburger | Idem | ✅ |

**Ontbreken:**
- ❌ Geen submenu-hints of beschrijvingen bij navigatie-items (Inspiratie/Advies/Trends zijn onduidelijk)
- ⚠️ Mobiel menu sluit niet met Escape-toets

---

## 2. Zoekfunctie (`SmartSearch` + `SmartSearchDialog`)

| Staat | Desktop | Mobiel | Beoordeling |
|-------|---------|--------|-------------|
| Trigger default | Icoon + "Zoeken..." tekst + `⌘K` badge | Alleen icoon (tekst verborgen) | ⚠️ Mobiel: icoon alleen, geen label |
| Trigger hover | Tekst wordt voller qua opacity | ➖ | ✅ |
| Trigger focus | Outline-accent | Outline-accent | ✅ |
| Dialog open | Modaal centraal, backdrop-blur overlay, zoek-input auto-focus | Idem, full-width | ✅ |
| Typing | Debounce 300ms, dan zoekresultaten | Idem | ✅ |
| Loading | "Zoeken..." tekst | Idem | ✅ |
| Resultaten | Max 10 items, type-badge (Artikel/Video/Partner), titel + excerpt | Idem | ✅ |
| Geen resultaten | "Geen resultaten gevonden voor '{query}'" | Idem | ⚠️ Geen suggesties of alternatieven |
| Leeg veld | Geen content in dialoog | Idem | ❌ Geen suggesties, populaire zoektermen, of recente artikelen |
| Keyboard | ↑↓ navigeren, ↵ selecteren, Esc sluiten | Idem | ✅ |
| Clear | X-knop bij query, wist input | Idem | ✅ |
| Close | X-knop of Esc of klik buiten dialoog | Idem | ✅ |

**Ontbreken:**
- ❌ Leeg zoekvenster toont niets — geen populaire termen, geen recente content
- ⚠️ Geen suggesties bij lege resultaten ("Probeer ook: verlichting, woonkamer, scandinavisch")
- ⚠️ Mobiel: zoektrigger is alleen een icoon zonder tekst

---

## 3. Content Cards (`ContentCard`)

| Staat | Normal | Large | Wide | Beoordeling |
|-------|--------|-------|------|-------------|
| Default | Afbeelding boven, content onder, tags | 2-kolom: beeld links, content rechts | Full-width beeld met overlay tekst | ✅ |
| Hover | `scale-105` op beeld | Idem | Idem | ✅ |
| Focus | Outline op `<Link>` wrapper | Idem | Idem | ✅ |
| Sponsored | `border-t-2 border-brand/40 pt-4` + SponsoredBadge | Idem | badge op afbeelding | ✅ |
| Geen afbeelding | `bg-text/5` placeholder | Idem | Idem | ✅ |
| Tags | Klikbare `<Link>` pills | Idem | Niet getoond in wide | ✅ |
| Mobiel | 1-col stack | 1-col stack (large → normal) | Beeld boven, tekst onder (geen overlay) | ✅ |
| Keyboard | Tab → focus op kaart-link, Enter navigeert | Idem | Idem | ✅ |
| Rechtsklik | Standaard link-contextmenu (Open in new tab) | Idem | Idem | ✅ |

**Status na eerdere fix:** ContentCard is nu een echte `<Link>` — rechtsklik, Ctrl+Click, middelklik werken correct.

---

## 4. Artikelpagina (`/[category]/[slug]`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | Hero-image (aspect-21/9) + MetaRow + h1 + excerpt + body + sidebar | ✅ |
| Hero-image | `<Image>` met `fill`, `priority`, `sizes` | ✅ (na fix) |
| Geen hero-image | `bg-text/5` placeholder | ✅ |
| Sponsored | SponsoredDisclosure boven hero, border-brand markering | ✅ |
| Gerelateerde artikelen | Sidebar (3 items) + optioneel full-width sectie (>3 items) | ⚠️ Mobiel: sidebar helemaal onderaan |
| Tags in sidebar | Klikbare links naar `/tags/[tag]` | ✅ |
| Lange content | ArticleBody met prose styling, afbeeldingen, callouts, quotes | ✅ |
| Laden | Server-side rendered, geen laadstaat zichtbaar | ✅ |
| 404 (verkeerde slug) | `notFound()` → branded 404 pagina | ✅ |
| 404 (verkeerde categorie) | `notFound()` → branded 404 pagina | ✅ |
| Keyboard | Tab door sidebar links, tags, gerelateerde artikelen | ✅ |
| Mobiel | 1-col stack, sidebar onder content | ⚠️ Gerelateerd pas na veel scrollen |

**Ontbreken:**
- ❌ Geen breadcrumbs (Home > Categorie > Artikel)
- ❌ Geen "terug naar dossier" als artikel tot een dossier behoort
- ❌ Geen social share-knoppen
- ⚠️ Gerelateerde artikelen op mobiel pas zichtbaar na hele sidebar

---

## 5. Tags-pagina (`/tags/[tag]`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | h1 "#[tag]", telregel, 3-col kaartgrid met ads elke 6e positie | ✅ |
| Metadata | `generateMetadata()` met titel en beschrijving | ✅ (na fix) |
| Geen artikelen | `notFound()` | ✅ |
| Veel artikelen | Alle artikelen in één keer geladen, geen paginering | ⚠️ Schaalbaarheid |
| Mobiel | 1-col stack | ✅ |
| Keyboard | Tab door alle kaarten | ✅ |

**Ontbreken:**
- ❌ Geen paginering of "laad meer" — schaalt niet bij 50+ artikelen
- ⚠️ Geen introductietekst over het tag-onderwerp

---

## 6. Partner-listing (`/partners`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | h1, beschrijving, Featured Partners (3-col), Alle Partners (4-col) | ✅ |
| Featured kaart | Logo (groot), naam, beschrijving, "Bekijk profiel →", ⭐ badge | ✅ |
| Compact kaart | Logo (klein), naam, beschrijving (2 regels) | ✅ |
| Hover | `shadow-lg` op compact, `shadow-xl` op featured, `scale-105` op logo | ✅ |
| Lege staat | "Binnenkort vind je hier onze partners." | ✅ |
| BrandColor | Border-kleur gebruikt `partner.brandColor` indien beschikbaar | ✅ |
| Mobiel | 1-col (compact → 2-col op md) | ✅ |
| Keyboard | Tab door alle partner-links | ✅ |

**Ontbreken:**
- ❌ Geen zoekfunctie binnen partners
- ❌ Geen filter op regio, type, of categorie
- ❌ Geen showroom-info in het overzicht (alleen op detailpagina)

---

## 7. Partner-detail (`/partners/[slug]`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | Logo + naam + beschrijving + CTA-knoppen + About + Showrooms + Gesponsorde artikelen + CTA | ✅ |
| Social links | Instagram, Facebook met inline SVG iconen | ✅ (na fix) |
| Website-knop | Primaire CTA, `target="_blank" rel="noopener noreferrer"` | ✅ |
| Showrooms | Stad, adres, telefoon (klikbaar `tel:`) | ⚠️ Adres niet klikbaar (geen Maps-link) |
| Geen showrooms | Sectie niet getoond | ✅ |
| Geen about | Sectie niet getoond | ✅ |
| Geen gesponsorde artikelen | Sectie niet getoond | ✅ |
| Featured badge | ⭐ gele badge | ✅ |
| 404 | `notFound()` → branded 404 pagina | ✅ |
| Mobiel | 1-col stack, logo boven content | ✅ |
| Uiterlijk | Design tokens (bg-background, text-text/65, bg-surface) | ✅ (na fix) |

**Ontbreken:**
- ❌ Showroom-adres niet klikbaar naar Google Maps
- ⚠️ Geen "gerelateerde partners" of "vergelijkbare merken" sectie

---

## 8. Contactformulier (`ContactForm`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | 4 velden (naam, email, onderwerp, bericht), submit-knop | ✅ |
| Focus | `border-accent outline-none` op inputs | ✅ |
| Laden | Knop toont "Versturen...", `disabled`, `aria-busy` op form | ✅ |
| Succes | Redirect naar `/contact/bedankt` | ✅ |
| Server-error | Rode foutmelding onder formulier, `aria-invalid` | ✅ |
| Validatie | Browser-native validatie (required, email type) | ✅ (na noValidate verwijdering) |
| Invalid email | Browser toont native validatiefout | ✅ |
| Leeg versturen | Browser blokkeert (required attributen) | ✅ |
| Labels | Zichtbaar boven velden, `htmlFor` gekoppeld | ✅ |
| Mobiel | Full-width velden, responsive padding | ✅ |
| Keyboard | Tab door velden, Enter verstuurt | ✅ |

**Ontbreken:**
- ⚠️ Geen inline veldvalidatie (alleen native browser-melding of server-error)
- ⚠️ Geen focus op eerste fout na server-validatiefout

---

## 9. Nieuwsbrief CTA (`NewsletterCTA`)

| Staat | Card | Inline | Beoordeling |
|-------|------|--------|-------------|
| Default | Achtergrond-box met icoon, titel, beschrijving, email-input + submit | Compact, alleen input + submit | ✅ |
| Focus | `border-accent` op input | Idem | ✅ |
| Laden | Spinner-icoon + "Moment…" in knop | Idem | ✅ |
| Succes | Groene badge: "Gelukt! Je staat nu ingeschreven." | Idem | ✅ |
| Al ingeschreven | Blauwe badge: "Je was al ingeschreven — welkom terug!" | Idem | ✅ |
| Fout | Rode badge met foutmelding | Idem | ✅ |
| Disabled | `opacity-60` op input + knop tijdens laden | Idem | ✅ |
| Privacy-tekst | "Je kunt je altijd weer uitschrijven. Privacy gegarandeerd." | Idem | ✅ |
| Mobiel | Full-width, knoppen gestapeld | Idem | ✅ |
| Keyboard | Tab → input → submit, Enter verstuurt | Idem | ✅ |
| ARIA | `aria-describedby` op input, `role="status"/"alert"`, `aria-busy`, `aria-invalid` | Idem | ✅ |

**Status:** Volledig functioneel en toegankelijk.

---

## 10. WhatsApp-knop (`WhatsAppChat`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | Vaste positie rechtsonder (fixed bottom-6 right-6), groene cirkel met WA-icoon | ⚠️ |
| Hover | `scale-110` | ✅ |
| Focus | Focus outline | ✅ |
| Mobiel | Zelfde positie, kan content overlappen | ⚠️ |
| ARIA | `aria-label="Chat via WhatsApp"` | ✅ |
| Z-index | `z-50` | ✅ |

**Ontbreken:**
- ❌ Geen tooltip of beschrijving dat het WhatsApp opent (niet live chat)
- ❌ Geen dismiss/verberg optie
- ⚠️ Overlapt mogelijk cookie-banner, footer, of laatste paragraaf op mobiel

---

## 11. Video-pagina's

### Video-listing (`/video`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | Featured video (groot) + grid (2-col) | ✅ |
| Lege staat | "Er zijn nog geen video's gepubliceerd." | ✅ |
| Preview | Hover toont preview-video met 400ms delay | ✅ |
| Thumbnail | Play-icoon overlay, duration badge | ✅ |
| Mobiel | 1-col stack | ✅ |

### Video-detail (`/video/[slug]`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | MetaRow + h1 + YouTube embed (aspect-video) + transcript | ✅ |
| YouTube | `youtube-nocookie.com` embed | ✅ (na fix) |
| Sponsored | SponsoredDisclosure | ✅ |
| Transcript | PortableText met prose styling | ✅ |
| 404 | `notFound()` | ✅ |
| Mobiel | Full-width embed, responsive | ✅ |

**Ontbreken:**
- ❌ Geen gerelateerde video's sectie na de huidige video
- ❌ Geen "volgende video" suggestie
- ⚠️ Dead end na video — gebruiker moet terug naar overzicht

---

## 12. Footer (`SiteFooter`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | Tags-doormat (blauw) + 4-col grid (merk, content, about, social) + copyright | ✅ |
| Tags | 15-20 populaire tags als `#tag` links, wit op blauw | ✅ |
| Hover | Tag-links: kleur naar accent | ✅ |
| Social links | Instagram, Facebook, YouTube | ✅ |
| Cookie-instellingen | Knop "Cookie-instellingen" die consent-modal heropent | ✅ |
| Mobiel | 2-col grid, tags wrappen | ✅ |
| Keyboard | Alle links tabbable | ✅ |

**Status:** Footer is volledig functioneel.

---

## 13. 404 Pagina (`not-found.tsx`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | "404" label + h1 "Pagina niet gevonden" + beschrijving + 2 knoppen + populaire tags | ✅ |
| Knoppen | "Naar de homepage" (primair) + "Bekijk inspiratie" (secundair) | ✅ |
| Tags | Populaire onderwerpen als herstelpad | ✅ |
| Mobiel | Gestapeld, leesbaar | ✅ |
| Keyboard | Knoppen + tag-links tabbable | ✅ |

**Status:** Volledig functioneel (na eerdere creatie).

---

## 14. Error Pagina (`error.tsx`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | "Fout" label + h1 + beschrijving + 2 knoppen | ✅ |
| Retry | "Probeer opnieuw" knop roept `reset()` aan | ✅ |
| Fallback | "Naar de homepage" link | ✅ |
| Console | `console.error(error)` voor debugging | ✅ |
| Mobiel | Gestapeld | ✅ |

**Status:** Volledig functioneel (na eerdere creatie).

---

## 15. Adverteren-pagina (`/adverteren`)

| Staat | Waarde | Beoordeling |
|-------|--------|-------------|
| Default | h1, beschrijving, 4 opties-kaarten (2x2 grid), CTA-sectie | ✅ |
| Hover | Kaart: `border-accent/40`, `shadow-sm` | ✅ |
| CTA | Email-link + contactformulier-link | ✅ |
| Opties-text | Gewone JSX (na dangerouslySetInnerHTML fix) | ✅ |
| Mobiel | 1-col stack | ✅ |

**Ontbreken:**
- ❌ Geen tarieven of prijsindicaties
- ❌ Geen mediakit download
- ⚠️ Opties zijn beschrijvend maar niet vergelijkbaar (geen feature-tabel)

---

## Samenvatting ontbrekende staten

| Categorie | Ontbrekend | Ernst |
|-----------|-----------|-------|
| Zoekfunctie | Lege staat (geen suggesties), no-results (geen alternatieven) | HOOG |
| Partnerpagina | Filter/zoek, showroom met Maps-link | HOOG |
| Artikelpagina | Breadcrumbs, terug-naar-dossier, social share | MIDDEL |
| Video-detail | Gerelateerde video's | MIDDEL |
| Adverteren | Tarieven, mediakit | MIDDEL |
| WhatsApp | Tooltip, dismiss, overlap-preventie | LAAG |
| Tags | Paginering bij veel content | LAAG |
| Navigatie | Submenu-beschrijvingen voor categorieën | MIDDEL |
