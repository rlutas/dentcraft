# Dentcraft - Dental Clinic Website

A premium multilingual website for **Dentcraft Dental Clinic** in Satu Mare, Romania. Built with Next.js 15, Sanity CMS, and Tailwind CSS v4.

Live at: `dentcraft.ro` (pending deployment)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5.7, React 19 |
| Styling | Tailwind CSS v4 with custom design tokens |
| CMS | Sanity v4 (headless, Studio at `/studio`) |
| i18n | next-intl v4 (Romanian, English, Hungarian) |
| Email | Resend API (transactional emails) |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Features

### Pages (12 routes, all multilingual)
- **Homepage** - Hero section with team photo, services grid, team preview, testimonials slider, video testimonials, before/after gallery preview, Google reviews, FAQ accordion, location map, CTA sections
- **Services** (`/servicii`) - Service listing + individual service pages with benefits, process timeline, pricing
- **Team** (`/echipa`) - Team listing + individual doctor profile pages with education, certifications
- **Gallery** (`/galerie`) - Before/after comparison slider with drag interaction, modal viewer, keyboard navigation
- **Prices** (`/preturi`) - Price tables by service category + interactive price calculator (3-step: select service, options, results)
- **Blog** (`/blog`) - Blog listing with category filters + individual article pages with portable text rendering
- **FAQ** (`/faq`) - Grouped accordion by category
- **Testimonials** (`/testimoniale`) - Patient reviews and video testimonials
- **Contact** (`/contact`) - Contact form with file upload, Google Maps embed, working hours, WhatsApp quick contact
- **Legal** (`/politica-confidentialitate`, `/politica-cookies`, `/termeni-conditii`) - CMS-driven legal pages
- **404** - Custom not-found page

### Interactive Components
- **Price Calculator** - 3-step wizard: service selection, treatment options/quantity, cost estimate with disclaimer
- **Before/After Slider** - Touch-friendly draggable comparison with modal gallery
- **Callback Popup** - Appointment request form rendered via React Portal for proper z-index stacking
- **Cookie Consent** - GDPR-compliant 3-tier consent (Essential, Analytics, Marketing) with preferences modal
- **WhatsApp Button** - Floating action button with tooltip and pre-filled message
- **Video Testimonials** - YouTube/Vimeo embed player with custom overlay
- **Google Reviews Slider** - Auto-scrolling reviews with star ratings

### CMS (Sanity)
10 document schemas:
`service`, `teamMember`, `testimonial`, `beforeAfter`, `blogPost`, `blogCategory`, `faq`, `price`, `settings` (singleton), `legalPage`

5 object schemas:
`localizedString`, `localizedText`, `localizedPortableText`, `portableText`, `seo`

All content supports RO/EN/HU localization. The site operates with comprehensive fallback data when CMS is empty.

### SEO
- `generateMetadata` on every page with localized titles/descriptions
- Open Graph and Twitter Card tags
- JSON-LD structured data (Organization, MedicalBusiness, FAQPage, Article, BreadcrumbList)
- Dynamic `sitemap.xml` including all static + Sanity-driven pages
- `robots.txt` configuration
- Hreflang tags for all 3 languages

### Email
Two API routes powered by Resend:
- `POST /api/contact` - Full contact form (name, email, phone, subject, message, GDPR consent, file attachments)
- `POST /api/callback` - Quick callback request (name, phone, preferred service, preferred time)

Both include: server-side validation, in-memory rate limiting (5/min/IP), styled HTML email templates, graceful fallback when Resend is unavailable.

---

## Project Structure

```
src/
  app/
    [locale]/          # All pages (ro, en, hu)
      page.tsx         # Homepage (hero, services, team, testimonials, etc.)
      servicii/        # Services listing + [slug] detail
      echipa/          # Team listing + [slug] profile
      galerie/         # Before/after gallery
      preturi/         # Prices + calculator
      blog/            # Blog listing + [slug] article
      faq/             # FAQ accordion
      contact/         # Contact page
      testimoniale/    # Testimonials
      [...slug]/       # Legal pages catch-all
      not-found.tsx    # 404
      layout.tsx       # Root layout with providers
    api/
      contact/         # Contact form endpoint
      callback/        # Callback form endpoint
    studio/            # Sanity Studio (embedded)
    sitemap.ts         # Dynamic sitemap
    robots.ts          # Robots config
  components/
    features/          # Business logic components
      BeforeAfterGallery/    # Slider, modal, gallery grid
      CallbackPopup/         # Appointment request popup
      ContactForm/           # Contact form with validation
      ContactPageContent/    # Contact page layout
      CookieConsent/         # GDPR banner + preferences
      GoogleReviewsSlider/   # Auto-scrolling reviews
      PriceCalculator/       # 3-step calculator wizard
      VideoTestimonial/      # Video player component
      WhatsAppButton/        # Floating WhatsApp FAB
    layout/            # Header, Footer, MobileMenu
    ui/                # Accordion, BookingButton, PortableTextRenderer, Skeleton
  lib/
    constants/contact.ts  # Single source of truth for clinic info
    sanity/               # Client, image helper, GROQ queries
    fallback-services.ts  # Fallback service data
    fallback-team.ts      # Fallback team data
    schema.ts             # JSON-LD structured data generators
    seo.ts                # SEO metadata helper
    utils.ts              # Utility functions
  messages/            # Translation files (ro.json, en.json, hu.json)
  styles/globals.css   # Tailwind v4 config + custom CSS

sanity/
  schemas/
    documents/         # 10 document types
    objects/           # 5 reusable object types
  lib/                 # Desk structure, singleton config
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20 LTS)
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Fill in your values (see DEPLOYMENT.md for details)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the Romanian version.
Other languages: `/en`, `/hu`.

### Scripts

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier format
npm run format:check # Check formatting
npm run sync-reviews # Sync Google reviews to Sanity
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Sanity API version |
| `SANITY_API_TOKEN` | No | Sanity read token (for drafts) |
| `RESEND_API_KEY` | Yes | Resend API key for emails |
| `CONTACT_EMAIL` | No | Recipient for form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number (no `+`) |
| `NEXT_PUBLIC_PHONE_NUMBER` | Yes | Phone with `+` prefix |
| `NEXT_PUBLIC_EMAIL` | Yes | Public contact email |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup instructions.

---

## Internationalization

Three languages with localized routing:
- **Romanian** (default) - no prefix: `/servicii`, `/echipa`
- **English** - prefix: `/en/services`, `/en/team`
- **Hungarian** - prefix: `/hu/szolgaltatasok`, `/hu/csapat`

Translation files in `src/messages/` (ro.json, en.json, hu.json). All CMS content supports per-language fields via `localizedString` / `localizedText` schemas.

---

## Sanity CMS

Studio is embedded at `/studio` using `next-sanity`. Content types:

| Schema | Description |
|--------|-------------|
| `service` | Dental services with localized content |
| `teamMember` | Doctors and staff profiles |
| `testimonial` | Patient reviews (text + video) |
| `beforeAfter` | Treatment result galleries |
| `blogPost` | Blog articles |
| `blogCategory` | Blog categories |
| `faq` | Frequently asked questions |
| `price` | Treatment pricing |
| `settings` | Global site settings (singleton) |
| `legalPage` | Privacy policy, terms, etc. |

The site works fully without CMS data using hardcoded fallback content for services, team members, and contact info.

---

## Deployment

The project is configured for **Vercel** deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Environment variable setup
- Resend email configuration with domain verification
- Custom domain (dentcraft.ro) DNS setup
- Post-deployment checklist

---

## Current Status

All 48 user stories from the PRD are complete:
- Phase 1: CMS Foundation (US-001 to US-012) - Done
- Phase 2: Inner Pages (US-013 to US-025) - Done
- Phase 3: Interactive Features (US-026 to US-036) - Done
- Phase 4: Polish & SEO (US-037 to US-042) - Done
- Phase 5: Contact & Maps (US-043 to US-048) - Done

### Remaining items before production:
- Verify Resend domain (`dentcraft.ro`) for email delivery
- Replace placeholder video testimonial URLs with real content
- Add OG default image (`public/images/og-default.jpg`)
- Integrate Google Analytics tracking code (consent UI is ready)
- Add real team photos and clinic photos to Sanity CMS
- Deploy to Vercel and configure custom domain

---

## License

Private project. All rights reserved.
