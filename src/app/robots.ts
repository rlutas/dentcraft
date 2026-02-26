import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // TEMPORARY: Block all crawlers while site is under construction
  // TODO: Revert to allow '/' when site is ready for launch
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    // Sitemap and host removed while under construction
  }
}
