'use client'

import { useState } from 'react'
import { Accordion } from '@/components/ui/Accordion'

// Simple portable text renderer for FAQ answers
function renderPortableText(blocks: Array<{ _type: string; children?: Array<{ text: string }> }>) {
  if (!blocks || !Array.isArray(blocks)) return null

  return blocks
    .filter((block) => block._type === 'block')
    .map((block, index) => {
      const text = block['children']
        ?.map((child: { text: string }) => child.text)
        .join('') || ''
      return <p key={index}>{text}</p>
    })
}

type FAQ = {
  _id: string
  question: string
  answer: Array<{
    _type: string
    children?: Array<{
      text: string
    }>
  }>
  category: string
  order: number
}

type Category = {
  faqs: FAQ[]
  key: string
  label: string
}

type FAQPageClientProps = {
  categories: Category[]
}

export default function FAQPageClient({ categories }: FAQPageClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key || 'general')

  const activeFAQs = categories.find((cat) => cat.key === activeCategory)?.faqs || []

  const accordionItems = activeFAQs.map((faq) => ({
    id: faq._id,
    title: faq.question,
    content: renderPortableText(faq.answer),
  }))

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`px-6 py-3 rounded-full text-body-sm font-medium transition-colors ${
                  activeCategory === category.key
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                }`}
                onClick={() => setActiveCategory(category.key)}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="card p-6 md:p-8">
            {accordionItems.length > 0 ? (
              <Accordion allowMultiple items={accordionItems} />
            ) : (
              <p className="text-center text-muted py-8">
                No FAQs available in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
