import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import MetaRow from "@/components/editorial/MetaRow";
import ContentCard from "@/components/editorial/ContentCard";
import VideoThumbnail from "@/components/video/VideoThumbnail";
import AdSlot from "@/components/ads/AdSlot";
import PortableText from "@/components/editorial/PortableText";
import { getDossierBySlug } from "@/lib/content";
import { urlForImage } from "@/lib/sanity/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const dossier = await getDossierBySlug(params.slug);

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
  params: { slug: string };
}) {
  const dossier = await getDossierBySlug(params.slug);

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

      {/* Sponsors Section */}
      {dossier.sponsors && dossier.sponsors.length > 0 && (
        <Section spacing="sm">
          <Container size="layout">
            <div className="bg-background border-t border-b border-text/10 py-8">
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-center text-sm text-text/60 uppercase tracking-wide">
                  Mogelijk gemaakt door
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                  {dossier.sponsors.map((sponsor) => (
                    <a
                      key={sponsor._id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {sponsor.logo && (
                        <img
                          src={urlForImage(sponsor.logo).width(200).height(80).fit("max").url()}
                          alt={sponsor.name}
                          className="h-12 w-auto object-contain"
                        />
                      )}
                    </a>
                  ))}
                </div>
              </div>
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
          <Container>
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

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Content Grid */}
                <div className="flex-1 space-y-12">
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
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80">
                  <div className="sticky top-8 space-y-8">
                  <AdSlot position="listing-sidebar" />
                    <div className="bg-surface p-6 rounded-sm">
                      <h3 className="font-semibold mb-4">Over dit dossier</h3>
                      <div className="space-y-2 text-sm">
                        {dossier.themes && dossier.themes.length > 0 && (
                          <div>
                            <span className="text-text/60">Thema's:</span>{" "}
                            <span className="text-text">{dossier.themes.join(", ")}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-text/60">Gepubliceerd:</span>{" "}
                          <span className="text-text">
                            {new Date(dossier.publishedAt).toLocaleDateString(
                              "nl-NL",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        {dossier.tags && dossier.tags.length > 0 && (
                          <div>
                            <span className="text-text/60">Tags:</span>{" "}
                            <span className="text-text">
                              {dossier.tags.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </article>
  );
}
