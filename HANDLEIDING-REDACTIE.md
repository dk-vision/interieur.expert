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
Reguliere geschreven artikelen met tekst, afbeeldingen en formattering. Dit zijn de standaard blogposts op de website. Artikelen kunnen optioneel gesponsord worden door partners.

### 🎥 **Videos** (Video's)
Video-content van YouTube met thumbnail, transcript en metadata. Perfect voor tutorials, tours en visuele content.

### 📁 **Dossiers**
Verzamelingen van gerelateerde artikelen en video's rond een specifiek onderwerp. Een dossier bundelt meerdere content items.

### 🤝 **Partners** (NIEUW!)
Bedrijven en merken waarmee interieur.expert samenwerkt. Partners krijgen een profiel pagina en kunnen content sponsoren. Zie Deel 2 voor meer info.

### 📢 **Advertising** 
Ad campaigns, ad creatives en sponsored content. Voor commerciële content. Zie Deel 2 voor adverteerder info.

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

### Gesponsorde Content (NIEUW!)

11. **Sponsored Content**
    - Toggle deze aan als het artikel gesponsord is door een partner
    - **BELANGRIJK**: Alleen gebruiken bij officiële partnerships
    
12. **Partner** (verschijnt als Sponsored Content aan staat)
    - Selecteer de partner die het artikel sponsort
    - Partner moet eerst aangemaakt zijn in het systeem
    - Voorbeeld partners: XOOON, BoConcept, etc.
    
13. **Sponsor Disclosure** (verschijnt als Sponsored Content aan staat)
    - **VERPLICHT** voor sponsored content
    - Voeg transparante disclosure tekst toe
    - Voorbeeld: "Dit artikel is mogelijk gemaakt door [Partner]. Alle meningen en aanbevelingen zijn onafhankelijk en objectief."
    - Deze tekst verschijnt onderaan het artikel

**Gesponsorde Content Richtlijnen:**
- ✅ Content moet redactioneel kwalitatief blijven
- ✅ Educatieve waarde voorop
- ✅ Eerlijke meningen en onafhankelijke aanbevelingen
- ✅ Duidelijke disclosure altijd verplicht
- ❌ Geen directe productverkooppraatjes
- ❌ Niet meer dan 2-3 gesponsorde artikelen per partner per kwartaal
- ❌ Content mag niet volledig product-focused zijn

**Zichtbaarheid:**
- "Gesponsord door [Partner]" badge bovenaan artikel
- Partner logo naast badge
- Disclosure text onderaan artikel
- Link naar partner profiel pagina
- Artikel verschijnt op partner profiel pagina (`/partners/[slug]`)

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
   - Dossier-specifieke categorieën:
     - **Verlichting**: Alles over verlichting
     - **Duurzaamheid**: Duurzaam wonen
     - **Wonen**: Algemeen wonen
     - **Materialen**: Focus op materialen

**Let op:** Dossiers hebben geen `sponsored` optie — ze bundelen bestaande content.

### Waar Verschijnen Dossiers?

Gepubliceerde dossiers zijn te vinden op:

- **Overzichtspagina:** `/dossiers` — toont alle dossiers in een grid
- **Navigatie:** "Dossiers" link in het hoofdmenu
- **Detail pagina:** `/dossiers/[slug]` — individuele dossier met alle artikelen

**Tip:** Gebruik dossiers om gerelateerde content rond een thema te bundelen, zoals "Verlichting Trends 2026" of "Duurzaam Wonen Guide". Dit helpt bezoekers om diepgaandere kennis op te doen over specifieke onderwerpen.

---

## 5. Sponsored Content

Artikelen en video's kunnen gesponsord zijn door partners.

### Sponsored Content Maken

1. **Sponsored Content** (checkbox)
   - Vink deze aan voor gesponsorde content
   - Extra velden worden nu zichtbaar

2. **Partner**
   - Selecteer de sponsor/partner uit de lijst
   - Als de partner nog niet bestaat, maak deze eerst aan onder "Partners"

3. **Sponsor Disclosure** (Verplicht!)
   - Schrijf een duidelijke disclosure
   - Voorbeeld: "Dit artikel is gemaakt in samenwerking met [Partner]. Onze mening blijft onafhankelijk en we raden alleen producten aan waar we echt in geloven."
   - Dit wordt prominent getoond bij het artikel
   - Transparantie is essentieel!

**Let op:** Gesponsorde content wordt gemarkeerd met een 🔖 badge in het overzicht.

---

## 6. Tips voor Goede Content

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

# Deel 2: Advertising

## 1. Overzicht Advertising System

Het platform heeft een geavanceerd advertising systeem met drie componenten:

1. **Partners**: De adverteerders/sponsors
2. **Ad Creatives**: De advertentie-ontwerpen (afbeeldingen of HTML)
3. **Ad Campaigns**: Campagnes die creatives koppelen aan posities en timing

---

## 2. Partners Beheren

### Een Partner Toevoegen

Partners zijn de bedrijven of organisaties die adverteren op het platform.

1. Ga naar **"Partner"** in het menu
2. Klik op **"Create"**
3. Vul de velden in:

**Velden:**

1. **Partner Name**
   - Officiële naam van het bedrijf
   - Voorbeeld: "Lumina Lighting", "IKEA Nederland"

2. **Website URL**
   - Volledige website URL
   - Moet beginnen met http:// of https://
   - Voorbeeld: https://www.luminalighting.nl

3. **Logo** (Optioneel)
   - Upload het logo van de partner
   - Wordt gebruikt in sponsored content badges
   - Aanbevolen: PNG met transparante achtergrond

4. **Brand Color** (Optioneel)
   - Merkkleur in hex formaat
   - Voorbeeld: #ff6666 (rood), #00aaff (blauw)
   - Wordt gebruikt voor kleuraccenten

5. Klik op **"Publish"**

**Let op:** Partners kunnen worden hergebruikt voor meerdere gesponsorde artikelen en advertentiecampagnes.

---

## 3. Ad Creatives Maken

Ad Creatives zijn de daadwerkelijke advertentie-ontwerpen.

### Types Creatives

Het systeem ondersteunt twee formats:
- **Image**: Een afbeelding (banner)
- **HTML**: Aangepaste HTML code (voor complexe advertenties)

### Image Creative Maken

1. Ga naar **"Ad Creative"** in het menu
2. Klik op **"Create"**
3. Vul de velden in:

**Velden voor Image Creative:**

1. **Title**
   - Interne naam voor de creative
   - Voorbeeld: "Lumina Zomer Sale Banner"
   - Alleen zichtbaar in het CMS

2. **Format**
   - Selecteer **"Image"**

3. **Image**
   - Upload de advertentie-afbeelding
   - Aanbevolen formaten:
     - Listing Inline: 800x600 pixels (4:3)
     - Article Inline: 1200x400 pixels (3:1)
     - Sidebar: 300x600 pixels (1:2)

4. **Link URL**
   - De URL waar de advertentie naartoe linkt
   - Voorbeeld: https://www.partner.nl/actie
   - Moet beginnen met http:// of https://

5. **Alt Text**
   - Beschrijving voor toegankelijkheid
   - Voorbeeld: "Lumina verlichting korting 30%"
   - Belangrijk voor screenreaders

6. Klik op **"Publish"**

### HTML Creative Maken

Voor geavanceerde advertenties (bijv. Google Ads, interactieve elementen).

1. Volg stappen 1-2 zoals hierboven
2. **Format**: Selecteer **"HTML"**
3. **HTML Code**:
   - Plak de HTML/JavaScript code
   - Bijvoorbeeld Google AdSense code
   - Test goed voordat je publiceert!

4. **Link URL**: (Optioneel, als het niet in de HTML zit)
5. Klik op **"Publish"**

---

## 4. Ad Campaigns Maken

Campaigns combineren creatives met plaatsing, timing en targeting.

### Campaign Opzetten

1. Ga naar **"Ad Campaign"** in het menu
2. Klik op **"Create"**
3. Configureer de campagne:

### Basis Configuratie

1. **Campaign Title**
   - Interne naam voor de campagne
   - Voorbeeld: "Lumina Q1 2026 - Homepage"

2. **Ad Slot** (Verplicht)
   - Kies de vaste positie waar de advertentie verschijnt:
     - **Listing Inline**: Tussen content cards in lijstweergaves (homepage)
     - **Article Inline**: Binnen artikel content (tussen paragrafen)
     - **Sidebar**: In de sidebar (desktop only)
   - **Let op:** Elke slot heeft één actieve advertentie tegelijk

3. **Creative**
   - Selecteer de Ad Creative die je eerder hebt gemaakt
   - Klik op "Select" en kies de juiste creative

### Timing

4. **Start Date**
   - Wanneer de campagne start
   - Selecteer datum en tijd

5. **End Date**
   - Wanneer de campagne eindigt
   - De advertentie verdwijnt automatisch na deze datum

### Targeting (Optioneel)

Advertenties kunnen worden getarget op specifieke content:

6. **Target Category** (Optioneel)
   - Toon alleen op pagina's met deze categorie
   - Voorbeeld: Toon verlichting-advertentie alleen bij "Techniek" artikelen
   - Laat leeg voor alle categorieën

7. **Target Tags** (Optioneel)
   - Toon alleen op pagina's met deze tags
   - Voeg meerdere tags toe voor bredere targeting
   - Voorbeeld: "verlichting", "lamp", "licht"
   - Laat leeg voor alle tags

### Prioriteit en Status

8. **Priority** (Prioriteit)
   - Getal tussen 1-10
   - Hoger nummer = hogere prioriteit
   - Bij overlap krijgt de hoogste prioriteit voorrang
   - Standaard: 5

9. **Active** (Actief)
   - Vink aan om de campagne actief te maken
   - Uitvinken om te pauzeren (bijv. voor tijdelijk stop)
   - Gepauzeerde campaigns worden gemarkeerd met ⏸️

10. Klik op **"Publish"**

---

## 5. Campaign Management

### Overzicht

In de Ad Campaign lijst zie je:
- Campagne naam
- Ad Slot (waar het verschijnt)
- Status (actief of gepauzeerd ⏸️)

### Best Practices

**Planning:**
- Plan campagnes minimaal 1 week van tevoren
- Controleer of er geen overlappende campagnes zijn voor dezelfde slot
- Gebruik duidelijke, beschrijvende titels

**Targeting:**
- Gebruik targeting voor relevantie (verlichting-ads bij verlichting-content)
- Laat targeting leeg voor maximale reach
- Test verschillende targeting strategieën

**Prioriteit:**
- Prioriteit 8-10: Premium adverteerders
- Prioriteit 5-7: Reguliere adverteerders  
- Prioriteit 1-4: Filler/backup advertenties

**Monitoring:**
- Check regelmatig of campagnes nog actief zijn
- Verwijder of pauzeer verlopen campagnes
- Update creatives als ze verouderd raken

### Campagne Bewerken

1. Open een bestaande campagne
2. Wijzig de gewenste velden
3. Klik op **"Update"**
4. Wijzigingen zijn direct zichtbaar op de website

### Campagne Pauzeren

Om een campagne tijdelijk te stoppen zonder te verwijderen:
1. Open de campagne
2. Vink **"Active"** uit
3. Klik op **"Update"**
4. De campagne is nu gepauzeerd (⏸️ badge)

### Campagne Verlengen

Als een campagne moet worden verlengd:
1. Open de campagne
2. Wijzig de **"End Date"** naar een latere datum
3. Klik op **"Update"**

---

## 6. Hoe Werken Advertenties op de Website?

### Dynamische Advertentieselectie

De website toont advertenties op een slimme manier:

**Automatische selectie:**
- Het systeem kijkt welke campagnes actief zijn op dit moment
- Het checkt welke campagnes geschikt zijn voor de huidige pagina
- Het kiest dan één advertentie om te tonen

**Wanneer komt een advertentie in aanmerking?**
Een campagne wordt alleen getoond als:
- ✅ **Active** is aangevinkt (campagne is actief)
- ✅ De huidige datum tussen **Start Date** en **End Date** ligt
- ✅ De **Ad Slot** overeenkomt met de positie op de pagina
- ✅ De targeting klopt (als ingesteld)

### Meerdere Advertenties voor Dezelfde Positie

**Wat gebeurt er als meerdere campagnes actief zijn voor dezelfde positie?**

Het systeem gebruikt een **slim rotatie-systeem** op basis van prioriteit:

**Voorbeeld:**
- Campagne A heeft prioriteit **8**
- Campagne B heeft prioriteit **6**
- Totaal gewicht = 8 + 6 = **14**

**Verdelingskansen:**
- Campagne A: 8 ÷ 14 = **57%** kans om getoond te worden
- Campagne B: 6 ÷ 14 = **43%** kans om getoond te worden

**Wat betekent dit in de praktijk?**
- Bij 100 bezoekers ziet ~57 personen advertentie A
- En ~43 personen zien advertentie B
- Welke advertentie iemand ziet is willekeurig (maar wel gewogen)

**Waarom is dit handig?**
- Hogere prioriteit = vaker getoond (voor premium adverteerders)
- Maar ook lagere prioriteit krijgt nog steeds vertoningen
- Eerlijke verdeling op basis van belang/prijs

### Prioriteit Instellen

**Gebruik deze richtlijnen:**

- **Prioriteit 9-10**: Top adverteerders, hoge betaling, belangrijkste campagnes
  - Voorbeeld: Hoofdsponsor, grote productlancering
  
- **Prioriteit 6-8**: Reguliere adverteerders, standaard campagnes
  - Voorbeeld: Vaste partners, langlopende deals
  
- **Prioriteit 3-5**: Kleinere adverteerders, test-campagnes
  - Voorbeeld: Nieuwe partners, proefperiodes
  
- **Prioriteit 1-2**: Filler advertenties, eigen promotie
  - Voorbeeld: Eigen nieuwsbrief, lege plekken opvullen

**Tip:** Als je twee adverteerders ongeveer gelijk wilt behandelen, geef ze dezelfde prioriteit (bijv. beiden 7). Dan krijgen ze elk ongeveer 50% van de vertoningen.

### Targeting: Waar Verschijnt een Advertentie?

**Zonder targeting:**
- Advertentie kan op elke pagina verschijnen (waar de Ad Slot aanwezig is)
- Maximale bereik
- Geschikt voor algemene advertenties

**Met category targeting:**
- Alleen op pagina's met die specifieke categorie
- Voorbeeld: "Techniek" → Alleen op techniek-artikelen
- Geschikt voor specialistische adverteerders

**Met tag targeting:**
- Alleen op pagina's met één van die tags
- Voorbeeld: Tags "verlichting, lamp" → Alleen bij verlichting-gerelateerde content
- Nóg specifieker dan category

**Combinatie:**
- Je kunt category EN tags gebruiken
- Dan moet de pagina aan beide voorwaarden voldoen
- Zeer gericht, maar minder bereik

### Praktijkvoorbeelden

**Voorbeeld 1: Breed bereik**
```
Campagne: "Meubel Outlet Winter Sale"
- Slot: Sidebar
- Priority: 7
- Target Category: [leeg]
- Target Tags: [leeg]
- Result: Toont op alle pagina's in de sidebar
```

**Voorbeeld 2: Specifieke targeting**
```
Campagne: "Design Lampen Shop"
- Slot: Article Inline
- Priority: 8
- Target Category: "Techniek"
- Target Tags: "verlichting", "lamp", "licht"
- Result: Toont alleen in techniek-artikelen over verlichting
```

**Voorbeeld 3: Concurrerende campagnes**
```
Campagne A: "Premium Meubels" - Priority 9
Campagne B: "Budget Meubels" - Priority 4
Beide: Sidebar, geen targeting
Total weight: 9 + 4 = 13
- Premium verschijnt in ~69% van de gevallen (9÷13)
- Budget verschijnt in ~31% van de gevallen (4÷13)
```

### Veelgestelde Vragen

**Q: Waarom zie ik steeds dezelfde advertentie?**
A: De advertentie met hoogste prioriteit heeft de grootste kans. Als er maar één actieve campagne is, zie je altijd die.

**Q: Kan ik ervoor zorgen dat twee advertenties afwisselen (50/50)?**
A: Ja! Geef beide campagnes dezelfde prioriteit.

**Q: Hoeveel advertenties kan ik tegelijk actief hebben?**
A: Onbeperkt! Je kunt zoveel campagnes als je wilt tegelijk actief hebben. Het systeem selecteert er automatisch één per pagina-bezoek.

**Q: Verdwijnt een advertentie automatisch na de end date?**
A: Ja, zodra de end date bereikt is, wordt de campagne niet meer getoond (ook al staat Active nog aan).

**Q: Kan ik zien hoe vaak een advertentie is getoond?**
A: Momenteel niet, maar dit is in ontwikkeling voor een toekomstige update.

---

## 7. Ad Slots Uitgelegd

### Available Slots

**Listing Inline:**
- **Locatie**: Homepage en overzichtspagina's, tussen content cards
- **Visibility**: Hoge visibility, prime positie
- **Format**: Card-formaat, past tussen content
- **Best voor**: Brand awareness, belangrijke campagnes

**Article Inline:**
- **Locatie**: Binnen artikel content, na X paragrafen
- **Visibility**: Middel, maar hoge engagement
- **Format**: Full-width binnen artikel
- **Best voor**: Contextual ads, relevante producten

**Sidebar:**
- **Locatie**: Rechter sidebar op desktop
- **Visibility**: Lager, maar altijd zichtbaar tijdens scrollen
- **Format**: Verticaal, smaller
- **Best voor**: Long-tail campagnes, secundaire adverteerders
- **Let op**: Niet zichtbaar op mobile!

### Slot Selection Tips

- **Premium adverteerders**: Listing Inline
- **Content-gerelateerd**: Article Inline + targeting
- **Budget/filler ads**: Sidebar
- **Maximale visibility**: Meerdere slots voor dezelfde adverteerder (verschillende creatives!)

---

## 8. Advertising Checklist

Voor **elke campaign** check:

### Creative
- [ ] Creative is gemaakt en gepubliceerd
- [ ] Afbeelding is juiste formaat voor slot
- [ ] Link URL is correct en getest
- [ ] Alt text is ingevuld (voor images)

### Campaign Setup
- [ ] Duidelijke campaign title
- [ ] Juiste ad slot geselecteerd
- [ ] Correcte creative gekoppeld
- [ ] Start date is correct
- [ ] End date is in de toekomst
- [ ] Prioriteit is logisch ingesteld
- [ ] Active is aangevinkt

### Optional Targeting
- [ ] Targeting matches adverteerder (of bewust leeg gelaten)
- [ ] Geen conflicten met andere actieve campaigns

### After Publishing
- [ ] Preview op website (check alle devices!)
- [ ] Link werkt correct
- [ ] Creative wordt correct getoond
- [ ] Tracking is actief (indien van toepassing)

---

## 9. Troubleshooting

### Advertentie verschijnt niet

**Mogelijke oorzaken:**

1. **Campaign niet actief**
   - Check of "Active" is aangevinkt
   - Check of start date al is geweest
   - Check of end date niet al verstreken is

2. **Verkeerde slot**
   - Je kijkt op verkeerde pagina (bijv. sidebar op mobile)
   - Andere campagne heeft hogere prioriteit

3. **Targeting te specifiek**
   - Check of je op een pagina bent die matcht met de targeting
   - Probeer targeting tijdelijk uit te schakelen voor test

4. **Creative ontbreekt**
   - Check of creative correct is gekoppeld
   - Check of creative zelf gepubliceerd is

### Verkeerde advertentie verschijnt

**Oplossing:**
- Check prioriteit van campaigns
- Hoogste prioriteit wint altijd
- Check of er meerdere actieve campaigns zijn voor deze slot

### Advertentie verouderd

**Oplossing:**
- Update de creative (niet de hele campaign)
- Of maak nieuwe creative en link deze aan de campaign
- Oude creative blijft beschikbaar voor archief

---

## 10. Advanced: Campaign Strategy

### Seasonal Campaigns

Voor seizoensgebonden content:
```
Winter Sale Campaign:
- Start: 1 december
- End: 31 januari  
- Target: "winterwonen", "verwarming"
- Priority: 8
```

### Product Launch

Voor productlanceringen:
```
Launch Campaign:
- Start: Launch dag - 1 week
- End: Launch dag + 1 maand
- All categories (max reach)
- Priority: 9
```

### A/B Testing

Test verschillende creatives:
1. Maak 2 identieke campaigns (zelfde slot, dates)
2. Verschillende creatives
3. Verschillende prioriteit (één moet hoger zijn)
4. Monitor performance
5. Pauzeer de slechtere, verhoog prioriteit van betere

### Rotation

Voor adverteerders met meerdere creatives:
1. Zelfde campaign settings
2. Verschillende end dates (1 week verschil)
3. Creative roteert automatisch na end date eerste campaign

---

## Contact en Support

Voor vragen over het CMS of problemen met content/advertenties:

- **Technische vragen**: Neem contact op met de ontwikkelaar
- **Content vragen**: Overleg met hoofdredacteur
- **Advertentie vragen**: Overleg met advertentie manager

**Handige links:**
- Sanity Studio: https://interieurexpert.vercel.app/studio  
- Website: https://interieurexpert.vercel.app
- Sanity Dashboard: https://www.sanity.io/manage

---

# Deel 3: Partners & Sponsored Content

## 1. Partner Systeem Overzicht

Interieur.expert werkt met drie types partners:

### 🌟 Premium Partners
- Langdurige samenwerking (6-12+ maanden)
- Eigen profiel pagina op `/partners/[slug]`
- Kunnen meerdere artikelen sponsoren
- Permanente ad presence
- Featured op partner overzichtspagina

**Voorbeelden:** XOOON, BoConcept, Karwei

### 📅 Campaign Partners
- Kortere campagnes (1-3 maanden)
- Optionele profiel pagina
- Tijdelijke ads met hoge priority
- Focus op specifieke content

### 🤝 Affiliate Partners
- Content partnerships
- Geen directe ads
- Affiliate links in content
- Optionele light profiel pagina

---

## 2. Partner Aanmaken

### Nieuwe Partner Toevoegen

1. Ga naar **Sanity Studio → Content → Partner → Create New**

### Vereiste Velden

**Name**: Volledige partnernaam
- Voorbeeld: "XOOON"

**Slug**: URL-vriendelijke versie
- Klik "Generate" voor automatische slug
- Voorbeeld: "xooon"
- **Let op:** Niet meer wijzigen na publicatie!

**Description**: Korte beschrijving (max 200 karakters)
- Voor partner overzichtspagina en preview
- Voorbeeld: "Modern Nederlands design met industriële twist. Robuuste materialen en verfijnde details."

**Website URL**: Link naar partner website
- Moet starten met https://
- Voorbeeld: https://www.xooon.nl

**Logo**: Partner logo
- Upload vierkant formaat (aanbevolen)
- Minimaal 400x400px
- PNG met transparante achtergrond werkt het beste

### Optionele Velden

**About**: Uitgebreide beschrijving
- Gebruikt portable text editor (zoals bij artikelen)
- Verschijnt op partner profiel pagina
- 200-400 woorden aanbevolen
- Vertel over:
  - Wie is de partner?
  - Waarom relevant voor lezers?
  - Wat maakt hen uniek?
  - Missie/visie

**Partner Type**: 
- Premium Partner (langdurig)
- Campaign Partner (tijdelijk)
- Affiliate Partner (commissie-based)

**Featured**: Ja/Nee
- Featured partners worden highlighted op `/partners`
- Maximaal 3-4 featured partners tegelijk

**Brand Color**: Hex color code
- Optioneel accent kleur voor styling
- Voorbeeld: #FF6B6B
- Wordt gebruikt op partner pagina

**Social Media**: Links naar social accounts
- Instagram URL
- Facebook URL
- Pinterest URL

**Showrooms**: Fysieke locaties
- Stad
- Adres
- Telefoonnummer
- Kan meerdere showrooms toevoegen

**Contract Start/End**: Administratie
- Voor intern gebruik
- Helpt bij planning en renewal

### Partner Pagina Preview

Na publicatie verschijnt de partner op:
- `/partners` - Overzichtspagina alle partners
- `/partners/[slug]` - Individuele partner pagina

**Partner pagina toont automatisch:**
- Logo en beschrijving
- Uitgebreide "Over" sectie
- Alle gesponsorde artikelen
- Website link en social media
- Showroom informatie
- "Gesponsord door [Partner]" badges

---

## 3. Content Sponsoren

### Artikel aan Partner Koppelen

1. Open een bestaand artikel of maak nieuw artikel
2. Scroll naar **Sponsored Content** sectie
3. Toggle **Sponsored Content** aan
4. Selecteer **Partner** uit dropdown
5. Voeg **Sponsor Disclosure** toe (verplicht!)

### Disclosure Text Voorbeelden

Goede disclosure texts:
- "Dit artikel is mogelijk gemaakt door [Partner]. Alle meningen en aanbevelingen zijn onafhankelijk."
- "In samenwerking met [Partner]. Onze editorial standards blijven ongewijzigd."
- "Gesponsord door [Partner]. Content en aanbevelingen zijn objectief en onafhankelijk bepaald."

### Gesponsorde Content Richtlijnen

**DO's:**
✅ Behoud redactionele kwaliteit
✅ Educatieve waarde voorop
✅ Eerlijke, onafhankelijke meningen
✅ Duidelijke disclosure verplicht
✅ Relevant voor lezers
✅ Voldoet aan normale content standards

**DON'TS:**
❌ Directe productverkooppraatjes
❌ Overdreven lovend zonder nuance
❌ Te product-focused (moet educatief zijn)
❌ Meer dan 2-3 gesponsorde artikelen per partner per kwartaal
❌ Verborgen partnerships (altijd transparent)

### Zichtbaarheid Sponsored Content

Gesponsorde artikelen zijn duidelijk gelabeld:
- "Gesponsord door [Partner]" badge bovenaan
- Partner logo naast badge
- Disclosure text onderaan artikel
- Link naar partner profiel
- Verschijnt op partner pagina
- Labeled in search results

---

## 4. Partner Pagina Onderhouden

### Content Up-to-Date Houden

**Regelmatig checken:**
- Is About sectie nog actueel?
- Logo correct en current?
- Website link werkt nog?
- Social media links correct?
- Showroom info klopt nog?

**Bij wijzigingen:**
1. Open Partner document in Sanity
2. Pas relevante velden aan
3. Klik "Update" rechtsboven
4. Wijzigingen zijn direct live

### Featured Partners Roteren

Om overzichtspagina fris te houden:
- Roteer Featured status elk kwartaal
- Max 3-4 Featured partners tegelijk
- Geef premium partners voorrang
- Overleg met advertentie manager

---

## 5. Best Practices Partner Content

### Voor Redacteuren

**Bij Gesponsorde Artikelen:**
1. Schrijf eerst het artikel (normale standaard)
2. Pas aan het einde partner toe
3. Check: blijft content objectief?
4. Voeg disclosure toe
5. Review met hoofdredacteur

**Content Quality:**
- Sponsored = niet lower quality
- Zelfde editorial standards
- Geen uitzonderingen op fact-checking
- Independence voorop

**Transparantie:**
- Altijd disclosure toevoegen
- Duidelijk labelen in CMS
- Overleg bij twijfel

### Voor Partner Managers

**Partner Onboarding:**
1. Maak partner document aan
2. Vraag alle info en assets
3. Setup partner pagina
4. Review met partner
5. Publish

**Partnership Onderhoud:**
- Maandelijkse content review
- Kwartaal check partner info
- Jaarlijkse contract renewal check
- Performance tracking (handmatig voor nu)

---

# Deel 4: Zoekfunctie

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
