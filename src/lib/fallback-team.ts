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
    role: 'Medic Stomatolog Coordonator',
    photo: 'https://drpetric.ro/wp-content/uploads/2024/11/stomatolog-satu-mare.png',
    specializations: ['Implantologie', 'Estetica Dentara', 'Protetică Dentară'],
    bio: 'Dr. Razvan Petric este medicul stomatolog coordonator al clinicii DentCraft, cu peste 10 ani de experiență în domeniul stomatologiei moderne. A absolvit Facultatea de Medicină Dentară „Iuliu Hațieganu" din Cluj-Napoca în 2016 și și-a continuat formarea prin cursuri internaționale de protetică, implantologie și estetică dentară — Mauro Fradeani Education (Modulele I, II și III), Mastering Tooth Preparation cu Dr. Maxim Belograd (Kiev, 2019) și Competență în Implantologie Orală la Școala Națională de Sănătate Publică (București, 2020). Specializat în implantologie și estetică dentară, Dr. Petric aduce o abordare personalizată fiecărui pacient, combinând tehnologiile de ultimă generație cu tehnici chirurgicale precise.',
    education: [
      { institution: 'Universitatea de Medicină și Farmacie „Iuliu Hațieganu" Cluj-Napoca', degree: 'Doctor în Medicină Dentară', year: 2016 },
    ],
    certifications: [
      { name: 'Mauro Fradeani Education – Modul I: A Comprehensive Treatment Plan for Extensive Rehabilitations', issuer: 'Mauro Fradeani Education', year: 2017 },
      { name: 'Mauro Fradeani Education – Modul II: Esthetic, Functional and Biologic Integration of the Prosthetic Rehabilitation on Natural Dentition and Implants', issuer: 'Mauro Fradeani Education', year: 2018 },
      { name: 'Mauro Fradeani Education – Modul III: Ceramic Material Selection from Single Restoration to Full-Mouth Rehabilitation', issuer: 'Mauro Fradeani Education', year: 2019 },
      { name: 'Mastering Tooth Preparation', issuer: 'Dr. Maxim Belograd – Kiev, Ucraina', year: 2019 },
      { name: 'Competență în Implantologie Orală', issuer: 'Școala Națională de Sănătate Publică – Prof. Dr. Ioan Sîrbu, București', year: 2020 },
      { name: 'Focus – Curs de Fotografie Dentară', issuer: 'Dr. Andrei Dicu & Dr. Dan Lazăr – Oradea', year: 2020 },
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
      yearsExperience: 10,
      patientsCount: 1500,
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
    role: 'Specialist Parodontolog',
    photo: '/images/team/dr-tincu-giovana.webp',
    specializations: ['Parodontologie', 'Stomatologie Pediatrica', 'Estetica Dentara'],
    bio: 'Dr. Tincu Giovana-Nicoleta este medic stomatolog specialist parodontolog la clinica DentCraft, cu experienta dobandita in cadrul clinicilor Antalka Comfort Dent (Sfantu Gheorghe) si A Dental Clinic (Botosani). Motivata si dedicata, Dr. Tincu este pasionata de perfectionare continua si de oferirea celor mai bune solutii pentru sanatatea parodontala si estetica zambetului. Abordarea ei este centrata pe pacient, combinand empatia si comunicarea clara cu expertiza clinica si utilizarea tehnologiilor moderne. Vorbeste romana, maghiara, engleza si spaniola.',
    education: [
      { institution: 'Ministerul Sanatatii, Iasi', degree: 'Medic Specialist Parodontolog', year: 2017 },
      { institution: 'Universitatea de Medicina si Farmacie "Iuliu Hatieganu" Cluj-Napoca', degree: 'Licentiat in Medicina Dentara', year: 2013 },
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
    role: 'Asistent Medical Coordonator',
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
]

// Get fallback team member by slug
export function getFallbackTeamMemberBySlug(slug: string): FallbackTeamMember | undefined {
  return fallbackTeamMembers.find((member) => member.slug === slug)
}

// Get all fallback team member slugs
export function getFallbackTeamMemberSlugs(): string[] {
  return fallbackTeamMembers.map((member) => member.slug)
}
