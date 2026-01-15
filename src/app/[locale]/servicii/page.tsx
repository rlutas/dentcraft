import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAllServices, type Locale } from '@/lib/sanity/queries'
import type { LocalePageProps } from '@/types'

// Service type based on Sanity schema
type SanityService = {
  _id: string
  title: string
  slug: string
  icon: string | null
  shortDescription: string | null
  order: number
}

// Get Lucide icon by name
function getIconByName(iconName: string | null): LucideIcon | null {
  if (!iconName) return null
  const icons = LucideIcons as Record<string, LucideIcon | unknown>
  const icon = icons[iconName]
  if (typeof icon === 'function') {
    return icon as LucideIcon
  }
  return null
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('services.title'),
    description: t('services.subtitle'),
  }
}

export default async function ServicesPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const services = await getAllServices(locale as Locale) as SanityService[]

  return <ServicesPageContent services={services} />
}

async function ServicesPageContent({ services }: { services: SanityService[] }) {
  const t = await getTranslations()

  // If no services from Sanity, show placeholder
  if (!services || services.length === 0) {
    return <PlaceholderServicesPage />
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('services.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const ServiceIcon = getIconByName(service.icon)

              return (
                <Link
                  key={service._id}
                  className="card group cursor-pointer"
                  href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-5 text-[var(--color-primary)]">
                    {ServiceIcon ? (
                      <ServiceIcon className="w-7 h-7" strokeWidth={1.5} />
                    ) : (
                      <div className="w-7 h-7 bg-[var(--color-accent)] rounded-lg" />
                    )}
                  </div>
                  <h3 className="mb-3">{service.title}</h3>
                  {service.shortDescription && (
                    <p className="text-body-sm text-muted mb-5">
                      {service.shortDescription}
                    </p>
                  )}
                  <span className="flex items-center gap-2 font-semibold text-body-sm group-hover:gap-3 transition-all">
                    {t('common.learnMore')}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              )
            })}
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
                <LucideIcons.Phone className="w-5 h-5" strokeWidth={1.5} />
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
async function PlaceholderServicesPage() {
  const t = await getTranslations()

  const placeholderServices = [
    { key: 'generalDentistry', Icon: LucideIcons.Stethoscope },
    { key: 'cosmeticDentistry', Icon: LucideIcons.Sparkles },
    { key: 'implantology', Icon: LucideIcons.Settings },
    { key: 'orthodontics', Icon: LucideIcons.Smile },
    { key: 'pediatric', Icon: LucideIcons.Baby },
    { key: 'emergencies', Icon: LucideIcons.AlertTriangle },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{t('services.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderServices.map((service) => (
              <div key={service.key} className="card group">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-5 text-[var(--color-primary)]">
                  <service.Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3">{t(`services.categories.${service.key}`)}</h3>
                <p className="text-body-sm text-muted mb-5">
                  {t(`services.descriptions.${service.key}`)}
                </p>
                <span className="flex items-center gap-2 font-semibold text-body-sm text-muted">
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
                <LucideIcons.Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
