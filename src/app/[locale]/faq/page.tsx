import { HelpCircle, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getFAQsByCategory, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'
import { getFAQSchema } from '@/lib/schema'
import FAQPageClient from './FAQPageClient'

// FAQ type based on Sanity schema
type SanityFAQ = {
  _id: string
  question: string
  answer: Array<{
    _type: string
    children?: Array<{
      text: string
    }>
  }>
  category: 'general' | 'pricing' | 'treatments' | 'appointments'
  order: number
}

type FAQsByCategory = {
  general: SanityFAQ[]
  pricing: SanityFAQ[]
  treatments: SanityFAQ[]
  appointments: SanityFAQ[]
}

type PageProps = {
  params: Promise<{ locale: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('faq.title'),
    description: t('faq.subtitle'),
    locale: locale as SEOLocale,
    path: '/faq',
  })
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch FAQs grouped by category from Sanity
  const faqsByCategory = await getFAQsByCategory(locale as Locale) as FAQsByCategory

  // Check if there are any FAQs
  const hasAnyFAQs = Object.values(faqsByCategory).some(
    (faqs) => faqs && faqs.length > 0
  )

  return (
    <FAQPageContent faqsByCategory={faqsByCategory} hasAnyFAQs={hasAnyFAQs} />
  )
}

// Helper to extract plain text from Sanity block content
function extractPlainText(blocks: SanityFAQ['answer']): string {
  return blocks
    .map((block) => {
      if (block.children) {
        return block.children.map((child) => child.text).join('')
      }
      return ''
    })
    .join(' ')
    .trim()
}

async function FAQPageContent({
  faqsByCategory,
  hasAnyFAQs,
}: {
  faqsByCategory: FAQsByCategory
  hasAnyFAQs: boolean
}) {
  const t = await getTranslations()

  // If no FAQs from Sanity, show placeholder
  if (!hasAnyFAQs) {
    return <PlaceholderFAQPage />
  }

  // Prepare category data with translations
  const categories = [
    { key: 'general' as const, label: t('faq.categories.general'), faqs: faqsByCategory.general || [] },
    { key: 'pricing' as const, label: t('faq.categories.pricing'), faqs: faqsByCategory.pricing || [] },
    { key: 'treatments' as const, label: t('faq.categories.treatments'), faqs: faqsByCategory.treatments || [] },
    { key: 'appointments' as const, label: t('faq.categories.appointments'), faqs: faqsByCategory.appointments || [] },
  ].filter((cat) => cat.faqs.length > 0)

  // Prepare FAQ schema data - flatten all FAQs from all categories
  const allFaqs = Object.values(faqsByCategory)
    .flat()
    .filter(Boolean)
    .map((faq) => ({
      question: faq.question,
      answer: extractPlainText(faq.answer),
    }))

  const faqSchema = getFAQSchema(allFaqs)

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <HelpCircle className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{t('faq.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content with Category Tabs */}
      <FAQPageClient categories={categories} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('faq.stillHaveQuestions')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('faq.contactUsText')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t('common.contactUs')}
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

// Placeholder component when Sanity has no data
async function PlaceholderFAQPage() {
  const t = await getTranslations()

  const placeholderFAQs = {
    general: [
      {
        key: 'faq1',
        question: t('faq.placeholder.general.q1'),
        answer: t('faq.placeholder.general.a1'),
      },
      {
        key: 'faq2',
        question: t('faq.placeholder.general.q2'),
        answer: t('faq.placeholder.general.a2'),
      },
    ],
    pricing: [
      {
        key: 'faq3',
        question: t('faq.placeholder.pricing.q1'),
        answer: t('faq.placeholder.pricing.a1'),
      },
    ],
    treatments: [
      {
        key: 'faq4',
        question: t('faq.placeholder.treatments.q1'),
        answer: t('faq.placeholder.treatments.a1'),
      },
    ],
    appointments: [
      {
        key: 'faq5',
        question: t('faq.placeholder.appointments.q1'),
        answer: t('faq.placeholder.appointments.a1'),
      },
    ],
  }

  const categories = [
    { key: 'general', label: t('faq.categories.general'), faqs: placeholderFAQs.general },
    { key: 'pricing', label: t('faq.categories.pricing'), faqs: placeholderFAQs.pricing },
    { key: 'treatments', label: t('faq.categories.treatments'), faqs: placeholderFAQs.treatments },
    { key: 'appointments', label: t('faq.categories.appointments'), faqs: placeholderFAQs.appointments },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <HelpCircle className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{t('faq.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content with Category Tabs - Placeholder Version */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((category, index) => (
                <button
                  key={category.key}
                  className={`px-6 py-3 rounded-full text-body-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                  }`}
                  type="button"
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQ Accordion - Show first category */}
            <div className="card p-6 md:p-8">
              {placeholderFAQs.general.map((faq) => (
                <details key={faq.key} className="group border-b border-[var(--color-accent)] last:border-b-0">
                  <summary className="flex items-center justify-between py-5 cursor-pointer text-body-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors list-none">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-[var(--color-primary)] transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="pb-5 text-body text-muted">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('faq.stillHaveQuestions')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('faq.contactUsText')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t('common.contactUs')}
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
