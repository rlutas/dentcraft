import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * Navigation utilities with localized pathnames
 *
 * Usage:
 * - Link: <Link href="/servicii">Services</Link>
 * - redirect: redirect('/contact')
 * - usePathname: Get current pathname
 * - useRouter: Programmatic navigation
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
