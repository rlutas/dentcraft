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
} from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getTeamMemberBySlug, getTeamMemberSlugs, type Locale } from '@/lib/sanity/queries'

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

  return routing.locales.flatMap((locale) =>
    teamMemberSlugs.map((item) => ({
      locale,
      slug: item.slug,
    }))
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const member = await getTeamMemberBySlug(slug, locale as Locale) as TeamMember | null

  if (!member) {
    return {}
  }

  const title = member.seo?.metaTitle || member.name
  const description = member.seo?.metaDescription || member.role || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: member.seo?.ogImage
        ? [urlFor(member.seo.ogImage).width(1200).height(630).url()]
        : member.photo
          ? [urlFor(member.photo).width(1200).height(630).url()]
          : [],
    },
    robots: member.seo?.noIndex ? { index: false } : undefined,
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const member = await getTeamMemberBySlug(slug, locale as Locale) as TeamMember | null

  if (!member) {
    notFound()
  }

  return <TeamMemberPageContent member={member} />
}

async function TeamMemberPageContent({ member }: { member: TeamMember }) {
  const t = await getTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-[var(--shadow-card)] bg-[var(--color-accent-light)]">
              {member.photo ? (
                <Image
                  fill
                  priority
                  alt={member.photo.alt || member.name}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={urlFor(member.photo).width(600).height(750).auto('format').url()}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-32 h-32 text-[var(--color-primary)] opacity-30" strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <h1 className="mb-4">{member.name}</h1>

              {member.role && (
                <p className="text-body-lg font-medium text-[var(--color-primary)] mb-6">
                  {member.role}
                </p>
              )}

              {/* Specializations */}
              {member.specializations && member.specializations.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {member.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-body-sm bg-[var(--color-accent-light)] text-[var(--color-text)] rounded-full font-medium"
                    >
                      {spec.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="btn btn-primary btn-lg" href="/contact">
                  {t('common.bookAppointment')}
                </Link>
                <a
                  className="btn btn-secondary btn-lg flex items-center gap-2"
                  href="tel:+40741199977"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  0741 199 977
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      {member.bio && member.bio.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <h2 className="!mb-0">{t('team.about')}</h2>
              </div>
              <div className="prose prose-lg">
                <PortableTextRenderer content={member.bio} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {member.education && member.education.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <h2 className="!mb-0">{t('team.education')}</h2>
              </div>

              <div className="space-y-4">
                {member.education.map((edu, index) => (
                  <div key={index} className="card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="mb-1">{edu.degree}</h4>
                        <p className="text-muted">{edu.institution}</p>
                      </div>
                      <span className="text-body-sm font-semibold text-[var(--color-primary)] bg-[var(--color-accent-light)] px-3 py-1 rounded-full shrink-0">
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
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                  <Award className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <h2 className="!mb-0">{t('team.certifications')}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {member.certifications.map((cert, index) => (
                  <div key={index} className="card">
                    <h4 className="mb-1">{cert.name}</h4>
                    <p className="text-body-sm text-muted mb-2">{cert.issuer}</p>
                    <span className="text-body-sm font-semibold text-[var(--color-secondary)]">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {member.services && member.services.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="!mb-0">{t('team.servicesOffered')}</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {member.services.map((service) => (
                  <Link
                    key={service._id}
                    className="card group cursor-pointer hover:border-[var(--color-primary)] transition-colors"
                    href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  >
                    <h4 className="mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {service.title}
                    </h4>
                    <span className="flex items-center gap-2 text-body-sm font-semibold text-[var(--color-primary)]">
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
              <Link className="btn btn-lg btn-secondary flex items-center gap-2" href="/echipa">
                {t('team.viewAll')}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Simple Portable Text Renderer for bio content
function PortableTextRenderer({ content }: { content: Array<{ _type: string; [key: string]: unknown }> }) {
  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        if (block._type === 'block') {
          const style = (block['style'] as string) || 'normal'
          const children = block['children'] as Array<{ text: string; marks?: string[] }> | undefined
          const text = children?.map((child) => child.text).join('') || ''

          if (style === 'h2') {
            return <h2 key={index} className="!mt-8">{text}</h2>
          }
          if (style === 'h3') {
            return <h3 key={index} className="!mt-6">{text}</h3>
          }
          if (style === 'h4') {
            return <h4 key={index} className="!mt-4">{text}</h4>
          }
          if (style === 'blockquote') {
            return (
              <blockquote key={index} className="border-l-4 border-[var(--color-accent)] pl-4 italic text-muted">
                {text}
              </blockquote>
            )
          }
          return <p key={index}>{text}</p>
        }
        return null
      })}
    </div>
  )
}
