import { ReactNode } from "react";

interface ArticleBodyProps {
  children: ReactNode;
}

export default function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <div
      className="prose prose-lg max-w-none 
        prose-headings:font-semibold prose-headings:text-text
        prose-h2:mt-12 prose-h2:mb-6
        prose-h3:mt-10 prose-h3:mb-5
        prose-p:text-text prose-p:leading-relaxed prose-p:mb-6
        first:prose-p:first-letter:text-6xl first:prose-p:first-letter:font-semibold first:prose-p:first-letter:float-left first:prose-p:first-letter:mr-2 first:prose-p:first-letter:leading-[0.85] first:prose-p:first-letter:mt-1
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-accent/30 prose-blockquote:pl-8 prose-blockquote:pr-0 prose-blockquote:italic prose-blockquote:text-text/80 prose-blockquote:text-2xl prose-blockquote:font-normal prose-blockquote:leading-relaxed prose-blockquote:my-16
        prose-strong:text-text prose-strong:font-semibold
        prose-ul:text-text prose-ol:text-text
        prose-li:text-text prose-li:leading-relaxed
        prose-img:rounded-sm prose-img:my-12"
    >
      {children}
    </div>
  );
}
