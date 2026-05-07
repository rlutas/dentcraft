// Patient-facing scenario definitions for the price calculator.
// Each scenario asks 0-2 sub-questions and resolves to LineItem[] referencing
// real treatment IDs from `./treatments.ts`.
//
// Translates clinical jargon ("implant + bont + coroana") into intent
// ("Mi-am pierdut un dinte") so patients can self-estimate without
// learning the catalog.

import { findTreatment, type Locale } from './treatments'

export type Tier = 'economic' | 'mediu' | 'premium' | 'doctor'
export type SubQuestionType = 'count' | 'tier' | 'choice' | 'arcades' | 'package'

export type SubQuestion = {
  id: string
  type: SubQuestionType
  labels: Record<Locale, string>
  options?: Array<{
    value: string
    labels: Record<Locale, string>
    hint?: Record<Locale, string>
  }>
  min?: number
  max?: number
  default: string | number
}

export type LineItem = {
  treatmentRef: { categoryId: string; treatmentId: string }
  qty: number
}

export type ScenarioAnswer = Record<string, string | number>

export type Scenario = {
  id: string
  icon: string // path under /public/icons/
  labels: Record<Locale, { title: string; subtitle: string }>
  questions: SubQuestion[]
  resolve: (a: ScenarioAnswer) => {
    items: LineItem[]
    notes?: Array<Record<Locale, string>>
  }
}

// ---------- shared helpers ----------

const ref = (categoryId: string, treatmentId: string) => ({
  categoryId,
  treatmentId,
})

const toNumber = (v: string | number | undefined, fallback: number): number => {
  if (typeof v === 'number') return v
  if (typeof v === 'string' && v !== '') {
    const parsed = Number(v)
    if (!Number.isNaN(parsed)) return parsed
  }
  return fallback
}

const toString = (v: string | number | undefined, fallback: string): string => {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  return fallback
}

// ---------- scenarios ----------

export const scenarios: Scenario[] = [
  // 1. Lost a tooth ----------------------------------------------------------
  {
    id: 'lost-tooth',
    icon: '024-dental-implant.svg',
    labels: {
      ro: {
        title: 'Mi-am pierdut un dinte',
        subtitle: 'Sau 2-3 dinți. Vreau să-i înlocuiesc.',
      },
      en: {
        title: 'I lost a tooth',
        subtitle: 'Or 2-3 teeth. I want to replace them.',
      },
      hu: {
        title: 'Elveszítettem egy fogat',
        subtitle: 'Vagy 2-3 fogat. Pótolni szeretném.',
      },
    },
    questions: [
      {
        id: 'count',
        type: 'count',
        labels: {
          ro: 'Câți dinți?',
          en: 'How many teeth?',
          hu: 'Hány fog?',
        },
        min: 1,
        max: 3,
        default: 1,
      },
      {
        id: 'tier',
        type: 'tier',
        labels: {
          ro: 'Ce nivel preferi?',
          en: 'Which tier?',
          hu: 'Melyik szintet választod?',
        },
        options: [
          {
            value: 'economic',
            labels: { ro: 'Economic', en: 'Economic', hu: 'Gazdaságos' },
            hint: {
              ro: 'Implant INO + coroană metaloceramică',
              en: 'INO implant + porcelain-fused-to-metal crown',
              hu: 'INO implantátum + fém-porcelán korona',
            },
          },
          {
            value: 'mediu',
            labels: { ro: 'Mediu', en: 'Mid-range', hu: 'Közepes' },
            hint: {
              ro: 'Implant Megagen + coroană zirconiu CAD CAM',
              en: 'Megagen implant + zirconia CAD CAM crown',
              hu: 'Megagen implantátum + cirkónium CAD CAM korona',
            },
          },
          {
            value: 'premium',
            labels: { ro: 'Premium', en: 'Premium', hu: 'Prémium' },
            hint: {
              ro: 'Implant Straumann + coroană total-ceramică',
              en: 'Straumann implant + full ceramic crown',
              hu: 'Straumann implantátum + teljes kerámia korona',
            },
          },
          {
            value: 'doctor',
            labels: {
              ro: 'Las doctorul să recomande',
              en: 'Let the doctor recommend',
              hu: 'A doktor döntsön',
            },
            hint: {
              ro: 'Estimare cu range complet',
              en: 'Estimate with full range',
              hu: 'Teljes árskála',
            },
          },
        ],
        default: 'doctor',
      },
    ],
    resolve: (a) => {
      const count = Math.max(1, Math.min(3, toNumber(a['count'], 1)))
      const tier = toString(a['tier'], 'doctor') as Tier

      const implantByTier: Record<Tier, string> = {
        economic: 'implant-dentar-ino',
        mediu: 'implant-dentar-megagen',
        premium: 'implant-straumann',
        doctor: 'implant-dentar-ino',
      }
      const crownByTier: Record<Tier, string> = {
        economic: 'coroana-metalo-ceramica-pe-implant',
        mediu: 'coroana-ceramica-pe-suport-zirconiu-cad-cam-pentru-implant',
        premium: 'coroana-total-ceramica-ceramica-presata-pe-implant',
        doctor: 'coroana-metalo-ceramica-pe-implant',
      }

      return {
        items: [
          { treatmentRef: ref('implantologie', implantByTier[tier]), qty: count },
          { treatmentRef: ref('implantologie', 'bont-protetic-hibrid'), qty: count },
          { treatmentRef: ref('implantologie', crownByTier[tier]), qty: count },
        ],
        notes: [
          {
            ro: 'Estimarea include implant + bont + coroană. Dacă lipsește os în zona implantului, se poate adăuga augmentare osoasă (+3000 RON).',
            en: 'Estimate includes implant + abutment + crown. If bone is missing, augmentation may be added (+3000 RON).',
            hu: 'A becslés tartalmazza az implantátumot + felépítményt + koronát. Ha hiányzik a csont, csontpótlás szükséges (+3000 RON).',
          },
        ],
      }
    },
  },

  // 2. Full mouth rehab ------------------------------------------------------
  {
    id: 'full-rehab',
    icon: '057-implants.svg',
    labels: {
      ro: {
        title: 'Reabilitare totală',
        subtitle: 'Mulți dinți lipsă. Vreau soluție completă.',
      },
      en: {
        title: 'Full mouth rehab',
        subtitle: 'Many missing teeth. I need a complete solution.',
      },
      hu: {
        title: 'Teljes szájrehabilitáció',
        subtitle: 'Sok hiányzó fog. Teljes megoldást szeretnék.',
      },
    },
    questions: [
      {
        id: 'arcades',
        type: 'arcades',
        labels: {
          ro: 'Care arcadă?',
          en: 'Which arch?',
          hu: 'Melyik fogív?',
        },
        options: [
          {
            value: 'one',
            labels: {
              ro: 'O arcadă (sus sau jos)',
              en: 'One arch (upper or lower)',
              hu: 'Egy fogív',
            },
          },
          {
            value: 'both',
            labels: {
              ro: 'Ambele arcade',
              en: 'Both arches',
              hu: 'Mindkét fogív',
            },
          },
        ],
        default: 'one',
      },
      {
        id: 'tier',
        type: 'tier',
        labels: {
          ro: 'Ce nivel preferi?',
          en: 'Which tier?',
          hu: 'Melyik szintet választod?',
        },
        options: [
          {
            value: 'economic',
            labels: { ro: 'Economic', en: 'Economic', hu: 'Gazdaságos' },
            hint: {
              ro: 'All-on-6 metaloceramic',
              en: 'All-on-6 PFM',
              hu: 'All-on-6 fém-porcelán',
            },
          },
          {
            value: 'mediu',
            labels: { ro: 'Mediu', en: 'Mid-range', hu: 'Közepes' },
            hint: {
              ro: 'All-on-4/6 zirconiu stratificat',
              en: 'All-on-4/6 layered zirconia',
              hu: 'All-on-4/6 réteges cirkónium',
            },
          },
          {
            value: 'premium',
            labels: { ro: 'Premium', en: 'Premium', hu: 'Prémium' },
            hint: {
              ro: 'All-on-6 E-Max',
              en: 'All-on-6 E-Max',
              hu: 'All-on-6 E-Max',
            },
          },
        ],
        default: 'mediu',
      },
    ],
    resolve: (a) => {
      const arcades = toString(a['arcades'], 'one')
      const tier = toString(a['tier'], 'mediu') as Exclude<Tier, 'doctor'>
      const arcadeCount = arcades === 'both' ? 2 : 1

      const treatmentByTier: Record<Exclude<Tier, 'doctor'>, string> = {
        economic: 'all-on-6-4-metalo-ceramica-si-gingie-stratificata',
        mediu: 'all-on-6-cu-zirconiu-stratificat-si-gingie-din-compozit',
        premium: 'all-on-6-cu-e-max-si-gingie-din-compozit',
      }

      return {
        items: [
          {
            treatmentRef: ref('protetica-dentara', treatmentByTier[tier]),
            qty: arcadeCount,
          },
        ],
        notes: [
          {
            ro: 'Pachetul include implanți, lucrare protetică finală și provizoriu. Numărul exact de implanți (4 sau 6) și materialul se decid la consult, în funcție de cantitatea de os disponibilă.',
            en: 'Package includes implants, final prosthesis, and temporary. The exact number of implants (4 or 6) and the material are decided at consultation, based on available bone.',
            hu: 'A csomag tartalmazza az implantátumokat, a végleges protézist és az ideiglenest. Az implantátumok pontos száma (4 vagy 6) és az anyag a konzultáción dől el, a rendelkezésre álló csont alapján.',
          },
        ],
      }
    },
  },

  // 3. Brighter smile --------------------------------------------------------
  {
    id: 'bright-smile',
    icon: '010-smile.svg',
    labels: {
      ro: {
        title: 'Vreau un zâmbet mai frumos',
        subtitle: 'Albire, fațete sau ambele.',
      },
      en: {
        title: 'I want a brighter smile',
        subtitle: 'Whitening, veneers, or both.',
      },
      hu: {
        title: 'Szebb mosolyt szeretnék',
        subtitle: 'Fehérítés, héjak vagy mindkettő.',
      },
    },
    questions: [
      {
        id: 'package',
        type: 'package',
        labels: {
          ro: 'Ce te interesează?',
          en: 'What are you interested in?',
          hu: 'Mi érdekel?',
        },
        options: [
          {
            value: 'whitening',
            labels: {
              ro: 'Doar albire',
              en: 'Just whitening',
              hu: 'Csak fehérítés',
            },
          },
          {
            value: 'veneers',
            labels: {
              ro: 'Doar fațete',
              en: 'Just veneers',
              hu: 'Csak héjak',
            },
          },
          {
            value: 'both',
            labels: {
              ro: 'Albire + fațete',
              en: 'Whitening + veneers',
              hu: 'Fehérítés + héjak',
            },
          },
        ],
        default: 'whitening',
      },
      {
        id: 'count',
        type: 'count',
        labels: {
          ro: 'Câte fațete? (de obicei 4-10 dinți frontali)',
          en: 'How many veneers? (typically 4-10 front teeth)',
          hu: 'Hány héj? (jellemzően 4-10 elülső fog)',
        },
        min: 4,
        max: 10,
        default: 6,
      },
    ],
    resolve: (a) => {
      const pkg = toString(a['package'], 'whitening')
      const count = Math.max(4, Math.min(10, toNumber(a['count'], 6)))

      const items: LineItem[] = []
      if (pkg === 'whitening' || pkg === 'both') {
        items.push({
          treatmentRef: ref(
            'estetica-dentara-albire-dentara',
            'albire-dentara-opalescence-ultradent-in-cabinet'
          ),
          qty: 1,
        })
      }
      if (pkg === 'veneers' || pkg === 'both') {
        items.push({
          treatmentRef: ref('protetica-dentara', 'waxup-mockup'),
          qty: 1,
        })
        items.push({
          treatmentRef: ref('protetica-dentara', 'fatete-din-ceramica-e-max'),
          qty: count,
        })
      }

      return {
        items,
        notes: [
          {
            ro: 'Fațetele E-Max sunt cele mai estetice și durabile pentru zona frontală. Albirea se face de obicei înainte de fațete pentru a stabili nuanța de referință.',
            en: 'E-Max veneers are the most esthetic and durable choice for the front zone. Whitening is usually done before veneers to set the reference shade.',
            hu: 'Az E-Max héjak a legesztétikusabb és legtartósabb választás az elülső területre. A fehérítés általában a héjak előtt történik a referencia árnyalat megállapításához.',
          },
        ],
      }
    },
  },

  // 4. Cleaning / checkup ---------------------------------------------------
  {
    id: 'cleaning',
    icon: '007-tooth-cleaning.svg',
    labels: {
      ro: {
        title: 'Igienizare / control',
        subtitle: 'Vreau detartraj sau control de rutină.',
      },
      en: {
        title: 'Cleaning / checkup',
        subtitle: 'Routine scaling or check.',
      },
      hu: {
        title: 'Tisztítás / ellenőrzés',
        subtitle: 'Rutin fogkőeltávolítás vagy ellenőrzés.',
      },
    },
    questions: [
      {
        id: 'package',
        type: 'package',
        labels: {
          ro: 'Ce pachet?',
          en: 'Which package?',
          hu: 'Melyik csomag?',
        },
        options: [
          {
            value: 'basic',
            labels: { ro: 'De bază', en: 'Basic', hu: 'Alap' },
            hint: {
              ro: 'Consult + detartraj ultrasonic',
              en: 'Check + ultrasonic scaling',
              hu: 'Ellenőrzés + ultrahangos fogkőeltávolítás',
            },
          },
          {
            value: 'complete',
            labels: { ro: 'Complet', en: 'Complete', hu: 'Teljes' },
            hint: {
              ro: 'Consult + detartraj + Air Flow + periaj + fluorizare',
              en: 'Check + scaling + Air Flow + polishing + fluoride',
              hu: 'Ellenőrzés + fogkőeltávolítás + Air Flow + polírozás + fluoridálás',
            },
          },
        ],
        default: 'basic',
      },
    ],
    resolve: (a) => {
      const pkg = toString(a['package'], 'basic')

      if (pkg === 'complete') {
        return {
          items: [
            {
              treatmentRef: ref('consultatii-control', 'consultatie-primara-poze-scanare'),
              qty: 1,
            },
            {
              treatmentRef: ref('igienizare-profilaxie', 'detartraj-ultrasonic'),
              qty: 1,
            },
            {
              treatmentRef: ref('igienizare-profilaxie', 'detartraj-profesional-cu-air-flow'),
              qty: 1,
            },
            {
              treatmentRef: ref('igienizare-profilaxie', 'periaj-dentar-profesional'),
              qty: 1,
            },
            {
              treatmentRef: ref('igienizare-profilaxie', 'fluorizare-topica'),
              qty: 1,
            },
          ],
        }
      }

      // basic
      return {
        items: [
          {
            treatmentRef: ref('consultatii-control', 'consultatie-discutie'),
            qty: 1,
          },
          {
            treatmentRef: ref('igienizare-profilaxie', 'detartraj-ultrasonic'),
            qty: 1,
          },
        ],
      }
    },
  },

  // 5. Pediatric ------------------------------------------------------------
  {
    id: 'pediatric',
    icon: '014-toothbrush.svg',
    labels: {
      ro: {
        title: 'Pentru copilul meu',
        subtitle: 'Stomatologie pediatrică.',
      },
      en: {
        title: 'For my child',
        subtitle: 'Pediatric dentistry.',
      },
      hu: {
        title: 'A gyermekemnek',
        subtitle: 'Gyermekfogászat.',
      },
    },
    questions: [
      {
        id: 'package',
        type: 'package',
        labels: {
          ro: 'Ce-l aduce?',
          en: "What's the reason?",
          hu: 'Mi a látogatás oka?',
        },
        options: [
          {
            value: 'checkup',
            labels: {
              ro: 'Control de rutină',
              en: 'Routine checkup',
              hu: 'Rutin ellenőrzés',
            },
          },
          {
            value: 'cavity',
            labels: {
              ro: 'Are o carie',
              en: 'Has a cavity',
              hu: 'Lyukas a foga',
            },
          },
          {
            value: 'extraction',
            labels: {
              ro: 'Trebuie scos un dinte de lapte',
              en: 'Needs a baby tooth removed',
              hu: 'Tejfog eltávolítása',
            },
          },
          {
            value: 'sealant',
            labels: {
              ro: 'Vreau sigilare la molari',
              en: 'Wants sealants on molars',
              hu: 'Barázdazárás molárisokra',
            },
          },
        ],
        default: 'checkup',
      },
    ],
    resolve: (a) => {
      const pkg = toString(a['package'], 'checkup')

      const baseConsult: LineItem = {
        treatmentRef: ref('pedodontie', 'consult-primar-pedodontic'),
        qty: 1,
      }

      if (pkg === 'cavity') {
        return {
          items: [
            baseConsult,
            {
              treatmentRef: ref(
                'pedodontie',
                'obturatie-coronara-dinte-temporar-cu-compozit-fotopolimerizabil'
              ),
              qty: 1,
            },
          ],
        }
      }

      if (pkg === 'extraction') {
        return {
          items: [
            baseConsult,
            {
              treatmentRef: ref('pedodontie', 'extractie-dinti-de-lapte-fara-mobilitate'),
              qty: 1,
            },
          ],
        }
      }

      if (pkg === 'sealant') {
        return {
          items: [
            baseConsult,
            {
              treatmentRef: ref('pedodontie', 'sigilare-santuri-si-fosete'),
              qty: 4,
            },
          ],
          notes: [
            {
              ro: 'Sigilarea molarilor permanenți (de obicei 4 dinți) protejează șanțurile de carii și e recomandată în primii ani după erupție.',
              en: 'Sealing permanent molars (usually 4 teeth) protects fissures from cavities and is recommended in the first years after eruption.',
              hu: 'Az állandó molárisok (általában 4 fog) barázdazárása megvédi a barázdákat a kariesztől, és az kitörés utáni első években ajánlott.',
            },
          ],
        }
      }

      // checkup
      return {
        items: [
          baseConsult,
          {
            treatmentRef: ref('pedodontie', 'detartraj-copii'),
            qty: 1,
          },
        ],
      }
    },
  },

  // 6. Braces ---------------------------------------------------------------
  {
    id: 'braces',
    icon: '038-braces.svg',
    labels: {
      ro: {
        title: 'Aparat dentar',
        subtitle: 'Pentru aliniere și ocluzie.',
      },
      en: {
        title: 'Braces',
        subtitle: 'For alignment and bite.',
      },
      hu: {
        title: 'Fogszabályozó',
        subtitle: 'Igazításra és harapásra.',
      },
    },
    questions: [
      {
        id: 'tier',
        type: 'tier',
        labels: {
          ro: 'Tip aparat',
          en: 'Type',
          hu: 'Típus',
        },
        options: [
          {
            value: 'economic',
            labels: { ro: 'Metalic', en: 'Metal', hu: 'Fém' },
            hint: {
              ro: 'Bracketi metalici clasici',
              en: 'Classic metal brackets',
              hu: 'Klasszikus fém zárak',
            },
          },
          {
            value: 'mediu',
            labels: { ro: 'Ceramic', en: 'Ceramic', hu: 'Kerámia' },
            hint: {
              ro: 'Bracketi fizionomici, mai discreți',
              en: 'Tooth-colored brackets, more discreet',
              hu: 'Fogszínű zárak, diszkrétebbek',
            },
          },
          {
            value: 'premium',
            labels: {
              ro: 'Invizibil (Clear Correct)',
              en: 'Invisible (Clear Correct)',
              hu: 'Láthatatlan (Clear Correct)',
            },
            hint: {
              ro: 'Aligneri transparenți, fără brackeți',
              en: 'Clear aligners, no brackets',
              hu: 'Átlátszó sínek, zárak nélkül',
            },
          },
        ],
        default: 'mediu',
      },
      {
        id: 'arcades',
        type: 'arcades',
        labels: {
          ro: 'Arcade',
          en: 'Arches',
          hu: 'Fogívek',
        },
        options: [
          {
            value: 'one',
            labels: { ro: 'O arcadă', en: 'One arch', hu: 'Egy fogív' },
          },
          {
            value: 'both',
            labels: { ro: 'Ambele', en: 'Both', hu: 'Mindkettő' },
          },
        ],
        default: 'both',
      },
    ],
    resolve: (a) => {
      const tier = toString(a['tier'], 'mediu') as Exclude<Tier, 'doctor'>
      const arcades = toString(a['arcades'], 'both')
      const arcadeCount = arcades === 'both' ? 2 : 1

      if (tier === 'premium') {
        return {
          items: [
            {
              treatmentRef: ref('ortodontie', 'clear-correct-aparat-ortodontic-invizibil'),
              qty: 1,
            },
          ],
          notes: [
            {
              ro: 'Aparatele fixe necesită activări lunare (cca 200 RON/activare). Tratamentul durează 12-24 luni. Clear Correct include toate seturile de aligneri.',
              en: 'Fixed braces require monthly activations (~200 RON each). Treatment lasts 12-24 months. Clear Correct includes all aligner sets.',
              hu: 'A fix készülékek havi aktiválást igényelnek (kb. 200 RON / aktiválás). A kezelés 12-24 hónapig tart. A Clear Correct minden sín készletet tartalmaz.',
            },
          ],
        }
      }

      const treatmentId =
        tier === 'economic'
          ? 'aparat-fix-pe-o-arcada-cu-bracketi-metalici'
          : 'aparat-fix-pe-o-arcada-cu-bracketi-ceramici-fizionomici'

      return {
        items: [
          {
            treatmentRef: ref('ortodontie', treatmentId),
            qty: arcadeCount,
          },
        ],
        notes: [
          {
            ro: 'Aparatele fixe necesită activări lunare (cca 200 RON/activare). Tratamentul durează 12-24 luni. Clear Correct include toate seturile de aligneri.',
            en: 'Fixed braces require monthly activations (~200 RON each). Treatment lasts 12-24 months. Clear Correct includes all aligner sets.',
            hu: 'A fix készülékek havi aktiválást igényelnek (kb. 200 RON / aktiválás). A kezelés 12-24 hónapig tart. A Clear Correct minden sín készletet tartalmaz.',
          },
        ],
      }
    },
  },

  // 7. Emergency ------------------------------------------------------------
  {
    id: 'emergency',
    icon: '031-broken-tooth.svg',
    labels: {
      ro: {
        title: 'Mă doare / urgență',
        subtitle: 'Am nevoie de o programare rapidă.',
      },
      en: {
        title: 'Pain / emergency',
        subtitle: 'I need a fast appointment.',
      },
      hu: {
        title: 'Fáj / sürgősségi',
        subtitle: 'Gyors időpontra van szükségem.',
      },
    },
    questions: [],
    resolve: () => ({
      items: [
        {
          treatmentRef: ref('consultatii-control', 'urgente'),
          qty: 1,
        },
      ],
      notes: [
        {
          ro: 'Tratamentul exact se decide după examen — în funcție de cauză, intervenția poate include tratament endodontic (800-1000 RON), extracție (250-500 RON) sau drenaj de abces (250 RON). Range total estimativ: 200-1500 RON.',
          en: 'Exact treatment is decided after exam — depending on cause, it may include endodontic treatment (800-1000 RON), extraction (250-500 RON) or abscess drainage (250 RON). Total estimated range: 200-1500 RON.',
          hu: 'A pontos kezelés a vizsgálat után dől el — az októl függően lehet endodontiai kezelés (800-1000 RON), foghúzás (250-500 RON) vagy tályogdrenázs (250 RON). Becsült tartomány: 200-1500 RON.',
        },
      ],
    }),
  },

  // 8. Consultation only ----------------------------------------------------
  {
    id: 'consultation-only',
    icon: '091-crown.svg',
    labels: {
      ro: {
        title: 'Vreau doar să discut',
        subtitle: 'Consultație și recomandări.',
      },
      en: {
        title: 'I just want to talk',
        subtitle: 'Consultation and recommendations.',
      },
      hu: {
        title: 'Csak konzultálni szeretnék',
        subtitle: 'Konzultáció és javaslatok.',
      },
    },
    questions: [],
    resolve: () => ({
      items: [
        {
          treatmentRef: ref('consultatii-control', 'consultatie-primara-poze-scanare'),
          qty: 1,
        },
      ],
      notes: [
        {
          ro: 'Consultația include discuție, examen clinic, fotografii și scanare. Pentru cazuri complexe (reabilitare, ortodonție), poate fi nevoie de documentare extinsă (500 RON).',
          en: 'Consultation includes conversation, clinical exam, photographs, and scanning. Complex cases (rehab, ortho) may need extended documentation (500 RON).',
          hu: 'A konzultáció tartalmazza a beszélgetést, klinikai vizsgálatot, fotókat és szkennelést. Komplex esetek (rehabilitáció, ortodoncia) kiterjedtebb dokumentációt igényelhetnek (500 RON).',
        },
      ],
    }),
  },
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}

// `findTreatment` is re-exported so consumers of this module can resolve
// LineItem -> Treatment in a single import.
export { findTreatment }
