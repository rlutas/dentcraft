# PRD: Dentcraft.ro - Remaining Implementation

## Introduction

Dentcraft.ro is a multilingual dental clinic website for Dr. Razvan Petric's clinic in Satu Mare, Romania. The project uses Next.js 15, Tailwind CSS v4, and next-intl for internationalization (RO/EN/HU).

**Current status:** Foundation complete (layout, homepage with placeholder data). Remaining work includes Sanity CMS setup, all inner pages, and advanced features.

## Goals

- Complete all remaining pages with Sanity CMS integration
- Implement interactive features (calculator, gallery, forms)
- Achieve Lighthouse score > 90 on all metrics
- Support 3 languages (RO, EN, HU) with full content
- GDPR compliance (cookie consent, privacy policy)

---

## User Stories

### PHASE 1: CMS Foundation

---

### US-001: Initialize Sanity Studio project
**Description:** As a developer, I need Sanity CMS configured so content can be managed dynamically.

**Acceptance Criteria:**
- [x] Create Sanity project with `npx sanity@latest init`
- [x] Configure `sanity.config.ts` with project ID and dataset
- [x] Add Sanity client in `src/lib/sanity/client.ts`
- [x] Add environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`
- [x] Verify Sanity Studio runs at `/studio` route
- [x] Typecheck passes

---

### US-002: Create localizedString and localizedText object schemas
**Description:** As a developer, I need reusable schema objects for multilingual content (RO/EN/HU).

**Acceptance Criteria:**
- [x] Create `sanity/schemas/objects/localizedString.ts` with fields: ro, en, hu (type: string)
- [x] Create `sanity/schemas/objects/localizedText.ts` with fields: ro, en, hu (type: text)
- [x] Export both from `sanity/schemas/index.ts`
- [x] Typecheck passes

---

### US-003: Create SEO and portableText object schemas
**Description:** As a developer, I need SEO metadata and rich text schemas for content pages.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/objects/seo.ts` with: metaTitle (localizedString), metaDescription (localizedText), ogImage (image), noIndex (boolean)
- [x] Create `sanity/schemas/objects/portableText.ts` with blocks, images, and video embed support
- [x] Create `sanity/schemas/objects/localizedPortableText.ts` wrapping portableText for RO/EN/HU
- [x] Export all from schemas index
- [x] Typecheck passes

---

### US-004: Create Service document schema
**Description:** As a content manager, I need to manage dental services in the CMS.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/service.ts` with fields: title (localizedString), slug, icon (string for Lucide name), shortDescription, description (localizedPortableText), benefits (array), process (array of steps), heroImage, priceRange, seo, order
- [x] Add validation for required fields (title, slug)
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-005: Create TeamMember document schema
**Description:** As a content manager, I need to manage team members/doctors in the CMS.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/teamMember.ts` with fields: name, slug, role (localizedString), specializations (array), photo (image with hotspot), bio (localizedPortableText), education (array), certifications (array), services (references), order, seo
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-006: Create Testimonial document schema
**Description:** As a content manager, I need to manage patient testimonials (text and video).

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/testimonial.ts` with fields: patientName, patientPhoto, rating (1-5), text (localizedText), videoUrl, videoFile, service (reference), doctor (reference), featured (boolean), date
- [x] Add validation: rating min 1 max 5
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-007: Create BeforeAfter document schema
**Description:** As a content manager, I need to manage before/after case galleries.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/beforeAfter.ts` with fields: title (localizedString), service (reference), doctor (reference), beforeImage (required), afterImage (required), description, treatmentDuration, featured
- [x] Both images required with hotspot enabled
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-008: Create BlogPost and BlogCategory schemas
**Description:** As a content manager, I need to manage blog articles with categories.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/blogCategory.ts` with: title (localizedString), slug
- [x] Create `sanity/schemas/documents/blogPost.ts` with: title, slug, excerpt, content (localizedPortableText), coverImage, category (reference), author (reference to teamMember), publishedAt, featured, seo
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-009: Create FAQ and Price document schemas
**Description:** As a content manager, I need to manage FAQs and pricing items.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/faq.ts` with: question (localizedString), answer (localizedPortableText), category (select: general/pricing/treatments/appointments), services (references), order
- [x] Create `sanity/schemas/documents/price.ts` with: service (reference), name (localizedString), description, priceMin, priceMax, unit, isPromotion, promotionPrice, includesInCalculator
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-010: Create Settings singleton and LegalPage schemas
**Description:** As a content manager, I need global site settings and legal pages.

**Acceptance Criteria:**
- [x] Create `sanity/schemas/documents/settings.ts` (singleton) with: siteName, logo, contact (phone, email, whatsapp, address), workingHours, social links, googleMapsEmbed
- [x] Create `sanity/schemas/documents/legalPage.ts` with: title, slug, content, lastUpdated
- [x] Configure desk structure for singleton settings
- [x] Export from schemas index
- [x] Typecheck passes

---

### US-011: Create GROQ queries for all content types
**Description:** As a developer, I need reusable GROQ queries to fetch CMS content.

**Acceptance Criteria:**
- [x] Create `src/lib/sanity/queries.ts` with queries for: getAllServices, getServiceBySlug, getAllTeamMembers, getTeamMemberBySlug, getFeaturedTestimonials, getAllBeforeAfter, getBlogPosts, getFAQs, getPrices, getSettings
- [x] All queries include proper projections for localized content
- [x] Export query functions that accept locale parameter
- [x] Typecheck passes

---

### US-012: Create Sanity image URL helper
**Description:** As a developer, I need a utility to generate optimized image URLs from Sanity.

**Acceptance Criteria:**
- [x] Install `@sanity/image-url` package
- [x] Create `src/lib/sanity/image.ts` with urlFor() helper function
- [x] Helper supports width, height, quality parameters
- [x] Export helper function
- [x] Typecheck passes

---

### PHASE 2: Inner Pages

---

### US-013: Create service page template with Sanity integration
**Description:** As a user, I want to view detailed information about each dental service.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/servicii/[slug]/page.tsx`
- [x] Page fetches service data from Sanity using slug
- [x] Displays: hero with image, description, benefits list, process timeline, price range, FAQ accordion
- [x] Uses existing design system (cards, buttons, sections)
- [x] Generates static params for all services
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-014: Create services listing page
**Description:** As a user, I want to see all available services in a grid.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/servicii/page.tsx`
- [x] Fetches all services from Sanity ordered by `order` field
- [x] Displays grid of service cards (icon, title, short description)
- [x] Each card links to individual service page
- [x] Responsive: 3 columns desktop, 2 tablet, 1 mobile
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-015: Create team listing page
**Description:** As a user, I want to see all doctors and staff members.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/echipa/page.tsx`
- [x] Fetches all team members from Sanity ordered by `order` field
- [x] Displays grid of team cards (photo, name, role, specializations)
- [x] Each card links to individual profile
- [x] Responsive grid layout
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-016: Create individual team member page
**Description:** As a user, I want to view detailed profile for each doctor.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/echipa/[slug]/page.tsx`
- [x] Displays: hero with photo, bio section, education list, certifications, services offered
- [x] Links to related services
- [x] Generates static params for all team members
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-017: Create testimonials page
**Description:** As a user, I want to see all patient testimonials.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/testimoniale/page.tsx`
- [x] Fetches all testimonials from Sanity
- [x] Displays testimonial cards with: patient name, rating stars, text, treatment type
- [x] Video testimonials show play button overlay
- [x] Filter by treatment type (optional, via URL params)
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-018: Create FAQ page with accordion
**Description:** As a user, I want to find answers to common questions.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/faq/page.tsx`
- [x] Fetches FAQs from Sanity grouped by category
- [x] Create Accordion component in `src/components/ui/Accordion.tsx`
- [x] Display FAQs in accordion format, grouped by category tabs
- [x] Smooth expand/collapse animation
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-019: Create prices page with basic listing
**Description:** As a user, I want to see treatment prices organized by service.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/preturi/page.tsx`
- [x] Fetches prices from Sanity grouped by service
- [x] Displays price tables organized by service category
- [x] Shows price range (min-max) and unit
- [x] Highlights promotional prices if applicable
- [x] Disclaimer about prices being estimates
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-020: Create contact page with info and map
**Description:** As a user, I want to find clinic contact information and location.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/contact/page.tsx`
- [x] Fetches contact info from Sanity settings
- [x] Displays: address, phone (click-to-call), email, working hours
- [x] Embed Google Maps iframe
- [x] WhatsApp quick contact button
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-021: Create contact form component
**Description:** As a user, I want to send a message to the clinic.

**Acceptance Criteria:**
- [x] Create `src/components/features/ContactForm/index.tsx`
- [x] Fields: name, email, phone, subject (dropdown), message, GDPR checkbox
- [x] Client-side validation with error messages
- [x] Submit button with loading state
- [x] Integrate into contact page
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-022: Create contact form API route
**Description:** As a developer, I need a backend endpoint to process contact form submissions.

**Acceptance Criteria:**
- [x] Create `/src/app/api/contact/route.ts`
- [x] Validate all required fields server-side
- [x] Send email notification using Resend or similar service
- [x] Return appropriate success/error responses
- [x] Add rate limiting (max 5 requests per minute per IP)
- [x] Typecheck passes

---

### US-023: Create blog listing page
**Description:** As a user, I want to browse blog articles.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/blog/page.tsx`
- [x] Fetches blog posts from Sanity, newest first
- [x] Displays blog cards: cover image, category badge, title, excerpt, date
- [x] Filter by category via URL params
- [x] Pagination (10 posts per page)
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-024: Create individual blog post page
**Description:** As a user, I want to read full blog articles.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/blog/[slug]/page.tsx`
- [x] Fetches post by slug from Sanity
- [x] Displays: cover image, title, author, date, reading time, content
- [x] Create PortableText renderer component for rich content
- [x] Related posts section at bottom
- [x] Generates static params for all posts
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-025: Create legal pages template
**Description:** As a user, I want to read privacy policy, cookie policy, and terms.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/[...slug]/page.tsx` for legal pages
- [x] Matches slugs: politica-confidentialitate, politica-cookies, termeni-conditii
- [x] Fetches content from Sanity legalPage documents
- [x] Simple layout with title and portable text content
- [x] Last updated date displayed
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### PHASE 3: Interactive Features

---

### US-026: Create Before/After gallery page with filter
**Description:** As a user, I want to browse treatment results by category.

**Acceptance Criteria:**
- [x] Create `/src/app/[locale]/galerie/page.tsx`
- [x] Fetches all beforeAfter cases from Sanity
- [x] Filter buttons for treatment types (All, Implants, Veneers, etc.)
- [x] Grid display of thumbnail cards
- [x] Each card shows treatment type badge
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-027: Create Before/After comparison slider component
**Description:** As a user, I want to interactively compare before and after images.

**Acceptance Criteria:**
- [x] Create `src/components/features/BeforeAfterGallery/ComparisonSlider.tsx`
- [x] Draggable divider to reveal before/after
- [x] Touch support for mobile
- [x] Labels for "Before" and "After"
- [x] Smooth sliding animation
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-028: Create gallery modal with case details
**Description:** As a user, I want to view full case details in a modal.

**Acceptance Criteria:**
- [x] Create `src/components/features/BeforeAfterGallery/GalleryModal.tsx`
- [x] Opens on thumbnail click
- [x] Shows ComparisonSlider, treatment name, doctor, duration
- [x] Previous/Next navigation between cases
- [x] Close on backdrop click or Escape key
- [x] Keyboard navigation (arrow keys)
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-029: Create price calculator - step 1 (service selection)
**Description:** As a user, I want to select a treatment type to estimate cost.

**Acceptance Criteria:**
- [x] Create `src/components/features/PriceCalculator/index.tsx`
- [x] Create `src/components/features/PriceCalculator/ServiceSelect.tsx`
- [x] Display services as selectable cards with icons
- [x] Single selection with visual highlight
- [x] "Next" button to proceed
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-030: Create price calculator - step 2 (options and quantity)
**Description:** As a user, I want to specify treatment details for my estimate.

**Acceptance Criteria:**
- [x] Create `src/components/features/PriceCalculator/OptionsForm.tsx`
- [x] Display relevant options based on selected service
- [x] Quantity selector (number of teeth, sessions, etc.)
- [x] Material options where applicable (standard, premium)
- [x] "Calculate" button
- [x] Typecheck passes
- [x] Verify changes work in browser

---

### US-031: Create price calculator - results display
**Description:** As a user, I want to see my estimated treatment cost.

**Acceptance Criteria:**
- [ ] Create `src/components/features/PriceCalculator/Results.tsx`
- [ ] Shows price range (min - max RON)
- [ ] Breakdown of selected options
- [ ] Clear disclaimer: "Final price determined after consultation"
- [ ] CTA button: "Schedule free consultation"
- [ ] Option to reset and start over
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-032: Integrate calculator into prices page
**Description:** As a user, I want to access the price calculator from the prices page.

**Acceptance Criteria:**
- [ ] Add PriceCalculator component to preturi page
- [ ] Calculator positioned prominently above price lists
- [ ] Calculator fetches service prices from Sanity
- [ ] Smooth scroll to calculator from CTA buttons
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-033: Create cookie consent banner
**Description:** As a user, I want to control which cookies the site uses (GDPR).

**Acceptance Criteria:**
- [ ] Create `src/components/features/CookieConsent/index.tsx`
- [ ] Banner appears on first visit (fixed bottom)
- [ ] Buttons: "Accept All", "Only Essential", "Customize"
- [ ] Stores preference in localStorage
- [ ] Does not show again after choice made
- [ ] Link to cookie policy page
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-034: Create cookie preferences modal
**Description:** As a user, I want to customize my cookie preferences.

**Acceptance Criteria:**
- [ ] Add modal to CookieConsent component
- [ ] Categories: Essential (locked on), Analytics, Marketing
- [ ] Toggle switches for each category
- [ ] Description of what each category does
- [ ] "Save Preferences" button
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-035: Create WhatsApp floating button
**Description:** As a user, I want quick access to WhatsApp contact.

**Acceptance Criteria:**
- [ ] Create `src/components/features/WhatsAppButton/index.tsx`
- [ ] Fixed position bottom-right corner
- [ ] WhatsApp green color (#25D366)
- [ ] Subtle pulse animation on load
- [ ] Click opens WhatsApp with pre-filled message
- [ ] Responsive: smaller on mobile
- [ ] Does not overlap important content
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-036: Create video testimonial player component
**Description:** As a user, I want to watch video testimonials.

**Acceptance Criteria:**
- [ ] Create `src/components/features/VideoTestimonial/VideoPlayer.tsx`
- [ ] Custom play button overlay on thumbnail
- [ ] Supports YouTube/Vimeo embeds and direct video files
- [ ] Muted by default with unmute button
- [ ] Responsive video aspect ratio (16:9)
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### PHASE 4: Polish & SEO

---

### US-037: Add SEO metadata to all pages
**Description:** As a site owner, I want all pages optimized for search engines.

**Acceptance Criteria:**
- [ ] Create `src/lib/seo.ts` with generateMetadata helper
- [ ] Each page exports generateMetadata function
- [ ] Title format: "Page Title | Dentcraft Satu Mare"
- [ ] Meta descriptions from Sanity SEO fields
- [ ] Open Graph tags with images
- [ ] Hreflang tags for all 3 languages
- [ ] Typecheck passes

---

### US-038: Add Schema.org structured data
**Description:** As a site owner, I want rich snippets in search results.

**Acceptance Criteria:**
- [ ] Add LocalBusiness schema to layout
- [ ] Add MedicalBusiness schema with services
- [ ] Add FAQPage schema to FAQ page
- [ ] Add Article schema to blog posts
- [ ] Add BreadcrumbList schema to all pages
- [ ] Validate with Google Rich Results Test
- [ ] Typecheck passes

---

### US-039: Generate sitemap.xml
**Description:** As a site owner, I want search engines to index all pages.

**Acceptance Criteria:**
- [ ] Create `/src/app/sitemap.ts` using Next.js sitemap generation
- [ ] Include all static pages in all 3 languages
- [ ] Include dynamic pages (services, team, blog) from Sanity
- [ ] Set appropriate changefreq and priority
- [ ] Typecheck passes

---

### US-040: Create custom 404 page
**Description:** As a user, I want a helpful page when I land on a broken link.

**Acceptance Criteria:**
- [ ] Create `/src/app/[locale]/not-found.tsx`
- [ ] Friendly message in current locale
- [ ] Link to homepage
- [ ] Search suggestion or popular pages
- [ ] Matches site design
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-041: Implement loading states and skeletons
**Description:** As a user, I want visual feedback while content loads.

**Acceptance Criteria:**
- [ ] Create `src/components/ui/Skeleton.tsx` component
- [ ] Add loading.tsx files for major routes
- [ ] Skeleton shapes match actual content layout
- [ ] Smooth fade transition when content loads
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-042: Connect homepage sections to Sanity data
**Description:** As a content manager, I want homepage content editable in CMS.

**Acceptance Criteria:**
- [ ] Update homepage to fetch services preview from Sanity
- [ ] Update testimonials section to fetch featured testimonials
- [ ] Update team preview to fetch featured team members
- [ ] Keep fallback placeholder data if Sanity not configured
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### PHASE 5: Contact & Maps Integration

---

### US-043: Fix Google Maps embed with correct clinic coordinates
**Description:** As a user, I want to see the exact clinic location on the map, not a generic Satu Mare location.

**Acceptance Criteria:**
- [ ] Get exact coordinates for "Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare"
- [ ] Update contact page default Maps embed URL with correct coordinates
- [ ] Embed should show clinic marker, not just city
- [ ] Verify map loads correctly on contact page
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-044: Fix Footer address and Maps link
**Description:** As a user, I want the footer to show the full correct address and link to correct Google Maps location.

**Acceptance Criteria:**
- [ ] Update `footer.address` in all translation files (ro.json, en.json, hu.json) to full address: "Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare"
- [ ] Update Footer.tsx Maps link to use correct encoded address that opens exact location
- [ ] Test that clicking address opens Google Maps with correct destination
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-045: Fix Google Maps directions link on contact page
**Description:** As a user, when I click "Get Directions" I want to be taken to the correct clinic location.

**Acceptance Criteria:**
- [ ] Update contact page "Get Directions" button to use exact coordinates or verified address string
- [ ] Test navigation link opens Google Maps with correct destination marker
- [ ] Test on mobile that it opens Maps app with correct destination
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-046: Add location preview section to homepage
**Description:** As a user, I want to see clinic location info on homepage without going to contact page.

**Acceptance Criteria:**
- [ ] Add "Unde ne găsești" section before CTA on homepage
- [ ] Display: address, phone, working hours, mini map preview (static image or small embed)
- [ ] "Get Directions" button linking to Google Maps
- [ ] Link to full contact page
- [ ] Responsive design matching existing sections
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

### US-047: Update contact info constants with correct data
**Description:** As a developer, I need a single source of truth for clinic contact information.

**Acceptance Criteria:**
- [ ] Create `src/lib/constants/contact.ts` with all contact info:
  - address: "Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare"
  - phone: "0741 199 977"
  - email: "dentcraftsm@gmail.com"
  - whatsapp: "0741 199 977"
  - workingHours: "Luni - Vineri: 10:00 - 18:00"
  - googleMapsUrl: (verified URL)
  - coordinates: { lat, lng }
- [ ] Update Footer.tsx to import from constants
- [ ] Update contact page fallbacks to use constants
- [ ] Typecheck passes

---

### US-048: Add working hours to homepage CTA section
**Description:** As a user, I want to know clinic hours when deciding to call.

**Acceptance Criteria:**
- [ ] Add working hours text below phone number in CTA section
- [ ] Format: "Luni - Vineri: 10:00 - 18:00"
- [ ] Use muted/secondary text style
- [ ] Typecheck passes
- [ ] Verify changes work in browser

---

## Non-Goals

- Patient portal with login/authentication
- Online appointment booking system
- Online payments
- Live chat with AI
- E-commerce functionality
- Mobile app

## Technical Considerations

- **Existing stack:** Next.js 15, Tailwind CSS v4, next-intl v4, lucide-react
- **CMS:** Sanity.io v3 with GROQ queries
- **Hosting:** Vercel with automatic deployments
- **Locale handling:** RO is default without prefix, EN/HU with prefix
- **Design tokens:** Already defined in globals.css using @theme directive
- **Icons:** Use lucide-react consistently
