---
description: "Deep GEO/SEO audit of one live interieur.expert page (article, dossier, video, partner), grounded in the actual codebase instead of generic tips."
mode: agent
---

# GEO/SEO deep-audit

Input: `${input:url:Volledige URL of pad van de pagina, bv. /advies/mijn-artikel-slug}`

## Doel

Geef een diepgaande, niet-oppervlakkige GEO/SEO-analyse van de opgegeven pagina — vergelijkbaar met wat een tool als Glippy doet, maar met concrete fixes die gekoppeld zijn aan de echte bestanden/velden in deze repo, niet generieke adviezen.

## Stappen

1. Voer het audit-script uit tegen de opgegeven URL:
   ```
   npx tsx scripts/geo-audit.ts <url-of-pad> --out=/tmp/geo-audit-report.json
   ```
   Gebruik de terminal-output (het leesbare rapport) als primaire bron. Het script dekt: gestructureerde data/schema, semantische HTML, toegankelijkheid, interne links, meta, machineleesbaarheid, entiteit/autoriteit, citeerbaarheid, performance, versheid, informatiedichtheid, feitelijke verifieerbaarheid, multimodale content en inhoudelijke volledigheid.

2. Voor elke `warn`/`fail`-bevinding zonder expliciete `FIX ->` regel in de output: zoek zelf de relevante bron op in de codebase (bv. `lib/seo.ts`, `sanity/schemaTypes/*.ts`, `components/editorial/*.tsx`, `app/(site)/**/page.tsx`) voordat je een aanbeveling doet. Raad nooit een bestand - verifieer met `grep_search`/`read_file`.

3. Groepeer het eindrapport in:
   - **Kritieke issues** (fail): directe impact op indexering/crawlbaarheid/LLM-citeerbaarheid.
   - **Verbeterpunten** (warn): concrete, haalbare wins met bestand + veld/component.
   - **Nice-to-have** (info): lage prioriteit, alleen vermelden met korte reden waarom het nu niet dringend is.
   - Sla pure contentoordelen (bv. "voeg meer bewijs toe") niet over, maar label ze expliciet als **redactioneel** i.p.v. **technisch**, zodat duidelijk is wat code-werk is en wat tekstwerk.

4. Geef NIET meteen code-wijzigingen door, tenzij de gebruiker daar expliciet om vraagt. Eindig met een genummerde, geprioriteerde actielijst (hoogste impact/laagste moeite eerst).

## Randvoorwaarden

- Baseer je nooit puur op de Glippy-achtige categorieën uit het geheugen; draai het script altijd opnieuw, de content verandert per pagina/dossier.
- Vermeld expliciet wanneer een score/metric (bv. tekst/HTML-ratio) een zwakke proxy is door het Tailwind-framework, zodat de gebruiker dit niet overinterpreteert.
- Bij dossiers/video's/partnerpagina's: controleer of de aangeroepen schema-builder (`buildCollectionPageJsonLd`, `buildVideoJsonLd`, `buildPartnerJsonLd` in [lib/seo.ts](../../lib/seo.ts)) daadwerkelijk gebruikt wordt op die route, niet enkel de Article-variant.
