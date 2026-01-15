# Claude Orchestrator - Dentcraft.ro

## Agent Strategy

Folosește agenți pentru task-uri complexe care necesită:
- Căutare în codebase
- Generare de cod complex
- Research & documentare
- Task-uri paralele independente

---

## Specialized Agents - Primary Selection

### 🎨 UI/Design Tasks → Use Specialized Agents

| Task Type | Primary Agent | Alternatives |
|-----------|---------------|--------------|
| Create UI components | `ui-designer` | `design-system-builder` |
| Fix layout issues | `layout-designer` | `ui-designer` |
| Design system problems | `design-system-builder` | `color-specialist` |
| Color/theme issues | `color-specialist` | `design-system-builder` |
| Typography problems | `typography-expert` | `ui-designer` |
| Responsive design | `layout-designer` | `ui-designer` |

### 📝 Content Tasks → Use Specialized Agents

| Task Type | Primary Agent | Alternatives |
|-----------|---------------|--------------|
| Landing page copy | `landing-page-writer` | `copywriter` |
| Blog posts | `blog-writer` | `copywriter` |
| Technical docs | `technical-writer` | `documentation-writer` |
| SEO optimization | `seo-optimizer` | `copywriter` |
| Marketing copy | `copywriter` | `landing-page-writer` |

### 🔧 Development Tasks → Use Specialized Agents

| Task Type | Primary Agent | Alternatives |
|-----------|---------------|--------------|
| Debug issues | `error-investigator` | `code-reviewer` |
| Code review | `code-reviewer` | `refactoring-expert` |
| Performance issues | `performance-optimizer` | `code-reviewer` |
| Refactoring | `refactoring-expert` | `code-reviewer` |
| Testing strategy | `test-strategist` | `code-reviewer` |
| Deployment issues | `deployment-troubleshooter` | `error-investigator` |

### 🏗️ Architecture Tasks → Use Specialized Agents

| Task Type | Primary Agent | Alternatives |
|-----------|---------------|--------------|
| System design | `solution-architect` | `system-designer` |
| Database design | `database-planner` | `system-designer` |
| API design | `api-designer` | `solution-architect` |

### 📊 Research Tasks → Use Specialized Agents

| Task Type | Primary Agent | Alternatives |
|-----------|---------------|--------------|
| Market research | `market-researcher` | `competitive-analyst` |
| Competitor analysis | `competitive-analyst` | `market-researcher` |
| Best practices | `best-practice-finder` | `ux-researcher` |
| UX research | `ux-researcher` | `ux-reviewer` |

---

## Agent Types & Când să-i folosești

### 1. `Explore` Agent
**Când:** Trebuie să înțelegi codebase-ul sau să găsești fișiere

```
Exemple:
- "Găsește toate componentele care folosesc Sanity"
- "Care e structura rutelor în app?"
- "Unde sunt definite culorile?"
```

**Prompt template:**
```
Explorează codebase-ul și găsește [CE CAUȚI].
Raportează: path-uri fișiere, cod relevant, pattern-uri identificate.
```

### 2. `Plan` Agent
**Când:** Trebuie să planifici implementarea unei funcționalități

```
Exemple:
- "Planifică implementarea calculatorului de prețuri"
- "Cum ar trebui structurat sistemul de multilingv?"
- "Ce abordare pentru galeria Before/After?"
```

**Prompt template:**
```
Planifică implementarea pentru [FEATURE].
Include: arhitectură, componente necesare, dependințe, pași implementare, edge cases.
```

### 3. Specialized Agents (PREFER THESE)
**Când:** Task-uri specifice care au un agent dedicat

```
Exemple:
- Layout problems → `layout-designer`
- UI component design → `ui-designer`
- CSS/Design system → `design-system-builder`
- Performance → `performance-optimizer`
- Bugs → `error-investigator`
```

**Prompt template:**
```
Context: [PROIECT, TECH STACK, DESIGN SYSTEM]
Problem: [CE TREBUIE REZOLVAT]
Files involved: [PATH-URI RELEVANTE]
Expected output: [CE VREI SĂ PRIMEȘTI]
```

### 4. `general-purpose` Agent
**Când:** Task-uri complexe care nu au agent specializat

```
Exemple:
- "Generează schema Sanity pentru servicii"
- "Scrie documentația pentru API"
- Task-uri care combină mai multe domenii
```

**Prompt template:**
```
[TASK DETALIAT]
Context: [CE EXISTĂ DEJA]
Output: [CE VREI SĂ PRIMEȘTI]
Salvează în: [PATH]
```

---

## Parallel Agents Strategy

### Când să lansezi agenți în paralel:

**DA - Task-uri independente:**
```
Agent 1: Creează componenta Header
Agent 2: Creează componenta Footer
Agent 3: Creează componenta Button
```

**NU - Task-uri dependente:**
```
1. Mai întâi: Setup Sanity schema
2. Apoi: Creează componente care folosesc datele
3. La final: Integrare și testare
```

### Exemplu lansare paralel:
```
Lansez 3 agenți în paralel:
1. Agent components: Creează UI components (Button, Card, Input)
2. Agent layout: Creează layout components (Header, Footer)
3. Agent sanity: Creează schema CMS
```

---

## Task Breakdown pentru Dentcraft

### FAZA 1: Setup (secvențial)
```
1. Setup Next.js + config
2. Setup Tailwind cu design system
3. Setup next-intl (multilingv)
4. Setup Sanity CMS
```

### FAZA 2: Components (paralel)
```
Parallel batch 1:
- Agent UI: Button, Card, Input, Badge
- Agent Layout: Header, Footer, Navigation
- Agent Sections: Hero, CTA, Features

Parallel batch 2:
- Agent Gallery: Before/After slider
- Agent Calculator: Price calculator
- Agent Forms: Contact form, Upload form
```

### FAZA 3: Pages (semi-paralel)
```
Batch 1 (paralel - nu au dependințe):
- Homepage
- Contact
- FAQ

Batch 2 (paralel):
- Servicii template
- Echipa template
- Blog template

Batch 3 (secvențial - depind de template-uri):
- Toate paginile de servicii (9)
- Paginile echipa individuale
- Legal pages
```

### FAZA 4: Integration (secvențial)
```
1. Conectare Sanity cu frontend
2. SEO & meta tags
3. Analytics setup
4. Testing
5. Deploy
```

---

## Prompt Templates pentru Dentcraft

### Creare Component:
```
Creează componenta [NUME] pentru Dentcraft.

Design specs:
- Stil: Apple-inspired, minimalist
- Culori: bg-cream, text-primary, accent colors
- Border radius: rounded-2xl pentru cards
- Font: Inter

Funcționalitate:
[DESCRIE CE FACE]

Props interface:
[LISTEAZĂ PROPS]

Salvează în: src/components/[folder]/[nume].tsx
Include: TypeScript types, responsive design, hover states
```

### Creare Page:
```
Creează pagina [NUME] pentru Dentcraft.

Secțiuni:
1. [SECȚIUNE 1]
2. [SECȚIUNE 2]
...

Folosește componentele existente din src/components/
Asigură-te că e responsive (mobile-first)
Folosește next-intl pentru toate textele

Salvează în: src/app/[locale]/[path]/page.tsx
```

### Creare Sanity Schema:
```
Creează schema Sanity pentru [CONTENT TYPE].

Câmpuri necesare:
- [FIELD 1]: [TYPE] - [DESCRIERE]
- [FIELD 2]: [TYPE] - [DESCRIERE]
...

Include:
- Validări
- Suport multilingv (ro/en/hu)
- Preview configuration
- Ordering

Salvează în: sanity/schemas/documents/[nume].ts
```

---

## Efficiency Tips

### 1. Batch Similar Tasks
```
// MAI BINE: Un agent pentru toate componentele UI
"Creează componentele: Button, Card, Input, Badge, Avatar"

// MAI RĂU: Agent separat pentru fiecare
```

### 2. Provide Context
```
// MAI BINE: Context complet
"Creează Header pentru Dentcraft.
Avem deja: Button în src/components/ui/button.tsx
Design system: docs/design-system.md
Logo: text 'DENTCRAFT', font-bold"

// MAI RĂU: Fără context
"Creează un header"
```

### 3. Specify Output Location
```
// Întotdeauna specifică unde să salveze
"Salvează în: src/components/layout/header.tsx"
```

### 4. One Agent = One Responsibility
```
// MAI BINE: Task focused
Agent 1: "Creează toate componentele UI"
Agent 2: "Creează toate schemele Sanity"

// MAI RĂU: Task prea larg
"Creează tot frontend-ul"
```

---

## Quick Reference

| Task Type | Agent | Parallel? |
|-----------|-------|-----------|
| Find files/code | Explore | Single |
| Plan feature | Plan | Single |
| Create component | general-purpose | Yes, batch similar |
| Create page | general-purpose | Yes, independent pages |
| Create schema | general-purpose | Yes, batch all |
| Write docs | general-purpose | Yes |
| Debug issue | Explore + fix | Sequential |
| Refactor | Plan + implement | Sequential |

---

## Checklist Before Using Agent

- [ ] Task-ul e suficient de complex? (altfel fă manual)
- [ ] Am dat context suficient?
- [ ] Am specificat output location?
- [ ] E independent de alte task-uri? (dacă da, poate fi paralel)
- [ ] Am definit clar ce vreau să primesc?
