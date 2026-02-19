import Image from 'next/image'
import { Monitor, Shield, Armchair, Cpu } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

/**
 * Our Clinic section - premium clinic showcase with asymmetric photo grid
 * and feature highlights. Designed to sit between Team and Video Testimonials.
 *
 * Usage in page.tsx:
 *   <ClinicSection t={t} />
 *
 * This is a server-friendly component (no 'use client' directive).
 * ScrollReveal is a client component used within.
 */

interface ClinicSectionProps {
  t: (key: string) => string
}

const IMG = {
  main: { src: '/images/clinic/clinic-11.jpg', alt: 'clinic.images.reception' },
  treatment: { src: '/images/clinic/clinic-1.jpg', alt: 'clinic.images.waiting' },
  equipment: { src: '/images/clinic/clinic-6.jpg', alt: 'clinic.images.treatment' },
  waiting: { src: '/images/clinic/clinic-10.jpg', alt: 'clinic.images.detail' },
  detail: { src: '/images/clinic/clinic-3.jpg', alt: 'clinic.images.equipment' },
}

const clinicFeatures = [
  {
    icon: Monitor,
    titleKey: 'clinic.features.equipment.title',
    descKey: 'clinic.features.equipment.description',
  },
  {
    icon: Shield,
    titleKey: 'clinic.features.sterile.title',
    descKey: 'clinic.features.sterile.description',
  },
  {
    icon: Armchair,
    titleKey: 'clinic.features.comfort.title',
    descKey: 'clinic.features.comfort.description',
  },
  {
    icon: Cpu,
    titleKey: 'clinic.features.digital.title',
    descKey: 'clinic.features.digital.description',
  },
]

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

        {/* Asymmetric photo grid / mosaic */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]">
            {/* Image 1 - Large hero, spans 2 cols on all screens */}
            <div className="col-span-2 row-span-2 group relative rounded-2xl lg:rounded-3xl overflow-hidden
              bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <Image
                src={IMG.main.src}
                alt={t(IMG.main.alt)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6
                translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500">
                <span className="text-white font-medium text-sm md:text-base">
                  {t('clinic.captions.reception')}
                </span>
              </div>
            </div>

            {/* Image 2 - Tall, spans 2 rows on md+ / single cell on mobile */}
            <div className="col-span-1 row-span-2 group relative rounded-2xl lg:rounded-3xl overflow-hidden
              bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] hidden md:block">
              <Image
                src={IMG.treatment.src}
                alt={t(IMG.treatment.alt)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-left transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5
                translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500">
                <span className="text-white font-medium text-sm">
                  {t('clinic.captions.treatment')}
                </span>
              </div>
            </div>

            {/* Image 3 - Single cell, top right on md+ */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl lg:rounded-3xl overflow-hidden
              bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <Image
                src={IMG.equipment.src}
                alt={t(IMG.equipment.alt)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4
                translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500">
                <span className="text-white font-medium text-sm">
                  {t('clinic.captions.equipment')}
                </span>
              </div>
            </div>

            {/* Image 2 mobile fallback (visible only on small screens) */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden
              bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] md:hidden">
              <Image
                src={IMG.treatment.src}
                alt={t(IMG.treatment.alt)}
                fill
                sizes="50vw"
                className="object-cover object-left transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Image 4 - bottom right cell on md+ */}
            <div className="col-span-1 row-span-1 group relative rounded-2xl lg:rounded-3xl overflow-hidden
              bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0]">
              <Image
                src={IMG.waiting.src}
                alt={t(IMG.waiting.alt)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4
                translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500">
                <span className="text-white font-medium text-sm">
                  {t('clinic.captions.waiting')}
                </span>
              </div>
            </div>

            {/* Image 5 - extra cell visible on mobile, hidden on md+ for clean 4-col look */}
            <div className="col-span-2 row-span-1 group relative rounded-2xl overflow-hidden
              bg-gradient-to-br from-[#e8e0d5] to-[#d4c4b0] md:hidden">
              <Image
                src={IMG.detail.src}
                alt={t(IMG.detail.alt)}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </ScrollReveal>

        {/* Feature highlights - 4 items in a row */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {clinicFeatures.map((feature, index) => (
            <ScrollReveal
              key={feature.titleKey}
              animation="fade-up"
              delay={index * 150}
            >
              <div className="group text-center lg:text-left">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4
                  bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                  group-hover:shadow-[0_8px_30px_rgba(139,115,85,0.15)]
                  group-hover:-translate-y-1
                  transition-all duration-300">
                  <feature.icon
                    className="w-6 h-6 md:w-7 md:h-7 text-[#8b7355]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold text-[#2a2118] mb-2">
                  {t(feature.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#7a6b5a] leading-relaxed">
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
