import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const searchPattern = `*${query.trim()}*`;

    const results = await client.fetch(
      `*[
        (
          _type in ["article", "video"] &&
          defined(publishedAt) && publishedAt <= now() &&
          (
            title match $searchPattern ||
            coalesce(excerpt, "") match $searchPattern ||
            count(tags[@ match $searchPattern]) > 0
          )
        ) ||
        (
          _type == "partner" &&
          (
            name match $searchPattern ||
            coalesce(description, "") match $searchPattern
          )
        )
      ] | order(publishedAt desc, _updatedAt desc) [0...10] {
        _id,
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
      }`,
      { searchPattern }
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
