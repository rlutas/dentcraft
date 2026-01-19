import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import {
  Clock,
  Heart,
  Microscope,
  Phone,
  Play,
  Quote,
  Star,
  Stethoscope,
  User,
  Users,
  Wallet,
} from 'lucide-react'
import { BeforeAfterGalleryPreview } from '@/components/features/BeforeAfterGalleryPreview'
import { GoogleReviewsSlider } from '@/components/features/GoogleReviewsSlider'
import googleReviews from '@/data/google-reviews.json'
import type { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { CONTACT } from '@/lib/constants/contact'
import { getMainFallbackServices } from '@/lib/fallback-services'
import { fallbackTeamMembers } from '@/lib/fallback-team'
import { urlFor } from '@/lib/sanity/image'
import { getAllServices, getFeaturedTestimonials, getAllTeamMembers, getFeaturedBeforeAfter } from '@/lib/sanity/queries'

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

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch data from Sanity (with fallbacks)
  let services: SanityService[] = []
  let testimonials: SanityTestimonial[] = []
  let teamMembers: SanityTeamMember[] = []
  let beforeAfterCases: SanityBeforeAfter[] = []

  try {
    [services, testimonials, teamMembers, beforeAfterCases] = await Promise.all([
      getAllServices(locale as Locale),
      getFeaturedTestimonials(locale as Locale),
      getAllTeamMembers(locale as Locale),
      getFeaturedBeforeAfter(locale as Locale),
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

  return <HomePageContent services={services} testimonials={testimonials} teamMembers={teamMembers} beforeAfterCases={beforeAfterCasesWithUrls} locale={locale as Locale} />
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
}

function HomePageContent({ services, testimonials, teamMembers, beforeAfterCases, locale }: HomePageContentProps) {
  const t = useTranslations()

  // Check if we have Sanity data
  const hasSanityServices = services && services.length > 0
  const hasSanityTestimonials = testimonials && testimonials.length > 0
  const hasSanityTeamMembers = teamMembers && teamMembers.length > 0
  const hasSanityBeforeAfter = beforeAfterCases && beforeAfterCases.length > 0

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="hero-bg-pattern absolute inset-0 pointer-events-none" />
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-60 animate-float-slow" />
        <div className="absolute top-40 left-[15%] w-3 h-3 rounded-full bg-[var(--color-primary)] opacity-20 animate-float-medium" />
        <div className="absolute bottom-32 left-[8%] w-2 h-2 rounded-full bg-[var(--color-accent-hover)] opacity-50 animate-float-fast" />

        {/* Decorative lines */}
        <svg className="absolute top-32 left-[5%] w-20 h-20 text-[var(--color-accent)] opacity-30" viewBox="0 0 80 80" fill="none">
          <path d="M10 70 L70 10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M20 70 L70 20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Floating dental icons from /public/icons - with unique animations */}
        {/* Smile - top right */}
        <Image
          src="/icons/010-smile.svg"
          alt=""
          width={40}
          height={40}
          className="absolute top-24 right-[12%] w-10 h-10 opacity-20 pointer-events-none hidden md:block animate-[drift_12s_ease-in-out_infinite]"
        />

        {/* Tooth - left side */}
        <Image
          src="/icons/032-tooth.svg"
          alt=""
          width={32}
          height={32}
          className="absolute top-36 left-[7%] w-8 h-8 opacity-15 pointer-events-none hidden md:block animate-[drift_15s_ease-in-out_infinite_reverse]"
        />

        {/* Dental care - right middle */}
        <Image
          src="/icons/029-dental-care.svg"
          alt=""
          width={36}
          height={36}
          className="absolute top-[45%] right-[5%] w-9 h-9 opacity-15 pointer-events-none hidden lg:block animate-[drift_18s_ease-in-out_infinite]"
        />

        {/* White teeth - bottom left */}
        <Image
          src="/icons/008-white-teeth.svg"
          alt=""
          width={36}
          height={36}
          className="absolute bottom-40 left-[10%] w-9 h-9 opacity-15 pointer-events-none hidden lg:block animate-[drift_14s_ease-in-out_infinite_reverse]"
        />

        {/* Dental implant - bottom right */}
        <Image
          src="/icons/024-dental-implant.svg"
          alt=""
          width={28}
          height={28}
          className="absolute bottom-16 right-[8%] w-7 h-7 opacity-20 pointer-events-none hidden lg:block animate-[drift_16s_ease-in-out_infinite]"
        />

        {/* Small tooth - top center-left */}
        <Image
          src="/icons/030-tooth-1.svg"
          alt=""
          width={24}
          height={24}
          className="absolute top-32 left-[32%] w-6 h-6 opacity-15 pointer-events-none hidden lg:block animate-[drift_20s_ease-in-out_infinite_reverse]"
        />

        <div className="container section relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left side - Content */}
            <div className="max-w-xl">
              <span className="badge mb-6 hero-badge">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('hero.badge')}
              </span>

              <h1 className="text-display mb-6">
                {t('hero.title')}
              </h1>

              <p className="text-body-lg text-muted mb-10">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  {t('hero.cta.primary')}
                </Link>
                <Link href="/servicii" className="btn btn-secondary btn-lg">
                  {t('hero.cta.secondary')}
                </Link>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="relative hidden lg:flex justify-center items-end">
              {/* Main decorative shape */}
              <div className="hero-visual relative flex items-end">
                {/* Decorative blob/circles BEHIND the photo */}
                <svg className="w-[450px] h-[450px] absolute bottom-20 left-1/2 -translate-x-1/2" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-accent-light)" />
                      <stop offset="50%" stopColor="var(--color-accent)" />
                      <stop offset="100%" stopColor="var(--color-accent-hover)" />
                    </linearGradient>
                    <linearGradient id="heroGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
                    </linearGradient>
                    <filter id="heroShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="rgba(0,0,0,0.1)" />
                    </filter>
                  </defs>
                  {/* Background blob */}
                  <path
                    d="M320 200C320 280 260 340 180 340C100 340 40 280 40 200C40 120 100 60 180 60C260 60 320 120 320 200Z"
                    fill="url(#heroGradient1)"
                    filter="url(#heroShadow)"
                    className="animate-morph"
                  />
                  {/* Overlay shape */}
                  <path
                    d="M340 180C340 260 280 320 200 320C120 320 60 260 60 180C60 100 120 40 200 40C280 40 340 100 340 180Z"
                    fill="url(#heroGradient2)"
                    className="animate-morph-reverse"
                  />
                  {/* Decorative circles */}
                  <circle cx="300" cy="100" r="8" fill="var(--color-primary)" opacity="0.15" />
                  <circle cx="80" cy="280" r="6" fill="var(--color-primary)" opacity="0.1" />
                  <circle cx="350" cy="250" r="4" fill="var(--color-accent-hover)" opacity="0.4" />
                </svg>

                {/* Doctor Photo - larger, aligned to bottom */}
                <div className="relative z-10 w-[420px] h-[580px] xl:w-[480px] xl:h-[650px]">
                  <Image
                    src="https://drpetric.ro/wp-content/uploads/2024/11/stomatolog-satu-mare.png"
                    alt="Dr. Razvan Petric - Medic Stomatolog"
                    width={480}
                    height={650}
                    className="w-full h-full object-contain object-bottom"
                    priority
                  />
                </div>

                {/* Floating trust cards */}
                <div className="absolute -top-4 -right-4 hero-float-card z-10">
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[var(--color-border-light)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                        <Star className="w-5 h-5 text-[var(--color-warning)] fill-current" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">4.9</div>
                        <div className="text-xs text-muted">Google Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-8 hero-float-card-delayed z-10">
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[var(--color-border-light)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">5000+</div>
                        <div className="text-xs text-muted">{t('common.happyPatients')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-12 hero-float-card-slow z-10">
                  <div className="bg-white rounded-xl p-3 shadow-lg border border-[var(--color-border-light)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                        <Heart className="w-4 h-4 text-[var(--color-destructive)]" />
                      </div>
                      <div className="text-xs font-semibold">15+ {t('common.yearsExperience').split(' ')[0]}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative dots grid */}
              <div className="absolute -bottom-8 right-0 grid grid-cols-4 gap-3 opacity-30">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                ))}
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
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
              {t('services.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
              {t('services.title')}
            </h2>
            <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Clean 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {hasSanityServices ? (
              // Render services from Sanity CMS
              services.slice(0, 6).map((service, index) => {
                const IconComponent = service.icon ? iconMap[service.icon] : Stethoscope

                return (
                  <Link
                    key={service._id}
                    href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                    className="group relative bg-[#faf8f5] rounded-3xl p-8 md:p-10
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
                )
              })
            ) : (
              // Fallback to translation-based content - show all 9 main services
              getMainFallbackServices().map((service, index) => (
                <Link
                  key={service.slug}
                  href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  className="group relative bg-[#faf8f5] rounded-3xl p-8 md:p-10
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
              ))
            )}
          </div>

          {/* View all button */}
          <div className="mt-16 text-center">
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
          </div>
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
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
              {t('whyUs.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
              {t('whyUs.title')}
            </h2>
            <p className="text-base md:text-lg text-[var(--color-secondary)] max-w-xl mx-auto leading-relaxed">
              {t('whyUs.subtitle')}
            </p>
          </div>

          {/* Stats in elegant card */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]
            animate-[fadeInUp_0.6s_ease-out_both]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Years of Experience */}
              <div className="text-center relative group
                animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]" />
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                  group-hover:scale-110 transition-transform duration-300">
                  {t('whyUs.stats.years.number')}
                </div>
                <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                  {t('whyUs.stats.years.label')}
                </div>
                <div className="text-[var(--color-secondary)] text-xs">
                  {t('whyUs.stats.years.sublabel')}
                </div>
              </div>

              {/* Happy Patients */}
              <div className="text-center relative group
                animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]" />
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                  group-hover:scale-110 transition-transform duration-300">
                  {t('whyUs.stats.patients.number')}
                </div>
                <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                  {t('whyUs.stats.patients.label')}
                </div>
                <div className="text-[var(--color-secondary)] text-xs">
                  {t('whyUs.stats.patients.sublabel')}
                </div>
              </div>

              {/* Google Rating */}
              <div className="text-center relative group
                animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border)]" />
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                  flex items-center justify-center gap-1
                  group-hover:scale-110 transition-transform duration-300">
                  {t('whyUs.stats.rating.number')}
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                </div>
                <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                  {t('whyUs.stats.rating.label')}
                </div>
                <div className="text-[var(--color-secondary)] text-xs">
                  {t('whyUs.stats.rating.sublabel')}
                </div>
              </div>

              {/* Transparency */}
              <div className="text-center group
                animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2
                  group-hover:scale-110 transition-transform duration-300">
                  {t('whyUs.stats.guarantee.number')}
                </div>
                <div className="text-[var(--color-primary)] font-medium text-sm mb-0.5">
                  {t('whyUs.stats.guarantee.label')}
                </div>
                <div className="text-[var(--color-secondary)] text-xs">
                  {t('whyUs.stats.guarantee.sublabel')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Meet the Team */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="container relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
              {t('teamPreview.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
              {t('teamPreview.title')}
            </h2>
            <p className="text-base md:text-lg text-[var(--color-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t('teamPreview.subtitle')}
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {hasSanityTeamMembers ? (
              // Render team members from Sanity CMS
              teamMembers.map((member, index) => (
                <Link
                  key={member._id}
                  href={{ pathname: '/echipa/[slug]', params: { slug: member.slug } }}
                  className="group relative bg-[#faf8f5] rounded-3xl p-6 md:p-8
                    border border-transparent hover:border-[var(--color-accent)]
                    transition-all duration-500 ease-out
                    hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
                    hover:-translate-y-2
                    animate-[fadeInUp_0.6s_ease-out_both]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[var(--color-accent-light)]">
                    {member.photo?.asset?.url ? (
                      <Image
                        fill
                        alt={member.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        src={urlFor(member.photo).width(400).height(400).quality(80).url()}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--color-primary)] mb-1">
                    {member.name}
                  </h3>

                  {/* Role */}
                  {member.role && (
                    <p className="text-sm text-[var(--color-secondary)] mb-4">
                      {member.role}
                    </p>
                  )}

                  {/* View Profile Link */}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]
                    group-hover:gap-3 transition-all duration-300">
                    {t('common.learnMore')}
                    <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center
                      group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </Link>
              ))
            ) : (
              // Fallback to static team data
              fallbackTeamMembers.map((member, index) => (
                <Link
                  key={member.key}
                  href={{ pathname: '/echipa/[slug]', params: { slug: member.slug } }}
                  className="group relative bg-[#faf8f5] rounded-3xl p-6 md:p-8
                    border border-transparent hover:border-[var(--color-accent)]
                    transition-all duration-500 ease-out
                    hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
                    hover:-translate-y-2
                    animate-[fadeInUp_0.6s_ease-out_both]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[var(--color-accent-light)]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--color-primary)] mb-1">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm text-[var(--color-secondary)] mb-4">
                    {member.role}
                  </p>

                  {/* View Profile Link */}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]
                    group-hover:gap-3 transition-all duration-300">
                    {t('common.learnMore')}
                    <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center
                      group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </Link>
              ))
            )}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link
              href="/echipa"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-white
                rounded-full font-medium text-lg
                hover:bg-[var(--color-primary)]/90 hover:shadow-[0_10px_40px_-10px_rgba(26,26,26,0.4)]
                transition-all duration-300"
            >
              {t('teamPreview.viewAll')}
              <svg
                className="w-5 h-5"
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

      {/* Featured Testimonials Section - From Sanity CMS */}
      {hasSanityTestimonials && (
        <section className="py-20 md:py-28 bg-[#f5f0e8] relative overflow-hidden">
          {/* Subtle decorative background */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

          <div className="container relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
                {t('featuredTestimonials.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
                {t('featuredTestimonials.title')}
              </h2>
              <p className="text-base md:text-lg text-[var(--color-secondary)] max-w-2xl mx-auto leading-relaxed">
                {t('featuredTestimonials.subtitle')}
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial, index) => {
                const hasVideo = testimonial.videoUrl || testimonial.videoFile?.asset?.url
                const videoUrl = testimonial.videoUrl || testimonial.videoFile?.asset?.url

                return (
                  <div
                    key={testimonial._id}
                    className="group bg-[#faf8f5] rounded-3xl p-6 md:p-8 relative
                      border border-transparent hover:border-[var(--color-accent)]
                      transition-all duration-500 ease-out
                      hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
                      animate-[fadeInUp_0.6s_ease-out_both] flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Video Thumbnail (if video testimonial) */}
                    {hasVideo && (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-[var(--color-accent-light)]">
                        {testimonial.patientPhoto?.asset?.url ? (
                          <Image
                            fill
                            alt={testimonial.patientPhoto.alt || testimonial.patientName}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={urlFor(testimonial.patientPhoto).width(400).height(225).quality(80).url()}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-accent)]">
                            <Quote className="w-12 h-12 text-[var(--color-primary)] opacity-20" strokeWidth={1} />
                          </div>
                        )}
                        {/* Play Button Overlay */}
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg
                            group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                            <Play className="w-7 h-7 text-[var(--color-primary)] ml-1" fill="currentColor" />
                          </div>
                        </a>
                        {/* Video Badge */}
                        <span className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 rounded-full text-xs font-semibold text-[var(--color-primary)] shadow-sm">
                          {t('featuredTestimonials.videoTestimonial')}
                        </span>
                      </div>
                    )}

                    {/* Quote Icon for text-only testimonials */}
                    {!hasVideo && (
                      <div className="mb-5">
                        <Quote className="w-10 h-10 text-[var(--color-accent)] opacity-60" strokeWidth={1.5} />
                      </div>
                    )}

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 transition-colors ${
                            i < testimonial.rating
                              ? 'text-[var(--color-warning)] fill-[var(--color-warning)]'
                              : 'text-[var(--color-border)]'
                          }`}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    {testimonial.text && (
                      <blockquote className="mb-6 flex-grow">
                        <p className="text-[var(--color-primary)] leading-relaxed line-clamp-4">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                      </blockquote>
                    )}

                    {/* Patient Info */}
                    <div className="flex items-center gap-4 pt-5 border-t border-[var(--color-border-light)] mt-auto">
                      {!hasVideo && testimonial.patientPhoto?.asset?.url ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--color-accent-light)]">
                          <Image
                            fill
                            alt={testimonial.patientPhoto.alt || testimonial.patientName}
                            className="object-cover"
                            sizes="48px"
                            src={urlFor(testimonial.patientPhoto).width(48).height(48).quality(80).url()}
                          />
                        </div>
                      ) : !hasVideo ? (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-accent)] flex items-center justify-center ring-2 ring-[var(--color-accent-light)]">
                          <span className="text-lg font-semibold text-[var(--color-primary)]">
                            {testimonial.patientName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      ) : null}
                      <div>
                        <p className="font-semibold text-[var(--color-primary)]">{testimonial.patientName}</p>
                        {testimonial.service && (
                          <p className="text-sm text-[var(--color-secondary)]">
                            {testimonial.service.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link
                href="/testimoniale"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-white
                  rounded-full font-medium text-lg
                  hover:bg-[var(--color-primary)]/90 hover:shadow-[0_10px_40px_-10px_rgba(26,26,26,0.4)]
                  transition-all duration-300"
              >
                {t('featuredTestimonials.viewAll')}
                <svg
                  className="w-5 h-5"
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
      )}

      {/* Google Reviews Section - Dynamic from JSON */}
      <section className={`py-16 md:py-24 relative overflow-hidden ${hasSanityTestimonials ? 'bg-white' : 'bg-[#f5f0e8]'}`}>
        <div className="container relative z-10">
          {/* Section header with Google rating */}
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
              {t('testimonials.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
              {t('testimonials.title')}
            </h2>
            {/* Google rating summary */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                ))}
              </div>
              <span className="font-bold text-lg text-[var(--color-primary)]">{googleReviews.rating}</span>
              <span className="text-[var(--color-secondary)]">({googleReviews.totalReviews} {t('testimonials.reviewsOnGoogle')})</span>
            </div>
          </div>

          {/* Google Reviews Slider */}
          <GoogleReviewsSlider reviews={googleReviews.reviews} locale={locale} />

          {/* Link to all Google reviews */}
          <div className="mt-10 text-center">
            <a
              href="https://www.google.com/maps/place/DENTCRAFT/@47.7897,22.8747,17z/data=!4m8!3m7!1s0x4738059c49336e2f:0xc5f8c1c74c29f519!8m2!3d47.7897!4d22.8747!9m1!1b1!16s%2Fg%2F11j20h5jw3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-[var(--color-border)] rounded-full hover:shadow-md transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-semibold text-[var(--color-primary)]">{t('testimonials.viewAllOnGoogle')}</span>
            </a>
          </div>
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
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full mb-6">
                {t('galleryPreview.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
                {t('galleryPreview.title')}
              </h2>
              <p className="text-base md:text-lg text-[var(--color-secondary)] max-w-2xl mx-auto leading-relaxed">
                {t('galleryPreview.subtitle')}
              </p>
            </div>

            {/* Before/After Gallery Grid */}
            <BeforeAfterGalleryPreview
              afterLabel={t('gallery.after')}
              beforeLabel={t('gallery.before')}
              cases={beforeAfterCases}
              durationLabel={t('gallery.duration')}
            />

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link
                href="/galerie"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-white
                  rounded-full font-medium text-lg
                  hover:bg-[var(--color-primary)]/90 hover:shadow-[0_10px_40px_-10px_rgba(26,26,26,0.4)]
                  transition-all duration-300"
              >
                {t('galleryPreview.viewAll')}
                <svg
                  className="w-5 h-5"
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
      )}

    </div>
  )
}
