'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Info } from 'lucide-react'

export type PriceListTab = {
  id: string
  label: string
  rows: Array<{ id: string; label: string; price: string; from: boolean }>
}

type Props = {
  tabs: PriceListTab[]
  fromLabel: string
  countSuffix: string
  footnote: string
}

/**
 * Category tabs for the /preturi price list. Every panel is rendered into the
 * HTML (inactive ones get `hidden`), so crawlers still see the full catalog.
 */
export function PriceListTabs({ tabs, fromLabel, countSuffix, footnote }: Props) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()

  const select = (i: number) => {
    setActive(i)
    tabRefs.current[i]?.focus()
    tabRefs.current[i]?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') select(active === last ? 0 : active + 1)
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') select(active === 0 ? last : active - 1)
    else if (e.key === 'Home') select(0)
    else if (e.key === 'End') select(last)
    else return
    e.preventDefault()
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8 items-start">
      {/* Mobile/tablet: horizontal scrolling pills. Desktop: vertical category menu. */}
      <div
        role="tablist"
        className="-mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2 lg:pb-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:sticky lg:top-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, i) => {
          const selected = i === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={[
                'shrink-0 inline-flex items-center gap-2 min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap',
                'lg:justify-between lg:rounded-xl lg:border-transparent lg:px-4 lg:text-[15px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6f1]',
                selected
                  ? 'bg-[#2a2118] border-[#2a2118] text-white lg:border-[#2a2118]'
                  : 'bg-white border-[#e8e0d5] text-[#2a2118] hover:border-[#d4c4b0] lg:bg-transparent lg:hover:bg-white lg:hover:border-[#e8e0d5]',
              ].join(' ')}
            >
              {tab.label}
              <span
                className={[
                  'text-xs tabular-nums',
                  selected ? 'text-white/60' : 'text-[#8b7355]',
                ].join(' ')}
              >
                {tab.rows.length}
              </span>
            </button>
          )
        })}
      </div>

      <div className="min-w-0">
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={i !== active}
          className="rounded-2xl border border-[#e8e0d5] bg-white shadow-[0_8px_32px_-12px_rgba(42,33,24,0.08)] overflow-hidden"
        >
          <div className="flex items-baseline justify-between gap-4 px-5 md:px-7 pt-6 pb-4 border-b border-[#e8e0d5] bg-[#fdfbf8]">
            <h3 className="text-xl md:text-2xl font-semibold text-[#2a2118] tracking-tight">{tab.label}</h3>
            <span className="text-xs text-[#8b7355] tabular-nums whitespace-nowrap">
              {tab.rows.length} {countSuffix}
            </span>
          </div>
          <ul className="divide-y divide-[#f5f0e8]">
            {tab.rows.map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between gap-4 px-5 md:px-7 py-3.5 transition-colors duration-150 hover:bg-[#fdfbf8]"
              >
                <span className="text-sm md:text-base text-[#2a2118] leading-snug">
                  {row.label}
                </span>
                <span className="text-right whitespace-nowrap">
                  {row.from && (
                    <span className="mr-1.5 text-xs text-[#8b7355]">{fromLabel.toLowerCase()}</span>
                  )}
                  <span className="text-sm md:text-base font-semibold text-[#2a2118] tabular-nums">
                    {row.price}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2 px-5 md:px-7 py-4 border-t border-[#e8e0d5] bg-[#fdfbf8] text-xs md:text-sm text-[#6b5a45] leading-relaxed">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {footnote}
          </p>
        </div>
      ))}
      </div>
    </div>
  )
}
