import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * Internationalization Middleware
 *
 * Handles:
 * - Locale detection from Accept-Language header
 * - URL rewriting for localized pathnames
 * - Locale prefix management (as-needed strategy)
 *
 * URL Examples:
 * - /servicii -> Romanian (default, no redirect)
 * - /en/services -> English
 * - /hu/szolgaltatasok -> Hungarian
 * - /ro/servicii -> Redirects to /servicii (removes unnecessary prefix)
 */
export default createMiddleware(routing)

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
