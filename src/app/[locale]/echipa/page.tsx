import type { Metadata } from 'next'
import Image from 'next/image'
import { User } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import { getAllTeamMembers, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'
import { fallbackTeamMembers } from '@/lib/fallback-team'
import type { LocalePageProps } from '@/types'

// Team member type based on Sanity schema
type SanityTeamMember = {
  _id: string
  name: string
  slug: string
  role: string | null
  specializations: Array<{ name: string }> | null
  photo: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  } | null
  order: number
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('team.title'),
    description: t('team.subtitle'),
    locale: locale as SEOLocale,
    path: '/echipa',
  })
}

export default async function TeamPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const teamMembers = await getAllTeamMembers(locale as Locale) as SanityTeamMember[]

  return <TeamPageContent teamMembers={teamMembers} />
}

async function TeamPageContent({ teamMembers }: { teamMembers: SanityTeamMember[] }) {
  const t = await getTranslations()

  // Use Sanity data or fallback
  const hasMembers = teamMembers && teamMembers.length >= 6

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Dramatic lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Acasă
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Echipa</span>
          </div>

          <div className="max-w-4xl">
            {/* Badge */}
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              {t('teamPreview.badge')}
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t('team.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              {t('team.subtitle')}
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-16 flex items-center gap-6">
            <div className="w-24 h-px bg-[#d4c4b0]" />
            <span className="text-white/30 text-sm">{hasMembers ? teamMembers.length : fallbackTeamMembers.length} specialiști</span>
          </div>
        </div>
      </section>

      {/* Team Grid - Masonry Style on Light Background */}
      <section className="py-20 md:py-28 bg-[#f8f5f0] relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a1a1a 0.5px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />

        <div className="container relative z-10">
          {/* Grid with varying card sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(hasMembers ? teamMembers : fallbackTeamMembers).map((member, index) => {
              // Determine if this is a featured (larger) card - first one and every 4th
              const isFeatured = index === 0

              return (
                <Link
                  key={'_id' in member ? member._id : member.key}
                  href={{ pathname: '/echipa/[slug]', params: { slug: member.slug } }}
                  className={`group relative overflow-hidden rounded-[24px] bg-white
                    border border-[#e8e0d5] hover:border-[#d4c4b0]
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
                    transition-all duration-500 hover:-translate-y-1
                    animate-[fadeInUp_0.6s_ease-out_both]
                    ${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Photo */}
                  <div className={`relative w-full overflow-hidden bg-gradient-to-b from-[#f0ebe4] to-[#e5ddd2]
                    ${isFeatured ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                    {'photo' in member && member.photo && typeof member.photo !== 'string' && member.photo.asset ? (
                      <Image
                        fill
                        alt={'photo' in member && member.photo && typeof member.photo !== 'string' && member.photo.alt ? member.photo.alt : member.name}
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        src={urlFor(member.photo).width(600).height(800).quality(85).url()}
                      />
                    ) : 'photo' in member && typeof member.photo === 'string' ? (
                      <Image
                        fill
                        alt={member.name}
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        src={member.photo}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-20 h-20 text-[#d4c4b0]" strokeWidth={1} />
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#1a1a1a]">
                        {t('common.learnMore')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Role tag */}
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase
                      bg-[#f8f5f0] text-[#8b7355] rounded-full border border-[#e8e0d5]">
                      {member.role}
                    </span>

                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors duration-300">
                      {member.name}
                    </h3>

                    {/* Specializations for Sanity members */}
                    {'specializations' in member && member.specializations && member.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(member.specializations as Array<{ name: string } | string>).slice(0, 2).map((spec, specIndex) => (
                          <span
                            key={specIndex}
                            className="text-xs text-[#6b6b6b]"
                          >
                            {typeof spec === 'string' ? spec : spec.name}
                            {specIndex < Math.min((member.specializations as Array<unknown>).length, 2) - 1 && ' •'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}

// Placeholder uses the same component now - prefixed with _ to indicate intentionally unused
async function _PlaceholderTeamPage() {
  return <TeamPageContent teamMembers={[]} />
}
