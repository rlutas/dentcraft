'use client'

import { Loader2, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

type FormData = {
  email: string
  gdprConsent: boolean
  message: string
  name: string
  phone: string
  subject: string
}

type FormErrors = {
  [K in keyof FormData]?: string
}

const initialFormData: FormData = {
  email: '',
  gdprConsent: false,
  message: '',
  name: '',
  phone: '',
  subject: '',
}

export function ContactForm() {
  const t = useTranslations('contactForm')
  const tCommon = useTranslations('common')

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const subjectOptions = [
    { label: t('subjects.consultation'), value: 'consultation' },
    { label: t('subjects.appointment'), value: 'appointment' },
    { label: t('subjects.pricing'), value: 'pricing' },
    { label: t('subjects.other'), value: 'other' },
  ]

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('errors.nameTooShort')
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid')
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim() && !/^[0-9+\s()-]{6,20}$/.test(formData.phone)) {
      newErrors.phone = t('errors.phoneInvalid')
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = t('errors.subjectRequired')
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('errors.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('errors.messageTooShort')
    }

    // GDPR consent validation
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = t('errors.gdprRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, t])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))

      // Clear error for this field when user starts typing
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitStatus('idle')

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch('/api/contact', {
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        setSubmitStatus('success')
        setFormData(initialFormData)
      } catch {
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm]
  )

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">{t('successMessage')}</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">{t('errorMessage')}</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2" htmlFor="name">
          {t('name')} <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
          } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors`}
          id="name"
          name="name"
          onChange={handleChange}
          placeholder={t('namePlaceholder')}
          type="text"
          value={formData.name}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2" htmlFor="email">
          {t('email')} <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
          } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors`}
          id="email"
          name="email"
          onChange={handleChange}
          placeholder={t('emailPlaceholder')}
          type="email"
          value={formData.email}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2" htmlFor="phone">
          {t('phone')}
        </label>
        <input
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.phone
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
          } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors`}
          id="phone"
          name="phone"
          onChange={handleChange}
          placeholder={t('phonePlaceholder')}
          type="tel"
          value={formData.phone}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* Subject Field */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2" htmlFor="subject">
          {t('subject')} <span className="text-red-500">*</span>
        </label>
        <select
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.subject
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
          } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors bg-white`}
          id="subject"
          name="subject"
          onChange={handleChange}
          value={formData.subject}
        >
          <option value="">{t('subjectPlaceholder')}</option>
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2" htmlFor="message">
          {t('message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
          } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors resize-none`}
          id="message"
          name="message"
          onChange={handleChange}
          placeholder={t('messagePlaceholder')}
          rows={5}
          value={formData.message}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* GDPR Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            checked={formData.gdprConsent}
            className={`mt-1 w-5 h-5 rounded border ${
              errors.gdprConsent ? 'border-red-500' : 'border-[var(--color-border)]'
            } text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0`}
            name="gdprConsent"
            onChange={handleChange}
            type="checkbox"
          />
          <span className="text-sm text-[var(--color-text)]">
            {t('gdprConsent')} <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.gdprConsent && <p className="mt-1 text-sm text-red-500">{errors.gdprConsent}</p>}
      </div>

      {/* Submit Button */}
      <button
        className="btn btn-primary w-full flex items-center justify-center gap-2"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" strokeWidth={1.5} />
            {tCommon('submit')}
          </>
        )}
      </button>
    </form>
  )
}
