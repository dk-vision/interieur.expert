import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

// Rate limiting: simple in-memory cache (vervang later met Redis voor production)
const recentImpressions = new Map<string, number>();
const RATE_LIMIT_WINDOW = 30000; // 30 seconden

export async function POST(request: NextRequest) {
  try {
    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json(
        { error: "Campaign ID required" },
        { status: 400 }
      );
    }

    // Rate limiting: check if same campaign was tracked recently
    const now = Date.now();
    const lastTracked = recentImpressions.get(campaignId);
    
    if (lastTracked && now - lastTracked < RATE_LIMIT_WINDOW) {
      // Too soon, ignore (prevents spam/refresh attacks)
      return NextResponse.json({ success: true, tracked: false });
    }

    // Update impression count in Sanity
    await client
      .patch(campaignId)
      .setIfMissing({ currentImpressions: 0 })
      .inc({ currentImpressions: 1 })
      .commit();

    // Store in rate limit cache
    recentImpressions.set(campaignId, now);

    // Clean old entries from cache (prevent memory leak)
    if (recentImpressions.size > 1000) {
      const cutoff = now - RATE_LIMIT_WINDOW;
      for (const [key, time] of recentImpressions.entries()) {
        if (time < cutoff) {
          recentImpressions.delete(key);
        }
      }
    }

    return NextResponse.json({ success: true, tracked: true });
  } catch (error) {
    console.error("Error tracking impression:", error);
    return NextResponse.json(
      { error: "Failed to track impression" },
      { status: 500 }
    );
  }
}
