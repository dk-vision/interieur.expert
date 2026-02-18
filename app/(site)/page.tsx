import React from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import FeaturedCard from "@/components/editorial/FeaturedCard";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import StickyContainer from "@/components/ui/StickyContainer";
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
        <h3 className="text-h5 font-semibold text-text">
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
        <p className="text-meta text-text/50">
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
      <Section spacing="lg" className="lg:py-24">
        <Container>
          <div className="space-y-12 lg:space-y-16">
            {/* Intro */}
            <div className="max-w-content space-y-4">
              <h1 className="text-h2 lg:text-h1 font-semibold text-text">
                Inspiratie voor je interieur
              </h1>
              <p className="text-body-lg text-text/70">
                Waar interieur tot leven komt. Inspiratie, advies &amp; trends voor wie van wonen houdt. 🤍
              </p>
            </div>

            {/* Featured Article */}
            {featuredArticle && (
              <FeaturedCard
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                href={`/${featuredArticle.category || 'artikels'}/${featuredArticle.slug}`}
                type="article"
                category={featuredArticle.category}
                publishedAt={new Date(featuredArticle.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                readingTime={featuredArticle.readingTime}
                isSponsored={featuredArticle.sponsored || false}
                image={featuredArticle.featuredImage ? urlForImage(featuredArticle.featuredImage).width(1200).height(675).url() : undefined}
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Ad Position: Homepage Hero */}
      <Section spacing="sm">
        <Container>
          <AdSlot position="homepage-hero" />
        </Container>
      </Section>

      {/* Recent Articles - Magazine Style Layout */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <h2 className="text-h4 font-semibold text-text">Recent</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content - Dynamic grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {/* First article: Large featured card (2 cols) */}
                  {latestArticles[0] && (
                    <ContentCard
                      key={latestArticles[0]._id}
                      title={latestArticles[0].title}
                      excerpt={latestArticles[0].excerpt}
                      href={`/${latestArticles[0].category || 'artikels'}/${latestArticles[0].slug}`}
                      type="article"
                      category={latestArticles[0].category}
                      publishedAt={new Date(latestArticles[0].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      readingTime={latestArticles[0].readingTime}
                      tags={latestArticles[0].tags}
                      isSponsored={latestArticles[0].sponsored || false}
                      partnerName={latestArticles[0].partner?.name}
                      partnerUrl={latestArticles[0].partner?.website}
                        image={latestArticles[0].featuredImage ? urlForImage(latestArticles[0].featuredImage).width(1200).height(675).url() : undefined}
                      size="large"
                    />
                  )}
                  
                  {/* Articles 2-3: Regular cards */}
                  {latestArticles.slice(1, 3).map((article) => (
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
                  
                  {/* Article 4: Wide card with overlay (2 cols) */}
                  {latestArticles[3] && (
                    <ContentCard
                      key={latestArticles[3]._id}
                      title={latestArticles[3].title}
                      excerpt={latestArticles[3].excerpt}
                      href={`/${latestArticles[3].category || 'artikels'}/${latestArticles[3].slug}`}
                      type="article"
                      category={latestArticles[3].category}
                      publishedAt={new Date(latestArticles[3].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      readingTime={latestArticles[3].readingTime}
                      tags={latestArticles[3].tags}
                      isSponsored={latestArticles[3].sponsored || false}
                      partnerName={latestArticles[3].partner?.name}
                      partnerUrl={latestArticles[3].partner?.website}
                        image={latestArticles[3].featuredImage ? urlForImage(latestArticles[3].featuredImage).width(1200).height(675).url() : undefined}
                      size="wide"
                    />
                  )}
                  
                  {/* Articles 5-6: Regular cards */}
                  {latestArticles.slice(4, 6).map((article) => (
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
                  
                  {/* Ad as card replacement */}
                  <div className="md:col-span-1">
                    <AdSlot position="homepage-card" />
                  </div>
                  
                  {/* Remaining articles: Regular cards */}
                  {latestArticles.slice(6).map((article) => (
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

      {/* Video Section */}
      <Section spacing="lg" background="accent">
        <Container>
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 font-semibold text-text">Video&apos;s</h2>
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
                      image={video.thumbnail ? urlForImage(video.thumbnail).width(800).height(450).url() : undefined}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Ad Position: Above Newsletter (Super Leaderboard) */}
      <Section spacing="sm">
        <Container>
          <AdSlot position="homepage-newsletter" />
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
