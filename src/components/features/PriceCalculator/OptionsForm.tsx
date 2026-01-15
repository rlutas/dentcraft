'use client'

import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react'

// Options data based on selected service
export type CalculatorOptions = {
  materialType: 'standard' | 'premium' | null
  quantity: number
}

type OptionsFormProps = {
  onBack: () => void
  onChange: (options: CalculatorOptions) => void
  onNext: () => void
  options: CalculatorOptions
  serviceSlug: string
  translations: {
    back: string
    calculate: string
    material: string
    materialPremium: string
    materialPremiumDesc: string
    materialStandard: string
    materialStandardDesc: string
    optionsSubtitle: string
    optionsTitle: string
    quantity: string
    quantityUnit: string
  }
}

// Services that have material options (e.g., implants, crowns, veneers)
const servicesWithMaterials = [
  'implanturi-dentare',
  'implant',
  'coroane-dentare',
  'crown',
  'fatete-dentare',
  'veneer',
  'proteze-dentare',
  'prosthetics',
]

// Get quantity unit based on service type
function getQuantityUnit(serviceSlug: string, defaultUnit: string): string {
  // Most dental services count by teeth/units
  if (
    serviceSlug.includes('implant') ||
    serviceSlug.includes('fatete') ||
    serviceSlug.includes('veneer') ||
    serviceSlug.includes('coroane') ||
    serviceSlug.includes('crown')
  ) {
    return defaultUnit // teeth/units
  }
  // Some services might count by sessions
  if (
    serviceSlug.includes('albire') ||
    serviceSlug.includes('whitening') ||
    serviceSlug.includes('tratament') ||
    serviceSlug.includes('treatment')
  ) {
    return defaultUnit
  }
  return defaultUnit
}

export function OptionsForm({
  onBack,
  onChange,
  onNext,
  options,
  serviceSlug,
  translations,
}: OptionsFormProps) {
  const hasMaterialOptions = servicesWithMaterials.some((s) =>
    serviceSlug.toLowerCase().includes(s)
  )

  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(32, options.quantity + delta))
    onChange({ ...options, quantity: newQuantity })
  }

  // Handle material selection
  const handleMaterialSelect = (material: 'standard' | 'premium') => {
    onChange({ ...options, materialType: material })
  }

  // Check if can proceed
  const canProceed = hasMaterialOptions ? options.materialType !== null : true

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
          {translations.optionsTitle}
        </h3>
        <p className="text-muted">{translations.optionsSubtitle}</p>
      </div>

      {/* Options */}
      <div className="space-y-8 mb-8">
        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-3">
            {translations.quantity}
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              className={`
                w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all
                ${
                  options.quantity > 1
                    ? 'border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)]'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }
              `}
              disabled={options.quantity <= 1}
              onClick={() => handleQuantityChange(-1)}
              type="button"
            >
              <Minus className="w-5 h-5" strokeWidth={2} />
            </button>

            <div className="w-24 text-center">
              <span className="text-4xl font-semibold text-[var(--color-primary)]">
                {options.quantity}
              </span>
              <p className="text-sm text-muted mt-1">
                {getQuantityUnit(serviceSlug, translations.quantityUnit)}
              </p>
            </div>

            <button
              className={`
                w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all
                ${
                  options.quantity < 32
                    ? 'border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)]'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }
              `}
              disabled={options.quantity >= 32}
              onClick={() => handleQuantityChange(1)}
              type="button"
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Material Options (if applicable) */}
        {hasMaterialOptions && (
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-3">
              {translations.material}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Standard Material */}
              <button
                aria-pressed={options.materialType === 'standard'}
                className={`
                  p-5 rounded-xl border-2 text-left transition-all duration-200
                  ${
                    options.materialType === 'standard'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50'
                  }
                `}
                onClick={() => handleMaterialSelect('standard')}
                type="button"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
                    ${
                      options.materialType === 'standard'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                        : 'border-[var(--color-border)]'
                    }
                  `}
                  >
                    {options.materialType === 'standard' && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${options.materialType === 'standard' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}
                    >
                      {translations.materialStandard}
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      {translations.materialStandardDesc}
                    </p>
                  </div>
                </div>
              </button>

              {/* Premium Material */}
              <button
                aria-pressed={options.materialType === 'premium'}
                className={`
                  p-5 rounded-xl border-2 text-left transition-all duration-200
                  ${
                    options.materialType === 'premium'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50'
                  }
                `}
                onClick={() => handleMaterialSelect('premium')}
                type="button"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
                    ${
                      options.materialType === 'premium'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                        : 'border-[var(--color-border)]'
                    }
                  `}
                  >
                    {options.materialType === 'premium' && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${options.materialType === 'premium' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}
                    >
                      {translations.materialPremium}
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      {translations.materialPremiumDesc}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-accent-light)]"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          {translations.back}
        </button>

        <button
          className={`
            btn btn-lg flex items-center gap-2 transition-all
            ${
              canProceed
                ? 'btn-primary'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          disabled={!canProceed}
          onClick={onNext}
          type="button"
        >
          {translations.calculate}
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
