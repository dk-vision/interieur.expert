import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { partnerBySlugQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import PortableText from "@/components/editorial/PortableText";
import ContentCard from "@/components/editorial/ContentCard";
import { buildMetadata, buildPartnerJsonLd } from "@/lib/seo";

function ExternalLinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  );
}

interface PartnerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Partner {
  _id: string;
  name: string;
  slug: string;
  description: string;
  about?: any[];
  website: string;
  logo: any;
  brandColor?: string;
  featured: boolean;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
  };
  showrooms?: Array<{
    city: string;
    address: string;
    phone?: string;
  }>;
  sponsoredArticles: any[];
  activeCampaigns: any[];
}

export async function generateMetadata({
  params,
}: PartnerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = await client.fetch<Partner>(partnerBySlugQuery, {
    slug,
  });

  if (!partner) {
    return {
      title: "Partner niet gevonden",
    };
  }

  return {
    ...buildMetadata({
      title: `${partner.name} | Partner`,
      description: partner.description,
      path: `/partners/${partner.slug}`,
      image: partner.logo ? urlForImage(partner.logo).width(1200).height(630).url() : undefined,
    }),
  };
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { slug } = await params;
  const partner = await client.fetch<Partner>(partnerBySlugQuery, {
    slug,
  });

  if (!partner) {
    notFound();
  }

  const logoUrl = partner.logo
    ? urlForImage(partner.logo).width(400).url()
    : null;
  const partnerJsonLd = buildPartnerJsonLd({
    name: partner.name,
    description: partner.description,
    path: `/partners/${partner.slug}`,
    website: partner.website,
    logo: logoUrl,
    socialLinks: [
      partner.socialMedia?.instagram,
      partner.socialMedia?.facebook,
      partner.socialMedia?.pinterest,
    ].filter(Boolean) as string[],
  });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerJsonLd) }}
      />
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-surface to-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              {logoUrl && (
                <div
                  className="w-32 h-32 relative flex-shrink-0 bg-background rounded-sm border-2 flex items-center justify-center overflow-hidden"
                  style={
                    partner.brandColor
                      ? { borderColor: partner.brandColor }
                      : undefined
                  }
                >
                  <Image
                    src={logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                  {partner.featured && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-meta font-semibold">
                      ⭐ Uitgelicht
                    </span>
                  )}
                </div>
                <h1 className="text-h2 lg:text-h1 font-bold mb-4">
                  {partner.name}
                </h1>
                <p className="text-body-lg text-text/65 mb-6">
                  {partner.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-text text-background px-6 py-3 rounded-sm hover:bg-text/85 transition-colors"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                    Bezoek website
                  </a>
                  {partner.socialMedia?.instagram && (
                    <a
                      href={partner.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-text/20 px-4 py-3 rounded-sm hover:border-text/40 transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                  )}
                  {partner.socialMedia?.facebook && (
                    <a
                      href={partner.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-text/20 px-4 py-3 rounded-sm hover:border-text/40 transition-colors"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* About Section */}
      {partner.about && partner.about.length > 0 && (
        <Section>
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-h4 font-bold mb-8">Over {partner.name}</h2>
              <div className="prose max-w-none prose-headings:font-semibold prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body">
                <PortableText value={partner.about} />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Showrooms Section */}
      {partner.showrooms && partner.showrooms.length > 0 && (
        <Section className="bg-surface">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h4 font-bold mb-8 text-center">Showrooms</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {partner.showrooms.map((showroom, index) => (
                  <div
                    key={index}
                    className="bg-background p-6 rounded-sm border border-text/10"
                  >
                    <h3 className="text-h6 font-bold mb-3">{showroom.city}</h3>
                    <p className="text-text/65 mb-2 whitespace-pre-line">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {showroom.address}
                      </a>
                    </p>
                    {showroom.phone && (
                      <a
                        href={`tel:${showroom.phone}`}
                        className="text-text font-medium hover:underline"
                      >
                        {showroom.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Sponsored Articles Section */}
      {partner.sponsoredArticles && partner.sponsoredArticles.length > 0 && (
        <Section>
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-h4 font-bold mb-8 text-center">
                Artikelen in samenwerking
              </h2>
              <p className="text-center text-body text-text/65 mb-12 max-w-2xl mx-auto">
                Ontdek inspirerende artikels in samenwerking met {partner.name}.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partner.sponsoredArticles.map((article) => (
                  <ContentCard
                    key={article._id}
                    title={article.title}
                    excerpt={article.excerpt}
                    href={`/${article.category || 'artikels'}/${article.slug}`}
                    type="article"
                    category={article.category}
                    tags={article.tags}
                    publishedAt={article.publishedAt}
                    readingTime={article.readingTime}
                    isSponsored={article.sponsored}
                    partnerName={article.partner?.name}
                    image={
                      article.featuredImage
                        ? urlForImage(article.featuredImage)
                            .width(600)
                            .height(400)
                            .url()
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-surface to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h4 font-bold mb-6">
              Klaar om te ontdekken?
            </h2>
            <p className="text-body-lg text-text/65 mb-8">
              Bezoek de website van {partner.name} voor het volledige aanbod en
              actuele inspiratie.
            </p>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-text text-background px-8 py-4 rounded-sm text-body-lg font-semibold hover:bg-text/85 transition-colors"
            >
              <ExternalLinkIcon className="w-6 h-6" />
              Bezoek {partner.name}
            </a>
          </div>
        </Container>
      </Section>

      {/* Back Link */}
      <Section>
        <Container>
          <div className="text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-text/65 hover:text-text transition-colors"
            >
              ← Terug naar alle partners
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
