'use client'

import { Images, Phone } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { GalleryModal, type GalleryCase } from '@/components/features/BeforeAfterGallery'

type SanityService = {
  _id: string
  title: string
  slug: string
}

type GalleryPageClientProps = {
  cases: GalleryCase[]
  currentFilter: string | undefined
  services: SanityService[]
  translations: {
    after: string
    allTreatments: string
    before: string
    bookAppointment: string
    ctaSubtitle: string
    ctaTitle: string
    doctor: string
    duration: string
    featured: string
    filterBy: string
    noCases: string
    subtitle: string
    title: string
    viewDetails: string
  }
}

export function GalleryPageClient({
  cases,
  currentFilter,
  services,
  translations: t,
}: GalleryPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)

  const openModal = useCallback((index: number) => {
    setCurrentCaseIndex(index)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const navigateModal = useCallback((index: number) => {
    setCurrentCaseIndex(index)
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Dramatic lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Acasă
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Galerie</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Transformări reale
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-16 flex items-center gap-6">
            <div className="w-24 h-px bg-[#d4c4b0]" />
            <span className="text-white/30 text-sm">{cases.length} cazuri documentate</span>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {services && services.length > 0 && (
        <section className="py-8 bg-white border-b border-[var(--color-accent)]">
          <div className="container">
            <p className="text-body-sm text-muted mb-4">{t.filterBy}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                  !currentFilter
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                }`}
                href="/galerie"
              >
                {t.allTreatments}
              </Link>
              {services.map((service) => (
                <Link
                  key={service._id}
                  className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                    currentFilter === service.slug
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                  }`}
                  href={`/galerie?service=${service.slug}` as '/galerie'}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="section bg-white">
        <div className="container">
          {cases.length === 0 && currentFilter ? (
            <div className="text-center py-12">
              <p className="text-body-lg text-muted">{t.noCases}</p>
              <Link className="btn btn-primary mt-6" href="/galerie">
                {t.allTreatments}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem, index) => (
                <GalleryCard
                  key={caseItem._id}
                  caseItem={caseItem}
                  index={index}
                  translations={t}
                  onOpenModal={openModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t.ctaTitle}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t.ctaSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t.bookAppointment}
              </Link>
              <a
                className="btn btn-lg btn-secondary flex items-center gap-2"
                href="tel:+40741199977"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        afterLabel={t.after}
        beforeLabel={t.before}
        cases={cases}
        currentIndex={currentCaseIndex}
        doctorLabel={t.doctor}
        durationLabel={t.duration}
        isOpen={modalOpen}
        onClose={closeModal}
        onNavigate={navigateModal}
      />
    </div>
  )
}

// Gallery Card Component
function GalleryCard({
  caseItem,
  index,
  onOpenModal,
  translations: t,
}: {
  caseItem: GalleryCase
  index: number
  onOpenModal: (index: number) => void
  translations: GalleryPageClientProps['translations']
}) {
  return (
    <div className="card group overflow-hidden">
      {/* Image Comparison Preview - Clickable */}
      <button
        aria-label={t.viewDetails}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
        type="button"
        onClick={() => onOpenModal(index)}
      >
        {/* Split view - Before on left, After on right */}
        <div className="absolute inset-0 flex transition-transform group-hover:scale-105">
          {/* Before side */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {caseItem.beforeImage?.generatedUrl && (
              <Image
                fill
                alt={caseItem.beforeImage.alt || t.before}
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
                src={caseItem.beforeImage.generatedUrl}
              />
            )}
            {/* Before label */}
            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs font-medium rounded">
              {t.before}
            </span>
          </div>
          {/* After side */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {caseItem.afterImage?.generatedUrl && (
              <Image
                fill
                alt={caseItem.afterImage.alt || t.after}
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
                src={caseItem.afterImage.generatedUrl}
              />
            )}
            {/* After label */}
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[var(--color-primary)] text-white text-xs font-medium rounded">
              {t.after}
            </span>
          </div>
        </div>
        {/* Center divider */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/80 transform -translate-x-1/2 z-10" />

        {/* Featured badge */}
        {caseItem.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-[var(--color-primary)] text-white text-body-sm font-medium rounded-full z-20">
            {t.featured}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-body-sm font-medium bg-black/50 px-4 py-2 rounded-full">
            {t.viewDetails}
          </span>
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-col">
        {/* Treatment Type Badge */}
        {caseItem.service && (
          <span className="inline-flex px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-primary)] text-body-sm font-medium rounded-full self-start mb-3">
            {caseItem.service.title}
          </span>
        )}

        {/* Title */}
        {caseItem.title && (
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            {caseItem.title}
          </h3>
        )}

        {/* Description */}
        {caseItem.description && (
          <p className="text-body-sm text-muted line-clamp-2 mb-3">
            {caseItem.description}
          </p>
        )}

        {/* Duration and Doctor */}
        <div className="flex items-center gap-4 text-body-sm text-muted mt-auto pt-3 border-t border-[var(--color-accent)]">
          {caseItem.treatmentDuration && (
            <span>{t.duration}: {caseItem.treatmentDuration}</span>
          )}
          {caseItem.doctor && (
            <span>Dr. {caseItem.doctor.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Placeholder Gallery Component
export function PlaceholderGalleryClient({
  currentFilter,
  services,
  translations: t,
}: {
  currentFilter: string | undefined
  services: SanityService[]
  translations: GalleryPageClientProps['translations']
}) {
  // If filtering and no results
  if (currentFilter) {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="gradient-hero">
          <div className="container section">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">{t.title}</h1>
              <p className="text-body-lg text-muted max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        {services && services.length > 0 && (
          <section className="py-8 bg-white border-b border-[var(--color-accent)]">
            <div className="container">
              <p className="text-body-sm text-muted mb-4">{t.filterBy}</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  className="px-4 py-2 rounded-full text-body-sm font-medium bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)] transition-colors"
                  href="/galerie"
                >
                  {t.allTreatments}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service._id}
                    className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                      currentFilter === service.slug
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                    }`}
                    href={`/galerie?service=${service.slug}` as '/galerie'}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* No Results Message */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center py-12">
              <p className="text-body-lg text-muted">{t.noCases}</p>
              <Link className="btn btn-primary mt-6" href="/galerie">
                {t.allTreatments}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[var(--color-accent)]">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
              <h2>{t.ctaTitle}</h2>
              <p className="mt-4 text-muted text-body-lg">
                {t.ctaSubtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link className="btn btn-lg btn-primary" href="/contact">
                  {t.bookAppointment}
                </Link>
                <a
                  className="btn btn-lg btn-secondary flex items-center gap-2"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  0741 199 977
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return null
}

// Placeholder cases component
export function PlaceholderGalleryGrid({
  translations: t,
}: {
  translations: GalleryPageClientProps['translations'] & {
    placeholder: {
      case1: { duration: string; title: string; treatment: string }
      case2: { duration: string; title: string; treatment: string }
      case3: { duration: string; title: string; treatment: string }
    }
  }
}) {
  const placeholderCases = [
    {
      key: 'case1',
      title: t.placeholder.case1.title,
      treatment: t.placeholder.case1.treatment,
      duration: t.placeholder.case1.duration,
    },
    {
      key: 'case2',
      title: t.placeholder.case2.title,
      treatment: t.placeholder.case2.treatment,
      duration: t.placeholder.case2.duration,
    },
    {
      key: 'case3',
      title: t.placeholder.case3.title,
      treatment: t.placeholder.case3.treatment,
      duration: t.placeholder.case3.duration,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t.title}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderCases.map((caseItem) => (
              <div key={caseItem.key} className="card group overflow-hidden">
                {/* Placeholder Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[var(--color-accent-light)] flex items-center justify-center">
                  <Images className="w-16 h-16 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                  {/* Split line indicator */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50 transform -translate-x-1/2" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 text-white text-xs font-medium rounded">
                    {t.before}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[var(--color-primary)]/70 text-white text-xs font-medium rounded">
                    {t.after}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  {/* Treatment Type Badge */}
                  <span className="inline-flex px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-primary)] text-body-sm font-medium rounded-full self-start mb-3">
                    {caseItem.treatment}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    {caseItem.title}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center gap-4 text-body-sm text-muted mt-auto pt-3 border-t border-[var(--color-accent)]">
                    <span>{t.duration}: {caseItem.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t.ctaTitle}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t.ctaSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t.bookAppointment}
              </Link>
              <a
                className="btn btn-lg btn-secondary flex items-center gap-2"
                href="tel:+40741199977"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
