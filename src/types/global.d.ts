import type ro from '@/messages/ro.json'

type Messages = typeof ro

declare global {
  // Use type safe message keys with next-intl
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
