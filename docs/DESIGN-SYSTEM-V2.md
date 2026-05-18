# DENTCRAFT Design System v2

**Last updated:** 8 May 2026
**Audience:** Anyone building or refining pages on dentcraft.ro
**Goal:** keep every page consistent with the editorial-warm landing system established in May 2026.

---

## 1. Color Palette

### Earth-tone foundation
| Token | Hex | Where to use |
|---|---|---|
| **Background warm** | `#faf6f1` | Section bg alternation (Why Us, Reviews) |
| **Background cream** | `#f5f0e8` | Section bg deeper variant (Clinic, Reviews fallback) |
| **Surface white** | `#ffffff` | Cards, modals |
| **Accent light** | `#e8e0d5` | Card borders, dividers |
| **Accent** | `#d4c4b0` | Active states, focus rings, decorative blurs, primary CTA fallback |
| **Accent hover** | `#8b7355` | Italic serif accents, kicker text, warm hover color |
| **Body text mid** | `#5a5048` | Subtitle / secondary copy |
| **Body text muted** | `#7a6b5a` | Tertiary copy |
| **Primary text** | `#2a2118` | Headings, body bold, dark CTA bg |
| **Deep dark** | `#1a1410` | Hero gradient, deepest dark |

### Status / brand
| Token | Hex | Where |
|---|---|---|
| **WhatsApp green** | `#25D366` | FAB only |
| **YouTube red** | `#ff0000` | Footer YT social hover |
| **Star** | `#d4c4b0` (filled) | Trust ratings (warm tone, not yellow) |

**Rule:** never introduce a new hex without checking this table first. Cool blues/greens are reserved for status (WhatsApp/YouTube), not brand surfaces.

---

## 2. Typography

### Font stack
- **Sans (default body + headings):** Inter (Next.js next/font, `font-sans`)
- **Serif italic accent:** system serif fallback via `font-serif italic` (Tailwind default — Georgia/Times)

> If you ever swap the serif fallback to a custom font, do it in one place: `globals.css` font-family.

### Heading pattern (used in every section header on the landing)

```tsx
<AnimatedServiceHeading bold="Bold word" italic="serif accent" />
```

Renders as:
```
   Bold word
   serif accent  ← italic, color #8b7355, letter-by-letter slide-in
```

- Bold word: `font-bold text-[#2a2118] leading-[0.95] tracking-tight text-4xl md:text-5xl lg:text-6xl`
- Italic accent: `font-serif italic font-medium text-[#8b7355] block pb-1 mt-1`
- Animation: stagger 70ms per character, spring 140/20, slide from x:-24px → 0
- Respects `prefers-reduced-motion` (falls back to opacity fade)

### Subtitle below heading
- `text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed`
- Wrapped in `<ScrollReveal animation="fade-up" delay={500}>` so it appears *after* the letter animation finishes.

### Hero kicker / overline
- `text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.28em] uppercase`
- Color: `text-[#d4c4b0]/90` (on dark hero) or `text-[#8b7355]` (on light)

### Body text
- Body default: `text-base text-[#5a5048] leading-relaxed`
- Card description: `text-sm text-[#5a5048] leading-relaxed`
- Caption / micro-copy: `text-xs text-[#8b7355]` or `text-[10px] uppercase tracking-[0.16em] font-semibold text-[#8b7355]`

### Type scale
- Section H2: 4xl → 5xl → 6xl
- Subsection H3: xl → 2xl
- Card title: lg → xl → 2xl
- Body: base → lg
- Caption: 10px → xs
- Min mobile body: 16px (avoid iOS zoom on input focus)

---

## 3. Buttons

### Three CTA archetypes (always one of these)

#### A. Primary dark pill (most CTAs)
```tsx
<a className="group inline-flex items-center px-8 py-4 bg-[#2a2118] text-white rounded-full text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(42,33,24,0.4)] transition-shadow duration-300">
  <span>Label</span>
  <span aria-hidden="true" className="inline-flex items-center overflow-hidden ml-0 max-w-0 opacity-0 -translate-x-1 group-hover:ml-2 group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
    <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.25} />
  </span>
</a>
```
Used on: hero, services, team, why-us, before/after, reviews, video CTAs.

#### B. Outline pill (secondary)
```tsx
className="group inline-flex items-center px-7 py-3.5 md:px-8 md:py-4 bg-white border border-[#e8e0d5] hover:border-[#d4c4b0] text-[#2a2118] rounded-full text-sm md:text-base font-semibold hover:shadow-[0_10px_40px_-10px_rgba(139,115,85,0.18)] transition-all duration-300"
```
Used as secondary action next to a primary dark pill.

#### C. Cream pill (footer / hero alt)
```tsx
className="bg-[#d4c4b0] text-[#1a1a1a] hover:shadow-[0_10px_30px_-8px_rgba(212,196,176,0.5)] rounded-full font-semibold transition-shadow"
```
Used in footer CTA banner + hero arrow-reveal pattern.

### Universal hover behaviour (mandatory)
1. **Color stays the same** — never swap bg/text on hover.
2. Only **shadow** intensifies (warmer + larger).
3. Arrow icon — always **hidden by default, reveals on hover** with the snippet above.
4. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` over 500ms.

### Phone / icon-only round button
For headers / footers when phone number doesn't fit:
```tsx
className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2a2118] hover:bg-[#4a3d30] transition-colors"
```
Inner icon: `w-[18px]` Lucide stroke 2.25.

### Card chip "Afla mai mult"
- Inline span, `text-xs font-bold uppercase tracking-[0.16em] text-[#8b7355]`
- Same hidden-arrow reveal pattern on group-hover.
- Color shifts to `#2a2118` on hover.

---

## 4. Card patterns

### Standard editorial card
```tsx
<article className="bg-white border border-[#e8e0d5] rounded-3xl overflow-hidden
  shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]
  hover:border-[#d4c4b0]
  hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)]
  hover:-translate-y-1.5
  transition-all duration-500 ease-out">
```

### Photo card (services, before/after)
- `aspect-[16/10]` for landscape
- Photo uses `object-cover` and `group-hover:scale-105 transition-transform duration-700`
- Inner padding: `p-6 md:p-7`

### Stat overlay card (why-us photo)
- `bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(42,33,24,0.25)] border border-[#e8e0d5] px-5 py-4 md:px-7 md:py-5`
- Content: `<CountUp />` + caps tracking-[0.16em] label.

### Card on dark bg (hero trust chip)
- `bg-white/15 backdrop-blur-2xl border border-white/30 rounded-full`
- Inner shadow `inset_0_1px_0_rgba(255,255,255,0.25)` for glass.

---

## 5. Animations

### AnimatedServiceHeading (mandatory for every section header)
- See `src/components/ui/AnimatedServiceHeading.tsx`
- `useInView({ once: true, amount: 0.4 })` triggers on scroll into 40% view.
- Letter stagger: 70ms, delay before italic word: 450ms.
- Spring physics: `stiffness: 140, damping: 20`.
- Always pass two strings: `bold` (sans-serif) and `italic` (serif accent).

### ScrollReveal wrapper
- IntersectionObserver-based, threshold 0.15.
- Variants: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale-up`.
- Stagger sibling reveals with `delay` prop in 100-150ms increments.

### Hover effects (consistent vocabulary)
| Effect | Spec | Where |
|---|---|---|
| Lift | `hover:-translate-y-1.5` | Cards |
| Shadow grow | `hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.18)]` | Cards, CTAs |
| Border warm | `hover:border-[#d4c4b0]` | Cards |
| Scale photo | `group-hover:scale-105 duration-700` | Photo cards |
| Title tone shift | `group-hover:text-[#8b7355]` | Card title in editorial cards |
| Number scale | `group-hover:scale-125` (origin-left) | Editorial numbers (why-us 01-04) |

### Section-specific micro-animations
- **Hero italic line:** letter-by-letter slide-in (matches AnimatedServiceHeading)
- **Hero trust chip:** spring entrance scale 0.92 → 1, delay 1.15s
- **Hero scroll indicator:** `motion-safe:animate-bounce` + clickable smooth scroll
- **Service photo cards:** photo zoom + arrow reveal in chip
- **Why-us numbers (01-04):** scale 1.25x with origin-left + tone shift on hover
- **Clinic features icons:** unique hover per icon
  - Stethoscope → tilt -12°
  - ShieldCheck → spin 360°
  - Sparkles → scale 1.25 + rotate 12°
  - ScanLine → translate-y -2px (digital float)
- **Clinic gallery:** layoutId swap with spring 80/22/1.6 + hover debounce 200ms + auto-rotate 5.5s
- **Reviews marquee:** continuous CSS animation, per-row pause on hover
- **WhatsApp FAB:** continuous double ping (2.4s loop, second offset 1.2s)
- **Animation duration tokens:**
  - Micro-interaction: 200-300ms
  - State change: 500ms
  - Section reveal: 600-700ms
  - Premium polish: 1.2s+ (rare, hero only)

### Easing
- Default editorial: `cubic-bezier(0.16, 1, 0.3, 1)` (named "iOS easeOut")
- Spring physics for character/object motion: `stiffness 140, damping 20, mass 1.0` (or softer 80/22/1.6 for layout swaps)
- Avoid `linear` and `ease-in-out` — they feel mechanical.

### Reduced motion
Every animation must respect `prefers-reduced-motion: reduce`:
- Disable letter stagger → simple fade
- Disable WhatsApp ping → static
- Disable scroll indicator bounce → static
- Disable photo gallery auto-rotate → static

---

## 6. Spacing rhythm

### Vertical
- Section padding: `py-24 md:py-32` (large editorial sections)
- Tighter section: `py-20 md:py-28` (reviews, compact)
- Section header bottom margin: `mb-14 md:mb-20`
- Header → content gap: `space-y-10 md:space-y-12`
- Card grid gap: `gap-6 md:gap-8`
- List item gap (numbered editorial): `py-5 md:py-6`

### Horizontal
- Container: `max-w-7xl` for landing rhythm, `max-w-5xl` for narrow editorial blocks (team, why-us)
- Container padding: `px-5 sm:px-8 lg:px-10`
- Section content max-w: `max-w-2xl mx-auto` for subtitle paragraphs

### 4/8 base unit
All padding/margin/gap on multiples of 4px (Tailwind's default scale: 1=4px, 2=8px etc.). Avoid arbitrary px values unless the design demands a specific pixel like `px-[18px]`.

---

## 7. Section structure (the "rhythm")

Every page follows this skeleton:

1. **Hero** (dark bg, full image, framed pill nav)
2. **Light section A** (white) — usually services
3. **Cream section B** (`#faf6f1`) — why us
4. **Light section A** (white) — team
5. **Cream section C** (`#f5f0e8`) — clinic gallery
6. **Light section A** (white) — videos
7. **Cream section B** — reviews
8. **Light section A** — before/after
9. **CTA banner** (dark, `#1a1a1a` with cream accent)
10. **Footer** (dark, full-width)

**Background alternation rule:** never two consecutive sections with the same background. The cream tones B and C are interchangeable depending on neighboring sections.

### Section header template
```tsx
<div className="text-center mb-14 md:mb-20">
  <AnimatedServiceHeading bold="..." italic="..." />
  <ScrollReveal animation="fade-up" delay={500}>
    <p className="text-lg text-[#5a5048] max-w-2xl mx-auto leading-relaxed">
      Subtitle copy here.
    </p>
  </ScrollReveal>
</div>
```

---

## 8. Photo & icon system

### Photos
- Format: WebP (q=82 or q=85) for any photo > 200px wide
- Service 3D illustrations: 9 unique cinematic 3D dental medical renders, all consistent (centered subject, warm cream margins, same lighting)
- Clinic photos: 11 indoor real photos
- Doctor portraits: in `/public/images/team/{slug}.webp`
- Hero patient: in `/public/images/hero/`
- All photos use `next/image` for automatic responsive serving

### Icon system
- **Lucide React** for UI/nav icons (consistent stroke width 1.5 / 2.25 for emphasis)
- **Custom dental SVG library** in `/public/icons/` (110 icons numbered 001-110) for service-specific icons in the services dropdown and feature cards
- Sizing tokens: `w-4 / w-5 / w-6 / w-7 / w-8 / w-12 / w-16`
- **No emoji** anywhere in UI — only inside content/translations if culturally appropriate

---

## 9. Internationalization

- **Locales:** `ro` (default), `en`, `hu`
- All copy lives in `src/messages/{locale}.json`
- next-intl `useTranslations()` for client + `getTranslations()` for server
- Headings + button labels: every locale must be present
- Roman characters with diacritics (ă, î, ș, ț) on h1/h2 — verify no descender clipping (g, j, p, y, q) when adding word-stagger animations: do **NOT** wrap with `overflow-hidden`, use `pb-1` on italic line.

---

## 10. Responsive breakpoints

Standard Tailwind:
- `sm` 640px (small tablet / large mobile)
- `md` 768px (tablet)
- `lg` 1024px (small desktop)
- `xl` 1280px (large desktop)

### Mobile-first patterns established

- **Touch hover detection:** `window.matchMedia('(hover: hover)').matches` — gate any hover-only behavior to non-touch devices. Critical for clinic gallery + video card interactions.
- **Footer CTA:** stays in single row on mobile, phone collapses to icon-only round button (sm: full pill returns)
- **Reviews 2 buttons:** always single row, padding/text scale down for narrow viewports
- **Team grid:** mobile = Petric full-width, then 2+2 below; desktop = 6-col with col-span tricks (3 doctors top, 2 staff centered bottom)
- **Hero gradient:** stops adjust by viewport — mobile keeps darker bottom for readability, desktop is more transparent

---

## 11. Performance & accessibility

### Performance
- Photos: WebP, `next/image` with explicit `sizes`
- Animations: only `transform` + `opacity` (composited)
- Marquees: pure CSS animation, not JS
- IntersectionObserver for ScrollReveal (no scroll listener thrash)
- Heavy components (gallery swap, video cards) → client components, lazy by default in their position below the fold

### Accessibility
- Focus rings on all interactive: `focus-visible:ring-2 focus-visible:ring-[#8b7355]`
- ARIA labels on icon-only buttons (phone, WhatsApp, hamburger)
- `aria-label` on AnimatedServiceHeading italic part (for screen readers — characters are `aria-hidden`)
- Touch targets ≥ 44×44px
- Contrast ≥ 4.5:1 for body text on every background
- `prefers-reduced-motion` honored on every animation

---

## 12. Section-by-section quick reference

| Section | Bg | Heading | Animation | CTA |
|---|---|---|---|---|
| Hero | dark image | "Dinți sanatosi" + "*zambet luminos*" | letter slide italic | white pill arrow-reveal |
| Services | white | "Servicii *stomatologice*" | letter slide | dark pill arrow-reveal |
| Why Us | `#faf6f1` | "De ce *DENTCRAFT*" | letter slide + 4 numbered editorial items with hover scale | none (next section CTAs) |
| Team | white | "Cunoaște *echipa*" | letter slide | dark pill arrow-reveal |
| Clinic | `#f5f0e8` | "Clinica *DENTCRAFT*" | letter slide + photo-swap gallery + unique icon hovers | none |
| Doctor Videos | white | "Sfaturi de la *doctorii nostri*" | letter slide + animated play button | dark pill arrow-reveal → IG |
| Reviews | `#f5f0e8` | "Ce spun *pacienții*" | letter slide + per-row marquee | 2 buttons single row |
| Before/After | white | "Rezultate *reale*" | letter slide + slider hover | dark pill arrow-reveal |
| Footer CTA | dark `#1a1a1a` | bold + "...aici" | none | cream pill arrow-reveal + phone |

---

## 13. When you build a new page or component

**Checklist before merge:**
- [ ] Heading uses `<AnimatedServiceHeading>` if it's a section header
- [ ] Subtitle wrapped in `ScrollReveal animation="fade-up" delay={500}`
- [ ] Cards use the standard pattern (border #e8e0d5, hover lift 1.5px, shadow grow warm)
- [ ] CTAs are one of the 3 archetypes (dark pill / outline / cream pill)
- [ ] Arrow on CTA is hidden until hover (reveal pattern)
- [ ] Bg color follows the alternation rhythm
- [ ] Mobile tested at 375px — no horizontal scroll, touch targets ≥44px
- [ ] `prefers-reduced-motion` respected
- [ ] No emoji as icons, no raw hex outside this file
- [ ] WebP photos with explicit `sizes`

---

**Anti-patterns (don't do these):**
- ❌ Hover that swaps background color (only shadow grows)
- ❌ Plain `font-light` headings — use `font-bold` + serif italic accent
- ❌ Pill badge above h2 — use the AnimatedServiceHeading pattern instead
- ❌ Generic Lucide icons for service cards on the homepage — use the custom dental SVG library
- ❌ Marquee that pauses on entire container — split into per-row pause
- ❌ Random shadow values — pick from the warm token set: `shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]`, `shadow-[0_20px_50px_-12px_rgba(139,115,85,0.2)]`, etc.
- ❌ `overflow-hidden` on h1/h2 with descender characters — clips diacritics

---

**File ownership:**
- `AnimatedServiceHeading.tsx` — only owner of letter animation logic
- `ScrollReveal.tsx` — only owner of fade-up entrance
- `BookingButton.tsx` — central booking CTA, all popups go through here
- `FramedNav.tsx` — single global pill nav (rendered by layout, not per-page) — owns the services dropdown, language switcher, mobile drawer, callback popup
- `service-photos.ts` — single source of truth for which services have a 3D photo
- `contact.ts` — single source of truth for phone/social/whatsapp URLs

---

## 14. Page audit log

Track every page that's been brought in line with this system.

| Page | Status | Notes |
|---|---|---|
| `/` (homepage) | ✅ Done | Reference page — every pattern in this doc derives from here |
| `/servicii` (listing) | ✅ Done (8 May) | Hero swapped from dark editorial → light warm with AnimatedServiceHeading; breadcrumb now subtle warm; pill `availableCount` chip; FramedNav active globally |
| `/servicii/[slug]` (individual) | ✅ Done (8 May v3 — full redesign) | Hero cream → Description white → Benefits #faf6f1 → Process white → FAQ #faf6f1 → **Doctor Profile white** (NEW — Dr. Petric coordinator card with photo, bio, specializations, stats, link to /echipa/[slug] for E-E-A-T + internal linking) → **Servicii Conexe #faf6f1** (NEW — 3 related service cards) → **Final CTA Banner dark #1a1410** (NEW — bold + serif italic "Pregătit pentru un *zâmbet nou*?", booking + phone). All sections wrapped in ScrollReveal with staggered delays. Card hovers add scale-up on icon containers + warmer shadows. AnimatedServiceHeading on every section header. FAQ schema JSON-LD active. Service schema enriched with medicalSpecialty/serviceType. Both Sanity and fallback branches symmetric. |
| `/echipa` | ⏳ Pending audit | |
| `/echipa/[slug]` | ⏳ Pending audit | |
| `/preturi` | ⏳ Pending audit | Was redesigned during the calculator-v2 work — needs verification against this doc |
| `/galerie` | ⏳ Pending audit | |
| `/contact` | ⏳ Pending audit | |
| `/blog` (listing + posts) | ⏳ Pending audit | |
| Legal pages (politica/termeni) | ⏳ Pending audit | Static text — minimal changes likely |

**Process for each page audit:**
1. Replace any `<Header />` reference if present (now centralized in layout via `<FramedNav />`)
2. Hero/header: AnimatedServiceHeading + warm cream bg + breadcrumb subtle
3. CTAs: 3 archetypes only, arrow-reveal pattern
4. Cards: standard editorial pattern (border #e8e0d5, hover lift 1.5px)
5. Background rhythm: alternate white / cream / cream-deep across sections
6. Update this audit table when complete
