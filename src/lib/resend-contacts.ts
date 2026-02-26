import { Resend } from 'resend'

/**
 * Add a contact to Resend for marketing purposes.
 * Non-blocking — failures are logged but don't affect form submission.
 *
 * @param email - Contact email address
 * @param name - Contact full name
 * @param source - Where the contact came from (callback, contact, price-estimate)
 */
export async function addContactToResend(
  email: string,
  name: string,
  source: 'callback' | 'contact' | 'price-estimate'
): Promise<void> {
  const resendApiKey = process.env['RESEND_API_KEY']
  if (!resendApiKey) return

  try {
    const resend = new Resend(resendApiKey)

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || undefined

    await resend.contacts.create({
      email,
      firstName,
      ...(lastName ? { lastName } : {}),
      unsubscribed: false,
      properties: {
        source,
        addedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    // Don't let contact creation failure affect form submission
    console.error('Failed to add contact to Resend:', error)
  }
}
