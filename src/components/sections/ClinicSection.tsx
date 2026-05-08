import { Monitor, Shield, Armchair, Cpu } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { ClinicGalleryDesktop } from './ClinicGalleryDesktop'

interface ClinicSectionProps {
  t: (key: string) => string
}

// 7 photos for desktop swap gallery: 1 primary (3×2) + 2 thumbs right + 4 thumbs bottom
function buildClinicImages(t: ClinicSectionProps['t']) {
  return [
    { src: '/images/clinic/clinic-11.webp', caption: t('clinic.captions.reception') },
    { src: '/images/clinic/clinic-1.webp', caption: t('clinic.captions.treatment') },
    { src: '/images/clinic/clinic-6.webp', caption: t('clinic.captions.equipment') },
    { src: '/images/clinic/clinic-10.webp', caption: t('clinic.captions.waiting') },
    { src: '/images/clinic/clinic-3.webp', caption: t('clinic.captions.waitingArea') },
    { src: '/images/clinic/clinic-5.webp', caption: t('clinic.captions.treatmentRoom') },
    { src: '/images/clinic/clinic-7.webp', caption: t('clinic.captions.detail') },
  ]
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

        {/* Photo-swap gallery — same on mobile + desktop, responsive grid */}
        <ScrollReveal animation="fade-up" delay={200}>
          <ClinicGalleryDesktop images={desktopImages} />
        </ScrollReveal>

        {/* Feature highlights — premium card style with unique icon hover animation */}
        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {clinicFeatures.map((feature, index) => (
            <ScrollReveal
              key={feature.titleKey}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="group flex items-start gap-4 md:flex-col md:items-center md:text-center bg-white border border-[#e8e0d5] rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-7 h-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(139,115,85,0.18)] hover:border-[#d4c4b0] hover:-translate-y-1 transition-all duration-500 ease-out">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-2xl shrink-0
                  bg-[#faf6f1] border border-[#e8e0d5]
                  group-hover:bg-[#d4c4b0]/30 group-hover:border-[#d4c4b0]
                  transition-colors duration-500 ease-out">
                  <feature.icon
                    className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#8b7355] transition-transform duration-500 ease-out ${feature.iconHover}`}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex-1 min-w-0 md:flex-none md:mt-4">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[#2a2118] mb-1.5 md:mb-2 group-hover:text-[#8b7355] transition-colors duration-300 leading-tight">
                    {t(feature.titleKey)}
                  </h3>

                  <p className="text-sm text-[#7a6b5a] leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
