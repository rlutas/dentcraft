# DENTCRAFT.ro - Project Status

**Last updated:** 26 May 2026

## 📝 Session 2026-05-26 — Google Ads restructurare completă

### Audit complet + restructurare campanie

**Probleme identificate:**
- CPC 20,63 RON ultimele 30 zile (degradare vs 7,42 RON lifetime)
- 1 singur ad group cu broad match → keywords extinși la competitori (`clinica datcu`, `art dental`, `dr matiz` etc)
- Quality Score 6/10 (sub recomandare 7+)
- Conv rate 1,84% vs benchmark dentar 4,2%
- Plătit ~120 RON pentru search-uri pe brand-uri competitori

**Diagnostic corectat după research industrie:**
- CPC 20 RON în RO ≈ $4.5 USD — DE FAPT SUB media globală industrie dentară $8 (Wordstream, Dentx)
- Conversiile GBP "Other engagements" sunt Google-managed și deja excluse din bidding (NU trebuie demote)
- AI Max era deja OFF (nu era cauza)
- Cauza reală: QS scăzut + broad match + landing page generic

### Implementare:

**1. Negative keywords (26 total) — adăugat la campanie:**
- Exact match competitori: `[clinica datcu]`, `[dr matiz]`, `[art dental]`, `[duo dent]`, `[kocsis hajnalka]`, `[dr magyari]`, `[stoma art]` etc.
- Phrase match servicii: `"non stop"`, `"urgent"`, `"radiografie"`, `"radiologie"`, `"livada"`, `"strada horea"` etc.

**2. Restructurare în 5 ad groups thematice (de la 1):**
- `AG_Implant_SM` → `/preturi#calculator`, Max CPC 10 RON (11 keywords)
- `AG_Estetica_SM` → `/galerie`, Max CPC 8 RON (10 keywords)
- `AG_Ortodontie_SM` → `/servicii/ortodontie`, Max CPC 8 RON (9 keywords)
- `AG_General_SM` → `/`, Max CPC 8 RON (10 keywords)
- `AG_Brand_SM` → `/`, Max CPC 3 RON (7 keywords brand defense)

**3. Match types: phrase + exact** (NU broad — broad era cauza waste-ului)

**4. 5 RSAs noi, câte unul per ad group:**
- 10 headlines fiecare cu pin top 3 (mesaj consistent)
- 4 descriptions specifice (≤ 90 chars)
- Final URL specific per ad group

**5. Bulk import prin Google Ads Editor:**
- Generat 5 fișiere TSV în `docs/google-ads/import/`
- 100% posted: ad groups, keywords, RSAs

**6. Aplicat recomandare Google: "Eliminați cuvinte redundante" (+0,8% optimization score)**

### Status după implementare:
- 5 ad groups noi: **Eligible** (active)
- 1 ad group vechi (`Grupul de anunțuri 1`): **încă Eligible** (păstrat 14 zile ca buffer)
- Keywords: **Pending review** (Google verifică, normal 24h pentru dental)
- Health policy: **Request exemption** necesar (policy specifică pentru servicii medicale)

### Documente create/actualizate:
- `docs/google-ads/INDEX.md` (NEW) — index toate docs Google Ads
- `docs/google-ads/AUDIT-2026-05-26.md` (NEW) — audit complet cu diagnostic
- `docs/google-ads/IMPLEMENTAT-2026-05-26.md` (NEW) — implementare + monitoring + KPIs
- `docs/google-ads/import/` (NEW) — fișiere TSV de import
- `docs/google-ads/SETUP-GUIDE.md` — marcat SUPERSEDED
- `docs/google-ads/QUICK-START.md` — marcat SUPERSEDED

### Așteptăm în săptămâna 1-4:
- Săpt 1: Impressions cresc, CTR > 5%, primele conversii pe ad groups noi
- Săpt 2: Quality Score crește la 7-8/10, CPC scade natural la 5-8 RON
- Săpt 3-4: 15-25 conversii, cost/conv 80-120 RON, ROI 6-10×
- După Luna 1: dacă conv ≥ 20 → switch la Target CPA = 120 RON

### TODO următoarele zile:
- [ ] Mâine: verifică keywords Eligible (nu Pending review)
- [ ] Request Health policy exemption în Google Ads
- [ ] Săpt 1: monitor zilnic Search Terms → adaugă negative kw noi
- [ ] Săpt 2: pune pe pauză `Grupul de anunțuri 1`
- [ ] Săpt 2: aplică recomandări Google (image extensions, structured snippets, logo)
- [ ] **Landing page fix:** conv rate 1,84% → target 4,2% (2× pacienți la același cost)

---

## 📝 Session 2026-05-20 — Dr. Buterchi adăugat în echipă + CSP & Next.js 16 polish

### 4. CSP extins pentru Google Ads / Conversion Linker
**Problema:** Console errors live blocau request-uri spre `pagead2.googlesyndication.com` (din Conversion Linker / Enhanced Conversions) și un script `googleads.g.doubleclick.net/pagead/viewthroughconversion`.

**Fix în `next.config.ts`:**
- `script-src`: + `googleads.g.doubleclick.net` + `pagead2.googlesyndication.com`
- `img-src`: + `pagead2.googlesyndication.com`
- `connect-src`: + `pagead2.googlesyndication.com`

### 3. Image quality config pentru Next.js 16 compat
- `images.qualities: [75, 95]` în `next.config.ts` — elimină warning-ul "quality 95 not configured in images.qualities" pentru `Image quality={95}` folosit la hero portrait/landscape.

### 2. Layout echipă pe homepage: 4 doctori + 2 asistente
- `src/app/[locale]/page.tsx`: schimbat grid de la `md:grid-cols-6` (3 doctori + 2 asistente centrate) la `md:grid-cols-8` (4 doctori + 2 asistente centrate cu `md:col-start-3` / `md:col-start-5`).
- Mobile: păstrat `grid-cols-2` (3 rânduri × 2 carduri).
- Carduri egal-înălțime: `h-full` propagat prin ScrollReveal → Link → card div, card devenit `flex flex-col`, panou nume/rol cu `flex-1 + justify-center` — corecție pentru când rolul se rupe pe 2 rânduri (ex: "Medic Specialist Chirurgie Dento-Alveolara").
- Ordine TEAM_SLUGS: petric → buterchi → ghirasim → tincu → camelia → karla.
- Curățat import `cn` nefolosit.

### 1. Dr. Buterchi Codrut-Ciprian — Medic Specialist Chirurgie Dento-Alveolara
- **Foto:** `public/images/team/dr-buterchi-codrut-ciprian.webp` (convertită din PNG 1.3MB → WebP 87KB cu `cwebp -q 85`).
- **Profil în `src/lib/fallback-team.ts`** (`key: doctor4`, `slug: codrut-buterchi`):
  - Specializări: Chirurgie Dento-Alveolara, Implantologie, Protetică pe Implanturi
  - Bio: subliniază dubla expertiză (tehnician dentar 10+ ani + medic stomatolog), inclusiv Head of Prosthetic Department la Athena Dental Laboratory UK
  - Educație: UMF Cluj-Napoca (Tehnică Dentară 2011) + Univ. Oradea (Medicină Dentară 2021)
  - Certificări: Specialist Chirurgie Dento-Alveolara (Spital Cluj 2023), Rezidențiat 2023, Curs Dinu Academy 2025, Head of Prosthetic UK 2015
  - Stats: 14 ani experiență, 2000 pacienți
- **Profil page (`/echipa/codrut-buterchi`):** ascuns placeholder-ul "Galerie foto în curând" + nu afișează secțiunea video reels (nu există încă conținut):
  - Adăugat câmp opțional `hideGalleryPlaceholder?: boolean` pe tipul `FallbackTeamMember`.
  - `AboutSection` în `echipa/[slug]/page.tsx` acceptă noul prop și sare peste `<PhotoGalleryPlaceholder>` când e activ.
  - Video reels: `getDoctorVideoForSlug('codrut-buterchi', ...)` returnează `null` (slug nedefinit în map) → secțiunea se ascunde automat, fără cod special.

---

## 📝 Session 2026-05-18 (final) — CSP fix, GTM migration, GBP link

### 16. Google Business Profile linked în Google Ads
- Linked `dentcraftsm@gmail.com` GBP account → Google Ads via Tools → Linked accounts
- Adăugat **Location Asset** la nivel cont (account-level) — se aplică la toate campaniile
- Anunțurile vor afișa acum: adresa + distanța (km) + map pin + rating ⭐ 4.9
- Anunțurile devin eligibile pe **Google Maps** când userul caută "stomatolog" pe maps
- Direction clicks + Maps actions vor fi tracked ca conversii suplimentare

### 15. CSP fix pentru Google Ads conversion tracking
**Problema identificată live:** request-urile de conversie blocate de Content Security Policy.

Network test pe site-ul live arăta:
```
googleads.g.doubleclick.net/pagead/viewthroughconversion/... → BLOCKED by CSP
```

**Fix în `next.config.ts`:**
- `script-src`: + `www.googleadservices.com`
- `img-src`: + `www.googleadservices.com` + `googleads.g.doubleclick.net`
- `connect-src`: + `googleadservices.com` + `googleads.g.doubleclick.net` + `td.doubleclick.net` + `google.com` + `google.ro`
- `frame-src`: + `td.doubleclick.net`

**După fix verificat live:** ✅ 200 OK la `googleadservices.com/pagead/conversion/18165025740/?label=6tECCPjmna8cEMyX4dVD&en=conversion&capi=1`

### 14. Migrare conversion tracking de la cod direct → GTM
- Conversion gtag direct în `lib/gtm.ts` ar fi cauzat double-counting cu tag-ul GTM
- Scos `gtag('event', 'conversion', ...)` din `trackFormSubmission()`
- GTM tag configurat:
  - Tip: Google Ads Conversion Tracking
  - Conversion ID: `18165025740` (fără prefix `AW-` — bug template GTM)
  - Conversion Label: `6tECCPjmna8cEMyX4dVD`
  - Trigger: Custom Event `generate_lead`
- Container GTM published cu versiunea `Add Google Ads form conversion`

### 13. Verificare E2E tracking live
- Test full flow: form submit → `generate_lead` → GTM → Google Ads conversion endpoint
- Network requests verificate:
  - ✅ `googleadservices.com/pagead/conversion/...` → 200
  - ✅ `googleads.g.doubleclick.net/pagead/viewthroughconversion/...` → 302
  - ✅ `google.com/ccm/collect?tids=AW-18165025740` → 200
  - ✅ `google.com/pagead/1p-user-list/...` → 302 (remarketing audience)
- Toate cele 3 formulare (contact, callback, price-estimate) fire conversion-ul corect

### 12. Google Business Profile posts + social content
- Generat 2 postări GBP gata de publicat:
  - Postare cu video clinică (`/public/video/clinica.mp4`)
  - Postare lansare site nou cu CTA Learn More → `/preturi#calculator`
- Generat 3 variante de postare Facebook (developer pride / tech focus / casual)
- Screenshots hero: `dentcraft-hero-desktop.png` (1440×900) + `dentcraft-hero-mobile.png` (390×844)

---

## 📝 Session 2026-05-18 (continuat) — Google Ads launch

### 11. Google Ads setup complet (campanie + tracking)
- **Cont Google Ads activ:** ID `AW-18165025740`
- **Campanie creată:** `GOOG_Search_DENTCRAFT_SatuMare_Launch`
  - 1 campanie cu 4 ad groups (Implant, Estetică, Ortodonție, General)
  - Buget 50 lei/zi, Maximize Conversions, Max CPC 8 lei
  - Geo: Județul Satu Mare + Carei + Negrești-Oaș
  - Landing page: `https://www.dentcraft.ro/`
- **Anunțuri RSA:** 15 titluri + 4 descrieri (toate verificate ≤ 30/90 chars)
- **Extensii:** 6 sitelinks, 10 callouts, call extension, structured snippets, price extension
- **Policy fixes:** scoase telefonul din ad text + simbolul `★` (interzis Google Ads)
- **Conversion tracking native gtag instalat:**
  - `src/app/[locale]/layout.tsx` — `<Script>` loads `AW-18165025740` after GTM
  - `src/lib/gtm.ts` — `trackFormSubmission()` fires `gtag('event', 'conversion', {send_to: 'AW-18165025740/6tECCPjmna8cEMyX4dVD'})`
  - Acoperă toate 3 formulare (contact, callback, price-estimate)
- **Docs Google Ads** create în `docs/google-ads/`:
  - `QUICK-START.md` — copy-paste ready settings
  - `SETUP-GUIDE.md` — walkthrough + troubleshooting + KPI
  - `AD-COPY.md` — 15+4 RSA variants pentru fiecare ad group

### 10. Phone country selector mobil — flag emoji compact
- `PriceEstimatePopup.tsx`: select fix la `w-[5.25rem]`
- Adăugat flag emoji (🇷🇴 🇮🇹 🇪🇸 ...) la fiecare țară
- Label compact `🇷🇴 RO` în loc de `RO +40 România`
- Input phone primește toată lățimea rămasă (vizibil tot numărul)

### 9. Global link tracker pentru conversii
- `src/components/features/GlobalLinkTracker.tsx` — document-level click listener
- Prinde `tel:` și `wa.me`/`api.whatsapp.com` pe orice pagină
- Funcționează indiferent dacă componenta e server sau client
- Eliminat per-link `onClick` din `WhatsAppButton` (evită double-fire)

---

## 📝 Session 2026-05-18 — Go-live, perf optimization, legal hardening

### 8. Perf optimization (PageSpeed Insights mobile)
**Înainte:** Performance 70 / LCP 8.4s / payload 9.15 MB
**După:** payload **0.63 MB (−93%)**, FCP 556 ms, video nu se încarcă la initial paint

- Nou: `src/components/ui/LazyVideo.tsx` — IntersectionObserver-based lazy mount
- Renderizează doar poster image inițial; video MP4 se descarcă/pornește când userul scroll-ează aproape (rootMargin 200px)
- Înlocuit `<video>` inline din "De ce clinica" cu `<LazyVideo />`
- Fallback safe: dacă IntersectionObserver lipsește, load imediat

### 7. Legal — Termeni & Condiții extinși (RO/EN/HU)
Înlocuit secțiunea §8 (singur paragraf) cu 5 sub-secțiuni:
- **8.1 Drepturi de autor** — listă completă conținut protejat + Legea 8/1996
- **8.2 Marcă înregistrată** — DENTCRAFT brand protection în domenii, social, ads
- **8.3 Interdicții exprese** — scraping, clonare design, refolosire texte/poze, domenii confuzionale, derivative works, redistribuire
- **8.4 Monitorizare & măsuri legale** — cease & desist, despăgubiri civile, OSIM/Poliție/ORDA, DMCA takedowns
- **8.5 Citare autorizată** — excerpts cu atribuire permise

### 6. Go-live readiness
- `src/app/robots.ts` — permite `/`, blochează `/api/`, `/studio/`, referă sitemap + host
- `src/lib/seo.ts` — restaurat `noIndex` ca prop conditional (default index/follow true)
- `src/app/[locale]/layout.tsx` — maintenance mode rămâne opt-in via `NEXT_PUBLIC_MAINTENANCE_MODE=true` env var
- Verificat live: emails Resend funcționează (`/api/contact`, `/api/callback`, `/api/price-estimate` — toate 200 OK cu `success:true`)
- Domain ownership verificat în Google Search Console prin DNS TXT record

### 5. Site deployat live pe `https://www.dentcraft.ro`
- Maintenance mode dezactivat (`NEXT_PUBLIC_MAINTENANCE_MODE` ștearsă/false + redeploy)
- Toate paginile răspund 200 (homepage, /servicii, /preturi, /contact, /faq, /echipa, /galerie, /blog)
- HTTPS + HSTS + CSP + X-Frame-Options + X-Content-Type-Options configurate

---

## 📝 Session 2026-05-18 — Cazuri de succes + i18n complet

### 1. Video clinică optimizat
- Original 87 MB (4K, 50fps, HEVC) → 7.6 MB (1080p, 30fps, H.264 CRF 24), reducere 91%
- Generat poster JPG (186 KB) pentru instant load
- Integrat în secțiunea "De ce clinica DENTCRAFT" cu autoplay/muted/loop/playsInline
- Layout secțiune lățit la `max-w-[1600px]`, grid `1.85fr_1fr`, aspect video `16/9`
- Șters originalul .mov (87 MB) din repo
- Fișiere: `public/video/clinica.mp4`, `public/video/clinica-poster.jpg`, `src/app/[locale]/page.tsx`

### 2. Galerie clinică (ClinicGalleryDesktop) mai smooth
- Eliminat swap pe hover — acum doar pe click/focus (UX mai predictibil)
- Spring animation reglat: `mass 1.6→1`, `stiffness 80→140`, `damping 22→26` — mai vioi
- Hover thumb: scale 1.025 + brightness 95→110 ca afordanță de click
- Tap feedback: scale 0.98
- Auto-rotate relaxat (5.5s → 6.5s); pauză 7s după tap
- Added `aria-current="true"` pe imaginea primary

### 3. Brand DENTCRAFT — caps peste tot
- Înlocuit `DentCraft` / `Dentcraft` → `DENTCRAFT` în ~85 apariții
- Acoperă: traduceri (ro/en/hu.json), TSX (alt-uri, aria-labels), SEO (schema.ts, seo.ts), email templates, blog fallback, footer, header, docs interne
- Salvat ca regulă permanentă în memorie pentru sesiuni viitoare

### 4. Secțiune nouă "Cazuri de succes" (înlocuiește Before/After)
- Creat `src/components/sections/SuccessCasesSection.tsx` — grid 4 coloane × 1 rând, aspect 4:3
- Lightbox cu navigare ESC / ← / → + body-scroll-lock
- 4 cazuri placeholder cu fețele pacienților (case-01...04.jpeg din `public/images/results/`)
- Bg alb, secțiune lățită la `max-w-[1600px]`
- Înlocuit pe homepage și `/galerie` (eliminat `BeforeAfterGalleryPreview`, `GalleryModal`, `GalleryCard` dead code)
- Componenta reutilizabilă cu props opționale (`viewAllLabel`, `extraCases`)

### 5. Traduceri EN + HU complete pentru tot site-ul
**Chei noi adăugate în `src/messages/{ro,en,hu}.json`:**
- `home.calculator.*` — badge, titlu, subtitlu, 3 pași
- `home.whyClinic.*` — heading, stats (ani/pacienți), 4 motive (titluri + descrieri)
- `home.teamSection.*`, `home.faqSection.*`, `home.reviewsSection.*` — headere & subtitluri
- `home.successCases.*` — heading, subtitlu, categorii (aesthetic/implantology/etc.), titlu placeholder
- `home.doctorRoles.*` — roluri pentru DoctorVideosGrid
- `team.roles.*` — 8 roluri (coordinator, dentist, periodontologist, etc.)
- `ariaLabels.*` — close, scrollDown, closeMenu, callUs, language, nextCase, prevCase
- `footer.crafted.*` — label + aria text

**Helper nou:** `src/lib/translate-team-role.ts` mapează rolurile RO din date (Sanity / fallback-team) către traduceri.

**Fișiere modificate pentru i18n:**
- `src/app/[locale]/page.tsx`, `echipa/page.tsx`, `echipa/[slug]/page.tsx`, `galerie/GalleryPageClient.tsx`
- `src/components/sections/{SuccessCasesSection,FramedHero}.tsx`
- `src/components/layout/{Footer,FramedNav}.tsx`
- `src/components/features/GoogleReviewsSlider/index.tsx`
- `src/data/success-cases.ts` (restructurat cu categoryKey + titleNum)

**Rezultat:** Zero text RO nedorit pe `/`, `/servicii`, `/preturi`, `/contact`, `/faq`, `/testimoniale`, `/blog`, `/galerie`, `/echipa`, `/echipa/[slug]` pe EN și HU. Recenziile Google rămân în limba originală (user-generated content).

**TODO viitor:** Bio-urile lungi ale medicilor + specializările detaliate rămân RO în `fallback-team.ts` — recomandare: migrare în Sanity cu câmpuri localizate.

---

## 🚦 Launch Status (18 May 2026) — LIVE

Site-ul este **LIVE** pe `https://www.dentcraft.ro` cu maintenance off, indexabil și toate API-urile email funcționale.

- ✅ Design + brand: warm cream/beige + dark `#1a1a1a` unificat, paletă coerentă
- ✅ Brand DENTCRAFT all-caps peste tot (replace `DentCraft`/`Dentcraft` → `DENTCRAFT` ~85 apariții)
- ✅ Hero photoreal MJ-generated, 9:20 portrait pentru mobile, WebP optimizat
- ✅ Dr. Petric profil verificat de pe drpetric.ro (2016 Cluj + 6 cursuri reale)
- ✅ Echipa: 3 medici + 2 staff (decizie Petric)
- ✅ Stats 10+ ani / 1500+ pacienți uniformizate peste tot
- ✅ Calculator promovat în 3 locații strategice
- ✅ Cazuri de succes (4 fețe pacienți, lightbox + keyboard nav)
- ✅ Video clinic LAZY (poster initial, MP4 doar la scroll — payload −93%)
- ✅ Floating dental icons pe toate secțiunile albe
- ✅ Footer `</> Crafted by Luțaș Raul →` → WhatsApp
- ✅ I18n complet RO + EN + HU — toate paginile traduse
- ✅ Forms + Resend (testat live: contact/callback/price-estimate)
- ✅ Analytics + Speed Insights live
- ✅ Legal pages (privacy/cookies/terms) extinse cu IP/marca/anti-copy
- ✅ Maintenance mode opt-in (env flag)
- ✅ robots.txt indexabil + sitemap.xml submitted-ready
- ✅ Google Search Console — DNS TXT verificat, ready to submit sitemap
- ✅ PageSpeed mobile: payload 9.15 MB → 0.63 MB, FCP 556 ms

**Pași rămași (în afara codului):**
1. Search Console → click VERIFICAȚI pe DNS (TXT deja propagat)
2. Search Console → Submit `sitemap.xml`
3. Request Indexing pentru paginile principale
4. (opțional) Google Business Profile optimization pentru local SEO

---

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

### 13–14 May 2026 — Dr. Petric content updates + floating icons + price calculator promo

**Content (verified against drpetric.ro/despre/):**
- Dr. Petric profile rewritten: 2016 "Iuliu Hatieganu" Cluj-Napoca + 6 real courses (Fradeani I/II/III, Belograd Kiev 2019, Sirbu Bucharest 2020, Dicu/Lazar Oradea 2020); stats 10+ years / 1500+ patients (was 15+ / 2000+)
- Removed "(media 9.69)" from Dr. Tincu's diploma
- Removed Ionela Danci + Ionela Calugher from team (per Dr. Petric); fallback team now 5 members (3 doctors + 2 staff); `/echipa` Sanity threshold lowered to 5
- Removed `team-clinic.webp` ("Echipa DENTCRAFT") from `/galerie`
- Site-wide consistency pass for new numbers: SEO `seo.ts`, meta descriptions (ro/en/hu) for home + `/servicii` + `/echipa`, blog fallback copy, doctor profile defaults — no more "6 specialists" or "15+ years" references
- Stats card on homepage "De ce" section: replaced 4.9 Google rating with "1500+ pacienți tratați"

**Branding:**
- "DENTCRAFT" rendered uppercase in italic headings ("De ce clinica DENTCRAFT", "Clinica DENTCRAFT")
- `AnimatedServiceHeading` scaled down one tier (`text-3xl md:text-4xl lg:text-5xl`), tracking normalized, italic gets `tracking-wide` for the uppercase brand word

**Floating dental icons on white sections:**
- New `FloatingIcons` component (`src/components/ui/FloatingIcons.tsx`) — smooth 9-keyframe orbital float, no rotation; CSS mask trick to color any SVG; `prefers-reduced-motion` respected
- Mobile-specific keyframes with smaller amplitudes so icons never cross into adjacent sections
- Applied on: homepage Servicii, Echipa, Doctor Videos, Before/After (conditional); `/servicii` grid; `/echipa` grid — themed icon sets per section (general dental, team/care, knowledge/education, transformation)
- Reviews section deliberately skipped (bg is cream `#f5f0e8`, not white, in default state)

**Price calculator promotion (3 placements):**
- C — Homepage "De ce" reason #4 now has an inline "Calculează prețul tău →" link to `/preturi#calculator`
- A — `/servicii/[slug]` hero: replaced "DE LA X RON" price chip with 2 buttons total: "Programează consultația" (primary) + "Calculează prețul" (outlined, with Calculator icon); removed redundant phone CTA
- B — New full-width **dark statement section** (`bg-[#2a2118]`) between Servicii and "De ce" on landing: "Calculator instant de preț" headline (white + cream italic) + description + white CTA on dark bg, 3-step explainer grid (Alegi → Vezi preț → Primești estimarea) on the right with glassy white/5 cards — premium contrast break

**Footer credits:**
- Replaced "Made with ♥ in Satu Mare" with `</> Crafted by Luțaș Raul →` → WhatsApp link to +40 745 850 700 with pre-filled message about DENTCRAFT

### 14 May 2026 — Hero image overhaul + dark theme unification + diacritics + perf

**New hero image (MJ-generated, brand-aligned):**
- Replaced the old 1448×1086 hero with a fresh 2688×1792 dental clinic photo: woman patient reclined and smiling at camera, dentist hands in powder-blue gloves holding dental mirror + probe, warm cream/beige minimalist clinic interior
- 9:20 portrait crop (808×1792) generated from same source so mobile fits with minimal cropping
- Re-encoded both at WebP q85 with `-m 6`: landscape 884KB → 271KB, portrait 389KB → 142KB (~65% smaller)
- Switched FramedHero from `<picture>` + `<source>` to two Next.js `<Image>` with `quality={95}` so both get AVIF/WebP derivatives at proper DPR
- Top dark gradient overlay removed (bright source no longer needs it); bottom gradient strengthened (`from-[#0a0a0a] via /70`) for subtitle legibility, plus `text-shadow` added on the body copy

**Trust chip refresh on hero:**
- 3 patient avatars + "+" indicator (was 2 + "+"): patient-1/2 swapped to real WebP photos provided by Dr. Petric, patient-3 is the developer's photo (placeholder for a real testimonial avatar later)
- All three patient images converted to WebP q90 (~40KB each)
- "2000+" → "1500+ pacienți tratați" to match the Dr. Petric stats consistency pass
- Avatar size shrunk one tier (w-6 h-6 md:w-8 md:h-8) so the chip feels right-weighted

**Site-wide dark color unification:**
- Replaced `bg-[#2a2118]` with `bg-[#1a1a1a]` across every button/CTA/active state/badge/pill (CTAs, filter chips, calculator stepper, phone button, FramedNav booking buttons, GoogleReviewsSlider CTA, etc.) — the whole dark UI now matches the footer top color, creating one coherent darkmode zone

**Footer credit line:**
- Replaced "Made with ♥ in Satu Mare" with `</> Crafted by Luțaș Raul →` linking to WhatsApp +40 745 850 700 with a pre-filled DENTCRAFT inquiry message

**Diacritics pass on visible UI:**
- ro.json hero block: "Dinți sănătoși", "zâmbet luminos", subtitle and CTA fully diacriticized
- Nav: "Echipă", "Prețuri"
- common.bookAppointment, learnMore, discoverServices, contactUs, callNow all diacriticized
- trustLabel changed from "PACIENȚI MULȚUMIȚI" to "Pacienți tratați" to match the stat we're displaying

**Hero CTA polish:**
- Mobile padding tightened (`px-7 py-3.5` → `px-6 py-3`) and text from `text-base` → `text-sm` so the pill fits proportionally at 390-420px
- Added `leading-none` + `justify-center` + `block` on the SVG so the arrow rides on the exact text baseline instead of slightly above it
- Arrow shrunk to `w-4 h-4` on mobile (`w-5 h-5` desktop) to match the smaller pill

**Cookie banner timing:**
- First-visit banner delay bumped 800ms → 3000ms so the hero entrance animations (title stagger ~2s, trust chip 1.15s, CTA 1.0s) finish before the cookie banner slides in from the bottom

**Other quick fixes pushed mid-session:**
- Vercel build was failing on `priceMinLabel is defined but never used` in ServiceHero (left over after removing the price chip in favor of the Calculator CTA); fixed by prefixing the destructured prop with `_`

### 7 May 2026 (evening) — Hero + Navigation Redesign (homepage only)

**Status:** Live on homepage `/`. **Awaiting Dr. Petric's approval** before rolling out to the rest of the site (`/servicii`, `/echipa`, `/preturi`, `/contact`, `/blog`, etc.).

**Hero — Dentix-style framed redesign:**
- Full-screen hero `min-h-[100svh]` (was constrained on mobile)
- Patient portrait sitting in a rounded frame, warm earth-tone gradient backdrop
- Headline: word-stagger reveal animation, kicker line above + italic serif second line ("zambet luminos")
- SEO-optimized H1+subtitle: "Implant dentar, ortodontie, fatete si reabilitari complete in Satu Mare"
- Trust chip with avatar stack ("2000+ pacienti multumiti · 4.9 ⭐") — animated entrance
- White pill CTA "Programeaza acum" with hover arrow-reveal
- Interactive scroll indicator at bottom — clickable button with pulsing gradient + ChevronDown that smooth-scrolls to next section
- Removed clipping on descenders (g/y in EN/HU translations)

**Navigation — luxury pill-style top bar:**
- Sticky pill nav: morphs from translucent to white-blur on scroll
- Layout: `flex justify-between` on mobile, `grid [1fr_auto_1fr]` on desktop for true center alignment of nav links
- Center links: `text-[15px] font-bold uppercase tracking-[0.14em]` with center-growing underline accent on hover
- Services dropdown: 6 service shortcuts with icons + "Toate serviciile" CTA (text-[13px])
- Language switcher with circular SVG flags (country-flag-icons), dropdown matches services style
- Phone: collapsed to round icon-only button (w-12 h-12) on desktop
- Booking CTA: dark pill (`px-9 py-4 text-base`) with arrow-reveal hover
- Pill width capped at full safe area (no max-width cap currently; spans `lg:left-12 lg:right-12`)
- Padding tuned: `md:py-2` idle, `md:py-1.5` scrolled — keeps booking button "filling" the pill (small white gap)

**Mobile drawer:**
- Animated hamburger that morphs to X (custom asymmetric SVG)
- Body scroll lock when open
- Expandable services accordion with icons
- Language switcher with circular flags (24×24 with object-cover scale-1.6)
- Booking CTA matches header style

**Backup:** Pre-redesign hero state tagged at `hero-v1-saved` (commit `602636a`) for safe rollback.

**Key files:** `src/components/sections/FramedHero.tsx` (~770 lines, contains MobileDrawer, HamburgerIcon, FramedHero export)

**Pending approval:**
- [ ] Dr. Petric reviews homepage hero + nav
- [ ] If approved → roll out same nav (pill, services dropdown, lang switcher, mobile drawer) to all other pages currently using the old `Header` component
- [ ] Apply hero treatment patterns where appropriate (e.g. service detail pages, doctor profile pages)

---

### 7 May 2026

**Price Calculator v2 — Scenario-Based Estimator with Real Catalog:**
- Replaced generic 3-step calculator + flat TabbedPriceList with patient-facing scenario picker (8 scenarios)
- Pricing data sourced from Dr. Petric's Stomawin export (159 treatments, 12 categories, 3 languages)
- Generator script: `scripts/generate-treatments.mjs` — re-run on catalog updates (raw JSON stays out of repo)
- Catalog committed as `src/data/treatments.ts` — 145 priced treatments with ro/en/hu labels
- Scenario→treatment mappings in `src/data/calculator-scenarios.ts` — 8 scenarios with sub-question schemas and resolve functions
- Pure pricing logic in `src/components/features/PriceCalculator/v2/calculations.ts` with 16 Vitest tests
- Vitest installed for the first time + `npm test` script wired
- New v2 components: `ScenarioPicker`, `SubQuestions`, `Estimate`, `index` (orchestrator)
- `/preturi` page rebuilt — flat list removed, calculator only + closing CTA + "What happens next" timeline
- `PriceEstimatePopup` extended with optional itemized line items; admin email renders treatment table
- `i18n` strings added under `prices.calculator.*` in ro/en/hu (15 keys × 3 languages)
- v1 calculator components deleted (kept `PriceEstimatePopup` since v2 reuses it)

**Wow features in v2:**
- 8 illustrated scenario cards (uses 146 dental SVGs already in `/public/icons/`)
- Animated CountUp for total range
- Doctor's tip card (dark, with stethoscope icon, contextual copy per scenario)
- "What happens next" 3-step timeline (Booking → Plan → Treatment)
- Smooth Framer Motion transitions between steps
- Mobile-responsive (2-col cards on mobile, 4-col on desktop)
- Auto-skip questions step for scenarios with zero questions (emergency, consultation-only)

**Privacy invariant:** Stomawin export never enters the repo. Generated treatments.ts is the only committed derivative.

**Key commits:**
- `0cdf82e` generate treatments catalog
- `8086bb7` 8 scenarios with treatment mappings
- `2f7be04` pure pricing logic + vitest
- `142753a` scenario picker
- `7fb1861` sub-questions
- `5cd0528` estimate result
- `d64977d` orchestrator
- `abf4759` /preturi page rewrite
- `8ee47e8` i18n strings
- `f5c3022` itemized email payload

### 23 April 2026

**Hero Redesign — Dentix-Style Framed Hero with Sticky Nav:**
- New `src/components/sections/FramedHero.tsx` — full-bleed framed layout with AI-generated patient imagery (`hero-patient-landscape.webp`, `hero-patient-portrait.webp`)
- Sticky morphing pill navbar that compacts on scroll, with services dropdown (uses `getMainFallbackServices`) and mobile drawer
- Global `Header` component conditionally hidden on homepage to prevent navbar conflict
- i18n strings (ro/en/hu) updated for hero copy and CTAs

**Team & Profile Enhancements:**
- Photo galleries with `PhotoGallery` component, WebP-optimized, dynamic image positioning
- Animated stats (CountUp + ScrollReveal) for Dr. Petric, Dr. Ghirasim, Dr. Tincu
- Extended `FallbackTeamMember` type with optional `gallery` and `stats` fields

**Maintenance Mode:**
- Preview bypass via `/api/preview?key=<token>` — sets cookie to view real site while `NEXT_PUBLIC_MAINTENANCE_MODE=true`
- `/api/preview/clear` to remove cookie
- `PREVIEW_ACCESS_TOKEN` env var required on Vercel

**Key commits:** `1aa62d7` (team+stats), `bd84c08` (preview bypass), `dc29a19` (framed hero), `46521d1` (sticky pill nav)

### 26 February 2026

**IMPORTANT: Site Blocked from Indexing — Under Construction Mode (26 Feb 2026)**

The site was found to already be indexed by Google while content is not ready. To prevent Google from showing incomplete pages, the following changes were made:

1. `src/app/robots.ts` — Changed to `Disallow: /` for all crawlers (was: `Allow: /`)
2. `src/lib/seo.ts` — Added `noindex, nofollow` to ALL pages globally (both `generateRootMetadata` and `generatePageMetadata`)
3. Added a maintenance/under construction page that blocks public access
4. Controlled via `NEXT_PUBLIC_MAINTENANCE_MODE` env variable

**To revert when ready for launch:** Search the codebase for "under construction" — all changes are marked with TODO comments. Specifically:
1. `src/app/robots.ts` — Restore `Allow: /` and re-add sitemap/host directives
2. `src/lib/seo.ts` — Restore `index: true, follow: true` in `generateRootMetadata`, restore conditional `noIndex` check in `generatePageMetadata` (rename `_noIndex` back to `noIndex`)
3. Remove or set `NEXT_PUBLIC_MAINTENANCE_MODE=false` in Vercel env vars
4. Request re-indexing in Google Search Console after reverting

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
| **SITE IN NOINDEX / UNDER CONSTRUCTION MODE** | **Critical** | **robots.ts disallows all crawlers, all pages have noindex/nofollow, maintenance page blocks public access. Controlled via `NEXT_PUBLIC_MAINTENANCE_MODE` env var. Search codebase for "under construction" to find all TODO-marked changes. MUST revert before launch.** |
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
