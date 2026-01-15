import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/features/ContactForm'
import { getSettings, type Locale } from '@/lib/sanity/queries'

// Settings type based on Sanity schema
type SanitySettings = {
  _id: string
  siteName: string
  logo: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  } | null
  contact: {
    phone: string
    email: string
    whatsapp: string
    address: string
  } | null
  workingHours: Array<{
    days: string
    hours: string
    closed: boolean
  }> | null
  socialLinks: {
    facebook: string | null
    instagram: string | null
    youtube: string | null
    linkedin: string | null
    tiktok: string | null
  } | null
  googleMapsEmbed: string | null
}

type PageProps = {
  params: Promise<{ locale: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('contact.title'),
    description: t('contact.subtitle'),
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch settings from Sanity
  const settings = await getSettings(locale as Locale) as SanitySettings | null

  return (
    <ContactPageContent settings={settings} />
  )
}

async function ContactPageContent({ settings }: { settings: SanitySettings | null }) {
  const t = await getTranslations()

  // Use Sanity data if available, otherwise use defaults from translations
  const contactInfo = {
    phone: settings?.contact?.phone || t('footer.phone'),
    email: settings?.contact?.email || t('footer.email'),
    whatsapp: settings?.contact?.whatsapp || t('footer.phone'),
    address: settings?.contact?.address || t('footer.address'),
  }

  const workingHours = settings?.workingHours || [
    { days: t('contact.weekdays'), hours: '10:00 - 18:00', closed: false },
    { days: t('contact.saturday'), hours: t('contact.byAppointment'), closed: false },
    { days: t('contact.sunday'), hours: '', closed: true },
  ]

  const socialLinks = settings?.socialLinks || null
  const googleMapsEmbed = settings?.googleMapsEmbed || null

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <MapPin className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{t('contact.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                      {t('contact.phoneLabel')}
                    </h3>
                    <a
                      className="text-body-lg text-[var(--color-primary)] hover:underline font-medium"
                      href={`tel:+40${contactInfo.phone.replace(/\s/g, '').replace(/^0/, '')}`}
                    >
                      {contactInfo.phone}
                    </a>
                    <p className="text-body-sm text-muted mt-1">
                      {t('contact.callDescription')}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-body-sm text-muted mb-3">
                      {t('contact.whatsappDescription')}
                    </p>
                    <a
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                      href={`https://wa.me/40${contactInfo.whatsapp.replace(/\s/g, '').replace(/^0/, '')}?text=${encodeURIComponent(t('contact.whatsappPrefill'))}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                      {t('common.whatsappMessage')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                      {t('contact.emailLabel')}
                    </h3>
                    <a
                      className="text-body-lg text-[var(--color-primary)] hover:underline font-medium"
                      href={`mailto:${contactInfo.email}`}
                    >
                      {contactInfo.email}
                    </a>
                    <p className="text-body-sm text-muted mt-1">
                      {t('contact.emailDescription')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                      {t('contact.addressLabel')}
                    </h3>
                    <p className="text-body text-[var(--color-text)]">
                      {contactInfo.address}
                    </p>
                    <p className="text-body-sm text-muted mt-1">
                      {t('contact.addressDescription')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
                      {t('contact.workingHoursLabel')}
                    </h3>
                    <div className="space-y-2">
                      {workingHours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-body"
                        >
                          <span className="text-[var(--color-text)]">{schedule.days}</span>
                          <span className={schedule.closed ? 'text-muted' : 'font-medium text-[var(--color-primary)]'}>
                            {schedule.closed ? t('contact.closed') : schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {socialLinks && (socialLinks.facebook || socialLinks.instagram || socialLinks.youtube || socialLinks.linkedin) && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                    {t('contact.followUs')}
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.facebook && (
                      <a
                        aria-label="Facebook"
                        className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
                        href={socialLinks.facebook}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Facebook className="w-5 h-5 text-[var(--color-text)]" strokeWidth={1.5} />
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        aria-label="Instagram"
                        className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
                        href={socialLinks.instagram}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Instagram className="w-5 h-5 text-[var(--color-text)]" strokeWidth={1.5} />
                      </a>
                    )}
                    {socialLinks.youtube && (
                      <a
                        aria-label="YouTube"
                        className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
                        href={socialLinks.youtube}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Youtube className="w-5 h-5 text-[var(--color-text)]" strokeWidth={1.5} />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        aria-label="LinkedIn"
                        className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
                        href={socialLinks.linkedin}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Linkedin className="w-5 h-5 text-[var(--color-text)]" strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Map Section */}
            <div className="space-y-6">
              <div className="card p-0 overflow-hidden">
                <div className="aspect-[4/3] w-full bg-[var(--color-accent-light)]">
                  {googleMapsEmbed ? (
                    <iframe
                      allowFullScreen
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={googleMapsEmbed}
                      title={t('contact.mapTitle')}
                    />
                  ) : (
                    // Default Google Maps embed for Satu Mare clinic
                    <iframe
                      allowFullScreen
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.5!2d22.876!3d47.789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4738069e0d5f2d33%3A0x1!2sSatu%20Mare!5e0!3m2!1sen!2sro!4v1"
                      title={t('contact.mapTitle')}
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    {t('contact.findUs')}
                  </h3>
                  <p className="text-body text-muted mb-4">
                    {contactInfo.address}
                  </p>
                  <a
                    className="btn btn-secondary inline-flex items-center gap-2"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactInfo.address)}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    {t('contact.getDirections')}
                  </a>
                </div>
              </div>

              {/* Quick Contact CTA */}
              <div className="card p-8 bg-[var(--color-primary)] text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {t('contact.ctaTitle')}
                </h3>
                <p className="opacity-90 mb-6">
                  {t('contact.ctaSubtitle')}
                </p>
                <a
                  className="btn bg-white text-[var(--color-primary)] hover:bg-[var(--color-accent)] w-full flex items-center justify-center gap-2"
                  href={`tel:+40${contactInfo.phone.replace(/\s/g, '').replace(/^0/, '')}`}
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  {t('common.callNow')}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-12">
            <div className="max-w-2xl mx-auto">
              <div className="card p-8">
                <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
                  {t('contactForm.title')}
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
