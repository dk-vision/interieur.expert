import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Mail, MessageSquare, Briefcase } from "lucide-react";

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
      <Section spacing="lg">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactCard
              icon={<Mail size={32} />}
              title="Algemene vragen & Redactie"
              description="Heb je vragen over onze content, wil je een verhaal pitchen, je huis laten zien, of materiaal aanleveren voor advertising?"
              action="Mail ons"
              href="mailto:studio@interieur.expert"
            />
            <ContactCard
              icon={<Briefcase size={32} />}
              title="Partnerships"
              description="Interesse in samenwerking, sponsored content of adverteren? Bekijk onze mogelijkheden."
              action="Meer informatie"
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

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-meta font-medium text-text"
                  >
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
                    placeholder="Je naam"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-meta font-medium text-text"
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
                    placeholder="je@email.nl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                    className="block text-meta font-medium text-text"
                >
                  Onderwerp *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
                  placeholder="Waar gaat je bericht over?"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-meta font-medium text-text"
                >
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent resize-none"
                  placeholder="Vertel ons meer..."
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
                >
                  Verstuur bericht
                </button>
                <p className="text-meta text-text/60">
                  We reageren meestal binnen 2 werkdagen
                </p>
              </div>
            </form>
          </div>
        </Container>
      </Section>

      {/* Additional Info */}
      <Section spacing="md">
        <Container size="content">
          <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-text prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body prose-p:text-text">
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
