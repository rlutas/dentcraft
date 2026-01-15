# Claude Rules - Dentcraft.ro Project

## Project Context
- **Project:** Dentcraft.ro - Site prezentare clinică stomatologică
- **Client:** Dr. Razvan Petric - Dentcraft Satu Mare
- **Budget:** €3,000
- **Timeline:** 4-6 săptămâni
- **Tech Stack:** Next.js 16+, TypeScript, Tailwind CSS v4, Sanity CMS, Vercel

---

## Specialized Agents Available

### UI/Design Agents
| Agent | When to Use |
|-------|-------------|
| `ui-designer` | Create UI components, improve visual design, build features |
| `design-system-builder` | Create design systems, component libraries, design tokens |
| `layout-designer` | Page layouts, responsive grids, content organization |
| `color-specialist` | Color palettes, accessibility compliance, theming |
| `typography-expert` | Font selection, hierarchy, readability optimization |
| `icon-designer` | Icon systems, SVG optimization, visual consistency |
| `wireframe-creator` | Low-fidelity mockups, user flow visualization |

### Content Agents
| Agent | When to Use |
|-------|-------------|
| `copywriter` | Marketing copy, persuasive content, CTAs |
| `landing-page-writer` | Landing page copy, hero sections, value propositions |
| `blog-writer` | Blog posts, articles, educational content |
| `technical-writer` | Technical documentation, API docs |
| `seo-optimizer` | SEO optimization, meta tags, content structure |

### Development Agents
| Agent | When to Use |
|-------|-------------|
| `code-reviewer` | Code quality, security review, best practices |
| `refactoring-expert` | Code refactoring, optimization, cleanup |
| `error-investigator` | Bug investigation, debugging, error analysis |
| `performance-optimizer` | Performance profiling, optimization strategies |
| `test-strategist` | Testing strategy, test planning, coverage |
| `deployment-troubleshooter` | Deployment issues, CI/CD problems |

### Architecture Agents
| Agent | When to Use |
|-------|-------------|
| `solution-architect` | System architecture, technology decisions |
| `system-designer` | System design, component structure |
| `database-planner` | Database schema, data modeling |
| `api-designer` | API design, REST/GraphQL specifications |

### Research Agents
| Agent | When to Use |
|-------|-------------|
| `market-researcher` | Market analysis, industry trends |
| `competitive-analyst` | Competitor analysis, feature comparison |
| `best-practice-finder` | Industry best practices, patterns |
| `ux-researcher` | User research, usability studies |

### Planning Agents
| Agent | When to Use |
|-------|-------------|
| `product-manager` | Product strategy, roadmap, prioritization |
| `project-manager` | Project planning, task management |
| `feature-spec-writer` | Feature specifications, requirements |
| `prd-writer` | Product requirements documents |

---

## Code Style & Conventions

### TypeScript
- Strict mode enabled
- No `any` types - use proper typing
- Use interfaces for objects, types for unions
- Export types from dedicated `types/` folder

### Naming Conventions
```
Components:     PascalCase      (ServiceCard.tsx)
Functions:      camelCase       (getServices)
Constants:      SCREAMING_CASE  (API_URL)
Files:          kebab-case      (service-card.tsx)
CSS classes:    kebab-case      (service-card)
```

### File Structure
```
src/
├── app/[locale]/          # Pages (App Router)
├── components/
│   ├── ui/                # Reusable UI (Button, Card, Input)
│   ├── layout/            # Layout (Header, Footer, Nav)
│   ├── sections/          # Page sections (Hero, Services)
│   └── features/          # Complex features (Calculator, Gallery)
├── lib/                   # Utilities, helpers
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── sanity/                # CMS schemas
```

### Component Pattern
```tsx
// Always use this structure
import { type ComponentProps } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  href: string
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    // JSX
  )
}
```

---

## Design System

### Colors (use these Tailwind classes)
```
Background:     bg-cream         (#F5F0E8)
Cards:          bg-white         (#FFFFFF)
Text:           text-primary     (#1A1A1A)
Text muted:     text-muted       (#6B6B6B)
Accent:         bg-accent        (#D4C4B0)
Accent hover:   hover:bg-accent-dark (#C4B4A0)
```

### Spacing
- Use Tailwind spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- Consistent padding: `p-4`, `p-6`, `p-8`
- Section spacing: `py-16` or `py-24`

### Border Radius
- Buttons: `rounded-xl` (12px)
- Cards: `rounded-2xl` (16px) or `rounded-3xl` (24px)
- Inputs: `rounded-lg` (10px)

---

## Multi-language (next-intl)

### Always use translations
```tsx
// CORRECT
import { useTranslations } from 'next-intl'
const t = useTranslations('Services')
<h1>{t('title')}</h1>

// WRONG - never hardcode text
<h1>Serviciile Noastre</h1>
```

### Translation file structure
```
messages/
├── ro.json
├── en.json
└── hu.json
```

---

## Sanity CMS

### Content fetching
```tsx
// Use GROQ queries
import { client } from '@/sanity/lib/client'

const services = await client.fetch(`
  *[_type == "service" && language == $locale] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image
  }
`, { locale })
```

### Always handle loading & error states
```tsx
if (!data) return <Skeleton />
if (error) return <ErrorMessage />
```

---

## Performance Rules

1. **Images:** Always use `next/image` with proper sizes
2. **Fonts:** Use `next/font` for Inter
3. **Components:** Lazy load heavy components
4. **Data:** Cache Sanity queries with revalidation
5. **Bundle:** Keep bundle size minimal, check with `next/bundle-analyzer`

---

## Security Rules

1. **Never** commit `.env` files
2. **Always** validate user input (Zod)
3. **Sanitize** all CMS content
4. **Use** HTTPS everywhere
5. **Set** proper security headers

---

## Git Workflow

### Branch naming
```
feature/    feature/add-calculator
bugfix/     bugfix/fix-mobile-menu
hotfix/     hotfix/security-patch
```

### Commit messages
```
feat: add price calculator component
fix: resolve mobile navigation bug
docs: update README
style: format code with prettier
refactor: simplify gallery logic
```

---

## Do's and Don'ts

### DO:
- ✅ Use TypeScript strictly
- ✅ Follow component pattern
- ✅ Use translations for ALL text
- ✅ Test on mobile first
- ✅ Optimize images
- ✅ Write clean, readable code
- ✅ Document complex logic

### DON'T:
- ❌ Hardcode text (use translations)
- ❌ Use `any` type
- ❌ Ignore TypeScript errors
- ❌ Skip loading states
- ❌ Commit sensitive data
- ❌ Over-engineer solutions
- ❌ Ignore mobile responsiveness
