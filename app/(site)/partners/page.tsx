import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allPartnersQuery, featuredPartnersQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

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
            <p className="text-body-lg text-gray-600">
              We werken samen met toonaangevende merken en showrooms in België. 
              Ontdek onze partners voor inspiratie, advies en kwaliteitsproducten.
            </p>
          </div>

          {/* Featured Partners */}
          {featuredPartners.length > 0 && (
            <div className="mb-20">
              <h2 className="text-h4 font-bold mb-8 text-center">Featured Partners</h2>
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
              <p className="text-body-lg text-gray-500">Binnenkort vind je hier onze partners.</p>
            </div>
          )}
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
        className="group block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
        style={
          partner.brandColor
            ? {
                borderColor: partner.brandColor + "20",
              }
            : undefined
        }
      >
        <div className="h-40 relative mb-4 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center py-12 px-8">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={partner.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>
        <h3 className="text-h6 font-semibold mb-2 group-hover:text-gray-600 transition-colors">
          {partner.name}
        </h3>
        <p className="text-body-sm text-gray-600 line-clamp-2">{partner.description}</p>
      </a>
    );
  }

  return (
    <a
      href={`/partners/${partner.slug}`}
      className="group block bg-white border-2 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-200"
      style={
        partner.brandColor
          ? {
              borderColor: partner.brandColor,
            }
          : undefined
      }
    >
      <div className="h-64 relative bg-gray-50 flex items-center justify-center py-20 px-16">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={partner.name}
            fill
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-200"
          />
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-meta font-semibold">
            ⭐ Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-h5 font-bold mb-3 group-hover:text-gray-600 transition-colors">
          {partner.name}
        </h3>
        <p className="text-body text-gray-600 mb-4">{partner.description}</p>
        <span className="inline-flex items-center text-meta font-semibold group-hover:gap-2 transition-all">
          Bekijk profiel
          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </a>
  );
}
