import { CONTACT } from './constants/contact'

// LocalBusiness + MedicalBusiness schema for the clinic
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness', 'Dentist'],
    name: 'Dentcraft',
    description: 'Clinica stomatologica moderna in Satu Mare',
    url: 'https://dentcraft.ro',
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Barbu Ștefănescu Delavrancea nr.3',
      addressLocality: 'Satu Mare',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.coordinates.lat,
      longitude: CONTACT.coordinates.lng,
    },
    openingHours: 'Mo-Fr 10:00-18:00',
    priceRange: '$$',
    sameAs: [
      'https://facebook.com/dentcraft.ro',
      'https://instagram.com/dentcraft.ro',
    ],
    areaServed: [
      { '@type': 'City', name: 'Satu Mare' },
      { '@type': 'State', name: 'Județul Satu Mare' },
    ],
    availableLanguage: ['Romanian', 'English', 'Hungarian'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '40',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

// BreadcrumbList schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// FAQPage schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Service schema for individual service pages
export function getServiceSchema(options: {
  serviceName: string
  serviceDescription: string
  serviceUrl: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Service', 'MedicalProcedure'],
    name: options.serviceName,
    description: options.serviceDescription,
    url: options.serviceUrl,
    provider: {
      '@type': 'Dentist',
      name: 'Dentcraft',
      url: 'https://dentcraft.ro',
      telephone: CONTACT.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Str. Barbu Ștefănescu Delavrancea nr.3',
        addressLocality: 'Satu Mare',
        addressCountry: 'RO',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Satu Mare',
    },
    ...(options.priceRange ? { priceRange: options.priceRange } : {}),
  }
}

// Person schema for team member pages (E-E-A-T + GEO)
export function getPersonSchema(person: {
  name: string
  url: string
  jobTitle: string
  description?: string
  image?: string
  worksFor?: string
  alumniOf?: string[]
  knowsAbout?: string[]
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Person', 'Dentist'],
    name: person.name,
    url: person.url,
    jobTitle: person.jobTitle,
    ...(person.description ? { description: person.description } : {}),
    ...(person.image ? { image: person.image } : {}),
    worksFor: {
      '@type': 'Dentist',
      name: person.worksFor || 'Dentcraft',
      url: 'https://dentcraft.ro',
    },
    ...(person.alumniOf ? {
      alumniOf: person.alumniOf.map((school) => ({
        '@type': 'EducationalOrganization',
        name: school,
      })),
    } : {}),
    ...(person.knowsAbout ? { knowsAbout: person.knowsAbout } : {}),
    ...(person.sameAs ? { sameAs: person.sameAs } : {}),
  }
}

// Article schema for blog posts
export function getArticleSchema(article: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  authorUrl?: string
  authorJobTitle?: string
  image?: string
  wordCount?: number
  articleSection?: string
  inLanguage?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: article.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || 'Dentcraft',
      ...(article.authorUrl ? { url: article.authorUrl } : {}),
      ...(article.authorJobTitle ? { jobTitle: article.authorJobTitle } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dentcraft',
      url: 'https://dentcraft.ro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dentcraft.ro/images/logo.png',
      },
    },
    image: article.image,
    ...(article.wordCount ? { wordCount: article.wordCount } : {}),
    ...(article.articleSection ? { articleSection: article.articleSection } : {}),
    ...(article.inLanguage ? { inLanguage: article.inLanguage } : {}),
  }
}
