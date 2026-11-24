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
  duration = 900,
  threshold = 0.15,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion: show content right away, no transition.
    // Read in the effect (not during render) to keep SSR/hydration identical.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setReduceMotion(true)
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Tall blocks can never reach `threshold` as a ratio — also accept
        // "covers a quarter of the viewport" so they don't stay hidden.
        const shown =
          !!entry?.isIntersecting &&
          (entry.intersectionRatio >= threshold ||
            entry.intersectionRect.height >= window.innerHeight * 0.25)
        if (shown) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once && !entry?.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold: [0, 0.02, 0.05, 0.1, threshold, 0.25, 0.5], rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  const baseStyle: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    transitionDelay: `${delay}ms`,
  }

  const hiddenStyles: Record<Animation, React.CSSProperties> = {
    'fade-up': { opacity: 0, transform: 'translateY(30px)' },
    'fade-down': { opacity: 0, transform: 'translateY(-30px)' },
    'fade-left': { opacity: 0, transform: 'translateX(-30px)' },
    'fade-right': { opacity: 0, transform: 'translateX(30px)' },
    'scale-up': { opacity: 0, transform: 'scale(0.94)' },
    'scale-down': { opacity: 0, transform: 'scale(1.06)' },
  }

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'none',
  }

  const animStyle = reduceMotion
    ? visibleStyle
    : isVisible
    ? { ...baseStyle, ...visibleStyle }
    : { ...baseStyle, ...hiddenStyles[animation] }

  return (
    <div ref={ref} className={className} style={animStyle}>
      {children}
    </div>
  )
}
