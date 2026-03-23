import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import ConsentManager from "@/components/privacy/ConsentManager";
import { GTM_ID, getSiteUrl, isLiveSite } from "@/lib/site";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  SITE_DESCRIPTION,
} from "@/lib/seo";
import "./(site)/globals.css";

const siteUrl = getSiteUrl();
const liveSite = isLiveSite();

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "interieur.expert — Inspiratie, advies en trends voor je interieur",
    template: "%s | Interieur.Expert",
  },
  ...buildMetadata({
    title: "interieur.expert — Inspiratie, advies en trends voor je interieur",
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

const organizationJsonLd = buildOrganizationJsonLd();
const websiteJsonLd = buildWebsiteJsonLd();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${inter.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {liveSite && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.dataLayer=window.dataLayer||[];" +
                  "function gtag(){dataLayer.push(arguments);}" +
                  "gtag('consent','default',{" +
                  "'analytics_storage':'denied'," +
                  "'ad_storage':'denied'," +
                  "'ad_user_data':'denied'," +
                  "'ad_personalization':'denied'," +
                  "'functionality_storage':'granted'," +
                  "'personalization_storage':'denied'," +
                  "'security_storage':'granted'," +
                  "'wait_for_update':500" +
                  "});",
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <ConsentManager enabled={liveSite} />
      </body>
    </html>
  );
}
