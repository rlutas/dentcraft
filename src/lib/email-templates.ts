// Shared email template components for DentCraft
// Used by all API routes that send emails via Resend

// HTML escaping to prevent XSS in email content
function esc(text: string): string {
  const entities: Record<string, string> = {
    '"': '&quot;',
    '&': '&amp;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;',
  }
  return text.replace(/[&<>"']/g, (c) => entities[c] || c)
}

const LOGO_URL = 'https://dentcraft.ro/branding/LOGO_BLACK_FINAL.png'
const BRAND_COLOR = '#1a1a1a'
const ACCENT_COLOR = '#d4c4b0'
const BG_COLOR = '#f9f6f1'
const BORDER_COLOR = '#f0ebe3'

// Reusable email wrapper with logo header and footer
export function emailWrapper(content: string, options?: { footerNote?: string }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <!-- Header with Logo -->
      <div style="padding: 32px 24px 24px; text-align: center; border-bottom: 2px solid ${ACCENT_COLOR};">
        <img src="${LOGO_URL}" alt="Dentcraft" width="180" height="25" style="height: 25px; width: auto;" />
      </div>
      <!-- Content -->
      ${content}
      <!-- Footer -->
      <div style="background: ${BG_COLOR}; padding: 20px 24px; border-top: 1px solid ${BORDER_COLOR}; text-align: center;">
        ${options?.footerNote ? `<p style="margin: 0 0 12px; color: #8b8b8b; font-size: 12px;">${options.footerNote}</p>` : ''}
        <p style="margin: 0; color: #8b8b8b; font-size: 11px;">
          Dentcraft &middot; Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare<br>
          Tel: <a href="tel:+40741199977" style="color: #8b8b8b;">0741 199 977</a> &middot;
          <a href="https://dentcraft.ro" style="color: #8b8b8b;">dentcraft.ro</a>
        </p>
      </div>
    </div>
  `
}

// Admin notification: Contact form
export function contactAdminEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  subjectLabel: string
  message: string
  gdprDate: string
}) {
  const content = `
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 20px; color: ${BRAND_COLOR}; font-size: 18px; font-weight: 600;">Mesaj nou din formularul de contact</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 120px;">Nume:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 120px;">Email:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;"><a href="mailto:${esc(data.email)}" style="color: ${BRAND_COLOR};">${esc(data.email)}</a></td>
        </tr>
        ${data.phone ? `<tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 120px;">Telefon:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;"><a href="tel:${esc(data.phone)}" style="color: ${BRAND_COLOR}; font-weight: 600;">${esc(data.phone)}</a></td>
        </tr>` : ''}
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 120px;">Subiect:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.subjectLabel)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 120px;">Mesaj:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a; white-space: pre-wrap;">${esc(data.message)}</td>
        </tr>
      </table>
    </div>
  `
  return emailWrapper(content, {
    footerNote: `Trimis prin formularul de contact &middot; Acord GDPR: ${data.gdprDate}`,
  })
}

// Client confirmation: Contact form
export function contactConfirmationEmail(data: {
  name: string
  subjectLabel: string
}) {
  const firstName = esc(data.name.split(' ')[0] || data.name)
  const content = `
    <div style="padding: 32px 24px;">
      <h2 style="margin: 0 0 16px; color: ${BRAND_COLOR}; font-size: 20px; font-weight: 600;">Multumim, ${firstName}!</h2>
      <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
        Am primit mesajul tau referitor la <strong>${esc(data.subjectLabel.toLowerCase())}</strong> si te vom contacta in cel mai scurt timp posibil.
      </p>
      <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
        Programul nostru este <strong>Luni - Vineri, 10:00 - 18:00</strong>. Daca ai trimis mesajul in afara programului, te vom contacta in prima zi lucratoare.
      </p>
      <div style="text-align: center; padding: 20px 0;">
        <a href="tel:+40741199977" style="display: inline-block; background: ${BRAND_COLOR}; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Suna-ne: 0741 199 977
        </a>
      </div>
    </div>
  `
  return emailWrapper(content)
}

// Admin notification: Callback request
export function callbackAdminEmail(data: {
  name: string
  phone: string
  service?: string
  timePreference?: string
  doctor?: string
}) {
  const rows = [
    `<tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 140px;">Nume:</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.name)}</td>
    </tr>`,
    `<tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 140px;">Telefon:</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;"><a href="tel:${esc(data.phone)}" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: 600;">${esc(data.phone)}</a></td>
    </tr>`,
  ]

  if (data.doctor) {
    rows.push(`<tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 140px;">Doctor:</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.doctor)}</td>
    </tr>`)
  }

  if (data.service) {
    rows.push(`<tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 140px;">Serviciu:</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.service)}</td>
    </tr>`)
  }

  if (data.timePreference) {
    rows.push(`<tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 140px;">Preferinta:</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.timePreference)}</td>
    </tr>`)
  }

  const content = `
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 20px; color: ${BRAND_COLOR}; font-size: 18px; font-weight: 600;">Cerere noua de programare</h2>
      <p style="margin: 0 0 16px; color: #8b8b8b; font-size: 14px;">Un client doreste sa fie contactat telefonic</p>
      <table style="border-collapse: collapse; width: 100%;">
        ${rows.join('')}
      </table>
    </div>
  `
  return emailWrapper(content, {
    footerNote: `Trimis prin formularul de programare &middot; ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}`,
  })
}

// Admin notification: Price estimate
export function priceEstimateAdminEmail(data: {
  name: string
  phone: string
  service: string
  quantity: number
  materialType?: string | null
  priceMin: number
  priceMax: number
}) {
  const formatPrice = (n: number) => n.toLocaleString('ro-RO')

  const materialLabels: Record<string, string> = {
    premium: 'Premium',
    standard: 'Standard',
  }

  const content = `
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 20px; color: ${BRAND_COLOR}; font-size: 18px; font-weight: 600;">Noua estimare de pret</h2>
      <p style="margin: 0 0 16px; color: #8b8b8b; font-size: 14px;">Un client a solicitat o estimare de pret prin calculator</p>

      <h3 style="margin: 0 0 12px; color: ${BRAND_COLOR}; font-size: 15px; font-weight: 600;">Date client</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 160px;">Nume:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 160px;">Telefon:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;"><a href="tel:${esc(data.phone)}" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: 600;">${esc(data.phone)}</a></td>
        </tr>
      </table>

      <h3 style="margin: 0 0 12px; color: ${BRAND_COLOR}; font-size: 15px; font-weight: 600;">Detalii estimare</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 160px;">Serviciu:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${esc(data.service)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 160px;">Cantitate:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${data.quantity} ${data.quantity > 1 ? 'unitati' : 'unitate'}</td>
        </tr>
        ${data.materialType ? `<tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 160px;">Material:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: #4a4a4a;">${materialLabels[data.materialType] || data.materialType}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 160px;">Pret estimat:</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER_COLOR}; color: ${BRAND_COLOR}; font-weight: 700; font-size: 16px;">${formatPrice(data.priceMin)} - ${formatPrice(data.priceMax)} RON</td>
        </tr>
      </table>
    </div>
  `
  return emailWrapper(content, {
    footerNote: `Trimis prin calculatorul de preturi &middot; ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}`,
  })
}
