import { ArrowRight, Calendar, Cookie, FileText, Home, Shield } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  getLegalPageContent,
  SLUG_TO_PAGE_ID,
  PAGE_ID_TO_PATH,
  type LegalPageData,
} from '@/data/legal-content'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'

/**
 * All valid legal page slugs across all locales.
 * These come from the pathnames config in i18n/config.ts.
 */
const ALL_LEGAL_SLUGS = Object.keys(SLUG_TO_PAGE_ID)

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string[] }> = []

  // Generate params for all legal page slugs across all locales
  for (const slug of ALL_LEGAL_SLUGS) {
    for (const locale of routing.locales) {
      params.push({ locale, slug: [slug] })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const pageSlug = slug.join('/')

  // Check if this is a valid legal page slug
  if (!ALL_LEGAL_SLUGS.includes(pageSlug)) {
    return {
      title: 'Page Not Found',
    }
  }

  // Get hardcoded legal content
  const page = getLegalPageContent(pageSlug, locale)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  const pageId = SLUG_TO_PAGE_ID[pageSlug]
  const canonicalPath = pageId ? PAGE_ID_TO_PATH[pageId] : `/${pageSlug}`

  return generatePageMetadata({
    title: page.title,
    locale: locale as SEOLocale,
    path: canonicalPath,
    noIndex: true, // Legal pages typically don't need indexing
  })
}

export default async function LegalPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const pageSlug = slug.join('/')

  // Check if this is a valid legal page slug
  if (!ALL_LEGAL_SLUGS.includes(pageSlug)) {
    notFound()
  }

  // Get hardcoded legal content
  const page = getLegalPageContent(pageSlug, locale)

  if (!page) {
    notFound()
  }

  return <LegalPageContent locale={locale} page={page} />
}

async function LegalPageContent({
  page,
  locale,
}: {
  page: LegalPageData
  locale: string
}) {
  const t = await getTranslations()

  const formatDate = (dateStr: string) => {
    const dateLocaleMap: Record<string, string> = {
      ro: 'ro-RO',
      en: 'en-GB',
      hu: 'hu-HU',
    }
    return new Date(dateStr).toLocaleDateString(
      dateLocaleMap[locale] || 'ro-RO',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )
  }

  const lastUpdatedLabel: Record<string, string> = {
    ro: 'Ultima actualizare',
    en: 'Last updated',
    hu: 'Utolso frissites',
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <FileText
                className="w-8 h-8 text-[var(--color-primary)]"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="mb-6">{page.title}</h1>
            {page.lastUpdated && (
              <p className="inline-flex items-center gap-2 text-body text-muted">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                {lastUpdatedLabel[locale] || lastUpdatedLabel['ro']}:{' '}
                {formatDate(page.lastUpdated)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-12">
              <div
                className="legal-content prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 md:py-20 bg-[#faf6f1]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-sm font-medium text-[#8b7355] tracking-wider uppercase mb-8">
              {t('footer.quickLinks')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/politica-confidentialitate' as const, icon: Shield, label: t('footer.privacy') },
                { href: '/politica-cookies' as const, icon: Cookie, label: t('footer.cookies') },
                { href: '/termeni-conditii' as const, icon: FileText, label: t('footer.terms') },
              ].map((item) => (
                <Link
                  className="group flex items-center gap-3 px-5 py-4 bg-white rounded-xl border border-[#e8e0d5]
                    hover:border-[#d4c4b0] hover:shadow-[0_4px_16px_-4px_rgba(139,115,85,0.12)]
                    hover:-translate-y-0.5 transition-all duration-200"
                  href={item.href}
                  key={item.href}
                >
                  <item.icon className="w-4.5 h-4.5 text-[#8b7355] shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#2a2118] group-hover:text-[#8b7355] transition-colors">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4c4b0] ml-auto group-hover:text-[#8b7355] group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                className="inline-flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#2a2118] font-medium transition-colors"
                href="/"
              >
                <Home className="w-4 h-4" strokeWidth={1.5} />
                {t('errors.404.backHome')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
