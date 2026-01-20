import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search both articles and videos
    const results = await client.fetch(
      `*[
        _type in ["article", "video"] && 
        (
          title match $searchQuery + "*" ||
          excerpt match $searchQuery + "*" ||
          tags[] match $searchQuery + "*"
        )
      ] | order(_score desc) [0...10] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        category
      }`,
      { searchQuery: query }
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
