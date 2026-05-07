import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  priceEstimateAdminEmail,
  priceEstimateConfirmationEmail,
  type LeadLineItem,
} from '@/lib/email-templates'
import { addContactToResend } from '@/lib/resend-contacts'

// Cap line items at 10 to prevent abuse
const MAX_LINE_ITEMS = 10

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Configuration
const RATE_LIMIT_MAX = 5 // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute window

// Price estimate form data type
type PriceEstimateFormData = {
  name: string
  phone: string
  email: string
  service: string
  serviceSlug: string
  quantity: number
  materialType: string | null
  priceMin: number
  priceMax: number
  lineItems?: LeadLineItem[]
  saveOnly?: boolean
}

// Validate a single line item; returns null if malformed.
function parseLineItem(raw: unknown): LeadLineItem | null {
  if (!raw || typeof raw !== 'object') return null
  const item = raw as Record<string, unknown>

  if (typeof item['label'] !== 'string' || item['label'].trim().length === 0) return null
  if (typeof item['qty'] !== 'number' || !Number.isFinite(item['qty']) || item['qty'] < 0) return null
  if (typeof item['unitPrice'] !== 'number' || !Number.isFinite(item['unitPrice']) || item['unitPrice'] < 0) return null
  if (typeof item['total'] !== 'number' || !Number.isFinite(item['total']) || item['total'] < 0) return null
  if (item['priceType'] !== 'fixed' && item['priceType'] !== 'from') return null

  return {
    label: (item['label'] as string).trim().slice(0, 200),
    qty: item['qty'] as number,
    unitPrice: item['unitPrice'] as number,
    total: item['total'] as number,
    priceType: item['priceType'] as 'fixed' | 'from',
  }
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

  // saveOnly flag: when true, this is "send by email" — phone is not required.
  const saveOnly = formData['saveOnly'] === true

  // Phone validation (required unless saveOnly)
  if (!saveOnly) {
    if (!formData['phone'] || typeof formData['phone'] !== 'string') {
      errors['phone'] = 'Phone number is required'
    } else {
      const digitsOnly = formData['phone'].replace(/\D/g, '')
      if (digitsOnly.length < 8) {
        errors['phone'] = 'Phone number must have at least 8 digits'
      }
    }
  }

  // Email validation (required)
  if (!formData['email'] || typeof formData['email'] !== 'string' || !formData['email'].trim()) {
    errors['email'] = 'Email address is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData['email'].trim())) {
      errors['email'] = 'Email address is not valid'
    }
  }

  // Service validation
  if (!formData['service'] || typeof formData['service'] !== 'string') {
    errors['service'] = 'Service is required'
  }

  // Line items validation (optional). If present, the whole field must be valid:
  // - must be an array
  // - max 10 items
  // - every item must parse successfully (reject the whole field if any item is malformed)
  let parsedLineItems: LeadLineItem[] | undefined
  if (formData['lineItems'] !== undefined) {
    const raw = formData['lineItems']
    if (!Array.isArray(raw)) {
      errors['lineItems'] = 'lineItems must be an array'
    } else if (raw.length > MAX_LINE_ITEMS) {
      errors['lineItems'] = `lineItems exceeds maximum of ${MAX_LINE_ITEMS}`
    } else {
      const parsed: LeadLineItem[] = []
      for (const entry of raw) {
        const li = parseLineItem(entry)
        if (!li) {
          errors['lineItems'] = 'lineItems contains invalid entries'
          break
        }
        parsed.push(li)
      }
      if (!errors['lineItems']) {
        parsedLineItems = parsed
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, valid: false }
  }

  const result: PriceEstimateFormData = {
    name: (formData['name'] as string).trim(),
    phone: typeof formData['phone'] === 'string' ? formData['phone'].trim() : '',
    email: (formData['email'] as string).trim(),
    service: (formData['service'] as string).trim(),
    serviceSlug: typeof formData['serviceSlug'] === 'string' ? formData['serviceSlug'].trim() : '',
    quantity: typeof formData['quantity'] === 'number' ? formData['quantity'] : 1,
    materialType: typeof formData['materialType'] === 'string' ? formData['materialType'] : null,
    priceMin: typeof formData['priceMin'] === 'number' ? formData['priceMin'] : 0,
    priceMax: typeof formData['priceMax'] === 'number' ? formData['priceMax'] : 0,
    ...(parsedLineItems && parsedLineItems.length > 0 ? { lineItems: parsedLineItems } : {}),
    ...(saveOnly ? { saveOnly: true } : {}),
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
        ...(data.email ? { email: data.email } : {}),
        service: data.service,
        serviceSlug: data.serviceSlug,
        quantity: data.quantity,
        materialType: data.materialType,
        priceMin: data.priceMin,
        priceMax: data.priceMax,
        ...(data.lineItems ? { lineItems: data.lineItems } : {}),
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        message: 'Form submitted successfully (email sending not configured)',
        success: true,
      })
    }

    // Send email using Resend
    const resend = new Resend(resendApiKey)

    // In saveOnly mode (patient asked for estimate by email, not booking)
    // skip the admin notification — Dr. Petric doesn't need a callback lead
    // for someone who just wants to think it over.
    if (!data.saveOnly) {
      const { error } = await resend.emails.send({
        from: 'Dentcraft Website <noreply@dentcraft.ro>',
        html: priceEstimateAdminEmail({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          quantity: data.quantity,
          materialType: data.materialType,
          priceMin: data.priceMin,
          priceMax: data.priceMax,
          ...(data.lineItems ? { lineItems: data.lineItems } : {}),
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
    }

    // Send confirmation email to client (non-blocking)
    resend.emails.send({
      from: 'Dentcraft <noreply@dentcraft.ro>',
      html: priceEstimateConfirmationEmail({
        name: data.name,
        service: data.service,
        priceMin: data.priceMin,
        priceMax: data.priceMax,
      }),
      subject: `Estimare pret - ${data.service} | Dentcraft`,
      to: data.email,
    }).catch((err) => {
      console.error('Failed to send price estimate confirmation email:', err)
    })

    // Add contact to Resend for marketing (non-blocking)
    addContactToResend(data.email, data.name, 'price-estimate').catch(() => {})

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
