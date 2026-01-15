# Dentcraft.ro - Documentație Proiect

## Informații Generale

| Info | Valoare |
|------|---------|
| **Client** | Dr. Razvan Petric - Dentcraft Satu Mare |
| **Proiect** | Site prezentare clinică stomatologică |
| **Budget** | €3,000 |
| **Timeline** | 4-6 săptămâni |
| **Limbi** | Română, Engleză, Maghiară |
| **Status** | 🟢 În lucru - Landing Page complet |

---

## Structura Documentație

```
dentcraft/
├── .claude/                      # Claude AI Rules
│   ├── rules.md                  # Convenții cod & reguli proiect
│   └── orchestrator.md           # Strategie agenți eficienți
│
└── docs/                         # Documentație completă
    ├── README.md                 # 📍 EȘTI AICI
    ├── prd-dentcraft.md          # Product Requirements Document
    ├── implementation-plan.md    # Plan implementare pe săptămâni
    ├── tech-specs.md             # Specificații tehnice
    ├── design-system.md          # Sistem design (culori, componente)
    ├── content-checklist.md      # Checklist conținut client
    │
    ├── meeting-notes/            # Notițe întâlniri
    │   ├── client-meeting-notes.md
    │   └── intrebari-discovery-v1.md
    │
    ├── client-assets/            # Assets pentru client
    │   └── color-preview.html    # Preview design
    │
    └── reference/                # Documente referință
        ├── business-requirements.md
        └── proposal-client.html
```

---

## Quick Links

### Documente Principale
| Document | Descriere | Status |
|----------|-----------|--------|
| [CHECKLIST](./CHECKLIST.md) | ⭐ MASTER CHECKLIST - actualizează pe parcurs | 🟡 În lucru |
| [PRD](./prd-dentcraft.md) | Cerințe produs complete | ✅ Complet |
| [Implementation Plan](./implementation-plan.md) | Plan pe 6 săptămâni | ✅ Complet |
| [Tech Specs](./tech-specs.md) | Stack, structură, convenții | ✅ Complet |
| [Design System](./design-system.md) | Culori, fonts, componente | ✅ Complet |
| [Content Checklist](./content-checklist.md) | Ce trebuie de la client | ✅ Complet |

### Claude AI Rules
| Document | Descriere |
|----------|-----------|
| [Rules](../.claude/rules.md) | Convenții cod, TypeScript, styling |
| [Orchestrator](../.claude/orchestrator.md) | Cum să folosești agenți eficient |

### Meeting Notes
| Document | Descriere |
|----------|-----------|
| [Client Meeting Notes](./meeting-notes/client-meeting-notes.md) | Decizii, prețuri, funcționalități |
| [Discovery Questions](./meeting-notes/intrebari-discovery-v1.md) | Template întrebări |

### Pentru Client
| Document | Descriere |
|----------|-----------|
| [Color Preview](./client-assets/color-preview.html) | Preview design - TRIMITE CLIENTULUI |
| [Content Checklist](./content-checklist.md) | Ce trebuie să pregătească |

---

## Status Proiect

### Faze
| Fază | Status | Descriere |
|------|--------|-----------|
| 1. Discovery & Planning | ✅ Complet | Meeting, PRD, documentație |
| 2. Design | ✅ Complet | Design system implementat în cod |
| 3. Development Setup | ✅ Complet | Next.js 15, Tailwind v4, next-intl |
| 4. Development | 🟡 În lucru | Landing Page complet |
| 5. Content Integration | 🔲 Pending | Așteptăm content de la client |
| 6. Testing & Launch | 🔲 Pending | QA, deploy |

### Milestones
- [x] Setup proiect complet (Next.js 15, Tailwind v4, next-intl)
- [x] Design system implementat (culori, fonts, componente)
- [x] Header & Footer complete (glass-morphism, language switcher)
- [x] Homepage funcțional (toate secțiunile cu placeholder data)
- [ ] Sanity CMS setup
- [ ] Vercel deployment
- [ ] Content populat
- [ ] 🚀 **LAUNCH**

---

## Tech Stack

| Tehnologie | Versiune | Scop |
|------------|----------|------|
| Next.js | 15.1 | Framework React (App Router + Turbopack) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (@theme directive) |
| lucide-react | latest | Icons (Lucide) |
| next-intl | 4.x | Multilingv (RO/EN/HU) |
| Sanity.io | v3 | CMS (pending setup) |
| Vercel | - | Hosting (pending deploy) |

---

## Sitemap (25-30 pagini cu 3 limbi)

```
dentcraft.ro/
├── / (Homepage)
├── /echipa
│   └── /echipa/[slug]
├── /servicii
│   ├── /servicii/stomatologie-generala
│   ├── /servicii/estetica-dentara
│   ├── /servicii/protetica
│   ├── /servicii/implantologie
│   ├── /servicii/ortodontie
│   ├── /servicii/endodontie
│   ├── /servicii/chirurgie-oro-maxilo-faciala
│   ├── /servicii/pedodontie
│   └── /servicii/urgente-dentare
├── /galerie
├── /testimoniale
├── /preturi
├── /blog
│   └── /blog/[slug]
├── /faq
├── /contact
├── /politica-confidentialitate
├── /politica-cookies
└── /termeni-conditii
```

---

## Contact Client

| Info | Valoare |
|------|---------|
| **Telefon** | 0741 199 977 |
| **Email** | dentcraftsm@gmail.com |
| **Adresă** | Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare |
| **Program** | Luni - Vineri: 10:00 - 18:00 |
| **Instagram** | ⏳ Așteptăm link |
| **Facebook** | ⏳ Așteptăm link |

---

## Așteptăm de la Client

- [ ] Access Google My Business
- [ ] Link Instagram
- [ ] Link Facebook
- [ ] Logo vector (SVG sau high-res PNG)
- [ ] Lista prețuri pentru calculator
- [ ] Poze clinică (interior, exterior)
- [ ] Poze echipă profesionale
- [ ] Cazuri Before/After (minim 10-15)
- [ ] Video testimoniale
- [ ] Lista certificări Dr. Petric
- [ ] Bio echipă (texte)
- [ ] Clipuri Reels

---

## Design Reference

### Paleta Culori
| Rol | Culoare | Cod |
|-----|---------|-----|
| Background | Bej deschis | `#F5F0E8` |
| Cards | Alb | `#FFFFFF` |
| Text | Negru soft | `#1A1A1A` |
| Accent | Bej | `#D4C4B0` |
| Hover | Bej închis | `#C4B4A0` |
| Text muted | Gri | `#6B6B6B` |

### Inspirație
- [Dentakay.com](https://www.dentakay.com) - Design modern dental
- Apple.com - Stil minimalist, spacing generos

---

## Comenzi Rapide (după setup)

```bash
# Development
npm run dev

# Build
npm run build

# Sanity Studio
npm run sanity:dev

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Link-uri Utile

### Documentație Tehnică
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sanity.io](https://www.sanity.io/docs)
- [next-intl](https://next-intl-docs.vercel.app/)

### Tools (după setup)
- Vercel Dashboard: TBD
- Sanity Studio: TBD
- Google Analytics: TBD

---

*Ultima actualizare: 15 Ianuarie 2026*
