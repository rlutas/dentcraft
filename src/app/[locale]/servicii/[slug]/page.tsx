import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
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
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getServiceBySlug, getServiceSlugs, getFAQs, type Locale } from '@/lib/sanity/queries'

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

  return routing.locales.flatMap((locale) =>
    serviceSlugs.map((item) => ({
      locale,
      slug: item.slug,
    }))
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const service = await getServiceBySlug(slug, locale as Locale) as Service | null

  if (!service) {
    return {}
  }

  const title = service.seo?.metaTitle || service.title
  const description = service.seo?.metaDescription || service.shortDescription || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: service.seo?.ogImage
        ? [urlFor(service.seo.ogImage).width(1200).height(630).url()]
        : service.heroImage
          ? [urlFor(service.heroImage).width(1200).height(630).url()]
          : [],
    },
    robots: service.seo?.noIndex ? { index: false } : undefined,
  }
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [service, faqs] = await Promise.all([
    getServiceBySlug(slug, locale as Locale) as Promise<Service | null>,
    getFAQs(locale as Locale, { serviceSlug: slug }) as Promise<FAQ[]>,
  ])

  if (!service) {
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {ServiceIcon && (
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-6 text-[var(--color-primary)]">
                  <ServiceIcon className="w-8 h-8" strokeWidth={1.5} />
                </div>
              )}

              <h1 className="mb-6">{service.title}</h1>

              {service.shortDescription && (
                <p className="text-body-lg text-muted mb-8">
                  {service.shortDescription}
                </p>
              )}

              {service.priceRange && (
                <div className="flex items-center gap-3 mb-8 text-[var(--color-secondary)]">
                  <span className="font-semibold text-lg">
                    {service.priceRange.min} - {service.priceRange.max} RON
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="btn btn-primary btn-lg" href="/contact">
                  {t('common.bookAppointment')}
                </Link>
                <a
                  className="btn btn-secondary btn-lg flex items-center gap-2"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  0741 199 977
                </a>
              </div>
            </div>

            {/* Hero Image */}
            {service.heroImage && (
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
                <Image
                  fill
                  priority
                  alt={service.heroImage.alt || service.title}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={urlFor(service.heroImage).width(800).height(600).auto('format').url()}
                />
              </div>
            )}
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
              <Link className="btn btn-lg btn-secondary flex items-center gap-2" href="/servicii">
                {t('common.seeAll')}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
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
