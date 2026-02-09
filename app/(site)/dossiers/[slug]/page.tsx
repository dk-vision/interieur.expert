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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dossier = await getDossierBySlug(slug);

  if (!dossier) {
    return {
      title: "Dossier niet gevonden",
    };
  }

  return {
    title: dossier.seoTitle || `${dossier.title} | Interieur.Expert`,
    description: dossier.seoDescription || dossier.excerpt,
    openGraph: {
      title: dossier.title,
      description: dossier.excerpt,
      images: dossier.featuredImage
        ? [
            {
              url: urlForImage(dossier.featuredImage).width(1200).url(),
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export default async function DossierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dossier = await getDossierBySlug(slug);

  if (!dossier) {
    notFound();
  }

  const imageUrl = dossier.featuredImage
    ? urlForImage(dossier.featuredImage)
        .width(1600)
        .height(900)
        .url()
    : null;

  // Separate articles and videos (filter out null references)
  const validContent = dossier.articles ? dossier.articles.filter((item) => item !== null) : [];
  
  const articles = validContent.filter((item) => item._type === "article");
  const videos = validContent.filter((item) => item._type === "video");

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
      {/* Header */}
      <Section spacing="lg">
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
            />

            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              {dossier.title}
            </h1>

            <p className="text-xl text-text/70 leading-relaxed">
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
                <p className="text-center text-sm text-text/60 uppercase tracking-wide">
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
              <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-text prose-p:text-text prose-p:leading-relaxed">
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
                <h2 className="text-2xl font-semibold mb-2">
                  Inhoud van dit dossier
                </h2>
                <p className="text-text/70">
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
                      <h3 className="text-xl font-semibold">Artikelen</h3>
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
                      <h3 className="text-xl font-semibold">Video's</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                        {videos.map((video) => (
                          <VideoThumbnail
                            key={video._id}
                            href={`/video/${video.slug}`}
                            title={video.title}
                            thumbnail={urlForImage(video.thumbnail).width(640).height(360).url()}
                            previewVideo={(video as any).previewVideoUrl}
                            duration={video.duration}
                            publishedAt={new Date(video.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-text/60">
                          Over dit dossier
                        </h3>
                        
                        <div className="space-y-3 text-sm text-text/70">
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
                        
                        {dossier.themes && dossier.themes.length > 0 && (
                          <div className="pt-4 border-t border-text/10">
                            <div className="flex flex-wrap gap-2">
                              {dossier.themes.map((theme) => (
                                <Link
                                  key={theme}
                                  href={`/tags/${encodeURIComponent(theme.toLowerCase())}`}
                                  className="text-xs px-3 py-1.5 bg-text/5 hover:bg-text/10 rounded-full text-text/70 hover:text-text transition-colors"
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
