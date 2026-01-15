'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { locales, localeFlags, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavItem } from './Header'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  currentLocale: Locale
  onLanguageChange: (locale: Locale) => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentLocale,
  onLanguageChange,
}: MobileMenuProps) {
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')
  const pathname = usePathname()

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
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
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
            className="fixed top-0 right-0 z-40 flex h-full w-[85%] max-w-[380px] flex-col bg-white shadow-modal lg:hidden"
          >
            {/* Header spacer */}
            <div className="h-[72px] shrink-0" />

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
                {navItems.map((item, index) => (
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
                ))}
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
                <Link
                  href="/contact"
                  onClick={onClose}
                  className={cn(
                    'flex w-full items-center justify-center rounded-xl px-6 py-4 text-base font-semibold transition-all duration-300',
                    'bg-primary text-primary-foreground shadow-button',
                    'hover:bg-primary-hover active:scale-[0.98]'
                  )}
                >
                  {tCommon('bookAppointment')}
                </Link>
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
