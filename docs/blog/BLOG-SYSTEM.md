# Blog System - DentCraft

## Overview

Full blog system with SEO-optimized blog posts, fallback data, structured data (JSON-LD), E-E-A-T author signals, and multilingual support (RO/EN/HU).

## Architecture

```
src/app/[locale]/blog/
├── page.tsx              # Blog listing (categories, pagination, grid)
├── [slug]/page.tsx       # Single blog post (article, author bio, related posts)
└── loading.tsx           # Skeleton loading UI

src/components/
├── blog/
│   └── ShareButton.tsx   # Web Share API / clipboard fallback
└── ui/
    └── PortableTextRenderer.tsx  # Sanity Portable Text → React

src/lib/
├── fallback-blog.ts      # Static fallback when Sanity has no data
├── schema.ts             # JSON-LD: BlogPosting, BreadcrumbList, FAQPage
├── seo.ts                # Metadata generation with article OG tags
└── sanity/queries.ts     # Blog GROQ queries with locale support

docs/blog/
├── BLOG-SYSTEM.md        # This file
├── SANITY-BLOG-POST-GUIDE.md  # How to create posts in Sanity
├── 2026-02-24-cat-costa-implant-dentar-satu-mare.md  # RO article
├── 2026-02-24-dental-implant-cost-satu-mare-EN.md    # EN article
└── 2026-02-24-fogimplantatum-ar-szatmarnemeti-HU.md  # HU article

public/images/blog/
└── implant-dentar-satu-mare-cover.png  # First article cover image
```

## Features

### Blog Listing (`/blog`)
- Dark editorial hero section with gradient overlays
- Category filter bar (dynamic from Sanity/fallback)
- 3-column grid (desktop), 2-col (tablet), 1-col (mobile)
- Pagination (10 posts/page) with category preservation
- Cover image, category badge, date, reading time, author avatar
- Skeleton loading state

### Single Blog Post (`/blog/[slug]`)
- Breadcrumb navigation (Acasa / Blog / Category)
- Hero with title, author avatar (face-cropped), date, reading time
- Full-width cover image (16:9 aspect ratio)
- Article content via PortableTextRenderer
- Excerpt displayed above content with divider
- Share button (Web Share API with clipboard fallback)
- Author bio card with photo, job title, bio, profile link
- Related posts section (2 posts from same category)

### SEO & Structured Data
- **BlogPosting schema**: title, author (name, URL, jobTitle), publisher, image, wordCount, articleSection, inLanguage
- **BreadcrumbList schema**: Home → Blog → Category → Post
- **FAQPage schema**: Auto-extracted from bold questions (ending with ?) in content
- **OpenGraph**: type=article, publishedTime, authors, section
- **Sitemap**: Blog posts with actual publishedAt dates

### E-E-A-T (Expertise, Authoritativeness, Trustworthiness)
- Author photo with face crop (object-top scaling)
- Author name linked to profile page
- Job title display (e.g., "Medic Stomatolog Principal")
- Author bio with credentials and experience
- "Vezi toate articolele" link to author page
- Word count in schema for content quality signals

### Fallback System
- `fallback-blog.ts` provides static data when Sanity CMS is empty
- Pattern: `sanityData.length > 0 ? sanityData : fallbackData`
- Includes full article content in Portable Text format (RO/EN/HU)
- Author data with external photo URL, bio, and job title
- Cover image for first article (local PNG)

### Image Handling
- Local images: detected by `url.startsWith('/') || url.startsWith('http')`
- Sanity images: processed through `urlFor()` with width/height
- Author photos: face-cropped with `object-cover object-top scale-[1.8] origin-top`
- Cover images: responsive with `sizes` attribute
- `drpetric.ro` configured in `next.config.ts` remotePatterns

## Content Workflow

1. Write article in markdown (see `docs/blog/` for format)
2. Add to Sanity CMS via Studio, OR
3. Add to `fallback-blog.ts` as static fallback
4. Cover images go in `public/images/blog/`
5. Articles support RO, EN, HU versions with same slug

## Key Decisions

- **Portable Text over MDX**: Sanity CMS native format, rich editing experience
- **Fallback pattern**: Allows blog to work without CMS data during development
- **Face-cropped photos**: External photos show full body, CSS zoom focuses on face
- **FAQ auto-extraction**: Detects bold questions in content for FAQPage schema
- **locale prop on NextIntlClientProvider**: Fixes "No intl context found" error with next-intl v4

## Related Changes

- `layout.tsx`: Added explicit `locale` prop to `NextIntlClientProvider`
- `sitemap.ts`: Blog posts now include publishedAt dates
- `schema.ts`: New `getArticleSchema()`, `getBreadcrumbSchema()`, `getFAQSchema()`
- `seo.ts`: Article-specific OG metadata support
- `messages/*.json`: New blog translation keys (ro/en/hu)
