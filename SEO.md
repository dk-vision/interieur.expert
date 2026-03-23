# SEO and GEO Audit

Date: 11 March 2026
Scope: live production review of https://interieur.expert

## Executive Summary

interieur.expert has a strong editorial foundation for SEO and AI search: clear topical focus, crawlable category architecture, a working XML sitemap, useful About and Contact pages, and content that is easy for humans and LLMs to extract into answers.

The main blockers are technical, not editorial.

Highest-priority issues found on the live site:

1. robots.txt is missing and returns 404.
2. Canonical tags are missing on sampled pages.
3. Open Graph and Twitter card metadata are missing on sampled pages.
4. No JSON-LD structured data was detected on sampled pages.
5. GEO / AI-search trust signals are only partially present because author entities, publisher schema, llms.txt, and machine-readable expertise signals are missing.

If those are fixed, the site should be in a materially better position for Google Search, Discover-style sharing, and AI answer engines.

## What Was Checked

Live URLs reviewed:

- https://interieur.expert/
- https://interieur.expert/inspiratie
- https://interieur.expert/advies
- https://interieur.expert/video
- https://interieur.expert/inspiratie/duurzaam-wonen-interieurontwerp
- https://interieur.expert/over
- https://interieur.expert/contact
- https://interieur.expert/sitemap.xml
- https://interieur.expert/robots.txt
- https://interieur.expert/llms.txt

Header and metadata checks included:

- indexability and HTTP status
- sitemap availability
- robots.txt availability
- canonical presence
- Open Graph and Twitter metadata presence
- robots meta presence
- JSON-LD presence
- visible GEO / AI-search trust signals

## Live Findings

### Strong Signals Already Present

1. Sitemap exists and is live.
   The live sitemap is available at https://interieur.expert/sitemap.xml and currently exposes 95 URLs.

2. Core pages return 200 OK.
   Homepage, category pages, and video pages return clean 200 responses.

3. Site architecture is coherent.
   The site has a strong topical structure around categories like Inspiratie, Advies, Trends, Video, Dossiers, Partners, and tags.

4. Editorial content is semantically strong.
   Sampled articles use clear H1 and section headings, readable intros, and topic-specific subheadings that are suitable for search snippets and AI extraction.

5. Brand and trust pages exist.
   The About page explains mission, editorial approach, transparency, and values. The Contact page exposes contact paths and FAQ content.

6. Internal topical graph is decent.
   Categories, tags, related content, footer topical links, and partner pages help reinforce thematic relevance.

7. Canonical domain behavior appears to be corrected at the domain layer.
   The primary domain is now interieur.expert, with www and the Vercel domain redirecting to it.

### Critical Technical SEO Issues

1. robots.txt is missing.
   https://interieur.expert/robots.txt returns 404.

Impact:

- weak crawler guidance for search engines
- no explicit sitemap discovery hint via robots.txt
- avoidable trust and crawl-hygiene loss

Recommendation:

- add a proper robots.txt route
- include the sitemap location explicitly

Suggested content:

```txt
User-agent: *
Allow: /

Sitemap: https://interieur.expert/sitemap.xml
```

2. No canonical tags detected on sampled pages.

Observed on live homepage and sampled article page:

- no `<link rel="canonical">`

Impact:

- weaker duplicate-control across category, tag, campaign, and shared URLs
- lower confidence for search engines and AI retrievers on preferred URL version

Recommendation:

- add explicit canonical URLs for all indexable pages

3. No Open Graph or Twitter metadata detected.

Observed missing on sampled pages:

- `og:title`
- `og:description`
- `og:url`
- `twitter:card`

Impact:

- weak social preview quality
- lower click-through performance from shared links
- weaker consistency for LLM and crawler preview extraction

Recommendation:

- define OG and Twitter metadata in page-level metadata generation
- include image, title, description, and canonical URL consistently

4. No JSON-LD structured data detected.

Observed on homepage and sampled article page:

- no `application/ld+json`

Impact:

- poor machine-readable entity understanding
- reduced eligibility for rich results
- weaker publisher/content comprehension for AI search systems

Recommendation:

- add at minimum:
  - Organization or WebSite schema sitewide
  - Article schema on articles
  - VideoObject schema on video pages
  - BreadcrumbList where relevant
  - FAQPage on FAQ-heavy pages where appropriate

### Secondary Technical Issues

1. No robots meta detected on sampled pages.

This is not inherently wrong if pages are indexable by default, but it means there is no explicit page-level policy. That is acceptable, but less controlled.

2. Metadata implementation appears partial.

The site clearly outputs title and description, but sampled live pages did not expose the fuller metadata set expected from a production content site.

3. The homepage and category pages include cookie banner copy in visible HTML.

This is not a direct SEO bug, but it can add noise to page extraction for crawlers and LLM systems if not carefully isolated.

## GEO / AI Search Assessment

### Current GEO Strengths

1. Clear topical expertise.
   The site has a narrow and understandable entity focus: interiors, design, materials, trends, and practical advice.

2. Good answer extraction potential.
   Articles use descriptive headings and concise explanatory paragraphs. This is useful for AI systems that extract quotable or summarizable passages.

3. Transparency messaging exists.
   The About page explains editorial standards and sponsored-content handling, which is positive for trust.

4. Contact and business intent are visible.
   Contact options, partnerships, and editorial framing are all available on-site.

### Current GEO Weaknesses

1. No author entities on sampled content.

Observed on sampled article:

- publication date present
- reading time present
- no visible author byline in extracted content

Impact:

- weaker E-E-A-T signaling
- harder for search engines and AI systems to associate expertise with people

Recommendation:

- add real author names, bios, profile pages, and author schema where possible

2. No machine-readable publisher entity.

Without Organization / WebSite schema, AI and search engines rely only on visible page text to infer the site entity.

Recommendation:

- add Organization schema including name, url, logo, sameAs, and contact or brand references

3. No llms.txt file.

Observed:

- https://interieur.expert/llms.txt returns 404

Impact:

- not a traditional SEO blocker
- but a missed AI-search / LLM-discovery asset

Recommendation:

- publish a concise llms.txt describing the site, editorial scope, key sections, and preferred URLs

4. No explicit citation- or source-signaling pattern.

The content is readable, but AI systems tend to trust pages more when they contain named experts, references, studied claims, or stronger provenance.

Recommendation:

- where suitable, add named sources, expert quotes, or references for factual claims

5. No structured FAQ or how-to markup.

Pages like Contact already contain FAQ content, but it is not machine-readable.

Recommendation:

- apply FAQPage schema carefully where content qualifies

## Prioritized Action Plan

### Priority 0: Immediate

1. Add robots.txt.
2. Add canonical tags on all public pages.
3. Add Open Graph and Twitter metadata.
4. Add baseline Organization and WebSite JSON-LD.

### Priority 1: High Value

1. Add Article schema to article pages.
2. Add VideoObject schema to video pages.
3. Add BreadcrumbList schema to content detail pages.
4. Add author names and author pages.

### Priority 2: GEO / AI Search Improvements

1. Publish llms.txt.
2. Strengthen author and publisher trust signals.
3. Expand About page with explicit editorial ownership, expertise, and review standards.
4. Add machine-readable FAQ where already justified by existing content.

## Suggested GEO Positioning Improvements

To improve AI-search retrieval and answer quality, interieur.expert should make these signals more explicit:

1. Who publishes the content.
   Add a clear publisher entity with logo and sameAs links.

2. Who writes or reviews the content.
   Add named authors, short bios, and expertise areas.

3. Why the site is trustworthy.
   Keep the transparency language, but make it machine-readable too.

4. What the site specializes in.
   Reinforce interiors, materials, lighting, styles, renovation guidance, and practical home advice as core editorial entities.

5. Which URLs matter most.
   Provide llms.txt and strong canonical signals.

## Score Snapshot

This is not a formal tool-generated score. It is a practical directional rating based on the live review.

- Technical SEO readiness: 5.5/10
- Content quality for search: 8/10
- Structured data readiness: 2/10
- GEO / AI-search readiness: 5/10
- Crawl/index hygiene: 5/10

The site is content-strong but metadata-light.

## Most Important Next Steps

If only a few items are implemented next, do these first:

1. Add robots.txt.
2. Add canonical, OG, and Twitter metadata.
3. Add Organization and Article / Video JSON-LD.
4. Add author bylines and author pages.
5. Add llms.txt.

## Evidence Summary

Observed live:

- `https://interieur.expert/sitemap.xml` returns 200 and exposes 95 URLs.
- `https://interieur.expert/robots.txt` returns 404.
- `https://interieur.expert/llms.txt` returns 404.
- Sampled pages expose title and meta description.
- Sampled pages did not expose canonical tags.
- Sampled pages did not expose Open Graph tags.
- Sampled pages did not expose Twitter card metadata.
- Sampled pages did not expose JSON-LD.
- About and Contact pages provide useful human trust signals.
- Sampled article content is well-structured for AI summarization, but lacks visible author entity signals.