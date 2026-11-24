import { serviceContentRo } from './ro'
import { serviceContentEn } from './en'
import { serviceContentHu } from './hu'
import type { ServiceContentLabels, ServiceContentLocale, ServiceContentLocaleFile } from './types'

export type { ServiceContentLabels, ServiceContentLocale, ServiceContentSection, ServiceContentFaq, ServiceContentLink } from './types'

const files: Record<string, ServiceContentLocaleFile> = {
  ro: serviceContentRo,
  en: serviceContentEn,
  hu: serviceContentHu,
}

// Clinic contact facts used by the contact callout (urgent page).
export const CLINIC_PHONE_DISPLAY = '0741 199 977'
export const CLINIC_PHONE_TEL = '+40741199977'
export const CLINIC_ADDRESS = 'Str. Barbu Ștefănescu Delavrancea nr. 3, Satu Mare'

// Doctor credited on each service page (slugs from src/lib/fallback-team.ts).
// Order matters: the first doctor is shown first. Unmapped slugs fall back to Dr. Petric.
const SERVICE_DOCTORS: Record<string, string[]> = {
  ortodontie: ['stefana-cozma'],
  pedodontie: ['denisa-ghirasim'],
  endodontie: ['denisa-ghirasim'],
  'chirurgie-oro-maxilo-faciala': ['codrut-buterchi'],
  'implanturi-dentare': ['codrut-buterchi', 'razvan-petric'],
  detartraj: ['remus-fernea'],
  protetica: ['razvan-petric'],
  'estetica-dentara': ['razvan-petric'],
  'fatete-dentare': ['razvan-petric'],
  'coroane-dentare': ['razvan-petric'],
  // Ambiguous: no specialist mapping, kept on the coordinating doctor.
  'albire-dentara': ['razvan-petric'],
  'urgente-dentare': ['razvan-petric'],
  'consultatie-stomatologica': ['razvan-petric'],
  'stomatologie-generala': ['razvan-petric'],
}

export const DEFAULT_SERVICE_DOCTOR = 'razvan-petric'

// Slugs whose legacy benefit/process blocks (from src/messages) contain claims we
// can't stand behind (free consultation, aligner brand names, extended hours,
// sedation, in-clinic radiology). When the new copy exists for the locale, those blocks are hidden.
const HIDE_LEGACY_BLOCKS = new Set([
  'consultatie-stomatologica',
  'ortodontie',
  'urgente-dentare',
  'pedodontie',
  'chirurgie-oro-maxilo-faciala',
])

// Pages that show the phone / hours / address callout at the top of the content.
const CONTACT_CALLOUT = new Set(['urgente-dentare'])

export function getServiceDoctorSlugs(slug: string): string[] {
  return SERVICE_DOCTORS[slug] ?? [DEFAULT_SERVICE_DOCTOR]
}

export function getServiceContent(slug: string, locale: string): ServiceContentLocale | null {
  return files[locale]?.services[slug] ?? null
}

export function getServiceContentLabels(locale: string): ServiceContentLabels {
  return (files[locale] ?? serviceContentRo).labels
}

export function shouldHideLegacyBlocks(slug: string, locale: string): boolean {
  return HIDE_LEGACY_BLOCKS.has(slug) && getServiceContent(slug, locale) !== null
}

export function showsContactCallout(slug: string): boolean {
  return CONTACT_CALLOUT.has(slug)
}
