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

    // Detect duplicate slugs within a category and disambiguate with a numeric suffix
    const seen = new Map()
    for (const t of kids) {
      const count = seen.get(t.id) || 0
      seen.set(t.id, count + 1)
      if (count > 0) {
        t.id = `${t.id}-${count + 1}`
      }
    }

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
