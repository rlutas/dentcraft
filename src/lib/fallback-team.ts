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
    name: 'Dr. Petric Razvan-Tudor',
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
    name: 'Dr. Ghirasim Denisa Stefania',
    slug: 'denisa-ghirasim',
    role: 'Medic Stomatolog',
    photo: '/images/team/dr-ghirasim-denisa-stefania.png',
    specializations: ['Stomatologie Generala', 'Estetica Dentara', 'Endodontie'],
    bio: 'Dr. Ghirasim Denisa Stefania este medic stomatolog la clinica DentCraft, dedicata tratamentelor de calitate si confortului pacientilor. Cu o abordare atenta si profesionista, Dr. Ghirasim ofera servicii complete de stomatologie generala si estetica dentara.',
    education: [
      { institution: 'Universitatea de Medicina si Farmacie Cluj-Napoca', degree: 'Doctor in Medicina Dentara', year: 2020 },
    ],
    certifications: [
      { name: 'Certificat Stomatologie Estetica', issuer: 'Colegiul Medicilor Stomatologi', year: 2022 },
    ],
  },
  {
    key: 'doctor3',
    name: 'Dr. Tincu Giovana',
    slug: 'giovana-tincu',
    role: 'Medic Stomatolog',
    photo: '/images/team/dr-tincu-giovana.png',
    specializations: ['Stomatologie Generala', 'Ortodontie', 'Pedodontie'],
    bio: 'Dr. Tincu Giovana este medic stomatolog la clinica DentCraft, specializata in tratamente pentru pacienti de toate varstele. Cu o personalitate calda si rabdatoare, Dr. Tincu creeaza o atmosfera relaxanta pentru fiecare pacient.',
    education: [
      { institution: 'Universitatea de Medicina si Farmacie Oradea', degree: 'Doctor in Medicina Dentara', year: 2021 },
    ],
    certifications: [
      { name: 'Certificat Pedodontie', issuer: 'Colegiul Medicilor Stomatologi', year: 2023 },
    ],
  },
  {
    key: 'assistant1',
    name: 'Gherman Camelia',
    slug: 'camelia-gherman',
    role: 'Asistent Medical',
    photo: '/images/team/asistent-gherman-camelia.png',
    specializations: ['Asistenta Stomatologica', 'Igiena Orala', 'Relatii Pacienti'],
    bio: 'Camelia Gherman este asistent medical la clinica DentCraft, cu experienta in asistenta stomatologica profesionala. Cu o atitudine calda si atenta, Camelia asigura confortul pacientilor pe parcursul tratamentelor.',
    education: [
      { institution: 'Scoala Postliceala Sanitara', degree: 'Asistent Medical Generalist', year: 2019 },
    ],
    certifications: [
      { name: 'Certificat Asistenta Stomatologica', issuer: 'Colegiul Medicilor Stomatologi', year: 2020 },
    ],
  },
  {
    key: 'assistant2',
    name: 'Daraban Karla',
    slug: 'karla-daraban',
    role: 'Asistent Medical',
    photo: '/images/team/asistent-daraban-carla.png',
    specializations: ['Asistenta Stomatologica', 'Sterilizare', 'Managementul Cabinetului'],
    bio: 'Karla Daraban este asistent medical la clinica DentCraft, dedicata asigurarii unui mediu curat si sigur pentru pacienti. Profesionalismul si atentia la detalii fac din Karla un membru esential al echipei noastre.',
    education: [
      { institution: 'Scoala Postliceala Sanitara', degree: 'Asistent Medical Generalist', year: 2020 },
    ],
    certifications: [
      { name: 'Certificat Igiena si Sterilizare', issuer: 'Colegiul Medicilor Stomatologi', year: 2021 },
    ],
  },
  {
    key: 'assistant3',
    name: 'Danci Ionela Mikaela',
    slug: 'ionela-danci',
    role: 'Asistent Medical',
    photo: '/images/team/asistent-danci-ionela-mikaela.png',
    specializations: ['Asistenta Stomatologica', 'Radiologie Dentara', 'Relatii Pacienti'],
    bio: 'Ionela Mikaela Danci este asistent medical la clinica DentCraft, cu experienta in asistenta stomatologica si radiologie dentara. Cu o abordare prietenoasa si profesionista, Ionela contribuie la experienta pozitiva a fiecarui pacient.',
    education: [
      { institution: 'Scoala Postliceala Sanitara', degree: 'Asistent Medical Generalist', year: 2021 },
    ],
    certifications: [
      { name: 'Certificat Radiologie Dentara', issuer: 'Colegiul Medicilor Stomatologi', year: 2022 },
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
