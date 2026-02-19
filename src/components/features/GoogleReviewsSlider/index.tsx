'use client'

import { Star, MessageSquare, CheckCircle } from 'lucide-react'
import { useState } from 'react'
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
  rating?: number
  totalReviews?: number
  googleMapsUrl?: string
}

// Review Card Component
function ReviewCard({ review, locale }: { review: Review; locale: Locale }) {
  return (
    <div className="flex-shrink-0 w-[360px] bg-white rounded-2xl p-5 border border-[var(--color-border-light)] shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header: Author + Google icon */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {review.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={review.author}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
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
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-[var(--color-primary)] leading-relaxed line-clamp-3 text-sm">
        {typeof review.text === 'object' ? review.text[locale] : review.text}
      </p>
    </div>
  )
}

export function GoogleReviewsSlider({ reviews, locale, rating, totalReviews, googleMapsUrl }: GoogleReviewsSliderProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Split reviews into two rows
  const midPoint = Math.ceil(reviews.length / 2)
  const topRowReviews = reviews.slice(0, midPoint)
  const bottomRowReviews = reviews.slice(midPoint)

  // Duplicate for infinite scroll effect (2x is sufficient for seamless loop)
  const topRowDuplicated = [...topRowReviews, ...topRowReviews]
  const bottomRowDuplicated = [...bottomRowReviews, ...bottomRowReviews]

  return (
    <div className="space-y-10">
      {/* Overview Text */}
      <p className="text-center text-[var(--color-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
        Pacienții noștri apreciază profesionalismul și atenția la detalii. Iată ce spun despre experiența lor.
      </p>

      {/* Stats Bar */}
      {rating && totalReviews && (
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
              <Star className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">{rating}/5</div>
              <div className="text-sm text-[var(--color-secondary)]">Rating mediu</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-14 bg-[var(--color-border)]" />

          {/* Reviews Count */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">{totalReviews}+</div>
              <div className="text-sm text-[var(--color-secondary)]">Recenzii Google</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-14 bg-[var(--color-border)]" />

          {/* Happy Clients */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">500+</div>
              <div className="text-sm text-[var(--color-secondary)]">Clienți mulțumiți</div>
            </div>
          </div>
        </div>
      )}

      {/* Marquee Container - Full Screen Width */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div
          className="space-y-5 overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Row - Scrolls Left */}
          <div className="relative">
            <div
              className={`flex gap-5 w-max animate-marquee-left ${isPaused ? 'animate-paused' : ''}`}
            >
              {topRowDuplicated.map((review, index) => (
                <ReviewCard key={`top-${review.id}-${index}`} locale={locale} review={review} />
              ))}
            </div>
          </div>

          {/* Bottom Row - Scrolls Right */}
          <div className="relative">
            <div
              className={`flex gap-5 w-max animate-marquee-right ${isPaused ? 'animate-paused' : ''}`}
            >
              {bottomRowDuplicated.map((review, index) => (
                <ReviewCard key={`bottom-${review.id}-${index}`} locale={locale} review={review} />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          className="inline-flex items-center gap-3 px-6 py-3
            bg-[var(--color-primary)] text-white rounded-full
            hover:bg-[var(--color-primary-dark)] transition-colors duration-300
            font-medium shadow-md hover:shadow-lg"
          href="https://g.page/r/CRn1KUzHwfjFEBM/review"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Star className="w-5 h-5" />
          Lasă o recenzie
        </a>

        {googleMapsUrl && (
          <a
            className="inline-flex items-center gap-3 px-6 py-3
              bg-white border border-[var(--color-border)] rounded-full
              hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300
              text-[var(--color-primary)] font-medium"
            href={googleMapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Vezi toate recenziile
          </a>
        )}
      </div>
    </div>
  )
}
