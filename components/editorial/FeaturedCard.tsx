import Link from "next/link";
import MetaRow from "./MetaRow";
import Pill from "@/components/ui/Pill";
import Image from "next/image";

interface FeaturedCardProps {
  title: string;
  excerpt: string;
  href: string;
  type: "article" | "video" | "dossier";
  category?: string;
  publishedAt: string;
  readingTime?: number;
  isSponsored?: boolean;
  image?: string;
}

export default function FeaturedCard({
  title,
  excerpt,
  href,
  type,
  category,
  publishedAt,
  readingTime,
  isSponsored = false,
  image,
}: FeaturedCardProps) {
  return (
    <Link
      href={href}
      className="group block hover:opacity-90 transition-opacity"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="aspect-[16/9] lg:aspect-square bg-accent/10 rounded-sm overflow-hidden relative">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          {category && (
            <div className="absolute top-0 left-0 p-6">
              <Pill variant="subtle" size="md">
                {category}
              </Pill>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-6">
          <MetaRow
            publishedAt={publishedAt}
            readingTime={readingTime}
            type={type}
            isSponsored={isSponsored}
          />

          <h2 className="text-4xl lg:text-5xl font-semibold text-text leading-tight group-hover:text-accent transition-colors">
            {title}
          </h2>

          <p className="text-lg text-text/70 leading-relaxed">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
