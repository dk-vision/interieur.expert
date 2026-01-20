# Handleiding voor Redacteuren — interieur.expert

## Inleiding

Welkom bij de Sanity CMS handleiding voor interieur.expert. Deze handleiding legt uit hoe je content kunt maken, bewerken en publiceren via het Sanity Studio. Het systeem is intuïtief en gebruiksvriendelijk, maar deze gids helpt je alle functies optimaal te benutten.

**Toegang tot Sanity Studio:**
- Lokaal: http://localhost:3001/studio (tijdens ontwikkeling)
- Productie: https://interieurexpert.vercel.app/studio

---

# Deel 1: Organische Content

## 1. Overzicht Content Types

Het platform heeft drie hoofdtypes voor organische content:

### 📄 **Articles** (Artikelen)
Reguliere geschreven artikelen met tekst, afbeeldingen en formattering. Dit zijn de standaard blogposts op de website.

### 🎥 **Videos** (Video's)
Video-content van YouTube met thumbnail, transcript en metadata. Perfect voor tutorials, tours en visuele content.

### 📁 **Dossiers**
Verzamelingen van gerelateerde artikelen en video's rond een specifiek onderwerp. Een dossier bundelt meerdere content items.

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

**Links toevoegen:**
1. Selecteer de tekst die een link moet worden
2. Klik op het link-icoon
3. Voer de URL in (moet beginnen met http:// of https://)
4. Klik op "Add"

**Afbeeldingen toevoegen:**
1. Klik op het "+" icoon in de editor
2. Selecteer "Image"
3. Upload een afbeelding
4. Gebruik hotspot om het belangrijkste deel te markeren
5. Afbeeldingen worden automatisch geoptimaliseerd

**Best Practices voor schrijven:**
- Begin met een sterke inleiding (eerste paragraaf)
- Gebruik H2 koppen om het artikel in secties te verdelen
- Voeg afbeeldingen toe om de tekst te onderbreken (om de 2-3 paragrafen)
- Gebruik quotes om belangrijke inzichten te benadrukken
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

## 6. Ad Slots Uitgelegd

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

## 7. Advertising Checklist

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

## 8. Troubleshooting

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

## 9. Advanced: Campaign Strategy

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

**Veel succes met het maken van geweldige content! 🎨✨**
