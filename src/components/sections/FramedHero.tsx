'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone, Star, ArrowRight, X } from 'lucide-react'
// (getMainFallbackServices imported below from same line as other lib imports)
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
  // Variant set: closed = 3 horizontal lines, open = X (top crosses bottom, middle fades)
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
  const mainServices = getMainFallbackServices()

  const switchLocale = (loc: Locale) => {
    router.replace(pathname as '/', { locale: loc })
  }
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Stagger items inside the drawer
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
        <div className="fixed inset-0 z-[200] md:hidden">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-[#2a2118]/50"
            onClick={onClose}
          />
          <motion.nav
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.8 }}
            className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_30px_80px_-20px_rgba(42,33,24,0.45)] ring-1 ring-black/5 origin-top"
          >
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between mb-4"
            >
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">
            Meniu
          </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Închide meniul"
                className="w-10 h-10 rounded-full bg-[#faf6f1] hover:bg-[#f5f0e8] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-[#2a2118]" strokeWidth={2} />
              </button>
            </motion.div>
            <ul className="flex flex-col gap-1">
              {/* Services — expandable with 6 service shortcuts */}
              <motion.li
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  type="button"
                  onClick={() => setServicesExpanded((v) => !v)}
                  aria-expanded={servicesExpanded}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#2a2118] font-medium hover:bg-[#faf6f1] transition-colors"
                >
                  <span>{t('services')}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-[#8b7355] transition-transform duration-300',
                      servicesExpanded && 'rotate-180'
                    )}
                    strokeWidth={2.25}
                  />
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
                          <Link
                            key={service.slug}
                            href={`/servicii/${service.slug}` as '/servicii'}
                            onClick={onClose}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[#faf6f1] transition-colors"
                          >
                            <div className="w-9 h-9 rounded-lg bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center shrink-0 group-hover:bg-[#d4c4b0]/40 group-hover:border-[#d4c4b0] transition-colors">
                              <service.Icon
                                className="w-4 h-4 text-[#8b7355]"
                                strokeWidth={1.5}
                              />
                            </div>
                            <span className="flex-1 min-w-0 text-sm font-medium text-[#2a2118] leading-tight">
                              {tServices(service.titleKey)}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/servicii"
                          onClick={onClose}
                          className="mt-1 flex items-center justify-between rounded-xl bg-[#2a2118] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#4a3d30] transition-colors"
                        >
                          <span>{t('services')}</span>
                          <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>

              {navItems.map((item, idx) => (
                <motion.li
                  key={item.key}
                  custom={idx + 2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-3 rounded-xl text-[#2a2118] font-medium hover:bg-[#faf6f1] transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            {/* Language switcher */}
            <motion.div
              custom={navItems.length + 2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 pt-4 border-t border-[#f5f0e8]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b7355] mb-2 px-2">
                Limbă
              </p>
              <div className="flex gap-2 px-2">
                {locales.map((loc) => {
                  const Flag = LOCALE_FLAGS[loc]
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        switchLocale(loc)
                        onClose()
                      }}
                      className={cn(
                        'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium border transition-all duration-200',
                        currentLocale === loc
                          ? 'bg-[#2a2118] text-white border-[#d4c4b0]/40'
                          : 'bg-[#faf6f1] text-[#2a2118] border-[#e8e0d5] hover:bg-[#f5f0e8] hover:border-[#d4c4b0]'
                      )}
                    >
                      <span className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-black/10 flex items-center justify-center bg-white shrink-0">
                        <Flag className="absolute inset-0 w-full h-full object-cover scale-[1.6]" />
                      </span>
                      <span className="uppercase tracking-wide">{loc}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              custom={navItems.length + 3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4"
            >
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onBookingOpen()
                }}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#2a2118] text-white rounded-xl font-semibold hover:bg-[#4a3d30] transition-colors"
              >
                {tHero('ctaPrimary')}
              </button>
            </motion.div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}

export function FramedHero() {
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

  const mainServices = getMainFallbackServices()

  // Scroll detection for nav transform
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Small delay close for dropdown so moving mouse doesn't flicker
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsServicesOpen(true)
  }
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 150)
  }

  return (
    <section className="relative overflow-hidden min-h-[100svh] md:min-h-[92vh]">
      <div className="relative w-full h-full min-h-[100svh] md:min-h-[92vh]">
        {/* Responsive hero image — portrait on mobile, landscape on desktop.
            <picture> wrapped in absolute container so Next.js Image fill works
            (it requires a positioned parent). */}
        <picture className="absolute inset-0 block">
          <source
            media="(min-width: 768px)"
            srcSet="/images/hero/hero-patient-landscape.webp"
          />
          <Image
            src="/images/hero/hero-patient-portrait.webp"
            alt="Pacient zâmbind la consultație DentCraft Satu Mare"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[calc(30%-20px)_30%] md:object-center"
          />
        </picture>

        {/* Gradient overlays — strong at bottom for text readability, subtle at top for navbar */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-[#2a2118]/55 to-[#2a2118]/15 from-15% via-50% to-100%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent"
        />

        {/* Content overlay — bottom of hero. Mobile: tight stack so the
            chip sits just above the title near the bottom edge, not over
            the patient's face. */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:px-6 sm:pb-8 md:px-12 md:pb-14 lg:px-16 lg:pb-20">
          <div className="grid gap-4 sm:gap-6 md:gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            {/* LEFT: social proof + headline */}
            <div className="text-white">
              {/* Social proof chip — heavier glass, appears after H1 stagger */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 md:mb-8 rounded-full bg-white/15 backdrop-blur-2xl border border-white/30 px-2.5 sm:px-3 py-1.5 sm:py-2 pr-3 sm:pr-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_32px_-8px_rgba(0,0,0,0.3)]"
              >
                <div className="flex -space-x-2">
                  <Image
                    src="/images/patient-1.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2 ring-white object-cover"
                  />
                  <Image
                    src="/images/patient-2.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2 ring-white object-cover"
                  />
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#d4c4b0] to-[#8b7355] ring-2 ring-white flex items-center justify-center text-[9px] md:text-xs font-bold text-white">
                    +
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="text-xs sm:text-sm md:text-base font-bold">2000+</div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 uppercase tracking-wider">
                    {tHero('trustLabel')}
                  </div>
                </div>
                <div className="h-5 sm:h-6 w-px bg-white/25 mx-0.5 sm:mx-1" />
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-[#d4c4b0] text-[#d4c4b0]" />
                  <span className="text-xs sm:text-sm md:text-base font-bold">4.9</span>
                </div>
              </motion.div>

              {/* Headline — kicker inside h1 for SEO ("DentCraft Satu Mare"),
                  bold + italic lines with word stagger. Removed overflow-hidden
                  so descenders (g, y) and Hungarian diacritics aren't clipped. */}
              <h1 className="font-bold text-white leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.4 }}
                  className="block text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.28em] uppercase text-[#d4c4b0]/90 mb-3 sm:mb-4 md:mb-5"
                >
                  {tHero('kicker')}
                </motion.span>
                <motion.span
                  className="block"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                  }}
                >
                  {tHero('titleBold').split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.25em] last:mr-0"
                      variants={{
                        hidden: { y: 24, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { type: 'spring', stiffness: 220, damping: 22 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  className="font-serif italic font-medium text-[#d4c4b0] block pb-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
                  }}
                >
                  {tHero('titleItalic').split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.25em] last:mr-0"
                      variants={{
                        hidden: { y: 24, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { type: 'spring', stiffness: 220, damping: 22 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>
            </div>

            {/* RIGHT: description + CTAs */}
            <div className="md:text-right md:pb-2">
              <p className="text-white/90 text-sm md:text-lg leading-relaxed mb-3 sm:mb-5 md:mb-6 max-w-md md:ml-auto">
                {tHero('subtitle')}
              </p>
              {/* Primary CTA — clean white pill, dark warm text, no clutter.
                  High contrast against the dark hero, reads as the obvious
                  primary action. Hover lifts and deepens shadow. */}
              <div className="flex md:justify-end">
                <motion.button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 1.45,
                    type: 'spring',
                    stiffness: 240,
                    damping: 18,
                    mass: 0.9,
                  }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-[#1a1410] font-semibold tracking-wide shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_42px_-10px_rgba(0,0,0,0.45)] transition-[box-shadow] duration-300"
                >
                  <span>{tHero('ctaPrimary')}</span>
                  {/* Arrow reveals on hover: collapsed (max-w-0, opacity-0,
                      slid 8px left), then expands + fades + slides into place. */}
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center overflow-hidden ml-2 max-w-5 opacity-100 translate-x-0 md:ml-0 md:max-w-0 md:opacity-0 md:-translate-x-2 md:group-hover:ml-2 md:group-hover:max-w-5 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating pill navbar — always fixed, morphs on scroll */}
      <nav
        className={cn(
          'fixed z-[150] transition-all duration-500 ease-out',
          isScrolled
            ? 'top-2 left-2 right-2 md:top-3 md:left-4 md:right-4 lg:left-6 lg:right-6'
            : 'top-3 left-3 right-3 md:top-6 md:left-8 md:right-8 lg:left-12 lg:right-12'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-full border transition-all duration-500 ease-out',
            isScrolled
              ? 'bg-white/98 backdrop-blur-xl border-[#e8e0d5] pl-5 pr-3 py-2 md:pl-6 md:pr-3 md:py-2 shadow-[0_10px_40px_-8px_rgba(42,33,24,0.25)]'
              : 'bg-white/95 backdrop-blur-md border-white/60 pl-5 pr-3 py-2.5 md:pl-8 md:pr-4 md:py-3 shadow-[0_10px_40px_-10px_rgba(42,33,24,0.35)]'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/branding/LOGO_BLACK_FINAL.png"
              alt="DentCraft"
              width={420}
              height={59}
              priority
              className={cn(
                'w-auto transition-all duration-500 group-hover:opacity-80',
                isScrolled ? 'h-5' : 'h-5 md:h-6'
              )}
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1 text-sm">
            {/* Services with dropdown */}
            <li
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-full font-medium transition-colors',
                  isServicesOpen
                    ? 'text-[#2a2118] bg-[#faf6f1]'
                    : 'text-[#2a2118]/70 hover:text-[#2a2118] hover:bg-[#faf6f1]'
                )}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                {t('services')}
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-300',
                    isServicesOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  'absolute left-1/2 top-full -translate-x-1/2 mt-3 w-[380px] origin-top',
                  'transition-all duration-200',
                  isServicesOpen
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                )}
              >
                <div className="relative rounded-3xl bg-white shadow-[0_20px_60px_-10px_rgba(42,33,24,0.3)] border border-[#e8e0d5] p-3 overflow-hidden">
                  {/* Top accent */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent"
                  />

                  <div className="grid gap-1 pt-1">
                    {mainServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/servicii/${service.slug}` as '/servicii'}
                        className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-[#faf6f1] transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center shrink-0 group-hover:bg-[#d4c4b0]/40 group-hover:border-[#d4c4b0] transition-colors">
                          <service.Icon className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[#2a2118] text-sm leading-tight">
                            {tServices(service.titleKey)}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#d4c4b0] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>

                  {/* View all services CTA */}
                  <Link
                    href="/servicii"
                    onClick={() => setIsServicesOpen(false)}
                    className="mt-2 flex items-center justify-between rounded-2xl bg-[#2a2118] text-white px-4 py-3 text-sm font-semibold hover:bg-[#4a3d30] transition-colors"
                  >
                    <span>Toate serviciile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </li>

            {/* Other nav items — refined hover with underline-grow accent */}
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="group relative px-4 py-2 rounded-full text-[#2a2118]/75 font-medium tracking-wide hover:text-[#2a2118] transition-colors"
                >
                  <span className="relative">
                    {t(item.key)}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 -bottom-0.5 h-[2px] w-0 -translate-x-1/2 bg-[#d4c4b0] rounded-full transition-[width] duration-300 group-hover:w-3/4"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: language + phone + CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language switcher (desktop) */}
            <div
              className="hidden lg:block relative"
              onMouseEnter={() => {
                if (langCloseTimer.current) clearTimeout(langCloseTimer.current)
                setIsLangOpen(true)
              }}
              onMouseLeave={() => {
                langCloseTimer.current = setTimeout(() => setIsLangOpen(false), 150)
              }}
            >
              <button
                type="button"
                onClick={() => setIsLangOpen((v) => !v)}
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-colors',
                  isLangOpen
                    ? 'text-[#2a2118] bg-[#faf6f1]'
                    : 'text-[#2a2118]/75 hover:text-[#2a2118] hover:bg-[#faf6f1]'
                )}
                aria-expanded={isLangOpen}
                aria-haspopup="true"
              >
                {(() => {
                  const Flag = LOCALE_FLAGS[currentLocale]
                  return (
                    <span className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-black/10 bg-white shrink-0">
                      <Flag className="absolute inset-0 w-full h-full object-cover scale-[1.6]" />
                    </span>
                  )
                })()}
                <span>{currentLocale}</span>
                <ChevronDown
                  className={cn(
                    'w-3 h-3 transition-transform duration-300',
                    isLangOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Language dropdown */}
              <div
                className={cn(
                  'absolute right-0 top-full mt-3 w-44 origin-top-right transition-all duration-200',
                  isLangOpen
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                )}
              >
                <div className="relative rounded-2xl bg-white shadow-[0_20px_60px_-10px_rgba(42,33,24,0.3)] border border-[#e8e0d5] p-2 overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4c4b0] to-transparent"
                  />
                  <div className="grid gap-1 pt-1">
                    {locales.map((loc) => {
                      const Flag = LOCALE_FLAGS[loc]
                      const isActive = currentLocale === loc
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            router.replace(pathname as '/', { locale: loc })
                            setIsLangOpen(false)
                          }}
                          className={cn(
                            'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-[#2a2118] text-white'
                              : 'text-[#2a2118] hover:bg-[#faf6f1]'
                          )}
                        >
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

            {/* Phone — refined pill with subtle border + icon capsule */}
            <a
              href="tel:+40741199977"
              className="hidden md:inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-[#e8e0d5] hover:border-[#d4c4b0] bg-white/60 hover:bg-[#faf6f1] transition-colors group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#2a2118] group-hover:bg-[#4a3d30] transition-colors">
                <Phone className="w-3.5 h-3.5 text-white" strokeWidth={2.25} />
              </span>
              <span className="hidden xl:inline text-sm font-semibold text-[#2a2118] tabular-nums tracking-wide">
                0741 199 977
              </span>
            </a>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="group hidden sm:inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 bg-[#2a2118] text-white rounded-full text-sm font-semibold hover:shadow-[0_10px_24px_-8px_rgba(42,33,24,0.4)] transition-shadow duration-300"
            >
              <span>{tHero('ctaPrimary')}</span>
              <span
                aria-hidden="true"
                className="inline-flex items-center overflow-hidden ml-2 max-w-5 opacity-100 translate-x-0 md:ml-0 md:max-w-0 md:opacity-0 md:-translate-x-2 md:group-hover:ml-2 md:group-hover:max-w-5 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.25} />
              </span>
            </button>
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 sm:p-3 rounded-full text-[#2a2118] hover:bg-[#faf6f1] transition-colors"
              aria-label="Deschide meniul"
            >
              <HamburgerIcon className="w-7 h-7 sm:w-8 sm:h-8" open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onBookingOpen={() => setBookingOpen(true)}
      />

      <CallbackPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
