import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import WhatsAppChat from "@/components/ui/WhatsAppChat";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-text focus:px-4 focus:py-3 focus:text-background"
      >
        Spring naar hoofdinhoud
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <WhatsAppChat />
    </>
  );
}
