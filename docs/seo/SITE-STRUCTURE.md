# DentCraft Site Structure & URL Architecture

## Current Structure (Audit)

The site already has a solid URL architecture with localized paths:

```
dentcraft.ro/                          (RO - default, no prefix)
dentcraft.ro/en/                       (EN)
dentcraft.ro/hu/                       (HU)

├── /                                  Homepage
├── /servicii                          Services listing
│   ├── /servicii/stomatologie-generala
│   ├── /servicii/implantologie
│   ├── /servicii/ortodontie
│   ├── /servicii/estetica-dentara
│   └── /servicii/pedodontie
├── /echipa                            Team listing
│   ├── /echipa/dr-petric-razvan
│   ├── /echipa/dr-ghirasim-...
│   ├── /echipa/dr-tincu-...
│   └── /echipa/[assistant-slugs]
├── /preturi                           Pricing
├── /galerie                           Before/After gallery
├── /testimoniale                      Testimonials
├── /blog                              Blog listing
│   └── /blog/[slug]                   Individual posts
├── /contact                           Contact page
├── /faq                               FAQ page
├── /politica-confidentialitate        Privacy policy
├── /politica-cookies                  Cookie policy
└── /termeni-conditii                  Terms & conditions
```

EN and HU use translated slugs:
- `/en/services/implantology`
- `/hu/szolgaltatasok/implantologia`

## Recommended Additions

### New Pages Needed

```diff
├── /servicii
│   ├── /servicii/stomatologie-generala
│   ├── /servicii/implantologie
│   ├── /servicii/ortodontie
│   ├── /servicii/estetica-dentara
│   ├── /servicii/pedodontie
+  ├── /servicii/chirurgie-dentara         ← targets "chirurgie dentara satu mare"
+  └── /servicii/radiologie-dentara        ← targets "radiologie dentara satu mare"
+├── /urgente                               ← targets urgency keywords (2,000+ imp)
```

### URL Considerations

The current setup is correct:
- Default locale (RO) has no prefix — good for SEO since Romanian is the primary audience
- Service slugs are in the target language — good for keyword matching
- Dynamic slugs from Sanity — allows content team to optimize per page

### Sitemap Priority Adjustments

Current sitemap gives homepage priority 1.0 and services 0.8. Recommended:

| Page Type | Priority | Change Frequency |
|-----------|----------|-----------------|
| Homepage | 1.0 | weekly |
| Service pages | 0.9 | monthly |
| Urgente (new) | 0.9 | monthly |
| Blog listing | 0.8 | weekly |
| Team page | 0.7 | monthly |
| Preturi | 0.8 | monthly |
| Galerie | 0.7 | monthly |
| Blog posts | 0.7 | monthly |
| Team profiles | 0.5 | yearly |
| FAQ | 0.6 | monthly |
| Legal pages | 0.1 | yearly |

---

## Internal Linking Strategy

### Hub-and-Spoke Model

Each service page is a hub. Blog posts link to their relevant hub:

```
Blog: "Cat costa un implant dentar..."  →  /servicii/implantologie
Blog: "Aparat dentar tipuri preturi..." →  /servicii/ortodontie
Blog: "Stomatologie copii..."          →  /servicii/pedodontie
Blog: "Urgente stomatologice..."        →  /urgente
```

### Cross-linking Rules
1. Every service page links to Preturi and Contact
2. Every blog post links to 1-2 service pages
3. Homepage links to all service pages (already done via Services section)
4. Team member profiles link to their specialization service page
5. FAQ page links to relevant service pages per question

### Anchor Text Guidelines
- Use keyword-rich anchor text for service links: "implant dentar in Satu Mare" not "click aici"
- Vary anchor text — don't use the exact same phrase every time
- Link naturally within content, not as standalone "Related:" blocks

---

## Schema Markup Map

| Page | Schema Types |
|------|-------------|
| Homepage | Organization, LocalBusiness, Dentist, MedicalBusiness |
| Service pages | Service, MedicalProcedure, BreadcrumbList |
| Team page | Organization with employees |
| Team profiles | Person, Physician |
| Blog posts | Article, BreadcrumbList |
| FAQ | FAQPage |
| Preturi | PriceSpecification (within Service) |
| Contact | ContactPage, LocalBusiness |
| Urgente (new) | MedicalClinic with availableService |
| Galerie | ImageGallery |

### Currently Implemented
- Organization, LocalBusiness, Dentist, MedicalBusiness (root layout)
- BreadcrumbList (service, team, blog pages)
- FAQPage (FAQ page)
- Article (blog posts)

### Missing (To Add)
- Service schema on individual service pages
- Person/Physician schema on team profiles
- AggregateRating on homepage (from Google reviews)
- MedicalProcedure on service pages

---

## Page Title Templates

### Romanian (default)
- Homepage: `Dentist Satu Mare | Clinica Stomatologica DentCraft`
- Service: `[Service Name] Satu Mare | DentCraft`
- Blog: `[Post Title] | DentCraft Blog`
- Team: `[Doctor Name] - [Specialization] | DentCraft Satu Mare`

### English
- Homepage: `Dentist Satu Mare | DentCraft Dental Clinic`
- Service: `[Service Name] Satu Mare | DentCraft`
- Blog: `[Post Title] | DentCraft Blog`

### Hungarian
- Homepage: `Fogorvos Szatmarnemeti | DentCraft Fogaszati Klinika`
- Service: `[Service Name] Szatmarnemeti | DentCraft`

---

## Crawl Budget Notes

The site is small (under 100 pages even with all 3 locales). Crawl budget is not a concern. Focus on:
- Keeping sitemap accurate and up-to-date
- Not blocking CSS/JS in robots.txt
- Ensuring no infinite URL loops from locale switching
- Studio and API routes properly blocked
