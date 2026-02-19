'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { ComparisonSlider } from './ComparisonSlider'

// Case type matching the gallery page
export type GalleryCase = {
  _id: string
  title: string | null
  service: {
    _id: string
    title: string
    slug: string
  } | null
  doctor: {
    _id: string
    name: string
    slug: string
  } | null
  beforeImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
    generatedUrl?: string
  }
  afterImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
    generatedUrl?: string
  }
  description: string | null
  treatmentDuration: string | null
  featured: boolean
}

type GalleryModalProps = {
  afterLabel?: string
  beforeLabel?: string
  cases: GalleryCase[]
  currentIndex: number
  doctorLabel?: string
  durationLabel?: string
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryModal({
  afterLabel = 'After',
  beforeLabel = 'Before',
  cases,
  currentIndex,
  doctorLabel = 'Doctor',
  durationLabel = 'Duration',
  isOpen,
  onClose,
  onNavigate,
}: GalleryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const currentCase = cases[currentIndex]

  // Navigate to previous case
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    } else {
      // Wrap to last case
      onNavigate(cases.length - 1)
    }
  }, [currentIndex, cases.length, onNavigate])

  // Navigate to next case
  const goToNext = useCallback(() => {
    if (currentIndex < cases.length - 1) {
      onNavigate(currentIndex + 1)
    } else {
      // Wrap to first case
      onNavigate(0)
    }
  }, [currentIndex, cases.length, onNavigate])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        goToPrevious()
        break
      case 'ArrowRight':
        goToNext()
        break
    }
  }, [onClose, goToPrevious, goToNext])

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  // Add/remove keyboard listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, handleKeyDown])

  // Focus modal when opened for accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen || !currentCase) {
    return null
  }

  return (
    <div
      aria-labelledby="gallery-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
          type="button"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-[var(--color-text)]" />
        </button>

        {/* Navigation Buttons */}
        {cases.length > 1 && (
          <>
            <button
              aria-label="Previous case"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
              type="button"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-6 h-6 text-[var(--color-text)]" />
            </button>
            <button
              aria-label="Next case"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
              type="button"
              onClick={goToNext}
            >
              <ChevronRight className="w-6 h-6 text-[var(--color-text)]" />
            </button>
          </>
        )}

        {/* Comparison Slider */}
        <div className="p-4 pb-0">
          <ComparisonSlider
            afterAlt={currentCase.afterImage?.alt || afterLabel}
            afterLabel={afterLabel}
            afterSrc={currentCase.afterImage?.asset?.url || ''}
            beforeAlt={currentCase.beforeImage?.alt || beforeLabel}
            beforeLabel={beforeLabel}
            beforeSrc={currentCase.beforeImage?.asset?.url || ''}
            className="rounded-xl"
          />
        </div>

        {/* Case Details */}
        <div className="p-6">
          {/* Service Badge */}
          {currentCase.service && (
            <span className="inline-flex px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-primary)] text-body-sm font-medium rounded-full mb-3">
              {currentCase.service.title}
            </span>
          )}

          {/* Title */}
          {currentCase.title && (
            <h2
              className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-2"
              id="gallery-modal-title"
            >
              {currentCase.title}
            </h2>
          )}

          {/* Description */}
          {currentCase.description && (
            <p className="text-body text-muted mb-4">
              {currentCase.description}
            </p>
          )}

          {/* Duration and Doctor */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--color-accent)]">
            {currentCase.treatmentDuration && (
              <div className="flex items-center gap-2">
                <span className="text-body-sm text-muted">{durationLabel}:</span>
                <span className="text-body-sm font-medium text-[var(--color-text)]">
                  {currentCase.treatmentDuration}
                </span>
              </div>
            )}
            {currentCase.doctor && (
              <div className="flex items-center gap-2">
                <span className="text-body-sm text-muted">{doctorLabel}:</span>
                <span className="text-body-sm font-medium text-[var(--color-text)]">
                  Dr. {currentCase.doctor.name}
                </span>
              </div>
            )}
          </div>

          {/* Pagination indicator */}
          {cases.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {cases.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to case ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[var(--color-primary)] w-4'
                      : 'bg-[var(--color-accent)] hover:bg-[var(--color-primary)]/50'
                  }`}
                  type="button"
                  onClick={() => onNavigate(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GalleryModal
