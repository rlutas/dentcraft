// Per-slug SEO metadata overrides for service pages.
// Used when the Sanity document has no explicit seo.metaTitle/metaDescription —
// lets us target local search intent (city + price) without touching the CMS.
// Prices must match src/data/treatments.ts (the official price list).

export type ServiceSeoOverride = {
  metaTitle: string
  metaDescription: string
}

const overrides: Record<string, Partial<Record<string, ServiceSeoOverride>>> = {
  'implanturi-dentare': {
    ro: {
      // Root layout title template appends "| DENTCRAFT Satu Mare" — don't add the brand here
      metaTitle: 'Implant Dentar Satu Mare — Prețuri de la 2.200 lei',
      metaDescription:
        'Implant dentar în Satu Mare: de la 2.200 lei (INO) până la 4.000 lei (Straumann). Chirurg specialist, plan de tratament cu preț final înainte, plată în rate.',
    },
  },
}

export function getServiceSeoOverride(slug: string, locale: string): ServiceSeoOverride | null {
  return overrides[slug]?.[locale] ?? null
}
