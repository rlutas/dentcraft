'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { FloatingIcons } from '@/components/ui/FloatingIcons'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { successCases, type SuccessCase } from '@/data/success-cases'

interface SuccessCasesSectionProps {
  viewAllLabel?: string
  extraCases?: SuccessCase[]
}

export function SuccessCasesSection({ viewAllLabel, extraCases = [] }: SuccessCasesSectionProps) {
  const t = useTranslations()
  const headingBold = t('home.successCases.headingBold')
  const headingItalic = t('home.successCases.headingItalic')
  const subtitle = t('home.successCases.subtitle')
  const allCases = [...successCases, ...extraCases]

  // Resolve display strings via i18n
  const display = (item: SuccessCase) => {
    const category = t(`home.successCases.categories.${item.categoryKey}`)
    const titleBase = t(`home.successCases.${item.altKey === 'aestheticCase' ? 'titlePrefix' : 'titlePrefix'}`)
    const title = `${titleBase} #${item.titleNum}`
    const alt = `${title} — DENTCRAFT Satu Mare`
    return { category, title, alt }
  }
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const isOpen = activeIdx !== null

  const close = useCallback(() => setActiveIdx(null), [])
  const next = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i + 1) % allCases.length)),
    []
  )
  const prev = useCallback(
    () =>
      setActiveIdx((i) =>
        i === null ? null : (i - 1 + allCases.length) % allCases.length
      ),
    []
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, next, prev])

  const active = activeIdx !== null ? allCases[activeIdx] : null

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

      <FloatingIcons
        icons={[
          { src: '/icons/008-white-teeth.svg', className: 'top-8 left-3 w-12 h-12 md:top-28 md:left-12 md:w-20 md:h-20 lg:left-24 lg:w-24 lg:h-24', variant: 'driftB', duration: 28, opacity: 0.11 },
          { src: '/icons/010-smile.svg', className: 'top-8 right-3 w-14 h-14 md:top-32 md:right-12 md:w-24 md:h-24 lg:right-24 lg:w-28 lg:h-28', variant: 'driftA', duration: 32, delay: 3, opacity: 0.11 },
        ]}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14 md:mb-20">
          <AnimatedServiceHeading bold={headingBold} italic={headingItalic} />
          <ScrollReveal animation="fade-up" delay={500}>
            <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
          {allCases.map((item, idx) => {
            const d = display(item)
            return (
            <ScrollReveal key={item.id} animation="fade-up" delay={idx * 80}>
              <button
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`${t('home.successCases.viewCaseLabel')}: ${d.title}`}
                className="group relative block w-full overflow-hidden rounded-2xl md:rounded-3xl border border-[#e8e0d5] bg-[#f5f0e8] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.25)] hover:border-[#d4c4b0] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={d.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1600px) 25vw, 400px"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1410]/75 via-[#1a1410]/10 to-transparent transition-opacity duration-500 group-hover:from-[#1a1410]/85" />

                  <div className="absolute top-3 right-3 md:top-4 md:right-4 inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#2a2118] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                    <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.25} aria-hidden="true" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-7 text-left">
                    <span className="block text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[#d4c4b0] mb-2">
                      {d.category}
                    </span>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white leading-tight">
                      {d.title}
                    </h3>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          )})}
        </div>

        {viewAllLabel && (
          <ScrollReveal animation="fade-up" delay={300} className="mt-14 md:mt-16 text-center">
            <Link
              href="/galerie"
              className="group inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300"
            >
              <span>{viewAllLabel}</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.25} />
              </span>
            </Link>
          </ScrollReveal>
        )}
      </div>

      <AnimatePresence>
        {isOpen && active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1410]/85 backdrop-blur-md p-4 md:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={display(active).title}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close() }}
              aria-label={t('ariaLabels.close')}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#2a2118] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c4b0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1410]"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label={t('ariaLabels.prevCase')}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c4b0]"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label={t('ariaLabels.nextCase')}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c4b0]"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[min(90vw,900px)] max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => { const d = display(active); return (<>
              <div className="relative w-full aspect-[4/3] max-h-[78vh] overflow-hidden rounded-2xl md:rounded-3xl bg-[#1a1410] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                <Image
                  src={active.image}
                  alt={d.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 md:mt-5 text-center px-4">
                <span className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#d4c4b0] mb-1.5">
                  {d.category}
                </span>
                <h3 className="text-lg md:text-2xl font-semibold text-white">
                  {d.title}
                </h3>
                <p className="text-xs md:text-sm text-white/50 mt-2">
                  {activeIdx! + 1} / {allCases.length}
                </p>
              </div>
              </>)})()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
