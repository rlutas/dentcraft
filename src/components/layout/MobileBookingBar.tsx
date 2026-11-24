'use client'

import { ArrowRight, CalendarCheck, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { WhatsAppGlyph } from '@/components/features/WhatsAppButton'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const PHONE_TEL = '+40741199977'

/**
 * Mobile-only (< md) booking bar, fixed to the bottom once the page hero has
 * scrolled out of view. Groups booking, WhatsApp and phone into one cluster —
 * the floating WhatsApp bubble is hidden below md.
 * Phone / WhatsApp clicks are tracked by GlobalLinkTracker (document-level
 * tel: / wa.me listener), so no per-link handler here (would double-count).
 */
export function MobileBookingBar() {
  const t = useTranslations('stickyBar')
  const tCommon = useTranslations('common')
  const tContact = useTranslations('contact')
  const tFooter = useTranslations('footer')
  const pathname = usePathname()
  const [pastHero, setPastHero] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // The contact page is the booking form itself — no bar there.
  const hiddenOnRoute = pathname === '/contact'

  useEffect(() => {
    setPastHero(false)
    const hero = document.querySelector('#main-content section')

    if (!hero || typeof IntersectionObserver === 'undefined') {
      const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        // Visible only once the hero is fully above the viewport
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0)
      },
      { threshold: 0 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [pathname])

  // Hide the dock while a modal is open (it would otherwise show through the dimmed
  // backdrop): either a portaled aria-modal dialog (CallbackPopup) or a body scroll lock
  // (lightboxes, menus, other popups).
  useEffect(() => {
    const body = document.body
    const sync = () =>
      setModalOpen(
        body.style.overflow === 'hidden' || !!body.querySelector(':scope > [aria-modal="true"]'),
      )
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(body, { attributes: true, attributeFilter: ['style'], childList: true })
    return () => observer.disconnect()
  }, [])

  if (hiddenOnRoute) return null

  const visible = pastHero && !modalOpen
  const waNumber = tFooter('phone').replace(/\s/g, '').replace(/^0/, '40')
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(tContact('whatsappPrefill'))}`

  return (
    <div
      aria-hidden={!visible}
      aria-label={t('label')}
      className={cn(
        // Floating dock — mirrors the header's FramedNav pill (white glass, soft warm shadow)
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden',
        'px-3 pb-[calc(0.625rem+env(safe-area-inset-bottom))]',
        'transition-[transform,opacity,visibility] duration-300 ease-out motion-reduce:transition-none',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-[calc(100%+1rem)] opacity-0',
      )}
      inert={!visible}
      role="region"
    >
      <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-1.5 rounded-full border border-white/70 bg-white/85 p-1.5 shadow-[0_14px_40px_-10px_rgba(42,33,24,0.38),0_2px_6px_-2px_rgba(42,33,24,0.12)] ring-1 ring-[#2a2118]/[0.06] backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(1px))]:bg-white/95">
        <Link
          className="group flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-5 text-[15px] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors active:bg-[#4a3d30] hover:bg-[#4a3d30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          href="/contact"
        >
          <CalendarCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#d4c4b0]" strokeWidth={2} />
          <span className="truncate">{t('book')}</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
        <a
          aria-label={tCommon('whatsappMessage')}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1f9e4d] ring-1 ring-inset ring-[#25D366]/25 transition-colors active:bg-[#25D366]/20 hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          href={waUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppGlyph className="h-[22px] w-[22px]" />
        </a>
        <a
          aria-label={t('call')}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#faf6f1] text-[#2a2118] ring-1 ring-inset ring-[#e8e0d5] transition-colors active:bg-[#f5f0e8] hover:bg-[#f5f0e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          href={`tel:${PHONE_TEL}`}
        >
          <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}
