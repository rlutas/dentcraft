/**
 * Global type definitions for Dentcraft
 */

import type { Locale } from '@/i18n/config'

/**
 * Common props for pages with locale parameter
 */
export type LocalePageProps = {
  params: Promise<{ locale: Locale }>
}

/**
 * Common props for pages with locale and slug parameters
 */
export type LocaleSlugPageProps = {
  params: Promise<{ locale: Locale; slug: string }>
}

/**
 * Team member type
 */
export type TeamMember = {
  id: string
  slug: string
  name: string
  title: string
  role: 'doctor' | 'staff'
  specialization: string
  bio: string
  image: {
    url: string
    alt: string
  }
  certifications?: string[]
  experience?: number
  services?: string[]
}

/**
 * Service type
 */
export type Service = {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  icon: string
  image: {
    url: string
    alt: string
  }
  treatments: Treatment[]
  faq: FAQItem[]
  priceRange?: {
    from: number
    to: number
    currency: string
  }
  relatedServices?: string[]
}

/**
 * Treatment within a service
 */
export type Treatment = {
  id: string
  name: string
  description: string
  price?: number
  duration?: string
}

/**
 * FAQ item type
 */
export type FAQItem = {
  id: string
  question: string
  answer: string
  category?: string
}

/**
 * Testimonial type
 */
export type Testimonial = {
  id: string
  patientName: string
  patientInitials?: string
  rating: 1 | 2 | 3 | 4 | 5
  content: string
  treatment?: string
  date: string
  videoUrl?: string
  isVideo: boolean
}

/**
 * Gallery case (Before/After)
 */
export type GalleryCase = {
  id: string
  treatment: string
  category: string
  beforeImage: {
    url: string
    alt: string
  }
  afterImage: {
    url: string
    alt: string
  }
  description?: string
  duration?: string
  doctor?: string
  testimonial?: string
}

/**
 * Blog article type
 */
export type BlogArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: {
    url: string
    alt: string
  }
  category: string
  author: {
    name: string
    image?: string
  }
  publishedAt: string
  readingTime: number
  tags?: string[]
}

/**
 * Price item for calculator
 */
export type PriceItem = {
  id: string
  serviceId: string
  serviceName: string
  treatmentName: string
  priceFrom: number
  priceTo?: number
  currency: string
  unit?: string
  notes?: string
}

/**
 * Contact form data
 */
export type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: 'appointment' | 'information' | 'emergency' | 'other'
  message: string
  gdprConsent: boolean
}

/**
 * Online consultation form data
 */
export type ConsultationFormData = ContactFormData & {
  reason: string
  preferredDate?: string
  preferredTime?: string
  xrayFile?: File
}

/**
 * Newsletter subscription data
 */
export type NewsletterFormData = {
  email: string
  locale: Locale
}

/**
 * Site settings (from CMS)
 */
export type SiteSettings = {
  siteName: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    postalCode?: string
    country: string
  }
  schedule: {
    weekdays: string
    weekend: string
  }
  socialLinks: {
    facebook?: string
    instagram?: string
    tiktok?: string
  }
  whatsappNumber: string
  googleMapsEmbed?: string
  googleReviewsUrl?: string
}

/**
 * Localized string for multi-language support
 */
export type LocalizedString = {
  ro: string
  en: string
  hu: string
}

/**
 * Google Review item
 */
export type GoogleReview = {
  id: string
  author: string
  rating: number
  date: LocalizedString
  text: LocalizedString
  photoUrl: string | null
  relativeDate?: string
  localGuide?: boolean
  reviewCount?: number
  photoCount?: number
}

/**
 * Google Reviews data structure
 */
export type GoogleReviewsData = {
  placeId: string
  rating: number
  totalReviews: number
  lastUpdated: string
  googleMapsUrl?: string
  reviews: GoogleReview[]
}
