import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
    const { _type, slug } = body;

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
