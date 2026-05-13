import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import {
  ArrowRight,
  User,
} from 'lucide-react'
import { ClinicSection } from '@/components/sections/ClinicSection'
import { FramedHero } from '@/components/sections/FramedHero'
import { CountUp } from '@/components/ui/CountUp'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { FloatingIcons } from '@/components/ui/FloatingIcons'
import { DoctorVideosGrid } from '@/components/sections/DoctorVideosGrid'
import { BeforeAfterGalleryPreview } from '@/components/features/BeforeAfterGalleryPreview'
import { GoogleReviewsSlider } from '@/components/features/GoogleReviewsSlider'
import googleReviews from '@/data/google-reviews.json'
import type { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { getMainFallbackServices } from '@/lib/fallback-services'
import { hasServicePhoto, getServicePhotoPath } from '@/lib/service-photos'
import { fallbackTeamMembers } from '@/lib/fallback-team'
import { urlFor } from '@/lib/sanity/image'
import { getAllServices, getFeaturedTestimonials, getAllTeamMembers, getFeaturedBeforeAfter, getSettings } from '@/lib/sanity/queries'

type Props = {
  params: Promise<{ locale: string }>
}

// Types for Sanity data
interface SanityService {
  _id: string
  title: string
  slug: string
  icon?: string
  shortDescription?: string
}

interface SanityTestimonial {
  _id: string
  patientName: string
  rating: number
  text: string
  service?: {
    title: string
    slug: string
  }
  patientPhoto?: {
    asset?: {
      url?: string
    }
    alt?: string
  }
  videoUrl?: string
  videoFile?: {
    asset?: {
      url?: string
    }
  }
  doctor?: {
    name: string
    slug: string
  }
  featured?: boolean
  date?: string
}

interface SanityTeamMember {
  _id: string
  name: string
  slug: string
  role: string
  photo?: {
    asset?: {
      url?: string
    }
  }
}

interface SanityBeforeAfter {
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
    asset?: {
      url?: string
    }
    alt?: string
  }
  afterImage?: {
    asset?: {
      url?: string
    }
    alt?: string
  }
  description?: string
  treatmentDuration?: string
  featured?: boolean
}

// Type with pre-computed image URLs for client component
interface BeforeAfterCaseWithUrls extends SanityBeforeAfter {
  beforeImageUrl: string
  afterImageUrl: string
}

// Type for site settings (hero images)
interface SanitySettings {
  heroImages?: {
    teamPhoto?: {
      asset?: {
        url?: string
      }
      alt?: string
    }
    clinicPhoto?: {
      asset?: {
        url?: string
      }
      alt?: string
    }
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch data from Sanity (with fallbacks)
  let services: SanityService[] = []
  let testimonials: SanityTestimonial[] = []
  let settings: SanitySettings | null = null
  let teamMembers: SanityTeamMember[] = []
  let beforeAfterCases: SanityBeforeAfter[] = []

  try {
    [services, testimonials, teamMembers, beforeAfterCases, settings] = await Promise.all([
      getAllServices(locale as Locale),
      getFeaturedTestimonials(locale as Locale),
      getAllTeamMembers(locale as Locale),
      getFeaturedBeforeAfter(locale as Locale),
      getSettings(locale as Locale),
    ])
  } catch (error) {
    console.error('Failed to fetch Sanity data:', error)
  }

  // Pre-compute image URLs for before/after cases (must be done on server)
  const beforeAfterCasesWithUrls = beforeAfterCases.map((caseItem) => ({
    ...caseItem,
    beforeImageUrl: caseItem.beforeImage?.asset
      ? urlFor(caseItem.beforeImage).width(800).height(600).quality(85).url()
      : '',
    afterImageUrl: caseItem.afterImage?.asset
      ? urlFor(caseItem.afterImage).width(800).height(600).quality(85).url()
      : '',
  }))

  // Get hero image URLs from Sanity settings (pre-compute on server)
  const heroTeamPhotoUrl = settings?.heroImages?.teamPhoto?.asset
    ? urlFor(settings.heroImages.teamPhoto).width(800).height(1000).quality(90).url()
    : null

  const heroClinicPhotoUrl = settings?.heroImages?.clinicPhoto?.asset
    ? urlFor(settings.heroImages.clinicPhoto).width(1920).height(1080).quality(90).url()
    : null

  return <HomePageContent services={services} testimonials={testimonials} teamMembers={teamMembers} beforeAfterCases={beforeAfterCasesWithUrls} locale={locale as Locale} _heroTeamPhotoUrl={heroTeamPhotoUrl} _heroClinicPhotoUrl={heroClinicPhotoUrl} />
}

interface HomePageContentProps {
  services: SanityService[]
  testimonials: SanityTestimonial[]
  teamMembers: SanityTeamMember[]
  beforeAfterCases: BeforeAfterCaseWithUrls[]
  locale: Locale
  _heroTeamPhotoUrl: string | null
  _heroClinicPhotoUrl: string | null
}

function HomePageContent({ services: _services, testimonials, teamMembers, beforeAfterCases, locale, _heroTeamPhotoUrl, _heroClinicPhotoUrl }: HomePageContentProps) {
  const t = useTranslations()

  // Check if we have Sanity data
  const hasSanityTestimonials = testimonials && testimonials.length > 0
  const hasSanityTeamMembers = teamMembers && teamMembers.length > 0
  const hasSanityBeforeAfter = beforeAfterCases && beforeAfterCases.length > 0

  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <FramedHero />


      {/* Services Section - Premium photo cards (top 6) */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Floating dental icons — general dental theme */}
        <FloatingIcons
          icons={[
            { src: '/icons/010-smile.svg', className: 'top-8 left-3 w-12 h-12 md:top-32 md:left-10 md:w-24 md:h-24 lg:left-24 lg:w-32 lg:h-32', variant: 'driftA', duration: 26, opacity: 0.11 },
            { src: '/icons/014-toothbrush.svg', className: 'top-8 right-3 w-12 h-12 md:top-40 md:right-12 md:w-20 md:h-20 lg:right-28 lg:w-24 lg:h-24', variant: 'driftB', duration: 32, delay: 4, opacity: 0.11 },
            { src: '/icons/097-calendar.svg', className: 'top-[15rem] left-4 w-10 h-10 md:hidden xl:block xl:top-20 xl:left-[18%] xl:w-16 xl:h-16', variant: 'driftC', duration: 22, delay: 2, opacity: 0.1 },
            { src: '/icons/008-white-teeth.svg', className: 'top-[15rem] right-4 w-12 h-12 md:hidden xl:block xl:top-24 xl:right-[20%] xl:w-20 xl:h-20', variant: 'driftA', duration: 28, delay: 6, opacity: 0.1 },
          ]}
        />

        <div className="container relative z-10">
          {/* Section header - mirrors hero typography (bold + animated serif italic) */}
          <div className="text-center mb-16 md:mb-20">
            <AnimatedServiceHeading bold="Servicii" italic="stomatologice" />
            <ScrollReveal animation="fade-up" delay={500}>
              <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
                {t('services.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          {/* Top 6 services - photo cards in 3x2 grid */}
          {(() => {
            // Top 6 services in priority order (Implantologie first - has photo + hero SEO)
            const topSlugs = [
              'implantologie',
              'estetica-dentara',
              'ortodontie',
              'protetica',
              'stomatologie-generala',
              'pedodontie',
            ]
            const fallback = getMainFallbackServices()
            const top6 = topSlugs
              .map((slug) => fallback.find((s) => s.slug === slug))
              .filter((s): s is NonNullable<typeof s> => Boolean(s))

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {top6.map((service, index) => {
                  const hasPhoto = hasServicePhoto(service.slug)
                  const photoPath = getServicePhotoPath(service.slug) ?? ''

                  return (
                    <ScrollReveal
                      key={service.slug}
                      animation="fade-up"
                      delay={index * 100}
                    >
                      <Link
                        href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                        className="group relative block h-full overflow-hidden rounded-3xl
                          bg-white border border-[#e8e0d5]
                          shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]
                          hover:border-[#d4c4b0]
                          hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)]
                          hover:-translate-y-1.5
                          transition-all duration-500 ease-out flex flex-col"
                      >
                        {/* Photo or placeholder */}
                        <div className="relative aspect-[16/10] bg-[#faf6f1] overflow-hidden">
                          {hasPhoto ? (
                            <Image
                              src={photoPath}
                              alt={t(`services.fallback.${service.titleKey}`)}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60">
                              {service.iconPath ? (
                                <Image
                                  src={service.iconPath}
                                  alt=""
                                  width={80}
                                  height={80}
                                  className="w-20 h-20 opacity-30 group-hover:opacity-50 transition-opacity"
                                />
                              ) : (
                                <service.Icon className="w-20 h-20 text-[#8b7355]/30 group-hover:text-[#8b7355]/50 transition-colors" strokeWidth={1.25} />
                              )}
                              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider text-[#8b7355]/50 font-semibold">
                                Foto in curs
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-7 flex flex-col flex-1">
                          <h3 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 leading-tight">
                            {t(`services.fallback.${service.titleKey}`)}
                          </h3>
                          <p className="text-[#5a5048] text-sm leading-relaxed mb-5 flex-1">
                            {t(`services.fallback.${service.descriptionKey}`)}
                          </p>
                          <span className="inline-flex items-center text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em] group-hover:text-[#2a2118] transition-colors duration-300">
                            <span>{t('common.learnMore')}</span>
                            <span
                              aria-hidden="true"
                              className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            >
                              <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                            </span>
                          </span>
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>
            )
          })()}

          {/* View all button - matches hero CTA pattern (arrow reveals on hover) */}
          <ScrollReveal animation="fade-up" delay={400} className="mt-16 text-center">
            <Link
              href="/servicii"
              className="group inline-flex items-center px-8 py-4 bg-[#2a2118] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300"
            >
              <span>{t('common.seeAll')}</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.25} />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Dentcraft - Editorial split-screen with photo + 4 reasons */}
      <section className="py-24 md:py-32 bg-[#faf6f1] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

        <div className="container relative z-10">
          {/* Centered editorial header */}
          <div className="text-center mb-14 md:mb-20">
            <AnimatedServiceHeading bold="De ce clinica" italic="DENTCRAFT" />
            <ScrollReveal animation="fade-up" delay={500}>
              <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
                Stomatologie modernă în Satu Mare, cu accent pe rezultate vizibile, comunicare clară și pacienți care revin cu zâmbetul.
              </p>
            </ScrollReveal>
          </div>

          {/* Split screen — photo + reasons */}
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            {/* LEFT: clinic photo with overlay stat card */}
            <ScrollReveal animation="fade-up">
              <div className="relative">
                {/* Subtle background decorative elements */}
                <div className="absolute -top-8 -left-8 w-24 h-24 border border-[#d4c4b0]/30 rounded-full hidden lg:block" aria-hidden="true" />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#d4c4b0]/15 rounded-full blur-2xl hidden lg:block" aria-hidden="true" />

                <div className="relative aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-[#f5f0e8] shadow-[0_30px_80px_-20px_rgba(139,115,85,0.25)] border border-[#e8e0d5]">
                  <Image
                    src="/images/clinic/clinic-1.webp"
                    alt="Cabinet Dentcraft"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-[30%_center] md:object-center"
                  />
                </div>

                {/* Floating overlay card with stats */}
                <div className="absolute -bottom-6 right-4 md:bottom-6 md:-right-6 lg:-right-8 z-10">
                  <div className="bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(42,33,24,0.25)] border border-[#e8e0d5] px-5 py-4 md:px-7 md:py-5">
                    <div className="flex items-center gap-5 md:gap-7">
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-[#2a2118] leading-none mb-1">
                          <CountUp end={10} suffix="+" duration={2000} />
                        </div>
                        <div className="text-[10px] md:text-xs text-[#8b7355] uppercase tracking-[0.16em] font-semibold">
                          ani experiență
                        </div>
                      </div>
                      <div className="h-10 w-px bg-[#e8e0d5]" />
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-[#2a2118] leading-none mb-1">
                          <CountUp end={1500} suffix="+" duration={2200} />
                        </div>
                        <div className="text-[10px] md:text-xs text-[#8b7355] uppercase tracking-[0.16em] font-semibold">
                          pacienți tratați
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT: editorial numbered reasons */}
            <div className="lg:pl-4">
              {[
                {
                  num: '01',
                  title: 'Echipă cu peste 10 ani de experiență',
                  desc: 'Dr. Petric și echipa au tratat peste 1500 de pacienți, cu rezultate documentate prin cazuri reale.',
                },
                {
                  num: '02',
                  title: 'Tehnologie modernă, planuri exacte',
                  desc: 'Scanner 3D digital, radiologie low-dose și planificare computerizată — fără surprize în timpul tratamentului.',
                },
                {
                  num: '03',
                  title: 'Confort și anestezie blândă',
                  desc: 'Ambient relaxant, anestezie nedureroasă și comunicare clară la fiecare pas. Frica de stomatolog rămâne afară.',
                },
                {
                  num: '04',
                  title: 'Prețuri transparente, garanție',
                  desc: 'Calculator de preț online, plan de tratament scris înainte de a începe și garanție pentru lucrări.',
                },
              ].map((reason, i) => (
                <ScrollReveal
                  key={reason.num}
                  animation="fade-up"
                  delay={150 + i * 100}
                >
                  <div className={`group flex items-start gap-5 md:gap-7 py-5 md:py-6 ${i !== 0 ? 'border-t border-[#e8e0d5]' : ''}`}>
                    <span className="font-serif italic text-3xl md:text-4xl text-[#8b7355] shrink-0 leading-none pt-1 origin-left group-hover:text-[#2a2118] group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {reason.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-[#2a2118] leading-tight mb-2 group-hover:text-[#8b7355] transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-[#5a5048] text-sm md:text-base leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Editorial warm clean design */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4c4b0]/8 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" aria-hidden="true" />

        {/* Floating icons — team/care theme */}
        <FloatingIcons
          icons={[
            { src: '/icons/016-dentist-3.svg', className: 'top-8 left-3 w-14 h-14 md:top-28 md:left-12 md:w-24 md:h-24 lg:left-24 lg:w-28 lg:h-28', variant: 'driftB', duration: 28, opacity: 0.11 },
            { src: '/icons/022-dental-care-1.svg', className: 'top-8 right-3 w-12 h-12 md:top-32 md:right-10 md:w-20 md:h-20 lg:right-24 lg:w-24 lg:h-24', variant: 'driftA', duration: 30, delay: 3, opacity: 0.11 },
            { src: '/icons/010-smile.svg', className: 'top-[15rem] left-4 w-10 h-10 md:hidden xl:block xl:top-24 xl:left-[22%] xl:w-16 xl:h-16', variant: 'driftC', duration: 24, delay: 1, opacity: 0.1 },
            { src: '/icons/009-teeth.svg', className: 'top-[15rem] right-4 w-12 h-12 md:hidden xl:block xl:top-20 xl:right-[22%] xl:w-16 xl:h-16', variant: 'driftB', duration: 26, delay: 5, opacity: 0.1 },
          ]}
        />

        <div className="container relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <AnimatedServiceHeading bold="Cunoaște" italic="echipa" />
            <ScrollReveal animation="fade-up" delay={500}>
              <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
                {t('teamPreview.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          {/* Team Grid - 3 doctors top row + 2 staff centered on second row (md+) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {(() => {
              const TEAM_SLUGS = ['razvan-petric', 'denisa-ghirasim', 'giovana-tincu', 'camelia-gherman', 'karla-daraban']
              const allMembers = hasSanityTeamMembers && teamMembers.length >= 5 ? teamMembers : fallbackTeamMembers
              const filtered = TEAM_SLUGS
                .map((slug) => allMembers.find((m) => m.slug === slug))
                .filter((m): m is NonNullable<typeof m> => Boolean(m))

              return filtered.map((member, index) => (
                <div
                  key={'_id' in member ? member._id : member.key}
                  className={cn(
                    'md:col-span-2',
                    index === 0 && 'col-span-2 md:col-span-2',
                    index === 3 && 'md:col-start-2',
                    index === 4 && 'md:col-start-4'
                  )}
                >
                <ScrollReveal
                  animation="fade-up"
                  delay={index * 100}
                >
                <Link
                  href={{ pathname: '/echipa/[slug]', params: { slug: member.slug } }}
                  className="group block"
                >
                  {/* Card with photo */}
                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden
                    bg-white border border-[#e8e0d5]
                    shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.2)]
                    hover:border-[#d4c4b0]
                    hover:-translate-y-1.5
                    transition-all duration-500 ease-out">

                    {/* Photo area */}
                    <div className="relative aspect-[3/4] overflow-hidden
                      bg-gradient-to-br from-[#ede6db] via-[#e5ddd2] to-[#d4c4b0]/40">
                      {'photo' in member && member.photo && typeof member.photo !== 'string' && member.photo.asset?.url ? (
                        <Image
                          fill
                          alt={member.name}
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 640px) 50vw, 25vw"
                          src={urlFor(member.photo).width(400).height(533).quality(85).url()}
                        />
                      ) : 'photo' in member && typeof member.photo === 'string' ? (
                        <Image
                          fill
                          alt={member.name}
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 640px) 50vw, 25vw"
                          src={member.photo}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/50 flex items-center justify-center
                            shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                            <User className="w-10 h-10 md:w-12 md:h-12 text-[#a08b72]" strokeWidth={1.2} />
                          </div>
                          <span className="text-xs text-[#8b7355]/60 font-medium">{t('teamPreview.badge')}</span>
                        </div>
                      )}

                      {/* Bottom gradient overlay - always subtle, stronger on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/30 via-transparent to-transparent
                        md:from-[#2a2118]/15 md:group-hover:from-[#2a2118]/45
                        transition-all duration-500" />

                      {/* Hover CTA - desktop only, matches hero arrow-reveal pattern */}
                      <div className="hidden md:flex absolute inset-0 items-end justify-center pb-5">
                        <span className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-400 ease-out
                          inline-flex items-center px-4 py-2
                          bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-[0.16em] text-[#2a2118]
                          shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                          <span>{t('common.learnMore')}</span>
                          <ArrowRight className="ml-2 w-3.5 h-3.5" strokeWidth={2.25} />
                        </span>
                      </div>
                    </div>

                    {/* Name & Role - inside card */}
                    <div className="px-3 py-3 md:px-4 md:py-4 text-center">
                      <h3 className="text-sm md:text-base lg:text-lg font-bold text-[#2a2118] mb-0.5 md:mb-1
                        group-hover:text-[#8b7355] transition-colors duration-300 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs md:text-sm text-[#8b7355] font-medium leading-tight">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </Link>
                </ScrollReveal>
                </div>
              ))
            })()}
          </div>

          {/* View All Button - matches hero CTA pattern (arrow reveals on hover) */}
          <ScrollReveal animation="fade-up" delay={300} className="mt-12 md:mt-16 text-center">
            <Link
              href="/echipa"
              className="group inline-flex items-center px-8 py-4 bg-[#2a2118] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300"
            >
              <span>{t('teamPreview.viewAll')}</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.25} />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== OUR CLINIC SECTION ========== */}
      <ClinicSection t={t} />

      {/* Doctor Videos Section - Instagram/TikTok Shorts style with doctor photos */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

        {/* Floating icons — knowledge/education theme */}
        <FloatingIcons
          icons={[
            { src: '/icons/001-x-ray.svg', className: 'top-8 left-3 w-14 h-14 md:top-28 md:left-12 md:w-24 md:h-24 lg:left-24 lg:w-28 lg:h-28', variant: 'driftC', duration: 30, opacity: 0.11 },
            { src: '/icons/007-tooth-cleaning.svg', className: 'top-8 right-3 w-12 h-12 md:top-32 md:right-12 md:w-20 md:h-20 lg:right-24 lg:w-24 lg:h-24', variant: 'driftA', duration: 26, delay: 2.5, opacity: 0.11 },
            { src: '/icons/024-dental-implant.svg', className: 'top-[15rem] left-4 w-10 h-10 md:hidden xl:block xl:top-24 xl:left-[22%] xl:w-16 xl:h-16', variant: 'driftB', duration: 28, delay: 4, opacity: 0.1 },
            { src: '/icons/038-braces.svg', className: 'top-[15rem] right-4 w-12 h-12 md:hidden xl:block xl:top-20 xl:right-[22%] xl:w-16 xl:h-16', variant: 'driftC', duration: 24, delay: 1, opacity: 0.1 },
          ]}
        />

        <div className="container relative z-10">
          {/* Section header - editorial typography matching the rest */}
          <div className="text-center mb-14 md:mb-20">
            <AnimatedServiceHeading bold="Sfaturi de la" italic="doctorii nostri" />
            <ScrollReveal animation="fade-up" delay={500}>
              <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
                Doctorii Dentcraft iti raspund la cele mai frecvente intrebari despre tratamente, igiena si rezultate.
              </p>
            </ScrollReveal>
          </div>

          {/* Video Reels Grid - 2 doctor videos centered */}
          <DoctorVideosGrid
            videos={[
              {
                videoId: 'ZQnkXaijIXs',
                posterSrc: 'https://drpetric.ro/wp-content/uploads/2024/11/stomatolog-satu-mare.png',
                posterAlt: 'Dr. Petric Razvan-Tudor',
                doctorName: 'Dr. Petric Razvan-Tudor',
                doctorRole: 'Medic Stomatolog Coordonator',
                delay: '0.1s',
              },
              {
                videoId: 'KuxT2zKlrao',
                posterSrc: '/images/team/dr-ghirasim-denisa-stefania.webp',
                posterAlt: 'Dr. Ghirasim Denisa-Stefania',
                doctorName: 'Dr. Ghirasim Denisa',
                doctorRole: 'Medic Stomatolog · Pediatrie',
                delay: '0.2s',
              },
              {
                videoId: '1YaS-sdkYog',
                posterSrc: '/images/team/dr-tincu-giovana.webp',
                posterAlt: 'Dr. Tincu Giovana-Nicoleta',
                doctorName: 'Dr. Tincu Giovana',
                doctorRole: 'Medic Specialist · Parodontologie',
                delay: '0.3s',
              },
            ]}
          />

          {/* Bottom CTA - matches hero/services arrow-reveal pattern */}
          <ScrollReveal animation="fade-up" delay={300} className="mt-14 md:mt-16 text-center">
            <a
              href="https://www.instagram.com/dentcraft.sm"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-[#2a2118] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300"
            >
              <span>Vezi mai multe pe Instagram</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.25} />
              </span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Google Reviews Section - Dynamic from JSON */}
      <section className={`py-20 md:py-28 relative overflow-hidden ${hasSanityTestimonials ? 'bg-white' : 'bg-[#f5f0e8]'}`}>
        <div className="container relative z-10">
          {/* Section header — matches hero typography */}
          <div className="text-center mb-12 md:mb-16">
            <AnimatedServiceHeading bold="Ce spun" italic="pacienții" />
            <ScrollReveal animation="fade-up" delay={500}>
              <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
                Pacientii nostri vorbesc — fiecare recenzie e verificata pe Google si reflecta experienta lor reala la clinica DentCraft.
              </p>
            </ScrollReveal>
          </div>

          {/* Google Reviews Slider - includes overview, carousel, and action buttons */}
          <GoogleReviewsSlider
            googleMapsUrl={googleReviews.googleMapsUrl}
            locale={locale}
            rating={googleReviews.rating}
            reviews={googleReviews.reviews}
            totalReviews={googleReviews.totalReviews}
          />
        </div>
      </section>

      {/* Before/After Gallery Section - editorial redesign */}
      {hasSanityBeforeAfter && (
        <section className={`py-24 md:py-32 relative overflow-hidden ${hasSanityTestimonials ? 'bg-[#f5f0e8]' : 'bg-white'}`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

          {/* Floating icons — transformation theme */}
          <FloatingIcons
            icons={[
              { src: '/icons/002-broken-tooth-2.svg', className: 'top-8 left-3 w-12 h-12 md:top-28 md:left-12 md:w-20 md:h-20 lg:left-24 lg:w-24 lg:h-24', variant: 'driftB', duration: 28, opacity: 0.11 },
              { src: '/icons/008-white-teeth.svg', className: 'top-8 right-3 w-14 h-14 md:top-32 md:right-12 md:w-24 md:h-24 lg:right-24 lg:w-28 lg:h-28', variant: 'driftA', duration: 32, delay: 3, opacity: 0.11 },
              { src: '/icons/010-smile.svg', className: 'top-[15rem] left-4 w-10 h-10 md:hidden xl:block xl:top-24 xl:left-[24%] xl:w-14 xl:h-14', variant: 'driftC', duration: 24, delay: 2, opacity: 0.1 },
              { src: '/icons/009-teeth.svg', className: 'top-[15rem] right-4 w-12 h-12 md:hidden xl:block xl:top-20 xl:right-[24%] xl:w-14 xl:h-14', variant: 'driftB', duration: 26, delay: 5, opacity: 0.1 },
            ]}
          />

          <div className="container relative z-10">
            {/* Editorial header — bold + serif italic accent (matches hero/services/team/clinic/reviews) */}
            <div className="text-center mb-14 md:mb-20">
              <AnimatedServiceHeading bold="Rezultate" italic="reale" />
              <ScrollReveal animation="fade-up" delay={500}>
                <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
                  Cazuri reale, fotografiate la clinica DentCraft. Trage de slider să vezi cum un tratament profesional schimbă vizibil zambetul fiecărui pacient.
                </p>
              </ScrollReveal>
            </div>

            <BeforeAfterGalleryPreview
              afterLabel={t('gallery.after')}
              beforeLabel={t('gallery.before')}
              cases={beforeAfterCases}
              durationLabel={t('gallery.duration')}
            />

            {/* View All — matches hero CTA arrow-reveal pattern */}
            <ScrollReveal animation="fade-up" delay={300} className="mt-14 md:mt-16 text-center">
              <Link
                href="/galerie"
                className="group inline-flex items-center px-8 py-4 bg-[#2a2118] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300"
              >
                <span>{t('galleryPreview.viewAll')}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.25} />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

    </div>
  )
}
