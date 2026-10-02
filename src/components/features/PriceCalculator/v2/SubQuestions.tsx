'use client'

import { useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ClipboardList, Minus, Plus, Stethoscope } from 'lucide-react'
import type { Scenario, ScenarioAnswer, SubQuestion } from '@/data/calculator-scenarios'
import type { Locale } from '@/data/treatments'
import { computeEstimate } from './calculations'

type Props = {
  locale: Locale
  scenario: Scenario
  answers: ScenarioAnswer
  onChange: (key: string, value: string | number) => void
  includesTitle: string
  includesNote: string
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

export function SubQuestions({
  locale,
  scenario,
  answers,
  onChange,
  includesTitle,
  includesNote,
}: Props) {
  const reduce = useReducedMotion()
  const questions = scenario.questions.filter((q) => !q.showIf || q.showIf(answers))

  // Live preview of what the estimate will contain — names only, prices come on
  // the result step. Updates as the patient changes answers.
  const included = useMemo(
    () => computeEstimate(scenario.id, answers, locale).lineItems,
    [scenario.id, answers, locale],
  )

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-6 items-start">
      <div className="space-y-5">
        <AnimatePresence initial={false}>
          {questions.map((q, idx) => (
            <motion.fieldset
              key={q.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={reduce ? { duration: 0 } : { delay: idx * 0.06, duration: 0.3 }}
              className="rounded-2xl border border-[#e8e0d5] bg-white p-5 md:p-6"
            >
              <legend className="sr-only">{q.labels[locale]}</legend>
              <p aria-hidden="true" className="text-base md:text-lg font-semibold text-[#2a2118] mb-4">
                {q.labels[locale]}
              </p>
              {q.type === 'count' ? (
                <CountInput
                  question={q}
                  locale={locale}
                  value={Number(answers[q.id] ?? q.default)}
                  onChange={(n) => onChange(q.id, n)}
                />
              ) : (
                <OptionCards
                  question={q}
                  locale={locale}
                  value={answers[q.id] ?? q.default}
                  onChange={(v) => onChange(q.id, v)}
                />
              )}
            </motion.fieldset>
          ))}
        </AnimatePresence>
      </div>

      <aside
        aria-live="polite"
        className="rounded-2xl border border-[#e8e0d5] bg-[#faf6f1] p-5 md:p-6 md:sticky md:top-28"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-8 h-8 rounded-full bg-white border border-[#e8e0d5] flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-[#8b7355]" strokeWidth={1.75} />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">
            {includesTitle}
          </h3>
        </div>
        <ul className="space-y-2.5">
          {included.map((li) => (
            <li key={li.label} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#8b7355]" strokeWidth={2.25} />
              <span className="text-sm md:text-[15px] text-[#2a2118] leading-snug">
                {li.label}
                {li.qty > 1 && (
                  <span className="ml-1.5 text-[#8b7355] tabular-nums">× {li.qty}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 pt-4 border-t border-[#e8e0d5] flex items-start gap-2 text-xs md:text-sm text-[#6b5a45] leading-relaxed">
          <Stethoscope className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
          {includesNote}
        </p>
      </aside>
    </div>
  )
}

function OptionCards({
  question,
  locale,
  value,
  onChange,
}: {
  question: SubQuestion
  locale: Locale
  value: string | number
  onChange: (v: string) => void
}) {
  return (
    <div role="radiogroup" aria-label={question.labels[locale]} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {question.options?.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={[
              'flex items-start gap-3 min-h-[56px] p-4 rounded-xl border-2 text-left cursor-pointer transition-[border-color,background-color,box-shadow] duration-200',
              focusRing,
              selected
                ? 'border-[#2a2118] bg-[#faf6f1] shadow-[0_8px_20px_-10px_rgba(42,33,24,0.25)]'
                : 'border-[#e8e0d5] bg-white hover:border-[#d4c4b0] hover:bg-[#fdfbf8]',
            ].join(' ')}
          >
            <span
              aria-hidden="true"
              className={[
                'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200',
                selected ? 'border-[#2a2118] bg-[#2a2118]' : 'border-[#d4c4b0] bg-white',
              ].join(' ')}
            >
              {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-[#2a2118] leading-snug">{opt.labels[locale]}</span>
              {opt.hint?.[locale] && (
                <span className="block text-xs text-[#8b7355] mt-1 leading-snug">{opt.hint[locale]}</span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function CountInput({
  question,
  locale,
  value,
  onChange,
}: {
  question: SubQuestion
  locale: Locale
  value: number
  onChange: (n: number) => void
}) {
  const min = question.min ?? 1
  const max = question.max ?? 10
  const unit = question.unit?.[locale]
  const unitLabel = unit ? (value === 1 ? unit.one : unit.other) : null
  const btn = [
    'w-12 h-12 rounded-full border-2 border-[#e8e0d5] bg-white text-[#2a2118] cursor-pointer flex items-center justify-center',
    'transition-colors duration-200 hover:border-[#2a2118] hover:bg-[#faf6f1] active:scale-95',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#e8e0d5] disabled:hover:bg-white',
    focusRing,
  ].join(' ')

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#faf6f1] px-3 py-3">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={btn}
        aria-label={`− ${question.labels[locale]}`}
      >
        <Minus className="w-5 h-5" />
      </button>
      <div className="text-center" aria-live="polite">
        <span className="block text-4xl md:text-5xl font-semibold text-[#2a2118] tabular-nums leading-none">
          {value}
        </span>
        {unitLabel && (
          <span className="block mt-1.5 text-xs font-medium uppercase tracking-wider text-[#8b7355]">
            {unitLabel}
          </span>
        )}
      </div>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={btn}
        aria-label={`+ ${question.labels[locale]}`}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  )
}
