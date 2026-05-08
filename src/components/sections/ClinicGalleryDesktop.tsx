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

// 4 cols × 3 rows = 12 cells. Primary 3×2 (left) + 2 thumbs right + 4 thumbs bottom row = 7 photos.
const SLOT_CLASSES: Record<number, string> = {
  0: 'col-start-1 col-span-3 row-start-1 row-span-2', // primary 3×2
  1: 'col-start-4 col-span-1 row-start-1 row-span-1', // right top
  2: 'col-start-4 col-span-1 row-start-2 row-span-1', // right bottom
  3: 'col-start-1 col-span-1 row-start-3 row-span-1', // bottom 1
  4: 'col-start-2 col-span-1 row-start-3 row-span-1', // bottom 2
  5: 'col-start-3 col-span-1 row-start-3 row-span-1', // bottom 3
  6: 'col-start-4 col-span-1 row-start-3 row-span-1', // bottom 4
}

const SLOT_COUNT = 7
const ROTATE_MS = 4000

export function ClinicGalleryDesktop({ images }: Props) {
  // layout[slot] = image index. Default: image i is in slot i.
  const [layout, setLayout] = useState<number[]>(() =>
    images.slice(0, SLOT_COUNT).map((_, i) => i)
  )
  const [paused, setPaused] = useState(false)
  const prefersReduced = useReducedMotion()
  // Cycle: which thumb gets promoted next during auto-rotate
  const cycleRef = useRef(1)

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

  // Auto-rotate: swap primary (slot 0) with next thumb (slots 1, 2, 3, ..., 6, 1, 2, ...)
  // Thumbs stay put; only the photo at slot 0 changes each tick (the previous primary lands at the swapped thumb slot).
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
        className="hidden md:grid grid-cols-4 grid-rows-3 gap-3 lg:gap-4 h-[480px] lg:h-[580px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {layout.slice(0, SLOT_COUNT).map((imageIdx, slotIdx) => {
          const img = images[imageIdx]
          if (!img) return null
          const isPrimary = slotIdx === 0
          return (
            <button
              key={`slot-${slotIdx}`}
              type="button"
              onMouseEnter={() => swapPrimary(slotIdx)}
              onClick={() => swapPrimary(slotIdx)}
              onFocus={() => swapPrimary(slotIdx)}
              aria-label={img.caption}
              className={`relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 rounded-3xl ${SLOT_CLASSES[slotIdx]}`}
            >
              <motion.div
                layoutId={`clinic-photo-${imageIdx}`}
                transition={{
                  layout: {
                    type: 'spring',
                    stiffness: 110,
                    damping: 24,
                    mass: 1.4,
                  },
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] shadow-[0_10px_30px_-10px_rgba(42,33,24,0.22)]"
              >
                {/* Photo with subtle scale-bloom when arriving as primary */}
                <motion.div
                  key={isPrimary ? `primary-${imageIdx}` : `thumb-${imageIdx}`}
                  initial={isPrimary ? { scale: 1.08, opacity: 0.85 } : false}
                  animate={isPrimary ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes={isPrimary ? '60vw' : '20vw'}
                    className="object-cover"
                  />
                </motion.div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                    isPrimary
                      ? 'from-[#2a2118]/55 via-transparent to-transparent'
                      : 'from-[#2a2118]/40 via-transparent to-transparent'
                  } transition-opacity duration-500`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-left pointer-events-none">
                  <span className="text-white font-medium text-[11px] md:text-xs lg:text-sm">
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
