'use client'

import { useState } from 'react'

import { ServiceSelect } from './ServiceSelect'

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
    next: string
    selectService: string
    subtitle: string
    title: string
  }
}

// Calculator steps
type Step = 'service' | 'options' | 'results'

export function PriceCalculator({ services, translations }: PriceCalculatorProps) {
  const [currentStep, setCurrentStep] = useState<Step>('service')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)

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

      {/* Step 2: Options (placeholder for US-030) */}
      {currentStep === 'options' && selectedService && (
        <div className="text-center py-8">
          <p className="text-muted">
            Options form for {selectedService.title} will be implemented in US-030
          </p>
        </div>
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
