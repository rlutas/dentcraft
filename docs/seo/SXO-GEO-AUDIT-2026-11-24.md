# DENTCRAFT – SXO + GEO audit (2026-11-24)

Scope: https://www.dentcraft.ro (ro default, /en, /hu). Research only; no repo changes.
Method: live HTML fetched with curl (titles, meta, JSON-LD, robots.txt, llms.txt, sitemap); SERP checks via WebSearch.

## Limitations (read first)
- The WebSearch tool returns a generic result list, NOT the Google SERP layout. I could NOT observe the map pack, AI Overview, PAA, ads or exact rank order for the 8 queries. SERP composition below combines (a) what WebSearch returned, (b) Search Console data you supplied, (c) typical Romanian local-dental SERP structure. Verify manually in an incognito browser (location Satu Mare) before acting on section 1 "SERP" columns.
- WebSearch surfaced almost no Satu Mare competitor sites (only directories: romedic.ro, whatclinic.com, presasm.ro advertorial for Centrul Medical Sfântul Anton, termene.ro). That itself is a signal: organic competition for local terms is thin and directory-heavy, so the low CTR is more likely a snippet and map-pack problem than a ranking problem.
- No Playwright render was run; findings come from server HTML (Next.js SSR, content is present in raw HTML).
- No competitor titles/meta were retrievable, so "beat the competitor snippet" advice is based on principles, not a side-by-side.

## SXO Gap Score (separate from SEO Health Score): ~62/100
Page type 11/15, Content depth 11/15, UX 10/15, Schema 9/15, Media (not assessed in depth) 8/15, Authority 8/15, Freshness 5/10.

## Top findings (priority order)
1. Snippets are the CTR problem. Current titles/meta are written WITHOUT Romanian diacritics (ex: "Clinica Stomatologica", "Preturi", "zambet", "Contacteaza") while the visible page uses diacritics. Searchers type without diacritics too, but unaccented snippets look low-quality next to accented competitors/GBP. Several titles are bare ("Ortodontie | DENTCRAFT Satu Mare", "Urgente Dentare | ...", "Detartraj Profesional | ..."), with no intent or proof hook.
2. Cannibalization/architecture inverted: /servicii/implanturi-dentare is the strong page (price table, FAQPage schema, 4 implant systems, explicit "de la 2.200 lei" snippet) but ALL internal links (homepage cards, nav, Servicii) point to the thin /servicii/implantologie. Link equity goes to the wrong page.
3. Page-type mismatches: "clinica dentara / cabinet stomatologic / stomatologie satu mare" is a local-business/map-pack intent; homepage is the correct page type but title says "Dentist Satu Mare | Clinica Stomatologica" (no differentiator) and meta uses "10+ ani, 1500+ pacienti" claims without reviews/price/hours. "Urgențe" queries (pos 18-26) hit a service page with generic copy and no hours/phone above the fold, no urgent-symptom content.
4. Risky/inconsistent claims (credibility + YMYL, see section 3): CT/3D tomography, "radiologie low-dose", "Consultație + radiografie 3D: Gratuit", "consultație gratuită", "program prelungit", Invisalign vs Clear Correct, team count mismatches.
5. /preturi ranks 6.4k impressions at pos 15 and /contact 1.3k at 29.6: both have no <h1> in the raw HTML (regex found none; heading is likely a styled h2/div). Add real H1s.

## 1. Query-by-query (8 key queries)

Legend: "Should rank" = the DENTCRAFT URL that best matches intent. Mismatch rating: ALIGNED / MEDIUM / HIGH / CRITICAL.

| Query (impr, pos, CTR) | Intent / likely SERP (needs manual verify) | Should rank | Match today |
|---|---|---|---|
| stomatologie satu mare (1132, 4.1) | Local; map pack (3-pack) + directories (romedic, whatclinic) + a few clinic homepages. Brand-agnostic "find a clinic". | Homepage | Type ALIGNED. Snippet weak: MEDIUM. |
| dentist satu mare (1112, 4.5) | Same as above, map pack dominant. | Homepage | ALIGNED; same snippet fix. |
| cabinet stomatologic satu mare (567, 6.1, 0.7%) | Local, map pack; directories. | Homepage | ALIGNED type; "cabinet" word absent from title/H1. MEDIUM. |
| clinica dentara satu mare (369, 0 clicks) | Local. Note: site title uses "stomatologica", not "dentara". | Homepage | Wording gap. Add "clinică dentară" in H1 sub-line/intro, not title. MEDIUM. |
| stomatologie copii satu mare (439, 6.3) | Local-service: clinic service pages / map pack. | /servicii/pedodontie | Type ALIGNED. Title "Pedodontie - Stomatologie Pediatrica" uses clinical jargon ("pedodontie") instead of searcher language ("dentist copii", "stomatolog copii"). MEDIUM. |
| ortodont satu mare (398, 7.6) | Person/clinic search: wants an orthodontist, not a service description. Map pack. | /servicii/ortodontie (+ /echipa if an orthodontist exists) | Title "Ortodontie | DENTCRAFT" says nothing about "ortodont", who treats, or price. HIGH. Verify there is a named orthodontic specialist; if not, do not promise "medic ortodont" (a specialty claim). |
| implant dentar satu mare (370, 6.7) + ...pret (336) | Commercial/local; price-comparison intent for the "pret" variant; clinic landing pages and long guides (Bucharest/Cluj clinics, bzi.ro advertorials). No Satu Mare price page surfaced in WebSearch. | /servicii/implanturi-dentare (NOT implantologie) | Strong page, but Google may be choosing /implantologie or /preturi. Consolidate (section 2). |
| urgente stomatologice satu mare (218, 18.6) / urgente dentare (171, 26) | Urgent local intent; SERP has national articles (antena3, bzi), directories, hospital info. Searcher wants "who can see me now / phone". | /servicii/urgente-dentare | Newly requested for indexing; title lacks symptoms and phone; no opening-hours reality check (clinic is Mon-Fri 10-18, Sat by appointment, Sun closed; NOT 24/7). Must not imply 24/7. HIGH. |

Recommendation beyond metadata (CTR on local queries is dominated by the map pack, which pushes organic down regardless of position 4-6):
- The Google Business Profile is likely the real lever: primary category "Dentist"/"Dental clinic", services list, hours incl. Saturday, photos, review velocity (site claims 4.9 / 50+ reviews), Q&A, weekly posts. Use /seo local.
- Add a visible "Rezultate/Recenzii Google" proof element and hours/phone in the first screen of service pages.

### Proposed title + meta (Romanian, diacritics, DENTCRAFT in caps)
Character counts are approximate (title target <=60-62, description <=160). Prices are taken from the live /preturi list; re-verify before publishing and keep them in sync.

**Current (via curl)**

| URL | Current title | Current meta |
|---|---|---|
| / | Dentist Satu Mare \| Clinica Stomatologica DENTCRAFT | Clinica stomatologica in Satu Mare cu 10+ ani experienta si 1500+ pacienti tratati. Implanturi, ortodontie, fatete, albire dentara. Echipa de 5 specialisti. Programeaza consultatie! |
| /preturi | Preturi Stomatologie Satu Mare 2026 \| Tarife Implant, Aparat Dentar, Fatete \| DENTCRAFT Satu Mare (too long, truncates) | Lista completa preturi stomatologie DENTCRAFT Satu Mare. Tarife transparente: implant dentar, aparat dentar, fatete, albire, coroane. Consultatie gratuita! |
| /servicii/pedodontie | Pedodontie - Stomatologie Pediatrica \| DENTCRAFT Satu Mare | Dentist pentru copii Satu Mare la clinica DENTCRAFT. Oferim stomatologie copii cu abordare blanda, ... (>200 chars, truncates) |
| /servicii/ortodontie | Ortodontie \| DENTCRAFT Satu Mare | Aparat dentar Satu Mare ... Oferim Invisalign ... (long) |
| /servicii/implanturi-dentare | Implant Dentar Satu Mare — Prețuri de la 2.200 lei \| DENTCRAFT Satu Mare (already good, diacritics ok) | Implant dentar în Satu Mare: de la 2.200 lei (INO) până la 4.000 lei (Straumann). Chirurg specialist, plan de tratament cu preț final înainte, plată în rate. |
| /servicii/urgente-dentare | Urgente Dentare \| DENTCRAFT Satu Mare | Urgenta stomatologica Satu Mare? ... Dentist urgenta disponibil pentru tratament imediat ... |
| /contact | Contact \| Programare Stomatolog - 0741 199 977 \| DENTCRAFT Satu Mare | Contacteaza clinica ... Luni-Vineri 10:00-18:00. |
| /servicii/detartraj (extra) | Detartraj Profesional \| DENTCRAFT Satu Mare | Curatare profesionala pentru sanatatea gingiilor si prevenirea cariilor. (62 chars, thin) |
| /servicii/implantologie | Implantologie \| DENTCRAFT Satu Mare | ...Afla implant dentar pret si beneficiaza de consultatie gratuita (duplicate intent with implanturi-dentare) |

**Proposed**

1. `/` 
   - Title: `Stomatologie Satu Mare | Dentist & Clinică DENTCRAFT`
   - Meta: `Clinică stomatologică în Satu Mare: implanturi, ortodonție, stomatologie copii și urgențe. 4.9 pe Google (50+ recenzii), prețuri publice. Sună: 0741 199 977.`
2. `/preturi`
   - Title: `Prețuri Stomatologie Satu Mare 2026 | Listă Completă DENTCRAFT`
   - Meta: `Lista de prețuri DENTCRAFT: implant de la 2.200 lei, aparat dentar de la 3.000 lei, detartraj de la 200 lei, consult copii 100 lei. Calculator de preț online.`
   - Also: add a visible H1 and a "Actualizat: noiembrie 2026" line.
3. `/servicii/pedodontie`
   - Title: `Dentist Copii Satu Mare | Stomatologie Pediatrică DENTCRAFT`
   - Meta: `Stomatolog pentru copii în Satu Mare: consult pedodontic 100 lei, sigilări de la 200 lei, fluorizare și tratamente blânde pe dinți de lapte. Sună: 0741 199 977.`
4. `/servicii/ortodontie`
   - Title: `Ortodont Satu Mare | Aparat Dentar Copii și Adulți DENTCRAFT`
   - Meta: `Ortodonție în Satu Mare: aparat fix metalic sau ceramic (de la 3.000 lei/arcadă) și aparat invizibil. Plan și preț final stabilite la consultație.`
   - Caveat: only keep "Ortodont" if a named orthodontic practitioner exists on /echipa.
5. `/servicii/implanturi-dentare` (keep; tiny tweak)
   - Title: `Implant Dentar Satu Mare | Prețuri de la 2.200 lei | DENTCRAFT`
   - Meta: `Implant dentar în Satu Mare: INO de la 2.200 lei, Megagen și BREDENT de la 3.000 lei, Straumann de la 4.000 lei. Plan de tratament scris, plată în rate.`
6. `/servicii/urgente-dentare`
   - Title: `Urgențe Stomatologice Satu Mare | Durere de Dinte DENTCRAFT`
   - Meta: `Durere de dinte, abces sau dinte fracturat? Programare prioritară în aceeași zi la DENTCRAFT Satu Mare. Luni–Vineri 10–18, sâmbătă cu programare: 0741 199 977.`
   - Only keep "aceeași zi" if the clinic confirms. Do NOT use "24/7", "non-stop", "gardă" or "program prelungit".
7. `/contact`
   - Title: `Contact și Program | Dentist Satu Mare DENTCRAFT`
   - Meta: `DENTCRAFT, str. Barbu Ștefănescu Delavrancea nr. 3, Satu Mare. Luni–Vineri 10:00–18:00, sâmbătă cu programare. Tel. 0741 199 977.`
   - Also add LocalBusiness/Dentist JSON-LD with openingHours, map link, and a real H1 ("Contact DENTCRAFT Satu Mare"). 1.3k impressions at pos 29.6 suggests it matches nav/brand queries; keep it, but do not try to push it.
8. Extra: `/servicii/detartraj`: `Detartraj Profesional Satu Mare | Air Flow și Ultrasonic DENTCRAFT` / `Detartraj ultrasonic de la 200 lei și Air Flow 600 lei în Satu Mare. Ce include, cât durează, cât de des se face. Programări: 0741 199 977.` (prices from /preturi; expand body copy beyond one sentence).

Other quick wins: 
- Homepage H1 currently renders as per-letter animated spans ("z â m b e t") – screen readers/AI parsers get fragments in the DOM; confirm aria-label is on the heading, or render the H1 as plain text and animate with CSS only.
- Homepage cards link to the "Implantologie" page; relink.
- Service-page copy is mostly unaccented Romanian ("Obtine", "Afla", "zambet") while headings are accented: unify to diacritics.

## 2. Cannibalization: implantologie vs implanturi-dentare

Facts:
- Both return 200, both self-canonical, both in sitemap, both ~2.8-3.4k words (mostly shared template: team bio + reviews).
- /implanturi-dentare: unique body (price table INO 2.200 / Megagen 3.000 / BREDENT 3.000 / Straumann 4.000, FAQ incl. "ce sistem e mai bun", FAQPage + Dentist schema, accented copy, 4-step process).
- /implantologie: generic claims ("rata de succes peste 98%", "top mondial", "garanție extinsă", "Consultație și CT", "tomografie 3D"), meta pushes "consultatie gratuita" and All-on-4. No FAQ/price. It is the page every nav item and homepage card links to, and what llms.txt lists.
- Both target the same query cluster ("implant dentar satu mare", "...pret").

Recommendation: MERGE with 301, keeping /servicii/implanturi-dentare as the winner.
1. Move the unique All-on-4/All-on-X content (prices: All-on-X Bredent from 20.000 lei, sinus lifting from 5.000 lei, coroană on implant 1.600-1.800 lei, from /preturi) into /implanturi-dentare as sections with H2s: "Implant unitar", "All-on-4 / All-on-X", "Augmentare osoasă / sinus lifting", "Coroane pe implant".
2. 301 /servicii/implantologie -> /servicii/implanturi-dentare (and the /en/services/implantologie, /hu/szolgaltatasok/implantologie variants to their /implanturi-dentare equivalents; check what the en/hu implanturi-dentare URLs are and add them to the sitemap).
3. Update nav, homepage service card, footer, llms.txt, hreflang and sitemap to the single URL. Remove implantologie from sitemap.
4. Remove unverifiable claims in the merge (98% success, "top mondial", CT/3D, "garanție extinsă" unless the clinic provides written warranty terms).
5. Consider keeping the hub label "Implantologie" in nav text only (link text) while URL is implanturi-dentare.
Alternative (not recommended): differentiate /implantologie as the All-on-4 / full-arch page. It would be a legitimately distinct intent ("all on 4 satu mare"), but GSC shows no impressions for that query yet; do it later if demand appears.
Risk: the thin page may currently hold some rankings; 301 passes most of them. Re-request indexing for the destination after the redirect.

## 3. GEO / AI search

**robots.txt** (live): `User-Agent: *  Allow: /  Disallow: /api/  Disallow: /studio/`, `Host:` and `Sitemap:` lines. No AI-crawler-specific blocks, so GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. are all allowed (GPTBot request got 200). That is the right default for a local clinic wanting AI citations. Optional: explicit `Allow` groups for OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot for clarity; `Host:` is a Yandex-only directive (harmless). Keep /studio and /api disallowed.

**llms.txt** (exists, ~40 lines). Accuracy check vs live site:
| Item | llms.txt | Site | Verdict |
|---|---|---|---|
| Brand | "DentCraft" | Brand must be DENTCRAFT | Fix (title and all mentions). |
| Specialists | "6 specialisti" (and lists 3 doctors) | Homepage meta "5 specialisti" | Inconsistent; pick one verified number. |
| Doctors | Petric, Ghirasim Alina-Cristina, Tincu Sebastian-Mihai | /echipa not verified in this audit | Verify against /echipa. |
| Implant price | "2.500-4.500 lei" | Live: 2.200 (INO) to 4.000+ (Straumann), Megagen/BREDENT 3.000 | WRONG; update to 2.200-4.000+ lei. |
| Coroană zirconiu | 1.500-2.500 | Live: from 1.600 (CAD/CAM zirconiu), 1.800 pressed | Approximately right; use "de la". |
| Coroană metalo-ceramică 1.000-1.800 | not checked | verify on /preturi | |
| Augmentare osoasă 800-2.500 | Live: sinus lifting from 5.000 | Check/mislabel; verify. |
| "Consultație + radiografie 3D: Gratuit" | | /preturi: consultation 150-500 lei, implant consult 200 lei, urgență 200 lei | FALSE/contradictory and also an X-ray/CBCT claim. Remove. |
| Servicii | links implantologie | should be implanturi-dentare after merge; add /preturi, /servicii/pedodontie, /urgente-dentare, /contact, /faq, /echipa | Incomplete (no /preturi, /faq, /contact, /echipa links). |
| Hours | Luni-Vineri 10-18 | Contact page also says Sâmbătă cu programare | Add Saturday. |
| Blog | one article link | Verify URL exists | Verify. |
| Copy | unaccented | | Use diacritics. |

**X-ray / CBCT claims (clinic has no in-house X-ray/CBCT) – remove or reword everywhere:**
- Homepage: "Scanner 3D digital, radiologie low-dose și planificare computerizată — fără surprize" (the "radiologie low-dose" part is the problem; intraoral/optical scanner may be fine if true).
- /servicii/implantologie: "Planificare 3D – Tomografie computerizată și ghidaj chirurgical digital", "Pasul 1 Consultație și CT – Evaluare completă cu tomografie 3D".
- /servicii/implanturi-dentare: "planificarea 3D a implantului" (soft; reword to "planificare cu CBCT efectuat într-un centru partener" only if that is the true workflow).
- ortodontie/other steps: "Examinare completă și scanare 3D" (fine only if an intraoral scanner is actually used; price list says "Consultație primară+poze+scanare 250 lei", so a scanner exists), "simulare 3D" (verify).
- llms.txt: "Consultație + radiografie 3D: Gratuit".
- Template icon `/icons/001-x-ray.svg` on pages (minor, decorative; consider swapping).
- Also check the FAQ and blog posts (not crawled in full) for "radiografie/CBCT/OPG" claims; it appeared in the page templates for /en as well ("3D scanning").
Honest framing that is also GEO-friendly: "Imagistica (radiografie panoramică / CBCT) se face în centre partenere din Satu Mare; vă primim cu rezultatul și facem planificarea implantului." Only if factually true.

**Other unverified/inconsistent claims for E-E-A-T**: "98% success", "top mondial", "garanție extinsă", "Dentist urgență disponibil în program prelungit" (hours 10-18), "Consultație gratuită" in implantologie meta vs paid consultations in /preturi, "Invisalign" (ortodonție page) vs "Clear Correct" (price list), "10+ ani experiență" (Dr. Petric graduated 2016 = ~10 years, OK), "1500+ pacienți" (needs source).

**Passage citability (service pages)**
- Strong: /implanturi-dentare has a direct, self-contained answer sentence: "Un implant dentar costă la DENTCRAFT între 2.200 și 4.000 de lei, în funcție de sistemul ales..." plus FAQ; this is exactly the format AI Overviews and LLMs quote. /preturi has FAQPage schema and category tables.
- Weak: other service pages are 80% template (team bio + reviews repeated) with 3 one-line "benefits" and 3-4 one-line steps; no definitional answer, no "cât costă", "cât durează", "doare?" Q&A, no dates. Ortodontie/pedodontie/urgente/detartraj have no FAQPage schema (only Dentist + AggregateRating on some).
- Fixes: (a) start each service page with a 40-60 word answer paragraph (what, who, from-price, duration, how to book); (b) add 4-6 visible FAQs per service + FAQPage JSON-LD; (c) add per-service Service/MedicalProcedure JSON-LD with provider -> Dentist @id; (d) add `dateModified`/"Actualizat" visible; (e) reduce repeated team/review blocks or collapse them; (f) add author/reviewer line ("Revizuit medical de Dr. Petric Răzvan") on blog and service content; (g) put hours/phone in first screen of urgent page.
- Sitemap lastmod is the same timestamp for every URL (2026-11-24T08:49Z): set real per-page lastmod, otherwise Google/AI crawlers will ignore it. Also changefreq/priority are ignored.
- Rendered heading animation splits headline text into per-letter spans; text extractors can produce "z â m b e t"-like fragments. Ensure plain-text H1.

**Brand mentions / entity signals**
- Entity data exists: AggregateRating (4.9, 50+ Google), Dentist schema on service pages, GBP map link, address/phone consistent between site and contact page.
- Not observed in WebSearch: independent mentions of DENTCRAFT. The only Satu Mare clinic coverage found was Centrul Medical Sfântul Anton via presasm.ro. Opportunities: local press (presasm.ro, informatia-zilei.ro), romedic.ro/whatclinic.com/Doctori.ro profiles with identical NAP, UMF/Cluj alumni pages, Instagram/Facebook/TikTok bios linking back, Wikidata-less but `sameAs` array in the Dentist schema (GBP, Facebook, Instagram, romedic).
- Use "DENTCRAFT" in caps everywhere (llms.txt uses "DentCraft").

## 4. User stories (derived from signals)
1. "Am nevoie de un dentist aproape, acum" – signal: 1.1k+ impr for "dentist/stomatologie satu mare", map pack. Needs phone, hours, rating in snippet.
2. "Cât costă un implant aici?" – signal: "implant dentar satu mare pret" 336 impr; /preturi 6.4k impr. Needs price in title/meta (done on implanturi-dentare).
3. "Copilul meu are nevoie de dentist blând" – signal: "stomatologie copii satu mare" 439 impr. Needs "dentist copii" wording, kid-specific prices (consult 100 lei).
4. "Mă doare acum" – signal: urgențe queries at pos 18-26 (218+171 impr). Needs symptoms list, same-day promise truthfulness, hours.
5. "Vreau aparat dentar/ortodont" – signal: "ortodont satu mare" 398 impr at 7.6. Needs specialist identity, price from 3.000 lei, adult vs child.
Journey: awareness (1,3), consideration (2,5), decision (4).

## 5. Personas (score /100: Relevance, Clarity, Trust, Action, 25 each) – estimates
- Urgent-pain patient: 52 (Relevance 14, Clarity 12, Trust 13, Action 13). Fix: phone + hours above fold, symptom triage, honest hours.
- Parent: 60 (16/15/15/14). Fix: "dentist copii" H1, child prices, photos of kid-friendly space.
- Price-shopper (implant): 74 (20/19/17/18). Strong; merge pages, add "ce include/ce nu include".
- Aesthetic/ortho adult: 58 (15/14/15/14). Fix: orthodontist identity, before/after gallery, Invisalign vs Clear Correct consistency.
- Local comparer (map pack): 55 (16/14/12/13). Fix: GBP + review proof + snippet.
Weakest first: urgent, local comparer, aesthetic/ortho, parent, price-shopper.

## 6. Action plan
P0 (this week): new titles/metas; merge implantologie -> implanturi-dentare with 301 + relink; remove CT/3D/radiologie/"radiografie 3D gratuit"/"consultatie gratuita" claims; fix llms.txt (brand caps, prices, remove false line, add links); real H1 on /preturi and /contact; GBP review.
P1 (2-4 weeks): FAQ + FAQPage schema on pedodontie, ortodontie, urgente, detartraj; unique content per service page; per-page lastmod; urgent page restructure (symptoms, hours, phone, map); `sameAs` + Service schema.
P2: local citations/press; blog cluster ("preț aparat dentar Satu Mare 2026", "urgențe stomatologice: ce faci până la cabinet"); /en and /hu equivalents of new titles.

Cross-skill: /seo local (GBP/map pack), /seo schema (Service/FAQ/LocalBusiness), /seo content (E-E-A-T, claim review), /seo page.
Offer: generate a PDF report with `/seo google report`.
