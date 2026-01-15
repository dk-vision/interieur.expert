import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  // Verify secret
  if (secret !== process.env.DRAFT_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Validate required params
  if (!slug || !type) {
    return new Response("Missing slug or type", { status: 400 });
  }

  // Enable Draft Mode
  (await draftMode()).enable();

  // Determine redirect path based on type
  let path = "/";
  switch (type) {
    case "article":
      path = `/artikels/${slug}`;
      break;
    case "video":
      path = `/video/${slug}`;
      break;
    case "dossier":
      path = `/dossiers/${slug}`;
      break;
    default:
      path = "/";
  }

  // Redirect to the path
  redirect(path);
}
