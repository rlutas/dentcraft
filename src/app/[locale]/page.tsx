import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import {
  Heart,
  Microscope,
  Play,
  Star,
  Stethoscope,
  User,
  Users,
  Wallet,
} from 'lucide-react'
import { ClinicSection } from '@/components/sections/ClinicSection'
import { CountUp } from '@/components/ui/CountUp'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { BeforeAfterGalleryPreview } from '@/components/features/BeforeAfterGalleryPreview'
import { GoogleReviewsSlider } from '@/components/features/GoogleReviewsSlider'
import { BookingButton } from '@/components/ui/BookingButton'
import googleReviews from '@/data/google-reviews.json'
import type { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { getMainFallbackServices } from '@/lib/fallback-services'
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

// Icon mapping for services from Sanity
const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  stethoscope: Stethoscope,
  microscope: Microscope,
  users: Users,
  heart: Heart,
  wallet: Wallet,
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

function HomePageContent({ services, testimonials, teamMembers, beforeAfterCases, locale, _heroTeamPhotoUrl, _heroClinicPhotoUrl }: HomePageContentProps) {
  const t = useTranslations()

  // Check if we have Sanity data
  const hasSanityServices = services && services.length > 0
  const hasSanityTestimonials = testimonials && testimonials.length > 0
  const hasSanityTeamMembers = teamMembers && teamMembers.length > 0
  const hasSanityBeforeAfter = beforeAfterCases && beforeAfterCases.length > 0

  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf6f1] via-[#f5efe7] to-[#eee6da]">
        {/* Animated background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hero-bg-glow absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#e8ddd0]/30 blur-[120px]" />
          <div className="hero-bg-glow absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#ddd0c0]/20 blur-[100px]" />
        </div>

        {/* Floating dental SVG decorations - subtle dental-themed texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* === MOBILE ICONS (2 icons on a diagonal: top-right to bottom-left) === */}
          {/* Mobile icon 1: Top-right corner area */}
          <img src="/icons/032-tooth.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-1 absolute top-[8%] right-[6%] w-10 h-10 lg:hidden" />
          {/* Mobile icon 2: Bottom-left corner area */}
          <img src="/icons/010-smile.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-3 absolute bottom-[10%] left-[5%] w-9 h-9 lg:hidden" />

          {/* === DESKTOP ICONS (5 icons spread across hero corners and center) === */}
          {/* Desktop 1: Top-left corner, above the badge/title text */}
          <img src="/icons/032-tooth.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-1 absolute top-[6%] left-[8%] w-12 h-12 hidden lg:block" />
          {/* Desktop 2: Top-right area, above the team photo */}
          <img src="/icons/010-smile.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-2 absolute top-[8%] right-[6%] w-10 h-10 hidden lg:block" />
          {/* Desktop 3: Center gap between text and photo columns */}
          <img src="/icons/008-white-teeth.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-3 absolute top-[42%] left-[44%] w-14 h-14 hidden lg:block" />
          {/* Desktop 4: Bottom-right, below the team photo */}
          <img src="/icons/029-dental-care.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-4 absolute bottom-[8%] right-[10%] w-11 h-11 hidden lg:block" />
          {/* Desktop 5: Bottom-left, below trust indicators */}
          <img src="/icons/024-dental-implant.svg" alt="" aria-hidden="true"
            className="hero-deco-drift-5 absolute bottom-[6%] left-[4%] w-16 h-16 hidden lg:block" />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center
            min-h-[calc(100svh-80px)] pt-14 pb-8 lg:pt-0 lg:pb-0">

            {/* LEFT: Text content */}
            <div>
              {/* Badge */}
              <div className="hero-stagger-1 mb-3 lg:mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  bg-white text-[#5a4a3a] border border-[#e0d5c8] shadow-[0_2px_12px_rgba(180,160,130,0.12)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('hero.badge')}
                </span>
              </div>

              {/* Heading */}
              <h1 className="hero-stagger-2 text-[#2a2118] mb-3 lg:mb-5"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08 }}>
                {t('hero.title').split(',')[0]},
                <br />
                <span className="text-[#8b7355]">{t('hero.title').split(',')[1] || 'prioritatea noastra'}</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-stagger-3 text-[#7a6b5a] text-lg leading-relaxed mb-6 lg:mb-8 max-w-md">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="hero-stagger-4 flex flex-row items-center gap-3 lg:gap-4">
                <BookingButton size="md" className="hero-cta-glow lg:!px-8 lg:!py-4 !text-sm lg:!text-base">
                  {t('hero.cta.primary')}
                </BookingButton>
                <Link href="/servicii" className="group inline-flex items-center gap-1.5 lg:gap-2 px-4 lg:px-6 py-3 lg:py-3.5 text-sm lg:text-base text-[#5a4a3a] font-semibold
                  hover:text-[#2a2118] transition-colors duration-300">
                  {t('hero.cta.secondary')}
                  <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="hero-stagger-5 mt-6 lg:mt-10 flex flex-wrap items-center gap-3 lg:gap-6">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <div className="flex -space-x-2">
                    <img src="/images/patient-1.png" alt="" className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white object-cover" />
                    <img src="/images/patient-2.png" alt="" className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white object-cover" />
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#d4c4b0] border-2 border-white flex items-center justify-center text-xs font-bold text-white">+</div>
                  </div>
                  <div className="text-xs lg:text-sm">
                    <span className="font-bold text-[#2a2118]">500+</span>
                    <span className="text-[#8b7a68] ml-1">{locale === 'ro' ? 'pacienti fericiti' : locale === 'hu' ? 'boldog páciens' : 'happy patients'}</span>
                  </div>
                </div>
                <div className="w-px h-6 lg:h-8 bg-[#d4c4b0]/40" />
                <div className="flex items-center gap-1 lg:gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs lg:text-sm font-bold text-[#2a2118]">4.9</span>
                  <span className="text-xs lg:text-sm text-[#8b7a68]">Google</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Photo composition */}
            <div className="relative flex justify-center lg:justify-end pt-4 pb-6 lg:pt-0 lg:pb-0">
              <div className="relative hero-photo-reveal">
                {/* Premium soft glow behind the photo */}
                <div className="hero-photo-glow absolute -inset-6 lg:-inset-10 rounded-[2rem] lg:rounded-[2.5rem] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Main photo with layered premium shadow */}
                <div className="relative rounded-xl lg:rounded-[1.5rem] overflow-hidden
                  border-2 border-white/70 hero-photo-warmglow hero-photo-shadow">
                  <Image
                    src="/images/team-clinic.jpg"
                    alt="Echipa Dentcraft - Clinica Stomatologica Satu Mare"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 400px, (max-width: 1535px) 560px, 650px"
                    className="w-full lg:w-[400px] xl:w-[560px] 2xl:w-[650px] h-auto block object-cover"
                    priority
                  />
                </div>

                {/* Floating card: Google Rating - top left, compact on mobile */}
                <div className="absolute left-2 lg:-left-10 -top-3 lg:top-4 z-10
                  bg-white rounded-lg lg:rounded-2xl
                  shadow-[0_4px_20px_rgba(0,0,0,0.06)] lg:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  px-2 lg:px-4 py-1.5 lg:py-3
                  border border-[#f0ebe4]/80
                  hero-float-card-1
                  flex items-center gap-1.5 lg:gap-3">
                  <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md lg:rounded-xl bg-amber-50 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 lg:w-5 lg:h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[11px] lg:text-sm font-bold text-[#2a2118] leading-tight">4.9 / 5.0</div>
                    <div className="text-[9px] lg:text-xs text-[#8b7a68] leading-tight">Google Reviews</div>
                  </div>
                </div>

                {/* Floating card: Experience badge - bottom right, compact on mobile */}
                <div className="absolute right-2 lg:-right-8 xl:-right-12 -bottom-3 lg:bottom-10 z-10
                  bg-white rounded-lg lg:rounded-2xl
                  shadow-[0_4px_20px_rgba(0,0,0,0.06)] lg:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  px-2 lg:px-4 py-1.5 lg:py-3
                  border border-[#f0ebe4]/80
                  hero-float-card-2
                  flex items-center gap-1.5 lg:gap-3">
                  <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md lg:rounded-xl bg-emerald-50 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] lg:text-sm font-bold text-[#2a2118] leading-tight">5+ {locale === 'ro' ? 'ani' : locale === 'hu' ? '\u00e9v' : 'years'}</div>
                    <div className="text-[9px] lg:text-xs text-[#8b7a68] leading-tight">{locale === 'ro' ? 'experienta' : locale === 'hu' ? 'tapasztalat' : 'experience'}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section - Clean, premium design */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10">
          {/* Section header - staggered reveal */}
          <div className="text-center mb-20">
            <ScrollReveal animation="fade-up">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
                {t('services.badge')}
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
                {t('services.title')}
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto leading-relaxed">
                {t('services.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          {/* Clean 3-column grid - each card animates in with stagger */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {hasSanityServices ? (
              // Render services from Sanity CMS
              services.slice(0, 6).map((service, index) => {
                const IconComponent = service.icon ? iconMap[service.icon] : Stethoscope

                return (
                  <ScrollReveal
                    key={service._id}
                    animation="fade-up"
                    delay={index * 150}
                  >
                    <Link
                      href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                      className="group relative bg-[#faf8f5] rounded-3xl p-8 md:p-10 block h-full
                        border border-transparent hover:border-[var(--color-accent)]
                        transition-all duration-500 ease-out
                        hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]
                        hover:-translate-y-2"
                    >
                      {/* Icon container with gradient background */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl mb-8 flex items-center justify-center
                        bg-gradient-to-br from-[var(--color-accent-light)] via-[var(--color-accent)]/20 to-[var(--color-accent)]/40
                        group-hover:from-[var(--color-accent)] group-hover:via-[var(--color-accent)] group-hover:to-[var(--color-accent-hover)]
                        transition-all duration-500 ease-out
                        shadow-[0_8px_30px_-10px_rgba(212,196,176,0.5)]
                        group-hover:shadow-[0_12px_40px_-10px_rgba(212,196,176,0.7)]">
                        {IconComponent && (
                          <IconComponent
                            className="w-10 h-10 md:w-12 md:h-12 text-[var(--color-primary)]
                              group-hover:text-[var(--color-primary)] transition-colors duration-500"
                            strokeWidth={1.25}
                          />
                        )}
                      </div>

                      {/* Service number - subtle visual interest */}
                      <span className="absolute top-8 right-8 text-6xl font-bold text-[var(--color-primary)]/[0.03]
                        group-hover:text-[var(--color-accent)]/20 transition-colors duration-500 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Content */}
                      <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-primary)] mb-4
                        group-hover:text-[var(--color-primary)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[var(--color-secondary)] leading-relaxed mb-6">
                        {service.shortDescription || ''}
                      </p>

                      {/* Link with arrow */}
                      <span className="inline-flex items-center gap-3 text-[var(--color-primary)] font-medium
                        group-hover:gap-4 transition-all duration-300">
                        {t('common.learnMore')}
                        <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center
                          group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </ScrollReveal>
                )
              })
            ) : (
              // Fallback to translation-based content - show all 9 main services
              getMainFallbackServices().map((service, index) => (
                <ScrollReveal
                  key={service.slug}
                  animation="fade-up"
                  delay={index * 150}
                >
                  <Link
                    href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                    className="group relative bg-[#faf8f5] rounded-3xl p-8 md:p-10 block h-full
                      border border-transparent hover:border-[var(--color-accent)]
                      transition-all duration-500 ease-out
                      hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]
                      hover:-translate-y-2"
                  >
                    {/* Icon container with gradient background */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl mb-8 flex items-center justify-center
                      bg-gradient-to-br from-[var(--color-accent-light)] via-[var(--color-accent)]/20 to-[var(--color-accent)]/40
                      group-hover:from-[var(--color-accent)] group-hover:via-[var(--color-accent)] group-hover:to-[var(--color-accent-hover)]
                      transition-all duration-500 ease-out
                      shadow-[0_8px_30px_-10px_rgba(212,196,176,0.5)]
                      group-hover:shadow-[0_12px_40px_-10px_rgba(212,196,176,0.7)]">
                      {service.iconPath ? (
                        <Image
                          src={service.iconPath}
                          alt=""
                          width={48}
                          height={48}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain"
                        />
                      ) : (
                        <service.Icon
                          className="w-10 h-10 md:w-12 md:h-12 text-[var(--color-primary)]
                            group-hover:text-[var(--color-primary)] transition-colors duration-500"
                          strokeWidth={1.25}
                        />
                      )}
                    </div>

                    {/* Service number - subtle visual interest */}
                    <span className="absolute top-8 right-8 text-6xl font-bold text-[var(--color-primary)]/[0.03]
                      group-hover:text-[var(--color-accent)]/20 transition-colors duration-500 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-primary)] mb-4
                      group-hover:text-[var(--color-primary)] transition-colors">
                      {t(`services.fallback.${service.titleKey}`)}
                    </h3>
                    <p className="text-[var(--color-secondary)] leading-relaxed mb-6">
                      {t(`services.fallback.${service.descriptionKey}`)}
                    </p>

                    {/* Link with arrow */}
                    <span className="inline-flex items-center gap-3 text-[var(--color-primary)] font-medium
                      group-hover:gap-4 transition-all duration-300">
                      {t('common.learnMore')}
                      <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center
                        group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </span>
                  </Link>
                </ScrollReveal>
              ))
            )}
          </div>

          {/* View all button */}
          <ScrollReveal animation="fade-up" delay={400} className="mt-16 text-center">
            <Link
              href="/servicii"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-white
                rounded-full font-medium text-lg
                hover:bg-[var(--color-primary)]/90 hover:shadow-[0_10px_40px_-10px_rgba(26,26,26,0.4)]
                transition-all duration-300"
            >
              {t('common.seeAll')}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Dentcraft Section - Elegant Stats */}
      <section className="py-20 md:py-28 bg-[#f5f0e8] relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10">
          {/* Section header */}
          <div className="text-center mb-12">
            <ScrollReveal animation="fade-up">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
                {t('whyUs.badge')}
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
                {t('whyUs.title')}
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-base md:text-lg text-[var(--color-secondary)] max-w-xl mx-auto leading-relaxed">
                {t('whyUs.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          {/* Stats in elegant card */}
          <ScrollReveal animation="scale-up" delay={300}>
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {/* Years of Experience */}
                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="text-center relative group">
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]" />
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                      group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={5} suffix="+" duration={2000} />
                    </div>
                    <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                      {t('whyUs.stats.years.label')}
                    </div>
                    <div className="text-[var(--color-secondary)] text-xs">
                      {t('whyUs.stats.years.sublabel')}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Happy Patients */}
                <ScrollReveal animation="fade-up" delay={400}>
                  <div className="text-center relative group">
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]" />
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                      group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={500} suffix="+" duration={2200} />
                    </div>
                    <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                      {t('whyUs.stats.patients.label')}
                    </div>
                    <div className="text-[var(--color-secondary)] text-xs">
                      {t('whyUs.stats.patients.sublabel')}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Google Rating */}
                <ScrollReveal animation="fade-up" delay={600}>
                  <div className="text-center relative group">
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]" />
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                      flex items-center justify-center gap-1
                      group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={4.9} decimals={1} duration={1800} />
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                    </div>
                    <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                      {t('whyUs.stats.rating.label')}
                    </div>
                    <div className="text-[var(--color-secondary)] text-xs">
                      {t('whyUs.stats.rating.sublabel')}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Transparency */}
                <ScrollReveal animation="fade-up" delay={800}>
                  <div className="text-center group">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                      group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={100} suffix="%" duration={2000} />
                    </div>
                    <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                      {t('whyUs.stats.guarantee.label')}
                    </div>
                    <div className="text-[var(--color-secondary)] text-xs">
                      {t('whyUs.stats.guarantee.sublabel')}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Section - Premium Warm Design */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4c4b0]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4c4b0]/8 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="container relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <ScrollReveal animation="fade-up">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase
                text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
                {t('teamPreview.badge')}
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a2118] mb-5">
                {t('teamPreview.title')}
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
                {t('teamPreview.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          {/* Team Grid - Premium cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {(() => {
              // Use Sanity data only if it has enough members to fill the grid, otherwise use fallback
              const members = hasSanityTeamMembers && teamMembers.length >= 6 ? teamMembers : fallbackTeamMembers
              return members.slice(0, 6).map((member, index) => (
                <ScrollReveal
                  key={'_id' in member ? member._id : member.key}
                  animation="fade-up"
                  delay={index * 150}
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

                      {/* Hover CTA - desktop only */}
                      <div className="hidden md:flex absolute inset-0 items-end justify-center pb-5">
                        <span className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-400 ease-out
                          inline-flex items-center gap-1.5 px-4 py-2
                          bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-[#2a2118]
                          shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                          {t('common.learnMore')}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
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
              ))
            })()}
          </div>

          {/* View All Button */}
          <ScrollReveal animation="fade-up" delay={300} className="mt-12 md:mt-16 text-center">
            <Link
              href="/echipa"
              className="group inline-flex items-center gap-3 px-7 py-3.5
                border-2 border-[#2a2118] text-[#2a2118] rounded-full font-semibold
                hover:bg-[#2a2118] hover:text-white transition-all duration-300"
            >
              {t('teamPreview.viewAll')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== OUR CLINIC SECTION ========== */}
      <ClinicSection t={t} />

      {/* Video Reels Testimonials Section - Instagram/TikTok Style */}
      <section className="video-testimonials-section py-24 md:py-32 relative overflow-hidden">
        {/* Dramatic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1816] to-[#0a0a0a]" />

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4c4b0]/10 blur-[120px] animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8b7355]/10 blur-[100px] animate-float-medium" />
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="container relative z-10">
          {/* Section header - Editorial style */}
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase
              text-[#d4c4b0] bg-white/5 rounded-full border border-[#d4c4b0]/30">
              {t('featuredTestimonials.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              {t('featuredTestimonials.title')}
            </h2>
            <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
              {t('featuredTestimonials.subtitle')}
            </p>
          </div>

          {/* Video Reels Grid - 3 Vertical Videos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Video Reel 1 - Implant Story */}
            <div className="group relative animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: '0.1s' }}>
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]
                border border-white/10 group-hover:border-[#d4c4b0]/40 transition-all duration-500
                shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_30px_80px_-20px_rgba(212,196,176,0.15)]">
                {/* Video placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Decorative patient image or gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2520] via-[#1a1816] to-[#0f0f0f]" />

                {/* Play button - centered */}
                <a
                  href="https://youtube.com/shorts/example1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center
                    border border-white/20 group-hover:scale-110 group-hover:bg-white/20
                    transition-all duration-500 cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center
                      shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                      <Play className="w-6 h-6 text-[#1a1a1a] ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </a>

                {/* Top badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white/90
                    border border-white/10">
                    Implant Dentar
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span className="text-xs text-white/80">YouTube</span>
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#d4c4b0] fill-[#d4c4b0]" strokeWidth={1.5} />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
                    &ldquo;Implantul a schimbat totul. Acum pot manca orice si ma simt incredibil de bine!&rdquo;
                  </p>
                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4c4b0]/20 flex items-center justify-center border border-white/10">
                      <span className="text-sm font-medium text-white">M</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">Maria P.</p>
                      <p className="text-white/50 text-xs">Implantologie</p>
                    </div>
                  </div>
                </div>

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4c4b0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Video Reel 2 - Smile Makeover - Featured/Larger */}
            <div className="group relative animate-[fadeInUp_0.6s_ease-out_both] md:-mt-8 md:mb-8" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]
                border border-white/10 group-hover:border-[#d4c4b0]/40 transition-all duration-500
                shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_35px_100px_-20px_rgba(212,196,176,0.2)]
                ring-1 ring-[#d4c4b0]/20">
                {/* Video placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d2825] via-[#1f1c1a] to-[#0f0e0d]" />

                {/* Featured badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1.5 bg-[#d4c4b0] rounded-full text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider">
                    Popular
                  </span>
                </div>

                {/* Play button - centered */}
                <a
                  href="https://youtube.com/shorts/example2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="w-24 h-24 rounded-full bg-[#d4c4b0]/20 backdrop-blur-md flex items-center justify-center
                    border border-[#d4c4b0]/30 group-hover:scale-110 group-hover:bg-[#d4c4b0]/30
                    transition-all duration-500 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-[#d4c4b0] flex items-center justify-center
                      shadow-[0_8px_32px_rgba(212,196,176,0.4)]">
                      <Play className="w-7 h-7 text-[#1a1a1a] ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </a>

                {/* Top right - YouTube badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span className="text-xs text-white/80">YouTube</span>
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-3 border border-white/10">
                    Fatete Dentare
                  </span>
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#d4c4b0] fill-[#d4c4b0]" strokeWidth={1.5} />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-white text-base leading-relaxed mb-4 line-clamp-3">
                    &ldquo;Zambetul meu s-a transformat complet! Fatetele arata incredibil de natural.&rdquo;
                  </p>
                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#d4c4b0]/30 flex items-center justify-center border border-[#d4c4b0]/20">
                      <span className="text-base font-medium text-white">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Andreea S.</p>
                      <p className="text-white/50 text-sm">Estetica Dentara</p>
                    </div>
                  </div>
                </div>

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4c4b0]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Video Reel 3 - Whitening */}
            <div className="group relative animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: '0.3s' }}>
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]
                border border-white/10 group-hover:border-[#d4c4b0]/40 transition-all duration-500
                shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_30px_80px_-20px_rgba(212,196,176,0.15)]">
                {/* Video placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#252220] via-[#1a1816] to-[#0f0f0f]" />

                {/* Play button - centered */}
                <a
                  href="https://youtube.com/shorts/example3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center
                    border border-white/20 group-hover:scale-110 group-hover:bg-white/20
                    transition-all duration-500 cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center
                      shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                      <Play className="w-6 h-6 text-[#1a1a1a] ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </a>

                {/* Top badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white/90
                    border border-white/10">
                    Albire Dentara
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span className="text-xs text-white/80">YouTube</span>
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#d4c4b0] fill-[#d4c4b0]" strokeWidth={1.5} />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
                    &ldquo;Rezultat uimitor dupa o singura sedinta! Dintii mei arata stralucitor.&rdquo;
                  </p>
                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4c4b0]/20 flex items-center justify-center border border-white/10">
                      <span className="text-sm font-medium text-white">I</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">Ioana D.</p>
                      <p className="text-white/50 text-xs">Albire Profesionala</p>
                    </div>
                  </div>
                </div>

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4c4b0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/testimoniale"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4c4b0] text-[#1a1a1a]
                rounded-full font-semibold text-base hover:bg-white
                transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,196,176,0.3)]
                group"
            >
              {t('featuredTestimonials.viewAll')}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews Section - Dynamic from JSON */}
      <section className={`py-16 md:py-24 relative overflow-hidden ${hasSanityTestimonials ? 'bg-white' : 'bg-[#f5f0e8]'}`}>
        <div className="container relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <ScrollReveal animation="fade-up">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase
                text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
                {t('testimonials.badge')}
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-5">
                {t('testimonials.title')}
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto leading-relaxed">
                {t('testimonials.subtitle')}
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

      {/* Before/After Gallery Preview Section - Background alternates based on testimonials */}
      {hasSanityBeforeAfter && (
        <section className={`py-20 md:py-28 relative overflow-hidden ${hasSanityTestimonials ? 'bg-[#f5f0e8]' : 'bg-white'}`}>
          {/* Decorative background elements - similar to Hero section */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          {/* Floating dots */}
          <div className="absolute top-24 right-[15%] w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-60 animate-float-slow" />
          <div className="absolute top-40 left-[12%] w-3 h-3 rounded-full bg-[var(--color-primary)] opacity-20 animate-float-medium" />
          <div className="absolute bottom-32 right-[8%] w-2 h-2 rounded-full bg-[var(--color-accent-hover)] opacity-50 animate-float-fast" />

          {/* Decorative lines */}
          <svg className="absolute top-20 right-[10%] w-20 h-20 text-[var(--color-accent)] opacity-20" viewBox="0 0 80 80" fill="none">
            <path d="M10 70 L70 10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M20 70 L70 20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Floating dental icons */}
          <Image
            src="/icons/010-smile.svg"
            alt=""
            width={36}
            height={36}
            className="absolute top-28 left-[8%] w-9 h-9 opacity-15 pointer-events-none hidden lg:block animate-[drift_14s_ease-in-out_infinite]"
          />
          <Image
            src="/icons/029-dental-care.svg"
            alt=""
            width={32}
            height={32}
            className="absolute bottom-40 right-[12%] w-8 h-8 opacity-15 pointer-events-none hidden lg:block animate-[drift_16s_ease-in-out_infinite_reverse]"
          />

          <div className="container relative z-10">
            {/* Section header */}
            <div className="text-center mb-16 lg:mb-20">
              <ScrollReveal animation="fade-up">
                <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase
                  text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
                  {t('galleryPreview.badge')}
                </span>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <h2 className="text-4xl md:text-5xl font-bold text-[#2a2118] mb-5">
                  {t('galleryPreview.title')}
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={400}>
                <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
                  {t('galleryPreview.subtitle')}
                </p>
              </ScrollReveal>
            </div>

            {/* Before/After Gallery Grid */}
            <BeforeAfterGalleryPreview
              afterLabel={t('gallery.after')}
              beforeLabel={t('gallery.before')}
              cases={beforeAfterCases}
              durationLabel={t('gallery.duration')}
            />

            {/* View All Button */}
            <ScrollReveal animation="fade-up" delay={300} className="mt-12 md:mt-16 text-center">
              <Link
                href="/galerie"
                className="group inline-flex items-center gap-3 px-7 py-3.5
                  border-2 border-[#2a2118] text-[#2a2118] rounded-full font-semibold
                  hover:bg-[#2a2118] hover:text-white transition-all duration-300"
              >
                {t('galleryPreview.viewAll')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

    </div>
  )
}
