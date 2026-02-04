# Partner & Advertising Guide voor interieur.expert

## Inhoudsopgave
1. [Partner Systeem Overzicht](#partner-systeem-overzicht)
2. [Partner Types](#partner-types)
3. [Partner Aanmaken](#partner-aanmaken)
4. [Ad Campaign Systeem](#ad-campaign-systeem)
5. [Gesponsorde Content](#gesponsorde-content)
6. [Best Practices](#best-practices)

---

## Partner Systeem Overzicht

Interieur.expert werkt met drie types partners, elk met hun eigen advertising model:

**🌟 Premium Partners** - Langdurige partnerships met permanente aanwezigheid
**📅 Campaign Partners** - Tijdelijke campagnes met intensieve exposure  
**🤝 Affiliate Partners** - Content partnerships op commissiebasis

Het ad systeem gebruikt:
- **Active status** en **date ranges** (alleen actief tussen start- en einddatum)
- **Priority weighting** (1-10 schaal, hoger = vaker getoond)
- **Optional targeting** (categorie en tags)
- **Partner linking** (alle campaigns gekoppeld aan partners)

---

## Partner Types

### 🌟 Premium Partners

**Kenmerken:**
- Langdurige samenwerking (6-12+ maanden)
- Eigen profiel pagina op `/partners/[slug]`
- Permanent aanwezig via baseline ad campaigns
- Priority 5-6 voor consistente zichtbaarheid
- Kunnen meerdere artikelen sponsoren
- Featured op partner overzicht pagina

**Advertising strategie:**
- Baseline campaign: altijd actief, moderate priority (5-6)
- Tactical boost campaigns: tijdelijk high priority (8-10) voor launches
- Voorbeeld: XOOON heeft permanent sidebar ad (priority 6) + launch campaign (priority 9, 2 weken)

**Pricing:** €500-2000/maand afhankelijk van exposure

### 📅 Campaign Partners

**Kenmerken:**
- Kortere campagnes (1-3 maanden)
- Optionele profiel pagina (lichtere versie)
- High-priority ads tijdens campagne periode (7-9)
- Gerichte targeting op specifieke categorieën/tags
- Na campagne: archiveren of verlengen

**Advertising strategie:**
- Fixed start/einddatum
- Hoge priority voor impact (7-9)
- Vaak gericht op specifieke content

**Pricing:** €300-1000 per campagne + optioneel sponsored artikel (€150-500)

### 🤝 Affiliate Partners

**Kenmerken:**
- Geen directe advertising
- Affiliate links in content
- Optionele light profiel pagina
- Commissie-based model

**Pricing:** 10-15% commissie op verkopen

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
- **Partner Type**: Premium / Campaign / Affiliate
- **Featured**: Ja/Nee (tonen als featured partner)
- **Brand Color**: Hex code (bijv. #FF6B6B) voor accenten
- **Social Media**: Instagram, Facebook, Pinterest links
- **Showrooms**: Fysieke locaties met adres en telefoonnummer
- **Contract Start/End**: Voor administratie

**Voorbeeld: XOOON**
```
Name: XOOON
Slug: xooon
Description: Modern Nederlands design met industriële twist. 
Robuuste materialen en verfijnde details voor karaktervol interieur.
Website: https://www.xooon.nl
Partner Type: Premium Partner
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

Het platform heeft 4 vaste ad slots:
- **Sidebar**: Rechterkolom op artikel en listing pagina's
- **Listing Inline**: Tussen artikelen in overzichten
- **Article Inline**: Binnen artikel content
- **Dossier Banner**: Full-width banner op dossier pagina's (nieuw!)

**Wanneer welke slot gebruiken:**

**Sidebar** - Beste all-round placement voor baseline campaigns
- Altijd zichtbaar op desktop
- Niet storend voor leeservaring
- Ideaal voor: Premium partners baseline (priority 5-6)

**Article Inline** - High engagement placement binnen content
- Zichtbaar tijdens het lezen
- Hogere click-through rate
- Ideaal voor: Gerichte campaigns (priority 7-9)

**Listing Inline** - Visibility op overzichtspagina's
- Tussen content cards op overview pages
- Goed voor brand awareness
- Ideaal voor: Campaign partners (priority 7-8)

**Dossier Banner** - Premium placement op thema dossiers
- Full-width banner tussen hero image en content
- Themagerichte content = betere match
- Kan targeten op dossier categorie (Verlichting, Duurzaamheid, etc.)
- Ideaal voor: Thematische campaigns, product launches (priority 8-10)

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

**Voorbeeld Premium Partner Ad:**
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
- **Ad Slot**: Kies waar de ad verschijnt (Sidebar / Listing Inline / Article Inline / Dossier Banner)
- **Creative**: Selecteer de ad creative
- **Start Date**: Wanneer begint de campagne
- **End Date**: Wanneer eindigt de campagne
- **Priority**: 1-10 (hoger = vaker getoond)
- **Active**: Ja/Nee (on/off switch)

**Optionele targeting:**
- **Target Category**: Toon alleen op specifieke categorieën
  - Voor artikelen: inspiratie / advies / trends
  - Voor dossiers: Verlichting / Duurzaamheid / Wonen / Materialen
- **Target Tags**: Toon alleen op artikelen met specifieke tags

**Voorbeeld Premium Partner Baseline Campaign:**
```
Campaign Title: XOOON Sidebar Baseline 2026
Partner: XOOON
Ad Slot: Sidebar
Creative: XOOON Sidebar - Q1 2026
Start Date: 01-01-2026
End Date: 31-12-2026
Priority: 6
Active: Yes
Target Category: [leeg - show everywhere]
Target Tags: [leeg]
```

**Voorbeeld Campaign Partner Launch:**
```
Campaign Title: BoConcept Spring Collection Launch
Partner: BoConcept
Ad Slot: Article Inline
Creative: Spring Collection 2026
Start Date: 01-03-2026
End Date: 30-04-2026
Priority: 9
Active: Yes
Target Category: inspiratie
Target Tags: scandinavisch, minimalistisch
```

**Voorbeeld Dossier Banner Campaign:**
```
Campaign Title: LED Lampen NL - Verlichting Dossier
Partner: LED Lampen NL
Ad Slot: Dossier Banner
Creative: LED Verlichting Banner
Start Date: 01-02-2026
End Date: 31-03-2026
Priority: 9
Active: Yes
Target Category: Verlichting
Target Tags: [leeg]
```
*Deze banner verschijnt alleen op dossiers met categorie "Verlichting"*

### Priority Weging Uitgelegd

**Hoe het werkt:**
Meerdere campaigns voor dezelfde slot worden gewogen op basis van priority.

**Voorbeeld Sidebar Slot:**
- XOOON (priority 6): 6/15 = **40% kans**
- BoConcept (priority 5): 5/15 = **33% kans**
- Seasonal Campaign (priority 4): 4/15 = **27% kans**

**Best Practices:**
- **Premium partners baseline**: Priority 5-6 (consistente presence)
- **Premium boost campaigns**: Priority 8-9 (tactical pushes)
- **Campaign partners standard**: Priority 7-8 (strong presence)
- **Campaign partners high-impact**: Priority 9-10 (launches, limited time)
- **Seasonal/fill**: Priority 3-5 (altijd iets tonen)

---

## Gesponsorde Content

### Artikel Sponsoren

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

### Voor Premium Partners

**Do's:**
✅ Setup baseline campaign met moderate priority (5-6)
✅ Geef geen einddatum (of verleng jaarlijks)
✅ Add tactical boost campaigns voor launches (priority 8-10)
✅ Sponsor 2-4 kwalitatieve artikelen per jaar
✅ Houd partner pagina up-to-date

**Don'ts:**
❌ Priority te laag zetten (<4) - weinig visibility
❌ Priority te hoog baseline (>7) - te dominant
❌ Teveel sponsored content - verliest geloofwaardigheid
❌ Slechte kwaliteit ads - reflecteert op merk

### Voor Campaign Partners

**Do's:**
✅ Duidelijke start/einddatum (1-3 maanden)
✅ High priority voor impact (7-9)
✅ Gerichte targeting voor relevantie
✅ Optioneel sponsored artikel tijdens campagne
✅ Evalueer performance na afloop

**Don'ts:**
❌ Te lange campagnes (>3 maanden) - ad fatigue
❌ Te lage priority (<6) - weinig impact
❌ Geen targeting - geld verspillen
❌ Na afloop campaign actief laten - vervuiling

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
