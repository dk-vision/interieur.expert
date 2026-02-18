# Advertising & Partner Guide – interieur.expert

**Versie:** 2.1  
**Laatst bijgewerkt:** 18 februari 2026

---

## Inhoudsopgave

1. [Overzicht Advertising Mogelijkheden](#overzicht-advertising-mogelijkheden)
2. [Partner Programma](#partner-programma)
3. [Display Advertising](#display-advertising)
4. [Gesponsorde Content](#gesponsorde-content)
5. [Dossier Sponsoring](#dossier-sponsoring)
6. [Prijzen & Pakketten](#prijzen--pakketten)
7. [Aanmaken van Campaigns](#aanmaken-van-campaigns)
8. [Creative Leveringsspecificaties](#creative-leveringsspecificaties)

---

## Overzicht Advertising Mogelijkheden

Interieur.expert biedt vier advertising formaten:

### 1. **Display Advertising** 💰
Visuele advertenties op strategische posities op de website. Perfect voor brand awareness en product promoties.

### 2. **Gesponsorde Artikelen** ✍️
Branded content geschreven door onze redactie. Hoge engagement en storytelling mogelijkheden.

### 3. **Gesponsorde Video's** 🎥
Video content met jouw merk. Visuele storytelling met hoge impact.

### 4. **Dossier Sponsoring** 📁
Logo placement op thematische dossier pagina's. Ideaal voor thought leadership.

---

## Partner Programma

### Wat is een Partner?

Partners zijn merken en bedrijven die structureel met interieur.expert samenwerken. Als partner krijg je:

✅ **Partner profiel pagina** op `/partners/[slug]`  
✅ **Overzicht van al jouw gesponsorde content**  
✅ **Featured placement** op partners overzichtspagina (optioneel)  
✅ **Logo zichtbaarheid** bij alle gesponsorde content

### Partner Profiel Bevat

- Logo en merkkleuren
- Over ons beschrijving
- Website en social media links
- Showroom locaties
- Overzicht van alle gesponsorde content

### Partner Aanmaken

**In Sanity Studio:**
1. Ga naar **Content → Partner → Create New**
2. Vul in:
   - **Name**: Bedrijfsnaam
   - **Slug**: URL (bijv. "xooon")
   - **Description**: Korte intro (max 200 karakters)
   - **Logo**: Vierkant formaat, min. 400x400px
   - **Website URL**: Jouw website
   - **Brand Color**: Hex code (bijv. #FF6B6B)
3. Optioneel: About tekst, social media, showrooms

---

## Display Advertising

### Beschikbare Ad Slots

We hebben **6 strategische advertentieposities**:

| Slot | Locatie | Vast IAB formaat | Beste voor |
|------|---------|---------|-----------|
| **Homepage Hero** | Homepage, onder hero | 970×250 (desktop) / 728×90 (tablet) / 320×100 (mobile) | Brand awareness, launches |
| **Homepage Newsletter** | Homepage, boven newsletter | 970×90 (desktop) / 728×90 (tablet) / 320×100 (mobile) | Conversies, events |
| **Homepage Card** | Homepage, tussen content | 300×250 (Medium Rectangle) | Product showcases |
| **Listing Sidebar** | Alle listing pagina's | 300×600 (Half Page) | Always-on visibility |
| **Article Sidebar** | Artikel detailpagina's | 300×600 (Half Page) | Contextual relevantie |
| **Article Inline** | Binnen artikel content | 728×90 (desktop/tablet) / 320×100 (mobile) | Hoge engagement |

### Slot Details

#### Homepage Hero
- **Zichtbaarheid**: Eerste wat bezoekers zien
- **Traffic**: ~40% van alle pageviews
- **Format**: Horizontale banner (IAB: 970×250 / 728×90 / 320×100)
- **Aanbevolen voor**: Product launches, seizoenscampagnes, brand awareness
- **Pricing**: Premium

#### Homepage Newsletter
- **Zichtbaarheid**: Bij newsletter signup sectie
- **Traffic**: ~35% van homepage bezoekers scrollt hier
- **Format**: Super Leaderboard (IAB: 970×90 / 728×90 / 320×100)
- **Aanbevolen voor**: Webshops, nieuwsbrief partners, events
- **Pricing**: High

#### Homepage Card
- **Zichtbaarheid**: Blend in met content cards
- **Traffic**: ~30% van homepage bezoekers
- **Format**: Medium Rectangle (IAB: 300×250)
- **Aanbevolen voor**: Native advertising, product focus
- **Pricing**: High

#### Listing Sidebar
- **Zichtbaarheid**: Sticky (blijft zichtbaar tijdens scrollen)
- **Traffic**: Alle listing pagina's (artikels, inspiratie, advies, trends, dossiers, video)
- **Format**: Half Page (IAB: 300×600)
- **Aanbevolen voor**: Baseline campaigns, always-on presence
- **Pricing**: Medium (beste ROI)

#### Article Sidebar
- **Zichtbaarheid**: Sticky, naast artikel content
- **Traffic**: Hoge engagement, langere sessies
- **Format**: Half Page (IAB: 300×600)
- **Aanbevolen voor**: Baseline campaigns, contextual targeting
- **Pricing**: Medium

#### Article Inline
- **Zichtbaarheid**: Binnen artikel tekst
- **Traffic**: Hoogste engagement rate
- **Format**: Horizontale banner (IAB: 728×90 / 320×100)
- **Aanbevolen voor**: Targeted campaigns met specifieke tags
- **Pricing**: Premium (beste CTR)

### Campaign Settings

#### Priority (1-10)
Meerdere campaigns voor dezelfde slot worden gewogen op basis van priority:
- **1-3**: Lage priority (test campaigns, fill)
- **4-6**: Medium priority (baseline campaigns)
- **7-8**: Hoge priority (seasonal, tactical)
- **9-10**: Maximum priority (launches, premium)

**Voorbeeld:**
- Campaign A (priority 8): 8/15 = 53% van tijd getoond
- Campaign B (priority 5): 5/15 = 33% van tijd getoond  
- Campaign C (priority 2): 2/15 = 13% van tijd getoond

#### Targeting

**Categorie Targeting:**
Toon advertentie alleen op specifieke categorieën:
- `inspiratie` – Inspirerende projecten en interieur ideeën
- `advies` – Praktische tips en how-to content
- `trends` – Laatste trends en ontwikkelingen
- Voor videos: `video`
- Voor dossiers: Specifieke dossier categorieën

**Tag Targeting:**
Toon advertentie alleen bij content met specifieke tags:
- Bijv: `scandinavisch`, `industrieel`, `duurzaam`
- Multiple tags mogelijk
- Artikel moet minimaal één tag matchen

#### Datum Bereik
- **Start Date**: Campagne begint op deze datum (00:00)
- **End Date**: Campagne eindigt op deze datum (23:59)
- Campaigns buiten bereik worden automatisch niet getoond

#### Active Toggle
- **Active = Yes**: Campagne is live (binnen datum bereik)
- **Active = No**: Campagne gepauzeerd (ook binnen datum bereik)

### Fallback Ads

Als er **geen actieve campaign** is voor een slot, wordt automatisch een fallback ad getoond:
- Gradient achtergrond in huisstijl
- "Jouw advertentie hier?" boodschap
- CTA: "Word Partner"
- Link naar partnerships@interieur.expert

**Waarom?**
- Geen lege ruimtes
- Professionele uitstraling
- Actief werven van partners

---

## Gesponsorde Content

### Gesponsorde Artikelen

Branded content geschreven door onze redactie. Volledig geïntegreerd in de website maar duidelijk gelabeld als gesponsord.

#### Wat Krijg Je?
- Volledig redactioneel artikel (800-1500 woorden)
- Professional fotografie of stock images
- SEO geoptimaliseerd
- Geïntegreerd in content flow
- Badge: "Gesponsord door [Partner]"
- Link naar partner profiel
- Artikel blijft permanent online

#### Zichtbaarheid
- Homepage (indien featured)
- Categorie overzichtspagina's
- Partner profiel pagina
- "Gesponsord" badge bovenaan artikel
- Disclosure onderaan artikel

#### Richtlijnen
✅ Educatieve waarde voorop  
✅ Redactionele kwaliteit behouden  
✅ Authentieke storytelling  
✅ Subtiele product/merk integratie

❌ Geen directe verkooppraatjes  
❌ Geen clickbait  
❌ Maximaal 2-3 per partner per kwartaal

#### Setup in Sanity
1. Maak artikel aan
2. Toggle **Sponsored Content** = Yes
3. Selecteer **Partner**
4. Voeg **Sponsor Disclosure** toe:
   - "Dit artikel is mogelijk gemaakt door [Partner]. Alle meningen en aanbevelingen zijn onafhankelijk van de redactie."

### Gesponsorde Video's

Video content met jouw merk. Zelfde flow als artikelen.

#### Wat Krijg Je?
- YouTube video integratie
- Thumbnail en preview
- Transcript voor SEO
- "Gesponsord door [Partner]" badge
- Partner profiel link

#### Setup
Identiek aan artikelen:
1. Maak video document aan
2. Toggle **Sponsored Content** = Yes
3. Selecteer **Partner**
4. Voeg disclosure toe

---

## Dossier Sponsoring

### Wat is een Dossier?

Dossiers zijn thematische verzamelingen van content. Voorbeelden:
- "Verlichting Trends 2026"
- "Duurzaam Interieur"
- "Kleine Ruimtes Inrichten"
- "Scandinavisch Wonen"

### Wat Krijg Je als Sponsor?

- Logo placement onder hero image
- "Mogelijk gemaakt door [Partner]" label
- Link naar partner profiel
- Meerdere sponsors mogelijk (max. 3 aanbevolen)
- Sponsor naam in metadata

### Wanneer Gebruiken?

✅ Thematische relevantie met jouw merk  
✅ Thought leadership positie  
✅ Long-term visibility (dossiers blijven relevant)

**Voorbeelden:**
- Verlichtingsmerk → "Verlichting Trends 2026"
- Duurzaam merk → "Duurzaam Interieur 2026"
- Meubelmerk → "Woonkamer Inspiratie"

### Setup in Sanity
1. Open bestaand dossier
2. Scroll naar **Sponsors** sectie
3. Klik **Add** → Selecteer partner
4. Herhaal voor meer sponsors

---

## Prijzen & Pakketten

### Display Advertising

| Slot | Prijs per maand | Impressies (schatting) |
|------|----------------|------------------------|
| Homepage Hero | €800 | ~12.000 |
| Homepage Newsletter | €600 | ~10.000 |
| Homepage Card | €500 | ~8.000 |
| Listing Sidebar | €400 | ~15.000 |
| Article Sidebar | €350 | ~12.000 |
| Article Inline | €600 | ~8.000 (hoogste CTR) |

### Gesponsorde Content

| Type | Prijs | Wat is inbegrepen |
|------|-------|-------------------|
| Gesponsord Artikel | €1.200 | Redactie, fotografie, SEO, permanent online |
| Gesponsorde Video | €1.500 | Video productie, editing, SEO, permanent online |
| Dossier Sponsoring | €400-800 | Logo placement, link, visibility (afhankelijk van dossier grootte) |

### Voordeelpakketten

#### Starter Pakket – €1.200/maand
- 1× Listing Sidebar (priority 6)
- 1× Gesponsord Artikel per kwartaal
- Partner profiel pagina

#### Growth Pakket – €2.000/maand
- 1× Homepage Card (priority 7)
- 1× Listing Sidebar (priority 7)
- 2× Gesponsorde Artikelen per kwartaal
- 1× Dossier sponsoring
- Featured partner status

#### Premium Pakket – €3.500/maand
- 1× Homepage Hero (priority 9)
- 1× Article Inline (priority 8)
- 1× Listing Sidebar (priority 7)
- 3× Gesponsorde Artikelen per kwartaal
- 1× Gesponsorde Video per kwartaal
- 2× Dossier sponsoring
- Featured partner status

### À la carte
Alle producten ook los te bestellen. Prijzen op aanvraag voor:
- Multi-slot campaigns
- Langetermijn partnerships (3-12 maanden)
- Custom targeting
- Exclusiviteit binnen categorie

---

## Aanmaken van Campaigns

### Stap 1: Maak Ad Creative

**In Sanity Studio:**
1. Ga naar **Content → Ad Creative → Create New**

**Voor Image Ad:**
- **Title**: Interne naam (bijv. "XOOON Spring 2026 Hero")
- **Format**: Image
- **Link URL**: Waar moet de ad naartoe?
- **Alt Text**: Beschrijving voor toegankelijkheid
- **Image**: Upload ad afbeelding
   - Homepage Hero: 970×250 (desktop) / 728×90 (tablet) / 320×100 (mobile)
   - Homepage Newsletter: 970×90 (desktop) / 728×90 (tablet) / 320×100 (mobile)
   - Homepage Card: 300×250
   - Listing Sidebar / Article Sidebar: 300×600
   - Article Inline: 728×90 (desktop/tablet) / 320×100 (mobile)

> **Belangrijk:** Elk slot rendert in exacte IAB-pixels. Lever creatives pixel-perfect aan — zie de leverings­specificaties hieronder.

**Voor HTML Ad:**
- **Title**: Interne naam
- **Format**: HTML
- **Link URL**: Doellink
- **HTML Code**: Custom HTML/CSS

---

## Creative Leverings­specificaties

Lever **alle image creatives** aan als **PNG of WebP**, RGB, 72 dpi, maximale bestandsgrootte 200 KB per variant.

### Homepage Hero (`homepage-hero`)

| Breakpoint | Afmeting | IAB naam |
|---|---|---|
| Desktop (≥1024px) | **970 × 250 px** | Billboard |
| Tablet (640–1023px) | **728 × 90 px** | Leaderboard |
| Mobiel (<640px) | **320 × 100 px** | Large Mobile Banner |

Lever alle drie varianten aan. Veldnamen in Sanity: `imageDesktop`, `imageTablet`, `imageMobile`.

### Homepage Newsletter (`homepage-newsletter`)

| Breakpoint | Afmeting | IAB naam |
|---|---|---|
| Desktop (≥1024px) | **970 × 90 px** | Super Leaderboard |
| Tablet (640–1023px) | **728 × 90 px** | Leaderboard |
| Mobiel (<640px) | **320 × 100 px** | Large Mobile Banner |

Lever alle drie varianten aan. Veldnamen: `imageDesktop`, `imageTablet`, `imageMobile`.

### Homepage Card (`homepage-card`)

| Afmeting | IAB naam |
|---|---|
| **300 × 250 px** | Medium Rectangle |

Enkel één variant. Veldnaam: `image`.

### Listing Sidebar (`listing-sidebar`)

| Afmeting | IAB naam |
|---|---|
| **300 × 600 px** | Half Page |

Enkel één variant. Veldnaam: `image`.

### Article Inline (`article-inline`)

| Breakpoint | Afmeting | IAB naam |
|---|---|---|
| Desktop + Tablet (≥640px) | **728 × 90 px** | Leaderboard |
| Mobiel (<640px) | **320 × 100 px** | Large Mobile Banner |

Lever twee varianten aan. Veldnamen: `imageTablet` (wordt ook voor desktop gebruikt), `imageMobile`.

### Article Sidebar (`article-sidebar`)

| Afmeting | IAB naam |
|---|---|
| **300 × 600 px** | Half Page |

Enkel één variant. Veldnaam: `image`.

### Samenvatting alle formaten

| Veldnaam in Sanity | Pixelformaat | Gebruikt door |
|---|---|---|
| `imageDesktop` | 970×250 of 970×90 | homepage-hero, homepage-newsletter |
| `imageTablet` | 728×90 | homepage-hero, homepage-newsletter, article-inline |
| `imageMobile` | 320×100 | homepage-hero, homepage-newsletter, article-inline |
| `image` (enkel) | 300×250 | homepage-card |
| `image` (enkel) | 300×600 | listing-sidebar, article-sidebar |

> **Tip:** Voor slots met meerdere breakpoints (homepage-hero, homepage-newsletter, article-inline) is het sterk aanbevolen om **alle varianten** aan te leveren. Ontbrekende varianten worden automatisch ingevuld met de beste beschikbare variant, maar dit kan leiden tot uitrekken of letterboxing.

### Stap 2: Maak Ad Campaign

**In Sanity Studio:**
1. Ga naar **Content → Ad Campaign → Create New**
2. Vul in:
   - **Campaign Title**: Interne naam (bijv. "XOOON Q1 2026 Homepage")
   - **Partner**: Selecteer partner
   - **Ad Slot**: Kies positie
   - **Creative**: Selecteer ad creative uit stap 1
   - **Start Date**: Startdatum campagne
   - **End Date**: Einddatum campagne
   - **Priority**: 1-10 (zie sectie Priority)
   - **Active**: Yes/No toggle

3. Optioneel targeting:
   - **Target Category**: Specifieke categorie (leeg = overal)
   - **Target Tags**: Specifieke tags (leeg = overal)

### Voorbeeld Campaign Setups

#### Always-On Baseline
```
Campaign Title: XOOON Sidebar 2026
Partner: XOOON
Ad Slot: listing-sidebar
Creative: XOOON Sidebar General
Start Date: 01-01-2026
End Date: 31-12-2026
Priority: 6
Active: Yes
Target Category: [leeg]
Target Tags: [leeg]
```

#### Product Launch (Multi-Slot)
```
Campaign 1: BoConcept Copenhagen Hero
Partner: BoConcept
Ad Slot: homepage-hero
Creative: Copenhagen Launch Hero
Start Date: 01-03-2026
End Date: 30-04-2026
Priority: 9
Active: Yes

Campaign 2: BoConcept Copenhagen Inline
Partner: BoConcept
Ad Slot: article-inline
Creative: Copenhagen Launch Inline
Start Date: 01-03-2026
End Date: 30-04-2026
Priority: 9
Target Category: inspiratie
Target Tags: scandinavisch, minimalistisch
```

#### Seasonal Campaign
```
Campaign Title: Flexa Lente 2026
Partner: Flexa
Ad Slot: homepage-newsletter
Creative: Flexa Spring Colors
Start Date: 01-03-2026
End Date: 31-05-2026
Priority: 8
Active: Yes
Target Category: advies
Target Tags: verf, kleur
```

---

## Best Practices

### Voor Optimale Resultaten

#### Display Advertising
✅ Start met 1-2 slots en test performance  
✅ Gebruik homepage slots voor launches (2-3 maanden)  
✅ Gebruik sidebar slots voor always-on presence (6-12 maanden)  
✅ Test verschillende creatives (A/B testing)  
✅ Target relevant content met categorie/tags  
✅ Update creatives elk kwartaal (ad fatigue vermijden)

❌ Te veel slots tegelijk (kan overweldigend zijn)  
❌ Zelfde creative >3 maanden (ad blindness)  
❌ Priority te laag op homepage (<7)  
❌ Geen targeting (verspilt budget)

#### Gesponsorde Content
✅ Plan minimaal 4 weken vooruit  
✅ Lever briefing met key messages  
✅ Geef redactie creatieve vrijheid  
✅ Focus op storytelling, niet verkopen  
✅ Promoot artikel ook via eigen kanalen

❌ Te veel sponsored articles achter elkaar  
❌ Te salesachtige tone  
❌ Geen disclosure (verplicht!)

#### Dossier Sponsoring
✅ Kies relevante thema's voor jouw merk  
✅ Max 2-3 sponsors per dossier  
✅ Long-term commitment (dossiers blijven jaren relevant)

---

## Contact & Support

**Partnerships & Advertising:**
📧 partnerships@interieur.expert  
🌐 www.interieur.expert/adverteren

**Technische vragen over Sanity:**
Zie: HANDLEIDING-REDACTIE.md

**Content briefing template:**
Zie: DOSSIER-DOCUMENTATIE.md

---

## Changelog

**v2.1 – 18 februari 2026**
- Toegevoegd: volledige creative leverings­specificaties per slot (pixelformaten, IAB namen, Sanity veldnamen)
- Verduidelijking breakpoint-gedrag per slot
- Overzichtstabel alle Sanity image-velden

**v2.0 – 6 februari 2026**
- Complete rewrite voor duidelijkheid
- Actuele slot posities en pricing
- Verbeterde campaign voorbeelden
- Toegevoegd: voordeelpakketten
- Verwijderd: verouderde technische details

**v1.0 – November 2025**
- Initiële versie
