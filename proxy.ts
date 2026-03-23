import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSiteUrl } from '@/lib/site';

function normalizeHost(host: string | null) {
  if (!host) {
    return '';
  }

  return host.toLowerCase().replace(/:\d+$/, '').replace(/\.$/, '');
}

export default function proxy(request: NextRequest) {
  const canonicalUrl = new URL(getSiteUrl());
  const canonicalHost = normalizeHost(canonicalUrl.hostname);
  const forwardedHost = request.headers.get('x-forwarded-host');
  const requestHost = normalizeHost(forwardedHost || request.headers.get('host'));
  const basicAuthEnabled = process.env.BASIC_AUTH_ENABLED === 'true';

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

  // Auth is disabled by default and can be re-enabled quickly via env.
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
