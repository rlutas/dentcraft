import type { MetadataRoute } from 'next'
import {
  getServiceSlugs,
  getTeamMemberSlugs,
} from '@/lib/sanity/queries'
import { client } from '@/lib/sanity/client'
import { localizedPathnames, siteConfig } from '@/lib/seo'

const baseUrl = siteConfig.baseUrl

// Supported locales - Romanian is default (no prefix)
const locales = ['ro', 'en', 'hu'] as const
type Locale = (typeof locales)[number]

// Static pages with their internal path keys (matching localizedPathnames)
const staticPages = [
  { key: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
  { key: '/servicii', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/echipa', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/testimoniale', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/faq', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/preturi', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/contact', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
  { key: '/galerie', changeFrequency: 'weekly' as const, priority: 0.8 },
]

// Build full URL from a localized path
function fullUrl(localePath: string): string {
  return localePath === '/' ? baseUrl : `${baseUrl}${localePath}`
}

// Get the localized path for a given internal key and locale
function getLocalizedPath(key: string, locale: Locale): string {
  const paths = localizedPathnames[key]
  if (paths) {
    return paths[locale] || paths['ro'] || key
  }
  // Fallback: prefix with locale for non-default
  if (locale === 'ro') return key
  return `/${locale}${key}`
}

// Build URL for a dynamic page (service, team member, blog post)
// Uses the localized base path + the slug
function buildDynamicUrl(basePath: string, slug: string, locale: Locale): string {
  const localizedBase = getLocalizedPath(basePath, locale)
  return fullUrl(`${localizedBase}/${slug}`)
}

// Fetch blog post slugs with publishedAt dates for accurate sitemap timestamps
async function getBlogPostSlugsWithDates() {
  const query = `*[_type == "blogPost"] { "slug": slug.current, publishedAt }`
  return client.fetch<Array<{ slug: string; publishedAt: string | null }>>(query)
}

// Helper to safely fetch slugs with error handling
async function safeFetch<T>(
  fetchFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fetchFn()
  } catch (error) {
    console.error('Sitemap: Error fetching from Sanity:', error)
    return fallback
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Build static page entries using localized pathnames
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: fullUrl(getLocalizedPath(page.key, locale)),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  )

  // Fetch dynamic content slugs from Sanity
  const [serviceSlugs, teamSlugs, blogSlugs] = await Promise.all([
    safeFetch(getServiceSlugs, []),
    safeFetch(getTeamMemberSlugs, []),
    safeFetch(getBlogPostSlugsWithDates, []),
  ])

  // Build service page entries with localized paths
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap(
    ({ slug }) =>
      locales.map((locale) => ({
        url: buildDynamicUrl('/servicii', slug, locale),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      }))
  )

  // Build team member page entries with localized paths
  const teamEntries: MetadataRoute.Sitemap = teamSlugs.flatMap(({ slug }) =>
    locales.map((locale) => ({
      url: buildDynamicUrl('/echipa', slug, locale),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  // Build blog post page entries with actual publish dates
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.flatMap(
    ({ slug, publishedAt }) =>
      locales.map((locale) => ({
        url: buildDynamicUrl('/blog', slug, locale),
        lastModified: publishedAt ? new Date(publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  )

  return [...staticEntries, ...serviceEntries, ...teamEntries, ...blogEntries]
}
