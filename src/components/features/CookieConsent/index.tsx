'use client'

import { useCallback, useEffect, useState } from 'react'
import { Cookie, X } from 'lucide-react'
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

  const saveConsent = useCallback((value: CookieConsentValue, preferences?: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, value ?? '')
    if (preferences) {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
    }
    setIsVisible(false)
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
