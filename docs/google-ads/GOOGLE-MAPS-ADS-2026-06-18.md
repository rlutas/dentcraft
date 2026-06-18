# Google Ads pe Google Maps — DENTCRAFT (18 iun 2026)

**Întrebarea clientului:** „reclama pe Google Maps nu prea merge, vrem să apărem ok pe Maps."
**Verdict:** nu apari pe Maps pentru că **lipsește Location asset-ul** pe campanie. Se rezolvă.

---

## 🔴 Ce am găsit în cont (verificat live)
Asset-uri asociate campaniei **Search-1**:
| Asset | Stare |
|---|---|
| Apeluri (Call) | ✅ Activ (335 afișări) |
| Sitelink-uri | ✅ |
| Fragmente / Imagini / Înștiințări | ✅ |
| **Locație (Location asset)** | ❌ **LIPSEȘTE** |

→ **Fără Location asset, anunțurile NU pot apărea pe Google Maps.**

### 🔬 Diagnostic precis (verificat în Manager de date → Produse conectate)
GBP-ul **ESTE conectat** la Ads: „Profilul companiei: serviciiseonethut@gmail.com — **18 locații — Conectat**". DAR:
- Cele **18 locații = toate firmele din cont** (Angeloff Grill, avocați, eGhiseul, DENTCRAFT etc.), nu doar clinica.
- Grupul de locații „DENTCRAFT" folosit pentru asset are **„0 locații"** → nu e **filtrat** pe locația clinicii.
- Rezultat: **niciun Location asset cu DENTCRAFT nu servește pe campania Search-1** → nu apari pe Maps.

> Linkul GBP nu e rupt — doar nu e **filtrat/atribuit** locația DENTCRAFT pe campanie.

### ⚠️ Blocaj găsit la încercarea de fix
Am încercat să creez grupul de locații DENTCRAFT, dar: la „Nou grup de locații", căutarea locațiilor returnează **„Niciun rezultat"** — atât după numele „DENTCRAFT", cât și după adresă „Delavrancea Satu Mare". Adică:
> Deși GBP-ul e „Conectat" cu 18 locații în Manager de date, **locațiile NU sunt disponibile ca assets selectabile** în formularul de grup. E o problemă de **sincronizare/stare a conexiunii**, nu de configurare simplă.

### ✅ FIX-ul (de finalizat — necesită verificare conexiune GBP)
1. **Manager de date → Produse conectate → Google Business Profile → Gestionați.** Verifică starea conexiunii „serviciiseonethut@gmail.com — 18 locații — Conectat":
   - Dacă e „În așteptare/aprobare" → **aprobă** (email GBP).
   - Dacă e conectat dar locațiile nu apar → **deconectează și reconectează** profilul (forțează re-sincronizarea), sau așteaptă câteva ore (sincronizarea poate dura).
2. După ce locațiile devin disponibile: **Elemente → „+" → Locație → Nou grup de locații** → caută/selectează **DENTCRAFT** (Str. Barbu Ștefănescu Delavrancea nr.3) → NU „Toate locațiile" (ar băga și celelalte 17 firme).
3. **Atribuie grupul campaniei Search-1** → Salvează.
4. Când grupul arată „1 locație" (DENTCRAFT) asociată → eligibil pe Google Maps.

*Notă: GBP-ul gestionează 18 firme (Angeloff, avocați, eGhiseul etc.) — la creare, filtrează STRICT pe DENTCRAFT, altfel apar reclame pe locații greșite.*

---

## 📚 Ce zic sursele (research web, 2025-2026)

**Google NU are un produs separat „reclame Maps".** Maps e o *suprafață de afișare*. Ca să apari pe Maps rulezi o **campanie Search (sau Performance Max) cu Location assets activate, alimentate de un GBP verificat și linkat**, cu targetare geografică strânsă. (Google Ads Help 7040605)

**Cerințe concrete (campanie Search):**
1. **Location assets activate** — cel mai important; fără ele nu intri în „Map Pack".
2. **GBP verificat + linkat** la contul Ads (alimentează adresa/detaliile).
3. **Targetare locală strânsă** — oraș/rază în jurul clinicii; targetare națională NU declanșează reclame locale pe Maps.
4. **Rețea:** Maps face parte din Google Search Network (NU Search Partners). Funcționează chiar cu Search Partners + Display oprite.
5. **Limitare:** nu poți servi DOAR pe Maps — Maps vine alături de Search.

**Location assets:**
- Pentru o clinică cu o singură locație → setează la **nivel de cont** (cel mai simplu, se propagă la toate campaniile).
- Setup: **Campanii → Elemente → „+" → Locație → „Locațiile noastre"** → confirmi domeniul → alegi profilul GBP → **Google trimite cerere de aprobare pe emailul contului GBP** → după aprobare, locația devine asset eligibil. (Help 13450314)

**Call assets (le avem ✅):** ajută puternic pe mobil/Maps — buton „Sunați" tap-to-call. Pentru urgențe dentare = drumul cu cea mai mică fricțiune spre telefon. **Location + Call împreună = combinația pe care orice business local ar trebui s-o aibă.**

**Local campaigns = depreciate** → înlocuite de **Performance Max for store goals** (Maps + Waze + YouTube + Gmail, optimizat pe vizite/apeluri/direcții). Recomandat ca **faza 2**, după ce Search merge.

---

## ⚠️ Alt lucru de verificat (din research): targetarea „Presence"
Setarea implicită „**Presence or interest**" (prezență SAU interes) risipește ~20-35% din buget pe clicuri irelevante (oameni care doar caută despre zonă). Pentru o clinică locală → schimbă pe „**Presence**" (doar oameni fizic în / frecvent în Satu Mare). De verificat în Setări campanie → Locații → Opțiuni de locație.

---

## ✅ CHECKLIST de implementat (pentru Maps)
1. ☐ **GBP complet + verificat** (avem — 4.9★/49 recenzii, optimizat azi)
2. ☐ **Adaugă Location asset** (link GBP → campanie) — *acțiunea care deblochează Maps*; necesită aprobare pe emailul GBP
3. ☐ **Call asset** — ✅ deja activ
4. ☐ **Targetare „Presence"** (nu „Presence or interest") + rază Satu Mare; bid mărit după proximitate
5. ☐ Keyword-uri cu intent local — ✅ (avem: dentist/implant/stomatolog satu mare + ad group preț nou)
6. ☐ Relevanță anunț↔landing (Quality Score) — ✅ îmbunătățit azi (RSA noi, fără pinning, landing tematice)
7. ☐ (Faza 2) **PMax for store goals** — pentru acoperire completă Maps/Waze/YouTube
8. ☐ Monitorizare: segmentează după **Click Type** (direcții, detalii locație) ca să vezi activitatea pe Map Pack

---

## Surse
- Google Ads Help: [Show local search ads on Maps (7040605)](https://support.google.com/google-ads/answer/7040605) · [About location assets (2404182)](https://support.google.com/google-ads/answer/2404182) · [Link GBP to Google Ads (13450314)](https://support.google.com/google-ads/answer/13450314) · [PMax for store goals (12971048)](https://support.google.com/google-ads/answer/12971048)
- GrowMyAds — How to Show Ads on Google Maps · YoYoFu — Call & Location Assets · Get-Ryze — Location Targeting Fix 2026 · Search Engine Land — Location assets via Google Maps (sept 2025)
