import type ro from '@/messages/ro.json'

type Messages = typeof ro

declare global {
  // Use type safe message keys with next-intl
  interface IntlMessages extends Messages {}
}
