import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Sanity CDN for CMS images
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'drpetric.ro',
      },
      // Google user profile photos (for Google Reviews)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    // Allow unoptimized external images
    unoptimized: false,
  },

  // Security headers
  async headers() {
    // Content Security Policy directives
    const cspDirectives = [
      "default-src 'self'",
      // Scripts: self + inline (Next.js, consent mode) + eval (GTM custom tags) + GTM/GA
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
      // Styles: self + inline (Next.js injects inline styles)
      "style-src 'self' 'unsafe-inline'",
      // Images: self + data URIs + Sanity CDN + external photo sources + analytics pixels
      "img-src 'self' data: blob: https://cdn.sanity.io https://drpetric.ro https://lh3.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.ro",
      // Fonts: self only (Next.js self-hosts Google Fonts via next/font)
      "font-src 'self'",
      // Frames: Google Maps + YouTube + Vimeo + GTM noscript
      "frame-src https://www.google.com https://www.youtube.com https://player.vimeo.com https://www.googletagmanager.com",
      // XHR/fetch/WebSocket: self + GTM + GA + Sanity + Vercel
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://cdn.sanity.io https://*.vercel-insights.com https://*.vercel-analytics.com",
      // Disallow plugins (Flash, Java, etc.)
      "object-src 'none'",
      // Restrict base URI to prevent base tag hijacking
      "base-uri 'self'",
      // Restrict form targets
      "form-action 'self'",
      // Only allow this site to frame itself
      "frame-ancestors 'self'",
      // Auto-upgrade HTTP requests to HTTPS
      "upgrade-insecure-requests",
    ]

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },

  // Enable typed routes for better type safety
  typedRoutes: true,
}

export default withNextIntl(nextConfig)
