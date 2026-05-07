'use client'

import { useMemo, useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
      <div className="flex items-center justify-center gap-1 mb-6 md:mb-8">
        {STEPS.map((_, i) => {
          const isCurrent = stepIdx === i
          const active = stepIdx >= i
          return (
            <div key={i} className="flex items-center">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                  active ? 'bg-[#2a2118] text-white' : 'bg-[#f5f0e8] text-[#8b7355]',
                  isCurrent ? 'shadow-[0_0_0_4px_rgba(42,33,24,0.08)]' : '',
                ].join(' ')}
              >
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    'w-8 md:w-12 h-px mx-1 transition-colors',
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
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
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
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
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
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
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
            className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[#e8e0d5] text-[#2a2118] hover:bg-[#faf6f1]"
          >
            <ArrowLeft className="w-5 h-5" />
            {translations.back}
          </button>
          {state.step === 'questions' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'next' })}
              className="btn btn-lg btn-primary flex items-center gap-2"
            >
              {translations.next}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          {state.step === 'result' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
              className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[#e8e0d5] text-[#2a2118] hover:bg-[#faf6f1]"
            >
              <RefreshCw className="w-5 h-5" />
              {translations.reset}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
