'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
  Youtube,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ContactForm } from '@/components/features/ContactForm'

type ContactInfo = {
  phone: string
  email: string
  whatsapp: string
  address: string
}

type WorkingHoursSchedule = {
  days: string
  hours: string
  closed: boolean
}

type SocialLinks = {
  facebook: string | null
  instagram: string | null
  youtube: string | null
  linkedin: string | null
  tiktok: string | null
} | null

type ContactPageContentProps = {
  contactInfo: ContactInfo
  workingHours: WorkingHoursSchedule[]
  socialLinks: SocialLinks
  googleMapsEmbed: string | null
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export default function ContactPageContent({
  contactInfo,
  workingHours,
  socialLinks,
  googleMapsEmbed,
}: ContactPageContentProps) {
  const t = useTranslations()

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark Editorial */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Dramatic lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#d4c4b0]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b7355]/5 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-12">
              <span className="text-white/40 text-sm">Acasă</span>
              <span className="text-white/20">/</span>
              <span className="text-[#d4c4b0] text-sm font-medium">Contact</span>
            </motion.div>

            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-block text-[#d4c4b0] text-sm font-medium tracking-[0.3em] uppercase mb-6"
            >
              {t('contact.badge') || 'Contact'}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {t('contact.title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed"
            >
              {t('contact.subtitle')}
            </motion.p>

            {/* Decorative line */}
            <motion.div variants={fadeInUp} className="mt-16 flex items-center gap-6">
              <div className="w-24 h-px bg-[#d4c4b0]" />
              <span className="text-white/30 text-sm">Satu Mare, România</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          {/* Quick Contact Cards - Top Row */}
          <motion.div
            className="mb-16 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Phone Card */}
            <motion.a
              href={`tel:+40${contactInfo.phone.replace(/\s/g, '').replace(/^0/, '')}`}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-[#f0ebe3] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4c4b0] hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#d4c4b0]/20 to-transparent transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8ded0] to-[#d4c4b0] shadow-inner">
                  <Phone className="h-6 w-6 text-[#1a1a1a]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#6b6b6b]">
                  {t('contact.phoneLabel')}
                </h3>
                <p className="text-xl font-semibold text-[#1a1a1a] transition-colors group-hover:text-[#333]">
                  {contactInfo.phone}
                </p>
              </div>
            </motion.a>

            {/* Email Card */}
            <motion.a
              href={`mailto:${contactInfo.email}`}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-[#f0ebe3] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4c4b0] hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#d4c4b0]/20 to-transparent transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8ded0] to-[#d4c4b0] shadow-inner">
                  <Mail className="h-6 w-6 text-[#1a1a1a]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#6b6b6b]">
                  {t('contact.emailLabel')}
                </h3>
                <p className="text-xl font-semibold text-[#1a1a1a] transition-colors group-hover:text-[#333]">
                  {contactInfo.email}
                </p>
              </div>
            </motion.a>

            {/* WhatsApp Card */}
            <motion.a
              href={`https://wa.me/40${contactInfo.whatsapp.replace(/\s/g, '').replace(/^0/, '')}?text=${encodeURIComponent(t('contact.whatsappPrefill'))}`}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-[#25D366]/20 bg-gradient-to-br from-white to-[#25D366]/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/40 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#25D366]/20 to-transparent transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#25D366] shadow-lg shadow-[#25D366]/25">
                  <MessageCircle className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#6b6b6b]">
                  WhatsApp
                </h3>
                <p className="text-lg font-semibold text-[#25D366]">
                  {t('common.whatsappMessage')}
                </p>
              </div>
            </motion.a>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left Column - Info Cards */}
            <motion.div
              className="space-y-6 lg:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Address Card */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-[#f0ebe3] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8ded0] to-[#d4c4b0]">
                    <MapPin className="h-5 w-5 text-[#1a1a1a]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-[#1a1a1a]">
                      {t('contact.addressLabel')}
                    </h3>
                    <p className="mb-3 text-[#6b6b6b]" style={{ lineHeight: 1.6 }}>
                      {contactInfo.address}
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Dentcraft+Clinica+Stomatologica+Satu+Mare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] transition-colors hover:text-[#6b6b6b]"
                    >
                      <Navigation className="h-4 w-4" strokeWidth={1.5} />
                      {t('contact.getDirections')}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Working Hours Card */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-[#f0ebe3] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8ded0] to-[#d4c4b0]">
                    <Clock className="h-5 w-5 text-[#1a1a1a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">
                    {t('contact.workingHoursLabel')}
                  </h3>
                </div>
                <div className="space-y-3 pl-1">
                  {workingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-[#f0ebe3] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-[#6b6b6b]">{schedule.days}</span>
                      <span
                        className={`font-semibold ${
                          schedule.closed ? 'text-[#999]' : 'text-[#1a1a1a]'
                        }`}
                      >
                        {schedule.closed ? t('contact.closed') : schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links Card */}
              {socialLinks &&
                (socialLinks.facebook ||
                  socialLinks.instagram ||
                  socialLinks.youtube ||
                  socialLinks.linkedin) && (
                  <motion.div
                    variants={fadeInUp}
                    className="rounded-2xl border border-[#f0ebe3] bg-white p-6 shadow-sm"
                  >
                    <h3 className="mb-4 text-lg font-semibold text-[#1a1a1a]">
                      {t('contact.followUs')}
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.facebook && (
                        <motion.a
                          href={socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f0e8] text-[#1a1a1a] transition-all hover:bg-[#1877f2] hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Facebook className="h-5 w-5" strokeWidth={1.5} />
                        </motion.a>
                      )}
                      {socialLinks.instagram && (
                        <motion.a
                          href={socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f0e8] text-[#1a1a1a] transition-all hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Instagram className="h-5 w-5" strokeWidth={1.5} />
                        </motion.a>
                      )}
                      {socialLinks.youtube && (
                        <motion.a
                          href={socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f0e8] text-[#1a1a1a] transition-all hover:bg-[#ff0000] hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Youtube className="h-5 w-5" strokeWidth={1.5} />
                        </motion.a>
                      )}
                      {socialLinks.linkedin && (
                        <motion.a
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f0e8] text-[#1a1a1a] transition-all hover:bg-[#0077b5] hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                )}

              {/* Quick Contact CTA */}
              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#333333] p-8 text-white"
              >
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <Sparkles className="h-5 w-5 text-[#d4c4b0]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{t('contact.ctaTitle')}</h3>
                  <p className="mb-6 text-white/80">{t('contact.ctaSubtitle')}</p>
                  <a
                    href={`tel:+40${contactInfo.phone.replace(/\s/g, '').replace(/^0/, '')}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#1a1a1a] transition-all hover:bg-[#d4c4b0]"
                  >
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                    {t('common.callNow')}
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Map & Form */}
            <motion.div
              className="space-y-8 lg:col-span-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Map Card */}
              <motion.div
                variants={fadeInUp}
                className="overflow-hidden rounded-2xl border border-[#f0ebe3] bg-white shadow-sm"
              >
                <div className="aspect-[16/10] w-full bg-[#f5f0e8]">
                  {googleMapsEmbed ? (
                    <iframe
                      src={googleMapsEmbed}
                      className="h-full w-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t('contact.mapTitle')}
                    />
                  ) : (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21443.850474933406!2d22.876246!3d47.791505!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473805e40ebf39e7%3A0xc5f8c1c74c29f519!2sDENTCRAFT!5e0!3m2!1sen!2sus!4v1770155712303!5m2!1sen!2sus"
                      className="h-full w-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t('contact.mapTitle')}
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1a1a1a]">
                        {t('contact.findUs')}
                      </h3>
                      <p className="text-[#6b6b6b]">{contactInfo.address}</p>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Dentcraft+Clinica+Stomatologica+Satu+Mare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1a1a1a] bg-transparent px-5 py-2.5 font-semibold text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
                    >
                      <Navigation className="h-4 w-4" strokeWidth={1.5} />
                      {t('contact.getDirections')}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form Card */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-[#f0ebe3] bg-white p-8 shadow-sm lg:p-10"
              >
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-[#1a1a1a] lg:text-3xl">
                    {t('contactForm.title')}
                  </h2>
                  <p className="text-[#6b6b6b]">
                    {t('contactForm.subtitle') || t('contact.subtitle')}
                  </p>
                </div>
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
