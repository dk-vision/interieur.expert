const FALLBACK_SITE_URL = "https://interieurexpert.vercel.app";

function normalizeSiteUrl(siteUrl: string) {
  const trimmedUrl = siteUrl.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
}

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    return normalizeSiteUrl(configuredSiteUrl);
  }

  const vercelUrl =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      : process.env.VERCEL_URL;

  if (vercelUrl) {
    return normalizeSiteUrl(vercelUrl);
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3100";
  }

  return FALLBACK_SITE_URL;
}

export function isLiveSite() {
  return process.env.VERCEL_ENV === "production";
}

export const GTM_ID = "GTM-PT55BKGF";
export const COOKIE_PREFERENCES_EVENT = "cookie-consent:preferences";