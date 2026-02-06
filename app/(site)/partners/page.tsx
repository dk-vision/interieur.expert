import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allPartnersQuery, featuredPartnersQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Onze Partners</h1>
            <p className="text-xl text-gray-600">
              We werken samen met toonaangevende merken en showrooms in België. 
              Ontdek onze partners voor inspiratie, advies en kwaliteitsproducten.
            </p>
          </div>

          {/* Featured Partners */}
          {featuredPartners.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Partners</h2>
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
              <h2 className="text-2xl font-bold mb-6">Alle Partners</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nonFeaturedPartners.map((partner) => (
                  <PartnerCard key={partner._id} partner={partner} compact />
                ))}
              </div>
            </div>
          )}

          {allPartners.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Binnenkort vind je hier onze partners.</p>
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
  const imageUrl = partner.logo ? urlForImage(partner.logo).width(400).height(400).url() : null;

  if (compact) {
    return (
      <Link
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
        <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={partner.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
          {partner.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{partner.description}</p>
      </Link>
    );
  }

  return (
    <Link
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
      <div className="aspect-video relative bg-gray-50">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={partner.name}
            fill
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-200"
          />
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
          {partner.name}
        </h3>
        <p className="text-gray-600 mb-4">{partner.description}</p>
        <span className="inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
          Bekijk profiel
          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </Link>
  );
}
