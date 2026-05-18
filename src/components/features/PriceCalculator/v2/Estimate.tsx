'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
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
  const reduce = useReducedMotion()

  const formatLocale = locale === 'hu' ? 'hu-HU' : 'ro-RO'
  const formatPrice = (n: number) =>
    new Intl.NumberFormat(formatLocale, { maximumFractionDigits: 0 }).format(n)

  const showRange = estimate.totalMax > estimate.totalMin

  const trustBadges = [
    { icon: FileText, label: translations.trustPlanLabel },
    { icon: Award, label: translations.trustMaterialsLabel },
    { icon: ShieldCheck, label: translations.trustWarrantyLabel },
  ]

  const nextSteps = [
    { icon: CalendarCheck, label: translations.nextStepBooking, time: translations.nextStepBookingTime },
    { icon: FileText, label: translations.nextStepPlan, time: translations.nextStepPlanTime },
    { icon: Smile, label: translations.nextStepTreatment, time: translations.nextStepTreatmentTime },
  ]

  const openBooking = () => setPopupOpen(true)

  return (
    <div className="space-y-6">
      {/* Total range hero — same white card as line items + timeline */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={reduce ? {} : { opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.4 }}
        className="rounded-2xl bg-white border border-[#e8e0d5] p-6 md:p-8 text-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#8b7355] bg-[#faf6f1] border border-[#e8e0d5] rounded-full px-3 py-1 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {translations.yourEstimate}
          </div>
          <p className="text-sm md:text-base text-[#8b7355] mb-1">{scenarioTitle}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#a89580] mb-4">
            {translations.investmentLabel}
          </p>

          <div className="flex items-end justify-center gap-2 md:gap-3 flex-wrap">
            <CountUp
              end={estimate.totalMin}
              duration={1200}
              className="text-5xl md:text-7xl font-bold text-[#2a2118] tabular-nums leading-none"
            />
            {showRange && (
              <>
                <span className="text-3xl md:text-4xl text-[#8b7355]/60 self-center font-light">–</span>
                <CountUp
                  end={estimate.totalMax}
                  duration={1200}
                  className="text-5xl md:text-7xl font-bold text-[#2a2118] tabular-nums leading-none"
                />
              </>
            )}
            <span className="inline-flex items-center text-sm md:text-base font-semibold text-[#8b7355] bg-white border border-[#e8e0d5] rounded-full px-2.5 py-0.5 self-end mb-2 md:mb-3">
              RON
            </span>
          </div>

          <p className="text-xs md:text-sm text-[#8b7355] mt-5 inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8b7355]" />
            {translations.freeConsult}
          </p>
        </div>
      </motion.div>

      {/* Trust strip — three reassurance badges */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? {} : { opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { delay: 0.15, duration: 0.35 }}
        className="grid grid-cols-3 gap-2 md:gap-3"
      >
        {trustBadges.map(({ icon: Icon, label }, i) => (
          <div
            key={i}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#faf6f1] border border-[#e8e0d5] px-3 py-3 md:py-4"
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#8b7355] flex-shrink-0" strokeWidth={1.5} />
            <span className="text-xs md:text-sm font-medium text-[#2a2118] leading-tight">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Line items */}
      <div className="rounded-2xl bg-white border border-[#e8e0d5] p-5 md:p-6">
        <div className="flex items-baseline justify-between mb-4 gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">
            {translations.perTreatment}
          </h4>
          <span className="text-xs text-[#8b7355] tabular-nums">
            {estimate.lineItems.length}{' '}
            {estimate.lineItems.length === 1
              ? translations.treatmentIncludedSingular
              : translations.treatmentsIncluded}
          </span>
        </div>
        <div className="divide-y divide-[#f5f0e8]">
          {estimate.lineItems.map((li, i) => (
            <motion.div
              key={`${li.label}-${i}`}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={reduce ? {} : { opacity: 1, x: 0 }}
              transition={reduce ? { duration: 0 } : { delay: 0.2 + i * 0.05 }}
              className="flex items-center justify-between py-3 gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base text-[#2a2118] leading-snug break-words">
                  {li.label}
                </div>
                {li.qty > 1 && (
                  <div className="text-xs text-[#8b7355] mt-0.5 tabular-nums">
                    {li.qty} × {formatPrice(li.unitPrice)} RON
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-sm md:text-base font-semibold text-[#2a2118] tabular-nums">
                  {formatPrice(li.total)} RON
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Doctor's note with avatar — quote-styled */}
      {estimate.notes.length > 0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2118] via-[#2a2118] to-[#1a1410] text-white p-5 md:p-6"
        >
          {/* Decorative opening quote */}
          <span
            aria-hidden="true"
            className="absolute top-2 right-4 text-7xl md:text-8xl font-serif text-[#d4c4b0]/15 leading-none select-none"
          >
            “
          </span>

          <div className="relative flex items-start gap-4">
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
            <div className="flex-1 min-w-0 space-y-3">
              {estimate.notes.map((n, i) => (
                <p key={i} className="text-sm md:text-base text-white/90 leading-relaxed">
                  {n}
                </p>
              ))}
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#d4c4b0]">
                  {translations.doctorName}
                </div>
                <div className="text-xs text-white/50 mt-0.5">DENTCRAFT Satu Mare</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* What happens next — timeline */}
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
                <span className="text-[11px] md:text-xs font-semibold text-[#8b7355] bg-[#faf6f1] border border-[#e8e0d5] rounded-full px-2 py-0.5">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Disclaimer (above CTA — don't insert pause after the click decision) */}
      <p className="text-xs text-center text-[#8b7355] leading-relaxed px-4">
        {translations.disclaimer}
      </p>

      {/* CTA — booking (client gets confirmation email automatically) */}
      <button
        type="button"
        onClick={openBooking}
        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2118] to-[#1a1410] text-white font-semibold text-base py-4 px-6 transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(42,33,24,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-out"
        />
        <CalendarCheck className="w-5 h-5 relative" strokeWidth={2} />
        <span className="relative">{translations.bookConsultation}</span>
      </button>

      <PriceEstimatePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        service={{ title: scenarioTitle, slug: estimate.scenarioId }}
        options={{ materialType: null, quantity: 1 }}
        priceRange={{ min: estimate.totalMin, max: estimate.totalMax }}
        locale={locale}
        lineItems={estimate.lineItems.map((li) => ({
          label: li.label,
          qty: li.qty,
          unitPrice: li.unitPrice,
          total: li.total,
          priceType: li.priceType,
        }))}
        notes={estimate.notes}
      />
    </div>
  )
}
