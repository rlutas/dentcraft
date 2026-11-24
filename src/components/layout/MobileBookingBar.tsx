'use client'

import { ArrowRight, Phone } from 'lucide-react'
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

  if (hiddenOnRoute) return null

  const visible = pastHero
  const waNumber = tFooter('phone').replace(/\s/g, '').replace(/^0/, '40')
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(tContact('whatsappPrefill'))}`

  return (
    <div
      aria-hidden={!visible}
      aria-label={t('label')}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 md:hidden',
        'border-t border-[#e8e0d5] bg-[#faf6f1]/95 backdrop-blur-md shadow-[0_-10px_30px_-12px_rgba(42,33,24,0.25)]',
        'px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]',
        'transition-[transform,opacity,visibility] duration-300 ease-out motion-reduce:transition-none',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0',
      )}
      inert={!visible}
      role="region"
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link
          className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4a3d30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6f1]"
          href="/contact"
        >
          {t('book')}
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
        </Link>
        <a
          aria-label={tCommon('whatsappMessage')}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e8e0d5] bg-white text-[#1f9e4d] transition-colors hover:border-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6f1]"
          href={waUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppGlyph className="h-6 w-6" />
        </a>
        <a
          aria-label={t('call')}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e8e0d5] bg-white text-[#2a2118] transition-colors hover:border-[#8b7355] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6f1]"
          href={`tel:${PHONE_TEL}`}
        >
          <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  )
}
