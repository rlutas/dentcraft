import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // Block AI training crawlers (not search crawlers)
      {
        userAgent: ['CCBot', 'Bytespider', 'cohere-ai'],
        disallow: '/',
      },
    ],
    sitemap: 'https://dentcraft.ro/sitemap.xml',
  }
}
