# Specificatii Tehnice - Dentcraft.ro

## Tech Stack

| Componenta | Tehnologie | Versiune | Justificare |
|------------|------------|----------|-------------|
| Framework | Next.js | 14+ (App Router) | SSR, SSG, performance excelenta |
| Limbaj | TypeScript | 5.x | Type safety, developer experience |
| Styling | Tailwind CSS | 3.x | Development rapid, consistenta |
| CMS | Sanity.io | v3 | Real-time, flexibil, hosted gratuit |
| Hosting | Vercel | Latest | Edge network, CI/CD nativ |
| Internationalization | next-intl | Latest | i18n robust pentru Next.js |
| Animatii | Framer Motion | Latest | Animatii smooth, performante |
| Forms | React Hook Form + Zod | Latest | Validare, performanta |
| Email | Resend | Latest | Email transactional |
| Analytics | GA4 + Vercel Analytics | Latest | Tracking complet |
| Maps | Google Maps API | Latest | Localizare clinica |
| Icons | Lucide Icons | Latest | Line icons, stroke 1.5-2px |

---

## Structura Proiect Next.js

```
dentcraft/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Layout principal per limba
│   │   ├── page.tsx                # Homepage
│   │   ├── echipa/
│   │   │   ├── page.tsx            # Lista echipa
│   │   │   └── [slug]/page.tsx     # Profil individual
│   │   ├── servicii/
│   │   │   ├── page.tsx            # Lista servicii
│   │   │   └── [slug]/page.tsx     # Pagina serviciu
│   │   ├── contact/page.tsx
│   │   ├── galerie/page.tsx
│   │   ├── testimoniale/page.tsx
│   │   ├── preturi/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx            # Lista articole
│   │   │   └── [slug]/page.tsx     # Articol individual
│   │   ├── faq/page.tsx
│   │   └── [...legal]/page.tsx     # Pagini legale (catch-all)
│   ├── api/
│   │   ├── contact/route.ts        # Form submission
│   │   ├── upload/route.ts         # Upload radiografie
│   │   └── newsletter/route.ts     # Newsletter signup
│   └── globals.css
├── components/
│   ├── ui/                         # Design system components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── language-switcher.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── testimonials.tsx
│   │   ├── team-preview.tsx
│   │   └── cta-section.tsx
│   ├── features/
│   │   ├── price-calculator.tsx
│   │   ├── before-after-gallery.tsx
│   │   ├── treatment-timeline.tsx
│   │   ├── whatsapp-button.tsx
│   │   └── cookie-consent.tsx
│   └── forms/
│       ├── contact-form.tsx
│       ├── consultation-form.tsx
│       └── newsletter-form.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts               # Sanity client config
│   │   ├── queries.ts              # GROQ queries
│   │   └── image.ts                # Image URL builder
│   ├── utils/
│   │   ├── cn.ts                   # className utility
│   │   └── format.ts               # Formatters
│   └── hooks/
│       ├── use-scroll.ts
│       └── use-media-query.ts
├── messages/                        # Traduceri i18n
│   ├── ro.json
│   ├── en.json
│   └── hu.json
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon/
├── sanity/
│   ├── schemas/
│   │   ├── team.ts
│   │   ├── service.ts
│   │   ├── testimonial.ts
│   │   ├── gallery.ts
│   │   ├── blog.ts
│   │   ├── faq.ts
│   │   ├── price.ts
│   │   └── settings.ts
│   └── lib/
│       └── sanity.config.ts
├── styles/
│   └── globals.css
├── types/
│   ├── sanity.ts
│   └── index.ts
├── middleware.ts                    # i18n routing middleware
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Conventii de Cod

### Naming Conventions

| Tip | Conventie | Exemplu |
|-----|-----------|---------|
| Componente | PascalCase | `HeroSection.tsx`, `PriceCalculator.tsx` |
| Fisiere (non-componente) | kebab-case | `use-scroll.ts`, `format-date.ts` |
| Functii | camelCase | `formatPrice()`, `getTeamMembers()` |
| Constante | SCREAMING_SNAKE_CASE | `API_URL`, `MAX_FILE_SIZE` |
| Tipuri/Interfaces | PascalCase | `TeamMember`, `ServiceProps` |
| CSS Classes | kebab-case (Tailwind) | `text-primary`, `bg-background` |

### Formatting (Prettier + ESLint)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Structura Componente

```tsx
// 1. Imports
import { useState } from 'react'
import { cn } from '@/lib/utils'

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

// 3. Component
export function Button({ variant = 'primary', children }: ButtonProps) {
  // hooks
  const [isHovered, setIsHovered] = useState(false)

  // handlers
  const handleClick = () => {
    // ...
  }

  // render
  return (
    <button
      className={cn(
        'px-6 py-3 rounded-xl font-medium transition-all',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-accent text-primary'
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
```

---

## Environment Variables

### Development (`.env.local`)

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@dentcraft.ro
EMAIL_TO=dentcraftsm@gmail.com

# Google
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_maps_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=40741199977
```

### Production (Vercel Environment Variables)

```bash
# Toate variabilele de mai sus PLUS:
NEXT_PUBLIC_SITE_URL=https://dentcraft.ro
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

---

## Third-Party Services

### Sanity.io (CMS)

| Configurare | Valoare |
|-------------|---------|
| Plan | Free (Starter) |
| Dataset | production |
| API Version | 2024-01-01 |
| CORS Origins | localhost:3000, dentcraft.ro |

**Content Types:**
- Team Members (echipa)
- Services (servicii)
- Testimonials (testimoniale)
- Gallery Cases (galerie before/after)
- Blog Posts (articole)
- FAQ Items (intrebari frecvente)
- Prices (preturi)
- Settings (configurari generale)

### Vercel (Hosting)

| Configurare | Valoare |
|-------------|---------|
| Framework | Next.js |
| Node Version | 20.x |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

**Features folosite:**
- Edge Functions (middleware i18n)
- Analytics
- Web Vitals
- Automatic HTTPS
- Preview Deployments

### Resend (Email)

| Configurare | Valoare |
|-------------|---------|
| Plan | Free (100 emails/day) |
| Domain | dentcraft.ro |
| Templates | Contact form, Consultation request |

### Google Services

| Serviciu | Scop | Setup |
|----------|------|-------|
| Analytics 4 | Tracking trafic | Property ID in env |
| Maps API | Embed harta clinica | API Key restricted |
| Search Console | SEO monitoring | Verify ownership |
| Tag Manager | Script management | Optional |

---

## Performance Requirements

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| Lighthouse Performance | > 90 | Chrome DevTools |
| Lighthouse Accessibility | > 95 | Chrome DevTools |
| Lighthouse SEO | > 95 | Chrome DevTools |
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals |
| FID (First Input Delay) | < 100ms | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| TTFB (Time to First Byte) | < 200ms | WebPageTest |
| Bundle Size (Initial JS) | < 150KB | Webpack Bundle Analyzer |

### Optimizari Implementate

- **Images:** Next/Image cu WebP/AVIF, lazy loading
- **Fonts:** next/font cu preload, subset latin
- **CSS:** Tailwind purge, critical CSS inline
- **JS:** Code splitting per pagina, dynamic imports
- **Caching:** ISR pentru pagini statice, SWR pentru date
- **CDN:** Vercel Edge Network

---

## Securitate

| Aspect | Implementare |
|--------|--------------|
| HTTPS | Vercel default, redirect HTTP |
| Headers | CSP, X-Frame-Options, X-Content-Type-Options |
| CSRF | Verificare origin pentru API routes |
| Rate Limiting | Vercel Edge, 10 req/min pentru forms |
| Uploads | Validare tip + size, max 10MB |
| Sanitizare | DOMPurify pentru user input |
| Auth CMS | Sanity auth cu role-based access |

### Security Headers (next.config.js)

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

---

## URL Structure - Multilingv

| Limba | URL Pattern | Exemplu |
|-------|-------------|---------|
| Romana (default) | `/[page]` | `/servicii`, `/contact` |
| Engleza | `/en/[page]` | `/en/services`, `/en/contact` |
| Maghiara | `/hu/[page]` | `/hu/szolgaltatasok`, `/hu/kapcsolat` |

### Hreflang Implementation

```html
<link rel="alternate" hreflang="ro" href="https://dentcraft.ro/servicii" />
<link rel="alternate" hreflang="en" href="https://dentcraft.ro/en/services" />
<link rel="alternate" hreflang="hu" href="https://dentcraft.ro/hu/szolgaltatasok" />
<link rel="alternate" hreflang="x-default" href="https://dentcraft.ro/servicii" />
```

---

## Development Workflow

### Git Branches

```
main          # Productie (protected)
├── develop   # Development (staging)
├── feature/* # Features noi
├── fix/*     # Bug fixes
└── hotfix/*  # Urgente productie
```

### Commit Convention

```
feat: add price calculator component
fix: resolve mobile navigation issue
docs: update README
style: format code
refactor: extract form validation
test: add unit tests for utils
chore: update dependencies
```

### Deployment Flow

```
feature/* → develop → main
              ↓         ↓
           Preview   Production
           (Vercel)   (Vercel)
```

---

*Document Version: 1.0*
*Ultima actualizare: 14 Ianuarie 2026*
