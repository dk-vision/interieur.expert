# Failure State Audit — interieur.expert

Datum: 12 maart 2026
Status: Definitief

---

## Methode

Voor elke belangrijke gebruikersstroom is gecontroleerd wat er gebeurt als het mis gaat: geen resultaten, ontbrekende data, netwerk-fouten, ongeldige input, dead ends, en ontbrekende vervolgstappen.

---

## F-01 — Zoek: geen resultaten

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-03, US-06, US-13 |
| **Pagina/component** | `SmartSearchDialog` |
| **Foutbeschrijving** | Gebruiker zoekt een term die geen resultaten oplevert |
| **Huidige UX-consequentie** | Tekst: "Geen resultaten gevonden voor '{query}'". Geen suggesties, geen alternatieve paden, geen populaire termen. Gebruiker ziet leegte en verlaat site. |
| **Vereiste fallback** | Toon populaire zoektermen ("Probeer ook: verlichting, woonkamer, keuken"), of toon recente/populaire artikelen als alternatief. |

---

## F-02 — Zoek: leeg zoekveld

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-03, US-06 |
| **Pagina/component** | `SmartSearchDialog` |
| **Foutbeschrijving** | Gebruiker opent het zoekvenster maar typt nog niets |
| **Huidige UX-consequentie** | Volledig leeg dialoogvenster — geen hint, geen suggesties, geen context. Gebruiker moet zelf weten wat te zoeken. |
| **Vereiste fallback** | Toon populaire zoektermen of categorieën als startpunt. Bijvoorbeeld: "Populair: #verlichting #scandinavisch #badkamer #keuken" |

---

## F-03 — Pagina niet gevonden (404)

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-03, US-09, US-18 |
| **Pagina/component** | `app/not-found.tsx` |
| **Foutbeschrijving** | Gebruiker navigeert naar een URL die niet bestaat |
| **Huidige UX-consequentie** | ✅ Branded 404-pagina met twee knoppen ("Naar de homepage", "Bekijk inspiratie") en populaire tags. Adequate recovery. |
| **Vereiste fallback** | Aanwezig. Eventueel toevoegen: zoekfunctie of recente artikelen. |

---

## F-04 — Server-/render-fout (500)

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | Alle |
| **Pagina/component** | `app/error.tsx` |
| **Foutbeschrijving** | Sanity-query faalt, component crasht, netwerkfout |
| **Huidige UX-consequentie** | ✅ Error boundary met "Probeer opnieuw" knop en homepage-link. Console logging voor debugging. |
| **Vereiste fallback** | Aanwezig. Adequate recovery. |

---

## F-05 — Artikel met verkeerde categorie in URL

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-09, US-18 |
| **Pagina/component** | `app/(site)/[category]/[slug]/page.tsx` |
| **Foutbeschrijving** | URL heeft juiste slug maar verkeerde categorie (bv. `/inspiratie/artikel-dat-bij-advies-hoort`) |
| **Huidige UX-consequentie** | ✅ `notFound()` wordt aangeroepen → branded 404. |
| **Vereiste fallback** | Aanwezig. Overweeg redirect naar juiste categorie i.p.v. 404. |

---

## F-06 — Artikel zonder hero-image

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-01, US-05, US-11 |
| **Pagina/component** | `app/(site)/[category]/[slug]/page.tsx` |
| **Foutbeschrijving** | Artikel heeft geen `featuredImage` in Sanity |
| **Huidige UX-consequentie** | ✅ Hero-sectie rendert niet (conditioneel). Geen visueel ongeluk. |
| **Vereiste fallback** | Aanwezig. Page werkt zonder afbeelding. |

---

## F-07 — Partner niet gevonden

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-02, US-04, US-12 |
| **Pagina/component** | `app/(site)/partners/[slug]/page.tsx` |
| **Foutbeschrijving** | Partner-slug bestaat niet in Sanity |
| **Huidige UX-consequentie** | ✅ `notFound()` → branded 404. |
| **Vereiste fallback** | Aanwezig. |

---

## F-08 — Partner zonder showrooms

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-04, US-12 |
| **Pagina/component** | `app/(site)/partners/[slug]/page.tsx` |
| **Foutbeschrijving** | Partner heeft geen showroom-data in Sanity |
| **Huidige UX-consequentie** | ✅ Showroom-sectie wordt niet getoond. Geen foutmelding. |
| **Vereiste fallback** | Aanwezig. Maar: gebruiker weet niet of partner géén showrooms heeft of dat de data ontbreekt. Eventueel: "Neem contact op voor showroom-informatie." |

---

## F-09 — Contact formulier: serverfout

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-04, US-10, US-17 |
| **Pagina/component** | `components/ui/ContactForm.tsx` + `app/api/contact/route.ts` |
| **Foutbeschrijving** | Formulier-submit faalt (netwerk, Campaign Monitor API down, SMTP fout) |
| **Huidige UX-consequentie** | ✅ Foutmelding onder formulier. Gebruiker kan opnieuw proberen. |
| **Vereiste fallback** | Aanwezig. Eventueel: toon directe email als alternatief ("Of mail ons direct: studio@interieur.expert"). |

---

## F-10 — Contact formulier: ongeldige input

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-08, US-10 reditactioneel |
| **Pagina/component** | `components/ui/ContactForm.tsx` |
| **Foutbeschrijving** | Gebruiker vult ongeldig email-adres in of laat veld leeg |
| **Huidige UX-consequentie** | ✅ Browser-native validatie blokkeert submit (na noValidate verwijdering). |
| **Vereiste fallback** | Aanwezig. Browser-native is voldoende voor de huidige situatie. |

---

## F-11 — Nieuwsbrief: dubbele inschrijving

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-01 |
| **Pagina/component** | `components/ui/NewsletterCTA.tsx` + `app/api/newsletter/route.ts` |
| **Foutbeschrijving** | Gebruiker die al is ingeschreven, probeert opnieuw in te schrijven |
| **Huidige UX-consequentie** | ✅ Blauwe badge: "Je was al ingeschreven — welkom terug!" |
| **Vereiste fallback** | Aanwezig. Uitstekende afhandeling. |

---

## F-12 — Nieuwsbrief: netwerk-/API-fout

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-01 |
| **Pagina/component** | `components/ui/NewsletterCTA.tsx` |
| **Foutbeschrijving** | Campaign Monitor API is onbereikbaar |
| **Huidige UX-consequentie** | ✅ Rode badge: "Verbindingsfout. Probeer het opnieuw." of "Inschrijving mislukt. Probeer het opnieuw." |
| **Vereiste fallback** | Aanwezig. Duidelijke foutmelding met retry-mogelijkheid. |

---

## F-13 — Video: YouTube embed faalt

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-05, US-16 |
| **Pagina/component** | `app/(site)/video/[slug]/page.tsx` |
| **Foutbeschrijving** | YouTube-video is verwijderd, geblokkeerd, of embed is niet beschikbaar |
| **Huidige UX-consequentie** | ⚠️ YouTube toont eigen foutmelding ("Video niet beschikbaar") in het iframe. Geen fallback vanuit de site. |
| **Vereiste fallback** | Overweeg: tekst onder de embed met "Heeft de video niet geladen? Bekijk hem op YouTube" met directe link. |

---

## F-14 — Video-detail: dead end na video

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-16 |
| **Pagina/component** | `app/(site)/video/[slug]/page.tsx` |
| **Foutbeschrijving** | Gebruiker heeft video bekeken en wil verder kijken |
| **Huidige UX-consequentie** | ❌ Geen gerelateerde video's. Geen "volgende video". Na de video en optionele transcript is er alleen een ad-slot en dan niets meer. Dead end. |
| **Vereiste fallback** | Sectie "Meer video's" met 3-6 gerelateerde video's op basis van tags of categorie. |

---

## F-15 — Dossier-artikel: geen terugnavigatie

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-15 |
| **Pagina/component** | `app/(site)/[category]/[slug]/page.tsx` |
| **Foutbeschrijving** | Gebruiker leest een artikel dat deel uitmaakt van een dossier, wil terug naar het dossier |
| **Huidige UX-consequentie** | ❌ Geen "terug naar dossier" link. Geen breadcrumbs. Gebruiker moet browser-back gebruiken. |
| **Vereiste fallback** | Breadcrumbs: Home > [Dossier titel] > [Artikel titel]. Of: banner/link "Dit artikel hoort bij dossier: [Dossiernaam]". |

---

## F-16 — Tag-pagina: veel artikelen zonder paginering

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-01 |
| **Pagina/component** | `app/(site)/tags/[tag]/page.tsx` |
| **Foutbeschrijving** | Een tag heeft 50+ artikelen, alle worden in één keer geladen |
| **Huidige UX-consequentie** | ⚠️ Alle artikelen worden gerenderd. Bij groeiende content → trage pagina, lange scroll, groot HTML-document. |
| **Vereiste fallback** | Paginering of "Laad meer" knop na eerste 12-18 artikelen. |

---

## F-17 — Adverteerpagina: geen tarieven

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-10 |
| **Pagina/component** | `app/(site)/adverteren/page.tsx` |
| **Foutbeschrijving** | Adverteerder zoekt tarieven of mediakit |
| **Huidige UX-consequentie** | ❌ Gaat over mogelijkheden en formaten. Geen prijsindicatie. Geen mediakit download. Geen vergelijkingstabel. |
| **Vereiste fallback** | Minimaal: "Vraag onze tarieven aan" CTA met duidelijke verwachting. Ideaal: indicatieve prijzen of "vanaf" bedragen. |

---

## F-18 — Partner-listing: geen filter, geen zoek

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-02, US-04, US-12 |
| **Pagina/component** | `app/(site)/partners/page.tsx` |
| **Foutbeschrijving** | Gebruiker zoekt partner op regio, type, of naam |
| **Huidige UX-consequentie** | ❌ Geen filter, geen zoekfunctie. Gebruiker moet handmatig door alle partners scrollen. Bij weinig partners (huidige situatie) is dit acceptabel; bij groei wordt het een probleem. |
| **Vereiste fallback** | Client-side filter op naam/regio. Op termijn: categorie-filter en locatie-kaart. |

---

## F-19 — Showroom-adres: niet klikbaar

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-04, US-12 |
| **Pagina/component** | `app/(site)/partners/[slug]/page.tsx` |
| **Foutbeschrijving** | Showroom-adres is platte tekst, niet klikbaar naar Google Maps |
| **Huidige UX-consequentie** | ⚠️ Gebruiker moet adres handmatig kopiëren naar maps-app. Telefoon is wél klikbaar (`tel:`). |
| **Vereiste fallback** | Wrap adres in Google Maps-link: `https://maps.google.com/?q={adres}` |

---

## F-20 — WhatsApp: verkeerde verwachting

| Veld | Waarde |
|------|--------|
| **Getroffen stories** | US-17 |
| **Pagina/component** | `components/ui/WhatsAppChat.tsx` |
| **Foutbeschrijving** | Gebruiker verwacht live chat maar krijgt asynchroon WhatsApp-bericht |
| **Huidige UX-consequentie** | ⚠️ Geen tooltip/context. Gebruiker klikt → WhatsApp opent → stuurt bericht → wacht → mogelijk teleurstelling. |
| **Vereiste fallback** | Tooltip: "Stuur ons een WhatsApp-bericht — we antwoorden zo snel mogelijk" |

---

## Samenvattende risicokaart

| Ernst | Failures | Impact |
|-------|----------|--------|
| **HOOG** | F-01, F-02, F-14, F-15, F-17, F-18 | Blokkeert gebruikerstaak of leidt tot direct vertrek |
| **MIDDEL** | F-05, F-08, F-13, F-16, F-19, F-20 | Vertraagt of verwart gebruiker |
| **LAAG** | F-03, F-04, F-06, F-07, F-09, F-10, F-11, F-12 | Adequaat afgehandeld |
