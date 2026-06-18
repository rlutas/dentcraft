# Import Google Ads — 4 ad groups noi + brand defense

## Fișiere generate

| Fișier | Conținut |
|---|---|
| `ad-groups.csv` | 5 ad groups noi (Implant, Estetica, Ortodontie, General, Brand) cu URL-uri finale specifice |
| `keywords.csv` | 47 keywords cu match types **phrase** și **exact** (NU broad) |
| `responsive-search-ads.csv` | 5 RSAs — câte unul per ad group, 10 headlines + 4 descriptions, pin top 3 |

## Cum import în Google Ads (2 metode)

### Metoda 1 — Google Ads Editor (recomandat, bulk)

1. Download **Google Ads Editor** (free): https://ads.google.com/intl/en/home/tools/ads-editor/
2. Login cu contul DENTCRAFT (serviciuseonetbut@gmail.com)
3. Download contul curent (sync)
4. **Account** → **Import** → **From file** → selectează fiecare CSV pe rând:
   - Întâi `ad-groups.csv` (creează ad groups)
   - Apoi `keywords.csv` (adaugă keywords la ad groups)
   - Apoi `responsive-search-ads.csv` (creează RSAs)
5. **Review** modificările
6. **Post** to Google Ads (apply changes)

### Metoda 2 — Direct în UI Google Ads (manual, mai lent)

1. Du-te la **Campanii → Search-1 → Grupuri de anunțuri → + (Adauga)**
2. Creează cele 5 ad groups manual cu datele din `ad-groups.csv`
3. Pentru fiecare ad group:
   - Adaugă keywords din `keywords.csv` (atenție la match types: `"phrase"` cu ghilimele, `[exact]` cu paranteze pătrate)
   - Creează RSA cu headlines și descriptions din `responsive-search-ads.csv`
   - Pin headlines 1, 2, 3 la pozițiile 1, 2, 3

## Set-up Bid limits (Maximize Conversions)

Fiecare ad group are **Default max CPC** setat:
- IMPLANT: 10 RON (volum scump, conversii valoroase)
- ESTETICĂ: 8 RON
- ORTODONȚIE: 8 RON
- GENERAL: 8 RON
- BRAND: 3 RON (CPC mic, conversion rate mare)

## După import

### Pas obligatoriu:
**Pune pe pauză ad group-ul vechi** ("Grupul de anunțuri 1") DUPĂ ce noile ad groups sunt eligibile și au impressions (24-48h). Asta evită ad fatigue și permite testarea.

### Monitoring săptămâna 1:
- Verifică zilnic: CPC mediu, CTR per ad group, Search Terms report
- Adaugă negative keywords noi din Search Terms care nu convertesc
- După 14 zile: dacă conversii ≥ 20, schimbă bidding la **Target CPA = 120 RON**

## Recomandări Google de aplicat (1-click)

În **Recomandări** (Recommendations), aplică:
- ✅ Adăugați fragmente structurate (Structured Snippets)
- ✅ Adăugați imagini la anunțuri
- ⚠️ NU aplica "Adăugați cuvinte cheie cu potrivire amplă" — am decis explicit să NU folosim broad
- ✅ Eliminați cuvinte cheie redundante (1 cuvânt)
