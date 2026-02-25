// Google Tag Manager + Consent Mode v2 utilities
// All tracking respects cookie consent preferences

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
  }
}

type ConsentState = 'granted' | 'denied'

// Push event to GTM dataLayer
export function pushToDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...data,
  })
}

// Update Google Consent Mode v2 based on cookie preferences
export function updateGoogleConsent(analytics: boolean, marketing: boolean) {
  if (typeof window === 'undefined') return

  const analyticsConsent: ConsentState = analytics ? 'granted' : 'denied'
  const marketingConsent: ConsentState = marketing ? 'granted' : 'denied'

  window.gtag?.('consent', 'update', {
    analytics_storage: analyticsConsent,
    ad_storage: marketingConsent,
    ad_user_data: marketingConsent,
    ad_personalization: marketingConsent,
  })
}

// Track form submissions for Google Ads conversions
export function trackFormSubmission(formType: 'contact' | 'callback' | 'price_estimate', data?: {
  service?: string
  doctor?: string
}) {
  pushToDataLayer('generate_lead', {
    form_type: formType,
    currency: 'RON',
    ...(data?.service ? { service_name: data.service } : {}),
    ...(data?.doctor ? { doctor_name: data.doctor } : {}),
  })
}

// Track phone number clicks
export function trackPhoneClick() {
  pushToDataLayer('click_phone', {
    link_url: 'tel:+40741199977',
  })
}

// Track WhatsApp button clicks
export function trackWhatsAppClick() {
  pushToDataLayer('click_whatsapp', {
    link_url: 'https://wa.me/40741199977',
  })
}
