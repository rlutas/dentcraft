import type { LucideIcon } from 'lucide-react'
import {
  Stethoscope,
  Crosshair,
  ShieldCheck,
  Smile,
  Zap,
  Scan,
  Crown,
  Activity,
  Scissors,
  Sparkles,
  AlertCircle,
  Heart,
} from 'lucide-react'

// Fallback service type used when Sanity has no data
export type FallbackService = {
  slug: string
  titleKey: string
  descriptionKey: string
  Icon: LucideIcon
  iconPath?: string // Optional custom icon image path (for custom PNG/SVG icons)
  order: number
  // Full service details for individual pages
  benefits?: Array<{
    titleKey: string
    descriptionKey: string
  }>
  process?: Array<{
    stepNumber: number
    titleKey: string
    descriptionKey: string
  }>
}

// Fallback services data - 9 main PRD services + detailed sub-services
export const fallbackServices: FallbackService[] = [
  // ===== 9 MAIN PRD SERVICES (order 1-9) =====

  // 1. Stomatologie Generala (General Dentistry)
  {
    slug: 'stomatologie-generala',
    titleKey: 'generalDentistry',
    descriptionKey: 'generalDentistryDesc',
    Icon: Stethoscope,
    iconPath: '/icons/028-dentist.svg',
    order: 1,
    benefits: [
      { titleKey: 'generalDentistryBenefit1Title', descriptionKey: 'generalDentistryBenefit1Desc' },
      { titleKey: 'generalDentistryBenefit2Title', descriptionKey: 'generalDentistryBenefit2Desc' },
      { titleKey: 'generalDentistryBenefit3Title', descriptionKey: 'generalDentistryBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'generalDentistryStep1Title', descriptionKey: 'generalDentistryStep1Desc' },
      { stepNumber: 2, titleKey: 'generalDentistryStep2Title', descriptionKey: 'generalDentistryStep2Desc' },
      { stepNumber: 3, titleKey: 'generalDentistryStep3Title', descriptionKey: 'generalDentistryStep3Desc' },
    ],
  },

  // 2. Estetica Dentara (Cosmetic Dentistry)
  {
    slug: 'estetica-dentara',
    titleKey: 'cosmeticDentistry',
    descriptionKey: 'cosmeticDentistryDesc',
    Icon: Smile,
    iconPath: '/icons/010-smile.svg',
    order: 2,
    benefits: [
      { titleKey: 'cosmeticDentistryBenefit1Title', descriptionKey: 'cosmeticDentistryBenefit1Desc' },
      { titleKey: 'cosmeticDentistryBenefit2Title', descriptionKey: 'cosmeticDentistryBenefit2Desc' },
      { titleKey: 'cosmeticDentistryBenefit3Title', descriptionKey: 'cosmeticDentistryBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'cosmeticDentistryStep1Title', descriptionKey: 'cosmeticDentistryStep1Desc' },
      { stepNumber: 2, titleKey: 'cosmeticDentistryStep2Title', descriptionKey: 'cosmeticDentistryStep2Desc' },
      { stepNumber: 3, titleKey: 'cosmeticDentistryStep3Title', descriptionKey: 'cosmeticDentistryStep3Desc' },
    ],
  },

  // 3. Protetica (Prosthetics)
  {
    slug: 'protetica',
    titleKey: 'prosthetics',
    descriptionKey: 'prostheticsDesc',
    Icon: Crown,
    iconPath: '/icons/015-denture.svg',
    order: 3,
    benefits: [
      { titleKey: 'prostheticsBenefit1Title', descriptionKey: 'prostheticsBenefit1Desc' },
      { titleKey: 'prostheticsBenefit2Title', descriptionKey: 'prostheticsBenefit2Desc' },
      { titleKey: 'prostheticsBenefit3Title', descriptionKey: 'prostheticsBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'prostheticsStep1Title', descriptionKey: 'prostheticsStep1Desc' },
      { stepNumber: 2, titleKey: 'prostheticsStep2Title', descriptionKey: 'prostheticsStep2Desc' },
      { stepNumber: 3, titleKey: 'prostheticsStep3Title', descriptionKey: 'prostheticsStep3Desc' },
      { stepNumber: 4, titleKey: 'prostheticsStep4Title', descriptionKey: 'prostheticsStep4Desc' },
    ],
  },

  // 4. Implantologie (Implantology)
  {
    slug: 'implantologie',
    titleKey: 'implantology',
    descriptionKey: 'implantologyDesc',
    Icon: Crosshair,
    iconPath: '/icons/024-dental-implant.svg',
    order: 4,
    benefits: [
      { titleKey: 'implantologyBenefit1Title', descriptionKey: 'implantologyBenefit1Desc' },
      { titleKey: 'implantologyBenefit2Title', descriptionKey: 'implantologyBenefit2Desc' },
      { titleKey: 'implantologyBenefit3Title', descriptionKey: 'implantologyBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'implantologyStep1Title', descriptionKey: 'implantologyStep1Desc' },
      { stepNumber: 2, titleKey: 'implantologyStep2Title', descriptionKey: 'implantologyStep2Desc' },
      { stepNumber: 3, titleKey: 'implantologyStep3Title', descriptionKey: 'implantologyStep3Desc' },
      { stepNumber: 4, titleKey: 'implantologyStep4Title', descriptionKey: 'implantologyStep4Desc' },
    ],
  },

  // 5. Ortodontie (Orthodontics)
  {
    slug: 'ortodontie',
    titleKey: 'orthodontics',
    descriptionKey: 'orthodonticsDesc',
    Icon: Activity,
    iconPath: '/icons/009-teeth.svg',
    order: 5,
    benefits: [
      { titleKey: 'orthodonticsBenefit1Title', descriptionKey: 'orthodonticsBenefit1Desc' },
      { titleKey: 'orthodonticsBenefit2Title', descriptionKey: 'orthodonticsBenefit2Desc' },
      { titleKey: 'orthodonticsBenefit3Title', descriptionKey: 'orthodonticsBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'orthodonticsStep1Title', descriptionKey: 'orthodonticsStep1Desc' },
      { stepNumber: 2, titleKey: 'orthodonticsStep2Title', descriptionKey: 'orthodonticsStep2Desc' },
      { stepNumber: 3, titleKey: 'orthodonticsStep3Title', descriptionKey: 'orthodonticsStep3Desc' },
      { stepNumber: 4, titleKey: 'orthodonticsStep4Title', descriptionKey: 'orthodonticsStep4Desc' },
    ],
  },

  // 6. Endodontie (Endodontics)
  {
    slug: 'endodontie',
    titleKey: 'endodontics',
    descriptionKey: 'endodonticsDesc',
    Icon: Heart,
    iconPath: '/icons/029-dental-care.svg',
    order: 6,
    benefits: [
      { titleKey: 'endodonticsBenefit1Title', descriptionKey: 'endodonticsBenefit1Desc' },
      { titleKey: 'endodonticsBenefit2Title', descriptionKey: 'endodonticsBenefit2Desc' },
      { titleKey: 'endodonticsBenefit3Title', descriptionKey: 'endodonticsBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'endodonticsStep1Title', descriptionKey: 'endodonticsStep1Desc' },
      { stepNumber: 2, titleKey: 'endodonticsStep2Title', descriptionKey: 'endodonticsStep2Desc' },
      { stepNumber: 3, titleKey: 'endodonticsStep3Title', descriptionKey: 'endodonticsStep3Desc' },
    ],
  },

  // 7. Chirurgie Oro-Maxilo-Faciala (Oral Surgery)
  {
    slug: 'chirurgie-oro-maxilo-faciala',
    titleKey: 'oralSurgery',
    descriptionKey: 'oralSurgeryDesc',
    Icon: Scissors,
    iconPath: '/icons/036-anesthesia.svg',
    order: 7,
    benefits: [
      { titleKey: 'oralSurgeryBenefit1Title', descriptionKey: 'oralSurgeryBenefit1Desc' },
      { titleKey: 'oralSurgeryBenefit2Title', descriptionKey: 'oralSurgeryBenefit2Desc' },
      { titleKey: 'oralSurgeryBenefit3Title', descriptionKey: 'oralSurgeryBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'oralSurgeryStep1Title', descriptionKey: 'oralSurgeryStep1Desc' },
      { stepNumber: 2, titleKey: 'oralSurgeryStep2Title', descriptionKey: 'oralSurgeryStep2Desc' },
      { stepNumber: 3, titleKey: 'oralSurgeryStep3Title', descriptionKey: 'oralSurgeryStep3Desc' },
    ],
  },

  // 8. Pedodontie (Pediatric Dentistry)
  {
    slug: 'pedodontie',
    titleKey: 'pediatricDentistry',
    descriptionKey: 'pediatricDentistryDesc',
    Icon: Sparkles,
    iconPath: '/icons/002-tooth-7.svg',
    order: 8,
    benefits: [
      { titleKey: 'pediatricDentistryBenefit1Title', descriptionKey: 'pediatricDentistryBenefit1Desc' },
      { titleKey: 'pediatricDentistryBenefit2Title', descriptionKey: 'pediatricDentistryBenefit2Desc' },
      { titleKey: 'pediatricDentistryBenefit3Title', descriptionKey: 'pediatricDentistryBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'pediatricDentistryStep1Title', descriptionKey: 'pediatricDentistryStep1Desc' },
      { stepNumber: 2, titleKey: 'pediatricDentistryStep2Title', descriptionKey: 'pediatricDentistryStep2Desc' },
      { stepNumber: 3, titleKey: 'pediatricDentistryStep3Title', descriptionKey: 'pediatricDentistryStep3Desc' },
    ],
  },

  // 9. Urgente Dentare (Dental Emergencies)
  {
    slug: 'urgente-dentare',
    titleKey: 'dentalEmergencies',
    descriptionKey: 'dentalEmergenciesDesc',
    Icon: AlertCircle,
    iconPath: '/icons/003-toothache.svg',
    order: 9,
    benefits: [
      { titleKey: 'dentalEmergenciesBenefit1Title', descriptionKey: 'dentalEmergenciesBenefit1Desc' },
      { titleKey: 'dentalEmergenciesBenefit2Title', descriptionKey: 'dentalEmergenciesBenefit2Desc' },
      { titleKey: 'dentalEmergenciesBenefit3Title', descriptionKey: 'dentalEmergenciesBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'dentalEmergenciesStep1Title', descriptionKey: 'dentalEmergenciesStep1Desc' },
      { stepNumber: 2, titleKey: 'dentalEmergenciesStep2Title', descriptionKey: 'dentalEmergenciesStep2Desc' },
      { stepNumber: 3, titleKey: 'dentalEmergenciesStep3Title', descriptionKey: 'dentalEmergenciesStep3Desc' },
    ],
  },

  // ===== DETAILED SUB-SERVICES (order 10+) =====

  // Sub-service: Consultatie Stomatologica (part of Stomatologie Generala)
  {
    slug: 'consultatie-stomatologica',
    titleKey: 'consultation',
    descriptionKey: 'consultationDesc',
    Icon: Stethoscope,
    iconPath: '/icons/028-dentist.svg',
    order: 10,
    benefits: [
      { titleKey: 'consultationBenefit1Title', descriptionKey: 'consultationBenefit1Desc' },
      { titleKey: 'consultationBenefit2Title', descriptionKey: 'consultationBenefit2Desc' },
      { titleKey: 'consultationBenefit3Title', descriptionKey: 'consultationBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'consultationStep1Title', descriptionKey: 'consultationStep1Desc' },
      { stepNumber: 2, titleKey: 'consultationStep2Title', descriptionKey: 'consultationStep2Desc' },
      { stepNumber: 3, titleKey: 'consultationStep3Title', descriptionKey: 'consultationStep3Desc' },
    ],
  },

  // Sub-service: Implanturi Dentare (part of Implantologie)
  {
    slug: 'implanturi-dentare',
    titleKey: 'implants',
    descriptionKey: 'implantsDesc',
    Icon: Crosshair,
    iconPath: '/icons/024-dental-implant.svg',
    order: 11,
    benefits: [
      { titleKey: 'implantsBenefit1Title', descriptionKey: 'implantsBenefit1Desc' },
      { titleKey: 'implantsBenefit2Title', descriptionKey: 'implantsBenefit2Desc' },
      { titleKey: 'implantsBenefit3Title', descriptionKey: 'implantsBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'implantsStep1Title', descriptionKey: 'implantsStep1Desc' },
      { stepNumber: 2, titleKey: 'implantsStep2Title', descriptionKey: 'implantsStep2Desc' },
      { stepNumber: 3, titleKey: 'implantsStep3Title', descriptionKey: 'implantsStep3Desc' },
      { stepNumber: 4, titleKey: 'implantsStep4Title', descriptionKey: 'implantsStep4Desc' },
    ],
  },

  // Sub-service: Coroane Dentare (part of Protetica)
  {
    slug: 'coroane-dentare',
    titleKey: 'crowns',
    descriptionKey: 'crownsDesc',
    Icon: ShieldCheck,
    iconPath: '/icons/032-tooth.svg',
    order: 12,
    benefits: [
      { titleKey: 'crownsBenefit1Title', descriptionKey: 'crownsBenefit1Desc' },
      { titleKey: 'crownsBenefit2Title', descriptionKey: 'crownsBenefit2Desc' },
      { titleKey: 'crownsBenefit3Title', descriptionKey: 'crownsBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'crownsStep1Title', descriptionKey: 'crownsStep1Desc' },
      { stepNumber: 2, titleKey: 'crownsStep2Title', descriptionKey: 'crownsStep2Desc' },
      { stepNumber: 3, titleKey: 'crownsStep3Title', descriptionKey: 'crownsStep3Desc' },
    ],
  },

  // Sub-service: Fatete Dentare (part of Estetica Dentara)
  {
    slug: 'fatete-dentare',
    titleKey: 'veneers',
    descriptionKey: 'veneersDesc',
    Icon: Smile,
    iconPath: '/icons/010-smile.svg',
    order: 13,
    benefits: [
      { titleKey: 'veneersBenefit1Title', descriptionKey: 'veneersBenefit1Desc' },
      { titleKey: 'veneersBenefit2Title', descriptionKey: 'veneersBenefit2Desc' },
      { titleKey: 'veneersBenefit3Title', descriptionKey: 'veneersBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'veneersStep1Title', descriptionKey: 'veneersStep1Desc' },
      { stepNumber: 2, titleKey: 'veneersStep2Title', descriptionKey: 'veneersStep2Desc' },
      { stepNumber: 3, titleKey: 'veneersStep3Title', descriptionKey: 'veneersStep3Desc' },
    ],
  },

  // Sub-service: Albire Dentara (part of Estetica Dentara)
  {
    slug: 'albire-dentara',
    titleKey: 'whitening',
    descriptionKey: 'whiteningDesc',
    Icon: Zap,
    iconPath: '/icons/008-white-teeth.svg',
    order: 14,
    benefits: [
      { titleKey: 'whiteningBenefit1Title', descriptionKey: 'whiteningBenefit1Desc' },
      { titleKey: 'whiteningBenefit2Title', descriptionKey: 'whiteningBenefit2Desc' },
      { titleKey: 'whiteningBenefit3Title', descriptionKey: 'whiteningBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'whiteningStep1Title', descriptionKey: 'whiteningStep1Desc' },
      { stepNumber: 2, titleKey: 'whiteningStep2Title', descriptionKey: 'whiteningStep2Desc' },
      { stepNumber: 3, titleKey: 'whiteningStep3Title', descriptionKey: 'whiteningStep3Desc' },
    ],
  },

  // Sub-service: Detartraj (part of Stomatologie Generala)
  {
    slug: 'detartraj',
    titleKey: 'scaling',
    descriptionKey: 'scalingDesc',
    Icon: Scan,
    iconPath: '/icons/007-tooth-cleaning.svg',
    order: 15,
    benefits: [
      { titleKey: 'scalingBenefit1Title', descriptionKey: 'scalingBenefit1Desc' },
      { titleKey: 'scalingBenefit2Title', descriptionKey: 'scalingBenefit2Desc' },
      { titleKey: 'scalingBenefit3Title', descriptionKey: 'scalingBenefit3Desc' },
    ],
    process: [
      { stepNumber: 1, titleKey: 'scalingStep1Title', descriptionKey: 'scalingStep1Desc' },
      { stepNumber: 2, titleKey: 'scalingStep2Title', descriptionKey: 'scalingStep2Desc' },
      { stepNumber: 3, titleKey: 'scalingStep3Title', descriptionKey: 'scalingStep3Desc' },
    ],
  },
]

// Get fallback service by slug
export function getFallbackServiceBySlug(slug: string): FallbackService | undefined {
  return fallbackServices.find((service) => service.slug === slug)
}

// Get all fallback service slugs
export function getFallbackServiceSlugs(): string[] {
  return fallbackServices.map((service) => service.slug)
}

// Get only main category services (order 1-9)
export function getMainFallbackServices(): FallbackService[] {
  return fallbackServices.filter((service) => service.order <= 9).sort((a, b) => a.order - b.order)
}

// Get only sub-services (order 10+)
export function getSubFallbackServices(): FallbackService[] {
  return fallbackServices.filter((service) => service.order >= 10).sort((a, b) => a.order - b.order)
}
