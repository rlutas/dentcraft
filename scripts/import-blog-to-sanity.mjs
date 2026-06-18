#!/usr/bin/env node
/**
 * Import a markdown blog post (docs/blog/*.md) into Sanity as a DRAFT blogPost.
 *
 * - Parses frontmatter + markdown body
 * - Converts markdown -> Portable Text (h2/h3, bold, bullet/numbered lists, links, tables->bullets)
 * - Creates missing blogCategory documents on the fly
 * - Links author by name (default: Dr. Razvan Petric)
 * - Writes the post as a DRAFT so it can be reviewed + given a cover image in Studio
 *
 * Usage:
 *   node scripts/import-blog-to-sanity.mjs docs/blog/2026-06-18-aparat-dentar-satu-mare.md
 *   node scripts/import-blog-to-sanity.mjs docs/blog/*.md
 *
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN.
 */
import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'
import { randomUUID } from 'node:crypto'

// --- load env from .env.local (simple parser) ---
try {
  const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
} catch {}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// --- frontmatter parser ---
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error('No frontmatter found')
  const fm = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    }
    fm[key] = val
  }
  return { fm, body: m[2] }
}

// --- inline markdown (bold + links) -> portable text spans ---
function inlineToSpans(text) {
  const children = []
  const markDefs = []
  // tokenize **bold** and [text](url)
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let m
  const push = (str, marks = []) => {
    if (!str) return
    children.push({ _type: 'span', _key: randomUUID().slice(0, 8), text: str, marks })
  }
  while ((m = regex.exec(text)) !== null) {
    push(text.slice(last, m.index))
    if (m[2] !== undefined) {
      push(m[2], ['strong'])
    } else if (m[4] !== undefined) {
      const key = randomUUID().slice(0, 8)
      markDefs.push({ _key: key, _type: 'link', href: m[5], blank: !m[5].startsWith('https://dentcraft.ro') && !m[5].startsWith('https://www.dentcraft.ro') })
      push(m[4], [key])
    }
    last = regex.lastIndex
  }
  push(text.slice(last))
  if (children.length === 0) push(text)
  return { children, markDefs }
}

function block(style, text, listItem) {
  const { children, markDefs } = inlineToSpans(text)
  const b = { _type: 'block', _key: randomUUID().slice(0, 8), style, markDefs, children }
  if (listItem) { b.listItem = listItem; b.level = 1 }
  return b
}

// --- markdown body -> portable text array (skips H1 title) ---
function markdownToPortableText(body) {
  const lines = body.split('\n')
  const blocks = []
  let para = []
  const flushPara = () => {
    if (para.length) { blocks.push(block('normal', para.join(' ').trim())); para = [] }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const t = line.trim()
    if (t === '' ) { flushPara(); continue }
    if (t === '---') { flushPara(); continue }
    if (t.startsWith('# ') && !t.startsWith('## ')) { continue } // skip H1 (title)
    if (t.startsWith('### ')) { flushPara(); blocks.push(block('h3', t.slice(4))); continue }
    if (t.startsWith('## ')) { flushPara(); blocks.push(block('h2', t.slice(3))); continue }
    // table row -> convert to bullets "header: value" (skip separator rows)
    if (t.startsWith('|') && t.endsWith('|')) {
      flushPara()
      const cells = t.split('|').slice(1, -1).map((c) => c.trim())
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue // separator
      if (/pret|procedura|tip aparat|tip|cost/i.test(t)) continue // header row
      blocks.push(block('normal', cells.join(' — '), 'bullet'))
      continue
    }
    // bullet
    if (/^[-*]\s+/.test(t)) { flushPara(); blocks.push(block('normal', t.replace(/^[-*]\s+/, ''), 'bullet')); continue }
    // numbered
    if (/^\d+\.\s+/.test(t)) { flushPara(); blocks.push(block('normal', t.replace(/^\d+\.\s+/, ''), 'number')); continue }
    para.push(t)
  }
  flushPara()
  return blocks
}

async function ensureCategory(slug, titles) {
  const existing = await client.fetch(`*[_type=="blogCategory" && slug.current==$slug][0]{_id}`, { slug })
  if (existing?._id) return existing._id
  const doc = await client.create({
    _type: 'blogCategory',
    title: { _type: 'localizedString', ...titles },
    slug: { _type: 'slug', current: slug },
  })
  console.log(`  + created category: ${slug}`)
  return doc._id
}

const CATEGORY_TITLES = {
  implantologie: { ro: 'Implantologie', en: 'Implantology', hu: 'Implantológia' },
  ortodontie: { ro: 'Ortodontie', en: 'Orthodontics', hu: 'Fogszabályozás' },
  copii: { ro: 'Stomatologie pediatrica', en: 'Pediatric Dentistry', hu: 'Gyermekfogászat' },
  estetica: { ro: 'Estetica dentara', en: 'Cosmetic Dentistry', hu: 'Esztétikai fogászat' },
  preventie: { ro: 'Preventie', en: 'Prevention', hu: 'Megelőzés' },
  urgente: { ro: 'Urgente dentare', en: 'Dental Emergencies', hu: 'Fogászati ügyelet' },
  general: { ro: 'Stomatologie generala', en: 'General Dentistry', hu: 'Általános fogászat' },
}

async function importFile(path) {
  const raw = readFileSync(path, 'utf8')
  const { fm, body } = parseFrontmatter(raw)
  console.log(`\n→ ${fm.slug}`)

  const catSlug = (fm.category || 'general').split('|')[0].trim()
  const categoryId = await ensureCategory(catSlug, CATEGORY_TITLES[catSlug] || { ro: catSlug, en: catSlug, hu: catSlug })

  const authorName = fm.author || 'Dr. Razvan Petric'
  const author = await client.fetch(`*[_type=="teamMember" && name match $n][0]{_id}`, { n: `${authorName}*` })

  const content = markdownToPortableText(body)
  const excerpt = fm.metaDescription || ''

  const draftId = `drafts.import-${fm.slug}`
  const doc = {
    _id: draftId,
    _type: 'blogPost',
    title: { _type: 'localizedString', ro: fm.title },
    slug: { _type: 'slug', current: fm.slug },
    excerpt: { _type: 'localizedText', ro: excerpt },
    content: { _type: 'localizedPortableText', ro: content },
    publishedAt: new Date().toISOString(),
    featured: false,
    seo: {
      _type: 'seo',
      metaTitle: { _type: 'localizedString', ro: fm.metaTitle || fm.title },
      metaDescription: { _type: 'localizedText', ro: fm.metaDescription || '' },
      noIndex: false,
    },
  }
  if (categoryId) doc.category = { _type: 'reference', _ref: categoryId }
  if (author?._id) doc.author = { _type: 'reference', _ref: author._id }
  else console.log(`  ! author "${authorName}" not found in Sanity — left empty`)

  await client.createOrReplace(doc)
  console.log(`  ✓ draft created: ${draftId} (${content.length} blocks)`)
}

const files = process.argv.slice(2)
if (!files.length) { console.error('Usage: node scripts/import-blog-to-sanity.mjs <file.md> [...]'); process.exit(1) }
for (const f of files) {
  try { await importFile(f) } catch (e) { console.error(`  ✗ ${f}: ${e.message}`) }
}
console.log('\nDone. Review drafts in Sanity Studio, add cover image, then Publish.')
