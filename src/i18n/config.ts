/**
 * Internationalization Configuration
 *
 * URL Structure:
 * - Romanian (default): dentcraft.ro/servicii (no prefix)
 * - English: dentcraft.ro/en/services
 * - Hungarian: dentcraft.ro/hu/szolgaltatasok
 */

export const locales = ['ro', 'en', 'hu'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ro'

/**
 * Locale metadata for UI display
 */
export const localeNames: Record<Locale, string> = {
  ro: 'Romana',
  en: 'English',
  hu: 'Magyar',
}

/**
 * Locale flags for language switcher
 */
export const localeFlags: Record<Locale, string> = {
  ro: '🇷🇴',
  en: '🇬🇧',
  hu: '🇭🇺',
}

/**
 * Localized pathnames for SEO-friendly URLs
 *
 * Each route has translations for all supported locales.
 * The default locale (RO) uses the base paths.
 */
export const pathnames = {
  '/': '/',

  // Services
  '/servicii': {
    ro: '/servicii',
    en: '/services',
    hu: '/szolgaltatasok',
  },
  '/servicii/[slug]': {
    ro: '/servicii/[slug]',
    en: '/services/[slug]',
    hu: '/szolgaltatasok/[slug]',
  },

  // Team
  '/echipa': {
    ro: '/echipa',
    en: '/team',
    hu: '/csapat',
  },
  '/echipa/[slug]': {
    ro: '/echipa/[slug]',
    en: '/team/[slug]',
    hu: '/csapat/[slug]',
  },

  // Contact
  '/contact': {
    ro: '/contact',
    en: '/contact',
    hu: '/kapcsolat',
  },

  // Gallery
  '/galerie': {
    ro: '/galerie',
    en: '/gallery',
    hu: '/galeria',
  },

  // Testimonials
  '/testimoniale': {
    ro: '/testimoniale',
    en: '/testimonials',
    hu: '/velemenyek',
  },

  // Prices
  '/preturi': {
    ro: '/preturi',
    en: '/prices',
    hu: '/arak',
  },

  // Blog
  '/blog': {
    ro: '/blog',
    en: '/blog',
    hu: '/blog',
  },
  '/blog/[slug]': {
    ro: '/blog/[slug]',
    en: '/blog/[slug]',
    hu: '/blog/[slug]',
  },

  // FAQ
  '/faq': {
    ro: '/faq',
    en: '/faq',
    hu: '/gyik',
  },

  // Legal pages
  '/politica-confidentialitate': {
    ro: '/politica-confidentialitate',
    en: '/privacy-policy',
    hu: '/adatvedelmi-iranyelvek',
  },
  '/politica-cookies': {
    ro: '/politica-cookies',
    en: '/cookie-policy',
    hu: '/sutik-szabalyzata',
  },
  '/termeni-conditii': {
    ro: '/termeni-conditii',
    en: '/terms-conditions',
    hu: '/felhasznalasi-feltetelek',
  },
} as const

export type PathnameKey = keyof typeof pathnames
