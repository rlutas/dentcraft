import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale, pathnames } from './config'

/**
 * next-intl routing configuration
 *
 * Key behavior:
 * - localePrefix: 'as-needed' means:
 *   - Default locale (RO) has NO prefix: /servicii
 *   - Other locales HAVE prefix: /en/services, /hu/szolgaltatasok
 */
export const routing = defineRouting({
  locales,
  defaultLocale,

  // Only add prefix for non-default locales
  localePrefix: 'as-needed',

  // Disable automatic locale detection from browser
  // Users must explicitly navigate to /en or /hu for other languages
  localeDetection: false,

  // No NEXT_LOCALE cookie: with detection off it is unused, and a Set-Cookie
  // header on every page response prevents CDN caching.
  localeCookie: false,

  // Localized pathnames for SEO
  pathnames,
})
