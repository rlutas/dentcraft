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
  // step indicator labels (desktop only)
  stepLabelScenario: string
  stepLabelQuestions: string
  stepLabelResult: string
  // "what happens next" timeline
  nextStepBooking: string
  nextStepBookingTime: string
  nextStepPlan: string
  nextStepPlanTime: string
  nextStepTreatment: string
  nextStepTreatmentTime: string
  // save-by-email CTA
  sendByEmail: string
  sendByEmailTitle: string
  sendByEmailButton: string
  sendByEmailContext: string
  // doctor card
  doctorName: string
  // result-step polish
  investmentLabel: string
  freeConsult: string
  trustPlanLabel: string
  trustMaterialsLabel: string
  trustWarrantyLabel: string
  treatmentsIncluded: string
  treatmentIncludedSingular: string
}

export type { Locale }
