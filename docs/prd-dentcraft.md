# Product Requirements Document (PRD)
## DENTCRAFT.ro - Site Prezentare Clinica Stomatologica

---

**Document Version:** 1.0
**Data creare:** 14 Ianuarie 2026
**Client:** Dr. Razvan Petric - DENTCRAFT Satu Mare
**Tip proiect:** Site prezentare premium
**Buget:** €3,000
**Timeline estimat:** 4-6 saptamani

---

## Cuprins

1. [Executive Summary](#1-executive-summary)
2. [Obiective Proiect](#2-obiective-proiect)
3. [Specificatii Design](#3-specificatii-design)
4. [Structura Pagini](#4-structura-pagini)
5. [Functionalitati](#5-functionalitati)
6. [Specificatii Tehnice](#6-specificatii-tehnice)
7. [Content Requirements](#7-content-requirements)
8. [SEO Requirements](#8-seo-requirements)
9. [Timeline Estimat](#9-timeline-estimat)
10. [Success Metrics](#10-success-metrics)

---

## 1. Executive Summary

### 1.1 Viziune Proiect

DENTCRAFT.ro va fi un site de prezentare premium pentru clinica stomatologica DENTCRAFT din Satu Mare, condusa de Dr. Razvan Petric. Site-ul va reflecta profesionalismul si calitatea serviciilor oferite, adoptand un design modern inspirat de estetica Apple combinata cu elemente specifice domeniului dentar (referinta: Dentakay.com).

### 1.2 Scope

**In Scope:**
- Site de prezentare multilingv (RO, EN, HU)
- Prezentare servicii cu pagini individuale detaliate
- Prezentare echipa cu profile individuale
- Galerie Before/After interactiva
- Calculator de preturi interactiv
- Sistem de testimoniale (text + video)
- Formular consultatie online cu upload radiografie
- Blog cu categorii
- Integrare WhatsApp si Social Media
- Conformitate GDPR

**Out of Scope:**
- Portal pacienti (autentificare, istoric medical)
- Sistem de programari online automatizat
- Plati online
- Chat live cu AI

### 1.3 Pret & Servicii Incluse

**Pret total: €3,000**

**Ce include:**
- Site complet cu toate paginile (12+ pagini template)
- Design Apple style + Dentakay inspiratie
- Multilingv complet (RO/EN/HU)
- Calculator pret interactiv
- Galerie Before/After cu filtru
- Blog cu suport video
- Formular consultatie online cu upload radiografie
- CMS Sanity pentru administrare continut
- Cookie banner GDPR compliant
- SEO setup complet
- Google Analytics & Tag Manager

**Bonus incluse in pret:**
- ✅ Administrare Google My Business
- ✅ Ajutor configurare Google Ads
- ✅ Mentenanta GRATUITA 1 AN
- ✅ Postare articole pe site (1 an)

### 1.4 Stakeholders

| Rol | Nume | Responsabilitati |
|-----|------|------------------|
| Client / Owner | Dr. Razvan Petric | Aprobare design, content, feedback |
| Project Manager | TBD | Coordonare proiect, comunicare |
| Developer | TBD | Implementare tehnica |
| Designer | TBD | UI/UX Design |
| Content Manager | Staff clinica | Furnizare content, poze, video |

---

## 2. Obiective Proiect

### 2.1 Obiective de Business

| ID | Obiectiv | Metric Target | Prioritate |
|----|----------|---------------|------------|
| B1 | Cresterea vizibilitatii online a clinicii | Top 3 Google pentru "stomatolog Satu Mare" in 6 luni | Critica |
| B2 | Generare lead-uri calificate | Min. 20 cereri consultatie/luna | Inalta |
| B3 | Consolidarea brandului premium | NPS > 8 pentru prima impresie site | Inalta |
| B4 | Educarea pacientilor potentiali | Timp mediu pe site > 3 minute | Medie |
| B5 | Atragerea pacientilor internationali | 15% trafic din strainatate (EN/HU) | Medie |

### 2.2 Obiective Tehnice

| ID | Obiectiv | Metric Target | Prioritate |
|----|----------|---------------|------------|
| T1 | Performanta excelenta | Lighthouse Score > 90 | Critica |
| T2 | Mobile-first experience | Mobile usability 100% | Critica |
| T3 | Securitate | HTTPS, GDPR compliant | Critica |
| T4 | Scalabilitate | Suport 10,000 vizite/zi fara degradare | Medie |
| T5 | Usor de administrat | CMS intuitiv pentru non-tehnici | Inalta |

### 2.3 Obiective User Experience

| ID | Obiectiv | Descriere | Prioritate |
|----|----------|-----------|------------|
| U1 | Navigare intuitiva | Max 3 click-uri pana la orice informatie | Critica |
| U2 | Contact rapid | Acces instant la WhatsApp/telefon | Critica |
| U3 | Informatii clare preturi | Transparenta in pricing | Inalta |
| U4 | Dovada sociala | Testimoniale si galerie usor accesibile | Inalta |
| U5 | Multilingv seamless | Schimbare limba fara pierdere context | Inalta |

---

## 3. Specificatii Design

### 3.1 Directie Vizuala

**Stil General:** Apple-inspired minimalism cu warmth dentar
- Spatiu alb generos
- Tipografie clara si eleganta
- Imagini de inalta calitate
- Animatii subtile si fluide
- Micro-interactiuni sofisticate

**Referinte Design:**
- Apple.com - pentru minimalism si eleganta
- Dentakay.com - pentru context dentar si prezentare servicii

### 3.2 Paleta de Culori

```
Primary Palette:
├── Background:      #F5F0E8 (Bej deschis - warm, calming)
├── Cards:           #FFFFFF (Alb pur - clean, professional)
├── Text Principal:  #1A1A1A (Negru soft - readable, elegant)
├── Accent:          #D4C4B0 (Bej nisip - warm accent)
├── Text Secundar:   #6B6B6B (Gri - subtle, supporting)
└── Hover States:    #C4B4A0 (Bej inchis - interactive feedback)

Semantic Colors:
├── Success:         #4CAF50 (Verde - confirmari)
├── Error:           #E53935 (Rosu - erori)
├── Warning:         #FFC107 (Galben - atentionari)
└── Info:            #2196F3 (Albastru - informatii)
```

### 3.3 Tipografie

**Font Principal:** Inter (sau SF Pro alternative)
```
Headings:
├── H1: 48-64px / Bold / Line-height 1.1
├── H2: 36-48px / Semibold / Line-height 1.2
├── H3: 24-32px / Semibold / Line-height 1.3
├── H4: 20-24px / Medium / Line-height 1.4
└── H5: 16-18px / Medium / Line-height 1.4

Body:
├── Large:  18px / Regular / Line-height 1.6
├── Normal: 16px / Regular / Line-height 1.6
└── Small:  14px / Regular / Line-height 1.5

Labels:
├── Button: 14-16px / Medium / Letter-spacing 0.5px
└── Caption: 12px / Regular / Line-height 1.4
```

### 3.4 Componente UI

**Border Radius:**
```
├── Buttons:     12px
├── Cards:       16-24px
├── Images:      12-16px
├── Inputs:      8-12px
├── Modals:      24px
└── Avatars:     50% (circular)
```

**Shadows:**
```
├── Card Default:   0 4px 20px rgba(0,0,0,0.08)
├── Card Hover:     0 8px 40px rgba(0,0,0,0.12)
├── Button:         0 2px 10px rgba(0,0,0,0.1)
└── Floating:       0 12px 48px rgba(0,0,0,0.15)
```

**Spacing System (8px base):**
```
├── xs:  4px
├── sm:  8px
├── md:  16px
├── lg:  24px
├── xl:  32px
├── 2xl: 48px
├── 3xl: 64px
└── 4xl: 96px
```

### 3.5 Responsive Breakpoints

```
├── Mobile:      320px - 767px
├── Tablet:      768px - 1023px
├── Desktop:     1024px - 1439px
├── Large:       1440px - 1919px
└── Extra Large: 1920px+
```

### 3.6 Iconografie

- **Stil:** Line icons, stroke 1.5-2px
- **Biblioteca:** lucide-react (implementat)
- **Icons utilizate:**
  - Services: Stethoscope, Sparkles, Settings, Smile, Baby, AlertTriangle
  - Why Us: Microscope, Users, Heart, Wallet
  - Utility: Phone, Star (filled), ChevronDown, MapPin, Mail, Clock

### 3.7 Imagini

**Specificatii tehnice:**
- Format: WebP cu fallback JPG
- Hero images: 1920x1080px min
- Card images: 800x600px min
- Thumbnails: 400x300px
- Compresie: 80% quality

**Stil fotografie:**
- Poze reale din clinica (NU stock)
- Iluminare naturala/profesionala
- Fundal curat, dezordonat
- Focus pe zambete si echipament modern

---

## 4. Structura Pagini

### 4.1 Sitemap Complet

```
dentcraft.ro/
├── / (Homepage)
├── /echipa
│   ├── /echipa/[slug-doctor]
│   └── /echipa/[slug-asistent]
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
├── /contact
├── /galerie
├── /testimoniale
├── /preturi
├── /blog
│   ├── /blog/[categorie]
│   └── /blog/[slug-articol]
├── /faq
├── /politica-confidentialitate
├── /politica-cookies
└── /termeni-conditii
```

### 4.2 Detalii Pagini Individuale

---

#### 4.2.1 Homepage (/)

**Scop:** Prima impresie, prezentare generala, call-to-action principal

**Sectiuni (in ordine):**

1. **Hero Section**
   - Headline principal cu value proposition
   - Subheadline suportiv
   - CTA principal: "Programeaza consultatie"
   - CTA secundar: "Descopera serviciile"
   - Background: Video scurt sau imagine clinica
   - Statistici rapide (ani experienta, pacienti, tratamente)

2. **Trust Indicators Bar**
   - Logo-uri certificari
   - Review score Google (4.9/5)
   - Numar recenzii

3. **Servicii Principale**
   - Grid 3x3 sau carousel
   - Iconita + Titlu + Descriere scurta
   - Link catre pagina individuala

4. **De ce DENTCRAFT?**
   - 3-4 beneficii cheie cu iconite
   - Imagine suportiva clinica/echipa

5. **Echipa Noastra** (Preview)
   - Carousel cu doctori principali
   - Poza, nume, specializare
   - CTA: "Vezi toata echipa"

6. **Before/After Gallery** (Preview)
   - 3-4 cazuri reprezentative
   - Slider interactiv
   - CTA: "Vezi galeria completa"

7. **Testimoniale** (Preview)
   - 2-3 testimoniale featured
   - Mix text + video
   - CTA: "Citeste toate recenziile"

8. **Google Reviews Embed**
   - Widget reviews direct din Google
   - Link catre pagina Google Business

9. **Blog Preview**
   - Ultimele 3 articole
   - CTA: "Citeste blogul"

10. **CTA Final Section**
    - "Zambetul tau incepe aici"
    - Formular rapid sau link consultatie
    - Informatii contact

11. **Footer**
    - Logo + descriere scurta
    - Links navigare
    - Informatii contact
    - Social media
    - Newsletter signup
    - Copyright + links legale

---

#### 4.2.2 Pagina Echipa (/echipa)

**Scop:** Prezentare intreaga echipa, creare incredere

**Sectiuni:**

1. **Hero Echipa**
   - Poza de grup clinica
   - Headline: "Echipa ta de specialisti"

2. **Doctori Grid**
   - Card pentru fiecare doctor:
     - Poza profesionala
     - Nume complet
     - Titluri/Certificari
     - Specializare principala
     - Snippet bio (2 randuri)
     - Link: "Vezi profilul complet"

3. **Staff Medical**
   - Grid similar pentru asistente/tehnicieni

4. **Valori Echipa**
   - Misiune clinica
   - Abordare pacienti

---

#### 4.2.3 Pagina Individuala Membru Echipa (/echipa/[slug])

**Scop:** Detalii complete, creare conexiune personala

**Sectiuni:**

1. **Hero Profil**
   - Poza mare profesionala
   - Nume, titlu, specializare
   - Ani experienta
   - Contact direct (optional)

2. **Biografie Completa**
   - Educatie si formare
   - Experienta profesionala
   - Filozofie tratament

3. **Specializari si Competente**
   - Lista servicii oferite
   - Link-uri catre paginile de servicii

4. **Certificari si Diplome**
   - Imagini certificate
   - Cursuri relevante

5. **Galerie Video (Reels)**
   - Video embed-uri din Instagram/TikTok
   - Doctorul in activitate
   - Max 3-5 clipuri

6. **Cazuri Reprezentative**
   - Before/After din galerie filtrate
   - Tratamente realizate

7. **Testimoniale**
   - Recenzii specifice acestui doctor

8. **CTA Programare**
   - "Programeaza-te la Dr. [Nume]"

---

#### 4.2.4 Pagini Servicii Individuale (/servicii/[slug])

**Template aplicabil pentru toate cele 9 servicii**

**Sectiuni:**

1. **Hero Serviciu**
   - Titlu serviciu
   - Descriere scurta (2-3 propozitii)
   - Imagine reprezentativa
   - CTA: "Afla pretul" / "Programeaza"

2. **Descriere Detaliata**
   - Ce presupune tratamentul
   - Cui i se adreseaza
   - Beneficii principale

3. **Procesul Tratamentului**
   - Timeline vizual pas-cu-pas
   - Iconite pentru fiecare etapa
   - Durata estimata fiecare pas

4. **Tratamente Incluse**
   - Lista sub-servicii cu descrieri
   - Exemple: pentru Estetica Dentara:
     - Fatete dentare
     - Albire profesionala
     - Bonding dentar

5. **Preturi Estimative**
   - Range preturi
   - Link catre calculator
   - "Pretul final se stabileste dupa consultatie"

6. **FAQ Specific Serviciu**
   - 5-8 intrebari frecvente
   - Accordion expandable

7. **Galerie Cazuri**
   - Before/After filtrate pe acest serviciu
   - Slider interactiv

8. **Testimoniale Relevante**
   - Recenzii pentru acest tip de tratament

9. **Doctori Specializati**
   - Card-uri doctori care ofera acest serviciu

10. **Servicii Conexe**
    - Link-uri catre servicii complementare

11. **CTA Final**
    - "Programeaza consultatie pentru [Serviciu]"

---

**Pagini Servicii - Continut Specific:**

| Pagina | Sub-servicii principale | Note speciale |
|--------|-------------------------|---------------|
| Stomatologie Generala | Consultatie, Detartraj, Obturatii, Extractii simple | Entry-point pentru pacienti noi |
| Estetica Dentara | Fatete, Albire, Bonding, Conturare gingivala | Focus pe transformari vizuale |
| Protetica | Coroane, Punti, Proteze mobile/fixe | Solutii complete restaurare |
| Implantologie | Implant singular, Punte pe implant, All-on-4/6 | Premium service, preturi mari |
| Ortodontie | Aparat metalic, Ceramic, Invisalign | Durata tratament, plata in rate |
| Endodontie | Tratament canal, Retratament, Chirurgie endodontica | Salvare dinte natural |
| Chirurgie Oro-Maxilo | Extractii complexe, Molar de minte, Grefe os | Interventii specializate |
| Pedodontie | Sigilari, Fluorizare, Tratamente copii | Atmosfera friendly, jocuri |
| Urgente Dentare | Durere acuta, Traumatisme, Infectii | Numar urgenta, disponibilitate |

---

#### 4.2.5 Pagina Contact (/contact)

**Scop:** Toate modalitatile de contact, localizare clinica

**Sectiuni:**

1. **Hero Contact**
   - "Suntem aici pentru tine"
   - Butoane rapide: Telefon, WhatsApp, Email

2. **Informatii Contact**
   - **Adresa:** Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare
   - **Telefon:** 0741 199 977 (click-to-call)
   - **Email:** dentcraftsm@gmail.com
   - **Program:** Luni - Vineri: 10:00 - 18:00
   - **Social Media:** Instagram + Facebook (link-uri TBD)

3. **Harta Interactiva**
   - Google Maps embed
   - Indicatii acces
   - Parcare info

4. **Formular Contact**
   - Nume*
   - Email*
   - Telefon*
   - Subiect (dropdown: Programare, Informatii, Urgenta, Altele)
   - Mesaj*
   - Checkbox GDPR*
   - Submit

5. **Sectiune Consultatie Online** (vezi 4.2.12)

6. **FAQ Rapid**
   - Program, acces, parcare

---

#### 4.2.6 Galerie/Portofoliu (/galerie)

**Scop:** Dovada vizuala a rezultatelor

**Sectiuni:**

1. **Hero Galerie**
   - "Transformari reale, zambete reale"

2. **Filtru Tratamente**
   - Butoane/Tabs pentru fiecare tip:
     - Toate
     - Estetica
     - Implant
     - Ortodontie
     - Protetica
     - etc.

3. **Grid Galerie**
   - Thumbnails cazuri
   - Hover: preview Before/After
   - Click: modal fullscreen cu slider

4. **Modal Detalii Caz**
   - Slider Before/After (drag sau buton)
   - Tratament realizat
   - Durata tratament
   - Doctor responsabil
   - Testimonial pacient (optional)

---

#### 4.2.7 Testimoniale (/testimoniale)

**Scop:** Social proof maxim

**Sectiuni:**

1. **Hero Testimoniale**
   - "Ce spun pacientii nostri"
   - Rating general + numar recenzii

2. **Video Testimoniale Featured**
   - 3-6 video testimoniale (30-60 sec)
   - Player custom
   - Numele pacientului, tratament

3. **Filtru**
   - Toate / Video / Text
   - Per tratament

4. **Grid Testimoniale Text**
   - Card design:
     - Avatar/Initiale
     - Rating (stele)
     - Text recenzie
     - Nume, tratament, data
   - Pagination sau infinite scroll

5. **Google Reviews Section**
   - Embed direct
   - Link "Lasa o recenzie"

---

#### 4.2.8 Preturi (/preturi)

**Scop:** Transparenta, lead generation

**Sectiuni:**

1. **Hero Preturi**
   - "Preturi transparente pentru zambetul tau"
   - Nota: "Preturile sunt orientative"

2. **Calculator Interactiv** (Featured)
   - Select tratament (dropdown sau cards)
   - Numar unitati (unde aplicabil)
   - Optiuni suplimentare
   - Calcul instant
   - Disclaimer + CTA programare

3. **Lista Preturi pe Categorii**
   - Accordion sau tabs pe serviciu
   - Tabel: Tratament | Pret de la | Observatii
   - Info icon pentru explicatii

4. **Facilitati Plata**
   - Plata in rate
   - Parteneri financiari
   - Asigurari acceptate

5. **CTA**
   - "Pretul tau personalizat"
   - Link formular consultatie

---

#### 4.2.9 Blog (/blog)

**Scop:** Educatie, SEO, autoritate

**Sectiuni:**

1. **Hero Blog**
   - Articol featured mare
   - Titlu, imagine, excerpt, autor

2. **Categorii**
   - Pills/Tabs navigare:
     - Toate
     - Sfaturi ingrijire
     - Tratamente explicate
     - Noutati clinica
     - Stil de viata

3. **Grid Articole**
   - Card: Imagine, Categorie, Titlu, Excerpt, Data, Autor
   - Pagination

**Pagina Articol Individual (/blog/[slug]):**
- Hero cu imagine mare SAU video
- Autor, data, timp citire
- Continut formatat (headings, images, lists, **video embed**)
- Table of contents (sidebar sticky)
- Share buttons
- Articole similare
- CTA newsletter/programare

**Suport Video in Blog:**
- Articolele pot include clipuri video (YouTube embed sau upload direct)
- Video player responsiv
- Thumbnail preview pentru video-uri

---

#### 4.2.10 FAQ (/faq)

**Scop:** Raspunsuri rapide, reducere load suport

**Sectiuni:**

1. **Hero FAQ**
   - "Intrebari frecvente"
   - Search bar

2. **Categorii FAQ**
   - General
   - Programari
   - Tratamente
   - Preturi
   - Post-tratament

3. **Accordion Intrebari**
   - Grupate pe categorie
   - Search functionality
   - Click expand/collapse

4. **Nu ai gasit raspunsul?**
   - Link contact
   - WhatsApp

---

#### 4.2.11 Pagini Legale

**Politica Confidentialitate (/politica-confidentialitate)**
- GDPR compliant
- Ce date colectam
- Cum le folosim
- Drepturile utilizatorilor
- Contact DPO

**Politica Cookies (/politica-cookies)**
- Tipuri cookies utilizate
- Scopul fiecarui tip
- Cum dezactivezi
- Link setari cookies

**Termeni si Conditii (/termeni-conditii)**
- Utilizare site
- Proprietate intelectuala
- Limitare raspundere
- Modificari termeni

---

#### 4.2.12 Functionalitate Consultatie Online

**Integrare:** Pe pagina Contact + sectiune dedicata pe homepage

**Flow:**

1. **Optiune Selectie**
   - Card: "Vino in clinica" - programare standard
   - Card: "Consultatie online" - cu taxa

2. **Formular Consultatie Online**
   - Informatii personale (nume, email, telefon)
   - Motiv consultatie (dropdown)
   - Descriere problema (textarea)
   - Upload radiografie panoramica (drag-drop)
     - Format: JPG, PNG, DICOM
     - Max 10MB
     - Instructiuni cum sa faci poza
   - Preferinta zi/ora
   - Confirmare pret consultatie online
   - Checkbox GDPR
   - Submit

3. **Confirmare**
   - Mesaj succes
   - "Veti fi contactat in 24h pentru confirmare"
   - Email confirmare automata

4. **Backend Flow (Manual)**
   - Staff primeste notificare email
   - Staff contacteaza pacientul telefonic
   - Staff creeaza meeting Google Meet
   - Staff trimite link pacientului

---

## 5. Functionalitati

### 5.1 Functionalitati Core

#### 5.1.1 Buton WhatsApp Floating

**User Story:**
> Ca vizitator, vreau sa pot contacta clinica instant pe WhatsApp, pentru a obtine raspunsuri rapide.

**Specificatii:**
- Pozitie: Fixed, bottom-right, 24px margin
- Design: Iconita WhatsApp, verde #25D366
- Animatie: Subtle pulse la load
- Click: Deschide WhatsApp cu mesaj pre-completat
- Mobile: Deschide app WhatsApp
- Desktop: Deschide WhatsApp Web
- Mesaj default: "Buna ziua! As dori mai multe informatii despre..."
- Responsive: Se micsoreaza pe mobile

**Acceptance Criteria:**
- [ ] Vizibil pe toate paginile
- [ ] Nu suprapune continut important
- [ ] Functioneaza pe toate device-urile
- [ ] Link WhatsApp corect configurat

---

#### 5.1.2 Galerie Before/After Interactiva

**User Story:**
> Ca potential pacient, vreau sa vad rezultate reale ale tratamentelor, pentru a avea incredere in clinica.

**Specificatii:**
- **Filtru:**
  - Butoane categorii tratamente
  - Filtrare instantanee (fara reload)
  - Animatie smooth tranzitie

- **Grid Display:**
  - 3 coloane desktop, 2 tablet, 1 mobile
  - Thumbnail cu overlay label tratament
  - Hover: zoom subtle + preview

- **Slider Interactiv:**
  - Modal fullscreen pe click
  - Slider vertical/orizontal drag
  - Buton toggle Before/After
  - Swipe gestures mobile
  - Informatii caz sub imagine
  - Navigare previous/next

**Acceptance Criteria:**
- [ ] Minim 20 cazuri la lansare
- [ ] Filtrare functionala toate categorii
- [ ] Slider smooth 60fps
- [ ] Touch-friendly pe mobile
- [ ] Loading optimizat (lazy load)

---

#### 5.1.3 Video Testimoniale

**User Story:**
> Ca vizitator, vreau sa vad si aud experiente reale ale pacientilor, pentru a intelege mai bine ce sa astept.

**Specificatii:**
- Durata: 30-60 secunde/video
- Format: MP4 optimizat, fallback WebM
- Player: Custom styling (match brand)
- Thumbnail: Frame reprezentativ
- Autoplay: NU (doar la click)
- Muted by default: DA (cu buton unmute)
- Subtitles: Disponibile pentru toate

**Acceptance Criteria:**
- [ ] Minim 5 video testimoniale la lansare
- [ ] Subtitles in toate cele 3 limbi
- [ ] Optimizat pentru bandwidth
- [ ] Thumbnail personalizat

---

#### 5.1.4 Calculator Pret Interactiv

**User Story:**
> Ca potential pacient, vreau sa estimez costul tratamentului meu, pentru a ma putea pregati financiar.

**Specificatii:**

**Step 1 - Selectie Tratament:**
- Cards sau dropdown cu toate serviciile
- Iconite reprezentative
- Descriere scurta

**Step 2 - Detalii:**
- Numar unitati (dinti, implanturi, etc.)
- Optiuni aditionale (materiale premium, etc.)
- Slider sau input numeric

**Step 3 - Rezultat:**
- Pret estimativ range (de la - pana la)
- Breakdown cost components
- Disclaimer vizibil
- CTA: "Obtine oferta personalizata"
- Optiune trimitere pe email

**Date preturi:**
- Administrate din CMS
- Actualizabile de staff
- Istoric modificari

**Acceptance Criteria:**
- [ ] Toate serviciile cu preturi
- [ ] Calcul instant (fara loading)
- [ ] Mobile responsive
- [ ] Disclaimer clar vizibil
- [ ] Trimitere email functionala

---

#### 5.1.5 Multilingv (RO/EN/HU)

**User Story:**
> Ca vizitator strain, vreau sa accesez site-ul in limba mea, pentru a intelege serviciile oferite.

**Specificatii:**
- **Limba default:** Romana
- **Detectie automata:** Pe baza browser locale
- **Selector limba:**
  - Pozitie: Header, dreapta
  - Design: Dropdown cu flag-uri
  - Persistenta: LocalStorage

- **URL Structure:**
  - RO: dentcraft.ro/servicii
  - EN: dentcraft.ro/en/services
  - HU: dentcraft.ro/hu/szolgaltatasok

- **Continut tradus:**
  - UI strings: Complet
  - Pagini: Complet
  - CMS content: Administrabil per limba

**Acceptance Criteria:**
- [ ] Toate paginile in toate 3 limbile
- [ ] Schimbare limba fara reload (preferat)
- [ ] SEO tags per limba (hreflang)
- [ ] URL-uri localizate

---

#### 5.1.6 Cookie Consent Banner

**User Story:**
> Ca vizitator, vreau sa fiu informat despre cookies si sa pot alege ce accept, conform GDPR.

**Specificatii:**
- **Prima vizita:**
  - Banner bottom full-width
  - Text scurt + link politica
  - Butoane: "Accepta toate", "Doar necesare", "Personalizeaza"

- **Modal Personalizare:**
  - Categorii: Necesare (locked), Functionale, Analitice, Marketing
  - Toggle per categorie
  - Descriere ce face fiecare
  - Buton salveaza

- **Dupa acceptare:**
  - Stocare preferinte localStorage + cookie
  - Link footer pentru modificare
  - Respectare alegeri (blocheaza scripts)

**Acceptance Criteria:**
- [ ] Afisat la prima vizita
- [ ] Blocare efectiva cookies non-necesare
- [ ] Modificare preferinte oricand
- [ ] Log consent (audit trail)

---

#### 5.1.7 Google Reviews Embed

**User Story:**
> Ca vizitator, vreau sa vad recenziile Google autentice, pentru a avea incredere in clinica.

**Specificatii:**
- Widget oficial sau solutie third-party
- Afiseaza: Rating mediu, numar recenzii, ultimele 5-10
- Auto-update periodic
- Link direct catre Google Maps pentru mai multe

**Acceptance Criteria:**
- [ ] Date reale din Google
- [ ] Update automat
- [ ] Design integrat in brand
- [ ] Link functional Google Maps

---

#### 5.1.8 Formular Upload Radiografie

**User Story:**
> Ca pacient pentru consultatie online, vreau sa pot incarca radiografia mea, pentru ca doctorul sa evalueze cazul.

**Specificatii:**
- Drag-drop zone
- Click to browse files
- Formate: JPG, PNG, PDF, DICOM
- Max size: 10MB
- Preview dupa upload
- Progress bar upload
- Validare client + server
- Stocare securizata (encrypted)
- Stergere automata dupa 30 zile

**Acceptance Criteria:**
- [ ] Upload functional toate formatele
- [ ] Validare size si format
- [ ] Preview imagine
- [ ] Stocare GDPR compliant
- [ ] Notificare staff la upload

---

#### 5.1.9 Proces Tratament Vizual

**User Story:**
> Ca pacient, vreau sa inteleg pasii tratamentului, pentru a sti la ce sa ma astept.

**Specificatii:**
- Timeline orizontal/vertical
- Pas cu pas cu iconite custom
- Titlu + descriere fiecare pas
- Durata estimata
- Animatie la scroll (reveal)
- Responsive: vertical pe mobile

**Acceptance Criteria:**
- [ ] Minim 4 pasi per tratament
- [ ] Iconite custom per pas
- [ ] Animatii smooth
- [ ] Lizibil pe toate device-urile

---

### 5.2 Functionalitati CMS (Sanity)

**Content Types de creat:**

1. **Pagini**
   - Homepage
   - Pagini statice (About, Contact, etc.)

2. **Echipa**
   - Membri echipa (doctori, staff)
   - Campuri: nume, rol, bio, poza, video, certificari

3. **Servicii**
   - Categorii servicii
   - Servicii individuale
   - FAQ per serviciu

4. **Galerie**
   - Cazuri Before/After
   - Categorii, poze, descrieri

5. **Testimoniale**
   - Text si video
   - Rating, tratament, data

6. **Blog**
   - Articole
   - Categorii
   - Autori

7. **Preturi**
   - Lista preturi per serviciu
   - Configurare calculator

8. **FAQ**
   - Intrebari grupate pe categorii

9. **Traduceri**
   - UI strings
   - Content per limba

10. **Settings**
    - Informatii contact
    - Social links
    - SEO defaults

---

## 6. Specificatii Tehnice

### 6.1 Tech Stack

| Componenta | Tehnologie | Versiune | Justificare |
|------------|------------|----------|-------------|
| Framework | Next.js | 15.1 (App Router + Turbopack) | SSR, SSG, performance |
| Limbaj | TypeScript | 5.x | Type safety, DX |
| Styling | Tailwind CSS | 4.x (@theme directive) | Rapid development, consistency |
| Icons | lucide-react | latest | Line icons, consistent style |
| CMS | Sanity.io | v3 | Real-time, flexible, hosted |
| Hosting | Vercel | - | Edge network, CI/CD native |
| Internationalization | next-intl | 4.x | Robust i18n for Next.js |
| Animatii | Framer Motion | Latest | Smooth, performant |
| Forms | React Hook Form + Zod | Latest | Validation, performance |
| Email | Resend sau SendGrid | - | Transactional emails |
| Analytics | Google Analytics 4 + Vercel Analytics | - | Tracking complet |
| Maps | Google Maps API | - | Localizare clinica |

### 6.2 Arhitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Next.js 14 App                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   Pages     │  │   API       │  │   Middleware    │  │   │
│  │  │  (SSG/SSR)  │  │  Routes     │  │  (i18n, auth)   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Sanity CMS    │  │   Vercel Blob   │  │   External APIs │
│   (Content)     │  │   (Media)       │  │ (Maps, WhatsApp)│
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 6.3 Structura Proiect

```
dentcraft/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx (homepage)
│   │   ├── echipa/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── servicii/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── galerie/page.tsx
│   │   ├── testimoniale/page.tsx
│   │   ├── preturi/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── faq/page.tsx
│   │   └── [...legal]/page.tsx
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── upload/route.ts
│   │   └── newsletter/route.ts
│   └── globals.css
├── components/
│   ├── ui/ (design system)
│   ├── layout/ (header, footer, nav)
│   ├── sections/ (hero, testimonials, etc.)
│   ├── features/ (calculator, gallery, etc.)
│   └── forms/
├── lib/
│   ├── sanity/ (client, queries)
│   ├── utils/
│   └── hooks/
├── messages/ (translations)
│   ├── ro.json
│   ├── en.json
│   └── hu.json
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon/
├── sanity/
│   ├── schemas/
│   └── lib/
├── styles/
└── types/
```

### 6.4 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 90 | Desktop & Mobile |
| Lighthouse Accessibility | > 95 | All pages |
| Lighthouse SEO | > 95 | All pages |
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals |
| FID (First Input Delay) | < 100ms | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| TTFB (Time to First Byte) | < 200ms | Server response |
| Bundle Size (Initial) | < 150KB | Gzipped JS |
| Image Optimization | WebP + AVIF | Next/Image |

### 6.5 Securitate

| Aspect | Implementare |
|--------|--------------|
| HTTPS | Obligatoriu, Vercel default |
| Headers | CSP, X-Frame-Options, etc. |
| Forms | CSRF protection, rate limiting |
| Uploads | Validare server, virus scan |
| Data | Encryption at rest |
| Auth (CMS) | Sanity auth, 2FA |
| GDPR | Consent management, data deletion |

### 6.6 Integrari Third-Party

| Serviciu | Scop | Prioritate |
|----------|------|------------|
| Google Analytics 4 | Analytics trafic | Critica |
| Google Maps | Localizare | Critica |
| WhatsApp Business | Contact | Critica |
| Google Business | Reviews embed | Inalta |
| Instagram | Video embed (Reels) | Medie |
| Resend/SendGrid | Email transactional | Inalta |
| Vercel Analytics | Performance monitoring | Medie |
| Sentry | Error tracking | Medie |

---

## 7. Content Requirements

### 7.1 Content per Pagina

| Pagina | Content Necesar | Responsabil | Status |
|--------|-----------------|-------------|--------|
| Homepage | Texte hero, statistici, beneficii | Client + Copywriter | Pending |
| Echipa | Bio doctori, poze, certificari | Client | Pending |
| Servicii (x9) | Descrieri, FAQ, preturi | Client + Copywriter | Pending |
| Contact | Adresa, program, harta | Client | Pending |
| Galerie | Min 20 cazuri Before/After | Client | Pending |
| Testimoniale | Min 10 text + 5 video | Client | Pending |
| Preturi | Lista completa cu preturi | Client | Pending |
| Blog | Min 5 articole la lansare | Copywriter | Pending |
| FAQ | Min 30 intrebari | Client + Copywriter | Pending |
| Legal | Texte GDPR | Lawyer/Template | Pending |

### 7.2 Assets Media

| Tip | Cantitate Min | Format | Dimensiuni | Responsabil |
|-----|---------------|--------|------------|-------------|
| Poze clinica | 15-20 | JPG/PNG | Min 2000px width | Fotograf |
| Poze echipa | 1/persoana + grup | JPG/PNG | Min 1000x1000px | Fotograf |
| Poze Before/After | 20 seturi | JPG/PNG | Min 1000px | Client |
| Video testimoniale | 5-10 | MP4 | 1080p, 30-60s | Videograf |
| Video Reels doctori | 3-5 | MP4 | Vertical, 15-30s | Client |
| Logo | 1 | SVG + PNG | Vector | Designer |
| Favicon | 1 set | ICO, PNG | Multiple sizes | Designer |
| Iconite servicii | 9 | SVG | 64x64px | Designer |

### 7.3 Traduceri

| Limba | Pagini | UI Strings | Responsabil |
|-------|--------|------------|-------------|
| Romana | Toate | Toate | Default |
| Engleza | Toate | Toate | Translator |
| Maghiara | Toate | Toate | Translator |

**Numar estimat cuvinte de tradus:** ~15,000/limba

---

## 8. SEO Requirements

### 8.1 On-Page SEO

| Element | Implementare |
|---------|--------------|
| Title Tags | Unice per pagina, max 60 chars, keyword first |
| Meta Descriptions | Unice per pagina, max 155 chars, CTA included |
| H1 | Unul per pagina, keyword relevant |
| URL Structure | Clean, descriptive, fara parametri |
| Image Alt Tags | Descriptive, keyword cand relevant |
| Schema Markup | LocalBusiness, MedicalBusiness, FAQPage, Article |
| Sitemap XML | Auto-generated, submitted Google |
| Robots.txt | Configured correctly |
| Canonical URLs | Implemented for all pages |
| Hreflang | Correct implementation all 3 languages |

### 8.2 Technical SEO

| Element | Implementare |
|---------|--------------|
| HTTPS | Enforced |
| Mobile-Friendly | Responsive design |
| Page Speed | Optimized (see Performance) |
| Core Web Vitals | Passing |
| Crawlability | No blocked resources |
| Indexability | Proper noindex where needed |
| Internal Linking | Strategic, contextual |
| 404 Page | Custom, helpful |
| Redirects | 301 for any URL changes |

### 8.3 Local SEO

| Element | Implementare |
|---------|--------------|
| Google Business Profile | Optimized, linked |
| NAP Consistency | Identical across site |
| Local Schema | Address, hours, geo |
| Google Maps | Embedded, optimized |
| Local Keywords | Integrated naturally |
| Reviews | Google reviews integration |

### 8.4 Target Keywords

**Primary Keywords:**
- stomatolog satu mare
- clinica stomatologica satu mare
- dentist satu mare
- implant dentar satu mare

**Secondary Keywords:**
- fatete dentare satu mare
- albire dinti satu mare
- aparat dentar satu mare
- extractie molar minte
- urgente stomatologice satu mare

**Long-tail Keywords:**
- cat costa un implant dentar in satu mare
- cel mai bun stomatolog din satu mare
- clinica dentara cu program weekend satu mare

---

## 9. Timeline Estimat

### 9.1 Overview

**Durata totala:** 4-6 saptamani
**Start estimat:** [Data confirmare]
**Deadline estimat:** [Start + 6 saptamani]

### 9.2 Faze Proiect

```
Saptamana 1: Discovery & Design
├── Ziua 1-2: Kickoff, colectare assets
├── Ziua 3-4: Wireframes low-fidelity
└── Ziua 5: Review, feedback

Saptamana 2: Design & Setup
├── Ziua 1-3: UI Design high-fidelity
├── Ziua 4: Design review, iteratii
└── Ziua 5: Setup proiect, CMS

Saptamana 3: Development Core
├── Ziua 1-2: Layout, navigation, homepage
├── Ziua 3-4: Pagini servicii, echipa
└── Ziua 5: Galerie, testimoniale

Saptamana 4: Development Features
├── Ziua 1-2: Calculator, formulare
├── Ziua 3: Blog, FAQ
├── Ziua 4: Multilingv implementare
└── Ziua 5: Integrari (WhatsApp, Maps, Analytics)

Saptamana 5: Content & Polish
├── Ziua 1-2: Content integration
├── Ziua 3: Traduceri
├── Ziua 4: Testing, bug fixes
└── Ziua 5: Optimizari performance

Saptamana 6: Launch
├── Ziua 1-2: UAT (User Acceptance Testing)
├── Ziua 3: Final fixes
├── Ziua 4: DNS, launch preparation
└── Ziua 5: GO LIVE + monitoring
```

### 9.3 Milestones

| Milestone | Data Target | Deliverable |
|-----------|-------------|-------------|
| M1: Design Approved | End Week 2 | Figma complete |
| M2: Homepage Live (Dev) | End Week 3 | Functional homepage |
| M3: All Pages Complete | End Week 4 | Full site dev env |
| M4: Content Complete | End Week 5 | All content integrated |
| M5: Launch | End Week 6 | Live site |

### 9.4 Dependencies & Risks

| Dependency | Owner | Risk Level | Mitigation |
|------------|-------|------------|------------|
| Poze clinica/echipa | Client | High | Scheduler photo session early |
| Texte servicii | Client | Medium | Provide templates |
| Video testimoniale | Client | Medium | Start collection Week 1 |
| Traduceri | Translator | Medium | Parallel with dev |
| Domain/DNS access | Client | Low | Request early |
| Feedback timely | Client | Medium | Schedule fixed review slots |

---

## 10. Success Metrics

### 10.1 Launch Metrics (Day 1)

| Metric | Target | Measurement |
|--------|--------|-------------|
| All pages live | 100% | Manual check |
| All languages working | 100% | Manual check |
| Lighthouse Score | > 90 | Lighthouse |
| No critical bugs | 0 | Testing |
| SSL Active | Yes | Browser check |

### 10.2 Short-term Metrics (30 days)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Organic impressions | > 1,000 | Google Search Console |
| Unique visitors | > 500 | Google Analytics |
| Avg session duration | > 2 min | Google Analytics |
| Bounce rate | < 50% | Google Analytics |
| Contact form submissions | > 10 | Form tracking |
| WhatsApp clicks | > 50 | Event tracking |
| Mobile traffic | > 60% | Google Analytics |

### 10.3 Medium-term Metrics (90 days)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Google ranking "stomatolog satu mare" | Top 10 | Rank tracking |
| Organic traffic growth | +50% MoM | Google Analytics |
| Lead conversion rate | > 3% | Analytics + CRM |
| Page speed (real users) | Good CWV | Search Console |
| Indexed pages | 100% | Search Console |
| Backlinks acquired | > 5 | Ahrefs/SEMrush |

### 10.4 Long-term Metrics (6 months)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Google ranking primary KW | Top 3 | Rank tracking |
| Monthly organic visitors | > 2,000 | Google Analytics |
| Monthly leads | > 30 | CRM |
| Google Reviews | +10 new | Google Business |
| Patient acquisition from web | > 15% | Client feedback |

---

## Anexe

### A. Referinte Design

1. **Apple.com** - Minimalism, whitespace, typography
2. **Dentakay.com** - Dental context, service presentation
3. **Stripe.com** - Micro-interactions, polish

### B. Competitor Analysis

| Competitor | URL | Strengths | Weaknesses |
|------------|-----|-----------|------------|
| [Local 1] | TBD | TBD | TBD |
| [Local 2] | TBD | TBD | TBD |
| Dentakay | dentakay.com | Design, content | Too busy |

### C. Technical Documentation Links

- Next.js: https://nextjs.org/docs
- Sanity: https://www.sanity.io/docs
- Tailwind: https://tailwindcss.com/docs
- next-intl: https://next-intl-docs.vercel.app/
- Vercel: https://vercel.com/docs

### D. Legal Compliance Checklist

- [ ] GDPR Privacy Policy
- [ ] Cookie Policy
- [ ] Terms & Conditions
- [ ] Cookie Consent Implementation
- [ ] Data Processing Agreement (if needed)
- [ ] Right to Deletion mechanism
- [ ] Contact form data handling

---

**Document Approval**

| Role | Nume | Data | Semnatura |
|------|------|------|-----------|
| Client | Dr. Razvan Petric | | |
| Project Manager | | | |
| Lead Developer | | | |

---

*Acest document este un document viu si poate fi actualizat pe parcursul proiectului cu acordul tuturor partilor.*

**Ultima actualizare:** 15 Ianuarie 2026
