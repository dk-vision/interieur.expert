/**
 * Shared GEO/SEO audit engine for a single live page (article, dossier, video, partner, ...).
 *
 * Used by both the CLI (scripts/geo-audit.ts) and the admin-only API route
 * (app/api/geo-audit/route.ts) that powers the Sanity Studio "GEO Audit" tool.
 *
 * Unlike a browser extension (e.g. Glippy), this engine runs inside the repo and ties
 * every finding back to the exact source file/field responsible for it.
 */
import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import { getSiteUrl } from "@/lib/site";

export type Status = "pass" | "warn" | "fail" | "info";

export type Check = {
  status: Status;
  label: string;
  detail?: string;
  fix?: string; // concrete file/field pointer when a codebase root cause is known
};

export type Category = {
  id: string;
  title: string;
  weight: number; // 1 = full weight, 0.2 = low weight (emerging/niche)
  checks: Check[];
};

export type AuditResult = {
  url: string;
  pageType: string;
  overall: number;
  categories: Category[];
};

const STATUS_SCORE: Record<Status, number | null> = {
  pass: 100,
  warn: 55,
  fail: 0,
  info: null, // informational only, excluded from scoring
};

export function resolveUrl(input: string): string {
  if (/^https?:\/\//i.test(input)) return input;
  return new URL(input, getSiteUrl()).toString();
}

/** Throws if the resolved URL does not point at our own site - prevents this endpoint being used as an open fetch proxy (SSRF). */
export function assertOwnSiteUrl(url: string): URL {
  const parsed = new URL(url);
  const allowedHost = new URL(getSiteUrl()).host;
  if (parsed.host !== allowedHost) {
    throw new Error(`Alleen pagina's op ${allowedHost} mogen geaudit worden (kreeg: ${parsed.host}).`);
  }
  return parsed;
}

export async function fetchText(url: string): Promise<{ status: number; headers: Headers; body: string }> {
  const res = await fetch(url, {
    headers: { "User-Agent": "interieur.expert-geo-audit/1.0 (+internal)" },
  });
  const body = await res.text();
  return { status: res.status, headers: res.headers, body };
}

export function scoreCategory(cat: Category): number | null {
  const scored = cat.checks.map((c) => STATUS_SCORE[c.status]).filter((s): s is number => s !== null);
  if (scored.length === 0) return null;
  return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function visibleText($: CheerioAPI): string {
  const clone = $.root().clone();
  clone.find("script, style, noscript, template").remove();
  return clone.text().replace(/\s+/g, " ").trim();
}

// --- Category checks -------------------------------------------------------

function checkStructuredData($: CheerioAPI, pageType: string): Category {
  const checks: Check[] = [];
  const blocks = $('script[type="application/ld+json"]')
    .map((_, el) => {
      try {
        return JSON.parse($(el).contents().text());
      } catch {
        return null;
      }
    })
    .get()
    .filter(Boolean);

  const types = blocks.map((b) => b["@type"]).filter(Boolean);
  checks.push({
    status: blocks.length > 0 ? "pass" : "fail",
    label: `JSON-LD blokken gevonden: ${blocks.length}`,
    detail: types.length ? `Types: ${types.join(", ")}` : undefined,
  });

  const article = blocks.find((b) => b["@type"] === "Article");
  if (article) {
    const missing: string[] = [];
    if (!article.dateModified || article.dateModified === article.datePublished) {
      missing.push("dateModified (valt terug op datePublished - controleer of _updatedAt wordt doorgegeven)");
    }
    checks.push({
      status: missing.length ? "warn" : "pass",
      label: missing.length
        ? `Article-schema: ${missing.length} verbeterpunt(en)`
        : "Article-schema compleet",
      detail: missing.join("; ") || undefined,
      fix: missing.length
        ? "app/(site)/[category]/[slug]/page.tsx: geef article._updatedAt door als modifiedAt aan buildArticleJsonLd() in lib/seo.ts."
        : undefined,
    });
  }

  const faq = blocks.find((b) => b["@type"] === "FAQPage");
  checks.push({
    status: faq ? "pass" : "info",
    label: faq ? `FAQPage-schema met ${faq.mainEntity?.length ?? 0} vraag/antwoord` : "Geen FAQPage-schema",
  });

  const breadcrumb = blocks.find((b) => b["@type"] === "BreadcrumbList");
  const visibleBreadcrumbNav = $('nav[aria-label*="rood" i], nav[aria-label*="breadcrumb" i], [itemtype*="BreadcrumbList"]').length > 0;
  if (breadcrumb && !visibleBreadcrumbNav) {
    const routeHint =
      pageType === "article"
        ? "app/(site)/[category]/[slug]/page.tsx"
        : pageType === "dossier"
        ? "app/(site)/dossiers/[slug]/page.tsx"
        : pageType === "video"
        ? "app/(site)/video/[slug]/page.tsx"
        : "de route die deze pagina rendert (zie app/(site)/**)";
    checks.push({
      status: "warn",
      label: "BreadcrumbList-schema aanwezig, maar geen zichtbare broodkruimel-nav in de HTML",
      detail: "LLMs/gebruikers zien geen navigeerbaar broodkruimelpad, alleen machines die JSON-LD parsen.",
      fix: `${routeHint}: voeg <Breadcrumbs items={...} /> (components/editorial/Breadcrumbs.tsx) toe die overeenkomt met de BreadcrumbList-JSON-LD.`,
    });
  } else if (breadcrumb) {
    checks.push({ status: "pass", label: "Broodkruimel: schema + zichtbare nav aanwezig" });
  }

  const org = blocks.find((b) => b["@type"] === "Organization");
  if (org) {
    const missing = ["contactPoint", "address"].filter((f) => !org[f]);
    checks.push({
      status: missing.length ? "info" : "pass",
      label: missing.length ? `Organization mist: ${missing.join(", ")}` : "Organization-schema compleet",
      fix: missing.length ? "lib/seo.ts (buildOrganizationJsonLd)" : undefined,
    });
  }

  checks.push({
    status: "info",
    label: "Geen Speakable-schema",
    detail: "Optioneel voor voice/LLM-samenvattingen, lage prioriteit.",
  });

  return { id: "structured-data", title: "Gestructureerde data & Schema", weight: 1, checks };
}

function checkSemanticHtml($: CheerioAPI): Category {
  const checks: Check[] = [];
  const h1 = $("h1");
  checks.push({
    status: h1.length === 1 ? "pass" : h1.length === 0 ? "fail" : "warn",
    label: `H1-tags: ${h1.length}`,
    detail: h1.length === 1 ? h1.first().text().trim() : undefined,
  });

  const headings = $("h1, h2, h3, h4, h5, h6")
    .map((_, el) => Number(el.tagName.slice(1)))
    .get();
  let skipped = false;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i - 1] > 1) skipped = true;
  }
  checks.push({
    status: skipped ? "warn" : "pass",
    label: `Kophiërarchie (${headings.length} koppen)`,
    detail: skipped ? "Er worden niveaus overgeslagen (bv. h2 -> h4)." : "Geen overgeslagen niveaus.",
  });

  const tagCounts = ["main", "article", "section", "nav", "header", "footer", "time"].map((tag) => ({
    tag,
    count: $(tag).length,
  }));
  checks.push({
    status: tagCounts.filter((t) => t.count > 0).length >= 5 ? "pass" : "warn",
    label: `Semantische tags: ${tagCounts.filter((t) => t.count > 0).length}/7 types`,
    detail: tagCounts.map((t) => `<${t.tag}>: ${t.count}`).join(", "),
  });

  const main = $("main");
  checks.push({
    status: main.length === 1 ? "pass" : "warn",
    label: `<main>-elementen: ${main.length}`,
  });

  const timeEls = $("time");
  checks.push({
    status: timeEls.length > 0 ? "pass" : "warn",
    label: `<time>-elementen: ${timeEls.length}`,
    detail: timeEls.length === 0 ? "Datums zouden in <time datetime=...> moeten staan voor machineleesbaarheid." : undefined,
  });

  const text = visibleText($);
  const bodyHtmlLen = ($("body").html() || "").length;
  const ratio = bodyHtmlLen > 0 ? Math.round((text.length / bodyHtmlLen) * 100) : 0;
  checks.push({
    status: ratio >= 8 ? "pass" : ratio >= 4 ? "warn" : "fail",
    label: `Tekst/HTML-verhouding: ${ratio}%`,
    detail: "Lage waarden zijn verwacht bij utility-class-zware frameworks (Tailwind); vooral bruikbaar om pagina's onderling te vergelijken, niet als absolute drempel.",
  });

  const words = wordCount(text);
  checks.push({
    status: words >= 300 ? "pass" : words >= 150 ? "warn" : "fail",
    label: `Woordenaantal (zichtbare tekst): ${words}`,
  });

  return { id: "semantic-html", title: "Semantische HTML", weight: 1, checks };
}

function checkAccessibility($: CheerioAPI): Category {
  const checks: Check[] = [];
  const lang = $("html").attr("lang");
  checks.push({
    status: lang ? "pass" : "fail",
    label: lang ? `Taal gedeclareerd: "${lang}"` : "Geen lang-attribuut",
  });

  const skipLink = $('a[href="#main-content"], a[href^="#main"]');
  checks.push({
    status: skipLink.length > 0 ? "pass" : "warn",
    label: skipLink.length > 0 ? "Skip-to-content-link gevonden" : "Geen skip-to-content-link",
  });

  const images = $("img");
  const total = images.length;
  let missingAlt = 0;
  let genericAlt = 0;
  const genericPatterns = [/^article image$/i, /^image$/i, /^foto$/i];
  images.each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined) missingAlt++;
    else if (alt.trim() !== "" && genericPatterns.some((p) => p.test(alt.trim()))) genericAlt++;
  });
  checks.push({
    status: missingAlt === 0 ? "pass" : "fail",
    label: `${total - missingAlt}/${total} afbeeldingen hebben een alt-attribuut`,
  });
  checks.push({
    status: genericAlt === 0 ? "pass" : "warn",
    label: genericAlt === 0 ? "Geen generieke alt-tekst gevonden" : `${genericAlt} afbeelding(en) met generieke alt-tekst`,
    fix: genericAlt > 0 ? "Vul een beschrijvende alt-tekst in op het Sanity-afbeeldingsveld voor deze pagina." : undefined,
  });

  const vagueAnchors = $("a")
    .filter((_, el) => {
      const t = $(el).text().trim().toLowerCase();
      return ["klik hier", "lees meer", "hier", "link", "meer info"].includes(t);
    })
    .map((_, el) => $(el).text().trim())
    .get();
  checks.push({
    status: vagueAnchors.length === 0 ? "pass" : "warn",
    label: vagueAnchors.length === 0 ? "Alle links hebben beschrijvende ankertekst" : `${vagueAnchors.length} link(s) met vage ankertekst`,
    detail: vagueAnchors.length ? vagueAnchors.slice(0, 5).join(", ") : undefined,
  });

  return { id: "accessibility", title: "Toegankelijkheid voor agents", weight: 1, checks };
}

function checkInternalLinking($: CheerioAPI, pageUrl: string): Category {
  const checks: Check[] = [];
  const host = new URL(pageUrl).host;
  const links = $("a[href]");
  let internal = 0;
  let external = 0;
  links.each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    try {
      const u = new URL(href, pageUrl);
      if (u.host === host) internal++;
      else external++;
    } catch {
      internal++;
    }
  });
  checks.push({ status: internal >= 10 ? "pass" : "warn", label: `Interne links: ${internal}` });
  checks.push({
    status: external > 0 ? "pass" : "info",
    label: `Externe links: ${external}`,
    detail: external === 0 ? "Links naar gezaghebbende externe bronnen versterken geloofwaardigheid voor LLM-citaties." : undefined,
  });

  const navCount = $("nav").length;
  checks.push({ status: navCount > 0 ? "pass" : "warn", label: `Navigatie-elementen: ${navCount}` });

  const anchorLinks = $('a[href^="#"]').length;
  checks.push({
    status: anchorLinks > 0 ? "pass" : "info",
    label: `In-pagina ankerlinks: ${anchorLinks}`,
    detail: anchorLinks === 0 ? "Overweeg een inhoudsopgave met ankerlinks naar koppen voor diepe LLM-citaten." : undefined,
  });

  return { id: "internal-linking", title: "Interne links", weight: 1, checks };
}

function checkMeta($: CheerioAPI): Category {
  const checks: Check[] = [];
  const title = $("title").text().trim();
  checks.push({
    status: title.length >= 30 && title.length <= 60 ? "pass" : "warn",
    label: `Title-tag: ${title.length} tekens`,
    detail: title,
    fix:
      title.length > 60
        ? "sanity/schemaTypes/article.ts bevat al een waarschuwing bij >60 tekens; pas de titel/seoTitle van dit document aan in Sanity Studio."
        : undefined,
  });

  const description = $('meta[name="description"]').attr("content") || "";
  checks.push({
    status: description.length >= 70 && description.length <= 160 ? "pass" : "warn",
    label: `Meta description: ${description.length} tekens`,
    detail: description,
  });

  const canonical = $('link[rel="canonical"]').attr("href");
  checks.push({ status: canonical ? "pass" : "fail", label: canonical ? "Canonical URL ingesteld" : "Geen canonical URL", detail: canonical });

  const ogTags = $('meta[property^="og:"]').length;
  checks.push({ status: ogTags >= 5 ? "pass" : "warn", label: `Open Graph-tags: ${ogTags}` });

  const twitterTags = $('meta[name^="twitter:"]').length;
  checks.push({ status: twitterTags >= 3 ? "pass" : "warn", label: `Twitter Card-tags: ${twitterTags}` });

  const hreflang = $('link[rel="alternate"][hreflang]').length;
  checks.push({ status: hreflang > 0 ? "pass" : "info", label: `Hreflang-tags: ${hreflang}` });

  const viewport = $('meta[name="viewport"]').attr("content");
  checks.push({ status: viewport ? "pass" : "fail", label: viewport ? "Viewport-tag ingesteld" : "Geen viewport-tag" });

  return { id: "meta", title: "Meta & Vindbaarheid", weight: 1, checks };
}

async function checkMachineReadability($: CheerioAPI, pageUrl: string): Promise<Category> {
  const checks: Check[] = [];
  const robotsMeta = $('meta[name="robots"]').attr("content") || "index, follow";
  checks.push({ status: /noindex/i.test(robotsMeta) ? "fail" : "pass", label: `Robots-meta: "${robotsMeta}"` });

  const text = visibleText($);
  checks.push({
    status: text.length > 500 ? "pass" : "fail",
    label: `Substantiële content in HTML (${text.length} tekens)`,
    detail: "Next.js App Router server-rendert dit standaard; een lage waarde wijst op een client-only render.",
  });

  const site = new URL(pageUrl);
  try {
    const robots = await fetchText(`${site.protocol}//${site.host}/robots.txt`);
    const blocksAiBots = /(gptbot|claudebot|google-extended|ccbot|perplexitybot)/i.test(robots.body) &&
      /disallow:\s*\/\s*$/im.test(robots.body);
    checks.push({
      status: robots.status === 200 ? "pass" : "fail",
      label: `robots.txt bereikbaar (${robots.status})`,
    });
    checks.push({ status: blocksAiBots ? "fail" : "pass", label: blocksAiBots ? "AI-crawlers worden geblokkeerd in robots.txt" : "Geen AI-botblokkering in robots.txt" });
    const hasSitemap = /sitemap:/i.test(robots.body);
    checks.push({ status: hasSitemap ? "pass" : "warn", label: hasSitemap ? "Sitemap vermeld in robots.txt" : "Geen sitemap-referentie in robots.txt" });
  } catch {
    checks.push({ status: "info", label: "robots.txt kon niet opgehaald worden" });
  }

  try {
    const llms = await fetchText(`${site.protocol}//${site.host}/llms.txt`);
    checks.push({
      status: llms.status === 200 ? "pass" : "info",
      label: llms.status === 200 ? `llms.txt bestaat (${llms.body.length} bytes)` : "Geen llms.txt",
    });
  } catch {
    checks.push({ status: "info", label: "llms.txt kon niet opgehaald worden" });
  }

  return { id: "machine-readability", title: "Machineleesbaarheid", weight: 1, checks };
}

function checkEntityAuthority($: CheerioAPI): Category {
  const checks: Check[] = [];
  const jsonLd = $('script[type="application/ld+json"]')
    .map((_, el) => {
      try {
        return JSON.parse($(el).contents().text());
      } catch {
        return null;
      }
    })
    .get()
    .filter(Boolean);
  const article = jsonLd.find((b) => b["@type"] === "Article");

  if (article) {
    checks.push({
      status: article.author?.name ? "pass" : "fail",
      label: article.author?.name ? `Auteur gevonden: ${article.author.name}` : "Geen auteur in schema",
    });
    checks.push({
      status: "info",
      label: "Auteur is een vaste string, geen Person-entiteit",
      detail: "Elk artikel gebruikt dezelfde generieke 'Interieur Expert Redactie' zonder sameAs/bio.",
      fix: "lib/content/authors.ts + sanity/schemaTypes/article.ts ('author' is een plain string field, geen reference naar een author-document met bio/credentials/sameAs). Vereist een contentbeslissing, geen pure technische fix.",
    });

    const published = article.datePublished ? new Date(article.datePublished) : null;
    const modified = article.dateModified ? new Date(article.dateModified) : null;
    const sameDate = published && modified && published.getTime() === modified.getTime();
    checks.push({
      status: published ? "pass" : "fail",
      label: published ? "Publicatiedatum aanwezig" : "Geen publicatiedatum",
    });
    checks.push({
      status: sameDate ? "info" : "pass",
      label: sameDate
        ? "dateModified == datePublished (nog geen edit sinds publicatie, of modifiedAt niet doorgegeven)"
        : "dateModified wijkt af van datePublished",
    });
  }

  const legalLinks = $('a[href*="/privacy"], a[href*="/voorwaarden"], a[href*="/over"]');
  checks.push({
    status: legalLinks.length > 0 ? "pass" : "warn",
    label: `Juridische/about-links gevonden: ${legalLinks.length}`,
  });

  return { id: "entity-authority", title: "Entiteit & Autoriteit", weight: 1, checks };
}

function checkCitability($: CheerioAPI): Category {
  const checks: Check[] = [];
  const faqSchema = $('script[type="application/ld+json"]')
    .map((_, el) => {
      try {
        return JSON.parse($(el).contents().text());
      } catch {
        return null;
      }
    })
    .get()
    .find((b) => b?.["@type"] === "FAQPage");
  checks.push({ status: faqSchema ? "pass" : "info", label: faqSchema ? "FAQ-content gedetecteerd" : "Geen FAQ-content" });

  const lists = $("ul, ol").length;
  checks.push({ status: lists >= 2 ? "pass" : "info", label: `Content-lijsten: ${lists}` });

  const tables = $("table").length;
  checks.push({
    status: tables > 0 ? "pass" : "info",
    label: tables > 0 ? `Datatabellen: ${tables}` : "Geen datatabellen",
    detail: tables === 0 ? "Tabellen zijn uitstekend voor gestructureerde data-extractie door LLM's." : undefined,
  });

  const main = $("main").first();
  const firstP = main.find("p").first().text().trim();
  checks.push({
    status: firstP.length >= 50 && firstP.length <= 300 ? "pass" : "warn",
    label: `Inleidende alinea: ${firstP.length} tekens`,
    detail: firstP.length === 0 ? "Geen alinea direct onder de H1 gevonden." : undefined,
  });

  const headingIds = $("h2[id], h3[id]").length;
  const totalHeadings = $("h2, h3").length;
  checks.push({
    status: totalHeadings > 0 && headingIds === totalHeadings ? "pass" : "info",
    label: `Koppen met id-attribuut (deep links): ${headingIds}/${totalHeadings}`,
  });

  return { id: "citability", title: "Citeerbaarheid & Antwoordgereedheid", weight: 1, checks };
}

function checkPerformance($: CheerioAPI): Category {
  const checks: Check[] = [];
  const images = $("img");
  let missingDims = 0;
  let missingLazy = 0;
  images.each((i, el) => {
    const $el = $(el);
    if (!$el.attr("width") || !$el.attr("height")) missingDims++;
    if (i > 0 && $el.attr("loading") !== "lazy" && $el.attr("fetchpriority") !== "high") missingLazy++;
  });
  checks.push({
    status: missingDims === 0 ? "pass" : "warn",
    label: missingDims === 0 ? "Alle afbeeldingen hebben width/height" : `${missingDims} afbeelding(en) zonder width/height`,
  });
  checks.push({
    status: missingLazy === 0 ? "pass" : "warn",
    label: missingLazy === 0 ? "Lazy loading correct toegepast" : `${missingLazy} afbeelding(en) mogelijk zonder lazy loading`,
    detail: "next/image zet dit automatisch tenzij 'priority' - controleer of niet-hero afbeeldingen per ongeluk priority meekrijgen.",
  });

  const blockingScripts = $("head script[src]")
    .filter((_, el) => !$(el).attr("async") && !$(el).attr("defer") && $(el).attr("type") !== "module")
    .length;
  checks.push({
    status: blockingScripts === 0 ? "pass" : "info",
    label: blockingScripts === 0 ? "Geen render-blokkerende scripts in <head>" : `${blockingScripts} script(s) in <head> zonder async/defer`,
    detail: "Next.js chunks krijgen doorgaans automatisch module/defer-gedrag; controleer of dit externe (bv. GTM) scripts betreft.",
  });

  const domSize = $("*").length;
  checks.push({ status: domSize < 1500 ? "pass" : "warn", label: `DOM-grootte: ${domSize} elementen` });

  return { id: "performance", title: "Prestaties & Crawlbaarheid", weight: 1, checks };
}

function checkFreshness($: CheerioAPI): Category {
  const checks: Check[] = [];
  const jsonLd = $('script[type="application/ld+json"]')
    .map((_, el) => {
      try {
        return JSON.parse($(el).contents().text());
      } catch {
        return null;
      }
    })
    .get()
    .find((b) => b?.["@type"] === "Article");

  if (jsonLd?.datePublished) {
    const published = new Date(jsonLd.datePublished);
    const ageDays = Math.round((Date.now() - published.getTime()) / 86_400_000);
    checks.push({ status: "pass", label: `Publicatiedatum machineleesbaar (${ageDays} dagen geleden)` });
  } else {
    checks.push({ status: "fail", label: "Geen machineleesbare publicatiedatum" });
  }

  const footerYear = $("footer").text().match(/20\d{2}/);
  const currentYear = new Date().getFullYear();
  checks.push({
    status: footerYear && Number(footerYear[0]) >= currentYear - 1 ? "pass" : "info",
    label: footerYear ? `Copyrightjaar in footer: ${footerYear[0]}` : "Geen copyrightjaar in footer gevonden",
  });

  return { id: "freshness", title: "Contentversheid", weight: 1, checks };
}

function checkInformationDensity($: CheerioAPI): Category {
  const checks: Check[] = [];
  const main = $("main").first();
  const mainText = main.text().replace(/\s+/g, " ").trim();
  const bodyText = visibleText($);
  const ratio = bodyText.length > 0 ? Math.round((mainText.length / bodyText.length) * 100) : 0;
  checks.push({
    status: ratio >= 40 ? "pass" : ratio >= 20 ? "warn" : "fail",
    label: `Hoofdcontent-ratio: ${ratio}% van alle paginatekst`,
    detail: ratio < 40 ? "Groot deel van de tekst is nav/footer/boilerplate i.p.v. het artikel zelf." : undefined,
  });

  const sections = main.find("h2").length;
  const sectionWords = sections > 0 ? Math.round(wordCount(mainText) / Math.max(sections, 1)) : 0;
  checks.push({
    status: sectionWords >= 100 ? "pass" : "warn",
    label: `Gemiddeld ${sectionWords} woorden per H2-sectie`,
    detail: sectionWords < 100 ? "Secties onder de ~100-150 woorden zijn vaak te dun om zelfstandig te citeren." : undefined,
  });

  return { id: "information-density", title: "Informatiedichtheid", weight: 1, checks };
}

function checkFactualVerifiability($: CheerioAPI, pageUrl: string): Category {
  const checks: Check[] = [];
  const host = new URL(pageUrl).host;
  const externalLinks = $("a[href^='http']").filter((_, el) => {
    try {
      return new URL($(el).attr("href")!).host !== host;
    } catch {
      return false;
    }
  });
  checks.push({
    status: externalLinks.length > 0 ? "pass" : "fail",
    label: externalLinks.length > 0 ? `${externalLinks.length} externe citatielink(s)` : "Geen externe citatielinks",
    detail: externalLinks.length === 0 ? "Verwijs naar bronnen (fabrikanten, normen, .gov/.edu) om claims te onderbouwen." : undefined,
  });

  const cite = $("cite, [cite]").length;
  checks.push({ status: cite > 0 ? "pass" : "info", label: cite > 0 ? `${cite} semantisch citatie-element(en)` : "Geen <cite>-elementen" });

  return { id: "factual-verifiability", title: "Feitelijke verifieerbaarheid", weight: 1, checks };
}

function checkMultimodal($: CheerioAPI): Category {
  const checks: Check[] = [];
  const images = $("img");
  let descriptive = 0;
  images.each((_, el) => {
    const alt = ($(el).attr("alt") || "").trim();
    if (alt.length > 10 && !/^(article image|image|foto)$/i.test(alt)) descriptive++;
  });
  const pct = images.length > 0 ? Math.round((descriptive / images.length) * 100) : 0;
  checks.push({
    status: pct >= 80 ? "pass" : pct >= 40 ? "warn" : "fail",
    label: `${pct}% van de afbeeldingen heeft beschrijvende alt-tekst`,
  });

  const figures = $("figure").length;
  checks.push({
    status: figures > 0 ? "pass" : "info",
    label: figures > 0 ? `${figures} <figure>-element(en)` : "Geen <figure>/<figcaption>-gebruik",
  });

  const videoSchema = $('script[type="application/ld+json"]')
    .map((_, el) => {
      try {
        return JSON.parse($(el).contents().text());
      } catch {
        return null;
      }
    })
    .get()
    .some((b) => b?.["@type"] === "VideoObject" || b?.["@type"] === "ImageObject");
  checks.push({ status: videoSchema ? "pass" : "info", label: videoSchema ? "Media-schema (VideoObject/ImageObject) gevonden" : "Geen media-schema" });

  return { id: "multimodal", title: "Multimodale content", weight: 1, checks };
}

function checkComprehensiveness($: CheerioAPI, pageType: string): Category {
  const checks: Check[] = [];
  const mainClone = $("main").first().clone();
  mainClone.find("script, style, noscript, template").remove();
  const text = mainClone.text().replace(/\s+/g, " ").trim() || visibleText($);
  const words = wordCount(text);
  const expectedMin = pageType === "article" ? 900 : pageType === "dossier" ? 600 : 300;
  checks.push({
    status: words >= expectedMin ? "pass" : words >= expectedMin * 0.6 ? "warn" : "fail",
    label: `${words} woorden (richtlijn ${pageType}: >= ${expectedMin})`,
  });

  const h2count = $("h2").length;
  const expectedH2 = Math.max(2, Math.round(words / 300));
  checks.push({
    status: h2count >= expectedH2 * 0.6 ? "pass" : "warn",
    label: `${h2count} H2-koppen (richtlijn: ~${expectedH2} voor ${words} woorden)`,
  });

  const comparisons = /\bvs\.?\b|vergelijk|verschil tussen/i.test(text);
  checks.push({ status: comparisons ? "pass" : "info", label: comparisons ? "Vergelijkende content gevonden" : "Geen vergelijkende content gevonden" });

  return { id: "comprehensiveness", title: "Inhoudelijke volledigheid", weight: 1, checks };
}

export function detectPageType(url: string): string {
  if (/\/dossiers\//.test(url)) return "dossier";
  if (/\/video\//.test(url)) return "video";
  if (/\/partners\//.test(url)) return "partner";
  if (/\/(advies|inspiratie|trends)\//.test(url)) return "article";
  return "page";
}

export async function runAudit(rawUrl: string): Promise<AuditResult> {
  const url = resolveUrl(rawUrl);
  const pageType = detectPageType(url);
  const { status, body } = await fetchText(url);
  if (status >= 400) {
    throw new Error(`Kon pagina niet ophalen (HTTP ${status}): ${url}`);
  }

  const $ = cheerio.load(body);

  const categories: Category[] = [
    checkStructuredData($, pageType),
    checkSemanticHtml($),
    checkAccessibility($),
    checkInternalLinking($, url),
    checkMeta($),
    await checkMachineReadability($, url),
    checkEntityAuthority($),
    checkCitability($),
    checkPerformance($),
    checkFreshness($),
    checkInformationDensity($),
    checkFactualVerifiability($, url),
    checkMultimodal($),
    checkComprehensiveness($, pageType),
  ];

  const scored = categories.map((c) => ({ c, score: scoreCategory(c) })).filter((x) => x.score !== null) as {
    c: Category;
    score: number;
  }[];
  const weightedTotal = scored.reduce((sum, x) => sum + x.score * x.c.weight, 0);
  const weightTotal = scored.reduce((sum, x) => sum + x.c.weight, 0);
  const overall = weightTotal > 0 ? Math.round(weightedTotal / weightTotal) : 0;

  return { url, pageType, overall, categories };
}
