import Image from 'next/image'
import { Monitor, Shield, Armchair, Cpu } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface ClinicSectionProps {
  t: (key: string) => string
}

const IMG = {
  hallway: { src: '/images/clinic/clinic-11.jpg', alt: 'clinic.images.reception' },
  reception: { src: '/images/clinic/clinic-1.jpg', alt: 'clinic.images.waiting' },
  treatmentMarble: { src: '/images/clinic/clinic-6.jpg', alt: 'clinic.images.treatment' },
  sterilization: { src: '/images/clinic/clinic-10.jpg', alt: 'clinic.images.detail' },
  waitingRoom: { src: '/images/clinic/clinic-3.jpg', alt: 'clinic.images.equipment' },
  treatmentRoom: { src: '/images/clinic/clinic-5.jpg', alt: 'clinic.images.treatmentRoom' },
  toysDetail: { src: '/images/clinic/toys-with-toothbrush.jpg', alt: 'clinic.images.toys' },
}

const clinicFeatures = [
  { icon: Monitor, titleKey: 'clinic.features.equipment.title', descKey: 'clinic.features.equipment.description' },
  { icon: Shield, titleKey: 'clinic.features.sterile.title', descKey: 'clinic.features.sterile.description' },
  { icon: Armchair, titleKey: 'clinic.features.comfort.title', descKey: 'clinic.features.comfort.description' },
  { icon: Cpu, titleKey: 'clinic.features.digital.title', descKey: 'clinic.features.digital.description' },
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
      {/* Gradient overlay - always visible on mobile, hover on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
        md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
      {/* Caption - always visible on mobile, slide-up on desktop hover */}
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
  return (
    <section className="py-24 md:py-32 bg-[#f5f0e8] relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4c4b0]/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <ScrollReveal animation="fade-up">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase
              text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
              {t('clinic.badge')}
            </span>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2a2118] mb-5">
              {t('clinic.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
              {t('clinic.subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* ====== DESKTOP GRID (md+) ====== */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="hidden md:grid md:grid-cols-4 gap-4 auto-rows-[220px] lg:auto-rows-[260px]">
            {/* Hallway - large hero 2x2 */}
            <div className="col-span-2 row-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.hallway.src} alt={t(IMG.hallway.alt)} caption={t('clinic.captions.reception')} sizes="50vw" />
            </div>

            {/* Reception - tall 1x2 */}
            <div className="col-span-1 row-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.reception.src} alt={t(IMG.reception.alt)} caption={t('clinic.captions.treatment')} sizes="25vw" className="object-[35%_center]" />
            </div>

            {/* Treatment room - small 1x1 */}
            <div className="col-span-1 row-span-1 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.treatmentMarble.src} alt={t(IMG.treatmentMarble.alt)} caption={t('clinic.captions.equipment')} sizes="25vw" />
            </div>

            {/* Sterilization - small 1x1 */}
            <div className="col-span-1 row-span-1 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.sterilization.src} alt={t(IMG.sterilization.alt)} caption={t('clinic.captions.waiting')} sizes="25vw" />
            </div>
          </div>
        </ScrollReveal>

        {/* ====== MOBILE GRID (<md) ====== */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="grid grid-cols-2 gap-3 auto-rows-[160px] md:hidden">
            {/* Hallway - large hero 2x2 */}
            <div className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.hallway.src} alt={t(IMG.hallway.alt)} caption={t('clinic.captions.waitingArea')} sizes="100vw" />
            </div>

            {/* Reception - small */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.reception.src} alt={t(IMG.reception.alt)} caption={t('clinic.captions.treatment')} sizes="50vw" className="object-[30%_center]" />
            </div>

            {/* Treatment room marble - small */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.treatmentMarble.src} alt={t(IMG.treatmentMarble.alt)} caption={t('clinic.captions.equipment')} sizes="50vw" />
            </div>

            {/* Sterilization - small */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.sterilization.src} alt={t(IMG.sterilization.alt)} caption={t('clinic.captions.waiting')} sizes="50vw" />
            </div>

            {/* Treatment room - small */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.treatmentRoom.src} alt={t(IMG.treatmentRoom.alt)} caption={t('clinic.captions.treatmentRoom')} sizes="50vw" />
            </div>

            {/* Toys with toothbrush - wide bottom */}
            <div className="col-span-2 row-span-1 group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <ClinicImage src={IMG.toysDetail.src} alt={t(IMG.toysDetail.alt)} caption={t('clinic.captions.toys')} sizes="100vw" />
            </div>
          </div>
        </ScrollReveal>

        {/* Feature highlights */}
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
                  group-hover:shadow-[0_8px_30px_rgba(139,115,85,0.15)]
                  group-hover:-translate-y-1
                  transition-all duration-300">
                  <feature.icon
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#8b7355]"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#2a2118] mb-1 md:mb-2">
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
