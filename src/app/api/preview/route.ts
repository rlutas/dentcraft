import { type NextRequest, NextResponse } from 'next/server'

/**
 * Preview bypass for maintenance mode.
 *
 * Usage: visit /api/preview?key=<PREVIEW_ACCESS_TOKEN>
 * → sets a long-lived cookie and redirects to /
 * → subsequent visits see the real site even while NEXT_PUBLIC_MAINTENANCE_MODE=true
 *
 * Shared link example:
 *   https://www.dentcraft.ro/api/preview?key=SECRET123
 */
export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('key')
  const expected = process.env['PREVIEW_ACCESS_TOKEN']

  if (!expected) {
    return new NextResponse(
      'Preview access is not configured. Set PREVIEW_ACCESS_TOKEN environment variable.',
      { status: 500 }
    )
  }

  if (!token || token !== expected) {
    return new NextResponse('Invalid preview token.', { status: 401 })
  }

  const redirectUrl = new URL('/', request.url)
  const response = NextResponse.redirect(redirectUrl)

  response.cookies.set('dentcraft_preview', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return response
}
