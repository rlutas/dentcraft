'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

type StepIndicatorProps = {
  currentStep: number // 1, 2, or 3
  steps: { label: string }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isComplete = stepNumber < currentStep
          // Connector after this step is filled when the next step is active or complete
          const isConnectorFilled = currentStep > stepNumber

          return (
            <div key={index} className="flex items-center">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                    text-sm font-semibold transition-colors
                    ${
                      isActive || isComplete
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'border-2 border-[#d4c4b0] text-[#8b7355]'
                    }
                  `}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {isComplete ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    stepNumber
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={`
                    text-xs font-medium mt-2 max-w-[80px] sm:max-w-[100px] text-center leading-tight
                    ${
                      isActive || isComplete
                        ? 'text-[var(--color-text)]'
                        : 'text-[#8b7355]/60'
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="w-12 sm:w-20 h-0.5 bg-[#e8ded0] mx-2 sm:mx-3 rounded-full overflow-hidden relative self-start mt-[18px] sm:mt-5">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[var(--color-primary)] rounded-full"
                    initial={false}
                    animate={{
                      width: isConnectorFilled ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
