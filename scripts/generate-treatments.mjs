#!/usr/bin/env node
// Reads Stomawin export and emits typed treatments module.
// Run: node scripts/generate-treatments.mjs <path-to-json>

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const inputPath = process.argv[2] || `${process.env.HOME}/Downloads/Petric Razvan Tudor.json`
const outputPath = resolve('src/data/treatments.ts')

const raw = JSON.parse(readFileSync(inputPath, 'utf8'))

if (!raw.cli_user_interventions || !Array.isArray(raw.cli_user_interventions)) {
  throw new Error(
    `Expected .cli_user_interventions array in JSON — is this a Stomawin export? Got top-level keys: ${Object.keys(raw).join(', ')}`
  )
}

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

// Slugify Romanian names for stable IDs (NFD strips diacritics)
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
    // Track emitted output IDs per category to avoid second-order collisions
    // (e.g. a natural "foo-2" colliding with a deduped "foo" → "foo-2")
    const emitted = new Set()
    function uniqueId(slug) {
      if (!emitted.has(slug)) {
        emitted.add(slug)
        return slug
      }
      let n = 2
      while (emitted.has(`${slug}-${n}`)) n++
      const id = `${slug}-${n}`
      emitted.add(id)
      return id
    }

    const kids = (childrenByParent.get(p.id) || [])
      .filter((k) => Number(k.price) > 0)
      .sort((a, b) => Number(a.rankx) - Number(b.rankx))
      .map((k) => {
        const slug = slugify(k.user_text1.trim())
        if (!slug) {
          throw new Error(`Empty slug produced for label: "${k.user_text1}" (id ${k.id})`)
        }

        let priceType
        if (k.price_type === '1') priceType = 'from'
        else if (k.price_type === '0') priceType = 'fixed'
        else {
          console.warn(
            `Unknown price_type "${k.price_type}" for treatment "${k.user_text1}" (id ${k.id}); defaulting to 'fixed'`
          )
          priceType = 'fixed'
        }

        return {
          id: uniqueId(slug),
          labels: {
            ro: k.user_text1.trim(),
            en: k.user_text0.trim(),
            hu: k.user_text2.trim(),
          },
          price: Number(k.price),
          priceType,
        }
      })

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

// Warn about treatment slugs that collide across multiple categories.
// findTreatment(categoryId, treatmentId) is unaffected, but flat
// treatmentId-only lookups would be ambiguous.
const slugCategoryMap = new Map() // slug -> Set<categoryId>
for (const c of categories) {
  for (const t of c.treatments) {
    if (!slugCategoryMap.has(t.id)) slugCategoryMap.set(t.id, new Set())
    slugCategoryMap.get(t.id).add(c.id)
  }
}
const crossDupes = [...slugCategoryMap.entries()].filter(([, cats]) => cats.size > 1)
if (crossDupes.length > 0) {
  console.warn('\nTreatments with the same slug across multiple categories:')
  for (const [slug, cats] of crossDupes) {
    console.warn(`  - ${slug} → ${[...cats].join(', ')}`)
  }
  console.warn('  (findTreatment(categoryId, treatmentId) is unaffected; flat treatmentId-only lookups would be ambiguous.)\n')
}

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
