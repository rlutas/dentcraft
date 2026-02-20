# Design Standard - Dentcraft.ro

> **Bazat pe implementarea Homepage - Actualizat 19 Februarie 2026**
> Acest document definește standardele vizuale pentru toate paginile site-ului.

---

## 1. Culori

### Brand Colors (din `globals.css`)

```css
/* Core */
--color-background: #f5f0e8;      /* Bej cald - fundal principal */
--color-foreground: #1a1a1a;      /* Negru aproape - text principal */

/* Primary */
--color-primary: #1a1a1a;         /* Butoane, text important */
--color-primary-hover: #333333;

/* Secondary */
--color-secondary: #6b6b6b;       /* Text secundar, muted */

/* Accent (Bej/Nisip) */
--color-accent: #d4c4b0;          /* Accent principal */
--color-accent-hover: #c4b4a0;
--color-accent-light: #e8ded0;    /* Fundal accent subtil */

/* Cards */
--color-card: #ffffff;
--color-border-light: #f0ebe3;
```

### Gradiente folosite

| Gradient | Cod | Utilizare |
|----------|-----|-----------|
| Hero | `linear-gradient(135deg, rgba(250,248,245,0.97) 0%, rgba(245,240,232,0.95) 30%, rgba(232,222,208,0.9) 70%, rgba(212,196,176,0.85) 100%)` | Secțiunea Hero |
| Footer | `linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)` | Footer dark |
| Icon 1 | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` | Why Us icon purple |
| Icon 2 | `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)` | Why Us icon pink |
| Icon 3 | `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)` | Why Us icon blue |
| Icon 4 | `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)` | Why Us icon green |

---

## 2. Typography

### Font
- **Familie**: Inter (via next/font)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | clamp(2.25rem, 5vw, 3.5rem) | 700 | 1.1 | -0.025em |
| H2 | clamp(1.75rem, 4vw, 2.5rem) | 600 | 1.2 | -0.02em |
| H3 | clamp(1.25rem, 3vw, 1.75rem) | 600 | 1.3 | normal |
| H4 | clamp(1.125rem, 2vw, 1.375rem) | 500 | 1.4 | normal |
| Body | 1rem (16px) | 400 | 1.6 | normal |
| Body Large | 1.125rem (18px) | 400 | 1.75 | normal |
| Body Small | 0.875rem (14px) | 400 | 1.5 | normal |
| Badge | 0.8125rem (13px) | 600 | 1 | normal |

### Navigation Header
- **Style**: UPPERCASE
- **Letter Spacing**: 0.05em
- **Weight**: 500
- **Size**: 0.875rem (14px)

---

## 3. Spacing & Layout

### Container
- **Max Width**: 1280px
- **Padding**:
  - Mobile: 1.25rem (20px)
  - Tablet (640px+): 2rem (32px)
  - Desktop (1024px+): 2.5rem (40px)

### Sections
- **Padding vertical**: `clamp(4rem, 8vw, 7rem)` (~64px → 112px)

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 10px;
--radius-lg: 12px;
--radius-xl: 14px;
--radius-2xl: 16px;
--radius-3xl: 24px;
```

### Shadows
```css
--shadow-card: 0 4px 20px rgb(0 0 0 / 0.05);
--shadow-card-hover: 0 10px 40px rgb(0 0 0 / 0.1);
--shadow-button: 0 2px 10px rgb(0 0 0 / 0.1);
--shadow-header: 0 2px 10px rgb(0 0 0 / 0.05);
```

---

## 4. Componente UI

### Butoane

**Primary Button**
```css
background: #1a1a1a;
color: #ffffff;
padding: 0.875rem 1.75rem;
border-radius: 14px;
font-weight: 600;
font-size: 0.9375rem;
/* Hover: translateY(-2px) */
```

**Secondary Button**
```css
background: #d4c4b0;
color: #1a1a1a;
/* Same sizing as primary */
```

**Large Button** (CTA)
```css
padding: 1.125rem 2.25rem;
font-size: 1.0625rem;
```

### Cards

**Standard Card**
```css
background: #ffffff;
border-radius: 16px;
padding: 1.75rem;
border: 1px solid #f0ebe3;
box-shadow: 0 4px 20px rgb(0 0 0 / 0.05);
/* Hover: translateY(-4px), shadow-card-hover */
```

**Service Card**
```css
padding: 2rem;
border-radius: 16px;
/* Hover: translateY(-6px), accent border */
```

**Team/Gallery Card (19 Feb 2026)**
```css
background: #ffffff;
border: 1px solid #e8e0d5;
border-radius: 16px; /* md:24px */
overflow: hidden;
box-shadow: 0 4px 24px -4px rgba(0,0,0,0.08);
/* Hover: */
hover-shadow: 0 20px 50px -12px rgba(139,115,85,0.2);
hover-border: #d4c4b0;
hover-translate: translateY(-6px);
transition: all 500ms ease-out;
```

### Badge
```css
padding: 0.5rem 1rem;
border-radius: 9999px; /* full round */
background: #e8ded0;
font-size: 0.8125rem;
font-weight: 600;
```

---

## 5. Pattern-uri Secțiuni

### Alternare Background-uri
Homepage folosește alternarea inteligentă:

1. **Hero** - Bej gradient
2. **Servicii** - Alb (#ffffff)
3. **De ce noi** - Bej (#f5f0e8)
4. **Echipa** - Alb (#ffffff)
5. **Google Reviews** - Bej (#f5f0e8)
6. **Before/After** - Alb (#ffffff)
7. **Footer** - Dark gradient

### Section Header Pattern

```jsx
{/* Badge */}
<ScrollReveal animation="fade-up">
  <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider uppercase
    text-[#8b7355] bg-[#faf6f1] rounded-full border border-[#e8e0d5]">
    Badge Text
  </span>
</ScrollReveal>

{/* Title */}
<ScrollReveal animation="fade-up" delay={200}>
  <h2 className="text-4xl md:text-5xl font-bold text-[#2a2118] mb-5">
    Titlu Secțiune
  </h2>
</ScrollReveal>

{/* Subtitle */}
<ScrollReveal animation="fade-up" delay={400}>
  <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
    Descriere secțiune
  </p>
</ScrollReveal>
```

---

## 6. Iconițe

### Librărie
**lucide-react** - toate iconițele provin de aici

### Icoane Servicii
| Serviciu | Icon |
|----------|------|
| Stomatologie Generală | Stethoscope |
| Estetică Dentară | Sparkles |
| Protetică | Settings |
| Implantologie | CircleDot |
| Ortodonție | Smile |
| Endodonție | Target |
| Chirurgie | Microscope |
| Pedodonție | Baby |
| Urgențe | AlertTriangle |

### Icon Containers
```css
/* Large icon box (services) */
width: 88px;
height: 88px;
border-radius: 14px;
background: linear-gradient(135deg, #e8ded0 0%, #d4c4b0 100%);

/* Small icon box (why us, stats) */
width: 56px; /* 3.5rem */
height: 56px;
border-radius: 12px;
/* Cu gradient colorat */
```

---

## 7. Animații

### Hover Effects
- **Cards**: `transform: translateY(-4px)` cu `transition: all 0.3s ease`
- **Buttons**: `transform: translateY(-2px)`
- **Icons**: `transform: scale(1.05)` sau `scale(1.1) rotate(3deg)`

### ScrollReveal Animations (19 Feb 2026)
- **Component**: `src/components/ui/ScrollReveal.tsx`
- **Animations**: fade-up, fade-down, fade-left, fade-right, scale-up, scale-down
- **Default**: `fade-up` with `threshold: 0.15`, `duration: 900ms`
- **Staggering**: Use `delay` prop (e.g., 0, 150, 200, 300, 400ms)
- **Pattern**: Wrap section headers and card grids

### Float Animations (Hero)
```css
@keyframes hero-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
/* Duration: 6s ease-in-out infinite */
```

### Marquee (Google Reviews)
```css
@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
/* Duration: 120s linear infinite */
```

---

## 8. Header

### Desktop
- **Height**: ~80px
- **Background**: white cu backdrop-blur când scrolled
- **Navigation**: uppercase, tracking-wider
- **Hover**: animated underline (scale-x)
- **CTA**: btn-primary cu arrow icon
- **Language**: dropdown cu checkmark indicator
- **Scroll Effect**: 4px gradient accent line la top

### Mobile
- **Height**: ~70px
- **Menu Button**: hamburger cu tranziție
- **Drawer**: full-height din dreapta

---

## 9. Footer

### Layout
4 coloane pe desktop:
1. **Brand** - Logo + descriere scurtă
2. **Quick Links** - Servicii, Echipa, Prețuri, Galerie, Blog
3. **Services** - 5 servicii principale
4. **Contact** - Adresă, telefon, email

### Design
```css
background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
/* Grain texture overlay */
/* Top CTA banner cu gradient */
```

### CTA Banner (în Footer)
- **Background**: gradient decorativ
- **Buttons**: Book (primary) + Phone (outline light)

### Bottom Bar
- **Legal links**: Privacy, Cookies, Terms
- **Copyright**: "Made with ♥ in Satu Mare"

---

## 10. Mobile Responsive

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Grid-uri
- **Services**: 1 col → 2 col (sm) → 3 col (lg)
- **Why Us Stats**: 2 col → 4 col (lg)
- **Team**: 2 col → 3 col (md)
- **Footer**: 1 col → 2 col (md) → 4 col (lg)

### Touch Targets
- Minimum 44x44px pentru butoane și linkuri pe mobil

---

## 11. CSS Classes Disponibile

### Layout
- `.container` - container centered cu padding responsive
- `.section` - padding vertical pentru secțiuni

### Cards
- `.card` - card standard
- `.service-card` - card serviciu
- `.testimonial-card` - card recenzie
- `.why-us-grid-item` - item why us

### Buttons
- `.btn` - base button
- `.btn-primary` - buton negru
- `.btn-secondary` - buton accent bej
- `.btn-lg` - buton mare

### Backgrounds
- `.hero-section` - gradient hero
- `.services-section` - alb curat
- `.section-cream` - bej gradient
- `.testimonials-dark` - dark pentru testimoniale

### Animations
- `.hero-float-card` - floating animation
- `.animate-marquee-left` - marquee stânga
- `.animate-marquee-right` - marquee dreapta

---

## 12. Traduceri

### Structură i18n
Fișiere în `/src/messages/`:
- `ro.json` (default)
- `en.json`
- `hu.json`

### Pattern traduceri
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('sectionName');
// Folosește: t('keyName')
```

### Namespace-uri existente
- `hero.*`
- `services.*`
- `whyUs.*`
- `team.*`
- `reviews.*`
- `gallery.*`
- `footer.*`
- `common.*`

---

## 13. Checklist Pagină Nouă

Când creezi o pagină nouă, verifică:

- [ ] Background alternează corect cu secțiunile adiacente
- [ ] Container și section classes aplicate
- [ ] Heading-uri folosesc scale-ul corect
- [ ] Cards folosesc shadow-card și hover effects
- [ ] Butoane folosesc clase .btn
- [ ] Icons din lucide-react
- [ ] Traduceri în toate cele 3 limbi (ro/en/hu)
- [ ] Mobile responsive testat
- [ ] SEO metadata adăugat
- [ ] Links funcționale (verificate cu next-intl Link)

---

## 14. Fișiere Relevante

| Fișier | Conține |
|--------|---------|
| `src/styles/globals.css` | Design tokens, componente CSS |
| `src/components/layout/Header.tsx` | Header component |
| `src/components/layout/Footer.tsx` | Footer component |
| `src/components/layout/MobileMenu.tsx` | Mobile menu |
| `src/app/[locale]/page.tsx` | Homepage cu toate secțiunile |
| `src/lib/fallback-services.ts` | Date servicii |
| `src/lib/fallback-team.ts` | Date echipă |
| `src/components/ui/ScrollReveal.tsx` | Animatii scroll-triggered |
| `src/messages/*.json` | Traduceri |

---

*Document actualizat: 19 Februarie 2026*
