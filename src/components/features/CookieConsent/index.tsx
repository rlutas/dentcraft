'use client'

import { useCallback, useEffect, useState } from 'react'
import { Cookie, Lock, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export type CookieConsentValue = 'all' | 'essential' | 'custom' | null

export type CookiePreferences = {
  essential: boolean // Always true, cannot be changed
  analytics: boolean
  marketing: boolean
}

type CookieConsentTranslations = {
  title: string
  description: string
  acceptAll: string
  onlyEssential: string
  customize: string
  cookiePolicy: string
  // Modal translations
  preferencesTitle: string
  preferencesDescription: string
  savePreferences: string
  essentialTitle: string
  essentialDescription: string
  analyticsTitle: string
  analyticsDescription: string
  marketingTitle: string
  marketingDescription: string
  alwaysActive: string
}

type Props = {
  translations: CookieConsentTranslations
  cookiePolicyPath: string
}

const STORAGE_KEY = 'dentcraft-cookie-consent'
const PREFERENCES_KEY = 'dentcraft-cookie-preferences'

export function CookieConsent({ translations, cookiePolicyPath }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      // Small delay to prevent banner flash on initial load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])

  // Handle escape key and body scroll when modal is open
  useEffect(() => {
    if (!showModal) return undefined

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [showModal])

  const saveConsent = useCallback((value: CookieConsentValue, preferences?: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, value ?? '')
    if (preferences) {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
    }
    setIsVisible(false)
    setShowModal(false)
  }, [])

  const handleAcceptAll = useCallback(() => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    saveConsent('all', preferences)
  }, [saveConsent])

  const handleEssentialOnly = useCallback(() => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    saveConsent('essential', preferences)
  }, [saveConsent])

  const handleClose = useCallback(() => {
    // Closing without choosing = essential only
    handleEssentialOnly()
  }, [handleEssentialOnly])

  const handleCustomize = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleSavePreferences = useCallback(() => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    }
    saveConsent('custom', preferences)
  }, [analyticsEnabled, marketingEnabled, saveConsent])

  const handleModalBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false)
    }
  }, [])

  // Don't render on server or if already consented
  if (!isMounted || !isVisible) {
    return null
  }

  return (
    <div
      aria-describedby="cookie-consent-description"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          {/* Close button */}
          <button
            aria-label={translations.onlyEssential}
            className="absolute top-3 right-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            onClick={handleClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cookie className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2
                  className="text-lg font-semibold text-gray-900"
                  id="cookie-consent-title"
                >
                  {translations.title}
                </h2>
                <p
                  className="mt-1 text-sm text-gray-600"
                  id="cookie-consent-description"
                >
                  {translations.description}{' '}
                  <Link
                    className="text-primary underline hover:no-underline"
                    href={cookiePolicyPath as '/politica-cookies'}
                  >
                    {translations.cookiePolicy}
                  </Link>
                  .
                </p>

                {/* Buttons */}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <button
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                    onClick={handleAcceptAll}
                    type="button"
                  >
                    {translations.acceptAll}
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                    onClick={handleEssentialOnly}
                    type="button"
                  >
                    {translations.onlyEssential}
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                    onClick={handleCustomize}
                    type="button"
                  >
                    {translations.customize}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showModal && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={handleModalBackdropClick}
          role="dialog"
        >
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {translations.preferencesTitle}
                </h3>
                <button
                  aria-label={translations.onlyEssential}
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {translations.preferencesDescription}
              </p>
            </div>

            {/* Cookie Categories */}
            <div className="divide-y divide-gray-100 px-6">
              {/* Essential Cookies - Always enabled */}
              <div className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {translations.essentialTitle}
                      </h4>
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {translations.essentialDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-green-600">
                      {translations.alwaysActive}
                    </span>
                    <div className="relative h-6 w-11 cursor-not-allowed rounded-full bg-green-500">
                      <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {translations.analyticsTitle}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {translations.analyticsDescription}
                    </p>
                  </div>
                  <button
                    aria-checked={analyticsEnabled}
                    aria-label={translations.analyticsTitle}
                    className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none ${
                      analyticsEnabled ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    role="switch"
                    type="button"
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        analyticsEnabled ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {translations.marketingTitle}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {translations.marketingDescription}
                    </p>
                  </div>
                  <button
                    aria-checked={marketingEnabled}
                    aria-label={translations.marketingTitle}
                    className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none ${
                      marketingEnabled ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    role="switch"
                    type="button"
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        marketingEnabled ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 border-t border-gray-100 bg-white px-6 py-4">
              <div className="flex gap-3">
                <button
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                  onClick={handleAcceptAll}
                  type="button"
                >
                  {translations.acceptAll}
                </button>
                <button
                  className="flex-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                  onClick={handleSavePreferences}
                  type="button"
                >
                  {translations.savePreferences}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Utility function to get current consent
export function getCookieConsent(): CookieConsentValue {
  if (typeof window === 'undefined') return null
  const consent = localStorage.getItem(STORAGE_KEY)
  if (consent === 'all' || consent === 'essential' || consent === 'custom') {
    return consent
  }
  return null
}

// Utility function to get current preferences
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  const prefs = localStorage.getItem(PREFERENCES_KEY)
  if (prefs) {
    try {
      return JSON.parse(prefs) as CookiePreferences
    } catch {
      return null
    }
  }
  return null
}

// Utility function to check if analytics is enabled
export function isAnalyticsEnabled(): boolean {
  const prefs = getCookiePreferences()
  return prefs?.analytics ?? false
}

// Utility function to check if marketing is enabled
export function isMarketingEnabled(): boolean {
  const prefs = getCookiePreferences()
  return prefs?.marketing ?? false
}
