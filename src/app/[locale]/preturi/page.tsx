import { Calculator } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PriceCalculator } from '@/components/features/PriceCalculator'
import { TabbedPriceList, TabbedPriceListPlaceholder } from '@/components/features/TabbedPriceList'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
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
          <div className="max-w-5xl mx-auto">
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
          {/* Section Header */}
          <div className="text-center mb-12">
            <ScrollReveal animation="fade-up">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
                Tarife
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a2118] mb-5">
                Lista completă de prețuri
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
                Toate serviciile noastre cu prețuri transparente
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={500}>
            <TabbedPriceList
              services={servicesWithPrices}
              formatPrice={formatPrice}
            />
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={600}>
            <div className="mt-8 bg-[#faf6f1] border border-[#e8e0d5] rounded-2xl p-5 md:p-6">
              <p className="text-sm text-[#8b7355] leading-relaxed text-center">
                *Prețurile indicate sunt orientative și nu reprezintă obligație contractuală.
                Pot exista tarife suplimentare în funcție de complexitatea cazului.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}

// Fallback services when Sanity has no data
function getFallbackServices(_t: Awaited<ReturnType<typeof getTranslations>>): CalculatorService[] {
  return [
    {
      _id: 'fallback-consultatii',
      title: 'Consultații',
      slug: 'consultatii',
      icon: '/icons/001-tooth-61.svg',
    },
    {
      _id: 'fallback-profilaxie',
      title: 'Profilaxie',
      slug: 'profilaxie',
      icon: '/icons/003-tooth-60.svg',
    },
    {
      _id: 'fallback-odontoterapie',
      title: 'Odontoterapie',
      slug: 'odontoterapie',
      icon: '/icons/049-tooth-34.svg',
    },
    {
      _id: 'fallback-endodontie',
      title: 'Endodonție',
      slug: 'endodontie',
      icon: '/icons/063-tooth-21.svg',
    },
    {
      _id: 'fallback-protetica',
      title: 'Protetică',
      slug: 'protetica',
      icon: '/icons/041-implants-1.svg',
    },
    {
      _id: 'fallback-chirurgie',
      title: 'Chirurgie',
      slug: 'chirurgie',
      icon: '/icons/020-tool-9.svg',
    },
    {
      _id: 'fallback-ortodontie',
      title: 'Ortodonție',
      slug: 'ortodontie',
      icon: '/icons/038-braces.svg',
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
      key: 'consultatii',
      title: 'Consultații',
      icon: '/icons/001-tooth-61.svg',
      prices: [
        { key: 'c1', name: 'Consultație + diagnostic', price: '100', unit: null },
        { key: 'c2', name: 'Consultație + diagnostic + poze + plan tratament', price: '300', unit: null },
        { key: 'c3', name: 'Consultație periodică', price: 'GRATUIT', unit: null, description: 'O dată la 6 luni pentru pacienții noștri' },
      ],
    },
    {
      key: 'profilaxie',
      title: 'Profilaxie',
      icon: '/icons/003-tooth-60.svg',
      prices: [
        { key: 'pr1', name: 'Periaj profesional', price: '100', unit: null },
        { key: 'pr2', name: 'Detartraj ultrasunete', price: '150', unit: null },
        { key: 'pr3', name: 'Airflow', price: '150', unit: null },
        { key: 'pr4', name: 'Albire dentară profesională', price: '1000-1500', unit: null },
      ],
    },
    {
      key: 'odontoterapie',
      title: 'Odontoterapie',
      icon: '/icons/049-tooth-34.svg',
      prices: [
        { key: 'o1', name: 'Obturație fizionomică din compozit', price: '200', unit: null },
        { key: 'o2', name: 'Obturație fizionomică din glassionomer', price: '300', unit: null },
        { key: 'o3', name: 'Obturație frontală - estetică', price: '400', unit: null },
        { key: 'o4', name: 'Obturație provizorie', price: '100', unit: null },
        { key: 'o5', name: 'Aplicare izolare - DIGA', price: '50', unit: null },
      ],
    },
    {
      key: 'endodontie',
      title: 'Endodonție',
      icon: '/icons/063-tooth-21.svg',
      prices: [
        { key: 'e1', name: 'Tratament monoradicular', price: '400', unit: null, description: 'Dinte cu o rădăcină' },
        { key: 'e2', name: 'Tratament biradicular', price: '600', unit: null, description: 'Dinte cu două rădăcini' },
        { key: 'e3', name: 'Tratament pluriradicular', price: '800', unit: null, description: 'Dinte cu 3-4 rădăcini' },
        { key: 'e4', name: 'Retratament monoradicular', price: '600', unit: null, description: 'Dinte cu o rădăcină' },
        { key: 'e5', name: 'Retratament biradicular', price: '800', unit: null, description: 'Dinte cu două rădăcini' },
        { key: 'e6', name: 'Retratament pluriradicular', price: '1000', unit: null, description: 'Dinte cu 3-4 rădăcini' },
        { key: 'e7', name: 'Tratament cu hidroxid de calciu', price: '200', unit: null },
        { key: 'e8', name: 'Reconstrucție pe pivot', price: '250', unit: null },
      ],
    },
    {
      key: 'protetica',
      title: 'Protetică',
      icon: '/icons/041-implants-1.svg',
      prices: [
        { key: 'pt1', name: 'Amprentă', price: '100', unit: 'arcadă' },
        { key: 'pt2', name: 'Scanare digitală intraorală', price: '300', unit: null },
        { key: 'pt3', name: 'Ablație coroane', price: '50', unit: 'dinte' },
        { key: 'pt4', name: 'Coroană metalo-ceramică', price: '1000', unit: null },
        { key: 'pt5', name: 'Coroană zirconiu monolitic', price: '1500', unit: null },
        { key: 'pt6', name: 'Coroană zirconiu stratificat E-Max', price: '1700', unit: null },
        { key: 'pt7', name: 'Fațetă ceramică E-Max', price: '1700', unit: null },
        { key: 'pt8', name: 'Fațetă pe masă refractară E-Max Ceram', price: '2000', unit: null },
        { key: 'pt9', name: 'Inlay Ceramic E-Max Press', price: '1500', unit: null },
        { key: 'pt10', name: 'Onlay Ceramic E-Max Press', price: '1500', unit: null },
        { key: 'pt11', name: 'Proteză acrilică totală', price: '3000', unit: null },
        { key: 'pt12', name: 'Coroană provizorie directă', price: '200', unit: 'dinte' },
        { key: 'pt13', name: 'Coroană provizorie indirectă', price: '300', unit: 'dinte' },
        { key: 'pt14', name: 'Wax Up / Mock up', price: '200', unit: 'dinte' },
      ],
    },
    {
      key: 'chirurgie',
      title: 'Chirurgie',
      icon: '/icons/020-tool-9.svg',
      prices: [
        { key: 'ch1', name: 'Implant dentar Bredent', price: '2750', unit: null },
        { key: 'ch2', name: 'Implant dentar Megagen Any-one', price: '2000', unit: null },
        { key: 'ch3', name: 'Bont protetic Bredent', price: '300', unit: null },
        { key: 'ch4', name: 'Bont protetic Megagen', price: '300', unit: null },
        { key: 'ch5', name: 'Coroană metalo-ceramică pe implant', price: '1200', unit: null },
        { key: 'ch6', name: 'Coroană din zirconiu pe implant', price: '1500', unit: null },
        { key: 'ch7', name: 'Coroană provizorie PMMA pe implant', price: '600', unit: null },
        { key: 'ch8', name: 'Descoperire implant', price: '200', unit: null },
        { key: 'ch9', name: 'Șurub vindecare', price: '200', unit: null },
        { key: 'ch10', name: 'Extracție dinte pluriradicular', price: '300', unit: null },
        { key: 'ch11', name: 'Extracție dinte temporar', price: '200', unit: null },
        { key: 'ch12', name: 'Extracție molar cu separare', price: '400', unit: null },
        { key: 'ch13', name: 'Extracție molar de minte (odontectomie)', price: '600-800', unit: null },
        { key: 'ch14', name: 'Gingivectomie', price: '100', unit: 'dinte' },
        { key: 'ch15', name: 'Grefă gingivală', price: '1500-2000', unit: null },
        { key: 'ch16', name: 'Augmentare osoasă', price: '1500-2000', unit: null },
      ],
    },
    {
      key: 'ortodontie',
      title: 'Ortodonție',
      icon: '/icons/038-braces.svg',
      prices: [
        { key: 'or1', name: 'Consultație primară', price: '100', unit: null },
        { key: 'or2', name: 'Consultație secundară', price: '250', unit: null, description: 'Amprente + modele de studiu' },
        { key: 'or3', name: 'Aparat ortodontic fix autoligaturant fizionomic', price: '4500', unit: 'arcadă' },
        { key: 'or4', name: 'Aparat ortodontic fix metalic autoligaturant', price: '4000', unit: 'arcadă' },
        { key: 'or5', name: 'Aparat ortodontic fix metalic', price: '2800', unit: 'arcadă' },
        { key: 'or6', name: 'Activare aparat fix', price: '150', unit: 'arcadă/ședință', description: 'Două ședințe - 250 lei' },
        { key: 'or7', name: 'Activare aparat mobilizabil', price: '200', unit: null },
        { key: 'or8', name: 'Aparat mobilizabil', price: '1400', unit: null },
        { key: 'or9', name: 'Aparat miofuncțional', price: '1600', unit: null },
        { key: 'or10', name: 'Disjunctor cu ancoraj dentar', price: '1800', unit: null },
        { key: 'or11', name: 'Mască facială (Delair, head-gear)', price: '1000', unit: null },
        { key: 'or12', name: 'Lip bumper', price: '700', unit: null },
        { key: 'or13', name: 'Recolare/înlocuire bracket', price: '50', unit: null },
        { key: 'or14', name: 'Aparat fix segmentar', price: '2000', unit: null },
        { key: 'or15', name: 'Contenție fixă', price: '250', unit: 'arcadă' },
        { key: 'or16', name: 'Contenție mobilizabilă', price: '800', unit: null },
        { key: 'or17', name: 'Control contenție', price: '100', unit: null },
        { key: 'or18', name: 'Gutieră miofuncțională', price: '1000', unit: null },
        { key: 'or19', name: 'Adaptare gutieră miofuncțională', price: '150', unit: null },
        { key: 'or20', name: 'Mini-implant ortodontic', price: '500', unit: 'bucată' },
        { key: 'or21', name: 'Menținător de spațiu (bară palatinală, arc lingual)', price: '800', unit: null },
        { key: 'or22', name: 'Îndepărtare aparat segmentar', price: '200', unit: null },
        { key: 'or23', name: 'Îndepărtare aparat fix', price: '150', unit: null },
        { key: 'or24', name: 'Disjunctor cu ancoraj scheletic tip MSE', price: '3500', unit: null },
        { key: 'or25', name: 'Disjunctor cu ancoraj mixt', price: '2500', unit: null },
        { key: 'or26', name: 'Control', price: '100', unit: null },
        { key: 'or27', name: 'Tratament ortodontic cu gutiere aligner in-house', price: '300', unit: 'aligner' },
        { key: 'or28', name: 'Menținător de spațiu uni-dentar', price: '400', unit: null },
        { key: 'or29', name: 'Sistem de mezializare/distalizare cu mini-implante palatinale', price: '4000', unit: null },
        { key: 'or30', name: 'Power Scope', price: '550', unit: 'caz' },
        { key: 'or31', name: 'Tratament ortodontic cu gutiere Clear Correct', price: '6000-15000', unit: null },
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
          <div className="max-w-5xl mx-auto">
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
          {/* Section Header */}
          <div className="text-center mb-12">
            <ScrollReveal animation="fade-up">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
                Tarife
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a2118] mb-5">
                Lista completă de prețuri
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
                Toate serviciile noastre cu prețuri transparente
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={500}>
            <TabbedPriceListPlaceholder services={placeholderServices} />
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={600}>
            <div className="mt-8 bg-[#faf6f1] border border-[#e8e0d5] rounded-2xl p-5 md:p-6">
              <p className="text-sm text-[#8b7355] leading-relaxed text-center">
                *Prețurile indicate sunt orientative și nu reprezintă obligație contractuală.
                Pot exista tarife suplimentare în funcție de complexitatea cazului.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
