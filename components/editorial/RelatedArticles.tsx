"use client";

import { useRouter } from "next/navigation";
import { urlForImage } from "@/lib/sanity/image";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: any;
  category: string;
  publishedAt: string;
  readingTime?: number;
}

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const router = useRouter();
  
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-text/10">
      <h2 className="text-h5 font-semibold text-text mb-8">
        Gerelateerde artikelen
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            onClick={() => router.push(`/${article.category || 'artikels'}/${article.slug}`)}
            className="group cursor-pointer"
          >
            <article className="space-y-4">
              {article.featuredImage && (
                <div className="aspect-video bg-background overflow-hidden rounded-lg">
                  <img
                    src={urlForImage(article.featuredImage)
                      .width(600)
                      .height(338)
                      .url()}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                {article.category && (
                  <span className="text-meta text-accent font-medium">
                    {article.category}
                  </span>
                )}
                
                <h3 className="text-h6 font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-body text-text/70 line-clamp-2">
                  {article.excerpt}
                </p>
                
                {article.readingTime && (
                  <p className="text-meta text-text/50">
                    {article.readingTime} min lezen
                  </p>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
