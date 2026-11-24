import { ArrowUpRight, Play, Quote, Star, User } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import googleReviews from '@/data/google-reviews.json'
import { GoogleGMark, STAR_GOLD } from '@/components/features/GoogleReviewsSlider/ReviewCard'
import { ReviewsGrid } from '@/components/features/GoogleReviewsSlider/ReviewsGrid'
import { EditorialHeading } from '@/components/ui/EditorialHeading'
import { FloatingIcons } from '@/components/ui/FloatingIcons'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import { getAllServices, getAllTestimonials, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'

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

  return generatePageMetadata({
    title: t('testimonials.metaTitle'),
    description: t('testimonials.metaDescription'),
    locale: locale as SEOLocale,
    path: '/testimoniale',
  })
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
            <EditorialHeading as="h1" bold={t('testimonials.titleBold')} className="mb-6" italic={t('testimonials.titleItalic')} size="hero" />
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
                ? 'text-[#c39a4a] fill-[#c39a4a]'
                : 'text-[#e8e0d5]'
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

// Shown when Sanity has no testimonials: real Google reviews
async function PlaceholderTestimonialsPage({
  services,
  currentFilter,
}: {
  services: SanityService[]
  currentFilter: string | undefined
}) {
  const t = await getTranslations()

  const locale = (await getLocale()) as 'ro' | 'en' | 'hu'
  // Real Google reviews (verbatim), synced in src/data/google-reviews.json
  const reviews = googleReviews.reviews.filter((r) => r.text.ro.trim().length > 0)

  // If filtering and no results
  if (currentFilter) {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="gradient-hero">
          <div className="container section">
            <div className="max-w-3xl mx-auto text-center">
              <EditorialHeading as="h1" bold={t('testimonials.titleBold')} className="mb-6" italic={t('testimonials.titleItalic')} size="hero" />
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

      </div>
    )
  }

  // Editorial highlight: one mid-length review set large (verbatim, never trimmed);
  // it is left out of the grid below so it doesn't appear twice.
  const featured = reviews.find((r) => r.text[locale].length >= 160 && r.text[locale].length <= 320) ?? reviews[0]
  const gridReviews = featured ? reviews.filter((r) => r.id !== featured.id) : reviews
  const ratingLabel = googleReviews.rating.toFixed(1).replace('.', locale === 'en' ? '.' : ',')

  return (
    <div className="flex flex-col">
      {/* Hero — same light editorial treatment as /echipa and /servicii */}
      <section className="relative overflow-hidden bg-[#faf6f1] py-20 md:py-28">
        <div className="absolute top-28 right-0 w-96 h-96 bg-[#d4c4b0]/15 rounded-full blur-3xl translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <EditorialHeading as="h1" bold={t('testimonials.titleBold')} italic={t('testimonials.titleItalic')} size="hero" />
            <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed mt-4">
              {t('testimonials.subtitle')}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5]">
              <GoogleGMark className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                {t('testimonials.badge')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Rating + highlighted review */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <FloatingIcons
          icons={[
            { src: '/icons/010-smile.svg', className: 'top-6 right-3 w-12 h-12 md:top-10 md:right-10 md:w-20 md:h-20 lg:right-20 lg:w-24 lg:h-24', variant: 'driftA', duration: 28, opacity: 0.1 },
            { src: '/icons/008-white-teeth.svg', className: 'bottom-6 left-3 w-12 h-12 md:bottom-10 md:left-10 md:w-20 md:h-20 lg:left-16 lg:w-24 lg:h-24', variant: 'driftC', duration: 26, delay: 2, opacity: 0.1 },
          ]}
        />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Rating summary */}
            <div className="text-center lg:text-left">
              <p className="font-serif italic text-[#8b7355] leading-none text-[6.5rem] md:text-[8rem] tracking-tight">{ratingLabel}</p>
              <div aria-hidden="true" className="mt-4 flex gap-1 justify-center lg:justify-start">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="w-5 h-5" fill={STAR_GOLD} stroke={STAR_GOLD} strokeWidth={1.25} />
                ))}
              </div>
              <p className="mt-4 text-base md:text-lg text-[#2a2118] font-medium">
                {t('testimonials.googleSummary', { count: googleReviews.totalReviews })}
              </p>
              <a
                className="group mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#e8e0d5] bg-white px-6 py-3 text-sm font-semibold text-[#2a2118] transition-all duration-300 hover:border-[#d4c4b0] hover:shadow-[0_10px_40px_-10px_rgba(139,115,85,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2"
                href={googleReviews.googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GoogleGMark className="w-4 h-4 shrink-0" />
                {t('testimonials.googleCta')}
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-[#8b7355] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </a>
            </div>

            {/* Highlighted review — verbatim */}
            {featured && (
              <figure className="relative rounded-3xl bg-[#faf6f1] border border-[#e8e0d5] p-8 pt-14 md:p-12 md:pt-16">
                <span aria-hidden="true" className="absolute top-2 left-7 md:left-11 font-serif italic text-[#d4c4b0] text-[6rem] leading-none select-none">&ldquo;</span>
                <blockquote className="relative font-serif italic text-[#2a2118] text-lg md:text-2xl leading-relaxed whitespace-pre-line">
                  {featured.text[locale]}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-10 shrink-0 bg-[#8b7355]" />
                  <span className="text-sm">
                    <span className="font-semibold text-[#2a2118]">{featured.author}</span>
                    <span className="text-[#8b7355]"> · {t('testimonials.googleReviewOn', { date: featured.date[locale] })}</span>
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* All reviews — masonry on cream, 12 at a time */}
      <section className="relative overflow-hidden bg-[#faf6f1] py-20 md:py-28 border-t border-[#f0ebe3]">
        <FloatingIcons
          icons={[
            { src: '/icons/016-dentist-3.svg', className: 'top-6 left-3 w-14 h-14 md:top-10 md:left-10 md:w-24 md:h-24 lg:left-16 lg:w-28 lg:h-28', variant: 'driftB', duration: 28, opacity: 0.09 },
            { src: '/icons/022-dental-care-1.svg', className: 'top-1/2 right-3 w-12 h-12 md:right-8 md:w-20 md:h-20 lg:right-12 lg:w-24 lg:h-24', variant: 'driftA', duration: 30, delay: 3, opacity: 0.09 },
            { src: '/icons/009-teeth.svg', className: 'bottom-6 left-4 w-14 h-14 md:bottom-12 md:left-12 md:w-20 md:h-20 lg:left-20 lg:w-24 lg:h-24', variant: 'driftC', duration: 26, delay: 5, opacity: 0.09 },
          ]}
        />
        <div className="container relative z-10">
          <h2 className="sr-only">{t('testimonials.title')}</h2>
          <ReviewsGrid
            locale={locale}
            metaById={Object.fromEntries(
              gridReviews.map((review) => [review.id, t('testimonials.googleReviewOn', { date: review.date[locale] })])
            )}
            reviews={gridReviews}
            showMoreLabel={t('testimonials.showMore')}
            shownTemplate={t.raw('testimonials.shownCount') as string}
          />
          <p className="text-sm text-[#8b7355] text-center mt-6">{t('testimonials.googleNote')}</p>
        </div>
      </section>
    </div>
  )
}
