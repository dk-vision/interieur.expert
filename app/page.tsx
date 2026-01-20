import React from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import FeaturedCard from "@/components/editorial/FeaturedCard";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { Mail } from "lucide-react";
import { sanityFetch } from "@/lib/sanity/client";
import { featuredArticleQuery, latestArticlesQuery, latestVideosQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import type { Article, Video } from "@/lib/content/types";

function NewsletterCTA() {
  return (
    <div className="bg-text/5 border border-text/10 rounded-sm p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <Mail size={32} className="text-accent" />
        </div>
        <h3 className="text-2xl font-semibold text-text">
          Wekelijkse interieurinspiratie in je inbox
        </h3>
        <p className="text-text/70 leading-relaxed">
          Ontvang elke week de beste artikelen, tips en trends. Geen spam, altijd relevante content.
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
        <p className="text-xs text-text/50">
          Je kunt je altijd weer uitschrijven. Privacy gegarandeerd.
        </p>
      </div>
    </div>
  );
}

export default async function HomePage() {
  // Fetch featured article and latest content from Sanity
  const featuredArticle = await sanityFetch<Article>({
    query: featuredArticleQuery,
  });

  const latestArticles = await sanityFetch<Article[]>({
    query: latestArticlesQuery,
  });

  const latestVideos = await sanityFetch<Video[]>({
    query: latestVideosQuery,
  });

  return (
    <div>
      {/* Hero Section */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12 lg:space-y-16">
            {/* Intro */}
            <div className="max-w-content space-y-4">
              <h1 className="text-5xl lg:text-6xl font-semibold text-text leading-tight">
                Inspiratie voor je interieur
              </h1>
              <p className="text-xl text-text/70 leading-relaxed">
                Eerlijk advies, trends en verhalen over interieur. Zonder poespas.
              </p>
            </div>

            {/* Featured Article */}
            {featuredArticle && (
              <FeaturedCard
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                href={`/artikels/${featuredArticle.slug}`}
                type="article"
                category={featuredArticle.category}
                publishedAt={new Date(featuredArticle.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                readingTime={featuredArticle.readingTime}
                isSponsored={featuredArticle.sponsored || false}
                image={featuredArticle.featuredImage ? urlForImage(featuredArticle.featuredImage).width(1200).height(600).url() : undefined}
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Recent Articles Grid */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <h2 className="text-3xl font-semibold text-text">Recent</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {latestArticles.map((article, index) => (
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
                  {/* Ad Slot after 5th card */}
                  {index === 4 && <AdSlot position="listing-inline" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Video Section */}
      <Section spacing="lg" background="accent">
        <Container>
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-text">Video&apos;s</h2>
              <a
                href="/video"
                className="text-sm text-accent hover:text-text transition-colors font-medium"
              >
                Alle video&apos;s →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {latestVideos.map((video) => (
                <ContentCard
                  key={video._id}
                  title={video.title}
                  excerpt={video.excerpt}
                  href={`/video/${video.slug}`}
                  type="video"
                  category={video.category}
                  publishedAt={new Date(video.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                  readingTime={video.duration}
                  image={video.thumbnail ? urlForImage(video.thumbnail).width(800).height(600).url() : undefined}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section spacing="lg">
        <Container>
          <NewsletterCTA />
        </Container>
      </Section>
    </div>
  );
}
