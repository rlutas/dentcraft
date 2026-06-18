#!/usr/bin/env node
/**
 * Convert a markdown blog post into a TS module exporting `content: PortableTextBlock[]`
 * compatible with src/lib/fallback-blog.ts. Emits portable-text object literals
 * (same shape the block()/richBlock()/listItem() helpers produce).
 *
 * Usage: node scripts/md-to-fallback.mjs docs/blog/<file>.md <keyPrefix> > src/lib/blog-content/<name>.ts
 */
import { readFileSync } from 'node:fs'

const [file, prefix = 'b'] = process.argv.slice(2)
if (!file) { console.error('Usage: md-to-fallback.mjs <file.md> <keyPrefix>'); process.exit(1) }

const raw = readFileSync(file, 'utf8')
const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
const body = m[2]

let n = 0
const key = () => `${prefix}${String(++n).padStart(2, '0')}`

// normalize dentcraft absolute links -> relative paths
function normHref(href) {
  return href.replace(/^https?:\/\/(www\.)?dentcraft\.ro/, '') || '/'
}

// inline -> spans + markDefs
function spans(text, k) {
  const children = []
  const markDefs = []
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0, mm, li = 0, di = 0
  const push = (str, marks = []) => { if (str) children.push({ _type: 'span', _key: `${k}s${li++}`, text: str, marks }) }
  while ((mm = regex.exec(text)) !== null) {
    push(text.slice(last, mm.index))
    if (mm[2] !== undefined) push(mm[2], ['strong'])
    else if (mm[4] !== undefined) {
      const lk = `${k}l${di++}`
      markDefs.push({ _key: lk, _type: 'link', href: normHref(mm[5]) })
      push(mm[4], [lk])
    }
    last = regex.lastIndex
  }
  push(text.slice(last))
  if (!children.length) push(text)
  return { children, markDefs }
}

function mkBlock(style, text, listItem) {
  const k = key()
  const { children, markDefs } = spans(text, k)
  const b = { _type: 'block', _key: k, style, markDefs, children }
  if (listItem) { b.listItem = listItem; b.level = 1 }
  return b
}

const lines = body.split('\n')
const blocks = []
let para = []
const flush = () => { if (para.length) { blocks.push(mkBlock('normal', para.join(' ').trim())); para = [] } }
for (const line of lines) {
  const t = line.trim()
  if (t === '' || t === '---') { flush(); continue }
  if (t.startsWith('# ') && !t.startsWith('## ')) continue
  if (t.startsWith('### ')) { flush(); blocks.push(mkBlock('h3', t.slice(4))); continue }
  if (t.startsWith('## ')) { flush(); blocks.push(mkBlock('h2', t.slice(3))); continue }
  if (t.startsWith('|') && t.endsWith('|')) {
    flush()
    const cells = t.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue
    if (/pret orientativ|tip aparat|tip aparat dentar|procedura/i.test(t)) continue
    blocks.push(mkBlock('normal', `**${cells[0]}:** ${cells.slice(1).join(' ')}`, 'bullet'))
    continue
  }
  if (/^[-*]\s+/.test(t)) { flush(); blocks.push(mkBlock('normal', t.replace(/^[-*]\s+/, ''), 'bullet')); continue }
  if (/^\d+\.\s+/.test(t)) { flush(); blocks.push(mkBlock('normal', t.replace(/^\d+\.\s+/, ''), 'number')); continue }
  para.push(t)
}
flush()

const header = `// AUTO-GENERATED from ${file} via scripts/md-to-fallback.mjs — edit the markdown + regenerate.\nimport type { PortableTextBlock } from '../fallback-blog'\n\nexport const content: PortableTextBlock[] = `
process.stdout.write(header + JSON.stringify(blocks, null, 2) + '\n')
