import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PriceCalculatorV2 } from '@/components/features/PriceCalculator/v2'
import type { CalcTranslations } from '@/components/features/PriceCalculator/v2/types'
import type { Locale } from '@/data/treatments'
import { getBreadcrumbSchema } from '@/lib/schema'
import {
  generatePageMetadata,
  localizedPathnames,
  siteConfig,
  type Locale as SEOLocale,
} from '@/lib/seo'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'

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
    treatmentIncludedSingular: t('prices.calculator.treatmentIncludedSingular'),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="flex flex-col">
        {/* Hero — light editorial matching /servicii rhythm */}
        <section className="relative overflow-hidden bg-[#faf6f1] py-20 md:py-28">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedServiceHeading bold={t('prices.headingBold')} italic={t('prices.headingItalic')} />
              <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed mt-4">
                {t('prices.subtitle')}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                  {t('prices.heroLabel')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer band */}
        <section className="py-4 bg-white border-b border-[#e8e0d5]">
          <div className="container">
            <p className="text-center text-sm text-[#6b6b6b]">
              {t('prices.disclaimer')}
            </p>
          </div>
        </section>

        {/* Calculator section */}
        <section className="section bg-white scroll-mt-24" id="calculator">
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
