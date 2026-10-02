// Public view of the Stomawin catalog. `treatments.ts` is auto-generated from
// the clinic export, so services the clinic doesn't offer are filtered here
// instead — the rules survive every re-export.
//
// - No metal-ceramic work (coroane / lucrări metalo-ceramice).
// - Implants: one system only, Bredent. Other implant brands are hidden.

import {
  treatmentCategories,
  type Locale,
  type Treatment,
  type TreatmentCategory,
} from './treatments'

function isOffered(categoryId: string, t: Treatment): boolean {
  if (/metalo/i.test(t.labels.ro)) return false
  if (categoryId === 'implantologie' && /^implant-/.test(t.id) && !/bredent/.test(t.id)) {
    return false
  }
  return true
}

// Display order for the price list tabs: everyday care first, complex work
// after. Categories missing from this list (new ones in a future export) are
// appended at the end in export order.
const CATEGORY_ORDER = [
  'consultatii-control',
  'igienizare-profilaxie',
  'odontoterapie',
  'endodontie',
  'estetica-dentara-albire-dentara',
  'protetica-dentara',
  'implantologie',
  'ortodontie',
  'parodontologie',
  'chirurgie-dento-alveolara',
  'chirurgie-oro-maxilo-faciala',
  'pedodontie',
]

// Short tab labels. The export's category names are long and partly
// untranslated ("Chirurgie Oro Maxilo Faciala" in all three locales).
const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  'consultatii-control': { ro: 'Consultații', en: 'Consultations', hu: 'Konzultáció' },
  'igienizare-profilaxie': { ro: 'Igienizare', en: 'Cleaning', hu: 'Szájhigiénia' },
  odontoterapie: { ro: 'Plombe', en: 'Fillings', hu: 'Tömések' },
  endodontie: { ro: 'Tratament de canal', en: 'Root canal', hu: 'Gyökérkezelés' },
  'estetica-dentara-albire-dentara': { ro: 'Albire', en: 'Whitening', hu: 'Fogfehérítés' },
  'protetica-dentara': { ro: 'Protetică', en: 'Prosthetics', hu: 'Fogpótlás' },
  implantologie: { ro: 'Implanturi', en: 'Implants', hu: 'Implantátumok' },
  ortodontie: { ro: 'Ortodonție', en: 'Orthodontics', hu: 'Fogszabályozás' },
  parodontologie: { ro: 'Parodontologie', en: 'Periodontics', hu: 'Parodontológia' },
  'chirurgie-dento-alveolara': {
    ro: 'Extracții și chirurgie',
    en: 'Extractions & surgery',
    hu: 'Foghúzás, sebészet',
  },
  'chirurgie-oro-maxilo-faciala': {
    ro: 'Chirurgie maxilo-facială',
    en: 'Maxillofacial surgery',
    hu: 'Szájsebészet',
  },
  pedodontie: { ro: 'Copii', en: 'Children', hu: 'Gyermekfogászat' },
}

export function getPublicCategories(): TreatmentCategory[] {
  const rank = (id: string) => {
    const i = CATEGORY_ORDER.indexOf(id)
    return i === -1 ? CATEGORY_ORDER.length : i
  }
  return treatmentCategories
    .map((c) => ({
      ...c,
      labels: CATEGORY_LABELS[c.id] ?? c.labels,
      treatments: c.treatments.filter((t) => isOffered(c.id, t)),
    }))
    .filter((c) => c.treatments.length > 0)
    .sort((a, b) => rank(a.id) - rank(b.id))
}
