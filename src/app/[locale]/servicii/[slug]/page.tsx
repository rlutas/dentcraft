import type { LucideIcon } from 'lucide-react'
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Phone,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getFallbackServiceBySlug, getFallbackServiceSlugs } from '@/lib/fallback-services'
import type { fallbackServices } from '@/lib/fallback-services'
import { BookingButton } from '@/components/ui/BookingButton'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getServiceBySlug, getServiceSlugs, getFAQs, type Locale } from '@/lib/sanity/queries'
import { generateDynamicPageMetadata, type Locale as SEOLocale, siteConfig } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema'
import { hasServicePhoto, getServicePhotoPath } from '@/lib/service-photos'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

// Service type based on Sanity schema
type Service = {
  _id: string
  title: string
  slug: string
  icon: string | null
  shortDescription: string | null
  description: Array<{ _type: string; [key: string]: unknown }> | null
  benefits: Array<{
    title: string
    description: string
  }> | null
  process: Array<{
    stepNumber: number
    title: string
    description: string
  }> | null
  heroImage: {
    asset: { _ref: string }
    alt?: string
  } | null
  priceRange: {
    min: number
    max: number
  } | null
  seo: {
    metaTitle: string | null
    metaDescription: string | null
    ogImage: { asset: { _ref: string } } | null
    noIndex: boolean
  } | null
}

// FAQ type
type FAQ = {
  _id: string
  question: string
  answer: Array<{ _type: string; [key: string]: unknown }>
  category: string
}

// Generate static paths for all services in all locales
export async function generateStaticParams() {
  const serviceSlugs = await getServiceSlugs()
  const fallbackSlugs = getFallbackServiceSlugs()

  // Combine Sanity slugs with fallback slugs (dedupe in case they overlap)
  const allSlugs = [...new Set([...serviceSlugs.map(s => s.slug), ...fallbackSlugs])]

  return routing.locales.flatMap((locale) =>
    allSlugs.map((slug) => ({
      locale,
      slug,
    }))
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const service = await getServiceBySlug(slug, locale as Locale) as Service | null
  const t = await getTranslations({ locale })

  // If no Sanity service, check for fallback service
  if (!service) {
    const fallbackService = getFallbackServiceBySlug(slug)
    if (fallbackService) {
      return generateDynamicPageMetadata({
        title: t(`services.fallback.${fallbackService.titleKey}`),
        description: t(`services.fallback.${fallbackService.descriptionKey}`),
        locale: locale as SEOLocale,
        path: '/servicii/[slug]',
        slug,
      })
    }
    return {}
  }

  // Build options object conditionally to avoid undefined values (exactOptionalPropertyTypes)
  const metadataOptions: Parameters<typeof generateDynamicPageMetadata>[0] = {
    title: service.title,
    locale: locale as SEOLocale,
    path: '/servicii/[slug]',
    slug,
    seo: service.seo,
    imageUrlBuilder: (img) => urlFor(img).width(1200).height(630).url(),
  }

  if (service.shortDescription) {
    metadataOptions.description = service.shortDescription
  }

  if (service.heroImage) {
    metadataOptions.fallbackImage = urlFor(service.heroImage).width(1200).height(630).url()
  }

  return generateDynamicPageMetadata(metadataOptions)
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [service, faqs] = await Promise.all([
    getServiceBySlug(slug, locale as Locale) as Promise<Service | null>,
    getFAQs(locale as Locale, { serviceSlug: slug }) as Promise<FAQ[]>,
  ])

  // If no Sanity service, check for fallback service
  if (!service) {
    const fallbackService = getFallbackServiceBySlug(slug)
    if (fallbackService) {
      return <FallbackServicePageContent fallbackService={fallbackService} />
    }
    notFound()
  }

  return <ServicePageContent faqs={faqs} service={service} />
}

// Get Lucide icon by name
function getIconByName(iconName: string | null): LucideIcon | null {
  if (!iconName) return null
  const icons = LucideIcons as Record<string, LucideIcon | unknown>
  const icon = icons[iconName]
  if (typeof icon === 'function') {
    return icon as LucideIcon
  }
  return null
}

async function ServicePageContent({ faqs, service }: { faqs: FAQ[]; service: Service }) {
  const t = await getTranslations()
  const ServiceIcon = getIconByName(service.icon)

  // Prefer local 3D medical photo over Sanity heroImage
  const hasLocalPhoto = hasServicePhoto(service.slug)
  const localPhotoPath = getServicePhotoPath(service.slug) ?? ''

  const serviceSchemaOptions: Parameters<typeof getServiceSchema>[0] = {
    serviceName: service.title,
    serviceDescription: service.shortDescription || service.title,
    serviceUrl: `${siteConfig.baseUrl}/servicii/${service.slug}`,
  }
  if (service.priceRange) {
    serviceSchemaOptions.priceRange = `${service.priceRange.min}-${service.priceRange.max} RON`
  }
  const serviceSchema = getServiceSchema(serviceSchemaOptions)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Dentcraft', url: siteConfig.baseUrl },
    { name: t('navigation.services'), url: `${siteConfig.baseUrl}/servicii` },
    { name: service.title, url: `${siteConfig.baseUrl}/servicii/${service.slug}` },
  ])

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section - photo driven */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf6f1] to-[#f5f0e8] pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

        <div className="container relative z-10">
          <nav className="flex items-center gap-3 mb-10 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-[#8b7355]/70 hover:text-[#2a2118] transition-colors">
              {t('breadcrumbs.home')}
            </Link>
            <span className="text-[#8b7355]/40">/</span>
            <Link href="/servicii" className="text-[#8b7355]/70 hover:text-[#2a2118] transition-colors">
              {t('breadcrumbs.services')}
            </Link>
            <span className="text-[#8b7355]/40">/</span>
            <span className="text-[#2a2118] font-medium">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            <div>
              {ServiceIcon && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5] mb-6">
                  <ServiceIcon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                  <span className="text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em]">
                    {t('services.heroLabel')}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2118] mb-6 leading-[1.1] tracking-tight">
                {service.title}
              </h1>

              {service.shortDescription && (
                <p className="text-lg md:text-xl text-[#5a5048] mb-8 leading-relaxed max-w-2xl">
                  {service.shortDescription}
                </p>
              )}

              {service.priceRange && (
                <div className="flex items-center gap-3 mb-8 text-[#5a5048]">
                  <span className="font-semibold text-lg">
                    {service.priceRange.min} - {service.priceRange.max} RON
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <BookingButton>
                  {t('common.bookAppointment')}
                </BookingButton>
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#e8e0d5] text-[#2a2118] font-semibold hover:bg-[#faf6f1] hover:border-[#d4c4b0] transition-colors"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  0741 199 977
                </a>
              </div>
            </div>

            {/* Hero Image: prefer local 3D photo, fallback to Sanity heroImage, then icon */}
            <div className="relative">
              {hasLocalPhoto ? (
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#faf6f1] shadow-[0_30px_80px_-20px_rgba(139,115,85,0.25)] border border-[#e8e0d5]">
                  <Image
                    fill
                    priority
                    alt={service.title}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    src={localPhotoPath}
                  />
                </div>
              ) : service.heroImage ? (
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(139,115,85,0.25)] border border-[#e8e0d5]">
                  <Image
                    fill
                    priority
                    alt={service.heroImage.alt || service.title}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    src={urlFor(service.heroImage).width(1200).height(750).auto('format').url()}
                  />
                </div>
              ) : ServiceIcon ? (
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60 flex items-center justify-center border border-[#e8e0d5]">
                  <ServiceIcon className="w-32 h-32 text-[#8b7355]/30" strokeWidth={1} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {service.description && service.description.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <PortableTextRenderer content={service.description} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2>Beneficii</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="card">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-[var(--color-success)]" strokeWidth={1.5} />
                  </div>
                  <h4 className="mb-3">{benefit.title}</h4>
                  <p className="text-body-sm text-muted">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2>Procesul de tratament</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

                {/* Steps */}
                <div className="space-y-8">
                  {service.process
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step, index) => (
                      <div key={index} className="relative flex gap-6">
                        {/* Step number */}
                        <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold shrink-0">
                          {step.stepNumber}
                        </div>

                        {/* Step content */}
                        <div className="card flex-1 !py-5">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-4 h-4 text-[var(--color-secondary)]" strokeWidth={1.5} />
                            <span className="text-body-sm text-muted">Pasul {step.stepNumber}</span>
                          </div>
                          <h4 className="mb-2">{step.title}</h4>
                          <p className="text-body-sm text-muted">{step.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2>Intrebari frecvente</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <FAQAccordionItem key={faq._id} answer={faq.answer} question={faq.question} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

// Simple Portable Text Renderer for description
function PortableTextRenderer({ content }: { content: Array<{ _type: string; [key: string]: unknown }> }) {
  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        if (block._type === 'block') {
          const style = (block['style'] as string) || 'normal'
          const children = block['children'] as Array<{ text: string; marks?: string[] }> | undefined
          const text = children?.map((child) => child.text).join('') || ''

          if (style === 'h2') {
            return <h2 key={index} className="!mt-8">{text}</h2>
          }
          if (style === 'h3') {
            return <h3 key={index} className="!mt-6">{text}</h3>
          }
          if (style === 'h4') {
            return <h4 key={index} className="!mt-4">{text}</h4>
          }
          if (style === 'blockquote') {
            return (
              <blockquote key={index} className="border-l-4 border-[var(--color-accent)] pl-4 italic text-muted">
                {text}
              </blockquote>
            )
          }
          return <p key={index}>{text}</p>
        }
        return null
      })}
    </div>
  )
}

// FAQ Accordion Item Component (client-side interaction needed in future)
function FAQAccordionItem({ question, answer }: { question: string; answer: Array<{ _type: string; [key: string]: unknown }> }) {
  // For now, display as static expanded items
  // A proper Accordion component will be created in US-018
  const answerText = answer
    .filter((block) => block._type === 'block')
    .map((block) => {
      const children = block['children'] as Array<{ text: string }> | undefined
      return children?.map((child) => child.text).join('') || ''
    })
    .join(' ')

  return (
    <details className="card group">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <h4 className="pr-4">{question}</h4>
        <ChevronDown className="w-5 h-5 text-[var(--color-secondary)] transition-transform group-open:rotate-180" strokeWidth={1.5} />
      </summary>
      <p className="mt-4 text-muted">{answerText}</p>
    </details>
  )
}

// Fallback service page content when Sanity has no data
async function FallbackServicePageContent({ fallbackService }: { fallbackService: typeof fallbackServices[number] }) {
  const t = await getTranslations()
  const ServiceIcon = fallbackService.Icon

  const hasPhoto = hasServicePhoto(fallbackService.slug)
  const photoPath = getServicePhotoPath(fallbackService.slug) ?? ''

  const serviceName = t(`services.fallback.${fallbackService.titleKey}`)
  const serviceDescription = t(`services.fallback.${fallbackService.descriptionKey}`)
  const serviceSchema = getServiceSchema({
    serviceName,
    serviceDescription,
    serviceUrl: `${siteConfig.baseUrl}/servicii/${fallbackService.slug}`,
  })
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Dentcraft', url: siteConfig.baseUrl },
    { name: t('navigation.services'), url: `${siteConfig.baseUrl}/servicii` },
    { name: serviceName, url: `${siteConfig.baseUrl}/servicii/${fallbackService.slug}` },
  ])

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section - photo driven */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf6f1] to-[#f5f0e8] pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 mb-10 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-[#8b7355]/70 hover:text-[#2a2118] transition-colors">
              {t('breadcrumbs.home')}
            </Link>
            <span className="text-[#8b7355]/40">/</span>
            <Link href="/servicii" className="text-[#8b7355]/70 hover:text-[#2a2118] transition-colors">
              {t('breadcrumbs.services')}
            </Link>
            <span className="text-[#8b7355]/40">/</span>
            <span className="text-[#2a2118] font-medium">{t(`services.fallback.${fallbackService.titleKey}`)}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5] mb-6">
                {fallbackService.iconPath ? (
                  <Image
                    alt=""
                    className="w-5 h-5"
                    height={20}
                    src={fallbackService.iconPath}
                    width={20}
                  />
                ) : (
                  <ServiceIcon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                )}
                <span className="text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em]">
                  {t('services.heroLabel')}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2118] mb-6 leading-[1.1] tracking-tight">
                {t(`services.fallback.${fallbackService.titleKey}`)}
              </h1>

              <p className="text-lg md:text-xl text-[#5a5048] mb-8 leading-relaxed max-w-2xl">
                {t(`services.fallback.${fallbackService.descriptionKey}`)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <BookingButton>
                  {t('common.bookAppointment')}
                </BookingButton>
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#e8e0d5] text-[#2a2118] font-semibold hover:bg-[#faf6f1] hover:border-[#d4c4b0] transition-colors"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  0741 199 977
                </a>
              </div>
            </div>

            {/* Photo or placeholder */}
            <div className="relative">
              {hasPhoto ? (
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#faf6f1] shadow-[0_30px_80px_-20px_rgba(139,115,85,0.25)] border border-[#e8e0d5]">
                  <Image
                    src={photoPath}
                    alt={serviceName}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60 flex items-center justify-center border border-[#e8e0d5]">
                  {fallbackService.iconPath ? (
                    <Image
                      alt=""
                      className="w-32 h-32 opacity-30"
                      height={128}
                      src={fallbackService.iconPath}
                      width={128}
                    />
                  ) : (
                    <ServiceIcon className="w-32 h-32 text-[#8b7355]/30" strokeWidth={1} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {fallbackService.benefits && fallbackService.benefits.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2>{t('services.benefits')}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallbackService.benefits.map((benefit, index) => (
                <div key={index} className="card">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-[var(--color-success)]" strokeWidth={1.5} />
                  </div>
                  <h4 className="mb-3">{t(`services.fallback.${benefit.titleKey}`)}</h4>
                  <p className="text-body-sm text-muted">{t(`services.fallback.${benefit.descriptionKey}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {fallbackService.process && fallbackService.process.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2>{t('services.process')}</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

                {/* Steps */}
                <div className="space-y-8">
                  {fallbackService.process.map((step, index) => (
                    <div key={index} className="relative flex gap-6">
                      {/* Step number */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold shrink-0">
                        {step.stepNumber}
                      </div>

                      {/* Step content */}
                      <div className="card flex-1 !py-5">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-4 h-4 text-[var(--color-secondary)]" strokeWidth={1.5} />
                          <span className="text-body-sm text-muted">{t('services.step')} {step.stepNumber}</span>
                        </div>
                        <h4 className="mb-2">{t(`services.fallback.${step.titleKey}`)}</h4>
                        <p className="text-body-sm text-muted">{t(`services.fallback.${step.descriptionKey}`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
