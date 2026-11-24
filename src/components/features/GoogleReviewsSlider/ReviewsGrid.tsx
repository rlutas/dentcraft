'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import { ReviewCard, type Review } from './ReviewCard'

type Props = {
  reviews: Review[]
  locale: Locale
  /** Pre-formatted meta line per review id (e.g. "Recenzie Google · noiembrie 2026"). */
  metaById: Record<string, string>
  showMoreLabel: string
  /** ICU-style template with {shown} and {total}. */
  shownTemplate: string
  pageSize?: number
}

export function ReviewsGrid({ reviews, locale, metaById, showMoreLabel, shownTemplate, pageSize = 12 }: Props) {
  const [visible, setVisible] = useState(pageSize)
  const shown = Math.min(visible, reviews.length)
  const hasMore = shown < reviews.length

  return (
    <>
      {/* CSS-columns masonry: short reviews don't sit in tall, empty cards */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5" id="google-reviews-grid">
        {reviews.slice(0, shown).map((review) => (
          <div key={review.id} className="break-inside-avoid mb-5">
            <ReviewCard locale={locale} meta={metaById[review.id]} review={review} variant="grid" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p aria-live="polite" className="text-sm text-[#5a5048]">
          {shownTemplate.replace('{shown}', String(shown)).replace('{total}', String(reviews.length))}
        </p>
        {hasMore && (
          <button
            aria-controls="google-reviews-grid"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#e8e0d5] bg-white px-7 py-3 text-sm md:text-base font-semibold text-[#2a2118] transition-colors duration-300 hover:border-[#8b7355] hover:bg-[#faf6f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2"
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
          >
            {showMoreLabel}
            <ChevronDown aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
          </button>
        )}
      </div>
    </>
  )
}
