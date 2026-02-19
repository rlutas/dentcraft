'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Animation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'scale-down'

interface ScrollRevealProps {
  children: ReactNode
  animation?: Animation
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
}

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  const baseStyle: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  }

  const hiddenStyles: Record<Animation, React.CSSProperties> = {
    'fade-up': { opacity: 0, transform: 'translateY(40px)' },
    'fade-down': { opacity: 0, transform: 'translateY(-40px)' },
    'fade-left': { opacity: 0, transform: 'translateX(-40px)' },
    'fade-right': { opacity: 0, transform: 'translateX(40px)' },
    'scale-up': { opacity: 0, transform: 'scale(0.92)' },
    'scale-down': { opacity: 0, transform: 'scale(1.08)' },
  }

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'none',
  }

  const animStyle = isVisible
    ? { ...baseStyle, ...visibleStyle }
    : { ...baseStyle, ...hiddenStyles[animation] }

  return (
    <div ref={ref} className={className} style={animStyle}>
      {children}
    </div>
  )
}
