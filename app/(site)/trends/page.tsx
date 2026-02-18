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
  title: "Trends | Interieur.Expert",
  description: "Blijf op de hoogte van de nieuwste interieur trends. Van kleurtrends tot nieuwe materialen en designrichtingen.",
};

export const revalidate = 3600; // Revalidate every hour

const trendsQuery = groq`
  *[_type == "article" && category == "trends"] | order(publishedAt desc) {
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

export default async function TrendsPage() {
  const articles = await sanityFetch<Article[]>({
    query: trendsQuery,
  });

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Trends
            </h1>
            <p className="text-body-lg text-text/70 max-w-2xl">
              De laatste ontwikkelingen in interieurdesign. We volgen trends kritisch:
              wat is écht vernieuwend en wat verdwijnt weer snel?
            </p>
          </div>
        </Container>
      </Section>

      {/* Current Trends Grid */}
      <Section spacing="sm" className="!pt-0">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="flex-1 space-y-12">
                {/* Featured article - wide format (kept within main column for consistent layout) */}
                {featuredArticle && (
                  <ContentCard
                    key={featuredArticle._id}
                    title={featuredArticle.title}
                    excerpt={featuredArticle.excerpt}
                    href={`/${featuredArticle.category || 'artikels'}/${featuredArticle.slug}`}
                    type="article"
                    category={featuredArticle.category}
                    publishedAt={new Date(featuredArticle.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    readingTime={featuredArticle.readingTime}
                    tags={featuredArticle.tags}
                    isSponsored={featuredArticle.sponsored || false}
                    partnerName={featuredArticle.partner?.name}
                    partnerUrl={featuredArticle.partner?.website}
                    image={featuredArticle.featuredImage ? urlForImage(featuredArticle.featuredImage).width(1200).height(675).url() : undefined}
                    size="wide"
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {otherArticles.map((article) => (
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

      {/* Trend Watch */}
      <Section spacing="lg" background="accent">
        <Container size="content">
          <div className="space-y-6 text-center">
            <h2 className="text-h4 font-semibold text-text">Trend Watch</h2>
            <p className="text-body text-text/70">
              Elke maand analyseren we opkomende trends. Schrijf je in voor onze
              nieuwsbrief en blijf op de hoogte van de laatste ontwikkelingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="je@email.nl"
                className="flex-1 px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent hover:text-text transition-colors">
                Inschrijven
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
