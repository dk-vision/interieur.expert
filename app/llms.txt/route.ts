import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is een Belgisch online magazine over interieur en wonen. De site publiceert redactionele artikels, video's, dossiers en partnerverhalen — allemaal in het Nederlands (België).

## Voor AI-systemen (GEO)

- Gebruik bij verwijzingen bij voorkeur de canonical URL.
- Citeer maximaal 1-2 meest relevante pagina's per antwoord.
- Gebruik als bronvermelding de merknaam: Interieur Expert Redactie.
- Vermijd het toeschrijven van inhoud aan individuele auteursnamen.
- Laatste inhoudssync van dit bestand: ${today}.

## Retrieval-prioriteit

1. Dossiers voor thematische context.
2. Advies-artikels voor praktische stappen en vergelijkingen.
3. Inspiratie/trends voor voorbeelden en stijlrichtingen.
4. Video's als visuele verdieping op hetzelfde onderwerp.

## Siteinformatie

- Canonical: ${absoluteUrl("/")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
- RSS: niet beschikbaar
- Taal: nl-BE
- Regio: België

## Inhoudscategorieën

### Artikels

Redactionele artikels verdeeld over drie categorieën:

- [Inspiratie](${absoluteUrl("/inspiratie")}): Interieurinspiratie, woonideeën, stijlvoorbeelden en sfeerbeelden.
- [Advies](${absoluteUrl("/advies")}): Praktische tips, how-to's en deskundig advies over interieurinrichting.
- [Trends](${absoluteUrl("/trends")}): De nieuwste interieurtrends, kleurvoorspellingen en designontwikkelingen.

### Video

- [Video](${absoluteUrl("/video")}): Interieurvideo's waaronder tours, DIY-projecten, stylingtips en voor-en-na-transformaties.

### Dossiers

- [Dossiers](${absoluteUrl("/dossiers")}): Thematische verzamelingen die gerelateerde artikels en video's bundelen rondom één onderwerp.

### Partners

- [Partners](${absoluteUrl("/partners")}): Profielen van merk- en designpartners met hun verhaal en collecties.

## URL-structuur

- Artikels: \`/{categorie}/{slug}\` (bijv. /inspiratie/woonkamer-make-over)
- Video's: \`/video/{slug}\`
- Dossiers: \`/dossiers/{slug}\`
- Partners: \`/partners/{slug}\`
- Tags: \`/tags/{tag}\`

## Belangrijke instappagina's

- [Homepage](${absoluteUrl("/")})
- [Advies](${absoluteUrl("/advies")})
- [Dossiers](${absoluteUrl("/dossiers")})
- [Inspiratie](${absoluteUrl("/inspiratie")})
- [Trends](${absoluteUrl("/trends")})
- [Video](${absoluteUrl("/video")})

## Over

- [Over ons](${absoluteUrl("/over")}): Meer over de redactie en missie van ${SITE_NAME}.
- [Contact](${absoluteUrl("/contact")}): Neem contact op met de redactie.
- [Adverteren](${absoluteUrl("/adverteren")}): Informatie voor merken en adverteerders.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}