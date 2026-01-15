'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

type WhatsAppButtonProps = {
  phoneNumber: string
  message: string
  ariaLabel: string
}

export function WhatsAppButton({
  phoneNumber,
  message,
  ariaLabel,
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)

  // Show button after mount with delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Stop pulsing after initial animation
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsPulsing(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Format phone number for WhatsApp URL (remove spaces and leading 0)
  const formattedPhone = phoneNumber.replace(/\s/g, '').replace(/^0/, '40')
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

  if (!isVisible) {
    return null
  }

  return (
    <a
      aria-label={ariaLabel}
      className={`
        fixed bottom-4 right-4 z-40
        flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366] text-white shadow-lg
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
        md:bottom-6 md:right-6 md:h-16 md:w-16
        ${isPulsing ? 'animate-pulse-whatsapp' : ''}
      `}
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle className="h-7 w-7 fill-white md:h-8 md:w-8" />
    </a>
  )
}
