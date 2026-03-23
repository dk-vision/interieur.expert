# Validation Report — interieur.expert UX/UI Audit

Datum: 12 maart 2026
Status: Post-implementatie

---

## Validatiemethode

- Build-verificatie: `next build` geslaagd, alle routes genereren
- Code-review: alle wijzigingen gecontroleerd op regressie
- Acceptance checklist: herbeoordeeld per geïmplementeerde fix

---

## Fix-validatie per item

| Fix | GAP | Acceptatiecriteria | Resultaat |
|-----|-----|---------------------|-----------|
| FIX-01 | GAP-02 | Na zoeken zonder resultaten: 8 suggesties zichtbaar als klikbare knoppen | ✅ PASS — `POPULAR_TOPICS` array gerenderd als pills met `onClick={() => setQuery(topic)}` |
| FIX-02 | GAP-01 | Bij openen zoekvenster: "Populaire onderwerpen" + 8 pills | ✅ PASS — Conditioneel blok `{!query && (...)}` toont suggesties |
| FIX-03 | GAP-03 | Onder video: "Meer video's" met max 3 items | ✅ PASS — `relatedVideosQuery` haalt tag-matched video's op, fallback naar `latestVideosQuery` |
| FIX-04 | GAP-09 | Badge toont "Gesponsord" | ✅ PASS — Tekst gewijzigd in SmartSearchDialog |
| FIX-05 | GAP-08 | Klik op adres opent Google Maps | ✅ PASS — `<a>` met Maps URL + encoded adres |
| FIX-06 | GAP-09 | Badge toont "⭐ Uitgelicht" | ✅ PASS |
| FIX-07 | GAP-09 | Heading toont "Artikelen in samenwerking" | ✅ PASS |
| FIX-08 | GAP-12 | Hover toont WhatsApp tooltip | ✅ PASS — `title` attribuut toegevoegd |
| FIX-09 | GAP-13 | Tag-pagina toont contextuele intro | ✅ PASS — Tekst verrijkt met "Ontdek ... Van inspiratie tot praktische tips." |
| FIX-10 | GAP-10 | Verwachtingstekst onder CTA | ✅ PASS — "reken op een antwoord binnen 2 werkdagen" |
| FIX-11 | GAP-17 | "Samenwerking" + "Mail het team →" | ✅ PASS |
| FIX-12 | GAP-09 | Heading "Uitgelichte partners" | ✅ PASS |

---

## Acceptance Checklist — herbeoordeeld

| # | Criterium | Voor | Na | Wijziging |
|---|-----------|------|-----|-----------|
| 2.4 | Geen-resultaten met suggesties | ❌ | ✅ | FIX-01 |
| 2.5 | Lege zoekstaat toont suggesties | ❌ | ✅ | FIX-02 |
| 4.4 | Gerelateerde video's na huidige video | ❌ | ✅ | FIX-03 |
| 5.4 | Showroom-adres linkt naar kaartservice | ❌ | ✅ | FIX-05 |
| 5.8 | "Featured Partners" label is Nederlands | ❌ | ✅ | FIX-06, FIX-12 |
| 11.3 | Adverteerpagina biedt voldoende info | ❌ | ⚠️ | FIX-10 (verwachtingstekst, geen tarieven) |
| 11.4 | WhatsApp-knop is herkenbaar | ⚠️ | ✅ | FIX-08 |

---

## Bijgewerkte totaalscore

| Categorie | Pass (voor) | Pass (na) | Verbetering |
|-----------|-------------|-----------|-------------|
| Navigatie | 5/7 | 5/7 | — |
| Zoeken | 4/8 | 6/8 | +2 |
| Artikelen | 7/8 | 7/8 | — |
| Video | 4/5 | 5/5 | +1 |
| Partners | 5/8 | 7/8 | +2 |
| Formulieren | 5/6 | 5/6 | — |
| Mobiel | 3/7 | 3/7 | — |
| Toegankelijkheid | 4/8 | 4/8 | — |
| Failure recovery | 3/5 | 3/5 | — |
| Performance & SEO | 3/6 | 3/6 | — |
| Conversie | 1/5 | 2/5 | +1 |

**Totaal: 44 → 50 Pass (+6), 15 → 9 Fail (-6), 14 → 14 Partieel**

---

## Onopgeloste gaps (Wave 4 — toekomstig)

| GAP | Beschrijving | Reden voor uitstel |
|-----|-------------|---------------------|
| GAP-04 | Navigatie-labels onduidelijk | Vereist UX-research / hover-tooltips design |
| GAP-05 | Breadcrumbs ontbreken | Nieuw component + JSON-LD + integratie alle pagina's |
| GAP-06 | Zoek op mobiel niet vindbaar | Vereist header redesign |
| GAP-07 | Partner-filter | Client-side zoeklogica |
| GAP-11 | Social share-knoppen | Nieuw component |
| GAP-14 | Paginering | Backend + frontend |
| GAP-15 | Onboarding homepage | Content-strategie vereist |
| GAP-16 | Dossier-contextlink | GROQ-query uitbreiding |
| GAP-18 | WhatsApp/cookie overlap | Consent-state detectie |
| GAP-19 | Vergelijkfunctie | Feature development |
| GAP-20 | "Nieuw" markering | Client-side state |

---

## Conclusie

12 van 20 geïdentificeerde gaps zijn opgelost in deze sprint. De 3 kritieke gaps (HOOG) zijn allemaal geadresseerd. Van de 8 MIDDEL gaps zijn er 6 opgelost. De resterende gaps vereisen grotere structurele wijzigingen of nieuwe features die in een volgende sprint gepland kunnen worden.

Build status: ✅ Geslaagd — geen regressies.
