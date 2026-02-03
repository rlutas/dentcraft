'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { CONTACT } from '@/lib/constants/contact'
import { BookingButton } from '@/components/ui/BookingButton'

const FacebookIcon = () => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    height="18"
    viewBox="0 0 24 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    height="18"
    viewBox="0 0 24 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    height="18"
    viewBox="0 0 24 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const quickLinks = [
  { href: '/servicii', labelKey: 'services' as const },
  { href: '/echipa', labelKey: 'team' as const },
  { href: '/preturi', labelKey: 'prices' as const },
  { href: '/galerie', labelKey: 'gallery' as const },
  { href: '/blog', labelKey: 'blog' as const },
  { href: '/contact', labelKey: 'contact' as const },
] as const

const servicesLinks = [
  { slug: 'stomatologie-generala', labelKey: 'generalDentistry' as const },
  { slug: 'implantologie', labelKey: 'implantology' as const },
  { slug: 'ortodontie', labelKey: 'orthodontics' as const },
  { slug: 'estetica-dentara', labelKey: 'cosmeticDentistry' as const },
  { slug: 'pedodontie', labelKey: 'pediatricDentistry' as const },
]

const legalLinks = [
  { href: '/politica-confidentialitate', labelKey: 'privacy' as const },
  { href: '/politica-cookies', labelKey: 'cookies' as const },
  { href: '/termeni-conditii', labelKey: 'terms' as const },
] as const

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')
  const tServices = useTranslations('services.fallback')

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      {/* Main footer with gradient background */}
      <div className="bg-gradient-to-b from-[#1a1a1a] via-[#141414] to-[#0a0a0a] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4c4b0]/30 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#d4c4b0]/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-24 bg-gradient-to-b from-[#d4c4b0]/15 to-transparent" />

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />

        {/* Top CTA Section - Premium appointment banner */}
        <div className="relative border-b border-white/5">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left max-w-xl">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 tracking-tight">
                  {t('ctaTitle')}
                </h3>
                <p className="text-white/50 text-lg">
                  {t('ctaSubtitle')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookingButton
                  variant="custom"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4c4b0] text-[#1a1a1a]
                    rounded-full font-semibold text-base hover:bg-white
                    transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,196,176,0.3)]
                    group"
                  icon={
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  {t('bookAppointment')}
                </BookingButton>
                <a
                  href={`tel:${CONTACT.phoneFormatted.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white
                    rounded-full font-medium text-base hover:bg-white hover:text-[#1a1a1a]
                    transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {CONTACT.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand column - spans more on large screens */}
            <div className="lg:col-span-4 space-y-6">
              <Link className="inline-block" href="/">
                <Image
                  src="/branding/LOGO_WHITE_FINAL.png"
                  alt="Dentcraft"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-base leading-relaxed text-white/50 max-w-sm">
                {t('description')}
              </p>

              {/* Social icons - premium style */}
              <div className="flex gap-3 pt-4">
                <a
                  aria-label="Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-full
                    bg-white/5 border border-white/10 text-white/60
                    transition-all duration-300
                    hover:bg-[#d4c4b0] hover:border-[#d4c4b0] hover:text-[#1a1a1a] hover:scale-110"
                  href={CONTACT.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FacebookIcon />
                </a>
                <a
                  aria-label="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-full
                    bg-white/5 border border-white/10 text-white/60
                    transition-all duration-300
                    hover:bg-[#d4c4b0] hover:border-[#d4c4b0] hover:text-[#1a1a1a] hover:scale-110"
                  href={CONTACT.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
                <a
                  aria-label="WhatsApp"
                  className="flex h-12 w-12 items-center justify-center rounded-full
                    bg-white/5 border border-white/10 text-white/60
                    transition-all duration-300
                    hover:bg-[#25d366] hover:border-[#25d366] hover:text-white hover:scale-110"
                  href={CONTACT.whatsappUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            {/* Quick Links column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold text-sm uppercase tracking-[0.15em] mb-6">
                {t('quickLinks')}
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-white/50 hover:text-[#d4c4b0] transition-colors duration-300
                        text-[15px] inline-flex items-center gap-2 group"
                      href={link.href}
                    >
                      <span className="w-0 h-px bg-[#d4c4b0] group-hover:w-3 transition-all duration-300" />
                      {tNav(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services column */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold text-sm uppercase tracking-[0.15em] mb-6">
                {tNav('services')}
              </h4>
              <ul className="space-y-4">
                {servicesLinks.map((link) => (
                  <li key={link.slug}>
                    <Link
                      className="text-white/50 hover:text-[#d4c4b0] transition-colors duration-300
                        text-[15px] inline-flex items-center gap-2 group"
                      href={{ pathname: '/servicii/[slug]', params: { slug: link.slug } }}
                    >
                      <span className="w-0 h-px bg-[#d4c4b0] group-hover:w-3 transition-all duration-300" />
                      {tServices(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold text-sm uppercase tracking-[0.15em] mb-6">
                {t('contactInfo')}
              </h4>
              <ul className="space-y-5">
                <li>
                  <a
                    className="flex items-start gap-4 text-white/50 hover:text-[#d4c4b0] transition-colors duration-300 group"
                    href={CONTACT.googleMapsUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="mt-1 shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10
                      flex items-center justify-center group-hover:bg-[#d4c4b0]/10 group-hover:border-[#d4c4b0]/30
                      transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="text-[15px] leading-relaxed pt-2">{CONTACT.address}</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-4 text-white/50 hover:text-[#d4c4b0] transition-colors duration-300 group"
                    href={`tel:${CONTACT.phoneFormatted.replace(/\s/g, '')}`}
                  >
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10
                      flex items-center justify-center group-hover:bg-[#d4c4b0]/10 group-hover:border-[#d4c4b0]/30
                      transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <span className="text-[15px]">{CONTACT.phoneFormatted}</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-4 text-white/50 hover:text-[#d4c4b0] transition-colors duration-300 group"
                    href={`mailto:${CONTACT.email}`}
                  >
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10
                      flex items-center justify-center group-hover:bg-[#d4c4b0]/10 group-hover:border-[#d4c4b0]/30
                      transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="text-[15px]">{CONTACT.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-4 text-white/50">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10
                    flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-[15px]">{t('hours')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar - sleek minimal design */}
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <p className="text-sm text-white/40 text-center md:text-left">
                &copy; {currentYear} Dentcraft. {t('copyright')}
              </p>

              {/* Legal links */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="text-sm text-white/40 hover:text-[#d4c4b0] transition-colors duration-300"
                    href={link.href}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>

              {/* Made with love */}
              <p className="text-sm text-white/30 flex items-center gap-2">
                Made with
                <span className="text-[#d4c4b0] animate-pulse">♥</span>
                in Satu Mare
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
