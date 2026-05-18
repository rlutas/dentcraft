'use client'

import { useEffect } from 'react'
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/gtm'

/**
 * Document-level click listener that fires GTM events for important
 * outbound links (phone tel: + WhatsApp wa.me / api.whatsapp.com).
 *
 * Mounted once globally so any <a href="tel:..."> or WhatsApp link on
 * any page — regardless of whether the component is client or server —
 * gets tracked without needing per-link onClick wiring.
 */
export function GlobalLinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const link = target.closest('a[href]') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''

      if (href.startsWith('tel:')) {
        trackPhoneClick()
        return
      }

      if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
        trackWhatsAppClick()
        return
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
