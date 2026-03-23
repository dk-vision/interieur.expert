import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CalEmbed from "@/components/ui/CalEmbed";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Plan een gesprek",
  description:
    "Boek een gratis telefoongesprek met het team van interieur.expert. We bespreken graag je vragen over interieuradvies, samenwerking of adverteren.",
  path: "/afspraak",
});

const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "interieur-expert/30min";

export default function AfspraakPage() {
  if (!calLink) {
    return (
      <div>
        <Section spacing="lg">
          <Container size="content">
            <div className="space-y-4 text-center">
              <h1 className="text-h2 lg:text-h1 font-semibold text-text">
                Plan een gesprek
              </h1>
              <p className="text-body-lg text-text/70">
                De agenda wordt binnenkort beschikbaar. Neem in de tussentijd
                contact op via{" "}
                <a
                  href="mailto:studio@interieur.expert"
                  className="text-accent hover:text-text transition-colors font-medium"
                >
                  studio@interieur.expert
                </a>
                .
              </p>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <Section spacing="lg" className="!pb-6">
        <Container size="content">
          <div className="space-y-4 text-center">
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Plan een gesprek
            </h1>
            <p className="text-body-lg text-text/70 max-w-2xl mx-auto">
              Kies een moment dat jou past voor een vrijblijvend telefoongesprek.
              We bespreken graag je vragen over interieuradvies, samenwerking of
              adverteren.
            </p>
          </div>
        </Container>
      </Section>

      {/* Cal.com Embed */}
      <Section spacing="lg">
        <Container size="content">
          <div className="min-h-[600px]">
            <CalEmbed calLink={calLink} />
          </div>
        </Container>
      </Section>

      {/* Alternative contact */}
      <Section spacing="md" background="accent">
        <Container size="content">
          <div className="text-center space-y-4">
            <h2 className="text-h5 font-semibold text-text">
              Liever direct mailen?
            </h2>
            <p className="text-body text-text/70">
              Geen geschikt moment gevonden? Stuur ons een bericht en we nemen
              contact met je op.
            </p>
            <a
              href="mailto:studio@interieur.expert"
              className="inline-block px-6 py-3 bg-accent text-background font-medium rounded-sm hover:bg-text transition-colors"
            >
              Mail ons →
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
