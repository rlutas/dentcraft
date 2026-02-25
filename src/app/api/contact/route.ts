import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactAdminEmail, contactConfirmationEmail } from '@/lib/email-templates'

// Rate limiting store (in-memory, resets on server restart)
// For production, use Redis or similar persistent store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Configuration
const RATE_LIMIT_MAX = 5 // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute window

// Contact form data type
type ContactFormData = {
  email: string
  gdprConsent: boolean
  message: string
  name: string
  phone?: string
  subject: string
}

// Subject labels for email
const subjectLabels: Record<string, string> = {
  appointment: 'Reprogramare',
  consultation: 'Programare consultatie',
  other: 'Altele',
  pricing: 'Informatii preturi',
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Validate phone format (optional field)
function isValidPhone(phone: string | undefined): boolean {
  if (!phone || phone.trim() === '') return true // Empty is valid (optional)
  return /^[0-9+\s()-]{6,20}$/.test(phone)
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
    // New window
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000)
    return { allowed: false, retryAfter }
  }

  // Increment count
  record.count++
  return { allowed: true }
}

// Validate form data
function validateFormData(
  data: unknown
): { errors: Record<string, string>; valid: false } | { data: ContactFormData; valid: true } {
  const errors: Record<string, string> = {}

  if (!data || typeof data !== 'object') {
    return { errors: { general: 'Invalid request body' }, valid: false }
  }

  const formData = data as Record<string, unknown>

  // Name validation
  if (!formData['name'] || typeof formData['name'] !== 'string' || formData['name'].trim().length < 2) {
    errors['name'] = 'Name must be at least 2 characters'
  }

  // Email validation
  if (!formData['email'] || typeof formData['email'] !== 'string' || !isValidEmail(formData['email'])) {
    errors['email'] = 'Valid email address is required'
  }

  // Phone validation (optional)
  if (!isValidPhone(formData['phone'] as string | undefined)) {
    errors['phone'] = 'Invalid phone number format'
  }

  // Subject validation
  if (!formData['subject'] || typeof formData['subject'] !== 'string' || !subjectLabels[formData['subject']]) {
    errors['subject'] = 'Please select a valid subject'
  }

  // Message validation
  if (!formData['message'] || typeof formData['message'] !== 'string' || formData['message'].trim().length < 10) {
    errors['message'] = 'Message must be at least 10 characters'
  }

  // GDPR consent validation
  if (!formData['gdprConsent']) {
    errors['gdprConsent'] = 'You must accept the privacy policy'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, valid: false }
  }

  const phoneValue = formData['phone'] ? (formData['phone'] as string).trim() : ''
  const resultData: ContactFormData = {
    email: (formData['email'] as string).trim(),
    gdprConsent: Boolean(formData['gdprConsent']),
    message: (formData['message'] as string).trim(),
    name: (formData['name'] as string).trim(),
    subject: formData['subject'] as string,
  }

  // Only add phone if it has a value (exactOptionalPropertyTypes compliance)
  if (phoneValue) {
    resultData.phone = phoneValue
  }

  return {
    data: resultData,
    valid: true,
  }
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
      console.log('Contact form submission (no RESEND_API_KEY configured):', {
        email: data.email,
        message: data.message.substring(0, 100) + '...',
        name: data.name,
        phone: data.phone,
        subject: data.subject,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        message: 'Form submitted successfully (email sending not configured)',
        success: true,
      })
    }

    // Send emails using Resend
    const resend = new Resend(resendApiKey)
    const subjectLabel = subjectLabels[data.subject] || data.subject

    // Send admin notification
    const { error } = await resend.emails.send({
      from: 'Dentcraft Website <noreply@dentcraft.ro>',
      html: contactAdminEmail({
        name: data.name,
        email: data.email,
        ...(data.phone ? { phone: data.phone } : {}),
        subject: data.subject,
        subjectLabel,
        message: data.message,
        gdprDate: new Date().toISOString(),
      }),
      replyTo: data.email,
      subject: `[Dentcraft Contact] ${subjectLabel} - ${data.name}`,
      to: recipientEmail,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 })
    }

    // Send confirmation email to client (non-blocking)
    resend.emails.send({
      from: 'Dentcraft <noreply@dentcraft.ro>',
      html: contactConfirmationEmail({
        name: data.name,
        subjectLabel,
      }),
      subject: 'Am primit mesajul tau - Dentcraft',
      to: data.email,
    }).catch((err) => {
      console.error('Failed to send confirmation email:', err)
    })

    return NextResponse.json({
      message: 'Your message has been sent successfully!',
      success: true,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 })
  }
}

