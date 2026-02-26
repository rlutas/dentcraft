import type { Metadata } from 'next'

export type Locale = 'ro' | 'en' | 'hu'

/**
 * Base site configuration for SEO
 */
export const siteConfig = {
  name: 'Dentcraft',
  siteName: 'Dentcraft Satu Mare',
  baseUrl: 'https://www.dentcraft.ro',
  defaultOgImage: '/images/team-clinic.jpg',
}

/**
 * Locale-specific site titles
 */
const localeTitles: Record<Locale, string> = {
  ro: 'Dentist Satu Mare | Clinica Stomatologica DentCraft',
  en: 'Dentist Satu Mare | DentCraft Dental Clinic',
  hu: 'Fogorvos Szatmárnémeti | DentCraft Fogászati Klinika',
}

/**
 * Locale-specific site descriptions
 */
const localeDescriptions: Record<Locale, string> = {
  ro: 'Clinica stomatologica in Satu Mare cu 10+ ani experienta. Implanturi, ortodontie, fatete, albire dentara. Echipa de 6 specialisti. Programeaza consultatie!',
  en: 'Dental clinic in Satu Mare with 10+ years experience. Implants, orthodontics, veneers, teeth whitening. Team of 6 specialists. Book a consultation!',
  hu: 'Fogászati klinika Szatmárnémetiben, 10+ év tapasztalattal. Implantátum, fogszabályozás, héjak, fehérítés. 6 fős szakértői csapat. Foglaljon időpontot!',
}

/**
 * Localized pathname mapping for generating alternate URLs
 * Maps internal route patterns to localized paths
 */
export const localizedPathnames: Record<string, Record<Locale, string>> = {
  '/': { ro: '/', en: '/en', hu: '/hu' },
  '/servicii': { ro: '/servicii', en: '/en/services', hu: '/hu/szolgaltatasok' },
  '/echipa': { ro: '/echipa', en: '/en/team', hu: '/hu/csapat' },
  '/contact': { ro: '/contact', en: '/en/contact', hu: '/hu/kapcsolat' },
  '/galerie': { ro: '/galerie', en: '/en/gallery', hu: '/hu/galeria' },
  '/testimoniale': { ro: '/testimoniale', en: '/en/testimonials', hu: '/hu/velemenyek' },
  '/preturi': { ro: '/preturi', en: '/en/prices', hu: '/hu/arak' },
  '/blog': { ro: '/blog', en: '/en/blog', hu: '/hu/blog' },
  '/faq': { ro: '/faq', en: '/en/faq', hu: '/hu/gyik' },
  '/politica-confidentialitate': { ro: '/politica-confidentialitate', en: '/en/privacy-policy', hu: '/hu/adatvedelmi-iranyelvek' },
  '/politica-cookies': { ro: '/politica-cookies', en: '/en/cookie-policy', hu: '/hu/sutik-szabalyzata' },
  '/termeni-conditii': { ro: '/termeni-conditii', en: '/en/terms-conditions', hu: '/hu/felhasznalasi-feltetelek' },
}

/**
 * Options for generatePageMetadata
 */
export type PageMetadataOptions = {
  /** Page title - will be formatted as "Title | Dentcraft Satu Mare" */
  title?: string
  /** Page description for meta description tag */
  description?: string
  /** OpenGraph image URL (absolute or relative to site root) */
  ogImage?: string
  /** Current locale */
  locale: Locale
  /** Internal path for generating alternate URLs (e.g., '/servicii') */
  path?: string
  /** Dynamic slug for pages with [slug] params */
  slug?: string
  /** Whether to prevent indexing */
  noIndex?: boolean
  /** Additional keywords for SEO */
  keywords?: string[]
  /** OpenGraph type - defaults to 'website', use 'article' for blog posts */
  ogType?: 'website' | 'article'
  /** ISO 8601 date string for article published time (only used when ogType is 'article') */
  publishedTime?: string
  /** ISO 8601 date string for article modified time (only used when ogType is 'article') */
  modifiedTime?: string
}

/**
 * Generate alternate URLs for hreflang tags
 * Canonical is set to the current locale's URL (not always RO)
 */
function generateAlternateUrls(
  locale: Locale,
  path: string,
  slug?: string
): { canonical: string; languages: Record<string, string> } {
  const basePath = path.replace(/\/\[slug\]$/, '')
  const localePaths = localizedPathnames[basePath]

  if (!localePaths) {
    // Fallback for unknown paths - use path directly with locale prefixes
    const languages: Record<string, string> = {
      ro: path,
      en: `/en${path}`,
      hu: `/hu${path}`,
    }

    if (slug) {
      Object.keys(languages).forEach((lang) => {
        const currentLang = languages[lang]
        if (currentLang) {
          languages[lang] = currentLang.replace('[slug]', slug)
        }
      })
    }

    // x-default points to Romanian (default language) for search engines
    languages['x-default'] = languages['ro'] || path
    // Canonical must match the current locale's URL
    const canonical = languages[locale] || languages['ro'] || path
    return {
      canonical,
      languages,
    }
  }

  const languages: Record<string, string> = {}

  for (const [lang, localePath] of Object.entries(localePaths)) {
    let fullPath = localePath
    if (slug && path.includes('[slug]')) {
      fullPath = `${localePath}/${slug}`
    }
    languages[lang] = fullPath
  }

  // x-default points to Romanian (default language) for search engines
  languages['x-default'] = languages['ro'] || path
  // Canonical must match the current locale's URL
  const canonical = languages[locale] || languages['ro'] || path
  return {
    canonical,
    languages,
  }
}

/**
 * Generate metadata for a page
 *
 * @example
 * ```tsx
 * export async function generateMetadata({ params }: Props): Promise<Metadata> {
 *   const { locale } = await params
 *   const t = await getTranslations({ locale })
 *
 *   return generatePageMetadata({
 *     title: t('services.title'),
 *     description: t('services.subtitle'),
 *     locale: locale as Locale,
 *     path: '/servicii',
 *   })
 * }
 * ```
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    ogImage,
    locale,
    path = '/',
    slug,
    noIndex: _noIndex = false, // TEMPORARY: renamed while all pages are noindex
    keywords,
    ogType = 'website',
    publishedTime,
    modifiedTime,
  } = options

  // Use provided title directly (root layout template will append site name via '%s | Dentcraft Satu Mare')
  // When no title is provided, use the locale default as the full title
  const formattedTitle = title || (localeTitles[locale] || localeTitles['ro'])

  // Use provided description or default locale description
  const metaDescription = description || localeDescriptions[locale] || localeDescriptions['ro']

  // Generate alternate URLs for hreflang (canonical matches current locale)
  const alternates = generateAlternateUrls(locale, path, slug)

  // Build OpenGraph images array
  const ogImages: { url: string; width?: number; height?: number; alt?: string }[] = []
  if (ogImage) {
    const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteConfig.baseUrl}${ogImage}`
    ogImages.push({
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title || siteConfig.name,
    })
  } else {
    ogImages.push({
      url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    })
  }

  const metadata: Metadata = {
    title: formattedTitle,
    description: metaDescription,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: formattedTitle,
      description: metaDescription,
      type: ogType,
      locale: locale === 'ro' ? 'ro_RO' : locale === 'hu' ? 'hu_HU' : 'en_US',
      siteName: siteConfig.siteName,
      images: ogImages,
      ...(ogType === 'article' && {
        publishedTime,
        modifiedTime,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: metaDescription,
      images: ogImages.map((img) => img.url),
    },
  }

  // Add keywords if provided
  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords
  }

  // TEMPORARY: noindex ALL pages while site is under construction
  // TODO: Revert to conditional noIndex check when site is ready for launch
  // Original code:
  // if (noIndex) { metadata.robots = { index: false, follow: false } }
  metadata.robots = {
    index: false,
    follow: false,
  }

  return metadata
}

/**
 * Generate metadata for dynamic content pages (services, blog posts, team members)
 * This handles SEO data that may come from Sanity CMS
 */
export type DynamicPageMetadataOptions = {
  /** Fallback title if no SEO title provided */
  title: string
  /** Fallback description if no SEO description provided */
  description?: string
  /** Current locale */
  locale: Locale
  /** Internal path pattern (e.g., '/servicii/[slug]') */
  path: string
  /** Page slug */
  slug: string
  /** SEO data from Sanity (if available) */
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: { asset: { _ref: string } } | null
    noIndex?: boolean
  } | null
  /** Fallback image if no SEO image provided */
  fallbackImage?: string
  /** Image URL builder function (for Sanity images) */
  imageUrlBuilder?: (image: { asset: { _ref: string } }) => string
  /** OpenGraph type - defaults to 'website', use 'article' for blog posts */
  ogType?: 'website' | 'article'
  /** ISO 8601 date string for article published time */
  publishedTime?: string
  /** ISO 8601 date string for article modified time */
  modifiedTime?: string
}

/**
 * Generate metadata for dynamic content pages
 *
 * @example
 * ```tsx
 * export async function generateMetadata({ params }: Props): Promise<Metadata> {
 *   const { locale, slug } = await params
 *   const service = await getServiceBySlug(slug, locale as Locale)
 *
 *   if (!service) return {}
 *
 *   return generateDynamicPageMetadata({
 *     title: service.title,
 *     description: service.shortDescription,
 *     locale: locale as Locale,
 *     path: '/servicii/[slug]',
 *     slug,
 *     seo: service.seo,
 *     fallbackImage: service.heroImage ? urlFor(service.heroImage).url() : undefined,
 *     imageUrlBuilder: (img) => urlFor(img).width(1200).height(630).url(),
 *   })
 * }
 * ```
 */
export function generateDynamicPageMetadata(
  options: DynamicPageMetadataOptions
): Metadata {
  const {
    title,
    locale,
    path,
    slug,
    seo,
    fallbackImage,
    imageUrlBuilder,
  } = options

  // Use SEO title if provided, otherwise use fallback title
  const pageTitle = seo?.metaTitle || title

  // Use SEO description if provided, otherwise use fallback description
  const pageDescription = seo?.metaDescription || options.description

  // Determine OG image
  let ogImage: string | undefined
  if (seo?.ogImage && imageUrlBuilder) {
    ogImage = imageUrlBuilder(seo.ogImage)
  } else if (fallbackImage) {
    ogImage = fallbackImage
  }

  // Build options object conditionally to avoid undefined values
  const metadataOptions: PageMetadataOptions = {
    title: pageTitle,
    locale,
    path,
    slug,
    noIndex: seo?.noIndex || false,
  }

  if (pageDescription) {
    metadataOptions.description = pageDescription
  }

  if (ogImage) {
    metadataOptions.ogImage = ogImage
  }

  // Pass through article metadata if provided
  if (options.ogType) {
    metadataOptions.ogType = options.ogType
  }
  if (options.publishedTime) {
    metadataOptions.publishedTime = options.publishedTime
  }
  if (options.modifiedTime) {
    metadataOptions.modifiedTime = options.modifiedTime
  }

  return generatePageMetadata(metadataOptions)
}

/**
 * Default metadata for the site (used in root layout)
 */
export function generateRootMetadata(locale: Locale): Metadata {
  return {
    title: {
      default: localeTitles[locale] || localeTitles['ro'],
      template: `%s | ${siteConfig.siteName}`,
    },
    description: localeDescriptions[locale] || localeDescriptions['ro'],
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical: locale === 'ro' ? '/' : `/${locale}`,
      languages: {
        ro: '/',
        en: '/en',
        hu: '/hu',
        'x-default': '/',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : locale === 'hu' ? 'hu_HU' : 'en_US',
      siteName: siteConfig.siteName,
      images: [
        {
          url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localeTitles[locale] || localeTitles['ro'],
      description: localeDescriptions[locale] || localeDescriptions['ro'],
      images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
    },
    // TEMPORARY: noindex while site is under construction
    // TODO: Revert to index: true, follow: true when site is ready for launch
    robots: {
      index: false,
      follow: false,
    },
  }
}
