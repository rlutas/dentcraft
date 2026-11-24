// Per-slug SEO metadata overrides for service pages.
// Used when the Sanity document has no explicit seo.metaTitle/metaDescription —
// lets us target local search intent (city + price) without touching the CMS.
// Keep wording in sync with the page content; no prices (see /preturi).

export type ServiceSeoOverride = {
  metaTitle: string
  metaDescription: string
}

const overrides: Record<string, Partial<Record<string, ServiceSeoOverride>>> = {
  // Root layout title template appends "| DENTCRAFT Satu Mare" — don't add the brand to titles.
  // No price figures here: prices live only on /preturi (pending confirmation, Nov 2026).
  'implanturi-dentare': {
    ro: {
      metaTitle: 'Implant Dentar Satu Mare | Prețuri, Etape',
      metaDescription:
        'Implant dentar în Satu Mare la DENTCRAFT: chirurg specialist, planificare digitală și plan de tratament cu prețul final înainte de începere. Plată în rate.',
    },
  },
  'pedodontie': {
    ro: {
      metaTitle: 'Dentist pentru Copii Satu Mare',
      metaDescription:
        'Stomatolog pentru copii în Satu Mare: consult blând, sigilări, fluorizare și tratamente pe dinți de lapte. Dr. Ghirasim Denisa. Programări: 0741 199 977.',
    },
  },
  'ortodontie': {
    ro: {
      metaTitle: 'Ortodont Satu Mare | Aparat Dentar',
      metaDescription:
        'Aparat dentar în Satu Mare pentru copii și adulți: aparate fixe metalice sau ceramice și alignere transparente. Dr. Cozma Ștefana, ortodonție la DENTCRAFT.',
    },
  },
  'urgente-dentare': {
    ro: {
      metaTitle: 'Urgențe Stomatologice Satu Mare',
      metaDescription:
        'Durere de dinte, abces sau dinte spart? Sună la 0741 199 977 pentru o programare cu prioritate. DENTCRAFT Satu Mare, luni–vineri 10:00–18:00.',
    },
  },
  'detartraj': {
    ro: {
      metaTitle: 'Detartraj și Igienizare Satu Mare',
      metaDescription:
        'Detartraj și igienizare profesională în Satu Mare prin Guided Biofilm Therapy (AIRFLOW, PIEZON). Dr. Fernea Remus, certificat Swiss Dental Academy.',
    },
  },
  'stomatologie-generala': {
    ro: {
      metaTitle: 'Stomatologie Generală Satu Mare',
      metaDescription:
        'Consultații, tratamente de carii, obturații estetice și tratamente de canal în Satu Mare. DENTCRAFT, pentru toată familia. Programări: 0741 199 977.',
    },
  },
  'estetica-dentara': {
    ro: {
      metaTitle: 'Estetică Dentară Satu Mare',
      metaDescription:
        'Fațete dentare, albire profesională și reconstituiri estetice în Satu Mare. Planul îl stabilești împreună cu medicul, cu prețul final înainte. DENTCRAFT.',
    },
  },
  'protetica': {
    ro: {
      metaTitle: 'Coroane și Proteze Dentare Satu Mare',
      metaDescription:
        'Coroane, punți și proteze dentare în Satu Mare: refacem dinții lipsă sau distruși, cu amprentă digitală prin scanner intraoral. DENTCRAFT Satu Mare.',
    },
  },
  'albire-dentara': {
    ro: {
      metaTitle: 'Albire Dentară Satu Mare',
      metaDescription:
        'Albire dentară profesională în cabinet la DENTCRAFT Satu Mare: evaluare înainte, protejarea gingiilor și sfaturi ca rezultatul să dureze. Tel. 0741 199 977.',
    },
  },
  'chirurgie-oro-maxilo-faciala': {
    ro: {
      metaTitle: 'Extracții Dentare Satu Mare',
      metaDescription:
        'Extracții dentare, inclusiv măsele de minte, și chirurgie dento-alveolară în Satu Mare. Dr. Buterchi Codruț, medic specialist. Programări: 0741 199 977.',
    },
  },
  'consultatie-stomatologica': {
    ro: {
      metaTitle: 'Consultație Stomatologică Satu Mare',
      metaDescription:
        'Consultație stomatologică completă în Satu Mare: examinare clinică, discuție despre opțiuni și plan de tratament cu prețul final, înainte de orice intervenție.',
    },
  },
  'coroane-dentare': {
    ro: {
      metaTitle: 'Coroane Dentare Satu Mare',
      metaDescription:
        'Coroane dentare în Satu Mare: zirconiu, ceramică sau metalo-ceramică, cu amprentă digitală prin scanner intraoral. Prețul final îl afli la consultație.',
    },
  },
  'endodontie': {
    ro: {
      metaTitle: 'Tratament de Canal Satu Mare',
      metaDescription:
        'Tratament de canal (endodonție) în Satu Mare: salvăm dintele infectat sau dureros, cu anestezie și control atent. DENTCRAFT Satu Mare, 0741 199 977.',
    },
  },
  'fatete-dentare': {
    ro: {
      metaTitle: 'Fațete Dentare Satu Mare',
      metaDescription:
        'Fațete dentare ceramice sau din compozit în Satu Mare: formă și culoare alese împreună cu medicul, cu prețul final înainte de tratament. DENTCRAFT.',
    },
  },
}

export function getServiceSeoOverride(slug: string, locale: string): ServiceSeoOverride | null {
  return overrides[slug]?.[locale] ?? null
}
