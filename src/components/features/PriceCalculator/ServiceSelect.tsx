'use client'

import { ArrowRight } from 'lucide-react'

import type { CalculatorService } from './index'

type ServiceSelectProps = {
  onNext: () => void
  onSelect: (serviceId: string) => void
  selectedServiceId: string | null
  services: CalculatorService[]
  translations: {
    next: string
    selectService: string
    subtitle: string
    title: string
  }
}

export function ServiceSelect({
  onNext,
  onSelect,
  selectedServiceId,
  services,
  translations,
}: ServiceSelectProps) {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
          {translations.title}
        </h3>
        <p className="text-muted">{translations.subtitle}</p>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {services.map((service) => {
          const isSelected = selectedServiceId === service._id

          return (
            <button
              key={service._id}
              aria-pressed={isSelected}
              className={`
                relative p-3 sm:p-5 rounded-xl border-2 text-left transition-all duration-200
                ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-accent-light)]'
                }
              `}
              onClick={() => onSelect(service._id)}
              type="button"
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
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
                </div>
              )}

              {/* Icon */}
              <div
                className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all
                ${
                  isSelected
                    ? 'bg-[var(--color-primary)]/10'
                    : 'bg-[var(--color-accent-light)]'
                }
              `}
              >
                <img
                  src={service.icon || '/icons/032-tooth.svg'}
                  alt=""
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-70'}`}
                />
              </div>

              {/* Title */}
              <h4
                className={`
                text-sm sm:text-base font-medium transition-colors
                ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}
              `}
              >
                {service.title}
              </h4>
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <div className="flex justify-center">
        <button
          className={`
            btn btn-lg flex items-center gap-2 transition-all
            ${
              selectedServiceId
                ? 'btn-primary'
                : 'bg-[#e8ded0]/50 text-[#8b7355]/40 cursor-not-allowed'
            }
          `}
          disabled={!selectedServiceId}
          onClick={onNext}
          type="button"
        >
          {translations.next}
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
