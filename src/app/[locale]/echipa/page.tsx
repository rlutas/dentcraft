import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { LocalePageProps } from '@/types'

export default async function TeamPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <TeamPageContent />
}

function TeamPageContent() {
  const t = useTranslations()

  return (
    <div className="section-padding container-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1>{t('team.title')}</h1>
          <p className="mt-6 text-lg text-secondary max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        {/* Team grid - placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((member) => (
            <article key={member} className="card-interactive p-8 text-center">
              <div className="w-40 h-40 bg-accent rounded-full mx-auto mb-6" />
              <h2 className="text-h4 font-semibold">Dr. Nume Doctor</h2>
              <p className="text-secondary mt-2">Specializare</p>
              <p className="text-body-sm text-secondary mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <a
                href={`/echipa/doctor-${member}`}
                className="mt-6 inline-block font-semibold text-primary hover:underline"
              >
                {t('team.viewProfile')}
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
