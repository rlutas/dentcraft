'use client'

import { useState } from 'react'
import { BadgePercent } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────

type SanityPrice = {
  _id: string
  name: string
  description: string | null
  priceMin: number
  priceMax: number | null
  unit: string | null
  isPromotion: boolean
  promotionPrice: number | null
}

type SanityServicePrices = {
  _id: string
  title: string
  slug: string
  icon: string | null
  prices: SanityPrice[]
}

type PlaceholderPrice = {
  key: string
  name: string
  price: string
  unit: string | null
  description?: string | null
}

type PlaceholderServicePrices = {
  key: string
  title: string
  icon: string
  prices: PlaceholderPrice[]
}

// ─── Shared Tab Container ────────────────────────────────────

function TabBar({
  tabs,
  activeIndex,
  onSelect,
}: {
  tabs: { id: string; title: string; icon: string | null }[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 bg-[#f0ebe3] rounded-2xl p-2 border border-[#e8e0d5]/50 mb-6">
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
              isActive
                ? 'bg-white text-[#2a2118] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)] font-semibold'
                : 'text-[#8b7355] hover:text-[#2a2118] hover:bg-white/50'
            }`}
          >
            <img
              src={tab.icon || '/icons/032-tooth.svg'}
              alt=""
              className={`w-5 h-5 flex-shrink-0 transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
            />
            {tab.title}
          </button>
        )
      })}
    </div>
  )
}

// ─── TabbedPriceList (Sanity data) ──────────────────────────

export function TabbedPriceList({
  services,
  formatPrice,
}: {
  services: SanityServicePrices[]
  formatPrice: (n: number) => string
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (services.length === 0) return null

  const tabs = services.map((s) => ({
    id: s._id,
    title: s.title,
    icon: s.icon,
  }))

  const activeService = services[activeIndex]!

  return (
    <div>
      <TabBar tabs={tabs} activeIndex={activeIndex} onSelect={setActiveIndex} />

      <div className="bg-white rounded-2xl border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="divide-y divide-[#e8e0d5]"
          >
            {activeService.prices.map((price) => (
              <div
                key={price._id}
                className={`py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  price.isPromotion ? 'bg-[#faf6f1]' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--color-foreground)]">
                      {price.name}
                    </p>
                    {price.isPromotion && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e8ded0] text-[#8b7355] text-xs font-medium rounded-full">
                        <BadgePercent className="w-3 h-3" strokeWidth={2} />
                        Promo
                      </span>
                    )}
                  </div>
                  {price.description && (
                    <p className="text-sm text-[#6b6b6b] mt-1">
                      {price.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {price.isPromotion && price.promotionPrice ? (
                    <div className="text-right">
                      <p className="text-sm text-[#6b6b6b] line-through">
                        {formatPrice(price.priceMin)} RON
                      </p>
                      <p className="text-lg font-bold text-[#8b7355]">
                        {formatPrice(price.promotionPrice)} RON
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-[var(--color-primary)]">
                      {price.priceMax && price.priceMax !== price.priceMin
                        ? `${formatPrice(price.priceMin)} - ${formatPrice(price.priceMax)} RON`
                        : `${formatPrice(price.priceMin)} RON`}
                    </p>
                  )}
                  {price.unit && (
                    <span className="text-sm text-[#8b7355]">
                      / {price.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── TabbedPriceListPlaceholder (fallback data) ─────────────

export function TabbedPriceListPlaceholder({
  services,
}: {
  services: PlaceholderServicePrices[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (services.length === 0) return null

  const tabs = services.map((s) => ({
    id: s.key,
    title: s.title,
    icon: s.icon,
  }))

  const activeService = services[activeIndex]!

  return (
    <div>
      <TabBar tabs={tabs} activeIndex={activeIndex} onSelect={setActiveIndex} />

      <div className="bg-white rounded-2xl border border-[#e8e0d5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="divide-y divide-[#e8e0d5]"
          >
            {activeService.prices.map((price) => (
              <div
                key={price.key}
                className="py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--color-foreground)]">
                    {price.name}
                  </p>
                  {price.description && (
                    <p className="text-sm text-[#6b6b6b] mt-0.5">{price.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {price.price === 'GRATUIT' ? (
                    <p className="text-lg text-[#8b7355] font-semibold">
                      GRATUIT
                    </p>
                  ) : (
                    <p className="text-lg font-bold text-[var(--color-primary)]">
                      {price.price} RON
                    </p>
                  )}
                  {price.unit && (
                    <span className="text-sm text-[#8b7355]">
                      / {price.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
