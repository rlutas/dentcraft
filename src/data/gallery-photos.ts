import type { GalleryPhoto } from '@/app/[locale]/galerie/GalleryPageClient'

// Gallery photos for the clinic/team section
// To add new photos:
// 1. Put them in /public/images/gallery/ folder
// 2. Add an entry here with src, alt text, and category
export const galleryPhotos: GalleryPhoto[] = [
  // Clinic interior photos
  {
    src: '/images/clinic/clinic-1.jpg',
    alt: 'Receptie Clinica Dentcraft',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-2.jpg',
    alt: 'Sala de tratament moderna',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-3.jpg',
    alt: 'Cabinet stomatologic echipat',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-4.jpg',
    alt: 'Interior clinica Dentcraft',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-5.jpg',
    alt: 'Spatiu de asteptare confortabil',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-6.jpg',
    alt: 'Echipament dentar de ultima generatie',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-7.jpg',
    alt: 'Sala de consultatie',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-8.jpg',
    alt: 'Cabinet stomatologic Dentcraft',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-9.jpg',
    alt: 'Zona de sterilizare',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-10.jpg',
    alt: 'Sala de radiologie dentara',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-11.jpg',
    alt: 'Hol clinica Dentcraft',
    category: 'clinic',
  },
  {
    src: '/images/clinic/toys-with-toothbrush.jpg',
    alt: 'Zona copii - periuta de dinti',
    category: 'clinic',
  },
  // Team photos
  {
    src: '/images/team-clinic.jpg',
    alt: 'Echipa Dentcraft',
    category: 'team',
  },
  // Add more photos from /public/images/gallery/ below:
  // {
  //   src: '/images/gallery/your-photo.jpg',
  //   alt: 'Descriere foto',
  //   category: 'clinic', // or 'team' or 'equipment'
  // },
]
