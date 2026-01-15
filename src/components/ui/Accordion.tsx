'use client'

import { ChevronDown } from 'lucide-react'
import { useCallback, useState } from 'react'

type AccordionItemProps = {
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  title: string
}

function AccordionItem({ title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="border-b border-[var(--color-accent)] last:border-b-0">
      <button
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left text-body-lg font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
        onClick={onToggle}
        type="button"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--color-primary)] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-5 text-body text-muted">
          {children}
        </div>
      </div>
    </div>
  )
}

type AccordionProps = {
  allowMultiple?: boolean
  defaultOpenIndex?: number
  items: Array<{
    content: React.ReactNode
    id: string
    title: string
  }>
}

export function Accordion({ items, allowMultiple = false, defaultOpenIndex }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => {
    const initial = new Set<number>()
    if (defaultOpenIndex !== undefined && defaultOpenIndex >= 0 && defaultOpenIndex < items.length) {
      initial.add(defaultOpenIndex)
    }
    return initial
  })

  const handleToggle = useCallback((index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(index)
      }
      return next
    })
  }, [allowMultiple])

  return (
    <div className="divide-y-0">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          isOpen={openIndexes.has(index)}
          onToggle={() => handleToggle(index)}
          title={item.title}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
