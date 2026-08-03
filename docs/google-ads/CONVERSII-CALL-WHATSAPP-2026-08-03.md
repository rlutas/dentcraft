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

## De verificat (~10 aug)
- Conversii noi „Click telefon (site)" / „Click WhatsApp (site)" apar în Ads cu status
  „Înregistrează conversii" (nu „Inactivă") + primele numere.
- Notă: tag-urile respectă Consent Mode — se numără doar utilizatorii care acceptă cookies.

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

## De verificat ~10 aug (extins)
- Exceptările aprobate + cuvintele noi „Eligibilă" și cu afișări.
- Impact buget: cu AG_General oprit + 26 cuvinte noi, cheltuiala se redistribuie — de văzut
  cost/conversie pe grupurile tematice.
- Termeni de căutare noi după lărgire → negative dacă apare gunoi (variantele fără oraș pot
  prinde căutări din alte orașe doar dacă userul e în geo-target — de monitorizat totuși).

## Observație pentru mai târziu (nefăcut, de discutat)
Grupul 1 are broad-uri pe servicii (fatete/albire/aparat/implant „satu mare") care se suprapun cu
grupurile tematice → fură trafic de la landing-urile dedicate. După ce grupurile tematice prind
volum, de pauzat broad-urile de servicii din Grupul 1 (păstrat doar genericele dentist/stomatolog/
cabinet/clinica).
