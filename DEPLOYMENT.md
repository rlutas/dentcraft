# Deployment Guide - Dentcraft

Dentcraft is a Next.js 15 website for a dental clinic, using Sanity CMS, Resend for transactional emails, and next-intl for multi-language support (Romanian, English, Hungarian). This guide covers everything needed to deploy the project to Vercel.

---

## Prerequisites

- **Node.js 18+** (recommended: Node.js 20 LTS)
- **Vercel account** (free tier is sufficient)
- **Resend account** at [resend.com](https://resend.com) (for contact/callback form emails)
- **Sanity CMS project** (already configured, project ID: see env vars below)
- **GitHub repository** connected to Vercel for CI/CD

---

## Environment Variables

All environment variables must be configured in your Vercel project settings under **Settings > Environment Variables**.

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` | Full production URL (e.g., `https://dentcraft.ro`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | - | Sanity project ID (e.g., `your_project_id`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | `production` | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | `2024-01-01` | Sanity API version date string |
| `SANITY_API_TOKEN` | No | - | Sanity read token for draft/preview mode |
| `RESEND_API_KEY` | Yes* | - | Resend API key for sending emails (e.g., `re_xxxxxxxxxxxxx`) |
| `CONTACT_EMAIL` | No | `dentcraftsm@gmail.com` | Email address that receives form submissions |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | - | WhatsApp number without `+` prefix (e.g., `40741199977`) |
| `NEXT_PUBLIC_PHONE_NUMBER` | Yes | - | Phone number with `+` prefix (e.g., `+40741199977`) |
| `NEXT_PUBLIC_EMAIL` | Yes | - | Public-facing contact email (e.g., `dentcraftsm@gmail.com`) |
| `NEXT_PUBLIC_GA_ID` | No | - | Google Analytics measurement ID (e.g., `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | No | - | Google Maps API key for embedded map |

> *`RESEND_API_KEY` is required for email delivery. Without it, contact and callback forms will still accept submissions (returning success to users) but no email will be sent. Submissions are logged to the server console instead.

**IMPORTANT:** Never commit `.env.local` or any file containing actual secret values to version control. The `.env.local` file in the repo should only contain placeholder or development values.

---

## Email Setup (Resend)

The site has two forms that send emails via [Resend](https://resend.com):

- **Contact form** (`/api/contact`) - Full contact form with name, email, phone, subject, message, and GDPR consent
- **Callback form** (`/api/callback`) - Quick callback request with name, phone, service, and time preference

Both forms send styled HTML emails to the configured `CONTACT_EMAIL` address. Emails are sent from `noreply@dentcraft.ro`.

### Step-by-step setup:

1. **Create an account** at [resend.com](https://resend.com)

2. **Add your domain** `dentcraft.ro` in the Resend dashboard under **Domains**

3. **Add the required DNS records** to your domain registrar. Resend will provide:
   - **MX record** - For receiving bounces and replies
   - **SPF record** (TXT) - Authorizes Resend to send on behalf of your domain
   - **DKIM record** (TXT) - Cryptographic signature for email authentication

4. **Wait for domain verification** - Resend will verify DNS records (can take up to 48 hours, usually much faster)

5. **Create an API key** in the Resend dashboard under **API Keys**
   - Scope: `Sending access` is sufficient
   - Copy the key immediately (it is only shown once)

6. **Set the environment variable** in Vercel:
   - Go to your Vercel project > **Settings** > **Environment Variables**
   - Add `RESEND_API_KEY` with the value from step 5
   - Apply to Production, Preview, and Development environments as needed

> **Note:** Until the domain `dentcraft.ro` is fully verified in Resend, email sending will fail. The contact and callback forms are designed to handle this gracefully -- they will still show a success message to users, but no email is actually sent. Check the Vercel function logs for error details if emails are not being delivered.

---

## Deploy to Vercel

### Initial setup:

1. **Connect your GitHub repository**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click **Add New > Project**
   - Import the `dentcraft` repository from GitHub

2. **Configure the project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

3. **Set environment variables**
   - Add all required environment variables from the table above
   - Ensure `NEXT_PUBLIC_SITE_URL` is set to the production URL

4. **Deploy**
   - Click **Deploy** and wait for the build to complete
   - Subsequent pushes to `main` will auto-deploy

### Build scripts reference:

```bash
npm run build        # Production build
npm run dev          # Local development server (with Turbopack)
npm run start        # Start production server locally
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run sync-reviews # Sync Google reviews to Sanity (manual script)
```

---

## Custom Domain Setup

1. In Vercel, go to your project > **Settings** > **Domains**
2. Add `dentcraft.ro` and `www.dentcraft.ro`
3. Configure DNS at your domain registrar:
   - `dentcraft.ro` -> A record pointing to Vercel's IP (`76.76.21.21`)
   - `www.dentcraft.ro` -> CNAME record pointing to `cname.vercel-dns.com`
4. Vercel will automatically provision SSL certificates
5. Update `NEXT_PUBLIC_SITE_URL` to `https://dentcraft.ro`

---

## Post-Deployment Checklist

### Core functionality:
- [ ] Verify Sanity CMS connection (homepage loads content from CMS)
- [ ] Test contact form email delivery (`/contact` page)
- [ ] Test callback form email delivery (callback popup)
- [ ] Verify WhatsApp floating button opens correct chat

### SEO and metadata:
- [ ] Verify `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Verify `robots.txt` is accessible at `/robots.txt`
- [ ] Check OG image renders correctly on social media sharing (use [opengraph.xyz](https://opengraph.xyz))
- [ ] Verify canonical URLs are correct

### Internationalization:
- [ ] Test Romanian version (`/ro`)
- [ ] Test English version (`/en`)
- [ ] Test Hungarian version (`/hu`)
- [ ] Verify language switcher works correctly

### Integrations:
- [ ] Verify Google Maps embed loads on contact page
- [ ] Check Google Reviews section displays correctly
- [ ] Set up custom domain `dentcraft.ro`
- [ ] Configure Google Analytics (if `NEXT_PUBLIC_GA_ID` is set)

---

## Known Limitations

- **Rate limiting is in-memory** - The contact and callback form rate limiting (5 requests per minute per IP) uses an in-memory `Map`. This resets on every serverless cold start, meaning the rate limit is not persistent across function invocations. For stricter rate limiting in production, consider migrating to Redis or Vercel KV.

- **Video testimonials use placeholder URLs** - The video testimonials section currently references placeholder YouTube URLs that need to be replaced with actual client testimonial videos.

- **Google Analytics not yet integrated** - The `NEXT_PUBLIC_GA_ID` environment variable is defined but Google Analytics tracking code has not been fully integrated. Cookie consent UI is ready and waiting for the analytics implementation.

- **Email fallback behavior** - When `RESEND_API_KEY` is not configured or email sending fails, forms return success to the user without actually delivering an email. Form submissions are logged to the server console in this case.

- **Sanity preview/draft mode** - The `SANITY_API_TOKEN` is optional. Without it, only published content is visible. Draft/preview functionality requires this token.

---

## Troubleshooting

### Emails not sending
1. Check that `RESEND_API_KEY` is set in Vercel environment variables
2. Verify the domain `dentcraft.ro` is verified in the Resend dashboard
3. Check Vercel function logs for error messages from the `/api/contact` or `/api/callback` routes

### Sanity content not loading
1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are correct
2. Check the Sanity project CORS settings include your Vercel deployment URL
3. Ensure content is published (not in draft state) unless preview mode is configured

### Build failures
1. Run `npm run typecheck` locally to catch TypeScript errors
2. Run `npm run lint` to catch linting issues
3. Ensure all required environment variables are set (especially `NEXT_PUBLIC_*` vars needed at build time)
