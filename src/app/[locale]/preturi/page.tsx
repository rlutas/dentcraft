import * as LucideIcons from 'lucide-react'
import { BadgePercent, Calculator, Phone, Receipt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PriceCalculator } from '@/components/features/PriceCalculator'
import { Link } from '@/i18n/navigation'
import { getAllServices, getPricesGroupedByService, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'

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

// Calculator service type
type CalculatorService = {
  _id: string
  title: string
  slug: string
  icon: string | null
}

type PageProps = {
  params: Promise<{ locale: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('prices.title'),
    description: t('prices.subtitle'),
    locale: locale as SEOLocale,
    path: '/preturi',
  })
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

  // Fetch prices grouped by service and all services for calculator from Sanity
  const [servicesWithPrices, allServices] = await Promise.all([
    getPricesGroupedByService(locale as Locale) as Promise<ServiceWithPrices[]>,
    getAllServices(locale as Locale) as Promise<CalculatorService[]>,
  ])

  // Filter to only show services that have prices
  const filteredServices = servicesWithPrices.filter(
    (service) => service.prices && service.prices.length > 0
  )

  // Map services for calculator (only need _id, title, slug, icon)
  const calculatorServices: CalculatorService[] = allServices.map((s) => ({
    _id: s._id,
    icon: s.icon,
    slug: s.slug,
    title: s.title,
  }))

  return (
    <PricesPageContent
      calculatorServices={calculatorServices}
      hasAnyPrices={filteredServices.length > 0}
      locale={locale}
      servicesWithPrices={filteredServices}
    />
  )
}

async function PricesPageContent({
  calculatorServices,
  hasAnyPrices,
  locale,
  servicesWithPrices,
}: {
  calculatorServices: CalculatorService[]
  hasAnyPrices: boolean
  locale: string
  servicesWithPrices: ServiceWithPrices[]
}) {
  const t = await getTranslations()

  // If no prices from Sanity, show placeholder
  if (!hasAnyPrices) {
    return <PlaceholderPricesPage calculatorServices={calculatorServices} locale={locale} />
  }

  // Translations for the price calculator
  const calculatorTranslations = {
    back: t('priceCalculator.back'),
    calculate: t('priceCalculator.calculate'),
    details: t('priceCalculator.details'),
    disclaimer: t('priceCalculator.disclaimer'),
    estimatedPrice: t('priceCalculator.estimatedPrice'),
    material: t('priceCalculator.material'),
    materialPremium: t('priceCalculator.materialPremium'),
    materialPremiumDesc: t('priceCalculator.materialPremiumDesc'),
    materialStandard: t('priceCalculator.materialStandard'),
    materialStandardDesc: t('priceCalculator.materialStandardDesc'),
    next: t('priceCalculator.next'),
    optionsSubtitle: t('priceCalculator.optionsSubtitle'),
    optionsTitle: t('priceCalculator.optionsTitle'),
    priceRange: t('priceCalculator.priceRange'),
    quantity: t('priceCalculator.quantity'),
    quantityUnit: t('priceCalculator.quantityUnit'),
    reset: t('priceCalculator.reset'),
    scheduleConsultation: t('priceCalculator.scheduleConsultation'),
    selectService: t('priceCalculator.selectService'),
    service: t('priceCalculator.service'),
    subtitle: t('priceCalculator.subtitle'),
    title: t('priceCalculator.title'),
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Dramatic lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Acasă
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Prețuri</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Tarife transparente
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t('prices.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-10">
              {t('prices.subtitle')}
            </p>

            <a
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4c4b0] text-[#0d0d0d] rounded-full
                font-semibold hover:bg-white transition-colors duration-300"
              href="#calculator"
            >
              <Calculator className="w-5 h-5" strokeWidth={1.5} />
              {t('prices.tryCalculator')}
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4 bg-[#f8f5f0] border-b border-[#e8e0d5]">
        <div className="container">
          <p className="text-center text-sm text-[#6b6b6b]">
            {t('prices.disclaimer')}
          </p>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="section bg-white scroll-mt-20" id="calculator">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 mb-4">
                <Calculator className="w-7 h-7 text-[var(--color-primary)]" strokeWidth={1.5} />
              </div>
              <h2 className="mb-3">{calculatorTranslations.title}</h2>
              <p className="text-muted">
                {calculatorTranslations.subtitle}
              </p>
            </div>
            {calculatorServices.length > 0 ? (
              <PriceCalculator
                locale={locale}
                services={calculatorServices}
                translations={calculatorTranslations}
              />
            ) : (
              <div className="card p-8 text-center">
                <p className="text-muted">{t('priceCalculator.noServicesAvailable')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Price Tables */}
      <section className="section bg-[var(--color-accent-light)]">
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

// Fallback services when Sanity has no data
function getFallbackServices(t: Awaited<ReturnType<typeof getTranslations>>): CalculatorService[] {
  return [
    {
      _id: 'fallback-general',
      title: t('services.categories.generalDentistry'),
      slug: 'stomatologie-generala',
      icon: 'Stethoscope',
    },
    {
      _id: 'fallback-cosmetic',
      title: t('services.categories.cosmeticDentistry'),
      slug: 'estetica-dentara',
      icon: 'Sparkles',
    },
    {
      _id: 'fallback-implants',
      title: t('services.categories.implantology'),
      slug: 'implantologie',
      icon: 'Syringe',
    },
    {
      _id: 'fallback-orthodontics',
      title: t('services.categories.orthodontics'),
      slug: 'ortodontie',
      icon: 'Smile',
    },
    {
      _id: 'fallback-pediatric',
      title: t('services.categories.pediatric'),
      slug: 'pedodontie',
      icon: 'Baby',
    },
    {
      _id: 'fallback-emergencies',
      title: t('services.categories.emergencies'),
      slug: 'urgente-dentare',
      icon: 'AlertCircle',
    },
  ]
}

// Placeholder component when Sanity has no data
async function PlaceholderPricesPage({
  calculatorServices,
  locale,
}: {
  calculatorServices: CalculatorService[]
  locale: string
}) {
  const t = await getTranslations()

  // Translations for the price calculator
  const calculatorTranslations = {
    back: t('priceCalculator.back'),
    calculate: t('priceCalculator.calculate'),
    details: t('priceCalculator.details'),
    disclaimer: t('priceCalculator.disclaimer'),
    estimatedPrice: t('priceCalculator.estimatedPrice'),
    material: t('priceCalculator.material'),
    materialPremium: t('priceCalculator.materialPremium'),
    materialPremiumDesc: t('priceCalculator.materialPremiumDesc'),
    materialStandard: t('priceCalculator.materialStandard'),
    materialStandardDesc: t('priceCalculator.materialStandardDesc'),
    next: t('priceCalculator.next'),
    optionsSubtitle: t('priceCalculator.optionsSubtitle'),
    optionsTitle: t('priceCalculator.optionsTitle'),
    priceRange: t('priceCalculator.priceRange'),
    quantity: t('priceCalculator.quantity'),
    quantityUnit: t('priceCalculator.quantityUnit'),
    reset: t('priceCalculator.reset'),
    scheduleConsultation: t('priceCalculator.scheduleConsultation'),
    selectService: t('priceCalculator.selectService'),
    service: t('priceCalculator.service'),
    subtitle: t('priceCalculator.subtitle'),
    title: t('priceCalculator.title'),
  }

  // Use fallback services if Sanity has no data
  const servicesForCalculator = calculatorServices.length > 0
    ? calculatorServices
    : getFallbackServices(t)

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
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Dramatic lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Acasă
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Prețuri</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Tarife transparente
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t('prices.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-10">
              {t('prices.subtitle')}
            </p>

            <a
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4c4b0] text-[#0d0d0d] rounded-full
                font-semibold hover:bg-white transition-colors duration-300"
              href="#calculator"
            >
              <Calculator className="w-5 h-5" strokeWidth={1.5} />
              {t('prices.tryCalculator')}
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4 bg-[#f8f5f0] border-b border-[#e8e0d5]">
        <div className="container">
          <p className="text-center text-body-sm text-muted">
            {t('prices.disclaimer')}
          </p>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="section bg-white scroll-mt-20" id="calculator">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 mb-4">
                <Calculator className="w-7 h-7 text-[var(--color-primary)]" strokeWidth={1.5} />
              </div>
              <h2 className="mb-3">{calculatorTranslations.title}</h2>
              <p className="text-muted">
                {calculatorTranslations.subtitle}
              </p>
            </div>
            <PriceCalculator
              locale={locale}
              services={servicesForCalculator}
              translations={calculatorTranslations}
            />
          </div>
        </div>
      </section>

      {/* Placeholder Price Tables */}
      <section className="section bg-[var(--color-accent-light)]">
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
