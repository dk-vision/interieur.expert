# UX Acceptance Checklist — interieur.expert

Datum: 12 maart 2026
Status: Post-implementatie

Legenda: ✅ Pass | ❌ Fail | ⚠️ Partieel | — N.v.t.

---

## 1. Navigatie & Informatiestructuur

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 1.1 | Alle hoofdnavigatie-links zijn functioneel en leiden naar de juiste pagina | ✅ | |
| 1.2 | Actieve pagina is visueel gemarkeerd in de navigatie | ✅ | isActive() + accent underline + font-medium |
| 1.3 | Logo linkt naar homepage | ✅ | |
| 1.4 | Mobile hamburger-menu opent en sluit correct | ✅ | |
| 1.5 | Footer bevat alle relevante links | ✅ | |
| 1.6 | Breadcrumbs zijn beschikbaar op detailpagina's | ❌ | GAP-05: ontbreekt volledig |
| 1.7 | 404-pagina biedt navigatieopties | ✅ | Aangepaste not-found.tsx |
| 1.8 | Error-pagina biedt herstelmogelijkheden | ✅ | error.tsx met retry |

## 2. Zoekfunctie

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 2.1 | Zoekveld is vindbaar op desktop | ⚠️ | Icoon + ⌘K shortcut, geen zichtbaar veld |
| 2.2 | Zoekveld is vindbaar op mobiel | ❌ | GAP-06: alleen icoon zonder label |
| 2.3 | Zoekresultaten verschijnen terwijl je typt | ✅ | Debounced API call |
| 2.4 | Geen-resultaten staat bevat alternatieve suggesties | ✅ | FIX-01: 8 populaire topic-pills |
| 2.5 | Lege zoekstaat toont suggesties/populaire termen | ✅ | FIX-02: "Populaire onderwerpen" sectie |
| 2.6 | Zoekresultaten tonen contenttype-badge | ✅ | ContentTypeBadge component |
| 2.7 | Zoekdialoog sluit met Escape-toets | ✅ | |
| 2.8 | Zoekresultaten zijn bereikbaar met toetsenbord | ✅ | |

## 3. Artikelen & Content

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 3.1 | Artikelen laden met geoptimaliseerde hero-afbeelding | ✅ | next/image met priority |
| 3.2 | Leestijd wordt getoond | ✅ | MetaRow component |
| 3.3 | Tags zijn klikbaar en leiden naar tag-pagina | ✅ | |
| 3.4 | Gerelateerde artikelen worden getoond | ✅ | RelatedArticles component |
| 3.5 | Dossier-context is zichtbaar op artikelpagina | ✅ | FIX GAP-16: breadcrumb-stijl link boven MetaRow |
| 3.6 | Auteurs-info is correct getoond | ✅ | ArticleMeta component |
| 3.7 | Gesponsorde content is duidelijk gelabeld | ✅ | SponsoredBadge + SponsoredDisclosure |
| 3.8 | Datum wordt in correct formaat getoond | ✅ | Nederlandse datumopmaak |

## 4. Video

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 4.1 | Video wordt in privacy-mode geladen (youtube-nocookie) | ✅ | |
| 4.2 | VideoThumbnail toont play-icoon | ✅ | PlayIcon overlay |
| 4.3 | Video-detailpagina toont transcript/beschrijving | ✅ | PortableText body |
| 4.4 | Gerelateerde video's worden getoond na huidige video | ✅ | FIX-03: "Meer video's" sectie (max 3) |
| 4.5 | Video-overzichtspagina laadt correct | ✅ | |

## 5. Partners

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 5.1 | Partner-listing toont alle partners | ✅ | |
| 5.2 | Partner-listing is filterbaar | ❌ | GAP-07 |
| 5.3 | Partner-detailpagina toont showroom-info | ✅ | |
| 5.4 | Showroom-adres linkt naar kaartservice | ✅ | FIX-05: Google Maps link |
| 5.5 | Telefoon is klikbaar (tel: link) | ✅ | |
| 5.6 | Website-link opent in nieuw tabblad | ✅ | target="_blank" |
| 5.7 | Social media links zijn functioneel | ✅ | |
| 5.8 | "Featured Partners" label is Nederlands | ✅ | FIX-06/12: "Uitgelichte partners" |

## 6. Formulieren

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 6.1 | Contactformulier heeft browser-validatie | ✅ | noValidate verwijderd |
| 6.2 | Contactformulier toont succesbericht | ✅ | |
| 6.3 | Contactformulier toont foutafhandeling | ✅ | |
| 6.4 | Nieuwsbrief-aanmelding toont succesbericht | ✅ | |
| 6.5 | Nieuwsbrief-aanmelding toont foutafhandeling | ✅ | Try/catch met message |
| 6.6 | Formulier submit-knoppen hebben loading state | ✅ | Spinner + disabled |
| 6.7 | Formuliervelden hebben labels of placeholders | ⚠️ | Placeholder only, geen <label> |

## 7. Mobiel & Responsiviteit

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 7.1 | Site is bruikbaar op 320px breed | ⚠️ | Niet specifiek getest |
| 7.2 | Touch targets zijn minimaal 44x44px | ⚠️ | Meeste knoppen OK, navigatie-items niet gecontroleerd |
| 7.3 | Tekst is leesbaar zonder zoomen | ✅ | |
| 7.4 | Afbeeldingen schalen correct | ✅ | next/image responsive |
| 7.5 | Hamburger-menu werkt na scroll | ✅ | |
| 7.6 | WhatsApp-knop overlapt geen content | ⚠️ | GAP-18: mogelijk conflict met cookie-banner |
| 7.7 | Cookie-banner is bruikbaar op mobiel | ✅ | |

## 8. Toegankelijkheid

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 8.1 | Pagina's zijn navigeerbaar met toetsenbord | ⚠️ | Basis OK, focus management niet overal |
| 8.2 | Afbeeldingen hebben alt-teksten | ✅ | Vanuit Sanity CMS |
| 8.3 | Koppen volgen logische hiërarchie (h1→h2→h3) | ✅ | |
| 8.4 | Formuliervelden zijn gelinkt aan labels | ❌ | Placeholder-only patroon |
| 8.5 | Kleurcontrast voldoet aan WCAG AA (4.5:1) | ⚠️ | Secundaire tekst text/50 kan falen |
| 8.6 | Focus-stijlen zijn zichtbaar | ⚠️ | outline-none op sommige elementen in globals.css |
| 8.7 | aria-labels zijn correct op interactieve elementen | ✅ | Aanwezig op zoek, WhatsApp, nav |
| 8.8 | lang="nl" op html-element | ✅ | |

## 9. Failure Recovery

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 9.1 | API-fouten tonen gebruikersvriendelijk bericht | ⚠️ | Zoek-API ja, andere routes variabel |
| 9.2 | 404 voor niet-bestaande pagina's is afgehandeld | ✅ | |
| 9.3 | Error boundary vangt runtime fouten op | ✅ | error.tsx |
| 9.4 | Formulier-submits kunnen herhaald worden na fout | ✅ | Reset error state |
| 9.5 | Netwerk-timeout toont melding | ❌ | Geen expliciete timeout handling |

## 10. Performance & SEO

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 10.1 | LCP-afbeelding heeft priority | ✅ | FeaturedCard + hero |
| 10.2 | Core Web Vitals: LCP < 2.5s | ⚠️ | Niet live gemeten |
| 10.3 | Metadata (title, description) op alle pagina's | ⚠️ | Tag-pagina's nu ja, dossier-pagina's niet gecontroleerd |
| 10.4 | Open Graph meta-tags aanwezig | ✅ | Via buildMetadata |
| 10.5 | Structured data (JSON-LD) op artikelen | ✅ | Article schema |
| 10.6 | Breadcrumb structured data | ❌ | GAP-05 |

## 11. Conversie & Engagement

| # | Criterium | Status | Notitie |
|---|-----------|--------|---------|
| 11.1 | Nieuwsbrief-CTA is zichtbaar op relevante pagina's | ✅ | |
| 11.2 | Conversiepad van content naar partner is helder | ⚠️ | Via tags gelinkt, niet expliciet |
| 11.3 | Adverteerpagina biedt voldoende info voor prospect | ⚠️ | FIX-10: verwachtingstekst, maar geen tarieven |
| 11.4 | WhatsApp-knop is herkenbaar | ✅ | FIX-08: tooltip toegevoegd |
| 11.5 | Social share-opties beschikbaar | ❌ | GAP-11 |

---

## Totaalscore

| Categorie | Pass | Fail | Partieel | N.v.t. |
|-----------|------|------|----------|--------|
| Navigatie | 6 | 1 | 0 | 0 |
| Zoeken | 6 | 1 | 1 | 0 |
| Artikelen | 8 | 0 | 0 | 0 |
| Video | 5 | 0 | 0 | 0 |
| Partners | 7 | 1 | 0 | 0 |
| Formulieren | 5 | 0 | 1 | 0 |
| Mobiel | 3 | 0 | 4 | 0 |
| Toegankelijkheid | 4 | 1 | 3 | 0 |
| Failure recovery | 3 | 1 | 1 | 0 |
| Performance & SEO | 3 | 1 | 2 | 0 |
| Conversie | 2 | 1 | 2 | 0 |

**Totaal: 52 Pass / 7 Fail / 14 Partieel**
