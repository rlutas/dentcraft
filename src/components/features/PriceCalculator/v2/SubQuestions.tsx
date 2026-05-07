'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import type { Scenario, ScenarioAnswer } from '@/data/calculator-scenarios'
import type { Locale } from '@/data/treatments'

type Props = {
  locale: Locale
  scenario: Scenario
  answers: ScenarioAnswer
  onChange: (key: string, value: string | number) => void
}

export function SubQuestions({ locale, scenario, answers, onChange }: Props) {
  const reduce = useReducedMotion()

  return (
    <div className="space-y-8">
      {scenario.questions.map((q, idx) => {
        const currentValue = answers[q.id] ?? q.default

        return (
          <motion.div
            key={q.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { delay: idx * 0.08, duration: 0.35 }}
          >
            <h3 className="text-base md:text-lg font-semibold text-[#2a2118] mb-3 text-center">
              {q.labels[locale]}
            </h3>

            {q.type === 'count' && (
              <CountInput
                value={Number(currentValue)}
                min={q.min ?? 1}
                max={q.max ?? 10}
                onChange={(n) => onChange(q.id, n)}
              />
            )}

            {q.type !== 'count' && q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => {
                  const selected = currentValue === opt.value

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange(q.id, opt.value)}
                      aria-pressed={selected}
                      className={[
                        'p-4 rounded-xl border-2 text-left transition-all',
                        selected
                          ? 'border-[#2a2118] bg-[#faf6f1] shadow-[0_8px_20px_-8px_rgba(42,33,24,0.18)]'
                          : 'border-[#e8e0d5] bg-white hover:border-[#d4c4b0]',
                      ].join(' ')}
                    >
                      <div className="font-medium text-[#2a2118]">{opt.labels[locale]}</div>
                      {opt.hint?.[locale] && (
                        <div className="text-xs text-[#8b7355] mt-1 leading-snug">
                          {opt.hint[locale]}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

function CountInput({
  value,
  min,
  max,
  onChange,
}: {
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-12 h-12 rounded-xl border-2 border-[#e8e0d5] hover:border-[#2a2118] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        aria-label="Decrease"
      >
        <Minus className="w-5 h-5" />
      </button>
      <div className="w-20 text-center">
        <span className="text-4xl md:text-5xl font-semibold text-[#2a2118] tabular-nums">{value}</span>
      </div>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-12 h-12 rounded-xl border-2 border-[#e8e0d5] hover:border-[#2a2118] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        aria-label="Increase"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  )
}
