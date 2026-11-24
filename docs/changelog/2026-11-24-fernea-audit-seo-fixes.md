# 24 noiembrie 2026: Dr. Fernea, audit complet, corecturi SEO și conținut

Jurnalul zilei. Rapoartele de audit sunt în `docs/seo/*-2026-11-24.md`: SITE-AUDIT, LOCAL-AUDIT, SXO-GEO-AUDIT, BACKLINKS, plus CWV-VISUAL-REVIEW când se termină.

## 1. Echipă: Dr. Fernea Remus

| Commit | Ce s-a făcut |
|---|---|
| `13e9bb1` | Am adăugat profilul `/echipa/remus-fernea` (Guided Biofilm Therapy, odontoterapie, protetică). Profilul nu afișează cifre sau statistici, la cererea lui Raul. Anii din educație și certificări sunt acum opționali. Grila de pe homepage are 3+3+1 carduri, cu ultimul centrat. Pe /echipa ultimul card e tot centrat. Poza e decupată cu macOS Vision. |
| `e336adc` | Fiecare medic are acum propria imagine OG la share (`public/images/og/team/*.jpg`). Imaginile se generează cu `scripts/generate-team-og.py`, iar slug-urile sunt listate static în `TEAM_OG_SLUGS`. Excepție: Camelia încă folosește `og-clinic.webp`. |
| `172cb8d` | Sitemap-ul include acum toate profilele echipei (21 de URL-uri). `/echipa/dr-razvan-petric` face redirect 301 spre `razvan-petric`, în toate cele 3 limbi. |

## 2. Corecturi de conținut (afirmații false)

| Commit | Ce s-a corectat |
|---|---|
| `a0d17d7` | Am scos „radiografie 3D / CBCT / CT / radiologie low-dose” din articolul despre implanturi (EN/HU), de pe pagina de implantologie și de pe homepage. `llms.txt` e rescris: 6 medici reali, fără prețuri, fără „radiografie 3D gratuită”. |
| `61026bc` | Am scos „consultație gratuită” peste tot (RO/EN/HU, FAQ, CTA, calculator, meta /preturi, meta blog). Formularea nouă: „prețul final înainte de tratament”. Nicăieri nu apare prețul consultației. Alt-ul pozei `clinic-10` era „Sala de radiologie”; poza arată de fapt un cabinet cu microscop. |

**Reguli permanente:**
- Consultația NU e gratuită.
- Clinica nu are radiologie; sala e planificată pe viitor.
- Nu publicăm cifre de preț până nu le trimite Dr. Petric.

## 3. SEO tehnic

| Commit | Ce s-a făcut |
|---|---|
| `a0d17d7` | Sitemap: articolele de blog apar doar în limbile în care există (înainte, 4 URL-uri EN/HU dădeau 404). Am scos paginile legale, care sunt noindex. Hreflang-ul de pe blog nu mai indică traduceri inexistente. |
| `a56d309` | Titluri și meta noi pentru CTR: toate cele 14 pagini de servicii (RO), paginile statice și homepage-ul. Toate au diacritice și cuvintele pe care le caută oamenii („dentist pentru copii”, „ortodont”, „urgențe stomatologice”), fără prețuri și cu maxim 64 de caractere. Pe EN/HU: echipa are 6 medici (nu 3 sau 5), am scos brandul dublat și am scurtat titlurile prea lungi. Override-urile sunt în `src/lib/seo-overrides.ts`. |
| `a9790ee` | **Am unit `/servicii/implantologie` cu `/servicii/implanturi-dentare`.** Redirect-ul e 308, în RO/EN/HU, și păstrează `?gclid`. Nav-ul, cardul de pe homepage, footer-ul și poza serviciului trimit acum la implanturi-dentare. Sitemap-ul exclude slug-ul vechi. |
| `0699958` | Schema `sameAs` folosea profiluri inexistente (`facebook.com/dentcraft.ro`, `instagram.com/dentcraft.ro`). Acum are profilurile oficiale (FB Dr.PetricRazvan, adică pagina „Dentcraft”, IG dentcraft.sm, YouTube) și link-ul Maps cu CID. |

## 4. Recenzii

| Commit | Ce s-a făcut |
|---|---|
| `66c2bc3` | `/testimoniale` afișa 3 recenzii inventate („Maria P.”, „Andrei M.”, „Elena S.”). Acum afișează recenziile reale de pe Google: 54 cu text, verbatim, în limba originală, cu nota 4,9, 79 de recenzii și link spre Google. `src/data/google-reviews.json` e actualizat din Google Maps pe 24 nov: 23 de recenzii noi, verificate prin hash față de pagină; recenziile șterse au fost scoase; datele relative sunt înlocuite cu lună și an. Schema `aggregateRating` citește valorile din JSON. Recenzia „Rares Petric” e exclusă de pe site, pentru că recenzentul are același nume ca medicul coordonator. |

**De actualizat periodic:** `google-reviews.json`. Vezi `docs/google-reviews-sync.md`; nu există încă cheie SerpAPI.

## 5. Conturi Google (modificări în afara codului)

- **GA4** (proprietatea 525980361): `generate_lead`, `click_phone` și `click_whatsapp` sunt marcate ca evenimente cheie. Înainte nu exista niciun eveniment cheie.
- **GBP:** câmpul „Site” e acum `https://www.dentcraft.ro/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (înainte era `http://`, fără UTM). Modificarea e trimisă la Google pentru aprobare.
- **GSC:** am cerut indexarea pentru `/echipa/remus-fernea`, `/servicii/urgente-dentare` și `/servicii/detartraj`.

## 6. Cifre de referință (audit 24 nov)

- **Ads, 30 de zile:**
  - 1.431 de clicuri, 2.285 RON cost, CPC 1,60 RON;
  - 22 de conversii (9 formular, 9 click pe telefon, 3 WhatsApp, 1 apel), adică ~104 RON pe conversie;
  - buget de 75 RON/zi, limitat de volumul de căutări; scor de optimizare 53%.
- **GSC, 3 luni:**
  - 638 de clicuri (+64%), 20,5K afișări, poziție medie 5,7;
  - 34 de pagini indexate și 71 neindexate (în mare parte EN/HU).
- **GA4, 90 de zile:** 1.783 de sesiuni, din care 62% paid. GA4 vede ~25% din clicurile Ads, din cauza Consent Mode v2 (normal).
- **GBP:** 4,9 din 79 de recenzii. Interacțiunile au scăzut de la 209 (iulie) la 127 (octombrie). Concurenți: Finess are mai multe recenzii; Datcu are 191.

## 7. Texte unice pentru paginile de servicii (`bc7d041`, `c3221f9`)

- **Ce are fiecare pagină acum.** Toate cele 14 servicii au text propriu, în RO, EN și HU. Fiecare pagină are:
  - o introducere de 40–60 de cuvinte;
  - 3–5 secțiuni H2;
  - 4–6 întrebări frecvente, cu FAQPage JSON-LD;
  - linkuri interne spre servicii înrudite.

  Textele sunt în `src/lib/service-content/{ro,en,hu}.ts`.
- **Medicul afișat pe fiecare pagină:**
  - Cozma: ortodonție;
  - Ghirasim: pedodonție și endodonție;
  - Buterchi: chirurgie;
  - Buterchi și Petric: implanturi;
  - Fernea: detartraj (cu link și spre Tincu);
  - Petric: protetică, estetică, fațete, coroane, plus albire, urgențe, consultație și stomatologie generală, unde trebuie confirmat medicul.
- **Urgențe.** Pagina are casetă de apel (luni–vineri 10–18), lista de simptome, ce faci până ajungi la clinică și când mergi la UPU/112.
- **Implanturi.** Pagina explică All-on-X și sinus lift, fără prețuri și fără mărci.
- **Blocuri vechi ascunse pe 11 pagini.** Conțineau afirmații neverificate: Invisalign, „program prelungit”, sedare, „15 ani”, „8 nuanțe” și altele.
- **Descrieri de serviciu rescrise** (ortodonție, estetică, albire). Am scos Invisalign, „rezultate garantate” și „8 nuanțe”.
- **Verificări.** Textele au trecut prin /humanizer și /seo-content. Căutarea de afirmații interzise pe paginile randate nu a găsit nimic.
- **De confirmat cu Dr. Petric:**
  - dacă se fac fațete din compozit;
  - politicile scrise pe pagina de copii (părintele poate sta în cabinet; un copil speriat nu e forțat, ci reprogramat);
  - ce medic apare la albire, urgențe, consultație și stomatologie generală.
- **Rămâne de făcut.** `ServiceLocalSeo` de pe pagina de implanturi arată încă prețuri și mărci, până vin prețurile noi. Bio-urile medicilor sunt doar în română pe paginile EN/HU.

## 7b. În lucru

- Core Web Vitals și review-ul vizual (agent), cu raportul în `docs/seo/CWV-VISUAL-REVIEW-2026-11-24.md`.
- TikTok: contul clinicii e `@dentcraftsm`. În GBP apare `@petricr13`, contul personal al doctorului; aștept decizia lui Raul dacă îl înlocuim.

## 8. De făcut / decizii

- [ ] **Prețuri de la Dr. Petric.** Apoi unificăm `/preturi`, `/servicii/implanturi-dentare` (`ServiceLocalSeo.tsx` încă arată 2.200–4.000 lei), blogul și calculatorul.
- [x] **GBP:** Instagram era `instagram.com/house_of_dentistry`, o clinică străină. L-am schimbat în `instagram.com/dentcraft.sm` pe 24 nov; schimbarea așteaptă aprobarea Google (~10 minute).
- **GBP:** link-ul de programare rămâne așa (Raul preferă popup-ul; apex-ul redirecționează oricum spre www).
- [ ] **Google Ads:** final URL-ul trebuie mutat de pe `/servicii/implantologie` pe `/servicii/implanturi-dentare`. Redirect-ul îl ține funcțional până atunci.
- [ ] GBP, categoria „Radiologie dentară”: rămâne așa, la decizia lui Raul.
- [ ] Performanță: `cookies()` din `src/app/[locale]/layout.tsx` face ca toate paginile să fie `no-store`. Separat, homepage-ul are 725 KB de HTML. De rezolvat după raportul CWV, într-un commit separat (atinge consent-ul).
- [ ] Recenzii: program de cereri, cu ținta de 10+ pe lună.
- [ ] Imagine OG pentru Camelia; `og:url` lipsește pe ~100 de pagini; H1 pe /preturi și /contact.
