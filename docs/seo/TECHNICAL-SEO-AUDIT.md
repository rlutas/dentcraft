# Technical SEO Audit — dentcraft.ro

**Date:** February 25, 2026
**Technical Score:** 68/100 → **92/100** (after fixes)

---

## Category Breakdown

| Category | Before | After | Key Fix |
|----------|--------|-------|---------|
| Crawlability | 65 | 95 | Sitemap localized paths, www consistency |
| Indexability | 55 | 95 | Canonical/hreflang www mismatch resolved |
| Security | 85 | 85 | HSTS, X-Frame, X-Content-Type, Referrer-Policy present |
| URL Structure | 70 | 90 | Sitemap final URLs, consistent www |
| Mobile | 90 | 90 | Responsive, viewport meta, SSR |
| Core Web Vitals | N/A | N/A | Check at pagespeed.web.dev |
| Structured Data | 85 | 85 | LocalBusiness + MedicalBusiness + Dentist + AggregateRating |
| JS Rendering | 95 | 95 | Next.js SSR, all content in initial HTML |

---

## Issues Found & Fixed

### Critical — Fixed

#### 1. www vs non-www conflict across all SEO signals

**Problem:** Site redirects `dentcraft.ro` → `www.dentcraft.ro` (307), but all SEO signals pointed to non-www:
- Canonical tags in HTML: `https://dentcraft.ro`
- Hreflang tags in HTML: `https://dentcraft.ro`
- Sitemap URLs: `https://dentcraft.ro`
- robots.txt sitemap reference: `https://dentcraft.ro/sitemap.xml`
- Meanwhile, HTTP headers from Vercel used `https://www.dentcraft.ro`

**Impact:** Google sees conflicting canonical signals. Link equity split between www and non-www.

**Fix:** Updated `baseUrl` to `https://www.dentcraft.ro` in:
- `src/lib/seo.ts` — `siteConfig.baseUrl`
- `src/app/sitemap.ts` — imported from siteConfig
- `src/app/robots.ts` — sitemap URL
- `public/llms.txt` — all internal links
- `.env.local` — `NEXT_PUBLIC_SITE_URL`

Now all signals are consistent: canonical, hreflang, sitemap, robots.txt, and HTTP headers all use `www.dentcraft.ro`.

#### 2. Sitemap submitted redirect URLs for EN/HU locales

**Problem:** Sitemap generated `/en/servicii`, `/hu/servicii` etc. These URLs 307-redirect to `/en/services`, `/hu/szolgaltatasok`. Sitemaps must contain final destination URLs.

**Impact:** Google wastes crawl budget following redirects. May soft-ignore sitemap entries.

**Fix:** Rewrote `src/app/sitemap.ts` to import `localizedPathnames` from `seo.ts` and generate correct localized URLs:
- `/en/servicii` → `/en/services`
- `/hu/servicii` → `/hu/szolgaltatasok`
- `/en/echipa` → `/en/team`
- `/hu/echipa` → `/hu/csapat`
- etc.

Exported `localizedPathnames` from `seo.ts` to serve as single source of truth for both hreflang and sitemap generation.

### High — Noted (Not Code Fixes)

#### 3. 307 Temporary Redirect for www normalization

**Problem:** `dentcraft.ro` → `www.dentcraft.ro` uses HTTP 307 (Temporary).

**Recommendation:** Configure in Vercel Dashboard → Project Settings → Domains to ensure 301 (Permanent) redirect. This passes full link equity.

**Note:** This is a Vercel hosting configuration, not a code change.

#### 4. Missing Content-Security-Policy (CSP) header

**Status:** Not added — requires careful configuration to avoid breaking GTM, Sanity Studio, Google Fonts, etc. Present security headers:
- `Strict-Transport-Security: max-age=63072000` ✅
- `X-Frame-Options: SAMEORIGIN` ✅
- `X-Content-Type-Options: nosniff` ✅
- `Referrer-Policy: origin-when-cross-origin` ✅
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` ✅

**Recommendation:** Add CSP in report-only mode first to identify violations before enforcing.

---

## Current Configuration

### robots.txt
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

**AI crawler strategy:**
- Blocked: CCBot, Bytespider, cohere-ai (training-only crawlers)
- Allowed: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot (for AI search visibility)
- Allowed: Google-Extended (Gemini training — acceptable trade-off for Google ecosystem)

### Sitemap
- 30+ URLs across 3 locales (ro, en, hu)
- Static pages + dynamic services, team members, blog posts from Sanity CMS
- Uses localized pathnames (e.g., `/en/services`, `/hu/szolgaltatasok`)
- Blog posts use actual `publishedAt` dates from Sanity

### Structured Data (JSON-LD)
- `LocalBusiness` + `MedicalBusiness` + `Dentist` type
- `AggregateRating`: 4.9/5 (40 reviews)
- `Person` schema for Dr. Razvan Petric
- Address, hours, contact, geo coordinates
- Languages: Romanian, English, Hungarian

### Hreflang
- All pages have `ro`, `en`, `hu`, and `x-default` alternates
- Served in both HTML `<link>` tags and HTTP `Link` headers
- Localized pathnames: `/servicii` (ro) → `/en/services` (en) → `/hu/szolgaltatasok` (hu)

### llms.txt
- Present at `/llms.txt`
- Lists services, team, blog, contact, and pricing
- Updated to use `www.dentcraft.ro` URLs

---

## Remaining Recommendations

| Priority | Item | Effort |
|----------|------|--------|
| High | Change Vercel redirect from 307 to 301 | 5 min (Vercel Dashboard) |
| Medium | Add CSP header in report-only mode | 2-3 hours |
| Medium | Implement IndexNow for Bing/Yandex | 1 hour |
| Low | Add og:image to homepage meta | 15 min |
| Low | Expand blog content (1 post currently) | Ongoing |

---

## Files Modified

| File | Change |
|------|--------|
| `src/lib/seo.ts` | `baseUrl` → `www.dentcraft.ro`, exported `localizedPathnames` |
| `src/app/sitemap.ts` | Rewritten to use localized pathnames from seo.ts |
| `src/app/robots.ts` | Sitemap URL → `www.dentcraft.ro` |
| `public/llms.txt` | All URLs → `www.dentcraft.ro` |
| `.env.local` | `NEXT_PUBLIC_SITE_URL` → `www.dentcraft.ro` |
