'use client'

import dynamic from 'next/dynamic'

const CookieConsentWrapper = dynamic(
  () => import('@/components/features/CookieConsent/CookieConsentWrapper').then(m => ({ default: m.CookieConsentWrapper })),
  { ssr: false }
)

const WhatsAppButtonWrapper = dynamic(
  () => import('@/components/features/WhatsAppButton/WhatsAppButtonWrapper').then(m => ({ default: m.WhatsAppButtonWrapper })),
  { ssr: false }
)

export function LazyClientComponents() {
  return (
    <>
      <WhatsAppButtonWrapper />
      <CookieConsentWrapper />
    </>
  )
}
