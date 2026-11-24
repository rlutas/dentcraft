import { Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

// Static on purpose: not-found has no params, and resolving the locale here
// would read headers() and break the statically rendered [locale] routes.
export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: true },
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5e8dd]'

const textLink =
  'inline-flex min-h-[44px] items-center px-3 text-[15px] font-medium text-[#2a2118] underline decoration-[#c4ab8d] decoration-1 underline-offset-[6px] transition-colors hover:text-[#7a6248] hover:decoration-[#7a6248] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]'

const helpfulLinks = [
  { href: '/servicii', key: 'linkServices' },
  { href: '/preturi', key: 'linkPrices' },
  { href: '/echipa', key: 'linkTeam' },
] as const

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    // Pulled up under the FramedNav spacer (h-20 / md:h-24) so the 404 fills the viewport and
    // the strip behind the pill is this section, not the spacer. Like the other inner-page
    // heroes (see c28afe1) it starts #faf6f1 along the top edge and settles into #f5e8dd.
    <section className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden bg-[#f5e8dd] bg-[linear-gradient(180deg,#faf6f1_0%,#f5e8dd_11rem)] md:-mt-24">
      {/* Gentle bob for the tooth; off for reduced-motion users */}
      <style>{`
        @keyframes nf-bob { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-10px) rotate(-1.2deg) } }
        .nf-tooth { animation: nf-bob 5.5s ease-in-out infinite; transform-origin: 50% 85%; }
        @media (prefers-reduced-motion: reduce) { .nf-tooth { animation: none; } }
        .nf-four { position: absolute; bottom: 17%; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 400; font-size: 44cqw; line-height: 0.74; color: transparent; -webkit-text-stroke: 2px #a88a68; mix-blend-mode: multiply; pointer-events: none; user-select: none; }
      `}</style>

      <div className="container relative grid w-full items-center gap-4 pb-16 pt-24 md:pt-32 lg:max-w-[1440px] lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-28">
        {/* Visual: the tooth stands in for the zero between two outlined serif 4s */}
        <div className="relative lg:order-2 lg:col-span-7">
          <div className="relative mx-auto aspect-[1400/930] w-full max-w-[680px] [container-type:inline-size] lg:max-w-[900px]">
            <div className="nf-tooth absolute inset-0">
              <Image
                src="/images/404-tooth.webp"
                alt={t('imageAlt')}
                fill
                priority
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
                style={{
                  maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 98%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 98%)',
                }}
              />
            </div>
            <span aria-hidden="true" className="nf-four left-[1%]">4</span>
            <span aria-hidden="true" className="nf-four left-[69%]">4</span>
          </div>
        </div>

        {/* Copy + actions */}
        <div className="relative text-center lg:order-1 lg:col-span-5 lg:text-left">
          <h1 className="text-[2.5rem] font-bold leading-[0.95] tracking-normal text-[#2a2118] md:text-6xl lg:text-[clamp(3rem,3.9vw,4.25rem)]">
            <span className="block">{t('titleBold')}</span>{' '}
            <span className="mt-1 block pb-1 font-serif italic font-medium tracking-wide text-[#7a6248]">
              {t('titleItalic')}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[34rem] text-lg leading-relaxed text-[#5c4d3c] lg:mx-0">
            {t('description')}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/"
              className={`inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-full bg-[#1a1a1a] px-7 py-4 text-base font-semibold text-white transition-shadow duration-300 hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.45)] sm:w-auto ${focusRing}`}
            >
              {t('backHome')}
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-full border border-[#2a2118]/25 bg-white/60 px-7 py-4 text-base font-semibold text-[#2a2118] transition-colors duration-200 hover:border-[#2a2118] hover:bg-white sm:w-auto ${focusRing}`}
            >
              {t('book')}
            </Link>
          </div>

          <nav aria-label={t('linksLabel')} className="mt-10 border-t border-[#e3d5c4] pt-6">
            <p className="text-sm text-[#6b5a47]">{t('linksLabel')}</p>
            <ul className="mt-1 flex flex-wrap justify-center lg:-ml-3 lg:justify-start">
              {helpfulLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={textLink}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: 'urgente-dentare' } }}
                  className={textLink}
                >
                  {t('linkEmergency')}
                </Link>
              </li>
            </ul>
          </nav>

          <a
            href="tel:+40741199977"
            className={`mt-5 inline-flex min-h-[56px] items-center gap-3 rounded-2xl border border-[#e3d5c4] bg-white/70 py-2 pl-2 pr-5 text-left transition-colors hover:border-[#c4ab8d] hover:bg-white ${focusRing}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2a2118] text-white">
              <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm text-[#6b5a47]">{t('painQuestion')}</span>
              <span className="text-base font-semibold text-[#2a2118]">{t('painCall')}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
