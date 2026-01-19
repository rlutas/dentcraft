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

// Article schema for blog posts
export function getArticleSchema(article: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || 'Dentcraft',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dentcraft',
      url: 'https://dentcraft.ro',
    },
    image: article.image,
  }
}
