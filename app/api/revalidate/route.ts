import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Import preview generation function
async function generatePreviewInBackground(videoId: string, youtubeId: string) {
  try {
    // Determine the correct base URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
      || 'https://interieurexpert.vercel.app';
    
    console.log(`🎬 Calling ${baseUrl}/api/generate-preview for video ${videoId}`);
    
    const response = await fetch(`${baseUrl}/api/generate-preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, youtubeId }),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Preview generation started for video: ${videoId}`);
    } else {
      console.error(`❌ Preview generation failed:`, result);
    }
  } catch (error) {
    console.error(`❌ Failed to trigger preview generation:`, error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get("authorization");
    const secret = process.env.REVALIDATE_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse webhook payload
    const body = await request.json();
    const { _type, slug, _id, youtubeId, previewVideo } = body;

    if (!_type) {
      return NextResponse.json(
        { message: "Missing document type" },
        { status: 400 }
      );
    }

    // Revalidate based on document type
    switch (_type) {
      case "article":
        if (slug?.current) {
          revalidatePath(`/artikels/${slug.current}`);
          console.log(`✅ Revalidated article: /artikels/${slug.current}`);
        }
        revalidatePath("/");
        revalidatePath("/inspiratie");
        revalidatePath("/advies");
        revalidatePath("/trends");
        break;

      case "video":
        if (slug?.current) {
          revalidatePath(`/video/${slug.current}`);
          console.log(`✅ Revalidated video: /video/${slug.current}`);
        }
        revalidatePath("/");
        revalidatePath("/video");
        
        // Auto-generate preview if video has YouTube ID but no preview
        if (_id && youtubeId && !previewVideo) {
          console.log(`🎬 Video needs preview: ${slug?.current} (ID: ${_id}, YouTube: ${youtubeId})`);
          // Fire and forget - don't wait for completion
          generatePreviewInBackground(_id, youtubeId).catch(console.error);
        } else if (previewVideo) {
          console.log(`⏭️  Video already has preview: ${slug?.current}`);
        } else if (!youtubeId) {
          console.log(`⚠️  Video missing YouTube ID: ${slug?.current}`);
        }
        break;

      case "dossier":
        if (slug?.current) {
          revalidatePath(`/dossiers/${slug.current}`);
          console.log(`✅ Revalidated dossier: /dossiers/${slug.current}`);
        }
        revalidatePath("/");
        break;

      case "partner":
      case "adCampaign":
      case "adCreative":
        // Revalidate all pages that might show ads or sponsored content
        revalidatePath("/");
        revalidatePath("/inspiratie");
        revalidatePath("/advies");
        revalidatePath("/trends");
        revalidatePath("/video");
        console.log(`✅ Revalidated all listings for ${_type} change`);
        break;

      default:
        console.log(`⚠️  Unknown document type: ${_type}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: slug?.current,
    });
  } catch (error) {
    console.error("❌ Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}
