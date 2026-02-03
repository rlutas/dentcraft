'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import CallbackPopup from '@/components/features/CallbackPopup'
import { cn } from '@/lib/utils'

interface BookingButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'custom'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  ariaLabel?: string
}

/**
 * Reusable booking button component that opens the CallbackPopup
 * Can be used in both server and client components
 *
 * @example
 * // Default primary button
 * <BookingButton />
 *
 * @example
 * // Custom styling
 * <BookingButton variant="custom" className="my-custom-class">
 *   Custom Text
 * </BookingButton>
 *
 * @example
 * // With icon
 * <BookingButton icon={<Calendar className="w-5 h-5" />}>
 *   Schedule Now
 * </BookingButton>
 */
export function BookingButton({
  children,
  className,
  variant = 'primary',
  size = 'lg',
  icon,
  ariaLabel,
}: BookingButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const t = useTranslations('common')

  // Default button text if no children provided
  const buttonText = children || t('bookAppointment')

  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center gap-3 font-semibold transition-all duration-300'

  // Variant styles
  const variantStyles = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    custom: '',
  }

  // Size styles
  const sizeStyles = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  }

  // Combine classes
  const buttonClassName = cn(
    baseStyles,
    variant !== 'custom' && variantStyles[variant],
    variant !== 'custom' && sizeStyles[size],
    className
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className={buttonClassName}
        aria-label={ariaLabel || t('bookAppointment')}
      >
        {icon}
        {buttonText}
      </button>

      <CallbackPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}
