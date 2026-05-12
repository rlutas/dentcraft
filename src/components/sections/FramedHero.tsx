'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

/**
 * Hero "stage" — the warm framed image + headline overlay.
 * The pill nav is rendered globally by `<FramedNav />` (in layout), so this
 * component only owns the actual hero stage.
 */
export function FramedHero() {
  const tHero = useTranslations('hero')

  return (
    <section className="relative overflow-hidden min-h-[100svh]">
      <div className="relative w-full h-full min-h-[100svh]">
        {/* Responsive hero image — portrait on mobile, landscape on desktop. */}
        <picture className="absolute inset-0 block">
          <source media="(min-width: 768px)" srcSet="/images/hero/hero-patient-landscape.webp" />
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
          className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-[#2a2118]/55 to-[#2a2118]/15 from-0% via-25% to-65% md:from-0% md:via-22% md:to-55%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent"
        />

        {/* Content overlay — single stack on left, all hierarchy in one column */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:px-6 sm:pb-8 md:px-12 md:pb-16 lg:px-16 lg:pb-24">
          <div className="max-w-3xl">
            {/* Trust chip with patient avatars + rating */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-1.5 sm:gap-3 mb-3 sm:mb-5 md:mb-8 rounded-full bg-white/15 backdrop-blur-2xl border border-white/30 px-2 sm:px-3 py-1 sm:py-2 pr-2.5 sm:pr-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_32px_-8px_rgba(0,0,0,0.3)]"
            >
              <div className="flex -space-x-1.5 sm:-space-x-2">
                <Image src="/images/patient-1.png" alt="" width={32} height={32} className="w-5 h-5 md:w-8 md:h-8 rounded-full ring-2 ring-white object-cover" />
                <Image src="/images/patient-2.png" alt="" width={32} height={32} className="w-5 h-5 md:w-8 md:h-8 rounded-full ring-2 ring-white object-cover" />
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#d4c4b0] to-[#8b7355] ring-2 ring-white flex items-center justify-center text-[8px] md:text-xs font-bold text-white">+</div>
              </div>
              <div className="leading-tight">
                <div className="text-[11px] sm:text-sm md:text-base font-bold">2000+</div>
                <div className="text-[8px] sm:text-[10px] md:text-xs text-white/80 uppercase tracking-wider">{tHero('trustLabel')}</div>
              </div>
              <div className="h-4 sm:h-6 w-px bg-white/25 mx-0.5 sm:mx-1" />
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Star className="w-2.5 h-2.5 md:w-4 md:h-4 fill-[#d4c4b0] text-[#d4c4b0]" />
                <span className="text-[11px] sm:text-sm md:text-base font-bold">4.9</span>
              </div>
            </motion.div>

            {/* Headline — kicker (SEO) + bold word stagger + italic serif accent */}
            <h1 className="font-bold text-white leading-[0.95] tracking-tight text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
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
                      visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 22 } },
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
                aria-label={tHero('titleItalic')}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.55 } },
                }}
              >
                {Array.from(tHero('titleItalic')).map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    aria-hidden="true"
                    variants={{
                      hidden: { x: -24, opacity: 0 },
                      visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 140, damping: 20 } },
                    }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="text-white/90 text-base sm:text-lg md:text-xl mt-4 sm:mt-5 md:mt-6 max-w-xl leading-relaxed"
            >
              {tHero('subtitle')}
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-6 sm:mt-8 md:mt-10"
            >
              <a
                href="#contact"
                className="group inline-flex items-center px-7 py-3.5 md:px-9 md:py-4 bg-white text-[#2a2118] rounded-full text-base md:text-lg font-bold hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.5)] transition-shadow duration-300"
              >
                <span>{tHero('ctaPrimary')}</span>
                <span aria-hidden="true" className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — vertical line with travelling drop + chevron bounce */}
        <motion.button
          type="button"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}
          aria-label="Derulează în jos"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full p-2 -m-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 group-hover:text-white transition-colors">
            Scroll
          </span>
          <span className="relative flex flex-col items-center">
            <span className="relative w-[1.5px] h-10 overflow-hidden rounded-full bg-white/15">
              <motion.span
                aria-hidden="true"
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/0 via-white/80 to-white/0"
              />
            </span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1 text-white/70 group-hover:text-white transition-colors"
            >
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            </motion.span>
          </span>
        </motion.button>
      </div>
    </section>
  )
}
