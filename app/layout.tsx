import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "interieur.expert — Inspiratie, advies en trends voor je interieur",
  description:
    "Ontdek inspiratie, praktisch advies en de laatste trends voor een interieur dat bij je past. Eerlijk, toegankelijk en zonder poespas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={spaceGrotesk.variable}>
      <body suppressHydrationWarning className="bg-background text-text">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
