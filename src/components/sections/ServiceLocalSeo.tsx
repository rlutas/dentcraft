import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Link } from '@/i18n/navigation'

// Local SEO content for key service pages (Romanian only for now).
// Prices come from src/data/treatments.ts — update both together.
// Rendered above the FAQ; its FAQs are merged into the page's single FAQ section.

type PriceRow = { label: string; price: string }
type FaqItem = { question: string; answer: string }

type LocalSeoContent = {
  heading: string
  intro: string[]
  priceHeading: string
  priceRows: PriceRow[]
  priceNote: string
  processHeading: string
  processParagraphs: string[]
  faqHeading: string
  faqs: FaqItem[]
}

const content: Record<string, Partial<Record<string, LocalSeoContent>>> = {
  'implanturi-dentare': {
    ro: {
      heading: 'Implant dentar în Satu Mare: prețuri și ce presupune',
      intro: [
        'Un implant dentar costă la DENTCRAFT între 2.200 și 4.000 de lei, în funcție de sistemul ales. Prețul acoperă implantul propriu-zis, adică șurubul de titan care înlocuiește rădăcina dintelui. Coroana care se montează deasupra se calculează separat, iar suma totală o afli la consultație, înainte să începem orice tratament.',
        'Clinica este pe strada Barbu Ștefănescu Delavrancea nr. 3, în Satu Mare. Vin la noi pacienți și din Carei, Negrești-Oaș sau din județele vecine, pentru că planul de tratament și prețul se stabilesc clar de la prima vizită.',
      ],
      priceHeading: 'Cât costă un implant dentar la Satu Mare în 2026',
      priceRows: [
        { label: 'Implant dentar INO', price: 'de la 2.200 lei' },
        { label: 'Implant dentar Megagen', price: 'de la 3.000 lei' },
        { label: 'Implant BREDENT', price: 'de la 3.000 lei' },
        { label: 'Implant Straumann (Elveția)', price: 'de la 4.000 lei' },
        { label: 'Consultație chirurgie / implantologie', price: '200 lei' },
      ],
      priceNote:
        'Prețurile sunt cele din lista oficială a clinicii, valabile în 2026. Diferența dintre sisteme ține de producător, de documentația clinică din spatele lui și de garanție. Care se potrivește în cazul tău se decide la consultație, după ce medicul vede situația osului, nu înainte.',
      processHeading: 'Cum decurge tratamentul la DENTCRAFT',
      processParagraphs: [
        'La prima vizită, medicul evaluează situația și îți spune exact ce investigații sunt necesare pentru cazul tău. Pe baza lor se vede câtă masă osoasă există și unde poate fi poziționat implantul. Primești planul de tratament în scris, cu prețul final.',
        'Intervenția o face Dr. Buterchi Codruț-Ciprian, chirurgul echipei, sub anestezie locală. Durează de regulă sub o oră pentru un implant. Urmează perioada de osteointegrare, între 3 și 6 luni, în care implantul se prinde de os. La final, Dr. Răzvan Petric se ocupă de partea protetică: amprenta se ia cu scanner intraoral Medit i700, fără pasta clasică, iar coroana se montează pe implant.',
        'Se poate plăti și în rate. Detaliile le stabilim la consultație, în funcție de planul de tratament.',
      ],
      faqHeading: 'Întrebări frecvente despre implanturile dentare',
      faqs: [
        {
          question: 'Cât costă un implant dentar complet, cu tot cu coroană?',
          answer:
            'Implantul costă între 2.200 și 4.000 de lei, iar coroana se adaugă separat, în funcție de materialul ales. Suma exactă pentru cazul tău o primești în scris la consultație. Consultația de chirurgie și implantologie costă 200 de lei.',
        },
        {
          question: 'Doare operația de implant dentar?',
          answer:
            'Intervenția se face sub anestezie locală, deci nu se simte durere în timpul ei. După operație, majoritatea pacienților descriu un disconfort de 2-3 zile, care trece cu antiinflamatoare obișnuite.',
        },
        {
          question: 'Cât durează până am dintele finit?',
          answer:
            'De la montarea implantului până la coroana finală trec de regulă 3 până la 6 luni, cât durează osteointegrarea. În unele cazuri se poate monta o lucrare provizorie mai devreme; medicul îți spune la consultație dacă e posibil în situația ta.',
        },
        {
          question: 'Ce sistem de implant este mai bun?',
          answer:
            'Toate sistemele cu care lucrăm (INO, Megagen, BREDENT, Straumann) sunt certificate și au documentație clinică. Straumann este considerat standardul premium și are cel mai lung istoric de studii. Alegerea depinde de situația osului și de buget, iar medicul îți explică diferențele la consultație.',
        },
        {
          question: 'Se poate plăti în rate?',
          answer:
            'Da. Plata în rate se stabilește la consultație, după ce ai planul de tratament cu prețul final. Nu apar costuri suplimentare pe parcurs față de planul semnat.',
        },
      ],
    },
  },
}

export function getServiceLocalSeoContent(slug: string, locale: string): LocalSeoContent | null {
  return content[slug]?.[locale] ?? null
}

const h2Class = 'text-3xl md:text-4xl font-bold text-[#2a2118] leading-[1.12] tracking-tight mb-6 [text-wrap:balance]'
const pClass = 'text-[17px] md:text-lg text-[#4a4038] leading-[1.75] mb-5 last:mb-0'

/**
 * City + price block for key services. Its FAQs are merged into the page's single FAQ section
 * (and its single FAQPage schema) by /servicii/[slug] — see getServiceLocalSeoContent().faqs.
 */
export function ServiceLocalSeo({ slug, locale, tone = 'white' }: { slug: string; locale: string; tone?: 'white' | 'cream' }) {
  const data = getServiceLocalSeoContent(slug, locale)
  if (!data) return null

  return (
    <section className={`py-24 md:py-32 relative overflow-x-clip ${tone === 'cream' ? 'bg-[#faf6f1]' : 'bg-white'}`}>
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="min-w-0 lg:col-span-7 space-y-14 md:space-y-16">
            <ScrollReveal animation="fade-up">
              <h2 className={h2Class}>{data.heading}</h2>
              {data.intro.map((p) => (
                <p key={p.slice(0, 40)} className={pClass}>
                  {p}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2 className={h2Class}>{data.processHeading}</h2>
              {data.processParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className={pClass}>
                  {p}
                </p>
              ))}
            </ScrollReveal>
          </div>

          {/* Price card — sticky beside the prose on desktop */}
          <ScrollReveal animation="fade-up" delay={120} className="min-w-0 lg:col-span-5 lg:sticky lg:top-32">
            <div className="rounded-[2rem] bg-white border border-[#ebe2d6] p-6 md:p-8 shadow-[0_30px_80px_-40px_rgba(139,115,85,0.45)]">
              <h2 className="text-2xl md:text-[1.75rem] font-bold text-[#2a2118] leading-tight tracking-tight mb-6 [text-wrap:balance]">{data.priceHeading}</h2>
              <table className="w-full text-left mb-5">
                <tbody className="divide-y divide-[#efe7dc]">
                  {data.priceRows.map((row) => (
                    <tr key={row.label}>
                      <td className="py-3.5 pr-4 text-[15px] text-[#2a2118]">{row.label}</td>
                      <td className="py-3.5 text-right text-[15px] font-semibold tabular-nums text-[#2a2118] whitespace-nowrap">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-[#5a5048] leading-relaxed mb-4">{data.priceNote}</p>
              <p className="text-sm text-[#5a5048] leading-relaxed">
                Lista completă de tarife, pentru toate tratamentele, este pe pagina de{' '}
                <Link href="/preturi" className="font-semibold text-[#8b7355] underline underline-offset-4">
                  prețuri stomatologie Satu Mare
                </Link>
                . Pentru o programare, folosește pagina de{' '}
                <Link href="/contact" className="font-semibold text-[#8b7355] underline underline-offset-4">
                  contact
                </Link>{' '}
                sau sună la 0741 199 977.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
