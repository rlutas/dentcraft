# Google Tag Manager + GA4 + Google Ads Conversion Tracking

## Overview

DENTCRAFT uses **Google Tag Manager (GTM)** as the entry point for all tracking, including the Google Ads tag (AW-18165025740) and Conversion Linker. (Until 24 Nov 2026 gtag.js was also loaded directly in layout.tsx; removed because it duplicated the GTM Google tag.)

**Tracking IDs:**
- **GTM:** `GTM-MHB5K5LL` (via @next/third-parties)
- **GA4 Measurement ID:** `G-8WF0LQ5PEX` (configured as a tag inside GTM)
- **Google Ads Conversion ID:** `AW-18165025740` (gtag.js installed in layout.tsx)
- **Form Submission Conversion Label:** `AW-18165025740/6tECCPjmna8cEMyX4dVD`

---

## Architecture

```
Site (Next.js)                    GTM Container
┌──────────────────┐              ┌──────────────────────┐
│ Consent Mode v2  │──defaults──> │ GA4 Config Tag       │
│ (denied by       │              │ (G-8WF0LQ5PEX)      │
│  default)        │              │                      │
│                  │              │ GA4 Event Tags:      │
│ Cookie Banner    │──update───>  │  - generate_lead     │
│ (accept/deny)    │              │  - click_whatsapp    │
│                  │              │  - click_phone       │
│ Form Submissions │──dataLayer─> │                      │
│ WhatsApp Click   │──dataLayer─> │ Google Ads Conversion│
│ Phone Click      │──via GTM──>  │  - Form submissions  │
└──────────────────┘              └──────────────────────┘
```

---

## GDPR / Consent Mode v2

All tracking starts **denied by default**. The flow:

1. `layout.tsx` loads an inline `<script>` in `<head>` that sets Consent Mode v2 defaults:
   - `analytics_storage: denied`
   - `ad_storage: denied`
   - `ad_user_data: denied`
   - `ad_personalization: denied`
   - `wait_for_update: 2000` (ms to wait for consent CMP)

2. GTM loads via `<GoogleTagManager>` from `@next/third-parties/google`

3. Cookie consent banner appears for new visitors (800ms delay)

4. When user makes a choice:
   - **Accept All**: `updateGoogleConsent(true, true)` — grants everything
   - **Essential Only**: `updateGoogleConsent(false, false)` — stays denied
   - **Custom**: grants/denies based on toggles

5. Returning visitors: consent is restored from `localStorage` on mount via `updateGoogleConsent()`

6. Google tags automatically respect Consent Mode — no manual consent config needed per tag in GTM

---

## DataLayer Events

### `generate_lead` — Form Submissions

Fires after successful submission of any form.

| Property | Type | Description |
|----------|------|-------------|
| `event` | string | Always `generate_lead` |
| `form_type` | string | `contact` / `callback` / `price_estimate` |
| `currency` | string | Always `RON` |
| `service_name` | string? | Selected service (if applicable) |
| `doctor_name` | string? | Selected doctor (callback form only) |

**Sources:**
- `ContactForm/index.tsx` — after `/api/contact` returns 200
- `CallbackPopup/index.tsx` — after `/api/callback` returns 200
- `PriceEstimatePopup.tsx` — after `/api/price-estimate` returns 200

### `click_whatsapp` — WhatsApp Button Click

| Property | Type | Description |
|----------|------|-------------|
| `event` | string | Always `click_whatsapp` |
| `link_url` | string | `https://wa.me/40741199977` |

**Source:** `WhatsAppButton/index.tsx` — onClick handler

### `click_phone` — Phone Number Click

Fires on any `<a href="tel:...">` click. Handled by `GlobalLinkTracker` component (document-level listener in layout).

| Property | Type | Description |
|----------|------|-------------|
| `event` | string | Always `click_phone` |
| `link_url` | string | `tel:+40741199977` |

**Source:** `GlobalLinkTracker.tsx` — document-level click listener

---

## Google Ads Native Conversion (via GTM)

In addition to dataLayer events that route through GA4 → Google Ads import,
**form submissions fire a native Google Ads conversion** via GTM tag for
maximum attribution precision and faster bidding optimization.

### Setup
- Base tag `AW-18165025740` loaded via GTM ("Eticheta Google AW-18165025740", Initialization - All Pages) + Conversion Linker tag
- Conversion fires via GTM tag (not from code — avoids double-counting):
  - **Tag type:** Google Ads Conversion Tracking
  - **Conversion ID:** `18165025740` (no AW- prefix in this template field)
  - **Conversion Label:** `6tECCPjmna8cEMyX4dVD`
  - **Trigger:** Custom Event = `generate_lead`
- `src/lib/gtm.ts` → `trackFormSubmission()` only pushes `generate_lead` to dataLayer
  (GTM picks it up via the Custom Event trigger)

### CSP requirements
`next.config.ts` allows these endpoints in CSP (required for conversion hits):
- `script-src`: `www.googleadservices.com`
- `img-src`: `www.googleadservices.com`, `googleads.g.doubleclick.net`
- `connect-src`: `googleadservices.com`, `googleads.g.doubleclick.net`,
  `td.doubleclick.net`, `google.com`, `google.ro`
- `frame-src`: `td.doubleclick.net`

Without these, GTM fires the tag but the actual conversion hit fails with CSP
violation — Google Ads dashboard would show 0 conversions despite real leads.

### Google Business Profile (GBP) link
GBP `dentcraftsm@gmail.com` is linked to Google Ads via Tools → Linked accounts.
Location asset added at account level — ads display address + km distance +
map pin + rating, and are eligible to appear on Google Maps.

### Coverage
The conversion fires on success of ALL 3 forms:
- ContactForm (`/contact`)
- CallbackPopup (any page)
- PriceEstimatePopup (after `/preturi` calculator)

### Verification
1. Open `www.dentcraft.ro/contact` in Incognito
2. Open DevTools → Network → filter `googleadservices.com` or `google.com/pagead`
3. Submit form → expect `POST` with `label=6tECCPjmna8cEMyX4dVD`
4. Or use [tagassistant.google.com](https://tagassistant.google.com) — "Conversion fired: AW-18165025740/..." should appear

### Conversion actions in Google Ads
| Action | Source | Primary? |
|---|---|---|
| Form Submission (gtag) | Native gtag, fires from `lib/gtm.ts` | ✅ **Primary** — Maximize Conversions optimizes on this |
| Phone Click | GA4 event `click_phone` (imported) | Secondary |
| WhatsApp Click | GA4 event `click_whatsapp` (imported) | Secondary |

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/gtm.ts` | GTM utilities: `pushToDataLayer`, `updateGoogleConsent`, `trackFormSubmission`, `trackWhatsAppClick`, `trackPhoneClick` |
| `src/app/[locale]/layout.tsx` | GTM script, Consent Mode v2 defaults, noscript fallback |
| `src/components/features/CookieConsent/index.tsx` | Calls `updateGoogleConsent()` on consent change + restore for returning visitors |
| `.env.local` | `NEXT_PUBLIC_GTM_ID=GTM-MHB5K5LL` |

---

## GTM Container Setup

### Variables (Data Layer)
- `DLV - form_type` → Data Layer Variable, name: `form_type`
- `DLV - service_name` → Data Layer Variable, name: `service_name`
- `DLV - doctor_name` → Data Layer Variable, name: `doctor_name`

### Triggers
- **Consent Initialization - All Pages** (built-in) — for GA4 Config
- **Custom Event: `generate_lead`** — for form submission tags
- **Custom Event: `click_whatsapp`** — for WhatsApp click tag
- **Click - Just Links** (URL contains `tel:`) — for phone click tag

### Tags
1. **GA4 Config** — Google Tag, ID: `G-8WF0LQ5PEX`, trigger: Consent Initialization - All Pages
2. **GA4 - Form Submission** — GA4 Event, event: `generate_lead`, params: form_type, service_name, doctor_name
3. **GA4 - WhatsApp Click** — GA4 Event, event: `click_whatsapp`
4. **GA4 - Phone Click** — GA4 Event, event: `click_phone`
5. **Google Ads - Form Conversion** — Google Ads Conversion Tracking, trigger: generate_lead

---

## Status

**Tested and verified on February 25, 2026.**

All events confirmed working in GTM Preview mode:
- GA4 Config fires on page load
- `generate_lead` fires on form submission
- `click_whatsapp` fires on WhatsApp button click
- `click_phone` fires on phone link click
- Consent Mode blocks tags when cookies not accepted
- GTM container published

---

## Future / Optional

These are not set up yet — add when needed:

| Item | When to add |
|------|-------------|
| **Google Ads Conversion Tag** | When creating Google Ads campaigns. Go to Google Ads > Goals > Conversions > create "Submit lead form" > copy Conversion ID + Label > add tag in GTM with trigger `generate_lead` |
| **Google Ads Remarketing Tag** | When setting up remarketing audiences in Google Ads |
| **Enhanced Conversions** | When you want better attribution — add user data (email/phone) to conversion tags |
| **Scroll Depth Tracking** | If you want to track how far users scroll on blog posts |
| **Video Engagement** | If you add embedded videos and want to track play/pause/completion |

---

## Testing (for future changes)

1. Open GTM Preview mode
2. Visit site — verify GA4 Config fires (or is blocked without consent)
3. Accept cookies — verify tags activate
4. Submit a form — verify `generate_lead` event in debugger
5. Click WhatsApp — verify `click_whatsapp` event
6. Click phone link — verify phone click trigger fires
7. Publish GTM container when all verified
