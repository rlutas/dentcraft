# ✅ Implementare Google Ads — DENTCRAFT Satu Mare

**Data:** 2026-05-26
**Cont:** SC PRTESTET SRL (serviciuseonetbut@gmail.com)
**Campanie:** Search-1 (ID 23858371853)

---

## 📊 SITUAȚIE ÎNAINTE DE OPTIMIZARE

### Date lifetime (de la lansare până la 2026-05-26):
- **Afișări:** 2.366
- **Clickuri:** 163
- **CTR:** 6,89% ✅ (peste benchmark 3-5%)
- **CPC mediu:** 7,42 RON ($1.7) ✅ (SUB media globală industrie $8)
- **Cost total:** 1.209,60 RON
- **Conversii reale:** 3 (1 form submit + 2 apel din ad)
- **Cost/conversie:** 403 RON ❌ (target 60-100 RON)
- **Conv rate:** 1,84% ❌ (sub media industrie 4,2%)

### Date ultimele 30 zile (degradare):
- **Afișări:** 220 (-90% vs lifetime medie)
- **CPC mediu:** 20,63 RON (de 3× lifetime)
- **Conversii reale:** 0-1
- **Cauza:** Quality Score 6/10, broad match, plată pe brand competitori (clinica datcu, art dental etc), 1 singur ad group cu mesaj generic

---

## 🎯 CE AM IMPLEMENTAT (2026-05-26)

### 1. ✅ Negative Keywords adăugate la campanie (26 total)

**Exact match (competitori):**
- `[clinica datcu]`, `[clinica datcu satu mare]`
- `[dr matiz]`, `[dr matiz stomatolog]`, `[dr matiz stomatolog satu mare]`
- `[art dental]`, `[art dental satu mare]`
- `[duo dent]`, `[duo dent satu mare]`
- `[dr magyari]`, `[clinica magyari]`
- `[kocsis hajnalka]`, `[kocsis hajnalka fogorvos]`
- `[stoma art]`, `[dental art satu mare]`

**Phrase match (servicii pe care NU le oferim):**
- `"urgent"`, `"urgenta"`, `"urgente"`, `"non stop"`, `"24 24"`
- `"radiografie"`, `"radiologie"`
- `"livada"`, `"tasnad"`, `"halmeu"`, `"strada horea"`

**Impact estimat:** -200 RON/lună waste pe căutări irelevante.

### 2. ✅ Restructurare campanie — de la 1 ad group la 6 ad groups thematice

| Ad Group | Status | Default Max CPC | Final URL | # Keywords | RSA |
|---|---|---|---|---|---|
| Grupul de anunțuri 1 (vechi) | Eligible | 0,01 RON (placeholder) | homepage | 21 broad/mixed | RSA generic existing |
| **AG_Implant_SM** | Eligible | **10 RON** | `/preturi#calculator` | 11 phrase+exact | RSA Implant cu pin top 3 |
| **AG_Estetica_SM** | Eligible | **8 RON** | `/galerie` | 10 phrase+exact | RSA Fațete/Albire cu pin top 3 |
| **AG_Ortodontie_SM** | Eligible | **8 RON** | `/servicii/ortodontie` | 9 phrase+exact | RSA Ortodonție cu pin top 3 |
| **AG_General_SM** | Eligible | **8 RON** | `/` | 10 phrase+exact | RSA Stomatolog general cu pin top 3 |
| **AG_Brand_SM** | Eligible | **3 RON** | `/` | 7 phrase+exact | RSA Brand defense cu pin top 3 |

### 3. ✅ Keywords schimbate de la broad match la phrase + exact match

**De ce contează:** Broad match permite Google să afișeze ad-ul pe căutări nelegate (de aceea apăream pe `clinica datcu`, `art dental` etc). Phrase + exact dau control precis.

**Total keywords noi adăugate: 47** (distribuite pe cele 5 ad groups noi)

### 4. ✅ RSAs (Responsive Search Ads) specifice per ad group

Fiecare ad group nou are 1 RSA propriu cu:
- **3 headlines pinned** la pozițiile 1, 2, 3 (mesaj consistent)
- **7 headlines suplimentare** (rotație Google)
- **4 descriptions** specifice
- **Final URL specific** (NU homepage pentru toate)
- **Display path** relevant (ex: `/implant/satu-mare`)

### 5. ✅ Recomandare Google aplicată
- ✅ "Eliminați cuvintele cheie redundante" — 1-click apply, +0,8% optimization score

### 6. ✅ Confirmat că NU au fost probleme inițiale:
- AI Max era deja OFF (eroare inițială diagnosticată — nu trebuia atins)
- Conversiile GBP "Other engagements" sunt Google-managed și deja excluse din bidding (nu se pot demote, dar nici nu influențează algoritm)
- Setări campanie corecte: doar Search Network (NU Display, NU partners), bidding Maximize Conversions

---

## 🔬 DIAGNOSTIC RECALIBRAT (corecție vs audit inițial)

### Ce CREDEAM (greșit) la început:
- ❌ CPC 20,63 RON era "enorm" → **De fapt SUB media globală $8 USD ($4.5)**
- ❌ "Other engagements" GBP era "waste" → **De fapt tracking-only, exclus din bidding**
- ❌ AI Max e cauza waste-ului → **De fapt era deja OFF**

### Cauzele REALE (confirmate prin research industrie):
1. **Quality Score scăzut (6/10)** — broad match + landing page generic + ad copy nespecific
2. **Match types prea relaxate** — `[stomatolog satu mare]` extins prin "close variants" la `clinica datcu` etc.
3. **Conv rate 1,84% vs benchmark 4,2%** — problemă landing page, NU campanie
4. **Maximize Conversions cu < 30 conversii** — algoritm "ghicește", produce CPC volatil

### Surse cheie:
- [Wordstream 2026 Benchmarks](https://www.wordstream.com/blog/2026-google-ads-benchmarks): Dental CPC mediu $7.85-$10
- [Dentx Google Ads for Dentists 2026](https://dentx.ca/blog/google-ads-for-dentists/): Conv rate mediu 4.2% pentru dental
- [Logical Position - Local Actions](https://www.logicalposition.com/blog/how-local-actions-conversions-affect-google-ads-data): Local Actions sunt default Secondary, tracking-only

---

## 📈 CE AȘTEPTĂM SĂ SE ÎMBUNĂTĂȚEASCĂ

### Săptămâna 1 (28 mai - 3 iunie):
- ✅ **Impressions cresc** treptat pe ad groups noi (Google "învață" — învățare 5-7 zile)
- ✅ **CTR crește la 5-8%** datorită relevance mai bună (ad-uri specifice per tip serviciu)
- ✅ **Search Terms report** va arăta mai puține căutări irelevante (negative kw fac efect)
- ⚠️ CPC poate fluctua în prima săptămână — algoritm explorează

### Săptămâna 2 (4-10 iunie):
- 🎯 **Quality Score crește la 7-8/10** datorită relevance ad copy ↔ keyword ↔ landing page
- 🎯 **CPC scade** natural la 5-8 RON pe ad groups thematice (datorită QS mai bun)
- 🎯 **Cost/conversie scade** la 100-150 RON (vs 403 lifetime, 200+ recent)
- 🎯 **Brand defense** (AG_Brand_SM) începe să prindă pacienți care caută "dentcraft" direct (CPC ~1-2 RON)

### Săptămâna 3-4 (11-24 iunie):
- 🚀 **Conversii cresc la 15-25** (dacă ne încadrăm în benchmark industriei)
- 🚀 **Cost/conversie target: 80-120 RON**
- 🚀 **ROI estimat:** la 30% close rate + 3.000 RON/pacient → 6-10× ROI

### După Luna 1 (după 26 iunie):
- 🎯 Dacă ≥ 20 conversii reale → switch la **Target CPA = 120 RON**
- 🎯 Pauză ad group vechi (Grupul de anunțuri 1) după ce noile au tracțiune
- 🎯 Pune buget mai mult pe ad groups cu cel mai bun ROAS

---

## 📊 MONITORING — Ce să verifici și când

### Zilnic (primele 7 zile):

În Google Ads UI online:

1. **Overview** (https://ads.google.com)
   - Click-uri/zi: target 10-20/zi (vs 0-1/zi înainte)
   - Impressions/zi: target 200-500/zi
   - CPC mediu: monitorizează tendința

2. **Search Terms Report**
   - Path: Campanii → Search-1 → Insights & reports → Search terms
   - **Adaugă negative keywords noi** pentru orice termen irelevant care apare
   - Verifică că ad groups primesc trafic relevant (implant pe AG_Implant_SM etc.)

3. **Keywords status**
   - Toate keywords noi trebuie **"Eligible"** (nu "Below first page bid", nu "Low search volume")
   - Dacă apar "Low search volume" — Google nu vede destulă căutare; e ok să le ignorăm

### Săptămânal (după zi 7):

**Path: Campanii → Search-1 → Ad groups**

| Metric | Target săpt 1-2 | Target săpt 3-4 |
|---|---|---|
| Impressions total/săptămână | 1.500-3.000 | 3.000-5.000 |
| Click-uri total/săptămână | 60-120 | 120-200 |
| CTR mediu | > 5% | > 6% |
| CPC mediu | 8-12 RON | 5-8 RON |
| Conversii reale/săptămână | 3-5 | 5-10 |
| Cost/conversie | < 200 RON | < 150 RON |
| Quality Score mediu | 6-7/10 | 7-8/10 |

**Verifică pe ad group:**
- Care ad group are cel mai mic Cost/Conv → pune **+30% buget** pe el (peste 2 săptămâni)
- Care ad group are 0 conversii la > 50 clickuri → **pauză** sau optimizează RSA

### La 14 zile (10 iunie):

**Decizie bidding strategy:**
- Dacă conversii ≥ 20 cu cost/conv stabil → switch la **Target CPA = 120 RON**
- Dacă conversii < 10 → ține Maximize Conversions, eventual scade buget la 100 RON/zi

**Cleanup:**
- Pauză ad group vechi `Grupul de anunțuri 1` (după ce noile au tracțiune)
- Adaugă mai multe negative keywords din Search Terms (lifetime cumulat)

---

## 🚨 SEMNALE DE ALARMĂ — Ce să faci dacă...

### Dacă CPC sare peste 15 RON pe ad groups noi:
1. Verifică Quality Score per keyword (target > 7)
2. Strânge match types (transformă phrase → exact pe cele care convertesc)
3. Verifică concurența în Auction Insights (poate cineva nou licitează agresiv)
4. Adaugă negative keywords noi din Search Terms

### Dacă conversii rămân 0 după 7 zile:
1. **NU schimba bidding strategy** — algoritm încă învață
2. Verifică tracking în GA4 (test manual: submit form → vezi în GA4 → după 24h în Google Ads)
3. Verifică landing pages (mobile speed < 3 sec, form vizibil above the fold)
4. Eventual schimbă la **Maximize Clicks + CPC cap 8 RON** pentru 7 zile (acumulează volum)

### Dacă bugetul nu se cheltuiește (cum a fost recent):
1. **Search Lost IS (Rank)** mare → Quality Score scăzut sau bid mic
2. Crește Default Max CPC pe ad group cu +20%
3. Verifică Impression Share columns (Cota afișări, IS pierdut)

---

## 📋 CHECKLIST POST-IMPLEMENTARE

- [x] 26 negative keywords adăugate
- [x] 5 ad groups thematice create (Implant, Estetică, Ortodonție, General, Brand)
- [x] 47 keywords noi cu match types phrase + exact
- [x] 5 RSAs specifice cu pin top 3 headlines
- [x] Default Max CPC setat per ad group (10/8/8/8/3 RON)
- [x] Final URLs specifice per ad group
- [x] Recomandare Google "Eliminate redundant keywords" aplicată
- [x] Toate ad groups Status = Enabled
- [x] Post All Changes → live în Google Ads
- [ ] **Verificare în 24h:** primele impressions pe ad groups noi
- [ ] **Verificare în 7 zile:** Search Terms report — adaugă negative kw noi
- [ ] **Verificare în 14 zile:** decizie bidding strategy + pauză ad group vechi
- [ ] **Verificare în 30 zile:** review complet, ajustare buget

---

## 🎯 KPIs cheie de urmărit

### Pe campanie:
| KPI | Acum (ultimele 30 zile) | Target Luna 2 |
|---|---|---|
| Impressions | 220 | 8.000-15.000 |
| Clicks | 10 | 300-500 |
| CTR | 4,5% | 5-7% |
| CPC mediu | 20,63 RON | 5-8 RON |
| Conv reale | 0-1 | 20-40 |
| Cost/conv | n/a | 80-120 RON |
| Quality Score mediu | 6/10 | 7-8/10 |
| Buget consumat/lună | ~200 RON | 3.500-5.000 RON |
| ROI (close 30%, 3000 RON/pacient) | < 1× | 6-10× |

### Pe ad group (target la Luna 2):
| Ad group | CTR target | CPC target | Conv target | Cost/Conv target |
|---|---|---|---|---|
| AG_Implant_SM | 4-6% | 8-12 RON | 5-8 | 80-150 RON |
| AG_Estetica_SM | 5-7% | 6-10 RON | 4-6 | 60-120 RON |
| AG_Ortodontie_SM | 4-6% | 6-10 RON | 3-5 | 80-150 RON |
| AG_General_SM | 6-8% | 5-8 RON | 5-10 | 50-100 RON |
| AG_Brand_SM | 15-25% | 1-3 RON | 5-15 | 5-15 RON |

---

## 🔧 PROBLEME RAMASE / TODO (după prima săptămână)

### High priority:
1. **Landing page conversion fix** (1,84% → 4,2% benchmark)
   - Calculator preț prominent above the fold (mobile + desktop)
   - Trust signals: Google Reviews badge (4.9 + 441 recenzii) vizibil pe step 1, 2, 3
   - Form mobile UX — verificare cu Lighthouse + click-path test
   - WhatsApp button mai prominent

2. **Image assets în Google Ads**
   - Apply recomandare Google: "Adăugați imagini în anunțuri" (+4% optimization)
   - Upload 5-7 imagini: sediu, dr. Petric, before/after, scanner 3D
   - Aceste apar ca thumbnails în SERP

3. **Structured snippets**
   - Apply recomandare Google: "Adăugați fragmente structurate"
   - Tip: Servicii
   - Valori: Implant dentar, Fațete ceramice, Ortodonție, Albire, Pedodonție, Chirurgie

### Medium priority:
4. **Logo extension**
   - Apply recomandare Google: "Folosiți sigla companiei"
   - Va apare alături de ad-uri în SERP

5. **Call extension verification**
   - Confirmă că `+40741199977` e setat
   - Call tracking activat pentru calls > 60 sec

6. **Sitelinks update**
   - 4 sitelinks setate corect:
     - Calculator preț → `/preturi#calculator`
     - Servicii → `/servicii`
     - Echipa → `/echipa`
     - Contact → `/contact`

### Low priority (după Luna 1):
7. **A/B test ad copy** — adaugă RSA #2 per ad group cu mesaj alternativ
8. **Schedule ad-uri** — verifică orele când rulează (target: 8:00-20:00 luni-sâmbătă)
9. **Conversion lift study** dacă conversii cresc suficient

---

## 📞 CONTACT & RESURSE

- **Cont Google Ads:** serviciuseonetbut@gmail.com
- **Campaign ID:** 23858371853
- **GA4 property:** dentcraft.ro
- **Documente:**
  - Audit complet: `/Users/raul/Projects/dentcraft/docs/google-ads/AUDIT-2026-05-26.md`
  - Setup guide original: `/Users/raul/Projects/dentcraft/docs/google-ads/SETUP-GUIDE.md`
  - Ad copy variants: `/Users/raul/Projects/dentcraft/docs/google-ads/AD-COPY.md`
  - Import files: `/Users/raul/Projects/dentcraft/docs/google-ads/import/`

### Surse de research folosite:
- [Wordstream Google Ads Benchmarks 2026](https://www.wordstream.com/blog/2026-google-ads-benchmarks)
- [Dentx — Google Ads for Dentists 2026](https://dentx.ca/blog/google-ads-for-dentists/)
- [PPC Chief — Dental CPC](https://ppcchief.com/google-ads-cost/dental)
- [Logical Position — Local Actions Conversions](https://www.logicalposition.com/blog/how-local-actions-conversions-affect-google-ads-data)
- [Search Engine Land — Target Impression Share](https://searchengineland.com/google-ads-target-impression-share-explained-459350)
