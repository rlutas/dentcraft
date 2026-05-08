import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Award,
  Camera,
  GraduationCap,
  Video,
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
import { TeamMemberHero } from '@/components/sections/TeamMemberHero'
import { splitName, getDoctorVideoForSlug, getMemberBadge, shortBio } from '@/lib/team-utils'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { DoctorVideoCard } from '@/components/sections/DoctorVideoCard'

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

type DoctorVideoState =
  | { kind: 'video'; videoId: string; doctorName: string; doctorRole: string; posterSrc?: string }
  | { kind: 'comingSoon'; doctorName: string; doctorRole: string; posterSrc?: string }
  | null

async function VideoShortsSection({ video }: { video: DoctorVideoState }) {
  if (!video) return null
  const t = await getTranslations('team.profile')
  const firstName = video.doctorName.split(' ').slice(-1)[0] || video.doctorName

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <AnimatedServiceHeading bold={t('videoTipsBold')} italic={t('videoTipsItalic')} />
            <p className="text-base md:text-lg text-[#5a5048] max-w-xl mx-auto leading-relaxed mt-4">
              {video.kind === 'video'
                ? t('videoTipsCopy', { firstName })
                : t('videoComingSoonCopy', { firstName })}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="max-w-md mx-auto">
            {video.kind === 'video' ? (
              <DoctorVideoCard
                videoId={video.videoId}
                posterSrc={video.posterSrc || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                posterAlt={t('videoClipAlt', { name: video.doctorName })}
                doctorName={video.doctorName}
                doctorRole={video.doctorRole}
              />
            ) : (
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60 border border-[#e8e0d5] shadow-[0_20px_50px_-15px_rgba(139,115,85,0.2)]">
                {video.posterSrc && (
                  <Image
                    src={video.posterSrc}
                    alt={video.doctorName}
                    fill
                    sizes="(max-width: 640px) 100vw, 420px"
                    className="object-cover object-top"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/85 via-[#2a2118]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                    <Video className="w-8 h-8 text-[#8b7355]" strokeWidth={1.75} />
                  </div>
                  <p className="text-white text-lg md:text-xl font-bold mb-1">{t('videoComingSoonHeadline')}</p>
                  <p className="text-white/80 text-sm">{t('videoComingSoonShort', { firstName })}</p>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-center">
                  <p className="text-white font-bold text-base leading-tight">{video.doctorName}</p>
                  <p className="text-white/70 text-xs mt-0.5">{video.doctorRole}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
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

async function StatsRow({
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
  const t = await getTranslations('team.profile')
  const stats = isDoctor
    ? [
        { end: yearsExperience, suffix: '+', label: t('statYears'), iconSrc: '/icons/097-calendar.svg' },
        { end: patientsCount ?? 2000, suffix: '+', label: t('statPatients'), iconSrc: '/icons/010-smile.svg' },
        { end: specializationsCount, suffix: '', label: t('statSpecializations'), iconSrc: '/icons/090-book.svg' },
      ]
    : [
        { end: yearsExperience, suffix: '+', label: t('statYears'), iconSrc: '/icons/097-calendar.svg' },
        { end: specializationsCount, suffix: '', label: t('statSpecializations'), iconSrc: '/icons/090-book.svg' },
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

async function PhotoGalleryPlaceholder() {
  const t = await getTranslations('team.profile')
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
        {t('galleryComingSoon')}
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

async function AboutSection({
  firstName,
  isDoctor,
  yearsExperience,
  specializationsCount,
  patientsCount,
  bioContent,
  gallery,
}: {
  firstName: string
  isDoctor: boolean
  yearsExperience: number
  specializationsCount: number
  patientsCount?: number
  bioContent: React.ReactNode
  gallery?: Array<{ src: string; alt: string }>
}) {
  const t = await getTranslations('team.profile')
  return (
    <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4c4b0]/12 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
              <AnimatedServiceHeading bold={t('aboutBold')} italic={firstName} />
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
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#e8e0d5] shadow-[0_8px_32px_-8px_rgba(139,115,85,0.1)]">
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

async function ProfessionalJourneySection({
  entries,
}: {
  entries: TimelineEntry[]
}) {
  // Sort by year, newest first
  const sorted = [...entries].sort((a, b) => b.year - a.year)

  if (sorted.length === 0) return null

  const t = await getTranslations('team.profile')

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
              <AnimatedServiceHeading bold={t('journeyBold')} italic={t('journeyItalic')} />
              <p className="text-base md:text-lg text-[#5a5048] max-w-xl mx-auto leading-relaxed mt-4">
                {t('journeyCopy')}
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
                const typeBadgeLabel = entry.type === 'education' ? t('typeBadgeEducation') : t('typeBadgeCertification')
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
  const badgeT = await getTranslations('team.badges')
  const profileT = await getTranslations('team.profile')

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
    jobTitle: member.role || profileT('defaultJobTitle'),
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
      <TeamMemberHero
        breadcrumbs={[
          { label: t('breadcrumbs.home'), href: '/' },
          { label: t('breadcrumbs.team'), href: '/echipa' },
          { label: member.name },
        ]}
        nameBold={splitName(member.name).bold}
        nameItalic={splitName(member.name).italic}
        role={member.role}
        specializations={(member.specializations ?? []).map((s) => s.name)}
        ctaPrimary={t('common.bookAppointment')}
        photoSrc={member.photo ? urlFor(member.photo).width(800).height(1000).auto('format').url() : null}
        photoAlt={member.photo?.alt || member.name}
        photoBadge={getMemberBadge(member.name, member.role || '', badgeT)}
      />

      {/* ───── VIDEO SHORTS SECTION ───── */}
      {member.name.trim().toLowerCase().startsWith('dr.') ? (
        <>
          <VideoShortsSection video={getDoctorVideoForSlug(member.slug, member.name, member.role || profileT('defaultJobTitle'))} />

          {/* ───── ABOUT SECTION (Redesigned) ───── */}
          {member.bio && member.bio.length > 0 && (
            <AboutSection
              firstName={firstName}
              isDoctor
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
        </>
      ) : (
        member.bio && member.bio.length > 0 && (
          <SimpleStaffBio
            firstName={firstName}
            bio={member.bio
              .filter((b) => b._type === 'block')
              .map((b) => {
                const children = b['children'] as Array<{ text: string }> | undefined
                return children?.map((c) => c.text).join('') || ''
              })
              .join(' ')}
          />
        )
      )}

      {/* ───── SERVICES SECTION ───── */}
      {member.services && member.services.length > 0 && (
        <section className="py-20 md:py-28 bg-[#faf6f1] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4c4b0]/12 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal animation="fade-up">
                <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
                  <AnimatedServiceHeading bold={profileT('worksWithBold')} italic={firstName} />
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

// Simple white bio section used for assistants & receptionists (no stats / timeline)
async function SimpleStaffBio({ firstName, bio }: { firstName: string; bio: string }) {
  if (!bio) return null
  const t = await getTranslations('team.profile')
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4c4b0]/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <AnimatedServiceHeading bold={t('aboutBold')} italic={firstName} />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-[#faf6f1] rounded-3xl p-8 md:p-12 border border-[#e8e0d5]">
              <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed text-center md:text-left">{bio}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── Fallback Team Member Page ───────────────────────────────────────────────

async function FallbackTeamMemberPageContent({ member }: { member: FallbackTeamMember }) {
  const t = await getTranslations()
  const badgeT = await getTranslations('team.badges')

  const firstName = member.name.split(' ').pop() || member.name.split(' ')[0] || member.name
  const memberUrl = `${siteConfig.baseUrl}/echipa/${member.slug}`
  const isDoctor = member.name.trim().toLowerCase().startsWith('dr.')
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
      <TeamMemberHero
        breadcrumbs={[
          { label: t('breadcrumbs.home'), href: '/' },
          { label: t('breadcrumbs.team'), href: '/echipa' },
          { label: member.name },
        ]}
        nameBold={splitName(member.name).bold}
        nameItalic={splitName(member.name).italic}
        role={member.role}
        bio={shortBio(member.bio)}
        specializations={member.specializations}
        ctaPrimary={t('common.bookAppointment')}
        photoSrc={member.photo ?? null}
        photoAlt={member.name}
        photoBadge={getMemberBadge(member.name, member.role, badgeT)}
      />

      {isDoctor ? (
        <>
          {/* ───── VIDEO SHORTS SECTION ───── */}
          <VideoShortsSection video={getDoctorVideoForSlug(member.slug, member.name, member.role)} />

          {/* ───── ABOUT SECTION (Redesigned) ───── */}
          <AboutSection
            firstName={firstName}
            isDoctor
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
        </>
      ) : (
        <SimpleStaffBio firstName={firstName} bio={member.bio} />
      )}

    </div>
  )
}
