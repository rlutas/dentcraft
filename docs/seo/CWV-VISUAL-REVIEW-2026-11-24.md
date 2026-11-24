# DENTCRAFT: Core Web Vitals and visual/UX review (24 Nov 2026)

Live site: https://www.dentcraft.ro. Review only, no code changes.
Screenshots are in `agent-skills/.playwright-mcp/review-2026-11-24/`. Each filename is `<page>-<m|d>-<fold|full>.png`, where m = 390x844 and d = 1440x900. `psi-extract.js` in the same folder is the helper used to scrape the PSI UI.

> **Production deployed four times during the review** (11:20–11:45 EET): `dpl_Fy9aSWiG…` → `dpl_68BGKZTW…` → `dpl_3PRYwdBA…` → `dpl_GTXe79FX…`. That includes commits `a9790ee` (implantologie merge) and `66c2bc3` (real Google reviews on /testimoniale).
> - **PSI runs:** 11:22–11:27, on `dpl_Fy9a…`.
> - **First visual pass:** about 11:29–11:34, on `dpl_Fy9a…` or `dpl_68BG…`. That covers all `*-m-*`, plus `*-d-fold`, preturi-d, contact-d and remus-fernea-d.
> - **Re-shot about 11:42–11:50** on `dpl_3PRY…` or `dpl_GTXe…`: home-d-full, echipa-d-full, servicii-d-full, ortodontie-d-full, testimoniale-m/d-full, contact-m-map.
> - **curl, network and DOM figures:** `dpl_GTXe…` unless stated.
>
> Findings already fixed by a later deploy were dropped (for example, the homepage links to `/servicii/implantologie`, and the placeholder "Maria P." testimonials).

---

## Part 1: Core Web Vitals

### 1.1 PageSpeed Insights summary (mobile unless noted)

Lab figures are from a **single PSI run** per page (Lighthouse 13.6, Moto G Power, slow 4G, simulated throttling).

| Page | Field (CrUX, 28 days) | Field source | Lab perf | Lab LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|---|
| `/` | **FAIL**: LCP 2.9 s ✗, INP 213 ms ✗, CLS 0 ✓ (FCP 1.9 s, TTFB 0.5 s) | URL-level | 74 | 8.1 s | 120 ms | 0 | 3.4 s |
| `/preturi` | **FAIL**: LCP 1.8 s ✓, INP 206 ms ✗, CLS 0 ✓ (FCP 1.8 s, TTFB 0.6 s). INP is the only failure. | URL-level | 96 | 1.1 s | 220 ms | 0 | 2.6 s |
| `/servicii/implanturi-dentare` | URL: **insufficient data** ("This URL" disabled). Origin fallback: LCP 2.8 s ✗, INP 204 ms ✗, CLS 0 ✓ | origin | 68 | 7.7 s | 250 ms | 0 | 4.6 s |
| `/servicii/pedodontie` | URL: **insufficient data**. Origin fallback as above | origin | 74 | 7.7 s | 130 ms | 0 | 3.1 s |
| `/` desktop | **No Data** | — | 94 | 1.6 s | 40 ms | 0 | 1.0 s |

**Origin (mobile):** fails. LCP 2.8 s, INP 204 ms, CLS 0, FCP 1.8 s, TTFB 0.5 s.

INP is just above 200 ms everywhere. LCP fails on `/` and at origin level. Screenshot: `psi-home-mobile.png`.

### 1.2 Top 5 per page (from PSI)

The "LCP render delay" figures come from the observed trace, so they do not add up to the simulated lab LCP.

| Page | 1. LCP element and breakdown | 2. Render-blocking CSS | 3. Unused JS | 4. Third parties | 5. Other |
|---|---|---|---|---|---|
| `/` mobile | Hero subtitle `<p>` (FramedHero). TTFB 280 ms + **render delay 3,130 ms** | 630 ms | 465 KiB | GTM/gtag 509 KiB, 309 ms main thread | DOM size 2,765 elements; 4 long tasks; legacy JS 12 KiB; forced reflow 67 ms |
| `/preturi` | Disclaimer `<p class="text-center text-sm">`. TTFB 160 ms + render delay 700 ms | 620 ms | 466 KiB | 509 KiB, 380 ms | Network dependency tree: critical path 775 ms (HTML → 2 CSS), no preconnects; 5 long tasks |
| `/servicii/implanturi-dentare` | ServiceHero intro `<p>`. TTFB 220 ms + **render delay 2,500 ms** | 540 ms | 465 KiB | 509 KiB, 306 ms | **Minimize main-thread work 2.0 s**; DOM size; 6 long tasks |
| `/servicii/pedodontie` | ServiceHero intro `<p>`. TTFB 340 ms + **render delay 2,320 ms** | 550 ms | 466 KiB | 509 KiB, 301 ms | DOM size; 5 long tasks |
| `/` desktop | Hero subtitle `<p>`. TTFB 240 ms + render delay 2,460 ms | 100 ms | 466 KiB | 509 KiB, 325 ms | Image delivery 28 KiB (landscape hero served at 1818×1280, shown at 1410×940); forced reflow |

Common detail behind these:

- **The LCP is text gated by framer-motion, not an image.**
  - The server HTML ships the hero `<p>` as `style="opacity:0;transform:translateY(8px)"`. It becomes visible only after hydration plus `delay: 0.85s`, `duration: 0.6s` (`src/components/sections/FramedHero.tsx:133-139`).
  - The h1 word and letter spans and the CTA (`delay: 1.0`) also start at opacity 0. `src/components/sections/ServiceHero.tsx` uses the same pattern.
  - The homepage HTML has 121 elements SSR'd with `opacity:0`.
- **Render-blocking CSS:** `2aaf14b7….css` (26.9 KiB) and `929bc861….css` (3.0 KiB).
- **Unused JS, first-party (244 KiB):**
  - Chunk `ed9f2dc4-….js` is 211.6 KiB transferred and reported 100 % unused. It contains Next.js `next-devtools/dev-overlay` module strings and is still present on `dpl_GTXe…`. Root cause not verified (Next 15.5.9).
  - Chunk `1255-…` is 64 KiB, about 32 KiB unused.
- **Unused JS, third-party (222 KiB):** `gtm.js` 152 KiB, `gtag/js?id=G-8WF0LQ5PEX` 193 KiB (loaded by GTM), `gtag/js?id=AW-18165025740` 162 KiB (loaded directly in `src/app/[locale]/layout.tsx:82-98`). The gtag library is downloaded **twice**. GTM and gtag account for 3–4 of the 4–6 long tasks (58–125 ms each), the likely reason INP sits just above 200 ms.
- **Homepage HTML on `dpl_GTXe…`:**
  - Size: 937 KB raw, 69 KB brotli.
  - Approximate makeup: inline SVG 461 KB (716 `<svg>`, of which **547 are lucide `Star` icons and 110 the inline Google "G"**), RSC payload scripts 212 KB, class attributes 180 KB.
  - Source: `GoogleReviewsSlider` server-renders every review.
  - The 2,765-element DOM figure is from the PSI run on the earlier 725 KB build; the current build is larger.

### 1.3 Known suspects: verdict

| Suspect | Verdict | Evidence |
|---|---|---|
| Every page served `Cache-Control: no-store` | **Confirmed** | `private, no-cache, no-store, max-age=0, must-revalidate` on all 11 URLs checked: `/`, `/en`, /preturi, /servicii, implanturi, pedodontie, ortodontie, /echipa, /echipa/remus-fernea, /contact, /testimoniale. `x-vercel-cache: MISS`. Cause: `cookies()` at `src/app/[locale]/layout.tsx:56` (maintenance-preview bypass). **Caveat:** responses also send `set-cookie: NEXT_LOCALE=ro` from the next-intl middleware. After removing `cookies()`, verify that Vercel actually caches the page (`x-vercel-cache: HIT`); next-intl's `localeCookie` option may need adjusting. |
| Homepage HTML about 725 KB | **Confirmed, now 937 KB raw / 69 KB brotli** | Service pages are 795–817 KB raw (59–63 KB br), /testimoniale 739 KB (42 KB br), /preturi 255 KB. Transfer size is modest; the cost is parse, DOM and hydration. |
| 7.6 MB video loaded on scroll | **Confirmed** | `/video/clinica.mp4` is 7,955,074 B: 1920×1080 H.264, 2.2 Mbps, 28.3 s. `LazyVideo` uses `preload="auto"` and `autoPlay`, with a 200 px rootMargin (`src/components/ui/LazyVideo.tsx:68-74`). In a 390 px session, scrolling past it requested `bytes=0-`, and 18.7 of 28.3 s were buffered within seconds (about 5 MB) for a 350×262 box. Desktop buffered 21.2 s. Served with `max-age=0, must-revalidate`. |
| Both hero images preloaded | **Confirmed: both are downloaded** | Measured at DPR 1 (real phones pick larger candidates). At 390 px: portrait 640w (43.7 KB) **and** landscape 640w (13.1 KB, unused). At 1440 px: landscape 1920w (66.6 KB) **and** portrait 640w (unused). `sizes="… 0px"` still selects the smallest candidate, so the hidden variant is always fetched. Both use `q=95`; the logo is also preloaded. Because the LCP element is text, these preloads **do not drive LCP today**. They compete for early bandwidth. |
| Google tag scripts preloaded, competing with the LCP image | **Partly confirmed** | `<link rel="preload" as="script">` exists for `gtm.js` and `gtag/js?id=AW-…`, emitted by `@next/third-parties` `GoogleTagManager` and by `<Script strategy="afterInteractive">`. They compete for bandwidth and drive the long tasks (TBT and INP), but LCP is dominated by the hydration plus animation delay on hero text. |

### 1.4 Recommended performance fixes (in impact order; re-measure after each)

1. **Render the hero text visible on the server.** Drop `initial={{opacity:0}}` on the hero and ServiceHero `<p>`, h1 and CTA. If you keep an entrance effect, animate `transform` only or use CSS that starts from opacity 1. The 2.3–3.1 s render delay should collapse to roughly hydration time. Apply the same to `ScrollReveal` for above-the-fold content.
2. **Make pages cacheable.** Move the maintenance and preview gate from the root layout's `cookies()` into `middleware.ts`. Expected result: static or ISR pages served from the edge with much lower TTFB (field TTFB is 0.5–0.6 s today). Verify with `x-vercel-cache`.
3. **Load Google tags once.** Move the AW-18165025740 tag and its conversions into GTM and delete the direct gtag script (about 162 KiB and one long task). Consider loading GTM on idle or on first interaction. Consent Mode already waits 2 s.
4. **Shrink the reviews DOM.**
   - Show 8–12 reviews in the slider and link to the rest.
   - Use one SVG `<symbol>` sprite (or one 5-star SVG) instead of five inline lucide stars per card.
   - Trim the props passed through RSC.
5. **Video.** Ship a 720p or 540p mobile encode (about 1 MB) or a 6–8 s loop. Use `preload="metadata"`, start playback when the video is 50 % visible, and give it a hashed filename with long cache headers.
6. **Hero images.** Use one `<picture>` with `<source media>`, or render only the matching variant with `priority`. Use `q=75–80`.
7. **Chunk `ed9f2dc4`.** Investigate why the 211 KiB dev-overlay chunk loads on every page; re-check after a Next patch upgrade.

---

## Part 2: Visual and UX review

Method:
- Each page was scrolled in 450–500 px steps, then ScrollReveal and framer elements were force-revealed. Re-shoots force only inline `style.opacity==='0'` inside `<main>`.
- Artifacts I discarded:
  - **Mega-menu open in the first desktop full shots:** caused by over-broad forcing; re-shot.
  - **Second hero at the bottom of `home-m-full.png`:** Chromium's 16,384 px capture limit. See `home-m-bottom.png`.
  - **Blank /contact map:** a lazy iframe. It renders in `contact-m-map.png`.
  - **Blank main gallery image:** lazy-load timing. It renders in `home-m-gallery.png`.
  - **"Satu Mare 2026" zero-hit:** a heading, not a counter.

Pages reviewed at both viewports: `/`, `/servicii`, `/servicii/ortodontie`, `/echipa`, `/echipa/remus-fernea`, `/preturi`, `/contact`, `/testimoniale`.
- **/servicii and /contact:** no layout defects beyond the shared issues below (diacritics, label contrast, double CTA).
- **No horizontal overflow at 390 px** on any page.

### 2.1 Prioritized issues

**P0**

1. **The homepage hero's primary CTA is dead.**
   - Viewport: both. Screenshots: `home-m-fold.png`, `home-m-hero-cta-click.png`, `home-d-fold.png`.
   - "Programează acum" is `href="#contact"`, but no `id="contact"` exists on the homepage. This was checked with `getElementById` on the latest deploy at 390 and 1440 px. Clicking only changes the URL hash.
   - Fix: link to `/contact` or `tel:`, open `CallbackPopup`, or put `id="contact"` on the final CTA band. File: `src/components/sections/FramedHero.tsx:150`.

**P1**

2. **Counters SSR as "0+", and reduced motion causes a hydration error.**
   - The "10+ ani experiență" and "1500+ pacienți" overlay on the homepage video is server-rendered as `0<!-- -->+`. Crawlers and no-JS users see "0+"; there is no visual impact once JS runs.
   - With `prefers-reduced-motion: reduce` emulated, a clean homepage load **reproduced React error #418** (hydration mismatch). With no emulation it did not reproduce. `CountUp` calls `useState(reduce ? end : 0)`, and `useReducedMotion()` is null on the server, which makes it the likely source. Other framer `initial` values may contribute.
   - Fix: initialise with `end`, then animate after mount. File: `src/components/ui/CountUp.tsx`.
3. **"Realizat de specialiști" on service pages always shows Dr. Petric.**
   - Seen on the latest deploy on ortodontie, implanturi-dentare, pedodontie and estetica-dentara. Screenshots: `ortodontie-m-full.png`, `ortodontie-d-full.png`.
   - It is a generic block, but it is most jarring on /ortodontie, where the team's orthodontist is "Dr. Cozma Stefana" (as spelled on the site), and on /pedodontie.
   - Fix: map service → doctor(s) and show the relevant specialist.
4. **Empty year pills on the doctor timeline.**
   - Page: `/echipa/remus-fernea`. Viewport: both. Screenshots: `remus-fernea-m-full.png`, `remus-fernea-d-full.png`.
   - Four of the five "Parcurs profesional" entries show a pill containing only "•". It looks unfinished.
   - Fix: hide the pill when there is no year, or add the years.
5. **The homepage review count lags behind the rest of the site.**
   - The homepage badge still says "**50+** recenzii pe Google". The service pages (`ortodontie-d-full.png`) say "79+", and /testimoniale says "79 recenzii". Not wrong, but inconsistent.
   - Fix: derive the count from `src/data/google-reviews.json` everywhere.
6. **/testimoniale is one long wall of reviews.**
   - Height: 25,800 px on mobile, 10,750 px on desktop. Screenshots: `testimoniale-m-full.png`, `testimoniale-d-full.png`.
   - It renders 54 text reviews with no pagination.
   - On desktop, the grid rows use equal heights, so one-line reviews ("Minunat, un loc deosebit.") sit in tall, mostly empty cards.
   - The heading lacks the serif-italic accent used elsewhere and has no diacritics ("Ce spun pacientii nostri", "multumiti").
   - Fix: show 12 reviews with "Vezi mai multe", use a CSS-columns masonry layout, and apply the standard heading pattern.
7. **Gallery thumbnail captions collide with the photos.**
   - Viewport: mobile, homepage. Screenshot: `home-m-gallery.png`.
   - Two-line captions on 110 px thumbnails ("Recepția / DENTCRAFT", "Cabinet de / tratament") overlap busy areas, one runs into the "DENTCRAFT" lettering on the reception desk, and the first thumbnail (a treatment chair) was captioned "Sala de așteptare" at review time.
   - Commit `61026bc` ("correct gallery alt") may already cover the label; re-check.
   - Fix: hide thumbnail captions on mobile, or add a gradient scrim and limit captions to one line.
8. **No CTA in the first screen of /preturi on mobile.**
   - Screenshot: `preturi-m-fold.png`.
   - The first interactive element is at y≈790 of 844.
   - Fix: add a "Calculează prețul" plus phone row under the subtitle, or reduce the hero padding.
9. **Very long mobile pages.**
   - The homepage is 17,007 px (`home-m-full.png`) because several stacks of tall cards are stacked one after another: six service cards with 220 px art, three 650 px Shorts cards, four case cards. /echipa (`echipa-m-full.png`) uses a single column of seven 650 px cards, while the homepage team grid is a compact two-column layout.
   - Fix: use scroll-snap carousels for the Shorts and cases, reuse the two-column team card on /echipa, and use smaller service art on mobile.
10. **Missing diacritics, mixed within the same screen.**
    - Examples: "Estetica Dentara", "Protetica Dentara", "Stomatologie Generala", "Calculeaza pretul", "Programeaza o consultatie", "Suntem aici pentru zambetul tau perfect", "Gaseste-ne", "Obtine indicatii", "Spatiu Confortabil", "Consultatie/discutie", "Specialisti dedicati cu experienta vasta".
    - These sit next to correct copy ("Programează acum", "Prețuri").
    - The footer service list still labels the implants link "Implantologie" (confirmed in the latest HTML), while the page is now "Implanturi Dentare".
    - Fix: one pass through `src/messages/ro.json` and the Sanity service titles and descriptions.
11. **Small tan labels just miss AA contrast.**
    - Computed colour is `rgb(139,115,85)` (#8b7355) on white at 10–12 px, which is **4.49:1** (AA needs 4.5:1).
    - Affected: "AFLĂ MAI MULT", the team role lines ("Medic Stomatolog", "Specialist Parodontolog"), the "ani experiență" stat label, and the "Pasul 1" and "De ce să alegi DENTCRAFT" kickers on service pages.
    - The hero kicker (`#d4c4b0` at 90 % opacity over the photo) is hard to read on desktop (`home-d-fold.png`).
    - Fix: about `#7a6347` for small labels, and a text-shadow or lighter tone for the hero kicker.
12. **Service card copy is keyword-heavy and uneven.**
    - Screenshots: `home-d-full.png`, `servicii-d-full.png`.
    - "Implanturi Dentare" has one line; the others have 4–6 lines of SEO copy, which leaves ragged gaps in the grid.
    - /servicii lists 9 services, but the homepage grid, mega-menu and footer list only 6. Endodonție, Chirurgie and Urgențe appear only on /servicii.
    - Fix: one or two plain sentences per card, clamped to 3 lines. Decide whether the nav should list all 9.
13. **Success cases look like placeholders.**
    - Screenshots: `home-m-full.png`, `home-d-full.png`.
    - Titles are "Lucrare estetică #1–#4", with tight face crops and no before/after.
    - Fix: name the treatment and add a before/after view.

**P2**

14. **Team order differs between pages.** The homepage order is Petric, Buterchi, Tincu, Ghirasim, Cozma, Fernea, Gherman; /echipa is Petric, Ghirasim, Tincu, Buterchi, Cozma, Fernea, Gherman. Use one shared order.
15. **/echipa badge says "6 SPECIALIȘTI" above 7 cards.** The count excludes the medical assistant. Say "6 medici + 1 asistent", or count everyone.
16. **The mobile hero kicker wraps to an orphan.** "…ÎN SATU / MARE" (`home-m-fold.png`). Reduce the tracking at 10 px, or use `text-wrap: balance`.
17. **The mobile hero CTA sits at y≈780 of 844** (`home-m-fold.png`), and the trust badge overlaps the dental mirror in the photo. Move the copy block up about 60 px.
18. **The doctor-page H1 text has no space between "Dr." and the surname.** `textContent` is "Dr.FerneaRemus". "Remus" already has an `aria-label`, but the "Dr." and "Fernea" word spans have no space between them in the DOM. Add a real space between the spans (`src/components/sections/TeamMemberHero.tsx`).
19. **Two back-to-back booking CTAs on /testimoniale and /contact.** A "Programează o consultație" card is followed immediately by the dark sitewide band.
20. **Footer and breadcrumb links are 20 px tall**, below the WCAG 2.2 AA 24 px minimum target size. The 24 px items just meet it. Add `py-2`.
21. **The WhatsApp FAB bubble covers form fields on /contact mobile** ("Ai o întrebare? Scrie-ne!", `contact-m-map.png`). Hide the bubble on /contact.

**Checked, no issue**

- **Homepage team grid:**
  - Desktop is 3+3+1 with the last card centered (`home-d-full.png`).
  - Mobile is 2 columns with the last card centered (`home-m-full.png`).
- **/echipa desktop grid:** 3+3+1, centered (`echipa-d-full.png`).
- **Overall layout and widgets:**
  - No horizontal overflow at 390 px; decorative blobs and the review marquee are clipped correctly.
  - The floating pill header (about 70 px) did not cover headings or anchors in any shot.
  - The /contact form inputs use 16 px text and are 52–56 px tall, so iOS will not zoom on focus.
  - The map embed loads.
- **Gherman Camelia's photo** has different framing and scrubs colour, which is noticeable but not broken. Optionally re-crop it to match.

### 2.2 Design-improvement ideas (within the warm beige/brown editorial style)

1. **Editorial numbering as a system.** The serif-italic "01 / 02 / 03" from "De ce clinica DENTCRAFT" is the site's best detail. Reuse it on the service pages' "Beneficii reale" cards, which currently all share the same check icon, and on the /preturi scenario cards.
2. **A sticky mobile booking bar.** Add a slim cream bar with a dark "Programează" pill and a phone icon. Show it after the hero scrolls out, and group it with or replace the floating WhatsApp bubble so there is one action cluster.
3. **Before/after cards in the existing card language.** Use rounded-3xl cards with a hairline `#e8e0d5` border and a tan split-slider handle, plus a serif-italic caption naming the treatment. Example only: "*6 fațete ceramice, 2 ședințe*". These would replace "Lucrare estetică #n".
4. **An editorial pull quote for reviews.** Show one large serif-italic quote from a real Google review, with name, month and the G mark, then a three-card row and a link to /testimoniale. This is calmer than the double marquee and the 54-card wall.
5. **A price teaser chip on service pages.** Put a small cream chip under the H1 ("De la [preț din lista de prețuri] lei →") linking to the matching /preturi tab. The values come from the existing price list.
6. **A credentials strip on doctor profiles.** Render "Studii · Certificări · Formare" as a horizontal strip, with years in serif-italic where they exist, and omit empty dates.
7. **One heading voice.** Apply the "Bold / *serif italic*" pattern to the places that lack it: /testimoniale, the /preturi FAQ, and the dark CTA band ("Programează o *consultație*").
8. **A warmer dark band.** Shift the CTA band and footer from `#111`–`#1a1a1a` to the deep brown `#2a2118` already used for headline text. This softens the cream-to-black jump and ties the dark sections to the palette.
