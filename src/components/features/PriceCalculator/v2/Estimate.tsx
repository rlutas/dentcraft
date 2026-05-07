'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, FileText, Mail, Smile, Sparkles, Stethoscope } from 'lucide-react'
import { CountUp } from '@/components/ui/CountUp'
import type { Estimate as EstimateType } from './calculations'
import type { CalcTranslations } from './types'
import type { Locale } from '@/data/treatments'

// Dynamically import to keep popup out of initial bundle
const PriceEstimatePopup = dynamic(() => import('../PriceEstimatePopup'), {
  ssr: false,
})

type Props = {
  locale: Locale
  estimate: EstimateType
  scenarioTitle: string
  translations: CalcTranslations
}

const DOCTOR_PHOTO_URL = 'https://drpetric.ro/wp-content/uploads/2024/11/stomatolog-satu-mare.png'

export function Estimate({ locale, estimate, scenarioTitle, translations }: Props) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [saveMode, setSaveMode] = useState(false)
  const reduce = useReducedMotion()

  const formatLocale = locale === 'hu' ? 'hu-HU' : 'ro-RO'
  const formatPrice = (n: number) =>
    new Intl.NumberFormat(formatLocale, { maximumFractionDigits: 0 }).format(n)

  const showRange = estimate.totalMax > estimate.totalMin
  const fromPrefix = locale === 'ro' ? 'de la' : locale === 'hu' ? '-tól' : 'from'

  const nextSteps = [
    { icon: CalendarCheck, label: translations.nextStepBooking, time: translations.nextStepBookingTime },
    { icon: FileText, label: translations.nextStepPlan, time: translations.nextStepPlanTime },
    { icon: Smile, label: translations.nextStepTreatment, time: translations.nextStepTreatmentTime },
  ]

  const openBooking = () => {
    setSaveMode(false)
    setPopupOpen(true)
  }

  const openSaveByEmail = () => {
    setSaveMode(true)
    setPopupOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Total range hero */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={reduce ? {} : { opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-br from-[#faf6f1] via-white to-[#f5f0e8] border border-[#e8e0d5] p-6 md:p-8 text-center"
      >
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#8b7355] bg-white border border-[#e8e0d5] rounded-full px-3 py-1 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          {translations.yourEstimate}
        </div>
        <p className="text-sm text-[#8b7355] mb-2">{scenarioTitle}</p>
        <div className="flex items-end justify-center gap-2 md:gap-3 flex-wrap">
          <CountUp
            end={estimate.totalMin}
            duration={1200}
            className="text-4xl md:text-6xl font-bold text-[#2a2118] tabular-nums"
          />
          {showRange && (
            <>
              <span className="text-2xl md:text-3xl text-[#8b7355] self-center">–</span>
              <CountUp
                end={estimate.totalMax}
                duration={1200}
                className="text-4xl md:text-6xl font-bold text-[#2a2118] tabular-nums"
              />
            </>
          )}
          <span className="text-xl md:text-2xl font-medium text-[#2a2118] pb-1 md:pb-2">RON</span>
        </div>
        <p className="text-xs md:text-sm text-[#8b7355] mt-3">{translations.totalRange}</p>
      </motion.div>

      {/* Line items */}
      <div className="rounded-2xl bg-white border border-[#e8e0d5] p-5 md:p-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7355] mb-4">
          {translations.perTreatment}
        </h4>
        <div className="divide-y divide-[#f5f0e8]">
          {estimate.lineItems.map((li, i) => (
            <motion.div
              key={`${li.label}-${i}`}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={reduce ? {} : { opacity: 1, x: 0 }}
              transition={reduce ? { duration: 0 } : { delay: 0.15 + i * 0.05 }}
              className="flex items-center justify-between py-3 gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base text-[#2a2118] truncate">{li.label}</div>
                {li.qty > 1 && (
                  <div className="text-xs text-[#8b7355] mt-0.5 tabular-nums">
                    {li.qty} × {formatPrice(li.unitPrice)} RON
                  </div>
                )}
              </div>
              <div className="text-sm md:text-base font-semibold text-[#2a2118] whitespace-nowrap tabular-nums">
                {li.priceType === 'from' && (
                  <span className="text-sm font-normal text-[#8b7355] mr-1">{fromPrefix}</span>
                )}
                {formatPrice(li.total)} RON
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Doctor's note with avatar */}
      {estimate.notes.length > 0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.4 }}
          className="rounded-2xl bg-[#2a2118] text-white p-5 md:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <Image
                src={DOCTOR_PHOTO_URL}
                alt={translations.doctorName}
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top ring-2 ring-[#d4c4b0]"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#d4c4b0] flex items-center justify-center ring-2 ring-[#2a2118]">
                <Stethoscope className="w-3.5 h-3.5 text-[#2a2118]" />
              </div>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#d4c4b0]">
                {translations.doctorName}
              </div>
              {estimate.notes.map((n, i) => (
                <p key={i} className="text-sm md:text-base text-white/90 leading-relaxed">
                  {n}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* What happens next — timeline with connecting line */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? {} : { opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { delay: 0.5 }}
        className="rounded-2xl border border-[#e8e0d5] p-5 md:p-6 bg-white"
      >
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7355] mb-5">
          {translations.whatHappensNext}
        </h4>
        <div className="relative">
          {/* connecting line behind the icon circles */}
          <div className="absolute top-5 left-[16%] right-[16%] h-px bg-[#e8e0d5]" />
          <div className="grid grid-cols-3 gap-3 md:gap-4 relative">
            {nextSteps.map(({ icon: Icon, label, time }, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border border-[#e8e0d5] flex items-center justify-center relative z-10">
                  <Icon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                </div>
                <span className="text-xs md:text-sm text-[#2a2118] font-medium leading-tight">
                  {label}
                </span>
                <span className="text-[10px] md:text-xs text-[#8b7355]">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={openBooking}
          className="w-full btn btn-lg btn-primary flex items-center justify-center gap-2"
        >
          <CalendarCheck className="w-5 h-5" />
          {translations.bookConsultation}
        </button>
        <button
          type="button"
          onClick={openSaveByEmail}
          className="w-full text-sm text-[#8b7355] hover:text-[#2a2118] transition-colors flex items-center justify-center gap-2 py-2"
        >
          <Mail className="w-4 h-4" />
          {translations.sendByEmail}
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-[#8b7355] leading-relaxed">{translations.disclaimer}</p>

      <PriceEstimatePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        service={{ title: scenarioTitle, slug: estimate.scenarioId }}
        options={{ materialType: null, quantity: 1 }}
        priceRange={{ min: estimate.totalMin, max: estimate.totalMax }}
        locale={locale}
        saveMode={saveMode}
        saveModeTitle={translations.sendByEmailTitle}
        saveModeContext={translations.sendByEmailContext}
        saveModeButton={translations.sendByEmailButton}
        lineItems={estimate.lineItems.map((li) => ({
          label: li.label,
          qty: li.qty,
          unitPrice: li.unitPrice,
          total: li.total,
          priceType: li.priceType,
        }))}
      />
    </div>
  )
}
