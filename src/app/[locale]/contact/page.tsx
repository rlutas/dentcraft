import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { LocalePageProps } from '@/types'

export default async function ContactPage({ params }: LocalePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ContactPageContent />
}

function ContactPageContent() {
  const t = useTranslations()

  return (
    <div className="section-padding container-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1>{t('contact.title')}</h1>
          <p className="mt-6 text-lg text-secondary max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-base p-8">
              <h2 className="text-h4 font-semibold mb-6">
                {t('contact.info.address')}
              </h2>
              <div className="space-y-4 text-secondary">
                <p>Str. Barbu Stefanescu Delavrancea nr.3</p>
                <p>Satu Mare, Romania</p>
              </div>
            </div>

            <div className="card-base p-8">
              <h2 className="text-h4 font-semibold mb-6">
                {t('contact.info.phone')}
              </h2>
              <a
                href="tel:+40741199977"
                className="text-lg text-primary hover:underline"
              >
                +40 741 199 977
              </a>
            </div>

            <div className="card-base p-8">
              <h2 className="text-h4 font-semibold mb-6">
                {t('contact.info.schedule')}
              </h2>
              <div className="space-y-2 text-secondary">
                <p>
                  <span className="font-medium text-foreground">
                    {t('contact.info.weekdays')}:
                  </span>{' '}
                  10:00 - 18:00
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    {t('contact.info.weekend')}:
                  </span>{' '}
                  {t('contact.info.closed')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-base p-8">
            <h2 className="text-h4 font-semibold mb-6">
              {t('contact.form.submit')}
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-base"
                  placeholder={t('contact.form.name')}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-base"
                  placeholder={t('contact.form.email')}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact.form.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="input-base"
                  placeholder={t('contact.form.phone')}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact.form.subject')}
                </label>
                <select id="subject" name="subject" className="input-base">
                  <option value="appointment">
                    {t('contact.form.subjects.appointment')}
                  </option>
                  <option value="information">
                    {t('contact.form.subjects.information')}
                  </option>
                  <option value="emergency">
                    {t('contact.form.subjects.emergency')}
                  </option>
                  <option value="other">
                    {t('contact.form.subjects.other')}
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="input-base resize-none"
                  placeholder={t('contact.form.message')}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="gdpr"
                  required
                  className="mt-1 h-4 w-4 rounded border-accent text-primary focus:ring-primary"
                />
                <label htmlFor="gdpr" className="text-sm text-secondary">
                  {t('contact.form.gdprConsent')}
                </label>
              </div>

              <button type="submit" className="btn-primary w-full">
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <div className="w-full h-96 bg-muted rounded-2xl flex items-center justify-center">
            <p className="text-secondary">Google Maps will be embedded here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
