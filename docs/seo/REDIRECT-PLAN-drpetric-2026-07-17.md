# Plan de migrare SEO: drpetric.ro → www.dentcraft.ro

*Întocmit: 17 iulie 2026 · Bază: export GSC drpetric.ro (ultimele 3 luni)*

## De ce facem asta

drpetric.ro (site-ul vechi, WordPress 7.0.1 + Elementor) încă domină căutările locale:

| Metric (3 luni) | drpetric.ro | dentcraft.ro |
|---|---|---|
| Clicuri organice | **467** | 156 |
| Afișări | **16.372** | 6.106 |
| Poziție medie | **7,4** | 7,8 |

Poziții drpetric.ro pe căutările-cheie (vs dentcraft.ro):

| Căutare | drpetric.ro | dentcraft.ro |
|---|---|---|
| implant dentar satu mare pret | **2,3** | ~18 |
| stomatologie satu mare preturi | **4,1** | ~15 |
| stomatologie satu mare | **4,5** | 6,2 |
| aparat dentar satu mare | **5,2** | 12,4 |
| dentcraft satu mare (!) | 4,1 | 1,1 |

Chiar și căutarea de brand „dentcraft satu mare" afișează site-ul vechi (292 afișări, 7 clicuri furate lunar). Redirectul 301 transferă această autoritate către dentcraft.ro.

## Maparea exactă a redirecturilor (301 permanent)

Ordinea = prioritate după trafic. Toate țintele au fost verificate (HTTP 200).

| # | Sursă (drpetric.ro) | Țintă (www.dentcraft.ro) | Clicuri/3 luni |
|---|---|---|---|
| 1 | `/tarife/` | `/preturi` | 287 |
| 2 | `/` (homepage) | `/` | 162 |
| 3 | `/ortodontie/` | `/servicii/ortodontie` | 15 |
| 4 | `/contact/` | `/contact` | 6 |
| 5 | `/despre-noi/` | `/echipa` | 3 |
| 6 | `/consultatie-si-diagnostic/` | `/servicii/consultatie-stomatologica` | 0 |
| 7 | `/endodontie/` | `/servicii/endodontie` | 0 |
| 8 | `/estetica/` | `/servicii/estetica-dentara` | 0 |
| 9 | `/implantologie/` | `/servicii/implanturi-dentare` | 0 |
| 10 | `/protetica/` | `/servicii/protetica` | 0 |
| 11 | `/profilaxie/` | `/servicii/stomatologie-generala` | 0 |
| 12 | `/politica-de-confidentialitate/` | `/politica-confidentialitate` | 0 |
| 13 | `/politica-cookie/` | `/politica-cookies` | 0 |
| 14 | orice altceva (catch-all) | `/` | — |

## Pași de execuție

### Faza 0 — pregătire (FĂCUT, 17 iul)
- [x] Imaginea `stomatolog-satu-mare.png` folosită de dentcraft.ro de pe drpetric.ro a fost mutată local (`/images/stomatolog-satu-mare.png`) — site-ul nou nu mai depinde de cel vechi.

### Faza 1 — implementare redirecturi ✅ EXECUTAT 17 iul 2026
- [x] 12 redirecturi pagină-la-pagină adăugate în **Rank Math → Redirections** (Rank Math era deja instalat; plugin-ul Redirection instalat din greșeală a fost șters)
- [x] Homepage: Rank Math nu redirecționează front page (limitare cunoscută) → snippet `template_redirect` în `functions.php` (tema Hello Elementor), 301 către www.dentcraft.ro, cu excepție pentru utilizatorii logați. **Atenție: snippet-ul se pierde la update-ul temei Hello Elementor — de repus după update sau de mutat în child theme.**
- [x] Toate cele 13 rute testate live: 301 către ținta corectă; wp-admin/wp-login neafectate; 404-urile rămân 404

### Detalii implementare originale (referință)
Variante, în ordinea preferinței:
1. **Plugin „Redirection"** (WP admin → Plugins): import listă de mai sus, tip 301. Cel mai simplu de întreținut.
2. **.htaccess** (dacă hosting Apache/LiteSpeed) — regulile de mai jos, la începutul fișierului:

```apache
# Migrare permanentă drpetric.ro -> www.dentcraft.ro
RewriteEngine On
RewriteRule ^tarife/?$ https://www.dentcraft.ro/preturi [R=301,L]
RewriteRule ^ortodontie/?$ https://www.dentcraft.ro/servicii/ortodontie [R=301,L]
RewriteRule ^contact/?$ https://www.dentcraft.ro/contact [R=301,L]
RewriteRule ^despre-noi/?$ https://www.dentcraft.ro/echipa [R=301,L]
RewriteRule ^consultatie-si-diagnostic/?$ https://www.dentcraft.ro/servicii/consultatie-stomatologica [R=301,L]
RewriteRule ^endodontie/?$ https://www.dentcraft.ro/servicii/endodontie [R=301,L]
RewriteRule ^estetica/?$ https://www.dentcraft.ro/servicii/estetica-dentara [R=301,L]
RewriteRule ^implantologie/?$ https://www.dentcraft.ro/servicii/implanturi-dentare [R=301,L]
RewriteRule ^protetica/?$ https://www.dentcraft.ro/servicii/protetica [R=301,L]
RewriteRule ^profilaxie/?$ https://www.dentcraft.ro/servicii/stomatologie-generala [R=301,L]
RewriteRule ^politica-de-confidentialitate/?$ https://www.dentcraft.ro/politica-confidentialitate [R=301,L]
RewriteRule ^politica-cookie/?$ https://www.dentcraft.ro/politica-cookies [R=301,L]
RewriteRule ^(.*)$ https://www.dentcraft.ro/ [R=301,L]
```

3. **Cloudflare Bulk Redirects** (dacă DNS-ul e pe Cloudflare) — aceeași listă ca reguli.

### Faza 2 — imediat după activare ✅ EXECUTAT 17 iul 2026
- [x] Test complet script: 13/13 redirecturi 301 corecte
- [x] GSC „Schimbarea adresei": depusă 17 iul 2026 (drpetric.ro → dentcraft.ro, status „Site-ul se mută") — depusă de Raul
- [x] Imaginea partajată stomatolog-satu-mare.png mutată local pe dentcraft.ro (commit 73a5669)

### Faza 3 — săptămânile 1–4
- [ ] Domeniul drpetric.ro rămâne plătit și cu redirecturile active **minim 2 ani** (recomandat: permanent).
- [ ] Hostingul WP poate fi retrogradat la cel mai ieftin plan după ~3 luni (redirecturile pot trece pe Cloudflare gratuit, fără WP).
- [ ] Monitorizare GSC dentcraft.ro: pozițiile pe „stomatologie satu mare preturi", „implant dentar satu mare pret", „aparat dentar satu mare" — transferul se vede de regulă în 2–6 săptămâni.
- [ ] Actualizat linkurile externe controlabile (profil GBP dacă mai apare drpetric.ro undeva, directoare medicale, social media).

## Riscuri și cum le tratăm
- **Pierdere temporară de poziții (1–3 săptămâni)** în timpul consolidării — normal la orice migrare; se recuperează peste nivelul inițial dacă maparea e pagină-la-pagină (este).
- **Brand personal Dr. Petric:** căutările „dr petric" / „razvan petric" vor ateriza pe dentcraft.ro/echipa — profilul doctorului există acolo, experiența e corectă.
- **Emailuri @drpetric.ro** (dacă există): redirectul HTTP nu afectează MX — de confirmat înainte că nu se atinge DNS-ul de mail.

## Rezultat așteptat
dentcraft.ro moștenește pozițiile 2–5 pe căutările de preț și implant → combinat cu optimizările on-page din 17 iulie, ținta realistă e top 3 pe „implant dentar satu mare (pret)" și „stomatologie satu mare preturi" în 4–8 săptămâni.
