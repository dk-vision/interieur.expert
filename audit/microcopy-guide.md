# Microcopy Guide — interieur.expert

Datum: 12 maart 2026
Status: Definitief

---

## Toon en stijl

De site hanteert een **warm-professionele, toestankelijke toon**. Geen jargon, geen hypes. De microcopy zou deze principes moeten volgen:

- **Helder:** Zeg precies wat de gebruiker kan verwachten
- **Warm:** Spreek de gebruiker aan als "je", niet als "u"
- **Eerlijk:** Wees transparant over beperkingen (responstijd, beschikbaarheid)
- **Actief:** Gebruik actieve werkwoorden ("Ontdek", "Bekijk", niet "Er kan worden")

---

## 1. Navigatielabels

### Huidige situatie

| Label | Wat de gebruiker verwacht | Wat het werkelijk is | Probleem |
|-------|--------------------------|---------------------|----------|
| **Inspiratie** | Sfeerbeelden, moodboards, visuele galerijen | Artikelenlijst met long-form tekst | Verwachting ≠ realiteit: visueel vs. redactioneel |
| **Advies** | Persoonlijk advies, consult, Q&A | Artikelenlijst met tips | "Advies" impliceert persoonlijke hulp |
| **Trends** | Korte trend-updates, social-achtig | Artikelenlijst, identiek aan Inspiratie | Geen visueel of structureel verschil |
| **Dossiers** | Mogelijk: documenten, PDF's, downloads | Themacollecties van artikelen + video's | "Dossier" klinkt ambtelijk |
| **Partners** | Mogelijk: linkpartners, affiliates | Merkprofielen met showrooms | Niet direct duidelijk dat het merken zijn |
| **Over** | Over het team/bedrijf | Over-pagina | ✅ Duidelijk |
| **Contact** | Contactformulier, mailadres | Contactpagina met formulier + opties | ✅ Duidelijk |

### Aanbevelingen

| Huidig | Voorstel | Rationale |
|--------|----------|-----------|
| Inspiratie | **Inspiratie** (behouden, maar subtitel toevoegen) | Label is goed, maar context ontbreekt |
| Advies | **Advies** (behouden, maar subtitel toevoegen) | Label is goed bij juiste context |
| Trends | **Trends** (behouden, maar subtitel toevoegen) | Idem |
| Dossiers | **Dossiers** (behouden) | In context met de andere labels is het duidelijk genoeg |
| Partners | **Merken** of **Partners & Showrooms** | Maakt direct duidelijk dat het om merken/winkels gaat |

### Voorgestelde subtitels (voor tooltip of uitklapmenu)

| Label | Subtitel |
|-------|---------|
| Inspiratie | Stijlen, sferen en interieurbeelden |
| Advies | Praktische tips en aanpak |
| Trends | Wat is nieuw in interieur |
| Video | Binnenkijken en rondleidingen |
| Dossiers | Thema's uitgelicht |
| Partners | Merken en showrooms |

---

## 2. CTA-labels

### Huidige situatie

| Context | Huidig label | Probleem | Voorstel |
|---------|-------------|----------|----------|
| Nieuwsbrief submit | "Inschrijven" | ✅ Duidelijk | — |
| Contact submit | "Verstuur bericht" | ✅ Duidelijk, maar lang | "Verstuur" of "Verstuur bericht" (behouden) |
| Contact laden | "Versturen..." | ✅ | — |
| Adverteren CTA | "Neem contact op" / "Naar contactformulier" | ⚠️ Twee knoppen naast elkaar met vergelijkbare actie | Eén primaire CTA: "Vraag tarieven aan" |
| Partner CTA | "Bezoek website" / "Bezoek {partner.name}" | ✅ Duidelijk | — |
| 404 knoppen | "Naar de homepage" / "Bekijk inspiratie" | ✅ Twee duidelijke opties | — |
| Error knoppen | "Probeer opnieuw" / "Naar de homepage" | ✅ | — |
| "Lees ook" in footer tags | `#{tag}` | ✅ Herkenbaar hashtag-patroon | — |
| ContentCard tag pills | `{tag}` tekst als pill | ✅ | — |
| Zoek-trigger | "Zoeken..." + ⌘K badge | ⚠️ Mobiel: alleen icoon | Mobiel: icoon + "Zoek" kort label |
| Partner "Bekijk profiel →" | "Bekijk profiel →" | ✅ Duidelijk | — |
| Alle video's link | "Alle video's →" | ✅ | — |

### Specifieke problemen

**Adverteren-pagina:** De CTA-sectie heeft twee knoppen die bijna hetzelfde doel dienen:
- "Neem contact op" (mailto:partnerships@interieur.expert)
- "Naar contactformulier" (link naar /contact)

**Voorstel:** Eén primaire knop "Vraag een voorstel aan" (mailto) + secundaire "Of stuur een bericht" (link naar /contact).

---

## 3. Lege staten

| Context | Huidige tekst | Beoordeling | Voorstel |
|---------|--------------|-------------|----------|
| Zoek: geen query | *(niets — leeg dialoogvenster)* | ❌ Geen hulp | "Populair: #verlichting, #scandinavisch, #keuken, #badkamer" |
| Zoek: geen resultaten | "Geen resultaten gevonden voor '{query}'" | ⚠️ Informeert maar helpt niet | "Geen resultaten voor '{query}'. Probeer een ander zoekwoord of bekijk onze populaire onderwerpen." |
| Partners: leeg | "Binnenkort vind je hier onze partners." | ✅ Informatief | — |
| Video's: leeg | "Er zijn nog geen video's gepubliceerd." | ✅ | — |
| Dossiers: leeg | "Er zijn nog geen dossiers gepubliceerd." | ✅ | — |

### Kritiek: Zoekfunctie

Het zoekvenster bij een lege query is **volledig leeg** — geen suggesties, geen populaire zoektermen, geen recente artikelen. Dit is de belangrijkste microcopy-gap omdat het direct invloed heeft op US-03, US-06 en US-13.

---

## 4. Foutmeldingen

| Context | Huidige tekst | Beoordeling | Voorstel |
|---------|--------------|-------------|----------|
| Contact: server error | `error` variabele (generieke server response) | ⚠️ Onvoorspelbaar | Altijd: "Er ging iets mis bij het versturen. Probeer het opnieuw of mail ons op studio@interieur.expert." |
| Contact: verplicht veld | "Alle velden zijn verplicht." (server) | ⚠️ Nu browser-native (na noValidate fix) | Browser-native is voldoende |
| Contact: ongeldig email | "Ongeldig e-mailadres." (server) | ⚠️ Nu browser-native | Browser-native is voldoende |
| Nieuwsbrief: error | `errorMsg` → "Inschrijving mislukt. Probeer het opnieuw." of "Verbindingsfout. Probeer het opnieuw." | ✅ Duidelijk | — |
| 404 pagina | "De pagina die je zoekt bestaat niet (meer). Misschien is het artikel verplaatst of verwijderd." | ✅ Empathisch en informatief | — |
| Error pagina | "We konden deze pagina niet laden. Probeer het opnieuw of ga terug naar de homepage." | ✅ | — |

---

## 5. Formuliervalidatie-berichten

| Context | Huidig | Beoordeling | Voorstel |
|---------|--------|-------------|----------|
| Naam leeg | Browser-native: "Vul dit veld in" (NL browser) | ✅ | — |
| Email ongeldig | Browser-native: "Voer een e-mailadres in" | ✅ | — |
| Onderwerp leeg | Browser-native | ✅ | — |
| Bericht leeg | Browser-native | ✅ | — |
| Nieuwsbrief email | Browser-native (type="email" + required) | ✅ | — |

**Opmerking:** Formuliervalidatie leunt nu volledig op browser-native gedrag sinds de `noValidate` verwijdering. Dit is acceptabel maar kan per browser variëren qua taal en styling.

---

## 6. Sectie-intro's

| Pagina | Huidige intro | Beoordeling |
|--------|--------------|-------------|
| Homepage hero | "Inspiratie voor je interieur" + "Waar interieur tot leven komt..." | ✅ Warm en duidelijk |
| Inspiratie | Categorie-specifieke beschrijving | ✅ |
| Advies | Categorie-specifieke beschrijving | ✅ |
| Trends | Categorie-specifieke beschrijving | ✅ |
| Video | Categorie-specifieke beschrijving | ✅ |
| Dossiers | Beschrijving over themacollecties | ✅ |
| Partners | "We werken samen met toonaangevende merken en showrooms in België." | ✅ |
| Contact | "We horen graag van je. Of je nu een vraag hebt, feedback wilt geven, of interesse hebt in samenwerking..." | ✅ Warm en uitnodigend |
| Adverteren | Brand-beschrijving + doelgroep | ✅ |
| Over | "Eerlijk advies, inspiratie en trends..." | ✅ |
| Tags | "N artikel(en) met deze tag" | ⚠️ Functioneel maar droog — geen context over het onderwerp |

### Voorstel tags-pagina

Huidig: `"{count} artikel(en) met deze tag"` (alleen telling)

Voorstel: `"Ontdek {count} artikelen over {tag}. Van inspirerende ideeën tot praktische tips."` — geeft context en nodigt uit tot lezen.

---

## 7. Partner/Contact/Adverteren messaging

### Partnerpagina

| Element | Huidige tekst | Beoordeling |
|---------|--------------|-------------|
| Featured Partners sectie-header | "Featured Partners" | ⚠️ Engels label op Nederlandstalige site |
| CTA-sectie | "Klaar om te ontdekken?" + "Bezoek de website van {partner}..." | ✅ |
| Showrooms header | "Showrooms" | ⚠️ Engels, maar breed verstaan in NL/BE |
| Gesponsorde content header | "Gesponsorde Content" | ⚠️ Mix NL/EN |
| Terug-link | "← Terug naar alle partners" | ✅ |

**Voorstel:** Vervang "Featured Partners" door "Uitgelichte partners" en "Gesponsorde Content" door "Artikelen in samenwerking".

### Contact

| Element | Huidige tekst | Beoordeling |
|---------|--------------|-------------|
| Kaart 1 titel | "Algemene vragen & Redactie" | ✅ |
| Kaart 1 actie | "Mail ons →" | ✅ |
| Kaart 2 titel | "Partnerships" | ⚠️ Engels |
| Kaart 2 actie | "Meer informatie →" | ⚠️ Vaag — waarheen? |
| FAQ intro | "Veelgestelde vragen" | ✅ |

**Voorstel:** "Partnerships" → "Samenwerking" of "Samen adverteren". "Meer informatie →" → "Mail het partnership-team →".

### Adverteren

| Element | Huidige tekst | Beoordeling |
|---------|--------------|-------------|
| Label boven h1 | "Samenwerken" | ✅ |
| h1 | "Adverteren" | ✅ |
| CTA-beschrijving | Beschrijving + twee knoppen | ⚠️ Twee vergelijkbare CTA's |

---

## 8. Taalconsistentie-problemen

| Locatie | Probleem | Voorstel |
|---------|----------|----------|
| Partners listing | "Featured Partners" (EN) | "Uitgelichte partners" |
| Partner detail | "Gesponsorde Content" (mix) | "Artikelen in samenwerking" |
| Partner detail showrooms | "Showrooms" (EN) | Acceptabel — breed verstaan |
| Contact | "Partnerships" (EN) | "Samenwerking" |
| Zoekresultaten type badge | "Sponsored" (EN) | "Gesponsord" |
| Content type badges | "Artikel", "Video", "Dossier" | ✅ Nederlands |
| MetaRow | Datumformat: `nl-NL` | ⚠️ Correct NL, maar site is `nl_BE` — verschil is minimaal |

---

## 9. Verwachtingsmanagement

### WhatsApp-knop

**Huidig:** Geen tooltip, geen context. Gebruiker ziet een groene WhatsApp-knop en klikt.

**Probleem:** Sommige gebruikers verwachten live chat. De knop opent WhatsApp met een preset bericht, maar het is asynchroon.

**Voorstel:** Tooltip bij hover: "Stel je vraag via WhatsApp" of "Stuur ons een bericht — we antwoorden binnen 24u." Dit stelt de verwachting bij dat het geen live chat is.

### Contact bedankt-pagina

**Huidig:** "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op — meestal binnen 2 werkdagen."

**Beoordeling:** ✅ Uitstekend — concreet en eerlijk.

### Nieuwsbrief privacy

**Huidig:** "Je kunt je altijd weer uitschrijven. Privacy gegarandeerd."

**Beoordeling:** ✅ Kort, geruststellend.

---

## Samenvatting: Hoogste prioriteit microcopy-verbeteringen

| # | Probleem | Impact | Moeite |
|---|----------|--------|--------|
| 1 | Zoek lege staat: geen suggesties | US-03, US-06, US-13 — gebruikers verlaten site | Laag |
| 2 | Zoek geen-resultaten: geen alternatieven | US-13 — dead end | Laag |
| 3 | "Featured Partners" → Nederlands | Taalconsistentie | Laag |
| 4 | "Gesponsorde Content" → "Artikelen in samenwerking" | Taalconsistentie + transparantie | Laag |
| 5 | "Partnerships" → "Samenwerking" | Taalconsistentie | Laag |
| 6 | Zoekresultaat badge "Sponsored" → "Gesponsord" | Taalconsistentie | Laag |
| 7 | Tags-pagina intro verrijken | SEO + gebruikerservaring | Laag |
| 8 | WhatsApp tooltip toevoegen | Verwachtingsmanagement | Laag |
| 9 | Navigatie subtitels toevoegen | Onduidelijkheid categorieën (US-06) | Middel |
| 10 | Adverteren CTA vereenvoudigen | Conversie-optimalisatie (US-10) | Laag |
