# Ghid: Primul Articol Blog in Sanity CMS

## Pasul 0: Creeaza Blog Category (o singura data)

Mergi la **localhost:3001/studio** → Din meniul stanga, cauta **Blog Category** → Click **+ Create**

```
Title:
  Romanian: Implantologie
  English: Implantology
  Hungarian: Implantológia

Slug: Click "Generate" → implantologie
```

**Publish** (butonul verde din dreapta-jos)

---

## Pasul 1: Creeaza Blog Post

Din meniul stanga → **Blog Post** → Click **+ Create**

---

### Title (obligatoriu)

**Romanian:**
```
Cat costa un implant dentar in Satu Mare? Ghid complet preturi 2026
```

**English:**
```
How Much Does a Dental Implant Cost in Satu Mare? Complete 2026 Price Guide
```

**Hungarian:**
```
Mennyibe kerül egy fogimplantátum Szatmárnémetiben? Teljes árkalauz 2026
```

---

### Slug

Click **"Generate"** din butonul de langa camp. Va genera automat:
```
cat-costa-implant-dentar-satu-mare-ghid-complet-preturi-2026
```

Sau seteaza manual:
```
cat-costa-implant-dentar-satu-mare
```

---

### Excerpt (rezumat scurt - apare in carduri si SEO)

**Romanian:**
```
Cat costa un implant dentar in Satu Mare? Preturi de la 2.500 lei, factori care influenteaza costul, ce include pretul si intrebari frecvente. Ghid complet de la Dr. Petric, DentCraft.
```

**English:**
```
How much does a dental implant cost in Satu Mare? Prices from 2,500 lei (approx. 500 EUR), factors that influence the cost, what's included, and FAQ. Complete guide by Dr. Petric, DentCraft.
```

**Hungarian:**
```
Mennyibe kerül egy fogimplantátum Szatmárnémetiben? Árak 2.500 lejtől, a költséget befolyásoló tényezők, mit tartalmaz az ár és gyakori kérdések. Teljes útmutató Dr. Petric-től, DentCraft.
```

---

### Content (articolul complet - Portable Text Editor)

**IMPORTANT:** In Sanity, content-ul se introduce in editorul vizual (Portable Text). Nu poti face paste direct din markdown. Trebuie sa:

1. Copiezi textul sectiune cu sectiune
2. Pentru **headings** (## titluri): selecteaza textul → schimba din "Normal" in "Heading 2" din dropdown
3. Pentru **bold text**: selecteaza → Ctrl+B
4. Pentru **liste cu bullet**: click iconita de lista din toolbar
5. Pentru **liste numerotate**: click iconita de lista numerotata
6. Pentru **linkuri**: selecteaza textul → click iconita de link → paste URL

**Nota despre tabele:** Sanity Portable Text NU suporta tabele nativ. Pentru tabelul cu preturi, ai 2 optiuni:
- **Optiunea A:** Transforma in lista cu bold (recomandat):
  ```
  Implant dentar (fara coroana): 2.500 – 4.500 lei
  Coroana pe implant (zirconiu): 1.500 – 2.500 lei
  ...etc
  ```
- **Optiunea B:** Adauga o imagine cu tabelul

Articolele complete pentru fiecare limba sunt in:
- **RO:** `/docs/blog/2026-02-24-cat-costa-implant-dentar-satu-mare.md` (originalul)
- **EN:** vezi mai jos
- **HU:** vezi mai jos

---

### Cover Image

Trebuie o imagine relevanta - optiuni:
- O fotografie din cabinet cu implantul
- O imagine stock cu un zambet / implant dentar
- Dimensiune recomandata: **1200x675px** (16:9 aspect ratio)

**Alt Text:**
```
Implant dentar la clinica DentCraft Satu Mare - consultatie gratuita
```

---

### Category

Scrie "Implantologie" → selecteaza categoria creata la Pasul 0

---

### Author

Scrie "Petric" → selecteaza **Dr. Petric Razvan-Tudor** din lista

**NOTA IMPORTANTA:** Daca NU vezi membrii echipei in lista, inseamna ca echipa nu e inca in Sanity (foloseste datele fallback din cod). In acest caz:
1. Mai intai trebuie sa adaugi Team Members in Sanity
2. Sau lasa campul Author gol deocamdata

---

### Published At

```
2026-02-24T10:00:00.000Z
```
(sau data curenta cand publici)

---

### Featured

Bifeaza **ON** (primul articol merita sa fie featured)

---

### SEO (sectiunea de jos)

**Meta Title:**
```
Implant Dentar Satu Mare Pret 2026 - Ghid Complet
```

**Meta Description:**
```
Cat costa un implant dentar in Satu Mare? Preturi de la 2.500 lei, factori care influenteaza costul si ce include. Consultatie gratuita DentCraft.
```

**OG Image:** Upload aceeasi imagine ca Cover Image

**No Index:** OFF (vrem sa fie indexat)

---

## Pasul 2: Publish

Click **Publish** (butonul verde din dreapta-jos)

Articolul va aparea la: `localhost:3001/ro/blog/cat-costa-implant-dentar-satu-mare`

---

## Despre Autori pe Blog

Schema Sanity deja conecteaza autorii cu Team Members. Cand selectezi un autor:
- Apare poza lor din profil
- Numele e link catre pagina lor de echipa (/echipa/razvan-petric)
- Apare in author bio la finalul articolului

**Toti doctorii pot fi autori:**
- Dr. Petric Razvan-Tudor (implantologie, estetica)
- Dr. Ghirasim Denisa Stefania (stomatologie generala)
- Dr. Tincu Giovana (ortodontie, pedodontie)

Fiecare doctor scrie articole din aria lor de expertiza.
