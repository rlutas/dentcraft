import { Images, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import { getAllBeforeAfter, getAllServices, type Locale } from '@/lib/sanity/queries'

// BeforeAfter case type based on Sanity schema
type SanityBeforeAfter = {
  _id: string
  title: string | null
  service: {
    _id: string
    title: string
    slug: string
  } | null
  doctor: {
    _id: string
    name: string
    slug: string
  } | null
  beforeImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  afterImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description: string | null
  treatmentDuration: string | null
  featured: boolean
}

// Service type for filter
type SanityService = {
  _id: string
  title: string
  slug: string
}

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('gallery.title'),
    description: t('gallery.subtitle'),
  }
}

export default async function GalleryPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  setRequestLocale(locale)

  // Get service filter from URL params
  const serviceFilter = typeof resolvedSearchParams['service'] === 'string'
    ? resolvedSearchParams['service']
    : undefined

  // Fetch before/after cases from Sanity with optional service filter
  const cases = await getAllBeforeAfter(
    locale as Locale,
    serviceFilter ? { serviceSlug: serviceFilter } : undefined
  ) as SanityBeforeAfter[]

  // Fetch all services for filter buttons
  const services = await getAllServices(locale as Locale) as SanityService[]

  return (
    <GalleryPageContent
      cases={cases}
      currentFilter={serviceFilter}
      services={services}
    />
  )
}

async function GalleryPageContent({
  cases,
  services,
  currentFilter,
}: {
  cases: SanityBeforeAfter[]
  services: SanityService[]
  currentFilter: string | undefined
}) {
  const t = await getTranslations()

  // If no cases from Sanity, show placeholder
  if (!cases || cases.length === 0) {
    return <PlaceholderGalleryPage currentFilter={currentFilter} services={services} />
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('gallery.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {services && services.length > 0 && (
        <section className="py-8 bg-white border-b border-[var(--color-accent)]">
          <div className="container">
            <p className="text-body-sm text-muted mb-4">{t('gallery.filterBy')}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                  !currentFilter
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                }`}
                href="/galerie"
              >
                {t('gallery.allTreatments')}
              </Link>
              {services.map((service) => (
                <Link
                  key={service._id}
                  className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                    currentFilter === service.slug
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                  }`}
                  href={`/galerie?service=${service.slug}` as '/galerie'}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <GalleryCard key={caseItem._id} caseItem={caseItem} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('cta.title')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t('common.bookAppointment')}
              </Link>
              <a
                className="btn btn-lg btn-secondary flex items-center gap-2"
                href="tel:+40741199977"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Gallery Card Component
async function GalleryCard({ caseItem }: { caseItem: SanityBeforeAfter }) {
  const t = await getTranslations()

  return (
    <div className="card group overflow-hidden">
      {/* Image Comparison Preview */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
        {/* Split view - Before on left, After on right */}
        <div className="absolute inset-0 flex">
          {/* Before side */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {caseItem.beforeImage?.asset && (
              <Image
                fill
                alt={caseItem.beforeImage.alt || t('gallery.before')}
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
                src={urlFor(caseItem.beforeImage).width(300).height(225).quality(80).url()}
              />
            )}
            {/* Before label */}
            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs font-medium rounded">
              {t('gallery.before')}
            </span>
          </div>
          {/* After side */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {caseItem.afterImage?.asset && (
              <Image
                fill
                alt={caseItem.afterImage.alt || t('gallery.after')}
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
                src={urlFor(caseItem.afterImage).width(300).height(225).quality(80).url()}
              />
            )}
            {/* After label */}
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[var(--color-primary)] text-white text-xs font-medium rounded">
              {t('gallery.after')}
            </span>
          </div>
        </div>
        {/* Center divider */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/80 transform -translate-x-1/2 z-10" />

        {/* Featured badge */}
        {caseItem.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-[var(--color-primary)] text-white text-body-sm font-medium rounded-full z-20">
            {t('gallery.featured')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {/* Treatment Type Badge */}
        {caseItem.service && (
          <span className="inline-flex px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-primary)] text-body-sm font-medium rounded-full self-start mb-3">
            {caseItem.service.title}
          </span>
        )}

        {/* Title */}
        {caseItem.title && (
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            {caseItem.title}
          </h3>
        )}

        {/* Description */}
        {caseItem.description && (
          <p className="text-body-sm text-muted line-clamp-2 mb-3">
            {caseItem.description}
          </p>
        )}

        {/* Duration and Doctor */}
        <div className="flex items-center gap-4 text-body-sm text-muted mt-auto pt-3 border-t border-[var(--color-accent)]">
          {caseItem.treatmentDuration && (
            <span>{t('gallery.duration')}: {caseItem.treatmentDuration}</span>
          )}
          {caseItem.doctor && (
            <span>Dr. {caseItem.doctor.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Placeholder component when Sanity has no data
async function PlaceholderGalleryPage({
  services,
  currentFilter,
}: {
  services: SanityService[]
  currentFilter: string | undefined
}) {
  const t = await getTranslations()

  // If filtering and no results
  if (currentFilter) {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="gradient-hero">
          <div className="container section">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">{t('gallery.title')}</h1>
              <p className="text-body-lg text-muted max-w-2xl mx-auto">
                {t('gallery.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        {services && services.length > 0 && (
          <section className="py-8 bg-white border-b border-[var(--color-accent)]">
            <div className="container">
              <p className="text-body-sm text-muted mb-4">{t('gallery.filterBy')}</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  className="px-4 py-2 rounded-full text-body-sm font-medium bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)] transition-colors"
                  href="/galerie"
                >
                  {t('gallery.allTreatments')}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service._id}
                    className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                      currentFilter === service.slug
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                    }`}
                    href={`/galerie?service=${service.slug}` as '/galerie'}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* No Results Message */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center py-12">
              <p className="text-body-lg text-muted">{t('gallery.noCases')}</p>
              <Link className="btn btn-primary mt-6" href="/galerie">
                {t('gallery.allTreatments')}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[var(--color-accent)]">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
              <h2>{t('cta.title')}</h2>
              <p className="mt-4 text-muted text-body-lg">
                {t('cta.subtitle')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link className="btn btn-lg btn-primary" href="/contact">
                  {t('common.bookAppointment')}
                </Link>
                <a
                  className="btn btn-lg btn-secondary flex items-center gap-2"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  0741 199 977
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Placeholder cases
  const placeholderCases = [
    {
      key: 'case1',
      title: t('gallery.placeholder.case1.title'),
      treatment: t('gallery.placeholder.case1.treatment'),
      duration: t('gallery.placeholder.case1.duration'),
    },
    {
      key: 'case2',
      title: t('gallery.placeholder.case2.title'),
      treatment: t('gallery.placeholder.case2.treatment'),
      duration: t('gallery.placeholder.case2.duration'),
    },
    {
      key: 'case3',
      title: t('gallery.placeholder.case3.title'),
      treatment: t('gallery.placeholder.case3.treatment'),
      duration: t('gallery.placeholder.case3.duration'),
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('gallery.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderCases.map((caseItem) => (
              <div key={caseItem.key} className="card group overflow-hidden">
                {/* Placeholder Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[var(--color-accent-light)] flex items-center justify-center">
                  <Images className="w-16 h-16 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                  {/* Split line indicator */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50 transform -translate-x-1/2" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 text-white text-xs font-medium rounded">
                    {t('gallery.before')}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[var(--color-primary)]/70 text-white text-xs font-medium rounded">
                    {t('gallery.after')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  {/* Treatment Type Badge */}
                  <span className="inline-flex px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-primary)] text-body-sm font-medium rounded-full self-start mb-3">
                    {caseItem.treatment}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    {caseItem.title}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center gap-4 text-body-sm text-muted mt-auto pt-3 border-t border-[var(--color-accent)]">
                    <span>{t('gallery.duration')}: {caseItem.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('cta.title')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t('common.bookAppointment')}
              </Link>
              <a
                className="btn btn-lg btn-secondary flex items-center gap-2"
                href="tel:+40741199977"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
