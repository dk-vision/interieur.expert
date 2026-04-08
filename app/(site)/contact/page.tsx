import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContactForm from "@/components/ui/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | interieur.expert",
  description:
    "Neem contact op met interieur.expert voor vragen, samenwerkingen of suggesties.",
  path: "/contact",
});

function CalendarIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  );
}

function MailIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  );
}

function BriefcaseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
}

function ContactCard({
  icon,
  title,
  description,
  action,
  href,
}: ContactCardProps) {
  return (
    <div className="border border-text/10 rounded-sm p-8 space-y-4 hover:border-accent/30 transition-colors">
      <div className="text-accent">{icon}</div>
      <h3 className="text-h6 font-semibold text-text">{title}</h3>
      <p className="text-body text-text/70">{description}</p>
      <a
        href={href}
        className="inline-block text-accent hover:text-text font-medium transition-colors"
      >
        {action} →
      </a>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <Section spacing="lg" className="!pb-6">
        <Container size="content">
          <div className="space-y-6">
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Contact
            </h1>
            <p className="text-body-lg text-text/70">
              We horen graag van je. Of je nu een vraag hebt, feedback wilt geven,
              of interesse hebt in samenwerking—neem gerust contact op.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Options */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<CalendarIcon size={32} />}
              title="Plan een gesprek"
              description="Boek direct een vrijblijvend telefoongesprek. Kies een moment dat jou past."
              action="Kies een moment"
              href="/afspraak"
            />
            <ContactCard
              icon={<MailIcon size={32} />}
              title="Algemene vragen & Redactie"
              description="Heb je vragen over onze content, wil je een verhaal pitchen, je huis laten zien, of materiaal aanleveren voor advertising?"
              action="Mail ons"
              href="mailto:studio@interieur.expert"
            />
            <ContactCard
              icon={<BriefcaseIcon size={32} />}
              title="Samenwerking"
              description="Interesse in samenwerking, sponsored content of adverteren? Bekijk onze mogelijkheden."
              action="Mail het team"
              href="mailto:partnerships@interieur.expert"
            />
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section spacing="lg" background="accent">
        <Container size="content">
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-h4 font-semibold text-text">
                Stuur ons een bericht
              </h2>
              <p className="text-body text-text/70">
                Vul het formulier in en we nemen zo snel mogelijk contact met je op.
              </p>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>

      {/* Additional Info */}
      <Section spacing="md">
        <Container size="content">
          <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-text prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body prose-p:text-text prose-a:text-accent prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-accent prose-a:transition-colors hover:prose-a:text-accent/70 hover:prose-a:border-accent/70">
            <h2>Veelgestelde vragen</h2>

            <h3>Kan ik mijn huis laten zien op interieur.expert?</h3>
            <p>
              Absoluut! We zijn altijd op zoek naar inspirerende interieurs om te
              delen. Mail ons enkele foto&apos;s en een korte beschrijving naar{" "}
              <a href="mailto:studio@interieur.expert">
                studio@interieur.expert
              </a>
              .
            </p>

            <h3>Doen jullie productreviews?</h3>
            <p>
              We schrijven over producten en merken die we zelf gebruiken en
              waarderen. Voor reviews of productplaatsing, neem contact op via{" "}
              <a href="mailto:partnerships@interieur.expert">
                partnerships@interieur.expert
              </a>
              .
            </p>

            <h3>Kan ik een artikel als gast schrijven?</h3>
            <p>
              We staan open voor gastbijdragen van experts. Pitch je idee met een
              korte outline naar{" "}
              <a href="mailto:studio@interieur.expert">
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
