import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { generateRootMetadata, type Locale } from '@/lib/seo'
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/layout'
import { FramedNav } from '@/components/layout/FramedNav'
import { LazyClientComponents } from '@/components/layout/LazyClientComponents'
import { GlobalLinkTracker } from '@/components/features/GlobalLinkTracker'
import { MaintenancePage } from '@/components/MaintenancePage'
import '@/styles/globals.css'

// Optional maintenance mode — only active when NEXT_PUBLIC_MAINTENANCE_MODE=true is set in env
const isMaintenanceMode = process.env['NEXT_PUBLIC_MAINTENANCE_MODE'] === 'true'

// Pages are now statically rendered and cached on the CDN; refresh hourly so
// Sanity (CMS) edits still appear without a redeploy.
export const revalidate = 3600

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generateRootMetadata(locale as Locale)
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  // Maintenance bypass: authorized users (Dr. Petric) can view the real site
  // by visiting /api/preview?key=<PREVIEW_ACCESS_TOKEN> which sets this cookie.
  // Only read cookies in maintenance mode: calling cookies() opts every page
  // out of static rendering / CDN caching (Cache-Control: no-store).
  const hasPreviewCookie = isMaintenanceMode
    ? (await cookies()).get('dentcraft_preview')?.value === '1'
    : false
  const showMaintenance = isMaintenanceMode && !hasPreviewCookie

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 — must load BEFORE GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 2000
              });
            `,
          }}
        />
      </head>
      {process.env['NEXT_PUBLIC_GTM_ID'] && <GoogleTagManager gtmId={process.env['NEXT_PUBLIC_GTM_ID']} />}
      {/* Google Ads tag (AW-18165025740) + Conversion Linker are loaded through GTM
          ("Eticheta Google AW-18165025740", Initialization - All Pages). The direct
          gtag.js copy that used to be here loaded the library twice. */}
      <body suppressHydrationWarning>
        {/* GTM noscript fallback */}
        {process.env['NEXT_PUBLIC_GTM_ID'] && (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env['NEXT_PUBLIC_GTM_ID']}`}
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
              width="0"
            />
          </noscript>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteSchema()) }}
        />
        {/* Maintenance mode (opt-in via NEXT_PUBLIC_MAINTENANCE_MODE=true) — preview cookie set via /api/preview?key=... bypasses the gate */}
        {showMaintenance ? (
          <MaintenancePage />
        ) : (
          <>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <div className="relative flex min-h-screen flex-col">
                <FramedNav />
                <main id="main-content" className="flex-1">
                  {children}
                </main>
                <Footer />
                <LazyClientComponents />
              </div>
              <GlobalLinkTracker />
            </NextIntlClientProvider>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  )
}
