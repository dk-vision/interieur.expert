import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function POST(request: NextRequest) {
  try {
    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json(
        { error: "Campaign ID required" },
        { status: 400 }
      );
    }

    // Update click count in Sanity
    await client
      .patch(campaignId)
      .setIfMissing({ impressionClicks: 0 })
      .inc({ impressionClicks: 1 })
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}
