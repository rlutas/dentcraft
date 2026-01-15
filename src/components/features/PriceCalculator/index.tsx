'use client'

import { useState } from 'react'
import type { CalculatorOptions } from './OptionsForm'
import { OptionsForm } from './OptionsForm'
import { Results } from './Results'
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
  locale: string
  services: CalculatorService[]
  translations: {
    back: string
    calculate: string
    disclaimer: string
    estimatedPrice: string
    material: string
    materialPremium: string
    materialPremiumDesc: string
    materialStandard: string
    materialStandardDesc: string
    next: string
    optionsSubtitle: string
    optionsTitle: string
    priceRange: string
    quantity: string
    quantityUnit: string
    reset: string
    scheduleConsultation: string
    selectService: string
    subtitle: string
    title: string
  }
}

// Calculator steps
type Step = 'service' | 'options' | 'results'

// Export CalculatorOptions type
export type { CalculatorOptions }

export function PriceCalculator({
  locale,
  services,
  translations,
}: PriceCalculatorProps) {
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

  // Handle reset - go back to start
  const handleReset = () => {
    setCurrentStep('service')
    setSelectedServiceId(null)
    setOptions({
      materialType: null,
      quantity: 1,
    })
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
          selectedServiceId={selectedServiceId}
          services={services}
          translations={translations}
          onNext={handleNext}
          onSelect={handleServiceSelect}
        />
      )}

      {/* Step 2: Options */}
      {currentStep === 'options' && selectedService && (
        <OptionsForm
          options={options}
          serviceSlug={selectedService.slug}
          translations={translations}
          onBack={handleBack}
          onChange={handleOptionsChange}
          onNext={handleNext}
        />
      )}

      {/* Step 3: Results */}
      {currentStep === 'results' && selectedService && (
        <Results
          locale={locale}
          options={options}
          service={selectedService}
          translations={translations}
          onBack={handleBack}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
