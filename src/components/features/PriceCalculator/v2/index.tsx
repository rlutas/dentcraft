'use client'

import { useMemo, useReducer } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { ScenarioPicker } from './ScenarioPicker'
import { SubQuestions } from './SubQuestions'
import { Estimate } from './Estimate'
import { computeEstimate } from './calculations'
import { getScenario } from '@/data/calculator-scenarios'
import type { CalcState, CalcAction, CalcTranslations } from './types'
import type { Locale } from '@/data/treatments'

const initialState: CalcState = {
  step: 'scenario',
  scenarioId: null,
  answers: {},
}

function reducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case 'select-scenario': {
      const scn = getScenario(action.scenarioId)
      const defaults: Record<string, string | number> = {}
      scn?.questions.forEach((q) => {
        defaults[q.id] = q.default
      })
      const hasQuestions = (scn?.questions.length ?? 0) > 0
      return {
        step: hasQuestions ? 'questions' : 'result',
        scenarioId: action.scenarioId,
        answers: defaults,
      }
    }
    case 'set-answer':
      return { ...state, answers: { ...state.answers, [action.key]: action.value } }
    case 'next':
      if (state.step === 'scenario' && state.scenarioId) {
        return { ...state, step: 'questions' }
      }
      if (state.step === 'questions') {
        return { ...state, step: 'result' }
      }
      return state
    case 'back':
      if (state.step === 'result') {
        const scn = state.scenarioId ? getScenario(state.scenarioId) : null
        return {
          ...state,
          step: (scn?.questions.length ?? 0) > 0 ? 'questions' : 'scenario',
        }
      }
      if (state.step === 'questions') {
        return { ...state, step: 'scenario' }
      }
      return state
    case 'reset':
      return initialState
    default:
      return state
  }
}

type Props = {
  locale: Locale
  translations: CalcTranslations
}

const STEPS: ReadonlyArray<CalcState['step']> = ['scenario', 'questions', 'result']

const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

export function PriceCalculatorV2({ locale, translations }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const scenario = state.scenarioId ? getScenario(state.scenarioId) : null
  const reduce = useReducedMotion()

  // Animation discipline: spring physics for natural step transitions.
  // Reduced motion: collapse to instant changes.
  const stepEnterTransition = reduce
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 280, damping: 28 }

  const estimate = useMemo(() => {
    if (state.step !== 'result' || !state.scenarioId) return null
    return computeEstimate(state.scenarioId, state.answers, locale)
  }, [state.step, state.scenarioId, state.answers, locale])

  const stepIdx = STEPS.indexOf(state.step)

  const stepBgClass =
    state.step === 'scenario'
      ? 'bg-white'
      : state.step === 'questions'
      ? 'bg-gradient-to-b from-white via-[#fdfaf6] to-[#faf6f1]'
      : 'bg-gradient-to-br from-[#faf6f1] via-white to-[#f5f0e8]'

  return (
    <div
      className={[
        'rounded-3xl border border-[#e8e0d5] shadow-[0_8px_32px_-8px_rgba(42,33,24,0.08)] p-5 md:p-8 transition-colors duration-500',
        stepBgClass,
      ].join(' ')}
    >
      {/* Step indicator */}
      <div className="flex items-start justify-center gap-1 mb-6 md:mb-8">
        {STEPS.map((stepKey, i) => {
          const isCurrent = stepIdx === i
          const active = stepIdx >= i
          const stepLabel =
            stepKey === 'scenario'
              ? translations.stepLabelScenario
              : stepKey === 'questions'
              ? translations.stepLabelQuestions
              : translations.stepLabelResult
          return (
            <div key={stepKey} className="flex items-start">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                    active ? 'bg-[#2a2118] text-white' : 'bg-[#f5f0e8] text-[#8b7355]',
                    isCurrent ? 'shadow-[0_0_0_4px_rgba(42,33,24,0.08)]' : '',
                  ].join(' ')}
                >
                  {i + 1}
                </div>
                <span
                  className={[
                    'hidden md:block mt-2 text-[11px] font-medium tracking-wide transition-colors whitespace-nowrap',
                    active ? 'text-[#2a2118]' : 'text-[#8b7355]',
                  ].join(' ')}
                >
                  {stepLabel}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    'w-8 md:w-12 h-px mx-1 mt-4 transition-colors',
                    stepIdx > i ? 'bg-[#2a2118]' : 'bg-[#e8e0d5]',
                  ].join(' ')}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {state.step === 'scenario' && (
            <motion.div
              key="scenario"
              variants={stepVariants}
              initial={reduce ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={stepEnterTransition}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 text-center">
                {translations.scenarioTitle}
              </h2>
              <p className="text-sm md:text-base text-[#8b7355] mb-6 text-center">
                {translations.scenarioSubtitle}
              </p>
              <ScenarioPicker
                locale={locale}
                selectedId={state.scenarioId}
                onSelect={(id) => dispatch({ type: 'select-scenario', scenarioId: id })}
              />
            </motion.div>
          )}

          {state.step === 'questions' && scenario && (
            <motion.div
              key="questions"
              variants={stepVariants}
              initial={reduce ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={stepEnterTransition}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 text-center">
                {translations.questionsTitle}
              </h2>
              <p className="text-sm md:text-base text-[#8b7355] mb-6 text-center">
                {translations.questionsSubtitle}
              </p>
              <SubQuestions
                locale={locale}
                scenario={scenario}
                answers={state.answers}
                onChange={(key, value) => dispatch({ type: 'set-answer', key, value })}
              />
            </motion.div>
          )}

          {state.step === 'result' && scenario && estimate && (
            <motion.div
              key="result"
              variants={stepVariants}
              initial={reduce ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={stepEnterTransition}
            >
              <Estimate
                locale={locale}
                estimate={estimate}
                scenarioTitle={scenario.labels[locale].title}
                translations={translations}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation (hidden on scenario step — selection auto-advances) */}
      {state.step !== 'scenario' && (
        <div className="flex justify-between gap-3 mt-6 md:mt-8 pt-6 border-t border-[#f5f0e8]">
          <button
            type="button"
            onClick={() => dispatch({ type: 'back' })}
            className="group inline-flex items-center gap-2 rounded-full border border-[#e8e0d5] bg-white px-5 py-2.5 text-sm font-medium text-[#2a2118] transition-all duration-300 hover:border-[#d4c4b0] hover:bg-[#faf6f1]"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            {translations.back}
          </button>
          {state.step === 'questions' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'next' })}
              className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2a2118] to-[#1a1410] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_12px_30px_-10px_rgba(42,33,24,0.45)] hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-out"
              />
              <span className="relative">{translations.next}</span>
              <ArrowRight
                className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          )}
          {state.step === 'result' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
              className="group inline-flex items-center gap-2 rounded-full border border-[#e8e0d5] bg-white px-5 py-2.5 text-sm font-medium text-[#2a2118] transition-all duration-300 hover:border-[#d4c4b0] hover:bg-[#faf6f1]"
            >
              <RefreshCw
                className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180"
                strokeWidth={2}
              />
              {translations.reset}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
