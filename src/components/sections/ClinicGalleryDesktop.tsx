'use client'

import Image from 'next/image'
import { motion, LayoutGroup, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type ClinicImage = {
  src: string
  caption: string
}

type Props = {
  images: ClinicImage[]
}

// Responsive slots:
//  - Mobile (default, 3 cols × 4 rows): primary (3×2 top) + 6 thumbs in 3×2 below
//  - Desktop (md+, 4 cols × 3 rows): primary (3×2 left) + 2 thumbs right + 4 thumbs bottom
const SLOT_CLASSES: Record<number, string> = {
  0: 'col-start-1 col-span-3 row-start-1 row-span-2 md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-2',
  1: 'col-start-1 col-span-1 row-start-3 row-span-1 md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-1',
  2: 'col-start-2 col-span-1 row-start-3 row-span-1 md:col-start-4 md:col-span-1 md:row-start-2 md:row-span-1',
  3: 'col-start-3 col-span-1 row-start-3 row-span-1 md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1',
  4: 'col-start-1 col-span-1 row-start-4 row-span-1 md:col-start-2 md:col-span-1 md:row-start-3 md:row-span-1',
  5: 'col-start-2 col-span-1 row-start-4 row-span-1 md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-1',
  6: 'col-start-3 col-span-1 row-start-4 row-span-1 md:col-start-4 md:col-span-1 md:row-start-3 md:row-span-1',
}

const SLOT_COUNT = 7
const ROTATE_MS = 6500
const TAP_PAUSE_MS = 7000

export function ClinicGalleryDesktop({ images }: Props) {
  const [layout, setLayout] = useState<number[]>(() =>
    images.slice(0, SLOT_COUNT).map((_, i) => i)
  )
  const [paused, setPaused] = useState(false)
  // Detect hover capability — touch devices won't get hover-based pause
  const [canHover, setCanHover] = useState(true)
  const prefersReduced = useReducedMotion()
  const cycleRef = useRef(1)
  const tapPauseTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCanHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  const swapPrimary = (clickedSlot: number) => {
    if (clickedSlot === 0) return
    setLayout((prev) => {
      const next = [...prev]
      const tmp = next[0]!
      next[0] = next[clickedSlot]!
      next[clickedSlot] = tmp
      return next
    })
  }

  const handleTap = (slotIdx: number) => {
    swapPrimary(slotIdx)
    // Briefly pause auto-rotate so user can enjoy their pick (both touch + desktop)
    setPaused(true)
    if (tapPauseTimerRef.current) clearTimeout(tapPauseTimerRef.current)
    tapPauseTimerRef.current = setTimeout(() => setPaused(false), TAP_PAUSE_MS)
  }

  useEffect(() => {
    if (paused || prefersReduced) return
    const id = setInterval(() => {
      const target = cycleRef.current
      setLayout((prev) => {
        const next = [...prev]
        const tmp = next[0]!
        next[0] = next[target]!
        next[target] = tmp
        return next
      })
      cycleRef.current = (cycleRef.current % (SLOT_COUNT - 1)) + 1
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, prefersReduced])

  return (
    <LayoutGroup id="clinic-gallery">
      <div
        className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 gap-2.5 md:gap-3 lg:gap-4 h-[480px] md:h-[480px] lg:h-[580px]"
        onMouseEnter={canHover ? () => setPaused(true) : undefined}
        onMouseLeave={canHover ? () => setPaused(false) : undefined}
      >
        {layout.slice(0, SLOT_COUNT).map((imageIdx, slotIdx) => {
          const img = images[imageIdx]
          if (!img) return null
          const isPrimary = slotIdx === 0
          return (
            <button
              key={`slot-${slotIdx}`}
              type="button"
              onClick={() => handleTap(slotIdx)}
              onFocus={() => swapPrimary(slotIdx)}
              aria-label={img.caption}
              aria-current={isPrimary ? 'true' : undefined}
              className={`group/slot relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 rounded-2xl md:rounded-3xl ${isPrimary ? 'cursor-default' : 'cursor-pointer'} ${SLOT_CLASSES[slotIdx]}`}
            >
              <motion.div
                layoutId={`clinic-photo-${imageIdx}`}
                transition={{
                  layout: {
                    type: 'spring',
                    stiffness: 140,
                    damping: 26,
                    mass: 1,
                  },
                }}
                {...(!isPrimary && canHover ? { whileHover: { scale: 1.025 } } : {})}
                {...(!isPrimary ? { whileTap: { scale: 0.98 } } : {})}
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] shadow-[0_10px_30px_-10px_rgba(42,33,24,0.22)] will-change-transform"
              >
                <motion.div
                  key={isPrimary ? `primary-${imageIdx}` : `thumb-${imageIdx}`}
                  initial={isPrimary ? { scale: 1.06, opacity: 0.85 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes={isPrimary ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 33vw, 20vw'}
                    className={`object-cover transition-[filter] duration-500 ${isPrimary ? '' : 'brightness-95 group-hover/slot:brightness-110'}`}
                  />
                </motion.div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                    isPrimary
                      ? 'from-[#2a2118]/55 via-transparent to-transparent'
                      : 'from-[#2a2118]/40 via-transparent to-transparent'
                  } transition-opacity duration-500`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-4 text-left pointer-events-none">
                  <span className="text-white font-medium text-[10px] md:text-xs lg:text-sm">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
