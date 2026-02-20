import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { urlFor } from '@/lib/sanity/image'
import { getAllBeforeAfter, getAllServices, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'
import { galleryPhotos } from '@/data/gallery-photos'
import { GalleryPageClient, PlaceholderGalleryGrid } from './GalleryPageClient'

// BeforeAfter case type based on Sanity schema
type SanityBeforeAfter = {
  _id: string
  title: string | null
  service: {
    _id: string
    title: string
    slug: string
  } | null
  doctor: {
    _id: string
    name: string
    slug: string
  } | null
  beforeImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  afterImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description: string | null
  treatmentDuration: string | null
  featured: boolean
}

// Service type for filter
type SanityService = {
  _id: string
  title: string
  slug: string
}

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('gallery.title'),
    description: t('gallery.subtitle'),
    locale: locale as SEOLocale,
    path: '/galerie',
  })
}

export default async function GalleryPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  setRequestLocale(locale)

  // Get service filter from URL params
  const serviceFilter = typeof resolvedSearchParams['service'] === 'string'
    ? resolvedSearchParams['service']
    : undefined

  // Fetch before/after cases from Sanity with optional service filter
  const cases = await getAllBeforeAfter(
    locale as Locale,
    serviceFilter ? { serviceSlug: serviceFilter } : undefined
  ) as SanityBeforeAfter[]

  // Fetch all services for filter buttons
  const services = await getAllServices(locale as Locale) as SanityService[]

  // Get translations
  const t = await getTranslations()

  // Build translations object for client component
  const translations = {
    title: t('gallery.title'),
    subtitle: t('gallery.subtitle'),
    filterBy: t('gallery.filterBy'),
    allTreatments: t('gallery.allTreatments'),
    noCases: t('gallery.noCases'),
    before: t('gallery.before'),
    after: t('gallery.after'),
    duration: t('gallery.duration'),
    featured: t('gallery.featured'),
    viewDetails: t('common.learnMore'),
    doctor: t('team.viewAll') === 'Vezi toată echipa' ? 'Medic' : 'Doctor', // Fallback for doctor label
  }

  // Helper function to generate image URLs (serializable)
  const createUrlForImage = (image: { asset: { url: string } }) => {
    return urlFor(image).width(800).height(600).quality(85).url()
  }

  // If no cases from Sanity, show placeholder
  if (!cases || cases.length === 0) {
    // Get placeholder translations
    const placeholderTranslations = {
      ...translations,
      placeholder: {
        case1: {
          title: t('gallery.placeholder.case1.title'),
          treatment: t('gallery.placeholder.case1.treatment'),
          duration: t('gallery.placeholder.case1.duration'),
        },
        case2: {
          title: t('gallery.placeholder.case2.title'),
          treatment: t('gallery.placeholder.case2.treatment'),
          duration: t('gallery.placeholder.case2.duration'),
        },
        case3: {
          title: t('gallery.placeholder.case3.title'),
          treatment: t('gallery.placeholder.case3.treatment'),
          duration: t('gallery.placeholder.case3.duration'),
        },
      },
    }

    return <PlaceholderGalleryGrid translations={placeholderTranslations} />
  }

  // Transform cases to include pre-generated image URLs for client component
  const casesWithUrls = cases.map((caseItem) => ({
    ...caseItem,
    beforeImage: {
      ...caseItem.beforeImage,
      generatedUrl: createUrlForImage(caseItem.beforeImage),
    },
    afterImage: {
      ...caseItem.afterImage,
      generatedUrl: createUrlForImage(caseItem.afterImage),
    },
  }))

  return (
    <GalleryPageClient
      cases={casesWithUrls}
      currentFilter={serviceFilter}
      galleryPhotos={galleryPhotos}
      services={services}
      translations={translations}
    />
  )
}
