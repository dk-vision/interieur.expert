import { PortableText as BasePortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { ReactNode } from "react";

interface PortableTextProps {
  value: PortableTextBlock[];
}

interface BaseComponentProps {
  children?: ReactNode;
}

interface LinkValueProps {
  href?: string;
}

interface ImageValueProps {
  asset?: unknown;
  alt?: string;
  caption?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: BaseComponentProps) => <p className="mb-6">{children}</p>,
    h2: ({ children }: BaseComponentProps) => (
      <h2 className="text-3xl font-semibold mt-12 mb-6 text-text">
        {children}
      </h2>
    ),
    h3: ({ children }: BaseComponentProps) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-text">{children}</h3>
    ),
    blockquote: ({ children }: BaseComponentProps) => (
      <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-text/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: BaseComponentProps) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: BaseComponentProps) => <em className="italic">{children}</em>,
    link: ({ children, value }: BaseComponentProps & { value?: LinkValueProps }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent hover:underline"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value?: ImageValueProps }) => {
      if (!value?.asset) return null;
      
      const imageUrl = urlForImage(value).width(1200).height(800).url();
      
      return (
        <div className="my-8 -mx-4 md:mx-0">
          <div className="relative aspect-[3/2] rounded-sm overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-text/60 mt-3 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function PortableText({ value }: PortableTextProps) {
  return (
    <div className="prose-custom">
      <BasePortableText value={value} components={components} />
    </div>
  );
}
