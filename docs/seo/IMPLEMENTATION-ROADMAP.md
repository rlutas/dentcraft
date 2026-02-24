# DentCraft SEO Implementation Roadmap

> **Last updated:** 2026-02-24
> **Note:** DentCraft is a **clinica stomatologica** (dental clinic), not just a dentist office. All SEO content should reflect this — target both "dentist satu mare" AND "clinica stomatologica satu mare" / "clinica dentara satu mare".

## Phase 1 — Foundation (Weeks 1-4)

**Goal:** Launch with a technically sound site and correct local signals.

### Week 1-2: Pre-Launch Technical
- [x] OG default image configured (using `/images/team-clinic.jpg`)
- [x] All service pages have meta titles/descriptions (fallback translations for all 9 services + sub-services)
- [ ] Test schema markup with Google Rich Results Test
- [x] Sitemap.xml generation works (all 3 locales, all static + dynamic pages)
- [ ] Run Lighthouse audit — target 90+ performance on mobile
- [ ] Verify hreflang tags render correctly (check with hreflang tag checker)
- [x] robots.txt blocks /studio/ and /api/ only
- [ ] Verify canonical URLs don't have trailing slashes or duplicate paths
- [x] 404 page exists and is styled (`not-found.tsx`)

### Week 2-3: Local SEO Setup
- [ ] Claim and optimize Google Business Profile
  - Business name: "DentCraft - Clinica Stomatologica Satu Mare"
  - Category: Dental Clinic (primary), Dentist, Cosmetic Dentist, Pediatric Dentist
  - Add all services with descriptions
  - Upload 20+ photos (clinic exterior, interior, team, equipment)
  - Set accurate hours
  - Add booking link
  - Write business description with keywords
- [ ] Set up Google Search Console for dentcraft.ro
- [ ] Set up Google Analytics 4
- [ ] Register on 10 dental directories (see SEO-STRATEGY.md)

### Week 3-4: Homepage Optimization
- [x] Title tag: "Dentist Satu Mare | Clinica Stomatologica DentCraft"
- [x] H1 includes "clinica stomatologica in satu mare" naturally
- [x] Meta description includes "clinica stomatologica" + primary keywords + call to action
- [x] Schema: LocalBusiness, Dentist, MedicalBusiness types render (in root layout)
- [x] Schema: sameAs, areaServed, availableLanguage added to Organization
- [ ] Internal links from service pages back to homepage

---

## Phase 2 — Content Gaps (Weeks 5-12)

**Goal:** Create missing pages that target high-impression, zero-click keywords.

### Week 5-6: Children's Dentistry Page
- [x] Pedodontie service page exists (fallback service data)
- [ ] Target: "stomatolog copii satu mare", "dentist copii satu mare", "stomatologie copii satu mare"
- [ ] Expand to 800+ words in Romanian, translated to EN and HU
- [ ] Include: age guidelines, common procedures, what to expect, tips for parents
- [x] Listed in Services navigation (in services dropdown)
- [ ] Create Sanity document with proper SEO fields

### Week 6-7: Emergency Keywords
- [x] Emergency dental keywords covered via `/servicii/urgente-dentare` (service #9)
- ~~Standalone `/urgente` page removed — not offering emergency services currently~~
- [ ] Expand urgente-dentare service content to 800+ words for keyword coverage

### Week 7-8: Service Page Optimization
- [x] All service pages have Service + MedicalProcedure schema (JSON-LD)
- [x] All service pages have breadcrumb schema
- [ ] Implantologie: expand content, optimize for "implant dentar satu mare"
- [ ] Ortodontie: optimize for "ortodont satu mare", "aparat dentar satu mare"
- [ ] Estetica Dentara: target "albire dentara satu mare", "fatete dentare satu mare"
- [ ] Each page: unique H1, 800+ words, internal links, FAQ section

### Week 8-12: Blog Launch
- [ ] Publish first 4 blog posts (1/week):
  1. "Cat costa un implant dentar in Satu Mare? Ghid preturi 2026"
  2. "Cum alegi cea mai buna clinica stomatologica in Satu Mare?"
  3. "Aparat dentar in Satu Mare: tipuri, preturi si ce sa astepti"
  4. "Urgente stomatologice: ce faci cand te doare masea noaptea?"
- [ ] Each post: 1,000+ words, 1 target keyword, internal links to service pages
- [x] Blog in main navigation

---

## Phase 3 — Scale (Weeks 13-24)

**Goal:** Build authority through content volume, reviews, and citations.

### Ongoing: Google Reviews Campaign
- [ ] Set up review request process (ask after appointments)
- [ ] Create short link for easy review access
- [ ] Send follow-up SMS/WhatsApp 24h post-appointment
- [ ] Respond to every review within 48 hours
- [ ] Target: 50 reviews by month 6

### Monthly: Blog Content (2 posts/month)
Remaining blog topics from keyword data:
5. "Stomatologie copii: cand sa mergi prima data cu copilul la dentist"
6. "Albire dentara profesionala vs. kit-uri de acasa"
7. "Coroana dentara din zirconiu: pret, avantaje, cat tine"
8. "Aparat dentar ceramic vs. metalic: diferente de pret si rezultate"
9. "Extractie molar de minte: cand e necesara si cat costa"
10. "Fatete dentare: preturi, tipuri si cat dureaza tratamentul"
11. "Tratament ortodontic cu alignere: pret si experienta in Satu Mare"
12. "Radiografie dentara 3D (CBCT): de ce e necesara si unde in Satu Mare"

### Hungarian Content
- [ ] Create Hungarian-targeted blog posts (fogorvos-specific content)
- [ ] Optimize HU service pages with local keywords
- [ ] Register on Hungarian dental directories if available

### Schema Enhancements
- [x] Service + MedicalProcedure schema on each service page
- [x] Breadcrumb schema on service pages and team member pages
- [ ] Add AggregateRating schema on homepage (from Google reviews)
- [ ] Add Person/Physician schema on team member pages
- [ ] Add Article schema on blog posts
- [ ] Add FAQ schema to service pages that have FAQ sections

---

## Phase 4 — Authority (Months 7-12)

**Goal:** Establish DentCraft as the dominant clinica stomatologica brand in Satu Mare search.

### Content Expansion
- [ ] Create "Preturi" comparison content (vs competitor pricing transparency)
- [ ] Case study blog posts (with before/after gallery links)
- [ ] Team member spotlight posts (builds E-E-A-T)
- [ ] Guest post or interview with Dr. Petric on local health sites

### Link Building
- [ ] Get listed on "best clinica stomatologica" roundup articles
- [ ] Local press coverage (clinic anniversary, community events)
- [ ] Partner with local businesses for cross-promotion
- [ ] Sponsor local events for brand mentions

### Advanced Optimization
- [ ] A/B test meta titles for top pages
- [ ] Optimize for "near me" queries (structured data + GBP)
- [ ] Monitor and respond to competitor moves
- [ ] Consider Google Ads for high-intent keywords (implant dentar, ortodontie)

---

## Implementation Status Summary

| Item | Status | Notes |
|------|--------|-------|
| Homepage meta title/description | Done | Includes "clinica stomatologica" |
| Homepage H1 with target keyword | Done | "Clinica stomatologica in Satu Mare" |
| Organization schema (root layout) | Done | LocalBusiness + Dentist + MedicalBusiness |
| Service schema (JSON-LD) | Done | All service pages |
| Breadcrumb schema | Done | Service + team pages |
| Emergency page | Removed | Keywords covered by /servicii/urgente-dentare |
| Sitemap with priorities | Done | Services at 0.9, blog at 0.7 |
| robots.txt | Done | Blocks /studio/ and /api/ |
| 404 page | Done | Styled with translations |
| OG image fallback | Done | Uses team-clinic.jpg |
| Page meta SEO optimization | Done | All 8 pages have keyword-rich metaTitle/metaDescription |
| Google Business Profile | Not started | |
| Google Search Console | Not started | |
| Google Analytics 4 | Not started | |
| Directory listings (NAP) | Not started | |
| Blog posts | Not started | Structure exists, no content yet |
| Children's dentistry content | Partial | Page exists, needs expansion |
| Article schema (blog) | Not done | Function exists, not injected |
| Person schema (team) | Not done | |
| AggregateRating (reviews) | Not done | |

---

## Monthly Review Checklist

Every month, check:
- [ ] Search Console: positions for target keywords
- [ ] Google Reviews count and rating
- [ ] New content published (target: 2 posts)
- [ ] All reviews responded to
- [ ] Directory listings still accurate
- [ ] Core Web Vitals still green
- [ ] Any new competitor activity
