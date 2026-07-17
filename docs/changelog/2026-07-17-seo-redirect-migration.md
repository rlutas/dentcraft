# 17 iulie 2026 — SEO on-page, migrare drpetric.ro, corecturi conținut

Jurnal complet al zilei, pentru urmărire. Contextul complet: `docs/seo/REDIRECT-PLAN-drpetric-2026-07-17.md`.

## 1. Optimizare on-page (deployat pe dentcraft.ro)

| Commit | Ce s-a făcut |
|---|---|
| `1d764b2` | Pagina `/servicii/implanturi-dentare`: title/meta nou cu oraș + preț („Implant Dentar Satu Mare — Prețuri de la 2.200 lei"), secțiune nouă de conținut local (tabel prețuri pe sistem, pașii tratamentului, FAQ cu 5 întrebări + schemă FAQPage, linkuri interne). `/preturi`: bloc de linkuri interne cu ancore pe intenție. Fișiere noi: `src/lib/seo-overrides.ts`, `src/components/sections/ServiceLocalSeo.tsx`. |
| — | Reindexare cerută în GSC pentru ambele pagini (17 iul, „Indexarea a fost solicitată"). |

Motivație: pagina de implanturi era pe poziția ~54 pentru „implant dentar satu mare" (180 afișări/lună); concurenții din top au pagini locale dedicate.

## 2. Corecturi de conținut (afirmații false eliminate)

| Commit | Ce s-a corectat |
|---|---|
| `5b85138` | Scoase afirmațiile „radiografie 3D CBCT în clinică" din secțiunea de implanturi + meta (clinica NU are radiografie). |
| `d921110` | Aceeași corectură extinsă: traduceri RO/EN/HU (pași servicii, tehnologie) + ambele articole de blog, inclusiv „radiografia 3D gratuită, o facem în cabinet" (fals) din articolul de implant. |

**Regulă permanentă:** clinica nu are aparat de radiografie — nu se afirmă nicăieri; medicul indică investigațiile necesare. Fără „gratuit/gratis" în conținut public. Fără prețuri concrete în comunicate de presă (doar link spre /preturi).

## 3. Migrarea drpetric.ro → www.dentcraft.ro (site-ul vechi domina SERP)

Date: drpetric.ro avea 467 clicuri/3 luni (3× dentcraft.ro), poziția 2,3 pe „implant dentar satu mare pret", 4,1 pe „stomatologie satu mare preturi".

Executat 17 iul 2026:
- **12 redirecturi 301** pagină-la-pagină în **Rank Math → Redirections** (modulul activat; plugin-ul „Redirection" instalat accidental a fost șters).
- **Homepage** (162 clicuri/3 luni): Rank Math nu redirecționează front page → **snippet `template_redirect` în `functions.php`** (tema Hello Elementor), 301 către www.dentcraft.ro, cu excepție pentru utilizatorii logați. ⚠️ **Se pierde la update-ul temei — de reverificat după fiecare update WP/temă** (`curl -sI https://drpetric.ro/` trebuie să dea 301).
- **Toate cele 13 rute verificate live** (301 corecte; wp-admin/wp-login funcționale; 404 rămâne 404).
- **GSC „Schimbarea adresei"** depusă (drpetric.ro → dentcraft.ro, status „Site-ul se mută").
- Imaginea partajată `stomatolog-satu-mare.png` mutată local pe dentcraft.ro (`73a5669`) — site-ul nou nu mai depinde de cel vechi.

## 4. Comunicat de presă (docs/docx/Comunicat-presa-DENTCRAFT-Satu-Mare.docx)

- Scoasă mențiunea de radiografie 3D/CBCT (rămâne doar scannerul intraoral).
- Adăugați medicii cu nume și roluri: Dr. Petric Răzvan-Tudor (coordonator, implantologie + estetică), Dr. Buterchi Codruț-Ciprian (chirurgie dento-alveolară), Dr. Tincu Giovana-Nicoleta (parodontologie), Dr. Ghirasim Denisa-Ștefania (stomatologie copii) + **Dr. Cozma Ștefana (ortodonție, medic nou)**.
- Echipa actualizată de la „șase" la „șapte specialiști" (titlu, lead, secțiunea Despre).
- Fără prețuri concrete în text (doar linkul spre /preturi).

## 5. De urmărit (deadline-uri)

| Când | Ce |
|---|---|
| ~20 iul | Pinguri noi pe conversia de formular în Google Ads (formularul de contact reparat pe 16 iul, commit `66e9ca7`) + emailuri sosite la dentcraftsm@gmail.com |
| săpt. 1–2 | GSC drpetric.ro: scădere afișări; GSC dentcraft.ro: creștere pe „preturi/implant" — semn că transferul merge |
| săpt. 4–8 | Ținta: top 3 pe „implant dentar satu mare (pret)" și „stomatologie satu mare preturi" |
| după update temă WP | Reverificat snippet-ul de homepage-redirect din functions.php (se pierde la update Hello Elementor) |
| când vin poza+info | Adăugat Dr. Cozma Ștefana (ortodonție) pe site — echipa + fallback-team.ts |
| permanent | drpetric.ro plătit + redirecturi active minim 2 ani |
