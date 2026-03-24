import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allPartnersQuery, featuredPartnersQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { groq } from "next-sanity";

export const revalidate = 0; // Force dynamic rendering

export const metadata: Metadata = {
  title: "Onze Partners | Interieur.Expert",
  description:
    "Ontdek onze partners in interieur en design. Merken en showrooms voor al uw interieurvragen.",
};

interface Partner {
  _id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  logo: any;
  brandColor?: string;
  featured: boolean;
}

export default async function PartnersPage() {
  // Fetch for full stories data per partner
  const [allPartners, featuredPartners] = await Promise.all([
    client.fetch<Partner[]>(allPartnersQuery),
    client.fetch<Partner[]>(featuredPartnersQuery),
  ]);

  const nonFeaturedPartners = allPartners.filter((p) => !p.featured);

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-h2 lg:text-h1 font-bold mb-6">Onze Partners</h1>
            <p className="text-body-lg text-text/65">
              We werken samen met toonaangevende merken en showrooms in België. 
              Ontdek onze partners voor inspiratie, advies en kwaliteitsproducten.
            </p>
          </div>

          {/* Uitgelichte partners */}
          {featuredPartners.length > 0 && (
            <div className="mb-20">
              <h2 className="text-h4 font-bold mb-8 text-center">Uitgelichte partners</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPartners.map((partner) => (
                  <PartnerCard key={partner._id} partner={partner} featured />
                ))}
              </div>
            </div>
          )}

          {/* All Partners */}
          {nonFeaturedPartners.length > 0 && (
            <div>
              <h2 className="text-h5 font-bold mb-6">Partners</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nonFeaturedPartners.map((partner) => (
                  <PartnerCard key={partner._id} partner={partner} compact />
                ))}
              </div>
            </div>
          )}

          {allPartners.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body-lg text-text/50">Binnenkort vind je hier onze partners.</p>
            </div>
          )}

          {/* Partner worden CTA */}
          <div className="mt-20 border-t border-text/10 pt-16 text-center">
            <h2 className="text-h4 font-semibold text-text mb-3">
              Ook partner worden?
            </h2>
            <p className="text-body-lg text-text/65 max-w-xl mx-auto mb-8">
              Bereik een geëngageerd publiek van interieurliefhebbers en
              professionals. Ontdek onze samenwerkingsmogelijkheden.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/afspraak"
                className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors"
              >
                Plan een gesprek →
              </a>
              <a
                href="/adverteren"
                className="px-8 py-3 border border-text/20 text-text font-medium rounded-sm hover:border-accent hover:text-accent transition-colors"
              >
                Bekijk opties
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function PartnerCard({
  partner,
  featured = false,
  compact = false,
}: {
  partner: Partner;
  featured?: boolean;
  compact?: boolean;
}) {
  const imageUrl = partner.logo ? urlForImage(partner.logo).width(800).url() : null;

  if (compact) {
    return (
      <a
        href={`/partners/${partner.slug}`}
        className="group block bg-background border border-text/10 rounded-sm p-6 hover:shadow-lg transition-all duration-200"
        style={
          partner.brandColor
            ? {
                borderColor: partner.brandColor + "20",
              }
            : undefined
        }
      >
        <div className="h-48 relative mb-4 bg-surface rounded-sm overflow-hidden flex items-center justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={partner.name}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>
        <h3 className="text-h6 font-semibold mb-2 group-hover:text-text/65 transition-colors">
          {partner.name}
        </h3>
        <p className="text-body-sm text-text/65 line-clamp-2">{partner.description}</p>
      </a>
    );
  }

  return (
    <a
      href={`/partners/${partner.slug}`}
      className="group block bg-background border-2 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-200"
      style={
        partner.brandColor
          ? {
              borderColor: partner.brandColor,
            }
          : undefined
      }
    >
      <div className="h-64 relative bg-surface flex items-center justify-center">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={partner.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-200"
          />
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-meta font-semibold">
            ⭐ Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-h5 font-bold mb-3 group-hover:text-text/65 transition-colors">
          {partner.name}
        </h3>
        <p className="text-body text-text/65 mb-4">{partner.description}</p>
        <span className="inline-flex items-center text-meta font-semibold group-hover:gap-2 transition-all">
          Bekijk profiel
          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </a>
  );
}
