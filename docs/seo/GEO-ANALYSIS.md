# GEO Analysis - DentCraft Satu Mare
## Generative Engine Optimization Report (February 2026)

---

## GEO Readiness Score: 38/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Citability (quotable passages) | 25% | 45/100 | 11.25 |
| Structural Readability | 20% | 50/100 | 10.0 |
| Multi-Modal Content | 15% | 30/100 | 4.5 |
| Authority & Brand Signals | 20% | 15/100 | 3.0 |
| Technical Accessibility | 20% | 85/100 | 17.0 |
| **Total** | | | **45.75 → 38** (brand penalty) |

> Brand penalty applied: DentCraft has near-zero verified online presence, making AI citation extremely unlikely regardless of on-site quality.

---

## Platform Breakdown

| Platform | Readiness | Notes |
|----------|-----------|-------|
| **Google AI Overviews** | 35/100 | Good SSR + schema, but site not indexed yet, no ranking history |
| **ChatGPT Search** | 15/100 | No Wikipedia, no Reddit, no YouTube — primary citation sources |
| **Perplexity** | 15/100 | No Reddit mentions, no community validation |
| **Bing Copilot** | 30/100 | Bing may index faster; good technical foundation |

---

## 1. AI Crawler Access Status

| Crawler | Owner | Status |
|---------|-------|--------|
| GPTBot | OpenAI | ALLOWED |
| OAI-SearchBot | OpenAI | ALLOWED |
| ChatGPT-User | OpenAI | ALLOWED |
| ClaudeBot | Anthropic | ALLOWED |
| PerplexityBot | Perplexity | ALLOWED |
| CCBot | Common Crawl | ALLOWED (consider blocking) |
| anthropic-ai | Anthropic | ALLOWED |
| Bytespider | ByteDance | ALLOWED (consider blocking) |
| cohere-ai | Cohere | ALLOWED |

**robots.txt** uses permissive `User-Agent: *` with only `/studio/` and `/api/` blocked. All AI crawlers have full access.

**Recommendation:** Block training-only crawlers (CCBot, Bytespider, cohere-ai) while keeping search crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) allowed.

---

## 2. llms.txt Status

**Status: MISSING**

No `/llms.txt` file exists. This is a missed opportunity to provide AI crawlers with structured content guidance about the clinic.

**Recommended llms.txt content:**

```
# DentCraft - Clinica Stomatologica Satu Mare

> Clinica stomatologica moderna in Satu Mare, Romania. 6 specialisti,
> peste 10 ani experienta. Implantologie, ortodontie, estetica dentara,
> pedodontie. Comunicam in romana, engleza si maghiara.

## Servicii principale
- [Implantologie](/servicii/implantologie): Implanturi dentare premium cu garantie
- [Ortodontie](/servicii/ortodontie): Aparate dentare fixe si mobile
- [Estetica Dentara](/servicii/estetica-dentara): Fatete, albire, bonding dentar
- [Pedodontie](/servicii/pedodontie): Stomatologie pentru copii
- [Stomatologie Generala](/servicii/stomatologie-generala): Tratamente complete
- [Protetica Dentara](/servicii/protetica): Coroane, punti, proteze

## Echipa
- Dr. Razvan Petric - Medic Stomatolog Principal, 10+ ani experienta
- Dr. Ghirasim Alina-Cristina - Medic Stomatolog
- Dr. Tincu Sebastian-Mihai - Medic Stomatolog

## Contact
- Adresa: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania
- Telefon: +40 741 199 977
- Email: dentcraftsm@gmail.com
- Program: L-V 10:00-18:00
- Limbi: Romana, Engleza, Maghiara

## Preturi orientative (2026)
- Implant dentar (fara coroana): 2.500-4.500 lei
- Coroana pe implant (zirconiu): 1.500-2.500 lei
- Consultatie + radiografie 3D: Gratuit
```

---

## 3. Brand Mention Analysis

### CRITICAL FINDING: Near-Zero Online Presence

| Platform | Status | Impact on AI Citations |
|----------|--------|----------------------|
| Google Search ("DentCraft Satu Mare") | NOT INDEXED | Cannot be cited |
| Google Business Profile | NOT FOUND | No local entity recognition |
| Wikipedia / Wikidata | NOT FOUND | ChatGPT cites Wikipedia 47.9% of time |
| Reddit | NOT FOUND | Perplexity cites Reddit 46.7% of time |
| YouTube | NOT FOUND | YouTube mentions correlate 0.737 with AI visibility |
| LinkedIn (clinic) | NOT FOUND | No professional entity signals |
| Facebook (dentcraft.ro) | UNVERIFIED | Page may not be active |
| Instagram (dentcraft.ro) | UNVERIFIED | Handle not found in search |
| Dental directories | NOT LISTED | No third-party validation |
| Dr. Razvan Petric (drpetric.ro) | ACTIVE | Only verifiable entity link |
| Dr. Razvan Petric Instagram | ACTIVE (@dr.razvanpetric) | Dental case studies |

**Brand Confusion Risk:** "DentCraft" is dominated in search by DentCraft Tools (paintless dent repair, Oklahoma, USA, est. 1992). Multiple other dental entities use "DentCraft" globally (India, Canada).

### Brand Mention Score: 5/100

Per Ahrefs December 2025 study, brand mentions correlate 3x more strongly with AI visibility than backlinks. DentCraft has effectively zero brand mentions across high-citation platforms.

---

## 4. Server-Side Rendering Check

**Status: EXCELLENT (5/5)**

All content pages use Next.js async server components. No key content is client-only rendered.

- Homepage: `async function HomePage()` — fetches from Sanity server-side
- Blog posts: `async function BlogPostPage()` — full article server-rendered
- Service pages: `async function ServicePage()` — content + FAQ server-rendered
- Team pages: `async function TeamMemberPage()` — bio + credentials server-rendered

AI crawlers do NOT execute JavaScript. All DentCraft content is accessible via initial HTML response.

---

## 5. Structured Data Analysis

| Schema Type | Implemented | Location | Quality |
|-------------|-------------|----------|---------|
| Organization / LocalBusiness / Dentist | Yes | Every page (layout.tsx) | Good |
| BreadcrumbList | Yes | Blog, services, team pages | Good |
| BlogPosting | Yes | Blog posts | Excellent (author, wordCount, inLanguage) |
| FAQPage | Yes | FAQ page + blog posts (auto-extracted) | Good |
| Service / MedicalProcedure | Yes | Service detail pages | Good |
| **Person / Physician** | **NO** | Team pages | **MISSING — high priority** |
| **AggregateRating** | **NO** | Organization schema | **MISSING — 40 reviews unused** |
| **WebSite** | **NO** | Homepage | **MISSING** |
| **MedicalClinic** | **NO** | Homepage | **MISSING** |

### Missing Schema Priorities

1. **Person schema on team pages** — credential data already exists in fallback-team.ts (universities, certifications, years), just not exposed as structured data. Fields needed: `jobTitle`, `knowsAbout`, `hasCredential`, `worksFor`, `alumniOf`

2. **AggregateRating** — 40 real Google reviews exist in `src/data/google-reviews.json`. Average rating and count can be computed. Should be added to Organization schema.

3. **WebSite schema with SearchAction** — enables sitelinks search box in Google

---

## 6. Passage-Level Citability Analysis

### Blog Post (Implant Dentar Article) — GOOD

The article has several quotable 134-167 word answer blocks:

**Strong passages:**
- Price breakdown with specific ranges (2,500-4,500 lei)
- Treatment timeline (5 numbered steps)
- FAQ answers about pain, duration, insurance
- "Ce include pretul" section — transparent pricing details

**Weak points:**
- Statistics stated without sources ("rata de succes de peste 95%" — no clinical study cited)
- "Straumann (Elvetia)" brand comparison without evidence link
- No external authority links to dental associations or studies

### Homepage — WEAK

- No question-based headings
- No self-contained answer blocks
- Stats (10+ ani, 500+ pacienti, 4.9 rating) stated without verification source
- No FAQ section on homepage
- No definition patterns ("Implantul dentar este...")

### Service Pages — MODERATE

- Good structure (benefits, process steps, FAQ)
- Fallback pages lack depth — only short descriptions from translations
- No "What is [service]?" definition blocks
- FAQs only render when Sanity data exists (fallback pages have zero FAQs)

---

## 7. Content Reformatting Suggestions

### Homepage — Add Answer Blocks

**Current:** "De ce DentCraft" section with stats icons
**Suggested:** Add 5-8 question-based H2 sections with direct 134-167 word answers:

```
## Ce servicii stomatologice ofera DentCraft in Satu Mare?
[134-167 word answer block with specific services, prices, and equipment]

## Cat costa un implant dentar la DentCraft?
[Direct answer with price range in first sentence, then context]

## Cine sunt medicii de la DentCraft?
[Named doctors with credentials, linking to /echipa pages]
```

### Blog Posts — Add Source Citations

**Current:** "Implanturile au rata de succes de peste 95%"
**Suggested:** "Implanturile au rata de succes de peste 95% pe termen lung, conform studiilor publicate in Journal of Oral Implantology (2023)."

### Service Pages — Add Definition Blocks

**Current:** Service page starts with general description
**Suggested:** Start each service with definition pattern:
"Implantul dentar este o procedura stomatologica prin care se inlocuieste radacina unui dinte pierdut cu un surub din titan biocompatibil. La DentCraft Satu Mare, folosim implanturi premium cu garantie extinsa."

---

## Top 10 Highest-Impact Changes (Priority Order)

### CRITICAL — Off-Site (Brand Existence)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Create & verify Google Business Profile** | Establishes entity in Google's knowledge graph | Medium |
| 2 | **Submit site to Google Search Console** | Gets pages indexed — prerequisite for everything | Low |
| 3 | **Create YouTube channel with 3-5 clinic/treatment videos** | Strongest AI citation signal (0.737 correlation) | High |
| 4 | **Register on Romanian dental directories** (med.ro, dentistonline.ro) | NAP citations for entity validation | Low |

### HIGH — On-Site (Schema & Content)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 5 | **Add Person/Physician schema to team pages** | Rich credential data already exists, just needs schema wrapper | Low |
| 6 | **Create /llms.txt file** | Direct guidance for AI crawlers | Low |
| 7 | **Add AggregateRating to Organization schema** | 40 reviews already in JSON, just compute average | Low |
| 8 | **Add FAQ section to homepage** with question-based H2s | Homepage is highest-traffic page, needs answer blocks | Medium |

### MEDIUM — Content Optimization

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 9 | **Add source citations to blog statistics** | Makes claims citable by AI (attributed facts) | Low |
| 10 | **Add definition blocks to service pages** | "X is..." patterns match AI answer extraction | Medium |

---

## Quick Wins (Can implement today)

1. Create `/public/llms.txt` with clinic info (see template above)
2. Add `Person` schema function to `schema.ts`
3. Add `AggregateRating` to existing Organization schema
4. Block training crawlers (CCBot, Bytespider) in `robots.ts`
5. Add source citations to blog article statistics

## Medium Effort (This week)

1. Add FAQ section to homepage with question-based headings
2. Add definition blocks to service page fallbacks
3. Create Google Business Profile
4. Submit to Google Search Console
5. Register on 3-5 dental directories

## High Impact (This month)

1. Create YouTube channel with clinic tour + treatment videos
2. Build Dr. Razvan Petric LinkedIn profile
3. Get listed on local business directories for NAP consistency
4. Create 3-5 more blog articles targeting different keywords
5. Build Reddit/forum presence in Romanian dental communities

---

## Competitive Context

DentCraft's local competitors with blogs:
- **Art Dental Studio** — established blog presence
- **Clinica Duo Dent** — active content marketing
- **Expert Dental** — competing for same keywords

These competitors likely have Google Business Profiles, directory listings, and social media presence — giving them significant AI citation advantages.

---

*Report generated: February 25, 2026*
*Methodology: Technical audit + brand presence research + content analysis + structured data review*
