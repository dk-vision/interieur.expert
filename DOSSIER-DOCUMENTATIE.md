# Dossier Functionaliteit - Documentatie

## Probleem dat is opgelost

Dossiers konden worden aangemaakt in Sanity CMS, maar verschenen nergens op de website. Dit kwam doordat de **frontend pagina's ontbraken**.

## Wat er is toegevoegd

### 1. **Dossier Listing Pagina** (`/app/dossiers/page.tsx`)
   - **URL**: `/dossiers`
   - **Functionaliteit**: Toont alle gepubliceerde dossiers in een grid-layout
   - **Features**:
     - Responsive grid (1 kolom op mobiel, 2 kolommen op desktop)
     - Sidebar met categorieën en advertentieruimte
     - Fallback bericht als er geen dossiers zijn
     - Metadata voor SEO

### 2. **Dossier Detail Pagina** (`/app/dossiers/[slug]/page.tsx`)
   - **URL**: `/dossiers/[slug]` (bijvoorbeeld `/dossiers/verlichting-trends`)
   - **Functionaliteit**: Toont een specifiek dossier met alle details
   - **Onderdelen**:
     - Header met titel, excerpt en metadata
     - Featured image (full-width)
     - Introductie tekst (Portable Text)
     - Overzicht van alle artikelen en video's in het dossier
     - Sidebar met dossier-informatie en advertenties
   - **Features**:
     - SEO metadata met Open Graph
     - 404 handling als dossier niet bestaat
     - Ondersteuning voor zowel artikelen als video's

### 3. **Content Library Updates** (`/lib/content/index.ts`)
   - Toegevoegd: `getDossiers()` functie om alle dossiers op te halen
   - Bestaande functie: `getDossierBySlug()` (was al aanwezig)

### 4. **Navigatie Update** (`/components/layout/SiteHeader.tsx`)
   - "Dossiers" link toegevoegd aan hoofdnavigatie
   - Positie: tussen "Trends" en "Video"

## Hoe werkt het?

### In Sanity CMS
1. Ga naar Sanity Studio (via `/studio`)
2. Klik op "Dossier" in het menu
3. Maak een nieuw dossier aan met:
   - **Title**: Titel van het dossier (bijv. "Verlichting Trends 2026")
   - **Slug**: Automatisch gegenereerd uit de titel
   - **Excerpt**: Korte beschrijving (max 200 karakters)
   - **Featured Image**: Hoofdafbeelding
   - **Intro**: Introductie tekst (rich text editor)
   - **Articles**: Selecteer artikelen en/of video's die bij dit dossier horen
   - **Category**: Kies uit: Verlichting, Duurzaamheid, Wonen, Materialen
   - **Published At**: Publicatiedatum
   - **Featured**: Optioneel, markeer als uitgelicht dossier
   - **SEO velden**: Optionele SEO titel en beschrijving

4. Klik op "Publish"

### Op de Website
1. **Dossiers overzichtspagina**: 
   - Bezoek `/dossiers` om alle dossiers te zien
   - Filter op categorie via de sidebar links
   - Klik op een dossier kaart om details te zien

2. **Dossier detail pagina**:
   - Zie de volledige introductie
   - Bekijk alle artikelen/video's die bij het dossier horen
   - Klik op een artikel om dat te lezen

3. **Navigatie**:
   - Klik op "Dossiers" in het hoofdmenu om naar de overzichtspagina te gaan

## Schema Details

Het dossier schema (in `/sanity/schemaTypes/dossier.ts`) bevat:

```typescript
{
  title: string;           // Titel
  slug: slug;             // URL-vriendelijke naam
  excerpt: text;          // Korte beschrijving (max 200 chars)
  featuredImage: image;   // Hoofdafbeelding
  intro: block[];         // Introductie tekst (Portable Text)
  articles: reference[];  // Referenties naar article & video documenten
  category: string;       // Verlichting, Duurzaamheid, Wonen, Materialen
  publishedAt: datetime;  // Publicatiedatum
  featured: boolean;      // Uitgelicht dossier
  seoTitle: string;       // Optionele SEO titel
  seoDescription: text;   // Optionele SEO beschrijving
}
```

## Best Practices voor Redactie

1. **Goede titels**: Maak titels duidelijk en beschrijvend
   - ✅ "Complete gids: Duurzaam wonen"
   - ❌ "Dossier 1"

2. **Sterke excerpts**: Gebruik de excerpt om de lezer te overtuigen
   - Max 200 karakters
   - Maak duidelijk wat de lezer kan verwachten

3. **Kwalitatieve intro**: De intro is belangrijk voor SEO en gebruikersbetrokkenheid
   - Geef context over het onderwerp
   - Leg uit waarom dit dossier waardevol is
   - 2-4 alinea's is ideaal

4. **Relevante artikelen**: Selecteer alleen artikelen die echt bij het thema horen
   - Minimaal 3-5 artikelen per dossier
   - Mix van artikelen en video's geeft variatie

5. **Featured image**: Kies een sterke, representatieve afbeelding
   - Minimale resolutie: 1600x900px
   - Zorg dat het thema goed weergegeven wordt

6. **Categorieën**: Gebruik categorieën consistent
   - Verlichting: Alles over lampen, spots, sfeerverlichting
   - Duurzaamheid: Circulaire materialen, energie, milieu
   - Wonen: Algemene woontrends en lifestyle
   - Materialen: Specifieke materialen en hun toepassing

## Technische Details

### Query's
De volgende Sanity queries worden gebruikt:
- `dossiersListingQuery`: Haalt alle dossiers op (met optionele category filter)
- `dossierBySlugQuery`: Haalt één specifiek dossier op met alle gerelateerde artikelen

### Type Definities
- `Dossier` interface in `/lib/content/types.ts`
- Bevat alle velden van het schema
- Gebruikt voor type-safety in TypeScript

### Components
- `ContentCard`: Toont dossier kaarten (hergebruikt van artikelen/video's)
- `MetaRow`: Toont metadata (met "dossier" type support)
- `PortableText`: Rendert de intro tekst
- `AdSlot`: Advertentieruimte in sidebar

## Toekomstige Uitbreidingen

Mogelijk interessante features voor later:
1. **Featured dossiers** op homepage
2. **Filtering** op tags (naast categorieën)
3. **Zoekfunctionaliteit** specifiek voor dossiers
4. **Gerelateerde dossiers** op detail pagina
5. **Automatische dossier suggesties** op basis van gelezen artikelen
6. **Statistieken** in Sanity: aantal artikelen, views, etc.

## Troubleshooting

### Dossier verschijnt niet
- ✅ Check of `publishedAt` in het verleden ligt
- ✅ Check of het dossier is gepubliceerd (niet draft)
- ✅ Ververs de pagina of clear de cache

### Artikelen verschijnen niet in dossier
- ✅ Check of de artikelen zelf gepubliceerd zijn
- ✅ Check of de referenties correct zijn opgeslagen

### 404 fout bij detail pagina
- ✅ Check of de slug correct is
- ✅ Check of het dossier gepubliceerd is

## Contact

Bij vragen of problemen, neem contact op met het development team.
