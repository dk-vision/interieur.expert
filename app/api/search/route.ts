import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search articles, videos, and partners - ensure unique results
    const results = await client.fetch(
      `array::unique(*[
        (
          (_type == "article" || _type == "video") && 
          (title match $searchQuery + "*" || excerpt match $searchQuery + "*" || tags[] match $searchQuery + "*")
        ) ||
        (
          _type == "partner" && 
          (name match $searchQuery + "*" || description match $searchQuery + "*")
        )
      ]._id) | [0...10] | {
        "_id": @,
        ...*[_id == ^._id][0]{
          _type,
          "title": select(
            _type == "partner" => name,
            title
          ),
          slug,
          "excerpt": select(
            _type == "partner" => description,
            excerpt
          ),
          category,
          "sponsored": select(_type == "article" => sponsored, false)
        }
      }`,
      { searchQuery: query }
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
