import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Privacy & cookies | interieur.expert",
  description:
    "Lees hoe interieur.expert omgaat met privacy, analytische cookies, marketingcookies en cookievoorkeuren.",
};

export default function PrivacyPage() {
  return (
    <div>
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-6">
            <p className="text-meta font-medium uppercase tracking-wide text-accent">
              Privacy & cookies
            </p>
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Privacy- en cookiebeleid
            </h1>
            <p className="text-body-lg text-text/70">
              interieur.expert gebruikt alleen niet-noodzakelijke cookies nadat je daar
              toestemming voor geeft. Op deze pagina leggen we uit welke categorieën we
              gebruiken en waarvoor ze dienen.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="content">
          <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-text prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body prose-p:text-text prose-li:text-body prose-li:text-text prose-a:text-accent prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-accent prose-a:transition-colors hover:prose-a:text-accent/70 hover:prose-a:border-accent/70">
            <h2>Noodzakelijke cookies</h2>
            <p>
              Deze cookies zijn nodig om de website veilig en technisch correct te laten
              werken. Ze ondersteunen bijvoorbeeld basisfunctionaliteit, beveiliging en het
              onthouden van je cookiekeuze.
            </p>

            <h2>Analytische cookies</h2>
            <p>
              Met jouw toestemming gebruiken we analytische metingen via Google Tag Manager
              en Vercel Analytics om te begrijpen welke pagina&apos;s goed werken en waar we de
              site kunnen verbeteren.
            </p>

            <h2>Marketingcookies</h2>
            <p>
              Met aparte toestemming kunnen via Google Tag Manager marketing- of
              advertentietags worden geactiveerd, bijvoorbeeld voor remarketing of het meten
              van campagneprestaties.
            </p>

            <h2>Toestemming aanpassen</h2>
            <p>
              Je kunt je cookievoorkeuren op elk moment opnieuw openen via de link
              &quot;Cookie-instellingen&quot; in de footer.
            </p>

            <h2>Contact</h2>
            <p>
              Vragen over privacy of cookies kun je sturen naar
              <a href="mailto:studio@interieur.expert"> studio@interieur.expert</a>.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}