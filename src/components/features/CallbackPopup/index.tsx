'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Clock, CheckCircle2, User, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMainFallbackServices } from '@/lib/fallback-services'

interface CallbackPopupProps {
  isOpen: boolean
  onClose: () => void
}

type TimePreference = 'morning' | 'afternoon' | 'evening'

export default function CallbackPopup({ isOpen, onClose }: CallbackPopupProps) {
  const t = useTranslations('callbackPopup')
  const tServices = useTranslations('services')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    timePreference: '' as TimePreference | ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const mainServices = getMainFallbackServices()

  const timeOptions: { value: TimePreference; labelKey: string; hours: string }[] = [
    { value: 'morning', labelKey: 'timeMorning', hours: '10:00 - 12:00' },
    { value: 'afternoon', labelKey: 'timeAfternoon', hours: '12:00 - 15:00' },
    { value: 'evening', labelKey: 'timeEvening', hours: '15:00 - 18:00' },
  ]

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Reset form when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', phone: '', service: '', timePreference: '' })
        setIsSuccess(false)
        setErrors({})
      }, 300)
    }
  }, [isOpen])

  // Close dropdowns when clicking outside
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors['name'] = t('errors.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors['name'] = t('errors.nameTooShort')
    }

    if (!formData.phone.trim()) {
      newErrors['phone'] = t('errors.phoneRequired')
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phone)) {
      newErrors['phone'] = t('errors.phoneInvalid')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service || undefined,
          timePreference: formData.timePreference || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        if (data?.errors) {
          setErrors(data.errors)
        } else {
          setErrors({ general: data?.error || 'Something went wrong. Please try again.' })
        }
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setIsSuccess(true)
    } catch {
      setErrors({ general: 'Network error. Please check your connection and try again.' })
      setIsSubmitting(false)
    }
  }

  const selectedService = mainServices.find(s => s.slug === formData.service)
  const selectedTime = timeOptions.find(t => t.value === formData.timePreference)

  // Use portal to render at document body level, escaping any overflow/stacking context issues
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full max-w-[480px] lg:max-w-[520px] max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl',
              'bg-white shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)]'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4c4b0] via-[#e8ded0] to-[#d4c4b0]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                'absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full',
                'bg-[#f5f0e8]/80 text-[#6b6b6b] transition-all duration-200',
                'hover:bg-[#f5f0e8] hover:text-[#1a1a1a] hover:scale-105'
              )}
              aria-label={t('close')}
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center px-8 py-12 text-center"
                >
                  {/* Success icon with animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#43e97b] to-[#38f9d7]"
                  >
                    <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2} />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-3 text-2xl font-semibold text-[#1a1a1a]"
                  >
                    {t('successTitle')}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 text-[#6b6b6b] leading-relaxed max-w-[280px]"
                  >
                    {t('successMessage')}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={onClose}
                    className={cn(
                      'px-8 py-3 rounded-full text-sm font-semibold',
                      'bg-[#1a1a1a] text-white',
                      'transition-all duration-200',
                      'hover:bg-[#2a2a2a] hover:-translate-y-0.5 hover:shadow-lg'
                    )}
                  >
                    {t('close')}
                  </motion.button>
                </motion.div>
              ) : (
                /* Form State */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 sm:p-5 lg:p-6"
                >
                  {/* Header */}
                  <div className="mb-3 sm:mb-5 pr-8">
                    {/* Badge */}
                    <div className="mb-2 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-[#f5f0e8] px-3 py-1">
                      <Phone className="h-3.5 w-3.5 text-[#8b8b8b]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
                        {t('badge')}
                      </span>
                    </div>

                    <h2 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-semibold text-[#1a1a1a] tracking-tight">
                      {t('title')}
                    </h2>

                    <p className="text-[13px] sm:text-[15px] text-[#6b6b6b] leading-relaxed">
                      {t('subtitle')}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    {/* Name Input */}
                    <div>
                      <label className="mb-1.5 sm:mb-2 block text-sm font-medium text-[#1a1a1a]">
                        {t('nameLabel')}
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                          <User className="h-4 w-4 text-[#a0a0a0]" />
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, name: e.target.value }))
                            if (errors['name']) setErrors(prev => ({ ...prev, name: '' }))
                          }}
                          placeholder={t('namePlaceholder')}
                          className={cn(
                            'w-full rounded-xl border bg-white py-2.5 sm:py-3 pl-11 pr-4 text-[14px] sm:text-[15px]',
                            'placeholder:text-[#b0b0b0] text-[#1a1a1a]',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[#d4c4b0]/50 focus:border-[#d4c4b0]',
                            errors['name'] ? 'border-red-400' : 'border-[#e8e8e8]'
                          )}
                        />
                      </div>
                      {errors['name'] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors['name']}</p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="mb-1.5 sm:mb-2 block text-sm font-medium text-[#1a1a1a]">
                        {t('phoneLabel')}
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                          <Phone className="h-4 w-4 text-[#a0a0a0]" />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, phone: e.target.value }))
                            if (errors['phone']) setErrors(prev => ({ ...prev, phone: '' }))
                          }}
                          placeholder={t('phonePlaceholder')}
                          className={cn(
                            'w-full rounded-xl border bg-white py-2.5 sm:py-3 pl-11 pr-4 text-[14px] sm:text-[15px]',
                            'placeholder:text-[#b0b0b0] text-[#1a1a1a]',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[#d4c4b0]/50 focus:border-[#d4c4b0]',
                            errors['phone'] ? 'border-red-400' : 'border-[#e8e8e8]'
                          )}
                        />
                      </div>
                      {errors['phone'] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors['phone']}</p>
                      )}
                    </div>

                    {/* Service Dropdown */}
                    <div>
                      <label className="mb-1.5 sm:mb-2 block text-sm font-medium text-[#1a1a1a]">
                        {t('serviceLabel')}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsServiceOpen(!isServiceOpen)
                            setIsTimeOpen(false)
                          }}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl border bg-white py-2.5 sm:py-3 px-4 text-[14px] sm:text-[15px]',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[#d4c4b0]/50 focus:border-[#d4c4b0]',
                            errors['service'] ? 'border-red-400' : 'border-[#e8e8e8]',
                            formData.service ? 'text-[#1a1a1a]' : 'text-[#b0b0b0]'
                          )}
                        >
                          <span className="flex items-center gap-3">
                            {selectedService ? (
                              <>
                                <selectedService.Icon className="h-4 w-4 text-[#8b8b8b]" />
                                {tServices(selectedService.titleKey)}
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 text-[#b0b0b0]" />
                                {t('servicePlaceholder')}
                              </>
                            )}
                          </span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-[#8b8b8b] transition-transform duration-200',
                              isServiceOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {isServiceOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={cn(
                                'absolute top-full left-0 right-0 z-20 mt-2',
                                'max-h-[240px] overflow-y-auto rounded-xl border border-[#e8e8e8]',
                                'bg-white shadow-lg'
                              )}
                            >
                              {mainServices.map((service) => (
                                <button
                                  key={service.slug}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, service: service.slug }))
                                    setIsServiceOpen(false)
                                    if (errors['service']) setErrors(prev => ({ ...prev, service: '' }))
                                  }}
                                  className={cn(
                                    'flex w-full items-center gap-3 px-4 py-3 text-left text-[14px]',
                                    'transition-colors duration-150',
                                    'hover:bg-[#f5f0e8]/70',
                                    formData.service === service.slug && 'bg-[#f5f0e8]'
                                  )}
                                >
                                  <service.Icon className="h-4 w-4 text-[#8b8b8b]" />
                                  <span className="text-[#1a1a1a]">{tServices(service.titleKey)}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors['service'] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors['service']}</p>
                      )}
                    </div>

                    {/* Time Preference Dropdown */}
                    <div>
                      <label className="mb-1.5 sm:mb-2 block text-sm font-medium text-[#1a1a1a]">
                        {t('timeLabel')}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsTimeOpen(!isTimeOpen)
                            setIsServiceOpen(false)
                          }}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl border bg-white py-2.5 sm:py-3 px-4 text-[14px] sm:text-[15px]',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[#d4c4b0]/50 focus:border-[#d4c4b0]',
                            errors['timePreference'] ? 'border-red-400' : 'border-[#e8e8e8]',
                            formData.timePreference ? 'text-[#1a1a1a]' : 'text-[#b0b0b0]'
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-[#8b8b8b]" />
                            {selectedTime ? (
                              <span>
                                {t(selectedTime.labelKey)}
                                <span className="ml-2 text-[13px] text-[#8b8b8b]">({selectedTime.hours})</span>
                              </span>
                            ) : (
                              t('timePlaceholder')
                            )}
                          </span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-[#8b8b8b] transition-transform duration-200',
                              isTimeOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {isTimeOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={cn(
                                'absolute top-full left-0 right-0 z-20 mt-2',
                                'overflow-hidden rounded-xl border border-[#e8e8e8]',
                                'bg-white shadow-lg'
                              )}
                            >
                              {timeOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, timePreference: option.value }))
                                    setIsTimeOpen(false)
                                    if (errors['timePreference']) setErrors(prev => ({ ...prev, timePreference: '' }))
                                  }}
                                  className={cn(
                                    'flex w-full items-center justify-between px-4 py-3 text-left text-[14px]',
                                    'transition-colors duration-150',
                                    'hover:bg-[#f5f0e8]/70',
                                    formData.timePreference === option.value && 'bg-[#f5f0e8]'
                                  )}
                                >
                                  <span className="text-[#1a1a1a]">{t(option.labelKey)}</span>
                                  <span className="text-[13px] text-[#8b8b8b]">{option.hours}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors['timePreference'] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors['timePreference']}</p>
                      )}
                    </div>

                    {/* Promise note */}
                    <div className="flex items-center gap-2 sm:gap-2.5 rounded-xl bg-[#f5f0e8]/60 px-3 sm:px-4 py-2 sm:py-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d4c4b0] to-[#c4b4a0]">
                        <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </div>
                      <p className="text-[12px] sm:text-[13px] text-[#6b6b6b] leading-snug">
                        {t('promise')}
                      </p>
                    </div>

                    {/* General error message */}
                    {errors['general'] && (
                      <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                        <p className="text-sm text-red-600">{errors['general']}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'relative w-full overflow-hidden rounded-xl py-3 sm:py-4 text-[14px] sm:text-[15px] font-semibold',
                        'bg-[#1a1a1a] text-white',
                        'transition-all duration-300',
                        'hover:bg-[#2a2a2a] hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)]',
                        'disabled:cursor-not-allowed disabled:opacity-70'
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {t('sending')}
                        </span>
                      ) : (
                        t('submit')
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
