// Fallback team member type for placeholder data
export type FallbackTeamMember = {
  key: string
  name: string
  slug: string
  role: string
  photo?: string // URL to team member photo
  specializations: string[]
  bio: string
  education: Array<{
    institution: string
    degree: string
    year: number
  }>
  certifications: Array<{
    name: string
    issuer: string
    year: number
  }>
}

// Fallback team members data - used when Sanity has no data
export const fallbackTeamMembers: FallbackTeamMember[] = [
  {
    key: 'doctor1',
    name: 'Dr. Razvan Petric',
    slug: 'razvan-petric',
    role: 'Medic Stomatolog Principal',
    photo: 'https://drpetric.ro/wp-content/uploads/2024/11/stomatolog-satu-mare.png',
    specializations: ['Implantologie', 'Estetica Dentara', 'Protetică Dentară'],
    bio: 'Dr. Razvan Petric este medicul stomatolog principal al clinicii DentCraft, cu peste 15 ani de experiență în domeniul stomatologiei moderne. Specializat în implantologie și estetică dentară, Dr. Petric aduce o abordare personalizată fiecărui pacient, combinând tehnologiile de ultimă generație cu tehnici chirurgicale precise. Pasiunea sa pentru excelență și dedicarea față de pacienți fac din el un profesionist de încredere pentru tratamente complexe.',
    education: [
      { institution: 'Universitatea de Medicină și Farmacie "Carol Davila" București', degree: 'Doctor în Medicină Dentară', year: 2008 },
      { institution: 'Universitatea de Medicină și Farmacie Cluj-Napoca', degree: 'Specializare Implantologie', year: 2012 },
    ],
    certifications: [
      { name: 'Certificat Implantologie Avansată', issuer: 'Nobel Biocare Academy', year: 2015 },
      { name: 'Certificat Estetică Dentară', issuer: 'ESCD European Society', year: 2018 },
    ],
  },
  {
    key: 'doctor2',
    name: 'Dr. Maria Ionescu',
    slug: 'maria-ionescu',
    role: 'Ortodont',
    specializations: ['Ortodonție', 'Aparate Invizibile', 'Ortodonție Pediatrică'],
    bio: 'Dr. Maria Ionescu este specialist în ortodonție cu o experiență de peste 10 ani în corectarea problemelor de aliniere dentară. Expertă în tratamente cu aparate invizibile și ortodonție modernă, Dr. Ionescu oferă soluții personalizate pentru pacienți de toate vârstele. Abordarea sa caldă și atenția la detalii asigură rezultate estetice remarcabile și zâmbete perfecte.',
    education: [
      { institution: 'Universitatea de Medicină și Farmacie "Iuliu Hațieganu" Cluj-Napoca', degree: 'Doctor în Medicină Dentară', year: 2012 },
      { institution: 'Universitatea de Medicină și Farmacie București', degree: 'Specializare Ortodonție', year: 2015 },
    ],
    certifications: [
      { name: 'Certificat Invisalign Provider', issuer: 'Align Technology', year: 2017 },
      { name: 'Certificat Ortodonție Digitală', issuer: 'European Orthodontic Society', year: 2020 },
    ],
  },
  {
    key: 'doctor3',
    name: 'Dr. Alexandru Pop',
    slug: 'alexandru-pop',
    role: 'Implantolog',
    specializations: ['Implantologie', 'Chirurgie Orală', 'Regenerare Osoasă'],
    bio: 'Dr. Alexandru Pop este specialist în implantologie și chirurgie orală, cu o experiență vastă în proceduri complexe de restaurare dentară. Cu peste 8 ani de practică, Dr. Pop a realizat sute de intervenții de implant cu succes. Expertiza sa în regenerare osoasă și tehnici chirurgicale avansate îl recomandă pentru cazurile cele mai dificile.',
    education: [
      { institution: 'Universitatea de Medicină și Farmacie "Victor Babeș" Timișoara', degree: 'Doctor în Medicină Dentară', year: 2014 },
      { institution: 'Universitatea de Medicină și Farmacie București', degree: 'Specializare Chirurgie Orală', year: 2017 },
    ],
    certifications: [
      { name: 'Certificat Chirurgie Implantară', issuer: 'ITI International Team for Implantology', year: 2019 },
      { name: 'Certificat Regenerare Osoasă', issuer: 'Geistlich Academy', year: 2021 },
    ],
  },
  {
    key: 'assistant1',
    name: 'Ana Muresan',
    slug: 'ana-muresan',
    role: 'Asistent Medical',
    specializations: ['Asistență Stomatologică', 'Igienă Orală', 'Relații Pacienți'],
    bio: 'Ana Muresan este asistent medical cu o experiență de peste 7 ani în domeniul stomatologic. Cu o atitudine caldă și profesionistă, Ana asigură confortul pacienților pe parcursul tratamentelor și oferă îndrumare expertă în igienă orală. Dedicarea sa față de excelență și atenția la detalii contribuie la experiența pozitivă a fiecărui pacient în clinica noastră.',
    education: [
      { institution: 'Școala Postliceală Sanitară Cluj-Napoca', degree: 'Asistent Medical Generalist', year: 2015 },
      { institution: 'Colegiul Medicilor Stomatologi', degree: 'Curs Specializare Asistență Stomatologică', year: 2017 },
    ],
    certifications: [
      { name: 'Certificat Igienă și Profilaxie Dentară', issuer: 'Colegiul Medicilor Stomatologi', year: 2018 },
      { name: 'Certificat Managementul Relațiilor cu Pacienții', issuer: 'Asociația Stomatologică Română', year: 2020 },
    ],
  },
]

// Get fallback team member by slug
export function getFallbackTeamMemberBySlug(slug: string): FallbackTeamMember | undefined {
  return fallbackTeamMembers.find((member) => member.slug === slug)
}

// Get all fallback team member slugs
export function getFallbackTeamMemberSlugs(): string[] {
  return fallbackTeamMembers.map((member) => member.slug)
}
