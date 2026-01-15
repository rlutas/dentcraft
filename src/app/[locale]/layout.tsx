import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { Header, Footer } from '@/components/layout'
import { CookieConsentWrapper } from '@/components/features/CookieConsent/CookieConsentWrapper'
import { WhatsAppButtonWrapper } from '@/components/features/WhatsAppButton/WhatsAppButtonWrapper'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    ro: 'Dentcraft - Clinica Stomatologica Satu Mare',
    en: 'Dentcraft - Dental Clinic Satu Mare',
    hu: 'Dentcraft - Fogaszati Klinika Szatmarnemeti',
  }

  const descriptions: Record<string, string> = {
    ro: 'Clinica stomatologica moderna in Satu Mare. Servicii complete de stomatologie: implanturi, estetica dentara, ortodontie. Programeaza-te acum!',
    en: 'Modern dental clinic in Satu Mare. Complete dental services: implants, cosmetic dentistry, orthodontics. Book your appointment now!',
    hu: 'Modern fogaszati klinika Szatmarneметiben. Teljes koru fogaszati szolgaltatasok: implantatum, esztetikai fogaszat, fogszabalyozas. Foglaljon idopontot most!',
  }

  const title = titles[locale] ?? titles['ro'] ?? 'Dentcraft'
  const description =
    descriptions[locale] ?? descriptions['ro'] ?? 'Clinica stomatologica'

  return {
    title: {
      default: title,
      template: `%s | Dentcraft`,
    },
    description,
    metadataBase: new URL('https://dentcraft.ro'),
    alternates: {
      canonical: '/',
      languages: {
        ro: '/',
        en: '/en',
        hu: '/hu',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButtonWrapper />
            <CookieConsentWrapper />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
