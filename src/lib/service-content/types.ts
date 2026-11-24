// Types for the per-service editorial copy rendered on /servicii/[slug].
// Copy lives in ro.ts / en.ts / hu.ts; wiring lives in index.ts.

export type ServiceContentSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  /** Optional paragraph rendered after the bullet list. */
  after?: string
}

export type ServiceContentFaq = {
  question: string
  answer: string
}

/** Contextual internal link rendered under the content sections. */
export type ServiceContentLink =
  | { label: string; page: '/preturi' | '/contact' }
  | { label: string; doctor: string }

export type ServiceContentLocale = {
  /** 40–60 word answer paragraph shown right under the hero. */
  intro: string
  sections: ServiceContentSection[]
  faqs: ServiceContentFaq[]
  links?: ServiceContentLink[]
}

/** UI strings used by the service-content block (one set per locale). */
export type ServiceContentLabels = {
  introLabel: string
  updatedLabel: string
  updatedValue: string
  contactTitle: string
  contactCall: string
  contactHoursLabel: string
  contactHours: string
  contactAddressLabel: string
  contactLanguages: string
  linksLabel: string
}

export type ServiceContentLocaleFile = {
  labels: ServiceContentLabels
  services: Partial<Record<string, ServiceContentLocale>>
}
