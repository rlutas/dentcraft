'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { locales, localeFlags, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import MobileMenu from './MobileMenu'

// Static routes without dynamic segments
type StaticRoute =
  | '/'
  | '/servicii'
  | '/echipa'
  | '/contact'
  | '/galerie'
  | '/testimoniale'
  | '/preturi'
  | '/blog'
  | '/faq'

export type NavItem = {
  href: StaticRoute
  key: string
}

const navItems: NavItem[] = [
  { href: '/servicii', key: 'services' },
  { href: '/echipa', key: 'team' },
  { href: '/preturi', key: 'prices' },
  { href: '/contact', key: 'contact' },
]

export default function Header() {
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  // Handle scroll detection for glass morphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-language-switcher]')) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleLanguageChange = useCallback(
    (newLocale: Locale) => {
      // Use type assertion since pathname is a valid route from the current page
      router.replace(pathname as '/', { locale: newLocale })
      setIsLanguageOpen(false)
    },
    [pathname, router]
  )

  const isActiveLink = (href: StaticRoute) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-out',
          isScrolled
            ? 'bg-white/80 shadow-header backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div className="container">
          <nav className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group relative z-10 flex items-center gap-2"
            >
              <span className="text-[22px] font-bold tracking-tight text-foreground transition-opacity duration-300 group-hover:opacity-70">
                DENTCRAFT
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-4 py-2 text-[15px] font-medium transition-all duration-300',
                        'rounded-full hover:bg-accent/40',
                        isActiveLink(item.href)
                          ? 'text-foreground'
                          : 'text-secondary hover:text-foreground'
                      )}
                    >
                      {t(item.key)}
                      {/* Active indicator - subtle underline */}
                      {isActiveLink(item.href) && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-foreground"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side - Language Switcher + CTA */}
            <div className="flex items-center gap-3">
              {/* Language Switcher - Desktop */}
              <div
                className="relative hidden md:block"
                data-language-switcher
              >
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300',
                    'text-secondary hover:bg-accent/40 hover:text-foreground',
                    isLanguageOpen && 'bg-accent/40 text-foreground'
                  )}
                  aria-expanded={isLanguageOpen}
                  aria-haspopup="listbox"
                >
                  <span className="text-base">{localeFlags[locale]}</span>
                  <span className="uppercase">{locale}</span>
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      isLanguageOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-border-light bg-white p-1.5 shadow-card"
                      role="listbox"
                    >
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={cn(
                            'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            locale === loc
                              ? 'bg-accent/50 text-foreground'
                              : 'text-secondary hover:bg-accent/30 hover:text-foreground'
                          )}
                          role="option"
                          aria-selected={locale === loc}
                        >
                          <span className="text-base">{localeFlags[loc]}</span>
                          <span className="uppercase">{loc}</span>
                          {locale === loc && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground"
                            />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button - Desktop */}
              <Link
                href="/contact"
                className={cn(
                  'hidden rounded-xl px-5 py-2.5 text-[15px] font-semibold transition-all duration-300 md:block',
                  'bg-primary text-primary-foreground shadow-button',
                  'hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-card'
                )}
              >
                {tCommon('bookAppointment')}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 lg:hidden',
                  'text-foreground hover:bg-accent/40',
                  isMobileMenuOpen && 'bg-accent/40'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        currentLocale={locale}
        onLanguageChange={handleLanguageChange}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[72px]" />
    </>
  )
}
