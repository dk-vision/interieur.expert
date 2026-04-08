import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSiteUrl } from '@/lib/site';

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

let cachedRedirects: Redirect[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60_000; // 60 seconds

async function getRedirects(): Promise<Redirect[]> {
  const now = Date.now();
  if (cachedRedirects && now - cacheTimestamp < CACHE_TTL) {
    return cachedRedirects;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return [];

  try {
    const query = encodeURIComponent(
      `*[_type == "redirect"]{ source, destination, permanent }`
    );
    const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    const { result } = await res.json();

    if (!Array.isArray(result)) return cachedRedirects ?? [];

    cachedRedirects = result.filter(
      (r: Redirect) => r.source && r.destination
    );
    cacheTimestamp = now;
    return cachedRedirects;
  } catch {
    return cachedRedirects ?? [];
  }
}

function normalizeHost(host: string | null) {
  if (!host) {
    return '';
  }

  return host.toLowerCase().replace(/:\d+$/, '').replace(/\.$/, '');
}

export default async function proxy(request: NextRequest) {
  const canonicalUrl = new URL(getSiteUrl());
  const canonicalHost = normalizeHost(canonicalUrl.hostname);
  const forwardedHost = request.headers.get('x-forwarded-host');
  const requestHost = normalizeHost(forwardedHost || request.headers.get('host'));
  const basicAuthEnabled = process.env.BASIC_AUTH_ENABLED === 'true';

  // --- Domain canonicalization ---
  if (
    process.env.NODE_ENV === 'production' &&
    requestHost &&
    (requestHost === 'interieurexpert.vercel.app' || requestHost === `www.${canonicalHost}`)
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = canonicalUrl.protocol;
    redirectUrl.host = canonicalHost;
    return NextResponse.redirect(redirectUrl, 308);
  }

  // --- Sanity-managed redirects ---
  const pathname = request.nextUrl.pathname;
  const redirects = await getRedirects();

  for (const r of redirects) {
    if (r.source === pathname) {
      const isExternal = r.destination.startsWith('https://');
      const destination = isExternal
        ? r.destination
        : `${request.nextUrl.origin}${r.destination}`;

      return NextResponse.redirect(destination, r.permanent ? 308 : 307);
    }
  }

  // --- Basic auth (disabled by default) ---
  if (process.env.NODE_ENV !== 'production' || !basicAuthEnabled) {
    return NextResponse.next();
  }

  // Skip auth for Sanity Studio
  if (request.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // Skip auth for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/sitemap.xml') {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Change these credentials!
    const validUser = process.env.AUTH_USER || 'admin';
    const validPass = process.env.AUTH_PASSWORD || 'preview2026';

    if (user === validUser && pwd === validPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
