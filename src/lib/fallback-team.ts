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
  gallery?: Array<{
    src: string
    alt: string
    position?: 'top' | 'center' | 'bottom'
  }>
  stats?: {
    yearsExperience?: number
    patientsCount?: number
  }
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
    bio: 'Dr. Razvan Petric este medicul stomatolog principal al clinicii DentCraft, cu peste 10 ani de experiență în domeniul stomatologiei moderne. Specializat în implantologie și estetică dentară, Dr. Petric aduce o abordare personalizată fiecărui pacient, combinând tehnologiile de ultimă generație cu tehnici chirurgicale precise. Pasiunea sa pentru excelență și dedicarea față de pacienți fac din el un profesionist de încredere pentru tratamente complexe.',
    education: [
      { institution: 'Universitatea de Medicină și Farmacie "Carol Davila" București', degree: 'Doctor în Medicină Dentară', year: 2008 },
      { institution: 'Universitatea de Medicină și Farmacie Cluj-Napoca', degree: 'Specializare Implantologie', year: 2012 },
    ],
    certifications: [
      { name: 'Certificat Implantologie Avansată', issuer: 'Nobel Biocare Academy', year: 2015 },
      { name: 'Certificat Estetică Dentară', issuer: 'ESCD European Society', year: 2018 },
    ],
    gallery: [
      { src: '/images/gallery/razvan-petric/petric-razvan-implantologie-1.webp', alt: 'Dr. Petric Razvan-Tudor - medic stomatolog principal DentCraft Satu Mare specializat in implantologie' },
      { src: '/images/gallery/razvan-petric/petric-razvan-estetica-dentara-1.webp', alt: 'Dr. Petric Razvan in cabinetul DentCraft Satu Mare - proceduri de estetica dentara' },
      { src: '/images/gallery/razvan-petric/petric-razvan-protetica-dentara-1.webp', alt: 'Dr. Petric Razvan-Tudor - tratamente de protetica dentara la clinica DentCraft Satu Mare' },
      { src: '/images/gallery/razvan-petric/petric-razvan-implantologie-2.webp', alt: 'Dr. Petric Razvan - interventie de implantologie dentara la clinica DentCraft' },
      { src: '/images/gallery/razvan-petric/petric-razvan-estetica-dentara-2.webp', alt: 'Dr. Petric Razvan-Tudor - tratamente de estetica dentara si fatete la DentCraft Satu Mare' },
      { src: '/images/gallery/razvan-petric/petric-razvan-protetica-dentara-2.webp', alt: 'Dr. Petric Razvan in cabinetul DentCraft - lucrari de protetica dentara si coroane' },
    ],
    stats: {
      yearsExperience: 15,
      patientsCount: 4800,
    },
  },
  {
    key: 'doctor2',
    name: 'Dr. Ghirasim Denisa-Stefania',
    slug: 'denisa-ghirasim',
    role: 'Medic Stomatolog',
    photo: '/images/team/dr-ghirasim-denisa-stefania.webp',
    specializations: ['Stomatologie Pediatrica', 'Stomatologie Generala', 'Endodontie'],
    bio: 'Dr. Ghirasim Denisa-Stefania este medic stomatolog la clinica DentCraft, cu o pasiune deosebita pentru lucrul cu copiii. Empatica, rabdatoare si dedicata, isi propune sa transforme vizita la cabinet intr-o experienta pozitiva si lipsita de teama pentru cei mici. Cu o abordare calma, blandete si o comunicare adaptata varstei, asigura un mediu de incredere atat pentru pacienti, cat si pentru parinti. Ofera tratamente de inalta calitate si diagnosticare precisa, sustinute de experienta clinica, de finalizarea rezidentiatului in Stomatologie Generala si a programului de formare psihopedagogica.',
    education: [
      { institution: 'Universitatea din Oradea, Facultatea de Medicina si Farmacie', degree: 'Diploma de Licenta si Master – Doctor Medic Stomatolog (Medicina Dentara)', year: 2020 },
      { institution: 'Universitatea din Oradea', degree: 'Program de Formare Psihopedagogica (Modul 1 si Modul 2)', year: 2018 },
    ],
    certifications: [
      { name: 'Rezidentiat Stomatologie Generala', issuer: 'Ministerul Sanatatii', year: 2025 },
      { name: 'Certificat Formare Psihopedagogica (Modul 1 si Modul 2)', issuer: 'Universitatea din Oradea', year: 2018 },
    ],
    gallery: [
      { src: '/images/gallery/ghirasim-denisa/ghirasim-denisa-stomatologie-pediatrica-1.webp', alt: 'Dr. Ghirasim Denisa-Stefania - medic stomatolog specializata in stomatologie pediatrica la DentCraft Satu Mare', position: 'top' },
      { src: '/images/gallery/ghirasim-denisa/ghirasim-denisa-stomatologie-pediatrica-2.webp', alt: 'Dr. Ghirasim Denisa-Stefania in cabinetul DentCraft - tratamente stomatologice pentru copii' },
    ],
    stats: {
      yearsExperience: 5,
      patientsCount: 1350,
    },
  },
  {
    key: 'doctor3',
    name: 'Dr. Tincu Giovana-Nicoleta',
    slug: 'giovana-tincu',
    role: 'Medic Stomatolog, Specialist Parodontolog',
    photo: '/images/team/dr-tincu-giovana.webp',
    specializations: ['Parodontologie', 'Stomatologie Pediatrica', 'Estetica Dentara'],
    bio: 'Dr. Tincu Giovana-Nicoleta este medic stomatolog specialist parodontolog la clinica DentCraft, cu experienta dobandita in cadrul clinicilor Antalka Comfort Dent (Sfantu Gheorghe) si A Dental Clinic (Botosani). Motivata si dedicata, Dr. Tincu este pasionata de perfectionare continua si de oferirea celor mai bune solutii pentru sanatatea parodontala si estetica zambetului. Abordarea ei este centrata pe pacient, combinand empatia si comunicarea clara cu expertiza clinica si utilizarea tehnologiilor moderne. Vorbeste romana, maghiara, engleza si spaniola.',
    education: [
      { institution: 'Ministerul Sanatatii, Iasi', degree: 'Medic Specialist Parodontolog', year: 2017 },
      { institution: 'Universitatea de Medicina si Farmacie "Iuliu Hatieganu" Cluj-Napoca', degree: 'Licentiat in Medicina Dentara (media 9.69)', year: 2013 },
    ],
    certifications: [
      { name: 'Congresul International de Medicina Dentara DENTIS', issuer: 'UMF "Iuliu Hatieganu" Cluj-Napoca', year: 2025 },
      { name: 'Workshop PRF in Practica Stomatologica', issuer: 'Colegiul Medicilor Stomatologi Romania', year: 2025 },
      { name: 'Tehnici de Sutura Parodontala in Cabinetul de Medicina Dentara', issuer: 'UMF "Iuliu Hatieganu" Cluj-Napoca', year: 2016 },
      { name: 'Rezidentiat Parodontologie', issuer: 'Spitalul Clinic de Urgenta "Sfantul Spiridon" Iasi', year: 2017 },
    ],
    gallery: [
      { src: '/images/gallery/giovana-tincu/tincu-giovana-parodontologie-1.webp', alt: 'Dr. Tincu Giovana-Nicoleta - medic specialist parodontolog la DentCraft Satu Mare' },
      { src: '/images/gallery/giovana-tincu/tincu-giovana-parodontologie-2.webp', alt: 'Dr. Tincu Giovana-Nicoleta in cabinetul DentCraft - consultatie parodontologie' },
    ],
    stats: {
      yearsExperience: 12,
      patientsCount: 3200,
    },
  },
  {
    key: 'assistant1',
    name: 'Gherman Camelia',
    slug: 'camelia-gherman',
    role: 'Asistent Medical',
    photo: '/images/team/asistent-gherman-camelia.webp',
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
    role: 'Receptionist',
    photo: '/images/team/asistent-daraban-carla.webp',
    specializations: ['Relatii Pacienti', 'Programari si Coordonare', 'Managementul Receptiei'],
    bio: 'Karla Daraban este receptionista clinicii DentCraft si prima persoana care intampina pacientii. Cu o atitudine prietenoasa si profesionista, Karla se ocupa de programari, coordonarea fluxului de pacienti si asigurarea unei experiente placute inca de la primul contact cu clinica. Atentia la detalii si comunicarea clara fac din ea un membru esential al echipei.',
    education: [],
    certifications: [],
  },
  {
    key: 'assistant3',
    name: 'Danci Ionela Mikaela',
    slug: 'ionela-danci',
    role: 'Asistent Medical',
    photo: '/images/team/asistent-danci-ionela-mikaela.webp',
    specializations: ['Asistenta Stomatologica', 'Radiologie Dentara', 'Relatii Pacienti'],
    bio: 'Ionela Mikaela Danci este asistent medical la clinica DentCraft, cu experienta in asistenta stomatologica si radiologie dentara. Cu o abordare prietenoasa si profesionista, Ionela contribuie la experienta pozitiva a fiecarui pacient.',
    education: [
      { institution: 'Scoala Postliceala Sanitara', degree: 'Asistent Medical Generalist', year: 2021 },
    ],
    certifications: [
      { name: 'Certificat Radiologie Dentara', issuer: 'Colegiul Medicilor Stomatologi', year: 2022 },
    ],
  },
  {
    key: 'assistant4',
    name: 'Calugher Ionela',
    slug: 'ionela-calugher',
    role: 'Asistent Medical',
    photo: '/images/team/asistent-calugher-ionela.webp',
    specializations: ['Asistenta Stomatologica', 'Igiena Orala', 'Relatii Pacienti'],
    bio: 'Ionela Calugher este asistent medical la clinica DentCraft, dedicata ingrijirii pacientilor cu profesionalism si empatie. Cu o atitudine prietenoasa si atenta la detalii, Ionela asigura o experienta placuta pentru fiecare pacient.',
    education: [
      { institution: 'Scoala Postliceala Sanitara', degree: 'Asistent Medical Generalist', year: 2022 },
    ],
    certifications: [
      { name: 'Certificat Asistenta Stomatologica', issuer: 'Colegiul Medicilor Stomatologi', year: 2023 },
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
