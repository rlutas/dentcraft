import * as LucideIcons from 'lucide-react'
import { BadgePercent, Phone, Receipt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPricesGroupedByService, type Locale } from '@/lib/sanity/queries'

// Price type based on Sanity schema
type SanityPrice = {
  _id: string
  name: string
  description: string | null
  priceMin: number
  priceMax: number | null
  unit: string | null
  isPromotion: boolean
  promotionPrice: number | null
  includesInCalculator: boolean
}

// Service with prices type
type ServiceWithPrices = {
  _id: string
  title: string
  slug: string
  icon: string | null
  prices: SanityPrice[]
}

type PageProps = {
  params: Promise<{ locale: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('prices.title'),
    description: t('prices.subtitle'),
  }
}

// Helper to get Lucide icon by name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return Receipt
  const icons = LucideIcons as Record<string, LucideIcon | unknown>
  const icon = icons[iconName]
  if (typeof icon === 'function') {
    return icon as LucideIcon
  }
  return Receipt
}

// Format price in RON
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ro-RO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function PricesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch prices grouped by service from Sanity
  const servicesWithPrices = await getPricesGroupedByService(locale as Locale) as ServiceWithPrices[]

  // Filter to only show services that have prices
  const filteredServices = servicesWithPrices.filter(
    (service) => service.prices && service.prices.length > 0
  )

  return (
    <PricesPageContent
      hasAnyPrices={filteredServices.length > 0}
      servicesWithPrices={filteredServices}
    />
  )
}

async function PricesPageContent({
  servicesWithPrices,
  hasAnyPrices,
}: {
  servicesWithPrices: ServiceWithPrices[]
  hasAnyPrices: boolean
}) {
  const t = await getTranslations()

  // If no prices from Sanity, show placeholder
  if (!hasAnyPrices) {
    return <PlaceholderPricesPage />
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <Receipt className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{t('prices.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('prices.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-[var(--color-accent-light)]">
        <div className="container">
          <p className="text-center text-body-sm text-muted">
            {t('prices.disclaimer')}
          </p>
        </div>
      </section>

      {/* Price Tables */}
      <section className="section bg-white">
        <div className="container">
          <div className="space-y-12">
            {servicesWithPrices.map((service) => {
              const Icon = getIconComponent(service.icon)
              return (
                <div key={service._id} className="card p-0 overflow-hidden">
                  {/* Service Header */}
                  <div className="bg-[var(--color-accent-light)] px-6 py-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--color-text)]">
                      {service.title}
                    </h2>
                  </div>

                  {/* Price Table */}
                  <div className="divide-y divide-[var(--color-accent)]">
                    {service.prices.map((price) => (
                      <div
                        key={price._id}
                        className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          price.isPromotion ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[var(--color-text)]">
                              {price.name}
                            </p>
                            {price.isPromotion && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                <BadgePercent className="w-3 h-3" strokeWidth={2} />
                                {t('prices.promotion')}
                              </span>
                            )}
                          </div>
                          {price.description && (
                            <p className="text-body-sm text-muted mt-1">
                              {price.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {price.isPromotion && price.promotionPrice ? (
                            <div className="text-right">
                              <p className="text-body-sm text-muted line-through">
                                {formatPrice(price.priceMin)} RON
                              </p>
                              <p className="text-lg font-bold text-green-600">
                                {formatPrice(price.promotionPrice)} RON
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg font-bold text-[var(--color-primary)]">
                              {price.priceMax && price.priceMax !== price.priceMin
                                ? `${formatPrice(price.priceMin)} - ${formatPrice(price.priceMax)} RON`
                                : `${formatPrice(price.priceMin)} RON`}
                            </p>
                          )}
                          {price.unit && (
                            <span className="text-body-sm text-muted">
                              / {price.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('prices.ctaTitle')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('prices.ctaSubtitle')}
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

// Placeholder component when Sanity has no data
async function PlaceholderPricesPage() {
  const t = await getTranslations()

  const placeholderServices = [
    {
      key: 'general',
      title: t('services.categories.generalDentistry'),
      icon: 'Stethoscope',
      prices: [
        { key: 'p1', name: t('prices.placeholder.consultation'), price: '150', unit: null },
        { key: 'p2', name: t('prices.placeholder.cleaning'), price: '200-350', unit: null },
        { key: 'p3', name: t('prices.placeholder.filling'), price: '150-400', unit: t('prices.perTooth') },
      ],
    },
    {
      key: 'cosmetic',
      title: t('services.categories.cosmeticDentistry'),
      icon: 'Sparkles',
      prices: [
        { key: 'p4', name: t('prices.placeholder.whitening'), price: '800-1500', unit: null },
        { key: 'p5', name: t('prices.placeholder.veneers'), price: '2500-4000', unit: t('prices.perTooth') },
      ],
    },
    {
      key: 'implants',
      title: t('services.categories.implantology'),
      icon: 'Syringe',
      prices: [
        { key: 'p6', name: t('prices.placeholder.implant'), price: '3000-5000', unit: t('prices.perImplant') },
        { key: 'p7', name: t('prices.placeholder.crown'), price: '1500-3000', unit: t('prices.perTooth') },
      ],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <Receipt className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{t('prices.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('prices.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-[var(--color-accent-light)]">
        <div className="container">
          <p className="text-center text-body-sm text-muted">
            {t('prices.disclaimer')}
          </p>
        </div>
      </section>

      {/* Placeholder Price Tables */}
      <section className="section bg-white">
        <div className="container">
          <div className="space-y-12">
            {placeholderServices.map((service) => {
              const Icon = getIconComponent(service.icon)
              return (
                <div key={service.key} className="card p-0 overflow-hidden">
                  {/* Service Header */}
                  <div className="bg-[var(--color-accent-light)] px-6 py-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--color-text)]">
                      {service.title}
                    </h2>
                  </div>

                  {/* Price Table */}
                  <div className="divide-y divide-[var(--color-accent)]">
                    {service.prices.map((price) => (
                      <div
                        key={price.key}
                        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-[var(--color-text)]">
                            {price.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-bold text-[var(--color-primary)]">
                            {price.price} RON
                          </p>
                          {price.unit && (
                            <span className="text-body-sm text-muted">
                              / {price.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('prices.ctaTitle')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('prices.ctaSubtitle')}
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
