import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  Stethoscope,
  Sparkles,
  Settings,
  Smile,
  Baby,
  AlertTriangle,
  Microscope,
  Users,
  Heart,
  Wallet,
  Phone,
  Star,
} from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomePageContent />
}

function HomePageContent() {
  const t = useTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('hero.badge')}
            </span>

            <h1 className="text-display mb-6">
              {t('hero.title')}
            </h1>

            <p className="text-body-lg text-muted max-w-xl mx-auto mb-10">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary btn-lg">
                {t('hero.cta.primary')}
              </Link>
              <Link href="/servicii" className="btn btn-secondary btn-lg">
                {t('hero.cta.secondary')}
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-[var(--color-border-light)]">
          <div className="container py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '15+', label: t('common.yearsExperience') },
                { value: '5000+', label: t('common.happyPatients') },
                { value: '4.9', label: t('common.googleRating') },
                { value: '100%', label: t('common.guarantee') },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-body-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2>{t('services.title')}</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'generalDentistry', Icon: Stethoscope },
              { key: 'cosmeticDentistry', Icon: Sparkles },
              { key: 'implantology', Icon: Settings },
              { key: 'orthodontics', Icon: Smile },
              { key: 'pediatric', Icon: Baby },
              { key: 'emergencies', Icon: AlertTriangle },
            ].map((service) => (
              <Link key={service.key} href="/servicii" className="card group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mb-5 text-[var(--color-primary)]">
                  <service.Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3">{t(`services.categories.${service.key}`)}</h3>
                <p className="text-body-sm text-muted mb-5">
                  {t(`services.descriptions.${service.key}`)}
                </p>
                <span className="flex items-center gap-2 font-semibold text-body-sm group-hover:gap-3 transition-all">
                  {t('common.learnMore')}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/servicii" className="btn btn-secondary">
              {t('common.seeAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Dentcraft Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2>{t('whyUs.title')}</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              {t('whyUs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'technology', Icon: Microscope },
              { key: 'team', Icon: Users },
              { key: 'comfort', Icon: Heart },
              { key: 'prices', Icon: Wallet },
            ].map((item) => (
              <div key={item.key} className="card text-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-5 text-[var(--color-primary)]">
                  <item.Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h4 className="mb-3">{t(`whyUs.reasons.${item.key}.title`)}</h4>
                <p className="text-body-sm text-muted">
                  {t(`whyUs.reasons.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2>{t('testimonials.title')}</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Maria P.', treatment: t('testimonials.treatments.veneers'), quote: t('testimonials.quotes.1') },
              { name: 'Alexandru M.', treatment: t('testimonials.treatments.implant'), quote: t('testimonials.quotes.2') },
              { name: 'Elena D.', treatment: t('testimonials.treatments.whitening'), quote: t('testimonials.quotes.3') },
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex gap-0.5 mb-4 text-[var(--color-warning)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mb-6">
                  <p className="leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
                <div className="flex items-center gap-4 pt-5 border-t border-[var(--color-border-light)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-body-sm text-muted">{testimonial.treatment}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--color-accent)]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_4px_24px_rgba(26,26,26,0.08)] p-10 md:p-12 text-center">
            <h2>{t('cta.title')}</h2>
            <p className="mt-4 text-muted text-body-lg">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn btn-lg btn-primary"
              >
                {t('common.bookAppointment')}
              </Link>
              <a
                href="tel:+40741199977"
                className="btn btn-lg bg-[var(--color-background)] text-[var(--color-primary)] hover:bg-[var(--color-accent-hover)] flex items-center gap-2 transition-colors"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                0741 199 977
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
