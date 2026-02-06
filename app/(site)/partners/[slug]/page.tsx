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
import { ExternalLink, Instagram, Facebook } from "lucide-react";

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
    title: `${partner.name} | Partner | Interieur.Expert`,
    description: partner.description,
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

  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              {logoUrl && (
                <div
                  className="w-32 h-32 relative flex-shrink-0 bg-white rounded-lg border-2 flex items-center justify-center overflow-hidden"
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
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {partner.name}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {partner.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Bezoek website
                  </a>
                  {partner.socialMedia?.instagram && (
                    <a
                      href={partner.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-gray-300 px-4 py-3 rounded-lg hover:border-gray-400 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {partner.socialMedia?.facebook && (
                    <a
                      href={partner.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-gray-300 px-4 py-3 rounded-lg hover:border-gray-400 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
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
              <h2 className="text-3xl font-bold mb-8">Over {partner.name}</h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={partner.about} />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Showrooms Section */}
      {partner.showrooms && partner.showrooms.length > 0 && (
        <Section className="bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Showrooms</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {partner.showrooms.map((showroom, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="text-xl font-bold mb-3">{showroom.city}</h3>
                    <p className="text-gray-600 mb-2 whitespace-pre-line">
                      {showroom.address}
                    </p>
                    {showroom.phone && (
                      <a
                        href={`tel:${showroom.phone}`}
                        className="text-gray-900 font-medium hover:underline"
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
              <h2 className="text-3xl font-bold mb-8 text-center">
                Gesponsorde Content
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
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
      <Section className="bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Klaar om te ontdekken?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Bezoek de website van {partner.name} voor het volledige aanbod en
              actuele inspiratie.
            </p>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              <ExternalLink className="w-6 h-6" />
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
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Terug naar alle partners
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
