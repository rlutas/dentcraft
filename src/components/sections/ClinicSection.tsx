import Image from 'next/image'
import { Monitor, Shield, Armchair, Cpu } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { ClinicGalleryDesktop } from './ClinicGalleryDesktop'

interface ClinicSectionProps {
  t: (key: string) => string
}

// 9 photos for desktop swap gallery (primary + 8 thumbs in 4×3 grid)
function buildClinicImages(t: ClinicSectionProps['t']) {
  return [
    { src: '/images/clinic/clinic-11.webp', caption: t('clinic.captions.reception') },
    { src: '/images/clinic/clinic-1.webp', caption: t('clinic.captions.treatment') },
    { src: '/images/clinic/clinic-6.webp', caption: t('clinic.captions.equipment') },
    { src: '/images/clinic/clinic-10.webp', caption: t('clinic.captions.waiting') },
    { src: '/images/clinic/clinic-3.webp', caption: t('clinic.captions.waitingArea') },
    { src: '/images/clinic/clinic-5.webp', caption: t('clinic.captions.treatmentRoom') },
    { src: '/images/clinic/clinic-7.webp', caption: t('clinic.captions.detail') },
    { src: '/images/clinic/clinic-2.webp', caption: t('clinic.captions.detail') },
    { src: '/images/clinic/clinic-8.webp', caption: t('clinic.captions.detail') },
  ]
}

const MOBILE_IMG = {
  hallway: { src: '/images/clinic/clinic-11.webp', alt: 'clinic.images.reception' },
  reception: { src: '/images/clinic/clinic-1.webp', alt: 'clinic.images.waiting' },
  treatmentMarble: { src: '/images/clinic/clinic-6.webp', alt: 'clinic.images.treatment' },
  sterilization: { src: '/images/clinic/clinic-10.webp', alt: 'clinic.images.detail' },
  treatmentRoom: { src: '/images/clinic/clinic-5.webp', alt: 'clinic.images.treatmentRoom' },
  toysDetail: { src: '/images/clinic/toys-with-toothbrush.webp', alt: 'clinic.images.toys' },
}

const clinicFeatures = [
  {
    icon: Monitor,
    titleKey: 'clinic.features.equipment.title',
    descKey: 'clinic.features.equipment.description',
    iconHover: 'group-hover:scale-110 group-hover:-rotate-6',
  },
  {
    icon: Shield,
    titleKey: 'clinic.features.sterile.title',
    descKey: 'clinic.features.sterile.description',
    iconHover: 'group-hover:scale-110 group-hover:rotate-[360deg]',
  },
  {
    icon: Armchair,
    titleKey: 'clinic.features.comfort.title',
    descKey: 'clinic.features.comfort.description',
    iconHover: 'group-hover:scale-110 group-hover:translate-y-[-4px] group-hover:rotate-3',
  },
  {
    icon: Cpu,
    titleKey: 'clinic.features.digital.title',
    descKey: 'clinic.features.digital.description',
    iconHover: 'group-hover:scale-125',
  },
]

function ClinicImage({ src, alt, caption, sizes, className = '' }: {
  src: string; alt: string; caption: string; sizes: string; className?: string
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
        md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4
        md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
        transition-all duration-500">
        <span className="text-white font-medium text-xs md:text-sm">
          {caption}
        </span>
      </div>
    </>
  )
}

export function ClinicSection({ t }: ClinicSectionProps) {
  const desktopImages = buildClinicImages(t)

  return (
    <section className="py-24 md:py-32 bg-[#f5f0e8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4c4b0]/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" aria-hidden="true" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <AnimatedServiceHeading bold="Clinica" italic="DentCraft" />
          <ScrollReveal animation="fade-up" delay={500}>
            <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
              {t('clinic.subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* DESKTOP: photo-swap gallery — hover thumbnail to promote it as primary */}
        <ScrollReveal animation="fade-up" delay={200}>
          <ClinicGalleryDesktop images={desktopImages} />
        </ScrollReveal>

        {/* MOBILE: classic grid */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="grid grid-cols-2 gap-3 auto-rows-[160px] md:hidden">
            <div className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={MOBILE_IMG.hallway.src} alt={t(MOBILE_IMG.hallway.alt)} caption={t('clinic.captions.waitingArea')} sizes="100vw" />
            </div>
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={MOBILE_IMG.reception.src} alt={t(MOBILE_IMG.reception.alt)} caption={t('clinic.captions.treatment')} sizes="50vw" className="object-[30%_center]" />
            </div>
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={MOBILE_IMG.treatmentMarble.src} alt={t(MOBILE_IMG.treatmentMarble.alt)} caption={t('clinic.captions.equipment')} sizes="50vw" />
            </div>
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={MOBILE_IMG.sterilization.src} alt={t(MOBILE_IMG.sterilization.alt)} caption={t('clinic.captions.waiting')} sizes="50vw" />
            </div>
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={MOBILE_IMG.treatmentRoom.src} alt={t(MOBILE_IMG.treatmentRoom.alt)} caption={t('clinic.captions.treatmentRoom')} sizes="50vw" />
            </div>
            <div className="col-span-2 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={MOBILE_IMG.toysDetail.src} alt={t(MOBILE_IMG.toysDetail.alt)} caption={t('clinic.captions.toys')} sizes="100vw" />
            </div>
          </div>
        </ScrollReveal>

        {/* Feature highlights — unique hover animation per icon */}
        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-6 lg:gap-8">
          {clinicFeatures.map((feature, index) => (
            <ScrollReveal
              key={feature.titleKey}
              animation="fade-up"
              delay={index * 150}
            >
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl mb-3 md:mb-4
                  bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                  group-hover:shadow-[0_8px_30px_rgba(139,115,85,0.18)]
                  group-hover:-translate-y-1
                  transition-all duration-500 ease-out">
                  <feature.icon
                    className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#8b7355] transition-transform duration-500 ease-out ${feature.iconHover}`}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#2a2118] mb-1 md:mb-2 group-hover:text-[#8b7355] transition-colors duration-300">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-xs md:text-sm text-[#7a6b5a] leading-relaxed px-1">
                  {t(feature.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
