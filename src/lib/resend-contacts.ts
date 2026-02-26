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
  const audienceId = process.env['RESEND_AUDIENCE_ID']
  if (!resendApiKey || !audienceId) {
    console.warn('Resend contact not added: missing RESEND_API_KEY or RESEND_AUDIENCE_ID')
    return
  }

  try {
    const resend = new Resend(resendApiKey)

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || undefined

    const { data, error } = await resend.contacts.create({
      audienceId,
      email,
      firstName,
      ...(lastName ? { lastName } : {}),
      unsubscribed: false,
    })

    if (error) {
      console.error('Resend contacts.create error:', error)
    } else {
      console.warn('Contact added to Resend:', data?.id, email, source)
    }
  } catch (error) {
    console.error('Failed to add contact to Resend:', error)
  }
}
