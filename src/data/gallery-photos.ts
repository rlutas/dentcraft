import type { GalleryPhoto } from '@/app/[locale]/galerie/GalleryPageClient'

// Gallery photos for the clinic/team section
// To add new photos:
// 1. Put them in /public/images/gallery/ folder
// 2. Add an entry here with src, alt text, and category
export const galleryPhotos: GalleryPhoto[] = [
  // Clinic interior photos
  {
    src: '/images/clinic/clinic-1.webp',
    alt: 'Recepție Clinica DENTCRAFT',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-2.webp',
    alt: 'Sala de tratament modernă',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-3.webp',
    alt: 'Cabinet stomatologic echipat',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-4.webp',
    alt: 'Interior clinica DENTCRAFT',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-5.webp',
    alt: 'Spațiu de așteptare confortabil',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-6.webp',
    alt: 'Echipament dentar de ultimă generație',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-7.webp',
    alt: 'Sala de consultație',
    category: 'clinic',
  },
  {
    src: '/images/clinic/clinic-8.webp',
    alt: 'Cabinet stomatologic DENTCRAFT',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-9.webp',
    alt: 'Zona de sterilizare',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-10.webp',
    alt: 'Cabinet de tratament cu unit dentar și microscop dentar',
    category: 'equipment',
  },
  {
    src: '/images/clinic/clinic-11.webp',
    alt: 'Hol clinica DENTCRAFT',
    category: 'clinic',
  },
  {
    src: '/images/clinic/toys-with-toothbrush.webp',
    alt: 'Zona copii - periuța de dinți',
    category: 'clinic',
  },
  // Add more photos from /public/images/gallery/ below:
  // {
  //   src: '/images/gallery/your-photo.jpg',
  //   alt: 'Descriere foto',
  //   category: 'clinic', // or 'team' or 'equipment'
  // },
]
