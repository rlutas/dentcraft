# CHECKLIST MASTER - Dentcraft.ro

> **Status:** 🟢 În lucru - FAZA 2 completă, Landing Page funcțional
> **Ultima actualizare:** 15 Ianuarie 2026

---

## FAZA 0: PRE-DEVELOPMENT ✅

### Documentație
- [x] Meeting cu clientul
- [x] PRD complet
- [x] Design system definit
- [x] Tech specs
- [x] Implementation plan
- [x] Content checklist pentru client
- [x] Claude rules & orchestrator

### De la Client (așteptăm)
- [ ] Access Google My Business
- [ ] Link Instagram
- [ ] Link Facebook
- [ ] Logo vector (SVG/PNG)
- [ ] Lista prețuri
- [ ] Poze clinică
- [ ] Poze echipă
- [ ] Before/After (10-15 cazuri)
- [ ] Video testimoniale
- [ ] Certificări Dr. Petric
- [ ] Bio echipă
- [ ] Clipuri Reels

---

## FAZA 1: PROJECT SETUP ✅ (100% complet)

### 1.1 Repository & Tools
- [ ] Creare repo GitHub
- [x] Setup Next.js 15 cu App Router + Turbopack
- [x] Configurare TypeScript strict
- [x] Setup Tailwind CSS v4 (@theme directive)
- [x] Adăugare lucide-react (icons)
- [x] Configurare ESLint
- [ ] Setup Husky (pre-commit hooks)

### 1.2 Design System în Cod ✅
- [x] Configurare culori în globals.css (@theme)
- [x] Setup font Inter (next/font)
- [x] Creare CSS variables
- [x] Setup spacing & border-radius tokens
- [x] Button styles (.btn, .btn-primary, etc.)
- [x] Card styles (.card)
- [x] Section styles (.section, .container)

### 1.3 Multilingv (next-intl) ✅
- [x] Install next-intl v4
- [x] Configurare routing (ro default, en, hu)
- [x] Creare structură messages/ (ro.json, en.json, hu.json)
- [x] Root page în Română (redirect la /ro)
- [x] Language switcher component

### 1.4 CMS Sanity 🔲
- [ ] Creare proiect Sanity
- [ ] Setup Sanity Studio
- [ ] Configurare client connection
- [ ] Test GROQ queries

### 1.5 Deployment 🔲
- [ ] Setup Vercel project
- [ ] Configurare environment variables
- [ ] First deploy (empty project)
- [ ] Setup preview deployments

---

## FAZA 2: LAYOUT & COMPONENTE UI ✅ (Core complet)

### 2.1 Layout Components ✅
- [x] Header (logo, nav, language switcher, CTA)
- [x] Footer (links, contact, social, copyright)
- [x] Mobile menu (hamburger, drawer)
- [x] Page wrapper / Container

### 2.2 UI Components (custom + lucide-react) 🟡
- [x] Button (primary, secondary, ghost, outline)
- [x] Card (service card, team card, testimonial card)
- [ ] Input, Textarea, Select
- [x] Badge / Tag
- [ ] Accordion (pentru FAQ)
- [ ] Tabs
- [ ] Modal / Dialog
- [ ] Skeleton loaders
- [ ] Toast notifications
- [x] Icons (lucide-react: Stethoscope, Sparkles, Settings, Smile, Baby, AlertTriangle, Microscope, Users, Heart, Wallet, Phone, Star)

### 2.3 Section Components ✅
- [x] Hero section (reusable)
- [x] Section title (heading + subtitle)
- [x] CTA section
- [x] Trust indicators bar
- [x] Features grid (ServicesGrid)

### 2.4 Feature Components 🟡
- [ ] WhatsApp floating button
- [ ] Cookie consent banner
- [ ] Google Reviews embed
- [ ] Social share buttons
- [x] Language switcher (dropdown cu flags RO/EN/HU)

---

## FAZA 3: SANITY SCHEMAS 🔲

### 3.1 Document Types
- [ ] siteSettings (global config)
- [ ] service (servicii)
- [ ] teamMember (echipă)
- [ ] beforeAfter (galerie cazuri)
- [ ] testimonial (recenzii)
- [ ] blogPost (articole)
- [ ] blogCategory (categorii blog)
- [ ] faq (întrebări frecvente)
- [ ] price (prețuri pentru calculator)
- [ ] legalPage (legal pages content)

### 3.2 Object Types
- [ ] localizedString (RO/EN/HU)
- [ ] localizedText (rich text multilingv)
- [ ] seo (meta title, description, image)
- [ ] portableText (rich text editor)

### 3.3 Sanity Studio
- [ ] Custom desk structure
- [ ] Preview configuration
- [ ] Image hotspot config

---

## FAZA 4: PAGINI 🔲

### 4.1 Homepage (Landing Page) ✅
- [x] Hero section cu CTA buttons
- [x] Trust indicators bar (ani experiență, pacienți, rating, garanție)
- [x] Servicii grid (6 servicii cu Lucide icons)
- [x] De ce Dentcraft section (4 USP-uri cu Lucide icons)
- [ ] Echipa preview (carousel) - necesită content
- [ ] Before/After preview - necesită poze
- [x] Testimoniale preview (3 testimoniale cu star ratings)
- [ ] Google Reviews badge (embed dinamic)
- [ ] Blog preview - necesită articole
- [x] CTA final section (White Card Float design, accent bg)
- [ ] Responsive polish (needs testing)

### 4.2 Echipa
- [ ] /echipa - listing page cu toți membrii
- [ ] /echipa/[slug] - pagină individuală

### 4.3 Servicii (9 pagini)
- [ ] Template pagină serviciu
- [ ] /servicii/stomatologie-generala
- [ ] /servicii/estetica-dentara
- [ ] /servicii/protetica
- [ ] /servicii/implantologie
- [ ] /servicii/ortodontie
- [ ] /servicii/endodontie
- [ ] /servicii/chirurgie-oro-maxilo-faciala
- [ ] /servicii/pedodontie
- [ ] /servicii/urgente-dentare

### 4.4 Galerie Before/After
- [ ] Grid cu toate cazurile
- [ ] Filtru pe tip tratament
- [ ] Slider before/after interactiv
- [ ] Lightbox pentru vizualizare mare

### 4.5 Testimoniale
- [ ] Grid testimoniale text
- [ ] Video testimoniale section

### 4.6 Prețuri
- [ ] Lista prețuri pe categorii
- [ ] Calculator preț interactiv

### 4.7 Blog
- [ ] /blog - listing cu categorii și search
- [ ] /blog/[slug] - articol individual

### 4.8 FAQ
- [ ] Categorii FAQ
- [ ] Acordeon cu întrebări/răspunsuri

### 4.9 Contact
- [ ] Informații contact
- [ ] Google Maps embed
- [ ] Formular contact
- [ ] Consultație Online section

### 4.10 Legal Pages
- [ ] /politica-confidentialitate
- [ ] /politica-cookies
- [ ] /termeni-conditii

---

## FAZA 5-9: (detalii în docs/implementation-plan.md)

- FAZA 5: Funcționalități avansate (Cookie consent, Forms, SEO, Analytics)
- FAZA 6: Content & Traduceri
- FAZA 7: Testing & QA
- FAZA 8: Launch
- FAZA 9: Handover & Mentenanță

---

## NOTIȚE & BLOCAJE

| Data | Notă | Status |
|------|------|--------|
| 14 Ian | Setup Next.js + Tailwind + next-intl complet | ✅ |
| 14 Ian | Așteptăm content de la client (logo, poze, prețuri) | ⏳ |
| 14 Ian | Componente UI + Layout (Header, Footer, Mobile Menu) create | ✅ |
| 14 Ian | Section components (Hero, ServicesGrid, CTA, Testimonials) create | ✅ |
| 14 Ian | Landing page funcțional cu placeholder data | ✅ |
| 14 Ian | Fix CSS @theme circular references în globals.css | ✅ |
| 15 Ian | Înlocuit emoji-uri cu lucide-react icons | ✅ |
| 15 Ian | CTA section redesigned (White Card Float, design system colors) | ✅ |
| 15 Ian | Header cu glass-morphism + Language switcher dropdown | ✅ |
| 15 Ian | Footer dark (#1A1A1A) cu social icons, contact, legal links | ✅ |
| 15 Ian | Următorul pas: Sanity CMS setup + deploy Vercel | 🔜 |

---

## PROGRES VIZUAL

```
FAZA 0 [██████████] 100% ✅ Pre-development
FAZA 1 [██████████] 100% ✅ Project Setup
FAZA 2 [█████████░]  90% 🟢 Layout & UI Components
FAZA 3 [░░░░░░░░░░]   0% 🔲 Sanity CMS
FAZA 4 [████░░░░░░]  40% 🟡 Pagini (Homepage ✅)
```

---

*Actualizează acest checklist pe măsură ce progresezi!*
