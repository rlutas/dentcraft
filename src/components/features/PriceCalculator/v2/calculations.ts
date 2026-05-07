import { findTreatment, type Locale } from '@/data/treatments'
import { getScenario, type ScenarioAnswer } from '@/data/calculator-scenarios'

export type ResolvedLineItem = {
  label: string
  unitPrice: number
  qty: number
  total: number
  priceType: 'fixed' | 'from'
}

export type Estimate = {
  scenarioId: string
  lineItems: ResolvedLineItem[]
  totalMin: number
  totalMax: number
  notes: string[]
  hasFromPrice: boolean
}

export const FROM_PRICE_MARKUP = 1.3

export function computeEstimate(
  scenarioId: string,
  answers: ScenarioAnswer,
  locale: Locale,
): Estimate {
  const scenario = getScenario(scenarioId)
  if (!scenario) {
    throw new Error('Unknown scenario: ' + scenarioId)
  }

  const resolved = scenario.resolve(answers)

  const lineItems: ResolvedLineItem[] = resolved.items.map((item) => {
    const treatment = findTreatment(item.treatmentRef.categoryId, item.treatmentRef.treatmentId)
    if (!treatment) {
      throw new Error(
        'Missing treatment: ' + item.treatmentRef.categoryId + '/' + item.treatmentRef.treatmentId,
      )
    }
    return {
      label: treatment.labels[locale],
      unitPrice: treatment.price,
      qty: item.qty,
      total: treatment.price * item.qty,
      priceType: treatment.priceType,
    }
  })

  const totalMinRaw = lineItems.reduce((sum, li) => sum + li.total, 0)
  const totalMaxRaw = lineItems.reduce(
    (sum, li) => sum + (li.priceType === 'from' ? li.total * FROM_PRICE_MARKUP : li.total),
    0,
  )

  const notes = (resolved.notes ?? []).map((n) => n[locale])
  const hasFromPrice = lineItems.some((li) => li.priceType === 'from')

  return {
    scenarioId,
    lineItems,
    totalMin: Math.round(totalMinRaw),
    totalMax: Math.round(totalMaxRaw),
    notes,
    hasFromPrice,
  }
}
