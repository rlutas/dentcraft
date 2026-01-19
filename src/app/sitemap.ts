import { MetadataRoute } from 'next'
import {
  getServiceSlugs,
  getTeamMemberSlugs,
  getBlogPostSlugs,
} from '@/lib/sanity/queries'

const baseUrl = 'https://dentcraft.ro'

// Supported locales - Romanian is default (no prefix)
const locales = ['ro', 'en', 'hu'] as const

// Static pages configuration
const staticPages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 }, // Homepage
  { path: 'servicii', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'echipa', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'testimoniale', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'faq', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'preturi', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'contact', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'blog', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'galerie', changeFrequency: 'weekly' as const, priority: 0.8 },
]

// Helper to build URL with locale prefix
function buildUrl(locale: string, path: string): string {
  // Romanian is the default locale (no prefix)
  if (locale === 'ro') {
    return path ? `${baseUrl}/${path}` : baseUrl
  }
  return path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`
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

  // Build static page entries for all locales
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: buildUrl(locale, page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  )

  // Fetch dynamic content slugs from Sanity
  const [serviceSlugs, teamSlugs, blogSlugs] = await Promise.all([
    safeFetch(getServiceSlugs, []),
    safeFetch(getTeamMemberSlugs, []),
    safeFetch(getBlogPostSlugs, []),
  ])

  // Build service page entries
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap(
    ({ slug }) =>
      locales.map((locale) => ({
        url: buildUrl(locale, `servicii/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  )

  // Build team member page entries
  const teamEntries: MetadataRoute.Sitemap = teamSlugs.flatMap(({ slug }) =>
    locales.map((locale) => ({
      url: buildUrl(locale, `echipa/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  // Build blog post page entries
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.flatMap(({ slug }) =>
    locales.map((locale) => ({
      url: buildUrl(locale, `blog/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticEntries, ...serviceEntries, ...teamEntries, ...blogEntries]
}
