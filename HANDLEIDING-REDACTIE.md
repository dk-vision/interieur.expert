# Handleiding voor Redacteuren — interieur.expert

## Inleiding

Welkom bij de Sanity CMS handleiding voor interieur.expert. Deze handleiding legt uit hoe je content kunt maken, bewerken en publiceren via het Sanity Studio. Het systeem is intuïtief en gebruiksvriendelijk, maar deze gids helpt je alle functies optimaal te benutten.

**Toegang tot Sanity Studio:**
- Lokaal: http://localhost:3001/studio (tijdens ontwikkeling)
- Productie: https://interieurexpert.vercel.app/studio

---

# Deel 1: Organische Content

## 1. Overzicht Content Types

Het platform heeft vijf hoofdtypes voor content:

### 📄 **Articles** (Artikelen)
Reguliere geschreven artikelen met tekst, afbeeldingen en formattering. Dit zijn de standaard blogposts op de website.

### 🎥 **Videos** (Video's)
Video-content van YouTube met thumbnail, transcript en metadata. Perfect voor tutorials, tours en visuele content.

### 📁 **Dossiers**
Verzamelingen van gerelateerde artikelen en video's rond een specifiek onderwerp. Een dossier bundelt meerdere content items.

### 🤝 **Partners**
Bedrijven en merken waarmee interieur.expert samenwerkt. Partners krijgen een profiel pagina. Zie **ADVERTISING-GUIDE.md** voor advertising en sponsored content.

---

## 2. Een Artikel Maken

### Basis Informatie

1. **Title** (Titel)
   - De hoofdtitel van je artikel
   - Wordt getoond als H1 op de pagina
   - Houd het kort en krachtig (max. 60 karakters voor SEO)

2. **Slug**
   - De URL-vriendelijke versie van de titel
   - Klik op "Generate" om automatisch een slug te maken
   - Voorbeeld: "natuurlijke-materialen-modern-interieur"
   - **Let op:** Wijzig de slug niet nadat het artikel gepubliceerd is!

3. **Excerpt** (Samenvatting)
   - Korte beschrijving van het artikel (max. 200 karakters)
   - Wordt getoond in lijstweergaves en in SEO previews
   - Maak het prikkelend en informatief

4. **Featured Image** (Hoofdafbeelding)
   - Upload een aantrekkelijke hoofdafbeelding
   - Klik op "hotspot" om het belangrijkste deel van de afbeelding te markeren
   - Aanbevolen formaat: 1200x800 pixels of hoger
   - Gebruik kwalitatieve afbeeldingen (bijv. Unsplash)

### Content Schrijven

5. **Body** (Artikel inhoud)

Het body-veld is een rijke teksteditor met de volgende opties:

**Tekststijlen:**
- **Normal**: Reguliere paragraaftekst
- **H2**: Hoofdkop voor secties
- **H3**: Subkop binnen secties
- **Quote**: Blokquote voor citaten

**Tekstopmaak:**
- **Strong** (vet): Voor nadruk en belangrijke punten
- **Emphasis** (cursief): Voor subtiele nadruk
- **Highlight** (markering): Geeft tekst een gele achtergrond voor extra nadruk

**Links toevoegen:**

*Externe links:*
1. Selecteer de tekst die een link moet worden
2. Klik op "External URL"
3. Voer de URL in (moet beginnen met http:// of https://)
4. Klik op "Add"

*Interne links naar andere artikelen:*
1. Selecteer de tekst die een link moet worden
2. Klik op "Internal Article Link"
3. Selecteer het artikel waar je naar wilt linken
4. Klik op "Add"
5. De link krijgt automatisch een onderstreepte stijl

**Afbeeldingen toevoegen:**
1. Klik op het "+" icoon in de editor
2. Selecteer "Image"
3. Upload een afbeelding
4. Gebruik hotspot om het belangrijkste deel te markeren
5. Afbeeldingen worden automatisch geoptimaliseerd

**💡 Callout Boxes toevoegen (NIEUW!):**

Gebruik callout boxes om belangrijke informatie op te lichten:

1. Klik op het "+" icoon in de editor
2. Selecteer "Callout Box"
3. Kies het type:
   - **💡 Info (Blauw)**: Voor algemene informatie
   - **⚠️ Waarschuwing (Geel)**: Voor dingen waar lezers op moeten letten
   - **✅ Tip (Groen)**: Voor handige tips en adviezen
   - **❌ Let op (Rood)**: Voor belangrijke waarschuwingen
4. Voeg optioneel een titel toe (bijv. "Pro tip", "Let op")
5. Schrijf de inhoud van de callout
6. Klik op "Add"

*Voorbeeld wanneer te gebruiken:*
- Info: "Wist je dat natuurlijk licht de kleur van verf beïnvloedt?"
- Tip: "Begin altijd met een moodboard voordat je materialen koopt"
- Waarschuwing: "Test verf altijd op een klein stukje muur eerst"
- Let op: "Sommige planten zijn giftig voor huisdieren"

**📝 Pull Quotes toevoegen (NIEUW!):**

Gebruik pull quotes om belangrijke uitspraken of citaten te benadrukken:

1. Klik op het "+" icoon in de editor
2. Selecteer "Pull Quote"
3. Voer de quote tekst in
4. Voeg optioneel de auteur toe (naam van expert/bron)
5. Voeg optioneel de rol toe (bijv. "Interieurontwerper", "Expert")
6. Klik op "Add"

*Voorbeeld:*
- Quote: "Minder is meer, maar alleen als 'minder' bewust gekozen is"
- Auteur: "Marie Kondo"
- Rol: "Opruimexpert"

**Best Practices voor schrijven:**
- Begin met een sterke inleiding (eerste paragraaf)
- Gebruik H2 koppen om het artikel in secties te verdelen
- Voeg afbeeldingen toe om de tekst te onderbreken (om de 2-3 paragrafen)
- Gebruik callout boxes voor belangrijke tips of waarschuwingen
- Gebruik pull quotes om kerninzichten te benadrukken
- Gebruik internal article links om lezers naar gerelateerde content te leiden
- Markeer (highlight) de allerbelangrijkste zinnen
- Houd paragrafen kort (3-5 zinnen)

### Categorieën en Tags

6. **Category** (Categorie)
   - Selecteer één hoofdcategorie:
     - **Stijlen**: Over interieurstijlen (minimalistisch, Scandinavisch, etc.)
     - **Advies**: Praktische tips en adviezen
     - **Materialen**: Over specifieke materialen (hout, steen, textiel)
     - **Techniek**: Technische aspecten (verlichting, akoestiek)
     - **Kleur**: Alles over kleuren en kleurcombinaties
     - **Tips**: Praktische tips en tricks
     - **Trends**: Actuele trends in interieurdesign
     - **Duurzaamheid**: Duurzaam wonen en inrichten
     - **Ambacht**: Ambachtelijk werk en vakmanschap

7. **Tags**
   - Voeg meerdere tags toe voor betere vindbaarheid
   - Gebruik specifieke, beschrijvende termen
   - Voorbeelden: "minimalisme", "warm", "DIY", "budget", "kleine ruimte"
   - Typ een tag en druk op Enter om toe te voegen
   - Tags helpen lezers gerelateerde content te vinden

### Metadata

8. **Published At** (Publicatiedatum)
   - Selecteer de datum en tijd van publicatie
   - Content wordt alleen zichtbaar na deze datum
   - Gebruik de toekomst voor geplande publicaties

9. **Author** (Auteur)
   - Optioneel: Naam van de auteur
   - Laat leeg voor algemene "interieur.expert" attributie

10. **Reading Time** (Leestijd)
    - Geschatte leestijd in minuten
    - Regel van duim: 200-250 woorden = 1 minuut
    - Wordt getoond bij het artikel

**Let op:** Voor gesponsorde artikelen en advertising, zie: **ADVERTISING-GUIDE.md**

### SEO Optimalisatie (Optioneel)

11. **SEO Title** (SEO Titel)
    - Alleen invullen als je een afwijkende titel wilt voor zoekmachines
    - Max. 60 karakters
    - Laat leeg om de standaard titel te gebruiken

12. **SEO Description** (SEO Beschrijving)
    - Alleen invullen voor een afwijkende meta description
    - Max. 160 karakters
    - Laat leeg om de excerpt te gebruiken

### Publiceren

Na het invullen van alle velden:
1. Klik op **"Publish"** rechtsbovenin om te publiceren
2. Het artikel verschijnt op de website na de publicatiedatum
3. Je kunt later altijd wijzigingen maken (klik dan "Update")

---

## 3. Een Video Maken

Videos werken vergelijkbaar met artikelen, met enkele specifieke velden:

### Unieke Video Velden

1. **Thumbnail Image**
   - Voorbeeldafbeelding van de video
   - Wordt getoond in lijstweergaves
   - Meestal een screenshot uit de video

2. **YouTube Video ID**
   - Het ID van je YouTube video
   - Te vinden in de YouTube URL na `v=`
   - Voorbeeld: In `https://youtube.com/watch?v=dQw4w9WgXcQ` is het ID: `dQw4w9WgXcQ`
   - Plak alleen het ID, niet de volledige URL!

3. **Transcript** (Optioneel)
   - Tekstversie van de video
   - Goed voor toegankelijkheid en SEO
   - Gebruik dezelfde editor als bij artikelen

4. **Duration** (Duur)
   - Lengte van de video in minuten
   - Wordt getoond bij de video

5. **Category** (Categorie)
   - Video-specifieke categorieën:
     - **Tours**: Interieur tours en rondleidingen
     - **DIY**: Doe-het-zelf projecten
     - **Advies**: Advies en tips in video vorm
     - **Voor & Na**: Transformaties en make-overs
     - **Styling**: Styling tips en tricks

**Overige velden** (tags, publicatiedatum, etc.) werken hetzelfde als bij artikelen.

---

## 4. Een Dossier Maken

Een dossier is een verzameling van gerelateerde content rond één thema.

### Dossier-specifieke Velden

1. **Introduction** (Introductie)
   - Uitleg over wat het dossier behandelt
   - Waarom is dit onderwerp relevant?
   - Wat kan de lezer verwachten?

2. **Articles** (Artikelen)
   - Selecteer gerelateerde artikelen en video's
   - Klik op "Add item" om content toe te voegen
   - Sleep items om de volgorde te wijzigen
   - Verwijder items met het prullenbak-icoon

3. **Category** (Categorie)
   - Vrij tekstveld - typ je eigen categorie (max 50 karakters)
   - **Voorbeelden:**
     - Verlichting
     - Duurzaamheid
     - Wonen
     - Materialen
     - Kleuren
     - Textiel
     - Meubels
     - Keuken & Badkamer
   - Tip: Gebruik consistente schrijfwijze voor herkenning

4. **Theme / Periode** (optioneel)
   - Vrij tekstveld voor thematische periodes of seizoenen
   - Voorbeelden:
     - "Black Friday 2026"
     - "Slaapmaand Februari"
     - "Batibouw 2026"
     - "Kerst Special"
     - "Zomer 2026"
   - Verschijnt in de sidebar van de dossier detail pagina
   - Handig voor tijdelijke acties en events

5. **Sponsors** (optioneel - nieuw!)
   - Voeg één of meerdere partners toe die dit dossier sponsoren
   - Klik op "Add item" en selecteer een partner
   - Maximum 3 sponsors aanbevolen voor overzicht
   - Sponsor logo's verschijnen onder de hero image met "Mogelijk gemaakt door" header
   - Logo's zijn clickable naar partner profiel pagina
   - Sponsor namen verschijnen in dossier metadata op listing pages

**Let op:** Dossiers hebben geen `sponsored` optie zoals artikelen — in plaats daarvan gebruik je het **Sponsors** veld voor partner logo display.

### Gesponsorde Dossiers Setup

Voor een gesponsord dossier:

1. **Maak of bewerk een dossier**
2. **Scroll naar "Sponsors" sectie**
3. **Klik "Add item"**
4. **Selecteer partner uit dropdown**
5. **Herhaal voor meerdere sponsors** (max 3 aanbevolen)
6. **Publish**

**Resultaat:**
- "Mogelijk gemaakt door" sectie verschijnt onder hero image
- Partner logo's in grid layout (200x80px)
- Clickable naar partner profiel
- Sponsor namen zichtbaar op listing cards: "Mogelijk gemaakt door [Partner 1], [Partner 2]"

**Voorbeeld:**
Dossier: "Duurzaamheid in Interieur 2026"
Sponsors: Joli, Vincent Sheppard, Vij5

**Wanneer gebruiken:**
- Thematische dossiers met relevante sponsors
- Partners die willen associëren met een thema
- Niet voor elk dossier — alleen bij echte partnerships

### Waar Verschijnen Dossiers?

Gepubliceerde dossiers zijn te vinden op:

- **Overzichtspagina:** `/dossiers` — toont alle dossiers in een grid
- **Navigatie:** "Dossiers" link in het hoofdmenu
- **Detail pagina:** `/dossiers/[slug]` — individuele dossier met alle artikelen

**Tip:** Gebruik dossiers om gerelateerde content rond een thema te bundelen, zoals "Verlichting Trends 2026" of "Duurzaam Wonen Guide". Dit helpt bezoekers om diepgaandere kennis op te doen over specifieke onderwerpen.

---

## 5. Tips voor Goede Content

### Algemene Richtlijnen

✅ **DO:**
- Schrijf helder en toegankelijk
- Gebruik actieve zinnen
- Voeg kwalitatieve afbeeldingen toe
- Verdeel lange teksten met koppen
- Denk aan SEO (maar schrijf voor mensen!)
- Controleer op spelfouten voor publicatie
- Preview je artikel voordat je publiceert

❌ **DON'T:**
- Lange zinnen van 3+ regels
- Te veel jargon zonder uitleg
- Afbeeldingen van lage kwaliteit
- Clickbait titels
- Vergeten om een excerpt in te vullen
- Slugs wijzigen na publicatie

### Content Checklist

Voor **elk artikel** check:
- [ ] Pakkende titel (50-60 karakters)
- [ ] Informatieve excerpt (max 200 karakters)
- [ ] Kwalitatieve featured image met hotspot
- [ ] Minstens 3 paragrafen body content
- [ ] Minimaal 1 H2 kop
- [ ] Juiste categorie geselecteerd
- [ ] 3-5 relevante tags toegevoegd
- [ ] Publicatiedatum ingesteld
- [ ] Leestijd ingevuld
- [ ] (Bij sponsored) Partner en disclosure toegevoegd

---

# Deel 2: Sponsored Content

Voor alles rondom gesponsorde content, display advertising, en partner management, zie:

👉 **ADVERTISING-GUIDE.md**

Deze uitgebreide gids bevat:
- Display advertising slots en posities
- Gesponsorde artikelen en video's setup
- Dossier sponsoring
- Ad campaign management  
- Partner profiel aanmaken
- Pricing en pakketten

---

# Deel 3: Zoekfunctie

## Smart Search (⌘K)

De website heeft een krachtige zoekfunctie waarmee bezoekers snel content kunnen vinden.

### Hoe Werkt de Zoekfunctie?

**Voor bezoekers:**
- Druk op **⌘K** (Mac) of **Ctrl+K** (Windows) om het zoekveld te openen
- Of klik op het zoek-icoon in de header
- Type een zoekterm (minimaal 2 karakters)
- Resultaten verschijnen direct tijdens het typen
- Gebruik **pijltjestoetsen** (↑↓) om door resultaten te navigeren
- Druk **Enter** om naar het geselecteerde artikel/video te gaan
- Druk **Escape** om te sluiten

**Wat wordt doorzocht:**
- Artikel titels
- Artikel samenvattingen (excerpts)
- Artikel tags
- Video titels
- Video samenvattingen

**Resultaten:**
- Maximaal 10 meest relevante resultaten
- Gesorteerd op relevantie (Sanity's `_score`)
- Toont: titel, type (artikel/video), excerpt, categorie

### Tips voor Betere Vindbaarheid

Om ervoor te zorgen dat jouw content goed vindbaar is:

1. **Gebruik duidelijke titels**
   - Vermijd cryptische of creatieve titels die de inhoud verhullen
   - Gebruik woorden die bezoekers zouden zoeken
   - ✅ Goed: "Kleine ruimtes groter laten lijken"
   - ❌ Minder goed: "De kunst van ruimtelijke magie"

2. **Schrijf informatieve excerpts**
   - De excerpt wordt doorzocht én getoond in resultaten
   - Gebruik relevante zoektermen
   - Maak het prikkelend maar duidelijk

3. **Voeg relevante tags toe**
   - Tags worden ook doorzocht
   - Denk aan synoniemen (bijv. "woonkamer" én "living")
   - Denk aan verschillende schrijfwijzen
   - Voorbeelden: "minimalisme" + "minimalistisch", "kleur" + "kleuren"

4. **Gebruik consistente termen**
   - Als je over hetzelfde onderwerp schrijft, gebruik dezelfde termen
   - Dit helpt bezoekers gerelateerde content te vinden
   - Maak eventueel een lijst met standaard tags per onderwerp

### Zoekgedrag Analyseren (Toekomstig)

*Let op: Deze functionaliteit komt in een toekomstige update*

In de toekomst kun je mogelijk zien:
- Meest gezochte termen
- Zoekopdrachten zonder resultaten
- Populaire content via zoeken

Dit helpt om:
- Content te maken over populaire onderwerpen
- Gaten in je content te identificeren
- Tags en titels te optimaliseren

---

**Veel succes met het maken van geweldige content! 🎨✨**
