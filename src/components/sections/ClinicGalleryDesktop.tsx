'use client'

import Image from 'next/image'
import { motion, LayoutGroup } from 'framer-motion'
import { useState } from 'react'

type ClinicImage = {
  src: string
  caption: string
}

type Props = {
  images: ClinicImage[]
}

// Fixed grid slots in 5-col × 2-row layout. Slot 0 = primary (2×2 left), slots 1-6 = thumbs in 3×2 right grid.
const SLOT_CLASSES: Record<number, string> = {
  0: 'col-start-1 col-span-2 row-start-1 row-span-2',
  1: 'col-start-3 col-span-1 row-start-1 row-span-1',
  2: 'col-start-4 col-span-1 row-start-1 row-span-1',
  3: 'col-start-5 col-span-1 row-start-1 row-span-1',
  4: 'col-start-3 col-span-1 row-start-2 row-span-1',
  5: 'col-start-4 col-span-1 row-start-2 row-span-1',
  6: 'col-start-5 col-span-1 row-start-2 row-span-1',
}

export function ClinicGalleryDesktop({ images }: Props) {
  // layout[slot] = image index. Default: image i is in slot i.
  const [layout, setLayout] = useState<number[]>(() => images.slice(0, 7).map((_, i) => i))

  const promoteToprimary = (clickedSlot: number) => {
    if (clickedSlot === 0) return // already primary
    setLayout((prev) => {
      const next = [...prev]
      const tmp = next[0]
      next[0] = next[clickedSlot]!
      next[clickedSlot] = tmp!
      return next
    })
  }

  return (
    <LayoutGroup id="clinic-gallery">
      <div className="hidden md:grid grid-cols-5 grid-rows-2 gap-3 lg:gap-4 h-[400px] lg:h-[500px]">
        {layout.slice(0, 7).map((imageIdx, slotIdx) => {
          const img = images[imageIdx]
          if (!img) return null
          const isPrimary = slotIdx === 0
          return (
            <button
              key={`slot-${slotIdx}`}
              type="button"
              onMouseEnter={() => promoteToprimary(slotIdx)}
              onFocus={() => promoteToprimary(slotIdx)}
              aria-label={img.caption}
              className={`relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 rounded-3xl ${SLOT_CLASSES[slotIdx]}`}
            >
              <motion.div
                layoutId={`clinic-photo-${imageIdx}`}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 32,
                  mass: 0.9,
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] shadow-[0_10px_30px_-10px_rgba(42,33,24,0.2)]"
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes={isPrimary ? '50vw' : '25vw'}
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isPrimary
                      ? 'from-[#2a2118]/55 via-transparent to-transparent'
                      : 'from-[#2a2118]/40 via-transparent to-transparent'
                  } transition-opacity duration-500`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-left">
                  <span className="text-white font-medium text-xs md:text-sm">
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
