import { Star } from 'lucide-react'
import type { Locale } from '@/i18n/config'

// Shared Google review card: homepage marquee + /testimoniale grid.
// Hook-free so it renders in both server and client components.

// Brand-palette avatars (sand / tan / walnut) instead of Google's teal/purple defaults.
const avatarTones: Array<{ bg: string; fg: string }> = [
  { bg: '#e8dccb', fg: '#6b5a40' }, // sand
  { bg: '#d4c4b0', fg: '#4a3d30' }, // linen
  { bg: '#8b7355', fg: '#faf6f1' }, // tan
  { bg: '#6b5a40', fg: '#f5f0e8' }, // walnut
  { bg: '#b89f80', fg: '#2a2118' }, // camel
  { bg: '#2a2118', fg: '#e8dccb' }, // ink
]

function getAvatarTone(name: string) {
  const index = name.charCodeAt(0) % avatarTones.length
  return avatarTones[index] ?? avatarTones[0]!
}

/** Warm gold that sits in the cream/brown palette (Google's #FBBC05 reads neon here). */
export const STAR_GOLD = '#c39a4a'

export type LocalizedText = string | { ro: string; en: string; hu: string }

export interface Review {
  id: string
  author: string
  rating: number
  date: LocalizedText
  text: LocalizedText
  photoUrl?: string
}

export function pickLocalized(value: LocalizedText, locale: Locale): string {
  return typeof value === 'object' ? value[locale] || value.ro : value
}

export function GoogleGMark({ className = 'w-5 h-5 flex-shrink-0' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

type ReviewCardProps = {
  review: Review
  locale: Locale
  /** Line under the author name. Defaults to the review date. */
  meta?: string | undefined
  /** 'marquee' = fixed width + clamped text (homepage); 'grid' = fluid, full text (/testimoniale). */
  variant?: 'marquee' | 'grid'
}

export function ReviewCard({ review, locale, meta, variant = 'marquee' }: ReviewCardProps) {
  const isGrid = variant === 'grid'
  const text = pickLocalized(review.text, locale)
  const metaLine = meta ?? pickLocalized(review.date, locale)
  const tone = getAvatarTone(review.author)

  const Wrapper = isGrid ? 'figure' : 'div'

  const stars = (
    <div aria-label={`${review.rating}/5`} className="flex gap-0.5" role="img">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} aria-hidden="true" className="w-4 h-4" fill={STAR_GOLD} stroke={STAR_GOLD} strokeWidth={1.25} />
      ))}
    </div>
  )

  const author = (
    <div className="flex items-center gap-3 min-w-0">
      {review.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="w-10 h-10 shrink-0 rounded-full object-cover ring-1 ring-[#e8e0d5]"
          height={40}
          loading="lazy"
          referrerPolicy="no-referrer"
          src={review.photoUrl}
          width={40}
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-serif italic text-base"
          style={{ backgroundColor: tone.bg, color: tone.fg }}
        >
          {review.author.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <div className="font-semibold text-[#2a2118] text-sm truncate">{review.author}</div>
        <div className="text-xs text-[#8b7355]">{metaLine}</div>
      </div>
    </div>
  )

  if (isGrid) {
    // Editorial card: stars + quote first, author signs off underneath (team/service card styling)
    return (
      <Wrapper className="w-full bg-white rounded-3xl p-6 md:p-7 border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          {stars}
          <GoogleGMark className="w-4 h-4 shrink-0 opacity-70" />
        </div>
        {/* Review Text — verbatim */}
        <blockquote className="text-[#2a2118] leading-relaxed text-[15px] whitespace-pre-line">
          {text}
        </blockquote>
        <figcaption className="mt-5 pt-5 border-t border-[#f0ebe3]">{author}</figcaption>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="flex-shrink-0 w-[360px] bg-white rounded-3xl p-5 border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:border-[#d4c4b0] transition-colors duration-300">
      {/* Header: Author + Google icon */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {author}
        <GoogleGMark className="w-4 h-4 shrink-0 opacity-70" />
      </div>
      <div className="mb-3">{stars}</div>
      <p className="text-[#2a2118] leading-relaxed line-clamp-4 text-sm">{text}</p>
    </Wrapper>
  )
}
