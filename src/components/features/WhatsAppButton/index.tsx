'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Official WhatsApp glyph (white phone-with-chat) — used inside the green circle
function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  )
}

type WhatsAppButtonProps = {
  phoneNumber: string
  message: string
  ariaLabel: string
  tooltipText?: string
}

const SCROLL_THRESHOLD = 500

export function WhatsAppButton({
  phoneNumber,
  message,
  ariaLabel,
  tooltipText = 'Ai o intrebare? Scrie-ne!',
}: WhatsAppButtonProps) {
  const [isPastHero, setIsPastHero] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [, setTooltipDismissed] = useState(false)
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasShownTooltipRef = useRef(false)

  // Track scroll position - only show button after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY >= SCROLL_THRESHOLD
      setIsPastHero(scrolled)
    }

    // Check initial scroll position (e.g. if user refreshed mid-page)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // When button becomes visible, start pulsing and auto-show tooltip
  useEffect(() => {
    if (isPastHero && !hasShownTooltipRef.current) {
      hasShownTooltipRef.current = true

      // Start pulsing
      setIsPulsing(true)
      const pulseTimer = setTimeout(() => setIsPulsing(false), 6000)

      // Show tooltip after a short delay to let the button animate in first
      const showTimer = setTimeout(() => {
        setShowTooltip(true)
      }, 800)

      // Auto-hide tooltip after a few seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false)
        setTooltipDismissed(true)
      }, 5800)

      return () => {
        clearTimeout(pulseTimer)
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [isPastHero])

  // Hover handlers for tooltip
  const handleMouseEnter = useCallback(() => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current)
      tooltipTimerRef.current = null
    }
    setShowTooltip(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    tooltipTimerRef.current = setTimeout(() => {
      setShowTooltip(false)
    }, 300)
  }, [])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
      }
    }
  }, [])

  // Format phone number for WhatsApp URL (remove spaces and leading 0)
  const formattedPhone = phoneNumber.replace(/\s/g, '').replace(/^0/, '40')
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-40 flex items-end gap-3
        transition-all duration-500 ease-out
        md:bottom-6 md:right-6
        ${isPastHero ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip bubble */}
      <div
        className={`
          relative mb-2 max-w-[200px] rounded-xl bg-white px-4 py-2.5
          text-sm font-medium leading-snug text-gray-800
          shadow-lg ring-1 ring-black/5
          transition-all duration-300 ease-out
          ${showTooltip ? 'translate-x-0 scale-100 opacity-100' : 'pointer-events-none translate-x-2 scale-95 opacity-0'}
        `}
      >
        <span>{tooltipText}</span>
        {/* Arrow pointing right toward the button */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2">
          <div className="h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-white" />
        </div>
      </div>

      {/* WhatsApp button with continuous subtle glow */}
      <div className="relative shrink-0">
        {/* Continuous pulsing rings — visual "ping" so the button stays attention-getting without flashing */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-wa-ping" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-wa-ping-delayed" />

        <a
          aria-label={ariaLabel}
          className={`
            relative flex h-14 w-14 items-center justify-center
            rounded-full bg-[#25D366] text-white
            shadow-[0_8px_24px_-4px_rgba(37,211,102,0.45)]
            transition-all duration-300
            hover:scale-110 hover:shadow-[0_12px_30px_-4px_rgba(37,211,102,0.6)]
            focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
            md:h-16 md:w-16
            ${isPulsing ? 'animate-pulse-whatsapp' : ''}
          `}
          href={whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppGlyph className="h-7 w-7 md:h-8 md:w-8" />
        </a>
      </div>
    </div>
  )
}
