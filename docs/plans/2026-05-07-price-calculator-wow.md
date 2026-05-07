# Price Calculator "Wow" Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace generic price calculator + public price list with a guided, scenario-based estimator powered by Dr. Petric's real treatment catalog (159 items × 3 languages), keeping prices private while delivering accurate, accessible estimates.

**Architecture:** Scenario-first wizard (3 steps) with treatments stored as a build-time TypeScript module derived from Stomawin export. UI uses a conversational tone — patients pick *what they want to solve* (lost tooth, brighter smile, etc.) and the calculator maps internally to clinical treatments. Pure calculation logic separated from React components for testability.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion (already in use), next-intl (ro/en/hu), Resend (existing lead capture). Existing `CountUp` and `ScrollReveal` components reused for "wow" feel.

**Branch:** `price-calculator-wow` (created from `main`).

**Source data:** `/Users/raul/Downloads/Petric Razvan Tudor.json` — Stomawin export, 159 user_interventions, 12 categories, prices in RON, expdate 2026-05-05. Raw JSON stays out of repo; only derived TS module is committed.

---

## Product Spec (read this before writing code)

### The 8 patient-facing scenarios

Patients don't know dental terminology. We translate clinical reality into 8 patient-friendly entry points. Each scenario maps to a curated bundle of real treatments from the JSON.

| # | Scenario | Icon | Maps to (clinical) | Sub-questions |
|---|----------|------|--------------------|---------------|
| 1 | **Mi-am pierdut un dinte / câțiva (1-3)** | `024-dental-implant.svg` | Implant + bont + coroană pe implant (per dinte) | Câți dinți (1/2/3); Buget (economic/mediu/premium/let-doctor-decide) |
| 2 | **Reabilitare totală (mulți dinți lipsă)** | `057-implants.svg` | All-on-X (4 sau 6 implanți) | Care arcade (sus/jos/ambele); Tier (economic/mediu/premium) |
| 3 | **Vreau un zâmbet mai frumos** | `010-smile.svg` | Albire ± Fațete frontale | Tip (albire/fațete/ambele); Câți dinți pentru fațete (4-10) |
| 4 | **Igienizare / control de rutină** | `007-tooth-cleaning.svg` | Consult + detartraj ± air flow | Pachet (basic/complet) |
| 5 | **Pentru copilul meu** | `014-toothbrush.svg` (kid-friendly fallback) | Pedodonție | Motiv (control/carie/extracție/sigilare) |
| 6 | **Aparat dentar (ortodonție)** | `038-braces.svg` | Aparat fix metalic/ceramic/Clear Correct | Tip (metalic/ceramic/invizibil); Arcade (1/2) |
| 7 | **Mă doare / urgență** | `031-broken-tooth.svg` | Urgență + posibil endo / extracție | Nimic — doar consultație + tratament probabil |
| 8 | **Nu sunt sigur, vreau să discut** | `091-crown.svg` (consultation-style) | Doar consultație | Nimic |

### Treatment bundle pricing per scenario (from JSON)

**Scenario 1 — Dinte lipsă (per dinte):**
```
Implant (alegi tier):
  economic  = INO         2200
  mediu     = Megagen     3000
  premium   = Straumann   4000
+ Bont protetic hibrid                        650
+ Coroană pe implant (alegi tier):
  economic  = metaloceramic                  1200
  mediu     = zirconiu CAD CAM               1600
  premium   = total ceramic (presată)        1800
± Augmentare creastă (opțional, dacă lipsă os)  +3000

Range per dinte:
  economic: 2200 + 650 + 1200 = 4050
  premium:  4000 + 650 + 1800 = 6450
  cu augmentare: +3000
```

**Scenario 2 — All-on-X (per arcadă):**
```
economic  = All-on-6 metaloceramic           13000
mediu     = All-on-4 zirconiu stratificat    18000
          | All-on-6 zirconiu                20000
          | All-on-4 E-Max                   20000
premium   = All-on-6 E-Max                   25000
          | Bredent All-on-X                 25000
```

**Scenario 3 — Estetică zâmbet:**
```
Albire Opalescence cabinet                   1000
Fațete E-Max         per dinte               1800
Fațete Feldspatice   per dinte               2000
WaxUp/MockUp (recomandat înainte de fațete)   150
Pachet 8 fațete E-Max:    8×1800 = 14400 + 150 = 14550
```

**Scenario 4 — Igienizare:**
```
basic   = Consult 150 + Detartraj ultrasonic 200          = 350
complet = Consult 250 + Detartraj 200 + Air Flow 600 + Periaj 200 + Fluorizare 200 = 1450
```

**Scenario 5 — Pediatric:**
```
control:    Consult primar pedodontic 100 + Detartraj copii 250          = 350
carie:      Consult 100 + Obturație fotopolimerizabilă 250                = 350
extracție:  Consult 100 + Extracție lapte 150-250                          = 250-350
sigilare:   200/dinte (× 4 molari de obicei = 800)
```

**Scenario 6 — Ortho:**
```
metalic 1 arcadă     3000
metalic 2 arcade     6000
ceramic 1 arcadă     4000
ceramic 2 arcade     8000
Clear Correct (invizibil) — pe tot tratamentul   12500
+ activări periodice (informativ, nu intră în estimare)
```

**Scenario 7 — Urgență:**
```
Urgență consult    200
+ probabil unul din:
  Tratament endo monoradicular     800
  Tratament endo pluriradicular   1000
  Extracție monoradicular          250
  Drenaj abces                     250
Range: 200-1200
```

**Scenario 8 — Doar consultație:**
```
Consultație discuție      150
Consult primar+poze        250
Consult+documentare caz    500
Range: 150-500
```

### Privacy invariant

- **Raw JSON file never enters the repo.** Lives only at `/Users/raul/Downloads/Petric Razvan Tudor.json`.
- **Derived `treatments.ts` IS committed** but contains only what the calculator needs (RO/EN/HU labels + prices, no internal IDs, no Stomawin metadata).
- **No public API endpoint** exposes the catalog. The data is bundled into the client JS but only when the calculator is rendered. Doctor's instruction: don't *publish* a price list page. We use prices internally to compute ranges; we don't render a flat list.
- The current `/preturi` page is rebuilt around the calculator only — `TabbedPriceList` is removed.

---

## Tasks

### Task 1: Generate `treatments.ts` from JSON

**Files:**
- Create: `scripts/generate-treatments.mjs`
- Create: `src/data/treatments.ts` (output, generated)

**Goal:** One-shot Node script that reads the JSON from `~/Downloads/Petric Razvan Tudor.json` and emits a typed `treatments.ts` with: 12 categories, 147 priced children, 3-language labels, RON prices, fixed/from price flag. Script is committed so it can be re-run if catalog updates.

**Step 1: Write the generator script**

Create `scripts/generate-treatments.mjs`:

```javascript
#!/usr/bin/env node
// Reads Stomawin export and emits typed treatments module.
// Run: node scripts/generate-treatments.mjs <path-to-json>

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const inputPath = process.argv[2] || `${process.env.HOME}/Downloads/Petric Razvan Tudor.json`
const outputPath = resolve('src/data/treatments.ts')

const raw = JSON.parse(readFileSync(inputPath, 'utf8'))
const ui = raw.cli_user_interventions

// Build category map
const parents = ui.filter((x) => x.parentid === '0')
const childrenByParent = new Map()
for (const x of ui) {
  if (x.parentid !== '0') {
    if (!childrenByParent.has(x.parentid)) childrenByParent.set(x.parentid, [])
    childrenByParent.get(x.parentid).push(x)
  }
}

// Slugify Romanian names for stable IDs
function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const categories = parents
  .sort((a, b) => Number(a.rankx) - Number(b.rankx))
  .map((p) => {
    const kids = (childrenByParent.get(p.id) || [])
      .filter((k) => Number(k.price) > 0)
      .sort((a, b) => Number(a.rankx) - Number(b.rankx))
      .map((k) => ({
        id: slugify(k.user_text1.trim()),
        labels: {
          ro: k.user_text1.trim(),
          en: k.user_text0.trim(),
          hu: k.user_text2.trim(),
        },
        price: Number(k.price),
        priceType: k.price_type === '1' ? 'from' : 'fixed',
      }))
    return {
      id: slugify(p.user_text1.trim()),
      labels: {
        ro: p.user_text1.trim(),
        en: p.user_text0.trim(),
        hu: p.user_text2.trim(),
      },
      treatments: kids,
    }
  })
  .filter((c) => c.treatments.length > 0)

const header = `// AUTO-GENERATED from Stomawin export by scripts/generate-treatments.mjs
// Do not edit by hand. Re-run the script to refresh.
// Source: Dr. Petric Razvan-Tudor catalog, exported ${raw.expdate}

export type Locale = 'ro' | 'en' | 'hu'

export type Treatment = {
  id: string
  labels: Record<Locale, string>
  price: number
  priceType: 'fixed' | 'from'
}

export type TreatmentCategory = {
  id: string
  labels: Record<Locale, string>
  treatments: Treatment[]
}

export const treatmentCategories: TreatmentCategory[] = ${JSON.stringify(categories, null, 2)}

export function findTreatment(categoryId: string, treatmentId: string): Treatment | undefined {
  return treatmentCategories
    .find((c) => c.id === categoryId)
    ?.treatments.find((t) => t.id === treatmentId)
}
`

writeFileSync(outputPath, header)
console.log(`Wrote ${categories.length} categories with ${categories.reduce((n, c) => n + c.treatments.length, 0)} treatments to ${outputPath}`)
```

**Step 2: Run the script**

```bash
node scripts/generate-treatments.mjs
```

Expected output: `Wrote 12 categories with ~145 treatments to src/data/treatments.ts`

**Step 3: Sanity-check the output**

```bash
head -60 src/data/treatments.ts
grep -c '"id":' src/data/treatments.ts  # should be ~157 (12 categories + 145 treatments)
```

**Step 4: Commit**

```bash
git add scripts/generate-treatments.mjs src/data/treatments.ts
git commit -m "feat(calculator): generate treatments catalog from Stomawin export"
```

---

### Task 2: Define scenario→treatment mappings

**Files:**
- Create: `src/data/calculator-scenarios.ts`

**Goal:** Encode the 8 patient-facing scenarios with their sub-question schemas and treatment bundles. This is the *product brain* of the calculator — it translates patient intent into clinical line items with real prices from `treatments.ts`.

**Step 1: Create the scenarios module**

Create `src/data/calculator-scenarios.ts`:

```typescript
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
  treatmentRef: { categoryId: string; treatmentId: string }  // for label lookup
  qty: number
  // Computed at runtime: { label, unitPrice, total, priceType }
}

export type ScenarioAnswer = Record<string, string | number>

export type Scenario = {
  id: string
  icon: string  // path under /public/icons/
  labels: Record<Locale, { title: string; subtitle: string }>
  // Returns the line items + flat tips for an answer set
  resolve: (a: ScenarioAnswer) => {
    items: LineItem[]
    notes?: Array<Record<Locale, string>>  // doctor's tips shown in result
  }
  questions: SubQuestion[]
}

export const scenarios: Scenario[] = [
  // Scenario 1: Lost tooth/teeth (1-3)
  {
    id: 'lost-tooth',
    icon: '024-dental-implant.svg',
    labels: {
      ro: { title: 'Mi-am pierdut un dinte', subtitle: 'Sau 2-3 dinți. Vreau să-i înlocuiesc.' },
      en: { title: 'I lost a tooth', subtitle: 'Or 2-3 teeth. I want to replace them.' },
      hu: { title: 'Elveszítettem egy fogat', subtitle: 'Vagy 2-3 fogat. Pótolni szeretném.' },
    },
    questions: [
      {
        id: 'count',
        type: 'count',
        labels: { ro: 'Câți dinți?', en: 'How many teeth?', hu: 'Hány fog?' },
        min: 1, max: 3, default: 1,
      },
      {
        id: 'tier',
        type: 'tier',
        labels: { ro: 'Buget orientativ', en: 'Approximate budget', hu: 'Hozzávetőleges költségvetés' },
        options: [
          {
            value: 'economic',
            labels: { ro: 'Economic', en: 'Economic', hu: 'Gazdaságos' },
            hint: { ro: 'Implant INO + coroană metaloceramică', en: 'INO implant + porcelain-fused-to-metal crown', hu: 'INO implantátum + fém-porcelán korona' },
          },
          {
            value: 'mediu',
            labels: { ro: 'Mediu', en: 'Mid-range', hu: 'Közepes' },
            hint: { ro: 'Implant Megagen + coroană zirconiu CAD CAM', en: 'Megagen implant + zirconia CAD CAM crown', hu: 'Megagen implantátum + cirkónium CAD CAM korona' },
          },
          {
            value: 'premium',
            labels: { ro: 'Premium', en: 'Premium', hu: 'Prémium' },
            hint: { ro: 'Implant Straumann + coroană total-ceramică', en: 'Straumann implant + full ceramic crown', hu: 'Straumann implantátum + teljes kerámia korona' },
          },
          {
            value: 'doctor',
            labels: { ro: 'Las doctorul să recomande', en: 'Let the doctor recommend', hu: 'A doktor döntsön' },
            hint: { ro: 'Estimare cu range complet', en: 'Estimate with full range', hu: 'Teljes árskála' },
          },
        ],
        default: 'doctor',
      },
    ],
    resolve: (a) => {
      const count = Number(a.count) || 1
      const tier = String(a.tier) as Tier
      // Map tier to specific implant + crown choices
      const implantByTier: Record<string, string> = {
        economic: 'implant-dentar-ino',
        mediu: 'implant-dentar-megagen',
        premium: 'implant-straumann',
      }
      const crownByTier: Record<string, string> = {
        economic: 'coroana-metalo-ceramica-pe-implant',
        mediu: 'coroana-ceramica-pe-suport-zirconiu-cad-cam-pentru-implant',
        premium: 'coroana-total-ceramica-ceramica-presata-pe-implant',
      }

      if (tier === 'doctor') {
        // Show wide range: economic to premium
        return {
          items: [
            { treatmentRef: { categoryId: 'implantologie', treatmentId: 'implant-dentar-ino' }, qty: count },
            { treatmentRef: { categoryId: 'implantologie', treatmentId: 'bont-protetic-hibrid' }, qty: count },
            { treatmentRef: { categoryId: 'implantologie', treatmentId: 'coroana-metalo-ceramica-pe-implant' }, qty: count },
          ],
          notes: [
            {
              ro: 'Range-ul afișat este pentru varianta economică. La consultație, doctorul va recomanda materialul potrivit cazului tău (uneori e nevoie și de augmentare osoasă, +3000 RON).',
              en: 'The range shown is for the economic option. At consultation, the doctor will recommend the right material for your case (bone augmentation may be needed, +3000 RON).',
              hu: 'A megjelenített ár a gazdaságos verzióra vonatkozik. A konzultáción a doktor javasolja a megfelelő anyagot (csontpótlás szükséges lehet, +3000 RON).',
            },
          ],
        }
      }

      return {
        items: [
          { treatmentRef: { categoryId: 'implantologie', treatmentId: implantByTier[tier] }, qty: count },
          { treatmentRef: { categoryId: 'implantologie', treatmentId: 'bont-protetic-hibrid' }, qty: count },
          { treatmentRef: { categoryId: 'implantologie', treatmentId: crownByTier[tier] }, qty: count },
        ],
        notes: [
          {
            ro: 'Estimarea include implant + bont + coroană. Dacă lipsește os în zona implantului, se poate adăuga augmentare (+3000 RON).',
            en: 'Estimate includes implant + abutment + crown. If bone is missing, augmentation may be added (+3000 RON).',
            hu: 'A becslés tartalmazza az implantátumot + felépítményt + koronát. Ha hiányzik a csont, csontpótlás szükséges (+3000 RON).',
          },
        ],
      }
    },
  },

  // [Scenarios 2-8 follow the same pattern — see Spec section above for treatment IDs and pricing tiers]
  // ... fill remaining 7 scenarios using the table from the Product Spec section ...
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}
```

**Step 2: Manually verify treatment IDs match `treatments.ts`**

```bash
# After Task 1 ran, check the slug IDs we reference exist:
grep -E '"id": "implant-dentar-ino"|"id": "bont-protetic-hibrid"|"id": "coroana-metalo-ceramica-pe-implant"' src/data/treatments.ts
```

If any slug doesn't match, update the IDs in `calculator-scenarios.ts` to match the actual generator output. Slugify in the generator might produce slightly different forms — verify and align.

**Step 3: Fill in remaining 7 scenarios**

Following the same pattern as scenario 1, add scenarios 2-8 from the product spec table at the top of this plan. Each one references real treatment IDs from the catalog.

**Step 4: Commit**

```bash
git add src/data/calculator-scenarios.ts
git commit -m "feat(calculator): add 8 patient-facing scenarios with treatment mappings"
```

---

### Task 3: Pure calculation logic + tests

**Files:**
- Create: `src/components/features/PriceCalculator/v2/calculations.ts`
- Create: `src/components/features/PriceCalculator/v2/calculations.test.ts`

**Goal:** Resolve a scenario answer set into computed line items and total range. Testable pure functions, no React. This is where the price math lives.

**Step 1: Write failing test**

Create `src/components/features/PriceCalculator/v2/calculations.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { computeEstimate } from './calculations'

describe('computeEstimate', () => {
  it('lost-tooth economic for 1 tooth = INO + bont + metaloceramic crown', () => {
    const result = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'ro')
    expect(result.lineItems).toHaveLength(3)
    expect(result.totalMin).toBe(2200 + 650 + 1200) // 4050
    expect(result.totalMax).toBe(result.totalMin) // economic = fixed
    expect(result.lineItems[0].label).toContain('INO')
  })

  it('lost-tooth doctor tier shows widest reasonable range', () => {
    const result = computeEstimate('lost-tooth', { count: 1, tier: 'doctor' }, 'ro')
    // Should at least include base economic option; total has a range
    expect(result.totalMin).toBeGreaterThan(0)
    expect(result.totalMax).toBeGreaterThanOrEqual(result.totalMin)
  })

  it('lost-tooth count=3 multiplies line items', () => {
    const single = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'ro')
    const triple = computeEstimate('lost-tooth', { count: 3, tier: 'economic' }, 'ro')
    expect(triple.totalMin).toBe(single.totalMin * 3)
  })

  it('returns localized labels', () => {
    const ro = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'ro')
    const en = computeEstimate('lost-tooth', { count: 1, tier: 'economic' }, 'en')
    expect(ro.lineItems[0].label).not.toBe(en.lineItems[0].label)
  })
})
```

**Step 2: Run to verify failure**

```bash
npx vitest run src/components/features/PriceCalculator/v2/calculations.test.ts
```

Expected: FAIL — `computeEstimate` not exported.

**Step 3: Write minimal implementation**

Create `src/components/features/PriceCalculator/v2/calculations.ts`:

```typescript
import { findTreatment, type Locale } from '@/data/treatments'
import { getScenario, type ScenarioAnswer } from '@/data/calculator-scenarios'

export type ResolvedLineItem = {
  label: string
  unitPrice: number
  qty: number
  total: number
  priceType: 'fixed' | 'from'
}

export type Estimate = {
  scenarioId: string
  lineItems: ResolvedLineItem[]
  totalMin: number
  totalMax: number
  notes: string[]
  hasFromPrice: boolean  // true if any line item is "from" (variable upward)
}

export function computeEstimate(
  scenarioId: string,
  answers: ScenarioAnswer,
  locale: Locale,
): Estimate {
  const scenario = getScenario(scenarioId)
  if (!scenario) throw new Error(`Unknown scenario: ${scenarioId}`)

  const resolved = scenario.resolve(answers)
  const lineItems: ResolvedLineItem[] = resolved.items.map(({ treatmentRef, qty }) => {
    const t = findTreatment(treatmentRef.categoryId, treatmentRef.treatmentId)
    if (!t) throw new Error(`Missing treatment: ${treatmentRef.categoryId}/${treatmentRef.treatmentId}`)
    return {
      label: t.labels[locale],
      unitPrice: t.price,
      qty,
      total: t.price * qty,
      priceType: t.priceType,
    }
  })

  const totalMin = lineItems.reduce((sum, li) => sum + li.total, 0)
  // For "from" price types, max is +30% as upper bound estimate
  const totalMax = lineItems.reduce((sum, li) => {
    return sum + li.total * (li.priceType === 'from' ? 1.3 : 1)
  }, 0)

  const notes = (resolved.notes || []).map((n) => n[locale])

  return {
    scenarioId,
    lineItems,
    totalMin: Math.round(totalMin),
    totalMax: Math.round(totalMax),
    notes,
    hasFromPrice: lineItems.some((li) => li.priceType === 'from'),
  }
}
```

**Step 4: Run tests to verify pass**

```bash
npx vitest run src/components/features/PriceCalculator/v2/calculations.test.ts
```

Expected: All tests pass.

**Step 5: Verify Vitest is set up; if not, install**

```bash
grep -E '"vitest"' package.json || npm install -D vitest @types/node
```

If Vitest is not in the project, install it before Step 4. Add a `test` script to `package.json`:

```json
"scripts": {
  "test": "vitest run"
}
```

**Step 6: Commit**

```bash
git add src/components/features/PriceCalculator/v2/calculations.ts src/components/features/PriceCalculator/v2/calculations.test.ts package.json package-lock.json
git commit -m "feat(calculator): pure pricing logic with vitest coverage"
```

---

### Task 4: ScenarioPicker component (Step 1 UI)

**Files:**
- Create: `src/components/features/PriceCalculator/v2/ScenarioPicker.tsx`
- Create: `src/components/features/PriceCalculator/v2/types.ts`

**Goal:** Beautiful scrollable grid of 8 large scenario cards. Each card has icon, title, subtitle, hover state. Mobile: 2 columns. Desktop: 4 columns. Selecting a card auto-advances after 200ms (gives selected feedback first).

**Step 1: Create shared types**

Create `src/components/features/PriceCalculator/v2/types.ts`:

```typescript
import type { Locale } from '@/data/treatments'
import type { ScenarioAnswer } from '@/data/calculator-scenarios'

export type CalcStep = 'scenario' | 'questions' | 'result'

export type CalcState = {
  step: CalcStep
  scenarioId: string | null
  answers: ScenarioAnswer
}

export type CalcAction =
  | { type: 'select-scenario'; scenarioId: string }
  | { type: 'set-answer'; key: string; value: string | number }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }

export type CalcTranslations = {
  back: string
  reset: string
  next: string
  scenarioTitle: string
  scenarioSubtitle: string
  questionsTitle: string
  questionsSubtitle: string
  estimateTitle: string
  totalRange: string
  perTreatment: string
  bookConsultation: string
  doctorTip: string
  disclaimer: string
  yourEstimate: string
  whatHappensNext: string
}

export type Locale_ = Locale
```

**Step 2: Write the ScenarioPicker**

Create `src/components/features/PriceCalculator/v2/ScenarioPicker.tsx`:

```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { scenarios } from '@/data/calculator-scenarios'
import type { Locale } from '@/data/treatments'

type ScenarioPickerProps = {
  locale: Locale
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ScenarioPicker({ locale, selectedId, onSelect }: ScenarioPickerProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {scenarios.map((s, idx) => {
        const isSelected = selectedId === s.id
        return (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`
              group relative flex flex-col items-start gap-3 p-4 md:p-5 rounded-2xl border-2 text-left transition-all
              ${isSelected
                ? 'border-[#2a2118] bg-[#faf6f1] shadow-[0_12px_30px_-8px_rgba(42,33,24,0.25)]'
                : 'border-[#e8e0d5] bg-white hover:border-[#d4c4b0] hover:shadow-[0_8px_24px_-8px_rgba(139,115,85,0.18)]'
              }
            `}
            aria-pressed={isSelected}
          >
            <div className={`
              w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-colors
              ${isSelected ? 'bg-[#2a2118]' : 'bg-[#faf6f1] group-hover:bg-[#f5f0e8]'}
            `}>
              <Image
                src={`/icons/${s.icon}`}
                alt=""
                width={32}
                height={32}
                className={`transition-all ${isSelected ? 'invert brightness-0' : ''}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#2a2118] text-sm md:text-base leading-tight">
                {s.labels[locale].title}
              </h3>
              <p className="text-xs md:text-sm text-[#8b7355] mt-1 leading-snug">
                {s.labels[locale].subtitle}
              </p>
            </div>
            {isSelected && (
              <motion.div
                layoutId="scenario-indicator"
                className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#2a2118] flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
```

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. (No runtime test yet — UI is verified in Task 12.)

**Step 4: Commit**

```bash
git add src/components/features/PriceCalculator/v2/
git commit -m "feat(calculator): scenario picker with 8 patient-friendly cards"
```

---

### Task 5: SubQuestions component (Step 2 UI)

**Files:**
- Create: `src/components/features/PriceCalculator/v2/SubQuestions.tsx`

**Goal:** Render the question schema for the selected scenario. Three input types supported: `count` (stepper -/+ ), `tier` (4 large radio cards with hint), `choice` (radio cards). Conversational layout — one question per "panel", smooth height animation if multiple questions stack.

**Step 1: Write the component**

Create `src/components/features/PriceCalculator/v2/SubQuestions.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import type { Scenario, ScenarioAnswer, SubQuestion } from '@/data/calculator-scenarios'
import type { Locale } from '@/data/treatments'

type Props = {
  locale: Locale
  scenario: Scenario
  answers: ScenarioAnswer
  onChange: (key: string, value: string | number) => void
}

export function SubQuestions({ locale, scenario, answers, onChange }: Props) {
  return (
    <div className="space-y-8">
      {scenario.questions.map((q, idx) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.35 }}
        >
          <h3 className="text-base md:text-lg font-semibold text-[#2a2118] mb-3">
            {q.labels[locale]}
          </h3>
          {q.type === 'count' && (
            <CountInput
              value={Number(answers[q.id] ?? q.default)}
              min={q.min ?? 1}
              max={q.max ?? 10}
              onChange={(n) => onChange(q.id, n)}
            />
          )}
          {(q.type === 'tier' || q.type === 'choice' || q.type === 'arcades' || q.type === 'package') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options?.map((opt) => {
                const selected = (answers[q.id] ?? q.default) === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(q.id, opt.value)}
                    aria-pressed={selected}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      ${selected
                        ? 'border-[#2a2118] bg-[#faf6f1]'
                        : 'border-[#e8e0d5] bg-white hover:border-[#d4c4b0]'
                      }
                    `}
                  >
                    <div className="font-medium text-[#2a2118]">{opt.labels[locale]}</div>
                    {opt.hint?.[locale] && (
                      <div className="text-xs text-[#8b7355] mt-1">{opt.hint[locale]}</div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function CountInput({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-12 h-12 rounded-xl border-2 border-[#e8e0d5] hover:border-[#2a2118] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        <Minus className="w-5 h-5" />
      </button>
      <div className="w-20 text-center">
        <span className="text-4xl font-semibold text-[#2a2118]">{value}</span>
      </div>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-12 h-12 rounded-xl border-2 border-[#e8e0d5] hover:border-[#2a2118] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  )
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/features/PriceCalculator/v2/SubQuestions.tsx
git commit -m "feat(calculator): sub-questions with count/tier/choice inputs"
```

---

### Task 6: Estimate result component (Step 3 UI)

**Files:**
- Create: `src/components/features/PriceCalculator/v2/Estimate.tsx`

**Goal:** Itemized result with: total range (animated CountUp), per-line breakdown, doctor's tip card, "what happens next" timeline (3 steps: consult → plan → treatment), prominent CTA "Programează consultație", soft disclaimer.

**Step 1: Write the component**

Create `src/components/features/PriceCalculator/v2/Estimate.tsx`:

```typescript
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { CalendarCheck, Sparkles, Stethoscope, FileText, Smile } from 'lucide-react'
import { CountUp } from '@/components/ui/CountUp'
import type { Estimate as EstimateType } from './calculations'
import type { CalcTranslations } from './types'
import type { Locale } from '@/data/treatments'

const PriceEstimatePopup = dynamic(
  () => import('../PriceEstimatePopup').then((m) => m.default ?? m.PriceEstimatePopup),
  { ssr: false },
)

type Props = {
  locale: Locale
  estimate: EstimateType
  scenarioTitle: string
  translations: CalcTranslations
}

export function Estimate({ locale, estimate, scenarioTitle, translations }: Props) {
  const [popupOpen, setPopupOpen] = useState(false)
  const formatPrice = (n: number) =>
    new Intl.NumberFormat(locale === 'hu' ? 'hu-HU' : 'ro-RO', { maximumFractionDigits: 0 }).format(n)

  return (
    <div className="space-y-6">
      {/* Total range hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-br from-[#faf6f1] via-white to-[#f5f0e8] border border-[#e8e0d5] p-6 md:p-8 text-center"
      >
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#8b7355] bg-white border border-[#e8e0d5] rounded-full px-3 py-1 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          {translations.yourEstimate}
        </div>
        <p className="text-sm text-[#8b7355] mb-2">{scenarioTitle}</p>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <CountUp end={estimate.totalMin} duration={1200} className="text-4xl md:text-6xl font-bold text-[#2a2118]" />
          {estimate.totalMax > estimate.totalMin && (
            <>
              <span className="text-2xl md:text-3xl text-[#8b7355]">–</span>
              <CountUp end={estimate.totalMax} duration={1200} className="text-4xl md:text-6xl font-bold text-[#2a2118]" />
            </>
          )}
          <span className="text-xl md:text-2xl font-medium text-[#2a2118] self-end pb-2">RON</span>
        </div>
        <p className="text-xs md:text-sm text-[#8b7355] mt-3">{translations.totalRange}</p>
      </motion.div>

      {/* Line items */}
      <div className="rounded-2xl bg-white border border-[#e8e0d5] p-5 md:p-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7355] mb-4">
          {translations.perTreatment}
        </h4>
        <div className="divide-y divide-[#f5f0e8]">
          {estimate.lineItems.map((li, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center justify-between py-3"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base text-[#2a2118] truncate">{li.label}</div>
                {li.qty > 1 && (
                  <div className="text-xs text-[#8b7355] mt-0.5">
                    {li.qty} × {formatPrice(li.unitPrice)} RON
                  </div>
                )}
              </div>
              <div className="text-sm md:text-base font-semibold text-[#2a2118] whitespace-nowrap">
                {li.priceType === 'from' && <span className="text-xs font-normal text-[#8b7355] mr-1">de la</span>}
                {formatPrice(li.total)} RON
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Doctor's tip */}
      {estimate.notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-[#2a2118] text-white p-5 md:p-6"
        >
          <div className="flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-[#d4c4b0] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#d4c4b0] mb-1">
                {translations.doctorTip}
              </div>
              {estimate.notes.map((n, i) => (
                <p key={i} className="text-sm md:text-base text-white/90 leading-relaxed">{n}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-[#e8e0d5] p-5 md:p-6 bg-white"
      >
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b7355] mb-4">
          {translations.whatHappensNext}
        </h4>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { icon: CalendarCheck, label: locale === 'ro' ? 'Programare' : locale === 'hu' ? 'Időpont' : 'Booking' },
            { icon: FileText, label: locale === 'ro' ? 'Plan personalizat' : locale === 'hu' ? 'Személyre szabott terv' : 'Custom plan' },
            { icon: Smile, label: locale === 'ro' ? 'Tratament' : locale === 'hu' ? 'Kezelés' : 'Treatment' },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#faf6f1] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
              </div>
              <span className="text-xs md:text-sm text-[#2a2118] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => setPopupOpen(true)}
        className="w-full btn btn-lg btn-primary flex items-center justify-center gap-2"
      >
        <CalendarCheck className="w-5 h-5" />
        {translations.bookConsultation}
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-center text-[#8b7355] leading-relaxed">{translations.disclaimer}</p>

      <PriceEstimatePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        service={{ title: scenarioTitle, slug: estimate.scenarioId }}
        options={{ materialType: null, quantity: 1 }}
        priceRange={{ min: estimate.totalMin, max: estimate.totalMax }}
        locale={locale}
      />
    </div>
  )
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/features/PriceCalculator/v2/Estimate.tsx
git commit -m "feat(calculator): estimate result with line items, doctor tip, timeline"
```

---

### Task 7: PriceCalculator v2 orchestrator

**Files:**
- Create: `src/components/features/PriceCalculator/v2/index.tsx`
- Modify: `src/components/features/PriceCalculator/index.tsx` (re-export v2 as default)

**Goal:** Wires the 3 steps together with reducer state, animated step transitions, sticky back/next buttons. Replaces old calculator at the import boundary so consumers don't change.

**Step 1: Write the orchestrator**

Create `src/components/features/PriceCalculator/v2/index.tsx`:

```typescript
'use client'

import { useReducer, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { ScenarioPicker } from './ScenarioPicker'
import { SubQuestions } from './SubQuestions'
import { Estimate } from './Estimate'
import { computeEstimate } from './calculations'
import { getScenario } from '@/data/calculator-scenarios'
import type { CalcState, CalcAction, CalcTranslations } from './types'
import type { Locale } from '@/data/treatments'

const initialState: CalcState = { step: 'scenario', scenarioId: null, answers: {} }

function reducer(s: CalcState, a: CalcAction): CalcState {
  switch (a.type) {
    case 'select-scenario': {
      const scn = getScenario(a.scenarioId)
      const defaults: Record<string, string | number> = {}
      scn?.questions.forEach((q) => { defaults[q.id] = q.default })
      return { step: 'questions', scenarioId: a.scenarioId, answers: defaults }
    }
    case 'set-answer':
      return { ...s, answers: { ...s.answers, [a.key]: a.value } }
    case 'next':
      if (s.step === 'scenario' && s.scenarioId) return { ...s, step: 'questions' }
      if (s.step === 'questions') return { ...s, step: 'result' }
      return s
    case 'back':
      if (s.step === 'result') return { ...s, step: 'questions' }
      if (s.step === 'questions') return { ...s, step: 'scenario' }
      return s
    case 'reset':
      return initialState
    default:
      return s
  }
}

type Props = {
  locale: Locale
  translations: CalcTranslations
}

export function PriceCalculatorV2({ locale, translations }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const scenario = state.scenarioId ? getScenario(state.scenarioId) : null

  // Skip questions step if scenario has no questions (e.g., "just consultation")
  const hasQuestions = (scenario?.questions.length ?? 0) > 0

  const estimate = useMemo(() => {
    if (state.step !== 'result' || !state.scenarioId) return null
    return computeEstimate(state.scenarioId, state.answers, locale)
  }, [state.step, state.scenarioId, state.answers, locale])

  return (
    <div className="rounded-3xl bg-white border border-[#e8e0d5] shadow-[0_8px_32px_-8px_rgba(42,33,24,0.08)] p-5 md:p-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
        {(['scenario', 'questions', 'result'] as const).map((s, i) => {
          const stepIdx = ['scenario', 'questions', 'result'].indexOf(state.step)
          const active = stepIdx >= i
          return (
            <div key={s} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors
                ${active ? 'bg-[#2a2118] text-white' : 'bg-[#f5f0e8] text-[#8b7355]'}
              `}>{i + 1}</div>
              {i < 2 && <div className={`w-8 md:w-12 h-px mx-1 transition-colors ${stepIdx > i ? 'bg-[#2a2118]' : 'bg-[#e8e0d5]'}`} />}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {state.step === 'scenario' && (
            <motion.div key="scenario" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <h2 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 text-center">{translations.scenarioTitle}</h2>
              <p className="text-sm md:text-base text-[#8b7355] mb-6 text-center">{translations.scenarioSubtitle}</p>
              <ScenarioPicker
                locale={locale}
                selectedId={state.scenarioId}
                onSelect={(id) => {
                  dispatch({ type: 'select-scenario', scenarioId: id })
                  // If scenario has no questions, jump straight to result
                  const s = getScenario(id)
                  if ((s?.questions.length ?? 0) === 0) {
                    setTimeout(() => dispatch({ type: 'next' }), 200)
                  }
                }}
              />
            </motion.div>
          )}

          {state.step === 'questions' && scenario && (
            <motion.div key="questions" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <h2 className="text-xl md:text-2xl font-semibold text-[#2a2118] mb-2 text-center">{translations.questionsTitle}</h2>
              <p className="text-sm md:text-base text-[#8b7355] mb-6 text-center">{translations.questionsSubtitle}</p>
              <SubQuestions
                locale={locale}
                scenario={scenario}
                answers={state.answers}
                onChange={(key, value) => dispatch({ type: 'set-answer', key, value })}
              />
            </motion.div>
          )}

          {state.step === 'result' && scenario && estimate && (
            <motion.div key="result" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <Estimate
                locale={locale}
                estimate={estimate}
                scenarioTitle={scenario.labels[locale].title}
                translations={translations}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {state.step !== 'scenario' && (
        <div className="flex justify-between gap-3 mt-6 md:mt-8 pt-6 border-t border-[#f5f0e8]">
          <button
            type="button"
            onClick={() => dispatch({ type: 'back' })}
            className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[#e8e0d5] text-[#2a2118] hover:bg-[#faf6f1]"
          >
            <ArrowLeft className="w-5 h-5" />
            {translations.back}
          </button>
          {state.step === 'questions' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'next' })}
              className="btn btn-lg btn-primary flex items-center gap-2"
            >
              {translations.next}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          {state.step === 'result' && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
              className="btn btn-lg flex items-center gap-2 bg-white border-2 border-[#e8e0d5] text-[#2a2118] hover:bg-[#faf6f1]"
            >
              <RefreshCw className="w-5 h-5" />
              {translations.reset}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
```

**Step 2: TypeScript check + build**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/features/PriceCalculator/v2/index.tsx
git commit -m "feat(calculator): orchestrator with reducer state and animated transitions"
```

---

### Task 8: Replace `/preturi` page — remove TabbedPriceList

**Files:**
- Modify: `src/app/[locale]/preturi/page.tsx`
- Delete: `src/components/features/TabbedPriceList/` (after page is updated)

**Goal:** Hero unchanged. Body becomes: brief explainer card → calculator v2 → "How consultation works" + contact CTA. No flat price list visible.

**Step 1: Read current page structure**

```bash
cat src/app/[locale]/preturi/page.tsx
```

Identify the `<TabbedPriceList>` and `<TabbedPriceListPlaceholder>` usages and the data fetching for `getPricesGroupedByService`.

**Step 2: Update page**

Edit `src/app/[locale]/preturi/page.tsx`:

- Remove imports: `TabbedPriceList`, `TabbedPriceListPlaceholder`, `getPricesGroupedByService`
- Remove the `servicesWithPrices` Promise from `Promise.all`
- Remove the section that renders `<TabbedPriceList>` (and any related "no prices" placeholder)
- Replace the calculator instantiation: from `<PriceCalculator />` to `<PriceCalculatorV2 />`
- Build the `translations` object with the new keys (see Task 10 for keys)
- Add a small "How it works" card before the calculator: 3 simple steps (scenario → questions → estimate)

**Step 3: Verify build**

```bash
npm run build 2>&1 | tail -25
```

Expected: build passes. If `TabbedPriceList` was the only consumer of `getPricesGroupedByService`, the unused import is gone. ESLint may flag unused exports — clean up.

**Step 4: Delete TabbedPriceList**

```bash
rm -rf src/components/features/TabbedPriceList/
grep -r "TabbedPriceList" src/ || echo "no references — safe"
```

**Step 5: Commit**

```bash
git add src/app/[locale]/preturi/page.tsx
git rm -r src/components/features/TabbedPriceList/
git commit -m "feat(preturi): replace flat price list with scenario calculator v2"
```

---

### Task 9: Update PriceEstimatePopup payload

**Files:**
- Modify: `src/components/features/PriceCalculator/PriceEstimatePopup.tsx`
- Modify: `src/app/api/price-estimate/route.ts`
- Modify: email template inside the API route (or its imported helper)

**Goal:** When the user submits a callback from the new estimate, the email to the clinic should show: scenario title, sub-question answers, line items breakdown, total range. Today the popup receives only `service` + `priceRange` — we extend it.

**Step 1: Extend popup props**

In `PriceEstimatePopup.tsx`, add an optional `lineItems?: ResolvedLineItem[]` prop and pass it through to the API call payload.

**Step 2: Update API route to render line items in the email**

In `src/app/api/price-estimate/route.ts`, accept optional `lineItems` in the body schema (Zod) and render them as a table in the HTML email. If absent, fall back to the current "service + range" rendering for backward compatibility.

**Step 3: Pass line items from `Estimate.tsx`**

Update the `<PriceEstimatePopup>` invocation in `Estimate.tsx` to pass `estimate.lineItems`.

**Step 4: Verify**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/components/features/PriceCalculator/PriceEstimatePopup.tsx src/app/api/price-estimate/route.ts src/components/features/PriceCalculator/v2/Estimate.tsx
git commit -m "feat(estimate): include itemized breakdown in lead email"
```

---

### Task 10: i18n strings (ro/en/hu)

**Files:**
- Modify: `src/messages/ro.json`
- Modify: `src/messages/en.json`
- Modify: `src/messages/hu.json`

**Goal:** Add `prices.calculator.*` keys for the new calculator UI strings. Treatment and scenario labels come from `treatments.ts` / `calculator-scenarios.ts`, so we don't duplicate those — only the UI chrome strings here.

**Step 1: Identify required keys**

From `CalcTranslations` type in `types.ts`:
- `back`, `reset`, `next`
- `scenarioTitle`, `scenarioSubtitle`
- `questionsTitle`, `questionsSubtitle`
- `estimateTitle`, `totalRange`, `perTreatment`, `bookConsultation`, `doctorTip`, `disclaimer`, `yourEstimate`, `whatHappensNext`

**Step 2: Add to `ro.json`** (under existing `prices` namespace):

```json
"calculator": {
  "back": "Înapoi",
  "reset": "Reia",
  "next": "Continuă",
  "scenarioTitle": "Ce te aduce la noi?",
  "scenarioSubtitle": "Alege scenariul care se potrivește cel mai bine. Doctorul confirmă tot la consultație.",
  "questionsTitle": "Câteva detalii",
  "questionsSubtitle": "Răspunsurile ne ajută să-ți dăm o estimare mai exactă.",
  "estimateTitle": "Estimarea ta",
  "totalRange": "Total estimativ în RON",
  "perTreatment": "Pe tratamente",
  "bookConsultation": "Programează consultația",
  "doctorTip": "Notă de la doctor",
  "disclaimer": "Estimare orientativă. Planul exact și prețul final se stabilesc la consultație, după evaluare clinică și radiologică.",
  "yourEstimate": "Estimarea ta",
  "whatHappensNext": "Ce urmează"
}
```

**Step 3: Add to `en.json`:**

```json
"calculator": {
  "back": "Back",
  "reset": "Restart",
  "next": "Continue",
  "scenarioTitle": "What brings you here?",
  "scenarioSubtitle": "Pick the scenario that fits best. The doctor confirms everything at consultation.",
  "questionsTitle": "A few details",
  "questionsSubtitle": "Your answers help us give you a more accurate estimate.",
  "estimateTitle": "Your estimate",
  "totalRange": "Estimated total in RON",
  "perTreatment": "Per treatment",
  "bookConsultation": "Book consultation",
  "doctorTip": "Doctor's note",
  "disclaimer": "Indicative estimate. The exact plan and final price are set at consultation, after clinical and radiological evaluation.",
  "yourEstimate": "Your estimate",
  "whatHappensNext": "What's next"
}
```

**Step 4: Add to `hu.json`:**

```json
"calculator": {
  "back": "Vissza",
  "reset": "Újrakezdés",
  "next": "Tovább",
  "scenarioTitle": "Mi a problémád?",
  "scenarioSubtitle": "Válaszd ki a legjobban illő esetet. A doktor mindent megerősít a konzultáción.",
  "questionsTitle": "Néhány részlet",
  "questionsSubtitle": "A válaszaid segítenek pontosabb becslést adni.",
  "estimateTitle": "A becslésed",
  "totalRange": "Becsült összeg RON-ban",
  "perTreatment": "Kezelésenként",
  "bookConsultation": "Konzultáció foglalása",
  "doctorTip": "Doktori megjegyzés",
  "disclaimer": "Tájékoztató becslés. A pontos terv és végső ár a konzultáción, klinikai és radiológiai értékelés után kerül meghatározásra.",
  "yourEstimate": "A becslésed",
  "whatHappensNext": "Mi következik"
}
```

**Step 5: Wire keys into `/preturi` page**

In `preturi/page.tsx`, build the `translations` prop:

```typescript
const calcT = await getTranslations({ locale, namespace: 'prices.calculator' })
const translations: CalcTranslations = {
  back: calcT('back'),
  reset: calcT('reset'),
  // ... all keys
}
```

**Step 6: Verify build**

```bash
npm run build
```

**Step 7: Commit**

```bash
git add src/messages/ src/app/[locale]/preturi/page.tsx
git commit -m "i18n(calculator): translation strings for v2 in ro/en/hu"
```

---

### Task 11: Visual QA + animations polish

**Files:**
- May modify any component for tweaks

**Goal:** Open the page in a real browser at all 3 locales, walk through every scenario, capture screenshots desktop + mobile (375px). Tighten anything that feels off.

**Step 1: Start dev server**

```bash
npm run dev
```

(Server runs on `localhost:3001` per project memory.)

**Step 2: Walk every scenario in RO**

Open `http://localhost:3001/ro/preturi`. Go through each of 8 scenarios. For each:
- Verify icon loads
- Verify all sub-questions render
- Verify the result page shows: total range, line items, doctor tip, what's next, CTA
- Verify CTA opens popup
- Verify "back" preserves answers

**Step 3: Capture mobile screenshots**

Resize browser to 375px (or use Chrome DevTools device mode). Screenshot:
- `scenario-picker-mobile.png`
- `questions-mobile.png` (one per scenario type if they differ visibly)
- `estimate-mobile.png`

Save under `.playwright-mcp/calculator-v2/`.

**Step 4: Repeat in EN and HU**

```bash
open http://localhost:3001/en/preturi
open http://localhost:3001/hu/preturi
```

Spot-check translations didn't break layout (HU words are typically longer).

**Step 5: Run Lighthouse on /preturi**

```bash
# Open Chrome DevTools > Lighthouse, run mobile audit on /ro/preturi
# Target: Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95
```

Note any regressions. CountUp animations and Framer Motion shouldn't tank performance — if they do, drop to CSS transitions.

**Step 6: Commit any tweaks**

```bash
git add -A
git commit -m "polish(calculator): visual tweaks from QA pass"
```

---

### Task 12: Build verify, merge, deploy

**Files:** none (git operations only)

**Step 1: Final build**

```bash
npm run build 2>&1 | tail -30
```

Expected: builds clean. No new ESLint errors.

**Step 2: Run tests**

```bash
npx vitest run
```

Expected: all green.

**Step 3: Update PROGRESS.md**

Add a Session Log entry under `## Session Log` for `### 7 May 2026`:

```markdown
### 7 May 2026

**Price Calculator v2 — Scenario-Based Estimator:**
- Replaced generic 3-step calculator and flat TabbedPriceList with patient-facing scenario picker (8 scenarios)
- Pricing data sourced from Dr. Petric's Stomawin export (159 treatments, 12 categories, 3 languages)
- Generator script: `scripts/generate-treatments.mjs` — re-run on catalog updates
- Catalog committed as `src/data/treatments.ts` (raw JSON not in repo)
- Scenarios + sub-questions + treatment bundles in `src/data/calculator-scenarios.ts`
- Pure pricing logic in `src/components/features/PriceCalculator/v2/calculations.ts` with vitest coverage
- `/preturi` page rebuilt — flat list removed, calculator + "what's next" timeline + CTA
- PriceEstimatePopup now ships itemized line breakdown to clinic email

**Key commits:** [list after final push]
```

**Step 4: Push branch**

```bash
git push -u origin price-calculator-wow
```

**Step 5: Merge to main**

```bash
git checkout main
git merge --no-ff price-calculator-wow -m "Merge price-calculator-wow: scenario-based estimator with real catalog"
git push origin main
```

**Step 6: Verify Vercel deployment**

Check `https://vercel.com/rauls-projects/dentcraft` for the build. Once green, smoke-test `https://www.dentcraft.ro/ro/preturi` in a clean browser.

**Step 7: Clean up branch**

```bash
git branch -d price-calculator-wow
git push origin --delete price-calculator-wow  # optional
```

---

## Notes for the executor

- **TDD discipline:** Tasks 1, 2, 3 have pure-data and pure-logic work — write tests first there. Tasks 4–7, 8 are React UI — verify by running the app and comparing to the spec; no unit tests for them.
- **Slug stability:** The generator's slugify produces specific IDs from Romanian names. After Task 1 runs, **read the generated `treatments.ts`** and update `calculator-scenarios.ts` (Task 2) to use the actual generated slugs — don't rely on the example slugs in this plan.
- **Frequent commits:** One commit per task minimum. Tasks 4-7 may have 2-3 commits each (component + tweaks).
- **i18n freshness:** When adding new keys in Task 10, also re-check that all keys exist in all three locale files. `next-intl` will throw at runtime if a key is missing.
- **Privacy:** Verify before each commit that the raw `Petric Razvan Tudor.json` is NOT staged (`git status` should never show that path).
