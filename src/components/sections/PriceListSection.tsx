import { getTranslations } from 'next-intl/server'
import { treatmentCategories, type Locale } from '@/data/treatments'
import { Link } from '@/i18n/navigation'

/**
 * Server-rendered, crawlable price list for /preturi.
 *
 * The interactive PriceCalculatorV2 is great for conversion but its prices live
 * in client JS, so search engines can't read them. This section renders the full
 * catalog (categories + treatments + prices) as static HTML plus a price FAQ with
 * FAQPage schema, so the page can rank for price-intent queries
 * ("stomatologie satu mare preturi", "[serviciu] satu mare pret").
 */

function formatPrice(
  price: number,
  priceType: 'fixed' | 'from',
  fromLabel: string,
  currency: string
): string {
  const formatted = new Intl.NumberFormat('ro-RO').format(price)
  return priceType === 'from'
    ? `${fromLabel} ${formatted} ${currency}`
    : `${formatted} ${currency}`
}

export async function PriceListSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'prices' })
  const fromLabel = t('fromLabel')
  const currency = t('currency')
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] tracking-tight">
            {t('listTitle')}
          </h2>
          <p className="text-lg text-[#5a5048] leading-relaxed mt-4">
            {t('listIntro')}
          </p>

          <div className="mt-12 space-y-12">
            {treatmentCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-xl md:text-2xl font-bold text-[#8b7355] mb-4">
                  {category.labels[locale]}
                </h3>
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-[#e8e0d5]">
                      <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-wide text-[#6b6b6b]">
                        {t('colTreatment')}
                      </th>
                      <th className="py-3 pl-4 text-right text-sm font-semibold uppercase tracking-wide text-[#6b6b6b] whitespace-nowrap">
                        {t('colPrice')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.treatments.map((treatment) => (
                      <tr
                        key={treatment.id}
                        className="border-b border-[#e8e0d5]/70"
                      >
                        <td className="py-3 pr-4 text-[#2a2118]">
                          {treatment.labels[locale]}
                        </td>
                        <td className="py-3 pl-4 text-right font-semibold text-[#2a2118] whitespace-nowrap">
                          {formatPrice(
                            treatment.price,
                            treatment.priceType,
                            fromLabel,
                            currency
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#6b6b6b] mt-8">{t('disclaimer')}</p>

          {/* Price FAQ — crawlable + FAQPage schema */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2118] tracking-tight">
              {t('faqTitle')}
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-[#e8e0d5] bg-white px-6 py-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-[#2a2118] marker:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-[#5a5048] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Internal links to service pages — price-intent anchors (RO only) */}
          {locale === 'ro' && (
            <div className="mt-16 rounded-2xl border border-[#e8e0d5] bg-white px-6 py-6">
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
