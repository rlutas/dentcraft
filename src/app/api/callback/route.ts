import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Configuration
const RATE_LIMIT_MAX = 5 // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute window

// Callback form data type
type CallbackFormData = {
  name: string
  phone: string
  service?: string
  timePreference?: string
}

// Time preference labels for email
const timePreferenceLabels: Record<string, string> = {
  afternoon: 'Dupa-amiaza (12:00 - 15:00)',
  evening: 'Seara (15:00 - 18:00)',
  morning: 'Dimineata (10:00 - 12:00)',
}

// Get client IP from headers
async function getClientIP(): Promise<string> {
  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')
  if (forwardedFor) {
    const firstIP = forwardedFor.split(',')[0]
    if (firstIP) {
      return firstIP.trim()
    }
  }
  const realIP = headersList.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return 'unknown'
}

// Check rate limit for IP
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000)
    return { allowed: false, retryAfter }
  }

  record.count++
  return { allowed: true }
}

// Validate form data
function validateFormData(
  data: unknown
): { errors: Record<string, string>; valid: false } | { data: CallbackFormData; valid: true } {
  const errors: Record<string, string> = {}

  if (!data || typeof data !== 'object') {
    return { errors: { general: 'Invalid request body' }, valid: false }
  }

  const formData = data as Record<string, unknown>

  // Name validation (required, min 2 chars)
  if (!formData['name'] || typeof formData['name'] !== 'string' || formData['name'].trim().length < 2) {
    errors['name'] = 'Name must be at least 2 characters'
  }

  // Phone validation (required, 8+ digits)
  if (!formData['phone'] || typeof formData['phone'] !== 'string') {
    errors['phone'] = 'Phone number is required'
  } else {
    const digitsOnly = formData['phone'].replace(/\D/g, '')
    if (digitsOnly.length < 8) {
      errors['phone'] = 'Phone number must have at least 8 digits'
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, valid: false }
  }

  const result: CallbackFormData = {
    name: (formData['name'] as string).trim(),
    phone: (formData['phone'] as string).trim(),
  }

  // Service is optional
  if (formData['service'] && typeof formData['service'] === 'string' && formData['service'].trim()) {
    result.service = (formData['service'] as string).trim()
  }

  // Time preference is optional
  if (formData['timePreference'] && typeof formData['timePreference'] === 'string' && formData['timePreference'].trim()) {
    result.timePreference = (formData['timePreference'] as string).trim()
  }

  return { data: result, valid: true }
}

// HTML escaping to prevent XSS in email
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '"': '&quot;',
    '&': '&amp;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;',
  }
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char)
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = await getClientIP()
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          headers: { 'Retry-After': String(rateLimit.retryAfter) },
          status: 429,
        }
      )
    }

    // Parse request body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    // Validate form data
    const validation = validateFormData(body)
    if (!validation.valid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 })
    }

    const { data } = validation

    // Check for Resend API key
    const resendApiKey = process.env['RESEND_API_KEY']
    const recipientEmail = process.env['CONTACT_EMAIL'] || 'dentcraftsm@gmail.com'

    if (!resendApiKey) {
      // Log the form submission for development/testing
      console.log('Callback form submission (no RESEND_API_KEY configured):', {
        name: data.name,
        phone: data.phone,
        service: data.service,
        timePreference: data.timePreference,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        message: 'Form submitted successfully (email sending not configured)',
        success: true,
      })
    }

    // Build email HTML
    const serviceRow = data.service
      ? `<tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 140px;">Serviciu:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${escapeHtml(data.service)}</td>
        </tr>`
      : ''

    const timeRow = data.timePreference
      ? `<tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 140px;">Preferinta ora:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${escapeHtml(timePreferenceLabels[data.timePreference] || data.timePreference)}</td>
        </tr>`
      : ''

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #2a2a2a); padding: 32px 24px; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">Cerere noua de programare</h2>
          <p style="margin: 8px 0 0; color: #d4c4b0; font-size: 14px;">Un client doreste sa fie contactat telefonic</p>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #f0ebe3; border-top: none;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 140px;">Nume:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 140px;">Telefon:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">
                <a href="tel:${escapeHtml(data.phone)}" style="color: #1a1a1a; text-decoration: none; font-weight: 600;">${escapeHtml(data.phone)}</a>
              </td>
            </tr>
            ${serviceRow}
            ${timeRow}
          </table>
        </div>
        <div style="background: #f9f6f1; padding: 16px 24px; border-radius: 0 0 12px 12px; border: 1px solid #f0ebe3; border-top: none;">
          <p style="margin: 0; color: #8b8b8b; font-size: 12px;">
            Aceasta cerere a fost trimisa prin formularul de programare de pe site-ul dentcraft.ro<br>
            Data: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
          </p>
        </div>
      </div>
    `

    // Send email using Resend
    const resend = new Resend(resendApiKey)

    const { error } = await resend.emails.send({
      from: 'Dentcraft Website <noreply@dentcraft.ro>',
      html: emailHtml,
      subject: `[Dentcraft] Cerere programare - ${data.name}`,
      to: recipientEmail,
    })

    if (error) {
      console.error('Failed to send callback email:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Callback request sent successfully!',
      success: true,
    })
  } catch (error) {
    console.error('Callback form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
