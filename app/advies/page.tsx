import React from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/content/types";

const adviesQuery = groq`
  *[_type == "article" && category in ["Advies", "Tips", "Techniek"]] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    publishedAt,
    sponsored,
    "partner": partner->{_id, name, website},
    featuredImage,
    readingTime
  }
`;

export default async function AdviesPage() {
  const articles = await sanityFetch<Article[]>({
    query: adviesQuery,
  });

  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Advies
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Praktisch en eerlijk advies voor het inrichten van je huis. Van budgetvriendelijke
              tips tot grondige uitleg over materialen en technieken.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article, index) => (
              <React.Fragment key={article._id}>
                <ContentCard
                  title={article.title}
                  excerpt={article.excerpt}
                  href={`/artikels/${article.slug}`}
                  type="article"
                  category={article.category}
                  publishedAt={new Date(article.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                  readingTime={article.readingTime}
                  tags={article.tags}
                  isSponsored={article.sponsored || false}
                  partnerName={article.partner?.name}
                  partnerUrl={article.partner?.website}
                  image={article.featuredImage ? urlForImage(article.featuredImage).width(800).height(600).url() : undefined}
                />
                {index === 3 && <AdSlot position="listing-inline" />}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
