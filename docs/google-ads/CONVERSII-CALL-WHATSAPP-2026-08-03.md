# Conversii Click telefon + WhatsApp — 3 aug 2026

Acțiuni de conversie noi create în Google Ads (SC PRTESTET SRL, ocid 8242104670),
categoria „Persoană de contact", sursă site web (www.dentcraft.ro), tip „Eveniment manual", Principale:

| Acțiune | Label conversie | Eveniment GTM (există deja pe site) |
|---|---|---|
| Click telefon (site) | `AW-18165025740/W9saCK2bqdscEMyX4dVD` | `click_phone` |
| Click WhatsApp (site) | `AW-18165025740/cDl3CLCbqdscEMyX4dVD` | `click_whatsapp` |

Setări: valoare implicită 1 RON, numărare „Una", fereastră clic 90 zile, atribuire bazată pe date.

Site-ul (GlobalLinkTracker.tsx) împinge deja `click_phone` / `click_whatsapp` în dataLayer
pe orice click `tel:` / `wa.me` — NU e nevoie de cod nou pe site.

## GTM (GTM-MHB5K5LL) — FĂCUT, publicat Versiunea 6 (3 aug 23:19)
- Tag `Ads - Click telefon (site)` (Google Ads Conversion Tracking) pe declanșatorul existent `Click - Phone` (link tel:).
- Tag `Ads - Click WhatsApp (site)` pe declanșatorul existent `Click - WhatsApp` (eveniment personalizat).
- Conversion Linker exista deja (Initialization - All Pages).

## Obiectiv
Categoria „Persoană de contact" a devenit automat obiectiv prestabilit de cont →
campania Search-1 îl folosește deja (1 din 1). Obiectivul conține și „Clicks to call"
(găzduit de Google/GBP, principal, nemodificabil) — semnal de apel din profil, acceptat.

Notă: tag-urile respectă Consent Mode — se numără doar utilizatorii care acceptă cookies.

## Alte fixuri 3 aug
- Negativ `"datcu"` (potrivire expresie) adăugat pe Search-1 (variantele treceau de negativele exacte).
- GA4 „DentCraft" (525980361) conectat la Google Ads (import valori + segmente activ).
- CSP site: `connect-src` bloca `ad.doubleclick.net` (endpoint măsurare conversii) → wildcard `*.doubleclick.net` (commit `3fabb16`).

## Restructurare 3 aug (seara)
- **AG_General_SM ÎNTRERUPT** (1.455 RON / 1 conversie, CTR 9,45%, suprapunere cu Grupul 1).
- `[dentist satu mare]` exact adăugat în Grupul de anunțuri 1 (în examinare); broad-ul exista deja acolo.
- **AG_Estetica_SM**: +8 cuvinte phrase fără oraș (fatete dentare, fatete dentare pret, albire dentara,
  albire dentara pret, albire dinti, estetica dentara, fatete ceramice, bonding dentar) — cele vechi
  „... satu mare" erau aproape toate „Volum scăzut". 5 din 8 au flag „Health in personalized
  advertising" → exceptare cerută, în examinare.
- **Asseturi verificate**: 4 sitelinkuri (CTR 20,7%, „Eligibil limitat" pe aceeași politică Health —
  funcționează), apel 0741 199 977 activ, 4 înștiințări, 1 fragment structurat, ~20 imagini
  (2 respinse: „Suprapuneri grafice sau de text" — de înlocuit cândva), **locația DENTCRAFT era
  deja atașată campaniei** (grupul de locații din iunie e activ).

## Extindere cuvinte cheie — toate grupurile tematice (3 aug, seara, rundă 2)

Rețeta: campania e geo-țintită pe Satu Mare → phrase match FĂRĂ oraș aduce volum local
(long-tail-urile „... satu mare" erau aproape toate „Volum scăzut"). Dovadă: „implant dentar pret"
fără oraș avea deja 73 clicuri în AG_Implant.

| Grup | Cuvinte noi (phrase) |
|---|---|
| AG_Estetica_SM | fatete dentare, fatete dentare pret, albire dentara, albire dentara pret, albire dinti, estetica dentara, fatete ceramice, bonding dentar |
| AG_Implant_SM | implant dentar, implanturi dentare, implant dentar cost, all on 4, all on 6, proteza pe implanturi |
| AG_Ortodontie_SM | aparat dentar, aparat dentar pret, invisalign, ortodont, indreptarea dintilor, aparat dentar invizibil |
| AG_Preturi_SM | preturi stomatologie, preturi dentist, cat costa un implant dentar, cat costa un aparat dentar, cat costa albirea dentara, pret consultatie stomatologica |

Total 26 cuvinte noi + `[dentist satu mare]` exact în Grupul 1. Majoritatea au primit flag
„Health in personalized advertising" → **exceptare cerută la fiecare**, toate „În curs de examinare"
(1–3 zile lucrătoare de obicei). Cuvintele vechi „Volum scăzut" NU au fost șterse — nu costă nimic,
se reactivează singure.

## Observație pentru mai târziu (nefăcut, de discutat)
Grupul 1 are broad-uri pe servicii (fatete/albire/aparat/implant „satu mare") care se suprapun cu
grupurile tematice → fură trafic de la landing-urile dedicate. După ce grupurile tematice prind
volum, de pauzat broad-urile de servicii din Grupul 1 (păstrat doar genericele dentist/stomatolog/
cabinet/clinica).

---

# BASELINE 3 aug 2026 (pentru comparație data viitoare)

Interval de referință: **4 iul – 2 aug** (ultimele 30 zile). GOTCHA: UI-ul se deschide pe „ieri" —
click „Afișați ultimele 30 de zile" înainte de a citi cifre!

| Metric campanie | Valoare 3 aug |
|---|---|
| Afișări | 14.783 |
| Clicuri | 1.806 (CTR 12,22%) |
| CPC mediu | 3,23 RON |
| Cost | 5.834 RON (~194/zi, plafon 200 atins) |
| Conversii | **5** (0,28%) — subcontorizate, fără call/WA de pe site |
| Cost/conversie | 1.167 RON |

Pe grupuri (cost / conversii): Grupul 1 2.852/4 · AG_General 1.455/1 (ÎNTRERUPT 3 aug) ·
Preturi 751/0 · Implant 337/0 · Brand 233/0 · Ortodonție 194/0 · Estetica 12/0.
Referință cerere reală din GBP (neatribuită campaniei): **73 clicks-to-call + 139 direcții/lună**.

# CHECKLIST URMĂTOAREA SESIUNE (~10 aug, apoi bilanț 30 zile ~2 sept)

Ordinea exactă + criteriu reușit/eșuat la fiecare:

1. **Conversii noi active?** Obiective → Conversii → Rezumat → „Vedeți toate acțiunile".
   „Click telefon (site)" + „Click WhatsApp (site)": REUȘIT = stare „Activ" + primele numere
   (aștept 5–15/săpt. combinat, doar userii cu consimțământ). EȘUAT = tot „Inactiv" pe 10 aug →
   de depanat cu Tag Assistant pe dentcraft.ro (click pe tel:/wa.me, verificat tagurile Ads că se declanșează).
2. **Exceptările keywords aprobate?** Cuvinte cheie → filtru stare. REUȘIT = cele 26 noi „Eligibilă"
   și încep afișările (mai ales „implant dentar", „aparat dentar", „fatete dentare").
   EȘUAT = „Respins" → repet exceptarea sau reformulez cuvântul.
3. **Redistribuirea bugetului după oprirea AG_General:** grupurile tematice (Implant/Ortodonție/
   Estetica/Preturi) trebuie să crească afișările vs baseline-ul de sus (Estetica de la 27!).
   Grupul 1 poate crește și el — OK. Semnal rău: afișări totale scad sub ~12.000/30d → Google
   n-a realocat, de lărgit iar.
4. **Termeni de căutare noi** (după lărgirea fără oraș): Statistici → Termeni de căutare, 30 zile.
   De adăugat negative pe orice gunoi nou (alte orașe, „gratis", competitori noi). „datcu" nu mai
   trebuie să apară.
5. **Cost/conversie** (abia la bilanțul din ~2 sept are sens): ȚINTA cu tracking complet =
   sub 200 RON/lead real (vs 1.167 fals azi). Dacă conversiile măsurate ajung 30–60/lună
   (nivelul cererii din GBP), am confirmarea.
6. **Warningul CSP din GTM dispărut?** tagmanager.google.com → dentcraft.ro → Prezentare
   generală. Fixul (`*.doubleclick.net`) e deployat din 3 aug; diagnosticul se reevaluează în
   câteva zile. Dacă persistă >2 săpt., de verificat response headers live.
7. **Imagini respinse (2, „suprapuneri text")**: de înlocuit cu poze curate din
   `public/images/clinic/` (fără text pe ele) — 10 minute.

## Pașii mari DUPĂ ce tracking-ul strânge 2–3 săptămâni de date (deci ~17–24 aug)
1. **Licitare: Maximizați clicurile → Maximizați conversiile** (abia cu 30+ conv/lună măsurate;
   UI-ul estima +10,5%). Supravegheat CPC-ul zilnic prima săptămână.
2. **PMax local (recomandarea advisorului Google)**: obiective Get Directions + Clicks to call —
   are sens abia cu conversii curate din care să învețe.
3. **De discutat:** pauză broad-uri de servicii din Grupul 1 (vezi observația de mai sus);
   Brand (233 RON/lună pe „dentcraft" — apărare sau tăiem?).

## Acces rapid
Cont: SC PRTESTET SRL, ocid `8242104670`, serviciiseonethut@gmail.com · Campanie: Search-1
(id 23858371853) · GTM: GTM-MHB5K5LL · GA4: DentCraft 525980361 · Labels conversii: telefon
`W9saCK2bqdscEMyX4dVD`, WhatsApp `cDl3CLCbqdscEMyX4dVD`.
