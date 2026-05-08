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
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema as getFAQSchema } from '@/lib/schema'
import { hasServicePhoto, getServicePhotoPath } from '@/lib/service-photos'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'

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
    { name: t('breadcrumbs.home'), url: siteConfig.baseUrl },
    { name: t('navigation.services'), url: `${siteConfig.baseUrl}/servicii` },
    { name: service.title, url: `${siteConfig.baseUrl}/servicii/${service.slug}` },
  ])

  // FAQ schema — emit only when there are FAQs (huge SEO win for AI/rich snippets)
  const faqSchema = faqs.length > 0
    ? getFAQSchema(faqs.map((f) => ({
        question: f.question,
        answer: f.answer
          .filter((b) => b._type === 'block')
          .map((b) => {
            const children = b['children'] as Array<{ text: string }> | undefined
            return children?.map((c) => c.text).join('') || ''
          })
          .join(' '),
      })))
    : null

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <PortableTextRenderer content={service.description} />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section — editorial */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold="Beneficii" italic="reale" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="group bg-white border border-[#e8e0d5] rounded-3xl p-7 hover:border-[#d4c4b0] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)] hover:-translate-y-1.5 transition-all duration-500 ease-out">
                  <div className="w-12 h-12 rounded-xl bg-[#faf6f1] border border-[#e8e0d5] group-hover:bg-[#d4c4b0]/30 group-hover:border-[#d4c4b0] flex items-center justify-center mb-5 transition-colors duration-500">
                    <CheckCircle className="w-6 h-6 text-[#8b7355]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] mb-2 leading-tight group-hover:text-[#8b7355] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#5a5048] leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section — editorial timeline */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold="Procesul" italic="tratamentului" />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#e8e0d5]" aria-hidden="true" />
                <div className="space-y-6 md:space-y-8">
                  {service.process
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step, index) => (
                      <div key={index} className="relative flex gap-5 md:gap-6">
                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#2a2118] flex items-center justify-center text-white font-bold shrink-0 ring-4 ring-white">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1 bg-white border border-[#e8e0d5] rounded-2xl px-5 py-5 md:px-6 md:py-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-3.5 h-3.5 text-[#8b7355]" strokeWidth={2} />
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">Pasul {step.stepNumber}</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] mb-2 leading-tight">{step.title}</h3>
                          <p className="text-sm md:text-base text-[#5a5048] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section — editorial */}
      {faqs.length > 0 && (
        <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold="Întrebări" italic="frecvente" />
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
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
    <details className="group bg-white border border-[#e8e0d5] rounded-2xl px-5 py-5 md:px-6 md:py-5 hover:border-[#d4c4b0] transition-colors duration-300">
      <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
        <h3 className="text-base md:text-lg font-semibold text-[#2a2118] pr-2 leading-tight group-hover:text-[#8b7355] transition-colors">{question}</h3>
        <ChevronDown className="w-5 h-5 text-[#8b7355] transition-transform duration-300 group-open:rotate-180 shrink-0" strokeWidth={2} />
      </summary>
      <p className="mt-4 text-sm md:text-base text-[#5a5048] leading-relaxed">{answerText}</p>
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
    { name: t('breadcrumbs.home'), url: siteConfig.baseUrl },
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

      {/* Benefits Section — editorial */}
      {fallbackService.benefits && fallbackService.benefits.length > 0 && (
        <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold="Beneficii" italic="reale" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {fallbackService.benefits.map((benefit, index) => (
                <div key={index} className="group bg-white border border-[#e8e0d5] rounded-3xl p-7 hover:border-[#d4c4b0] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)] hover:-translate-y-1.5 transition-all duration-500 ease-out">
                  <div className="w-12 h-12 rounded-xl bg-[#faf6f1] border border-[#e8e0d5] group-hover:bg-[#d4c4b0]/30 group-hover:border-[#d4c4b0] flex items-center justify-center mb-5 transition-colors duration-500">
                    <CheckCircle className="w-6 h-6 text-[#8b7355]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] mb-2 leading-tight group-hover:text-[#8b7355] transition-colors">
                    {t(`services.fallback.${benefit.titleKey}`)}
                  </h3>
                  <p className="text-sm text-[#5a5048] leading-relaxed">{t(`services.fallback.${benefit.descriptionKey}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section — editorial timeline */}
      {fallbackService.process && fallbackService.process.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold="Procesul" italic="tratamentului" />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#e8e0d5]" aria-hidden="true" />
                <div className="space-y-6 md:space-y-8">
                  {fallbackService.process.map((step, index) => (
                    <div key={index} className="relative flex gap-5 md:gap-6">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#2a2118] flex items-center justify-center text-white font-bold shrink-0 ring-4 ring-white">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1 bg-white border border-[#e8e0d5] rounded-2xl px-5 py-5 md:px-6 md:py-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-3.5 h-3.5 text-[#8b7355]" strokeWidth={2} />
                          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">{t('services.step')} {step.stepNumber}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] mb-2 leading-tight">{t(`services.fallback.${step.titleKey}`)}</h3>
                        <p className="text-sm md:text-base text-[#5a5048] leading-relaxed">{t(`services.fallback.${step.descriptionKey}`)}</p>
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
