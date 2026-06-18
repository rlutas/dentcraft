# Master Import Guide — Google Ads Editor

## Setup inițial (o singură dată)

1. Open **Google Ads Editor**
2. Click **+** sau **Add** → adaugă cont
3. Login cu `serviciuseonetbut@gmail.com`
4. Click **Get recent changes** → download contul curent (sync ~1 min)
5. În stânga vei vedea: cont → campaign **Search-1** → ad group **"Grupul de anunțuri 1"** (existing)

## Pasul A — Creează 5 ad groups noi (2 min)

În Editor, **Account → Make multiple changes → Ad Groups**:

```
Action	Campaign	Ad Group	Status	Default Max CPC	Ad Group Type
Add	Search-1	AG_Implant_SM	Paused	10	Standard
Add	Search-1	AG_Estetica_SM	Paused	8	Standard
Add	Search-1	AG_Ortodontie_SM	Paused	8	Standard
Add	Search-1	AG_General_SM	Paused	8	Standard
Add	Search-1	AG_Brand_SM	Paused	3	Standard
```

> ⚠️ Le creăm pe **Paused** ca să nu pornească până nu adăugăm keywords + RSAs!

Click **Process** → **Keep** → fereastra confirmă create de 5 ad groups.

## Pasul B — Adaugă 47 keywords (3 min)

**Account → Make multiple changes → Keywords**:

```
Action	Campaign	Ad Group	Keyword	Match Type	Status	Max CPC
Add	Search-1	AG_Implant_SM	implant dentar satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	implant dentar satu mare	Exact	Enabled	12
Add	Search-1	AG_Implant_SM	implant dentar carei	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	implant dentar pret	Phrase	Enabled	8
Add	Search-1	AG_Implant_SM	implant dentar pret satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	all on 4 satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	all on 6 satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	implant unidentar satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	implantologie satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	implant zirconiu satu mare	Phrase	Enabled	10
Add	Search-1	AG_Implant_SM	proteza pe implant satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	fatete dentare satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	fatete dentare satu mare	Exact	Enabled	10
Add	Search-1	AG_Estetica_SM	fatete ceramice satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	fatete pret satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	hollywood smile satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	albire dentara satu mare	Phrase	Enabled	6
Add	Search-1	AG_Estetica_SM	albire dentara profesionala satu mare	Phrase	Enabled	6
Add	Search-1	AG_Estetica_SM	estetica dentara satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	zambet hollywood satu mare	Phrase	Enabled	8
Add	Search-1	AG_Estetica_SM	fatete e.max satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	aparat dentar satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	aparat dentar satu mare	Exact	Enabled	10
Add	Search-1	AG_Ortodontie_SM	ortodontie satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	invisalign satu mare	Phrase	Enabled	10
Add	Search-1	AG_Ortodontie_SM	aparat dentar copii satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	aparat dentar adulti satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	ortodont satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	aparat dentar pret satu mare	Phrase	Enabled	8
Add	Search-1	AG_Ortodontie_SM	aparat dentar invizibil satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	stomatolog satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	stomatolog satu mare	Exact	Enabled	10
Add	Search-1	AG_General_SM	dentist satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	dentist satu mare	Exact	Enabled	10
Add	Search-1	AG_General_SM	cabinet stomatologic satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	clinica stomatologica satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	medic stomatolog satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	stomatolog bun satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	clinica dentara satu mare	Phrase	Enabled	8
Add	Search-1	AG_General_SM	clinica stomatologica buna satu mare	Phrase	Enabled	8
Add	Search-1	AG_Brand_SM	dentcraft	Exact	Enabled	3
Add	Search-1	AG_Brand_SM	dentcraft satu mare	Exact	Enabled	3
Add	Search-1	AG_Brand_SM	dentcraft clinica	Phrase	Enabled	3
Add	Search-1	AG_Brand_SM	clinica dentcraft	Phrase	Enabled	3
Add	Search-1	AG_Brand_SM	dr petric	Exact	Enabled	3
Add	Search-1	AG_Brand_SM	dr razvan petric	Phrase	Enabled	3
Add	Search-1	AG_Brand_SM	dr buterchi	Exact	Enabled	3
Add	Search-1	AG_Brand_SM	dentcraft.ro	Phrase	Enabled	3
```

Selectează tot textul → **Process**.

## Pasul C — Setează Final URL pe ad groups (1 min)

**Account → Make multiple changes → Ad Groups (edit)**:

```
Action	Campaign	Ad Group	Final URL
Edit	Search-1	AG_Implant_SM	https://www.dentcraft.ro/preturi#calculator
Edit	Search-1	AG_Estetica_SM	https://www.dentcraft.ro/galerie
Edit	Search-1	AG_Ortodontie_SM	https://www.dentcraft.ro/servicii/ortodontie
Edit	Search-1	AG_General_SM	https://www.dentcraft.ro/
Edit	Search-1	AG_Brand_SM	https://www.dentcraft.ro/
```

## Pasul D — Adaugă 5 RSAs (3 min)

**Account → Make multiple changes → Responsive Search Ads**:

```
Action	Campaign	Ad Group	Status	Final URL	Headline 1	Position 1	Headline 2	Position 2	Headline 3	Position 3	Headline 4	Headline 5	Headline 6	Headline 7	Headline 8	Headline 9	Headline 10	Description 1	Description 2	Description 3	Description 4	Path 1	Path 2
Add	Search-1	AG_Implant_SM	Enabled	https://www.dentcraft.ro/preturi#calculator	Implant Dentar Satu Mare	1	DENTCRAFT — De la 2500 lei	2	Calculator Pret in 60 sec	3	Garantie Inclusa · Plan Scris	Scanner 3D · Anestezie Blanda	All-on-4 si All-on-6 Disponibile	1500+ Pacienti Tratati	Consultatie Gratuita	Dr. Petric · 10+ Ani Experienta	Implant Premium Satu Mare	Calculator pret online — vezi minim si maxim in 60 sec fara telefon. Plan scris inainte garantie pentru lucrari.	Dr. Petric si echipa: 10+ ani experienta 1500+ pacienti tratati. Scanner 3D digital anestezie blanda fara surprize.	Implant dentar de la 2500 lei la DENTCRAFT Satu Mare. Consultatie gratuita plan personalizat garantie.	Programeaza gratuit: 0741 199 977 sau pe site. Str. Delavrancea 3 Satu Mare.	implant	satu-mare
Add	Search-1	AG_Estetica_SM	Enabled	https://www.dentcraft.ro/galerie	Fatete Ceramice Satu Mare	1	Hollywood Smile · DENTCRAFT	2	Vezi Cazuri Reale pe Site	3	Albire LED Profesionala	Materiale Premium e.max	Calculator Pret Online · 60 sec	Dr. Petric · Estetica Premium	Consultatie Estetica Gratuita	Plan Personalizat · Garantie	Programeaza — RO · EN · HU	Fatete ceramice personalizate la DENTCRAFT Satu Mare. Zambet natural plan scris inainte garantie inclusa.	Hollywood Smile cu Dr. Petric — 10+ ani experienta 1500+ pacienti. Consultatie gratuita calculator pret online.	Albire profesionala LED + fatete premium e.max. Ambient relaxant comunicare clara. Programeaza: 0741 199 977.	Estetica dentara de top in Satu Mare. Scanner 3D planificare digitala fara surprize. Calculator pret in 60 sec.	fatete	satu-mare
Add	Search-1	AG_Ortodontie_SM	Enabled	https://www.dentcraft.ro/servicii/ortodontie	Aparat Dentar Satu Mare	1	Copii si Adulti · Invisalign	2	DENTCRAFT — Plan Personalizat	3	Metalic Ceramic Invisalign	Consultatie Ortodontica Gratis	Calculator Pret in 60 sec	Aparat Copii · Cu Blandete	Dr. Petric · 10+ Ani Experienta	Scanner 3D · Plan Digital	Tratament Complet · Garantie	Aparate dentare moderne pentru copii si adulti la DENTCRAFT Satu Mare. Metalice ceramice Invisalign.	Tratamente ortodontice cu Dr. Petric — abordare blanda pentru copii eficienta pentru adulti. Consultatie gratuita.	Calculator pret online — vezi minim si maxim in 60 sec. Scanner 3D planificare digitala garantie inclusa.	Aparat dentar Satu Mare la DENTCRAFT. Plan scris inainte ambient relaxant. Programeaza: 0741 199 977.	ortodontie	satu-mare
Add	Search-1	AG_General_SM	Enabled	https://www.dentcraft.ro/	Stomatolog Satu Mare · DENTCRAFT	1	Calculator Pret Online · Gratis	2	Plan Scris Inainte · Garantie	3	Implant Ortodontie Estetica	Consultatie Gratuita Aici	Dr. Petric · 1500+ Pacienti	Programeaza in 60 Secunde	Anestezie Blanda · Fara Durere	Cabinet Modern Satu Mare	RO · EN · HU — Vorbim Limba Ta	Clinica stomatologica DENTCRAFT Satu Mare. Calculator pret online plan scris inainte garantie pentru lucrari.	Implant ortodontie fatete albire — toate la DENTCRAFT. Dr. Petric 10+ ani experienta ambient relaxant.	Vezi minim si maxim in 60 sec cu calculatorul nostru online. Fara telefon fara asteptare. Plan personalizat.	Programeaza gratuit: 0741 199 977 sau pe site. Str. Delavrancea 3 Satu Mare.	stomatolog	satu-mare
Add	Search-1	AG_Brand_SM	Enabled	https://www.dentcraft.ro/	DENTCRAFT — Site Oficial	1	Clinica Stomatologica Satu Mare	2	Dr. Petric · Programari Online	3	Calculator Pret · Plan Scris	10+ Ani · 1500+ Pacienti	Consultatie Gratuita Aici	Vezi Recenzii Google Reale	Programeaza in 60 Secunde	Anestezie Blanda · Fara Durere	RO · EN · HU — Vorbim Limba Ta	Site-ul oficial DENTCRAFT Satu Mare. Calculator pret online programari 24/7 plan scris inainte de a incepe.	Dr. Petric si echipa la DENTCRAFT — 10+ ani experienta 1500+ pacienti tratati recenzii reale Google.	Toate serviciile stomatologice: implant ortodontie fatete albire pedodontie. Garantie pentru lucrari.	Contacteaza-ne: 0741 199 977 sau programare online. Str. Delavrancea 3 Satu Mare.	dentcraft	satu-mare
```

## Pasul E — Activează ad groups noi + Pune pe pauză ad group-ul vechi

În Editor, în navigatorul stâng:
1. Click pe **AG_Implant_SM** → în panoul drept schimbă **Status** la **Enabled**
2. Repetă pentru **AG_Estetica_SM, AG_Ortodontie_SM, AG_General_SM, AG_Brand_SM**
3. Click pe **"Grupul de anunțuri 1"** (vechi) → schimbă **Status** la **Paused**

## Pasul F — Post to Google Ads (1 min)

Sus în Editor: **Post → Post All Changes** → confirmare → ✅ live în Google Ads!

## După Post — verifică în UI Google Ads

1. Vezi 5 ad groups noi + cel vechi pe pauză
2. Status "Eligibilă" pe toate cele 5 noi
3. Așteaptă 24-48h pentru date primele impressions

## Monitorizare săptămâna 1

- Zilnic: Search Terms report → adaugă negative kw noi
- Zi 7: CPC mediu ar trebui să scadă (target < 8 RON)
- Zi 14: dacă conv ≥ 20 → switch la **Target CPA = 120 RON**
