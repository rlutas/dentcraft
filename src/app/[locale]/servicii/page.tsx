import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { LocalePageProps } from '@/types'

export default async function ServicesPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ServicesPageContent />
}

function ServicesPageContent() {
  const t = useTranslations()

  return (
    <div className="section-padding container-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1>{t('services.title')}</h1>
          <p className="mt-6 text-lg text-secondary max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services grid - placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries({
            generalDentistry: 'stomatologie-generala',
            cosmeticDentistry: 'estetica-dentara',
            prosthetics: 'protetica',
            implantology: 'implantologie',
            orthodontics: 'ortodontie',
            endodontics: 'endodontie',
            surgery: 'chirurgie-oro-maxilo-faciala',
            pediatricDentistry: 'pedodontie',
            emergencies: 'urgente-dentare',
          }).map(([key, _slug]) => (
            <article key={key} className="card-interactive p-8">
              <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-accent rounded-lg" />
              </div>
              <h2 className="text-h4 font-semibold mb-4">
                {t(`services.categories.${key}`)}
              </h2>
              <p className="text-secondary mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <a
                href={`/servicii/${_slug}`}
                className="font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all text-primary"
              >
                {t('common.learnMore')}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
