# Implementation Log — interieur.expert UX/UI Audit

Datum: 12 maart 2026

---

## Overzicht

| # | Fix ID | Beschrijving | Bestanden | Status |
|---|--------|--------------|-----------|--------|
| 1 | FIX-04 | "Sponsored" → "Gesponsord" in zoekresultaten | `SmartSearchDialog.tsx` | ✅ |
| 2 | FIX-01 | Zoek geen-resultaten: populaire suggesties | `SmartSearchDialog.tsx` | ✅ |
| 3 | FIX-02 | Zoek lege staat: populaire onderwerpen | `SmartSearchDialog.tsx` | ✅ |
| 4 | FIX-03 | Video: gerelateerde video's sectie | `video/[slug]/page.tsx`, `queries.ts` | ✅ |
| 5 | FIX-05 | Showroom-adres → Google Maps link | `partners/[slug]/page.tsx` | ✅ |
| 6 | FIX-06 | "⭐ Featured" → "⭐ Uitgelicht" | `partners/[slug]/page.tsx` | ✅ |
| 7 | FIX-07 | "Gesponsorde Content" → "Artikelen in samenwerking" | `partners/[slug]/page.tsx` | ✅ |
| 8 | FIX-08 | WhatsApp tooltip toevoegen | `WhatsAppChat.tsx` | ✅ |
| 9 | FIX-09 | Tags-pagina intro verrijken | `tags/[tag]/page.tsx` | ✅ |
| 10 | FIX-10 | Adverteren verwachtingstekst CTA | `adverteren/page.tsx` | ✅ |
| 11 | FIX-11 | Contact "Partnerships" → "Samenwerking" | `contact/page.tsx` | ✅ |
| 12 | FIX-12 | Partners heading → "Uitgelichte partners" | `partners/page.tsx` | ✅ |

---

## Detaillog

### 1. FIX-04 — "Sponsored" → "Gesponsord"
- **Bestand**: `components/ui/SmartSearchDialog.tsx`
- **Wijziging**: Badge-tekst `Sponsored` → `Gesponsord` in zoekresultaten
- **GAP**: GAP-09 (taalconsistentie)

### 2. FIX-01 — Zoek geen-resultaten suggesties
- **Bestand**: `components/ui/SmartSearchDialog.tsx`
- **Wijziging**: Bij geen zoekresultaten: toont nu "Probeer ook:" met 8 populaire topics als klikbare pills (verlichting, keuken, badkamer, woonkamer, scandinavisch, minimalistisch, duurzaam, kleur). Klik op pill vult zoekveld.
- **GAP**: GAP-02

### 3. FIX-02 — Zoek lege staat suggesties
- **Bestand**: `components/ui/SmartSearchDialog.tsx`
- **Wijziging**: Bij leeg zoekveld: toont "Populaire onderwerpen" heading + dezelfde 8 pills. Gedeelde constante `POPULAR_TOPICS` bovenaan component.
- **GAP**: GAP-01

### 4. FIX-03 — Gerelateerde video's
- **Bestanden**: `lib/sanity/queries.ts`, `app/(site)/video/[slug]/page.tsx`
- **Wijziging**: Nieuwe GROQ-query `relatedVideosQuery` (vindt video's met overlappende tags, max 3). Video-detailpagina toont nu "Meer video's" sectie met thumbnail, play-icoon overlay, titel, en duur. Fallback: als geen tag-matches, toont recentste video's (via `latestVideosQuery`).
- **GAP**: GAP-03

### 5. FIX-05 — Showroom-adres klikbaar
- **Bestand**: `app/(site)/partners/[slug]/page.tsx`
- **Wijziging**: Showroom-adres gewrapt in `<a>` met `href="https://www.google.com/maps/search/?api=1&query={encoded address}"`, `target="_blank"`, `rel="noopener noreferrer"`. Hover-stijl: underline.
- **GAP**: GAP-08

### 6. FIX-06 — "Featured" → "Uitgelicht"
- **Bestand**: `app/(site)/partners/[slug]/page.tsx`
- **Wijziging**: Badge "⭐ Featured" → "⭐ Uitgelicht"
- **GAP**: GAP-09

### 7. FIX-07 — Sectie-heading vertaald
- **Bestand**: `app/(site)/partners/[slug]/page.tsx`
- **Wijziging**: "Gesponsorde Content" → "Artikelen in samenwerking"
- **GAP**: GAP-09

### 8. FIX-08 — WhatsApp tooltip
- **Bestand**: `components/ui/WhatsAppChat.tsx`
- **Wijziging**: `title="Stuur ons een WhatsApp-bericht"` toegevoegd aan `<a>` tag
- **GAP**: GAP-12

### 9. FIX-09 — Tags-pagina intro
- **Bestand**: `app/(site)/tags/[tag]/page.tsx`
- **Wijziging**: Intro gewijzigd van "{count} artikel(en) met deze tag" naar "Ontdek {count} artikel(en) over {tag}. Van inspiratie tot praktische tips."
- **GAP**: GAP-13

### 10. FIX-10 — Adverteren verwachtingstekst
- **Bestand**: `app/(site)/adverteren/page.tsx`
- **Wijziging**: Onder CTA-knoppen: `<p>` toegevoegd: "We bezorgen graag een voorstel op maat — reken op een antwoord binnen 2 werkdagen."
- **GAP**: GAP-10

### 11. FIX-11 — Contact labels
- **Bestand**: `app/(site)/contact/page.tsx`
- **Wijziging**: Kaarttitel "Partnerships" → "Samenwerking". Actie "Meer informatie" → "Mail het team".
- **GAP**: GAP-17

### 12. FIX-12 — Partners heading
- **Bestand**: `app/(site)/partners/page.tsx`
- **Wijziging**: Sectie-heading "Featured Partners" → "Uitgelichte partners". HTML-commentaar eveneens vertaald.
- **GAP**: GAP-09

---

## Build-verificatie

- **Resultaat**: ✅ Build geslaagd
- **Statische pagina's**: Alle routes genereren correct
- **Geen TypeScript-fouten**
- **Geen nieuwe warnings**
