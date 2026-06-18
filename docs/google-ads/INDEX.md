# 📚 Google Ads — Documentație DENTCRAFT

**Ultima actualizare:** 2026-05-26
**Status campanie:** 5 ad groups noi LIVE + ad group vechi încă activ

---

## 📖 Citește în ordine:

### 🟢 ACTIVE (citește acestea pentru status curent):

1. **[IMPLEMENTAT-2026-05-26.md](IMPLEMENTAT-2026-05-26.md)** ⭐ — Ce am implementat azi + plan monitoring + KPIs
   - Negative keywords adăugate (26)
   - 5 ad groups noi cu phrase/exact match
   - 47 keywords noi
   - 5 RSAs cu pin top 3 headlines
   - Default Max CPC per ad group
   - Timeline îmbunătățiri săpt 1-4
   - Semnale de alarmă și fix-uri

2. **[AUDIT-2026-05-26.md](AUDIT-2026-05-26.md)** — Audit complet inițial cu diagnostic
   - Identificarea cauzelor reale (QS scăzut, broad match, conv rate sub benchmark)
   - Analiza waste pe brand competitori
   - Plan de acțiune pe faze

3. **[AD-COPY.md](AD-COPY.md)** — Variante ad copy pentru fiecare temă
   - Headlines + descriptions per categorie
   - Pin position guidance
   - Negative keywords globale

4. **[import/](import/)** — Fișiere TSV folosite pentru bulk import în Google Ads Editor
   - `01-ad-groups.tsv` — 5 ad groups noi
   - `02-keywords.tsv` — 47 keywords phrase/exact
   - `04-rsas-final.tsv` — 5 RSAs finale (cu descriptions sub 90 chars)
   - `05-bids.tsv` — Default Max CPC per ad group

### 🟡 ISTORICE (referință, NU mai aplica direct):

5. **[SETUP-GUIDE.md](SETUP-GUIDE.md)** ⚠️ Superseded — Plan inițial (mai 18) cu 4 ad groups single campaign
   - Strategia originală cu Maximize Conv + buget 50 RON/zi
   - **Folosit ca punct de start**, dar implementarea finală e în `IMPLEMENTAT-2026-05-26.md`

6. **[QUICK-START.md](QUICK-START.md)** ⚠️ Superseded — Quick start original

---

## 🎯 Status actual campanie (2026-05-26 după implementare)

### Structura:
- **Search-1** (campanie unică)
  - `Grupul de anunțuri 1` — vechi, încă Eligible (păstrăm 14 zile ca buffer)
  - `AG_Implant_SM` — 11 kw, RSA Implant, → `/preturi#calculator`, Max CPC 10
  - `AG_Estetica_SM` — 10 kw, RSA Fațete/Albire, → `/galerie`, Max CPC 8
  - `AG_Ortodontie_SM` — 9 kw, RSA Ortodonție, → `/servicii/ortodontie`, Max CPC 8
  - `AG_General_SM` — 10 kw, RSA Stomatolog, → `/`, Max CPC 8
  - `AG_Brand_SM` — 7 kw, RSA Brand defense, → `/`, Max CPC 3

### Setări campanie (neschimbate):
- Bidding: Maximize Conversions
- Buget: 167 RON/zi
- Networks: Search Google ONLY
- Geo: Județul Satu Mare + Carei + Negrești-Oaș
- Limbi: Română, Engleză, Maghiară

### Conversion tracking:
- ✅ Form submit (Primary)
- ✅ Apel din ad (Primary)
- ✅ Local actions - Directions (Primary, Google-managed)
- 📊 Other engagements / Menu views / Website visits — tracking-only (Google-managed, automatic Secondary)

---

## ⚠️ Probleme curente (de adresat în 24-48h)

1. **Keywords "Pending review"** — Google verifică keywords noi (normal pentru dentar)
2. **Health policy exemption** — de solicitat în Editor sau UI Google Ads
   - Mesaj: "Personalized advertising policy violation"
   - Acțiune: bifează "Request exemption" și completează form-ul

---

## 📋 TODO pentru zilele următoare

### Imediat (mâine, 27 mai):
- [ ] Verifică în UI Google Ads că keywords sunt **Eligible** (nu Pending review)
- [ ] Request Health policy exemption (dacă e cazul)
- [ ] Verifică primele impressions pe ad groups noi

### Săptămâna 1 (27 mai - 3 iunie):
- [ ] Monitor zilnic Search Terms — adaugă negative kw noi
- [ ] Verifică Quality Score per keyword (target > 7)
- [ ] Verifică Cost/Conv per ad group
- [ ] Aplică recomandări Google: Image extensions, Structured snippets, Logo

### Săptămâna 2 (4-10 iunie):
- [ ] Decide bidding strategy: dacă conv ≥ 20 → switch la Target CPA = 120 RON
- [ ] Pune pe pauză ad group vechi `Grupul de anunțuri 1`
- [ ] Optimizează landing pages (conv rate 1,84% → target 4,2%)

### Luna 2 (după 26 iunie):
- [ ] Review complet — ce ad group are cel mai bun ROAS
- [ ] Redistribuire buget +30% pe winners
- [ ] A/B test RSA #2 per ad group cu mesaj alternativ

---

## 🔗 Documente conexe (în alte locații)

- `/docs/TRACKING-SETUP.md` — Setup GA4 + Google Ads conversion tracking
- `/docs/PROGRESS.md` — Log progres general DENTCRAFT
- `/docs/seo/COMPETITOR-ANALYSIS.md` — Analiză concurență (Magyari, Art Dental, Datcu)

---

## 📞 Acces

- **Cont Google Ads:** serviciuseonetbut@gmail.com (SC PRTESTET SRL, 274-771-7239)
- **Campaign ID:** 23858371853
- **GA4 property:** dentcraft.ro
