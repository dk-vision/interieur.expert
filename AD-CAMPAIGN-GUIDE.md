# Partner & Advertising Guide voor interieur.expert

## Inhoudsopgave
1. [Partner Systeem Overzicht](#partner-systeem-overzicht)
2. [Partner Aanmaken](#partner-aanmaken)
3. [Ad Campaign Systeem](#ad-campaign-systeem)
4. [Gesponsorde Content](#gesponsorde-content)
5. [Best Practices](#best-practices)

---

## Partner Systeem Overzicht

Interieur.expert werkt met partners (sponsors) die het platform ondersteunen via verschillende vormen van advertising:

- **Display advertising**: Betaalde ad campaigns op homepage, sidebar, en inline
- **Sponsored content**: Gesponsorde artikelen en video's
- **Dossier sponsorship**: Logo placement op thematische dossiers

**Partner profiel:**
- Eigen profiel pagina op `/partners/[slug]`
- Featured partners krijgen extra zichtbaarheid op overzichtspagina
- Alle gesponsorde content verzameld op partner pagina

**Advertising systeem:**
- **Active status** en **date ranges** (alleen actief tussen start- en einddatum)
- **Priority weighting** (1-10 schaal, hoger = vaker getoond)
- **Optional targeting** (categorie en tags)
- **Partner linking** (alle campaigns gekoppeld aan partners)

---

## Partner Aanmaken

### Stap 1: Partner Document Maken

Ga naar **Sanity Studio → Content → Partner → Create New**

**Vereiste velden:**
- **Name**: Volledige partnernaam (bijv. "XOOON")
- **Slug**: URL-vriendelijke versie (bijv. "xooon")
- **Description**: Korte beschrijving voor overzichtspagina (max 200 karakters)
- **Website URL**: Link naar partner website
- **Logo**: Upload partner logo (vierkant formaat aanbevolen)

**Optionele velden:**
- **About**: Uitgebreide beschrijving voor partner pagina (portable text)
- **Featured**: Ja/Nee (visuele highlight op partners pagina - niet advertising!)
- **Brand Color**: Hex code (bijv. #FF6B6B) voor accenten
- **Social Media**: Instagram, Facebook, Pinterest links
- **Showrooms**: Fysieke locaties met adres en telefoonnummer
- **Contract Start/End**: Voor administratie

**Voorbeeld: XOOON**
```
Name: XOOON
Slug: xooon
Description: Modern design met industriële twist. 
Robuuste materialen en verfijnde details voor karaktervol interieur.
Website: https://www.xooon.nl
Featured: Yes
Brand Color: #2C2C2C
```

### Stap 2: Partner Pagina Content

De partner pagina (`/partners/xooon`) toont automatisch:
- Logo en beschrijving
- "Over" sectie (uit About veld)
- Alle gesponsorde artikelen van deze partner
- Links naar website en social media
- Showroom informatie (indien ingevuld)

---

## Ad Campaign Systeem

### Advertising Slots

Het platform heeft **6 strategische ad slots** verdeeld over homepage, listings en artikelen:

#### Homepage Slots (3 posities)
- **Homepage Hero**: Large banner onder de hero section (1280x400px)
- **Homepage Newsletter**: Medium banner boven newsletter signup (1280x200px)  
- **Homepage Card**: Card-formaat tussen featured content (600x400px)

#### Listing Slots (1 positie)
- **Listing Sidebar**: Sticky sidebar op alle listing pages (400x600px)

#### Article Slots (2 posities)
- **Article Inline**: Horizontale banner binnen artikel content (1000x200px)
- **Article Sidebar**: Sticky sidebar naast artikel (400x600px)

### Slot Dimensies & Gebruik

| Slot | Afmeting | Format | Beste voor |
|------|----------|--------|-----------|
| Homepage Hero | 1280x400px | Horizontal | Brand awareness, launches |
| Homepage Newsletter | 1280x200px | Horizontal | Nieuwsbriefpartners, events |
| Homepage Card | 600x400px | Vertical | Product showcases |
| Listing Sidebar | 400x600px | Vertical | Baseline presence, always-on |
| Article Inline | 1000x200px | Horizontal | In-content engagement |
| Article Sidebar | 400x600px | Vertical | Non-intrusive presence |

### Fallback Ads

Als er geen actieve campaign is voor een slot, wordt automatisch een **fallback ad** getoond:
- Gradient background in huisstijl kleuren
- "Jouw advertentie hier?" tekst
- CTA: "Word partner"  
- Link naar: partnerships@interieur.expert
- Automatische dimensie-aanpassing per slot

**Waarom fallback ads?**
- Geen lege ruimtes op de website
- Actief werven van nieuwe partners
- Professionele uitstraling

### Wanneer welke slot gebruiken:

**Homepage Hero** - Maximum visibility en impact
- Eerste wat bezoekers zien
- Groot formaat voor brand storytelling
- Ideaal voor: Product launches, major campaigns, brand awareness
- Aanbevolen priority: 8-10

**Homepage Newsletter** - High-value plaatsing bij signup
- Zichtbaar tijdens nieuwsbrief interactie
- Goed voor partnerschappen met email focus
- Ideaal voor: Webshops, events, seasonal campaigns
- Aanbevolen priority: 7-9

**Homepage Card** - Native tussen content
- Blend in met organic content cards
- Visueel product showcase formaat
- Ideaal voor: Product-focused advertisers, visual brands
- Aanbevolen priority: 6-8

**Listing Sidebar** - Beste all-round placement
- Sticky positioning (blijft zichtbaar tijdens scrollen)
- Desktop-only (niet storend op mobile)
- Niet storend voor leeservaring
- Ideaal voor: Baseline campaigns, always-on presence
- Aanbevolen priority: 5-7

**Article Inline** - High engagement binnen content
- Tussen paragrafen tijdens het lezen
- Hogere click-through rate door context
- Ideaal voor: Gerichte campaigns met targeting
- Aanbevolen priority: 7-9

**Article Sidebar** - Non-intrusive companion
- Sticky positioning naast artikel
- Leest mee zonder te storen
- Ideaal voor: Baseline campaigns, always-on presence
- Aanbevolen priority: 5-7

### Campaign Setup

#### Stap 1: Create Ad Creative

#### Stap 1: Create Ad Creative

Ga naar **Sanity Studio → Content → Ad Creative → Create New**

**Image Ad (meest gebruikt):**
- **Title**: Beschrijvende naam (intern gebruik)
- **Format**: Image
- **Link URL**: Waar moet de ad naartoe linken?
- **Alt Text**: Beschrijving voor toegankelijkheid
- **Image**: Upload ad afbeelding (600x338px aanbevolen)

**HTML Ad (voor custom designs):**
- **Title**: Beschrijvende naam
- **Format**: HTML
- **Link URL**: Doellink
- **HTML Code**: Custom HTML/CSS code voor de ad

**Voorbeeld Partner Ad:**
```
Title: XOOON Sidebar - Q1 2026
Format: Image
Link URL: https://www.xooon.nl/collecties/woonkamer
Alt Text: XOOON moderne meubels voor je woonkamer
Image: [Upload product foto]
```

#### Stap 2: Create Ad Campaign

Ga naar **Sanity Studio → Content → Ad Campaign → Create New**

**Vereiste velden:**
- **Campaign Title**: Intern naam voor de campagne
- **Partner**: Selecteer partner uit lijst
- **Ad Slot**: Kies waar de ad verschijnt:
  - homepage-hero
  - homepage-newsletter  
  - homepage-card
  - listing-sidebar
  - article-inline
  - article-sidebar
- **Creative**: Selecteer de ad creative
- **Start Date**: Wanneer begint de campagne
- **End Date**: Wanneer eindigt de campagne
- **Priority**: 1-10 (hoger = vaker getoond)
- **Active**: Ja/Nee (on/off switch)

**Optionele targeting:**
- **Target Category**: Toon alleen op specifieke categorieën
  - Voor artikelen: inspiratie / advies / trends / stijlen
  - Voor dossiers: Gebruik de dossier categorie (Verlichting, Kleuren, etc.)
- **Target Tags**: Toon alleen op artikelen met specifieke tags

**Voorbeeld Baseline Campaign (Homepage Hero):**
```
Campaign Title: XOOON Homepage Hero 2026
Partner: XOOON
Ad Slot: homepage-hero
Creative: XOOON Spring Collection Hero
Start Date: 01-01-2026
End Date: 31-12-2026
Priority: 7
Active: Yes
Target Category: [leeg - show everywhere]
Target Tags: [leeg]
```

**Voorbeeld Product Launch (Homepage + Article):**
```
Campaign Title: BoConcept Copenhagen Launch - Homepage
Partner: BoConcept
Ad Slot: homepage-card
Creative: Copenhagen Collection Card
Start Date: 01-03-2026
End Date: 30-04-2026
Priority: 9
Active: Yes
Target Category: stijlen
Target Tags: scandinavisch, minimalistisch

Campaign Title: BoConcept Copenhagen Launch - Articles
Partner: BoConcept
Ad Slot: article-inline
Creative: Copenhagen Collection Inline
Start Date: 01-03-2026
End Date: 30-04-2026
Priority: 9
Active: Yes
Target Category: inspiratie
Target Tags: scandinavisch, minimalistisch
```

**Voorbeeld Baseline Sidebar:**
```
Campaign Title: Flexa Sidebar Always-On
Partner: Flexa  
Ad Slot: listing-sidebar
Creative: Flexa Paint Sidebar
Start Date: 01-01-2026
End Date: 31-12-2026
Priority: 6
Active: Yes
Target Category: [leeg]
Target Tags: [leeg]
```

### Priority Weging Uitgelegd

**Hoe het werkt:**
Meerdere campaigns voor dezelfde slot worden gewogen op basis van priority.

**Voorbeeld Sidebar Slot:**
- XOOON (priority 6): 6/15 = **40% kans**
- BoConcept (priority 5): 5/15 = **33% kans**
- Seasonal Campaign (priority 4): 4/15 = **27% kans**

**Best Practices:**
- **Homepage campaigns**: Priority 7-10 (high visibility, premium placement)
- **Sidebar campaigns baseline**: Priority 5-7 (always-on presence)
- **Inline campaigns**: Priority 7-9 (tactical, targeted)
- **Seasonal/test campaigns**: Priority 4-6 (lower budget, fill)

### Multi-Slot Campaigns

Voor maximum impact kan één partner meerdere slots tegelijk gebruiken:

**Voorbeeld: Product Launch (3 slots):**
1. **Homepage Hero** (priority 9): Brand awareness
2. **Homepage Card** (priority 8): Product showcase
3. **Article Inline** (priority 9): Targeted engagement met tags

**Voorbeeld: Always-On Presence (2 slots):**
1. **Listing Sidebar** (priority 6): Baseline visibility
2. **Article Sidebar** (priority 6): In-content presence

**Pricing tip:** Multi-slot packages met korting

---

## Gesponsorde Dossiers

### Dossier Sponsorship Setup

Dossiers kunnen gesponsord worden door één of meerdere partners. Dit geeft extra zichtbaarheid via logo placement.

**Setup:**
1. Open een dossier in Sanity Studio
2. Scroll naar **Sponsors** sectie
3. Klik op "Add" om een partner toe te voegen
4. Selecteer partner uit dropdown
5. Herhaal voor meerdere sponsors (max. 3 aanbevolen)

**Zichtbaarheid:**
- "Mogelijk gemaakt door" sectie onder hero image
- Partner logo's in grid (200x80px sizing)
- Clickable naar partner profiel pagina
- Sponsor naam in dossier metadata

**Wanneer gebruiken:**
- Thematische dossiers met relevante sponsors
- Voorbeeld: "Duurzaamheid 2026" gesponsord door WOOD Meubelen + Vij5
- Voorbeeld: "Verlichting Trends" gesponsord door Modular Lighting
- Partners moeten relevant zijn voor het dossier thema

**Pricing:** €200-600 per dossier (afhankelijk van visibility)

### Gesponsorde Artikelen

Artikelen kunnen gesponsord worden door partners. Dit geeft extra zichtbaarheid aan de partner.

**Setup:**
1. Open een artikel in Sanity Studio
2. Scroll naar **Sponsored Content** sectie
3. Toggle **Sponsored Content** aan
4. Selecteer **Partner** uit dropdown
5. Voeg **Sponsor Disclosure** toe (verplicht):
   - Voorbeeld: "Dit artikel is mogelijk gemaakt door XOOON. Alle meningen en aanbevelingen zijn onafhankelijk."

**Zichtbaarheid:**
- "Gesponsord door [Partner]" badge bovenaan artikel
- Partner logo naast badge
- Disclosure text onderaan artikel
- Link naar partner profiel pagina
- Artikel verschijnt op partner profiel pagina

**Richtlijnen:**
- Maximaal 2-3 sponsored artikelen per partner per kwartaal
- Content moet redactioneel kwalitatief blijven
- Geen directe productverkooppraatjes
- Educatieve waarde voorop
- Duidelijke disclosure altijd verplicht

---

## Best Practices

### Voor Partners

**Do's:**
✅ Start met 1-2 slots en test performance
✅ Gebruik homepage slots voor launches en brand awareness  
✅ Gebruik sidebar slots voor always-on baseline presence
✅ Target specifieke categorieën/tags voor relevantie
✅ Sponsor dossiers die relevant zijn voor je merk
✅ Multi-slot campaigns voor maximum impact

**Don'ts:**
❌ Te veel slots tegelijk - kan overweldigend zijn
❌ Homepage slots voor lange tijd - ad fatigue
❌ Priority te laag op homepage (<7) - weinig visibility
❌ Geen targeting - geld verspillen op irrelevante content
❌ Dossiers sponsoren zonder thematische match

### Transparantie & Compliance

**Verplicht:**
- Alle ads labelen met "Advertisement" (gebeurt automatisch)
- Sponsored content moet duidelijk gelabeld zijn
- Partner disclosure op partner pagina's
- GDPR-compliant (geen tracking zonder consent)

**Aanbevolen:**
- Eerlijk over partnerships in content
- Kwaliteit boven kwantiteit
- Editorial standards handhaven
- Regelmatige review van ad performance

---

## Testing & Scripts

### Test Data Scripts

Voor development en demo purposes zijn er handige scripts beschikbaar:

**Cleanup Script:**
```bash
pnpm cleanup-ads
```
- Verwijdert ALLE ad campaigns en creatives
- Gebruik voor clean slate testing
- **Waarschuwing:** Kan niet ongedaan gemaakt worden!

**Create Test Ads:**
```bash
pnpm create-test-ads
```
- Maakt 6 test campaigns aan (één per slot)
- HTML creatives met gradients en emojis
- Verschillende priorities voor rotatie testing
- Active status en realistic date ranges

**Create Sponsored Dossier:**
```bash
pnpm create-sponsored-dossier
```
- Maakt een voorbeeld dossier met 3 sponsors
- Gebruikt bestaande partners (Joli, Vincent Sheppard, Magnitude)
- Perfect voor testing sponsor logo display

### Manual Testing Checklist

**Homepage Ads:**
1. Ga naar homepage (http://localhost:3001)
2. Check Homepage Hero ad onder hero section
3. Scroll naar newsletter → Check Homepage Newsletter ad
4. Check Homepage Card tussen featured articles (6e positie)
5. Refresh meerdere keren → Ads moeten roteren

**Listing Ads:**
1. Ga naar /artikels of /inspiratie
2. Check Listing Sidebar (sticky op desktop)
3. Scroll omlaag → Sidebar blijft mee scrollen

**Article Ads:**
1. Open een artikel
2. Check Article Sidebar (rechts, sticky)
3. Scroll door content → Check Article Inline ad tussen paragrafen
4. Test met/zonder category/tag targeting

**Dossier Sponsors:**
1. Ga naar een gesponsord dossier
2. Check "Mogelijk gemaakt door" sectie onder hero
3. Check clickable logos (200x80px)

**Fallback Ads:**
1. Disable alle campaigns in Sanity
2. Refresh pages → Moet fallback ads zien
3. Check "Jouw advertentie hier?" + CTA
4. Different fallback formats per slot

---

## Partner Performance Tracking

### Metrics per Campaign

Volgende versie krijgt automated tracking, maar nu handmatig te meten:

**Ad Campaigns:**
- Impressions (aantal keer getoond)
- CTR (click-through rate)
- Visibility share (% van tijd getoond in slot)

**Sponsored Content:**
- Page views
- Time on page
- Engagement (scroll depth)
   - Visit article without tags → Should see Campaign 1 or 3 randomly
4. **Test rotation**: Refresh page multiple times → Ads should rotate based on priority
5. **Test slots**: Check different pages (listing, article) → Different ads in different slots

## Ad Slot Positions

- **Sidebar**: Appears on right side of listing and article pages (desktop only)
- **Listing Inline**: Could be placed between content cards on listing pages
- **Article Inline**: Could be placed within article content

## Next Steps

1. Create real campaigns with actual advertiser content
2. Upload professional images for image-based ads
3. Monitor which campaigns perform best
4. Adjust priorities based on advertiser contracts
5. Use targeting to show relevant ads on specific pages

## Analytics Setup

✅ Vercel Analytics is installed and tracking page views automatically
- No additional setup required
- View analytics in Vercel dashboard
- Track which pages get most traffic to optimize ad placement

## Future Enhancements (Phase 3)

When you have actual advertisers:
- Add impression tracking (count how many times each ad is shown)
- Add click tracking (count clicks per campaign)
- Create analytics dashboard in Sanity Studio
- Generate reports for advertisers
- A/B testing for ad creatives
- Time-of-day targeting
