'use client'

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'

// Avatar colors for Google reviews
const avatarColors = [
  '#4285F4', // Google Blue
  '#34A853', // Google Green
  '#FBBC05', // Google Yellow
  '#EA4335', // Google Red
  '#7B1FA2', // Purple
  '#00897B', // Teal
]

function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % avatarColors.length
  return avatarColors[index] ?? avatarColors[0] ?? '#4285F4'
}

interface Review {
  id: string
  author: string
  rating: number
  date: string | { ro: string; en: string; hu: string }
  text: string | { ro: string; en: string; hu: string }
  photoUrl?: string
}

interface GoogleReviewsSliderProps {
  reviews: Review[]
  locale: Locale
}

export function GoogleReviewsSlider({ reviews, locale }: GoogleReviewsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Calculate total pages based on visible items
  const updateScrollState = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    // Update arrow visibility
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate current page - find the card width from first child
    const firstChild = container.firstElementChild as HTMLElement | null
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth
      const gap = 24 // gap-6 = 1.5rem = 24px
      const cardWithGap = cardWidth + gap

      // Calculate visible cards per page based on screen width
      const visibleCards = Math.round(clientWidth / cardWithGap)
      const totalPagesCalc = Math.ceil(reviews.length / Math.max(1, visibleCards))
      setTotalPages(totalPagesCalc)

      // Calculate current page based on scroll position
      const currentPageCalc = Math.round(scrollLeft / (cardWithGap * Math.max(1, visibleCards)))
      setCurrentPage(Math.min(currentPageCalc, totalPagesCalc - 1))
    }
  }, [reviews.length])

  // Listen for scroll events
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      updateScrollState()
    }

    // Initial state
    updateScrollState()

    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollToDirection = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    // Scroll by visible width
    const scrollAmount = direction === 'left'
      ? -container.clientWidth
      : container.clientWidth

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }, [])

  const scrollToPage = useCallback((pageIndex: number) => {
    const container = scrollRef.current
    if (!container) return

    const firstChild = container.firstElementChild as HTMLElement | null
    if (!firstChild) return

    const cardWidth = firstChild.offsetWidth
    const gap = 24
    const cardWithGap = cardWidth + gap
    const visibleCards = Math.round(container.clientWidth / cardWithGap)

    const scrollPosition = pageIndex * cardWithGap * visibleCards

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }, [])

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {canScrollLeft && (
        <button
          aria-label="Previous reviews"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
            w-12 h-12 rounded-full bg-white shadow-lg border border-[var(--color-border-light)]
            flex items-center justify-center
            hover:bg-[var(--color-accent-light)] transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
          type="button"
          onClick={() => scrollToDirection('left')}
        >
          <ChevronLeft className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={2} />
        </button>
      )}

      {canScrollRight && (
        <button
          aria-label="Next reviews"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
            w-12 h-12 rounded-full bg-white shadow-lg border border-[var(--color-border-light)]
            flex items-center justify-center
            hover:bg-[var(--color-accent-light)] transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
          type="button"
          onClick={() => scrollToDirection('right')}
        >
          <ChevronRight className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={2} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
          scrollbar-hide px-1 py-1 -mx-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="flex-shrink-0 snap-start
              w-[calc(100%-2rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]
              bg-[#faf8f5] rounded-2xl p-6 md:p-8 relative
              border border-[var(--color-border-light)] hover:border-[var(--color-accent)]
              hover:shadow-lg transition-all duration-300
              animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: `${Math.min(index, 5) * 0.1}s` }}
          >
            {/* Google icon */}
            <div className="absolute top-4 right-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />
              ))}
            </div>

            {/* Review text */}
            <blockquote className="mb-6 min-h-[80px]">
              <p className="text-[var(--color-primary)] leading-relaxed line-clamp-4">
                &ldquo;{typeof review.text === 'object' ? review.text[locale] : review.text}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-[var(--color-border-light)]">
              {review.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  src={review.photoUrl}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: getAvatarColor(review.author) }}
                >
                  {review.author.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-semibold text-[var(--color-primary)] text-sm">{review.author}</div>
                <div className="text-xs text-[var(--color-secondary)]">
                  {typeof review.date === 'object' ? review.date[locale] : review.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              aria-label={`Go to page ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
                ${currentPage === index
                  ? 'bg-[var(--color-primary)] w-4'
                  : 'bg-[var(--color-border)] hover:bg-[var(--color-secondary)]'
                }`}
              type="button"
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
