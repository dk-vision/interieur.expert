import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { runAudit, resolveUrl, assertOwnSiteUrl } from "@/lib/geo-audit/analyze";

export const dynamic = "force-dynamic";

// Admin-only: powers the "GEO Audit" tool in Sanity Studio (/studio). Gated by a
// shared secret so the endpoint can't be used as an open fetch proxy by the public.
function isAuthorized(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const expected = process.env.GEO_AUDIT_ADMIN_KEY;
  if (!expected) return false; // fail closed if no key is configured

  const provided = request.headers.get("x-geo-audit-key") || "";
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(expectedBuf, providedBuf);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Niet geautoriseerd." }, { status: 401 });
  }

  let url: string;
  try {
    const body = await request.json();
    if (typeof body?.url !== "string" || !body.url.trim()) {
      return NextResponse.json({ error: "Veld 'url' is verplicht." }, { status: 400 });
    }
    const resolved = resolveUrl(body.url.trim());
    assertOwnSiteUrl(resolved);
    url = resolved;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Ongeldige URL." },
      { status: 400 }
    );
  }

  try {
    const result = await runAudit(url);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Audit mislukt." },
      { status: 502 }
    );
  }
}
