# UX/UI Remediation Plan — interieur.expert

Datum: 12 maart 2026
Status: Definitief — klaar voor implementatie

---

## Structuur per issue

- **ID** — GAP-referentie
- **Prioriteit** — Wave 1-4
- **Betrokken bestanden** — welke code wijzigt
- **Implementatie-aanpak** — wat precies te doen
- **UX/UI-rationale** — waarom deze wijziging
- **Acceptatiecriteria** — wanneer is het klaar
- **Regressierisico** — wat kan breken

---

## Wave 1 — Kritieke UX gaps

### FIX-01: Zoek geen-resultaten verbeteren (GAP-02)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `components/ui/SmartSearchDialog.tsx` |
| **Aanpak** | In de "geen resultaten" tak (huidige lege `<div>` met tekst), voeg populaire zoeksuggesties toe als klikbare knoppen. Hardcode 8 populaire tags: "verlichting", "keuken", "badkamer", "woonkamer", "scandinavisch", "minimalistisch", "duurzaam", "kleur". Elke suggestie wordt een button die de query instelt op die term. |
| **Rationale** | Dead end bij geen resultaten is de #1 UX-fout bij zoekfuncties. Suggesties bieden een alternatief pad en verlagen bounce. |
| **Acceptatiecriteria** | Na zoeken op term zonder resultaten: 8 suggesties zichtbaar als klikbare knoppen. Klik op suggestie vult zoekterm in en triggert nieuwe zoekopdracht. |
| **Regressierisico** | Laag — alleen UI toevoeging in bestaande branch van conditionele rendering. |

### FIX-02: Zoek lege staat verbeteren (GAP-01)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `components/ui/SmartSearchDialog.tsx` |
| **Aanpak** | Wanneer `query` leeg is, toon een "Populaire onderwerpen" sectie in het resultatenveld. Dezelfde 8 populaire termen als in FIX-01. Aparte constante `POPULAR_TOPICS` bovenaan het component. Klik op een term vult het zoekveld. |
| **Rationale** | Lege zoekdialoog voelt onaf. Suggesties geven startpunt aan gebruikers die niet weten wat ze zoeken. |
| **Acceptatiecriteria** | Bij openen zoekvenster (zonder query): "Populaire onderwerpen" heading + 8 clickable pills zichtbaar. Klik op pill vult zoekveld. |
| **Regressierisico** | Laag — toevoeging in een nu-lege sectie. |

### FIX-03: Video dead end oplossen (GAP-03)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/video/[slug]/page.tsx`, `lib/sanity/queries.ts` |
| **Aanpak** | 1) Nieuwe GROQ-query `relatedVideosQuery` toevoegen (vergelijkbaar met `relatedArticlesQuery` maar voor `_type == "video"`). 2) Op de video-detailpagina: fetch gerelateerde video's (max 3, op basis van tags). 3) Render "Meer video's" sectie met bestaande structuur (thumbnail + titel + link). Fallback op recentste video's als geen tag-match. |
| **Rationale** | Dead end na video bekijken zorgt voor sessieverlies. Gerelateerde content verhoogt sessieduur en pagina's/sessie. |
| **Acceptatiecriteria** | Onder transcript/body van video: "Meer video's" sectie met max 3 video-links. Elke link toont thumbnail, titel, en duur. Bij geen tag-match: recentste video's. |
| **Regressierisico** | Middel — nieuwe GROQ-query, nieuwe sectie. Geen bestaande functionaliteit wordt gewijzigd. Build moet slagen. |

### FIX-04: "Sponsored" label → "Gesponsord" (GAP-09, deels)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `components/ui/SmartSearchDialog.tsx` |
| **Aanpak** | In de zoekresultaten, de `Sponsored` badge-tekst wijzigen naar `Gesponsord`. |
| **Rationale** | Taalconsistentie op een `lang="nl"` site. |
| **Acceptatiecriteria** | Gesponsorde zoekresultaten tonen "Gesponsord" i.p.v. "Sponsored". |
| **Regressierisico** | Nul — tekstwijziging. |

---

## Wave 2 — Navigatie & context

### FIX-05: Showroom-adressen klikbaar (GAP-08)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/partners/[slug]/page.tsx` |
| **Aanpak** | Wrap showroom-adres in `<a>` met `href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(address)}"`. `target="_blank"`, `rel="noopener noreferrer"`. Visuele stijl: underline on hover (consistent met telefoon-link). |
| **Rationale** | Adres is nu platte tekst terwijl telefoon klikbaar is. Inconsistent en extra manuele stap voor routeplanning. |
| **Acceptatiecriteria** | Klik op showroom-adres opent Google Maps in nieuw tabblad met het adres als zoekterm. |
| **Regressierisico** | Laag — toevoeging van wrapper element. |

### FIX-06: "Featured" badge → "Uitgelicht" (GAP-09)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/partners/[slug]/page.tsx` |
| **Aanpak** | `⭐ Featured` badge-tekst wijzigen naar `⭐ Uitgelicht`. |
| **Rationale** | Taalconsistentie. |
| **Acceptatiecriteria** | Partner-detailpagina toont "⭐ Uitgelicht" i.p.v. "⭐ Featured". |
| **Regressierisico** | Nul. |

### FIX-07: "Gesponsorde Content" → "Artikelen in samenwerking" (GAP-09)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/partners/[slug]/page.tsx` |
| **Aanpak** | Sectie-heading "Gesponsorde Content" wijzigen naar "Artikelen in samenwerking". |
| **Rationale** | "Gesponsorde Content" is een directe Engelse vertaling die onnatuurlijk klinkt. "Artikelen in samenwerking" sluit aan bij de toon van de site. |
| **Acceptatiecriteria** | Partner-detail toont "Artikelen in samenwerking" als sectie-heading. |
| **Regressierisico** | Nul. |

### FIX-08: WhatsApp tooltip (GAP-12)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `components/ui/WhatsAppChat.tsx` |
| **Aanpak** | `title="Stuur ons een WhatsApp-bericht"` toevoegen aan de `<a>` tag. |
| **Rationale** | Verwachtingsmanagement — bezoeker weet wat de knop doet voordat hij klikt. |
| **Acceptatiecriteria** | Hover op WhatsApp-knop toont tooltip "Stuur ons een WhatsApp-bericht". |
| **Regressierisico** | Nul. |

### FIX-09: Tags-pagina intro verrijken (GAP-13)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/tags/[tag]/page.tsx` |
| **Aanpak** | Intro-tekst wijzigen van `{count} artikel(en) met deze tag` naar `Ontdek {count} artikel(en) over {tag}. Van inspiratie tot praktische tips.` |
| **Rationale** | Huidige tekst is droog en biedt geen context of SEO-waarde. |
| **Acceptatiecriteria** | Tag-pagina toont contextuele intro i.p.v. droge telling. |
| **Regressierisico** | Nul. |

### FIX-10: Adverteerpagina verwachtingsmanagement (GAP-10)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/adverteren/page.tsx` |
| **Aanpak** | Onder de CTA-knoppen, voeg een `<p>` toe: "We bezorgen graag een voorstel op maat — reken op een antwoord binnen 2 werkdagen." |
| **Rationale** | Prospect weet dat er een antwoord komt en hoe snel. Verlaagt de drempel om contact op te nemen. |
| **Acceptatiecriteria** | Onder de CTA-knoppen op de adverteerpagina staat een verwachtingstekst. |
| **Regressierisico** | Nul. |

### FIX-11: Contact "Partnerships" → "Samenwerking" (GAP-17)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/contact/page.tsx` |
| **Aanpak** | ContactCard titel "Partnerships" → "Samenwerking". Actie "Meer informatie" → "Mail het team". |
| **Rationale** | Taalconsistentie + duidelijkere CTA. |
| **Acceptatiecriteria** | Contact-pagina toont "Samenwerking" als kaart-titel en "Mail het team →" als actie. |
| **Regressierisico** | Nul. |

---

## Wave 3 — Structureel

### FIX-12: Partner kop "Featured Partners" → "Uitgelichte partners" (GAP-09)

| Veld | Waarde |
|------|--------|
| **Bestanden** | `app/(site)/partners/page.tsx` |
| **Aanpak** | Zoek naar heading "Featured Partners" en wijzig naar "Uitgelichte partners". |
| **Rationale** | Taalconsistentie. |
| **Acceptatiecriteria** | Partners-listing toont Nederlandse heading. |
| **Regressierisico** | Nul. |

---

## Wave 4 — Future (niet in deze sprint)

De volgende gaps worden gedocumenteerd maar niet geïmplementeerd:

- **GAP-05**: Breadcrumb-component (vereist nieuwe component + JSON-LD + integratie op alle detailpagina's)
- **GAP-06**: Zoek op mobiel verbeterd (vereist header redesign)
- **GAP-07**: Partner-filter (vereist client-side zoeklogica)
- **GAP-11**: Social share-knoppen (vereist nieuw component)
- **GAP-14**: Paginering (vereist backend-aanpassing)
- **GAP-15**: Onboarding/categorieblokken homepage
- **GAP-16**: Dossier-contextlink op artikelen (vereist GROQ-query uitbreiding)
- **GAP-18**: WhatsApp/cookie-banner overlap (vereist consent-state detectie)
- **GAP-19**: Vergelijkfunctionaliteit
- **GAP-20**: "Nieuw" markering voor terugkerende bezoekers

---

## Implementatievolgorde

1. FIX-04 — "Sponsored" → "Gesponsord" (SmartSearchDialog)
2. FIX-01 — Zoek geen-resultaten suggesties (SmartSearchDialog)
3. FIX-02 — Zoek lege staat suggesties (SmartSearchDialog)
4. FIX-03 — Video gerelateerde video's (queries + video page)
5. FIX-05 — Showroom-adressen Maps link
6. FIX-06 — "Featured" → "Uitgelicht"
7. FIX-07 — "Gesponsorde Content" → "Artikelen in samenwerking"
8. FIX-08 — WhatsApp tooltip
9. FIX-09 — Tags intro verrijken
10. FIX-10 — Adverteren verwachtingstekst
11. FIX-11 — Contact labels NL
12. FIX-12 — Partners heading NL

Logica: eerst het bestand dat de meeste wijzigingen nodig heeft (SmartSearchDialog: 3 fixes), dan het complexere werk (video page + query), dan de eenvoudige tekst-/attribuutwijzigingen.
