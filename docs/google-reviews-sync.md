# Sincronizarea Recenziilor Google pentru Dentcraft

Acest document descrie scriptul de sincronizare a recenziilor Google Maps pentru site-ul Dentcraft. Scriptul permite actualizarea automata sau manuala a recenziilor afisate pe site.

## Cuprins

- [Prezentare Generala](#prezentare-generala)
- [Cerinte Preliminare](#cerinte-preliminare)
- [Instalare si Configurare](#instalare-si-configurare)
- [Utilizare](#utilizare)
  - [Preluare din SerpAPI](#preluare-din-serpapi)
  - [Import din Fisier JSON](#import-din-fisier-json)
  - [Modul Merge](#modul-merge)
  - [Modul Dry-Run](#modul-dry-run)
- [Obtinerea unei Chei SerpAPI](#obtinerea-unei-chei-serpapi)
- [Structura Datelor](#structura-datelor)
- [Depanare](#depanare)
- [Automatizare cu GitHub Actions](#automatizare-cu-github-actions)

---

## Prezentare Generala

Scriptul `sync-google-reviews.ts` este un utilitar care:

- **Preia recenzii Google** folosind API-ul SerpAPI
- **Importa recenzii** dintr-un fisier JSON exportat manual
- **Combina recenzii noi** cu cele existente (fara duplicate)
- **Salveaza datele** intr-un fisier JSON utilizat de componentele React

Fisierele implicate:
- **Script**: `/scripts/sync-google-reviews.ts`
- **Date output**: `/src/data/google-reviews.json`

---

## Cerinte Preliminare

### Software necesar

1. **Node.js** versiunea 18 sau mai recenta
2. **npm** (inclus cu Node.js)
3. **tsx** (inclus ca dependenta de dezvoltare)

### Servicii externe (optional)

- **Cont SerpAPI** - necesar doar pentru preluarea automata din Google Maps
  - Plan gratuit: 100 cautari/luna
  - Site: https://serpapi.com

---

## Instalare si Configurare

### Pasul 1: Instaleaza dependentele proiectului

```bash
cd /Users/raul/Projects/dentcraft
npm install
```

### Pasul 2: Configureaza cheia SerpAPI (optional)

Daca doresti sa preiei recenzii direct din Google Maps, ai nevoie de o cheie API:

```bash
# Seteaza variabila de mediu temporar (pentru o singura executie)
export SERPAPI_KEY=cheia_ta_api

# Sau adauga in fisierul .env.local (pentru utilizare persistenta)
echo "SERPAPI_KEY=cheia_ta_api" >> .env.local
```

---

## Utilizare

### Comanda de baza

```bash
npm run sync-reviews
```

### Optiuni disponibile

| Optiune | Scurtatura | Descriere |
|---------|------------|-----------|
| `--import <fisier>` | `-i` | Importa recenzii dintr-un fisier JSON |
| `--merge` | `-m` | Combina recenziile noi cu cele existente |
| `--dry-run` | `-d` | Arata modificarile fara a salva |
| `--help` | `-h` | Afiseaza mesajul de ajutor |

### Preluare din SerpAPI

Aceasta este metoda recomandata pentru actualizari regulate.

```bash
# Preluare simpla - inlocuieste toate recenziile existente
SERPAPI_KEY=cheia_ta npm run sync-reviews

# Preluare cu merge - pastreaza recenziile existente si adauga cele noi
SERPAPI_KEY=cheia_ta npm run sync-reviews -- --merge

# Previzualizare fara salvare
SERPAPI_KEY=cheia_ta npm run sync-reviews -- --dry-run
```

**Ce face scriptul:**
1. Trimite o cerere catre SerpAPI cu ID-ul locatiei Dentcraft
2. Primeste lista de recenzii in format JSON
3. Transforma datele in formatul utilizat de site
4. Salveaza rezultatul in `/src/data/google-reviews.json`

### Import din Fisier JSON

Daca ai recenzii exportate manual sau dintr-un alt instrument, le poti importa astfel:

```bash
# Import simplu - inlocuieste recenziile existente
npm run sync-reviews -- --import /cale/catre/recenzii.json

# Import cu merge - combina cu recenziile existente
npm run sync-reviews -- --import /cale/catre/recenzii.json --merge

# Previzualizare import
npm run sync-reviews -- --import /cale/catre/recenzii.json --dry-run
```

**Formate acceptate pentru import:**

Format 1 - Array simplu:
```json
[
  {
    "author": "Ion Popescu",
    "rating": 5,
    "date": "acum 2 saptamani",
    "text": "Servicii excelente!",
    "photoUrl": "https://lh3.googleusercontent.com/..."
  }
]
```

Format 2 - Obiect cu array de recenzii:
```json
{
  "reviews": [
    {
      "name": "Maria Ionescu",
      "stars": 5,
      "time": "acum o luna",
      "review": "Recomand cu incredere!",
      "avatar": "https://..."
    }
  ]
}
```

**Campuri acceptate (mapate automat):**
- Autor: `author`, `name`
- Rating: `rating`, `stars`
- Data: `date`, `time`
- Text: `text`, `review`, `content`, `snippet`
- Poza: `photoUrl`, `photo`, `avatar`, `thumbnail`, `profile_photo_url`

### Modul Merge

Modul merge (`--merge` sau `-m`) este util cand:
- Doresti sa adaugi recenzii noi fara a pierde cele existente
- Ai recenzii din mai multe surse
- Vrei sa actualizezi periodic fara risc de pierdere de date

```bash
# Exemplu: actualizeaza recenziile pastrandu-le pe cele existente
SERPAPI_KEY=cheia_ta npm run sync-reviews -- --merge
```

**Cum functioneaza deduplicarea:**
- Scriptul compara autorul si primele 50 de caractere din text
- Recenziile duplicate nu sunt adaugate de doua ori
- URL-urile pozelor sunt actualizate daca lipseau anterior

### Modul Dry-Run

Modul dry-run (`--dry-run` sau `-d`) arata ce modificari ar fi facute fara a salva efectiv:

```bash
# Previzualizeaza rezultatul fara a modifica fisierul
npm run sync-reviews -- --dry-run
```

**Output exemplu:**
```
=== Dentcraft Google Reviews Sync ===

Fetching reviews from SerpAPI...

--- DRY RUN: Would save the following data ---

{
  "placeId": "ChIJL242SZwFOEcRGfUpTMfB-MU",
  "rating": 4.8,
  "totalReviews": 24,
  ...
}

--- End of dry run ---

=== Summary ===
Total reviews: 24
Average rating: 4.8
Reviews with photos: 12
Last updated: 2025-01-16
```

---

## Obtinerea unei Chei SerpAPI

### Pasul 1: Creeaza un cont

1. Acceseaza https://serpapi.com
2. Click pe "Sign Up" sau "Get Started"
3. Completeaza formularul de inregistrare
4. Confirma adresa de email

### Pasul 2: Obtine cheia API

1. Autentifica-te in contul SerpAPI
2. Acceseaza Dashboard > API Key
3. Copiaza cheia afisata

### Pasul 3: Configureaza cheia in proiect

```bash
# Metoda 1: Variabila de mediu temporara
export SERPAPI_KEY=cheia_copiata

# Metoda 2: Fisier .env.local (recomandat pentru dezvoltare)
echo "SERPAPI_KEY=cheia_copiata" >> .env.local

# Metoda 3: Direct la rulare
SERPAPI_KEY=cheia_copiata npm run sync-reviews
```

### Costuri si limite

| Plan | Pret | Cautari/luna |
|------|------|--------------|
| Gratuit | $0 | 100 |
| Developer | $50 | 5,000 |
| Production | $130 | 15,000 |

**Estimare pentru Dentcraft:**
- Sincronizare saptamanala = ~4 cautari/luna
- Sincronizare zilnica = ~30 cautari/luna
- Planul gratuit este suficient pentru majoritatea cazurilor

---

## Structura Datelor

### Fisierul de output: `src/data/google-reviews.json`

```json
{
  "placeId": "ChIJL242SZwFOEcRGfUpTMfB-MU",
  "rating": 4.8,
  "totalReviews": 24,
  "lastUpdated": "2025-01-15",
  "googleMapsUrl": "https://www.google.com/maps/place/DENTCRAFT/...",
  "reviews": [
    {
      "id": "1",
      "author": "Ioana Boros",
      "rating": 5,
      "date": "acum 4 saptamani",
      "text": "Un doctor foarte bun, recomand cu incredere!",
      "photoUrl": "https://lh3.googleusercontent.com/..."
    }
  ]
}
```

### Explicatia campurilor

| Camp | Tip | Descriere |
|------|-----|-----------|
| `placeId` | string | ID-ul Google Places al locatiei Dentcraft |
| `rating` | number | Rating-ul mediu (1.0 - 5.0) |
| `totalReviews` | number | Numarul total de recenzii pe Google |
| `lastUpdated` | string | Data ultimei sincronizari (YYYY-MM-DD) |
| `googleMapsUrl` | string | Link direct catre pagina de recenzii Google Maps |
| `reviews` | array | Lista de recenzii |

### Structura unei recenzii

| Camp | Tip | Descriere |
|------|-----|-----------|
| `id` | string | Identificator unic al recenziei |
| `author` | string | Numele autorului |
| `rating` | number | Rating-ul acordat (1-5 stele) |
| `date` | string | Data relativa ("acum 2 saptamani") |
| `text` | string | Textul recenziei |
| `photoUrl` | string/null | URL-ul pozei de profil a autorului |
| `localGuide` | boolean | Daca autorul este Local Guide (optional) |
| `reviewCount` | number | Numarul de recenzii ale autorului (optional) |
| `photoCount` | number | Numarul de poze postate de autor (optional) |

---

## Depanare

### Eroare: "SERPAPI_KEY environment variable is required"

**Cauza:** Cheia API nu este configurata.

**Solutie:**
```bash
# Verifica daca variabila este setata
echo $SERPAPI_KEY

# Seteaza variabila si ruleaza
SERPAPI_KEY=cheia_ta npm run sync-reviews
```

### Eroare: "SerpAPI request failed: 401"

**Cauza:** Cheia API este invalida sau expirata.

**Solutie:**
1. Verifica cheia in dashboard-ul SerpAPI
2. Asigura-te ca nu ai depasit limita de cautari
3. Regenereaza cheia daca este necesar

### Eroare: "Import file not found"

**Cauza:** Calea catre fisierul de import este gresita.

**Solutie:**
```bash
# Foloseste calea absoluta
npm run sync-reviews -- --import /Users/raul/Projects/dentcraft/recenzii.json

# Sau calea relativa la directorul curent
npm run sync-reviews -- --import ./recenzii.json
```

### Eroare: "Invalid import format"

**Cauza:** Fisierul JSON nu are formatul asteptat.

**Solutie:** Asigura-te ca fisierul contine:
- Un array de recenzii: `[{...}, {...}]`
- Sau un obiect cu proprietatea `reviews`: `{"reviews": [{...}]}`

### Recenziile nu se actualizeaza pe site

**Cauza posibila 1:** Cache-ul Next.js

**Solutie:**
```bash
# Sterge cache-ul si reconstruieste
rm -rf .next
npm run build
npm run dev
```

**Cauza posibila 2:** Fisierul nu a fost salvat

**Solutie:**
```bash
# Verifica ca nu ai folosit --dry-run
npm run sync-reviews  # fara --dry-run
```

### Pozele autorilor nu se afiseaza

**Cauza:** Google poate schimba URL-urile pozelor in timp.

**Solutie:**
```bash
# Ruleaza sincronizarea cu merge pentru a actualiza URL-urile
SERPAPI_KEY=cheia_ta npm run sync-reviews -- --merge
```

---

## Automatizare cu GitHub Actions

Poti configura sincronizarea automata a recenziilor folosind GitHub Actions.

### Pasul 1: Adauga secretul in GitHub

1. Acceseaza repository-ul pe GitHub
2. Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Nume: `SERPAPI_KEY`
5. Valoare: cheia ta API

### Pasul 2: Creeaza workflow-ul

Creeaza fisierul `.github/workflows/sync-reviews.yml`:

```yaml
name: Sincronizare Recenzii Google

on:
  # Ruleaza in fiecare luni la ora 6:00 UTC
  schedule:
    - cron: '0 6 * * 1'

  # Permite rularea manuala din interfata GitHub
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Sync Google reviews
        run: npm run sync-reviews -- --merge
        env:
          SERPAPI_KEY: ${{ secrets.SERPAPI_KEY }}

      - name: Commit and push changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: sincronizare automata recenzii Google'
          file_pattern: 'src/data/google-reviews.json'
```

### Pasul 3: Verifica functionarea

1. Acceseaza tab-ul "Actions" in repository
2. Selecteaza workflow-ul "Sincronizare Recenzii Google"
3. Click "Run workflow" pentru a testa manual

### Frecvente recomandate

| Frecventa | Cron | Cautari/luna | Utilizare |
|-----------|------|--------------|-----------|
| Saptamanal | `0 6 * * 1` | ~4 | Recomandat |
| Bi-saptamanal | `0 6 1,15 * *` | ~2 | Trafic redus |
| Zilnic | `0 6 * * *` | ~30 | Trafic mare |

---

## Informatii suplimentare

### Configuratia SerpAPI utilizata

Scriptul foloseste urmatoarele setari pentru API-ul SerpAPI:

- **Engine**: `google_maps_reviews`
- **Limba**: `ro` (romana)
- **Sortare**: Cele mai noi intai
- **Place ID**: `ChIJL242SZwFOEcRGfUpTMfB-MU`
- **Data CID**: `0x4738059c49336e2f:0xc5f8c1c74c29f519`

### Link-uri utile

- [Documentatie SerpAPI](https://serpapi.com/google-maps-reviews-api)
- [Dashboard SerpAPI](https://serpapi.com/dashboard)
- [Google Maps - Dentcraft](https://www.google.com/maps/place/DENTCRAFT/@47.7897,22.8747,17z)

### Contact pentru suport

Pentru probleme cu scriptul, deschide un issue in repository sau contacteaza echipa de dezvoltare.
