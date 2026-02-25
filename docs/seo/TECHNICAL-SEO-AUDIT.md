# Technical SEO Audit -- dentcraft.ro

**Date:** February 25, 2026 (updated February 25, 2026)
**Audit method:** Live site crawl via Playwright + source code analysis
**Overall Technical SEO Score: 93/100** (was 82/100 before fixes)

---

## Category Scores

| # | Category | Score | Previous | Status |
|---|----------|-------|----------|--------|
| 1 | Crawlability | 100/100 | 90 | Excellent |
| 2 | Indexability | 100/100 | 92 | Excellent |
| 3 | Security | 78/100 | 78 | Needs work |
| 4 | URL Structure | 95/100 | 72 | Good |
| 5 | Mobile | 95/100 | 95 | Excellent |
| 6 | Core Web Vitals | N/A | N/A | Measure at pagespeed.web.dev |
| 7 | Structured Data | 96/100 | 75 | Excellent |
| 8 | JS Rendering / SSR | 95/100 | 95 | Excellent |

**Weighted average (excluding CWV): 93/100** (was 82/100)

---

## 1. CRAWLABILITY (90/100)

### robots.txt -- PASS

Live content at `https://www.dentcraft.ro/robots.txt`:
```
User-Agent: *
Allow: /
Disallow: /studio/
Disallow: /api/

User-Agent: CCBot
User-Agent: Bytespider
User-Agent: cohere-ai
Disallow: /

Sitemap: https://www.dentcraft.ro/sitemap.xml
```

**Findings:**
- [PASS] Allows all standard crawlers
- [PASS] Blocks Sanity Studio (`/studio/`) and API routes (`/api/`) correctly
- [PASS] Sitemap URL uses correct www domain
- [PASS] AI crawler strategy is sound (blocks training-only crawlers, allows search crawlers)

**AI Crawler Management:**
| Crawler | Status | Rationale |
|---------|--------|-----------|
| GPTBot | Allowed | ChatGPT search visibility |
| ChatGPT-User | Allowed | ChatGPT search visibility |
| ClaudeBot | Allowed | Claude AI search visibility |
| PerplexityBot | Allowed | Perplexity search visibility |
| Google-Extended | Allowed | Gemini -- acceptable Google ecosystem trade-off |
| CCBot | Blocked | Training-only (Common Crawl) |
| Bytespider | Blocked | Training-only (ByteDance/TikTok) |
| cohere-ai | Blocked | Training-only |

Source: `/Users/raul/Projects/dentcraft/src/app/robots.ts`

### sitemap.xml -- PASS (minor note)

Live sitemap at `https://www.dentcraft.ro/sitemap.xml` contains **30 URLs** across 3 locales.

**Findings:**
- [PASS] All URLs use `https://www.dentcraft.ro` (correct www prefix)
- [PASS] All localized URLs are final destination URLs (no redirects)
- [PASS] Priorities are reasonable: homepage=1.0, main pages=0.8, team members=0.6
- [PASS] Dynamic content (services, team, blog) fetched from Sanity CMS
- [PASS] Blog posts use actual `publishedAt` dates from Sanity
- [NOTE] All `lastmod` dates are set to current server time for static pages (not a real "last modified" date). Consider using git commit dates or manual dates for more accuracy.
- [NOTE] `changefreq` is deprecated by Google but harmless to include.
- [NOTE] Legal pages (privacy, cookies, terms) are NOT in sitemap -- correct since they have `noIndex: true`.

**URL count by locale:**
- Romanian: 10 static pages + dynamic
- English: 10 static pages + dynamic
- Hungarian: 10 static pages + dynamic

Source: `/Users/raul/Projects/dentcraft/src/app/sitemap.ts`

### Crawl Depth -- PASS

Maximum crawl depth is 3 clicks (Homepage -> Services -> Individual Service).
All main pages are accessible from the persistent header navigation.
Footer includes links to services, team, and legal pages.

~~**Deduction (-10):** The 3 legal pages linked from every page's footer return 404.~~ **FIXED:** Legal pages now serve hardcoded content (privacy, cookies, terms) in all 3 locales. See `src/data/legal-content.ts`.

---

## 2. INDEXABILITY (92/100)

### Canonical Tags -- PASS

| Page | Canonical URL | Correct? |
|------|--------------|----------|
| `/` (RO) | `https://www.dentcraft.ro/` | YES |
| `/en` (EN) | `https://www.dentcraft.ro/en` | YES |
| `/hu` (HU) | `https://www.dentcraft.ro/hu` | YES |
| `/servicii` | `https://www.dentcraft.ro/servicii` | YES |
| `/echipa/dr-razvan-petric` | `https://www.dentcraft.ro/echipa/dr-razvan-petric` | YES |

All canonicals correctly match the current locale's URL. Previously fixed issue where all locales pointed to RO.

### Hreflang Implementation -- PASS

All pages include 4 hreflang alternates (ro, en, hu, x-default):

```
<link rel="alternate" hreflang="ro" href="https://www.dentcraft.ro/" />
<link rel="alternate" hreflang="en" href="https://www.dentcraft.ro/en" />
<link rel="alternate" hreflang="hu" href="https://www.dentcraft.ro/hu" />
<link rel="alternate" hreflang="x-default" href="https://www.dentcraft.ro/" />
```

**Dual delivery (best practice):**
- HTML `<link>` tags in `<head>` -- confirmed on all pages
- HTTP `Link` headers -- confirmed in response headers (e.g., `link: <https://www.dentcraft.ro/>; rel="alternate"; hreflang="ro"`)

Hreflang is reciprocal and consistent across all locale variants. Inner pages use localized pathnames correctly:
- `/servicii` <-> `/en/services` <-> `/hu/szolgaltatasok`
- `/echipa` <-> `/en/team` <-> `/hu/csapat`

### robots meta -- PASS

- All public pages: `<meta name="robots" content="index, follow">`
- Legal pages: set to `noIndex: true` -- correct for privacy/cookie/terms pages (pages now live with hardcoded content)

### Duplicate Content -- PASS

No duplicate content signals detected. Each locale has unique titles, descriptions, and content.

~~**Deduction (-8):**~~ **ALL FIXED:**
- ~~Twitter card is `summary` instead of `summary_large_image` on homepage~~ **FIXED:** Now `summary_large_image` in `generateRootMetadata()`
- ~~No og:image on homepage~~ **FIXED:** Default og:image added to `generateRootMetadata()`
- ~~Legal pages being 404~~ **FIXED:** Legal pages now serve hardcoded content with `noIndex: true`

Source: `/Users/raul/Projects/dentcraft/src/lib/seo.ts`

---

## 3. SECURITY (95/100)

### HTTPS Enforcement -- PASS

Redirect chain:
```
http://dentcraft.ro -> https://dentcraft.ro -> https://www.dentcraft.ro
```

Both hops work correctly. Final destination is the canonical `https://www.dentcraft.ro`.

### HSTS -- PASS
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```
Two years max-age with `includeSubDomains` and `preload` directives.

### Security Headers

| Header | Value | Status |
|--------|-------|--------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | PASS |
| `X-Frame-Options` | `SAMEORIGIN` | PASS |
| `X-Content-Type-Options` | `nosniff` | PASS |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | PASS |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | PASS |
| `X-DNS-Prefetch-Control` | `on` | PASS |
| `Content-Security-Policy` | Full CSP with whitelisted sources | PASS |

CSP allows: self, GTM, Google Analytics, Google Maps embeds, YouTube/Vimeo embeds, Sanity CDN images, Google user content images. Blocks plugins (`object-src 'none'`), restricts base URI and form actions, enforces `upgrade-insecure-requests`.

**Note:** CSP uses `'unsafe-inline'` and `'unsafe-eval'` for scripts due to GTM requirements. A nonce-based approach would be stricter but requires middleware changes.

**Deductions (-5):**
- **CSP uses unsafe-inline/unsafe-eval (-3):** Required for GTM compatibility. Could be hardened with nonce-based CSP in the future.
- **No X-XSS-Protection (-2):** Deprecated in modern browsers but helpful for older ones.

Source: `/Users/raul/Projects/dentcraft/next.config.ts` (headers function)

---

## 4. URL STRUCTURE (72/100)

### Clean URLs -- PASS

All URLs follow clean, readable patterns:
- `/servicii/implantologie` (RO)
- `/en/services/implantology` (EN)
- `/hu/szolgaltatasok/implantologia` (HU)

No query parameters, no file extensions, no session IDs.

### Hierarchy -- PASS

Clear hierarchical structure:
```
/                          (homepage)
/servicii                  (services index)
/servicii/[slug]           (individual service)
/echipa                    (team index)
/echipa/[slug]             (individual member)
/blog                      (blog index)
/blog/[slug]               (individual post)
/contact                   (contact)
/faq                       (FAQ)
/preturi                   (prices)
/galerie                   (gallery)
/testimoniale              (testimonials)
```

### Redirect Chains

| From | To | Status Code | Issue |
|------|----|-------------|-------|
| `http://dentcraft.ro` | `https://dentcraft.ro` | 308 | PASS (permanent) |
| `https://dentcraft.ro` | `https://www.dentcraft.ro` | 307 | WARNING |

**ISSUE: non-www to www redirect is 307 (Temporary), not 301 (Permanent)**

The previous audit noted this was fixed to 301 in Vercel Dashboard, but the live test shows **307**. This may be a Vercel behavior where the server returns 307 even when configured as permanent. From the earlier `curl` test:
```
https://dentcraft.ro -> 307 -> https://www.dentcraft.ro
```

This is a Vercel platform issue. Vercel's domain redirect system uses 307/308 internally. The HTTP->HTTPS hop uses 308 (permanent), which is correct. The non-www to www hop uses 307 (temporary). This should ideally be 301 or 308.

**Recommendation:** Verify in Vercel Dashboard that `www.dentcraft.ro` is set as the primary domain. If it is, this is a Vercel platform behavior that may not be changeable. Consider filing a support ticket with Vercel.

### Trailing Slash Consistency -- PASS

Next.js default: no trailing slashes. All URLs consistently omit trailing slashes.

### ~~CRITICAL: Broken Internal Links -- 3 Legal Pages are 404~~ FIXED

~~All 3 legal pages were returning 404.~~ **FIXED:** Legal pages now use hardcoded content in `src/data/legal-content.ts` instead of Sanity CMS. All 9 URL variants (3 pages x 3 locales) are pre-rendered as static HTML with `noIndex: true`.

| Page | Status | URLs |
|------|--------|------|
| Privacy Policy | **200 OK** | `/politica-confidentialitate`, `/en/privacy-policy`, `/hu/adatvedelmi-iranyelvek` |
| Cookie Policy | **200 OK** | `/politica-cookies`, `/en/cookie-policy`, `/hu/sutik-szabalyzata` |
| Terms & Conditions | **200 OK** | `/termeni-conditii`, `/en/terms-conditions`, `/hu/felhasznalasi-feltetelek` |

**Deductions (-5):**
- 307 redirect for www normalization instead of 301 (-5) -- Vercel platform behavior

---

## 5. MOBILE (95/100)

### Viewport Meta -- PASS
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Responsive Design -- PASS

Tested at 375x812 (iPhone 13 size):
- Header adapts to hamburger menu
- Hero text reflows properly
- CTA buttons are full-width and accessible
- Images scale responsively
- No horizontal overflow detected

### Touch Targets -- PASS

Buttons and links appear adequately sized (verified via screenshot). The "Programeaza consultatie" CTA button has clear padding and spacing.

### Font Sizing -- PASS

Text is readable at mobile sizes without zooming. Inter font loaded with `display: swap` for fast initial render.

### SSR on Mobile -- PASS

Content is rendered server-side, meaning mobile crawlers (Googlebot Mobile) receive the full HTML without needing JavaScript execution.

**Deduction (-5):**
- No explicit `maximum-scale` or `user-scalable` control (acceptable -- allowing zoom is actually WCAG-compliant)
- Could add `theme-color` meta tag for mobile browser chrome color

---

## 6. CORE WEB VITALS (N/A -- manual measurement required)

Targets:
- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Observations from source code

**Positive signals:**
- Next.js 15 SSR with prerendering (`x-nextjs-prerender: 1`, `x-vercel-cache: PRERENDER`)
- Image optimization enabled: AVIF + WebP formats, Next.js `<Image>` component
- Font preloading: Inter font WOFF2 files are `<link rel="preload">`
- Hero images preloaded: LCP candidate images have `<link rel="preload">`
- CSS split into separate files for better caching
- React strict mode enabled for catching issues early

**Potential concerns:**
- Homepage HTML is 727KB (`content-length: 727401`). This is large for initial HTML. Consider deferring below-fold content.
- Multiple image preloads may compete for bandwidth (logo, icons, hero images, team photo -- 8+ preloads)
- Google Reviews slider with marquee animation could affect CLS if not properly sized
- `stale-while-revalidate` time is 300s (`x-nextjs-stale-time: 300`)

**Recommendation:** Run PageSpeed Insights at https://pagespeed.web.dev for precise CWV measurements.

---

## 7. STRUCTURED DATA (75/100)

### Organization Schema (Global) -- PASS

Present on every page via root layout. Now uses `siteConfig.baseUrl` for consistent URLs:

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness", "Dentist"],
  "name": "Dentcraft",
  "description": "Clinica stomatologica moderna in Satu Mare",
  "url": "https://www.dentcraft.ro",
  "telephone": "0741 199 977",
  "email": "dentcraftsm@gmail.com",
  "address": { "@type": "PostalAddress", "postalCode": "440187", ... },
  "geo": { "@type": "GeoCoordinates", "latitude": 47.789, "longitude": 22.876 },
  "hasMap": "https://www.google.com/maps/place/DENTCRAFT/",
  "image": "https://www.dentcraft.ro/images/team-clinic.jpg",
  "openingHours": "Mo-Fr 10:00-18:00",
  "aggregateRating": { "ratingValue": "4.9", "reviewCount": "40" }
}
```

### WebSite Schema (Global) -- PASS (NEW)

Added to root layout alongside Organization schema:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dentcraft",
  "url": "https://www.dentcraft.ro",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://www.dentcraft.ro/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```

### Schema Issues -- Most Fixed

~~**ISSUE 1: Non-www URL in JSON-LD**~~ **FIXED:** All schemas now use `siteConfig.baseUrl` (`https://www.dentcraft.ro`).

~~**ISSUE 2: Missing og:image on homepage**~~ **FIXED:** Added default og:image to `generateRootMetadata()`.

~~**ISSUE 3: Homepage twitter:card**~~ **FIXED:** Now uses `summary_large_image`.

**ISSUE 4: FAQPage schema not rendered** -- Still open. PlaceholderFAQPage doesn't generate FAQPage schema. Requires Sanity content or code fix.

~~**ISSUE 5: Missing postalCode**~~ **FIXED:** Added `postalCode: '440187'` to all address schemas.

### Page-Level Schemas -- EXCELLENT

| Page Type | Schemas Present |
|-----------|----------------|
| All pages | LocalBusiness + MedicalBusiness + Dentist, AggregateRating, WebSite |
| Services | + BreadcrumbList |
| Team index | + BreadcrumbList |
| Team member | + Person, BreadcrumbList |
| Prices | + BreadcrumbList |
| Gallery | + BreadcrumbList |
| Blog index | + BreadcrumbList |
| Blog posts | + BlogPosting + Article (in code) |
| Contact | + BreadcrumbList |
| FAQ page | FAQPage (in code, but not rendered -- Sanity empty) |

### What's Still Missing

- **MedicalClinic** as additional @type (low priority)
- **Individual Review** schemas (only AggregateRating is present)
- FAQPage schema on placeholder FAQ page

**Deductions (-4):**
- FAQPage schema not rendered on placeholder page (-4)

---

## 8. JS RENDERING / SSR (95/100)

### Server-Side Rendering -- PASS

Verified via response headers:
```
x-nextjs-prerender: 1
x-vercel-cache: PRERENDER
```

The page is pre-rendered at build time and served as static HTML. All content is present in the initial HTML response without JavaScript execution.

### Body text content size

| Page | Body text length | Verdict |
|------|-----------------|---------|
| Homepage (RO) | ~20KB+ text | Full SSR |
| Homepage (EN) | 20,572 chars | Full SSR |
| Homepage (HU) | 20,794 chars | Full SSR |

### Hydration -- PASS

React hydrates the pre-rendered HTML. `suppressHydrationWarning` is set on `<html>` and `<body>` to prevent hydration warnings from browser extensions modifying the DOM.

### Google Consent Mode v2 -- PASS

Consent mode is initialized BEFORE GTM loads, using `window.dataLayer` with all consent types defaulting to `denied`. This is GDPR-compliant and ensures GTM fires correctly once consent is granted.

### llms.txt -- PASS

Present at `/llms.txt`. Contains structured information about the clinic, services, team, contact, and pricing. All URLs use `www.dentcraft.ro`.

**Deduction (-5):**
- Homepage HTML is 727KB which is large for initial payload. Consider lazy-loading below-fold sections.

---

## Summary of Issues

### Fixed Issues

| # | Issue | Status | Fix |
|---|-------|--------|-----|
| 1 | 3 legal pages are 404 | **FIXED** | Created hardcoded legal pages in `src/data/legal-content.ts` |
| 2 | Non-www URL in all JSON-LD schemas | **FIXED** | All schemas use `siteConfig.baseUrl` |
| 3 | Missing og:image on homepage | **FIXED** | Added to `generateRootMetadata()` |
| 4 | Missing CSP header | **FIXED** | Full CSP added to `next.config.ts` |
| 6 | Homepage twitter:card summary | **FIXED** | Changed to `summary_large_image` |
| 7 | HSTS missing includeSubDomains; preload | **FIXED** | Added to HSTS header |
| 8 | Missing postalCode in schema | **FIXED** | Added `postalCode: '440187'` |
| 11 | Missing WebSite schema | **FIXED** | Added `getWebSiteSchema()` with SearchAction |
| 12 | Missing image on LocalBusiness | **FIXED** | Added `image` property |
| 13 | Missing hasMap on LocalBusiness | **FIXED** | Added `hasMap` property |
| -- | Referrer-Policy weak value | **FIXED** | Changed to `strict-origin-when-cross-origin` |
| -- | Permissions-Policy incomplete | **FIXED** | Added `interest-cohort=()` |
| -- | Heading hierarchy H1->H3 skip | **FIXED** | Added sr-only H2 on Services, Team, Contact |
| -- | Hardcoded Romanian on EN/HU pages | **FIXED** | All breadcrumbs, labels, badges use `t()` |
| -- | Missing BreadcrumbList schema | **FIXED** | Added to Services, Team, Prices, Blog, Gallery, Contact |

### Remaining Issues

| # | Issue | Priority | Impact | Effort |
|---|-------|----------|--------|--------|
| 5 | FAQPage schema not rendered on placeholder | Medium | Missing rich result | 30 min |
| 9 | 307 redirect for www normalization | Medium | Temporary redirect | Vercel Dashboard |
| 10 | Implement IndexNow for Bing/Yandex | Low | Faster non-Google indexing | 1 hr |
| 14 | Reduce homepage HTML size (727KB) | Low | Faster TTFB | 2-4 hrs |
| 15 | Add `theme-color` meta tag | Low | Mobile browser chrome color | 5 min |
| 16 | Expand blog content (1 post) | Low | Topical authority | Ongoing |

---

## What's Working Well

1. **Canonical and hreflang implementation** -- Correctly configured across all 3 locales with dual delivery (HTML + HTTP headers)
2. **Sitemap** -- Dynamic, uses localized pathnames, final destination URLs
3. **robots.txt** -- Smart AI crawler strategy, correct blocking of internal routes
4. **SSR/Prerendering** -- Full content in initial HTML, Vercel edge caching
5. **Mobile responsiveness** -- Clean responsive design, proper viewport meta
6. **Security headers** -- 5 out of 6 key headers present (missing CSP only)
7. **Structured data** -- Rich schema with LocalBusiness, MedicalBusiness, Dentist, AggregateRating, Person, BreadcrumbList
8. **Localized pathnames** -- SEO-friendly URLs in each language
9. **Image optimization** -- AVIF/WebP, Next.js Image component, responsive srcsets
10. **Google Consent Mode v2** -- GDPR-compliant consent management

---

## Files Referenced

| File | Purpose |
|------|---------|
| `src/lib/seo.ts` | SEO configuration, metadata generation, hreflang, canonical |
| `src/lib/schema.ts` | JSON-LD structured data schemas |
| `src/app/robots.ts` | robots.txt generation |
| `src/app/sitemap.ts` | sitemap.xml generation |
| `src/app/[locale]/layout.tsx` | Root layout, organization schema injection |
| `src/app/[locale]/page.tsx` | Homepage |
| `src/app/[locale]/faq/page.tsx` | FAQ page with FAQPage schema |
| `src/app/[locale]/[...slug]/page.tsx` | Legal pages (catch-all route) |
| `src/i18n/config.ts` | Locale and pathname configuration |
| `src/i18n/routing.ts` | next-intl routing configuration |
| `src/middleware.ts` | Internationalization middleware |
| `next.config.ts` | Security headers, image config |
| `public/llms.txt` | LLM-readable site description |
