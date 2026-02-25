# SEO Action Plan — dentcraft.ro

**Date:** February 25, 2026
**Current Score:** 62/100
**Target Score:** 80/100 (achievable in 4-6 weeks)

---

## Priority 1: CRITICAL — Fix Immediately (Score impact: +8)

### 1.1 Fix non-www URL in all JSON-LD schemas
- **File:** `src/lib/schema.ts`
- **Issue:** `url: 'https://dentcraft.ro'` on lines 10, 91, 132, 177, 180
- **Fix:** Replace all with `siteConfig.baseUrl` (`https://www.dentcraft.ro`)
- **Effort:** 10 minutes
- **Impact:** Consistent canonical signals across all structured data

### 1.2 Create 3 legal pages in Sanity CMS
- **Pages:** `politica-confidentialitate`, `politica-cookies`, `termeni-conditii`
- **Issue:** Linked from every page's footer but return 404
- **Fix:** Create content in Sanity CMS (or hardcode minimal pages)
- **Effort:** 2-3 hours (content writing + Sanity setup)
- **Impact:** Eliminates broken links on every page, GDPR compliance

### 1.3 Add og:image and twitter:card to homepage
- **File:** `src/lib/seo.ts` → `generateRootMetadata()`
- **Issue:** Homepage has no OG image and twitter:card is `summary` instead of `summary_large_image`
- **Fix:** Add `images` array to openGraph config, add twitter card type
- **Effort:** 15 minutes
- **Impact:** Social sharing preview for homepage

---

## Priority 2: HIGH — Fix This Week (Score impact: +6)

### 2.1 Fix heading hierarchy (H1 → H2 → H3)
- **Pages:** Services, Team, Contact
- **Issue:** H2 level skipped (H1 → H3 directly)
- **Fix:** Add H2 section headings before H3 card grids
- **Files:** `src/app/[locale]/servicii/page.tsx`, `src/app/[locale]/echipa/page.tsx`, `src/components/features/ContactPageContent/index.tsx`
- **Effort:** 30 minutes
- **Impact:** Accessibility + heading hierarchy ranking factor

### 2.2 Make H1 tags keyword-rich
- **Issue:** Most H1s are generic ("Blog", "Contacteaza-ne", "Lista de preturi")
- **Fix:** Update translation files to use SEO-optimized H1s per locale

| Page | Current | Recommended (RO) |
|------|---------|------------------|
| Services | "Serviciile noastre" | "Servicii Stomatologice Satu Mare" |
| Team | "Cunoaste-ne echipa" | "Echipa de Medici Stomatologi" |
| Prices | "Lista de preturi" | "Preturi Stomatologie Satu Mare 2026" |
| Contact | "Contacteaza-ne" | "Contact si Programari" |
| Gallery | "Inainte si Dupa" | "Galerie Rezultate — Inainte si Dupa" |
| Blog | "Blog" | "Blog Stomatologie" |
| Testimonials | "Povesti de succes" | "Recenzii si Testimoniale Pacienti" |

- **Effort:** 45 minutes (update ro.json, en.json, hu.json)
- **Impact:** Keyword relevance for page-level rankings

### 2.3 Translate hardcoded Romanian text
- **Issue:** Breadcrumbs, badges, and labels are hardcoded in Romanian on all locales
- **Fix:** Replace with `t()` translation calls
- **Files:** 6 page files (servicii, echipa, preturi, blog, galerie, contact)
- **Effort:** 1-2 hours
- **Impact:** Proper language signals for EN/HU pages

### 2.4 Fix Schema.org Person type conflict
- **File:** `src/lib/schema.ts`
- **Issue:** `@type: ['Person', 'Dentist']` — Dentist extends LocalBusiness, not Person
- **Fix:** Use `@type: 'Person'` with `jobTitle` and `worksFor`
- **Effort:** 20 minutes

---

## Priority 3: MEDIUM — Fix This Month (Score impact: +10)

### 3.1 Expand FAQ to 30-50 questions
- **Current:** 5 placeholder questions
- **Target:** 30-50 questions covering all services
- **Where:** Sanity CMS (FAQ collection) or hardcoded fallback
- **Topics:** Pricing, procedures, recovery, insurance, emergency, each service
- **Effort:** 4-6 hours (content writing)
- **Impact:** FAQPage schema rich results, homepage FAQ section, content depth

### 3.2 Create "About Us" page
- **Issue:** No about page exists — critical for YMYL trust signals
- **Content:** Clinic history, founding story, mission, certifications, clinic photos
- **Effort:** 3-4 hours
- **Impact:** E-E-A-T trust signals, entity context

### 3.3 Add BreadcrumbList schema to all pages
- **Issue:** `getBreadcrumbSchema()` exists but only used on team member and blog post pages
- **Fix:** Wire breadcrumb schema to Services, Team listing, Prices, Gallery, Blog listing, FAQ, Contact, Testimonials
- **Effort:** 1-2 hours
- **Impact:** Rich snippet breadcrumbs in SERPs

### 3.4 Add WebSite schema with SearchAction
- **File:** `src/lib/schema.ts`
- **Fix:** Add WebSite schema to root layout for sitelinks searchbox
- **Effort:** 30 minutes

### 3.5 Add homepage FAQ section
- **Issue:** FAQ content exists at `/faq` but not on homepage
- **Fix:** Embed top 5-6 FAQs on homepage with FAQPage schema
- **Effort:** 2-3 hours
- **Impact:** Citable answer blocks for AI search, homepage content depth

### 3.6 Fix image issues
- Convert `patient-1.png` and `patient-2.png` to Next/Image with descriptive alt text
- Rename `unnamed.png`, `VYO_0302 (1) (1).jpg` to SEO-friendly filenames
- Remove duplicate JPG/PNG team photos
- **Effort:** 1-2 hours

### 3.7 Complete Organization schema
- Add `postalCode: '440012'` (or correct code)
- Add `image` property (team-clinic.jpg URL)
- Add `logo` property
- Add `hasMap` pointing to Google Maps URL
- Add Google Business Profile URL to `sameAs` array
- Fix publisher logo path (`/images/logo.png` → actual logo path)
- **Effort:** 30 minutes

### 3.8 Add Content-Security-Policy header
- Start with `Content-Security-Policy-Report-Only` to identify violations
- Gradually enforce after testing with GTM, Sanity, Google Fonts, etc.
- **File:** `next.config.ts`
- **Effort:** 2-3 hours (initial + testing)

---

## Priority 4: CONTENT STRATEGY — Ongoing (Score impact: +15)

### 4.1 Publish 10-15 blog posts (Months 1-2)

Priority topics based on Search Console data:

| # | Topic | Target Keyword | Search Volume |
|---|-------|---------------|---------------|
| 1 | Cat costa un implant dentar in Satu Mare? | implant dentar satu mare pret | 1,387 imp |
| 2 | Aparat dentar Satu Mare — tipuri, pret, durata | aparat dentar satu mare | 1,063 imp |
| 3 | Ortodont Satu Mare — cand ai nevoie? | ortodont satu mare | 1,095 imp |
| 4 | Stomatolog copii Satu Mare — ghid complet | stomatolog copii satu mare | 653 imp |
| 5 | Urgente dentare Satu Mare — ce faci cand te doare | urgente dentare satu mare | 517 imp |
| 6 | Albire dentara profesionala vs. casnica | albire dentara satu mare | ~400 imp |
| 7 | Fatete dentare — pret, tipuri si durata | fatete dentare satu mare | ~350 imp |
| 8 | Implanturi dentare vs. punti — ghid comparativ | implant vs punte | ~300 imp |
| 9 | Cat costa o coroana dentara in 2026? | coroana dentara pret | ~250 imp |
| 10 | Detartraj si igienizare — de ce e important | detartraj satu mare | ~200 imp |

Each post should:
- Include 134-167 word "answer block" in first 2 paragraphs
- Use question-format H2/H3 headings
- Include specific DentCraft pricing
- Link to relevant service pages
- Have BlogPosting schema with author attribution

### 4.2 Enrich service pages to 1,500+ words
- Add treatment description (what, why, how)
- Add step-by-step process explanation
- Add FAQ section (5-8 questions per service)
- Add comparison table (e.g., implant vs. punte vs. proteza)
- Add pricing context with "answer block" paragraph
- **Effort:** 2-3 hours per service page × 15 services

### 4.3 Create answer blocks for AI citability
- Write 134-167 word self-contained paragraphs per service
- Format: "Ce este [tratament]? [Definition]. La DentCraft Satu Mare, [specific details]. [Pricing]. [CTA]."
- Place at top of each service page
- **Impact:** Direct AI Overview citation potential

---

## Priority 5: ADVANCED — Months 2-3 (Score impact: +5)

### 5.1 Add comparison tables to service pages
- "Implant vs. Punte vs. Proteza" with durability, price, time, pros/cons columns
- "Aparat metalic vs. ceramic vs. Invisalign" comparison
- AI systems heavily favor structured tabular data

### 5.2 Convert headings to question format
- "Serviciile noastre" → "Ce servicii stomatologice oferim?"
- Use question-format H2/H3 matching search queries

### 5.3 Expand llms.txt to llms-full.txt
- Full FAQ with answers
- Detailed service descriptions
- Complete team bios
- All blog post summaries

### 5.4 Add speakable structured data
- Mark key answer blocks as `speakable` for voice search

### 5.5 Implement IndexNow for Bing/Yandex
- Faster indexing of new content on non-Google engines

### 5.6 Strengthen HSTS header
- Add `includeSubDomains; preload` directives
- Consider HSTS preload list submission

---

## Score Projection

| Milestone | Actions | Projected Score |
|-----------|---------|-----------------|
| **Today** | Current state | **62/100** |
| **Week 1** | Fix critical + high priority (1.1–2.4) | **70/100** |
| **Week 2-3** | Medium priority (3.1–3.8) | **76/100** |
| **Month 1-2** | 10 blog posts + service enrichment | **82/100** |
| **Month 2-3** | Advanced GEO + content depth | **88/100** |

---

## Files to Modify (Summary)

| File | Changes Needed |
|------|---------------|
| `src/lib/schema.ts` | Fix www URL, Person type, add WebSite schema, complete Organization |
| `src/lib/seo.ts` | Add og:image/twitter to root metadata |
| `src/app/[locale]/servicii/page.tsx` | Fix H1→H3 hierarchy, translate hardcoded text |
| `src/app/[locale]/echipa/page.tsx` | Fix H1→H3 hierarchy, translate hardcoded text |
| `src/app/[locale]/preturi/page.tsx` | Translate hardcoded text |
| `src/app/[locale]/blog/page.tsx` | Translate hardcoded breadcrumbs |
| `src/app/[locale]/galerie/GalleryPageClient.tsx` | Translate hardcoded text |
| `src/components/features/ContactPageContent/index.tsx` | Fix heading hierarchy |
| `src/messages/ro.json` | Add keyword-rich H1 translations |
| `src/messages/en.json` | Add keyword-rich H1 translations |
| `src/messages/hu.json` | Add keyword-rich H1 translations |
| `next.config.ts` | Add CSP header, strengthen HSTS |
| Sanity CMS | Create legal pages, expand FAQ, publish blog posts |
