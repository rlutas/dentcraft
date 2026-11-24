import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Check,
  Clock,
  Gem,
  HeartPulse,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getFallbackServiceBySlug, getFallbackServiceSlugs, getMainFallbackServices, SERVICE_OG_SLUGS } from '@/lib/fallback-services'
import type { fallbackServices } from '@/lib/fallback-services'
import { fallbackTeamMembers } from '@/lib/fallback-team'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getServiceBySlug, getServiceSlugs, getFAQs, type Locale } from '@/lib/sanity/queries'
import { generateDynamicPageMetadata, type Locale as SEOLocale, siteConfig } from '@/lib/seo'
import { getServiceSeoOverride } from '@/lib/seo-overrides'
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema as getFAQSchema } from '@/lib/schema'
import { ServiceLocalSeo } from '@/components/sections/ServiceLocalSeo'
import { hasServicePhoto, getServicePhotoPath } from '@/lib/service-photos'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GoogleReviewsSlider } from '@/components/features/GoogleReviewsSlider'
import googleReviewsData from '@/data/google-reviews.json'
import { ServiceHero } from '@/components/sections/ServiceHero'
import { ServiceFaqAccordion } from '@/components/sections/ServiceFaqAccordion'
import { ServiceProcessTimeline } from '@/components/sections/ServiceProcessTimeline'
import { getServiceLocalSeoContent } from '@/components/sections/ServiceLocalSeo'
import { translateTeamRole } from '@/lib/translate-team-role'
import {
  CLINIC_ADDRESS,
  CLINIC_PHONE_DISPLAY,
  CLINIC_PHONE_TEL,
  DEFAULT_SERVICE_DOCTOR,
  getServiceContent,
  getServiceContentLabels,
  getServiceDoctorSlugs,
  shouldHideLegacyBlocks,
  showsContactCallout,
  type ServiceContentLocale,
} from '@/lib/service-content'

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

  // Local-SEO override (city + price intent) — wins over generic CMS/fallback meta
  const seoOverride = getServiceSeoOverride(slug, locale)

  // If no Sanity service, check for fallback service
  if (!service) {
    const fallbackService = getFallbackServiceBySlug(slug)
    if (fallbackService) {
      return generateDynamicPageMetadata({
        title: seoOverride?.metaTitle ?? t(`services.fallback.${fallbackService.titleKey}`),
        description: seoOverride?.metaDescription ?? t(`services.fallback.${fallbackService.descriptionKey}`),
        locale: locale as SEOLocale,
        path: '/servicii/[slug]',
        slug,
        ...(SERVICE_OG_SLUGS.has(slug) ? { fallbackImage: `/images/og/services/${slug}.jpg` } : {}),
      })
    }
    return {}
  }

  // Build options object conditionally to avoid undefined values (exactOptionalPropertyTypes)
  // When a local-SEO override exists it wins over the generic CMS meta fields.
  const metadataOptions: Parameters<typeof generateDynamicPageMetadata>[0] = {
    title: seoOverride?.metaTitle ?? service.title,
    locale: locale as SEOLocale,
    path: '/servicii/[slug]',
    slug,
    seo: seoOverride
      ? {
          ...service.seo,
          metaTitle: seoOverride.metaTitle,
          metaDescription: seoOverride.metaDescription,
          ogImage: service.seo?.ogImage ?? null,
          noIndex: service.seo?.noIndex ?? false,
        }
      : service.seo,
    imageUrlBuilder: (img) => urlFor(img).width(1200).height(630).url(),
  }

  if (seoOverride) {
    metadataOptions.description = seoOverride.metaDescription
  } else if (service.shortDescription) {
    metadataOptions.description = service.shortDescription
  }

  // CMS seo.ogImage wins (handled in generateDynamicPageMetadata); otherwise prefer the
  // branded share card (scripts/generate-service-og.py), then the CMS hero image.
  if (SERVICE_OG_SLUGS.has(slug)) {
    metadataOptions.fallbackImage = `/images/og/services/${slug}.jpg`
  } else if (service.heroImage) {
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
  // One FAQ section + one FAQPage schema: CMS FAQs merged with the local-SEO FAQs
  const cmsFaqItems = mergeFaqs(
    faqs.map((f) => ({ question: f.question, answer: portableToText(f.answer) })),
    getServiceLocalSeoContent(service.slug, locale)?.faqs ?? [],
  )
  const faqSchema = cmsFaqItems.length > 0 ? getFAQSchema(cmsFaqItems) : null

  const showBenefits = Boolean(service.benefits && service.benefits.length > 0)
  const showProcess = Boolean(service.process && service.process.length > 0)
  // White / cream alternation, like the homepage — computed from the sections actually rendered
  const tones = alternateTones([
    ['description', Boolean(service.description && service.description.length > 0)],
    ['benefits', showBenefits],
    ['process', showProcess],
    ['localSeo', Boolean(getServiceLocalSeoContent(service.slug, locale))],
    ['faq', cmsFaqItems.length > 0],
    ['doctor', true],
    ['reviews', true],
    ['related', true],
  ])

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
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl mx-auto prose prose-lg">
                <PortableTextRenderer content={service.description} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Benefits + process — shared editorial blocks (same as fallback path) */}
      {showBenefits && service.benefits && (
        <BenefitsSection
          tone={tones.benefits ?? 'white'}
          items={service.benefits.map((b) => ({ title: b.title, description: b.description }))}
        />
      )}
      {showProcess && service.process && (
        <ProcessSection
          tone={tones.process ?? 'white'}
          steps={[...service.process]
            .sort((x, y) => x.stepNumber - y.stepNumber)
            .map((st) => ({ stepNumber: st.stepNumber, title: st.title, description: st.description }))}
        />
      )}

      {/* Local SEO content — city + price intent for key services */}
      <ServiceLocalSeo slug={service.slug} locale={locale} tone={tones.localSeo ?? 'white'} />

      {/* FAQ Section — single editorial accordion */}
      {cmsFaqItems.length > 0 && <FaqSection tone={tones.faq ?? 'white'} items={cmsFaqItems} />}

      {/* Doctor profile — E-E-A-T + internal linking */}
      <DoctorProfileSection doctorSlugs={getServiceDoctorSlugs(service.slug)} tone={tones.doctor ?? 'white'} />

      {/* Reviews — social proof from Google */}
      <ReviewsSection locale={locale} tone={tones.reviews ?? 'cream'} />

      {/* Servicii conexe — footer CTA banner closes the page */}
      <RelatedServicesSection currentSlug={service.slug} tone={tones.related ?? 'white'} />

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

/** Wraps team-member names found in the text with an ink, medium-weight span (text unchanged). */
function highlightDoctorNames(text: string) {
  const names = fallbackTeamMembers.map((m) => m.name).filter(Boolean).sort((x, y) => y.length - x.length)
  if (names.length === 0) return text
  const re = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(re).map((part, i) =>
    names.includes(part) ? <span key={i} className="font-medium text-[#2a2118]">{part}</span> : part,
  )
}

/** Concatenate FAQ lists, dropping exact duplicate questions (text kept verbatim). */
function mergeFaqs(...lists: Array<Array<{ question: string; answer: string }>>) {
  const seen = new Set<string>()
  return lists.flat().filter((f) => {
    const key = f.question.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// Plain text of a Portable Text answer (same join as the FAQ schema above)
function portableToText(answer: Array<{ _type: string; [key: string]: unknown }>) {
  return answer
    .filter((block) => block._type === 'block')
    .map((block) => {
      const children = block['children'] as Array<{ text: string }> | undefined
      return children?.map((child) => child.text).join('') || ''
    })
    .join(' ')
}

// Fallback service page content when Sanity has no data
async function FallbackServicePageContent({ fallbackService, locale }: { fallbackService: typeof fallbackServices[number]; locale: Locale }) {
  const t = await getTranslations()
  const ServiceIcon = fallbackService.Icon

  const hasPhoto = hasServicePhoto(fallbackService.slug)
  const photoPath = getServicePhotoPath(fallbackService.slug) ?? ''

  const serviceName = t(`services.fallback.${fallbackService.titleKey}`)
  const serviceDescription = t(`services.fallback.${fallbackService.descriptionKey}`)

  // Per-service editorial copy (src/lib/service-content). Missing locale → page renders as before.
  const serviceContent = getServiceContent(fallbackService.slug, locale)
  const hideLegacyBlocks = shouldHideLegacyBlocks(fallbackService.slug, locale)
  // One FAQ section + one FAQPage schema per page: service FAQs merged with the local-SEO FAQs
  const localSeo = getServiceLocalSeoContent(fallbackService.slug, locale)
  const faqItems = mergeFaqs(serviceContent?.faqs ?? [], localSeo?.faqs ?? [])
  const contentFaqSchema = faqItems.length > 0 ? getFAQSchema(faqItems) : null
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

  const showBenefits = !hideLegacyBlocks && Boolean(fallbackService.benefits && fallbackService.benefits.length > 0)
  const showProcess = !hideLegacyBlocks && Boolean(fallbackService.process && fallbackService.process.length > 0)
  // White / cream alternation, like the homepage — computed from the sections actually rendered
  const tones = alternateTones([
    ['content', Boolean(serviceContent)],
    ['benefits', showBenefits],
    ['process', showProcess],
    ['localSeo', Boolean(localSeo)],
    ['faq', faqItems.length > 0],
    ['doctor', true],
    ['reviews', true],
    ['related', true],
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
      {contentFaqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contentFaqSchema) }} />
      )}
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

      {/* Unique per-service copy: answer paragraph + sections */}
      {serviceContent && (
        <ServiceContentBlock content={serviceContent} locale={locale} slug={fallbackService.slug} />
      )}

      {/* Benefits + process — shared editorial blocks */}
      {showBenefits && (
        <BenefitsSection
          tone={tones.benefits ?? 'white'}
          items={(fallbackService.benefits ?? []).map((b) => ({
            title: t(`services.fallback.${b.titleKey}`),
            description: t(`services.fallback.${b.descriptionKey}`),
          }))}
        />
      )}
      {showProcess && (
        <ProcessSection
          tone={tones.process ?? 'white'}
          steps={(fallbackService.process ?? []).map((st) => ({
            stepNumber: st.stepNumber,
            title: t(`services.fallback.${st.titleKey}`),
            description: t(`services.fallback.${st.descriptionKey}`),
          }))}
        />
      )}

      {/* Local SEO content — city + price intent for key services */}
      <ServiceLocalSeo slug={fallbackService.slug} locale={locale} tone={tones.localSeo ?? 'white'} />

      {/* Single FAQ: per-service + local-SEO questions */}
      {faqItems.length > 0 && <FaqSection items={faqItems} tone={tones.faq ?? 'cream'} />}

      {/* Doctor profile — E-E-A-T + internal linking */}
      <DoctorProfileSection doctorSlugs={getServiceDoctorSlugs(fallbackService.slug)} tone={tones.doctor ?? 'white'} />

      {/* Reviews — social proof from Google */}
      <ReviewsSection locale={locale} tone={tones.reviews ?? 'cream'} />

      {/* Servicii conexe — footer CTA banner closes the page */}
      <RelatedServicesSection currentSlug={fallbackService.slug} tone={tones.related ?? 'white'} />

    </div>
  )
}

// ===== Shared section components for /servicii/[slug] =====

type SectionTone = 'white' | 'cream'

/** Homepage rhythm: sections alternate white / cream (#faf6f1). First rendered section after the hero is white. */
function alternateTones<K extends string>(sections: Array<[K, boolean]>): Partial<Record<K, SectionTone>> {
  const tones: Partial<Record<K, SectionTone>> = {}
  let i = 0
  for (const [key, shown] of sections) {
    if (!shown) continue
    tones[key] = i % 2 === 0 ? 'white' : 'cream'
    i++
  }
  return tones
}

function sectionBg(tone: SectionTone | undefined) {
  return tone === 'cream' ? 'bg-[#faf6f1]' : 'bg-white'
}

// Decorative icon tiles for the bento (no meaning attached — the copy carries the content)
const BENTO_ICONS: LucideIcon[] = [Sparkles, ShieldCheck, HeartPulse, Smile, Gem, Leaf]

/** Column spans that always fill complete rows: md = 2 cols, lg = 3 cols. First card is the wide feature. */
function bentoSpans(n: number): string[] {
  const spans: string[] = []
  for (let i = 0; i < n; i++) {
    let md = ''
    let lg = 'lg:col-span-1'
    if (i === 0) {
      md = 'md:col-span-2'
      lg = n === 1 ? 'lg:col-span-3' : 'lg:col-span-2'
    }
    spans.push(`${md} ${lg}`)
  }
  if (n >= 2) {
    // md: after the full-width first card, an odd remainder leaves the last card alone → stretch it
    if ((n - 1) % 2 === 1) spans[n - 1] = spans[n - 1]!.replace(/md:col-span-\d|^ /, '') + ' md:col-span-2'
    // lg: first row = [2,1]; then rows of 3; stretch a lonely / paired last row
    const rem = (n - 2) % 3
    if (n > 2 && rem === 1) spans[n - 1] = spans[n - 1]!.replace('lg:col-span-1', 'lg:col-span-3')
    if (n > 2 && rem === 2) spans[n - 1] = spans[n - 1]!.replace('lg:col-span-1', 'lg:col-span-2')
  }
  return spans
}

// Benefits — bento grid: one dark feature card + icon-tile cards, staggered entrance, hover lift
async function BenefitsSection({ items, tone }: { items: Array<{ title: string; description: string }>; tone: SectionTone }) {
  const t = await getTranslations()
  const spans = bentoSpans(items.length)
  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${sectionBg(tone)}`}>
      <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12 md:mb-16">
            <div>
              <ScrollReveal animation="fade-up">
                <span className="flex items-center gap-3 mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355]">
                  <span aria-hidden="true" className="h-px w-10 bg-[#8b7355]/50" />
                  {t('services.detail.whyChooseLabel')}
                </span>
              </ScrollReveal>
              <AnimatedServiceHeading bold={t('services.detail.benefitsBold')} italic={t('services.detail.benefitsItalic')} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {items.map((benefit, index) => {
              const feature = index === 0
              const Icon = BENTO_ICONS[index % BENTO_ICONS.length]!
              // a stretched last card reads as a horizontal band on desktop (icon left, text right)
              const wide = !feature && /lg:col-span-[23]/.test(spans[index] ?? '')
              return (
                <ScrollReveal key={index} animation={feature ? 'scale-up' : 'fade-up'} delay={index * 70} duration={700} className={spans[index] ?? ''}>
                  <div
                    className={`group relative h-full overflow-hidden rounded-[2rem] p-7 md:p-9 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 ${
                      feature
                        ? 'bg-[#2a2118] text-white shadow-[0_40px_80px_-40px_rgba(42,33,24,0.7)] min-h-[16rem] md:min-h-[18rem] flex flex-col justify-between'
                        : 'bg-white border border-[#ebe2d6] shadow-[0_10px_40px_-20px_rgba(139,115,85,0.25)] hover:border-[#d4c4b0] hover:shadow-[0_30px_60px_-24px_rgba(139,115,85,0.35)]'
                    } ${wide ? 'lg:flex lg:items-center lg:gap-10 lg:py-10 bg-gradient-to-r from-white to-[#faf6f1]' : ''}`}
                  >
                    {feature && (
                      <>
                        <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(212,196,176,0.35),transparent_65%)]" />
                        <span aria-hidden="true" className="absolute right-6 bottom-2 md:right-10 font-serif italic text-[7rem] md:text-[9rem] leading-none text-white/[0.06] select-none">01</span>
                      </>
                    )}
                    <div className="relative shrink-0">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 md:mb-8 ${wide ? 'lg:mb-0 lg:w-16 lg:h-16' : ''} transition-transform duration-300 group-hover:scale-105 ${feature ? 'bg-white/10 ring-1 ring-white/15' : 'bg-[#faf6f1] ring-1 ring-[#ebe2d6]'}`}>
                        <Icon aria-hidden="true" className={`w-6 h-6 ${feature ? 'text-[#d4c4b0]' : 'text-[#8b7355]'}`} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="relative min-w-0">
                      <h3 className={`font-bold leading-tight tracking-tight mb-3 ${feature ? 'text-2xl md:text-3xl text-white max-w-xl' : 'text-xl md:text-[1.35rem] text-[#2a2118]'}`}>
                        {benefit.title}
                      </h3>
                      <p className={`leading-relaxed ${feature ? 'text-base md:text-lg text-white/75 max-w-xl' : 'text-[15px] md:text-base text-[#5a5048]'}`}>{benefit.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Process — sticky heading left, timeline right; the connecting line draws in on scroll
async function ProcessSection({ steps, tone }: { steps: Array<{ stepNumber: number; title: string; description: string }>; tone: SectionTone }) {
  const t = await getTranslations()
  return (
    <section className={`py-24 md:py-32 relative overflow-x-clip ${sectionBg(tone)}`}>
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 self-start">
            <AnimatedServiceHeading bold={t('services.detail.processBold')} italic={t('services.detail.processItalic')} />
            <span aria-hidden="true" className="hidden lg:block mt-4 font-serif italic text-[8rem] leading-none text-[#8b7355]/10 select-none">
              {String(steps.length).padStart(2, '0')}
            </span>
          </div>
          <ServiceProcessTimeline
            steps={steps.map((st) => ({ ...st, label: `${t('services.step')} ${st.stepNumber}` }))}
          />
        </div>
      </div>
    </section>
  )
}

/** "Dr. Buterchi Codruț-Ciprian" → bold "Dr. Buterchi" + serif italic "Codruț-Ciprian" (text unchanged). */
function splitDoctorName(name: string): [string, string] {
  const words = name.split(' ')
  if (words.length < 3) return [name, '']
  return [words.slice(0, 2).join(' '), words.slice(2).join(' ')]
}

// Doctor profile — the doctor(s) mapped to this service (src/lib/service-content), Dr. Petric as fallback
async function DoctorProfileSection({ doctorSlugs, tone }: { doctorSlugs: string[]; tone: SectionTone }) {
  const found = doctorSlugs
    .map((slug) => fallbackTeamMembers.find((m) => m.slug === slug))
    .filter((m): m is (typeof fallbackTeamMembers)[number] => Boolean(m))
  const fallbackDoctor = fallbackTeamMembers.find((m) => m.slug === DEFAULT_SERVICE_DOCTOR)
  const doctors = found.length > 0 ? found : fallbackDoctor ? [fallbackDoctor] : []
  if (doctors.length === 0) return null
  const t = await getTranslations()

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${sectionBg(tone)}`}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="text-center mb-14 md:mb-20">
          <AnimatedServiceHeading bold={t('services.detail.doctorBold')} italic={t('services.detail.doctorItalic')} />
        </div>

        <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
          {doctors.map((doctor, di) => {
            const [nameBold, nameItalic] = splitDoctorName(doctor.name)
            const flip = di % 2 === 1
            return (
              <div key={doctor.slug} className={`grid gap-10 lg:gap-16 xl:gap-20 items-center ${flip ? 'lg:grid-cols-[1fr_26rem]' : 'lg:grid-cols-[26rem_1fr]'}`}>
                {/* Doctor photo — large framed card, scale-in */}
                <ScrollReveal animation="fade-up" duration={900} className={`relative max-w-[26rem] mx-auto w-full ${flip ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#faf6f1] border border-[#ebe2d6] shadow-[0_40px_80px_-40px_rgba(90,70,45,0.45)]">
                    {doctor.photo && (
                      <Image
                        src={doctor.photo}
                        alt={t('team.profile.doctorPhotoAlt', { name: doctor.name, role: doctor.role })}
                        fill
                        sizes="(max-width: 1024px) 100vw, 416px"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </ScrollReveal>

                {/* Doctor info */}
                <ScrollReveal animation={flip ? 'fade-right' : 'fade-left'} delay={150}>
                  <span className="flex items-center gap-3 mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355]">
                    <span aria-hidden="true" className="h-px w-10 bg-[#8b7355]/50" />
                    {translateTeamRole(doctor.role, t)}
                  </span>
                  <h3 className="font-bold text-[#2a2118] leading-[0.98] tracking-tight text-[2.25rem] md:text-5xl mb-6">
                    <span className="block">{nameBold}</span>{nameItalic && ' '}
                    {nameItalic && (
                      <span className="block font-serif italic font-medium text-[#8b7355] tracking-wide mt-1 pb-1 [text-wrap:balance]">{nameItalic}</span>
                    )}
                  </h3>
                  {/* Short teaser only — the full bio lives on /echipa/[slug] (button below) */}
                  <p className="text-base md:text-lg text-[#5a5048] leading-relaxed mb-6 line-clamp-3 max-w-[60ch]">
                    {doctor.bio}
                  </p>

                  {doctor.specializations && doctor.specializations.length > 0 && (
                    <p className="text-sm text-[#8b7355] leading-relaxed mb-7">
                      {doctor.specializations.join(' · ')}
                    </p>
                  )}

                  {/* Quick stats */}
                  {doctor.stats && !doctor.hideStats && (
                    <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-[#e8e0d5] max-w-md">
                      {doctor.stats.yearsExperience && (
                        <div>
                          <div className="font-serif italic text-3xl md:text-4xl text-[#2a2118] leading-none">{doctor.stats.yearsExperience}+</div>
                          <div className="text-[10px] mt-2 text-[#8b7355] uppercase tracking-[0.16em] font-semibold">{t('services.detail.yearsExperience')}</div>
                        </div>
                      )}
                      {doctor.stats.patientsCount && (
                        <div>
                          <div className="font-serif italic text-3xl md:text-4xl text-[#2a2118] leading-none">{doctor.stats.patientsCount}+</div>
                          <div className="text-[10px] mt-2 text-[#8b7355] uppercase tracking-[0.16em] font-semibold">{t('services.detail.patientsTreated')}</div>
                        </div>
                      )}
                      <div>
                        <div className="font-serif italic text-3xl md:text-4xl text-[#2a2118] leading-none flex items-baseline gap-1.5">
                          4.9
                          <Star className="w-4 h-4 fill-[#d4c4b0] text-[#d4c4b0]" />
                        </div>
                        <div className="text-[10px] mt-2 text-[#8b7355] uppercase tracking-[0.16em] font-semibold">{t('services.detail.googleLabel')}</div>
                      </div>
                    </div>
                  )}

                  <Link
                    href={{ pathname: '/echipa/[slug]', params: { slug: doctor.slug } }}
                    className="group inline-flex items-center min-h-[52px] px-8 py-4 bg-[#1a1a1a] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] active:scale-[0.98] transition-[box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b7355]/60"
                  >
                    <span>{t('services.detail.viewProfile')}</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0 ml-2 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.25} />
                  </Link>
                </ScrollReveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function slugifyHeading(text: string, i: number) {
  return `s${i + 1}-${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)}`
}

// Unique per-service copy: pull-quote intro, optional contact callout, H2 sections with a sticky outline on desktop
async function ServiceContentBlock({ content, locale, slug }: { content: ServiceContentLocale; locale: string; slug: string }) {
  const labels = getServiceContentLabels(locale)
  const anchors = content.sections.map((s, i) => slugifyHeading(s.heading, i))
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-x-clip">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Intro — "Pe scurt" editorial highlight: centered card, serif quote mark, warm glow + thin halo in one corner */}
          <ScrollReveal animation="fade-up">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#8b7355]/10 bg-gradient-to-br from-[#faf6f1] via-[#fdfbf8] to-white px-6 py-10 md:px-14 md:py-14 lg:px-16 lg:py-16 shadow-[0_30px_80px_-44px_rgba(139,115,85,0.5)]">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#e8dccb] opacity-50 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#c4ab8d]/30" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-dashed border-[#c4ab8d]/20" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span aria-hidden="true" className="font-serif italic text-[5.5rem] md:text-[7rem] leading-none h-12 md:h-16 -mt-2 text-[#c4ab8d]/80 select-none">&ldquo;</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355]">{labels.introLabel}</span>
                </div>
                <p className="max-w-[60ch] text-lg md:text-[1.4rem] text-[#3a3028] leading-[1.7] md:leading-[1.7]">
                  {highlightDoctorNames(content.intro)}
                </p>
                <span aria-hidden="true" className="mt-8 md:mt-10 block h-px w-16 bg-[#c4ab8d]/60" />
              </div>
            </div>
          </ScrollReveal>

          {showsContactCallout(slug) && (
            <ScrollReveal animation="fade-up">
              <div className="mt-10 rounded-[2rem] border border-[#e2d8ca] bg-[#faf6f1] p-6 md:p-9 shadow-[0_20px_60px_-30px_rgba(139,115,85,0.35)]">
                <p className="text-lg md:text-xl font-bold text-[#2a2118] mb-4">{labels.contactTitle}</p>
                <a
                  href={`tel:${CLINIC_PHONE_TEL}`}
                  className="inline-flex items-center gap-3 min-h-[48px] px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-base md:text-lg font-semibold hover:bg-[#8b7355] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b7355]/60"
                >
                  <Phone className="w-5 h-5" strokeWidth={2} />
                  <span>{labels.contactCall} {CLINIC_PHONE_DISPLAY}</span>
                </a>
                <ul className="mt-5 space-y-2 text-[#5a5048]">
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-1 text-[#8b7355] shrink-0" strokeWidth={2} />
                    <span><strong>{labels.contactHoursLabel}:</strong> {labels.contactHours}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 text-[#8b7355] shrink-0" strokeWidth={2} />
                    <span><strong>{labels.contactAddressLabel}:</strong> {CLINIC_ADDRESS}</span>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-[#5a5048]">{labels.contactLanguages}</p>
              </div>
            </ScrollReveal>
          )}

          <div className="mt-16 md:mt-24 grid lg:grid-cols-[15rem_1fr] xl:grid-cols-[17rem_1fr] gap-10 lg:gap-16 xl:gap-24">
            {/* Sticky outline — desktop only; the section headings as in-page links */}
            <nav className="hidden lg:block">
              <ol className="sticky top-32 space-y-1 border-l border-[#e8e0d5] list-none m-0 p-0">
                {content.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#${anchors[i]}`}
                      className="group -ml-px flex gap-3 border-l-2 border-transparent hover:border-[#8b7355] pl-4 py-2 text-sm leading-snug text-[#5a5048] hover:text-[#2a2118] transition-colors duration-200 focus-visible:outline-none focus-visible:border-[#8b7355] focus-visible:text-[#2a2118]"
                    >
                      <span aria-hidden="true" className="font-serif italic text-[#b5a089] group-hover:text-[#8b7355] shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 space-y-16 md:space-y-20">
              {content.sections.map((section, sectionIndex) => (
                <ScrollReveal key={section.heading} animation="fade-up">
                  <article id={anchors[sectionIndex]} className="scroll-mt-28 max-w-[72ch]">
                    <span aria-hidden="true" className="block font-serif italic text-5xl md:text-6xl text-[#d4c4b0] leading-none mb-4">
                      {String(sectionIndex + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-[1.7rem] md:text-[2.25rem] font-bold text-[#2a2118] leading-[1.12] tracking-tight mb-6 [text-wrap:balance]">
                      {section.heading}
                    </h2>
                    <div className="space-y-5 text-[17px] md:text-lg text-[#4a4038] leading-[1.75]">
                      {section.paragraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="rounded-[1.75rem] bg-[#faf6f1] border border-[#efe7dc] p-5 md:p-7 space-y-3.5 list-none m-0">
                          {section.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3.5 text-base md:text-[17px]">
                              <span aria-hidden="true" className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-white ring-1 ring-[#e2d8ca] flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-[#8b7355]" strokeWidth={2.5} />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.after && (
                        <p className="border-l-2 border-[#8b7355]/60 pl-5 text-[#2a2118] font-medium">{section.after}</p>
                      )}
                    </div>
                  </article>
                </ScrollReveal>
              ))}

              {content.links && content.links.length > 0 && (
                <ScrollReveal animation="fade-up">
                  <div className="pt-8 border-t border-[#e8e0d5] max-w-[72ch]">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355] mb-4">{labels.linksLabel}</span>
                    <ul className="grid sm:grid-cols-2 gap-3 list-none m-0 p-0">
                      {content.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={'doctor' in link ? { pathname: '/echipa/[slug]', params: { slug: link.doctor } } : link.page}
                            className="group/cta flex items-center justify-between gap-3 min-h-[56px] rounded-2xl bg-white border border-[#ebe2d6] px-5 py-3.5 text-sm md:text-base font-semibold text-[#2a2118] hover:border-[#8b7355] hover:shadow-[0_14px_40px_-20px_rgba(139,115,85,0.4)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]/50"
                          >
                            <span>{link.label}</span>
                            <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0 text-[#8b7355] transition-transform duration-200 group-hover/cta:translate-x-1" strokeWidth={2.25} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// FAQ — heading left (sticky on desktop), smooth accordion right. Used by both the CMS and the fallback path.
async function FaqSection({ items, tone }: { items: Array<{ question: string; answer: string }>; tone: SectionTone }) {
  const t = await getTranslations()
  return (
    <section className={`py-24 md:py-32 relative overflow-x-clip ${sectionBg(tone)}`}>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-32 self-start">
            <AnimatedServiceHeading bold={t('services.detail.faqBold')} italic={t('services.detail.faqItalic')} />
          </div>
          <ScrollReveal animation="fade-up" duration={700}>
            <ServiceFaqAccordion items={items} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// Reviews — Google reviews marquee, mirrors the landing page section
async function ReviewsSection({ locale, tone }: { locale: Locale; tone: SectionTone }) {
  const t = await getTranslations('services.detail')
  return (
    <section className={`py-20 md:py-28 relative overflow-hidden ${sectionBg(tone)}`}>
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedServiceHeading bold={t('reviewsBold')} italic={t('reviewsItalic')} />
        </div>
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

// Servicii conexe — 3 other main services; snap-scroll row on mobile, grid on desktop
async function RelatedServicesSection({ currentSlug, tone }: { currentSlug: string; tone: SectionTone }) {
  const t = await getTranslations()
  const all = getMainFallbackServices().filter((s) => s.slug !== currentSlug).slice(0, 3)
  if (all.length === 0) return null

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${sectionBg(tone)}`}>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <AnimatedServiceHeading bold={t('services.detail.relatedBold')} italic={t('services.detail.relatedItalic')} />
        </div>

        <ScrollReveal animation="fade-up" duration={800}>
          <ul className="list-none m-0 -mx-5 px-5 sm:-mx-8 sm:px-8 md:mx-auto md:px-0 flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {all.map((service) => {
              const hasPhoto = hasServicePhoto(service.slug)
              const photoPath = getServicePhotoPath(service.slug) ?? ''
              return (
                <li key={service.slug} className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-auto">
                  <Link
                    href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                    className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] bg-white border border-[#ebe2d6] shadow-[0_10px_40px_-20px_rgba(139,115,85,0.3)] hover:border-[#d4c4b0] hover:shadow-[0_40px_80px_-30px_rgba(139,115,85,0.45)] hover:-translate-y-1.5 transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]/50"
                  >
                    <div className="relative aspect-[3/2] m-2.5 mb-0 rounded-[1.5rem] bg-[#faf6f1] overflow-hidden">
                      {hasPhoto ? (
                        <Image src={photoPath} alt={t('services.detail.relatedPhotoAlt', { title: t(`services.fallback.${service.titleKey}`) })} fill sizes="(max-width: 768px) 82vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
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
                      <h3 className="text-xl md:text-2xl font-bold text-[#2a2118] mb-2 leading-tight tracking-tight">
                        {t(`services.fallback.${service.titleKey}`)}
                      </h3>
                      <p className="text-[#5a5048] text-sm md:text-[15px] leading-relaxed mb-6 flex-1">
                        {t(`services.fallback.${service.descriptionKey}`)}
                      </p>
                      <span className="flex items-center justify-between text-[#2a2118] text-xs font-bold uppercase tracking-[0.16em]">
                        <span>{t('common.learnMore')}</span>
                        <span aria-hidden="true" className="w-10 h-10 rounded-full border border-[#e2d8ca] flex items-center justify-center text-[#8b7355] group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] group-hover:text-white transition-colors duration-300">
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
