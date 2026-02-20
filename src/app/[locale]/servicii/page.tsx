import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { fallbackServices } from '@/lib/fallback-services'
import { Link } from '@/i18n/navigation'
import { getAllServices, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'
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

  return generatePageMetadata({
    title: t('services.title'),
    description: t('services.subtitle'),
    locale: locale as SEOLocale,
    path: '/servicii',
  })
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
            <span className="text-[#d4c4b0] text-sm font-medium">Servicii</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Tratamente stomatologice
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t('services.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-16 flex items-center gap-6">
            <div className="w-24 h-px bg-[#d4c4b0]" />
            <span className="text-white/30 text-sm">{services.length} servicii disponibile</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const ServiceIcon = getIconByName(service.icon)

              return (
                <Link
                  key={service._id}
                  href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  className="service-grid-card group relative bg-white rounded-2xl p-6 md:p-8
                    border border-[#f0ebe3] hover:border-[#d4c4b0]
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
                    hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)]
                    transition-all duration-500 hover:-translate-y-1
                    animate-[fadeInUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="service-icon-box w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                    {ServiceIcon ? (
                      <ServiceIcon className="w-7 h-7 text-[#8b7355] transition-colors" strokeWidth={1.5} />
                    ) : (
                      <div className="w-7 h-7 bg-[#d4c4b0] rounded-lg transition-colors" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3 group-hover:text-[#8b7355] transition-colors">
                    {service.title}
                  </h3>
                  {service.shortDescription && (
                    <p className="text-[#6b6b6b] text-sm leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                    {t('common.learnMore')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder component when Sanity has no data - uses fallback services with working links
async function PlaceholderServicesPage() {
  const t = await getTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Acasă
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#d4c4b0] text-sm font-medium">Servicii</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Tratamente stomatologice
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t('services.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="mt-16 flex items-center gap-6">
            <div className="w-24 h-px bg-[#d4c4b0]" />
            <span className="text-white/30 text-sm">{fallbackServices.length} servicii disponibile</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackServices.map((service, index) => (
              <Link
                key={service.slug}
                href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                className="service-grid-card group relative bg-white rounded-2xl p-6 md:p-8
                  border border-[#f0ebe3] hover:border-[#d4c4b0]
                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)]
                  transition-all duration-500 hover:-translate-y-1
                  animate-[fadeInUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="service-icon-box w-14 h-14 rounded-2xl bg-[#f8f5f0] flex items-center justify-center mb-5
                  transition-colors duration-300">
                  {service.iconPath ? (
                    <Image
                      src={service.iconPath}
                      alt=""
                      width={28}
                      height={28}
                      className="w-7 h-7 transition-all duration-300"
                    />
                  ) : (
                    <service.Icon className="w-7 h-7 text-[#8b7355] transition-colors" strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3 group-hover:text-[#8b7355] transition-colors">
                  {t(`services.fallback.${service.titleKey}`)}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-5">
                  {t(`services.fallback.${service.descriptionKey}`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                  {t('common.learnMore')}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
