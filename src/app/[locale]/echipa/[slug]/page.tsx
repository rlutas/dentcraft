import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Phone,
  User,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getTeamMemberBySlug, getTeamMemberSlugs, type Locale } from '@/lib/sanity/queries'
import { generateDynamicPageMetadata, type Locale as SEOLocale } from '@/lib/seo'
import { fallbackTeamMembers, type FallbackTeamMember } from '@/lib/fallback-team'

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

async function TeamMemberPageContent({ member }: { member: TeamMember }) {
  const t = await getTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero Section - Elegant Split Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ebe5db]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4c4b0]/8 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c9b89a]/8 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo with elegant frame */}
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Decorative frame */}
              <div className="absolute -inset-4 md:-inset-6 border-2 border-[#e8e0d5]/50 rounded-[40px] -rotate-3" />
              <div className="absolute -inset-4 md:-inset-6 border-2 border-[#d4c4b0]/30 rounded-[40px] rotate-2" />

              <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-gradient-to-b from-[#f8f5f0] via-[#f0ebe4] to-[#e5ddd2] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]">
                {member.photo ? (
                  <Image
                    fill
                    priority
                    alt={member.photo.alt || member.name}
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={urlFor(member.photo).width(600).height(800).auto('format').url()}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[#e8e0d5] flex items-center justify-center">
                      <User className="w-16 h-16 text-[#a89880]" strokeWidth={1.5} />
                    </div>
                  </div>
                )}

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4c4b0] to-[#c4b4a0] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">Expert</p>
                    <p className="text-xs text-[#6b6b6b]">Verificat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#6b6b6b] mb-6">
                <Link href="/echipa" className="hover:text-[#8b7355] transition-colors">
                  Echipa
                </Link>
                <span>/</span>
                <span className="text-[#1a1a1a] font-medium">{member.name}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
                {member.name}
              </h1>

              {member.role && (
                <p className="text-xl md:text-2xl font-medium text-[#8b7355] mb-6">
                  {member.role}
                </p>
              )}

              {/* Specializations */}
              {member.specializations && member.specializations.length > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                  {member.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm text-[#6b5a47] rounded-full border border-[#e8e0d5] font-medium shadow-sm"
                    >
                      {spec.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Quick info */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10 text-sm text-[#6b6b6b]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8b7355]" />
                  <span>Satu Mare</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8b7355]" />
                  <span>L-V: 10:00 - 18:00</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-semibold text-lg hover:bg-[#333] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                  href="/contact"
                >
                  {t('common.bookAppointment')}
                </Link>
                <a
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-semibold text-lg border-2 border-[#e8e0d5] hover:border-[#d4c4b0] hover:bg-[#faf8f5] transition-all duration-300"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={2} />
                  0741 199 977
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      {member.bio && member.bio.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                  <BookOpen className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t('team.about')}</h2>
                  <p className="text-sm text-[#6b6b6b]">Despre {member.name.split(' ')[0]}</p>
                </div>
              </div>

              <div className="prose prose-lg prose-neutral max-w-none">
                <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-10 border border-[#f0ebe3]">
                  <PortableTextRenderer content={member.bio} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {member.education && member.education.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t('team.education')}</h2>
                  <p className="text-sm text-[#6b6b6b]">Studii și formare profesională</p>
                </div>
              </div>

              <div className="space-y-4">
                {member.education.map((edu, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 md:p-8 border border-[#f0ebe3] hover:border-[#d4c4b0] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mb-2 group-hover:text-[#8b7355] transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-[#6b6b6b] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0]" />
                          {edu.institution}
                        </p>
                      </div>
                      <span className="shrink-0 px-4 py-2 text-sm font-bold text-[#8b7355] bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] rounded-xl">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {member.certifications && member.certifications.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                  <Award className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t('team.certifications')}</h2>
                  <p className="text-sm text-[#6b6b6b]">Certificări și acreditări</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {member.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-[#faf8f5] to-white rounded-2xl p-6 border border-[#f0ebe3] hover:border-[#d4c4b0] transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#8b7355] transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-[#6b6b6b] mb-2">{cert.issuer}</p>
                        <span className="text-xs font-semibold text-[#8b7355] bg-[#f5f0e8] px-2 py-1 rounded-md">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {member.services && member.services.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] to-[#f5f0e8]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Section header */}
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">{t('team.servicesOffered')}</h2>
                <p className="text-[#6b6b6b]">Servicii oferite de {member.name.split(' ')[0]}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {member.services.map((service) => (
                  <Link
                    key={service._id}
                    className="group bg-white rounded-2xl p-6 border border-[#f0ebe3] hover:border-[#d4c4b0] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                        {service.title}
                      </h4>
                      <span className="w-10 h-10 rounded-full bg-[#f5f0e8] group-hover:bg-[#1a1a1a] flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-[#8b7355] group-hover:text-white transition-colors" strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
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
            return <h2 key={index} className="!mt-8 text-2xl font-bold text-[#1a1a1a]">{text}</h2>
          }
          if (style === 'h3') {
            return <h3 key={index} className="!mt-6 text-xl font-semibold text-[#1a1a1a]">{text}</h3>
          }
          if (style === 'h4') {
            return <h4 key={index} className="!mt-4 text-lg font-semibold text-[#1a1a1a]">{text}</h4>
          }
          if (style === 'blockquote') {
            return (
              <blockquote key={index} className="border-l-4 border-[#d4c4b0] pl-6 italic text-[#6b6b6b] my-6">
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

// Fallback page content when using placeholder data
async function FallbackTeamMemberPageContent({ member }: { member: FallbackTeamMember }) {
  const t = await getTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ebe5db]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4c4b0]/8 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c9b89a]/8 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />

        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <div className="relative max-w-lg mx-auto lg:mx-0">
              <div className="absolute -inset-4 md:-inset-6 border-2 border-[#e8e0d5]/50 rounded-[40px] -rotate-3" />
              <div className="absolute -inset-4 md:-inset-6 border-2 border-[#d4c4b0]/30 rounded-[40px] rotate-2" />

              <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-gradient-to-b from-[#f8f5f0] via-[#f0ebe4] to-[#e5ddd2] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[#e8e0d5] flex items-center justify-center">
                      <User className="w-16 h-16 text-[#a89880]" strokeWidth={1.5} />
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4c4b0] to-[#c4b4a0] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">Expert</p>
                    <p className="text-xs text-[#6b6b6b]">Verificat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#6b6b6b] mb-6">
                <Link href="/echipa" className="hover:text-[#8b7355] transition-colors">
                  Echipa
                </Link>
                <span>/</span>
                <span className="text-[#1a1a1a] font-medium">{member.name}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
                {member.name}
              </h1>

              <p className="text-xl md:text-2xl font-medium text-[#8b7355] mb-6">
                {member.role}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {member.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm text-[#6b5a47] rounded-full border border-[#e8e0d5] font-medium shadow-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10 text-sm text-[#6b6b6b]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8b7355]" />
                  <span>Satu Mare</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8b7355]" />
                  <span>L-V: 10:00 - 18:00</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-semibold text-lg hover:bg-[#333] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                  href="/contact"
                >
                  {t('common.bookAppointment')}
                </Link>
                <a
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-semibold text-lg border-2 border-[#e8e0d5] hover:border-[#d4c4b0] hover:bg-[#faf8f5] transition-all duration-300"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={2} />
                  0741 199 977
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                <BookOpen className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t('team.about')}</h2>
                <p className="text-sm text-[#6b6b6b]">Despre {member.name.split(' ')[0]}</p>
              </div>
            </div>

            <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-10 border border-[#f0ebe3]">
              <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed">{member.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      {member.education.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t('team.education')}</h2>
                  <p className="text-sm text-[#6b6b6b]">Studii și formare profesională</p>
                </div>
              </div>

              <div className="space-y-4">
                {member.education.map((edu, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 md:p-8 border border-[#f0ebe3] hover:border-[#d4c4b0] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mb-2 group-hover:text-[#8b7355] transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-[#6b6b6b] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0]" />
                          {edu.institution}
                        </p>
                      </div>
                      <span className="shrink-0 px-4 py-2 text-sm font-bold text-[#8b7355] bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] rounded-xl">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {member.certifications.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d5] flex items-center justify-center shadow-sm">
                  <Award className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t('team.certifications')}</h2>
                  <p className="text-sm text-[#6b6b6b]">Certificări și acreditări</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {member.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-[#faf8f5] to-white rounded-2xl p-6 border border-[#f0ebe3] hover:border-[#d4c4b0] transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#8b7355] transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-[#6b6b6b] mb-2">{cert.issuer}</p>
                        <span className="text-xs font-semibold text-[#8b7355] bg-[#f5f0e8] px-2 py-1 rounded-md">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
