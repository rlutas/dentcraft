# Business Requirements Document (BRD)
## Dentcraft.ro - Platformă Web pentru Clinică Stomatologică

---

**Document Version:** 1.0
**Date:** 24 Octombrie 2025
**Prepared by:** Raul Lutas - Full Stack Developer
**Client:** Dr. Răzvan Petric - Dentcraft Satu Mare
**Project Name:** Dentcraft.ro - Digital Dental Platform

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 24 Oct 2025 | Raul Lutas | Initial document creation |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Current State Analysis](#3-current-state-analysis)
4. [Stakeholder Identification](#4-stakeholder-identification)
5. [Project Variants](#5-project-variants)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Technical Architecture](#8-technical-architecture)
9. [User Roles & Permissions](#9-user-roles--permissions)
10. [Data Requirements](#10-data-requirements)
11. [Integration Specifications](#11-integration-specifications)
12. [Security & Compliance](#12-security--compliance)
13. [Multi-Language Requirements](#13-multi-language-requirements)
14. [Success Criteria & Metrics](#14-success-criteria--metrics)
15. [Risk Assessment](#15-risk-assessment)
16. [Project Timeline](#16-project-timeline)
17. [Budget & Investment](#17-budget--investment)
18. [Appendices](#18-appendices)

---

## 1. Executive Summary

### 1.1 Project Purpose

Dentcraft este o clinică stomatologică modernă din Satu Mare care oferă servicii complete de stomatologie generală, estetică dentară, protetică, implantologie, ortodonție și alte specialități. Momentan, clinica nu are un site web propriu, doar site-ul personal al Dr. Răzvan Petric (drpetric.ro).

Acest proiect vizează crearea unei platforme web complete pentru Dentcraft.ro care va:

- **Atrage pacienți noi** prin prezență digitală profesională
- **Automatizează procesul de programări** și reduce volumul de apeluri telefonice
- **Oferă pacienților acces digital** la planuri de tratament, scanări dentare și documente
- **Diferențiază Dentcraft** de competiție prin tehnologie avansată
- **Măsoară și optimizează** performanța de marketing prin KPI-uri clare

### 1.2 Business Value

| Indicator | Impact |
|-----------|--------|
| **Achiziție pacienți** | +40-60% creștere lead-uri prin SEO local și programări online |
| **Eficiență operațională** | -50% timp pierdut cu apeluri pentru programări |
| **Retenție pacienți** | +30% compliance la tratamente prin remindere automate |
| **Brand positioning** | Prima clinică din Satu Mare cu patient portal complet |
| **Revenue growth** | +25-35% venituri prin vizibilitate crescută și conversie îmbunătățită |

### 1.3 Two-Variant Approach

Proiectul oferă **două variante de implementare** pentru a se adapta la bugetul și nevoile de business:

**Varianta 1: Site Prezentare Premium** (€2,800 - €3,500)
- Website modern, responsive, multi-limbă (RO/HU/EN)
- Prezentare servicii, galerie before/after, testimoniale
- Formular contact și programări simple
- Blog pentru SEO și educație pacienți
- Timeline: 4-6 săptămâni

**Varianta 2: Platformă Digitală Completă** (€5,500 - €6,500)
- Tot din Varianta 1 PLUS:
- Patient Portal cu autentificare
- Sistem programări online cu calendar live
- Integrare droot.ro (CSV import/export)
- Vizualizare planuri tratament și prețuri personalizate
- Acces la scanări 3D și imagini diagnostice
- Notificări automate (email/SMS pentru remindere)
- Dashboard medic și asistent pentru gestionare pacienți
- Timeline: 10-14 săptămâni

### 1.4 Strategic Recommendation

Pentru maximizarea ROI-ului, recomandăm:

1. **Start cu Varianta 1** pentru validare rapidă și prezență online imediată
2. **Upgrade la Varianta 2** după 3-6 luni când procesele sunt optimizate
3. **Arhitectură scalabilă** din prima zi pentru a permite tranziția ușoară

Alternativ, implementare directă Varianta 2 dacă bugetul permite și echipa este pregătită pentru digitalizare completă.

---

## 2. Project Overview

### 2.1 Project Vision

**"Dentcraft.ro va deveni platforma dentară digitală de referință în Satu Mare, oferind pacienților o experiență modernă, transparentă și accesibilă - de la prima vizită până la finalizarea tratamentului."**

### 2.2 Project Objectives

| Obiectiv | Descriere | Măsurare |
|----------|-----------|----------|
| **O1: Digital Presence** | Creare identitate online profesională pentru Dentcraft | Website live, SEO rank Top 3 Satu Mare |
| **O2: Lead Generation** | Atragere minimum 50 lead-uri/lună prin canal digital | Google Analytics, form submissions |
| **O3: Appointment Automation** | 70% din programări făcute online fără telefon | Booking system metrics |
| **O4: Patient Engagement** | Retenție crescută prin acces digital la informații | Portal usage, return rate |
| **O5: Operational Efficiency** | Reducere cu 30% timp administrativ | Time tracking, staff feedback |
| **O6: Competitive Advantage** | Prima clinică Satu Mare cu patient portal complet | Market analysis |

### 2.3 Project Scope

#### In Scope (Varianta 1)
✅ Website multi-limbă (RO/HU/EN)
✅ Responsive design (mobile-first)
✅ Prezentare servicii complete
✅ Galerie before/after
✅ Testimoniale pacienți
✅ Blog educațional cu CMS
✅ Formular contact și programări simple
✅ Integrare Google Maps, Social Media
✅ SEO optimization
✅ Google Analytics & Tag Manager

#### In Scope (Varianta 2 - Additional)
✅ Patient Portal cu autentificare securizată
✅ Dashboard pacient (planuri tratament, prețuri, plăți)
✅ Sistem booking online cu calendar live
✅ Integrare droot.ro (import/export CSV)
✅ Upload și vizualizare scanări 3D dentare
✅ Galerie imagini diagnostice per pacient (din Google Drive)
✅ Notificări automate (email/SMS) pentru remindere
✅ Dashboard medic pentru gestionare multi-pacienți
✅ Role-based access (Pacient, Doctor, Asistent, Admin)
✅ Payment tracking (achitat/restant)
✅ Raportare și KPI dashboard

#### Out of Scope (Phase 1)
❌ Aplicație mobilă nativă (iOS/Android)
❌ Telemedicină/Video consultații
❌ Integrare directă API droot (doar CSV)
❌ Plăți online cu card (se poate adăuga ulterior)
❌ AI chatbot pentru suport
❌ Marketing automation avansat

### 2.4 Key Stakeholders

- **Dr. Răzvan Petric** - Owner & Lead Dentist
- **Echipa medicală Dentcraft** - Utilizatori dashboard medici
- **Pacienți existenți și noi** - Utilizatori finali platformă
- **Personal administrativ** - Gestionare programări și pacienți
- **Raul Lutas** - Developer & Project Manager

---

## 3. Current State Analysis

### 3.1 Current Digital Presence

**Website:**
- ❌ Dentcraft.ro NU există momentan
- ✅ drpetric.ro există - site personal Dr. Petric (design plăcut, funcționalități basic)

**Social Media:**
- ✅ Prezență activă pe Facebook/Instagram cu reels
- ✅ Generare conținut vizual (before/after, proceduri)

**Software & Tools:**
- ✅ droot.ro - Software stomatologic pentru managementul clinicii
  - Planuri de tratament
  - Programări
  - Istoricul pacienților
  - ❓ Export CSV (de confirmat posibilități)

### 3.2 Current Patient Journey (As-Is)

```
1. Discovery → Google Search / Social Media / Recomandări
2. Research → drpetric.ro (site personal) / Facebook / Call
3. Contact → Telefon clinica
4. Booking → Telefonic cu asistenta (manual în droot)
5. Confirmation → Telefonic
6. Visit → Clinică
7. Treatment Plan → Primit fizic la clinică
8. Follow-up → Telefonic pentru reminder
9. Payment → Cash/POS la clinică
```

**Pain Points:**
- 🔴 Lipsa site dedicat Dentcraft (confuzie între personal brand și clinică)
- 🔴 Programări doar telefonic (pierdere apeluri în afara programului)
- 🔴 Pacienții nu au acces digital la planuri tratament
- 🔴 Nu există remindere automate (pacienți ratează programări)
- 🔴 Imposibil de măsurat sursa pacienților (ROI marketing neclar)

### 3.3 Competitive Landscape - Satu Mare

| Clinică | Website | Online Booking | Patient Portal | Design Quality | Unique Features |
|---------|---------|----------------|----------------|----------------|-----------------|
| **Finess Dental** | clinica.finess-dental.ro | ❌ | ❌ | ⭐⭐⭐ | Focus implanturi |
| **ArtDentalStudio** | artdentalstudio.ro | ❌ | ❌ | ⭐⭐⭐ | Design modern |
| **Dr. Cocis Dental** | drcocisdental.ro | ❌ | ❌ | ⭐⭐ | Basic |
| **Bote-San** | bote-san.ro | ❌ | ❌ | ⭐⭐ | Basic |
| **Expert Dental** | expertdental.ro | ❌ | ❌ | ⭐⭐⭐ | - |
| **Dr. Magyari** | drmagyari.ro | ❌ | ❌ | ⭐⭐ | - |
| **Sala Diagnostics** | saladiagnostics.ro | ❌ | ❌ | ⭐⭐ | Multi-specialitate |

**Analiza competitivă:**
- ✅ Toate clinicile au site-uri basic de prezentare
- ❌ NIMENI nu are patient portal
- ❌ NIMENI nu are booking online funcțional
- ❌ Majoritatea au design outdated
- 🎯 **OPORTUNITATE: Dentcraft poate deveni lider prin tehnologie**

### 3.4 Best-in-Class International Benchmarks

**Dentakay.com** - Referință design modern & UX excelent:
- ✅ **Design premium, clean, profesional** - foarte asemănător cu ce vrea Dr. Petric
- ✅ **Multi-language** (6 limbi: EN, TR, AR, FR, DE, RU)
- ✅ **Real-time price calculator** - feature excelent pentru transparență
- ✅ **Video testimonials** (30+) + Trustpilot 4.9/5 cu 13,803 reviews
- ✅ **Step-by-step booking system** - UX foarte intuitiv
- ✅ **Before/after gallery** cu filtrare per tratament
- ✅ **Mobile-first approach** - navigare perfectă pe telefon
- ✅ **Trust signals** prominent (certificări, media mentions, garantii)

**Dentakay Insights pentru Dentcraft:**
- 🎨 **Design inspiration**: Layout modern, spacing generos, imagini premium
- 📱 **Booking flow**: Multi-step form cu progress bar - reduce abandonare
- 💰 **Price transparency**: Calculator in real-time crește încrederea
- 🎥 **Video content**: Testimoniale video au conversie mult mai mare
- ⭐ **Social proof**: Trustpilot badges + review count vizibil peste tot

**Target pentru Dentcraft:** Să aducă acest nivel de profesionalism digital la Satu Mare, adaptat pieței locale românești

---

## 4. Stakeholder Identification

### 4.1 Primary Stakeholders

#### 4.1.1 Dr. Răzvan Petric (Owner & Lead Dentist)
- **Role:** Decision maker, lead dentist, brand ambassador
- **Needs:**
  - Prezență digitală profesională
  - Mai mulți pacienți noi
  - Eficiență în gestionarea clinicii
  - Showcase certificări și expertise internațional
- **Success Criteria:**
  - Creștere vizibilitate online
  - Lead generation consistent
  - Brand positioning premium

#### 4.1.2 Echipa Medicală Dentcraft
- **Role:** Medici și asistenți utilizatori dashboard
- **Needs:**
  - Acces rapid la informații pacienți
  - Tool simplu pentru actualizare planuri tratament
  - Vizibilitate program și programări
- **Success Criteria:**
  - Interface intuitiv
  - Reducere timp administrativ
  - Mai mult timp pentru pacienți

#### 4.1.3 Personal Administrativ
- **Role:** Recepție, programări, facturare
- **Needs:**
  - Sistem programări eficient
  - Sincronizare cu droot.ro
  - Gestionare liste așteptare
- **Success Criteria:**
  - -50% apeluri telefonice
  - -30% timp per programare
  - 0 double bookings

#### 4.1.4 Pacienți (Existenți și Noi)
- **Role:** Utilizatori finali platformă
- **Needs:**
  - Informații clare despre servicii și prețuri
  - Programare online 24/7
  - Acces la planurile lor de tratament
  - Transparență costuri
  - Remindere automate
- **Success Criteria:**
  - Booking în <3 minute
  - Acces info 24/7
  - Comunicare clară și la timp

### 4.2 Secondary Stakeholders

- **Marketing Agency/Freelancer:** Conținut pentru blog și SEO
- **Photographer:** Imagini clinică, before/after profesionale
- **Raul Lutas (Developer):** Dezvoltare și mentenanță tehnică

---

## 5. Project Variants

### 5.1 Variant 1: Site Prezentare Premium

#### 5.1.1 Overview
Website modern, multi-limbă, mobile-first pentru prezentarea profesională a clinicii Dentcraft. Focus pe conversie lead-uri și SEO local.

#### 5.1.2 Core Features

**Public Pages:**
- Homepage cu hero section, servicii featured, testimoniale
- Despre Dentcraft (echipă, valori, echipamente)
- Despre Dr. Răzvan Petric (bio, certificări, experiență)
- Servicii (pagini detaliate per specialitate):
  - Stomatologie generală
  - Estetică dentară (fațete, albire, Digital Smile Design)
  - Protetică (coroane, punți, proteze)
  - Implantologie
  - Ortodonție
  - Endodonție
  - Chirurgie oro-maxilo-facială
  - Pedodonție (opțional - "Dentcraft 4 Kids")
- Galerie Before/After (filtru per tip tratament)
- Testimoniale pacienți (text + video)
- Blog educațional (artole, studii de caz)
- Contact (formular, hartă, program, telefon, WhatsApp)

**Multi-Language:**
- Română (default)
- Maghiară
- Engleză
- Language switcher în header

**Forms & Conversion:**
- Contact form (nume, telefon, email, mesaj)
- Programare simplificată (nume, telefon, serviciu dorit, dată preferată)
- WhatsApp click-to-chat
- Phone click-to-call (mobile)

**SEO & Analytics:**
- On-page SEO optimization
- Google Tag Manager
- Google Analytics 4
- Facebook Pixel
- Schema markup pentru local business
- Sitemap XML
- Robots.txt optimizat

**CMS:**
- Headless CMS (Sanity.io sau similar) pentru:
  - Blog posts (echipa poate adăuga articole)
  - Testimoniale
  - Servicii (update prețuri, descrieri)
  - Galerie imagini

#### 5.1.3 Technical Stack (Varianta 1)

**Frontend:**
- Next.js 14+ (App Router, SSR/SSG pentru SEO)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion (animații subtle)
- next-intl (multi-language)

**Backend & Data:**
- Sanity.io (Headless CMS pentru blog & content)
- Next.js API routes (form handling)
- Resend (email notifications)

**Hosting & DevOps:**
- Vercel (hosting + CI/CD)
- GitHub (version control)
- Cloudflare (CDN + DNS)

**Third-party Integrations:**
- Google Maps API
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel
- WhatsApp Business API (link direct)

#### 5.1.4 Timeline (Varianta 1)

| Week | Milestone |
|------|-----------|
| W1 | Discovery, design mockups, content structure |
| W2 | Development: Homepage, About, Services |
| W3 | Development: Gallery, Testimonials, Blog |
| W4 | Development: Contact, Forms, Multi-language |
| W5 | Testing, SEO optimization, content population |
| W6 | Launch, training, handoff |

**Total: 4-6 săptămâni**

#### 5.1.5 Investment (Varianta 1)

| Item | Cost (EUR) |
|------|-----------|
| **Development** | €2,000 - €2,500 |
| Design & UX | €400 - €500 |
| Content creation support | €200 - €300 |
| CMS setup & training | €200 - €200 |
| **Total Investment** | **€2,800 - €3,500** |
| **Mentenanță lunară** | **€60 - €80** |

**Mentenanță include:**
- Hosting (Vercel Pro)
- CMS (Sanity)
- SSL certificate
- Bug fixes
- Security updates
- Monthly report

#### 5.1.6 Success Metrics (Varianta 1)

| KPI | Target (Month 3) |
|-----|------------------|
| Organic traffic | 500-800 visitors/month |
| Contact form submissions | 30-50/month |
| Phone calls from website | 40-60/month |
| Booking requests | 50-80/month |
| SEO: "clinica stomatologica satu mare" | Top 3 |
| Page load time | <2 seconds |
| Mobile traffic | >60% |

---

### 5.2 Variant 2: Platformă Digitală Completă

#### 5.2.1 Overview
Platformă completă cu tot din Varianta 1 PLUS patient portal, booking online, integrare droot, dashboard medici, notificări automate. Clinică digitală de ultimă generație.

#### 5.2.2 Additional Features (peste Varianta 1)

**Patient Portal:**
- Autentificare securizată (email/password)
- Dashboard personal pacient:
  - Informații profil (nume, CNP, contact, istoric medical)
  - Planuri de tratament active (importate din droot CSV)
  - Prețuri personalizate per tratament
  - Status plăți (achitat/restant)
  - Istoric tratamente finalizate
  - Vizualizare scanări 3D dentare (embedded viewer)
  - Galerie imagini diagnostice personale (link Google Drive sau upload)
  - Programări viitoare și istoric
  - Facturi și chitanțe downloadabile PDF
  - Mesaje de la doctor

**Booking System:**
- Calendar live cu disponibilitate medici
- Alegere doctor, serviciu, slot orar
- Confirmare instant prin email
- Sincronizare cu droot.ro (export CSV pentru import manual sau API dacă există)
- Reminder automat cu 24h înainte (email + SMS opțional)
- Reprogramare și anulare online

**Doctor Dashboard:**
- Listă pacienți (search, filter)
- Vizualizare rapidă plan tratament per pacient
- Upload documente (scanări, imagini)
- Actualizare status tratament
- Vizualizare program zilnic
- Rapoarte financiare (încasări, restanțe)

**Admin Dashboard:**
- Gestionare utilizatori (pacienți, doctori, asistenți)
- Configurare servicii și prețuri
- Import CSV masiv din droot
- Rapoarte și analytics:
  - Lead sources
  - Conversion rates
  - Revenue per treatment type
  - Patient retention
  - Appointment show/no-show rates
- Gestionare conținut (blog, testimoniale)

**Notifications System:**
- Email automat pentru:
  - Confirmare programare
  - Reminder cu 24h înainte
  - Completare tratament
  - Reminder review/testimonial
  - Newsletter opțional
- SMS opțional (integrare Twilio sau similar):
  - Reminder programare
  - Urgențe

**droot.ro Integration:**
- Import CSV pacienți (bulk upload)
- Format CSV standardizat:
  - Patient ID, Nume, Prenume, CNP, Email, Telefon
  - Treatment Plan ID, Descriere, Preț, Status
  - Payments: Achitat, Restant
- Export programări din Dentcraft.ro → CSV pentru import în droot
- Actualizare periodică (saptamânală sau on-demand)

**File Management:**
- Upload scanări 3D (format .STL sau .PLY)
- 3D viewer în browser (Three.js)
- Upload imagini diagnostice (JPEG, PNG)
- Organizare per pacient + per tratament
- Integrare Google Drive (optional): link direct folder pacient
- Permisiuni stricte (pacient vede doar propriile fișiere)

#### 5.2.3 Enhanced Technical Stack (Varianta 2)

**Frontend:** (same as V1) +
- React Query (data fetching)
- Zustand (state management)
- Three.js (3D viewer pentru scanări)

**Backend & Data:**
- **Supabase** (PostgreSQL + Auth + Storage + Real-time)
  - PostgreSQL pentru:
    - Users (pacienți, doctori, admini)
    - Appointments
    - Treatment plans
    - Payments
    - Files metadata
  - Supabase Auth pentru autentificare
  - Supabase Storage pentru file uploads
  - Row Level Security (RLS) pentru permisiuni
- **Prisma ORM** pentru type-safe database access
- **Next.js API routes** pentru business logic
- **Resend** pentru email notifications
- **Twilio** (optional) pentru SMS

**Integrations:**
- droot.ro (CSV import/export via admin dashboard)
- Google Calendar API (sync programări - optional)
- Stripe (pentru plăți online viitoare - out of scope Phase 1)
- Google Drive API (link folder pacient)

**Security:**
- NextAuth.js sau Supabase Auth
- Row Level Security (RLS)
- GDPR compliance (data retention policies)
- SSL/TLS encryption
- Input validation & sanitization
- Rate limiting

#### 5.2.4 Database Schema (Simplified)

```
Users
- id, email, password_hash, role (patient/doctor/admin)
- first_name, last_name, phone, cnp
- created_at, updated_at

Doctors
- id, user_id (FK), bio, certifications, specialties
- profile_image_url

Patients
- id, user_id (FK), droot_patient_id
- medical_history, allergies, notes

Appointments
- id, patient_id (FK), doctor_id (FK)
- service_type, appointment_date, status
- notes, created_at

TreatmentPlans
- id, patient_id (FK), doctor_id (FK)
- title, description, total_price
- amount_paid, amount_remaining, status
- created_at, updated_at

TreatmentItems
- id, treatment_plan_id (FK)
- description, price, status

Payments
- id, treatment_plan_id (FK)
- amount, payment_date, payment_method
- invoice_number

Files
- id, patient_id (FK), uploaded_by (FK to Users)
- file_type (scan_3d, image, document)
- file_url, file_name, file_size
- created_at

Notifications
- id, user_id (FK), type (email/sms)
- subject, message, sent_at, status
```

#### 5.2.5 User Roles & Permissions

| Feature | Public | Patient | Doctor | Admin |
|---------|--------|---------|--------|-------|
| View public pages | ✅ | ✅ | ✅ | ✅ |
| Book appointment | ✅ | ✅ | ✅ | ✅ |
| Login to portal | ❌ | ✅ | ✅ | ✅ |
| View own treatment plan | ❌ | ✅ | ❌ | ✅ |
| View own scans/images | ❌ | ✅ | ❌ | ✅ |
| View own payments | ❌ | ✅ | ❌ | ✅ |
| View all patients | ❌ | ❌ | ✅ | ✅ |
| Upload files for patient | ❌ | ❌ | ✅ | ✅ |
| Create treatment plans | ❌ | ❌ | ✅ | ✅ |
| Import CSV from droot | ❌ | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ❌ | ✅ |
| View analytics | ❌ | ❌ | 📊 (own) | ✅ (all) |

#### 5.2.6 Timeline (Varianta 2)

| Week | Milestone |
|------|-----------|
| W1-2 | Discovery, design mockups (public + portal), database design |
| W3-4 | Development: Public pages (same as V1) |
| W5-6 | Development: Auth system, patient portal dashboard |
| W7-8 | Development: Booking system, calendar integration |
| W9 | Development: Doctor dashboard, file upload |
| W10 | Development: Admin dashboard, CSV import |
| W11 | Development: Notifications system, reminders |
| W12 | Integration testing, droot CSV mapping |
| W13 | User acceptance testing, bug fixes |
| W14 | Launch, training (admin, doctors), handoff |

**Total: 10-14 săptămâni**

#### 5.2.7 Investment (Varianta 2)

| Item | Cost (EUR) |
|------|-----------|
| **All from Varianta 1** | €2,800 - €3,500 |
| **Additional Development** | |
| Auth system & patient portal | €600 - €700 |
| Booking system & calendar | €500 - €600 |
| Doctor dashboard | €300 - €400 |
| Admin dashboard | €300 - €400 |
| droot CSV integration | €200 - €300 |
| File upload & 3D viewer | €400 - €500 |
| Notifications system | €200 - €300 |
| Database design & setup | €200 - €300 |
| **Total Additional** | €2,700 - €3,500 |
| **TOTAL INVESTMENT V2** | **€5,500 - €6,500** |
| **Mentenanță lunară V2** | **€100 - €150** |

**Mentenanță V2 include:**
- Tot din V1 (hosting, CMS, SSL, updates)
- Supabase database hosting
- File storage costs
- Email service (Resend)
- SMS service (opțional, pay-as-you-go)
- Backup & monitoring
- Monthly report extins

#### 5.2.8 Success Metrics (Varianta 2)

| KPI | Target (Month 6) |
|-----|------------------|
| All KPIs from V1 | Same targets |
| **Portal-specific:** | |
| Patient portal registrations | 100-150 patients |
| Online bookings | 70% of total bookings |
| Portal login frequency | 2-3x/month avg |
| Treatment plan views | 80% of patients |
| File uploads (doctor) | 50+ scans/month |
| No-show rate reduction | -40% (thanks to reminders) |
| Administrative time saved | -50% |
| Patient satisfaction | >4.5/5 stars |

---

## 6. Functional Requirements

### 6.1 Functional Requirements - Varianta 1 (Public Website)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| **FR1.1** | **Multi-Language Support** | MUST | Ca vizitator, vreau să văd site-ul în limba mea (RO/HU/EN) pentru a înțelege serviciile |
| FR1.1.1 | Language switcher în header | MUST | Ca vizitator, vreau să schimb limba cu un click |
| FR1.1.2 | Content complet tradus (toate paginile) | MUST | Ca vizitator maghiar, vreau tot site-ul în HU |
| FR1.1.3 | URL structure: /ro/, /hu/, /en/ | SHOULD | Ca vizitator, vreau URL-uri clare per limbă |
| FR1.1.4 | Detect browser language automat | COULD | Ca vizitator, vreau site-ul să-mi detecteze limba |
| **FR1.2** | **Homepage** | MUST | Ca potențial pacient, vreau o primă impresie profesională |
| FR1.2.1 | Hero section cu CTA prominent | MUST | Ca vizitator, vreau să văd imediat cum să programez |
| FR1.2.2 | Servicii featured (top 3-4) | MUST | Ca pacient, vreau să văd rapid ce oferă clinica |
| FR1.2.3 | Testimoniale vizibile | MUST | Ca pacient, vreau să văd opinii reale |
| FR1.2.4 | Before/after gallery preview | SHOULD | Ca pacient, vreau să văd rezultate |
| FR1.2.5 | Trust indicators (certificări, echipamente) | SHOULD | Ca pacient, vreau să știu că sunt în mâini bune |
| **FR1.3** | **Servicii Pages** | MUST | Ca pacient, vreau informații detaliate despre tratamente |
| FR1.3.1 | Pagină per serviciu (8+ servicii) | MUST | Ca pacient, vreau să înțeleg ce include tratamentul |
| FR1.3.2 | Descriere, beneficii, proces tratament | MUST | Ca pacient, vreau să știu la ce să mă aștept |
| FR1.3.3 | Preț indicativ sau "de la X EUR" | SHOULD | Ca pacient, vreau o idee despre cost |
| FR1.3.4 | Before/after specific tratamentului | SHOULD | Ca pacient, vreau să văd rezultate similare cazului meu |
| FR1.3.5 | FAQ per serviciu | COULD | Ca pacient, vreau răspunsuri rapide la întrebări |
| **FR1.4** | **About / Despre** | MUST | Ca pacient, vreau să cunosc echipa |
| FR1.4.1 | Despre clinică (valori, misiune) | MUST | Ca pacient, vreau să înțeleg filosofia clinicii |
| FR1.4.2 | Despre Dr. Răzvan Petric (bio, certificări) | MUST | Ca pacient, vreau să știu experiența medicului |
| FR1.4.3 | Echipamente moderne | SHOULD | Ca pacient, vreau să știu că au tehnologie avansată |
| FR1.4.4 | Echipa medicală (când se va extinde) | SHOULD | Ca pacient, vreau să cunosc toți doctorii |
| **FR1.5** | **Gallery Before/After** | MUST | Ca pacient, vreau să văd rezultate reale |
| FR1.5.1 | Galerie cu slider before/after | MUST | Ca pacient, vreau să compar rezultatele |
| FR1.5.2 | Filtrare per tip tratament | SHOULD | Ca pacient, vreau să văd doar fațete, de ex |
| FR1.5.3 | Lazy loading pentru performance | MUST | Ca vizitator, vreau site rapid |
| **FR1.6** | **Testimoniale** | MUST | Ca pacient, vreau să aud de la alți pacienți |
| FR1.6.1 | Testimoniale text cu nume & poză | MUST | Ca pacient, vreau dovezi reale |
| FR1.6.2 | Video testimoniale (optional) | COULD | Ca pacient, vreau să văd experiențe autentice |
| FR1.6.3 | Rating vizibil (Google Reviews) | SHOULD | Ca pacient, vreau să văd rating-ul general |
| **FR1.7** | **Blog** | MUST | Ca pacient, vreau să învăț despre sănătatea dentară |
| FR1.7.1 | Listing articole (pagination) | MUST | Ca cititor, vreau să navighez ușor articolele |
| FR1.7.2 | Articol individual cu rich text | MUST | Ca cititor, vreau conținut detaliat |
| FR1.7.3 | Categorii (Estetică, Implantologie, etc.) | SHOULD | Ca cititor, vreau să filtrez pe domeniu |
| FR1.7.4 | Search articole | COULD | Ca cititor, vreau să caut un subiect |
| FR1.7.5 | Social share buttons | SHOULD | Ca cititor, vreau să share articole utile |
| FR1.7.6 | Related articles | COULD | Ca cititor, vreau să descopăr conținut similar |
| **FR1.8** | **Contact & Programări** | MUST | Ca pacient, vreau să contactez clinica ușor |
| FR1.8.1 | Contact form (nume, email, telefon, mesaj) | MUST | Ca pacient, vreau să trimit o întrebare |
| FR1.8.2 | Programare simplă (nume, telefon, serviciu, dată preferată) | MUST | Ca pacient, vreau să solicit o programare |
| FR1.8.3 | Google Maps embed cu locația | MUST | Ca pacient, vreau să găsesc clinica |
| FR1.8.4 | Program afișat clar | MUST | Ca pacient, vreau să știu când pot veni |
| FR1.8.5 | Telefon click-to-call (mobile) | MUST | Ca pacient mobil, vreau să sun cu un tap |
| FR1.8.6 | WhatsApp click-to-chat | SHOULD | Ca pacient, vreau să întreb rapid pe WhatsApp |
| FR1.8.7 | Email confirmation după submit form | MUST | Ca pacient, vreau confirmare că au primit mesajul |
| **FR1.9** | **SEO & Performance** | MUST | Ca owner, vreau vizibilitate pe Google |
| FR1.9.1 | Meta tags optimizate per pagină | MUST | Ca owner, vreau ranking bun pe Google |
| FR1.9.2 | Schema markup (LocalBusiness, Service) | MUST | Ca owner, vreau să apar în Google Maps |
| FR1.9.3 | Sitemap XML | MUST | Ca owner, vreau Google să indexeze tot site-ul |
| FR1.9.4 | Robots.txt optimizat | MUST | Ca owner, vreau control indexare |
| FR1.9.5 | Page load <2s (mobile) | MUST | Ca vizitator, vreau site rapid |
| FR1.9.6 | Image optimization (WebP, lazy load) | MUST | Ca vizitator mobil, vreau să nu consum mult data |
| **FR1.10** | **Analytics & Tracking** | MUST | Ca owner, vreau să măsur performanța |
| FR1.10.1 | Google Analytics 4 | MUST | Ca owner, vreau să văd trafic și comportament |
| FR1.10.2 | Google Tag Manager | MUST | Ca owner, vreau să adaug tracking ușor |
| FR1.10.3 | Facebook Pixel | SHOULD | Ca owner, vreau să fac retargeting |
| FR1.10.4 | Event tracking (form submits, calls, WhatsApp) | MUST | Ca owner, vreau să văd conversii |
| **FR1.11** | **CMS pentru Echipa** | MUST | Ca admin, vreau să actualizez conținut fără developer |
| FR1.11.1 | Interface simplu pentru blog posts | MUST | Ca admin, vreau să public articole singur |
| FR1.11.2 | Upload imagini pentru galerie | SHOULD | Ca admin, vreau să adaug before/after |
| FR1.11.3 | Actualizare testimoniale | SHOULD | Ca admin, vreau să adaug reviews noi |
| FR1.11.4 | Actualizare prețuri servicii | SHOULD | Ca admin, vreau să modific prețuri când se schimbă |

---

### 6.2 Functional Requirements - Varianta 2 (Additional Features)

| ID | Requirement | Priority | User Story |
|----|-------------|----------|------------|
| **FR2.1** | **Authentication & Authorization** | MUST | Ca pacient, vreau cont securizat pentru datele mele |
| FR2.1.1 | Register pacient (email, password) | MUST | Ca pacient nou, vreau să-mi creez cont |
| FR2.1.2 | Login pacient | MUST | Ca pacient, vreau să mă autentific |
| FR2.1.3 | Password reset (forgot password) | MUST | Ca pacient, vreau să-mi recuperez parola |
| FR2.1.4 | Email verification la signup | SHOULD | Ca admin, vreau să verific emailuri valide |
| FR2.1.5 | Role-based access (Patient, Doctor, Admin) | MUST | Ca admin, vreau control granular |
| FR2.1.6 | Session management & auto-logout | MUST | Ca pacient, vreau securitate |
| **FR2.2** | **Patient Portal - Dashboard** | MUST | Ca pacient autentificat, vreau să văd toate info mele |
| FR2.2.1 | Overview dashboard (programări, notificări) | MUST | Ca pacient, vreau să văd imediat ce e important |
| FR2.2.2 | Informații profil (edit) | MUST | Ca pacient, vreau să-mi actualizez datele |
| FR2.2.3 | Istoric medical vizibil | SHOULD | Ca pacient, vreau să văd ce tratamente am făcut |
| FR2.2.4 | Programări viitoare și istoric | MUST | Ca pacient, vreau să știu când am programări |
| **FR2.3** | **Patient Portal - Treatment Plans** | MUST | Ca pacient, vreau transparență asupra tratamentului |
| FR2.3.1 | Lista planuri de tratament (active, finalizate) | MUST | Ca pacient, vreau să văd toate planurile mele |
| FR2.3.2 | Detalii plan (descriere, preț total, items) | MUST | Ca pacient, vreau să înțeleg ce include |
| FR2.3.3 | Breakdown per procedură cu preț individual | MUST | Ca pacient, vreau transparență prețuri |
| FR2.3.4 | Status plăți (achitat, restant) | MUST | Ca pacient, vreau să știu cât am de plată |
| FR2.3.5 | Istoric plăți (data, sumă, metodă) | MUST | Ca pacient, vreau să văd ce am achitat |
| FR2.3.6 | Download invoice PDF | SHOULD | Ca pacient, vreau factură pentru contabilitate |
| **FR2.4** | **Patient Portal - Files & Scans** | MUST | Ca pacient, vreau acces la scanările mele |
| FR2.4.1 | Galerie imagini diagnostice personale | MUST | Ca pacient, vreau să văd radiografiile |
| FR2.4.2 | Vizualizare scanări 3D în browser | MUST | Ca pacient, vreau să rotesc și văd scanarea |
| FR2.4.3 | Download fișiere (cu watermark opțional) | SHOULD | Ca pacient, vreau să salvez scanările |
| FR2.4.4 | Organizare per tratament | SHOULD | Ca pacient, vreau să văd scanări grouped by treatment |
| **FR2.5** | **Online Booking System** | MUST | Ca pacient, vreau să programez online 24/7 |
| FR2.5.1 | Calendar cu disponibilitate real-time | MUST | Ca pacient, vreau să văd sloturi disponibile |
| FR2.5.2 | Alegere doctor (când vor fi mai mulți) | SHOULD | Ca pacient, vreau să aleg medicul preferat |
| FR2.5.3 | Alegere serviciu din listă | MUST | Ca pacient, vreau să specific ce tratament doresc |
| FR2.5.4 | Alegere slot orar (30min/1h intervals) | MUST | Ca pacient, vreau să aleg ora convenabilă |
| FR2.5.5 | Confirmare instant prin email | MUST | Ca pacient, vreau dovadă programării |
| FR2.5.6 | Reprogramare online | SHOULD | Ca pacient, vreau să schimb programarea singur |
| FR2.5.7 | Anulare online (cu deadline) | SHOULD | Ca pacient, vreau să anulez dacă nu pot veni |
| FR2.5.8 | Prevent double booking | MUST | Ca admin, vreau să nu existe suprapuneri |
| **FR2.6** | **Notifications & Reminders** | MUST | Ca pacient, vreau să nu uit de programări |
| FR2.6.1 | Email confirmare programare | MUST | Ca pacient, vreau confirmare instant |
| FR2.6.2 | Email reminder cu 24h înainte | MUST | Ca pacient, vreau reminder automat |
| FR2.6.3 | SMS reminder (opțional) | COULD | Ca pacient, vreau și SMS dacă am dat opt-in |
| FR2.6.4 | Email după completare tratament | SHOULD | Ca pacient, vreau să știu next steps |
| FR2.6.5 | Email pentru review/testimonial | COULD | Ca owner, vreau să cer feedback |
| FR2.6.6 | Notificări în portal (bell icon) | SHOULD | Ca pacient autentificat, vreau notificări in-app |
| **FR2.7** | **Doctor Dashboard** | MUST | Ca doctor, vreau să gestionez pacienții eficient |
| FR2.7.1 | Listă pacienți (search, filter) | MUST | Ca doctor, vreau să găsesc rapid un pacient |
| FR2.7.2 | Vizualizare detalii pacient | MUST | Ca doctor, vreau să văd istoric complet |
| FR2.7.3 | Vizualizare program zilnic | MUST | Ca doctor, vreau să știu cine vine azi |
| FR2.7.4 | Upload fișiere pentru pacient (imagini, scanări) | MUST | Ca doctor, vreau să încarc rezultate |
| FR2.7.5 | Actualizare status tratament | SHOULD | Ca doctor, vreau să marcez progress |
| FR2.7.6 | Adaugă notițe la pacient | SHOULD | Ca doctor, vreau să documentez observații |
| FR2.7.7 | Vizualizare rapoarte personale | COULD | Ca doctor, vreau să văd statistici (tratamente, venituri) |
| **FR2.8** | **Admin Dashboard** | MUST | Ca admin, vreau control complet asupra platformei |
| FR2.8.1 | Gestionare utilizatori (add, edit, delete) | MUST | Ca admin, vreau să gestionez conturi |
| FR2.8.2 | Gestionare servicii și prețuri | MUST | Ca admin, vreau să actualizez oferta |
| FR2.8.3 | Gestionare programări (view all, edit, cancel) | MUST | Ca admin, vreau să rezolv conflicte |
| FR2.8.4 | Import CSV din droot (pacienți, tratamente) | MUST | Ca admin, vreau să migrez datele ușor |
| FR2.8.5 | Export date (pentru backup sau rapoarte) | SHOULD | Ca admin, vreau să export date când am nevoie |
| FR2.8.6 | Rapoarte și analytics | MUST | Ca admin, vreau să văd performance |
| FR2.8.7 | Configurare notificări (templates, timing) | SHOULD | Ca admin, vreau să customizez mesajele |
| **FR2.9** | **droot.ro Integration (CSV)** | MUST | Ca admin, vreau să sincronizez cu software-ul existent |
| FR2.9.1 | Import CSV pacienți (bulk) | MUST | Ca admin, vreau să aduc pacienții existenți |
| FR2.9.2 | Import CSV planuri tratament | MUST | Ca admin, vreau să import datele tratamentelor |
| FR2.9.3 | Import CSV plăți | MUST | Ca admin, vreau să sincronizez plățile |
| FR2.9.4 | CSV template download | MUST | Ca admin, vreau să știu formatul corect |
| FR2.9.5 | Validation & error handling la import | MUST | Ca admin, vreau să văd ce a mers greșit |
| FR2.9.6 | Export programări din Dentcraft → CSV | SHOULD | Ca admin, vreau să aduc programările în droot |
| **FR2.10** | **Analytics & Reporting (Advanced)** | SHOULD | Ca owner, vreau insights business |
| FR2.10.1 | Dashboard KPI-uri (leads, conversii, revenue) | MUST | Ca owner, vreau overview financiar |
| FR2.10.2 | Lead source tracking | MUST | Ca owner, vreau să știu de unde vin pacienții |
| FR2.10.3 | Conversion funnel (visit → booking → treatment) | SHOULD | Ca owner, vreau să optimizez conversiile |
| FR2.10.4 | Revenue per treatment type | SHOULD | Ca owner, vreau să știu ce servicii sunt profitabile |
| FR2.10.5 | Patient retention & lifetime value | COULD | Ca owner, vreau să măsur loialitatea |
| FR2.10.6 | Appointment show/no-show rates | SHOULD | Ca owner, vreau să reduc absențele |
| FR2.10.7 | Export rapoarte (PDF, Excel) | COULD | Ca owner, vreau să prezint date stakeholderilor |

---

## 7. Non-Functional Requirements

### 7.1 Performance

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-P1 | Page load time (mobile) | <2 seconds | Google PageSpeed Insights |
| NFR-P2 | Page load time (desktop) | <1.5 seconds | Google PageSpeed Insights |
| NFR-P3 | Time to Interactive (TTI) | <3 seconds | Lighthouse |
| NFR-P4 | First Contentful Paint (FCP) | <1 second | Lighthouse |
| NFR-P5 | Largest Contentful Paint (LCP) | <2.5 seconds | Core Web Vitals |
| NFR-P6 | Cumulative Layout Shift (CLS) | <0.1 | Core Web Vitals |
| NFR-P7 | Image optimization | WebP format, lazy loading | Manual check |
| NFR-P8 | API response time (V2) | <500ms (95th percentile) | APM tool |
| NFR-P9 | Database query optimization (V2) | <100ms per query | Database monitoring |
| NFR-P10 | 3D scan viewer load (V2) | <3 seconds for 10MB file | Manual test |

### 7.2 Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-S1 | Concurrent users (V1) | Support 500 concurrent visitors |
| NFR-S2 | Concurrent users (V2) | Support 200 concurrent portal users |
| NFR-S3 | Database scalability (V2) | Support 10,000+ patients, 100,000+ appointments |
| NFR-S4 | File storage (V2) | Support 500GB+ (scanări, imagini) |
| NFR-S5 | Horizontal scaling | Auto-scale on Vercel based on traffic |

### 7.3 Availability & Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-A1 | Uptime | 99.5% (max 3.6h downtime/month) |
| NFR-A2 | Backup frequency (V2) | Daily automated backups (database + files) |
| NFR-A3 | Disaster recovery (V2) | <24h recovery time |
| NFR-A4 | Error monitoring | Real-time alerts for critical errors |

### 7.4 Security

| ID | Requirement | Details |
|----|-------------|---------|
| NFR-SE1 | HTTPS/SSL | Mandatory for entire site |
| NFR-SE2 | Authentication (V2) | Secure password hashing (bcrypt), session management |
| NFR-SE3 | Authorization (V2) | Row Level Security (RLS) în Supabase |
| NFR-SE4 | Input validation | All user inputs sanitized & validated |
| NFR-SE5 | Rate limiting | Prevent brute force attacks (login, forms) |
| NFR-SE6 | Data encryption (V2) | Sensitive data encrypted at rest |
| NFR-SE7 | GDPR compliance | Cookie consent, privacy policy, data export/delete |
| NFR-SE8 | File upload security (V2) | Virus scanning, file type validation |
| NFR-SE9 | XSS protection | Content Security Policy (CSP) headers |
| NFR-SE10 | SQL injection protection | Parameterized queries via Prisma ORM |

### 7.5 Usability

| ID | Requirement | Details |
|----|-------------|---------|
| NFR-U1 | Responsive design | Mobile-first, support phones, tablets, desktops |
| NFR-U2 | Browser support | Chrome, Safari, Firefox, Edge (last 2 versions) |
| NFR-U3 | Accessibility | WCAG 2.1 Level AA compliance |
| NFR-U4 | Multi-language | RO/HU/EN, seamless switching |
| NFR-U5 | User-friendly errors | Clear error messages în limba utilizatorului |
| NFR-U6 | Loading states | Skeleton loaders, progress indicators |
| NFR-U7 | Offline fallback | Service worker pentru basic offline access |

### 7.6 Maintainability

| ID | Requirement | Details |
|----|-------------|---------|
| NFR-M1 | Code quality | TypeScript strict mode, ESLint, Prettier |
| NFR-M2 | Documentation | README, API docs, deployment guide |
| NFR-M3 | Version control | Git with meaningful commits, branching strategy |
| NFR-M4 | CI/CD | Automated deploy on Vercel (preview + production) |
| NFR-M5 | Monitoring | Error tracking (Sentry), analytics |
| NFR-M6 | CMS training | Admin gets training for content updates |

### 7.7 SEO

| ID | Requirement | Details |
|----|-------------|---------|
| NFR-SEO1 | Meta tags | Unique per page, optimized for keywords |
| NFR-SEO2 | Schema markup | LocalBusiness, Dentist, Service, FAQ |
| NFR-SEO3 | Sitemap | XML sitemap auto-generated |
| NFR-SEO4 | Robots.txt | Optimized for crawlers |
| NFR-SEO5 | Canonical URLs | Prevent duplicate content |
| NFR-SEO6 | Open Graph | Social sharing optimized |
| NFR-SEO7 | Alt text | All images have descriptive alt text |
| NFR-SEO8 | URL structure | Clean, readable URLs (e.g., /ro/servicii/fatete) |

---

## 8. Technical Architecture

### 8.1 High-Level Architecture (Varianta 2)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                    │
│  Public Visitors │ Patients │ Doctors │ Admins                  │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js 14+ (App Router) - React 18+ - TypeScript       │  │
│  │                                                           │  │
│  │  Public Pages   │  Patient Portal │  Doctor  │  Admin   │  │
│  │  (SSG/SSR)      │  (Client-side)  │  Portal  │  Portal  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Styling: Tailwind CSS + shadcn/ui                              │
│  State: Zustand + React Query                                   │
│  Multi-lang: next-intl                                          │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Next.js API Routes (Serverless)                   │  │
│  │                                                           │  │
│  │  /api/auth/*        - Authentication                     │  │
│  │  /api/appointments  - Booking management                 │  │
│  │  /api/patients      - Patient CRUD                       │  │
│  │  /api/treatments    - Treatment plans                    │  │
│  │  /api/files         - File uploads                       │  │
│  │  /api/notifications - Email/SMS triggers                 │  │
│  │  /api/admin/*       - CSV import, analytics              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Business Logic: TypeScript services                            │
│  Validation: Zod schemas                                        │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                    │
│                                                                  │
│  ┌─────────────────────┐  ┌──────────────────┐                 │
│  │   Supabase          │  │  Sanity.io CMS   │                 │
│  │                     │  │                  │                 │
│  │ • PostgreSQL        │  │ • Blog posts     │                 │
│  │ • Auth (JWT)        │  │ • Services       │                 │
│  │ • Storage (S3-like) │  │ • Testimonials   │                 │
│  │ • Real-time         │  │ • Translations   │                 │
│  │ • Row Level Security│  └──────────────────┘                 │
│  └─────────────────────┘                                        │
│                                                                  │
│  ORM: Prisma (type-safe queries)                                │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 EXTERNAL INTEGRATIONS                            │
│                                                                  │
│  • Resend (Email notifications)                                 │
│  • Twilio (SMS - optional)                                      │
│  • Google Maps API (location)                                   │
│  • Google Analytics 4 (tracking)                                │
│  • Facebook Pixel (retargeting)                                 │
│  • droot.ro (CSV export/import - manual)                        │
│  • Google Drive API (optional - file linking)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  HOSTING & INFRASTRUCTURE                        │
│                                                                  │
│  • Vercel (Next.js hosting + CI/CD)                             │
│  • Cloudflare (CDN + DNS)                                       │
│  • GitHub (version control + CI/CD trigger)                     │
│  • Supabase Cloud (database + auth + storage)                   │
│  • Sentry (error monitoring - optional)                         │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Technology Stack Details

#### 8.2.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ | React framework (App Router, SSR/SSG, API routes) |
| React | 18+ | UI library |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 3+ | Utility-first CSS |
| shadcn/ui | Latest | Accessible component library |
| Radix UI | Latest | Headless UI primitives (via shadcn) |
| Framer Motion | 11+ | Animations |
| next-intl | 3+ | Internationalization (RO/HU/EN) |
| React Hook Form | 7+ | Form handling |
| Zod | 3+ | Schema validation |
| Zustand | 4+ | State management |
| React Query (TanStack Query) | 5+ | Data fetching & caching |
| Three.js | Latest | 3D scan viewer |
| React Three Fiber | Latest | React wrapper for Three.js |

#### 8.2.2 Backend & Data

| Technology | Version | Purpose |
|------------|---------|---------|
| Supabase | Latest | Backend-as-a-Service (PostgreSQL, Auth, Storage, Real-time) |
| PostgreSQL | 15+ | Relational database |
| Prisma | 5+ | ORM for type-safe database access |
| NextAuth.js (alternative) | 4+ | Authentication (alternative to Supabase Auth) |
| Resend | Latest | Transactional email service |
| Twilio | Latest | SMS notifications (optional) |
| Sanity.io | v3 | Headless CMS (blog, services, content) |

#### 8.2.3 DevOps & Tools

| Technology | Purpose |
|------------|---------|
| Vercel | Hosting, CI/CD, serverless functions |
| GitHub | Version control, collaboration |
| GitHub Actions | Automated testing, deployment |
| Cloudflare | CDN, DNS management |
| ESLint | Code linting |
| Prettier | Code formatting |
| Husky | Git hooks (pre-commit linting) |
| Sentry (optional) | Error tracking & monitoring |

#### 8.2.4 Third-Party APIs

| Service | Purpose |
|---------|---------|
| Google Maps API | Embed map, location |
| Google Analytics 4 | Web analytics |
| Google Tag Manager | Tag management |
| Facebook Pixel | Ad tracking, retargeting |
| Google Drive API (optional) | Link patient files from Drive |
| droot.ro | Manual CSV export/import |

### 8.3 Database Schema (Detailed - Varianta 2)

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- nullable for social login
  role VARCHAR(20) NOT NULL CHECK (role IN ('patient', 'asistent', 'doctor', 'admin')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  language VARCHAR(5) DEFAULT 'ro' CHECK (language IN ('ro', 'hu', 'en')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Patients Table
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  droot_patient_id VARCHAR(50) UNIQUE, -- ID from droot.ro
  cnp VARCHAR(13),
  date_of_birth DATE,
  address TEXT,
  medical_history TEXT,
  allergies TEXT,
  notes TEXT, -- doctor notes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Doctors Table
```sql
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  certifications TEXT[], -- array of certifications
  specialties TEXT[], -- array of specialties
  profile_image_url TEXT,
  calendar_color VARCHAR(7), -- hex color for calendar
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Services Table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ro VARCHAR(255) NOT NULL,
  name_hu VARCHAR(255),
  name_en VARCHAR(255),
  description_ro TEXT,
  description_hu TEXT,
  description_en TEXT,
  price_from DECIMAL(10, 2), -- indicative price
  duration_minutes INTEGER, -- typical duration
  category VARCHAR(100), -- e.g., "Estetică", "Implantologie"
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Appointments Table
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id),
  service_id UUID REFERENCES services(id),
  appointment_date TIMESTAMP NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  reminder_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(doctor_id, appointment_date) -- prevent double booking
);
```

#### Treatment Plans Table
```sql
CREATE TABLE treatment_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  amount_remaining DECIMAL(10, 2) GENERATED ALWAYS AS (total_price - amount_paid) STORED,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Treatment Items Table
```sql
CREATE TABLE treatment_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  treatment_plan_id UUID REFERENCES treatment_plans(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  description VARCHAR(255),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  treatment_plan_id UUID REFERENCES treatment_plans(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50), -- e.g., "cash", "card", "transfer"
  invoice_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Files Table
```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id), -- doctor or admin
  file_type VARCHAR(20) CHECK (file_type IN ('scan_3d', 'xray', 'photo', 'document')),
  file_url TEXT NOT NULL, -- Supabase Storage URL
  file_name VARCHAR(255),
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  treatment_plan_id UUID REFERENCES treatment_plans(id), -- optional link to treatment
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) CHECK (type IN ('email', 'sms', 'in_app')),
  subject VARCHAR(255),
  message TEXT,
  sent_at TIMESTAMP,
  read_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  metadata JSONB, -- e.g., appointment_id, email_id
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### CSV Import Logs Table (Admin)
```sql
CREATE TABLE csv_import_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  imported_by UUID REFERENCES users(id),
  file_name VARCHAR(255),
  import_type VARCHAR(50), -- 'patients', 'treatments', 'payments'
  total_rows INTEGER,
  successful_rows INTEGER,
  failed_rows INTEGER,
  error_log TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 8.4 Security Architecture

#### 8.4.1 Authentication Flow (Varianta 2)

```
1. User Registration:
   Email/Password → Hash password (bcrypt) → Create user in Supabase Auth
   → Send verification email → User verifies → Account active

2. User Login:
   Email/Password → Supabase Auth → JWT token → Store in httpOnly cookie
   → Client receives session

3. Session Management:
   Every API request → Validate JWT → Check role → Apply RLS → Return data

4. Password Reset:
   Forgot password → Email with token → Reset page → New password → Update
```

#### 8.4.2 Row Level Security (RLS) Policies

**Patients Table:**
```sql
-- Patients can only read their own data
CREATE POLICY patient_read_own ON patients
  FOR SELECT USING (auth.uid() = user_id);

-- Doctors can read all patients
CREATE POLICY doctor_read_all ON patients
  FOR SELECT USING (auth.role() = 'doctor');

-- Admins can do everything
CREATE POLICY admin_full_access ON patients
  FOR ALL USING (auth.role() = 'admin');
```

**Treatment Plans:**
```sql
-- Patients can only see their own treatment plans
CREATE POLICY patient_read_own_plans ON treatment_plans
  FOR SELECT USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Doctors can see all treatment plans
CREATE POLICY doctor_read_all_plans ON treatment_plans
  FOR SELECT USING (auth.role() = 'doctor');
```

**Files:**
```sql
-- Patients can only see their own files
CREATE POLICY patient_read_own_files ON files
  FOR SELECT USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Doctors can see and upload files
CREATE POLICY doctor_manage_files ON files
  FOR ALL USING (auth.role() = 'doctor');
```

#### 8.4.3 File Upload Security

```
1. Validation:
   - File type whitelist (JPEG, PNG, PDF, STL, PLY)
   - Max file size (50MB for scans, 10MB for images)
   - Virus scanning (ClamAV integration - optional)

2. Storage:
   - Supabase Storage with private buckets
   - Signed URLs with expiration (24h)
   - Path structure: /patients/{patient_id}/{file_type}/{filename}

3. Access Control:
   - RLS on storage bucket
   - Pre-signed URL generation per request
   - Watermark on downloads (optional)
```

### 8.5 API Design (Varianta 2)

#### 8.5.1 REST API Endpoints

**Authentication:**
```
POST   /api/auth/register        - Register new patient
POST   /api/auth/login           - Login (email/password)
POST   /api/auth/logout          - Logout
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password with token
GET    /api/auth/me              - Get current user
```

**Patients:**
```
GET    /api/patients             - List patients (doctors/admins only)
GET    /api/patients/:id         - Get patient details
PATCH  /api/patients/:id         - Update patient info
DELETE /api/patients/:id         - Delete patient (admin only)
```

**Appointments:**
```
GET    /api/appointments                 - List appointments (filtered by role)
POST   /api/appointments                 - Create new appointment
GET    /api/appointments/:id             - Get appointment details
PATCH  /api/appointments/:id             - Update appointment (reschedule)
DELETE /api/appointments/:id             - Cancel appointment
GET    /api/appointments/availability    - Get available slots for booking
```

**Treatment Plans:**
```
GET    /api/treatment-plans              - List treatment plans
POST   /api/treatment-plans              - Create treatment plan (doctor/admin)
GET    /api/treatment-plans/:id          - Get plan details
PATCH  /api/treatment-plans/:id          - Update plan
DELETE /api/treatment-plans/:id          - Delete plan (admin only)
POST   /api/treatment-plans/:id/payments - Add payment
```

**Files:**
```
GET    /api/files                - List files (per patient)
POST   /api/files/upload         - Upload file
GET    /api/files/:id            - Get file URL (signed)
DELETE /api/files/:id            - Delete file (doctor/admin)
```

**Admin:**
```
POST   /api/admin/csv-import     - Import CSV (patients/treatments/payments)
GET    /api/admin/analytics      - Get KPI dashboard data
GET    /api/admin/reports/export - Export data (CSV/Excel)
```

#### 8.5.2 API Response Format

**Success:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Email is required" }
    ]
  }
}
```

---

## 9. User Roles & Permissions

### 9.1 Role Definitions

| Role | Description | Access Level |
|------|-------------|--------------|
| **Public** | Neautentificat | Public pages, contact forms, booking request |
| **Patient** | Pacient înregistrat | Portal acces, propriile date, programări |
| **Asistent** | Asistent medical/Recepție | Programări, listă pacienți (basic), schedule |
| **Doctor** | Medic dentist | Toți pacienții, upload files, treatment plans |
| **Admin** | Administrator clinică | Full access, CSV import, analytics, config |

### 9.2 Permissions Matrix

| Feature | Public | Patient | Asistent | Doctor | Admin |
|---------|--------|---------|----------|--------|-------|
| **Public Website** |
| View pages | ✅ | ✅ | ✅ | ✅ | ✅ |
| View blog | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit contact form | ✅ | ✅ | ✅ | ✅ | ✅ |
| Request appointment (simple) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Authentication** |
| Register account | ✅ | - | - | - | - |
| Login | - | ✅ | ✅ | ✅ | ✅ |
| **Patient Portal** |
| View own profile | - | ✅ | - | - | - |
| Edit own profile | - | ✅ | - | - | - |
| View own treatment plans | - | ✅ | ❌ | - | ✅ |
| View own files (scans, images) | - | ✅ | ❌ | - | ✅ |
| View own payments | - | ✅ | ❌ | - | ✅ |
| Download own files | - | ✅ | ❌ | - | ✅ |
| View own appointments | - | ✅ | - | - | ✅ |
| Book new appointment (advanced) | - | ✅ | ✅ | ✅ | ✅ |
| Reschedule own appointment | - | ✅ | ✅ | ✅ | ✅ |
| Cancel own appointment | - | ✅ | ✅ | ✅ | ✅ |
| **Asistent/Reception Dashboard** |
| View patient list (basic info only) | - | - | ✅ | ✅ | ✅ |
| View daily appointment schedule | - | - | ✅ | ✅ | ✅ |
| Book appointments for patients | - | - | ✅ | ✅ | ✅ |
| Reschedule appointments | - | - | ✅ | ✅ | ✅ |
| Cancel appointments | - | - | ✅ | ✅ | ✅ |
| Send appointment reminders | - | - | ✅ | ✅ | ✅ |
| **Doctor Dashboard** |
| View all patient details | - | - | ❌ | ✅ | ✅ |
| Create treatment plan | - | - | ❌ | ✅ | ✅ |
| Update treatment plan | - | - | ❌ | ✅ | ✅ |
| Upload files for patient | - | - | ❌ | ✅ | ✅ |
| Add medical notes to patient | - | - | ❌ | ✅ | ✅ |
| View patient financial details | - | - | ❌ | ✅ | ✅ |
| View own statistics | - | - | - | ✅ | ✅ |
| **Admin Dashboard** |
| View all users | - | - | - | - | ✅ |
| Create/edit/delete users | - | - | - | - | ✅ |
| Manage services & pricing | - | - | - | - | ✅ |
| Import CSV from droot | - | - | - | - | ✅ |
| Export data (CSV, reports) | - | - | - | - | ✅ |
| View full analytics | - | - | - | - | ✅ |
| Configure notifications | - | - | - | - | ✅ |
| Manage blog (via CMS) | - | - | - | - | ✅ |
| Manage all appointments | - | - | - | - | ✅ |

---

## 10. Data Requirements

### 10.1 Data Collection

#### 10.1.1 Patient Data (Varianta 2)
- **Personal Information:**
  - Nume, prenume
  - CNP (optional, for invoicing)
  - Data nașterii
  - Email
  - Telefon
  - Adresă
- **Medical Information:**
  - Istoric medical (alergii, condiții)
  - Tratamente anterioare
  - Notițe doctor
- **Account Information:**
  - Email (username)
  - Password (hashed)
  - Limba preferată (RO/HU/EN)

#### 10.1.2 Treatment Data
- Plan de tratament (titlu, descriere)
- Items tratament (proceduri, prețuri)
- Status (draft, activ, completat)
- Plăți (sumă, dată, metodă)
- Fișiere asociate (scanări, imagini)

#### 10.1.3 Appointment Data
- Pacient, Doctor, Serviciu
- Dată și oră
- Durata
- Status (scheduled, confirmed, completed, cancelled, no-show)
- Notițe

#### 10.1.4 Files & Media
- Scanări 3D (.STL, .PLY)
- Imagini diagnostice (JPEG, PNG)
- Radiografii (JPEG, DICOM - optional)
- Documente (PDF)

### 10.2 Data Retention & GDPR

| Data Type | Retention Period | Justification |
|-----------|------------------|---------------|
| Patient medical records | 10 ani după ultimul tratament | Cerință legală medicală România |
| Payment records | 7 ani | Cerință fiscală |
| Appointment history | 5 ani | Business analytics |
| Marketing consents | Până la retragere | GDPR |
| Session logs | 90 zile | Security audit |
| Error logs | 30 zile | Debugging |

### 10.3 Data Privacy & GDPR Compliance

#### GDPR Requirements:
1. **Consent:**
   - Cookie consent banner (strict, analytics, marketing)
   - Email marketing opt-in (explicit)
   - SMS notifications opt-in

2. **Right to Access:**
   - Pacienții pot exporta datele lor (JSON/PDF)
   - Admin poate genera raport complet per pacient

3. **Right to be Forgotten:**
   - Pacienții pot solicita ștergerea datelor
   - Admin poate anonimiza datele (păstrare medical records dar anonimizate)

4. **Data Portability:**
   - Export în format standard (JSON, CSV)

5. **Privacy Policy:**
   - Pagină dedicată cu politica de confidențialitate
   - Ultima actualizare vizibilă
   - Link în footer

6. **Terms of Service:**
   - Termeni și condiții utilizare portal
   - Acceptare la înregistrare

### 10.4 Backup Strategy (Varianta 2)

| Resource | Backup Frequency | Retention |
|----------|------------------|-----------|
| Database (Supabase) | Daily (automated) | 30 zile |
| Files (Supabase Storage) | Daily (automated) | 30 zile |
| Manual snapshots | Weekly (manual) | 90 zile |

---

## 11. Integration Specifications

### 11.1 droot.ro Integration (CSV-Based)

#### 11.1.1 Import Flow

```
1. Admin exportă CSV din droot.ro
2. Admin accesează Admin Dashboard → CSV Import
3. Upload CSV file (validate format)
4. Preview import (table with data to be imported)
5. Confirm import
6. System processes CSV:
   - Validate each row
   - Create/update records în database
   - Log successes & errors
7. Display import summary (X successful, Y failed)
8. Download error log (if any)
```

#### 11.1.2 CSV Format - Patients

```csv
droot_patient_id,first_name,last_name,email,phone,cnp,date_of_birth,address,medical_history,allergies
PAT001,Ion,Popescu,ion@example.com,0721234567,1900101123456,1990-01-01,"Str. Libertatii 10, Satu Mare",Diabet,Penicilin
PAT002,Maria,Ionescu,maria@example.com,0722345678,2850202234567,1985-02-02,"Str. Victoriei 20, Satu Mare",,
```

**Fields:**
- `droot_patient_id` (required, unique) - ID din droot
- `first_name, last_name` (required)
- `email` (required, unique)
- `phone` (optional)
- `cnp` (optional)
- `date_of_birth` (optional, format: YYYY-MM-DD)
- `address` (optional)
- `medical_history` (optional)
- `allergies` (optional)

#### 11.1.3 CSV Format - Treatment Plans

```csv
droot_patient_id,treatment_title,treatment_description,total_price,amount_paid,status,start_date
PAT001,Plan Estetica Dentara,Fatete ceramica 10 dinti,15000,5000,active,2024-10-01
PAT002,Implant molar,Implant + coroana,3500,3500,completed,2024-08-15
```

**Fields:**
- `droot_patient_id` (required, FK)
- `treatment_title` (required)
- `treatment_description` (optional)
- `total_price` (required, decimal)
- `amount_paid` (default 0)
- `status` (draft|active|completed)
- `start_date` (optional, YYYY-MM-DD)

#### 11.1.4 CSV Format - Treatment Items (Detailed)

```csv
droot_patient_id,treatment_plan_id,service_name,description,quantity,unit_price,status
PAT001,TRT001,Fatete Ceramica,Fateta incisiv central superior,2,1500,completed
PAT001,TRT001,Fatete Ceramica,Fateta incisiv lateral superior,2,1500,in_progress
```

#### 11.1.5 Export Flow (Dentcraft → droot)

```
1. Admin accesează Admin Dashboard → Export Appointments
2. Select date range (e.g., last week)
3. Generate CSV
4. Download CSV
5. Admin importă manual în droot.ro
```

**CSV Format - Appointments Export:**
```csv
patient_name,patient_email,patient_phone,doctor_name,service,appointment_date,duration_minutes,status
Ion Popescu,ion@example.com,0721234567,Dr. Razvan Petric,Control,2024-10-25 10:00,30,confirmed
```

### 11.2 Email Integration (Resend)

#### Templates:
1. **Confirmare programare**
   - Subject: "Programare confirmată - Dentcraft"
   - Content: Detalii programare, data, ora, doctor, serviciu, link anulare/reprogramare

2. **Reminder programare (24h înainte)**
   - Subject: "Reminder: Programarea ta mâine la Dentcraft"
   - Content: Detalii programare, link reprogramare/anulare, telefon clinică

3. **Welcome email (înregistrare pacient)**
   - Subject: "Bine ai venit la Dentcraft!"
   - Content: Link verificare email, cum să folosești portalul

4. **Completare tratament**
   - Subject: "Tratamentul tău a fost finalizat"
   - Content: Detalii tratament, next steps, link portal pentru vizualizare

5. **Request review** (opțional)
   - Subject: "Cum a fost experiența ta la Dentcraft?"
   - Content: Link review Google, testimonial request

### 11.3 SMS Integration (Twilio - Optional)

#### Use Cases:
- Reminder programare cu 24h înainte
- Confirmare programare (pe lângă email)
- Notificări urgențe (schimbări program doctor)

**Costuri estimative:** €0.05/SMS × 200 SMS/lună = €10/lună (optional)

### 11.4 Google Maps API

- Embed map pe pagina Contact
- Link "Directions" către Google Maps
- Display business hours
- API Key restricționat la domeniu dentcraft.ro

### 11.5 Google Analytics 4 & Tag Manager

**Events to Track:**
- Page views (toate paginile)
- Form submissions (contact, booking)
- Phone clicks (click-to-call)
- WhatsApp clicks
- Service page views
- Blog article views
- File downloads (patient portal - V2)
- Booking completions (V2)
- Registration (V2)

**Custom Dimensions:**
- User role (public, patient, doctor, admin)
- Language (ro, hu, en)
- Service type (când aplică)

### 11.6 Social Media Integration

- Facebook Pixel pentru retargeting
- Open Graph tags pentru sharing
- Instagram feed embed (opțional, homepage)
- Social share buttons pe blog

---

## 12. Security & Compliance

### 12.1 Security Measures

#### 12.1.1 Application Security

| Measure | Implementation |
|---------|----------------|
| HTTPS/SSL | Mandatory, auto-renew via Vercel |
| Authentication | Supabase Auth (JWT-based), bcrypt password hashing |
| Authorization | Row Level Security (RLS) în PostgreSQL |
| Session Management | httpOnly cookies, 7-day expiration, refresh tokens |
| Password Policy | Min 8 chars, 1 uppercase, 1 lowercase, 1 number |
| Rate Limiting | Max 5 login attempts/5min, max 10 API requests/min per IP |
| Input Validation | Zod schemas pe toate formularele & API |
| XSS Protection | Content Security Policy headers, React escaping |
| SQL Injection Protection | Prisma ORM (parameterized queries) |
| CSRF Protection | SameSite cookies, CSRF tokens |
| File Upload Security | Type whitelist, size limits, virus scan (optional) |

#### 12.1.2 Data Security

| Measure | Details |
|---------|---------|
| Encryption at Rest | PostgreSQL encryption (Supabase default) |
| Encryption in Transit | TLS 1.3 |
| Sensitive Data | Passwords hashed (bcrypt), CNP encrypted (optional) |
| Database Backups | Daily automated, encrypted |
| Access Logs | Audit trail pentru acces date sensibile |

#### 12.1.3 Infrastructure Security

- **Vercel:** DDoS protection, edge network security
- **Supabase:** ISO 27001 compliant, SOC 2 Type II
- **Cloudflare:** CDN with DDoS mitigation, Web Application Firewall (optional)

### 12.2 GDPR Compliance Checklist

| Requirement | Implementation |
|-------------|----------------|
| ✅ Lawful Basis | Consent (marketing), contract (treatment), legal obligation (medical records) |
| ✅ Consent Management | Opt-in checkboxes, cookie consent banner (Cookiebot sau similar) |
| ✅ Privacy Policy | Dedicated page, last updated, clear language (RO/HU/EN) |
| ✅ Terms of Service | Dedicated page, accepted at registration |
| ✅ Right to Access | Patient can view all their data in portal |
| ✅ Right to Portability | Patient can export data (JSON/PDF) |
| ✅ Right to be Forgotten | Admin can delete/anonymize patient data (with legal retention exceptions) |
| ✅ Right to Rectification | Patient can update profile, contact admin for medical data corrections |
| ✅ Data Minimization | Collect only necessary data |
| ✅ Data Retention | Automated deletion after retention period (with legal exceptions) |
| ✅ Breach Notification | Incident response plan, notify within 72h |
| ✅ Data Protection Officer | Designated contact (Dr. Petric or Admin) |
| ✅ Processor Agreements | Contracts cu Supabase, Vercel, Resend (GDPR-compliant) |

### 12.3 Medical Data Compliance (România)

#### Regulatory Framework:
- **Legea 95/2006** - Reforma sănătății
- **Ordinul MS 1410/2016** - Fișa pacientului
- **GDPR** - Protecția datelor personale

#### Requirements:
1. **Confidențialitate:**
   - Datele medicale sunt "special category data" (GDPR Art. 9)
   - Necesită consimțământ explicit sau bază legală medicală

2. **Retenție:**
   - Dosare medicale: 10 ani după ultimul tratament (minim)
   - Radiografii: 10 ani
   - Facturi: 7 ani (fiscal)

3. **Acces:**
   - Pacientul are drept de acces la propriile date medicale
   - Medicul tratant are acces
   - Alte persoane doar cu consimțământ explicit pacient

4. **Backup & Disaster Recovery:**
   - Backup securizat, encriptat
   - Disaster recovery plan pentru date medicale critice

### 12.4 Security Monitoring

- **Error Tracking:** Sentry (opțional) - real-time error alerts
- **Uptime Monitoring:** Vercel Analytics + UptimeRobot (opțional)
- **Log Management:** Supabase logs, Vercel logs
- **Security Audits:** Periodic reviews (quarterly)

---

## 13. Multi-Language Requirements

### 13.1 Supported Languages

| Language | Code | Primary Audience | Priority |
|----------|------|------------------|----------|
| Română | ro | Majoritatea pacienților | MUST |
| Maghiară | hu | Comunitate maghiară Satu Mare | MUST |
| Engleză | en | Expați, turiști medicali | SHOULD |

### 13.2 Implementation Approach

**Tool:** next-intl

**Structure:**
```
/locales
  /ro
    common.json
    services.json
    blog.json
    portal.json
  /hu
    common.json
    services.json
    ...
  /en
    common.json
    services.json
    ...
```

**URL Structure:**
- Default: dentcraft.ro (redirect to /ro)
- Romanian: dentcraft.ro/ro/*
- Hungarian: dentcraft.ro/hu/*
- English: dentcraft.ro/en/*

**Language Switcher:**
- Dropdown în header (flag + language name)
- Persist language preference în cookie
- Auto-detect browser language (first visit)

### 13.3 Content Translation Coverage

| Content Type | RO | HU | EN |
|--------------|----|----|-----|
| Public pages (Homepage, Despre, Servicii, Contact) | ✅ | ✅ | ✅ |
| Services (detailed pages) | ✅ | ✅ | ✅ |
| Blog articles | ✅ | ❌ | ❌ |
| Testimonials | ✅ | Opțional | ❌ |
| Patient Portal UI | ✅ | ✅ | ✅ |
| Emails (notifications) | ✅ | ✅ | Opțional |
| SMS (notifications) | ✅ | ✅ | ❌ |
| Error messages | ✅ | ✅ | ✅ |
| Form labels & validation | ✅ | ✅ | ✅ |

**Blog Strategy:**
- Articolele vor fi scrise inițial în RO
- HU/EN pot fi adăugate ulterior pentru articole importante
- CMS permite flagging per limbă (RO only, RO+HU, All)

### 13.4 SEO per Language

- **Hreflang tags:** <link rel="alternate" hreflang="ro" href="...">
- **Separate meta tags** per language
- **Sitemap XML** cu toate limbile
- **Google Search Console** monitoring per language

---

## 14. Success Criteria & Metrics

### 14.1 Success Criteria

| Criteria | Definition of Success |
|----------|----------------------|
| **Project Delivery** | Site live în timeline-ul stabilit (4-6 săpt V1, 10-14 săpt V2) |
| **Performance** | Page load <2s (mobile), Lighthouse score >90 |
| **SEO** | Rank Top 3 pentru "clinica stomatologica satu mare" în 3 luni |
| **Lead Generation** | Min 50 lead-uri/lună (contact forms + calls + bookings) |
| **Conversion Rate** | >5% visitors → lead |
| **User Satisfaction (V2)** | >4.5/5 stars patient satisfaction cu portalul |
| **Operational Efficiency (V2)** | -50% timp administrativ pentru programări |
| **Booking Adoption (V2)** | 70% programări făcute online după 6 luni |

### 14.2 Key Performance Indicators (KPIs)

#### 14.2.1 Marketing & Acquisition KPIs

| KPI | Target (Month 3) | Target (Month 6) | Measurement |
|-----|------------------|------------------|-------------|
| Organic traffic | 500-800 visitors/month | 1,000-1,500 visitors/month | Google Analytics |
| SEO ranking "clinica stomatologica satu mare" | Top 5 | Top 3 | Manual check |
| SEO ranking "dentist satu mare" | Top 10 | Top 5 | Manual check |
| Contact form submissions | 30-50/month | 60-80/month | GA4 events |
| Phone calls from website | 40-60/month | 80-100/month | Call tracking |
| WhatsApp inquiries | 10-20/month | 20-30/month | WhatsApp Business |
| Total leads | 80-130/month | 160-210/month | Sum of above |
| Conversion rate (visitor → lead) | 5-8% | 8-10% | Calculated |

#### 14.2.2 Engagement KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Avg session duration | >2 minutes | Google Analytics |
| Pages per session | >3 pages | Google Analytics |
| Bounce rate | <50% | Google Analytics |
| Blog article views | >200/month | Google Analytics |
| Before/after gallery views | >300/month | Google Analytics |
| Mobile traffic percentage | >60% | Google Analytics |

#### 14.2.3 Operational KPIs (Varianta 2)

| KPI | Target (Month 6) | Measurement |
|-----|------------------|-------------|
| Patient portal registrations | 100-150 patients | Database |
| Portal login frequency | 2-3x/month avg per patient | Analytics |
| Online bookings | 70% of total bookings | Booking system |
| Appointment no-show rate | <10% (down from ~25%) | Booking system |
| Avg time to book appointment | <3 minutes | User testing |
| Treatment plan views | 80% of patients | Portal analytics |
| File uploads (doctor) | >50 scans/month | File system |
| Email notification open rate | >40% | Resend analytics |

#### 14.2.4 Business KPIs

| KPI | Target (Month 6) | Measurement |
|-----|------------------|-------------|
| New patients from website | +40-60/month | CRM tracking |
| Revenue from web leads | €20,000-30,000/month | Financial tracking |
| Cost per acquisition (CPA) | <€50/patient | Marketing spend / new patients |
| Return on Investment (ROI) | >300% (year 1) | (Revenue - Investment) / Investment |
| Patient satisfaction | >4.5/5 stars | Surveys, Google Reviews |

### 14.3 Reporting & Analytics

#### Monthly Report (pentru Dr. Petric):
- Traffic overview (visitors, sources, top pages)
- Lead generation (forms, calls, bookings)
- SEO progress (rankings, keywords)
- Portal usage (V2: registrations, bookings, engagement)
- Top performing content (blog articles)
- Recommendations for next month

#### Quarterly Business Review:
- Overall performance vs targets
- ROI analysis
- Competitive analysis
- Strategic recommendations
- Feature requests & roadmap

---

## 15. Risk Assessment

### 15.1 Risk Matrix

| Risk ID | Risk Description | Probability | Impact | Severity | Mitigation Strategy |
|---------|------------------|-------------|--------|----------|---------------------|
| **R1** | Content delay (texte, imagini) | MEDIUM | HIGH | 🔴 HIGH | Request content 2 weeks before needed, use placeholders |
| **R2** | droot.ro CSV format incompatible | LOW | HIGH | 🟡 MEDIUM | Test with sample CSV early, build flexible parser |
| **R3** | Low patient adoption of portal (V2) | MEDIUM | MEDIUM | 🟡 MEDIUM | User testing, training videos, staff support |
| **R4** | Email deliverability issues | LOW | MEDIUM | 🟢 LOW | Use reputable service (Resend), SPF/DKIM/DMARC setup |
| **R5** | Performance issues with 3D viewer | LOW | MEDIUM | 🟢 LOW | Test with large files early, optimize, progressive loading |
| **R6** | GDPR compliance gaps | LOW | HIGH | 🟡 MEDIUM | Legal review, checklist, privacy policy by lawyer |
| **R7** | Scope creep (feature requests) | HIGH | MEDIUM | 🟡 MEDIUM | Clear contract, change request process, phased approach |
| **R8** | Timeline delays | MEDIUM | MEDIUM | 🟡 MEDIUM | Buffer time in estimates, weekly check-ins |
| **R9** | Competitor launches similar platform | LOW | LOW | 🟢 LOW | Speed to market, continuous improvement |
| **R10** | Low SEO results initially | MEDIUM | MEDIUM | 🟡 MEDIUM | Set expectations (3-6 months), invest in content |

### 15.2 Technical Risks

| Risk | Mitigation |
|------|------------|
| **Third-party service outage** (Supabase, Vercel) | Choose reliable providers with SLA, have backup plan |
| **Security breach** | Regular security audits, penetration testing, insurance |
| **Data loss** | Automated daily backups, tested recovery process |
| **Scalability issues** | Start with scalable architecture (Vercel serverless), monitor |

### 15.3 Business Risks

| Risk | Mitigation |
|------|------------|
| **Budget overrun** | Fixed-price contract, clear scope, change request process |
| **Low patient engagement** | Marketing support, staff training, patient education |
| **Staff resistance to change** | Involve staff early, training, show benefits |
| **Legal/compliance issues** | Legal review, privacy policy, terms of service by lawyer |

---

## 16. Project Timeline

### 16.1 Timeline - Varianta 1 (4-6 săptămâni)

| Week | Phase | Tasks | Deliverables |
|------|-------|-------|--------------|
| **W1** | Discovery & Design | - Kickoff meeting<br>- Content gathering<br>- Wireframes<br>- Design mockups (3 pages)<br>- Approve design | Design mockups (Figma) |
| **W2** | Development Phase 1 | - Setup Next.js project<br>- Homepage<br>- About page<br>- Services structure<br>- Multi-language setup | Homepage live on staging |
| **W3** | Development Phase 2 | - Services detail pages<br>- Gallery before/after<br>- Testimonials<br>- Blog setup (CMS) | Content pages live |
| **W4** | Development Phase 3 | - Contact page & forms<br>- Google Maps integration<br>- Email notifications<br>- SEO optimization | Full site functional |
| **W5** | Testing & Content | - QA testing (devices, browsers)<br>- Content population<br>- Translations (HU/EN)<br>- Performance optimization | Content complete, bugs fixed |
| **W6** | Launch | - Final review<br>- DNS setup<br>- Production deploy<br>- CMS training<br>- Google Analytics setup | ✅ **LIVE LAUNCH** |

### 16.2 Timeline - Varianta 2 (10-14 săptămâni)

| Week | Phase | Tasks | Deliverables |
|------|-------|-------|--------------|
| **W1-2** | Discovery & Design | - Kickoff meeting<br>- Content gathering<br>- Database design<br>- Wireframes (public + portal)<br>- Design mockups (10+ screens)<br>- Approve design | Design mockups (Figma)<br>Database schema |
| **W3-4** | Public Website (V1) | - All tasks from V1 (Homepage, About, Services, Blog, Contact) | Public website complete |
| **W5-6** | Auth & Patient Portal | - Supabase setup<br>- Authentication system<br>- Patient registration/login<br>- Patient dashboard<br>- Profile management | Auth working, portal accessible |
| **W7** | Treatment Plans & Payments | - Treatment plans display<br>- Payment tracking<br>- Invoice generation (PDF) | Patient can view treatment plans |
| **W8** | Booking System | - Calendar component<br>- Availability logic<br>- Booking flow<br>- Confirmation emails | Patients can book appointments |
| **W9** | Files & 3D Viewer | - File upload (doctor)<br>- File storage (Supabase)<br>- Image gallery per patient<br>- 3D scan viewer | Patients can view scans |
| **W10** | Doctor & Admin Dashboards | - Doctor dashboard (patients list, daily schedule)<br>- Admin dashboard (users, services)<br>- CSV import tool | Dashboards functional |
| **W11** | Notifications & Integration | - Email templates<br>- Reminder system<br>- droot CSV mapping<br>- Test import/export | Notifications working |
| **W12** | Testing & Refinement | - Full QA testing<br>- User acceptance testing (UAT)<br>- Bug fixes<br>- Performance optimization | All bugs fixed |
| **W13** | Content & Translations | - Content population<br>- Translations (HU/EN)<br>- Sample data for demo | Content complete |
| **W14** | Launch & Training | - Production deploy<br>- DNS setup<br>- Staff training (admin, doctors)<br>- Documentation handoff | ✅ **LIVE LAUNCH** |

### 16.3 Post-Launch Activities

| Timeline | Activity |
|----------|----------|
| **Week 1-2 post-launch** | - Monitor errors & bugs<br>- Fix critical issues<br>- User feedback collection |
| **Month 1** | - SEO monitoring<br>- Analytics review<br>- First monthly report<br>- Minor improvements |
| **Month 2-3** | - Content expansion (blog articles)<br>- SEO optimization based on data<br>- Feature requests evaluation |
| **Month 6** | - Comprehensive performance review<br>- ROI analysis<br>- Roadmap for Phase 2 features |

---

## 17. Budget & Investment

### 17.1 Investment Breakdown - Varianta 1

| Category | Item | Cost (EUR) |
|----------|------|-----------|
| **Development** | | |
| | Frontend development (Next.js, React, Tailwind) | €1,400 - €1,600 |
| | Backend setup (API routes, CMS integration) | €300 - €400 |
| | Multi-language implementation (RO/HU/EN) | €200 - €300 |
| | Forms & email integration | €100 - €200 |
| **Design** | | |
| | Wireframes & mockups (5-7 screens) | €300 - €400 |
| | UI/UX design & branding | €100 - €100 |
| **Content** | | |
| | Content structure & SEO optimization | €150 - €200 |
| | Copywriting support (if needed) | €50 - €100 |
| **Setup & Configuration** | | |
| | CMS setup (Sanity) & training | €150 - €200 |
| | Google Analytics, Tag Manager, SEO | €100 - €150 |
| | Domain, DNS, SSL setup | Included | |
| **Testing & Launch** | | |
| | QA testing, bug fixes | €150 - €200 |
| | Deployment & launch support | €100 - €150 |
| **TOTAL (one-time)** | | **€2,800 - €3,500** |

**Monthly Costs (Varianta 1):**

| Service | Cost (EUR/month) |
|---------|------------------|
| Vercel Pro (hosting) | €20 |
| Sanity CMS | €0 (free tier) - €20 (growth) |
| Domain (.ro) | €10/year (€1/month) |
| Cloudflare (optional) | €0 (free tier) |
| Email (Resend) | €0 (free tier up to 3k emails) - €20 |
| SSL certificate | €0 (included) |
| Maintenance & support (bug fixes, updates) | €20 - €40 |
| **TOTAL MONTHLY** | **€60 - €80** |

---

### 17.2 Investment Breakdown - Varianta 2

| Category | Item | Cost (EUR) |
|----------|------|-----------|
| **All from Varianta 1** | | **€2,800 - €3,500** |
| **Additional Development** | | |
| | Authentication system (Supabase Auth) | €200 - €250 |
| | Patient portal (dashboard, profile, treatment plans) | €400 - €450 |
| | Booking system (calendar, availability, flow) | €500 - €600 |
| | Doctor dashboard (patients, schedule, file upload) | €300 - €400 |
| | Admin dashboard (users, CSV import, analytics) | €300 - €400 |
| | File management & 3D viewer | €400 - €500 |
| | Notifications system (email/SMS reminders) | €200 - €300 |
| | droot integration (CSV mapping, import/export) | €200 - €300 |
| **Database & Backend** | | |
| | Database design & schema | €150 - €200 |
| | Supabase setup, RLS policies | €150 - €200 |
| | Prisma ORM integration | €100 - €150 |
| **Additional Testing** | | |
| | Extended QA, UAT, security testing | €200 - €300 |
| **Training & Documentation** | | |
| | Admin training (2-3h) | €100 - €150 |
| | Doctor training | €50 - €100 |
| | User documentation | €50 - €100 |
| **TOTAL ADDITIONAL** | | **€2,700 - €3,500** |
| **TOTAL V2 (one-time)** | | **€5,500 - €6,500** |

**Monthly Costs (Varianta 2):**

| Service | Cost (EUR/month) |
|---------|------------------|
| All from V1 | €60 - €80 |
| Supabase (database, auth, storage) | €0 (free tier) - €25 (pro) |
| Additional email volume (Resend) | €0 - €20 |
| SMS (Twilio - optional) | €0 - €10 (pay-as-you-go) |
| Additional support & maintenance | €20 - €40 |
| **TOTAL MONTHLY V2** | **€100 - €150** |

---

### 17.3 ROI Projection (Varianta 2 - 12 months)

**Assumptions (Conservative):**
- Avg tratament: €500
- Conversie web lead → pacient: **30%** (realist, nu toate lead-urile convertesc)
- Avg lead-uri/lună: **80-100** (după lună 3, cu SEO organic + Google Ads moderat)
- New patients/month: 24-30 (100 × 30%)
- % pacienți care fac tratament: **60%** (unii vin doar pentru consultație)
- Patients treated/month: 15-18
- Revenue/month: €7,500 - €9,000 (16 avg × €500)

**Year 1 Projection (Conservative):**

| Month | Leads | New Patients | Revenue | Notes |
|-------|-------|--------------|---------|-------|
| M1-2 | 20-30 | 6-9 | €2,000 - €3,000 | Ramp-up lent (SEO în dezvoltare) |
| M3-6 | 50-80 | 15-24 | €5,000 - €7,000 | Growth (SEO începe să aducă trafic) |
| M7-12 | 80-100 | 24-30 | €7,500 - €9,000 | Steady state (SEO + Ads optimizate) |

**Total Year 1 Revenue from web:** €70,000 - €95,000
**Investment:** €6,000 (V2) + (€125 × 12 mentenanță) + €3,000 (Google Ads est.) = €10,500
**ROI:** (€82,500 - €10,500) / €10,500 = **685%** (aproximativ **7-9x return**)

**Important Notes:**
- 🎯 Această proiecție este **conservativă și realistă**
- 📈 ROI depinde FOARTE mult de:
  - **SEO organic** (nevoie 3-6 luni să crească)
  - **Google Ads investment** (€200-500/lună recomandat primele 6 luni)
  - **Calitatea conținutului** (blog, before/after, testimoniale)
  - **Reputația online** (Google Reviews, testimoniale video)
- 💡 Scenariul optimist (cu marketing agressiv + SEO excelent) poate ajunge la 15-20x ROI
- ⚠️ Fără marketing plătit (doar SEO organic), rezultatele vor fi cu 40-50% mai mici în primul an

---

### 17.4 Payment Terms

**Option 1: Milestone-Based (Recommended)**

| Milestone | Payment | Deliverable |
|-----------|---------|-------------|
| Contract signing | 30% | Project kickoff, access to tools |
| Design approval | 20% | Approved mockups |
| Development 50% complete | 20% | Staging site preview |
| Final delivery | 30% | Live site, training, handoff |

**Option 2: 50/50**
- 50% upfront (contract signing)
- 50% at launch

**Option 3: Phased Approach**
- Varianta 1 payment (€2,800 - €3,500)
- Then decide on Varianta 2 (add €2,700 - €3,500)

---

## 18. Appendices

### 18.1 Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - metodă de comunicare între sisteme |
| **BRD** | Business Requirements Document - documentul curent |
| **CMS** | Content Management System - sistem pentru gestionarea conținutului (ex: Sanity) |
| **CSV** | Comma-Separated Values - format de fișier pentru import/export date |
| **GDPR** | General Data Protection Regulation - legislație UE pentru protecția datelor |
| **JWT** | JSON Web Token - standard pentru autentificare securizată |
| **KPI** | Key Performance Indicator - indicator de performanță |
| **ORM** | Object-Relational Mapping - tool pentru lucru cu baze de date (ex: Prisma) |
| **Patient Portal** | Zonă privată unde pacienții își văd datele medicale |
| **RLS** | Row Level Security - securitate la nivel de rând în baza de date |
| **ROI** | Return on Investment - rentabilitatea investiției |
| **SEO** | Search Engine Optimization - optimizare pentru motoare de căutare |
| **SSG** | Static Site Generation - generare pagini statice (Next.js) |
| **SSR** | Server-Side Rendering - randare pe server (Next.js) |

### 18.2 Acronyms

- **CNP:** Cod Numeric Personal
- **CTA:** Call to Action
- **DMARC:** Domain-based Message Authentication, Reporting & Conformance
- **DKIM:** DomainKeys Identified Mail
- **FAQ:** Frequently Asked Questions
- **HTTPS:** Hypertext Transfer Protocol Secure
- **SPF:** Sender Policy Framework
- **SSL/TLS:** Secure Sockets Layer / Transport Layer Security
- **UAT:** User Acceptance Testing
- **UI/UX:** User Interface / User Experience
- **URL:** Uniform Resource Locator
- **XSS:** Cross-Site Scripting

### 18.3 Reference Documents

1. **GDPR Compliance Guide:** https://gdpr.eu/
2. **Supabase Documentation:** https://supabase.com/docs
3. **Next.js Documentation:** https://nextjs.org/docs
4. **droot.ro Website:** https://www.droot.ro/
5. **Competitor Analysis Websites:** (vezi secțiunea 3.3)

### 18.4 Contact Information

| Role | Name | Contact |
|------|------|---------|
| **Client / Owner** | Dr. Răzvan Petric | [email protected], +40 XXX XXX XXX |
| **Developer / PM** | Raul Lutas | [email protected], +40 XXX XXX XXX |
| **Design** | TBD | TBD |
| **Content / Copywriter** | TBD | TBD |

### 18.5 Assumptions & Dependencies

**Assumptions:**
1. Client va furniza conținut (texte, imagini) în timp util (2 weeks notice)
2. droot.ro permite export CSV cu datele necesare
3. Client are drepturi asupra tuturor imaginilor before/after folosite
4. Client va desemna un Admin responsabil pentru actualizări CMS
5. Buget €5,000 este confirmat pentru Varianta 2 (dacă se alege)

**Dependencies:**
1. Acces la droot.ro pentru testare CSV export
2. Logo final Dentcraft (sau confirmare folosire logo existent)
3. Texte pentru servicii și pagini (colaborare cu client)
4. Imagini profesionale (clinică, echipamente, before/after)
5. Certificări Dr. Petric (pentru pagina About)
6. Domeniu dentcraft.ro (confirmare disponibilitate sau achiziție)

### 18.6 Change Request Process

**Dacă apar modificări față de acest BRD:**

1. **Client identifică cerință nouă** (ex: funcționalitate suplimentară)
2. **Developer estimează:**
   - Impact asupra timeline-ului
   - Cost adițional
   - Dependințe tehnice
3. **Client aprobă:**
   - Buget suplimentar
   - Timeline extins
4. **Update BRD:**
   - Versiune nouă document (v1.1, v1.2)
   - Change log actualizat
5. **Continuare dezvoltare**

**Mici ajustări (costuri <€100, timp <2h):** Incluse în contract, fără change request formal.

---

## 19. Next Steps

### Immediate Actions (Week 1):

1. **Client Review:**
   - Dr. Petric revizuiește acest BRD
   - Feedback și clarificări
   - Decizie Varianta 1 vs Varianta 2

2. **Contract Finalization:**
   - Semnare contract dezvoltare
   - Plată initial deposit (30% sau 50%)

3. **Content Gathering:**
   - Client pregătește texte, imagini, certificări
   - Logo final (confirmare)
   - Access droot.ro pentru CSV test

4. **Kickoff Meeting:**
   - Walkthrough BRD complet
   - Q&A
   - Confirm timeline
   - Assign responsibilities

5. **Project Setup:**
   - GitHub repository
   - Figma workspace pentru design
   - Communication channels (email, Slack, etc.)

### Pre-Development Checklist:

- [ ] BRD aprobat de client
- [ ] Contract semnat
- [ ] Deposit plătit
- [ ] Logo final confirmat
- [ ] Content plan creat (listă texte & imagini necesare)
- [ ] droot CSV sample obținut
- [ ] Domeniu dentcraft.ro achiziționat/confirmat
- [ ] Access la conturile necesare (Google Analytics, etc.)
- [ ] Design mockups aprobate (după W1-2)

---

**END OF DOCUMENT**

---

**Document prepared by:** Raul Lutas
**Date:** 24 Octombrie 2024
**Version:** 1.0
**Status:** Draft - Awaiting Client Approval

---

_Acest document este confidențial și destinat exclusiv clientului Dr. Răzvan Petric / Dentcraft Satu Mare. Reproducerea sau distribuția fără permisiune este interzisă._
