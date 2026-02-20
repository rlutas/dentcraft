import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Configuration
const RATE_LIMIT_MAX = 5 // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute window

// Price estimate form data type
type PriceEstimateFormData = {
  name: string
  phone: string
  service: string
  serviceSlug: string
  quantity: number
  materialType: string | null
  priceMin: number
  priceMax: number
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
): { errors: Record<string, string>; valid: false } | { data: PriceEstimateFormData; valid: true } {
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

  // Service validation
  if (!formData['service'] || typeof formData['service'] !== 'string') {
    errors['service'] = 'Service is required'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, valid: false }
  }

  const result: PriceEstimateFormData = {
    name: (formData['name'] as string).trim(),
    phone: (formData['phone'] as string).trim(),
    service: (formData['service'] as string).trim(),
    serviceSlug: typeof formData['serviceSlug'] === 'string' ? formData['serviceSlug'].trim() : '',
    quantity: typeof formData['quantity'] === 'number' ? formData['quantity'] : 1,
    materialType: typeof formData['materialType'] === 'string' ? formData['materialType'] : null,
    priceMin: typeof formData['priceMin'] === 'number' ? formData['priceMin'] : 0,
    priceMax: typeof formData['priceMax'] === 'number' ? formData['priceMax'] : 0,
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

// Format price for email
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ro-RO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
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
      console.log('Price estimate form submission (no RESEND_API_KEY configured):', {
        name: data.name,
        phone: data.phone,
        service: data.service,
        serviceSlug: data.serviceSlug,
        quantity: data.quantity,
        materialType: data.materialType,
        priceMin: data.priceMin,
        priceMax: data.priceMax,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        message: 'Form submitted successfully (email sending not configured)',
        success: true,
      })
    }

    // Build material type row
    const materialRow = data.materialType
      ? `<tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 160px;">Material:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${escapeHtml(data.materialType === 'premium' ? 'Premium' : 'Standard')}</td>
        </tr>`
      : ''

    // Build email HTML
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #2a2a2a); padding: 32px 24px; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">Noua estimare de pret</h2>
          <p style="margin: 8px 0 0; color: #d4c4b0; font-size: 14px;">Un client a solicitat o estimare de pret prin calculator</p>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #f0ebe3; border-top: none;">
          <h3 style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">Date client</h3>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 160px;">Nume:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 160px;">Telefon:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">
                <a href="tel:${escapeHtml(data.phone)}" style="color: #1a1a1a; text-decoration: none; font-weight: 600;">${escapeHtml(data.phone)}</a>
              </td>
            </tr>
          </table>

          <h3 style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">Detalii estimare</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 160px;">Serviciu:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${escapeHtml(data.service)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 160px;">Cantitate:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #4a4a4a;">${data.quantity} ${data.quantity > 1 ? 'unitati' : 'unitate'}</td>
            </tr>
            ${materialRow}
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #1a1a1a; width: 160px;">Pret estimat:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe3; color: #1a1a1a; font-weight: 700; font-size: 16px;">${formatPrice(data.priceMin)} - ${formatPrice(data.priceMax)} RON</td>
            </tr>
          </table>
        </div>
        <div style="background: #f9f6f1; padding: 16px 24px; border-radius: 0 0 12px 12px; border: 1px solid #f0ebe3; border-top: none;">
          <p style="margin: 0; color: #8b8b8b; font-size: 12px;">
            Aceasta cerere a fost trimisa prin calculatorul de preturi de pe site-ul dentcraft.ro<br>
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
      subject: `[Dentcraft] Estimare pret - ${data.service} - ${data.name}`,
      to: recipientEmail,
    })

    if (error) {
      console.error('Failed to send price estimate email:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Price estimate request sent successfully!',
      success: true,
    })
  } catch (error) {
    console.error('Price estimate form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
