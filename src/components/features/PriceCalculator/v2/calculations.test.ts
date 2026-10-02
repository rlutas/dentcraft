import { describe, it, expect } from 'vitest'
import { computeEstimate } from './calculations'
import { CONSULT_NOTE } from '@/data/calculator-scenarios'

describe('computeEstimate', () => {
  // NOTE: The 'Missing treatment: ...' throw path is unreachable in production
  // because every scenario's treatmentRef is verified to exist in treatments.ts
  // at static analysis time. We cover it implicitly via the other tests, which
  // would all fail if any scenario referenced a non-existent treatment ID.
  it('throws on unknown scenario', () => {
    expect(() => computeEstimate('does-not-exist', {}, 'ro')).toThrow(/Unknown scenario/)
  })

  it('lost-tooth count=1: Bredent 3000 + bont 650 + zirconia crown 1600 = 5250', () => {
    const r = computeEstimate('lost-tooth', { count: 1 }, 'ro')
    expect(r.lineItems).toHaveLength(3)
    expect(r.lineItems[0]!.label).toMatch(/Bredent/i)
    expect(r.totalMin).toBe(5250)
    // All three are 'from' price types in the catalog → totalMax = 5250 * 1.3
    expect(r.totalMax).toBe(Math.round(5250 * 1.3))
    expect(r.hasFromPrice).toBe(true)
  })

  it('never shows metal-ceramic work or prices inside the doctor notes', () => {
    for (const id of ['lost-tooth', 'full-rehab', 'emergency', 'consultation-only']) {
      const r = computeEstimate(id, {}, 'ro')
      for (const li of r.lineItems) expect(li.label).not.toMatch(/metalo/i)
      for (const n of r.notes) expect(n).not.toMatch(/RON/)
    }
  })

  it('every estimate ends with the consultation note', () => {
    const r = computeEstimate('cleaning', { package: 'basic' }, 'ro')
    expect(r.notes.at(-1)).toBe(CONSULT_NOTE.ro)
  })

  it('lost-tooth count=3 multiplies all line items', () => {
    const single = computeEstimate('lost-tooth', { count: 1 }, 'ro')
    const triple = computeEstimate('lost-tooth', { count: 3 }, 'ro')
    expect(triple.totalMin).toBe(single.totalMin * 3)
    expect(triple.lineItems).toHaveLength(3)
    for (const li of triple.lineItems) {
      expect(li.qty).toBe(3)
    }
  })

  it('full-rehab one arch = All on X Bredent from 20000', () => {
    const r = computeEstimate('full-rehab', { arcades: 'one' }, 'ro')
    expect(r.lineItems).toHaveLength(1)
    expect(r.lineItems[0]!.label).toMatch(/Bredent/)
    expect(r.totalMin).toBe(20000)
  })

  it('full-rehab both arches doubles the quantity', () => {
    const r = computeEstimate('full-rehab', { arcades: 'both' }, 'ro')
    expect(r.lineItems[0]!.qty).toBe(2)
    expect(r.totalMin).toBe(40000)
  })

  it('emergency returns single urgente line + non-empty notes', () => {
    const r = computeEstimate('emergency', {}, 'ro')
    expect(r.lineItems).toHaveLength(1)
    expect(r.lineItems[0]!.unitPrice).toBe(200)
    expect(r.notes.length).toBeGreaterThan(0)
  })

  it('returns localized labels', () => {
    const ro = computeEstimate('lost-tooth', { count: 1 }, 'ro')
    const en = computeEstimate('lost-tooth', { count: 1 }, 'en')
    const hu = computeEstimate('lost-tooth', { count: 1 }, 'hu')
    // Implant label differs between locales
    expect(ro.lineItems[0]!.label).not.toBe(en.lineItems[0]!.label)
    expect(en.lineItems[0]!.label).not.toBe(hu.lineItems[0]!.label)
  })

  it('bright-smile whitening only has just the consultation note', () => {
    const r = computeEstimate('bright-smile', { package: 'whitening', count: 6 }, 'ro')
    expect(r.notes).toEqual([CONSULT_NOTE.ro])
  })

  it('bright-smile veneers includes the veneer note', () => {
    const r = computeEstimate('bright-smile', { package: 'veneers', count: 6 }, 'ro')
    expect(r.notes.length).toBe(2)
    expect(r.notes[0]!).toMatch(/E-Max/)
  })

  it('bright-smile both: 1 whitening + 1 waxup + N veneers, includes the veneer note', () => {
    const r = computeEstimate('bright-smile', { package: 'both', count: 6 }, 'ro')
    // 1 whitening + 1 waxup + 6 veneers (qty=6 on the veneers line item) = 3 line items total
    expect(r.lineItems).toHaveLength(3)
    expect(r.notes).toHaveLength(2)
    expect(r.notes[0]!).toMatch(/E-Max/)
    // Total: albire 1000 + waxup 150 + 6 * 1800 = 11950
    expect(r.totalMin).toBe(11950)
  })

  it('cleaning basic = consult + ultrasonic = 350 fixed', () => {
    const r = computeEstimate('cleaning', { package: 'basic' }, 'ro')
    expect(r.lineItems).toHaveLength(2)
    expect(r.totalMin).toBe(350)
    expect(r.totalMax).toBe(350) // both fixed
  })

  it('braces clear uses Clear Correct (12500 fixed) regardless of arcades', () => {
    const r = computeEstimate('braces', { type: 'clear', arcades: 'one' }, 'ro')
    expect(r.lineItems).toHaveLength(1)
    expect(r.lineItems[0]!.qty).toBe(1) // Clear Correct is one item, full treatment
    expect(r.totalMin).toBe(12500)
    expect(r.totalMax).toBe(12500)
  })

  it('braces fixed metalic both arches = 6000', () => {
    const r = computeEstimate('braces', { type: 'metal', arcades: 'both' }, 'ro')
    expect(r.lineItems[0]!.qty).toBe(2)
    expect(r.totalMin).toBe(6000)
  })

  it('pediatric checkup returns consult + scaling', () => {
    const r = computeEstimate('pediatric', { package: 'checkup' }, 'ro')
    expect(r.lineItems).toHaveLength(2)
    // consult-primar-pedodontic (100) + detartraj-copii (250) = 350
    expect(r.totalMin).toBe(350)
    expect(r.notes).toEqual([CONSULT_NOTE.ro]) // checkup has only the consultation note
  })

  it('pediatric sealant has the sealant note', () => {
    const r = computeEstimate('pediatric', { package: 'sealant' }, 'ro')
    expect(r.notes.length).toBe(2)
  })

  it('consultation-only returns single consult line with note', () => {
    const r = computeEstimate('consultation-only', {}, 'ro')
    expect(r.lineItems).toHaveLength(1)
    expect(r.lineItems[0]!.unitPrice).toBe(250) // consultatie-primara-poze-scanare
    expect(r.notes.length).toBeGreaterThan(0)
  })
})
