import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/content/types";
import { groq } from "next-sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const articlesByTagQuery = groq`
  *[_type == "article" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    tags,
    publishedAt,
    readingTime,
    sponsored,
    "partner": partner->{
      name,
      website
    },
    "featuredImage": featuredImage.asset
  }
`;

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Decode and normalize the tag
  const tag = decodeURIComponent(slug);
  
  const articles = await sanityFetch<Article[]>({
    query: articlesByTagQuery,
    params: { tag },
  });

  if (!articles || articles.length === 0) {
    notFound();
  }

  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-sm text-text/60">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-text">Tag: {tag}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              #{tag}
            </h1>
            
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              {articles.length} {articles.length === 1 ? 'artikel' : 'artikelen'} met de tag <strong>{tag}</strong>
            </p>
          </div>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section spacing="lg">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {articles.map((article) => (
                  <ContentCard
                    key={article._id}
                    title={article.title}
                    excerpt={article.excerpt}
                    href={`/artikels/${article.slug}`}
                    type="article"
                    category={article.category}
                    publishedAt={new Date(article.publishedAt).toLocaleDateString('nl-NL', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                    readingTime={article.readingTime}
                    tags={article.tags}
                    isSponsored={article.sponsored || false}
                    partnerName={article.partner?.name}
                    partnerUrl={article.partner?.website}
                    image={article.featuredImage ? urlForImage(article.featuredImage).width(800).height(600).url() : undefined}
                  />
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="lg:w-80 space-y-8">
              <AdSlot position="sidebar" />
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  
  return {
    title: `Tag: ${tag} — interieur.expert`,
    description: `Ontdek alle artikelen over ${tag}. Praktisch advies en inspiratie voor je interieur.`,
  };
}
