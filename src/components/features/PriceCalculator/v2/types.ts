import type { Locale } from '@/data/treatments'
import type { ScenarioAnswer } from '@/data/calculator-scenarios'

export type CalcStep = 'scenario' | 'questions' | 'result'

export type CalcState = {
  step: CalcStep
  scenarioId: string | null
  answers: ScenarioAnswer
}

export type CalcAction =
  | { type: 'select-scenario'; scenarioId: string }
  | { type: 'set-answer'; key: string; value: string | number }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }

export type CalcTranslations = {
  back: string
  reset: string
  next: string
  scenarioTitle: string
  scenarioSubtitle: string
  questionsTitle: string
  questionsSubtitle: string
  estimateTitle: string
  totalRange: string
  perTreatment: string
  bookConsultation: string
  doctorTip: string
  disclaimer: string
  yourEstimate: string
  whatHappensNext: string
}

export type { Locale }
