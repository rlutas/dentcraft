import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  Star,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getFallbackServiceBySlug, getFallbackServiceSlugs, getMainFallbackServices } from '@/lib/fallback-services'
import type { fallbackServices } from '@/lib/fallback-services'
import { fallbackTeamMembers } from '@/lib/fallback-team'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getServiceBySlug, getServiceSlugs, getFAQs, type Locale } from '@/lib/sanity/queries'
import { generateDynamicPageMetadata, type Locale as SEOLocale, siteConfig } from '@/lib/seo'
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema as getFAQSchema } from '@/lib/schema'
import { hasServicePhoto, getServicePhotoPath } from '@/lib/service-photos'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GoogleReviewsSlider } from '@/components/features/GoogleReviewsSlider'
import googleReviewsData from '@/data/google-reviews.json'
import { ServiceHero } from '@/components/sections/ServiceHero'

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
      return <FallbackServicePageContent fallbackService={fallbackService} locale={locale as Locale} />
    }
    notFound()
  }

  return <ServicePageContent faqs={faqs} service={service} locale={locale as Locale} />
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

async function ServicePageContent({ faqs, service, locale }: { faqs: FAQ[]; service: Service; locale: Locale }) {
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
      <ServiceHero
        breadcrumbs={[
          { label: t('breadcrumbs.home'), href: '/' },
          { label: t('breadcrumbs.services'), href: '/servicii' },
          { label: service.title },
        ]}
        title={service.title}
        italicAccent={t('services.italicAccent')}
        subtitle={service.shortDescription ?? null}
        badgeLabel={t('services.heroLabel')}
        badgeIcon={ServiceIcon}
        priceMinLabel={service.priceRange ? `${service.priceRange.min} RON` : null}
        ctaPrimary={t('common.bookAppointment')}
        photoSrc={hasLocalPhoto ? localPhotoPath : service.heroImage ? urlFor(service.heroImage).width(1200).height(750).auto('format').url() : null}
        photoAlt={hasLocalPhoto || !service.heroImage ? t('services.photoAlt', { title: service.title }) : (service.heroImage.alt || t('services.photoAlt', { title: service.title }))}
        fallbackIcon={ServiceIcon}
      />

      <div id="service-content" />

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
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[#d4c4b0]/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e8e0d5] mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355] shadow-[0_2px_12px_rgba(139,115,85,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0]" />
                  {t('services.detail.whyChooseLabel')}
                </span>
                <AnimatedServiceHeading bold={t('services.detail.benefitsBold')} italic={t('services.detail.benefitsItalic')} />
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                  <div className="group relative bg-white border border-[#e8e0d5] rounded-3xl p-7 md:p-8 hover:border-[#d4c4b0] hover:shadow-[0_24px_60px_-16px_rgba(139,115,85,0.22)] hover:-translate-y-2 transition-all duration-500 ease-out h-full overflow-hidden">
                    <span className="absolute top-5 right-6 font-serif italic text-[#8b7355]/30 text-2xl leading-none select-none group-hover:text-[#8b7355]/50 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#faf6f1] to-[#f5f0e8] border border-[#e8e0d5] group-hover:from-[#d4c4b0]/30 group-hover:to-[#d4c4b0]/15 group-hover:border-[#d4c4b0] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                      <CheckCircle className="w-7 h-7 text-[#8b7355]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl md:text-[1.375rem] font-bold text-[#2a2118] mb-3 leading-tight tracking-tight group-hover:text-[#8b7355] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-[#5a5048] leading-relaxed">{benefit.description}</p>
                    <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#d4c4b0] via-[#8b7355] to-[#d4c4b0] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section — editorial timeline */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold={t('services.detail.processBold')} italic={t('services.detail.processItalic')} />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#e8e0d5]" aria-hidden="true" />
                <div className="space-y-6 md:space-y-8">
                  {service.process
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step, index) => (
                      <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                        <div className="group relative flex gap-5 md:gap-6">
                          <div className="relative z-10 w-12 h-12 rounded-full bg-[#2a2118] flex items-center justify-center text-white font-bold shrink-0 ring-4 ring-white group-hover:bg-[#8b7355] group-hover:scale-110 transition-all duration-500">
                            {step.stepNumber}
                          </div>
                          <div className="flex-1 bg-white border border-[#e8e0d5] rounded-2xl px-5 py-5 md:px-6 md:py-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] group-hover:border-[#d4c4b0] group-hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.15)] transition-all duration-500">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-3.5 h-3.5 text-[#8b7355]" strokeWidth={2} />
                              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">{t('services.step')} {step.stepNumber}</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] mb-2 leading-tight group-hover:text-[#8b7355] transition-colors">{step.title}</h3>
                            <p className="text-sm md:text-base text-[#5a5048] leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section — editorial (white) */}
      {faqs.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold={t('services.detail.faqBold')} italic={t('services.detail.faqItalic')} />
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <ScrollReveal key={faq._id} animation="fade-up" delay={idx * 60}>
                  <FAQAccordionItem answer={faq.answer} question={faq.question} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Doctor profile — E-E-A-T + internal linking */}
      <DoctorProfileSection />

      {/* Reviews — social proof from Google */}
      <ReviewsSection locale={locale} />

      {/* Servicii conexe — footer CTA banner closes the page */}
      <RelatedServicesSection currentSlug={service.slug} />

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
async function FallbackServicePageContent({ fallbackService, locale }: { fallbackService: typeof fallbackServices[number]; locale: Locale }) {
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
      <ServiceHero
        breadcrumbs={[
          { label: t('breadcrumbs.home'), href: '/' },
          { label: t('breadcrumbs.services'), href: '/servicii' },
          { label: t(`services.fallback.${fallbackService.titleKey}`) },
        ]}
        title={t(`services.fallback.${fallbackService.titleKey}`)}
        italicAccent={t('services.italicAccent')}
        subtitle={t(`services.fallback.${fallbackService.descriptionKey}`)}
        badgeLabel={t('services.heroLabel')}
        badgeIcon={fallbackService.iconPath ? null : ServiceIcon}
        badgeIconPath={fallbackService.iconPath ?? null}
        ctaPrimary={t('common.bookAppointment')}
        photoSrc={hasPhoto ? photoPath : null}
        photoAlt={t('services.photoAlt', { title: serviceName })}
        fallbackIcon={fallbackService.iconPath ? null : ServiceIcon}
        fallbackIconPath={fallbackService.iconPath ?? null}
      />

      <div id="service-content" />

      {/* Benefits Section — editorial */}
      {fallbackService.benefits && fallbackService.benefits.length > 0 && (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[#d4c4b0]/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e8e0d5] mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355] shadow-[0_2px_12px_rgba(139,115,85,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0]" />
                  {t('services.detail.whyChooseLabel')}
                </span>
                <AnimatedServiceHeading bold={t('services.detail.benefitsBold')} italic={t('services.detail.benefitsItalic')} />
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {fallbackService.benefits.map((benefit, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                  <div className="group relative bg-white border border-[#e8e0d5] rounded-3xl p-7 md:p-8 hover:border-[#d4c4b0] hover:shadow-[0_24px_60px_-16px_rgba(139,115,85,0.22)] hover:-translate-y-2 transition-all duration-500 ease-out h-full overflow-hidden">
                    {/* number top-right */}
                    <span className="absolute top-5 right-6 font-serif italic text-[#8b7355]/30 text-2xl leading-none select-none group-hover:text-[#8b7355]/50 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* icon */}
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#faf6f1] to-[#f5f0e8] border border-[#e8e0d5] group-hover:from-[#d4c4b0]/30 group-hover:to-[#d4c4b0]/15 group-hover:border-[#d4c4b0] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                      <CheckCircle className="w-7 h-7 text-[#8b7355]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl md:text-[1.375rem] font-bold text-[#2a2118] mb-3 leading-tight tracking-tight group-hover:text-[#8b7355] transition-colors">
                      {t(`services.fallback.${benefit.titleKey}`)}
                    </h3>
                    <p className="text-sm md:text-[15px] text-[#5a5048] leading-relaxed">{t(`services.fallback.${benefit.descriptionKey}`)}</p>
                    {/* bottom accent line that slides in on hover */}
                    <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#d4c4b0] via-[#8b7355] to-[#d4c4b0] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section — editorial timeline */}
      {fallbackService.process && fallbackService.process.length > 0 && (
        <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="text-center mb-14 md:mb-16">
              <AnimatedServiceHeading bold={t('services.detail.processBold')} italic={t('services.detail.processItalic')} />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#e8e0d5]" aria-hidden="true" />
                <div className="space-y-6 md:space-y-8">
                  {fallbackService.process.map((step, index) => (
                    <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                      <div className="group relative flex gap-5 md:gap-6">
                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#2a2118] flex items-center justify-center text-white font-bold shrink-0 ring-4 ring-white group-hover:bg-[#8b7355] group-hover:scale-110 transition-all duration-500">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1 bg-white border border-[#e8e0d5] rounded-2xl px-5 py-5 md:px-6 md:py-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] group-hover:border-[#d4c4b0] group-hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.15)] transition-all duration-500">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-3.5 h-3.5 text-[#8b7355]" strokeWidth={2} />
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">{t('services.step')} {step.stepNumber}</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] mb-2 leading-tight group-hover:text-[#8b7355] transition-colors">{t(`services.fallback.${step.titleKey}`)}</h3>
                          <p className="text-sm md:text-base text-[#5a5048] leading-relaxed">{t(`services.fallback.${step.descriptionKey}`)}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Doctor profile — E-E-A-T + internal linking */}
      <DoctorProfileSection />

      {/* Reviews — social proof from Google */}
      <ReviewsSection locale={locale} />

      {/* Servicii conexe — footer CTA banner closes the page */}
      <RelatedServicesSection currentSlug={fallbackService.slug} />

    </div>
  )
}

// ===== Shared section components for /servicii/[slug] =====

// Doctor profile — show Dr. Petric (coordinator) by default for trust + E-E-A-T
async function DoctorProfileSection() {
  const doctor = fallbackTeamMembers.find((m) => m.slug === 'razvan-petric')
  if (!doctor) return null
  const t = await getTranslations()

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8b7355]/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14 md:mb-16">
            <AnimatedServiceHeading bold={t('services.detail.doctorBold')} italic={t('services.detail.doctorItalic')} />
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-center">
              {/* Doctor photo */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 border border-[#d4c4b0]/30 rounded-full hidden lg:block" aria-hidden="true" />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#d4c4b0]/15 rounded-full blur-2xl hidden lg:block" aria-hidden="true" />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#f5f0e8] border border-[#e8e0d5] shadow-[0_30px_80px_-20px_rgba(139,115,85,0.25)]">
                  {doctor.photo && (
                    <Image
                      src={doctor.photo}
                      alt={t('team.profile.doctorPhotoAlt', { name: doctor.name, role: doctor.role })}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top"
                    />
                  )}
                </div>
              </div>

              {/* Doctor info */}
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355] mb-3">
                  {doctor.role}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-4 leading-tight tracking-tight">
                  {doctor.name}
                </h3>
                <p className="text-base md:text-lg text-[#5a5048] leading-relaxed mb-6">
                  {doctor.bio}
                </p>

                {doctor.specializations && doctor.specializations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {doctor.specializations.map((spec) => (
                      <span key={spec} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b7355] bg-[#faf6f1] border border-[#e8e0d5] rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {/* Quick stats */}
                {doctor.stats && (
                  <div className="flex items-center gap-6 mb-7 pb-6 border-b border-[#e8e0d5]">
                    {doctor.stats.yearsExperience && (
                      <div>
                        <div className="text-2xl font-bold text-[#2a2118] leading-none">
                          {doctor.stats.yearsExperience}+
                        </div>
                        <div className="text-[10px] mt-1 text-[#8b7355] uppercase tracking-[0.16em] font-semibold">
                          {t('services.detail.yearsExperience')}
                        </div>
                      </div>
                    )}
                    {doctor.stats.patientsCount && (
                      <div>
                        <div className="text-2xl font-bold text-[#2a2118] leading-none">
                          {doctor.stats.patientsCount}+
                        </div>
                        <div className="text-[10px] mt-1 text-[#8b7355] uppercase tracking-[0.16em] font-semibold">
                          {t('services.detail.patientsTreated')}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-2xl font-bold text-[#2a2118] leading-none flex items-baseline gap-1">
                        4.9
                        <Star className="w-4 h-4 fill-[#d4c4b0] text-[#d4c4b0]" />
                      </div>
                      <div className="text-[10px] mt-1 text-[#8b7355] uppercase tracking-[0.16em] font-semibold">
                        {t('services.detail.googleLabel')}
                      </div>
                    </div>
                  </div>
                )}

                <Link
                  href={{ pathname: '/echipa/[slug]', params: { slug: doctor.slug } }}
                  className="group inline-flex items-center px-7 py-3.5 bg-[#2a2118] text-white rounded-full text-sm md:text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300"
                >
                  <span>{t('services.detail.viewProfile')}</span>
                  <span aria-hidden="true" className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// Reviews — Google reviews marquee, mirrors the landing page section
async function ReviewsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations('services.detail')
  return (
    <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14 md:mb-16">
            <AnimatedServiceHeading bold={t('reviewsBold')} italic={t('reviewsItalic')} />
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal animation="fade-up" delay={150}>
        <GoogleReviewsSlider
          googleMapsUrl={googleReviewsData.googleMapsUrl}
          locale={locale}
          rating={googleReviewsData.rating}
          reviews={googleReviewsData.reviews}
          totalReviews={googleReviewsData.totalReviews}
        />
      </ScrollReveal>
    </section>
  )
}

// Servicii conexe — pull 3 other main services (excluding current) with the photo card pattern
async function RelatedServicesSection({ currentSlug }: { currentSlug: string }) {
  const t = await getTranslations()
  const all = getMainFallbackServices().filter((s) => s.slug !== currentSlug).slice(0, 3)
  if (all.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14 md:mb-16">
            <AnimatedServiceHeading bold={t('services.detail.relatedBold')} italic={t('services.detail.relatedItalic')} />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {all.map((service, index) => {
            const hasPhoto = hasServicePhoto(service.slug)
            const photoPath = getServicePhotoPath(service.slug) ?? ''
            return (
              <ScrollReveal key={service.slug} animation="fade-up" delay={index * 100}>
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  className="group relative block h-full overflow-hidden rounded-3xl bg-white border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:border-[#d4c4b0] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-[#faf6f1] overflow-hidden">
                    {hasPhoto ? (
                      <Image src={photoPath} alt={t('services.detail.relatedPhotoAlt', { title: t(`services.fallback.${service.titleKey}`) })} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60">
                        {service.iconPath ? (
                          <Image src={service.iconPath} alt="" width={80} height={80} className="w-20 h-20 opacity-30 group-hover:opacity-50 transition-opacity" />
                        ) : (
                          <service.Icon className="w-20 h-20 text-[#8b7355]/30" strokeWidth={1.25} />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-[#2a2118] mb-2 leading-tight group-hover:text-[#8b7355] transition-colors">
                      {t(`services.fallback.${service.titleKey}`)}
                    </h3>
                    <p className="text-[#5a5048] text-sm leading-relaxed mb-5 flex-1">
                      {t(`services.fallback.${service.descriptionKey}`)}
                    </p>
                    <span className="inline-flex items-center text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em] group-hover:text-[#2a2118] transition-colors">
                      <span>{t('common.learnMore')}</span>
                      <span aria-hidden="true" className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                      </span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

