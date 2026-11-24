'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

type Step = { stepNumber: number; title: string; description: string; label: string }

/**
 * Vertical process timeline: the connecting line draws in with scroll (scaleY, transform-only),
 * big serif numbers, each step slides in. Reduced motion → static full line, no entrance.
 */
export function ServiceProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <ol ref={ref} className="relative list-none p-0 m-0">
      {/* rail + drawn line */}
      <span aria-hidden="true" className="absolute left-[1.75rem] md:left-[2.25rem] top-3 bottom-3 w-px bg-[#e5dccf]" />
      <motion.span
        aria-hidden="true"
        style={reduce ? {} : { scaleY: progress }}
        className="absolute left-[1.75rem] md:left-[2.25rem] top-3 bottom-3 w-[2px] -ml-[0.5px] origin-top bg-gradient-to-b from-[#8b7355] via-[#b59a7a] to-[#d4c4b0]"
      />
      {steps.map((step, i) => (
        <motion.li
          key={step.stepNumber}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className={`group relative flex gap-5 md:gap-8 ${i < steps.length - 1 ? 'pb-8 md:pb-12' : ''}`}
        >
          <div className="relative z-10 shrink-0 w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-white border border-[#e2d8ca] shadow-[0_10px_30px_-12px_rgba(139,115,85,0.35)] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-colors duration-300">
            <span className="font-serif italic text-2xl md:text-[2rem] leading-none text-[#8b7355] group-hover:text-[#d4c4b0] transition-colors duration-300">
              {String(step.stepNumber).padStart(2, '0')}
            </span>
          </div>
          <div className="flex-1 min-w-0 pt-2 md:pt-3">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b7355] mb-2">{step.label}</span>
            <h3 className="text-xl md:text-2xl font-bold text-[#2a2118] leading-tight tracking-tight mb-2.5">{step.title}</h3>
            <p className="text-[15px] md:text-base text-[#5a5048] leading-relaxed max-w-[60ch]">{step.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
