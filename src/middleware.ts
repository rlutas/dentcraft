import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

/**
 * Middleware
 *
 * 1. Redirects non-canonical domains (vercel.app, etc.) to www.dentcraft.ro
 * 2. Handles locale detection and URL rewriting via next-intl
 */
export default function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Redirect non-canonical domains to www.dentcraft.ro (301 permanent)
  if (hostname.includes('vercel.app') || hostname.includes('vercel.sh')) {
    const url = new URL(request.url)
    url.hostname = 'www.dentcraft.ro'
    url.port = ''
    url.protocol = 'https:'
    return NextResponse.redirect(url.toString(), 301)
  }

  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Static files (/_next/*, /favicon.ico, etc.)
  // - Public assets (/images/*, /fonts/*, etc.)
  // - Sanity Studio (/studio/*)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, or `/studio`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
}
