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

## 7a. Performanță (din raportul CWV, `docs/seo/CWV-VISUAL-REVIEW-2026-11-24.md`)

| Commit | Ce s-a făcut |
|---|---|
| `3ba1ba1` | **Textul de sus (hero) e vizibil de la încărcare**, pe homepage și pe paginile de servicii. Fiind elementul LCP, fade-in-ul îl întârzia cu 2–3 s. Butonul „Programează acum” trimitea la `#contact`, care nu există; acum duce la /contact. CountUp pornește de la valoarea finală, iar eroarea de hidratare #418 a dispărut. Slider-ul afișează numărul exact de recenzii. |
| `2bb7cbc` | **Cache CDN.** `cookies()` se apelează doar în modul mentenanță. Cookie-ul `NEXT_LOCALE` e oprit, iar paginile se reîmprospătează la o oră (`revalidate = 3600`). Paginile sunt acum statice; verificat live cu `x-vercel-cache: HIT`. /blog, /galerie și /testimoniale rămân dinamice (filtre). |
| `9168821` | **Videoul de pe homepage are 3,0 MB în loc de 7,96 MB.** E codat 1280×720 H.264, CRF 25, cu SSIM 0,984; diferența nu se vede. Fișierul nou e `clinica-v2.mp4`. |
| `f31d647` | **gtag.js se încărca de 2 ori.** Am scos copia directă din layout. Tagul Google AW-18165025740 și Conector de conversii erau deja în GTM; verificat live: un singur `gtag/js?id=AW-…`, iar remarketingul funcționează. |

## 7b. Design și ilustrații (`5d79df8`…`524e93f`, `179684b`, `904e702`)

- /testimoniale folosește cardul de pe homepage; arată 12 recenzii, apoi butonul „Vezi mai multe recenzii” (+12).
- Citatul mare de pe homepage a fost scos (`a86fa2f`): ocupa prea mult loc.
- Pe mobil există o bară fixă cu „Programează”, WhatsApp și telefon. Nu apare pe /contact. Bula de WhatsApp apare doar de la md în sus.
- Header-ul se ascunde la scroll în jos și reapare la scroll în sus.
- Paginile de servicii au numerotare 01/02/03; titlurile au stilul Bold / *serif italic* pe /testimoniale, /preturi, /faq și în footer.
- În timeline-ul Dr. Fernea, intrările fără dată au un punct în loc de o etichetă goală.
- Toate cele 14 servicii au ilustrații 3D noi (GPT Image 2.6 prin Higgsfield, ~28 de credite), salvate ca `public/images/services/<slug>-v2.webp`. Sufixul `-v2` ocolește cache-ul de imagini.
- Checklist pentru Dr. Petric: https://claude.ai/artifact/VbbT8jEcjce13WhXFu8tiP

## 7c. Runda 2 de design, diacritice, 404 (`616b565`, `4069e7b`, `9c1bcd6`, `9ed399c`)

- **Diacritice peste tot:** `ro.json`, textele scrise direct în cod, blogul, paginile legale, emailurile și `treatments.ts` (ş/ţ cu sedilă înlocuite cu ș/ț). Textele recenziilor Google au rămas neatinse. Atenție: `treatments.ts` e generat din Stomawin; dacă rulezi din nou `scripts/generate-treatments.mjs`, corecturile se pierd.
- **Cardurile de servicii de pe homepage:** au texte noi, de lungimi apropiate (RO 115–139 caractere, EN/HU 125–140), fiecare cu numele serviciului și Satu Mare. Am scos „la microscop” de la endodonție, pentru că nu e confirmat.
- **/testimoniale refăcut:** antet crem, bloc mare cu nota 4,9, o recenzie evidențiată ca citat, apoi coloane de recenzii pe crem. Avatarele și stelele folosesc culorile clinicii (la fel pe homepage).
- **Sliderul de recenzii** merge cu ~24 px/s (înainte ~85). Se oprește la hover, la focus și la atingere.
- **Profilul medicului:** etichetele cu specializări au fost înlocuite de o listă simplă cu linii subțiri.
- **Header pe paginile fără poză:** dunga ciudată din lateral a dispărut (fundal crem sub meniu, decorul de colț coborât).
- **Imagini OG:**
  - 14 imagini noi pentru servicii, făcute cu ilustrațiile, cu `scripts/generate-service-og.py`.
  - Cardurile medicilor sunt refăcute fără halou în jurul pozei.
  - Camelia Gherman are acum card.
- **Pagina 404 nouă:** un dinte cu pungă de gheață pe post de „0” din 404, texte în RO/EN/HU, butoane spre homepage și contact, telefon pentru durere, `noindex`.
- **TikTok:** contul clinicii e `@dentcraftsm`. În GBP apare `@petricr13`, contul personal al doctorului; aștept decizia lui Raul dacă îl înlocuim.

## 7d. Audit Google Ads (24 nov)

Raportul complet: https://claude.ai/artifact/QP8g4bvoAGMHYE5BWNetvC

- **30 de zile:** 2.285 RON, 22 de conversii, ~104 RON/conversie. Brand și Ortodonție ies la ~23–25 RON/conversie; Prețuri la 251 RON/conversie.
- **Pasul 1, aplicat pe 24 nov (aprobat de Raul):**
  - 36 de negative pe potrivire de expresie;
  - locația pe „Prezență”;
  - licitare -30% în afara intervalului L–V 10–18;
  - „dentist satu mare” pe potrivire de expresie, varianta amplă întreruptă;
  - cele 3 cuvinte „invisalign”, întrerupte.
- Detalii și pașii 2–3 în `docs/google-ads/AUDIT-2026-11-24.md`. Verificare ~8 dec.
- **404 refăcut** (`62dba17`, `9de91d5`):
  - hero pe tot ecranul, care trece pe sub meniu, fără dunga de culoare din jur;
  - dinte mai mare, cu glow și cercuri subțiri;
  - linkuri rapide ca pastile cu iconițe;
  - card închis la culoare pentru urgențe.
- `d07a633`: am pus la loc `services.metaTitle` în EN și HU; se pierduse la commit-ul 404.
- Checklistul pentru Dr. Petric are acum secțiunea „7. Ce am făcut pe 24 noiembrie”.

## 7e. Pagini de servicii refăcute, bara de mobil, cod poștal (după-amiaza)

- **Bara de jos pe mobil** (`15971b1`, `94df72f`, `4d90b3f`): bară plutitoare albă în stilul header-ului. „Programează” deschide popup-ul „Te sunăm noi” (înainte ducea la /contact). Bara se ascunde când e deschis un popup.
- **„Sfaturi de la doctorii noștri”** (`15971b1`): carusel orizontal pe mobil, cu puncte; grid de 3 coloane pe desktop.
- **Logo footer pe mobil** (`572cbc6`): 28px în loc de 40px.
- **Cod poștal** (`bb60f36`): schema LocalBusiness folosește 440055 (str. Barbu Ștefănescu Delavrancea, toate numerele, după codpostal.com.ro). În GBP nu s-a modificat nimic.
- **Pagini de servicii, runda 1** (`063c7a5`): h1 afișat imediat, pe maxim 3 rânduri la 390px, fundaluri alternate alb/crem, ScrollReveal cu prefers-reduced-motion, bio-ul medicului limitat la 3 rânduri, specializările ca rând simplu în loc de pastile.
- **Pagini de servicii, runda 2** (`f026e0b`, `e300ecd`, `596db5e`, `4c1d7ff`, `9dcfba9`):
  - Hero: același layout pe toată lățimea, cu ilustrația fără card. În spate: lumină caldă care pulsează și inele tan care se rotesc încet. Iconițe specifice fiecărui serviciu orbitează în spatele ilustrației. Ilustrația plutește 10px în 7s; pe desktop are parallax cu mouse-ul.
  - „Pe scurt”: card centrat cu ghilimea serif mare, iar numele medicilor apar evidențiate. Rândul vizibil „Actualizat” a fost scos.
  - Beneficii în layout bento, etape pe o linie de timp care se desenează la scroll, cuprins sticky pe desktop, un singur FAQ în acordeon, carduri de medici cu poza întreagă, servicii conexe cu scroll orizontal pe mobil.
  - Implanturi dentare: cele două liste FAQ sunt unite (11 întrebări, o singură schemă FAQPage). Blocul de prețuri și local SEO e acum deasupra FAQ-ului, cu cardul de prețuri sticky.
  - Textele și JSON-LD sunt identice cu versiunea anterioară, cu o excepție: FAQ-ul unit de la implanturi.
  - Ultima rundă (în lucru la ieșire): spațiu sub cardul cu bife din textul principal; în colțul „Pe scurt”, inel rotativ cu iconița serviciului.
  - De urmărit: pe desktop, LCP-ul e acum ilustrația din hero, care pornește de la opacitate 35%. Verificăm CWV peste câteva zile.

## 8. De făcut / decizii

- [ ] **Prețuri de la Dr. Petric.** Apoi unificăm `/preturi`, `/servicii/implanturi-dentare` (`ServiceLocalSeo.tsx` încă arată 2.200–4.000 lei), blogul și calculatorul.
- [x] **GBP:** Instagram era `instagram.com/house_of_dentistry`, o clinică străină. L-am schimbat în `instagram.com/dentcraft.sm` pe 24 nov; schimbarea așteaptă aprobarea Google (~10 minute).
- **GBP:** link-ul de programare rămâne așa (Raul preferă popup-ul; apex-ul redirecționează oricum spre www).
- [x] **Google Ads:** final URL-ul anunțului de implant e acum `/servicii/implanturi-dentare` (24 nov).
- [ ] GBP, categoria „Radiologie dentară”: rămâne așa, la decizia lui Raul.
- [x] Performanță: `cookies()` din `src/app/[locale]/layout.tsx` face ca toate paginile să fie `no-store`. Separat, homepage-ul are 725 KB de HTML. De rezolvat după raportul CWV, într-un commit separat (atinge consent-ul).
- [ ] Recenzii: program de cereri, cu ținta de 10+ pe lună.
- [x] Imagine OG pentru Camelia (`438d678`).
- [ ] `og:url` lipsește pe ~100 de pagini; H1 pe /preturi și /contact.
