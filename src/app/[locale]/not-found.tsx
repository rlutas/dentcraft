import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('errors.404')

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center container-padding">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
      <p className="text-secondary mb-8 max-w-md">{t('description')}</p>
      <Link href="/" className="btn-primary">
        {t('backHome')}
      </Link>
    </div>
  )
}
