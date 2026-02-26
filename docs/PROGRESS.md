# Dentcraft.ro - Project Status

**Last updated:** 26 February 2026

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v3 (project `4w5dvd6h`, dataset `production`) |
| Animation | Framer Motion |
| i18n | next-intl (ro, en, hu) |
| Email | Resend v6.7.0 (domain: dentcraft.ro) |
| Analytics | Vercel Analytics + Vercel Speed Insights |
| Icons | Lucide React + 110 custom dental SVGs in `/public/icons/` |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#faf6f1`, `#f5f0e8` | Page backgrounds, section alternation |
| Accent | `#d4c4b0`, `#8b7355` | Badges, borders, warm highlights |
| Dark | `#2a2118`, `#1a1a1a` | Text, footer, dark sections |
| Cards | `#ffffff` | Card surfaces |

Premium/luxury dental clinic aesthetic with warm earth-tone palette. Sections alternate between beige and white backgrounds. Full spec in `/docs/DESIGN-STANDARD.md`.

---

## Completed Features

### Pages

| Route | Status | Key Features |
|-------|--------|--------------|
| `/` (Homepage) | Done | Hero, Services grid, Why Us, Team (7 real photos), Google Reviews (34 with text), Before/After gallery, Video Testimonials, Footer CTA |
| `/echipa` | Done | Team listing with premium cards, ScrollReveal animations |
| `/echipa/[slug]` | Done | Redesigned 24 Feb: dark editorial hero, animated photo entrance, breadcrumbs, Video Shorts placeholder, "Parcurs Profesional" timeline, stats row, TeamMemberBookingButton (doctor pre-selection), mobile-first layout |
| `/servicii` | Done | Service categories grid (9 services) |
| `/servicii/[slug]` | Done | Individual service pages |
| `/galerie` | Done | Premium redesigned gallery with before/after cards (glassmorphism labels, hover effects), "Clinica Noastra" photo section (masonry grid, lightbox), filter pills |
| `/blog` | Done | Blog listing with category filters, pagination, dark editorial hero |
| `/preturi` | Done | Dark editorial hero, Price Calculator (3-step flow), Tabbed price list (7 categories, 81 treatments), PriceEstimatePopup lead form, disclaimer |
| `/contact` | Done | Premium design with Framer Motion, quick contact cards, Google Maps embed, file upload form (drag-drop, 5 files max) |

### Layout Components

| Component | Status | Details |
|-----------|--------|---------|
| Header | Done | Uppercase nav, animated underlines, services dropdown (9 services, 340px, 2-col), language switcher, CTA opens callback popup |
| Footer | Done | Dark gradient, 4 columns (Brand, Quick Links, Services, Contact), CTA banner, grain texture, i18n routing |
| Mobile Menu | Done | Services accordion, CTA opens callback popup, touch-friendly (44px targets) |

### Feature Components

| Component | Location | Details |
|-----------|----------|---------|
| PriceCalculator | `/src/components/features/PriceCalculator/` | 3-step wizard: ServiceSelect -> OptionsForm (quantity, material) -> Results with price range. 6 sub-components. |
| TabbedPriceList | `/src/components/features/TabbedPriceList/` | Animated tabs with custom dental SVG icons per category. Fetches from Sanity; falls back to 81 hardcoded treatments. |
| PriceEstimatePopup | Part of PriceCalculator | Lead capture form (name, phone, email — all required). Sends via Resend email + adds to Resend Audiences. Portal-rendered modal. |
| CallbackPopup | `/src/components/features/CallbackPopup/` | Appointment request modal (name, phone, email — all required, service dropdown, time preference). Focus trap, ESC close, i18n. Triggered from Header/Mobile CTA buttons. Supports `defaultDoctor` prop for pre-selection. |
| TeamMemberBookingButton | `/src/app/[locale]/echipa/[slug]/page.tsx` | Context-aware booking button: doctors get popup pre-filled with their name; assistants get general popup. |
| WhatsAppButton | `/src/components/features/WhatsAppButton/` | Floating button with wrapper for client-side rendering |
| GoogleReviewsSlider | `/src/components/features/GoogleReviewsSlider/` | Compact trust badge (4.9 rating), 34 text reviews, inline action buttons |
| BeforeAfterGallery | `/src/components/features/BeforeAfterGallery/` | ComparisonSlider with touch support, GalleryModal for full-screen view |
| ContactPageContent | `/src/components/features/ContactPageContent/` | Client component with floating orbs, quick contact cards, two-column layout, file upload form |
| ScrollReveal | `/src/components/ui/ScrollReveal.tsx` | Reusable scroll-triggered fade-up animation wrapper |
| GalleryPageClient | `/src/app/[locale]/galerie/GalleryPageClient.tsx` | Premium gallery with before/after cards, clinic photo masonry grid, lightbox modal, staggered animations |

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/callback` | Callback request form submission with rate limiting (5 req/min), Resend email + Resend Audiences contact collection |
| `/api/contact` | Contact form submission with file attachments, rate limiting, Resend email + Resend Audiences |
| `/api/price-estimate` | Price estimate lead form, rate limiting, Resend email + Resend Audiences |

### Cross-Cutting

- **SEO metadata** on all pages (US-037) via `generatePageMetadata` utility
- **Internationalization** (ro, en, hu) with next-intl -- all UI strings translated
- **ScrollReveal animations** on all homepage sections with staggered delays
- **Mobile-responsive** design throughout (tested on all pages)
- **Sanity CMS** schemas: Services, Team Members, Testimonials, Before/After Cases, Blog Posts, Prices, Settings
- **Fallback data** for team (`/src/lib/fallback-team.ts` — 7 members), services (`/src/lib/fallback-services.ts`), and prices (inline in TabbedPriceList) when Sanity has insufficient content
- **Email marketing** — all form submissions auto-add contacts to Resend Audiences (via `/src/lib/resend-contacts.ts`)
- **Legal pages** — Privacy Policy, Cookie Policy, Terms & Conditions in 3 languages with card-style quick links
- **Cookie consent** — GDPR-compliant banner with Accept All / Essential Only / Customize
- **Vercel Analytics + Speed Insights** — cookieless, placed outside NextIntlClientProvider
- **Domain redirect** — dentcraft.vercel.app → www.dentcraft.ro (301 via middleware)
- **Security headers** — configured in next.config.ts
- **Hreflang** — locale-aware canonical tags for all pages
- **Sitemap** — 54+ URLs including all service pages and legal pages
- **Gallery photos data** (`/src/data/gallery-photos.ts`) — static list of clinic/team photos, user adds images to `/public/images/gallery/` and updates the data file

---

## Session Log

### 26 February 2026

**Team Updates:**
- Added 7th team member: Calugher Ionela (4th assistant) — photo + fallback data in `/src/lib/fallback-team.ts`

**PageSpeed Insights Optimizations (Part 1):**
- Fixed WCAG contrast ratios on hero floating cards (`#8b7a68` → `#6b5a48`)
- Added aria-labels to 3 YouTube video reel links
- Converted non-composited animations to GPU-friendly properties: `left` → `transform: translateX()`, `box-shadow` → `filter: drop-shadow()`, merged heroCardPop + heroCardFloat keyframes
- Result: Accessibility 93 → 100, non-composited animations 5 → 1

**PageSpeed Insights Optimization (Part 2 — continued):**
- Full PSI mobile analysis via Playwright browser automation
- Scores: Performance 94, Accessibility 93, Best Practices 100, SEO 100
- Fixed non-composited animation on `.btn` class: changed `transition: all 0.3s ease` to specific compositable properties (`background-color, border-color, color, transform, filter`)
- Updated BookingButton component to use specific transition properties instead of `transition-all`
- Added modern browserslist config to `package.json` — targets last 2 versions of Chrome, Firefox, Safari, Edge to reduce legacy polyfills
- Confirmed already-deployed fixes: accessibility contrast (#6b5a48 on white = 6.6:1 WCAG AA), video reel aria-labels, GPU-composited animations (from commit `b55000a`)
- **Limitations identified (3rd party / framework, can't fix):**
  - Unused JS from GTM (118+60 KiB) — 3rd party script
  - Render-blocking CSS (23+2.4 KiB) — Next.js default behavior
  - Legacy JS polyfills (12 KiB) — from dependencies
  - CLS 0.065 — under "Good" threshold (0.1), caused by font swap

**Key commits (PageSpeed):** `b55000a` (accessibility+animations), `2de5d3c` (transitions+browserslist)

**Vercel Domain & Analytics:**
- Configured middleware 301 redirect: dentcraft.vercel.app → www.dentcraft.ro
- Added `host` directive to robots.ts
- Installed `@vercel/speed-insights` v1.3.1 + `<SpeedInsights />` in layout
- Installed `@vercel/analytics` v1.6.1 + `<Analytics />` in layout
- Moved both components outside `NextIntlClientProvider` for proper mobile data collection

**Legal & Privacy Updates:**
- Updated Privacy Policy in all 3 languages (ro/en/hu) to mention Vercel Analytics and Speed Insights as cookieless services
- Updated Cookie Policy in all 3 languages with Vercel service descriptions
- Updated `lastUpdated` dates to 2026-02-26 across all legal pages
- Redesigned legal page quick links section: card-style links with Shield/Cookie/FileText icons, hover effects, "Inapoi acasa" link

**ESLint Fixes (deployment was failing):**
- Fixed `NextRequest` type import in middleware.ts (`@typescript-eslint/consistent-type-imports`)
- Fixed import order violations across 5 files
- Fixed `jsx-sort-props` warnings (callbacks after other props)

**Email Marketing & Forms:**
- Made email field **required** in CallbackPopup and PriceEstimatePopup (was optional)
- Created `/src/lib/resend-contacts.ts` — shared utility for Resend Audiences integration
- All 3 API routes (callback, contact, price-estimate) now auto-add contacts to Resend Audience
- Requires `RESEND_AUDIENCE_ID` env variable (set on Vercel)
- Updated translations in ro/en/hu: removed "(optional)" from email labels, added `emailRequired` error messages

**SEO (from previous sessions, now tracked):**
- Comprehensive SEO audit fixes: security headers, schemas, i18n, legal pages
- Added 54 missing URLs to sitemap (services + legal pages)
- Hreflang canonical tags made locale-aware (critical SEO fix)

### 24 February 2026

**Team & Content Updates:**
- Updated Danci Ionela-Mikaela team photo (replaced edited version over original)
- Updated years of experience from 5+ to 10+ across the entire site (hero trust bar + Why Us stats)
- Fixed Dr. Petric bio: changed 15 years to 10 years experience
- Exported all pricing data to CSV (`/preturi-dentcraft.csv`) - 80 treatments across 7 categories for Dr. Petric to verify
- Analyzed entire site content gaps using AI agents
- Prepared WhatsApp message for Dr. Petric listing all content needs

**Team Member Profile Pages (`/echipa/[slug]`) - Complete Redesign:**
- Dark editorial hero matching team listing page style
- Fixed mobile photo visibility (was broken, now works)
- Mobile layout: text first, then photo below
- Desktop layout: text left, photo right (550px, pushed to right edge)
- Animated photo entrance (slides in from right) + warm glow pulse behind
- Expert badge with pop-in animation
- Name displayed on two lines for long names
- Breadcrumb navigation added
- NEW: Video Shorts section (placeholder, ready for YouTube URLs)
- Redesigned About section with stats row (years experience, patients, specializations) + photo gallery placeholder
- Combined Education + Certifications into "Parcurs Profesional" timeline
- Removed duplicate bottom CTA (already in footer)

**TeamMemberBookingButton Component:**
- For doctors: popup pre-filled with doctor's name
- For assistants: general popup without doctor pre-selection
- Added `defaultDoctor` prop to CallbackPopup
- API route updated to include doctor in email notification
- Added translations for "Medic selectat" in ro/en/hu

**New CSS Animations:**
- `team-photo-entrance` - slide-in from right for profile photos
- `team-photo-glow` - warm glow pulse behind team photos
- `team-badge-pop` - pop-in animation for expert badge

**Attempted & Reverted:**
- Hero redesign with AI-generated smile photo + animated circle (reverted - user preference)

### 19 February 2026

- Added real team photos for all 6 members (transparent PNGs)
- Redesigned Google Reviews section (compact trust badge, filtered 34 text reviews)
- Redesigned Before/After section (premium cards, ScrollReveal, frosted glass badges)
- Fixed ComparisonSlider touchmove cancelable warning

### 3 February 2026

- Contact page redesign with Framer Motion
- Callback request popup component
- Header services dropdown + mobile accordion
- Footer i18n routing fix
- DESIGN-STANDARD.md created

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| Turbopack cache corruption | Low | Workaround: `rm -rf .next` and restart dev server |
| GA4 property not configured | Medium | GTM integration exists but no GA4 property ID set |
| Facebook Pixel not set up | Low | Not implemented yet |

---

## Content Needed from Client

See also: `/docs/content-needs-dr-petric.md` for the complete list sent to Dr. Petric.

- [ ] **CV-uri echipa** (all 7 members) - studies, specializations, courses/certifications, experience, years of practice
- [ ] **Video Reels echipa** - Short videos (30-60s) of each team member, uploaded to YouTube Shorts
- [ ] **Testimoniale video pacienti** - Short patient testimonial videos (30-60s), YouTube Shorts, with name + treatment text
- [ ] **Continut blog** - Articles about treatments, dental tips. Text + photos. 3-5 articles to start.
- [ ] **Poze Before/After** - Pairs (before + after) + description: treatment type, duration, etc. (10-15 cases)
- [ ] **Lista preturi actualizata** - CSV exported at `/preturi-dentcraft.csv` (80 treatments, 7 categories). Dr. Petric needs to verify and return corrections.
- [x] Clinic photos (reception, treatment rooms) -- 12 photos added, folder ready at `/public/images/gallery/` for more
- [x] Team photos (all 7 members with transparent PNGs) -- completed 19 Feb 2026, Calugher Ionela added 26 Feb
- [ ] Logo vector (SVG/PNG)
- [ ] Google My Business access
- [ ] Social media links (Instagram, Facebook)

---

## Not Yet Implemented

| Feature | Priority | Notes |
|---------|----------|-------|
| Google Analytics (GA4) integration | Medium | GTM exists, needs GA4 property ID |
| Facebook Pixel | Low | Not implemented |
| Blog search | Low | Blog listing works, search not built |
| Blog social share buttons | Low | Not implemented |
| Video Shorts per team member | Medium | Placeholder ready in `/echipa/[slug]`, needs YouTube URLs from client |
| Gallery photos per team member | Medium | `PhotoGalleryPlaceholder` shows "coming soon", needs per-member photo arrays |
| Newsletter signup | Low | Form + API route (Resend Audiences ready) |
| Error monitoring (Sentry) | Low | Not set up |

### Already Completed (previously listed as TODO)
- ~~Vercel deployment~~ — DONE (deployed, env vars configured)
- ~~Cookie consent banner~~ — DONE (CookieConsent component with 3 options)
- ~~Legal pages~~ — DONE (privacy, cookies, terms in 3 languages)
- ~~Blog individual article pages~~ — DONE (Sanity PortableText renderer)
- ~~FAQ page with accordion~~ — DONE (FAQ accordion in service pages)

---

## Key File Paths

```
src/app/[locale]/page.tsx                    # Homepage with all sections
src/app/[locale]/preturi/page.tsx            # Pricing page (server component, 80 treatments)
src/app/[locale]/contact/page.tsx            # Contact page
src/app/[locale]/echipa/page.tsx             # Team listing
src/app/[locale]/echipa/[slug]/page.tsx      # Individual team member profiles (redesigned 24 Feb)
src/app/[locale]/servicii/page.tsx           # Services listing
src/app/[locale]/galerie/page.tsx            # Gallery page
src/app/[locale]/blog/page.tsx               # Blog listing (no CTA, footer handles it)
src/data/gallery-photos.ts                   # Gallery clinic/team photo data
src/app/api/callback/route.ts               # Callback API with Resend + rate limiting
src/components/layout/Header.tsx             # Header with services dropdown
src/components/layout/Footer.tsx             # Footer with i18n routing
src/components/layout/MobileMenu.tsx         # Mobile menu with services accordion
src/components/features/CallbackPopup/       # Booking popup (supports defaultDoctor prop)
src/lib/fallback-team.ts                     # Team fallback data (7 members)
src/lib/resend-contacts.ts                   # Resend Audiences contact collection utility
src/lib/fallback-services.ts                 # Services fallback data (9 services)
src/lib/constants/contact.ts                 # Contact info constants
src/lib/sanity/queries.ts                    # All Sanity GROQ queries
src/lib/seo.ts                               # SEO metadata generator
src/messages/ro.json                         # Romanian translations
src/messages/en.json                         # English translations
src/messages/hu.json                         # Hungarian translations
src/styles/globals.css                       # Global styles, CSS variables, @theme, team animations
preturi-dentcraft.csv                        # Exported pricing data (80 treatments, 7 categories)
docs/DESIGN-STANDARD.md                      # Visual design standard
docs/CHECKLIST.md                            # Master checklist
docs/content-needs-dr-petric.md              # Content needs list for Dr. Petric
docs/implementation-plan.md                  # Full implementation plan
docs/PROGRESS.md                             # Project status & session logs
```

---

## Sanity CMS

- **Project ID:** `4w5dvd6h`
- **Dataset:** `production`
- **Studio:** `http://localhost:3000/studio`
- **Content types:** Services, Team Members, Testimonials, Before/After Cases, Blog Posts, Prices, Settings

---

## Site Status Overview

### COMPLETE:
- Homepage with all sections (hero, services, why us, team, reviews, before/after preview, video reels placeholder, footer)
- Team listing page (`/echipa`) — 7 members with real photos
- Individual team member profiles (`/echipa/[slug]`) - redesigned 24 Feb
- Pricing page with calculator (`/preturi`) - 81 treatments, 7 categories
- Gallery page (`/galerie`) - slider component ready, needs real cases
- Blog infrastructure (`/blog`) - ready, needs content
- Testimonials page (`/testimoniale`) - ready for video testimonials
- Contact page with form + file upload
- Legal pages (privacy, cookies, terms) in 3 languages — redesigned quick links
- Cookie consent banner (GDPR: Accept All / Essential Only / Customize)
- 3-language support (ro/en/hu) with hreflang tags
- Google Reviews (40 real reviews, 34 with text)
- Responsive design (mobile + desktop)
- ScrollReveal animations throughout
- CallbackPopup with doctor pre-selection
- Email required in all forms + Resend Audiences marketing collection
- Vercel Analytics + Speed Insights (cookieless)
- Domain redirect (vercel.app → www.dentcraft.ro)
- SEO: sitemap (54+ URLs), schema markup, security headers, PageSpeed optimized (Mobile: Perf 94, A11y 93, BP 100, SEO 100)
- Resend email notifications for all 3 forms + user confirmations

### WAITING FOR CONTENT:
- Team CVs (for accurate profile data)
- Video Shorts (team + patient testimonials)
- Blog articles (text + images)
- Before/After photos
- Price verification from Dr. Petric
- Gallery photos per team member

---

## Technical Instructions for Content Addition

### How to add Video Shorts per team member

Currently `videoShorts` is a global empty array in `/src/app/[locale]/echipa/[slug]/page.tsx` (line ~221). To add real content:

**Option A - Add to fallback-team.ts:**
```typescript
// In /src/lib/fallback-team.ts, add to each member:
videoShorts: [
  { title: 'Prezentare Dr. Petric', youtubeUrl: 'https://youtube.com/shorts/VIDEO_ID' },
  { title: 'O zi la cabinet', youtubeUrl: 'https://youtube.com/shorts/VIDEO_ID' },
]
```

**Option B - Add to Sanity CMS:**
Add a `videoShorts` array field to the `teamMember` schema in Sanity.

YouTube Shorts URLs format: `https://youtube.com/shorts/VIDEO_ID`
Thumbnails are auto-generated from YouTube.

### How to add gallery photos per team member

1. Add photos to `/public/images/team/gallery/`
2. Naming convention: `{slug}-1.jpg`, `{slug}-2.jpg`, etc. (e.g., `razvan-petric-1.jpg`)
3. Currently `PhotoGalleryPlaceholder` component shows "coming soon"
4. Convert to real gallery by adding per-member photo arrays to `fallback-team.ts` or Sanity

### How to add blog posts

1. Create in Sanity CMS using `blogPost` document type
2. Fields: title, slug, excerpt, content (PortableText), coverImage, category, author, publishedAt
3. All fields support localization (ro/en/hu)

### How to add before/after cases

1. Create in Sanity CMS using `beforeAfter` document type
2. Fields: beforeImage, afterImage, title, description, service, doctor, treatmentDuration, featured

### How to update prices

- **Option A:** Edit CSV at `/preturi-dentcraft.csv` and re-import
- **Option B:** Directly edit placeholder data in `/src/app/[locale]/preturi/page.tsx` (lines ~354-485)
- **Option C:** Add to Sanity CMS using `price` document type for dynamic management

---

## Dev Commands

```bash
npm run dev                    # Start dev server (Turbopack, port 3001)
npm run build                  # Production build
# Sanity Studio: http://localhost:3000/studio
SERPAPI_KEY=your_key npm run sync-reviews   # Sync Google reviews
```
