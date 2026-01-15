import { client } from './client'

// Type for supported locales
export type Locale = 'ro' | 'en' | 'hu'

// Helper to get localized field projection
const localizedField = (fieldName: string, locale: Locale) =>
  `"${fieldName}": ${fieldName}.${locale}`

// Helper for localized portable text projection
const localizedPortableText = (fieldName: string, locale: Locale) =>
  `"${fieldName}": ${fieldName}.${locale}[]`

// ============================================
// SERVICE QUERIES
// ============================================

export async function getAllServices(locale: Locale) {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current,
    icon,
    ${localizedField('shortDescription', locale)},
    ${localizedPortableText('description', locale)},
    benefits[] {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    process[] {
      stepNumber,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    heroImage {
      asset->,
      alt
    },
    priceRange {
      min,
      max
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage {
        asset->
      },
      noIndex
    },
    order
  }`

  return client.fetch(query)
}

export async function getServiceBySlug(slug: string, locale: Locale) {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current,
    icon,
    ${localizedField('shortDescription', locale)},
    ${localizedPortableText('description', locale)},
    benefits[] {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    process[] {
      stepNumber,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    heroImage {
      asset->,
      alt
    },
    priceRange {
      min,
      max
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage {
        asset->
      },
      noIndex
    },
    order
  }`

  return client.fetch(query, { slug })
}

export async function getServiceSlugs() {
  const query = `*[_type == "service"] { "slug": slug.current }`
  return client.fetch<Array<{ slug: string }>>(query)
}

// ============================================
// TEAM MEMBER QUERIES
// ============================================

export async function getAllTeamMembers(locale: Locale) {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    ${localizedField('role', locale)},
    specializations[] {
      ${localizedField('name', locale)}
    },
    photo {
      asset->,
      alt
    },
    ${localizedPortableText('bio', locale)},
    education[] {
      institution,
      ${localizedField('degree', locale)},
      year
    },
    certifications[] {
      ${localizedField('name', locale)},
      issuer,
      year
    },
    "services": services[]-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    order,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage {
        asset->
      },
      noIndex
    }
  }`

  return client.fetch(query)
}

export async function getTeamMemberBySlug(slug: string, locale: Locale) {
  const query = `*[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    ${localizedField('role', locale)},
    specializations[] {
      ${localizedField('name', locale)}
    },
    photo {
      asset->,
      alt
    },
    ${localizedPortableText('bio', locale)},
    education[] {
      institution,
      ${localizedField('degree', locale)},
      year
    },
    certifications[] {
      ${localizedField('name', locale)},
      issuer,
      year
    },
    "services": services[]-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    order,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage {
        asset->
      },
      noIndex
    }
  }`

  return client.fetch(query, { slug })
}

export async function getTeamMemberSlugs() {
  const query = `*[_type == "teamMember"] { "slug": slug.current }`
  return client.fetch<Array<{ slug: string }>>(query)
}

// ============================================
// TESTIMONIAL QUERIES
// ============================================

export async function getAllTestimonials(
  locale: Locale,
  options?: {
    serviceSlug?: string
  }
) {
  const { serviceSlug } = options || {}

  let filter = '_type == "testimonial"'
  if (serviceSlug) {
    filter += ' && service->slug.current == $serviceSlug'
  }

  const query = `*[${filter}] | order(date desc) {
    _id,
    patientName,
    patientPhoto {
      asset->,
      alt
    },
    rating,
    ${localizedField('text', locale)},
    videoUrl,
    videoFile {
      asset->
    },
    "service": service-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    "doctor": doctor-> {
      _id,
      name,
      "slug": slug.current
    },
    featured,
    date
  }`

  return client.fetch(query, { serviceSlug })
}

export async function getFeaturedTestimonials(locale: Locale) {
  const query = `*[_type == "testimonial" && featured == true] | order(date desc) {
    _id,
    patientName,
    patientPhoto {
      asset->,
      alt
    },
    rating,
    ${localizedField('text', locale)},
    videoUrl,
    videoFile {
      asset->
    },
    "service": service-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    "doctor": doctor-> {
      _id,
      name,
      "slug": slug.current
    },
    featured,
    date
  }`

  return client.fetch(query)
}

// ============================================
// BEFORE/AFTER QUERIES
// ============================================

export async function getAllBeforeAfter(locale: Locale) {
  const query = `*[_type == "beforeAfter"] | order(featured desc, _createdAt desc) {
    _id,
    ${localizedField('title', locale)},
    "service": service-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    "doctor": doctor-> {
      _id,
      name,
      "slug": slug.current
    },
    beforeImage {
      asset->,
      alt
    },
    afterImage {
      asset->,
      alt
    },
    ${localizedField('description', locale)},
    treatmentDuration,
    featured
  }`

  return client.fetch(query)
}

export async function getFeaturedBeforeAfter(locale: Locale) {
  const query = `*[_type == "beforeAfter" && featured == true] | order(_createdAt desc) {
    _id,
    ${localizedField('title', locale)},
    "service": service-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    "doctor": doctor-> {
      _id,
      name,
      "slug": slug.current
    },
    beforeImage {
      asset->,
      alt
    },
    afterImage {
      asset->,
      alt
    },
    ${localizedField('description', locale)},
    treatmentDuration,
    featured
  }`

  return client.fetch(query)
}

// ============================================
// BLOG QUERIES
// ============================================

export async function getBlogPosts(
  locale: Locale,
  options?: {
    limit?: number
    offset?: number
    categorySlug?: string
    featured?: boolean
  }
) {
  const { limit = 10, offset = 0, categorySlug, featured } = options || {}

  let filter = '_type == "blogPost"'
  if (categorySlug) {
    filter += ' && category->slug.current == $categorySlug'
  }
  if (featured !== undefined) {
    filter += ' && featured == $featured'
  }

  const query = `*[${filter}] | order(publishedAt desc) [${offset}...${offset + limit}] {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current,
    ${localizedField('excerpt', locale)},
    ${localizedPortableText('content', locale)},
    coverImage {
      asset->,
      alt
    },
    "category": category-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      photo {
        asset->
      }
    },
    publishedAt,
    featured,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage {
        asset->
      },
      noIndex
    }
  }`

  return client.fetch(query, { categorySlug, featured })
}

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current,
    ${localizedField('excerpt', locale)},
    ${localizedPortableText('content', locale)},
    coverImage {
      asset->,
      alt
    },
    "category": category-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      photo {
        asset->
      }
    },
    publishedAt,
    featured,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage {
        asset->
      },
      noIndex
    }
  }`

  return client.fetch(query, { slug })
}

export async function getBlogPostSlugs() {
  const query = `*[_type == "blogPost"] { "slug": slug.current }`
  return client.fetch<Array<{ slug: string }>>(query)
}

export async function getBlogCategories(locale: Locale) {
  const query = `*[_type == "blogCategory"] | order(title.${locale} asc) {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current
  }`

  return client.fetch(query)
}

export async function getBlogPostsCount(categorySlug?: string) {
  let filter = '_type == "blogPost"'
  if (categorySlug) {
    filter += ' && category->slug.current == $categorySlug'
  }

  const query = `count(*[${filter}])`
  return client.fetch<number>(query, { categorySlug })
}

// ============================================
// FAQ QUERIES
// ============================================

export async function getFAQs(
  locale: Locale,
  options?: {
    category?: 'general' | 'pricing' | 'treatments' | 'appointments'
    serviceSlug?: string
  }
) {
  const { category, serviceSlug } = options || {}

  let filter = '_type == "faq"'
  if (category) {
    filter += ' && category == $category'
  }
  if (serviceSlug) {
    filter += ' && $serviceSlug in services[]->slug.current'
  }

  const query = `*[${filter}] | order(category asc, order asc) {
    _id,
    ${localizedField('question', locale)},
    ${localizedPortableText('answer', locale)},
    category,
    "services": services[]-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current
    },
    order
  }`

  return client.fetch(query, { category, serviceSlug })
}

export async function getFAQsByCategory(locale: Locale) {
  const query = `{
    "general": *[_type == "faq" && category == "general"] | order(order asc) {
      _id,
      ${localizedField('question', locale)},
      ${localizedPortableText('answer', locale)},
      category,
      order
    },
    "pricing": *[_type == "faq" && category == "pricing"] | order(order asc) {
      _id,
      ${localizedField('question', locale)},
      ${localizedPortableText('answer', locale)},
      category,
      order
    },
    "treatments": *[_type == "faq" && category == "treatments"] | order(order asc) {
      _id,
      ${localizedField('question', locale)},
      ${localizedPortableText('answer', locale)},
      category,
      order
    },
    "appointments": *[_type == "faq" && category == "appointments"] | order(order asc) {
      _id,
      ${localizedField('question', locale)},
      ${localizedPortableText('answer', locale)},
      category,
      order
    }
  }`

  return client.fetch(query)
}

// ============================================
// PRICE QUERIES
// ============================================

export async function getPrices(
  locale: Locale,
  options?: {
    serviceSlug?: string
    includesInCalculator?: boolean
  }
) {
  const { serviceSlug, includesInCalculator } = options || {}

  let filter = '_type == "price"'
  if (serviceSlug) {
    filter += ' && service->slug.current == $serviceSlug'
  }
  if (includesInCalculator !== undefined) {
    filter += ' && includesInCalculator == $includesInCalculator'
  }

  const query = `*[${filter}] | order(service->order asc, priceMin asc) {
    _id,
    "service": service-> {
      _id,
      ${localizedField('title', locale)},
      "slug": slug.current,
      icon
    },
    ${localizedField('name', locale)},
    ${localizedField('description', locale)},
    priceMin,
    priceMax,
    unit,
    isPromotion,
    promotionPrice,
    includesInCalculator
  }`

  return client.fetch(query, { serviceSlug, includesInCalculator })
}

export async function getPricesGroupedByService(locale: Locale) {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current,
    icon,
    "prices": *[_type == "price" && references(^._id)] | order(priceMin asc) {
      _id,
      ${localizedField('name', locale)},
      ${localizedField('description', locale)},
      priceMin,
      priceMax,
      unit,
      isPromotion,
      promotionPrice,
      includesInCalculator
    }
  }`

  return client.fetch(query)
}

// ============================================
// SETTINGS QUERIES
// ============================================

export async function getSettings(locale: Locale) {
  const query = `*[_type == "settings" && _id == "siteSettings"][0] {
    _id,
    ${localizedField('siteName', locale)},
    logo {
      asset->,
      alt
    },
    contact {
      phone,
      email,
      whatsapp,
      ${localizedField('address', locale)}
    },
    workingHours[] {
      ${localizedField('days', locale)},
      hours,
      closed
    },
    socialLinks {
      facebook,
      instagram,
      youtube,
      linkedin,
      tiktok
    },
    googleMapsEmbed
  }`

  return client.fetch(query)
}

// ============================================
// LEGAL PAGE QUERIES
// ============================================

export async function getLegalPageBySlug(slug: string, locale: Locale) {
  const query = `*[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    ${localizedField('title', locale)},
    "slug": slug.current,
    ${localizedPortableText('content', locale)},
    lastUpdated
  }`

  return client.fetch(query, { slug })
}

export async function getLegalPageSlugs() {
  const query = `*[_type == "legalPage"] { "slug": slug.current }`
  return client.fetch<Array<{ slug: string }>>(query)
}
