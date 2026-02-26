'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import CallbackPopup from '@/components/features/CallbackPopup'

interface TeamMemberBookingButtonProps {
  memberName: string
  memberRole: string | null
  className?: string
  variant?: 'hero' | 'bottom'
}

/**
 * Booking button for team member profile pages.
 * - For doctors (role contains "Medic" or "Stomatolog"): opens CallbackPopup with pre-selected doctor
 * - For assistants (role contains "Asistent"): opens general CallbackPopup
 */
export function TeamMemberBookingButton({
  memberName,
  memberRole,
  className,
  variant = 'hero',
}: TeamMemberBookingButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const t = useTranslations('common')

  // Determine if this member is a doctor based on their role
  const isDoctor = memberRole
    ? /medic|stomatolog/i.test(memberRole)
    : false

  const defaultDoctor = isDoctor ? memberName : undefined

  const baseClassName = variant === 'hero'
    ? 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-semibold text-lg hover:bg-[#f5f0e8] hover:shadow-[0_10px_40px_-10px_rgba(212,196,176,0.4)] transition-all duration-300 hover:-translate-y-0.5'
    : 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-semibold text-lg hover:bg-[#f5f0e8] hover:shadow-[0_10px_40px_-10px_rgba(212,196,176,0.4)] transition-all duration-300 hover:-translate-y-0.5'

  return (
    <>
      <button
        className={className || baseClassName}
        type="button"
        onClick={() => setIsPopupOpen(true)}
      >
        {t('bookAppointment')}
        <ArrowRight className="w-5 h-5" />
      </button>

      <CallbackPopup
        defaultDoctor={defaultDoctor}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}
