# Design System - Dentcraft.ro

## Directie Vizuala

**Stil General:** Apple-inspired minimalism cu warmth dentar

- Spatiu alb generos
- Tipografie clara si eleganta
- Imagini de inalta calitate
- Animatii subtile si fluide
- Micro-interactiuni sofisticate
- Colturi rotunjite (border-radius)

**Referinte:**
- Apple.com - minimalism si eleganta
- Dentakay.com - context dentar si prezentare servicii
- Stripe.com - micro-interactions, polish

---

## Paleta de Culori

### Culori Principale

| Nume | Cod Hex | RGB | Utilizare |
|------|---------|-----|-----------|
| Background | `#F5F0E8` | rgb(245, 240, 232) | Fundal pagina principal |
| Cards | `#FFFFFF` | rgb(255, 255, 255) | Cards, sectiuni, modals |
| Text Primary | `#1A1A1A` | rgb(26, 26, 26) | Titluri, text principal |
| Text Secondary | `#6B6B6B` | rgb(107, 107, 107) | Text secundar, captions |
| Accent | `#D4C4B0` | rgb(212, 196, 176) | Borduri, butoane secundare |
| Hover | `#C4B4A0` | rgb(196, 180, 160) | Hover states |

### Culori Semantice

| Nume | Cod Hex | Utilizare |
|------|---------|-----------|
| Success | `#4CAF50` | Confirmari, mesaje succes |
| Error | `#E53935` | Erori, validare |
| Warning | `#FFC107` | Atentionari |
| Info | `#2196F3` | Informatii |
| WhatsApp | `#25D366` | Buton WhatsApp floating |

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#F5F0E8',
        foreground: '#1A1A1A',
        primary: {
          DEFAULT: '#1A1A1A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6B6B6B',
          foreground: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#D4C4B0',
          hover: '#C4B4A0',
          foreground: '#1A1A1A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        muted: {
          DEFAULT: '#F5F0E8',
          foreground: '#6B6B6B',
        },
        destructive: {
          DEFAULT: '#E53935',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#4CAF50',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#FFC107',
          foreground: '#1A1A1A',
        },
      },
    },
  },
}
```

### Utilizare Culori

| Element | Culoare Background | Culoare Text |
|---------|-------------------|--------------|
| Body/Page | `#F5F0E8` | `#1A1A1A` |
| Cards/Boxes | `#FFFFFF` | `#1A1A1A` |
| Header | `#FFFFFF` | `#1A1A1A` |
| Footer | `#1A1A1A` | `#FFFFFF` |
| Butoane Primary | `#1A1A1A` | `#FFFFFF` |
| Butoane Secondary | `#D4C4B0` | `#1A1A1A` |
| Butoane Hover | `#C4B4A0` / `#333333` | - |
| Inputs Border | `#D4C4B0` | - |
| Inputs Focus | `#1A1A1A` | - |
| Links | `#1A1A1A` | - |
| Paragraf | - | `#6B6B6B` |

---

## Tipografie

### Font Principal

**Font Family:** Inter (fallback: SF Pro, system)

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Scale Tipografie

| Element | Size Desktop | Size Mobile | Weight | Line Height | Letter Spacing |
|---------|-------------|-------------|--------|-------------|----------------|
| H1 | 56-64px | 36-40px | 700 (Bold) | 1.1 | -1px |
| H2 | 40-48px | 28-32px | 600 (Semibold) | 1.2 | -0.5px |
| H3 | 28-32px | 22-24px | 600 (Semibold) | 1.3 | 0 |
| H4 | 22-24px | 18-20px | 500 (Medium) | 1.4 | 0 |
| H5 | 18px | 16px | 500 (Medium) | 1.4 | 0 |
| Body Large | 20px | 18px | 400 (Regular) | 1.6 | 0 |
| Body | 16px | 16px | 400 (Regular) | 1.6 | 0 |
| Body Small | 14px | 14px | 400 (Regular) | 1.5 | 0 |
| Caption | 12px | 12px | 400 (Regular) | 1.4 | 0 |
| Button | 16px | 14px | 600 (Semibold) | 1 | 0.5px |
| Label | 14px | 14px | 500 (Medium) | 1.4 | 0 |

### Tailwind Typography

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.1', letterSpacing: '-1px' }],
        'h1': ['56px', { lineHeight: '1.1', letterSpacing: '-1px' }],
        'h2': ['40px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        'h3': ['28px', { lineHeight: '1.3' }],
        'h4': ['22px', { lineHeight: '1.4' }],
        'body-lg': ['20px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4' }],
      },
    },
  },
}
```

---

## Spacing System

**Base Unit:** 8px

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Spacing minim, iconite |
| `sm` | 8px | Padding intern mic |
| `md` | 16px | Padding standard |
| `lg` | 24px | Spatiu intre elemente |
| `xl` | 32px | Sectiuni mici |
| `2xl` | 48px | Sectiuni medii |
| `3xl` | 64px | Sectiuni mari |
| `4xl` | 96px | Spatiu intre sectiuni majore |

### Tailwind Spacing

```javascript
// tailwind.config.js (implicit in Tailwind - scale x4)
// p-1 = 4px, p-2 = 8px, p-4 = 16px, p-6 = 24px, etc.
```

---

## Border Radius

| Element | Radius | Tailwind Class |
|---------|--------|----------------|
| Buttons | 12-14px | `rounded-xl` |
| Cards | 16-24px | `rounded-2xl` / `rounded-3xl` |
| Images | 12-16px | `rounded-xl` / `rounded-2xl` |
| Inputs | 10-12px | `rounded-lg` / `rounded-xl` |
| Modals | 24px | `rounded-3xl` |
| Tags/Pills | 50% | `rounded-full` |
| Avatars | 50% | `rounded-full` |
| Icons Container | 16px | `rounded-2xl` |

---

## Shadows

| Tip | CSS Value | Usage |
|-----|-----------|-------|
| Card Default | `0 4px 20px rgba(0,0,0,0.05)` | Cards, containere |
| Card Hover | `0 10px 40px rgba(0,0,0,0.1)` | Hover pe cards |
| Button | `0 2px 10px rgba(0,0,0,0.1)` | Butoane elevate |
| Header | `0 2px 10px rgba(0,0,0,0.05)` | Header fixed |
| Modal | `0 12px 48px rgba(0,0,0,0.15)` | Modals, dropdowns |
| WhatsApp | `0 4px 20px rgba(37,211,102,0.4)` | Buton WhatsApp |

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.05)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.1)',
        'button': '0 2px 10px rgba(0,0,0,0.1)',
        'header': '0 2px 10px rgba(0,0,0,0.05)',
        'modal': '0 12px 48px rgba(0,0,0,0.15)',
        'whatsapp': '0 4px 20px rgba(37,211,102,0.4)',
      },
    },
  },
}
```

---

## Componente UI

### Buttons

#### Primary Button
```jsx
<button className="
  bg-primary text-white
  px-8 py-4
  rounded-xl
  font-semibold text-base
  transition-all duration-300
  hover:bg-gray-800 hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
">
  Programeaza Consultatie
</button>
```

#### Secondary Button
```jsx
<button className="
  bg-accent text-primary
  px-8 py-4
  rounded-xl
  font-semibold text-base
  transition-all duration-300
  hover:bg-accent-hover hover:-translate-y-0.5
">
  Descopera Serviciile
</button>
```

#### Ghost Button (Header)
```jsx
<button className="
  bg-primary text-white
  px-6 py-3
  rounded-xl
  font-medium text-sm
  transition-colors duration-300
  hover:bg-gray-800
">
  Programeaza
</button>
```

### Cards

#### Service Card
```jsx
<div className="
  bg-white
  p-8
  rounded-2xl
  border border-accent/30
  transition-all duration-300
  hover:-translate-y-1 hover:shadow-card-hover
">
  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-5">
    <Icon className="w-8 h-8" />
  </div>
  <h3 className="text-h4 font-semibold mb-3">Titlu Serviciu</h3>
  <p className="text-secondary mb-5">Descriere serviciu...</p>
  <a href="#" className="font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
    Afla mai mult <ArrowRight />
  </a>
</div>
```

#### Testimonial Card
```jsx
<div className="
  bg-background
  p-10
  rounded-2xl
  text-center
">
  <div className="text-accent text-2xl mb-4">★★★★★</div>
  <p className="text-body-lg italic mb-6 leading-relaxed">
    "Testimonial text..."
  </p>
  <div className="font-semibold">Nume Pacient</div>
</div>
```

### Inputs

#### Text Input
```jsx
<input
  type="text"
  className="
    w-full
    px-5 py-4
    border-2 border-accent
    rounded-xl
    text-base font-sans
    transition-colors duration-300
    focus:outline-none focus:border-primary
    placeholder:text-secondary
  "
  placeholder="Numele tau"
/>
```

#### Select
```jsx
<select className="
  w-full
  px-5 py-4
  border-2 border-accent
  rounded-xl
  text-base font-sans
  bg-white
  transition-colors duration-300
  focus:outline-none focus:border-primary
">
  <option>Selecteaza...</option>
</select>
```

### Navigation

#### Header Link
```jsx
<a href="#" className="
  text-secondary
  font-medium
  transition-colors duration-300
  hover:text-primary
">
  Servicii
</a>
```

### Floating Elements

#### WhatsApp Button
```jsx
<a
  href="https://wa.me/40741199977"
  className="
    fixed bottom-8 right-8
    w-16 h-16
    bg-[#25D366]
    rounded-full
    flex items-center justify-center
    text-white text-3xl
    shadow-whatsapp
    transition-transform duration-300
    hover:scale-110
    z-50
  "
>
  <WhatsAppIcon />
</a>
```

#### Cookie Banner
```jsx
<div className="
  fixed bottom-0 inset-x-0
  bg-white
  px-10 py-5
  shadow-modal
  flex justify-between items-center flex-wrap gap-5
  z-40
">
  <p className="flex-1 min-w-[300px]">
    Folosim cookies pentru experienta ta...
  </p>
  <div className="flex gap-3">
    <button className="px-6 py-3 rounded-lg bg-background font-medium">
      Setari
    </button>
    <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium">
      Accept toate
    </button>
  </div>
</div>
```

---

## Breakpoints Responsive

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Usage Pattern

```jsx
// Mobile-first approach
<div className="
  px-5             // Mobile default
  md:px-10         // Tablet
  lg:px-16         // Desktop
  xl:px-20         // Large desktop
">
  <h1 className="
    text-4xl       // Mobile
    md:text-5xl    // Tablet
    lg:text-h1     // Desktop
  ">
    Titlu
  </h1>
</div>
```

### Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| Default | 100% |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1200px |
| `2xl` | 1400px |

---

## Iconografie

**Biblioteca:** Lucide Icons (lucide-react)

### Specificatii
- Stil: Line icons
- Stroke width: 1.5-2px
- Size standard: 24px
- Size small: 16-20px
- Size large: 32-48px

### Iconite Servicii (Custom SVG)

Pentru serviciile dentare se vor crea iconite custom:
- Dinte (stomatologie generala)
- Zambet (estetica)
- Implant
- Aparat dentar (ortodontie)
- Copil zambind (pedodontie)
- Urgenta (cruce)
- Bisturiu (chirurgie)
- Canal radicular (endodontie)
- Coroana dentara (protetica)

---

## Imagini

### Specificatii Tehnice

| Tip | Dimensiuni | Format | Compresie |
|-----|------------|--------|-----------|
| Hero | 1920x1080px min | WebP + JPG fallback | 80% |
| Cards | 800x600px | WebP + JPG fallback | 80% |
| Thumbnails | 400x300px | WebP | 75% |
| Team Photos | 600x800px | WebP + JPG | 85% |
| Before/After | 800x800px | WebP + JPG | 85% |
| Gallery Full | 1200x900px | WebP + JPG | 80% |
| Logo | Vector SVG | SVG + PNG | - |

### Stil Fotografie

- Poze REALE din clinica (nu stock)
- Iluminare naturala/profesionala
- Fundal curat, ordonat
- Focus pe zambete si echipament modern
- Tonuri calde, consistente cu brandul

### Next/Image Config

```jsx
<Image
  src="/images/hero.jpg"
  alt="Descriere"
  width={1920}
  height={1080}
  priority // pentru above-the-fold
  className="rounded-2xl"
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

---

## Animatii

### Transitions Standard

```css
/* Default transition */
transition: all 0.3s ease;

/* Fast (hover states) */
transition: all 0.2s ease;

/* Slow (page transitions) */
transition: all 0.5s ease;
```

### Framer Motion Variants

```jsx
// Fade in up
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Scale on hover
const scaleHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}
```

### Hover Effects

| Element | Effect |
|---------|--------|
| Cards | `translateY(-5px)` + shadow increase |
| Buttons | `translateY(-2px)` |
| Links | Color change |
| Images | Subtle zoom (scale 1.05) |
| Icons | Rotation or bounce |

---

*Document Version: 1.0*
*Ultima actualizare: 14 Ianuarie 2026*
