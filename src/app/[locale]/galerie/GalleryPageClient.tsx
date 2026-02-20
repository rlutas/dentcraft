'use client'

import { ArrowRight, Camera, Eye, Images, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { GalleryModal, type GalleryCase } from '@/components/features/BeforeAfterGallery'

type SanityService = {
  _id: string
  title: string
  slug: string
}

export type GalleryPhoto = {
  src: string
  alt: string
  category: 'clinic' | 'team' | 'equipment'
}

type GalleryPageClientProps = {
  cases: GalleryCase[]
  currentFilter: string | undefined
  galleryPhotos?: GalleryPhoto[]
  services: SanityService[]
  translations: {
    after: string
    allTreatments: string
    before: string
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
  galleryPhotos = [],
  services,
  translations: t,
}: GalleryPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null)

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
      {/* Hero Section - Dark Editorial (same as other pages) */}
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
              Acasa
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Galerie</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Transformari reale
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

      {/* Filter Section - Elegant warm pills */}
      {services && services.length > 0 && (
        <section className="py-6 bg-white border-b border-[#f0ebe3] sticky top-[72px] z-30 backdrop-blur-md bg-white/95">
          <div className="container">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#8b7a68] font-medium shrink-0">{t.filterBy}:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    !currentFilter
                      ? 'bg-[#2a2118] text-white shadow-[0_4px_16px_rgba(42,33,24,0.25)]'
                      : 'bg-[#faf6f1] text-[#5a4a3a] border border-[#e8e0d5] hover:bg-[#f0ebe3] hover:border-[#d4c4b0]'
                  }`}
                  href="/galerie"
                >
                  {t.allTreatments}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service._id}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentFilter === service.slug
                        ? 'bg-[#2a2118] text-white shadow-[0_4px_16px_rgba(42,33,24,0.25)]'
                        : 'bg-[#faf6f1] text-[#5a4a3a] border border-[#e8e0d5] hover:bg-[#f0ebe3] hover:border-[#d4c4b0]'
                    }`}
                    href={`/galerie?service=${service.slug}` as '/galerie'}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Before/After Gallery Grid - Premium Cards */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4c4b0]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 mb-5 text-sm font-semibold tracking-wider uppercase
              text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
              Inainte & Dupa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-4">
              Transformari reale ale pacientilor
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
              Fiecare caz demonstreaza rezultatele tratamentelor noastre profesionale
            </p>
          </div>

          {cases.length === 0 && currentFilter ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#faf6f1] flex items-center justify-center">
                <Images className="w-10 h-10 text-[#d4c4b0]" strokeWidth={1.5} />
              </div>
              <p className="text-xl text-[#6b6b6b] mb-6">{t.noCases}</p>
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a2118] text-white rounded-full font-medium
                  hover:bg-[#3a3128] transition-colors"
                href="/galerie"
              >
                {t.allTreatments}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

      {/* Clinic & Team Photo Gallery */}
      {galleryPhotos.length > 0 && (
        <section className="py-16 md:py-24 bg-[#f5f0e8] relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4c4b0]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container relative z-10">
            {/* Section header */}
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-2 mb-5 text-sm font-semibold tracking-wider uppercase
                text-[#8b7355] bg-white rounded-full border border-[#e8e0d5]">
                <Camera className="w-4 h-4 inline mr-2 -mt-0.5" />
                Clinica Noastra
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-4">
                Descopera Clinica Dentcraft
              </h2>
              <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
                Echipamente moderne, spatii confortabile si o echipa dedicata zambetului tau
              </p>
            </div>

            {/* Photo Grid - Masonry-like with varied sizes */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {galleryPhotos.map((photo, index) => {
                // Make every 5th photo span 2 columns for visual interest
                const isWide = index % 5 === 0
                return (
                  <button
                    key={photo.src}
                    className={`gallery-photo-card group relative overflow-hidden rounded-xl md:rounded-2xl
                      cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2
                      animate-[fadeInUp_0.5s_ease-out_both]
                      ${isWide ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                    style={{ animationDelay: `${index * 0.06}s` }}
                    type="button"
                    onClick={() => setLightboxPhoto(photo)}
                  >
                    <Image
                      fill
                      alt={photo.alt}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes={isWide
                        ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
                        : '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
                      }
                      src={photo.src}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/50 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Category label on hover */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between
                      translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-400">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-[#2a2118]">
                        {photo.category === 'clinic' ? 'Clinica' : photo.category === 'team' ? 'Echipa' : 'Echipamente'}
                      </span>
                      <span className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-[#2a2118]" />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Photo Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setLightboxPhoto(null)}
            type="button"
            aria-label="Inchide"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxPhoto.src}
              alt={lightboxPhoto.alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
            <div className="absolute bottom-4 left-4">
              <span className="px-4 py-2 bg-black/50 backdrop-blur-md text-white text-sm font-medium rounded-lg">
                {lightboxPhoto.alt}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal (Before/After) */}
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

// Premium Gallery Card Component
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
    <div
      className="gallery-card group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden
        border border-[#f0ebe3] hover:border-[#d4c4b0]
        shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_60px_-15px_rgba(139,115,85,0.18)]
        transition-all duration-500 ease-out hover:-translate-y-1.5
        animate-[fadeInUp_0.5s_ease-out_both]"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image Comparison Preview - Clickable */}
      <button
        aria-label={t.viewDetails}
        className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer focus:outline-none
          focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2"
        type="button"
        onClick={() => onOpenModal(index)}
      >
        {/* Split view - Before on left, After on right */}
        <div className="absolute inset-0 flex">
          {/* Before side */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {caseItem.beforeImage?.generatedUrl && (
              <Image
                fill
                alt={caseItem.beforeImage.alt || t.before}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
                src={caseItem.beforeImage.generatedUrl}
              />
            )}
            {/* Before label - glassmorphism */}
            <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold rounded-lg
              border border-white/10 uppercase tracking-wider">
              {t.before}
            </span>
          </div>

          {/* After side */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {caseItem.afterImage?.generatedUrl && (
              <Image
                fill
                alt={caseItem.afterImage.alt || t.after}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 17vw"
                src={caseItem.afterImage.generatedUrl}
              />
            )}
            {/* After label - warm accent */}
            <span className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#8b7355]/90 backdrop-blur-md text-white text-xs font-semibold rounded-lg
              border border-[#d4c4b0]/30 uppercase tracking-wider">
              {t.after}
            </span>
          </div>
        </div>

        {/* Center divider - premium thin line with glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/90 z-10
          shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

        {/* Featured badge */}
        {caseItem.featured && (
          <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5
            px-3 py-1.5 bg-[#d4c4b0] text-[#2a2118] text-xs font-bold rounded-full uppercase tracking-wider
            shadow-[0_4px_12px_rgba(212,196,176,0.5)]">
            <Sparkles className="w-3 h-3" />
            {t.featured}
          </span>
        )}

        {/* Hover overlay with view prompt */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-[#2a2118]/0 to-transparent
          opacity-0 group-hover:opacity-100 transition-all duration-500 z-10
          flex items-center justify-center">
          <span className="translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100
            transition-all duration-400 ease-out
            inline-flex items-center gap-2 px-5 py-2.5
            bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-[#2a2118]
            shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <Eye className="w-4 h-4" />
            {t.viewDetails}
          </span>
        </div>
      </button>

      {/* Content - Premium card bottom */}
      <div className="p-5 md:p-6">
        {/* Treatment Type Badge */}
        {caseItem.service && (
          <span className="inline-flex px-3 py-1 bg-[#faf6f1] text-[#8b7355] text-xs font-semibold rounded-full
            border border-[#e8e0d5] mb-3">
            {caseItem.service.title}
          </span>
        )}

        {/* Title */}
        {caseItem.title && (
          <h3 className="text-lg md:text-xl font-bold text-[#2a2118] mb-2
            group-hover:text-[#8b7355] transition-colors duration-300">
            {caseItem.title}
          </h3>
        )}

        {/* Description */}
        {caseItem.description && (
          <p className="text-sm text-[#6b6b6b] leading-relaxed line-clamp-2 mb-4">
            {caseItem.description}
          </p>
        )}

        {/* Duration and Doctor - premium separator */}
        <div className="flex items-center gap-4 text-xs text-[#8b7a68] mt-auto pt-4
          border-t border-[#f0ebe3]">
          {caseItem.treatmentDuration && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#d4c4b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{caseItem.treatmentDuration}</span>
            </div>
          )}
          {caseItem.doctor && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#d4c4b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Dr. {caseItem.doctor.name}</span>
            </div>
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
  if (currentFilter) {
    return (
      <div className="flex flex-col">
        {/* Hero Section - Dark Editorial */}
        <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">{t.title}</h1>
              <p className="text-xl text-white/50 max-w-2xl leading-relaxed">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        {services && services.length > 0 && (
          <section className="py-6 bg-white border-b border-[#f0ebe3]">
            <div className="container">
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#8b7a68] font-medium shrink-0">{t.filterBy}:</span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#faf6f1] text-[#5a4a3a] border border-[#e8e0d5] hover:bg-[#f0ebe3] transition-colors"
                    href="/galerie"
                  >
                    {t.allTreatments}
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service._id}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        currentFilter === service.slug
                          ? 'bg-[#2a2118] text-white shadow-[0_4px_16px_rgba(42,33,24,0.25)]'
                          : 'bg-[#faf6f1] text-[#5a4a3a] border border-[#e8e0d5] hover:bg-[#f0ebe3]'
                      }`}
                      href={`/galerie?service=${service.slug}` as '/galerie'}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* No Results Message */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#faf6f1] flex items-center justify-center">
                <Images className="w-10 h-10 text-[#d4c4b0]" strokeWidth={1.5} />
              </div>
              <p className="text-xl text-[#6b6b6b] mb-6">{t.noCases}</p>
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a2118] text-white rounded-full font-medium hover:bg-[#3a3128] transition-colors"
                href="/galerie"
              >
                {t.allTreatments}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">Acasa</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Galerie</span>
          </div>
          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Transformari reale
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 mb-5 text-sm font-semibold tracking-wider uppercase
              text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
              Inainte & Dupa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-4">
              Transformari reale ale pacientilor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {placeholderCases.map((caseItem, index) => (
              <div
                key={caseItem.key}
                className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden
                  border border-[#f0ebe3] hover:border-[#d4c4b0]
                  shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_20px_60px_-15px_rgba(139,115,85,0.18)]
                  transition-all duration-500 ease-out hover:-translate-y-1.5
                  animate-[fadeInUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Placeholder Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden
                  bg-gradient-to-br from-[#ede6db] via-[#e5ddd2] to-[#d4c4b0]/30
                  flex items-center justify-center">
                  <Images className="w-14 h-14 text-[#a08b72] opacity-30" strokeWidth={1.2} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/60 z-10" />
                  <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-semibold rounded-lg uppercase tracking-wider">
                    {t.before}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#8b7355]/80 backdrop-blur-md text-white text-xs font-semibold rounded-lg uppercase tracking-wider">
                    {t.after}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <span className="inline-flex px-3 py-1 bg-[#faf6f1] text-[#8b7355] text-xs font-semibold rounded-full
                    border border-[#e8e0d5] mb-3">
                    {caseItem.treatment}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#2a2118] mb-2
                    group-hover:text-[#8b7355] transition-colors duration-300">
                    {caseItem.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#8b7a68] mt-auto pt-4 border-t border-[#f0ebe3]">
                    <svg className="w-3.5 h-3.5 text-[#d4c4b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{caseItem.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
