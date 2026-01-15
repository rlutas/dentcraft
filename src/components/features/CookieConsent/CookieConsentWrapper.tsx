'use client'

import { useTranslations } from 'next-intl'
import { CookieConsent } from './index'

export function CookieConsentWrapper() {
  const t = useTranslations('cookieConsent')

  const translations = {
    title: t('title'),
    description: t('description'),
    acceptAll: t('acceptAll'),
    onlyEssential: t('onlyEssential'),
    customize: t('customize'),
    cookiePolicy: t('cookiePolicy'),
  }

  return (
    <CookieConsent
      cookiePolicyPath="/politica-cookies"
      translations={translations}
    />
  )
}
