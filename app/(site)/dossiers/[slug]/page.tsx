import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import MetaRow from "@/components/editorial/MetaRow";
import ContentCard from "@/components/editorial/ContentCard";
import VideoThumbnail from "@/components/video/VideoThumbnail";
import AdSlot from "@/components/ads/AdSlot";
import StickyContainer from "@/components/ui/StickyContainer";
import PortableText from "@/components/editorial/PortableText";
import { getDossierBySlug } from "@/lib/content";
import { urlForImage } from "@/lib/sanity/image";
import type { Video } from "@/lib/content/types";
import { buildCollectionPageJsonLd, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import PreviewBanner from "@/components/ui/PreviewBanner";

const allArticleTagsQuery = groq`array::unique(*[_type == "article"].tags[])`;

type DossierVideo = Video & {
  previewVideoUrl?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const dossier = await getDossierBySlug(slug, { draft: isPreview });

  if (!dossier) {
    return {
      title: "Dossier niet gevonden",
    };
  }

  return {
    ...buildMetadata({
      title: dossier.seoTitle || dossier.title,
      description: dossier.seoDescription || dossier.excerpt,
      path: `/dossiers/${dossier.slug}`,
      image: dossier.featuredImage
        ? urlForImage(dossier.featuredImage).width(1200).height(630).url()
        : undefined,
    }),
  };
}

export default async function DossierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const [dossier, allTags] = await Promise.all([
    getDossierBySlug(slug, { draft: isPreview }),
    sanityFetch<string[]>({ query: allArticleTagsQuery }).catch(() => []),
  ]);

  if (!dossier) {
    notFound();
  }

  // Block access to unpublished/future dossiers unless in preview mode
  if (!isPreview && (!dossier.publishedAt || new Date(dossier.publishedAt) > new Date())) {
    notFound();
  }

  const existingTags = new Set(
    allTags
      .filter((t): t is string => typeof t === "string" && t.length > 0)
      .map((t) => t.toLowerCase())
  );

  const imageUrl = dossier.featuredImage
    ? urlForImage(dossier.featuredImage)
        .width(1600)
        .height(900)
        .url()
    : null;
  const dossierJsonLd = buildCollectionPageJsonLd({
    title: dossier.seoTitle || dossier.title,
    description: dossier.seoDescription || dossier.excerpt,
    path: `/dossiers/${dossier.slug}`,
    publishedAt: dossier.publishedAt,
    image: imageUrl,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Dossiers", path: "/dossiers" },
    { name: dossier.title, path: `/dossiers/${dossier.slug}` },
  ]);

  // Separate articles and videos (filter out null references and unpublished content in non-preview mode)
  const now = new Date();
  const validContent = (dossier.articles || []).filter((item) => {
    if (!item) return false;
    if (isPreview) return true;
    return item.publishedAt && new Date(item.publishedAt) <= now;
  });
  
  const articles = validContent.filter((item) => item._type === "article");
  const videos = validContent.filter((item): item is DossierVideo => item._type === "video");

  // Get content card data for articles
  const articleCards = articles.map((article) => ({
    title: article.title,
    excerpt: article.excerpt,
    href: `/${article.category || 'artikels'}/${article.slug}`,
    type: "article" as const,
    category: article.category,
    tags: article.tags,
    publishedAt: new Date(article.publishedAt).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    isSponsored: article.sponsored,
    partnerName: article.partner?.name,
    partnerUrl: article.partner?.website,
    image: article.featuredImage
      ? urlForImage(article.featuredImage).width(800).url()
      : undefined,
    readingTime: article.readingTime,
  }));

  return (
    <article>
      {isPreview && <PreviewBanner />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dossierJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <Section spacing="lg" className="pb-8 md:pb-10">
        <Container size="content">
          <div className="space-y-6">
            <MetaRow
              publishedAt={new Date(dossier.publishedAt).toLocaleDateString(
                "nl-NL",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
              type="dossier"
              centered
            />

            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              {dossier.title}
            </h1>

            <p className="text-body-lg text-text/70">
              {dossier.excerpt}
            </p>
          </div>
        </Container>
      </Section>

      {/* Sponsors Section */}
      {dossier.sponsors && dossier.sponsors.filter(s => s && s.logo).length > 0 && (
        <div className="py-0">
          <Container size="layout">
            <div>
              <div className="max-w-4xl mx-auto space-y-2">
                <p className="text-center text-meta text-text/60 uppercase tracking-wide">
                  Mogelijk gemaakt door
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                  {dossier.sponsors.filter(s => s).map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {sponsor.logo ? (
                        <img
                          src={urlForImage(sponsor.logo).width(200).height(80).fit("max").url()}
                          alt={sponsor.name}
                          className="h-12 w-auto object-contain"
                        />
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Featured Image */}
      {imageUrl && (
        <Section spacing="md">
          <Container size="layout">
            <div className="aspect-video bg-surface rounded-sm overflow-hidden relative">
              <Image
                src={imageUrl}
                alt={dossier.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Introduction */}
      {dossier.intro && (
        <Section spacing="md">
          <Container size="content">
            <ContentWrapper>
              <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-text prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body prose-p:text-text">
                <PortableText value={dossier.intro} />
              </div>
            </ContentWrapper>
          </Container>
        </Section>
      )}

      {/* Content Section */}
      {(articleCards.length > 0 || videos.length > 0) && (
        <Section spacing="lg">
          <Container size="layout">
            <div className="space-y-8">
              <div className="border-t border-text/10 pt-8">
                <h2 className="text-h4 font-semibold mb-2 text-text">
                  Inhoud van dit dossier
                </h2>
                <p className="text-body text-text/70">
                  {articleCards.length} {articleCards.length === 1 ? "artikel" : "artikelen"}
                  {videos.length > 0 && (
                    <>
                      {" "}&bull; {videos.length} {videos.length === 1 ? "video" : "video's"}
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Content Grid */}
                <div className="lg:col-span-8 space-y-12">
                  {/* Articles Section */}
                  {articleCards.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-h5 font-semibold text-text">Artikelen</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {articleCards.map((card) => (
                          <ContentCard key={card.href} {...card} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos Section */}
                  {videos.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-h5 font-semibold text-text">Video&apos;s</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                        {videos.map((video) => (
                          <VideoThumbnail
                            key={video._id}
                            href={`/video/${video.slug}`}
                            title={video.title}
                            thumbnail={urlForImage(video.thumbnail).width(640).height(360).url()}
                            previewVideo={video.previewVideoUrl}
                            duration={video.duration}
                            publishedAt={new Date(video.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                            isSponsored={video.sponsored || false}
                            partnerName={video.partner?.name}
                            size="grid"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                  <div className="space-y-8">
                    <div className="bg-background border border-text/10 rounded-sm p-6 space-y-4">
                        <h3 className="text-meta font-semibold uppercase tracking-wide text-text/60">
                          Over dit dossier
                        </h3>
                        
                        <div className="space-y-3 text-meta text-text/70">
                          <div className="flex justify-between">
                            <span>Gepubliceerd</span>
                            <time className="text-text">
                              {new Date(dossier.publishedAt).toLocaleDateString(
                                "nl-NL",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </time>
                          </div>
                        </div>
                        
                        {dossier.themes && dossier.themes.filter((t) => existingTags.has(t.toLowerCase())).length > 0 && (
                          <div className="pt-4 border-t border-text/10">
                            <div className="flex flex-wrap gap-2">
                              {dossier.themes.filter((t) => existingTags.has(t.toLowerCase())).map((theme) => (
                                <Link
                                  key={theme}
                                  href={`/tags/${encodeURIComponent(theme.toLowerCase())}`}
                                  className="text-meta px-3 py-1.5 bg-text/5 hover:bg-text/10 rounded-full text-text/70 hover:text-text transition-colors"
                                >
                                  {theme}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                    {/* Ad Slot - below info box */}
                    <StickyContainer offset={100}>
                      <AdSlot position="listing-sidebar" />
                    </StickyContainer>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </article>
  );
}
