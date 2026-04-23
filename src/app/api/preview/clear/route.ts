import { type NextRequest, NextResponse } from 'next/server'

/**
 * Clears the maintenance preview cookie.
 * Usage: visit /api/preview/clear → redirects to /, user now sees maintenance page again.
 */
export function GET(request: NextRequest) {
  const redirectUrl = new URL('/', request.url)
  const response = NextResponse.redirect(redirectUrl)
  response.cookies.delete('dentcraft_preview')
  return response
}
