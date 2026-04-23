import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Award,
  BookOpen,
  Camera,
  GraduationCap,
  Phone,
  User,
  Calendar,
  MapPin,
  Sparkles,
  Play,
  Video,
  ChevronRight,
} from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getTeamMemberBySlug, getTeamMemberSlugs, type Locale } from '@/lib/sanity/queries'
import { generateDynamicPageMetadata, siteConfig, type Locale as SEOLocale } from '@/lib/seo'
import { getBreadcrumbSchema, getPersonSchema } from '@/lib/schema'
import { fallbackTeamMembers, type FallbackTeamMember } from '@/lib/fallback-team'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CountUp } from '@/components/ui/CountUp'
import { TeamMemberBookingButton } from '@/components/ui/TeamMemberBookingButton'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

// Team member type based on Sanity schema
type TeamMember = {
  _id: string
  name: string
  slug: string
  role: string | null
  specializations: Array<{ name: string }> | null
  photo: {
    asset: { _ref: string }
    alt?: string
  } | null
  bio: Array<{ _type: string; [key: string]: unknown }> | null
  education: Array<{
    institution: string
    degree: string
    year: number
  }> | null
  certifications: Array<{
    name: string
    issuer: string
    year: number
  }> | null
  services: Array<{
    _id: string
    title: string
    slug: string
  }> | null
  seo: {
    metaTitle: string | null
    metaDescription: string | null
    ogImage: { asset: { _ref: string } } | null
    noIndex: boolean
  } | null
}

// Generate static paths for all team members in all locales
export async function generateStaticParams() {
  const teamMemberSlugs = await getTeamMemberSlugs()

  // Combine Sanity slugs with fallback slugs
  const allSlugs = new Set<string>([
    ...teamMemberSlugs.map((item) => item.slug),
    ...fallbackTeamMembers.map((member) => member.slug),
  ])

  return routing.locales.flatMap((locale) =>
    Array.from(allSlugs).map((slug) => ({
      locale,
      slug,
    }))
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const member = await getTeamMemberBySlug(slug, locale as Locale) as TeamMember | null

  // Try to find fallback member if Sanity returns null
  const fallbackMember = !member
    ? fallbackTeamMembers.find((m) => m.slug === slug)
    : null

  if (!member && !fallbackMember) {
    return {}
  }

  // Build options object conditionally to avoid undefined values (exactOptionalPropertyTypes)
  const metadataOptions: Parameters<typeof generateDynamicPageMetadata>[0] = {
    title: member?.name ?? fallbackMember?.name ?? '',
    locale: locale as SEOLocale,
    path: '/echipa/[slug]',
    slug,
    seo: member?.seo ?? null,
    imageUrlBuilder: (img) => urlFor(img).width(1200).height(630).url(),
  }

  const role = member?.role ?? fallbackMember?.role
  if (role) {
    metadataOptions.description = role
  }

  if (member?.photo) {
    metadataOptions.fallbackImage = urlFor(member.photo).width(1200).height(630).url()
  }

  return generateDynamicPageMetadata(metadataOptions)
}

export default async function TeamMemberPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const member = await getTeamMemberBySlug(slug, locale as Locale) as TeamMember | null

  // Try to find fallback member if Sanity returns null
  if (!member) {
    const fallbackMember = fallbackTeamMembers.find((m) => m.slug === slug)
    if (fallbackMember) {
      return <FallbackTeamMemberPageContent member={fallbackMember} />
    }
    notFound()
  }

  return <TeamMemberPageContent member={member} />
}

// ─── Shared UI Components ────────────────────────────────────────────────────

function HeroBreadcrumb({ name }: { name: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-[13px] mb-8 md:mb-8">
      <Link href="/" className="text-white/35 hover:text-white/60 transition-colors">
        Acasa
      </Link>
      <ChevronRight className="w-3 h-3 text-white/15" />
      <Link href="/echipa" className="text-white/35 hover:text-white/60 transition-colors">
        Echipa
      </Link>
      <ChevronRight className="w-3 h-3 text-white/15" />
      <span className="text-[#d4c4b0]/80">{name}</span>
    </nav>
  )
}

function HeroBackground() {
  return (
    <>
      {/* Dramatic warm lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8b7355]/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#d4c4b0]/5 rounded-full blur-[80px]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
    </>
  )
}

function SpecBadge({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 text-sm bg-white/[0.06] backdrop-blur-sm text-[#d4c4b0] rounded-full border border-white/[0.08] font-medium">
      {label}
    </span>
  )
}

function HeroInfoRow() {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-5 mb-8 text-sm text-white/50">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#d4c4b0]" />
        <span>Satu Mare</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-[#d4c4b0]" />
        <span>L-V: 10:00 - 18:00</span>
      </div>
    </div>
  )
}

function HeroCTAButtons({ memberName, memberRole }: { memberName: string; memberRole: string | null }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      <TeamMemberBookingButton
        memberName={memberName}
        memberRole={memberRole}
        variant="hero"
      />
      <a
        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-full font-semibold text-lg border-2 border-white/20 hover:border-[#d4c4b0]/50 hover:bg-white/5 transition-all duration-300"
        href="tel:+40741199977"
      >
        <Phone className="w-5 h-5" strokeWidth={2} />
        0741 199 977
      </a>
    </div>
  )
}

// Placeholder for video shorts - will be populated later
const videoShorts: Array<{ title: string; youtubeUrl: string }> = []

function VideoShortsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#faf6f1]">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up">
            {/* Section header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8b7355] bg-white rounded-full border border-[#e8e0d5] mb-6">
                <Video className="w-4 h-4" />
                Video
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-4">
                Videoclipuri scurte
              </h2>
              <p className="text-[#8b7355] text-lg max-w-xl mx-auto">
                Urmareste clipuri informative si educative
              </p>
            </div>
          </ScrollReveal>

          {videoShorts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {videoShorts.map((video, index) => {
                // Extract YouTube video ID for thumbnail
                const videoId = video.youtubeUrl.match(
                  /(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?v=))([^&?/]+)/
                )?.[1]
                return (
                  <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.2)] transition-all duration-300 hover:-translate-y-1.5">
                        {videoId && (
                          <Image
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 text-[#2a2118] ml-0.5" fill="#2a2118" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-medium text-[#2a2118] line-clamp-2 group-hover:text-[#8b7355] transition-colors">
                        {video.title}
                      </p>
                    </a>
                  </ScrollReveal>
                )
              })}
            </div>
          ) : (
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="text-center py-12 bg-white rounded-3xl border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]">
                <div className="w-16 h-16 rounded-2xl bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center mx-auto mb-5">
                  <Video className="w-8 h-8 text-[#d4c4b0]" />
                </div>
                <p className="text-[#8b7355] text-lg font-medium mb-2">
                  Videoclipurile vor fi disponibile in curand
                </p>
                <p className="text-[#a89880] text-sm">
                  Revino pentru continut video educativ si informativ
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Shared About & Timeline Components ──────────────────────────────────────

type TimelineEntry = {
  type: 'education' | 'certification'
  title: string
  subtitle: string
  year: number
}

function StatsRow({
  isDoctor,
  yearsExperience,
  specializationsCount,
  patientsCount,
}: {
  isDoctor: boolean
  yearsExperience: number
  specializationsCount: number
  patientsCount?: number
}) {
  const stats = isDoctor
    ? [
        { end: yearsExperience, suffix: '+', label: 'Ani Experienta', iconSrc: '/icons/097-calendar.svg' },
        { end: patientsCount ?? 2000, suffix: '+', label: 'Pacienti Tratati', iconSrc: '/icons/010-smile.svg' },
        { end: specializationsCount, suffix: '', label: 'Specializari', iconSrc: '/icons/090-book.svg' },
      ]
    : [
        { end: yearsExperience, suffix: '+', label: 'Ani Experienta', iconSrc: '/icons/097-calendar.svg' },
        { end: specializationsCount, suffix: '', label: 'Specializari', iconSrc: '/icons/090-book.svg' },
      ]

  const gridColsClass = isDoctor ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <div className={`grid ${gridColsClass} gap-3 md:gap-4 mb-8`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-2xl md:rounded-3xl border border-[#e8e0d5] px-3 py-5 md:px-6 md:py-7 text-center overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)] hover:border-[#d4c4b0] hover:-translate-y-1.5 transition-all duration-500"
        >
          {/* Warm radial glow — fades in on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#faf6f1] blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700"
          />
          {/* Subtle grid pattern — barely visible, adds depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500"
            style={{
              backgroundImage: `linear-gradient(rgba(139,115,85,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,1) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative">
            {/* Icon chip with gradient bg */}
            <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] mb-3 md:mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-500 ease-out">
              <span
                aria-hidden="true"
                className="block w-5 h-5 md:w-6 md:h-6 bg-[#8b7355]"
                style={{
                  maskImage: `url(${stat.iconSrc})`,
                  WebkitMaskImage: `url(${stat.iconSrc})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>

            {/* Animated number */}
            <div className="text-3xl md:text-5xl font-bold text-[#2a2118] leading-none mb-1.5 md:mb-2 tracking-tight tabular-nums">
              <CountUp end={stat.end} suffix={stat.suffix} duration={2000 + index * 200} />
            </div>

            {/* Label */}
            <p className="text-[11px] md:text-xs font-semibold text-[#8b7355] uppercase tracking-[0.06em] md:tracking-[0.12em] leading-tight">
              {stat.label}
            </p>

            {/* Accent bar — grows on hover */}
            <div className="mx-auto mt-3 md:mt-4 h-0.5 w-8 bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent group-hover:w-16 md:group-hover:w-20 transition-all duration-500 ease-out" />
          </div>
        </div>
      ))}
    </div>
  )
}

function PhotoGalleryPlaceholder() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-2xl bg-[#f5f0e8] border border-[#e8e0d5] flex flex-col items-center justify-center gap-2 hover:bg-[#efe8dd] transition-colors duration-300"
          >
            <Camera className="w-6 h-6 text-[#d4c4b0]" strokeWidth={1.5} />
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-[#a89880] mt-4 font-medium">
        Galerie foto in curand
      </p>
    </div>
  )
}

function PhotoGallery({ images }: { images: Array<{ src: string; alt: string; position?: 'top' | 'center' | 'bottom' }> }) {
  const gridCols = images.length === 1
    ? 'grid-cols-1'
    : images.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-2 md:grid-cols-3'
  return (
    <div className="mt-8">
      <div className={`grid ${gridCols} gap-4`}>
        {images.map((image, index) => {
          const positionClass = image.position === 'top'
            ? 'object-top'
            : image.position === 'bottom'
              ? 'object-bottom'
              : 'object-center'
          return (
            <div
              key={index}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#e8e0d5] bg-[#f5f0e8] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.2)] hover:border-[#d4c4b0] hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover ${positionClass} group-hover:scale-105 transition-transform duration-500`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AboutSection({
  firstName,
  aboutLabel,
  isDoctor,
  yearsExperience,
  specializationsCount,
  patientsCount,
  bioContent,
  gallery,
}: {
  firstName: string
  aboutLabel: string
  isDoctor: boolean
  yearsExperience: number
  specializationsCount: number
  patientsCount?: number
  bioContent: React.ReactNode
  gallery?: Array<{ src: string; alt: string }>
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                <BookOpen className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2a2118]">{aboutLabel}</h2>
                <p className="text-sm text-[#8b7355]">Despre {firstName}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal animation="fade-up" delay={100}>
            <StatsRow
              isDoctor={isDoctor}
              yearsExperience={yearsExperience}
              specializationsCount={specializationsCount}
              {...(patientsCount !== undefined ? { patientsCount } : {})}
            />
          </ScrollReveal>

          {/* Bio content */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-10 border border-[#e8e0d5]">
              {bioContent}
            </div>
          </ScrollReveal>

          {/* Photo gallery */}
          <ScrollReveal animation="fade-up" delay={300}>
            {gallery && gallery.length > 0 ? (
              <PhotoGallery images={gallery} />
            ) : (
              <PhotoGalleryPlaceholder />
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function ProfessionalJourneySection({
  entries,
}: {
  entries: TimelineEntry[]
}) {
  // Sort by year, newest first
  const sorted = [...entries].sort((a, b) => b.year - a.year)

  if (sorted.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] to-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8b7355] bg-white rounded-full border border-[#e8e0d5] mb-6">
                <GraduationCap className="w-4 h-4" />
                Educatie & Certificari
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-3">
                Parcurs Profesional
              </h2>
              <p className="text-[#8b7355] text-lg max-w-xl mx-auto">
                Studii, specializari si certificari profesionale
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[39px] md:left-[47px] top-6 bottom-6 w-px bg-[#e8e0d5]" />

            <div className="space-y-5">
              {sorted.map((entry, index) => {
                const Icon = entry.type === 'education' ? GraduationCap : Award
                const typeBadgeLabel = entry.type === 'education' ? 'Studii' : 'Certificare'
                const typeBadgeBg = entry.type === 'education' ? 'bg-[#f5f0e8]' : 'bg-[#faf6f1]'

                return (
                  <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                    <div className="flex gap-4 md:gap-6 items-start">
                      {/* Year pill + timeline dot */}
                      <div className="flex flex-col items-center shrink-0 z-10">
                        <span className="rounded-full bg-[#faf6f1] border border-[#e8e0d5] px-3 py-1.5 md:px-4 md:py-2 text-sm font-bold text-[#8b7355] whitespace-nowrap shadow-sm">
                          {entry.year}
                        </span>
                      </div>

                      {/* Entry card */}
                      <div className="flex-1 group bg-white rounded-2xl border border-[#e8e0d5] p-5 hover:shadow-[0_10px_30px_-8px_rgba(139,115,85,0.12)] hover:border-[#d4c4b0] transition-all duration-300">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Type badge */}
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#8b7355] ${typeBadgeBg} rounded-full border border-[#e8e0d5] mb-2.5`}>
                              <Icon className="w-3 h-3" />
                              {typeBadgeLabel}
                            </span>

                            <h4 className="text-base md:text-lg font-semibold text-[#2a2118] mb-1.5 group-hover:text-[#8b7355] transition-colors leading-snug">
                              {entry.title}
                            </h4>
                            <p className="text-sm text-[#8b7355]/80 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0] shrink-0" />
                              {entry.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper to compute years of experience from earliest education year
function computeYearsExperience(
  education: Array<{ year: number }> | null,
  certifications: Array<{ year: number }> | null
): number {
  const years: number[] = []
  if (education) years.push(...education.map((e) => e.year))
  if (certifications) years.push(...certifications.map((c) => c.year))
  if (years.length === 0) return 5
  const earliest = Math.min(...years)
  return Math.max(1, new Date().getFullYear() - earliest)
}

// Helper to build timeline entries from education + certifications
function buildTimelineEntries(
  education: Array<{ institution: string; degree: string; year: number }> | null,
  certifications: Array<{ name: string; issuer: string; year: number }> | null
): TimelineEntry[] {
  const entries: TimelineEntry[] = []
  if (education) {
    for (const edu of education) {
      entries.push({
        type: 'education',
        title: edu.degree,
        subtitle: edu.institution,
        year: edu.year,
      })
    }
  }
  if (certifications) {
    for (const cert of certifications) {
      entries.push({
        type: 'certification',
        title: cert.name,
        subtitle: cert.issuer,
        year: cert.year,
      })
    }
  }
  return entries
}

// ─── Sanity Team Member Page ─────────────────────────────────────────────────

async function TeamMemberPageContent({ member }: { member: TeamMember }) {
  const t = await getTranslations()

  const firstName = member.name.split(' ').pop() || member.name.split(' ')[0] || member.name
  const memberUrl = `${siteConfig.baseUrl}/echipa/${member.slug}`
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Dentcraft', url: siteConfig.baseUrl },
    { name: t('navigation.team'), url: `${siteConfig.baseUrl}/echipa` },
    { name: member.name, url: memberUrl },
  ])
  const photoUrl = member.photo?.asset ? urlFor(member.photo).width(400).height(400).url() : undefined
  const personSchema = getPersonSchema({
    name: member.name,
    url: memberUrl,
    jobTitle: member.role || 'Medic Stomatolog',
    ...(photoUrl ? { image: photoUrl } : {}),
    ...(member.specializations ? { knowsAbout: member.specializations.map((s) => s.name) } : {}),
    ...(member.education ? { alumniOf: member.education.map((e) => e.institution) } : {}),
  })

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* ───── HERO SECTION - Dark Editorial ───── */}
      <section className="relative bg-[#0d0d0d] pt-5 md:pt-[80px] pb-8">
        <HeroBackground />

        <div className="container relative z-10">
          <HeroBreadcrumb name={member.name} />

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Content - on mobile appears FIRST, on desktop on left */}
            <div className="text-center lg:text-left">
              <ScrollReveal animation="fade-up" delay={150}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight leading-[1.1]">
                  {(() => {
                    const parts = member.name.split(' ')
                    if (parts.length <= 2) return member.name
                    const mid = Math.ceil(parts.length / 2)
                    return <>{parts.slice(0, mid).join(' ')}<br />{parts.slice(mid).join(' ')}</>
                  })()}
                </h1>

                {member.role && (
                  <p className="text-lg md:text-xl font-medium text-[#d4c4b0] mb-5">
                    {member.role}
                  </p>
                )}
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300}>
                {/* Specializations */}
                {member.specializations && member.specializations.length > 0 && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                    {member.specializations.map((spec, index) => (
                      <SpecBadge key={index} label={spec.name} />
                    ))}
                  </div>
                )}

                <HeroInfoRow />
                <HeroCTAButtons memberName={member.name} memberRole={member.role} />
              </ScrollReveal>
            </div>

            {/* Photo - on mobile appears AFTER text, on desktop on right */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[260px] md:w-[300px] lg:w-[360px] team-photo-entrance">
                {/* Warm glow behind photo */}
                <div className="absolute -inset-4 lg:-inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_rgba(212,196,176,0.2)_0%,_transparent_70%)] team-photo-glow pointer-events-none" />

                <div className="relative aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden border border-[#d4c4b0]/20 shadow-[0_20px_60px_-15px_rgba(139,115,85,0.15)]">
                  {member.photo ? (
                    <Image
                      fill
                      priority
                      alt={member.photo.alt || member.name}
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 420px"
                      src={urlFor(member.photo).width(600).height(800).auto('format').url()}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a1510]">
                      <div className="w-24 h-24 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <User className="w-12 h-12 text-white/30" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating expert badge */}
                <div className="absolute -bottom-3 left-3 sm:-bottom-4 sm:left-4 bg-white rounded-xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)] p-3 team-badge-pop">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4c4b0] to-[#b8a48e] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">Expert</p>
                      <p className="text-[11px] text-[#8b7355]">Verificat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── VIDEO SHORTS SECTION ───── */}
      <VideoShortsSection />

      {/* ───── ABOUT SECTION (Redesigned) ───── */}
      {member.bio && member.bio.length > 0 && (
        <AboutSection
          firstName={firstName}
          aboutLabel={t('team.about')}
          isDoctor={member.role?.toLowerCase().includes('medic') || member.role?.toLowerCase().includes('doctor') || false}
          yearsExperience={computeYearsExperience(member.education, member.certifications)}
          specializationsCount={member.specializations?.length ?? 0}
          bioContent={
            <div className="prose prose-lg prose-neutral max-w-none">
              <PortableTextRenderer content={member.bio} />
            </div>
          }
        />
      )}

      {/* ───── PROFESSIONAL JOURNEY (Education + Certifications Timeline) ───── */}
      <ProfessionalJourneySection
        entries={buildTimelineEntries(member.education, member.certifications)}
      />

      {/* ───── SERVICES SECTION ───── */}
      {member.services && member.services.length > 0 && (
        <section className="py-16 md:py-24 bg-[#faf6f1]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal animation="fade-up">
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8b7355] bg-white rounded-full border border-[#e8e0d5] mb-6">
                    <Sparkles className="w-4 h-4" />
                    Servicii
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] mb-3">{t('team.servicesOffered')}</h2>
                  <p className="text-[#8b7355]">Servicii oferite de {firstName}</p>
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {member.services.map((service, index) => (
                  <ScrollReveal key={service._id} animation="fade-up" delay={index * 80}>
                    <Link
                      className="group bg-white rounded-2xl p-6 border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.15)] hover:border-[#d4c4b0] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
                      href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                    >
                      <h4 className="font-semibold text-[#2a2118] group-hover:text-[#8b7355] transition-colors">
                        {service.title}
                      </h4>
                      <span className="w-10 h-10 rounded-full bg-[#faf6f1] border border-[#e8e0d5] group-hover:bg-[#2a2118] group-hover:border-[#2a2118] flex items-center justify-center transition-all duration-300 shrink-0 ml-4">
                        <ArrowRight className="w-5 h-5 text-[#8b7355] group-hover:text-white transition-colors" strokeWidth={2} />
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

// Simple Portable Text Renderer for bio content
function PortableTextRenderer({ content }: { content: Array<{ _type: string; [key: string]: unknown }> }) {
  return (
    <div className="space-y-4 text-[#4a4a4a] leading-relaxed">
      {content.map((block, index) => {
        if (block._type === 'block') {
          const style = (block['style'] as string) || 'normal'
          const children = block['children'] as Array<{ text: string; marks?: string[] }> | undefined
          const text = children?.map((child) => child.text).join('') || ''

          if (style === 'h2') {
            return <h2 key={index} className="!mt-8 text-2xl font-bold text-[#2a2118]">{text}</h2>
          }
          if (style === 'h3') {
            return <h3 key={index} className="!mt-6 text-xl font-semibold text-[#2a2118]">{text}</h3>
          }
          if (style === 'h4') {
            return <h4 key={index} className="!mt-4 text-lg font-semibold text-[#2a2118]">{text}</h4>
          }
          if (style === 'blockquote') {
            return (
              <blockquote key={index} className="border-l-4 border-[#d4c4b0] pl-6 italic text-[#8b7355] my-6">
                {text}
              </blockquote>
            )
          }
          return <p key={index} className="text-base md:text-lg">{text}</p>
        }
        return null
      })}
    </div>
  )
}

// ─── Fallback Team Member Page ───────────────────────────────────────────────

async function FallbackTeamMemberPageContent({ member }: { member: FallbackTeamMember }) {
  const t = await getTranslations()

  const firstName = member.name.split(' ').pop() || member.name.split(' ')[0] || member.name
  const memberUrl = `${siteConfig.baseUrl}/echipa/${member.slug}`
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Dentcraft', url: siteConfig.baseUrl },
    { name: t('navigation.team'), url: `${siteConfig.baseUrl}/echipa` },
    { name: member.name, url: memberUrl },
  ])
  const fallbackPhotoUrl = member.photo ? (member.photo.startsWith('http') ? member.photo : `${siteConfig.baseUrl}${member.photo}`) : undefined
  const personSchema = getPersonSchema({
    name: member.name,
    url: memberUrl,
    jobTitle: member.role,
    description: member.bio,
    ...(fallbackPhotoUrl ? { image: fallbackPhotoUrl } : {}),
    knowsAbout: member.specializations,
    alumniOf: member.education.map((e) => e.institution),
  })

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* ───── HERO SECTION - Dark Editorial ───── */}
      <section className="relative bg-[#0d0d0d] pt-5 md:pt-[80px] pb-8">
        <HeroBackground />

        <div className="container relative z-10">
          <HeroBreadcrumb name={member.name} />

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Content - on mobile appears FIRST, on desktop on left */}
            <div className="text-center lg:text-left">
              <ScrollReveal animation="fade-up" delay={150}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight leading-[1.1]">
                  {(() => {
                    const parts = member.name.split(' ')
                    if (parts.length <= 2) return member.name
                    const mid = Math.ceil(parts.length / 2)
                    return <>{parts.slice(0, mid).join(' ')}<br />{parts.slice(mid).join(' ')}</>
                  })()}
                </h1>

                <p className="text-lg md:text-xl font-medium text-[#d4c4b0] mb-5">
                  {member.role}
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300}>
                {/* Specializations */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {member.specializations.map((spec, index) => (
                    <SpecBadge key={index} label={spec} />
                  ))}
                </div>

                <HeroInfoRow />
                <HeroCTAButtons memberName={member.name} memberRole={member.role} />
              </ScrollReveal>
            </div>

            {/* Photo - on mobile appears AFTER text, on desktop on right */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[260px] md:w-[300px] lg:w-[360px] team-photo-entrance">
                {/* Warm glow behind photo */}
                <div className="absolute -inset-4 lg:-inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_rgba(212,196,176,0.2)_0%,_transparent_70%)] team-photo-glow pointer-events-none" />

                <div className="relative aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden border border-[#d4c4b0]/20 shadow-[0_20px_60px_-15px_rgba(139,115,85,0.15)]">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 420px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a1510]">
                      <div className="w-24 h-24 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <User className="w-12 h-12 text-white/30" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating expert badge */}
                <div className="absolute -bottom-3 left-3 sm:-bottom-4 sm:left-4 bg-white rounded-xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)] p-3 team-badge-pop">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4c4b0] to-[#b8a48e] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">Expert</p>
                      <p className="text-[11px] text-[#8b7355]">Verificat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── VIDEO SHORTS SECTION ───── */}
      <VideoShortsSection />

      {/* ───── ABOUT SECTION (Redesigned) ───── */}
      <AboutSection
        firstName={firstName}
        aboutLabel={t('team.about')}
        isDoctor={member.role.toLowerCase().includes('medic') || member.role.toLowerCase().includes('doctor')}
        yearsExperience={member.stats?.yearsExperience ?? computeYearsExperience(member.education, member.certifications)}
        specializationsCount={member.specializations.length}
        bioContent={
          <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed">{member.bio}</p>
        }
        {...(member.stats?.patientsCount !== undefined ? { patientsCount: member.stats.patientsCount } : {})}
        {...(member.gallery && member.gallery.length > 0 ? { gallery: member.gallery } : {})}
      />

      {/* ───── PROFESSIONAL JOURNEY (Education + Certifications Timeline) ───── */}
      <ProfessionalJourneySection
        entries={buildTimelineEntries(member.education, member.certifications)}
      />

    </div>
  )
}
