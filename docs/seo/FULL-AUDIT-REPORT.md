# Full SEO Audit Report — dentcraft.ro

**Date:** February 25, 2026
**Site:** https://www.dentcraft.ro
**Business:** DentCraft — Clinica Stomatologica, Satu Mare, Romania
**Stack:** Next.js 15 App Router + Tailwind CSS v4 + Sanity CMS + next-intl (ro/en/hu)
**Audit method:** Source code analysis + live site crawl via Playwright + 5 parallel specialist agents

---

## Overall SEO Health Score: 62 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 82/100 | 20.5 |
| Content Quality (E-E-A-T) | 25% | 44/100 | 11.0 |
| On-Page SEO | 20% | 78/100 | 15.6 |
| Schema / Structured Data | 10% | 60/100 | 6.0 |
| Performance (CWV) | 10% | N/A* | — |
| Images | 5% | 62/100 | 3.1 |
| AI Search Readiness (GEO) | 5% | 67/100 | 3.4 |
| **TOTAL (excl. CWV)** | **90%** | | **59.6 → normalized to 66/100** |

*CWV requires PageSpeed Insights measurement. Estimated ~70/100 based on SSR + prerendering + large HTML payload (727KB).

**Adjusted Overall Score: 62/100** (accounting for content gaps)

---

## Executive Summary

### What's Working Well
1. **Excellent technical foundation** — SSR with Vercel prerendering, proper canonical/hreflang across 3 locales, dual hreflang delivery (HTML + HTTP headers)
2. **Smart AI crawler strategy** — Allows GPTBot, ClaudeBot, PerplexityBot; blocks training-only crawlers
3. **Rich structured data** — LocalBusiness + MedicalBusiness + Dentist + AggregateRating + Person + BreadcrumbList
4. **llms.txt present** — With services, team, pricing, and contact information
5. **Comprehensive sitemap** — 84 localized URLs with final destination paths (fixed: added 45 missing service pages + 9 legal pages)
6. **Strong security headers** — 5 of 6 key headers present
7. **Mobile responsive** — Clean design, proper viewport, touch-friendly

### Top 5 Critical Issues
1. **Empty blog** — Only 1 post. This is the single biggest SEO gap for a dental YMYL site
2. **3 legal pages are 404** — Privacy, cookies, terms linked from every page's footer
3. **Non-www URL in all JSON-LD schemas** — Schema.org data says `dentcraft.ro`, everything else says `www.dentcraft.ro`
4. **Hardcoded Romanian text on EN/HU pages** — Breadcrumbs, badges, section labels not translated
5. **Generic H1 tags** — Most pages have generic H1s missing target keywords

### Top 5 Quick Wins
1. Fix schema.ts URL to `www.dentcraft.ro` (10 min)
2. Add og:image + twitter:card to homepage metadata (15 min)
3. Fix heading hierarchy on Services, Team, Contact pages (30 min)
4. Add postalCode and image to Organization schema (10 min)
5. Add Google Business Profile URL to sameAs array (5 min)

---

## 1. Technical SEO (82/100)

*Full details: [TECHNICAL-SEO-AUDIT.md](./TECHNICAL-SEO-AUDIT.md)*

| Subcategory | Score |
|-------------|-------|
| Crawlability | 90/100 |
| Indexability | 92/100 |
| Security | 78/100 |
| URL Structure | 72/100 |
| Mobile | 95/100 |
| Structured Data (technical) | 75/100 |
| JS Rendering / SSR | 95/100 |

### Key Findings
- **robots.txt**: Properly configured with AI crawler management
- **Sitemap**: 84 URLs (was 30 — fixed by merging fallback service slugs + legal pages), localized pathnames, no redirect chains
- **Hreflang**: Correctly implemented with dual delivery (HTML + HTTP headers)
- **Canonical**: Locale-aware, consistent with www prefix
- **SSR**: Full prerendering via Vercel, all content in initial HTML
- **Security**: Missing CSP header; HSTS lacks `includeSubDomains; preload`
- **Redirects**: non-www → www uses 307 (Vercel platform behavior)
- **Legal pages**: 3 footer links return 404 (Sanity content not created)

---

## 2. Content Quality & E-E-A-T (44/100)

### Content Depth Analysis

| Page | Word Count (est.) | Target | Status |
|------|-------------------|--------|--------|
| Homepage | ~500 words | 800+ | Too thin |
| Service pages (x15) | 300-500 words each | 1,500+ | Much too thin |
| Team page | ~200 words | 500+ | Too thin |
| Prices page | Pricing tables only | 800+ with context | Missing context |
| FAQ page | 5 questions | 30-50 questions | Severely lacking |
| Blog | 1 post | 20+ posts | Nearly empty |
| About Us page | Does not exist | Required for YMYL | Missing entirely |

### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| **Experience** | 5/10 | Before/after gallery exists but lacks treatment narratives |
| **Expertise** | 6/10 | Team pages have education/certifications, but not shown prominently |
| **Authoritativeness** | 4/10 | Only 1 blog post, no external citations, no media mentions |
| **Trustworthiness** | 5/10 | AggregateRating present, but legal pages are 404, no privacy policy accessible |

### Critical Content Gaps
1. **Blog is empty** — 1 post out of recommended 20+. For dental YMYL queries, content authority is essential
2. **FAQ has only 5 questions** — Should have 30-50 covering all services
3. **Service pages too thin** — 300-500 words vs. recommended 1,500+ for medical content
4. **No "About Us" page** — Critical for YMYL trust signals
5. **Data inconsistency**: `whyUs.stats.years.number` = "5+" in translation files but CountUp component renders 10+

### i18n Content Issues
Hardcoded Romanian strings appear on EN and HU pages:

| File | Hardcoded Text |
|------|---------------|
| `/servicii/page.tsx` | "Acasa", "Servicii", "Tratamente stomatologice" |
| `/echipa/page.tsx` | "Acasa", "Echipa", "specialisti" |
| `/preturi/page.tsx` | "Tarife transparente", "Lista completa de preturi" |
| `/blog/page.tsx` | "Acasa", "Blog" |
| `/galerie/GalleryPageClient.tsx` | "Transformari reale", "cazuri documentate" |

---

## 3. On-Page SEO (78/100)

### Title Tags: 18/20 — Excellent

All pages have unique, keyword-rich titles per locale with proper length (44-96 chars).

Best examples:
- Prices: `Preturi Stomatologie Satu Mare 2026 | Tarife Implant, Aparat Dentar, Fatete`
- Contact: `Contact | Programare Stomatolog - 0741 199 977 | Dentcraft Satu Mare`

### Meta Descriptions: 18/20 — Excellent

Unique descriptions with CTAs, proper length (130-155 chars).

### H1 Tags: 10/20 — Needs Improvement

| Page | Current H1 | Issue | Recommended H1 |
|------|-----------|-------|-----------------|
| Homepage | "Clinica stomatologica in Satu Mare..." | OK | — |
| Services | "Serviciile noastre" | Generic | "Servicii Stomatologice in Satu Mare" |
| Team | "Cunoaste-ne echipa" | Generic | "Echipa de Medici Stomatologi Satu Mare" |
| Prices | "Lista de preturi" | Generic | "Preturi Stomatologie Satu Mare 2026" |
| Contact | "Contacteaza-ne" | Generic | "Contact Clinica Stomatologica Satu Mare" |
| Gallery | "Inainte si Dupa" | Generic | "Galerie Inainte si Dupa — Rezultate Reale" |
| Blog | "Blog" | Very generic | "Blog Stomatologie — Sfaturi Dentare" |
| Testimonials | "Povesti de succes" | Too creative | "Recenzii si Testimoniale Pacienti" |
| FAQ | "Intrebari frecvente" | Acceptable | — |

### Heading Hierarchy: 8/15 — Needs Fixes

| Page | Issue |
|------|-------|
| Services (`/servicii`) | H1 → H3 (skips H2) |
| Team (`/echipa`) | H1 → H3 (skips H2) |
| Contact (`/contact`) | H3 appears before H2 |

### Internal Linking: 10/10 — Excellent

Rich cross-linking via header navigation, footer, service cards, team member cards, and CTAs.

### Hreflang: 10/10 — Excellent

Properly implemented with x-default, dual delivery, localized pathnames.

---

## 4. Schema / Structured Data (60/100)

### Current Implementation

| Schema Type | Pages | Status |
|-------------|-------|--------|
| LocalBusiness + MedicalBusiness + Dentist | All (via layout) | URL mismatch bug |
| AggregateRating | All (via layout) | OK |
| Person + Dentist | Team member pages | Type conflict |
| Service + MedicalProcedure | Service pages | OK |
| BlogPosting + Article | Blog posts | OK |
| FAQPage | FAQ page | Not rendered (Sanity empty) |
| BreadcrumbList | Team member, blog posts | Missing on 7+ pages |

### Critical Issues

1. **URL mismatch**: `url: 'https://dentcraft.ro'` in schema.ts (should be `www.dentcraft.ro`)
   - Affects: Organization, Service provider, Person worksFor, Article publisher
   - File: `src/lib/schema.ts` lines 10, 91, 132, 177, 180

2. **Person + Dentist type conflict**: `@type: ['Person', 'Dentist']` is semantically wrong because Dentist extends LocalBusiness, not Person
   - Fix: Use `@type: 'Person'` with `jobTitle` and `worksFor` pointing to the clinic

3. **Missing WebSite schema**: No SearchAction for sitelinks searchbox

4. **Missing BreadcrumbList** on Services, Team (listing), Prices, Gallery, Blog (listing), FAQ, Contact, Testimonials

5. **FAQPage schema not rendered** because Sanity CMS has no FAQ content

6. **Missing properties on Organization**:
   - `logo` and `image` not set
   - `postalCode` missing from address
   - `hasMap` not set (should point to Google Maps)
   - Google Business Profile missing from `sameAs`

### Publisher logo reference broken
Article schema references `/images/logo.png` which does not exist. Only `/branding/LOGO_BLACK_FINAL.png` exists.

---

## 5. Images (62/100)

| Category | Score | Notes |
|----------|-------|-------|
| Alt Text | 12/20 | 2 visible images with empty alt (`patient-1.png`, `patient-2.png`) |
| File Format | 14/20 | Next/Image auto-converts; native `<img>` PNGs miss optimization |
| Lazy Loading | 14/15 | Next/Image handles it; native imgs are above fold |
| Responsive Images | 12/15 | Next/Image provides srcset; native `<img>` tags miss it |
| CLS Prevention | 8/10 | Good for Next/Image; minimal impact for small native imgs |
| Next/Image Usage | 8/10 | Most images use `<Image>`; 10 homepage images use native `<img>` |
| File Naming | 4/10 | `unnamed.png`, `VYO_0302 (1) (1).jpg` — poor SEO filenames |

### Issues
- `patient-1.png` and `patient-2.png` use native `<img>` with `alt=""` — should be `<Image>` with descriptive alt
- No page-specific OG images (all pages use default `team-clinic.jpg`)
- Duplicate team photos in both JPG and PNG formats
- Poor filenames: `unnamed.png`, `unnamed (1).png`, `VYO_0302 (1) (1).jpg`

---

## 6. AI Search Readiness / GEO (67/100)

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| AI Crawler Access | 9/10 | 15% | 13.5 |
| llms.txt Quality | 8/10 | 10% | 8.0 |
| SSR / Technical | 10/10 | 15% | 15.0 |
| Structured Data | 8/10 | 15% | 12.0 |
| E-E-A-T / Authority | 7/10 | 10% | 7.0 |
| Content Citability | 3/10 | 15% | 4.5 |
| Content Depth | 2/10 | 10% | 2.0 |
| Brand Mention Potential | 5/10 | 10% | 5.0 |
| **TOTAL** | | **100%** | **67/100** |

### Strengths
- Excellent SSR — all AI crawlers see full content without JS execution
- llms.txt present with services, team, pricing, contact
- Smart AI crawler strategy in robots.txt
- Rich structured data (Organization, Person, AggregateRating)

### Weaknesses
- No self-contained "answer blocks" (134-167 words) for AI citation
- Only 1 question-format heading on homepage ("De ce Dentcraft?")
- No FAQ section on homepage
- Only 1 blog post — insufficient for topical authority
- No comparison tables on service pages
- Missing Google Business Profile URL in sameAs

---

## Scoring Summary

```
Technical SEO:        82/100  ████████░░  (25% weight → 20.5)
Content Quality:      44/100  ████░░░░░░  (25% weight → 11.0)
On-Page SEO:          78/100  ████████░░  (20% weight → 15.6)
Schema:               60/100  ██████░░░░  (10% weight →  6.0)
Performance:           N/A    ░░░░░░░░░░  (10% weight → est. 7.0)
Images:               62/100  ██████░░░░  ( 5% weight →  3.1)
AI Search:            67/100  ███████░░░  ( 5% weight →  3.4)
                                          ─────────────────────
                              Overall:     62/100
```

**The single biggest lever to improve this score is content.** Technical infrastructure is strong (82/100), but content is the weakest link (44/100). Publishing 10-15 blog posts, expanding FAQ to 30+ questions, enriching service pages to 1,500+ words each, and creating an About Us page would push the overall score to 75-80.

---

## Detailed Reports

- **Technical SEO**: [TECHNICAL-SEO-AUDIT.md](./TECHNICAL-SEO-AUDIT.md)
- **Action Plan**: [ACTION-PLAN.md](./ACTION-PLAN.md)
- **SEO Strategy**: [SEO-STRATEGY.md](./SEO-STRATEGY.md)
- **Content Calendar**: [CONTENT-CALENDAR.md](./CONTENT-CALENDAR.md)
- **Site Structure**: [SITE-STRUCTURE.md](./SITE-STRUCTURE.md)
