import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, User } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import { getAllTeamMembers, type Locale } from '@/lib/sanity/queries'
import { getBreadcrumbSchema } from '@/lib/schema'
import { generatePageMetadata, localizedPathnames, siteConfig, type Locale as SEOLocale } from '@/lib/seo'
import { fallbackTeamMembers } from '@/lib/fallback-team'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { FloatingIcons } from '@/components/ui/FloatingIcons'
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
    title: t('team.metaTitle'),
    description: t('team.metaDescription'),
    locale: locale as SEOLocale,
    path: '/echipa',
  })
}

export default async function TeamPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const teamMembers = await getAllTeamMembers(locale as Locale) as SanityTeamMember[]

  const loc = locale as SEOLocale
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('breadcrumbs.home'), url: `${siteConfig.baseUrl}${localizedPathnames['/']?.[loc] ?? '/'}` },
    { name: t('breadcrumbs.team'), url: `${siteConfig.baseUrl}${localizedPathnames['/echipa']?.[loc] ?? '/echipa'}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamPageContent teamMembers={teamMembers} />
    </>
  )
}

async function TeamPageContent({ teamMembers }: { teamMembers: SanityTeamMember[] }) {
  const t = await getTranslations()

  // Use Sanity data or fallback
  const hasMembers = teamMembers && teamMembers.length >= 5
  const members = hasMembers ? teamMembers : fallbackTeamMembers
  // "Specialiști" count = doctors only (those with "Dr." prefix). Assistants/receptionists not counted.
  const count = members.filter((m) => m.name.trim().toLowerCase().startsWith('dr.')).length

  return (
    <div className="flex flex-col">
      {/* Hero — light editorial matching /servicii rhythm */}
      <section className="relative overflow-hidden bg-[#faf6f1] py-20 md:py-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedServiceHeading bold={t('team.headingBold')} italic={t('team.headingItalic')} />
            <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed mt-4">
              {t('team.subtitle')}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5]">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                {t('team.specialistsCount', { count })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid - photo cards (mirrors /servicii) */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Floating icons — same team/care theme as homepage */}
        <FloatingIcons
          icons={[
            { src: '/icons/016-dentist-3.svg', className: 'top-6 left-3 w-14 h-14 md:top-10 md:left-12 md:w-24 md:h-24 lg:left-24 lg:w-28 lg:h-28', variant: 'driftB', duration: 28, opacity: 0.11 },
            { src: '/icons/022-dental-care-1.svg', className: 'top-6 right-3 w-12 h-12 md:top-12 md:right-10 md:w-20 md:h-20 lg:right-24 lg:w-24 lg:h-24', variant: 'driftA', duration: 30, delay: 3, opacity: 0.11 },
            { src: '/icons/010-smile.svg', className: 'bottom-6 left-4 w-12 h-12 md:bottom-10 md:left-12 md:w-20 md:h-20 lg:left-24 lg:w-24 lg:h-24', variant: 'driftC', duration: 24, delay: 1, opacity: 0.1 },
            { src: '/icons/009-teeth.svg', className: 'bottom-6 right-4 w-14 h-14 md:bottom-12 md:right-12 md:w-20 md:h-20 lg:right-24 lg:w-24 lg:h-24', variant: 'driftB', duration: 26, delay: 5, opacity: 0.1 },
          ]}
        />
        <div className="container relative z-10">
          <h2 className="sr-only">{t('team.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {members.map((member) => {
              const isSanity = '_id' in member
              const photoNode = isSanity && member.photo && typeof member.photo !== 'string' && member.photo.asset ? (
                <Image
                  fill
                  alt={member.photo.alt || member.name}
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={urlFor(member.photo).width(800).height(1000).quality(85).url()}
                />
              ) : !isSanity && typeof member.photo === 'string' ? (
                <Image
                  fill
                  alt={member.name}
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={member.photo}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60">
                  <User className="w-20 h-20 text-[#8b7355]/30" strokeWidth={1.25} />
                </div>
              )

              return (
                <Link
                  key={isSanity ? member._id : member.key}
                  href={{ pathname: '/echipa/[slug]', params: { slug: member.slug } }}
                  className="group relative block h-full overflow-hidden rounded-3xl
                    bg-white border border-[#e8e0d5]
                    shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]
                    hover:border-[#d4c4b0]
                    hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)]
                    hover:-translate-y-1.5
                    transition-all duration-500 ease-out flex flex-col"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/5] bg-[#faf6f1] overflow-hidden">
                    {photoNode}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    {member.role && (
                      <span className="inline-block self-start text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5] px-3 py-1 mb-3 text-[11px] font-bold uppercase tracking-[0.16em]">
                        {member.role}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 leading-tight tracking-tight">
                      {member.name}
                    </h3>
                    {!isSanity && member.specializations && member.specializations.length > 0 && (
                      <p className="text-[#5a5048] text-sm leading-relaxed mb-5 flex-1">
                        {member.specializations.slice(0, 3).join(' · ')}
                      </p>
                    )}
                    {isSanity && member.specializations && member.specializations.length > 0 && (
                      <p className="text-[#5a5048] text-sm leading-relaxed mb-5 flex-1">
                        {member.specializations.slice(0, 3).map((s) => s.name).join(' · ')}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em] group-hover:gap-3 group-hover:text-[#2a2118] transition-all duration-300 mt-auto">
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.25} />
                    </span>
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
