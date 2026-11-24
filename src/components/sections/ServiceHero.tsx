'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import { ArrowRight, Calculator, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { BookingButton } from '@/components/ui/BookingButton'

interface BreadcrumbItem {
  label: string
  href?: '/' | '/servicii'
}

export interface ServiceHeroProps {
  breadcrumbs: BreadcrumbItem[]
  title: string
  italicAccent: string
  subtitle?: string | null
  badgeLabel: string
  badgeIcon?: LucideIcon | null
  badgeIconPath?: string | null
  priceMinLabel?: string | null
  ctaPrimary: string
  photoSrc: string | null
  photoAlt: string
  fallbackIcon?: LucideIcon | null
  fallbackIconPath?: string | null
}

export function ServiceHero({
  breadcrumbs,
  title,
  italicAccent,
  subtitle,
  badgeLabel,
  badgeIcon: BadgeIcon,
  badgeIconPath,
  priceMinLabel: _priceMinLabel,
  ctaPrimary,
  photoSrc,
  photoAlt,
  fallbackIcon: FallbackIcon,
  fallbackIconPath,
}: ServiceHeroProps) {
  const t = useTranslations('hero')
  const titleWords = title.split(' ')

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6f1] to-[#f5f0e8] min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-6rem)] flex flex-col justify-center pt-10 pb-20 md:pt-6 md:pb-24">
      <div className="absolute top-28 right-0 w-96 h-96 bg-[#d4c4b0]/12 rounded-full blur-3xl translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="relative z-10 w-full mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5 md:mb-8 text-sm"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              {idx > 0 && <span className="text-[#8b7355]/40">/</span>}
              {item.href ? (
                <Link href={item.href} className="text-[#8b7355]/70 hover:text-[#2a2118] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#2a2118] font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-24 items-center">
          <div>
            {/* Headline — same "Bold / serif italic" voice as the homepage hero, but static:
                the h1 is the LCP text on mobile, so it renders visible from the server.
                Mobile size tuned so the longest RO title (Pedodonție…) stays at 2+1 lines. */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-4 md:mb-6"
            >
              {badgeIconPath ? (
                <Image alt="" className="w-5 h-5 opacity-80" height={20} src={badgeIconPath} width={20} />
              ) : BadgeIcon ? (
                <BadgeIcon aria-hidden="true" className="w-4 h-4 text-[#8b7355]" strokeWidth={1.75} />
              ) : null}
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[#8b7355]">{badgeLabel}</span>
            </motion.div>

            <h1 className="font-bold text-[#2a2118] leading-[1.02] tracking-tight text-[clamp(1.75rem,7.7vw,2.25rem)] sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              <span className="block [text-wrap:balance]">
                {titleWords.map((word, i) => (
                  <Fragment key={i}>
                    {i > 0 && ' '}
                    <span className="whitespace-nowrap">{word}</span>
                  </Fragment>
                ))}
              </span>{' '}
              <span className="font-serif italic font-medium text-[#8b7355] block mt-1 pb-1 tracking-wide">
                {italicAccent}
              </span>
            </h1>

            {subtitle && (
              <motion.p
                initial={false} // LCP element: render visible from the server
                className="text-lg md:text-xl text-[#5a5048] mt-5 mb-8 leading-relaxed max-w-2xl"
              >
                {subtitle}
              </motion.p>
            )}


            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8"
            >
              <BookingButton
                variant="custom"
                icon={<ArrowRight className="w-5 h-5" strokeWidth={2.25} />}
                className="group inline-flex items-center px-7 py-3.5 md:px-9 md:py-4 bg-[#1a1a1a] text-white rounded-full text-base md:text-lg font-bold hover:shadow-[0_20px_60px_-15px_rgba(42,33,24,0.5)] transition-shadow duration-300"
              >
                {ctaPrimary}
              </BookingButton>
              <Link
                href={{ pathname: '/preturi', hash: 'calculator' }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#e8e0d5] text-[#2a2118] font-semibold hover:border-[#d4c4b0] hover:shadow-[0_10px_40px_-10px_rgba(139,115,85,0.18)] transition-all duration-300"
              >
                <Calculator className="w-5 h-5 text-[#8b7355]" strokeWidth={1.75} />
                {t('ctaSecondary')}
                <ArrowRight aria-hidden="true" className="w-4 h-4 text-[#8b7355] transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
              </Link>
            </motion.div>

          </div>

          {/* Illustration — the 3D render melts into the cream background (radial mask, same approach as the 404 tooth),
              warm glow + thin tan halo behind it, slow float. CSS-only motion, static with reduced motion.
              The priority image is never hidden (no opacity on it) so LCP is unaffected. */}
          <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            <style>{`
              @keyframes svcFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
              @keyframes svcIn { from { transform: scale(0.96) } to { transform: scale(1) } }
              @keyframes svcBreathe { 0%,100% { transform: scale(1); opacity: .5 } 50% { transform: scale(1.06); opacity: .62 } }
              @keyframes svcSpin { to { transform: rotate(360deg) } }
              @keyframes svcShadow { 0%,100% { transform: scaleX(1); opacity: 1 } 50% { transform: scaleX(.9); opacity: .7 } }
              @media (prefers-reduced-motion: no-preference) {
                .svc-in { animation: svcIn 1.1s cubic-bezier(0.16,1,0.3,1) both }
                .svc-float { animation: svcFloat 7s ease-in-out infinite }
                .svc-glow { animation: svcBreathe 9s ease-in-out infinite }
                .svc-ring { animation: svcSpin 36s linear infinite }
                .svc-ring-rev { animation: svcSpin 48s linear infinite reverse }
                .svc-shadow { animation: svcShadow 7s ease-in-out infinite }
              }
            `}</style>
            <div className="relative aspect-[3/2]">
              {/* warm glow */}
              <div aria-hidden="true" className="svc-glow absolute left-[12%] top-[8%] h-[84%] w-[76%] rounded-full bg-[#e8dccb] opacity-50 blur-3xl" />
              {/* thin tan halo — solid + dashed ring, slowly turning */}
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2">
                <div className="svc-ring h-full w-full rounded-full border border-[#c4ab8d]/35" />
              </div>
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2">
                <div className="svc-ring-rev h-full w-full rounded-full border border-dashed border-[#c4ab8d]/25" />
              </div>
              {/* contact shadow */}
              <div aria-hidden="true" className="svc-shadow absolute bottom-[12%] left-[30%] h-[6%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(90,66,42,0.22),transparent)]" />
              <div className="svc-in absolute inset-0">
                <div className="svc-float absolute inset-0">
                  {photoSrc ? (
                    <Image
                      src={photoSrc}
                      alt={photoAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      style={{
                        maskImage: 'radial-gradient(closest-side, #000 62%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(closest-side, #000 62%, transparent 100%)',
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {fallbackIconPath ? (
                        <Image alt="" className="w-32 h-32 opacity-30" height={128} src={fallbackIconPath} width={128} />
                      ) : FallbackIcon ? (
                        <FallbackIcon className="w-32 h-32 text-[#8b7355]/30" strokeWidth={1} />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — mirror of FramedHero (vertical drop line + chevron bounce) */}
      <motion.button
        type="button"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }}
        aria-label={t('scrollLabel')}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]/40 rounded-full p-2 -m-2"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b7355]/70 group-hover:text-[#2a2118] transition-colors">
          Scroll
        </span>
        <span className="relative flex flex-col items-center">
          <span className="relative w-[1.5px] h-10 overflow-hidden rounded-full bg-[#8b7355]/20">
            <motion.span
              aria-hidden="true"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#8b7355]/0 via-[#2a2118]/80 to-[#8b7355]/0"
            />
          </span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-1 text-[#8b7355]/70 group-hover:text-[#2a2118] transition-colors"
          >
            <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
          </motion.span>
        </span>
      </motion.button>
    </section>
    </MotionConfig>
  )
}
