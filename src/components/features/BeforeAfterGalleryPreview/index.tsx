'use client'

import { Clock } from 'lucide-react'
import { ComparisonSlider } from '@/components/features/BeforeAfterGallery/ComparisonSlider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

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
          <ScrollReveal key={caseItem._id} animation="fade-up" delay={index * 150}>
            <div
              className="group relative bg-white border border-[#e8e0d5]
                rounded-2xl md:rounded-3xl overflow-hidden p-0
                shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.2)]
                hover:border-[#d4c4b0]
                hover:-translate-y-1.5
                transition-all duration-500 ease-out"
            >
              {/* Comparison Slider - edge-to-edge */}
              <div className="relative">
                {/* Service badge - overlaid on slider */}
                {caseItem.service && (
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center px-3 py-1.5
                    bg-white/90 backdrop-blur-sm text-[#2a2118] text-xs font-semibold uppercase tracking-wider rounded-full
                    shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    {caseItem.service.title}
                  </span>
                )}

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

              {/* Text content */}
              <div className="px-5 py-5 md:px-6 md:py-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] leading-tight group-hover:text-[#8b7355] transition-colors duration-300">
                  {caseItem.title}
                </h3>

                {caseItem.description && (
                  <p className="text-[#5a5048] text-sm leading-relaxed line-clamp-2 mt-2">
                    {caseItem.description}
                  </p>
                )}

                {caseItem.treatmentDuration && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f0ebe3]">
                    <Clock className="w-4 h-4 text-[#8b7355]" strokeWidth={1.5} />
                    <span className="text-xs uppercase tracking-[0.14em] text-[#8b7355] font-semibold">
                      {durationLabel}: <span className="text-[#2a2118] font-bold normal-case tracking-normal">{caseItem.treatmentDuration}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
