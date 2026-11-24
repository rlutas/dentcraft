# DENTCRAFT Local SEO Audit, 2026-11-24

Scope: research only, nothing modified. Business type: brick-and-mortar, single location. Vertical: healthcare / dental.

## Method and limits (read first)
- Live Google local-pack results could not be retrieved. Google redirects to a consent wall, and DuckDuckGo and Bing returned nothing usable. Competitor data below comes from the DentalMap.ro Satu Mare listing (Google-sourced ratings, page updated Aug 2026). It is a proxy, not a live pack. Counts there are stale by weeks to months. For example, DENTCRAFT shows 65 reviews versus 79 on the GBP.
- Not verifiable: Pagini Aurii, Cylex (HTTP 403), Yelp (403), Info-Clinici (no connection), Facebook and Instagram (login-walled HTML, only confirmed the URLs return 200). Apple Maps, Waze and Bing Places were not checked, and no DataForSEO tools were available. The "missing/unknown" statuses below mean "not confirmed", not "confirmed absent".
- Proximity accounts for roughly 55% of local ranking variance and cannot be controlled.

## Score (estimate, 0-100): about 58
| Dimension (weight) | Score | Notes |
|---|---|---|
| GBP signals (25) | 15/25 | Category Stomatolog is OK. Site-link http issue is known. Interactions dropped 39% (209 to 127). |
| Reviews (20) | 12/20 | 4.9 is top-tier, but 79 reviews is below the top 3 (115-206). |
| Local on-page (20) | 10/20 | No location page (404). No area-served content. Map embed present. |
| NAP and citations (15) | 7/15 | Core NAP is consistent on-site. Schema review count, geo, postal and hours differ from other sources. Directory coverage is unconfirmed. |
| Schema (10) | 6/10 | Correct Dentist subtype, but stale and imprecise data. |
| Links and authority (10) | 5/10 | Not measurable without paid tools. Only DentalMap is confirmed. |

## 1. Map-pack competition (DentalMap proxy, Satu Mare city, ranked by Google reviews)
| # | Clinic | Rating | Reviews |
|---|---|---|---|
| 1 | Finess Dental (Eugen Lovinescu 3) | 4.9 | 206 |
| 2 | Datcu Dental Clinic | 4.9 | 191 |
| 3 | Sala Diagnostics (Careiului) | 4.9 | 115 |
| 4 | Art Dental Dr Barabasi | 4.1 | 111 |
| 5 | Dr Telegdy Jozsef | 5.0 | 94 |
| 6 | dr. Boer Noemi | 4.7 | 94 |
| **7** | **DENTCRAFT** | **4.9** | **65 (79 now per GBP)** |
| 8 | Pure Dent | 4.8 | 58 |
| 9 | Dr Tasnadi Octavian | 4.8 | 38 |
| 10 | Digora Dental | 4.8 | 35 |
| 11-21 | Duo Dent 34, Sunshine 31, BoteSan 30, ExpertDental 28 (4.7), Paveldent 26, others 17-28 | 3.3-5.0 | 17-34 |

Context: DentalMap counts about 107-120 dental practices in the city and 179 in the county. 72 of the county's practices have a CNAS contract, and DENTCRAFT does not.

Takeaways
- DENTCRAFT matches the leaders on rating (4.9). The gap is volume: it is about 36 reviews behind #3 and about 127 behind #1. At 79 reviews it likely sits in the 6th-8th range by volume.
- Exact pack membership per query (dentist, stomatologie, implant, ortodont, copii, urgente) is UNVERIFIED. Check manually from a Satu Mare IP/location, or with a rank tracker such as Local Falcon or BrightLocal.
- Finess Dental names "implant" and ExpertDental names "Implant Dentar Satu Mare" in the GBP name or title. That is a naming edge. Do not copy it, because Google policy forbids keyword-stuffed names.
- Urgente: DENTCRAFT's hours are Mon-Fri 10:00-18:00 only. There are no weekend or evening hours, which structurally weakens "urgente stomatologice" and "open now" queries.

## 2. Citations and NAP
| Source | Status | NAP observed |
|---|---|---|
| Website (HTML, all 3 languages) | OK | Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare. Phone 0741 199 977 (also +40741199977 in tel links). |
| Schema (Dentist) | Present | Same street. Postal code 440187. Phone is not E.164. |
| Google-sourced data (via DentalMap) | Present | Postal code **447230**, hours **09:00-18:00**, listed name "DENTCRAFT - Clinica Stomatologica Satu Mare". |
| DentalMap.ro | Listed (auto-generated, unverified, not claimed) | Same street and phone. Website field is http://www.dentcraft.ro/. Hours 09:00-18:00. Postal 447230. |
| Facebook (facebook.com/dentcraft.ro) | URL returns 200 | Content not readable. Verify NAP and hours manually. |
| Instagram (instagram.com/dentcraft.ro) | URL returns 200 | Content not readable. |
| Pagini Aurii, Cylex, Info-Clinici, Yelp, BBB | Unconfirmed | Blocked or not fetchable. Check manually. |
| Doctorul Zilei / docbook / medicalis / Bing Places / Apple Maps / Waze | Not checked | Check manually. |

NAP discrepancies found
1. Postal code: schema 440187, Google/DentalMap 447230. This is a real mismatch. Confirm which is correct on the GBP and use one everywhere.
2. Hours: site and schema 10:00-18:00, Google-sourced data 09:00-18:00. One is wrong. DentalMap's data is dated Aug 2026, so check whether the GBP changed since.
3. Name variants: "DENTCRAFT" (site) versus "DENTCRAFT - Clinica Stomatologica Satu Mare" (Google). Check that the GBP name field matches the real-world name, with no added keywords.
4. Coordinates: schema geo 47.789, 22.876 (3 decimals). Map link carries 47.7897, 22.8747. The embed centres on 47.7915, 22.8762. The three disagree by up to about 250 m.
5. Website field is http (known, being fixed).

## 3. On-site local signals
- Schema: type is ["LocalBusiness","MedicalBusiness","Dentist"] on every page. The subtype is correct. Includes areaServed (Satu Mare city and county), hasMap, sameAs, geo, telephone, and email.
- Problems:
  - aggregateRating reviewCount "40" versus 79 on the GBP. Stale, and a structured-data trust risk. Also, self-served LocalBusiness review markup is ineligible for rich results.
  - geo has 3 decimals instead of the recommended 5, and it is inaccurate.
  - openingHours is a legacy string. Use openingHoursSpecification.
  - sameAs is missing the real GBP CID or place URL (it uses a generic /maps/place/DENTCRAFT/).
  - No medicalSpecialty or hasOfferCatalog. Page-level Service schema exists for services (e.g. pedodontie).
  - priceRange "$$" is not meaningful for Romania. Use RON ranges or drop it.
  - The `image` is a single og image.
- Location page: https://www.dentcraft.ro/stomatolog/satu-mare returns **HTTP 404** and is not in the sitemap. The 404 page renders with full site chrome. There is no dedicated local landing page. The homepage and /contact carry NAP.
- Map: the Google Maps embed is present on /contact (iframe, lazy). Directions link present. The map link on the homepage carries the real CID.
- Area served: zero mentions of Carei, Negrești-Oaș, Tășnad, Livada, Ardud or Halmeu anywhere on the 7 pages fetched. Only "Județul Satu Mare" in schema. The hu locale does not carry Hungarian-market local copy for border towns.
- Hreflang: the canonical is set to the root. Hreflang tags were not found in my grep. Verify them, since there are 3 locales.
- Sitemap: 3 locales, 8 service pages x 3, no location or area pages. Services include implantologie, ortodontie, endodontie, pedodontie, and chirurgie. Each has a dedicated page, which is a strong local organic factor.
- The site and Google categories claim "Radiologie dentară" (see Medium action). That does not match the fact that there is no in-house X-ray/CBCT.

## 4. Review strategy benchmarks
- Gap to the top 3 is 36 to 127 reviews. To reach about 115, DENTCRAFT needs about 36 more. At 5 per month that is 7 months, and at 10 per month it is 3.6 months.
- Velocity: not measurable from public data. Keep to the 18-day rule, with at least one new review every 2-3 weeks. The interaction drop of 39% since Jul is consistent with seasonal and/or ranking decay. It is not provable from this data.
- Rating: 4.9 matches the top 3. Competitors under 4.5 (Art Dental 4.1, Sunshine 4.2, Cezar Med 3.8, Orza Dent 3.3) are weak targets in the pack.
- Responses: 79 reviews with replies are tracked in the user's GMB notes. Keep replying and include natural service and city keywords.
- Schema count (40) is also public-facing proof of the stale count.

## Prioritized actions

### Critical
1. **Create the location page, /stomatolog/satu-mare, and fix the broken link.** Evidence: HTTP 404, absent from the sitemap. Include NAP, embedded map, hours, parking and directions, areas served, the 8 services, team, and FAQ. Add it to the nav, the footer, and the GBP "Appointment" and "Services" links where useful.
2. **Fix the stale or inconsistent data: reviewCount 40 versus 79, postal 440187 versus 447230, hours 10:00 versus 09:00.** Decide the truth first (on the GBP), then align the site, schema, and directories. Evidence: the schema JSON-LD and the DentalMap/Google data above.

### High
3. **Review acquisition program.** Target 10+ per month, QR code at reception, SMS or WhatsApp links after visits, and a short link to the GBP review form. Target 115+ by about Q2 2027. Evidence: top-3 clinics have 115-206.
4. **Claim and verify citations in order:** Pagini Aurii, Cylex, Info-Clinici, docbook and medicalis (or Doctorul Zilei), DentalMap (claim the auto-generated page, it has the old http website), Bing Places, Apple Business Connect, and Facebook (check hours, address, website). Use identical NAP and the https URL.
5. **Correct geo coordinates** in schema to 5 decimals from the actual GBP pin. Use openingHoursSpecification. Evidence: three conflicting coordinate sets.
6. **Hours strategy for urgent care queries.** Consider one late evening or Saturday-morning slot and post it. Otherwise do not target "urgente" strongly in the GBP. Evidence: Mon-Fri 10-18 only.

### Medium
7. **Area pages or sections for Carei, Negrești-Oaș and nearby towns**: drive times and travel info, unique content, no doorway copies. DentalMap lists clinics in both towns, so there is competition. Also add Hungarian-language copy for the border market.
8. **Review the "Radiologie dentară" category** appearing on Google-sourced data. It conflicts with the absence of in-house X-ray/CBCT. Verify it on the GBP, and if it is an extra category, remove it or keep it only if services mention referral. Wrong category is the #1 negative factor. Keep the primary category Stomatolog.
9. **Schema upgrade**: add the real GBP place URL to sameAs, use E.164 telephone (+40741199977), add medicalSpecialty, drop or fix priceRange, and add Physician or Dentist markup for the team. Consider removing self-served aggregateRating or keep it exactly in sync with the GBP.
10. **Verify hreflang** across ro/en/hu (not found in grep, may be in headers or sitemap).

### Low
- GBP posts and photos cadence (see GMB-POSTS.md). Add Services and Products entries and Q&A seeding.
- Brand-keyword consistency: always "DENTCRAFT" in titles and citations.
- Local links: Satu Mare press, local associations, a Hungarian-language partner site.

## Evidence index
- Site pages fetched: /, /en, /hu, /contact, /preturi, /servicii/pedodontie, /stomatolog/satu-mare (404), robots.txt, sitemap.xml (all on 2026-11-24).
- Competitor and listing data: https://dentalmap.ro/satu-mare and https://dentalmap.ro/clinica/dentcraft-clinica-stomatologica-satu-mare-satu-mare (page updated Aug 2026).
- http://www.dentcraft.ro and the bare domain both return 308 to https://www.dentcraft.ro/.
