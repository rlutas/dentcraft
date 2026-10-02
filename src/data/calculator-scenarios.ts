// Patient-facing scenario definitions for the price calculator.
// Each scenario asks 0-2 sub-questions and resolves to LineItem[] referencing
// real treatment IDs from `./treatments.ts`.
//
// Translates clinical jargon ("implant + bont + coroana") into intent
// ("Mi-am pierdut un dinte") so patients can self-estimate without
// learning the catalog.

import { findTreatment, type Locale } from './treatments'

export type SubQuestionType = 'count' | 'choice' | 'arcades' | 'package'

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
  // Count questions: unit shown under the number ("1 dinte" / "3 dinți").
  unit?: Record<Locale, { one: string; other: string }>
  // Hide the question when it doesn't apply to the current answers.
  showIf?: (a: ScenarioAnswer) => boolean
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

const coerceToString = (v: string | number | undefined, fallback: string): string => {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  return fallback
}

// ---------- shared notes ----------

const BRACES_NOTE_CLEAR_CORRECT: Record<Locale, string> = {
  ro: 'Clear Correct e o variantă invizibilă — pachetul include toate seturile de aligneri. Durata tratamentului depinde de complexitatea cazului.',
  en: 'Clear Correct is an invisible option — the package includes all aligner sets. Treatment length depends on how complex the case is.',
  hu: 'A Clear Correct láthatatlan megoldás — a csomag minden sín készletet tartalmaz. A kezelés időtartama az eset összetettségétől függ.',
}

const BRACES_NOTE_FIXED: Record<Locale, string> = {
  ro: 'Aparatul fix necesită activări periodice, de obicei o dată pe lună, pe toată durata tratamentului.',
  en: 'Fixed braces need regular activations, usually once a month, for the whole treatment.',
  hu: 'A fix készülék rendszeres aktiválást igényel, általában havonta egyszer, a kezelés teljes ideje alatt.',
}

const VENEER_NOTE: Record<Locale, string> = {
  ro: 'Pentru zona frontală recomand fațete E-Max — sunt cele mai estetice și durabile. Albirea o facem înainte de fațete ca să stabilim nuanța de referință.',
  en: 'For the front zone I recommend E-Max veneers — most esthetic and durable. We do whitening before veneers to set the reference shade.',
  hu: 'Az elülső fogaknál E-Max héjakat ajánlok — a legesztétikusabb és legtartósabb. A fehérítést a héjak előtt csináljuk, hogy beállítsuk a referencia árnyalatot.',
}

// Appended to every estimate: the calculator is informative only.
export const CONSULT_NOTE: Record<Locale, string> = {
  ro: 'Calculatorul are rol strict informativ. Prețul final și planul de tratament propriu-zis se stabilesc la consultație, după ce văd situația ta.',
  en: 'This calculator is for information only. The final price and your actual treatment plan are set at the consultation, once I see your situation.',
  hu: 'A kalkulátor kizárólag tájékoztató jellegű. A végleges árat és a tényleges kezelési tervet a konzultáción határozzuk meg, miután látom az Ön helyzetét.',
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
        unit: {
          ro: { one: 'dinte', other: 'dinți' },
          en: { one: 'tooth', other: 'teeth' },
          hu: { one: 'fog', other: 'fog' },
        },
        default: 1,
      },
    ],
    resolve: (a) => {
      const count = Math.max(1, Math.min(3, toNumber(a['count'], 1)))

      return {
        items: [
          { treatmentRef: ref('implantologie', 'implant-bredent'), qty: count },
          { treatmentRef: ref('implantologie', 'bont-protetic-hibrid'), qty: count },
          {
            treatmentRef: ref('implantologie', 'coroana-ceramica-pe-suport-zirconiu-cad-cam-pentru-implant'),
            qty: count,
          },
        ],
        notes: [
          {
            ro: 'Iată ce vreau să știi: estimarea include implant Bredent + bont + coroană. Dacă în zona implantului lipsește os, voi recomanda augmentare osoasă.',
            en: 'Here is what I want you to know: the estimate includes a Bredent implant + abutment + crown. If bone is missing in that area, I will recommend bone augmentation.',
            hu: 'Amit fontos tudni: a becslés tartalmazza a Bredent implantátumot, a felépítményt és a koronát. Ha hiányzik a csont, csontpótlást javaslok.',
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
    ],
    resolve: (a) => {
      const arcades = coerceToString(a['arcades'], 'one')
      const arcadeCount = arcades === 'both' ? 2 : 1

      return {
        items: [
          {
            treatmentRef: ref('implantologie', 'sistem-all-on-x-bredent-lucrare-provizorie-2'),
            qty: arcadeCount,
          },
        ],
        notes: [
          {
            ro: 'În cazul tău, numărul exact de implanți și tipul lucrării finale le stabilesc la consultație, după evaluarea cantității de os disponibile. Lucrăm cu sistemul All on X Bredent, iar pachetul include și lucrarea provizorie.',
            en: 'In your case, the exact number of implants and the type of final prosthesis are decided at consultation, after evaluating the available bone. We work with the Bredent All on X system, and the package includes the temporary prosthesis.',
            hu: 'Az Ön esetében az implantátumok pontos számát és a végleges protézis típusát a konzultáción határozom meg, a rendelkezésre álló csont alapján. A Bredent All on X rendszerrel dolgozunk, a csomag az ideiglenes protézist is tartalmazza.',
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
        unit: {
          ro: { one: 'fațetă', other: 'fațete' },
          en: { one: 'veneer', other: 'veneers' },
          hu: { one: 'héj', other: 'héj' },
        },
        showIf: (a) => a['package'] !== 'whitening',
        default: 6,
      },
    ],
    resolve: (a) => {
      const pkg = coerceToString(a['package'], 'whitening')
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

      if (pkg !== 'whitening') {
        return {
          items,
          notes: [VENEER_NOTE],
        }
      }

      return { items }
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
      const pkg = coerceToString(a['package'], 'basic')

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
      const pkg = coerceToString(a['package'], 'checkup')

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
              ro: 'Pentru molarii permanenți, sigilarea șanțurilor (de obicei 4 dinți) e cea mai bună prevenție în primii ani după erupție — îi protejează de carii.',
              en: 'For permanent molars, sealing the fissures (usually 4 teeth) is the best prevention in the first years after eruption — it protects them from cavities.',
              hu: 'Az állandó molárisoknál a barázdazárás (általában 4 fog) a legjobb megelőzés az első években a kitörés után — megvédi a fogakat a kariesztől.',
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
        id: 'type',
        type: 'choice',
        labels: {
          ro: 'Tip aparat',
          en: 'Type',
          hu: 'Típus',
        },
        options: [
          {
            value: 'metal',
            labels: { ro: 'Metalic', en: 'Metal', hu: 'Fém' },
            hint: {
              ro: 'Bracketi metalici clasici',
              en: 'Classic metal brackets',
              hu: 'Klasszikus fém zárak',
            },
          },
          {
            value: 'ceramic',
            labels: { ro: 'Ceramic', en: 'Ceramic', hu: 'Kerámia' },
            hint: {
              ro: 'Bracketi fizionomici, mai discreți',
              en: 'Tooth-colored brackets, more discreet',
              hu: 'Fogszínű zárak, diszkrétebbek',
            },
          },
          {
            value: 'clear',
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
        default: 'ceramic',
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
      const type = coerceToString(a['type'], 'ceramic')
      const arcades = coerceToString(a['arcades'], 'both')
      const arcadeCount = arcades === 'both' ? 2 : 1

      if (type === 'clear') {
        return {
          items: [
            {
              treatmentRef: ref('ortodontie', 'clear-correct-aparat-ortodontic-invizibil'),
              qty: 1,
            },
          ],
          notes: [BRACES_NOTE_CLEAR_CORRECT],
        }
      }

      const treatmentId =
        type === 'metal'
          ? 'aparat-fix-pe-o-arcada-cu-bracketi-metalici'
          : 'aparat-fix-pe-o-arcada-cu-bracketi-ceramici-fizionomici'

      return {
        items: [
          {
            treatmentRef: ref('ortodontie', treatmentId),
            qty: arcadeCount,
          },
        ],
        notes: [BRACES_NOTE_FIXED],
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
          ro: 'După examen decid tratamentul exact. În funcție de cauză, poate fi nevoie de tratament endodontic, extracție sau drenaj de abces.',
          en: 'After the exam I decide the exact treatment. Depending on the cause, it may need endodontic treatment, an extraction, or abscess drainage.',
          hu: 'A vizsgálat után határozom meg a pontos kezelést. Az októl függően szükség lehet gyökérkezelésre, foghúzásra vagy tályogdrenázsra.',
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
          ro: 'La prima vizită facem discuție, examen clinic, fotografii și scanare. Pentru cazuri complexe (reabilitare, ortodonție) pot avea nevoie de documentare extinsă.',
          en: 'On your first visit we do a conversation, clinical exam, photographs, and scanning. For complex cases (rehab, ortho) I may need extended documentation.',
          hu: 'Az első látogatáson beszélgetünk, klinikai vizsgálatot végzek, fotózunk és szkennelünk. Komplex esetekben (rehabilitáció, ortodoncia) kiterjedtebb dokumentációra lehet szükség.',
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
