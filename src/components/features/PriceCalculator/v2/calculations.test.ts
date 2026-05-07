import { describe, it, expect } from 'vitest'
import { computeEstimate } from './calculations'

describe('computeEstimate', () => {
  it('throws on unknown scenario', () => {
    expect(() => computeEstimate('does-not-exist', {}, 'ro')).toThrow(/Unknown scenario/)
  })

  it('lost-tooth economic, count=1: implant 2200 + bont 650 + crown 1200 = 4050', () => {
    const r = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'ro')
    expect(r.lineItems).toHaveLength(3)
    expect(r.totalMin).toBe(4050)
    // All three are 'from' price types in the catalog → totalMax = 4050 * 1.3 = 5265
    expect(r.totalMax).toBe(Math.round(4050 * 1.3))
    expect(r.hasFromPrice).toBe(true)
  })

  it('lost-tooth count=3 multiplies line items', () => {
    const single = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'ro')
    const triple = computeEstimate('lost-tooth', { count: 3, tier: 'economic' }, 'ro')
    expect(triple.totalMin).toBe(single.totalMin * 3)
    expect(triple.lineItems[0]!.qty).toBe(3)
  })

  it('full-rehab one arch economic = 13000 fixed', () => {
    const r = computeEstimate('full-rehab', { arcades: 'one', tier: 'economic' }, 'ro')
    expect(r.lineItems).toHaveLength(1)
    expect(r.totalMin).toBe(13000)
    expect(r.totalMax).toBe(13000) // fixed price, no markup
    expect(r.hasFromPrice).toBe(false)
  })

  it('full-rehab both arches premium = 25000 * 2 = 50000', () => {
    const r = computeEstimate('full-rehab', { arcades: 'both', tier: 'premium' }, 'ro')
    expect(r.lineItems[0]!.qty).toBe(2)
    expect(r.totalMin).toBe(50000)
    expect(r.totalMax).toBe(50000)
  })

  it('emergency returns single urgente line + non-empty notes', () => {
    const r = computeEstimate('emergency', {}, 'ro')
    expect(r.lineItems).toHaveLength(1)
    expect(r.lineItems[0]!.unitPrice).toBe(200)
    expect(r.notes.length).toBeGreaterThan(0)
  })

  it('returns localized labels', () => {
    const ro = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'ro')
    const en = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'en')
    const hu = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'hu')
    // Implant label differs between locales
    expect(ro.lineItems[0]!.label).not.toBe(en.lineItems[0]!.label)
    expect(en.lineItems[0]!.label).not.toBe(hu.lineItems[0]!.label)
  })

  it('bright-smile whitening only has no notes', () => {
    const r = computeEstimate('bright-smile', { package: 'whitening', count: 6 }, 'ro')
    expect(r.notes).toEqual([])
  })

  it('bright-smile veneers includes the veneer note', () => {
    const r = computeEstimate('bright-smile', { package: 'veneers', count: 6 }, 'ro')
    expect(r.notes.length).toBe(1)
    expect(r.notes[0]!).toMatch(/E-Max/)
  })

  it('cleaning basic = consult + ultrasonic = 350 fixed', () => {
    const r = computeEstimate('cleaning', { package: 'basic' }, 'ro')
    expect(r.lineItems).toHaveLength(2)
    expect(r.totalMin).toBe(350)
    expect(r.totalMax).toBe(350) // both fixed
  })
})
