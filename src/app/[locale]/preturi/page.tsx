import { Calculator } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PriceCalculatorV2 } from '@/components/features/PriceCalculator/v2'
import type { CalcTranslations } from '@/components/features/PriceCalculator/v2/types'
import type { Locale } from '@/data/treatments'
import { Link } from '@/i18n/navigation'
import { getBreadcrumbSchema } from '@/lib/schema'
import {
  generatePageMetadata,
  localizedPathnames,
  siteConfig,
  type Locale as SEOLocale,
} from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('prices.metaTitle'),
    description: t('prices.metaDescription'),
    locale: locale as SEOLocale,
    path: '/preturi',
  })
}

export default async function PricesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const loc = locale as SEOLocale
  const breadcrumbSchema = getBreadcrumbSchema([
    {
      name: t('breadcrumbs.home'),
      url: `${siteConfig.baseUrl}${localizedPathnames['/']?.[loc] ?? '/'}`,
    },
    {
      name: t('breadcrumbs.prices'),
      url: `${siteConfig.baseUrl}${localizedPathnames['/preturi']?.[loc] ?? '/preturi'}`,
    },
  ])

  const calculatorTranslations: CalcTranslations = {
    back: t('prices.calculator.back'),
    reset: t('prices.calculator.reset'),
    next: t('prices.calculator.next'),
    scenarioTitle: t('prices.calculator.scenarioTitle'),
    scenarioSubtitle: t('prices.calculator.scenarioSubtitle'),
    questionsTitle: t('prices.calculator.questionsTitle'),
    questionsSubtitle: t('prices.calculator.questionsSubtitle'),
    estimateTitle: t('prices.calculator.estimateTitle'),
    totalRange: t('prices.calculator.totalRange'),
    perTreatment: t('prices.calculator.perTreatment'),
    bookConsultation: t('prices.calculator.bookConsultation'),
    doctorTip: t('prices.calculator.doctorTip'),
    disclaimer: t('prices.calculator.disclaimer'),
    yourEstimate: t('prices.calculator.yourEstimate'),
    whatHappensNext: t('prices.calculator.whatHappensNext'),
    stepLabelScenario: t('prices.calculator.stepLabelScenario'),
    stepLabelQuestions: t('prices.calculator.stepLabelQuestions'),
    stepLabelResult: t('prices.calculator.stepLabelResult'),
    nextStepBooking: t('prices.calculator.nextStepBooking'),
    nextStepBookingTime: t('prices.calculator.nextStepBookingTime'),
    nextStepPlan: t('prices.calculator.nextStepPlan'),
    nextStepPlanTime: t('prices.calculator.nextStepPlanTime'),
    nextStepTreatment: t('prices.calculator.nextStepTreatment'),
    nextStepTreatmentTime: t('prices.calculator.nextStepTreatmentTime'),
    sendByEmail: t('prices.calculator.sendByEmail'),
    sendByEmailTitle: t('prices.calculator.sendByEmailTitle'),
    sendByEmailButton: t('prices.calculator.sendByEmailButton'),
    sendByEmailContext: t('prices.calculator.sendByEmailContext'),
    doctorName: t('prices.calculator.doctorName'),
    investmentLabel: t('prices.calculator.investmentLabel'),
    freeConsult: t('prices.calculator.freeConsult'),
    trustPlanLabel: t('prices.calculator.trustPlanLabel'),
    trustMaterialsLabel: t('prices.calculator.trustMaterialsLabel'),
    trustWarrantyLabel: t('prices.calculator.trustWarrantyLabel'),
    treatmentsIncluded: t('prices.calculator.treatmentsIncluded'),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="flex flex-col">
        {/* Hero - Dark Editorial */}
        <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          <div className="container relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <Link
                href="/"
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                {t('breadcrumbs.home')}
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[#d4c4b0] text-sm font-medium">
                {t('breadcrumbs.prices')}
              </span>
            </div>

            <div className="max-w-4xl">
              <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
                {t('prices.heroLabel')}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                {t('prices.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-10">
                {t('prices.subtitle')}
              </p>
              <a
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4c4b0] text-[#0d0d0d] rounded-full font-semibold hover:bg-white transition-colors duration-300"
                href="#calculator"
              >
                <Calculator className="w-5 h-5" strokeWidth={1.5} />
                {t('prices.tryCalculator')}
              </a>
            </div>
          </div>
        </section>

        {/* Disclaimer band */}
        <section className="py-4 bg-[#f8f5f0] border-b border-[#e8e0d5]">
          <div className="container">
            <p className="text-center text-sm text-[#6b6b6b]">
              {t('prices.disclaimer')}
            </p>
          </div>
        </section>

        {/* Calculator section */}
        <section className="section bg-white scroll-mt-20" id="calculator">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <PriceCalculatorV2
                locale={locale as Locale}
                translations={calculatorTranslations}
              />
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
