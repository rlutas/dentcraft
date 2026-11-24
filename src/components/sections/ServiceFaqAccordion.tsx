'use client'

import { useId, useState } from 'react'
import { Plus } from 'lucide-react'

type Item = { question: string; answer: string }

/**
 * Service FAQ accordion — smooth height via grid-rows 0fr→1fr (no JS measuring).
 * Answers stay in the server HTML when collapsed (crawlable, matches FAQPage schema).
 */
export function ServiceFaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="rounded-[2rem] bg-white border border-[#ebe2d6] shadow-[0_30px_80px_-40px_rgba(139,115,85,0.3)] divide-y divide-[#efe7dc] overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-p${i}`
        const btnId = `${baseId}-b${i}`
        return (
          <div key={item.question} className={`transition-colors duration-300 ${isOpen ? 'bg-[#fdfaf6]' : 'bg-white'}`}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group w-full flex items-start gap-4 md:gap-6 text-left px-5 py-5 md:px-8 md:py-7 min-h-[56px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8b7355]/50"
              >
                <span className={`flex-1 text-base md:text-lg font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-[#2a2118]' : 'text-[#2a2118] group-hover:text-[#8b7355]'}`}>
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white rotate-45' : 'bg-white border-[#e2d8ca] text-[#8b7355] group-hover:border-[#8b7355]'}`}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pr-14 md:px-8 md:pb-8 md:pr-20 text-[15px] md:text-base text-[#5a5048] leading-relaxed max-w-[65ch]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
