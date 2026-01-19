'use client'

import { Clock } from 'lucide-react'
import { ComparisonSlider } from '@/components/features/BeforeAfterGallery/ComparisonSlider'

interface BeforeAfterCase {
  _id: string
  title: string
  service?: {
    _id: string
    title: string
    slug: string
  }
  doctor?: {
    _id: string
    name: string
    slug: string
  }
  beforeImage?: {
    alt?: string
  }
  afterImage?: {
    alt?: string
  }
  beforeImageUrl: string
  afterImageUrl: string
  description?: string
  treatmentDuration?: string
  featured?: boolean
}

interface BeforeAfterGalleryPreviewProps {
  afterLabel: string
  beforeLabel: string
  cases: BeforeAfterCase[]
  durationLabel: string
}

export function BeforeAfterGalleryPreview({
  afterLabel,
  beforeLabel,
  cases,
  durationLabel,
}: BeforeAfterGalleryPreviewProps) {
  if (!cases || cases.length === 0) {
    return null
  }

  // Show only the first 3 featured cases
  const featuredCases = cases.slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {featuredCases.map((caseItem, index) => {
        const beforeImageUrl = caseItem.beforeImageUrl || '/placeholder-before.jpg'
        const afterImageUrl = caseItem.afterImageUrl || '/placeholder-after.jpg'

        return (
          <div
            key={caseItem._id}
            className="group relative bg-[#faf8f5] rounded-3xl p-6 md:p-8
              border border-transparent hover:border-[var(--color-accent)]
              transition-all duration-500 ease-out
              hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]
              hover:-translate-y-2
              animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Service badge - top */}
            {caseItem.service && (
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-[var(--color-accent-light)]
                  text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider
                  rounded-full">
                  {caseItem.service.title}
                </span>
              </div>
            )}

            {/* Comparison Slider - LARGER images */}
            <div className="relative rounded-2xl overflow-hidden mb-8
              shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
              group-hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)]
              transition-shadow duration-500
              ring-1 ring-[var(--color-border-light)] group-hover:ring-[var(--color-accent)]/50">
              <ComparisonSlider
                afterAlt={caseItem.afterImage?.alt || `${caseItem.title} - After`}
                afterLabel={afterLabel}
                afterSrc={afterImageUrl}
                beforeAlt={caseItem.beforeImage?.alt || `${caseItem.title} - Before`}
                beforeLabel={beforeLabel}
                beforeSrc={beforeImageUrl}
                className="aspect-[3/2]"
              />
            </div>

            {/* Text content - better arrangement */}
            <div className="space-y-4">
              {/* Case title - larger */}
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] leading-tight">
                {caseItem.title}
              </h3>

              {/* Description if available */}
              {caseItem.description && (
                <p className="text-[var(--color-secondary)] text-sm leading-relaxed line-clamp-2">
                  {caseItem.description}
                </p>
              )}

              {/* Duration badge - cleaner design */}
              {caseItem.treatmentDuration && (
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-light)]">
                  <div className="w-11 h-11 rounded-xl
                    bg-gradient-to-br from-[var(--color-accent-light)] via-[var(--color-accent)]/30 to-[var(--color-accent)]/50
                    flex items-center justify-center
                    group-hover:from-[var(--color-accent)] group-hover:via-[var(--color-accent)] group-hover:to-[var(--color-accent-hover)]
                    transition-all duration-500
                    shadow-[0_6px_20px_-8px_rgba(212,196,176,0.6)]">
                    <Clock className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[var(--color-secondary)] text-xs font-semibold uppercase tracking-wider mb-0.5">
                      {durationLabel}
                    </p>
                    <p className="text-[var(--color-primary)] font-bold">
                      {caseItem.treatmentDuration}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle background number - like Services section */}
            <span className="absolute top-6 right-6 text-6xl font-bold text-[var(--color-primary)]/[0.03]
              group-hover:text-[var(--color-accent)]/20 transition-colors duration-500 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )
      })}
    </div>
  )
}
