import { sanityFetch } from "../lib/sanity/client";
import { groq } from "next-sanity";

// Fetch 3 articles with their full body content
const query = groq`
  *[_type == "article"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    "slug": slug.current,
    body,
    publishedAt
  }
`;

interface BlockContent {
  _type: string;
  style?: string;
  listItem?: string;
  children?: Array<{
    _type: string;
    text?: string;
  }>;
  level?: number;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  body: BlockContent[];
  publishedAt: string;
}

function analyzeArticleBody(body: BlockContent[]): {
  totalBlocks: number;
  paragraphs: number;
  lists: number;
  headings: number;
  percentLists: number;
  percentParagraphs: number;
  totalWords: number;
  avgWordsPerParagraph: number;
  examples: {
    paragraphExamples: string[];
    listExamples: string[];
  };
} {
  let paragraphs = 0;
  let lists = 0;
  let headings = 0;
  let totalWords = 0;
  const paragraphExamples: string[] = [];
  const listExamples: string[] = [];
  let paragraphWords = 0;

  body.forEach((block) => {
    if (!block._type || block._type !== "block") return;

    const text = block.children
      ?.map((child) => child.text || "")
      .join(" ")
      .trim();
    
    if (!text) return;

    const words = text.split(/\s+/).filter(Boolean).length;
    totalWords += words;

    // Check block type
    if (block.listItem) {
      lists++;
      if (listExamples.length < 3) {
        listExamples.push(`• ${text.substring(0, 100)}${text.length > 100 ? "..." : ""}`);
      }
    } else if (block.style && block.style.startsWith("h")) {
      headings++;
    } else if (block.style === "normal" || !block.style) {
      paragraphs++;
      paragraphWords += words;
      if (paragraphExamples.length < 3) {
        paragraphExamples.push(text.substring(0, 150) + (text.length > 150 ? "..." : ""));
      }
    }
  });

  const totalBlocks = paragraphs + lists;
  const percentLists = totalBlocks > 0 ? (lists / totalBlocks) * 100 : 0;
  const percentParagraphs = totalBlocks > 0 ? (paragraphs / totalBlocks) * 100 : 0;
  const avgWordsPerParagraph = paragraphs > 0 ? paragraphWords / paragraphs : 0;

  return {
    totalBlocks,
    paragraphs,
    lists,
    headings,
    percentLists,
    percentParagraphs,
    totalWords,
    avgWordsPerParagraph,
    examples: {
      paragraphExamples,
      listExamples,
    },
  };
}

async function analyzeArticles() {
  console.log("Fetching articles from Sanity CMS...\n");

  try {
    const articles = await sanityFetch<Article[]>({
      query,
      params: {},
    });

    if (!articles || articles.length === 0) {
      console.log("No articles found in the database.");
      return;
    }

    console.log(`Found ${articles.length} articles. Analyzing...\n`);
    console.log("=".repeat(80));

    articles.forEach((article, index) => {
      console.log(`\n📄 ARTICLE ${index + 1}: ${article.title}`);
      console.log("-".repeat(80));
      console.log(`Slug: ${article.slug}`);
      console.log(`Published: ${new Date(article.publishedAt).toLocaleDateString()}`);
      console.log(`ID: ${article._id}\n`);

      if (!article.body || article.body.length === 0) {
        console.log("⚠️  No body content found for this article.\n");
        return;
      }

      const analysis = analyzeArticleBody(article.body);

      console.log("📊 STRUCTURE ANALYSIS:");
      console.log(`  Total content blocks: ${analysis.totalBlocks}`);
      console.log(`  - Paragraphs: ${analysis.paragraphs} (${analysis.percentParagraphs.toFixed(1)}%)`);
      console.log(`  - List items: ${analysis.lists} (${analysis.percentLists.toFixed(1)}%)`);
      console.log(`  - Headings: ${analysis.headings}`);
      console.log(`  Total words: ${analysis.totalWords}`);
      console.log(`  Avg words per paragraph: ${analysis.avgWordsPerParagraph.toFixed(1)}`);

      console.log("\n📝 READABILITY ASSESSMENT:");
      if (analysis.percentLists > 60) {
        console.log("  ⚠️  HIGH LIST USAGE - Content is heavily list-based");
        console.log("     May feel choppy and less engaging to read");
      } else if (analysis.percentLists > 40) {
        console.log("  ⚡ MODERATE LIST USAGE - Balanced but leaning toward lists");
      } else if (analysis.percentLists > 20) {
        console.log("  ✓ GOOD BALANCE - Mix of paragraphs and lists");
      } else {
        console.log("  ✓ PARAGRAPH-FOCUSED - Natural, flowing prose");
      }

      if (analysis.avgWordsPerParagraph < 30) {
        console.log("  ⚠️  SHORT PARAGRAPHS - May indicate choppy writing or keyword stuffing");
      } else if (analysis.avgWordsPerParagraph > 100) {
        console.log("  ℹ️  LONG PARAGRAPHS - Dense content, may need breaking up");
      } else {
        console.log(`  ✓ GOOD PARAGRAPH LENGTH - ${analysis.avgWordsPerParagraph.toFixed(0)} words avg`);
      }

      console.log("\n📋 PARAGRAPH EXAMPLES:");
      if (analysis.examples.paragraphExamples.length > 0) {
        analysis.examples.paragraphExamples.forEach((ex, i) => {
          console.log(`  ${i + 1}. "${ex}"`);
        });
      } else {
        console.log("  No paragraphs found.");
      }

      console.log("\n📋 LIST ITEM EXAMPLES:");
      if (analysis.examples.listExamples.length > 0) {
        analysis.examples.listExamples.forEach((ex) => {
          console.log(`  ${ex}`);
        });
      } else {
        console.log("  No list items found.");
      }

      console.log("\n" + "=".repeat(80));
    });

    // Overall summary
    console.log("\n\n🎯 OVERALL FINDINGS:");
    console.log("-".repeat(80));
    
    const avgListPercent = articles.reduce((sum, article) => {
      if (!article.body || article.body.length === 0) return sum;
      const analysis = analyzeArticleBody(article.body);
      return sum + analysis.percentLists;
    }, 0) / articles.filter(a => a.body && a.body.length > 0).length;

    const avgParagraphWords = articles.reduce((sum, article) => {
      if (!article.body || article.body.length === 0) return sum;
      const analysis = analyzeArticleBody(article.body);
      return sum + analysis.avgWordsPerParagraph;
    }, 0) / articles.filter(a => a.body && a.body.length > 0).length;

    console.log(`Average list usage across articles: ${avgListPercent.toFixed(1)}%`);
    console.log(`Average paragraph length: ${avgParagraphWords.toFixed(1)} words`);

    console.log("\n💡 RECOMMENDATIONS:");
    if (avgListPercent > 50) {
      console.log("  • Convert some list items into flowing paragraph prose");
      console.log("  • Add transitional sentences between sections");
      console.log("  • Focus on storytelling rather than just information delivery");
    } else if (avgListPercent > 30) {
      console.log("  • Content has a reasonable balance");
      console.log("  • Consider adding more narrative paragraphs for engagement");
    } else {
      console.log("  • Content is primarily paragraph-based - good for readability");
      console.log("  • Consider adding some structured lists for scannability");
    }

    if (avgParagraphWords < 30) {
      console.log("  • Paragraphs are quite short - may indicate shallow content");
      console.log("  • Consider expanding ideas with more detail and examples");
    } else if (avgParagraphWords > 80) {
      console.log("  • Paragraphs are long - consider breaking into smaller chunks");
    }

  } catch (error) {
    console.error("Error fetching articles:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
  }
}

analyzeArticles();
