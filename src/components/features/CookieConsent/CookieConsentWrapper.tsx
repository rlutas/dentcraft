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
    // Modal translations
    preferencesTitle: t('preferencesTitle'),
    preferencesDescription: t('preferencesDescription'),
    savePreferences: t('savePreferences'),
    essentialTitle: t('essentialTitle'),
    essentialDescription: t('essentialDescription'),
    analyticsTitle: t('analyticsTitle'),
    analyticsDescription: t('analyticsDescription'),
    marketingTitle: t('marketingTitle'),
    marketingDescription: t('marketingDescription'),
    alwaysActive: t('alwaysActive'),
  }

  return (
    <CookieConsent
      cookiePolicyPath="/politica-cookies"
      translations={translations}
    />
  )
}
