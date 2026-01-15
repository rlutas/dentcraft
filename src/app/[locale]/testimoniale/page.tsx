import { Phone, Play, Quote, Star, User } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import { getAllServices, getAllTestimonials, type Locale } from '@/lib/sanity/queries'

// Testimonial type based on Sanity schema
type SanityTestimonial = {
  _id: string
  patientName: string
  patientPhoto: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  } | null
  rating: number
  text: string | null
  videoUrl: string | null
  videoFile: {
    asset: {
      url: string
    }
  } | null
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
  featured: boolean
  date: string | null
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
    title: t('testimonials.title'),
    description: t('testimonials.subtitle'),
  }
}

export default async function TestimonialsPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  setRequestLocale(locale)

  // Get service filter from URL params
  const serviceFilter = typeof resolvedSearchParams['service'] === 'string'
    ? resolvedSearchParams['service']
    : undefined

  // Fetch testimonials from Sanity with optional service filter
  const testimonials = await getAllTestimonials(
    locale as Locale,
    serviceFilter ? { serviceSlug: serviceFilter } : undefined
  ) as SanityTestimonial[]

  // Fetch all services for filter buttons
  const services = await getAllServices(locale as Locale) as SanityService[]

  return (
    <TestimonialsPageContent
      currentFilter={serviceFilter}
      services={services}
      testimonials={testimonials}
    />
  )
}

async function TestimonialsPageContent({
  testimonials,
  services,
  currentFilter,
}: {
  testimonials: SanityTestimonial[]
  services: SanityService[]
  currentFilter: string | undefined
}) {
  const t = await getTranslations()

  // If no testimonials from Sanity, show placeholder
  if (!testimonials || testimonials.length === 0) {
    return <PlaceholderTestimonialsPage currentFilter={currentFilter} services={services} />
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('testimonials.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {services && services.length > 0 && (
        <section className="py-8 bg-white border-b border-[var(--color-accent)]">
          <div className="container">
            <p className="text-body-sm text-muted mb-4">{t('testimonials.filterBy')}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                  !currentFilter
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                }`}
                href="/testimoniale"
              >
                {t('testimonials.allTreatments')}
              </Link>
              {services.map((service) => (
                <Link
                  key={service._id}
                  className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                    currentFilter === service.slug
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                  }`}
                  href={`/testimoniale?service=${service.slug}` as '/testimoniale'}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
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

// Testimonial Card Component
async function TestimonialCard({ testimonial }: { testimonial: SanityTestimonial }) {
  const t = await getTranslations()
  const hasVideo = testimonial.videoUrl || testimonial.videoFile?.asset?.url

  return (
    <div className="card flex flex-col h-full">
      {/* Video Overlay (if video testimonial) */}
      {hasVideo && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-[var(--color-accent-light)] group">
          {testimonial.patientPhoto?.asset ? (
            <Image
              fill
              alt={testimonial.patientPhoto.alt || testimonial.patientName}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={urlFor(testimonial.patientPhoto).width(400).height(225).quality(80).url()}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-accent)]">
              <User className="w-16 h-16 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
            </div>
          )}
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <a
              aria-label={t('testimonials.playVideo')}
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
              href={testimonial.videoUrl || testimonial.videoFile?.asset?.url || '#'}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Play className="w-7 h-7 text-[var(--color-primary)] ml-1" fill="currentColor" />
            </a>
          </div>
          {/* Video Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-body-sm font-medium">
            {t('testimonials.videoTestimonial')}
          </span>
        </div>
      )}

      {/* Quote Icon */}
      {!hasVideo && (
        <Quote className="w-10 h-10 text-[var(--color-primary)] opacity-20 mb-4" strokeWidth={1} />
      )}

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      {testimonial.text && (
        <p className="text-body text-[var(--color-text)] mb-4 flex-grow">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      )}

      {/* Patient Info */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--color-accent)]">
        {!hasVideo && testimonial.patientPhoto?.asset ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              fill
              alt={testimonial.patientPhoto.alt || testimonial.patientName}
              className="object-cover"
              sizes="48px"
              src={urlFor(testimonial.patientPhoto).width(48).height(48).quality(80).url()}
            />
          </div>
        ) : !hasVideo ? (
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
            <User className="w-6 h-6 text-[var(--color-primary)] opacity-50" strokeWidth={1.5} />
          </div>
        ) : null}
        <div>
          <p className="font-semibold text-[var(--color-text)]">{testimonial.patientName}</p>
          {testimonial.service && (
            <p className="text-body-sm text-muted">
              {testimonial.service.title}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Placeholder component when Sanity has no data
async function PlaceholderTestimonialsPage({
  services,
  currentFilter,
}: {
  services: SanityService[]
  currentFilter: string | undefined
}) {
  const t = await getTranslations()

  const placeholderTestimonials = [
    {
      key: 'testimonial1',
      patientName: 'Maria P.',
      rating: 5,
      text: t('testimonials.quotes.1'),
      treatment: t('testimonials.treatments.veneers'),
    },
    {
      key: 'testimonial2',
      patientName: 'Andrei M.',
      rating: 5,
      text: t('testimonials.quotes.2'),
      treatment: t('testimonials.treatments.implant'),
    },
    {
      key: 'testimonial3',
      patientName: 'Elena S.',
      rating: 5,
      text: t('testimonials.quotes.3'),
      treatment: t('testimonials.treatments.whitening'),
    },
  ]

  // If filtering and no results
  if (currentFilter) {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="gradient-hero">
          <div className="container section">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">{t('testimonials.title')}</h1>
              <p className="text-body-lg text-muted max-w-2xl mx-auto">
                {t('testimonials.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        {services && services.length > 0 && (
          <section className="py-8 bg-white border-b border-[var(--color-accent)]">
            <div className="container">
              <p className="text-body-sm text-muted mb-4">{t('testimonials.filterBy')}</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  className="px-4 py-2 rounded-full text-body-sm font-medium bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)] transition-colors"
                  href="/testimoniale"
                >
                  {t('testimonials.allTreatments')}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service._id}
                    className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                      currentFilter === service.slug
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                    }`}
                    href={`/testimoniale?service=${service.slug}` as '/testimoniale'}
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
              <p className="text-body-lg text-muted">{t('testimonials.noTestimonials')}</p>
              <Link className="btn btn-primary mt-6" href="/testimoniale">
                {t('testimonials.allTreatments')}
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('testimonials.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderTestimonials.map((testimonial) => (
              <div key={testimonial.key} className="card flex flex-col h-full">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-[var(--color-primary)] opacity-20 mb-4" strokeWidth={1} />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-body text-[var(--color-text)] mb-4 flex-grow">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Patient Info */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--color-accent)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                    <User className="w-6 h-6 text-[var(--color-primary)] opacity-50" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">{testimonial.patientName}</p>
                    <p className="text-body-sm text-muted">
                      {testimonial.treatment}
                    </p>
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
