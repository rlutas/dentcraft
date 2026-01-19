'use client'

import { ArrowLeft, Calculator, CalendarCheck, RefreshCw } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { CalculatorOptions } from './OptionsForm'
import type { CalculatorService } from './index'

// Base price ranges for services (min/max per unit in RON)
const servicePriceRanges: Record<
  string,
  { max: number; min: number; premiumMultiplier?: number }
> = {
  // Common service slugs (Romanian and English variants)
  'albire-dentara': { max: 1500, min: 800 },
  'consultatie-stomatologica': { max: 150, min: 100 },
  consultation: { max: 150, min: 100 },
  'coroane-dentare': { max: 2500, min: 1200, premiumMultiplier: 1.8 },
  crown: { max: 2500, min: 1200, premiumMultiplier: 1.8 },
  crowns: { max: 2500, min: 1200, premiumMultiplier: 1.8 },
  detartraj: { max: 400, min: 200 },
  'endodontie': { max: 1200, min: 600 },
  'extractie-dentara': { max: 600, min: 200 },
  extraction: { max: 600, min: 200 },
  'fatete-dentare': { max: 3500, min: 1800, premiumMultiplier: 1.6 },
  'implant': { max: 4500, min: 2500, premiumMultiplier: 1.5 },
  'implanturi-dentare': { max: 4500, min: 2500, premiumMultiplier: 1.5 },
  implants: { max: 4500, min: 2500, premiumMultiplier: 1.5 },
  'obturatii-dentare': { max: 450, min: 180 },
  'ortodontie': { max: 15000, min: 5000 },
  orthodontics: { max: 15000, min: 5000 },
  'parodontologie': { max: 1000, min: 300 },
  'pedodontie': { max: 400, min: 150 },
  'proteze-dentare': { max: 5000, min: 1500, premiumMultiplier: 1.7 },
  prosthetics: { max: 5000, min: 1500, premiumMultiplier: 1.7 },
  'radiografie-dentara': { max: 200, min: 50 },
  'restaurari-dentare': { max: 600, min: 250 },
  scaling: { max: 400, min: 200 },
  veneer: { max: 3500, min: 1800, premiumMultiplier: 1.6 },
  veneers: { max: 3500, min: 1800, premiumMultiplier: 1.6 },
  whitening: { max: 1500, min: 800 },
}

// Default price range fallback
const defaultPriceRange = { max: 800, min: 300 }

// Find matching price range for a service
function getPriceRange(serviceSlug: string): {
  max: number
  min: number
  premiumMultiplier?: number
} {
  // Try exact match first
  const exactMatch = servicePriceRanges[serviceSlug]
  if (exactMatch) {
    return exactMatch
  }

  // Try partial match
  const slugLower = serviceSlug.toLowerCase()
  for (const [key, value] of Object.entries(servicePriceRanges)) {
    if (slugLower.includes(key) || key.includes(slugLower)) {
      return value
    }
  }

  return defaultPriceRange
}

type ResultsProps = {
  locale: string
  onBack: () => void
  onReset: () => void
  options: CalculatorOptions
  service: CalculatorService
  translations: {
    back: string
    details: string
    disclaimer: string
    estimatedPrice: string
    material: string
    materialPremium: string
    materialStandard: string
    priceRange: string
    quantity: string
    quantityUnit: string
    reset: string
    scheduleConsultation: string
    service: string
  }
}

export function Results({
  locale,
  onBack,
  onReset,
  options,
  service,
  translations,
}: ResultsProps) {
  const { quantity, materialType } = options
  const priceData = getPriceRange(service.slug)

  // Calculate base prices
  let minPrice = priceData.min * quantity
  let maxPrice = priceData.max * quantity

  // Apply premium multiplier if premium material selected
  if (materialType === 'premium' && priceData.premiumMultiplier) {
    minPrice = Math.round(minPrice * priceData.premiumMultiplier)
    maxPrice = Math.round(maxPrice * priceData.premiumMultiplier)
  }

  // Format price in RON
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'hu' ? 'hu-HU' : 'ro-RO', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      style: 'decimal',
    }).format(price)
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
          <Calculator
            className="w-8 h-8 text-[var(--color-primary)]"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
          {translations.estimatedPrice}
        </h3>
        <p className="text-muted">{service.title}</p>
      </div>

      {/* Price Display */}
      <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 rounded-2xl p-6 md:p-8 mb-6">
        <div className="text-center">
          <p className="text-sm text-muted mb-2">{translations.priceRange}</p>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
              {formatPrice(minPrice)}
            </span>
            <span className="text-xl md:text-2xl text-muted">-</span>
            <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
              {formatPrice(maxPrice)}
            </span>
            <span className="text-xl md:text-2xl font-medium text-[var(--color-text)]">
              RON
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-4 md:p-6 mb-6">
        <h4 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">
          {translations.details}
        </h4>
        <div className="space-y-3">
          {/* Service */}
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text)]">{translations.service}</span>
            <span className="font-medium text-[var(--color-text)]">
              {service.title}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text)]">
              {translations.quantity}
            </span>
            <span className="font-medium text-[var(--color-text)]">
              {quantity} {translations.quantityUnit}
            </span>
          </div>

          {/* Material (if selected) */}
          {materialType && (
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text)]">
                {translations.material}
              </span>
              <span className="font-medium text-[var(--color-text)]">
                {materialType === 'premium'
                  ? translations.materialPremium
                  : translations.materialStandard}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-amber-800 text-center">
          ⚠️ {translations.disclaimer}
        </p>
      </div>

      {/* CTA Button */}
      <div className="mb-6">
        <Link
          className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
          href="/contact"
        >
          <CalendarCheck className="w-5 h-5" strokeWidth={1.5} />
          {translations.scheduleConsultation}
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-accent-light)]"
          type="button"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          {translations.back}
        </button>

        <button
          className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-accent-light)]"
          type="button"
          onClick={onReset}
        >
          <RefreshCw className="w-5 h-5" strokeWidth={1.5} />
          {translations.reset}
        </button>
      </div>
    </div>
  )
}
