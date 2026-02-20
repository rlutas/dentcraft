# Dentcraft.ro - Project Status

**Last updated:** 20 February 2026

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
| Email | Resend (domain: dentcraft.ro) |
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
| `/` (Homepage) | Done | Hero, Services grid, Why Us, Team (6 real photos), Google Reviews (34 with text), Before/After gallery, Video Testimonials, Footer CTA |
| `/echipa` | Done | Team listing with premium cards, ScrollReveal animations |
| `/echipa/[slug]` | Done | Individual member detail pages |
| `/servicii` | Done | Service categories grid (9 services) |
| `/servicii/[slug]` | Done | Individual service pages |
| `/galerie` | Done | Before/after comparison viewer with interactive slider |
| `/blog` | Done | Blog listing page |
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
| PriceEstimatePopup | Part of PriceCalculator | Lead capture form (name, phone) with price context. Sends via Resend email. Portal-rendered modal. |
| CallbackPopup | `/src/components/features/CallbackPopup/` | Appointment request modal (name, phone, service dropdown, time preference). Focus trap, ESC close, i18n. Triggered from Header/Mobile CTA buttons. |
| WhatsAppButton | `/src/components/features/WhatsAppButton/` | Floating button with wrapper for client-side rendering |
| GoogleReviewsSlider | `/src/components/features/GoogleReviewsSlider/` | Compact trust badge (4.9 rating), 34 text reviews, inline action buttons |
| BeforeAfterGallery | `/src/components/features/BeforeAfterGallery/` | ComparisonSlider with touch support, GalleryModal for full-screen view |
| ContactPageContent | `/src/components/features/ContactPageContent/` | Client component with floating orbs, quick contact cards, two-column layout, file upload form |
| ScrollReveal | `/src/components/ui/ScrollReveal.tsx` | Reusable scroll-triggered fade-up animation wrapper |

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/callback` | Callback request form submission with rate limiting (5 req/min) and Resend email |

### Cross-Cutting

- **SEO metadata** on all pages (US-037) via `generatePageMetadata` utility
- **Internationalization** (ro, en, hu) with next-intl -- all UI strings translated
- **ScrollReveal animations** on all homepage sections with staggered delays
- **Mobile-responsive** design throughout (tested on all pages)
- **Sanity CMS** schemas: Services, Team Members, Testimonials, Before/After Cases, Blog Posts, Prices, Settings
- **Fallback data** for team (`/src/lib/fallback-team.ts`), services (`/src/lib/fallback-services.ts`), and prices (inline in TabbedPriceList) when Sanity has insufficient content

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| Resend email domain (dentcraft.ro) not verified | Medium | Emails fail in dev; needs DNS verification for production |
| ESLint warnings | Low | Import order, jsx-sort-props in several files |
| Turbopack cache corruption | Low | Workaround: `rm -rf .next` and restart dev server |

---

## Content Needed from Client

- [ ] Before/after photos (10-15 cases)
- [ ] Video testimonials / Instagram Reels clips
- [ ] Clinic photos (reception, treatment rooms)
- [ ] Dr. Petric certifications
- [ ] Team member bios (extended)
- [ ] Logo vector (SVG/PNG)
- [ ] Google My Business access
- [ ] Social media links (Instagram, Facebook)

---

## Not Yet Implemented

| Feature | Priority | Notes |
|---------|----------|-------|
| Vercel deployment | High | Environment variables, preview deployments |
| Cookie consent banner | High | GDPR compliance |
| Legal pages (privacy, cookies, terms) | High | Content needed |
| FAQ page with accordion | Medium | Content needed |
| Blog individual article pages | Medium | Sanity content needed |
| Google Analytics (GA4) integration | Medium | Property ID needed |
| Newsletter signup | Low | Form + API route |
| Process / How We Work section | Low | Treatment steps visual |

---

## Key File Paths

```
src/app/[locale]/page.tsx                    # Homepage
src/app/[locale]/preturi/page.tsx            # Pricing page (server component)
src/app/[locale]/contact/page.tsx            # Contact page
src/app/[locale]/echipa/page.tsx             # Team listing
src/app/[locale]/servicii/page.tsx           # Services listing
src/app/[locale]/galerie/page.tsx            # Gallery page
src/app/[locale]/blog/page.tsx               # Blog listing
src/app/api/callback/route.ts               # Callback API with Resend + rate limiting
src/components/layout/Header.tsx             # Header with services dropdown
src/components/layout/Footer.tsx             # Footer with i18n routing
src/components/layout/MobileMenu.tsx         # Mobile menu with services accordion
src/lib/fallback-team.ts                     # Team fallback data (6 members)
src/lib/fallback-services.ts                 # Services fallback data (9 services)
src/lib/constants/contact.ts                 # Contact info constants
src/lib/sanity/queries.ts                    # All Sanity GROQ queries
src/lib/seo.ts                               # SEO metadata generator
src/messages/ro.json                         # Romanian translations
src/messages/en.json                         # English translations
src/messages/hu.json                         # Hungarian translations
src/styles/globals.css                       # Global styles, CSS variables, @theme
docs/DESIGN-STANDARD.md                      # Visual design standard
docs/CHECKLIST.md                            # Master checklist
docs/implementation-plan.md                  # Full implementation plan
```

---

## Sanity CMS

- **Project ID:** `4w5dvd6h`
- **Dataset:** `production`
- **Studio:** `http://localhost:3000/studio`
- **Content types:** Services, Team Members, Testimonials, Before/After Cases, Blog Posts, Prices, Settings

---

## Dev Commands

```bash
npm run dev                    # Start dev server (Turbopack)
npm run build                  # Production build
# Sanity Studio: http://localhost:3000/studio
SERPAPI_KEY=your_key npm run sync-reviews   # Sync Google reviews
```
