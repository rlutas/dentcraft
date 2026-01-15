import { Calendar, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getLegalPageBySlug, getLegalPageSlugs, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

// List of valid legal page slugs
const LEGAL_PAGE_SLUGS = [
  'politica-confidentialitate',
  'politica-cookies',
  'termeni-conditii',
  'privacy-policy',
  'cookie-policy',
  'terms-conditions',
]

type LegalPage = {
  _id: string
  content: Array<{
    _key: string
    _type: string
    children?: Array<{
      _key: string
      _type: string
      marks?: string[]
      text?: string
    }>
    style?: string
    [key: string]: unknown
  }>
  lastUpdated: string | null
  slug: string
  title: string
}

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>
}

export async function generateStaticParams() {
  const slugs = await getLegalPageSlugs()
  const params: Array<{ locale: string; slug: string[] }> = []

  for (const { slug } of slugs) {
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
  if (!LEGAL_PAGE_SLUGS.includes(pageSlug)) {
    return {
      title: 'Page Not Found',
    }
  }

  const page = await getLegalPageBySlug(pageSlug, locale as Locale) as LegalPage | null

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  // Map slug to path for SEO helper
  const pathMap: Record<string, string> = {
    'politica-confidentialitate': '/politica-confidentialitate',
    'privacy-policy': '/politica-confidentialitate',
    'politica-cookies': '/politica-cookies',
    'cookie-policy': '/politica-cookies',
    'termeni-conditii': '/termeni-conditii',
    'terms-conditions': '/termeni-conditii',
  }

  return generatePageMetadata({
    title: page.title,
    locale: locale as SEOLocale,
    path: pathMap[pageSlug] || `/${pageSlug}`,
    noIndex: true, // Legal pages typically don't need indexing
  })
}

export default async function LegalPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const pageSlug = slug.join('/')

  // Check if this is a valid legal page slug
  if (!LEGAL_PAGE_SLUGS.includes(pageSlug)) {
    notFound()
  }

  const page = await getLegalPageBySlug(pageSlug, locale as Locale) as LegalPage | null

  if (!page) {
    notFound()
  }

  return <LegalPageContent page={page} />
}

async function LegalPageContent({ page }: { page: LegalPage }) {
  const t = await getTranslations()

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const lastUpdatedDate = formatDate(page.lastUpdated)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <FileText className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{page.title}</h1>
            {lastUpdatedDate && (
              <p className="inline-flex items-center gap-2 text-body text-muted">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                {t('footer.copyright').split('.')[0]} {lastUpdatedDate}
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
              {page.content ? (
                <PortableTextRenderer
                  className="text-[var(--color-text)]"
                  value={page.content}
                />
              ) : (
                <p className="text-muted text-center py-8">
                  {t('common.loading')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section bg-[var(--color-accent-light)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
              {t('footer.quickLinks')}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                className="text-[var(--color-primary)] hover:underline"
                href="/politica-confidentialitate"
              >
                {t('footer.privacy')}
              </Link>
              <span className="text-muted">|</span>
              <Link
                className="text-[var(--color-primary)] hover:underline"
                href="/politica-cookies"
              >
                {t('footer.cookies')}
              </Link>
              <span className="text-muted">|</span>
              <Link
                className="text-[var(--color-primary)] hover:underline"
                href="/termeni-conditii"
              >
                {t('footer.terms')}
              </Link>
            </div>
            <div className="mt-8">
              <Link className="btn btn-secondary" href="/">
                {t('errors.404.backHome')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
