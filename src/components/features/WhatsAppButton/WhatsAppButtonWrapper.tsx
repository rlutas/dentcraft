'use client'

import { useTranslations } from 'next-intl'
import { WhatsAppButton } from './index'

export function WhatsAppButtonWrapper() {
  const t = useTranslations()

  return (
    <WhatsAppButton
      ariaLabel={t('common.whatsappMessage')}
      message={t('contact.whatsappPrefill')}
      phoneNumber={t('footer.phone')}
      tooltipText={t('common.whatsappTooltip')}
    />
  )
}
