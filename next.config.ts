import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 95],
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
      // Scripts: self + inline (Next.js, consent mode) + eval (GTM custom tags) + GTM/GA/Google Ads + Vercel
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.gstatic.com https://va.vercel-scripts.com https://vercel.live",
      // Styles: self + inline (Next.js injects inline styles) + Google Fonts CSS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images: self + data URIs + Sanity CDN + external photo sources + analytics/ads conversion pixels
      "img-src 'self' data: blob: https://cdn.sanity.io https://drpetric.ro https://lh3.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.ro https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
      // Fonts: self + Google Fonts (some 3rd-party widgets load gstatic fonts directly)
      "font-src 'self' https://fonts.gstatic.com data:",
      // Frames: Google Maps + YouTube + Vimeo + GTM noscript + Vercel preview comments
      "frame-src https://www.google.com https://www.youtube.com https://player.vimeo.com https://www.googletagmanager.com https://vercel.live https://td.doubleclick.net",
      // XHR/fetch/WebSocket: self + GTM + GA + Google Ads conversion + Sanity + Vercel
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://www.google.ro https://www.googleadservices.com https://googleads.g.doubleclick.net https://td.doubleclick.net https://pagead2.googlesyndication.com https://cdn.sanity.io https://*.vercel-insights.com https://*.vercel-analytics.com https://va.vercel-scripts.com https://vercel.live wss://ws-us3.pusher.com",
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
