'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Load YT IFrame API once globally
function ensureYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve()
    const w = window as unknown as { YT?: { Player: unknown }; onYouTubeIframeAPIReady?: () => void }
    if (w.YT && w.YT.Player) return resolve()
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    if (!existing) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
    }
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      if (prev) prev()
      resolve()
    }
  })
}

type Props = {
  videoId: string
  posterSrc: string
  posterAlt: string
  doctorName: string
  doctorRole: string
  delay?: string
  isPlaying?: boolean
  onPlay?: () => void
}

function PosterContent({
  posterSrc,
  posterAlt,
  doctorName,
  doctorRole,
}: {
  posterSrc: string
  posterAlt: string
  doctorName: string
  doctorRole: string
}) {
  return (
    <>
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover object-top"
      />

      {/* Dark gradient bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/85 via-[#2a2118]/30 to-transparent" />

      {/* YouTube Shorts badge top-right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/55 backdrop-blur-sm rounded-full">
          <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Shorts</span>
        </div>
      </div>

      {/* Animated play button — pulsing rings + hover scale */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative">
          {/* Outer pulse ring */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
          {/* Middle pulse ring (offset) */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-white/30"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
          />
          <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Play className="w-6 h-6 text-[#2a2118] ml-0.5" fill="currentColor" />
            </span>
          </span>
        </div>
      </div>

      {/* Doctor info bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-left pointer-events-none">
        <p className="text-white font-bold text-base md:text-lg leading-tight">{doctorName}</p>
        <p className="text-white/80 text-xs md:text-sm mt-1">{doctorRole}</p>
      </div>
    </>
  )
}

export function DoctorVideoCard({
  videoId,
  posterSrc,
  posterAlt,
  doctorName,
  doctorRole,
  delay = '0s',
  isPlaying,
  onPlay,
}: Props) {
  const isControlled = typeof isPlaying === 'boolean'
  const [internalPlaying, setInternalPlaying] = useState(false)
  const [canHover, setCanHover] = useState(true)
  const playing = isControlled ? isPlaying : internalPlaying
  const startPlay = () => {
    if (onPlay) onPlay()
    if (!isControlled) setInternalPlaying(true)
  }
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCanHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  useEffect(() => {
    if (!playing || !canHover) return
    let cancelled = false
    ensureYTApi().then(() => {
      if (cancelled || !iframeRef.current) return
      const w = window as unknown as { YT?: { Player: new (el: HTMLIFrameElement, opts: unknown) => unknown } }
      if (!w.YT?.Player) return
      try {
        new w.YT.Player(iframeRef.current, {
          events: {
            onReady: (event: { target: { setPlaybackQuality?: (q: string) => void } }) => {
              try {
                event.target.setPlaybackQuality?.('hd720')
              } catch { /* ignore */ }
            },
          },
        })
      } catch { /* ignore */ }
    })
    return () => {
      cancelled = true
    }
  }, [playing, canHover])

  const posterProps = { posterSrc, posterAlt, doctorName, doctorRole }

  return (
    <div
      className="group relative block animate-[fadeInUp_0.6s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      <div
        className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#f5f0e8]
          border border-[#e8e0d5] group-hover:border-[#d4c4b0] transition-all duration-500
          shadow-[0_20px_50px_-15px_rgba(42,33,24,0.18)] group-hover:shadow-[0_30px_70px_-15px_rgba(139,115,85,0.25)]
          group-hover:-translate-y-1.5"
      >
        {playing && canHover ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&vq=hd720&enablejsapi=1`}
            title={`${doctorName} — video`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : canHover ? (
          // Desktop: button triggers inline iframe
          <button
            type="button"
            onClick={startPlay}
            aria-label={`Redă videoul cu ${doctorName}`}
            className="absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 rounded-3xl"
          >
            <PosterContent {...posterProps} />
          </button>
        ) : (
          // Mobile/touch: anchor link opens YouTube Shorts directly (one-tap, no double-tap issue)
          <a
            href={`https://youtube.com/shorts/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Vezi videoul cu ${doctorName} pe YouTube Shorts`}
            className="absolute inset-0 w-full h-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 rounded-3xl"
          >
            <PosterContent {...posterProps} />
          </a>
        )}
      </div>
    </div>
  )
}
