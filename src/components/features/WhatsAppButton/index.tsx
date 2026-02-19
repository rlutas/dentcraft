'use client'

import { MessageCircle } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

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

      {/* WhatsApp button */}
      <a
        aria-label={ariaLabel}
        className={`
          relative flex h-14 w-14 shrink-0 items-center justify-center
          rounded-full bg-[#25D366] text-white shadow-lg
          transition-all duration-300
          hover:scale-110 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
          md:h-16 md:w-16
          ${isPulsing ? 'animate-pulse-whatsapp' : ''}
        `}
        href={whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageCircle className="h-7 w-7 fill-white md:h-8 md:w-8" />
      </a>
    </div>
  )
}
