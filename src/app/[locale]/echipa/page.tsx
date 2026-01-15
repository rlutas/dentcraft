import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, User } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import { getAllTeamMembers, type Locale } from '@/lib/sanity/queries'
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

  return {
    title: t('team.title'),
    description: t('team.subtitle'),
  }
}

export default async function TeamPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const teamMembers = await getAllTeamMembers(locale as Locale) as SanityTeamMember[]

  return <TeamPageContent teamMembers={teamMembers} />
}

async function TeamPageContent({ teamMembers }: { teamMembers: SanityTeamMember[] }) {
  const t = await getTranslations()

  // If no team members from Sanity, show placeholder
  if (!teamMembers || teamMembers.length === 0) {
    return <PlaceholderTeamPage />
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('team.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Link
                key={member._id}
                className="card group cursor-pointer"
                href={{ pathname: '/echipa/[slug]', params: { slug: member.slug } }}
              >
                {/* Photo */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-[var(--color-accent-light)]">
                  {member.photo?.asset ? (
                    <Image
                      alt={member.photo.alt || member.name}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={urlFor(member.photo).width(400).height(500).quality(80).url()}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-20 h-20 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="mb-2">{member.name}</h3>

                {/* Role */}
                {member.role && (
                  <p className="text-body-sm font-medium text-[var(--color-primary)] mb-3">
                    {member.role}
                  </p>
                )}

                {/* Specializations */}
                {member.specializations && member.specializations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.specializations.slice(0, 3).map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-body-sm bg-[var(--color-accent-light)] text-[var(--color-text)] rounded-full"
                      >
                        {spec.name}
                      </span>
                    ))}
                    {member.specializations.length > 3 && (
                      <span className="px-3 py-1 text-body-sm bg-[var(--color-accent-light)] text-[var(--color-text-muted)] rounded-full">
                        +{member.specializations.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* View Profile Link */}
                <span className="flex items-center gap-2 font-semibold text-body-sm group-hover:gap-3 transition-all mt-auto">
                  {t('common.learnMore')}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('cta.title')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t('common.bookAppointment')}
              </Link>
              <a
                className="btn btn-lg btn-secondary flex items-center gap-2"
                href="tel:+40741199977"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder component when Sanity has no data
async function PlaceholderTeamPage() {
  const t = await getTranslations()

  const placeholderMembers = [
    {
      key: 'doctor1',
      name: 'Dr. Razvan Petric',
      role: 'Medic Stomatolog',
      specializations: ['Implantologie', 'Estetica Dentara'],
    },
    {
      key: 'doctor2',
      name: 'Dr. Ana Popescu',
      role: 'Medic Ortodont',
      specializations: ['Ortodontie', 'Aparate Invizibile'],
    },
    {
      key: 'doctor3',
      name: 'Dr. Mihai Ionescu',
      role: 'Medic Stomatolog',
      specializations: ['Stomatologie Generala', 'Pedodontie'],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('team.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderMembers.map((member) => (
              <div key={member.key} className="card group">
                {/* Photo Placeholder */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-[var(--color-accent-light)]">
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-20 h-20 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mb-2">{member.name}</h3>

                {/* Role */}
                <p className="text-body-sm font-medium text-[var(--color-primary)] mb-3">
                  {member.role}
                </p>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-body-sm bg-[var(--color-accent-light)] text-[var(--color-text)] rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* View Profile Link */}
                <span className="flex items-center gap-2 font-semibold text-body-sm text-muted mt-auto">
                  {t('common.learnMore')}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[var(--shadow-card)] p-10 md:p-12 text-center">
            <h2>{t('cta.title')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="btn btn-lg btn-primary" href="/contact">
                {t('common.bookAppointment')}
              </Link>
              <a
                className="btn btn-lg btn-secondary flex items-center gap-2"
                href="tel:+40741199977"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
