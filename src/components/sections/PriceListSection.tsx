import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/data/treatments'
import { getPublicCategories } from '@/data/price-list'
import { ChevronDown } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { PriceListTabs, type PriceListTab } from './PriceListTabs'

/**
 * Server-rendered, crawlable price list for /preturi.
 *
 * The interactive PriceCalculatorV2 is great for conversion but its prices live
 * in client JS, so search engines can't read them. This section renders the full
 * catalog (categories + treatments + prices) as static HTML plus a price FAQ with
 * FAQPage schema, so the page can rank for price-intent queries
 * ("stomatologie satu mare preturi", "[serviciu] satu mare pret").
 */

export async function PriceListSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'prices' })
  const fromLabel = t('fromLabel')
  const currency = t('currency')
  const tabs: PriceListTab[] = getPublicCategories().map((category) => ({
    id: category.id,
    label: category.labels[locale],
    rows: category.treatments.map((treatment) => ({
      id: treatment.id,
      label: treatment.labels[locale],
      price: `${new Intl.NumberFormat('ro-RO').format(treatment.price)} ${currency}`,
      from: treatment.priceType === 'from',
    })),
  }))
  const faqs = t.raw('faq') as { q: string; a: string }[]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="section bg-[#faf6f1]" id="lista-preturi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e8e0d5] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4c4b0]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b7355]">
                {t('listKicker')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] tracking-tight text-balance">
              {t('listTitle')}
            </h2>
            <p className="max-w-3xl text-base md:text-lg text-[#5a5048] leading-relaxed mt-4">
              {t('listIntro')}
            </p>
          </div>

          <div className="mt-10">
            <PriceListTabs
              tabs={tabs}
              fromLabel={fromLabel}
              countSuffix={t('listCountSuffix')}
              footnote={t('listFootnote')}
            />
          </div>

          {/* Price FAQ — crawlable + FAQPage schema */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] tracking-tight">
              {t('faqTitle')}
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-[#e8e0d5] bg-white transition-colors duration-200 open:border-[#d4c4b0]"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-[#2a2118] [&::-webkit-details-marker]:hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7355]">
                    {faq.q}
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 text-[#8b7355] transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-6 pb-5 -mt-1 text-[#5a5048] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Internal links to service pages — price-intent anchors (RO only) */}
          {locale === 'ro' && (
            <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-[#e8e0d5] bg-white px-6 py-6 md:px-8 md:py-7">
              <h2 className="text-xl font-bold text-[#2a2118]">
                Vrei detalii despre un tratament anume?
              </h2>
              <p className="mt-3 text-[#5a5048] leading-relaxed">
                Pentru{' '}
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: 'implanturi-dentare' } }}
                  className="font-semibold text-[#8b7355] underline underline-offset-4"
                >
                  implanturi dentare în Satu Mare
                </Link>{' '}
                am pus pe pagina serviciului prețurile pe fiecare sistem, pașii tratamentului și
                întrebările pe care ni le pun cel mai des pacienții. Găsești pagini dedicate și pentru{' '}
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: 'ortodontie' } }}
                  className="font-semibold text-[#8b7355] underline underline-offset-4"
                >
                  aparate dentare
                </Link>
                ,{' '}
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: 'fatete-dentare' } }}
                  className="font-semibold text-[#8b7355] underline underline-offset-4"
                >
                  fațete dentare
                </Link>{' '}
                și{' '}
                <Link
                  href={{ pathname: '/servicii/[slug]', params: { slug: 'pedodontie' } }}
                  className="font-semibold text-[#8b7355] underline underline-offset-4"
                >
                  stomatologie pentru copii
                </Link>
                . Dacă nu știi de unde să începi, programează o consultație prin pagina de{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-[#8b7355] underline underline-offset-4"
                >
                  contact
                </Link>{' '}
                sau sună la 0741 199 977.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
