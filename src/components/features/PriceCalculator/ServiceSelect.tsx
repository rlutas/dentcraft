'use client'

import * as LucideIcons from 'lucide-react'
import { ArrowRight, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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

// Helper to get Lucide icon by name
function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return Stethoscope
  const icons = LucideIcons as Record<string, LucideIcon | unknown>
  const icon = icons[iconName]
  if (typeof icon === 'function') {
    return icon as LucideIcon
  }
  return Stethoscope
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service) => {
          const Icon = getIconComponent(service.icon)
          const isSelected = selectedServiceId === service._id

          return (
            <button
              key={service._id}
              aria-pressed={isSelected}
              className={`
                relative p-5 rounded-xl border-2 text-left transition-all duration-200
                ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-accent-light)]'
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
                w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors
                ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-accent-light)] text-[var(--color-primary)]'
                }
              `}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h4
                className={`
                font-medium transition-colors
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
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
