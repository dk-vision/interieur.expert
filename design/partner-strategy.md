# Partner & Adverteerder Strategie

## Huidige Situatie (Analyse)

### Wat we al hebben
✅ **Partner Schema** - Basis info (naam, website, logo, brand color)
✅ **Ad Campaign System** - Periodieke campaigns met targeting en priority
✅ **Sponsored Content** - Artikelen kunnen gesponsord worden door partners
✅ **Ad Slots** - 3 vaste posities (listing-inline, article-inline, sidebar)

### Wat ontbreekt
❌ Partner profiel pagina's
❌ Overzicht van partner content
❌ Partner-specific ad management
❌ Permanent vs tijdelijk adverteren onderscheid
❌ Partner dashboard/statistieken (nice to have)

---

## Strategische Visie

### Partner Types

#### 1. Premium Partners (Permanent)
**Karakteristiek:**
- Langdurige samenwerking (min. 6-12 maanden)
- Eigen profiel pagina op site
- Kunnen meerdere artikelen sponsoren
- Priority advertising (hogere weging)
- Featured op partner overzichtspagina

**Voorbeelden:** XOOON, BoConcept, Karwei, IKEA

**Revenue model:** Vast maandbedrag + performance bonussen

#### 2. Campaign Partners (Periodiek)
**Karakteristiek:**
- Kortere campagnes (1-3 maanden)
- Gerichte targeting (specifieke categorieën/tags)
- Ad slots met start/einddatum
- Optioneel sponsored artikel
- Geen permanente profiel pagina

**Voorbeelden:** Nieuwe merken, seizoenscampagnes, product launches

**Revenue model:** Per campagne pricing

#### 3. Affiliate Partners
**Karakteristiek:**
- Content partnerships zonder directe betaling
- Affiliate links in content
- Geen dedicated ads
- Kunnen wel profiel pagina krijgen (light version)

**Voorbeelden:** Online retailers met affiliate programma's

**Revenue model:** Commissie per verkoop

---

## Partner Profiel Pagina

### URL Structuur
```
/partners → Overzicht alle partners
/partners/[slug] → Individuele partner pagina
```

### Partner Pagina Inhoud

#### Hero Sectie
- Partner logo (groot)
- Partner naam
- Tagline/beschrijving (1-2 zinnen)
- CTA button naar website
- Optional: Brand color als accent

#### Over Sectie
- Uitgebreide beschrijving partner
- Waarom relevant voor interieur.expert lezers
- USPs / specialisaties
- Missie/visie (optioneel)

#### Gesponsorde Content
- Grid met alle artikelen gesponsord door deze partner
- Prominente "Gesponsord door [Partner]" badge
- Sortering: nieuwste eerst

#### Huidige Acties (optioneel)
- Actieve ad campaigns van deze partner
- Huidige kortingen/aanbiedingen
- Tijdelijke highlights

#### Contact/Info
- Website link
- Social media links (optioneel)
- Showrooms/winkels (optioneel)

---

## Schema Updates

### Partner Schema Uitbreiding
```typescript
// Toevoegen aan bestaande partner.ts:

slug: {
  type: 'slug',
  source: 'name',
  required: true
}

description: {
  type: 'text',
  rows: 3,
  title: 'Kort Beschrijving',
  description: 'Voor partner overzicht en hero (max 200 chars)',
  validation: max 200
}

about: {
  type: 'array',
  of: [{ type: 'block' }],
  title: 'Over Partner',
  description: 'Uitgebreide beschrijving voor partner pagina'
}

partnerType: {
  type: 'string',
  options: {
    list: [
      { title: 'Premium Partner', value: 'premium' },
      { title: 'Campaign Partner', value: 'campaign' },
      { title: 'Affiliate Partner', value: 'affiliate' }
    ]
  }
}

featured: {
  type: 'boolean',
  title: 'Featured Partner',
  description: 'Show on homepage/prominent positions',
  default: false
}

socialMedia: {
  type: 'object',
  fields: [
    { name: 'instagram', type: 'url' },
    { name: 'facebook', type: 'url' },
    { name: 'pinterest', type: 'url' }
  ]
}

showrooms: {
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'city', type: 'string' },
      { name: 'address', type: 'text' },
      { name: 'phone', type: 'string' }
    ]
  }]
}

contractStart: {
  type: 'date',
  title: 'Contract Start',
  description: 'Voor admin - wanneer partnership begint'
}

contractEnd: {
  type: 'date',
  title: 'Contract End',
  description: 'Voor admin - wanneer partnership eindigt'
}
```

### Ad Campaign - Partner Link
```typescript
// Toevoegen aan adCampaign.ts:

partner: {
  type: 'reference',
  to: [{ type: 'partner' }],
  title: 'Partner',
  description: 'Link campaign to partner (for tracking)',
  validation: required
}

campaignType: {
  type: 'string',
  options: {
    list: [
      { title: 'Standard Display', value: 'display' },
      { title: 'Sponsored Content Promo', value: 'sponsored-promo' },
      { title: 'Product Launch', value: 'product-launch' }
    ]
  }
}
```

---

## Advertising Integration Strategie

### Permanent Advertising (Premium Partners)

**Mechanisme:**
1. Premium partners krijgen **altijd-actieve baseline campaigns**
2. Deze hebben moderate priority (5-6) 
3. Roteren met elkaar via weighted random
4. Kunnen aangevuld worden met tijdelijke high-priority campaigns

**Voorbeeld XOOON:**
- Baseline campaign: sidebar ad, priority 5, geen einddatum
- Launch campaign: article-inline ad, priority 9, 2 weken actief
- Resultaat: altijd zichtbaar, maar extra push bij launches

**Voordelen:**
- Consistente aanwezigheid voor premium partners
- Voorspelbare impressions
- Ruimte voor tactical campaigns

### Periodiek Advertising (Campaign Partners)

**Mechanisme:**
1. Fixed start/einddatum
2. Variable priority (meestal 7-9 voor impact)
3. Vaak gericht op specifieke content (targeting)
4. After campaign: archiveren of verlengen

**Voorbeeld Seizoenscampagne:**
- "Zomer Collectie Launch" - 6 weken
- Target tags: outdoor, terras, zomer
- Priority 8
- Na afloop: evaluatie en eventueel hernieuwing

### Rotation Logica (hoe het nu werkt)

**Current System:**
```javascript
// Gewogen random selectie per slot
sidebar: [
  { partner: 'XOOON', priority: 5, weight: 5/14 = 36% },
  { partner: 'BoConcept', priority: 6, weight: 6/14 = 43% },
  { partner: 'Seasonal', priority: 3, weight: 3/14 = 21% }
]
```

**Aanbeveling Premium Partners:**
- Base priority: 5-6 (consistent presence)
- Never below 4 (maintaining visibility)
- Boost priority: 8-10 (tactical pushes)

**Aanbeveling Campaign Partners:**
- Standard: 7-8 (strong presence during campaign)
- High-impact: 9-10 (product launches, limited time)

---

## Partner Overzicht Pagina

### Layout: `/partners`

**Hero Sectie**
- "Onze Partners" titel
- Subtitle: "Merken en bedrijven die wij vertrouwen"
- Uitleg partnership filosofie (2-3 zinnen)

**Featured Partners Grid**
- 2-3 premium partners highlighted
- Grotere cards met extra info
- "Featured Partner" badge

**Alle Partners Grid**
- Alfabetisch gesorteerd
- Card per partner:
  - Logo
  - Naam
  - Korte beschrijving
  - "Bekijk profiel" CTA
  - Badge voor partner type (optioneel)

**Filter/Sortering (v2)**
- Filter op partner type
- Sortering: A-Z, Featured first, Nieuwste

---

## Implementatie Roadmap

### Fase 1: Basis (MVP)
✅ Partner schema uitbreiden
✅ Partner profiel pagina maken (`/partners/[slug]`)
✅ Partner overzicht pagina (`/partners`)
✅ Link articles naar partner pagina
✅ Link campaigns naar partners (tracking)

**Tijdsinvestering:** 3-4 uur
**Priority:** HIGH

### Fase 2: Verbetering
- Partner type filtering
- Showroom informatie
- Social media integratie
- SEO optimalisatie partner pages

**Tijdsinvestering:** 2-3 uur
**Priority:** MEDIUM

### Fase 3: Analytics & Management
- Campaign performance tracking
- Partner dashboard (admin only)
- Automated reporting
- Revenue tracking

**Tijdsinvestering:** 6-8 uur
**Priority:** LOW (nice to have)

---

## Content Strategie per Partner Type

### Premium Partners (voorbeeld XOOON)

**Partner Pagina Content:**
```
# XOOON - Modern Nederlands design

XOOON staat voor eigentijds design met een stoere, industriële twist. 
Hun collectie combineert robuuste materialen met verfijnde details - 
perfect voor wie karakter in hun interieur wil.

## Over XOOON
[Uitgebreide beschrijving - 200-300 woorden]
- Ontstaan en visie
- Design filosofie
- Waarom relevant voor lezers

## Collecties
- Meubels voor elke ruimte
- Duurzame materialen
- Nederlandse producten

## Gesponsorde Artikelen
[Grid met alle XOOON-gesponsorde artikelen]
```

**Advertising:**
- Permanent sidebar presence (priority 5-6)
- Quarterly featured campaigns (priority 8-9)
- 2-4 sponsored articles per jaar

### Campaign Partners (voorbeeld Seizoenscampagne)

**Geen permanente pagina** - wel campaign landing
**Advertising:**
- 4-8 week campaign window
- High priority (7-9)
- Targeted (specific tags/categories)
- Optioneel: 1 sponsored artikel

---

## Juridisch & Transparantie

### Disclosure Requirements

**Gesponsorde Artikelen:**
- Badge: "Gesponsord door [Partner]" (top van artikel)
- Disclosure text (einde artikel)
- Link naar partner pagina

**Advertenties:**
- "Advertisement" label (klein, grijs)
- Visueel onderscheid van editorial content

**Partner Pagina:**
- Duidelijk partnership statement
- "Dit is een commerciële partner van interieur.expert"

---

## Metrics & Success

### KPIs per Partner Type

**Premium Partners:**
- Consistent impression share (target: 20-30% van slot)
- Sponsored article engagement
- CTR op ads
- Partnership renewal rate

**Campaign Partners:**
- Campaign reach (total impressions)
- CTR tijdens campaign window
- ROI vs investment

**Overall:**
- Total partners active
- Revenue per partner type
- Content quality (editorial standards maintained)

---

## Conclusie & Next Steps

### Aanbevolen Implementatie:

1. **Vandaag:** Schema updates + basis partner pagina's
2. **Deze week:** Partner overzicht + linking
3. **Next:** Analytics en reporting (als nodig)

### Key Decisions:

✅ **Premium partners** = permanent baseline ads (priority 5-6)
✅ **Campaign partners** = tijdelijk high-priority (7-10)
✅ **Partner profiel pagina's** alleen voor premium + selected campaigns
✅ **Transparantie** = altijd duidelijke labeling

### Business Model:

- **Premium:** €500-2000/maand (afhankelijk van exposure)
- **Campaign:** €300-1000/campagne
- **Sponsored artikel:** €150-500/artikel
- **Affiliate:** Commissie-based (10-15%)

Dit model is **schaalbaar**, **transparant**, en **fair** voor alle partijen.
