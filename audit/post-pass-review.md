# Post-Pass Review — interieur.expert

Datum: 12 maart 2026
Status: Definitief

---

## Executive Summary

Interieur Expert is een goed gebouwde Next.js publicatiesite met sterke technische fundamenten (geoptimaliseerde afbeeldingen, SSG/ISR, goede error handling, correct consent management). De UX/UI vertoont echter structurele gaps die de gebruikerservaring en conversie beperken — met name in zoekfunctionaliteit, context-navigatie, en taalconsistentie.

---

## Top 10 UX-risico's

| # | Risico | Ernst | GAP |
|---|--------|-------|-----|
| 1 | Zoekfunctie biedt geen hulp bij lege query of geen resultaten → dead end | HOOG | GAP-01, GAP-02 |
| 2 | Video-detailpagina eindigt zonder vervolg → sessieverlies | HOOG | GAP-03 |
| 3 | Geen breadcrumbs → contextverlies op detailpagina's | MIDDEL | GAP-05 |
| 4 | Dossier-context ontbreekt op artikelpagina's → verbroken redactionele flow | MIDDEL | GAP-16 |
| 5 | Partner-listing niet filterbaar → inefficiënt bij groei | MIDDEL | GAP-07 |
| 6 | Showroom-adressen niet klikbaar → extra manuele stap | MIDDEL | GAP-08 |
| 7 | Adverteerpagina biedt geen tarieven → hoge drempel voor prospects | MIDDEL | GAP-10 |
| 8 | Navigatie-labels onduidelijk voor nieuwe bezoekers | MIDDEL | GAP-04 |
| 9 | Geen social share-knoppen → gemiste virale groei | MIDDEL | GAP-11 |
| 10 | WhatsApp-knop zonder context → valse verwachting | LAAG | GAP-12 |

---

## Top 10 UI-risico's

| # | Risico | Ernst | GAP |
|---|--------|-------|-----|
| 1 | Zoekdialoog leeg bij openen → voelt onaf | HOOG | GAP-01 |
| 2 | Geen visuele locatie-indicator (breadcrumbs) | MIDDEL | GAP-05 |
| 3 | Engelse labels op Nederlandse site ("Featured Partners", "Partnerships") | MIDDEL | GAP-09, GAP-17 |
| 4 | Tag-pagina intro te karig → voelt als database-dump | LAAG | GAP-13 |
| 5 | WhatsApp-knop overlapt content op kleine schermen | LAAG | GAP-18 |
| 6 | Geen active state in navigatie → paginalocatie onduidelijk | MIDDEL | AC-1.2 |
| 7 | Formuliervelden zonder `<label>` → alleen placeholder | MIDDEL | AC-6.7, AC-8.4 |
| 8 | Focus-stijlen inconsistent (outline-none in globals.css) | MIDDEL | AC-8.6 |
| 9 | Adverteerpagina mist vergelijkingstabel/-visual | MIDDEL | GAP-10 |
| 10 | Homepage mist categorieoverzicht boven de vouw | LAAG | GAP-15 |

---

## Ontbrekende journeys

1. **Dossier-navigatie**: Gebruiker leest artikel → wil terug naar dossier-overzicht → geen teruglink
2. **Videomarathon**: Gebruiker bekijkt video → wil volgende → dead end
3. **Partner vergelijken**: Gebruiker wil showrooms in regio vergelijken → geen filter
4. **Delen**: Gebruiker wil artikel delen via WhatsApp/Pinterest → geen share-knoppen
5. **Adverteerder oriëntatie**: Prospect wil tarieven bekijken → moet eerst contact zoeken

---

## Ontbrekende states

| Component | Ontbrekende staat | Impact |
|-----------|-------------------|--------|
| SmartSearchDialog | Lege initiële staat | HOOG |
| SmartSearchDialog | Geen-resultaten met suggesties | HOOG |
| Video-detailpagina | "Meer video's" sectie | HOOG |
| Navigatie | Active page marker | MIDDEL |
| Tags-pagina | Contextuele intro-tekst | LAAG |
| ContactForm | Labeled form fields | MIDDEL |
| WhatsApp button | Tooltip/verwachting | LAAG |

---

## Microcopy-zwaktes

1. **Taalinconsistentie**: "Featured Partners", "Partnerships", "Gesponsorde Content", "Sponsored" — mix van Engels/Nederlands
2. **Tags-intro**: Droog "{count} artikelen met deze tag" — geen context of waardepropositie
3. **Geen-resultaten-tekst**: Alleen "Geen resultaten gevonden" — geen alternatief of hulp
4. **Adverteerpagina CTA**: "Neem contact op" zonder tariefindicatie of verwachtingsmanagement
5. **WhatsApp-knop**: Geen tooltip of verwachting over responstijd

---

## Toegankelijkheidsconcerns

| Prioriteit | Probleem | WCAG-criterium |
|------------|----------|----------------|
| HOOG | Formuliervelden zonder `<label>` elementen — alleen placeholder | 1.3.1 Info and Relationships |
| MIDDEL | `outline-none` in globals.css kan focus-stijlen verbergen | 2.4.7 Focus Visible |
| MIDDEL | Sommige secundaire tekst (text/50) kan onder AA contrast ratio vallen | 1.4.3 Contrast Minimum |
| MIDDEL | Breadcrumbs ontbreken → geen Location indicator | 2.4.8 Location |
| LAAG | WhatsApp-knop overlapt content → bereikbaarheidsprobleem | 1.4.10 Reflow |

---

## Conversieblokkades

1. **Adverteerder → tarieven**: Geen prijsindicatie op adverteerpagina. Prospect kan niet beoordelen of budget past. Drempel te hoog.
2. **Lezer → nieuwsbrief**: CTA is aanwezig en functioneel. ✅ Geen blokkade.
3. **Lezer → partner**: Link via sponsored badge werkt. Maar geen "bezoek showroom" CTA vanuit artikelen.
4. **Professinal → showroom**: Adres niet klikbaar. Extra stap voor routeplanning.
5. **Social bezoeker → terugkeer**: Geen herinnering aan wat ze al gelezen hebben. Geen push-notificatie-optie.

---

## SEO-gerelateerde UX-blokkades

1. **Geen BreadcrumbList JSON-LD**: Google kan geen breadcrumb rich snippets tonen → lagere CTR
2. **Tags-pagina's**: Dunne intro-content → Google kan als thin content beoordelen
3. **Video-pagina**: Geen gerelateerde content → minder internal linking → lagere crawl-diepte
4. **Partner-detail**: LocalBusiness structured data niet aanwezig → gemiste local SEO
5. **Artikelen in dossier**: Dossier-relatie niet in schema → gemiste content-groupering

---

## Quick Wins (implementeerbaar in < 30 min per stuk)

| # | Fix | Impact | Inspanning |
|---|-----|--------|-----------|
| 1 | Engelse labels vertalen → Nederlands | MIDDEL | 5 min |
| 2 | WhatsApp-knop: `title` attribuut toevoegen | LAAG | 2 min |
| 3 | Showroom-adressen: Google Maps links | MIDDEL | 10 min |
| 4 | Tags-pagina: verrijk intro-tekst | LAAG | 5 min |
| 5 | Contact "Partnerships" → "Samenwerking" | LAAG | 2 min |
| 6 | Zoek geen-resultaten: populaire termen tonen | HOOG | 20 min |
| 7 | Adverteerpagina: verwachtingsmanagement bij CTA | MIDDEL | 10 min |

---

## Structurele Verbeteringen (vereisen meer werk)

| # | Verbetering | Impact | Inspanning |
|---|-------------|--------|-----------|
| 1 | Breadcrumb-component + JSON-LD | MIDDEL | 45 min |
| 2 | Zoekdialoog: initiële suggesties | HOOG | 30 min |
| 3 | Video-detailpagina: gerelateerde video's | HOOG | 30 min |
| 4 | Partner-listing: zoekfilter | MIDDEL | 30 min |
| 5 | Formuliervelden: `<label>` elementen | MIDDEL | 20 min |
| 6 | Social share-knoppen op artikelen | MIDDEL | 25 min |
| 7 | Dossier-contextlink op artikelen | MIDDEL | 30 min |
| 8 | Active state in navigatie | MIDDEL | 15 min |

---

## Prioriteitsvolgorde voor fixes

### Wave 1 — Kritieke UX gaps (impact op conversie + sessie)
1. Zoekfunctie: lege staat + geen-resultaten (GAP-01, GAP-02)
2. Video-detailpagina: gerelateerde video's (GAP-03)
3. Engelse labels → Nederlands (GAP-09, GAP-17)

### Wave 2 — Navigatie & context (impact op oriëntatie)
4. Showroom-adressen: Maps links (GAP-08)
5. WhatsApp tooltip (GAP-12)
6. Tags-pagina intro verrijken (GAP-13)
7. Adverteerpagina verwachtingsmanagement (GAP-10)

### Wave 3 — Structureel (grotere inspanning)
8. Breadcrumb-component (GAP-05)
9. Partner-filter (GAP-07)
10. Active state navigatie

### Wave 4 — Polish & future
11. Social share-knoppen (GAP-11)
12. Dossier-contextlink (GAP-16)
13. Formulier-labels (a11y)
14. Focus-stijlen audit
