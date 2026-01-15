# Dentcraft.ro - Plan de Implementare

## Sumar Proiect

| Element | Detalii |
|---------|---------|
| **Client** | Dentcraft - Clinică Stomatologică |
| **Buget** | €3,000 |
| **Timeline** | 4-6 săptămâni |
| **Tech Stack** | Next.js 14+, TypeScript, Tailwind CSS, Sanity CMS, Vercel |
| **Limbi** | Română, Engleză, Maghiară |

---

## 1. Structura Folderelor Proiect

```
dentcraft/
├── src/
│   ├── app/
│   │   ├── [locale]/                    # Routing multilingv
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── echipa/
│   │   │   │   ├── page.tsx             # Lista echipă
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Profil individual
│   │   │   ├── servicii/
│   │   │   │   ├── page.tsx             # Lista servicii (opțional)
│   │   │   │   ├── implant-dentar/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── fatete-dentare/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── albire-dentara/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── ortodontie/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── chirurgie-orala/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── endodontie/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── parodontologie/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── stomatologie-pediatrica/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── estetica-dentara/
│   │   │   │       └── page.tsx
│   │   │   ├── galerie/
│   │   │   │   └── page.tsx             # Before/After Gallery
│   │   │   ├── testimoniale/
│   │   │   │   └── page.tsx
│   │   │   ├── preturi/
│   │   │   │   └── page.tsx             # Prețuri + Calculator
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Articol individual
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── politica-confidentialitate/
│   │   │   │   └── page.tsx
│   │   │   ├── politica-cookies/
│   │   │   │   └── page.tsx
│   │   │   └── termeni-conditii/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts             # Contact form handler
│   │   │   ├── upload/
│   │   │   │   └── route.ts             # Radiografie upload
│   │   │   └── revalidate/
│   │   │       └── route.ts             # Sanity webhook revalidation
│   │   ├── globals.css
│   │   └── layout.tsx                   # Root layout
│   │
│   ├── components/
│   │   ├── ui/                          # Componente UI reutilizabile
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── Badge.tsx
│   │   │
│   │   ├── layout/                      # Componente layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── sections/                    # Secțiuni homepage & pagini
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── TeamPreview.tsx
│   │   │   ├── TestimonialsCarousel.tsx
│   │   │   ├── BeforeAfterPreview.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   └── GoogleReviews.tsx
│   │   │
│   │   ├── features/                    # Componente funcționale
│   │   │   ├── PriceCalculator/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── CalculatorForm.tsx
│   │   │   │   ├── ResultsDisplay.tsx
│   │   │   │   └── types.ts
│   │   │   ├── BeforeAfterGallery/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── GalleryFilter.tsx
│   │   │   │   ├── ComparisonSlider.tsx
│   │   │   │   └── GalleryModal.tsx
│   │   │   ├── ContactForm/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── FormFields.tsx
│   │   │   │   └── FileUpload.tsx
│   │   │   ├── VideoTestimonial/
│   │   │   │   ├── index.tsx
│   │   │   │   └── VideoPlayer.tsx
│   │   │   ├── CookieConsent/
│   │   │   │   └── index.tsx
│   │   │   └── WhatsAppButton/
│   │   │       └── index.tsx
│   │   │
│   │   ├── blog/                        # Componente blog
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogList.tsx
│   │   │   ├── BlogContent.tsx
│   │   │   └── BlogSidebar.tsx
│   │   │
│   │   └── shared/                      # Componente partajate
│   │       ├── SEO.tsx
│   │       ├── Breadcrumb.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── Image.tsx
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts                # Sanity client config
│   │   │   ├── queries.ts               # GROQ queries
│   │   │   ├── image.ts                 # Image URL builder
│   │   │   └── portable-text.tsx        # Portable text components
│   │   ├── utils/
│   │   │   ├── cn.ts                    # classNames utility
│   │   │   ├── formatters.ts            # Date, price formatters
│   │   │   └── validators.ts            # Form validation
│   │   └── constants.ts                 # App constants
│   │
│   ├── hooks/
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollDirection.ts
│   │   └── useLockBodyScroll.ts
│   │
│   ├── i18n/
│   │   ├── config.ts                    # next-intl config
│   │   ├── request.ts                   # Request config
│   │   └── routing.ts                   # Routing config
│   │
│   ├── messages/                        # Traduceri
│   │   ├── ro.json
│   │   ├── en.json
│   │   └── hu.json
│   │
│   └── types/
│       ├── index.ts
│       ├── sanity.ts                    # Sanity types (generated)
│       └── forms.ts
│
├── sanity/                              # Sanity Studio
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── documents/
│   │   │   ├── page.ts
│   │   │   ├── service.ts
│   │   │   ├── teamMember.ts
│   │   │   ├── testimonial.ts
│   │   │   ├── beforeAfter.ts
│   │   │   ├── blogPost.ts
│   │   │   ├── faq.ts
│   │   │   ├── price.ts
│   │   │   └── settings.ts
│   │   └── objects/
│   │       ├── seo.ts
│   │       ├── portableText.ts
│   │       ├── localizedString.ts
│   │       └── socialLinks.ts
│   ├── lib/
│   │   └── desk.ts                      # Desk structure
│   ├── sanity.config.ts
│   └── sanity.cli.ts
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   └── og-image.jpg
│   ├── fonts/
│   └── icons/
│
├── .env.local                           # Environment variables
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Plan de Implementare pe Săptămâni

### Săptămâna 1: Setup & Fundație ✅

#### Ziua 1-2: Setup Proiect ✅
- [x] Inițializare proiect Next.js 15 cu TypeScript + Turbopack
- [x] Configurare Tailwind CSS v4 cu design tokens (@theme)
- [x] Setup ESLint
- [ ] Configurare Git repository
- [ ] Setup Vercel project + environment variables
- [ ] Inițializare Sanity Studio

#### Ziua 3: Configurare Multilingv ✅
- [x] Instalare și configurare next-intl v4
- [x] Setup routing multilingv `[locale]` (RO fără prefix, EN/HU cu prefix)
- [x] Creare fișiere traduceri (ro.json, en.json, hu.json)
- [x] Implementare Language Switcher component (dropdown cu flags)
- [x] Testare routing între limbi

#### Ziua 4: Layout & Componente UI de Bază ✅
- [x] Implementare Header (glass-morphism on scroll, nav, CTA)
- [x] Implementare Footer (dark bg, social icons, contact, legal)
- [x] Creare componente UI: Button, Card, Container, Badge
- [x] Setup typography scale în Tailwind
- [x] Implementare mobile menu (hamburger + drawer)
- [x] Adăugare lucide-react pentru icons

#### Ziua 5: Sanity CMS Schema 🔲
- [ ] Definire toate schema-urile (vezi secțiunea 6)
- [ ] Configurare Sanity desk structure
- [ ] Setup image optimization cu Sanity
- [ ] Creare GROQ queries de bază
- [ ] Testare conexiune Next.js ↔ Sanity

---

### Săptămâna 2: Pagini Core 🟡

#### Ziua 6-7: Homepage ✅
- [x] Hero section cu CTA (badge, headline, 2 buttons)
- [x] Trust indicators bar (15+ ani, 5000+ pacienți, 4.9 rating, 100% garanție)
- [x] Secțiune servicii preview (grid 6 servicii cu Lucide icons)
- [x] Secțiune De ce Dentcraft (4 USP-uri cu icons)
- [ ] Secțiune echipă preview (needs content)
- [ ] Before/After preview (needs images)
- [x] Secțiune testimoniale (3 testimoniale cu star ratings)
- [x] CTA section final (White Card Float design)
- [ ] Integrare content din Sanity (pending CMS setup)

#### Ziua 8: Pagina Echipă
- [ ] Lista echipă (grid responsive)
- [ ] Card component pentru membru echipă
- [ ] Template pagină individuală medic
- [ ] Secțiune specializări, educație, certificări
- [ ] Galerie cazuri per medic (opțional)

#### Ziua 9-10: Paginile de Servicii
- [ ] Template serviciu reutilizabil
- [ ] Secțiuni: descriere, beneficii, proces, prețuri
- [ ] Before/After specific serviciului
- [ ] FAQ specific serviciului
- [ ] CTA programare
- [ ] Implementare toate 9 paginile servicii

---

### Săptămâna 3: Funcționalități Cheie

#### Ziua 11: Galerie Before/After
- [ ] Layout galerie cu grid
- [ ] Filtru pe categorii (servicii)
- [ ] Comparison slider component
- [ ] Modal pentru vizualizare full
- [ ] Lazy loading imagini

#### Ziua 12: Testimoniale
- [ ] Grid/list testimoniale
- [ ] Video player component
- [ ] Embed Google Reviews
- [ ] Carousel pentru homepage

#### Ziua 13-14: Calculator Preț
- [ ] UI calculator (multi-step sau single page)
- [ ] Logică calcul pe baza serviciilor selectate
- [ ] Afișare estimare (range min-max)
- [ ] Disclaimer juridic
- [ ] Export PDF estimare (opțional)
- [ ] CTA pentru consultație gratuită

#### Ziua 15: Pagina Contact
- [ ] Formular contact (cu validare)
- [ ] Hartă Google Maps embed
- [ ] Informații contact (adresă, telefon, email)
- [ ] Program lucru
- [ ] Upload radiografie pentru consultație online
- [ ] Integrare email (Resend/SendGrid)

---

### Săptămâna 4: Blog & Finisări

#### Ziua 16-17: Blog
- [ ] Listing blog cu paginare
- [ ] Card articol blog
- [ ] Template articol individual
- [ ] Portable Text rendering (inclusiv video)
- [ ] Sidebar (categorii, articole recente)
- [ ] Social share buttons

#### Ziua 18: Pagini Legale & FAQ
- [ ] Template pagină legal
- [ ] Politică Confidențialitate
- [ ] Politică Cookies
- [ ] Termeni și Condiții
- [ ] Pagina FAQ cu accordion

#### Ziua 19: Funcționalități Finale
- [ ] Cookie consent banner GDPR
- [ ] WhatsApp floating button
- [ ] Scroll to top button
- [ ] Loading states
- [ ] Error pages (404, 500)

#### Ziua 20: Polish & Responsive
- [ ] Review complet responsive (mobile, tablet, desktop)
- [ ] Fix-uri CSS/layout
- [ ] Animații și tranziții
- [ ] Micro-interacțiuni

---

### Săptămâna 5: Optimizare & Testing

#### Ziua 21-22: Performance
- [ ] Image optimization (next/image, Sanity)
- [ ] Lazy loading pentru toate componentele mari
- [ ] Bundle analysis și optimizare
- [ ] Core Web Vitals audit
- [ ] Font optimization

#### Ziua 23: SEO
- [ ] Meta tags pentru toate paginile
- [ ] Open Graph images
- [ ] Schema.org markup (LocalBusiness, MedicalBusiness)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Hreflang pentru multilingv

#### Ziua 24: Testing
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Testing pe dispozitive reale
- [ ] Form submission testing
- [ ] Email delivery testing
- [ ] Link checking

#### Ziua 25: Security & Accessibility
- [ ] Security headers review
- [ ] HTTPS verificare
- [ ] Accessibility audit (WCAG)
- [ ] Keyboard navigation
- [ ] Screen reader testing

---

### Săptămâna 6: Lansare & Handover

#### Ziua 26-27: Content Population
- [ ] Import content final în Sanity
- [ ] Verificare traduceri (RO/EN/HU)
- [ ] Verificare imagini optimizate
- [ ] Verificare toate link-urile

#### Ziua 28: Pre-Launch
- [ ] Final QA pass
- [ ] Setup analytics (Google Analytics 4, Hotjar)
- [ ] Setup Google Search Console
- [ ] Backup plan verificat

#### Ziua 29: Lansare
- [ ] DNS switch la Vercel
- [ ] SSL certificate verification
- [ ] Smoke testing post-launch
- [ ] Monitoring setup

#### Ziua 30: Post-Launch & Handover
- [ ] Client training Sanity CMS
- [ ] Documentație utilizare
- [ ] Handover credențiale
- [ ] Support plan activat

---

## 3. Ordinea de Implementare & Dependințe

```
┌─────────────────────────────────────────────────────────────────┐
│                    FAZA 1: FUNDAȚIE                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐     │
│  │ Next.js  │ → │ Tailwind │ → │next-intl │ → │ Sanity   │     │
│  │  Setup   │   │  Setup   │   │  Setup   │   │  Setup   │     │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FAZA 2: LAYOUT                               │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   Header     │ → │    Footer    │ → │  UI Library  │        │
│  │  + Nav       │   │              │   │  (Button,    │        │
│  │  + Mobile    │   │              │   │   Card, etc) │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FAZA 3: PAGINI CORE                          │
│                                                                  │
│  ┌──────────┐                                                    │
│  │ Homepage │ ← Depinde de: toate secțiunile de mai jos         │
│  └──────────┘                                                    │
│       ↑                                                          │
│  ┌────┴────┬────────────┬────────────┬────────────┐             │
│  │         │            │            │            │             │
│  ▼         ▼            ▼            ▼            ▼             │
│ ┌────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐         │
│ │Team│  │Services│  │Testim. │  │B/After │  │Contact │         │
│ └────┘  └────────┘  └────────┘  └────────┘  └────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FAZA 4: FUNCȚIONALITĂȚI                      │
│                                                                  │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐  │
│  │   Calculator   │   │    Galerie     │   │     Blog       │  │
│  │     Preț       │   │  Before/After  │   │                │  │
│  └────────────────┘   └────────────────┘   └────────────────┘  │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                ↓                                 │
│                    ┌────────────────────┐                       │
│                    │  Cookie Consent    │                       │
│                    │  WhatsApp Button   │                       │
│                    │  Upload Files      │                       │
│                    └────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FAZA 5: POLISH                               │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐     │
│  │   SEO    │   │  Perf.   │   │ Testing  │   │ Content  │     │
│  │          │   │          │   │          │   │ Final    │     │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Dependințe Critice:

1. **next-intl** trebuie configurat înainte de orice pagină
2. **Sanity schemas** trebuie definite înainte de a crea queries
3. **Header/Footer** trebuie gata înainte de pagini
4. **UI components** (Button, Card) trebuie gata înainte de secțiuni
5. **Homepage** se finalizează după ce toate secțiunile preview sunt gata
6. **Cookie Consent** trebuie implementat înainte de Google Analytics

---

## 4. Checklist Pre-Development

### Setup Tehnic
- [ ] Node.js v18+ instalat
- [ ] pnpm/npm/yarn configurat
- [ ] Git instalat și configurat
- [ ] VS Code cu extensii recomandate:
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Tailwind CSS IntelliSense
  - [ ] TypeScript
  - [ ] Sanity.io

### Conturi & Servicii
- [ ] **Vercel** - cont creat, proiect inițializat
- [ ] **Sanity** - cont creat, proiect configurat
  - [ ] Plan ales (Free tier suficient pentru început)
  - [ ] Dataset creat (production)
  - [ ] API tokens generate
- [ ] **GitHub/GitLab** - repository creat
- [ ] **Domain** - dentcraft.ro achiziționat și acces DNS
- [ ] **Email service** (Resend/SendGrid) - cont creat pentru form submissions
- [ ] **Google Cloud** - pentru Maps API key
- [ ] **Google Analytics** - GA4 property creat
- [ ] **Cloudinary** (opțional) - pentru video hosting

### Environment Variables Necesare
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=https://dentcraft.ro

# Email
RESEND_API_KEY=

# Google
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

### Assets de Pregătit
- [ ] Logo în format SVG (culoare și alb)
- [ ] Favicon set complet
- [ ] Open Graph image default (1200x630)
- [ ] Placeholder images pentru dezvoltare

---

## 5. Checklist Design

### De la Designer/Client - OBLIGATORIU

#### Branding
- [ ] Logo vectorial (SVG) - versiune principală
- [ ] Logo vectorial - versiune inversată (pentru fundal închis)
- [ ] Logo vectorial - versiune simplificată (pentru favicon)
- [ ] Ghid culori confirmat:
  - Primary: `#1A1A1A` (negru)
  - Background: `#F5F0E8` (bej)
  - Surface: `#FFFFFF` (alb)
  - Accent: `#D4C4B0` (bej accent)
  - Text secondary: `#6B6B6B` (gri)
- [ ] Fonturi alese (sau confirmare utilizare system fonts)

#### Imagini Obligatorii
- [ ] Hero image homepage (minim 1920x1080, preferabil video loop)
- [ ] Fotografii echipă medicală (toate persoanele)
  - [ ] Portrait profesional fiecare medic (800x1000)
  - [ ] Foto informal/lifestyle (opțional)
- [ ] Fotografii clinică interior (minim 5-10)
- [ ] Fotografii echipamente
- [ ] Before/After cazuri (minim 10-15 seturi cu acord pacient)
- [ ] Video testimoniale pacienți (minim 3-5)

#### Content
- [ ] Texte aprobate pentru toate serviciile
- [ ] Biografie fiecare medic
- [ ] Lista prețuri actualizată
- [ ] FAQ responses
- [ ] Texte legale (GDPR, Cookies, T&C)

### De la Designer - NICE TO HAVE

- [ ] Design complet în Figma/Sketch
- [ ] Componente UI specificate
- [ ] Animații/tranziții dorite
- [ ] Iconset personalizat
- [ ] Ilustrații custom

### Fără Design Complet - Soluții

Dacă nu există design complet, folosim:
- **Referințe**: Dentakay.com, Apple.com
- **UI Kit**: Shadcn/ui adaptat
- **Icons**: Lucide React sau Heroicons
- **Images placeholder**: Unsplash (dental/medical)

---

## 6. Schema CMS Sanity

### Document Types

#### 1. Settings (Singleton)
```typescript
// sanity/schemas/documents/settings.ts
{
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      type: 'localizedString'
    },
    {
      name: 'logo',
      type: 'image'
    },
    {
      name: 'contact',
      type: 'object',
      fields: [
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'whatsapp', type: 'string' },
        { name: 'address', type: 'localizedString' }
      ]
    },
    {
      name: 'workingHours',
      type: 'array',
      of: [{ type: 'workingHoursDay' }]
    },
    {
      name: 'social',
      type: 'socialLinks'
    },
    {
      name: 'googleMapsEmbed',
      type: 'url'
    }
  ]
}
```

#### 2. Service
```typescript
// sanity/schemas/documents/service.ts
{
  name: 'service',
  title: 'Servicii',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localizedString',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title.ro' }
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Lucide icon name'
    },
    {
      name: 'shortDescription',
      type: 'localizedString'
    },
    {
      name: 'description',
      type: 'localizedPortableText'
    },
    {
      name: 'benefits',
      type: 'array',
      of: [{ type: 'localizedString' }]
    },
    {
      name: 'process',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', type: 'number' },
          { name: 'title', type: 'localizedString' },
          { name: 'description', type: 'localizedString' }
        ]
      }]
    },
    {
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'priceRange',
      type: 'object',
      fields: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'currency', type: 'string', initialValue: 'RON' }
      ]
    },
    {
      name: 'faqs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }]
    },
    {
      name: 'relatedCases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'beforeAfter' }] }]
    },
    {
      name: 'seo',
      type: 'seo'
    },
    {
      name: 'order',
      type: 'number',
      description: 'Display order'
    }
  ]
}
```

#### 3. Team Member
```typescript
// sanity/schemas/documents/teamMember.ts
{
  name: 'teamMember',
  title: 'Echipa',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'role',
      type: 'localizedString'
    },
    {
      name: 'specializations',
      type: 'array',
      of: [{ type: 'localizedString' }]
    },
    {
      name: 'photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'bio',
      type: 'localizedPortableText'
    },
    {
      name: 'education',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'institution', type: 'string' },
          { name: 'degree', type: 'localizedString' },
          { name: 'year', type: 'number' }
        ]
      }]
    },
    {
      name: 'certifications',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }]
    },
    {
      name: 'order',
      type: 'number'
    },
    {
      name: 'seo',
      type: 'seo'
    }
  ]
}
```

#### 4. Before/After
```typescript
// sanity/schemas/documents/beforeAfter.ts
{
  name: 'beforeAfter',
  title: 'Before/After',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localizedString'
    },
    {
      name: 'service',
      type: 'reference',
      to: [{ type: 'service' }]
    },
    {
      name: 'doctor',
      type: 'reference',
      to: [{ type: 'teamMember' }]
    },
    {
      name: 'beforeImage',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'afterImage',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'localizedText'
    },
    {
      name: 'treatmentDuration',
      type: 'string'
    },
    {
      name: 'featured',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

#### 5. Testimonial
```typescript
// sanity/schemas/documents/testimonial.ts
{
  name: 'testimonial',
  title: 'Testimoniale',
  type: 'document',
  fields: [
    {
      name: 'patientName',
      type: 'string'
    },
    {
      name: 'patientPhoto',
      type: 'image'
    },
    {
      name: 'rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'text',
      type: 'localizedText'
    },
    {
      name: 'videoUrl',
      type: 'url',
      description: 'YouTube or Vimeo URL'
    },
    {
      name: 'videoFile',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'service',
      type: 'reference',
      to: [{ type: 'service' }]
    },
    {
      name: 'doctor',
      type: 'reference',
      to: [{ type: 'teamMember' }]
    },
    {
      name: 'featured',
      type: 'boolean'
    },
    {
      name: 'date',
      type: 'date'
    }
  ]
}
```

#### 6. Blog Post
```typescript
// sanity/schemas/documents/blogPost.ts
{
  name: 'blogPost',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localizedString',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title.ro' }
    },
    {
      name: 'excerpt',
      type: 'localizedText'
    },
    {
      name: 'content',
      type: 'localizedPortableText'
    },
    {
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'blogCategory' }]
    },
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'teamMember' }]
    },
    {
      name: 'publishedAt',
      type: 'datetime'
    },
    {
      name: 'featured',
      type: 'boolean'
    },
    {
      name: 'seo',
      type: 'seo'
    }
  ]
}
```

#### 7. Blog Category
```typescript
// sanity/schemas/documents/blogCategory.ts
{
  name: 'blogCategory',
  title: 'Categorii Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localizedString'
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title.ro' }
    }
  ]
}
```

#### 8. FAQ
```typescript
// sanity/schemas/documents/faq.ts
{
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      type: 'localizedString'
    },
    {
      name: 'answer',
      type: 'localizedPortableText'
    },
    {
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Prețuri', value: 'pricing' },
          { title: 'Tratamente', value: 'treatments' },
          { title: 'Programări', value: 'appointments' }
        ]
      }
    },
    {
      name: 'services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }]
    },
    {
      name: 'order',
      type: 'number'
    }
  ]
}
```

#### 9. Price Item
```typescript
// sanity/schemas/documents/price.ts
{
  name: 'price',
  title: 'Prețuri',
  type: 'document',
  fields: [
    {
      name: 'service',
      type: 'reference',
      to: [{ type: 'service' }]
    },
    {
      name: 'name',
      type: 'localizedString'
    },
    {
      name: 'description',
      type: 'localizedString'
    },
    {
      name: 'priceMin',
      type: 'number'
    },
    {
      name: 'priceMax',
      type: 'number'
    },
    {
      name: 'unit',
      type: 'string',
      description: 'e.g., per tooth, per session'
    },
    {
      name: 'isPromotion',
      type: 'boolean'
    },
    {
      name: 'promotionPrice',
      type: 'number'
    },
    {
      name: 'includesInCalculator',
      type: 'boolean',
      initialValue: true
    }
  ]
}
```

#### 10. Legal Page
```typescript
// sanity/schemas/documents/legalPage.ts
{
  name: 'legalPage',
  title: 'Pagini Legale',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localizedString'
    },
    {
      name: 'slug',
      type: 'slug'
    },
    {
      name: 'content',
      type: 'localizedPortableText'
    },
    {
      name: 'lastUpdated',
      type: 'date'
    }
  ]
}
```

### Object Types

#### Localized String
```typescript
// sanity/schemas/objects/localizedString.ts
{
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'ro', type: 'string', title: 'Română' },
    { name: 'en', type: 'string', title: 'English' },
    { name: 'hu', type: 'string', title: 'Magyar' }
  ]
}
```

#### Localized Text
```typescript
// sanity/schemas/objects/localizedText.ts
{
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    { name: 'ro', type: 'text', title: 'Română' },
    { name: 'en', type: 'text', title: 'English' },
    { name: 'hu', type: 'text', title: 'Magyar' }
  ]
}
```

#### Localized Portable Text
```typescript
// sanity/schemas/objects/localizedPortableText.ts
{
  name: 'localizedPortableText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    { name: 'ro', type: 'portableText', title: 'Română' },
    { name: 'en', type: 'portableText', title: 'English' },
    { name: 'hu', type: 'portableText', title: 'Magyar' }
  ]
}
```

#### Portable Text
```typescript
// sanity/schemas/objects/portableText.ts
{
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            fields: [{ name: 'href', type: 'url' }]
          }
        ]
      }
    },
    { type: 'image' },
    {
      type: 'object',
      name: 'videoEmbed',
      fields: [
        { name: 'url', type: 'url', title: 'Video URL' }
      ]
    }
  ]
}
```

#### SEO
```typescript
// sanity/schemas/objects/seo.ts
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      type: 'localizedString'
    },
    {
      name: 'metaDescription',
      type: 'localizedText'
    },
    {
      name: 'ogImage',
      type: 'image'
    },
    {
      name: 'noIndex',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

---

## 7. Checklist Lansare

### O Săptămână Înainte

#### Content
- [ ] Tot conținutul este în Sanity și verificat
- [ ] Toate traducerile sunt complete (RO/EN/HU)
- [ ] Imaginile sunt optimizate și încărcate
- [ ] Toate linkurile interne funcționează
- [ ] Informațiile de contact sunt corecte
- [ ] Prețurile sunt actualizate

#### Tehnic
- [ ] Build production funcționează fără erori
- [ ] Toate variabilele de environment sunt setate pe Vercel
- [ ] Domain-ul este configurat în Vercel
- [ ] SSL certificat activ
- [ ] Redirect www → non-www (sau invers)
- [ ] Webhook Sanity → Vercel configurat pentru revalidare

### Cu 3 Zile Înainte

#### Testing Final
- [ ] Cross-browser testing completat
  - [ ] Chrome (desktop + mobile)
  - [ ] Safari (desktop + iOS)
  - [ ] Firefox
  - [ ] Edge
- [ ] Responsive testing pe dispozitive reale
- [ ] Forms funcționează și trimit email-uri
- [ ] Upload fișiere funcționează
- [ ] Google Maps se încarcă corect
- [ ] Calculator prețuri funcționează corect

#### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)
- [ ] Core Web Vitals în verde:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

#### SEO
- [ ] Toate paginile au meta title unic
- [ ] Toate paginile au meta description
- [ ] Open Graph tags prezente
- [ ] Schema.org markup validat
- [ ] Sitemap.xml generat și accesibil
- [ ] Robots.txt configurat corect
- [ ] Hreflang tags pentru toate limbile
- [ ] Canonical URLs corecte

### În Ziua Lansării

#### Pre-Switch DNS
- [ ] Backup plan documentat
- [ ] Echipa informată și disponibilă
- [ ] Clientul este informat

#### Switch DNS
- [ ] DNS records actualizate
- [ ] Propagare DNS verificată (whatsmydns.net)
- [ ] HTTPS funcționează
- [ ] Toate subdomain-urile redirecționează corect

#### Post-Switch
- [ ] Smoke test pe live:
  - [ ] Homepage se încarcă
  - [ ] Navigația funcționează
  - [ ] Formulare funcționează
  - [ ] Imagini se încarcă
  - [ ] Multilingv funcționează
- [ ] Google Analytics verificat că primește date
- [ ] Google Search Console - submit sitemap
- [ ] Cookie consent apare corect

### Prima Săptămână Post-Lansare

#### Monitorizare
- [ ] Check zilnic analytics pentru erori
- [ ] Monitorizare uptime (Vercel status / UptimeRobot)
- [ ] Verificare formular contact funcționează
- [ ] Review feedback utilizatori

#### SEO
- [ ] Verificare indexare Google (site:dentcraft.ro)
- [ ] Submit la Google My Business
- [ ] Verificare rich snippets în search results

#### Handover Client
- [ ] Training Sanity CMS - sesiune video/live
- [ ] Documentație scrisă pentru editare content
- [ ] Credențiale transferate securizat
- [ ] Contract mentenanță semnat (dacă e cazul)
- [ ] Plan backup definit

---

## 8. Estimare Timp per Task

| Categorie | Task | Ore Estimate |
|-----------|------|--------------|
| **Setup** | Next.js + Tailwind + TypeScript | 2h |
| **Setup** | Sanity CMS + Schemas | 4h |
| **Setup** | next-intl multilingv | 3h |
| **Layout** | Header + Navigation + Mobile | 4h |
| **Layout** | Footer | 2h |
| **UI** | Design system (Button, Card, etc.) | 4h |
| **Pagini** | Homepage | 8h |
| **Pagini** | Echipa (list + individual) | 6h |
| **Pagini** | 9x Servicii | 12h |
| **Pagini** | Contact | 4h |
| **Pagini** | Blog (list + article) | 6h |
| **Pagini** | FAQ | 2h |
| **Pagini** | Prețuri | 3h |
| **Pagini** | Pagini legale (3x) | 2h |
| **Features** | Calculator preț | 8h |
| **Features** | Galerie Before/After | 6h |
| **Features** | Testimoniale + Video | 4h |
| **Features** | Cookie consent | 2h |
| **Features** | WhatsApp button | 1h |
| **Features** | Upload radiografie | 4h |
| **Features** | Google Reviews embed | 2h |
| **Polish** | Responsive fixes | 4h |
| **Polish** | Animații | 3h |
| **SEO** | Meta tags + Schema.org | 4h |
| **Testing** | Cross-browser + devices | 4h |
| **Launch** | Deploy + DNS + Verificări | 4h |
| **Total** | | **~102h** |

La un rate de 6h/zi productive = **17 zile lucru** = **~4 săptămâni** cu buffer pentru feedback și iterații.

---

## 9. Riscuri și Mitigări

| Risc | Probabilitate | Impact | Mitigare |
|------|---------------|--------|----------|
| Întârziere content de la client | Mare | Mare | Deadline fix pentru content cu 2 săptămâni înainte de lansare |
| Lipsa imagini profesionale | Mediu | Mare | Folosire stock photos temporar, plan backup |
| Modificări cerințe mid-project | Mediu | Mediu | Change request formal, ajustare timeline |
| Probleme traduceri HU | Mic | Mediu | Colaborare cu translator profesionist |
| Performance issues | Mic | Mare | Monitorizare continuă, optimizare proactivă |

---

## 10. Concluzii

Acest plan oferă un ghid complet pentru implementarea proiectului Dentcraft.ro. Timeline-ul de 4-6 săptămâni este realist, cu condiția să avem:

1. **Content pregătit** - texte, imagini, video de la client
2. **Feedback rapid** - răspunsuri în maxim 24h la întrebări
3. **Design clar** - referințe aprobate sau design finalizat

**Recomandări:**
- Începe cu Homepage și un serviciu ca pilot
- Validează cu clientul devreme și des
- Prioritizează mobile-first
- Automatizează cât mai mult (deploys, revalidation)

---

*Document creat: Ianuarie 2026*
*Ultima actualizare: 15 Ianuarie 2026*
