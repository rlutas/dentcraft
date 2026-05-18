# Google Ads Setup — DENTCRAFT Satu Mare

**Strategie launch:** 1 campanie unică cu 4 ad groups, toate trimit pe homepage `www.dentcraft.ro`. Bugetul se distribuie automat de Google AI către ad group-ul cu cele mai bune conversii.

---

## 🎯 Quick Settings Summary

| Setting | Valoare |
|---|---|
| **Campanie** | `GOOG_Search_DENTCRAFT_SatuMare_Launch` |
| **Tip** | Search (cu Display Network OFF) |
| **Buget zilnic** | 50 lei (1500 lei/lună) |
| **Bidding strategy** | **Maximize Conversions** (+ Max CPC cap = 8 lei) |
| **Locații** | Județul Satu Mare + Carei + Negrești-Oaș |
| **Limbi** | Română, Engleză, Maghiară |
| **Network** | ✅ Search · ❌ Display · ❌ Search partners |
| **Final URL implicit** | `https://www.dentcraft.ro/` |
| **Tracking template** | `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}&gclid={gclid}` |

---

## 📋 Pas-cu-pas în Google Ads

### Pas 1: Creează campania

1. **+ New campaign** → **Lead-uri**
2. Tipul campaniei: **Search**
3. Cum vrei să atingi obiectivul: ✅ **Vizite pe site** → introdu `https://www.dentcraft.ro/`
4. Continue

### Pas 2: General settings

| Câmp | Valoare |
|---|---|
| Nume campanie | `GOOG_Search_DENTCRAFT_SatuMare_Launch` |
| Networks | ✅ Google Search Network · ❌ Search partners · ❌ Display Network |
| Date | Start: azi · End: lasă gol |
| Locații | **Țintire avansată** → caută "Satu Mare County" + adaugă orașele Carei și Negrești-Oaș dacă vrei specific |
| Location options | ⚠️ **People IN your targeted locations** (NU "interested in") |
| Limbi | Română, Engleză, Maghiară |
| Audience segments | Lasă gol la început |

### Pas 3: Buget & Bidding

| Câmp | Valoare |
|---|---|
| Buget zilnic | **50 lei** (Google va cheltui până la 2× în zilele cu trafic mare, dar mediu pe lună = 50) |
| Bidding focus | **Conversions** |
| Bidding strategy | **Maximize Conversions** |
| Set maximum CPC bid limit | ✅ Bifează |
| Max CPC | **8 lei** |
| Customer acquisition | Lasă default |

### Pas 4: Ad group #1 — IMPLANT (prioritate maximă)

**Nume:** `AG_Implant_SM`

**Keywords (copy-paste exact):**
```
[implant dentar satu mare]
[implant dentar carei]
"implant dentar pret satu mare"
"all on 4 satu mare"
"all on 6 satu mare"
[implant unidentar satu mare]
"implant dentar negresti"
[implantologie satu mare]
```

**Default bid:** Lasă Google să decidă (Maximize Conversions face asta automat)

**Final URL:** `https://www.dentcraft.ro/`

### Pas 5: Ad group #2 — ESTETICĂ (fațete + albire combinate)

**Nume:** `AG_Estetica_SM`

**Keywords:**
```
[fatete dentare satu mare]
[fatete ceramice satu mare]
"hollywood smile satu mare"
"fatete pret satu mare"
[albire dentara satu mare]
"albire dentara profesionala satu mare"
"estetica dentara satu mare"
[zambet hollywood satu mare]
```

**Final URL:** `https://www.dentcraft.ro/`

### Pas 6: Ad group #3 — ORTODONȚIE

**Nume:** `AG_Ortodontie_SM`

**Keywords:**
```
[aparat dentar satu mare]
[ortodontie satu mare]
[invisalign satu mare]
"aparat dentar copii satu mare"
"aparat dentar adulti satu mare"
"ortodont satu mare"
"aparat dentar pret satu mare"
[aparat dentar invizibil satu mare]
```

**Final URL:** `https://www.dentcraft.ro/`

### Pas 7: Ad group #4 — GENERAL

**Nume:** `AG_General_SM`

**Keywords:**
```
[stomatolog satu mare]
[dentist satu mare]
[cabinet stomatologic satu mare]
[clinica stomatologica satu mare]
"medic stomatolog satu mare"
"stomatolog bun satu mare"
"recomandare dentist satu mare"
[clinica dentara satu mare]
```

**Final URL:** `https://www.dentcraft.ro/`

### Pas 8: Negative keywords (la nivel de campanie — aplică pe toate ad groups)

```
gratis
gratuit
ieftin
acasa
diy
tutorial
forum
wikipedia
ce este
definitie
clinici lista
recomandari lista
top 10
veterinar
caine
pisica
animal
job
cariera
angajare
cv
recrutare
student
curs
scoala
universitate
cluj
bucuresti
timisoara
brasov
oradea
baia mare
sibiu
iasi
constanta
```

> 💡 **Tip:** Lasă `cluj/oradea/baia mare` ca negative DOAR dacă vrei strict pacienți din zona Satu Mare. Dacă vizezi și diaspora locală (oameni din Maramureș/Bihor dispuși să vină), șterge-le.

### Pas 9: Ad Copy (Responsive Search Ads)

Pentru fiecare ad group, creează **2 RSAs** (Google le rotește și învață care performează mai bine).

Folosește variantele din `AD-COPY.md` — pentru fiecare ad group, alege headline-urile + descrierile relevante. Pinează primele 3 headlines.

### Pas 10: Extensions (la nivel de cont — aplică toate la 4 ad groups)

#### Sitelinks (4)
| Text | URL | Description |
|---|---|---|
| Calculator preț | `https://www.dentcraft.ro/preturi#calculator` | Vezi prețul în 60 sec |
| Servicii | `https://www.dentcraft.ro/servicii` | Toate tratamentele |
| Echipa | `https://www.dentcraft.ro/echipa` | Dr. Petric + colegii |
| Contact | `https://www.dentcraft.ro/contact` | Programare online |

#### Call extension
- Phone: `+40741199977`
- Country: Romania
- ✅ Tracking calls > 60 sec

#### Location extension
- Conectează cu **Google Business Profile** (deja existent)

#### Callouts (10)
- Garanție pentru lucrări
- Plan scris înainte
- Consultație gratuită
- Anestezie blândă
- Scanner 3D digital
- Calculator preț online
- 1500+ pacienți tratați
- 10+ ani experiență
- RO · EN · HU
- Recenzii reale Google

#### Structured snippets (1)
- **Header type:** Servicii
- **Values:** Implant dentar, Fațete ceramice, Ortodonție, Albire profesională, Pedodonție, Chirurgie orală

#### Price extension
- **Type:** Service
- **Currency:** RON
- **Items:**
  - Implant dentar — de la 2.500 lei
  - Fațetă ceramică — de la 900 lei
  - Aparat dentar — de la 2.000 lei
  - Albire profesională — de la 600 lei

---

## 🎯 Conversion tracking — verifică că merge

### În Google Ads → Tools → Conversions

Trebuie să ai 3 conversii importate din GA4:

| Nume | Acțiune sursă | Categorie | Valoare |
|---|---|---|---|
| **Form Submission** | `generate_lead` (GA4) | Submit lead form | Don't use a value |
| **Phone Click** | `click_phone` (GA4) | Phone calls | 0 (Secondary) |
| **WhatsApp Click** | `click_whatsapp` (GA4) | Other (Lead) | 0 (Secondary) |

⚠️ **Marchează `Form Submission` ca PRIMARY** — asta optimizează AI-ul.

### Cum importi din GA4

1. Google Ads → Tools → **Conversions** → **+ New conversion action**
2. Selectează **Import** → **Google Analytics 4 properties** → **Web**
3. Selectează GA4 property `dentcraft.ro`
4. Bifează evenimentele: `generate_lead`, `click_phone`, `click_whatsapp`
5. Import → editează fiecare pentru categoriile de mai sus

---

## 📊 Ce să monitorizezi în prima săptămână

### Day 1-3 (învățare)
- ✅ Click-uri se înregistrează
- ✅ Impressions cresc treptat
- ✅ Conversion tracking funcționează (test cu un form submit real)
- ⚠️ CPC poate fi mare la început (algoritm învață)

### Day 4-7
- 🎯 Vizează **5-10 click-uri/zi** (200-300/lună)
- 🎯 CTR ar trebui să fie **>3%** (sub 3% = ad copy slab)
- 🎯 Quality Score per keyword: **7+/10** (sub 7 = relevance issue)
- 🎯 Prima conversie ar trebui să apară în 7-10 zile

### Week 2-4 (optimizare)
- Pauză keywords cu 0 conversii și >50 click-uri
- Adaugă negative keywords noi din "Search terms report"
- Testează ad copy variant B vs A
- Verifică landing page: bounce rate < 50%, time on page > 1 min

---

## 🛠️ Troubleshooting

### "Ad-urile mele nu primesc impressions"
- ✅ Verifică buget zilnic (nu e prea mic?)
- ✅ Max CPC cap nu e prea jos (8 lei e ok)
- ✅ Keywords sunt în match types corecte (exact `[...]` e prea restrictiv, încearcă phrase `"..."`)
- ✅ Geo nu e prea strâns (Satu Mare county + Carei + Negrești = bine)

### "Click-uri OK dar 0 conversii"
- 🔧 Verifică conversion tracking în Tag Assistant
- 🔧 Test manual: submit contact form pe site → așteaptă 30 min → vezi în Google Ads → Conversions → "Recent conversions"
- 🔧 Vezi bounce rate landing page (dacă >70% → ad copy promit ceva diferit decât homepage oferă)

### "CPC prea mare (>10 lei)"
- 🔧 Quality Score scăzut → îmbunătățește relevance (keywords ↔ ad copy ↔ landing)
- 🔧 Restrânge match types (broad → phrase → exact)
- 🔧 Adaugă mai multe negative keywords

### "Cheltui tot bugetul în 2 ore"
- 🔧 Limit Max CPC la 6 lei
- 🔧 Bid more conservatively
- 🔧 Activează "Standard delivery" în loc de "Accelerated"

---

## 💡 Tips de PRO

1. **NU schimba bidding strategy în primele 14 zile** — strica "learning phase"
2. **NU pune buget mic apoi mare** — Google AI se confuză. Setezi 50 lei/zi și lași.
3. **Folosește auto-tagging** ✅ (Google Ads → Settings → Account → Auto-tagging YES) ca să tragă `gclid` automat în GA4
4. **Adaugă UTM-uri** pentru tracking suplimentar (vezi tracking template de sus)
5. **Setup Google Ads Editor desktop** — face bulk edits mult mai rapid decât UI
6. **Verifică zilnic primele 7 zile**, apoi de 2x/săptămână
7. **Conectează GA4 cu Google Ads** (GA4 → Admin → Property → Google Ads Linking) pentru attribution corectă

---

## ⚡ Quick win checklist înainte de lansare

- [ ] Cont Google Ads creat
- [ ] GA4 conectat (Linked account)
- [ ] Google Business Profile conectat (pentru location extension)
- [ ] 3 conversii importate din GA4 (`generate_lead`, `click_phone`, `click_whatsapp`)
- [ ] `generate_lead` setat ca PRIMARY conversion
- [ ] Campania creată cu setările de mai sus
- [ ] 4 ad groups cu keywords corecte
- [ ] 2 RSAs per ad group (cu pin-uri pe primele 3 headlines)
- [ ] Negative keywords adăugate
- [ ] 4 sitelinks, 10 callouts, structured snippets, price extension
- [ ] Call extension cu `+40741199977`
- [ ] Test: submit contact form de pe site → verifică conversie în GA4 → după 24h apare și în Google Ads
- [ ] Buget zilnic 50 lei
- [ ] **Apasă "Publish"** 🚀

---

## 📈 KPI-uri target (luna 1)

| Metric | Target |
|---|---|
| Impressions | 5.000-10.000 |
| Clicks | 200-400 |
| CTR | 3-5% |
| Avg CPC | 4-6 lei |
| Conversions (form + call + WhatsApp) | 15-25 |
| Cost per conversion | 60-100 lei |
| Quality Score mediu | 7+/10 |
| ROI (presupunând 30% close rate, 3000 lei/pacient) | 8-15× |

După luna 1 cu 30+ conversii → switch la **Target CPA = 80 lei** și **+30% buget** pe ad group-urile cu cel mai bun ROAS.
