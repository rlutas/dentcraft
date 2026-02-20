'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { CalculatorOptions } from './OptionsForm'
import { OptionsForm } from './OptionsForm'
import { Results } from './Results'
import { ServiceSelect } from './ServiceSelect'
import { StepIndicator } from './StepIndicator'

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
    details: string
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
    service: string
    subtitle: string
    title: string
  }
}

// Calculator steps
type Step = 'service' | 'options' | 'results'

// Export CalculatorOptions type
export type { CalculatorOptions }

// Step transition variants
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

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
  const [direction, setDirection] = useState<1 | -1>(1)

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId)
  }

  // Handle next button click
  const handleNext = useCallback(() => {
    setDirection(1)
    if (currentStep === 'service' && selectedServiceId) {
      setCurrentStep('options')
    } else if (currentStep === 'options') {
      setCurrentStep('results')
    }
  }, [currentStep, selectedServiceId])

  // Handle back button click
  const handleBack = useCallback(() => {
    setDirection(-1)
    if (currentStep === 'options') {
      setCurrentStep('service')
    } else if (currentStep === 'results') {
      setCurrentStep('options')
    }
  }, [currentStep])

  // Handle reset - go back to start
  const handleReset = useCallback(() => {
    setDirection(-1)
    setCurrentStep('service')
    setSelectedServiceId(null)
    setOptions({
      materialType: null,
      quantity: 1,
    })
  }, [])

  // Handle options change
  const handleOptionsChange = (newOptions: CalculatorOptions) => {
    setOptions(newOptions)
  }

  // Get the selected service
  const selectedService = services.find((s) => s._id === selectedServiceId)

  // Calculate step number for the indicator
  const stepNumber = currentStep === 'service' ? 1 : currentStep === 'options' ? 2 : 3

  return (
    <div className="card p-6 md:p-8">
      {/* Step Progress Indicator */}
      <StepIndicator
        currentStep={stepNumber}
        steps={[
          { label: translations.selectService },
          { label: translations.optionsTitle },
          { label: translations.estimatedPrice },
        ]}
      />

      {/* Step Content with Animated Transitions */}
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
