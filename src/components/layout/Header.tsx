'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { locales, localeFlags, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { getMainFallbackServices } from '@/lib/fallback-services'
import CallbackPopup from '@/components/features/CallbackPopup'

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
  { href: '/galerie', key: 'gallery' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
]

// Language names for dropdown
const localeNames: Record<Locale, string> = {
  ro: 'Română',
  en: 'English',
  hu: 'Magyar',
}

export default function Header() {
  const t = useTranslations('navigation')
  const tServices = useTranslations('services')
  const tCommon = useTranslations('common')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCallbackPopupOpen, setIsCallbackPopupOpen] = useState(false)

  // Get main services for dropdown
  const mainServices = getMainFallbackServices()

  // Handle scroll detection for transparent to solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
      if (!target.closest('[data-services-dropdown]')) {
        setIsServicesOpen(false)
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
          'fixed top-0 right-0 left-0 z-[70] transition-all duration-500',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_4px_20px_-4px_rgba(0,0,0,0.08)]'
            : 'bg-transparent',
          // Hide header on mobile when menu is open
          isMobileMenuOpen && 'lg:visible invisible'
        )}
      >
        {/* Top accent line - visible when scrolled */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500',
            'bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent',
            isScrolled ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div className="container">
          <nav className="flex h-[80px] items-center justify-between gap-8">
            {/* Logo - hidden on mobile when menu is open */}
            <Link
              href="/"
              className={cn(
                'group relative z-10 flex shrink-0 items-center transition-opacity duration-200',
                isMobileMenuOpen && 'lg:opacity-100 opacity-0 pointer-events-none lg:pointer-events-auto'
              )}
            >
              <div className="relative">
                <Image
                  src="/branding/LOGO_BLACK_FINAL.png"
                  alt="Dentcraft"
                  width={140}
                  height={35}
                  className="h-8 w-auto transition-all duration-300 group-hover:opacity-80"
                  priority
                />
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 bg-[#d4c4b0]" />
              </div>
            </Link>

            {/* Desktop Navigation - Centered with flex */}
            <div className="hidden flex-1 justify-center lg:flex">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  // Special handling for Services dropdown
                  if (item.key === 'services') {
                    return (
                      <li
                        key={item.key}
                        className="relative"
                        data-services-dropdown
                        onMouseEnter={() => {
                          setIsServicesOpen(true)
                          setHoveredItem(item.key)
                        }}
                        onMouseLeave={() => {
                          setIsServicesOpen(false)
                          setHoveredItem(null)
                        }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'relative flex items-center gap-1 px-4 py-2.5 text-[13px] font-medium tracking-[0.02em] uppercase transition-all duration-300',
                            isActiveLink(item.href)
                              ? 'text-[#1a1a1a]'
                              : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                          )}
                        >
                          {t(item.key)}
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-all duration-300',
                              isServicesOpen && 'rotate-180'
                            )}
                          />

                          {/* Hover/Active indicator - elegant line */}
                          <motion.span
                            className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-[#1a1a1a] origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{
                              scaleX: isActiveLink(item.href) || hoveredItem === item.key ? 1 : 0
                            }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          />
                        </Link>

                        {/* Services Dropdown */}
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.96 }}
                              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                              className="absolute top-full left-1/2 -translate-x-1/2 z-[80] mt-2 w-[340px] overflow-hidden rounded-2xl
                                bg-white p-2
                                shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)]"
                            >
                              {/* Elegant top border accent */}
                              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent" />

                              <div className="grid gap-1 pt-2">
                                {mainServices.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={`/servicii/${service.slug}` as '/servicii'}
                                    className={cn(
                                      'group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
                                      'hover:bg-[#f5f0e8]/70'
                                    )}
                                  >
                                    {/* Service Icon */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f0e8] transition-all duration-200 group-hover:bg-[#d4c4b0]/30">
                                      <service.Icon className="h-4 w-4 text-[#5b5b5b]" strokeWidth={1.5} />
                                    </div>

                                    {/* Service Name */}
                                    <div className="flex-1 pt-0.5">
                                      <span className="text-[13px] font-medium text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#1a1a1a]">
                                        {tServices(service.titleKey)}
                                      </span>
                                    </div>

                                    {/* Hover arrow indicator */}
                                    <motion.div
                                      initial={{ x: -4, opacity: 0 }}
                                      whileHover={{ x: 0, opacity: 1 }}
                                      className="flex items-center pt-1"
                                    >
                                      <svg className="h-3.5 w-3.5 text-[#d4c4b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </motion.div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }

                  // Regular nav items
                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className={cn(
                          'relative px-4 py-2.5 text-[13px] font-medium tracking-[0.02em] uppercase transition-all duration-300',
                          isActiveLink(item.href)
                            ? 'text-[#1a1a1a]'
                            : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                        )}
                        onMouseEnter={() => setHoveredItem(item.key)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {t(item.key)}

                        {/* Hover/Active indicator - elegant line */}
                        <motion.span
                          className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-[#1a1a1a] origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: isActiveLink(item.href) || hoveredItem === item.key ? 1 : 0
                          }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Right side - Language Switcher + CTA */}
            <div className="flex shrink-0 items-center gap-3">
              {/* Language Switcher - Compact Dropdown */}
              <div
                className="relative hidden md:block"
                data-language-switcher
              >
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={cn(
                    'group flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300',
                    'hover:bg-[#f5f0e8]/70',
                    isLanguageOpen && 'bg-[#f5f0e8]'
                  )}
                  aria-expanded={isLanguageOpen}
                  aria-haspopup="listbox"
                >
                  <Globe className="h-4 w-4 text-[#8b8b8b] transition-colors group-hover:text-[#5b5b5b]" />
                  <span className="text-[13px] font-medium uppercase tracking-wide text-[#5b5b5b]">
                    {locale}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 text-[#8b8b8b] transition-all duration-300',
                      isLanguageOpen && 'rotate-180 text-[#5b5b5b]'
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute top-full right-0 z-[80] mt-2 min-w-[160px] overflow-hidden rounded-2xl
                        bg-white p-1.5
                        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)]"
                      role="listbox"
                    >
                      {locales.map((loc) => (
                        <motion.button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
                            locale === loc
                              ? 'bg-[#f5f0e8]'
                              : 'hover:bg-[#f5f0e8]/50'
                          )}
                          role="option"
                          aria-selected={locale === loc}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-base leading-none">{localeFlags[loc]}</span>
                          <span className={cn(
                            'text-[13px] font-medium',
                            locale === loc ? 'text-[#1a1a1a]' : 'text-[#6b6b6b]'
                          )}>
                            {localeNames[loc]}
                          </span>
                          {locale === loc && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="ml-auto"
                            >
                              <svg className="w-4 h-4 text-[#d4c4b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button - Desktop - Premium */}
              <button
                onClick={() => setIsCallbackPopupOpen(true)}
                className={cn(
                  'hidden lg:inline-flex items-center gap-2 group',
                  'px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide uppercase',
                  'bg-[#1a1a1a] text-white',
                  'transition-all duration-300',
                  'hover:bg-[#2a2a2a] hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)]',
                  'hover:-translate-y-0.5'
                )}
              >
                {tCommon('bookAppointment')}
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Mobile Menu Toggle - Refined */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'relative z-10 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 lg:hidden',
                  'border border-transparent',
                  'text-[#1a1a1a] hover:bg-[#f5f0e8]',
                  isMobileMenuOpen && 'bg-[#f5f0e8]'
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
                      <X className="h-5 w-5" strokeWidth={1.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" strokeWidth={1.5} />
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
        onOpenCallbackPopup={() => {
          setIsMobileMenuOpen(false)
          setIsCallbackPopupOpen(true)
        }}
      />

      {/* Callback Request Popup */}
      <CallbackPopup
        isOpen={isCallbackPopupOpen}
        onClose={() => setIsCallbackPopupOpen(false)}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[80px]" />
    </>
  )
}
