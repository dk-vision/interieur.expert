"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { COOKIE_PREFERENCES_EVENT } from "@/lib/site";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

interface ConsentManagerProps {
  enabled: boolean;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateGoogleConsent(
  analyticsAccepted: boolean,
  marketingAccepted: boolean,
) {
  window.gtag?.("consent", "update", {
    analytics_storage: analyticsAccepted ? "granted" : "denied",
    ad_storage: marketingAccepted ? "granted" : "denied",
    ad_user_data: marketingAccepted ? "granted" : "denied",
    ad_personalization: marketingAccepted ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: marketingAccepted ? "granted" : "denied",
    security_storage: "granted",
  });
}

function ensureCookieConsentStyles() {
  if (document.getElementById("cookie-consent-styles")) {
    return;
  }

  const link = document.createElement("link");
  link.id = "cookie-consent-styles";
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3.1.0/dist/cookieconsent.css";

  document.head.appendChild(link);
}

export default function ConsentManager({ enabled }: ConsentManagerProps) {
  const [analyticsAccepted, setAnalyticsAccepted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isActive = true;
    let cookieConsent: typeof import("vanilla-cookieconsent") | null = null;
    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const openPreferences = () => {
      cookieConsent?.showPreferences();
    };

    const initializeConsent = async () => {
      ensureCookieConsentStyles();
      cookieConsent = await import("vanilla-cookieconsent");

      if (!isActive) {
        return;
      }

      const syncConsentState = () => {
        if (!cookieConsent) {
          return;
        }

        const allowAnalytics = cookieConsent.acceptedCategory("analytics");
        const allowMarketing = cookieConsent.acceptedCategory("marketing");

        setAnalyticsAccepted(allowAnalytics);
        updateGoogleConsent(allowAnalytics, allowMarketing);
      };

      await cookieConsent.run({
        mode: "opt-in",
        revision: 1,
        manageScriptTags: false,
        autoClearCookies: true,
        cookie: {
          name: "interieurexpert_cc",
          sameSite: "Lax",
          secure: true,
          expiresAfterDays: 182,
        },
        guiOptions: {
          consentModal: {
            layout: "box wide",
            position: "bottom right",
            equalWeightButtons: true,
          },
          preferencesModal: {
            layout: "box",
            equalWeightButtons: true,
          },
        },
        onFirstConsent: syncConsentState,
        onConsent: syncConsentState,
        onChange: syncConsentState,
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {
            autoClear: {
              cookies: [
                { name: /^_ga/ },
                { name: "_gid" },
                { name: "_gat" },
                { name: /^_vercel/ },
              ],
            },
            services: {
              measurement: {
                label: "Website-analyse via Google Tag Manager en Vercel Analytics",
              },
            },
          },
          marketing: {
            autoClear: {
              cookies: [
                { name: "_gcl_au" },
                { name: "_fbp" },
                { name: "IDE", domain: ".doubleclick.net" },
                { name: "test_cookie", domain: ".doubleclick.net" },
              ],
            },
            services: {
              advertising: {
                label: "Marketing- en advertentietags via Google Tag Manager",
              },
            },
          },
        },
        language: {
          default: "nl",
          translations: {
            nl: {
              consentModal: {
                title: "Cookies op interieur.expert",
                description:
                  "We gebruiken noodzakelijke cookies om de site goed te laten werken. Met jouw toestemming gebruiken we ook analytische en marketingcookies via Google Tag Manager en Vercel Analytics. Je kunt je keuze altijd later aanpassen.",
                acceptAllBtn: "Alles accepteren",
                acceptNecessaryBtn: "Alleen noodzakelijk",
                showPreferencesBtn: "Voorkeuren beheren",
                footer: '<a href="/privacy">Privacy & cookies</a>',
              },
              preferencesModal: {
                title: "Cookievoorkeuren",
                acceptAllBtn: "Alles accepteren",
                acceptNecessaryBtn: "Alleen noodzakelijk",
                savePreferencesBtn: "Voorkeuren opslaan",
                closeIconLabel: "Sluiten",
                serviceCounterLabel: "Dienst|Diensten",
                sections: [
                  {
                    title: "Jouw privacy",
                    description:
                      "Je kiest zelf welke niet-noodzakelijke cookies we mogen gebruiken. Noodzakelijke cookies blijven altijd actief, omdat ze nodig zijn voor de werking van de website.",
                  },
                  {
                    title: "Noodzakelijke cookies",
                    description:
                      "Deze cookies zijn nodig om de website veilig en correct te laten werken en kunnen niet worden uitgeschakeld.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Analytische cookies",
                    description:
                      "Helpen ons begrijpen hoe bezoekers de site gebruiken, zodat we inhoud en prestaties kunnen verbeteren.",
                    linkedCategory: "analytics",
                    cookieTable: {
                      caption: "Analytische cookies",
                      headers: {
                        name: "Cookie",
                        domain: "Domein",
                        desc: "Doel",
                      },
                      body: [
                        {
                          name: "_ga, _gid, _gat",
                          domain: "interieur.expert",
                          desc: "Meten van bezoekersgedrag via Google tags.",
                        },
                        {
                          name: "_vercel_*",
                          domain: "interieur.expert",
                          desc: "Beperkte prestatie- en analysemetering via Vercel.",
                        },
                      ],
                    },
                  },
                  {
                    title: "Marketingcookies",
                    description:
                      "Worden gebruikt om advertentie- en remarketingtags via Google Tag Manager te activeren wanneer je daarvoor toestemming geeft.",
                    linkedCategory: "marketing",
                    cookieTable: {
                      caption: "Marketingcookies",
                      headers: {
                        name: "Cookie",
                        domain: "Domein",
                        desc: "Doel",
                      },
                      body: [
                        {
                          name: "_gcl_au",
                          domain: "interieur.expert",
                          desc: "Meten van advertentieprestaties via Google Ads-tags.",
                        },
                        {
                          name: "IDE, test_cookie",
                          domain: "doubleclick.net",
                          desc: "Ondersteuning voor advertentie- en remarketingfuncties.",
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      });

      syncConsentState();
    };

    const startWhenIdle = () => {
      void initializeConsent();
    };

    let idleCallbackId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof browserWindow.requestIdleCallback === "function") {
      idleCallbackId = browserWindow.requestIdleCallback(startWhenIdle, { timeout: 1500 });
    } else {
      timeoutId = globalThis.setTimeout(startWhenIdle, 600);
    }

    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);

    return () => {
      isActive = false;
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
      if (idleCallbackId !== null && typeof browserWindow.cancelIdleCallback === "function") {
        browserWindow.cancelIdleCallback(idleCallbackId);
      }
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    };
  }, [enabled]);

  if (!enabled || !analyticsAccepted) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}