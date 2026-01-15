'use client'

import { useState } from 'react'

import { OptionsForm } from './OptionsForm'
import { ServiceSelect } from './ServiceSelect'

import type { CalculatorOptions } from './OptionsForm'

// Type for a selectable service
export type CalculatorService = {
  _id: string
  icon: string | null
  slug: string
  title: string
}

// Props for the PriceCalculator component
type PriceCalculatorProps = {
  services: CalculatorService[]
  translations: {
    back: string
    calculate: string
    material: string
    materialPremium: string
    materialPremiumDesc: string
    materialStandard: string
    materialStandardDesc: string
    next: string
    optionsSubtitle: string
    optionsTitle: string
    quantity: string
    quantityUnit: string
    selectService: string
    subtitle: string
    title: string
  }
}

// Calculator steps
type Step = 'service' | 'options' | 'results'

// Export CalculatorOptions type
export type { CalculatorOptions }

export function PriceCalculator({ services, translations }: PriceCalculatorProps) {
  const [currentStep, setCurrentStep] = useState<Step>('service')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [options, setOptions] = useState<CalculatorOptions>({
    materialType: null,
    quantity: 1,
  })

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId)
  }

  // Handle next button click
  const handleNext = () => {
    if (currentStep === 'service' && selectedServiceId) {
      setCurrentStep('options')
    } else if (currentStep === 'options') {
      setCurrentStep('results')
    }
  }

  // Handle back button click
  const handleBack = () => {
    if (currentStep === 'options') {
      setCurrentStep('service')
    } else if (currentStep === 'results') {
      setCurrentStep('options')
    }
  }

  // Handle options change
  const handleOptionsChange = (newOptions: CalculatorOptions) => {
    setOptions(newOptions)
  }

  // Get the selected service
  const selectedService = services.find((s) => s._id === selectedServiceId)

  return (
    <div className="card p-6 md:p-8">
      {/* Step 1: Service Selection */}
      {currentStep === 'service' && (
        <ServiceSelect
          onNext={handleNext}
          onSelect={handleServiceSelect}
          selectedServiceId={selectedServiceId}
          services={services}
          translations={translations}
        />
      )}

      {/* Step 2: Options */}
      {currentStep === 'options' && selectedService && (
        <OptionsForm
          onBack={handleBack}
          onChange={handleOptionsChange}
          onNext={handleNext}
          options={options}
          serviceSlug={selectedService.slug}
          translations={translations}
        />
      )}

      {/* Step 3: Results (placeholder for US-031) */}
      {currentStep === 'results' && (
        <div className="text-center py-8">
          <p className="text-muted">
            Results display will be implemented in US-031
          </p>
        </div>
      )}
    </div>
  )
}
