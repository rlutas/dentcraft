'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { locales, localeFlags, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import type { NavItem } from './Header'
import { getMainFallbackServices } from '@/lib/fallback-services'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  currentLocale: Locale
  onLanguageChange: (locale: Locale) => void
  onOpenCallbackPopup?: () => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentLocale,
  onLanguageChange,
  onOpenCallbackPopup,
}: MobileMenuProps) {
  const t = useTranslations('navigation')
  const tServices = useTranslations('services')
  const tCommon = useTranslations('common')
  const pathname = usePathname()

  // Services dropdown state
  const [isServicesExpanded, setIsServicesExpanded] = useState(false)

  // Get main services for accordion
  const mainServices = getMainFallbackServices()

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Animation variants
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  const drawerVariants = {
    closed: { x: '100%' },
    open: { x: 0 },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[75] bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            className="fixed top-0 right-0 z-[75] flex h-full w-[85%] max-w-[380px] flex-col bg-white shadow-modal lg:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex h-[80px] shrink-0 items-center justify-between border-b border-[#f0f0f0] px-6">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/branding/LOGO_BLACK_FINAL.png"
                  alt="Dentcraft"
                  width={120}
                  height={30}
                  className="h-7 w-auto"
                />
              </Link>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#1a1a1a] transition-colors hover:bg-[#f5f0e8]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation content */}
            <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
              {/* Main navigation links */}
              <ul className="space-y-1">
                {/* Home link */}
                <motion.li
                  custom={0}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href="/"
                    onClick={onClose}
                    className={cn(
                      'flex items-center rounded-xl px-4 py-3.5 text-lg font-medium transition-all duration-200',
                      isActiveLink('/')
                        ? 'bg-accent/50 text-foreground'
                        : 'text-secondary hover:bg-accent/30 hover:text-foreground'
                    )}
                  >
                    {t('home')}
                    {isActiveLink('/') && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-foreground" />
                    )}
                  </Link>
                </motion.li>

                {/* Other nav items */}
                {navItems.map((item, index) => {
                  // Special handling for Services accordion
                  if (item.key === 'services') {
                    return (
                      <motion.li
                        key={item.key}
                        custom={index + 1}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        {/* Services Main Link with Expand/Collapse */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className={cn(
                                'flex flex-1 items-center rounded-xl px-4 py-3.5 text-lg font-medium transition-all duration-200',
                                isActiveLink(item.href)
                                  ? 'bg-accent/50 text-foreground'
                                  : 'text-secondary hover:bg-accent/30 hover:text-foreground'
                              )}
                            >
                              {t(item.key)}
                              {isActiveLink(item.href) && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-foreground" />
                              )}
                            </Link>

                            {/* Toggle button for services accordion */}
                            <button
                              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                              className={cn(
                                'flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200',
                                isServicesExpanded
                                  ? 'bg-accent/50 text-foreground'
                                  : 'text-secondary hover:bg-accent/30 hover:text-foreground'
                              )}
                              aria-label={isServicesExpanded ? 'Collapse services' : 'Expand services'}
                              aria-expanded={isServicesExpanded}
                            >
                              <ChevronDown
                                className={cn(
                                  'h-5 w-5 transition-transform duration-300',
                                  isServicesExpanded && 'rotate-180'
                                )}
                              />
                            </button>
                          </div>

                          {/* Services Accordion Content */}
                          <AnimatePresence initial={false}>
                            {isServicesExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.4, 0, 0.2, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-1 py-2 pl-2">
                                  {mainServices.map((service) => (
                                    <motion.li
                                      key={service.slug}
                                      initial={{ x: -10, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      exit={{ x: -10, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <Link
                                        href={`/servicii/${service.slug}` as '/servicii'}
                                        onClick={onClose}
                                        className={cn(
                                          'group flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-200',
                                          'hover:bg-accent/40'
                                        )}
                                      >
                                        {/* Service Icon */}
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/60 transition-all duration-200 group-hover:bg-accent/80">
                                          <service.Icon className="h-4.5 w-4.5 text-secondary" strokeWidth={1.5} />
                                        </div>

                                        {/* Service Name */}
                                        <span className="flex-1 pt-1.5 text-[15px] font-medium text-secondary transition-colors duration-200 group-hover:text-foreground">
                                          {tServices(service.titleKey)}
                                        </span>

                                        {/* Arrow indicator */}
                                        <motion.div
                                          initial={{ x: -2, opacity: 0 }}
                                          whileHover={{ x: 0, opacity: 1 }}
                                          className="flex items-center pt-2"
                                        >
                                          <svg className="h-4 w-4 text-[#d4c4b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                          </svg>
                                        </motion.div>
                                      </Link>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.li>
                    )
                  }

                  // Regular nav items
                  return (
                    <motion.li
                      key={item.key}
                      custom={index + 1}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center rounded-xl px-4 py-3.5 text-lg font-medium transition-all duration-200',
                          isActiveLink(item.href)
                            ? 'bg-accent/50 text-foreground'
                            : 'text-secondary hover:bg-accent/30 hover:text-foreground'
                        )}
                      >
                        {t(item.key)}
                        {isActiveLink(item.href) && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-foreground" />
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Divider */}
              <motion.div
                custom={navItems.length + 1}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="my-6 h-px bg-border-light"
              />

              {/* Language Switcher */}
              <motion.div
                custom={navItems.length + 2}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="space-y-3"
              >
                <p className="px-4 text-xs font-semibold uppercase tracking-wider text-secondary">
                  Language
                </p>
                <div className="flex gap-2 px-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => onLanguageChange(loc)}
                      className={cn(
                        'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                        currentLocale === loc
                          ? 'bg-accent/60 text-foreground ring-1 ring-border'
                          : 'bg-accent/20 text-secondary hover:bg-accent/40 hover:text-foreground'
                      )}
                    >
                      <span className="text-lg">{localeFlags[loc]}</span>
                      <span className="uppercase">{loc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA Button */}
              <motion.div
                custom={navItems.length + 3}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="mt-6"
              >
                <button
                  onClick={onOpenCallbackPopup}
                  className={cn(
                    'flex w-full items-center justify-center rounded-xl px-6 py-4 text-base font-semibold transition-all duration-300',
                    'bg-primary text-primary-foreground shadow-button',
                    'hover:bg-primary-hover active:scale-[0.98]'
                  )}
                >
                  {tCommon('bookAppointment')}
                </button>
              </motion.div>

              {/* Contact info hint */}
              <motion.p
                custom={navItems.length + 4}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="mt-4 text-center text-sm text-secondary"
              >
                +40 261 XXX XXX
              </motion.p>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
