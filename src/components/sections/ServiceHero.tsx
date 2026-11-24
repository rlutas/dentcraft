'use client'

import { Fragment, useRef, type PointerEvent } from 'react'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import { ArrowRight, Calculator, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { BookingButton } from '@/components/ui/BookingButton'
import { DEFAULT_ORBIT_ICONS, ORBIT_ICONS } from '@/lib/service-icons'

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
  /** Service slug — picks the small icons orbiting the illustration. */
  slug?: string
}

// 0°, 120°, 240° on the ring
const ORBIT_POS: Array<[string, string]> = [['50%', '0%'], ['93.3%', '75%'], ['6.7%', '75%']]

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
  slug,
}: ServiceHeroProps) {
  const orbitIcons = (slug && ORBIT_ICONS[slug]) || DEFAULT_ORBIT_ICONS
  const t = useTranslations('hero')
  const titleWords = title.split(' ')
  // Desktop-only mouse parallax: writes two CSS vars, no React re-render
  const stageRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    })
  }
  const onPointerLeave = () => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--mx', '0')
    el.style.setProperty('--my', '0')
  }

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

          {/* Illustration — the 3D render melts into the cream background (radial mask, like the 404 tooth).
              Backdrop: breathing warm glow, concentric tan rings (drawn in once, slow counter-rotation),
              small dots orbiting. Float + tilt with a synced contact shadow, gentle mouse parallax on desktop.
              CSS transforms only; static with prefers-reduced-motion. h1/text never animate. */}
          <div
            ref={stageRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="svc-stage relative mx-auto w-full max-w-[640px] lg:max-w-none"
          >
            <style>{`
              .svc-stage { --mx: 0; --my: 0; }
              .svc-par-img { transform: translate3d(calc(var(--mx) * 6px), calc(var(--my) * 6px), 0); transition: transform 1.2s cubic-bezier(0.22,1,0.36,1); }
              .svc-par-rings { transform: translate3d(calc(var(--mx) * -3px), calc(var(--my) * -3px), 0); transition: transform 1.2s cubic-bezier(0.22,1,0.36,1); }
              @keyframes svcIn { from { opacity: .35; transform: translateY(20px) scale(.92) } to { opacity: 1; transform: none } }
              @keyframes svcFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
              @keyframes svcShadow { 0%,100% { transform: scaleX(1); opacity: .9 } 50% { transform: scaleX(.86); opacity: .6 } }
              @keyframes svcBreathe { 0%,100% { transform: scale(.95) } 50% { transform: scale(1.05) } }
              @keyframes svcSpin { to { transform: rotate(360deg) } }
              @keyframes svcDraw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
              @keyframes svcFadeIn { from { opacity: 0 } to { opacity: 1 } }
              @media (prefers-reduced-motion: no-preference) {
                .svc-in { animation: svcIn .9s cubic-bezier(0.16,1,0.3,1) both }
                .svc-float { animation: svcFloat 7s ease-in-out infinite }
                .svc-shadow { animation: svcShadow 7s ease-in-out infinite }
                .svc-glow { animation: svcBreathe 8s ease-in-out infinite }
                .svc-spin { animation: svcSpin 40s linear infinite }
                .svc-spin-rev { animation: svcSpin 55s linear infinite reverse }
                .svc-orbit { animation: svcSpin 40s linear infinite }
                .svc-upright { animation: svcSpin 40s linear infinite reverse }
                .svc-draw { stroke-dasharray: 1; animation: svcDraw 1.6s cubic-bezier(0.65,0,0.35,1) .2s both }
                .svc-dots { animation: svcFadeIn 1s ease-out 1.2s both }
              }
              @media (prefers-reduced-motion: reduce) { .svc-par-img, .svc-par-rings { transform: none !important; transition: none } }
            `}</style>
            <div className="relative aspect-[3/2]">
              {/* warm breathing glow */}
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[min(82%,520px)] aspect-square -translate-x-1/2 -translate-y-1/2">
                <div className="svc-glow h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(230,211,187,0.75),rgba(217,194,163,0.45)_55%,transparent)] blur-3xl" />
              </div>

              {/* rings (parallax layer) */}
              <div aria-hidden="true" className="svc-par-rings absolute inset-0">
                <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 100 100" className="svc-spin h-full w-full overflow-visible">
                    <circle cx="50" cy="50" r="49.5" fill="none" stroke="#b59a7a" strokeOpacity="0.35" strokeWidth="0.3" pathLength={1} className="svc-draw" />
                  </svg>
                </div>
                <div className="absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 100 100" className="svc-spin-rev h-full w-full overflow-visible">
                    <circle cx="50" cy="50" r="49.5" fill="none" stroke="#b59a7a" strokeOpacity="0.28" strokeWidth="0.25" strokeDasharray="0.8 1.6" />
                  </svg>
                </div>
                <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                    <circle cx="50" cy="50" r="49.5" fill="none" stroke="#b59a7a" strokeOpacity="0.2" strokeWidth="0.2" pathLength={1} className="svc-draw" />
                  </svg>
                </div>
              </div>

              {/* orbit layer sits under the illustration: icons pass behind the render */}
              <div aria-hidden="true" className="svc-par-rings absolute inset-0 pointer-events-none">
                {/* small service icons orbiting the middle ring, kept upright by a counter-rotation */}
              <div className="svc-dots absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2">
                <div className="svc-orbit relative h-full w-full">
                  {orbitIcons.map((icon, i) => (
                    <span
                      key={icon}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: ORBIT_POS[i]![0], top: ORBIT_POS[i]![1] }}
                    >
                      <span className="svc-upright flex items-center justify-center [filter:drop-shadow(0_2px_6px_rgba(255,250,244,0.9))_drop-shadow(0_4px_10px_rgba(139,115,85,0.25))]">
                        <span
                          className="block h-9 w-9 md:h-11 md:w-11 bg-[#8b7355]"
                          style={{
                            maskImage: `url(/icons/${icon}.svg)`,
                            WebkitMaskImage: `url(/icons/${icon}.svg)`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                          }}
                        />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              </div>

              {/* illustration (parallax layer) */}
              <div className="svc-par-img absolute inset-0">
                <div className="svc-in absolute inset-0">
                  {/* contact shadow, synced with the float */}
                  <div aria-hidden="true" className="absolute bottom-[9%] left-[27%] h-[7%] w-[46%]">
                    <div className="svc-shadow h-full w-full rounded-[50%] bg-[#5a422a]/25 blur-xl" />
                  </div>
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
