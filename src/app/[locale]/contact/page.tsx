import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ContactPageContent from '@/components/features/ContactPageContent'
import { getSettings, type Locale } from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'

// Settings type based on Sanity schema
type SanitySettings = {
  _id: string
  siteName: string
  logo: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  } | null
  contact: {
    phone: string
    email: string
    whatsapp: string
    address: string
  } | null
  workingHours: Array<{
    days: string
    hours: string
    closed: boolean
  }> | null
  socialLinks: {
    facebook: string | null
    instagram: string | null
    youtube: string | null
    linkedin: string | null
    tiktok: string | null
  } | null
  googleMapsEmbed: string | null
}

type PageProps = {
  params: Promise<{ locale: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('contact.title'),
    description: t('contact.subtitle'),
    locale: locale as SEOLocale,
    path: '/contact',
  })
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch settings from Sanity
  const settings = (await getSettings(locale as Locale)) as SanitySettings | null

  // Get translations for fallback values
  const t = await getTranslations()

  // Prepare data for client component
  const contactInfo = {
    phone: settings?.contact?.phone || t('footer.phone'),
    email: settings?.contact?.email || t('footer.email'),
    whatsapp: settings?.contact?.whatsapp || t('footer.phone'),
    address: settings?.contact?.address || t('footer.address'),
  }

  const workingHours = settings?.workingHours || [
    { days: t('contact.weekdays'), hours: '10:00 - 18:00', closed: false },
    { days: t('contact.saturday'), hours: t('contact.byAppointment'), closed: false },
    { days: t('contact.sunday'), hours: '', closed: true },
  ]

  const socialLinks = settings?.socialLinks || null
  const googleMapsEmbed = settings?.googleMapsEmbed || null

  return (
    <ContactPageContent
      contactInfo={contactInfo}
      workingHours={workingHours}
      socialLinks={socialLinks}
      googleMapsEmbed={googleMapsEmbed}
    />
  )
}
