'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  bold: string
  italic: string
}

export function AnimatedServiceHeading({ bold, italic }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, just fade in without per-letter stagger
  if (prefersReducedMotion) {
    return (
      <h2
        ref={ref}
        className="font-bold text-[#2a2118] leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6"
      >
        {bold}
        <span className="font-serif italic font-medium text-[#8b7355] block pb-1 mt-1">
          {italic}
        </span>
      </h2>
    )
  }

  const italicChars = Array.from(italic)

  return (
    <h2
      ref={ref}
      className="font-bold text-[#2a2118] leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6"
    >
      {/* Bold word — fade up as a single unit */}
      <motion.span
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {bold}
      </motion.span>

      {/* Italic word — letter-by-letter slide in from left */}
      <motion.span
        className="font-serif italic font-medium text-[#8b7355] block pb-1 mt-1"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.04,
              delayChildren: 0.35,
            },
          },
        }}
        aria-label={italic}
      >
        {italicChars.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { type: 'spring', stiffness: 220, damping: 22 },
              },
            }}
            className="inline-block"
            aria-hidden="true"
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.span>
    </h2>
  )
}
