'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { scenarios } from '@/data/calculator-scenarios'
import type { Locale } from '@/data/treatments'

type ScenarioPickerProps = {
  locale: Locale
  selectedId: string | null
  onSelect: (id: string) => void
}

// "Major" scenarios get a slightly warmer card background so the grid has
// visual rhythm instead of 8 identical white tiles.
const MAJOR_SCENARIOS = new Set(['lost-tooth', 'full-rehab', 'bright-smile', 'braces'])

export function ScenarioPicker({ locale, selectedId, onSelect }: ScenarioPickerProps) {
  const reduce = useReducedMotion()
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {scenarios.map((s, idx) => {
        const isSelected = selectedId === s.id
        const isMajor = MAJOR_SCENARIOS.has(s.id)
        return (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { delay: idx * 0.04, duration: 0.3 }}
            {...(reduce ? {} : { whileHover: { y: -4 }, whileTap: { scale: 0.98 } })}
            className={[
              'group relative flex flex-col items-start gap-3 p-4 md:p-5 rounded-2xl border-2 text-left transition-all',
              isSelected
                ? 'border-[#2a2118] bg-[#faf6f1] shadow-[0_12px_30px_-8px_rgba(42,33,24,0.25)]'
                : isMajor
                ? 'border-[#e8e0d5] bg-[#fdfaf6] hover:border-[#d4c4b0] hover:shadow-[0_8px_24px_-8px_rgba(139,115,85,0.18)]'
                : 'border-[#e8e0d5] bg-white hover:border-[#d4c4b0] hover:shadow-[0_8px_24px_-8px_rgba(139,115,85,0.18)]',
            ].join(' ')}
            aria-pressed={isSelected}
          >
            <div
              className={[
                'w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-colors',
                isSelected ? 'bg-[#2a2118]' : 'bg-[#faf6f1] group-hover:bg-[#f5f0e8]',
              ].join(' ')}
            >
              <Image
                src={`/icons/${s.icon}`}
                alt=""
                width={32}
                height={32}
                className={['transition-all', isSelected ? 'invert brightness-0' : ''].join(' ')}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#2a2118] text-sm md:text-base leading-tight">
                {s.labels[locale].title}
              </h3>
              <p className="text-xs md:text-sm text-[#8b7355] mt-1 leading-snug">
                {s.labels[locale].subtitle}
              </p>
            </div>
            {isSelected && (
              <motion.div
                layoutId="scenario-indicator"
                className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#2a2118] flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
