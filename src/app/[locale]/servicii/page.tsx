import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getMainFallbackServices } from '@/lib/fallback-services'
import { Link } from '@/i18n/navigation'
import { AnimatedServiceHeading } from '@/components/ui/AnimatedServiceHeading'
import { FloatingIcons } from '@/components/ui/FloatingIcons'
import { getAllServices, type Locale } from '@/lib/sanity/queries'
import { getBreadcrumbSchema } from '@/lib/schema'
import { generatePageMetadata, localizedPathnames, siteConfig, type Locale as SEOLocale } from '@/lib/seo'
import { hasServicePhoto, getServicePhotoPath } from '@/lib/service-photos'
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
    title: t('services.metaTitle'),
    description: t('services.metaDescription'),
    locale: locale as SEOLocale,
    path: '/servicii',
  })
}

export default async function ServicesPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const services = await getAllServices(locale as Locale) as SanityService[]

  const loc = locale as SEOLocale
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('breadcrumbs.home'), url: `${siteConfig.baseUrl}${localizedPathnames['/']?.[loc] ?? '/'}` },
    { name: t('breadcrumbs.services'), url: `${siteConfig.baseUrl}${localizedPathnames['/servicii']?.[loc] ?? '/servicii'}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesPageContent services={services} />
    </>
  )
}

async function ServicesPageContent({ services }: { services: SanityService[] }) {
  const t = await getTranslations()

  // If no services from Sanity, show placeholder
  if (!services || services.length === 0) {
    return <PlaceholderServicesPage />
  }

  return (
    <div className="flex flex-col">
      {/* Hero — light editorial matching landing rhythm */}
      <section className="relative overflow-hidden bg-[#faf6f1] py-20 md:py-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedServiceHeading bold={t('services.headingBold')} italic={t('services.headingItalic')} />
            <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed mt-4">
              {t('services.subtitle')}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5]">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                {t('services.availableCount', { count: services.length })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - photo cards */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Floating icons — same general dental theme as homepage */}
        <FloatingIcons
          icons={[
            { src: '/icons/010-smile.svg', className: 'top-6 left-3 w-14 h-14 md:top-10 md:left-10 md:w-24 md:h-24 lg:left-24 lg:w-32 lg:h-32', variant: 'driftA', duration: 26, opacity: 0.11 },
            { src: '/icons/014-toothbrush.svg', className: 'top-6 right-3 w-12 h-12 md:top-12 md:right-12 md:w-20 md:h-20 lg:right-28 lg:w-24 lg:h-24', variant: 'driftB', duration: 32, delay: 4, opacity: 0.11 },
            { src: '/icons/097-calendar.svg', className: 'bottom-6 left-4 w-10 h-10 md:bottom-10 md:left-12 md:w-16 md:h-16 lg:left-24 lg:w-20 lg:h-20', variant: 'driftC', duration: 22, delay: 2, opacity: 0.1 },
            { src: '/icons/008-white-teeth.svg', className: 'bottom-6 right-4 w-12 h-12 md:bottom-12 md:right-12 md:w-20 md:h-20 lg:right-24 lg:w-24 lg:h-24', variant: 'driftA', duration: 28, delay: 6, opacity: 0.1 },
          ]}
        />
        <div className="container relative z-10">
          <h2 className="sr-only">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => {
              const ServiceIcon = getIconByName(service.icon)
              const hasPhoto = hasServicePhoto(service.slug)
              const photoPath = getServicePhotoPath(service.slug) ?? ''

              return (
                <Link
                  key={service._id}
                  href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  className="group relative block h-full overflow-hidden rounded-3xl
                    bg-white border border-[#e8e0d5]
                    shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]
                    hover:border-[#d4c4b0]
                    hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)]
                    hover:-translate-y-1.5
                    transition-all duration-500 ease-out flex flex-col"
                >
                  {/* Photo or placeholder */}
                  <div className="relative aspect-[16/10] bg-[#faf6f1] overflow-hidden">
                    {hasPhoto ? (
                      <Image
                        src={photoPath}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60">
                        {ServiceIcon ? (
                          <ServiceIcon className="w-20 h-20 text-[#8b7355]/30 group-hover:text-[#8b7355]/50 transition-colors" strokeWidth={1.25} />
                        ) : (
                          <div className="w-20 h-20 bg-[#d4c4b0]/30 rounded-2xl" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 leading-tight">
                      {service.title}
                    </h3>
                    {service.shortDescription && (
                      <p className="text-[#5a5048] text-sm leading-relaxed mb-5 flex-1">
                        {service.shortDescription}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em] group-hover:gap-3 group-hover:text-[#2a2118] transition-all duration-300">
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

// Placeholder component when Sanity has no data - uses fallback services with working links
async function PlaceholderServicesPage() {
  const t = await getTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero — light editorial matching landing rhythm */}
      <section className="relative overflow-hidden bg-[#faf6f1] py-20 md:py-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedServiceHeading bold={t('services.headingBold')} italic={t('services.headingItalic')} />
            <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed mt-4">
              {t('services.subtitle')}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e0d5]">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                {t('services.availableCount', { count: getMainFallbackServices().length })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - photo cards */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Floating icons — same general dental theme as homepage */}
        <FloatingIcons
          icons={[
            { src: '/icons/010-smile.svg', className: 'top-6 left-3 w-14 h-14 md:top-10 md:left-10 md:w-24 md:h-24 lg:left-24 lg:w-32 lg:h-32', variant: 'driftA', duration: 26, opacity: 0.11 },
            { src: '/icons/014-toothbrush.svg', className: 'top-6 right-3 w-12 h-12 md:top-12 md:right-12 md:w-20 md:h-20 lg:right-28 lg:w-24 lg:h-24', variant: 'driftB', duration: 32, delay: 4, opacity: 0.11 },
            { src: '/icons/097-calendar.svg', className: 'bottom-6 left-4 w-10 h-10 md:bottom-10 md:left-12 md:w-16 md:h-16 lg:left-24 lg:w-20 lg:h-20', variant: 'driftC', duration: 22, delay: 2, opacity: 0.1 },
            { src: '/icons/008-white-teeth.svg', className: 'bottom-6 right-4 w-12 h-12 md:bottom-12 md:right-12 md:w-20 md:h-20 lg:right-24 lg:w-24 lg:h-24', variant: 'driftA', duration: 28, delay: 6, opacity: 0.1 },
          ]}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {getMainFallbackServices().map((service) => {
              const hasPhoto = hasServicePhoto(service.slug)
              const photoPath = getServicePhotoPath(service.slug) ?? ''
              return (
                <Link
                  key={service.slug}
                  href={{ pathname: '/servicii/[slug]', params: { slug: service.slug } }}
                  className="group relative block h-full overflow-hidden rounded-3xl
                    bg-white border border-[#e8e0d5]
                    shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]
                    hover:border-[#d4c4b0]
                    hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)]
                    hover:-translate-y-1.5
                    transition-all duration-500 ease-out flex flex-col"
                >
                  {/* Photo or placeholder */}
                  <div className="relative aspect-[16/10] bg-[#faf6f1] overflow-hidden">
                    {hasPhoto ? (
                      <Image
                        src={photoPath}
                        alt={t(`services.fallback.${service.titleKey}`)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#faf6f1] to-[#e8e0d5]/60">
                        {service.iconPath ? (
                          <Image
                            src={service.iconPath}
                            alt=""
                            width={80}
                            height={80}
                            className="w-20 h-20 opacity-30 group-hover:opacity-50 transition-opacity"
                          />
                        ) : (
                          <service.Icon className="w-20 h-20 text-[#8b7355]/30 group-hover:text-[#8b7355]/50 transition-colors" strokeWidth={1.25} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 leading-tight">
                      {t(`services.fallback.${service.titleKey}`)}
                    </h3>
                    <p className="text-[#5a5048] text-sm leading-relaxed mb-5 flex-1">
                      {t(`services.fallback.${service.descriptionKey}`)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#8b7355] text-xs font-bold uppercase tracking-[0.16em] group-hover:gap-3 group-hover:text-[#2a2118] transition-all duration-300">
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
