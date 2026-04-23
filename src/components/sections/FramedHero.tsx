'use client'

import Image from 'next/image'
import { Menu, Phone, Star } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const navItems = [
  { href: '/servicii', key: 'services' },
  { href: '/echipa', key: 'team' },
  { href: '/preturi', key: 'prices' },
  { href: '/galerie', key: 'gallery' },
  { href: '/contact', key: 'contact' },
] as const

type MobileMenuOpenProps = { open: boolean; onClose: () => void }

function MobileDrawer({ open, onClose }: MobileMenuOpenProps) {
  const t = useTranslations('navigation')
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <nav className="absolute top-4 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-[#2a2118] font-medium hover:bg-[#faf6f1] transition-colors"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function FramedHero() {
  const t = useTranslations('navigation')
  const tHero = useTranslations('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <section className="relative overflow-hidden min-h-[88svh] md:min-h-[92vh]">
      <div className="relative w-full h-full min-h-[88svh] md:min-h-[92vh]">
        {/* Responsive hero image — portrait on mobile, landscape on desktop */}
        <picture>
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
            className="object-cover object-center"
          />
        </picture>

        {/* Gradient overlays — strong at bottom for text readability, subtle at top for navbar */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/70 via-[#2a2118]/10 to-[#2a2118]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent"
        />

        {/* Floating pill navbar */}
        <nav className="absolute top-3 left-3 right-3 md:top-6 md:left-8 md:right-8 lg:left-12 lg:right-12 z-30">
          <div className="flex items-center justify-between gap-4 bg-white/95 backdrop-blur-md rounded-full pl-5 pr-3 py-2.5 md:pl-8 md:pr-4 md:py-3 shadow-[0_10px_40px_-10px_rgba(42,33,24,0.35)] border border-white/60">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <Image
                src="/branding/LOGO_BLACK_FINAL.png"
                alt="DentCraft"
                width={420}
                height={59}
                priority
                className="h-5 md:h-6 w-auto transition-opacity group-hover:opacity-80"
              />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1 text-sm">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-full text-[#2a2118]/70 font-medium hover:text-[#2a2118] hover:bg-[#faf6f1] transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: phone (desktop) + CTA pill */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:+40741199977"
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#2a2118]/70 hover:text-[#2a2118] transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={2} />
                <span className="hidden lg:inline">0741 199 977</span>
              </a>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 bg-[#2a2118] text-white rounded-full text-sm font-semibold hover:bg-[#4a3d30] transition-colors"
              >
                {tHero('ctaPrimary')}
              </Link>
              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-full text-[#2a2118] hover:bg-[#faf6f1] transition-colors"
                aria-label="Deschide meniul"
              >
                <Menu className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </nav>

        <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

        {/* Content overlay — bottom of hero */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-14 lg:px-16 lg:pb-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            {/* LEFT: social proof + headline */}
            <div className="text-white">
              {/* Social proof chip */}
              <div className="inline-flex items-center gap-3 mb-6 md:mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 pr-4">
                <div className="flex -space-x-2">
                  <Image
                    src="/images/patient-1.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full ring-2 ring-white object-cover"
                  />
                  <Image
                    src="/images/patient-2.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full ring-2 ring-white object-cover"
                  />
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#d4c4b0] to-[#8b7355] ring-2 ring-white flex items-center justify-center text-[10px] md:text-xs font-bold text-white">
                    +
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="text-sm md:text-base font-bold">2000+</div>
                  <div className="text-[10px] md:text-xs text-white/80 uppercase tracking-wider">
                    {tHero('trustLabel')}
                  </div>
                </div>
                <div className="h-6 w-px bg-white/25 mx-1" />
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#d4c4b0] text-[#d4c4b0]" />
                  <span className="text-sm md:text-base font-bold">4.9</span>
                </div>
              </div>

              {/* Headline with mixed typography */}
              <h1 className="font-bold text-white leading-[0.95] tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {tHero('titleBold')}
                <br />
                <span className="font-serif italic font-medium text-[#d4c4b0]">
                  {tHero('titleItalic')}
                </span>
              </h1>
            </div>

            {/* RIGHT: description + CTAs */}
            <div className="md:text-right md:pb-2">
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 max-w-md md:ml-auto">
                {tHero('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#2a2118] text-white rounded-full font-semibold hover:bg-[#4a3d30] transition-colors shadow-lg"
                >
                  {tHero('ctaPrimary')}
                </Link>
                <Link
                  href="/servicii"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white/95 backdrop-blur-sm text-[#2a2118] rounded-full font-semibold hover:bg-white transition-colors shadow-lg"
                >
                  {tHero('ctaSecondary')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
