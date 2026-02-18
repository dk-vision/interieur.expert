import React from "react";
import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import StickyContainer from "@/components/ui/StickyContainer";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Advies | Interieur.Expert",
  description: "Praktisch en eerlijk advies voor het inrichten van je huis. Van budgetvriendelijke tips tot grondige uitleg over materialen en technieken.",
};

export const revalidate = 3600; // Revalidate every hour

const adviesQuery = groq`
  *[_type == "article" && category == "advies"] | order(publishedAt desc) {
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
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Advies
            </h1>
            <p className="text-body-lg text-text/70 max-w-2xl">
              Praktisch en eerlijk advies voor het inrichten van je huis. Van budgetvriendelijke
              tips tot grondige uitleg over materialen en technieken.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Grid */}
      <Section spacing="sm" className="!pt-0">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="flex-1 space-y-12">
                {/* Featured article - wide format (kept within main column for consistent layout) */}
                {articles[0] && (
                  <ContentCard
                    key={articles[0]._id}
                    title={articles[0].title}
                    excerpt={articles[0].excerpt}
                    href={`/${articles[0].category || 'artikels'}/${articles[0].slug}`}
                    type="article"
                    category={articles[0].category}
                    publishedAt={new Date(articles[0].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    readingTime={articles[0].readingTime}
                    tags={articles[0].tags}
                    isSponsored={articles[0].sponsored || false}
                    partnerName={articles[0].partner?.name}
                    partnerUrl={articles[0].partner?.website}
                    image={articles[0].featuredImage ? urlForImage(articles[0].featuredImage).width(1200).height(675).url() : undefined}
                    size="wide"
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {articles.slice(1).map((article) => (
                    <ContentCard
                      key={article._id}
                      title={article.title}
                      excerpt={article.excerpt}
                      href={`/${article.category || 'artikels'}/${article.slug}`}
                      type="article"
                      category={article.category}
                      publishedAt={new Date(article.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      readingTime={article.readingTime}
                      tags={article.tags}
                      isSponsored={article.sponsored || false}
                      partnerName={article.partner?.name}
                      partnerUrl={article.partner?.website}
                      image={article.featuredImage ? urlForImage(article.featuredImage).width(800).height(450).url() : undefined}
                    />
                  ))}
                </div>
              </div>
            
              {/* Sidebar */}
              <aside className="lg:w-80 space-y-8">
                <StickyContainer offset={100}>
                  <AdSlot position="listing-sidebar" />
                </StickyContainer>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
