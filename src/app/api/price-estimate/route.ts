import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { priceEstimateAdminEmail } from '@/lib/email-templates'

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

    // Send email using Resend
    const resend = new Resend(resendApiKey)

    const { error } = await resend.emails.send({
      from: 'Dentcraft Website <noreply@dentcraft.ro>',
      html: priceEstimateAdminEmail({
        name: data.name,
        phone: data.phone,
        service: data.service,
        quantity: data.quantity,
        materialType: data.materialType,
        priceMin: data.priceMin,
        priceMax: data.priceMax,
      }),
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
