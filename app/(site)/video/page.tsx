import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Video } from "@/lib/content/types";

export const metadata = {
  title: "Video's | Interieur.Expert",
  description: "Inspirerende interieur tours, praktische DIY-projecten en advies van experts.",
};

export const revalidate = 3600;

const videosQuery = groq`
  *[_type == "video"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    thumbnail,
    duration
  }
`;

export default async function VideoPage() {
  const videos = await sanityFetch<Video[]>({
    query: videosQuery,
  });

  return (
    <div>
      {/* Header */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Video&apos;s
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Inspirerende interieur tours, praktische DIY-projecten en advies van experts.
            </p>
          </div>
        </Container>
      </Section>

      {/* Video Grid - unified layout like other pages */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            {/* Featured video - wide format */}
            {videos[0] && (
              <ContentCard
                key={videos[0]._id}
                title={videos[0].title}
                excerpt={videos[0].excerpt}
                href={`/video/${videos[0].slug}`}
                type="video"
                category={videos[0].category}
                publishedAt={new Date(videos[0].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                readingTime={videos[0].duration}
                image={videos[0].thumbnail ? urlForImage(videos[0].thumbnail).width(1200).height(600).url() : undefined}
                size="wide"
              />
            )}
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="flex-1">
                {videos.length > 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {/* Remaining videos: Regular 2-col grid */}
                    {videos.slice(1).map((video) => (
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
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-text/70">
                      Er zijn nog geen video&apos;s gepubliceerd.
                    </p>
                  </div>
                )}
              </div>
            
            {/* Sidebar */}
            <aside className="lg:w-80 space-y-8">
              <AdSlot position="listing-sidebar" />
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
