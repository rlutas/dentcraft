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

export function ClinicGalleryDesktop({ images }: Props) {
  const [primaryIdx, setPrimaryIdx] = useState(0)

  // Reorder: primary first, rest in original sequence
  const orderedIndices = [
    primaryIdx,
    ...images.map((_, i) => i).filter((i) => i !== primaryIdx),
  ]

  return (
    <LayoutGroup>
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[460px] lg:h-[540px]">
        {orderedIndices.slice(0, 5).map((origIdx, displayPos) => {
          const img = images[origIdx]
          if (!img) return null
          const isPrimary = displayPos === 0
          return (
            <motion.button
              key={img.src}
              layout
              transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 0.8 }}
              type="button"
              onMouseEnter={() => setPrimaryIdx(origIdx)}
              onFocus={() => setPrimaryIdx(origIdx)}
              aria-label={img.caption}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] ${
                isPrimary ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              }`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes={isPrimary ? '50vw' : '25vw'}
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                  isPrimary
                    ? 'from-[#2a2118]/60 via-transparent to-transparent opacity-100'
                    : 'from-[#2a2118]/45 via-transparent to-transparent opacity-90'
                }`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-left">
                <span className="text-white font-medium text-xs md:text-sm">
                  {img.caption}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
