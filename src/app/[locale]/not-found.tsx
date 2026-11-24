import { ArrowRight, ArrowUpRight, Phone, Siren, Stethoscope, Tag, Users, type LucideIcon } from 'lucide-react'
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

// Quick links: small cream pills with a tan icon chip, lifting on hover
const pillLink = `group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#e3d5c4] bg-white/60 py-1.5 pl-1.5 pr-3.5 text-[14px] font-medium text-[#2a2118] backdrop-blur-sm transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#c4ab8d] hover:bg-white hover:shadow-[0_10px_24px_-14px_rgba(42,33,24,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`

const pillIcon =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5e8dd] text-[#8b7355] transition-colors duration-300 group-hover:bg-[#8b7355] group-hover:text-white'

const helpfulLinks: ReadonlyArray<{ href: '/servicii' | '/preturi' | '/echipa'; key: 'linkServices' | 'linkPrices' | 'linkTeam'; icon: LucideIcon }> = [
  { href: '/servicii', key: 'linkServices', icon: Stethoscope },
  { href: '/preturi', key: 'linkPrices', icon: Tag },
  { href: '/echipa', key: 'linkTeam', icon: Users },
]

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    // Pulled up under the FramedNav spacer (h-20 / md:h-24) so the 404 fills the viewport and
    // the strip behind the pill is this section, not the spacer. Like the other inner-page
    // heroes (see c28afe1) it starts #faf6f1 along the top edge and settles into #f5e8dd.
    <section className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden bg-[#f5e8dd] bg-[linear-gradient(180deg,#faf6f1_0%,#f5e8dd_11rem,#f1e1d3_100%)] md:-mt-24">
      {/* Gentle bob for the tooth; off for reduced-motion users */}
      <style>{`
        @keyframes nf-bob { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-10px) rotate(-1.2deg) } }
        @keyframes nf-shadow { 0%,100% { transform: scaleX(1); opacity: .55 } 50% { transform: scaleX(.88); opacity: .38 } }
        .nf-tooth { animation: nf-bob 5.5s ease-in-out infinite; transform-origin: 50% 85%; }
        .nf-shadow { animation: nf-shadow 5.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .nf-tooth, .nf-shadow { animation: none; } }
        .nf-four { position: absolute; bottom: 17%; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 400; font-size: 44cqw; line-height: 0.74; color: transparent; -webkit-text-stroke: 1.75px #a88a68; mix-blend-mode: multiply; pointer-events: none; user-select: none; }
        @media (min-width: 1024px) { .nf-four { -webkit-text-stroke-width: 2.25px; } }
      `}</style>

      {/* Ambient warmth: a soft light pool behind the visual and a faint tan wash bottom-left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[8%] h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,250,244,0.95),rgba(255,247,238,0.5)_45%,transparent)] lg:left-auto lg:right-[-6%] lg:top-1/2 lg:h-[62rem] lg:w-[62rem] lg:-translate-y-1/2 lg:translate-x-0" />
        <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(139,115,85,0.12),transparent)]" />
      </div>

      <div className="container relative grid w-full items-center gap-6 pb-16 pt-24 md:pt-32 lg:max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 lg:pb-16 lg:pt-28">
        {/* Visual: the tooth stands in for the zero between two outlined serif 4s */}
        <div className="relative lg:order-2 lg:-mr-[8%]">
          <div className="relative mx-auto aspect-[1400/930] w-full max-w-[680px] [container-type:inline-size] lg:max-w-[900px]">
            {/* Thin tan halo framing the tooth */}
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-[54%] rounded-full border border-[#c4ab8d]/40" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-[54%] rounded-full border border-dashed border-[#c4ab8d]/25" />
            {/* Contact shadow under the tooth, breathing with the bob */}
            <div aria-hidden="true" className="nf-shadow absolute bottom-[13%] left-1/2 h-[5%] w-[34%] -ml-[17%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(90,66,42,0.28),transparent)]" />
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
        <div className="relative text-center lg:order-1 lg:text-left">
          <p aria-hidden="true" className="mb-4 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#8b7355]">
            <span className="h-px w-8 bg-[#c4ab8d]" />
            404
            <span className="h-px w-8 bg-[#c4ab8d] lg:hidden" />
          </p>

          <h1 className="text-[2.5rem] font-bold leading-[0.95] tracking-[-0.02em] text-[#2a2118] md:text-6xl lg:text-[clamp(3rem,4vw,4rem)]">
            <span className="block">{t('titleBold')}</span>{' '}
            <span className="mt-1 block pb-1 font-serif italic font-medium tracking-wide text-[#7a6248]">
              {t('titleItalic')}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[32rem] text-lg leading-relaxed text-[#5c4d3c] lg:mx-0">
            {t('description')}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/"
              className={`group inline-flex min-h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1a1a1a] px-6 py-4 text-base font-semibold text-white transition-shadow duration-300 hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.45)] sm:w-auto ${focusRing}`}
            >
              {t('backHome')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-full border border-[#2a2118]/25 bg-white/60 px-6 py-4 text-base font-semibold text-[#2a2118] transition-colors duration-200 hover:border-[#2a2118] hover:bg-white sm:w-auto ${focusRing}`}
            >
              {t('book')}
            </Link>
          </div>

          <nav aria-label={t('linksLabel')} className="mt-9">
            <p className="flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8b7355] lg:justify-start">
              {t('linksLabel')}
              <span aria-hidden="true" className="hidden h-px flex-1 bg-[#e3d5c4] lg:block" />
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {helpfulLinks.map(({ href, key, icon: Icon }) => (
                <li key={key}>
                  <Link href={href} className={pillLink}>
                    <span className={pillIcon}>
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: 'urgente-dentare' } }}
                  className={pillLink}
                >
                  <span className={pillIcon}>
                    <Siren className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  {t('linkEmergency')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Urgent call card: dark ink, tan icon with a soft ping, arrow nudges on hover */}
          <a
            href="tel:+40741199977"
            className={`group mt-7 flex w-full max-w-[26rem] items-center gap-4 rounded-[1.25rem] bg-[#2a2118] p-3 pr-5 text-left shadow-[0_18px_40px_-20px_rgba(42,33,24,0.7)] ring-1 ring-white/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(42,33,24,0.8)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 mx-auto lg:mx-0 ${focusRing}`}
          >
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8b7355] text-white">
              <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[#8b7355] opacity-30 motion-safe:animate-ping [animation-duration:2.6s]" />
              <Phone className="relative h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="text-[13px] text-[#d4c4b0]">{t('painQuestion')}</span>
              <span className="mt-0.5 text-[17px] font-semibold tracking-wide text-white">{t('painCall')}</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-[#c4ab8d] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
