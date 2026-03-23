import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function NotFound() {
  return (
    <div>
      <Section spacing="lg">
        <Container size="content">
          <div className="text-center space-y-6 py-12">
            <p className="text-meta font-semibold uppercase tracking-widest text-accent">
              404
            </p>
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Pagina niet gevonden
            </h1>
            <p className="text-body-lg text-text/70 max-w-lg mx-auto">
              De pagina die je zoekt bestaat niet (meer) of is verplaatst.
              Gebruik de zoekfunctie of ga terug naar de homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/"
                className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
              >
                Naar de homepage
              </Link>
              <Link
                href="/inspiratie"
                className="px-8 py-3 border border-text/20 text-text font-medium rounded-sm hover:border-accent hover:text-accent transition-colors"
              >
                Bekijk inspiratie
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="accent">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-h5 font-semibold text-text">
              Populaire onderwerpen
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {["scandinavisch", "verlichting", "kleuren", "duurzaam", "minimalistisch", "woonkamer", "keuken", "slaapkamer"].map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-flex items-center rounded-full font-medium bg-text/5 text-text/70 hover:bg-text/10 hover:text-text transition-colors text-sm px-4 py-1.5"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
