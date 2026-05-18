'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster: string
  alt: string
  className?: string
  /** Distance (rootMargin) before viewport to start loading. Default '200px'. */
  rootMargin?: string
}

/**
 * Lazy-loaded autoplay/muted/loop background video.
 *
 * Renders only the poster image until the element approaches the viewport,
 * at which point the video is mounted, loaded and played. Cuts initial
 * page payload significantly (the video MP4 is only fetched when needed).
 */
export function LazyVideo({ src, poster, alt, className = '', rootMargin = '200px' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = containerRef.current
    if (!el) return

    // Older browsers / SSR safety — fall back to loading immediately
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {!shouldLoad && (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-[30%_center] md:object-center"
          priority={false}
        />
      )}
      {shouldLoad && (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={alt}
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] md:object-center"
        />
      )}
    </div>
  )
}
