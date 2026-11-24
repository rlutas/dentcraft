# DENTCRAFT: on-site SEO audit (live site)

**Date:** 2026-11-24
**Scope:** https://www.dentcraft.ro, all 111 URLs in `sitemap.xml` (37 RO, 37 EN, 37 HU), plus redirects, 404s, robots, JSON-LD, OG, content and performance proxies.
**Method:** `curl` fetch of every sitemap URL, HTML parsed with a script (titles, meta, canonical, hreflang, H1, img alt, JSON-LD, OG). Causes were traced in the source at `/Users/raul/Projects/dentcraft` (branch `main`, HEAD `172cb8d`). Every value below was observed on the live site on 2026-11-24 unless it says otherwise.

**PageSpeed Insights:** the API returned HTTP 429 `RESOURCE_EXHAUSTED` with `quota_limit_value: "0"` for all 3 URLs. The keyless quota is zero, so retrying will not help. Running Lighthouse locally was blocked by permissions in this session. There are **no Core Web Vitals numbers in this report**. Section 5 gives proxies only (TTFB, HTML weight, caching, preloads). To get real CWV, rerun PSI with an API key or run Lighthouse locally (see L-10).

---

## Status of known context (§6 of the brief)

| Item | Status observed |
|---|---|
| Per-doctor OG images `/images/og/team/<slug>.jpg` | **Confirmed** for 6 doctors (all return 200, `image/jpeg`, 67 to 91 KB). **Exception:** `/echipa/camelia-gherman` (all 3 locales) still uses `og-clinic.webp` with `og:image:alt="DENTCRAFT"`. |
| Sitemap includes team profiles | **Confirmed.** 7 profiles x 3 locales = 21 URLs, all 200. |
| `/echipa/dr-razvan-petric` redirect | **Confirmed** as a 308 to `/echipa/razvan-petric`. Also 308 for `/en/team/dr-razvan-petric` and `/hu/csapat/dr-razvan-petric`. The old slug is not in the sitemap. |
| No in-house X-ray/CBCT | **Still violated** in the EN + HU implant blog post, `llms.txt`, and (by implication) the homepage and `/servicii/implantologie`. See C-1 and H-6. |
| Prices only on /preturi | **Violated.** Concrete prices appear on `/servicii/implanturi-dentare` (title, meta, body, FAQ schema), in 2 blog posts and in `llms.txt`, and several conflict with /preturi. See C-3. The sitemap has no press section, so I made no "press" judgement. |

---

## CRITICAL

### C-1. False "free in-house 3D X-ray / CBCT" claims are still live (EN + HU implant post, llms.txt)
- **Evidence:**
  - `https://www.dentcraft.ro/en/blog/cat-costa-implant-dentar-satu-mare`:
    - "Your final price is determined after a consultation and 3D X-ray — which is free of charge at our clinic."
    - "3D X-ray (CBCT) — done in-house with our own scanner"
    - "We have an intraoral scanner and 3D X-ray right in the office — we don't send you somewhere else."
    - "The consultation and 3D X-ray are free."
    - "Day 1: Consultation + 3D X-ray + treatment plan"
  - `https://www.dentcraft.ro/hu/blog/cat-costa-implant-dentar-satu-mare`:
    - "A 3D röntgent (CBCT) — saját szkennerünkkel készítjük a rendelőben"
    - "Rendelőnkben intraorális szkennerrel és 3D röntgennel rendelkezünk — nem küldünk máshová"
    - "A konzultáció és a 3D röntgen ingyenes"
    - "…3D röntgen után állapítjuk meg — amely nálunk ingyenes"
  - `https://www.dentcraft.ro/llms.txt`: "Consultatie + radiografie 3D: Gratuit"
  - The RO version of the post no longer makes the claim. Only the translations were missed.
- **Why it matters:** these are false factual claims about equipment and a free service. They create consumer-protection risk (misleading advertising), lead to patient complaints, and get picked up by AI answer engines (llms.txt is written for them).
- **Fix:**
  - `src/lib/fallback-blog.ts`: rewrite blocks `en17`, `en22`, `en38`, `en51`, `en64` (lines ~359, 369, 399, 423, 456) and `hu17`, `hu22`, `hu38`, `hu51`, `hu64` (lines ~504, 514, 544, 568, 601) to mirror the corrected RO text. Say the imaging is done at a partner imaging centre, or drop it.
  - `public/llms.txt`: delete the "Consultatie + radiografie 3D: Gratuit" line (see also C-4).

### C-2. "Free first consultation" is advertised site-wide, but /preturi lists paid consultations
- **Evidence:**
  - `/preturi` → Consultații: "Consultaţie Chirurgie / Implantologie 200 lei", "Consultaţie+Documentare caz 500 lei", "Consultaţie primara+poze+scanare 250 lei", "Urgențe 200 lei", "Consultatie/discutie 150 lei". `/servicii/implanturi-dentare` FAQ (visible and in FAQPage JSON-LD) also says "Consultația de chirurgie și implantologie costă 200 de lei."
  - Visible claims of a free consultation:
    - `/faq` "Este prima consultatie gratuita? Da, prima consultatie este gratuita." (also `/en/faq`, `/hu/gyik`)
    - `/servicii/consultatie-stomatologica` "03 Consultatie gratuita: Prima consultatie este gratuita, fara nicio obligatie" (all 3 locales)
    - `/testimoniale` "Programeaza o consultatie gratuita" (all 3 locales)
    - The implantology service card text "…beneficiaza de consultatie gratuita…", shown on `/`, `/servicii`, `/servicii/implantologie` and the service-page carousels
    - `/preturi` itself: meta description ends "Consultatie gratuita!"
- **Why it matters:** this is a direct price contradiction on a YMYL/health site. It is a misleading-pricing risk and damages trust at the point of conversion. Google Ads landing-page policy may also flag it.
- **Fix:** decide the true policy, then align. Keys in `src/messages/ro.json`: `consultationBenefit3Title`/`Desc` (l.138-139), `implantologyDesc` (l.267), l.544 `title`, l.636 `metaDescription` (preturi), l.658 `ctaSubtitle`, `faq.placeholder.general.q2/a2` (l.728-729), l.864 `scheduleConsultation`. Apply the same keys in `en.json` and `hu.json`.

### C-3. Implant and orthodontic prices outside /preturi contradict /preturi (and each other)
- **Evidence (all lei):**

| Item | /preturi (source of truth) | Other page |
|---|---|---|
| Implant systems | Only **"Implant BREDENT de la 3.000 lei"** (INO, Megagen and Straumann are absent from /preturi) | `/servicii/implanturi-dentare`: "INO de la 2.200", "Megagen de la 3.000", "BREDENT de la 3.000", "Straumann (Elveția) de la 4.000". Title: "Implant Dentar Satu Mare — Prețuri de la 2.200 lei". Meta: "de la 2.200 lei (INO) până la 4.000 lei (Straumann)". FAQ schema: "Toate sistemele cu care lucrăm (INO, Megagen, BREDENT, Straumann)" |
| Implant (no crown) | from 3.000 | Blog `/blog/cat-costa-implant-dentar-satu-mare` (RO/EN/HU): "2.500 – 4.500". `llms.txt`: "2.500-4.500" |
| Sinus lift | "de la 5.000" | Blog: "1.500 – 3.500" |
| All-on-4 / All-on-X | 18.000 to 20.000 ("Sistem All on X Bredent" listed as both "25.000" and "de la 20.000") | Blog: "porneste de la aproximativ 15.000 lei per arcada" |
| Metal braces, one arch | 3.000 | `/blog/aparat-dentar-satu-mare`: "1.800 – 3.000" |
| Ceramic braces, one arch | 4.000 | Blog: "2.800 – 4.500" |
| Clear aligners | "Aparat Ortodontic Invizibil 12.500" | Blog: "de la 8.000 lei" |

- **Why it matters:** patients (and Google Ads reviewers) see three different price sets. It also breaks the "prices only on /preturi" rule and undercuts the recent Bredent-only change (commit `24b7a3f`).
- **Fix:**
  - `src/lib/seo-overrides.ts` l.15-17: remove the prices from metaTitle/metaDescription.
  - `src/components/sections/ServiceLocalSeo.tsx` l.28-67: remove the price table and the INO/Megagen/Straumann mentions, and link to `/preturi`.
  - `src/lib/fallback-blog.ts`: replace the price lists in both posts with "see /preturi" (also the RO metaDescription l.646 "Preturi de la 2.500 lei").
  - `public/llms.txt`: drop the price block.
  - Inside /preturi, resolve the duplicate "Sistem All on X Bredent" rows (25.000 vs de la 20.000) in `src/data/price-list.ts`.

### C-4. `llms.txt` publishes wrong doctor names, an outdated team and wrong brand casing
- **Evidence (`https://www.dentcraft.ro/llms.txt`, source `public/llms.txt`):**
  - Title "# DentCraft - Clinica Stomatologica Satu Mare"
  - "Dr. Ghirasim Alina-Cristina" (the site says Dr. Ghirasim Denisa-Stefania)
  - "Dr. Tincu Sebastian-Mihai - … specializat in pedodontie" (the site says Dr. Tincu Giovana-Nicoleta, Specialist Parodontolog)
  - Drs. Buterchi, Cozma and Fernea are missing
  - Only 1 blog post is listed
  - Prices and "radiografie 3D: Gratuit" (C-1, C-3)
- **Why it matters:** this file exists to be quoted by LLM search. Wrong practitioner names on a medical site are an E-E-A-T and trust problem.
- **Fix:** regenerate `public/llms.txt` from `src/lib/fallback-team.ts` and the sitemap: correct names and roles, all 7 team members, all services, all posts, NAP, "DENTCRAFT" in caps, no prices or free X-ray.

---

## HIGH

### H-1. Sitemap lists 4 URLs that return 404, and live pages carry hreflang to them
- **Evidence:** 404 for `/en/blog/aparat-dentar-satu-mare`, `/hu/blog/aparat-dentar-satu-mare`, `/en/blog/stomatolog-copii-satu-mare`, `/hu/blog/stomatolog-copii-satu-mare`. The RO pages `/blog/aparat-dentar-satu-mare` and `/blog/stomatolog-copii-satu-mare` emit `hreflang="en"` and `"hu"` pointing to those 404s.
- **Why it matters:** this wastes crawl budget and triggers GSC "Submitted URL not found (404)" errors. Hreflang that points to 404s invalidates the cluster.
- **Fix:**
  - `src/app/sitemap.ts` (blog block, ~l.128-145) emits every RO fallback slug for all 3 locales. Only emit a locale if `fallbackBlogPosts[locale]` (or Sanity) has that slug.
  - Apply the same condition to `alternates.languages` in `src/app/[locale]/blog/[slug]/page.tsx` → `generateDynamicPageMetadata` (`src/lib/seo.ts` ~l.88-135).
  - Alternatively, translate the two posts.

### H-2. Six service pages are orphans or nearly orphans (including the main implant landing page)
- **Evidence:** count of internal `<a href>` links from the 37 crawled RO pages (nav, footer and body):

| URL | Linking RO pages |
|---|---|
| `/servicii/albire-dentara` | **0** |
| `/servicii/detartraj` | **0** |
| `/servicii/coroane-dentare` | **0** |
| `/servicii/consultatie-stomatologica` | **0** |
| `/servicii/implanturi-dentare` | 1 (`/preturi` only) |
| `/servicii/fatete-dentare` | 1 (`/preturi` only) |
| `/servicii/urgente-dentare`, `/endodontie`, `/chirurgie-oro-maxilo-faciala` | 1 each (`/servicii`) |
| `/servicii/stomatologie-generala`, `/estetica-dentara`, `/protetica`, `/implantologie` (for comparison) | 37 each |

  The `/servicii` hub links only 9 services. EN/HU are the same (for example, 0 links to `/en/services/implanturi-dentare` and `/hu/szolgaltatasok/albire-dentara`).
- **Why it matters:** pages reachable only through the sitemap get little PageRank and rank poorly. `/servicii/implanturi-dentare` is the page with the strongest commercial intent (and the Ads landing page) but has almost no internal equity.
- **Fix:**
  - Add the 6 newer services to the `/servicii` grid (`src/app/[locale]/servicii/page.tsx`) and to the footer/mega-menu.
  - Cross-link parent and child pages: implantologie ↔ implanturi-dentare, estetica-dentara ↔ fatete/albire, protetica ↔ coroane, stomatologie-generala ↔ detartraj/consultatie.
  - Link services from the relevant blog posts.

### H-3. Overlapping service pages compete for the same queries (implantologie vs implanturi-dentare)
- **Evidence:**
  - `/en/services/implantologie` and `/en/services/implanturi-dentare` have the identical title "Dental Implants | DENTCRAFT Satu Mare" and og:title "Dental Implants".
  - RO `/servicii/implantologie` meta starts "Implanturi dentare Satu Mare de ultima generatie…" while `/servicii/implanturi-dentare` targets "Implant Dentar Satu Mare".
  - There are similar parent/child pairs: estetica-dentara vs fatete-dentare/albire-dentara, protetica vs coroane-dentare.
- **Why it matters:** this is keyword cannibalisation. Google rotates between the two URLs and neither consolidates.
- **Fix:** give each page a distinct intent. Make `implantologie` the hub (All-on-4/6, sinus lift, bone graft) and `implanturi-dentare` the single-implant page. Retitle and add cross-links. Fix the EN/HU titles in `src/messages/en.json` / `hu.json` (service title keys) or `src/lib/fallback-services.ts`.

### H-4. Service pages are thin: about 50 to 125 unique words, wrapped in about 2,600 words of shared boilerplate
- **Method:** I extracted the text blocks inside `<main>` for every service page in each locale. A block was counted as unique only if it appears on 25% or fewer of that locale's service pages. Testimonials, the doctor card, the service carousel and the CTA are removed this way.
- **Evidence:** raw `<main>` words are about 2,660 to 3,256 per RO page. Unique words:
  - RO: stomatologie-generala 88, estetica-dentara 86, protetica 95, implantologie 105, ortodontie 123, endodontie 110, chirurgie 112, pedodontie 120, urgente 112, consultatie 80, **coroane-dentare 55**, **fatete-dentare 58**, **detartraj 57**, albire 101. **implanturi-dentare 645** is the only page with `ServiceLocalSeo`.
  - EN: 60 to 118.
  - HU: **52 to 83**.
  - Example: the entire unique copy of `/servicii/fatete-dentare` is 3 benefit bullets and 3 process steps (about 58 words).
- **Why it matters:** thin, templated pages on YMYL topics rank poorly locally, and most of each page is near-duplicate. EN/HU are thinner still.
- **Fix:** extend the `ServiceLocalSeo` pattern (`src/components/sections/ServiceLocalSeo.tsx`) to every service: 400 to 800 words of real content (indications, procedure, recovery, risks, who performs it, FAQ, link to /preturi), then translate it. Start with fatete, coroane, detartraj, ortodontie and albire.

### H-5. Every service page credits only Dr. Petric. The real specialists are not linked
- **Evidence:** the "Realizat de specialiști" block on all 15 RO service pages links only `href="/echipa/razvan-petric"`. That includes `/servicii/ortodontie` (the team has orthodontist Dr. Cozma Stefana), `/servicii/chirurgie-oro-maxilo-faciala` (the team has Dr. Buterchi, "Medic Specialist Chirurgie Dento-Alveolara"), `/servicii/pedodontie` (Dr. Ghirasim lists Stomatologie Pediatrica) and `/servicii/detartraj` (Dr. Tincu is the periodontist; Dr. Fernea is certified in Guided Biofilm Therapy). Inbound links: `/echipa/razvan-petric` 20 pages, each other doctor 2.
  - All 3 blog posts (including orthodontics and pediatric) have `author: Dr. Razvan Petric` with jobTitle "Medic Stomatolog Principal". His profile says "Medic Stomatolog Coordonator".
- **Why it matters:** E-E-A-T. Google and patients look for the qualified specialist behind each treatment. Five profiles are almost unlinked.
- **Fix:**
  - Map service to doctor slug in `src/lib/fallback-services.ts` (or the service page `src/app/[locale]/servicii/[slug]/page.tsx`) and render the matching specialist(s).
  - Set the blog author per post in `src/lib/fallback-blog.ts` (author object l.614-626). Use Cozma for the braces post and Ghirasim for the children's post, or keep Petric as author and add "medically reviewed by".
  - Use one jobTitle everywhere.

### H-6. Imaging and technology wording implies in-clinic CT/radiology
- **Evidence:**
  - `/` "Scanner 3D digital, radiologie low-dose și planificare computerizată" (EN "low-dose radiology", HU "alacsony dózisú radiológia")
  - `/servicii/implantologie` "Pasul 1 Consultatie si CT — Evaluare completa cu tomografie 3D…" and "Planificare 3D: Tomografie computerizata si ghidaj chirurgical digital"
  - `/hu/szolgaltatasok/implantologie` "CT-felvétel és számítógépes implantátum-tervezés"
- **Why it matters:** none of these says "free" or "in-house" in so many words, but readers will infer that the clinic has radiology and CT, which it does not.
- **Fix:** reword to "CBCT realizat la un centru de imagistică partener, planificare digitală în clinică". Keys: `src/messages/ro.json` l.273-275 and l.971 `r2Desc`, `en.json` l.971, `hu.json` l.275 and the HU `r2Desc` equivalent.

### H-7. Placeholder testimonials on /testimoniale
- **Evidence:** `/testimoniale` (and `/en/testimonials`, `/hu/velemenyek`) show exactly 3 reviews: "Maria P." (Fatete dentare), "Andrei M." (Implant dentar), "Elena S." (Albire dentara). They come from `PlaceholderTestimonialsPage`, which renders when Sanity has no testimonials (`src/app/[locale]/testimoniale/page.tsx` l.108 and l.297-330). Meanwhile the homepage shows real named Google reviews with avatars.
- **Why it matters:** generic invented testimonials on a medical site are a trust and consumer-law risk, and they are weaker than the real Google reviews already available.
- **Fix:** feed `/testimoniale` from the same Google-review source as the homepage (or Sanity), and remove the placeholder path.

### H-8. Listing pages have no H1. Service and team H1s have no spaces in their text content
- **Evidence:**
  - **0 `<h1>`** on `/servicii`, `/echipa`, `/preturi`, `/contact`, `/blog` and `/galerie`, in all 3 locales (18 URLs). Their visual heading is an `<h2>` from `AnimatedServiceHeading`.
  - On service and team pages the H1 is built from per-word `inline-block` spans separated only by CSS margin. For example the raw H1 on `/servicii/implanturi-dentare` is `<span…>Implanturi</span><span…>Dentare</span>`, so the DOM textContent is "ImplanturiDentareSatu Mare" (team: "Dr.FerneaRemus"). The words also ship with `style="opacity:0"` until JS runs.
- **Why it matters:** the H1 is a primary on-page relevance signal. Missing or concatenated H1 text weakens it, and screen readers may read the words joined.
- **Fix:**
  - `src/components/ui/AnimatedServiceHeading.tsx` (renders `<h2>` at l.19/l.34): add an `as="h1"` prop and use it in the hero of the 6 listing pages.
  - `src/components/sections/ServiceHero.tsx` l.48-93 and `TeamMemberHero.tsx`: emit `{' '}` between word spans, or put `aria-label`/sr-only full text on the `<h1>`.

### H-9. Team profiles in EN/HU are untranslated duplicates with meta descriptions of 2 to 5 words
- **Evidence:**
  - `/en/team/remus-fernea` and `/hu/csapat/remus-fernea` serve the Romanian bio ("Dr. Remus Fernea este medic dentist, absolvent al Universitatii…"), Romanian specialisations, and the same title "Dr. Fernea Remus | DENTCRAFT Satu Mare" as RO. All 7 profiles are the same (21 duplicate titles).
  - Meta descriptions are just the role: "Medic Stomatolog" (16 chars, shared by Ghirasim and Fernea in 3 locales), "Medic Stomatolog Coordonator" (28), "Specialist Parodontolog" (23), "Asistent Medical Coordonator" (28).
  - The Person JSON-LD `description` is Romanian on EN/HU.
- **Why it matters:** this is near-duplicate content across hreflang alternates, and there is no snippet control. These are the pages that carry E-E-A-T.
- **Fix:** add `en`/`hu` bio, role and specializations to `src/lib/fallback-team.ts`, and build the meta description from name + role + key credentials + "Satu Mare" (120 to 155 chars) in `src/app/[locale]/echipa/[slug]/page.tsx` `generateMetadata`.

### H-10. The location page `/stomatolog/satu-mare` does not exist
- **Evidence:** `https://www.dentcraft.ro/stomatolog/satu-mare` returns **404**. There is no route for it in `src/app/[locale]/` (directories: blog, contact, echipa, faq, galerie, preturi, servicii, testimoniale, `[...slug]` for legal pages only), and no git history for `src/app/[locale]/stomatolog`. It is not in the sitemap.
- **Why it matters:** if this URL is used in ads, GBP, citations or planned content, it is a dead end. Even if not, there is no dedicated local landing page (neighbourhoods, directions, parking, Carei/Negrești-Oaș/Ardud catchment).
- **Fix:** confirm the intended URL. Either build the page (with LocalBusiness schema, map, directions, team and services links) or remove references to it.

---

## MEDIUM

### M-1. Structured data: aggregateRating does not match the page and cannot win rich results
- **Evidence:** the sitewide `LocalBusiness/MedicalBusiness/Dentist` node (on all 107 live pages) has `"ratingValue":"4.9","reviewCount":"40"`, hardcoded in `src/lib/schema.ts` l.48-49. The visible homepage and service-page widget says "4.9 · 50 + recenzii pe Google".
- **Why it matters:** Google does not show self-serving review stars for LocalBusiness/Organization, and markup that disagrees with visible content is a structured-data-guidelines risk. The rating also goes stale as reviews grow.
- **Fix:** remove `aggregateRating` from the sitewide node, or populate it from the same Google review feed as the widget so the numbers match.

### M-2. Structured data: sameAs, hasMap and the SearchAction are wrong or weak
- **Evidence (`src/lib/schema.ts` l.30-67):**
  - `sameAs` = `https://facebook.com/dentcraft.ro`, `https://instagram.com/dentcraft.ro`, `https://www.google.com/maps/place/DENTCRAFT/`. The site's own links (contact page, footer, `src/lib/constants/contact.ts` l.14) point to `https://www.instagram.com/dentcraft.sm`, `https://www.facebook.com/Dr.PetricRazvan` and `https://www.youtube.com/@DENTCRAFTSM`. YouTube is absent from sameAs.
  - `hasMap` is a generic `/maps/place/DENTCRAFT/` search URL, not the GBP CID/place URL.
  - The `WebSite` `SearchAction` targets `/blog?q={search_term_string}`. Google retired the sitelinks search box in Nov 2024.
  - `geo` is 47.789 / 22.876 (3 decimals, about 100 m precision).
- **Fix:** set sameAs to the real profiles (Instagram dentcraft.sm, the actual clinic Facebook page, YouTube, the GBP `https://maps.google.com/?cid=…` URL). Use the GBP URL for `hasMap`. Remove the SearchAction. Use 5 to 6 decimal coordinates from GBP.

### M-3. Structured data: missing or thin types
- **Evidence:**
  - `/faq` has **no FAQPage** (types: Dentist, WebSite only), but `/preturi`, `/servicii/implanturi-dentare` and the implant post do.
  - The Dentist node has a single `openingHours: "Mo-Fr 10:00-18:00"` and no Saturday info. The contact page shows "Sambata Cu programare" (by appointment).
  - Person (for example `/echipa/remus-fernea`) has no `medicalSpecialty`, `hasCredential`, `sameAs` or `@id`. `worksFor` is a bare Dentist without `@id`, so it does not link to the sitewide node.
  - No page uses `@id` to connect Organization ↔ WebSite ↔ Person ↔ BlogPosting.
  - Service pages use `Service/MedicalProcedure` with `serviceType: "Dental Service"` on all 15 pages.
- **Why it matters:** FAQ rich results are limited for most sites now, but the markup still helps AI answer engines. Entity linking (`@id`) strengthens Knowledge Graph association between the doctors and the clinic.
- **Fix:** in `src/lib/schema.ts`, give the clinic `@id: https://www.dentcraft.ro/#dentist` and reference it from Person.worksFor, BlogPosting.publisher and Service.provider. Add `openingHoursSpecification`. Add FAQPage to `/faq` once real Q&As exist (M-4). Add `medicalSpecialty` and credentials to Person.

### M-4. /faq is placeholder content with 5 Q&As
- **Evidence:** `/faq` server HTML contains about 83 words of main content. Sanity has no FAQs, so the page falls back to `faq.placeholder` in `src/messages/ro.json`: 2 general, 1 pricing, 1 treatment, 1 appointments. One of those (q2) is the false "free consultation" answer (C-2).
- **Fix:** move the good service FAQs (for example the 5 implant FAQs in `ServiceLocalSeo.tsx`) into Sanity or the messages, aim for 20 to 30 real Q&As across categories, and add FAQPage JSON-LD.

### M-5. Inconsistent team-size claims
- **Evidence:**
  - `/echipa` meta: "3 medici stomatologi (Dr. Petric, Dr. Ghirasim, Dr. Tincu)"
  - `/servicii` meta: "echipa de 5 specialisti"
  - `/hu` meta: "5 fős sz…"
  - `/echipa` body: "6 specialiști"
  - HU implant post: "6 szakorvosból álló csapattal"
  - `llms.txt`: "6 specialisti" but lists 3
  - The site has 6 doctors and 1 assistant.
- **Fix:** update `src/messages/{ro,en,hu}.json` meta descriptions for team, services and home, and `public/llms.txt`.

### M-6. Animated counters render "0+" in server HTML
- **Evidence:** the homepage server HTML text reads "0 + ani experiență 0 + pacienți tratați". This pattern appears in 21 fetched pages (the homepage in 3 locales plus team profiles). `src/components/ui/CountUp.tsx` l.25 has `useState(reduce ? end : 0)`.
- **Why it matters:** non-JS crawlers, social scrapers and AI fetchers read "0+ years / 0+ patients".
- **Fix:** initialise with `end` on the server and animate from 0 only after mount/intersection, or render the final number in an sr-only span.

### M-7. Legal pages: noindex, yet listed in the sitemap
- **Evidence:** 9 sitemap URLs (`/politica-confidentialitate`, `/politica-cookies`, `/termeni-conditii` x 3 locales) return `<meta name="robots" content="noindex, nofollow">`. They also reuse the homepage meta description, for example `/politica-cookies` desc = "Clinica stomatologica in Satu Mare cu 10+ ani experienta si 1500+ pacienti tratati…".
- **Why it matters:** this gives GSC a conflicting signal ("Submitted URL marked noindex"). `nofollow` also stops link equity flowing from footer-linked pages.
- **Fix:** remove them from `staticPages` in `src/app/sitemap.ts` (l.29-31), or make them indexable. Use `noindex, follow`, not `nofollow`, in `src/app/[locale]/[...slug]/page.tsx` l.62 (`noIndex: true`). Give each a proper description.

### M-8. Title and meta-description lengths
- **Evidence:**
  - Titles over 60 chars: `/servicii` 97 ("Servicii Stomatologice Satu Mare | Implanturi, Ortodontie, Estetica Dentara | DENTCRAFT Satu Mare"), `/preturi` 97, `/hu/arak` 89, `/hu/szolgaltatasok` 90, `/en/prices` 84, `/en/faq` 81, `/hu/gyik` 82, `/blog/aparat-dentar-satu-mare` 81, `/servicii/implanturi-dentare` 72. The global " | DENTCRAFT Satu Mare" suffix is added to titles that already contain "Satu Mare".
  - Meta descriptions over 160 chars: `/servicii/stomatologie-generala` 276, `/servicii/albire-dentara` 265 (EN 261, HU 280), `/servicii/implantologie` 244, `/servicii/endodontie` 228, `/servicii/pedodontie` 228, `/servicii/protetica` 226, `/servicii/ortodontie` 223, `/servicii/estetica-dentara` 213, `/servicii/chirurgie-oro-maxilo-faciala` 211, `/servicii/urgente-dentare` 211, homepage 181, `/hu/csapat` 184.
  - Too short (under 80): `/servicii/fatete-dentare` 69, `/servicii/consultatie-stomatologica` 72, `/servicii/detartraj` 72 (EN 61), most EN/HU child services 61 to 82, all team profiles 16 to 42 (H-9).
- **Fix:** shorten the suffix logic in `src/lib/seo.ts` `generatePageMetadata` (skip " Satu Mare" when the title already contains it). Rewrite descriptions to 120 to 158 chars in `src/messages/*.json` and `src/lib/fallback-services.ts`.

### M-9. HU (and some EN) copy lacks diacritics or has typos
- **Evidence:**
  - HU titles: "Fogimplantatumok", "Fogkoronak", "Foghejakak" (should be Foghéjak), "Professzionalis Fogfeherites", "Professzionalis Fogkotisztitas", "Fogaszati Konzultacio"
  - HU description: "…az egeszsges inyekért…" (typo)
  - HU process step labels "Lepes 1" (should be Lépés)
  - The HU testimonials CTA is also unaccented: "Foglaljon ingyenes konzultaciot"
- **Why it matters:** Hungarian searchers type with diacritics, so the pages match queries worse and read as machine-made.
- **Fix:** proofread `src/messages/hu.json` and the HU fields in `src/lib/fallback-services.ts`.

### M-10. Blog: 3 posts, the latest 5 months old, only 1 translated
- **Evidence:** the sitemap and `/blog` list 3 posts (published 2026-02-24, 2026-06-18, 2026-06-18). `/en/blog` and `/hu/blog` list 1 post each. Posts get 1 to 2 internal links each (H-2 data).
- **Fix:** publish 2 to 4 posts a month on service-gap topics (fatete, albire, detartraj, urgente, coroane), each linking to its service page and to the authoring doctor. Translate selectively, or don't emit EN/HU URLs for untranslated posts (H-1).

### M-11. Performance proxies: no edge caching, large HTML, a 7.6 MB video, double hero preload
- **Evidence:**
  - Every page: `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`, `x-vercel-cache: MISS`. Cause: `src/app/[locale]/layout.tsx` l.56 calls `await cookies()` (maintenance-preview cookie), which makes every route dynamic.
  - TTFB measured from here: homepage 0.38 to 0.39 s, `/servicii/implanturi-dentare` 0.34 to 0.42 s, `/preturi` 0.31 to 0.40 s. That is acceptable today but uncached.
  - HTML weight: homepage 725 KB uncompressed / 62 KB brotli. Service pages about 586 to 603 KB uncompressed. Much of it is RSC payload.
  - The homepage `LazyVideo` loads `/video/clinica.mp4` (7,955,074 bytes, `cache-control: public, max-age=0, must-revalidate`) when scrolled into view, on mobile too.
  - Two hero images are preloaded with no `media` attribute (`hero-patient-portrait.webp` and `hero-patient-landscape.webp`, both q=95), so every device downloads both.
  - Both `gtm.js` (GTM-MHB5K5LL, 446 KB uncompressed) and `gtag/js` (AW-18165025740, 483 KB uncompressed) are `<link rel="preload">`ed, so they compete with the LCP image.
  - Images are fine overall: all are served via `/_next/image` as AVIF. The largest candidates at w=3840 are 315 KB (clinic-6) and 245 KB (dr-tincu); smaller widths are served on mobile.
- **Why it matters:** these are the main levers for LCP/TBT on mobile. They are not measured CWV (PSI was unavailable).
- **Fix:**
  - Move the maintenance-cookie check to `src/middleware.ts` (or read it only when `isMaintenanceMode` is true) so pages can be static/ISR.
  - Add `media="(orientation: portrait)"` / `(orientation: landscape)` to the hero preloads, or preload only one, and drop q=95 to 75 to 80.
  - Remove the manual GTM/gtag preloads (load them `afterInteractive`/`lazyOnload`) and drop gtag if GTM already fires the Ads tag.
  - Re-encode the video at 720p around 1.5 to 2.5 MB, or don't autoload it on mobile.

### M-12. og:url missing on 102/107 pages; blog OG dimensions declared wrong
- **Evidence:**
  - `og:url` appears only on the 5 live blog posts.
  - The blog covers declare `og:image:width=1200` / `height=630`, but the real files are `implant-dentar-satu-mare-cover.webp` **1536x1024**, `aparat-dentar-satu-mare-cover.webp` **1200x676** and `stomatolog-copii-satu-mare-cover.webp` **1200x676**.
- **Fix:** add `openGraph.url` (the canonical) in `src/lib/seo.ts` `generatePageMetadata`. Export the blog covers as 1200x630 JPGs.

---

## LOW

### L-1. Generic WebP OG image on 84 of 107 pages
- **Evidence:** `og:image = https://www.dentcraft.ro/images/og-clinic.webp` (1200x630, `image/webp`, 48 KB) on 84 pages: home, all hubs, all 45 service pages, `/preturi`, `/faq`, all 3 Camelia profiles, and so on. Blog covers are WebP too. The default is set in `src/lib/seo.ts` l.12 `defaultOgImage`.
- **Why it matters:** WebP OG support varies by platform. LinkedIn and some WhatsApp/older Facebook scrapers have been unreliable with WebP previews. I could not verify platform rendering with curl, so treat this as a compatibility risk. Separately, one generic image for every service is a missed click-through opportunity.
- **Fix:**
  - Switch `defaultOgImage` to a 1200x630 JPG, as already done for the team cards.
  - Generate per-service OG cards (`/images/og/services/<slug>.jpg`) the same way as `/images/og/team/`.
  - Add a JPG card for `camelia-gherman`.
  - Check the result with the Facebook Sharing Debugger and LinkedIn Post Inspector.

### L-2. The 404 page sends mixed signals
- **Evidence:** `/nu-exista-pagina` (and the 4 blog 404s) return status 404, which is correct. But:
  - The HTML is `<html id="__next_error__">` with no `lang`.
  - It contains both `<meta name="robots" content="noindex">` and `content="index, follow"`.
  - The canonical is the homepage (`https://www.dentcraft.ro`, or `/en` for EN).
  - The title is the homepage title.
  - The server-rendered body has no visible text (about 5 words). The `not-found.tsx` content (H1 "404", message, home link) is not in the SSR HTML.
- **Fix:** make `generateMetadata` in the root/locale layout skip canonical and alternates for not-found. Add `src/app/not-found.tsx` (root) so the localized 404 renders server-side.

### L-3. Sitemap lastmod is the request time
- **Evidence:** every non-blog URL has `<lastmod>2026-11-24T08:49:34.940Z</lastmod>` (`const now = new Date()` in `src/app/sitemap.ts`).
- **Why it matters:** Google ignores lastmod values that are always "now".
- **Fix:** use real content dates (git or Sanity `_updatedAt`), or omit lastmod.

### L-4. Redirect chain and a temporary redirect
- **Evidence:**
  - `http://dentcraft.ro/` → 308 `https://dentcraft.ro/` → 308 `https://www.dentcraft.ro/` (2 hops). `http://www.` → `https://www.` and `https://dentcraft.ro/` → `https://www.` are 1 hop each.
  - `/ro` and `/ro/servicii` → **307** (temporary) to `/` and `/servicii`.
  - Trailing slash `/servicii/` → 308 `/servicii`, which is fine.
- **Fix:** add a single-hop apex-http → `https://www` redirect in the Vercel domain settings. Make the `/ro` prefix strip a permanent 308 (next-intl middleware in `src/middleware.ts`).

### L-5. EN/HU URLs use Romanian slugs
- **Evidence:** `/en/services/implanturi-dentare`, `/hu/szolgaltatasok/fatete-dentare`, `/en/blog/cat-costa-implant-dentar-satu-mare`.
- **Fix (optional, needs 301s):** localized slugs, for example `/en/services/dental-implants` and `/hu/szolgaltatasok/fogimplantatum`.

### L-6. Gallery copy mismatch and generic alt text
- **Evidence:** `/galerie` says "3 cazuri documentate" but shows 4 items titled "Lucrare estetică #1…#4". Clinic images have alt text such as "Clinica" or "Echipamente" repeated.
- **Fix:** correct the count. Write descriptive alt text (treatment, material, doctor).

### L-7. Image alt text: no real gaps
- **Evidence:** 0 `<img>` elements without an `alt` attribute across all 111 fetched pages. Every `alt=""` found is on decorative icons (`/icons/*.svg`) or the small avatar stack, which is correct.
- **Action:** none needed.

### L-8. Canonicals and hreflang are otherwise correct
- **Evidence:** all 107 live pages have exactly one self-referencing canonical and a complete ro/en/hu/x-default set (x-default = RO). Every alternate is reciprocal except the 4 blog 404s in H-1. `robots.txt` allows everything except `/api/` and `/studio/` and declares the sitemap. Its `Host:` directive is non-standard and harmless.
- **Action:** none beyond H-1.

### L-9. Heavy originals in `public/` (not served directly, but inflate the repo and the optimizer cache)
- **Evidence:**
  - `public/images/clinic/clinic-6.webp` 1.26 MB, `gallery/razvan-petric/petric-razvan-protetica-dentara-2.webp` 1.15 MB, `clinic/clinic-8.webp` 926 KB, `clinic-1.webp` 888 KB, `clinic-10.webp` 861 KB, `team/dr-tincu-giovana.webp` 733 KB.
  - `public/images/team/asistent-calugher-ionela.webp` (710 KB) belongs to someone not on the site.
- **Fix:** resize the originals to at most 2400 px wide. Remove unused assets.

### L-10. Getting real Core Web Vitals
- **Evidence:** PSI returned 429 with keyless quota 0. Local Lighthouse was not permitted in this session.
- **Fix:** run `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=…&strategy=mobile&key=<API_KEY>` or `npx lighthouse <url> --form-factor=mobile` for `/`, `/servicii/implanturi-dentare` and `/preturi`. Also check CrUX field data in Search Console (Core Web Vitals report), since the site may have enough traffic for origin-level data.

---

## Appendix: raw checks

- **Sitemap status:** 111 URLs → 107 × 200, 4 × 404 (H-1).
- **Duplicate titles:** the 7 team titles are identical across locales (21 URLs); `/en/services/implantologie` = `/en/services/implanturi-dentare`.
- **Duplicate meta descriptions:** home = the 3 legal pages (per locale); team role strings repeated (H-9).
- **H1:** 1 on home, services, team profiles, blog posts, FAQ, testimonials and legal pages; 0 on 18 listing URLs (H-8). No page has more than one H1.
- **Robots meta:** `index, follow` everywhere except the 9 legal pages (`noindex, nofollow`) and 404s. No noindex leaks on money pages.
- **NAP (visible + schema):** "Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare", postalCode 440187, tel `0741 199 977` / `+40 741 199 977` (`tel:+40741199977`), consistent across pages and JSON-LD. Hours are "Luni - Vineri 10:00 - 18:00, Sambata Cu programare, Duminica Inchis" on /contact vs `Mo-Fr 10:00-18:00` in schema (M-3).
- **OG images in use:** `og-clinic.webp` ×84, 6 team JPGs ×3 each, implant cover ×3, aparat cover ×1, copii cover ×1. All return 200.
