import type { Metadata } from 'next'

export type Locale = 'ro' | 'en' | 'hu'

/**
 * Base site configuration for SEO
 */
export const siteConfig = {
  name: 'Dentcraft',
  siteName: 'Dentcraft Satu Mare',
  baseUrl: 'https://dentcraft.ro',
  defaultOgImage: '/images/og-default.jpg',
}

/**
 * Locale-specific site titles
 */
const localeTitles: Record<Locale, string> = {
  ro: 'Dentcraft - Clinica Stomatologica Satu Mare',
  en: 'Dentcraft - Dental Clinic Satu Mare',
  hu: 'Dentcraft - Fogaszati Klinika Szatmarnemeti',
}

/**
 * Locale-specific site descriptions
 */
const localeDescriptions: Record<Locale, string> = {
  ro: 'Clinica stomatologica moderna in Satu Mare. Servicii complete de stomatologie: implanturi, estetica dentara, ortodontie. Programeaza-te acum!',
  en: 'Modern dental clinic in Satu Mare. Complete dental services: implants, cosmetic dentistry, orthodontics. Book your appointment now!',
  hu: 'Modern fogaszati klinika Szatmarneметiben. Teljes koru fogaszati szolgaltatasok: implantatum, esztetikai fogaszat, fogszabalyozas. Foglaljon idopontot most!',
}

/**
 * Localized pathname mapping for generating alternate URLs
 * Maps internal route patterns to localized paths
 */
const localizedPathnames: Record<string, Record<Locale, string>> = {
  '/': { ro: '/', en: '/en', hu: '/hu' },
  '/servicii': { ro: '/servicii', en: '/en/services', hu: '/hu/szolgaltatasok' },
  '/echipa': { ro: '/echipa', en: '/en/team', hu: '/hu/csapat' },
  '/contact': { ro: '/contact', en: '/en/contact', hu: '/hu/kapcsolat' },
  '/galerie': { ro: '/galerie', en: '/en/gallery', hu: '/hu/galeria' },
  '/testimoniale': { ro: '/testimoniale', en: '/en/testimonials', hu: '/hu/velemenyek' },
  '/preturi': { ro: '/preturi', en: '/en/prices', hu: '/hu/arak' },
  '/blog': { ro: '/blog', en: '/en/blog', hu: '/hu/blog' },
  '/faq': { ro: '/faq', en: '/en/faq', hu: '/hu/gyik' },
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
}

/**
 * Generate alternate URLs for hreflang tags
 */
function generateAlternateUrls(
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
      Object.keys(languages).forEach((locale) => {
        const currentLang = languages[locale]
        if (currentLang) {
          languages[locale] = currentLang.replace('[slug]', slug)
        }
      })
    }

    const canonical = languages['ro'] || path
    return {
      canonical,
      languages,
    }
  }

  const languages: Record<string, string> = {}

  for (const [locale, localePath] of Object.entries(localePaths)) {
    let fullPath = localePath
    if (slug && path.includes('[slug]')) {
      fullPath = `${localePath}/${slug}`
    }
    languages[locale] = fullPath
  }

  const canonical = languages['ro'] || path
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
    noIndex = false,
    keywords,
  } = options

  // Format title: "Page Title | Dentcraft Satu Mare" or default locale title
  const formattedTitle = title
    ? `${title} | ${siteConfig.siteName}`
    : localeTitles[locale] || localeTitles['ro']

  // Use provided description or default locale description
  const metaDescription = description || localeDescriptions[locale] || localeDescriptions['ro']

  // Generate alternate URLs for hreflang
  const alternates = generateAlternateUrls(path, slug)

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
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : locale === 'hu' ? 'hu_HU' : 'en_US',
      siteName: siteConfig.siteName,
      images: ogImages,
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

  // Add robots directive if noIndex
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
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
      canonical: '/',
      languages: {
        ro: '/',
        en: '/en',
        hu: '/hu',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : locale === 'hu' ? 'hu_HU' : 'en_US',
      siteName: siteConfig.siteName,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
