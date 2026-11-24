'use client'

import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { DoctorVideoCard } from './DoctorVideoCard'

type Video = {
  videoId: string
  posterSrc: string
  posterAlt: string
  doctorName: string
  doctorRole: string
  delay?: string
}

type Props = {
  videos: Video[]
}

/**
 * Mobile (< md): horizontal swipe carousel with scroll-snap; cards take ~80% of the
 * track so the next one peeks. Bleeds to the screen edge (negates .container padding).
 * md+: unchanged centered grid.
 */
export function DoctorVideosGrid({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const padLeft = (track: HTMLElement) => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0

  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const anchor = track.getBoundingClientRect().left + padLeft(track)
    let best = 0
    let bestDist = Infinity
    Array.from(track.children).forEach((el, i) => {
      const d = Math.abs(el.getBoundingClientRect().left - anchor)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    // At the very end the last card can't snap to the start edge — treat it as active.
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) best = track.children.length - 1
    setActiveIndex(best)
  }, [])

  const scrollTo = (i: number) => {
    const track = trackRef.current
    const el = track?.children[i] as HTMLElement | undefined
    if (!track || !el) return
    const delta = el.getBoundingClientRect().left - track.getBoundingClientRect().left - padLeft(track)
    track.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className={cn(
          // Mobile carousel (py/-my leave room for card shadows inside the scroller)
          '-mx-5 -my-4 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain px-5 py-4',
          'sm:-mx-8 sm:scroll-px-8 sm:px-8',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          // md+: original grid
          'md:mx-auto md:my-0 md:grid md:max-w-5xl md:grid-cols-2 md:gap-6 md:overflow-visible md:p-0 lg:grid-cols-3 lg:gap-8',
        )}
      >
        {videos.map((v) => (
          <div key={v.videoId} className="w-[80%] shrink-0 snap-start sm:w-[46%] md:w-auto">
            <DoctorVideoCard
              {...v}
              isPlaying={activeId === v.videoId}
              onPlay={() => setActiveId(v.videoId)}
            />
          </div>
        ))}
      </div>

      {videos.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-0.5 md:hidden">
          {videos.map((v, i) => (
            <button
              key={v.videoId}
              type="button"
              aria-label={`${v.doctorName} (${i + 1}/${videos.length})`}
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => scrollTo(i)}
              className="flex h-8 items-center justify-center px-1.5"
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full transition-all duration-300',
                  i === activeIndex ? 'w-6 bg-[#8b7355]' : 'w-1.5 bg-[#d4c4b0]',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
