'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone, ArrowRight, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { getMainFallbackServices } from '@/lib/fallback-services'
import { locales, type Locale } from '@/i18n/config'
import RO from 'country-flag-icons/react/3x2/RO'
import GB from 'country-flag-icons/react/3x2/GB'
import HU from 'country-flag-icons/react/3x2/HU'

const LOCALE_FLAGS: Record<Locale, React.ComponentType<{ className?: string; title?: string }>> = {
  ro: RO,
  en: GB,
  hu: HU,
}

const CallbackPopup = dynamic(() => import('@/components/features/CallbackPopup'), {
  ssr: false,
})

// Animated hamburger — three asymmetric lines that morph to an X when open.
function HamburgerIcon({ className, open }: { className?: string; open: boolean }) {
  const top = {
    closed: { x1: 4, y1: 7, x2: 20, y2: 7, opacity: 1 },
    open: { x1: 5, y1: 19, x2: 19, y2: 5, opacity: 1 },
  }
  const middle = {
    closed: { opacity: 1, x1: 4, y1: 12, x2: 20, y2: 12 },
    open: { opacity: 0, x1: 12, y1: 12, x2: 12, y2: 12 },
  }
  const bottom = {
    closed: { x1: 4, y1: 17, x2: 14, y2: 17, opacity: 1 },
    open: { x1: 5, y1: 5, x2: 19, y2: 19, opacity: 1 },
  }
  const transition = { type: 'spring' as const, stiffness: 280, damping: 24 }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.line animate={open ? top.open : top.closed} transition={transition} />
      <motion.line
        animate={open ? middle.open : middle.closed}
        transition={{ ...transition, duration: 0.18 }}
      />
      <motion.line animate={open ? bottom.open : bottom.closed} transition={transition} />
    </svg>
  )
}

const navItems = [
  { href: '/echipa', key: 'team' },
  { href: '/preturi', key: 'prices' },
  { href: '/galerie', key: 'gallery' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const

type MobileMenuOpenProps = { open: boolean; onClose: () => void }

type MobileDrawerProps = MobileMenuOpenProps & { onBookingOpen: () => void }

function MobileDrawer({ open, onClose, onBookingOpen }: MobileDrawerProps) {
  const t = useTranslations('navigation')
  const tHero = useTranslations('hero')
  const tServices = useTranslations('services')
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale
  const [servicesExpanded, setServicesExpanded] = useState(false)
  const NAV_SLUGS = ['implantologie', 'estetica-dentara', 'ortodontie', 'protetica', 'stomatologie-generala', 'pedodontie']
  const allMain = getMainFallbackServices()
  const mainServices = NAV_SLUGS.map((slug) => allMain.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s))

  const switchLocale = (loc: Locale) => {
    router.replace(pathname as '/', { locale: loc })
  }

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] xl:hidden">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-[#1a1a1a]/50"
            onClick={onClose}
          />
          <motion.nav
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.8 }}
            className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_80px_-20px_rgba(42,33,24,0.45)] ring-1 ring-black/5 origin-top"
          >
            <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible" className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">Meniu</span>
              <button type="button" onClick={onClose} aria-label="Închide meniul" className="w-10 h-10 rounded-full bg-[#faf6f1] hover:bg-[#f5f0e8] flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-[#2a2118]" strokeWidth={2} />
              </button>
            </motion.div>
            <ul className="flex flex-col gap-1">
              <motion.li custom={1} variants={itemVariants} initial="hidden" animate="visible">
                <button
                  type="button"
                  onClick={() => setServicesExpanded((v) => !v)}
                  aria-expanded={servicesExpanded}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#2a2118] font-medium hover:bg-[#faf6f1] transition-colors"
                >
                  <span>{t('services')}</span>
                  <ChevronDown className={cn('w-4 h-4 text-[#8b7355] transition-transform duration-300', servicesExpanded && 'rotate-180')} strokeWidth={2.25} />
                </button>
                <AnimatePresence initial={false}>
                  {servicesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-1 pt-1 pb-2 pl-2">
                        {mainServices.map((service) => (
                          <Link key={service.slug} href={`/servicii/${service.slug}` as '/servicii'} onClick={onClose} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[#faf6f1] transition-colors">
                            <div className="w-9 h-9 rounded-lg bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center shrink-0 group-hover:bg-[#d4c4b0]/40 group-hover:border-[#d4c4b0] transition-colors">
                              {service.iconPath ? (
                                <Image src={service.iconPath} alt="" width={20} height={20} className="w-5 h-5" />
                              ) : (
                                <service.Icon className="w-4 h-4 text-[#8b7355]" strokeWidth={1.5} />
                              )}
                            </div>
                            <span className="flex-1 min-w-0 text-sm font-medium text-[#2a2118] leading-tight">{tServices(`fallback.${service.titleKey}`)}</span>
                          </Link>
                        ))}
                        <Link href="/servicii" onClick={onClose} className="mt-1 flex items-center justify-between rounded-xl bg-[#1a1a1a] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#4a3d30] transition-colors">
                          <span>{t('services')}</span>
                          <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
              {navItems.map((item, idx) => (
                <motion.li key={item.key} custom={idx + 2} variants={itemVariants} initial="hidden" animate="visible">
                  <Link href={item.href} onClick={onClose} className="block px-4 py-3 rounded-xl text-[#2a2118] font-medium hover:bg-[#faf6f1] transition-colors">
                    {t(item.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div custom={navItems.length + 2} variants={itemVariants} initial="hidden" animate="visible" className="mt-4 pt-4 border-t border-[#f5f0e8]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b7355] mb-2 px-2">Limbă</p>
              <div className="flex gap-2 px-2">
                {locales.map((loc) => {
                  const Flag = LOCALE_FLAGS[loc]
                  return (
                    <button key={loc} type="button" onClick={() => { switchLocale(loc); onClose() }} className={cn('flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium border transition-all duration-200', currentLocale === loc ? 'bg-[#1a1a1a] text-white border-[#d4c4b0]/40' : 'bg-[#faf6f1] text-[#2a2118] border-[#e8e0d5] hover:bg-[#f5f0e8] hover:border-[#d4c4b0]')}>
                      <span className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-black/10 flex items-center justify-center bg-white shrink-0">
                        <Flag className="absolute inset-0 w-full h-full object-cover scale-[1.6]" />
                      </span>
                      <span className="uppercase tracking-wide">{loc}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
            <motion.div custom={navItems.length + 3} variants={itemVariants} initial="hidden" animate="visible" className="mt-4">
              <button type="button" onClick={() => { onClose(); onBookingOpen() }} className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#1a1a1a] text-white rounded-xl font-semibold hover:bg-[#4a3d30] transition-colors">
                {tHero('ctaPrimary')}
              </button>
            </motion.div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}

/**
 * Floating pill nav — used on every page.
 * - Homepage: lays over the FramedHero (no spacer)
 * - Other pages: renders a spacer below so content doesn't slide under the fixed nav
 */
export function FramedNav() {
  const t = useTranslations('navigation')
  const tHero = useTranslations('hero')
  const tServices = useTranslations('services')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale
  const langCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const NAV_SLUGS = ['implantologie', 'estetica-dentara', 'ortodontie', 'protetica', 'stomatologie-generala', 'pedodontie']
  const allMain = getMainFallbackServices()
  const mainServices = NAV_SLUGS.map((slug) => allMain.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s))

  const isHomepage = pathname === '/'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsServicesOpen(true)
  }
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 150)
  }

  return (
    <>
      <nav className={cn('fixed z-[150] transition-all duration-500 ease-out', isScrolled ? 'top-2 left-2 right-2 md:top-3 md:left-4 md:right-4 lg:left-6 lg:right-6' : 'top-3 left-3 right-3 md:top-6 md:left-8 md:right-8 lg:left-12 lg:right-12')}>
        <div className={cn('flex items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr] mx-auto rounded-full border transition-all duration-500 ease-out', isScrolled ? 'bg-white/98 backdrop-blur-xl border-[#e8e0d5] pl-5 pr-3 py-2 md:pl-6 md:pr-3 md:py-1.5 shadow-[0_10px_40px_-8px_rgba(42,33,24,0.25)]' : 'bg-white/95 backdrop-blur-md border-white/60 pl-5 pr-3 py-2.5 md:pl-8 md:pr-4 md:py-2 shadow-[0_10px_40px_-10px_rgba(42,33,24,0.35)]')}>
          <Link href="/" className="flex items-center shrink-0 group justify-self-start">
            <Image src="/branding/LOGO_BLACK_FINAL.png" alt="DentCraft" width={420} height={59} priority className={cn('w-auto transition-all duration-500 group-hover:opacity-80', isScrolled ? 'h-5' : 'h-5 md:h-6')} />
          </Link>

          <ul className="hidden xl:flex items-center justify-center gap-1 text-[15px] font-bold uppercase tracking-[0.14em]">
            <li className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={cn('flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-full text-[13px] xl:text-[15px] font-bold uppercase tracking-[0.12em] xl:tracking-[0.14em] transition-colors', isServicesOpen ? 'text-[#2a2118] bg-[#faf6f1]' : 'text-[#2a2118]/70 hover:text-[#2a2118] hover:bg-[#faf6f1]')}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                {t('services')}
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-300', isServicesOpen && 'rotate-180')} />
              </button>

              <div
                className={cn('fixed left-1/2 -translate-x-1/2 mt-6 w-[min(1080px,calc(100vw-3rem))] origin-top z-[200]', 'transition-all duration-200', isServicesOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none')}
                style={{ top: 'calc(env(safe-area-inset-top) + 80px)' }}
              >
                <div className="relative rounded-3xl bg-white shadow-[0_20px_60px_-10px_rgba(42,33,24,0.3)] border border-[#e8e0d5] p-6 overflow-hidden">
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4c4b0]/40 to-transparent" />
                  <div className="px-2 pb-3 mb-3 border-b border-[#f0ebe3]">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">{t('services')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                    {mainServices.map((service) => (
                      <Link key={service.slug} href={`/servicii/${service.slug}` as '/servicii'} className="group flex items-start gap-3 rounded-2xl px-3 py-3 hover:bg-[#faf6f1] transition-colors" onClick={() => setIsServicesOpen(false)}>
                        <div className="w-12 h-12 rounded-xl bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center shrink-0 group-hover:bg-[#d4c4b0]/40 group-hover:border-[#d4c4b0] transition-colors">
                          {service.iconPath ? (
                            <Image src={service.iconPath} alt="" width={28} height={28} className="w-7 h-7" />
                          ) : (
                            <service.Icon className="w-6 h-6 text-[#8b7355]" strokeWidth={1.5} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 self-center">
                          <div className="font-semibold text-[#2a2118] text-[14px] leading-tight group-hover:text-[#8b7355] transition-colors">
                            {tServices(`fallback.${service.titleKey}`)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/servicii" onClick={() => setIsServicesOpen(false)} className="mt-4 flex items-center justify-between rounded-2xl bg-[#1a1a1a] text-white px-5 py-3.5 text-[13px] font-semibold hover:bg-[#4a3d30] transition-colors">
                    <span>Vezi toate serviciile si tratamentele</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </li>

            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="group relative px-2.5 xl:px-3 py-2 rounded-full text-[#2a2118]/75 hover:text-[#2a2118] transition-colors">
                  <span className="relative">
                    {t(item.key)}
                    <span aria-hidden="true" className="absolute left-1/2 -bottom-0.5 h-[2px] w-0 -translate-x-1/2 bg-[#d4c4b0] rounded-full transition-[width] duration-300 group-hover:w-3/4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 shrink-0 justify-self-end">
            <div className="hidden xl:block relative" onMouseEnter={() => { if (langCloseTimer.current) clearTimeout(langCloseTimer.current); setIsLangOpen(true) }} onMouseLeave={() => { langCloseTimer.current = setTimeout(() => setIsLangOpen(false), 150) }}>
              <button
                type="button"
                onClick={() => setIsLangOpen((v) => !v)}
                className={cn('inline-flex items-center gap-2 px-4 py-3 rounded-full text-base font-medium uppercase tracking-wide transition-colors', isLangOpen ? 'text-[#2a2118] bg-[#faf6f1]' : 'text-[#2a2118]/75 hover:text-[#2a2118] hover:bg-[#faf6f1]')}
                aria-expanded={isLangOpen}
                aria-haspopup="true"
              >
                {(() => { const Flag = LOCALE_FLAGS[currentLocale]; return (<span className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-black/10 bg-white shrink-0"><Flag className="absolute inset-0 w-full h-full object-cover scale-[1.6]" /></span>) })()}
                <span>{currentLocale}</span>
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-300', isLangOpen && 'rotate-180')} />
              </button>

              <div className={cn('absolute right-0 top-full mt-6 w-44 origin-top-right transition-all duration-200', isLangOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none')}>
                <div className="relative rounded-2xl bg-white shadow-[0_20px_60px_-10px_rgba(42,33,24,0.3)] border border-[#e8e0d5] p-2 overflow-hidden">
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4c4b0]/40 to-transparent" />
                  <div className="grid gap-1 pt-1">
                    {locales.map((loc) => {
                      const Flag = LOCALE_FLAGS[loc]
                      const isActive = currentLocale === loc
                      return (
                        <button key={loc} type="button" onClick={() => { router.replace(pathname as '/', { locale: loc }); setIsLangOpen(false) }} className={cn('flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors', isActive ? 'bg-[#1a1a1a] text-white' : 'text-[#2a2118] hover:bg-[#faf6f1]')}>
                          <span className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-black/10 bg-white shrink-0">
                            <Flag className="absolute inset-0 w-full h-full object-cover scale-[1.6]" />
                          </span>
                          <span className="uppercase tracking-wide">{loc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <a href="tel:+40741199977" aria-label="Sună-ne: 0741 199 977" title="0741 199 977" className="hidden xl:inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] hover:bg-[#4a3d30] transition-colors group">
              <Phone className="w-[18px] h-[18px] text-white" strokeWidth={2.25} />
            </a>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="group hidden sm:inline-flex md:hidden xl:inline-flex items-center whitespace-nowrap px-5 sm:px-6 xl:px-9 py-3 xl:py-4 bg-[#1a1a1a] text-white rounded-full text-sm xl:text-base font-semibold hover:shadow-[0_10px_24px_-8px_rgba(42,33,24,0.4)] transition-shadow duration-300"
            >
              <span>{tHero('ctaPrimary')}</span>
              <span aria-hidden="true" className="inline-flex items-center overflow-hidden ml-2 max-w-5 opacity-100 translate-x-0 md:ml-0 md:max-w-0 md:opacity-0 md:-translate-x-2 md:group-hover:ml-2 md:group-hover:max-w-5 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
              </span>
            </button>
            <button type="button" onClick={() => setMobileOpen(true)} className="xl:hidden p-2.5 sm:p-3 rounded-full text-[#2a2118] hover:bg-[#faf6f1] transition-colors" aria-label="Deschide meniul">
              <HamburgerIcon className="w-7 h-7 sm:w-8 sm:h-8" open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} onBookingOpen={() => setBookingOpen(true)} />
      <CallbackPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Spacer — pushes content below the fixed pill nav on routes without a full-height hero. Skipped on homepage where FramedHero takes the full viewport. */}
      {!isHomepage && <div aria-hidden="true" className="h-20 md:h-24" />}
    </>
  )
}
