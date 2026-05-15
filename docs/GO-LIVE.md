# Go-Live Checklist — Dentcraft.ro

**Status la 15 May 2026:** Site-ul este în **MAINTENANCE / UNDER CONSTRUCTION mode**. Conținut + design = ready. Indexarea SEO este blocată intenționat. Acest document conține pașii exacți pentru a flipa site-ul live.

---

## 🚦 UNDE AM RĂMAS — Quick Status

| Etapă | Status | Note |
|---|---|---|
| **Design + conținut** | ✅ COMPLET | Toate paginile finalizate, brand DentCraft, paletă unificată |
| **Hero MJ + optimizat** | ✅ COMPLET | Landscape 271KB, portrait 9:20 142KB, AVIF/WebP auto |
| **Dr. Petric content verificat** | ✅ COMPLET | 2016 Cluj, 6 cursuri reale, 10+ ani / 1500+ pacienți |
| **Echipa finalizată** | ✅ COMPLET | 3 medici + 2 staff (Petric, Ghirasim, Tincu + Camelia, Karla) |
| **Calculator promovat** | ✅ COMPLET | Banner landing + reason #4 + servicii/[slug] hero |
| **Diacritice + dark theme** | ✅ COMPLET | Toate textele UI + toate butoanele `#1a1a1a` |
| **Footer credit + WhatsApp** | ✅ COMPLET | Crafted by Luțaș Raul → +40 745 850 700 |
| **Cookie banner timing** | ✅ COMPLET | 3s delay (după animații hero) |
| **Forms + Resend + Analytics** | ✅ COMPLET | Toate funcționale local + production |
| **Legal pages** | ✅ COMPLET | Privacy, Cookies, Terms — 3 limbi, lastUpdated 2026-02-26 |
| **PageSpeed mobile** | ✅ 94/100/100/100 | Perf/A11y/BP/SEO — toate sub limite |
| **GO-LIVE COD (4 reverturi)** | ⏳ TODO | Vezi secțiunea 1 mai jos |
| **GO-LIVE Vercel env vars** | ⏳ TODO | Vezi secțiunea 2 mai jos |
| **Post-launch SEO (GSC submit)** | ⏳ AFTER | Vezi secțiunea 5 mai jos |

**Timp estimat până LIVE:** ~30 min (4 reverturi cod + 1 env var change + deploy verify + smoke test).

**Ce face acest doc:** ghidează pas cu pas reverturile + verificările pentru launch. **TODOs în cod sunt deja marcate** — caută `under construction` să le găsești.

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

## Summary: ce e gata, ce nu

✅ **Gata pentru launch:**
- Design system v2 complet, toate paginile
- Conținut Dr. Petric verificat de pe drpetric.ro
- Echipa: 3 medici + 2 staff (decizie Dr. Petric)
- SEO meta + schema markup peste tot
- i18n complet (RO/EN/HU)
- Forms + Resend email/audience
- Analytics + Speed Insights instalat
- Legal pages (privacy/cookies/terms) actualizate
- PageSpeed optimizat (Perf 94 / A11y 100 / BP 100 / SEO 100)
- Calculator promovat în 3 locuri strategice
- Floating icons pe toate secțiunile albe (homepage + servicii + echipa)

⏳ **De făcut pentru launch (cod + Vercel — ~30 min):**
- 4 reverturi de cod din secțiunea 1
- Variabile env în Vercel (secțiunea 2.2)
- Smoke test post-deploy (secțiunile 4–5)
