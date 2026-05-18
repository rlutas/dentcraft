# Go-Live Checklist — DENTCRAFT.ro

**Status la 18 May 2026:** 🚀 **SITE LIVE** pe `https://www.dentcraft.ro`. Maintenance off, indexabil, toate API-urile email funcționează, performance optimizat (FCP 0.56s, payload 0.63 MB). Mai sunt câțiva pași non-code de finalizat (Search Console submit + Google Business Profile).

---

## 🚦 UNDE AM RĂMAS — Quick Status

| Etapă | Status | Note |
|---|---|---|
| **Design + conținut** | ✅ COMPLET | Toate paginile finalizate, brand DENTCRAFT, paletă unificată |
| **Brand DENTCRAFT caps** | ✅ COMPLET | ~85 apariții replace; salvat ca regulă |
| **I18n RO/EN/HU** | ✅ COMPLET | Toate paginile traduse complet; helper translateTeamRole |
| **Hero MJ + optimizat** | ✅ COMPLET | Landscape 271KB, portrait 9:20 142KB, AVIF/WebP auto |
| **Cazuri de succes** | ✅ COMPLET | 4 fețe pacienți, lightbox + keyboard nav (înlocuit before/after slider) |
| **Video clinic LAZY** | ✅ COMPLET | LazyVideo: poster initial, MP4 doar la scroll (payload −93%) |
| **Dr. Petric content verificat** | ✅ COMPLET | 2016 Cluj, 6 cursuri reale, 10+ ani / 1500+ pacienți |
| **Echipa finalizată** | ✅ COMPLET | 3 medici + 2 staff (Petric, Ghirasim, Tincu + Camelia, Karla) |
| **Calculator promovat** | ✅ COMPLET | Banner landing + reason #4 + servicii/[slug] hero |
| **Diacritice + dark theme** | ✅ COMPLET | Toate textele UI + toate butoanele `#1a1a1a` |
| **Footer credit + WhatsApp** | ✅ COMPLET | Crafted by Luțaș Raul → +40 745 850 700 |
| **Cookie banner timing** | ✅ COMPLET | 3s delay (după animații hero) |
| **Forms + Resend** | ✅ TESTAT LIVE | /api/contact, /api/callback, /api/price-estimate — toate `success:true` |
| **Analytics + Speed Insights** | ✅ COMPLET | GTM-MHB5K5LL + Vercel Analytics + Speed Insights |
| **Consent Mode v2 + cookie banner** | ✅ COMPLET | Default denied, banner cu 3 nivele, localStorage persistence |
| **Legal pages extinse** | ✅ COMPLET | Privacy, Cookies, **Terms extins cu IP/marca/anti-copy** — 3 limbi |
| **GO-LIVE COD (reverturi)** | ✅ DEPLOYAT | robots.ts indexabil, seo.ts conditional noIndex, maintenance opt-in |
| **GO-LIVE Vercel env** | ✅ ACTIV | `NEXT_PUBLIC_MAINTENANCE_MODE` ștearsă, redeploy făcut |
| **Domain DNS** | ✅ LIVE | `www.dentcraft.ro` → 200 OK, HTTPS+HSTS+CSP |
| **OG image + Favicon** | ✅ CONFIGURATE | `og:image` `team-clinic.webp` 1200×630; favicon.ico, apple-touch, manifest |
| **PageSpeed (după lazy video)** | ✅ EXCELENT | FCP 556 ms, payload 0.63 MB (de la 9.15 MB) |
| **GSC DNS verification** | ✅ DNS PROPAGAT | TXT record activ; click VERIFICAȚI în GSC ca să finalizeze |
| **GSC sitemap submit** | ⏳ DUPĂ VERIF | Submit `sitemap.xml` după ce verifici proprietatea |
| **GSC request indexing** | ⏳ DUPĂ SUBMIT | Cere indexare pentru paginile principale |
| **Google Business Profile** | ⏳ MANUAL | Revendică/optimizează pentru local SEO |

**🎉 Totul gata în cod. Mai rămân doar pași manuali în GSC + GBP.**

---

## 1. Switch site to live (cod) — 4 modificări

Toate sunt marcate cu `TODO` în cod (caută `under construction`).

### 1.1 `src/app/robots.ts`
Înlocuiește conținutul cu:
```ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
    host: siteConfig.baseUrl.replace(/^https?:\/\//, ''),
  }
}
```

### 1.2 `src/lib/seo.ts` (linii ~234 + ~412)
**Block 1** (în `generatePageMetadata`):
```ts
// Replace:
metadata.robots = { index: false, follow: false, googleBot: { ... } }
// With:
if (noIndex) {
  metadata.robots = { index: false, follow: false }
}
```
Și redenumește parametrul `_noIndex` înapoi în `noIndex` (linia ~165).

**Block 2** (în `generateRootMetadata`, linia ~412):
```ts
// Replace:
robots: { index: false, follow: false, googleBot: { ... } }
// With:
robots: {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}
```

### 1.3 `src/app/[locale]/layout.tsx`
Șterge:
- Linia 19-21 (`const isMaintenanceMode = ...`)
- Linia 57 (`showMaintenance` const)
- Linia 100-105 (conditional block care randează `<MaintenancePage />`)
- Importul `MaintenancePage` (linia 16)

Sau cel mai simplu: scoate variabila env în Vercel (vezi 2.2). Codul rămâne, dar nu se mai activează.

### 1.4 Verificare finală
```bash
grep -rn "under construction\|TEMPORARY.*noindex\|TODO.*launch" src/
# Toate rezultatele trebuie să fie comentarii care explică ce s-a făcut, nu cod activ.
```

---

## 2. Vercel — Environment + Domain

### 2.1 Domain
- [ ] `dentcraft.ro` și `www.dentcraft.ro` pointate către Vercel (DNS A/CNAME)
- [ ] SSL valid (Vercel-managed)
- [ ] Middleware redirect funcționează: `dentcraft.vercel.app → www.dentcraft.ro` (deja în cod, `src/middleware.ts`)

### 2.2 Environment variables (Vercel → Project → Settings → Environment Variables)
Sunt în `.env.local` local — trebuie să fie pe Vercel (Production env):

**Obligatorii:**
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://www.dentcraft.ro`
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` = `4w5dvd6h`
- [ ] `NEXT_PUBLIC_SANITY_DATASET` = `production`
- [ ] `NEXT_PUBLIC_SANITY_API_VERSION` = (data din .env.local)
- [ ] `SANITY_API_TOKEN` = (token cu read perms)
- [ ] `RESEND_API_KEY` = (key Resend production)
- [ ] `RESEND_AUDIENCE_ID` = (ID audience marketing contacts)
- [ ] `CONTACT_EMAIL` = adresa unde ajung lead-urile
- [ ] `NEXT_PUBLIC_GTM_ID` = ID Google Tag Manager
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` = `40741199977` (sau cel curent)
- [ ] `NEXT_PUBLIC_PHONE_NUMBER` = `0741199977`
- [ ] `NEXT_PUBLIC_EMAIL` = `contact@dentcraft.ro`
- [ ] `PREVIEW_ACCESS_TOKEN` = token pentru preview Sanity

**De scos (sau setat la `false`):**
- [ ] `NEXT_PUBLIC_MAINTENANCE_MODE` → şterge complet sau setează `false`

---

## 3. Build & Deploy verification

```bash
# Local sanity check
rm -rf .next && npm run build
# Should complete with no errors (ESLint warnings OK)
```

- [ ] Build trece pe Vercel
- [ ] Toate cele 3 locale-uri redă corect: `/`, `/en`, `/hu`
- [ ] Sanity Studio funcționează: `https://www.dentcraft.ro/studio`
- [ ] API routes răspund: `/api/callback`, `/api/contact`, `/api/price-estimate`
- [ ] Sitemap public: `https://www.dentcraft.ro/sitemap.xml`
- [ ] Robots: `https://www.dentcraft.ro/robots.txt` (must show `Allow: /`)

---

## 4. Smoke tests live

**Forms — fiecare trimite email + adaugă contact Resend:**
- [ ] `/contact` form
- [ ] Footer callback button
- [ ] `/preturi` calculator (cu email opțional)
- [ ] Verifică în Resend dashboard că audience-ul primește contactele

**Booking link (Programează consultație):**
- [ ] Click pe orice "Programează acum" → redirect către sistemul de programări

**Calculator promo (cele 3 placements adăugate 14 May):**
- [ ] Homepage banner dark "Calculator instant de preț" → click CTA → ajunge la `/preturi#calculator`
- [ ] Homepage reason #4 "Prețuri transparente" → link inline funcționează
- [ ] `/servicii/[orice-slug]` hero butonul "Calculează prețul" → ajunge la `/preturi#calculator`

**Limba:**
- [ ] Toggle RO/EN/HU în header — toate paginile traduse
- [ ] Hreflang în source: 3 alternate links per pagină

**Mobile:**
- [ ] WhatsApp button vizibil bottom-right
- [ ] Cookie banner apare la prima vizită (cream styling)
- [ ] Floating icons rămân în secțiunea lor (nu trec în vecină)
- [ ] Footer `Crafted by Luțaș Raul →` deschide WhatsApp către `+40 745 850 700`

---

## 5. SEO post-launch (în primele 24-48h)

- [ ] Google Search Console: verifică proprietatea `dentcraft.ro` (sau confirmă că e deja verificată)
- [ ] Submit sitemap în GSC: `https://www.dentcraft.ro/sitemap.xml`
- [ ] **Request re-indexing** în GSC pentru paginile principale (`/`, `/servicii`, `/echipa`, `/preturi`, `/contact`)
- [ ] Bing Webmaster Tools — același flow
- [ ] Google My Business: verifică că `dentcraft.ro` apare ca site URL pe fișa de clinică Satu Mare
- [ ] Verifică OpenGraph image pe Facebook Debugger: `https://developers.facebook.com/tools/debug/`
- [ ] Verifică Twitter Card pe `https://cards-dev.twitter.com/validator`

---

## 6. Performance baseline (după go-live)

PageSpeed Insights mobile țintă (deja atins în testare):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

Rulează: https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.dentcraft.ro

---

## 7. Conținut care AȘTEAPTĂ încă (nu blochează go-live)

Din `docs/content-needs-dr-petric.md` și `docs/content-checklist.md`:
- [ ] More YouTube Shorts per medic (deja avem Dr. Giovana — funcționează cu placeholder pentru ceilalți)
- [ ] More before/after cases (gallery fallback functional)
- [ ] Blog posts adiționale (există un fallback complet)
- [ ] Galerie clinică suplimentară

**Nimic din cele de mai sus nu trebuie să blocheze launch-ul.** Site-ul e funcțional și complet cu fallback data.

---

## 8. Post-launch monitoring (prima săptămână)

- [ ] Vercel Analytics — număr de vizite per pagină
- [ ] Vercel Speed Insights — Core Web Vitals real users
- [ ] Resend dashboard — emails delivered + contacts adăugați
- [ ] GTM — verifică că eveniments-urile se trag (form submit, calculator complete)
- [ ] Search Console — primele impresii organice

---

## Summary: 🎉 LIVE — ce mai e de făcut

✅ **LIVE de pe 18 May 2026:**
- Design system v2 complet, toate paginile
- Brand DENTCRAFT caps peste tot
- Conținut Dr. Petric verificat
- Echipa: 3 medici + 2 staff
- SEO meta + schema markup + sitemap.xml + robots.txt indexabil
- i18n complet (RO/EN/HU) cu helper translateTeamRole
- Cazuri de succes cu lightbox (înlocuiește before/after)
- Video clinic lazy-loaded (payload −93%)
- Forms + Resend (TESTAT LIVE — emails se trimit)
- Analytics + Speed Insights + Consent Mode v2 GTM
- Legal pages extinse cu IP/marcă/anti-copy
- OG image + favicon configurate corect
- PageSpeed: FCP 556 ms, payload 0.63 MB
- HTTPS + HSTS + CSP + X-Frame-Options
- Maintenance mode opt-in
- DNS TXT verification pentru Google Search Console deja propagat

⏳ **De finalizat manual (în afara codului):**

### A. Google Search Console (5-10 min)
1. Click **VERIFICAȚI** pe popup-ul DNS (TXT e deja propagat)
2. Sitemaps → Submit `sitemap.xml`
3. URL Inspection → "Request Indexing" pentru paginile principale:
   - `/`, `/servicii`, `/echipa`, `/preturi`, `/contact`, `/galerie`, `/blog`
4. (opțional) Adaugă și `https://dentcraft.ro` (non-www) ca proprietate separată

### B. Google Business Profile (15-30 min)
- Revendică / verifică listing-ul "DENTCRAFT Satu Mare"
- Adaugă poze (clinică, echipă, cazuri)
- Linkează site-ul live
- Setează ore, servicii, atribute (parking, accesibilitate)
- Postează prima actualizare (announcement go-live)

### C. Bonus (opțional)
- Bing Webmaster Tools — import 1-click din GSC
- Verifică GA4 în GTM Preview Mode că events-urile se trag (form_submit, generate_lead, click_whatsapp, click_phone)
- Resend dashboard — verifică audience-ul după primele submituri
- Monitorizare prima săptămână: Vercel Analytics + Speed Insights + GSC impressions
