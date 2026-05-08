/**
 * Service photos availability map.
 *
 * As 3D medical illustrations are generated for services, add their slug here.
 * Returns the public path to the photo, or null if no photo exists yet.
 */
const SERVICE_PHOTOS = new Set([
  'implantologie',
  'estetica-dentara',
  'ortodontie',
  'protetica',
  'stomatologie-generala',
  'pedodontie',
  'endodontie',
  'chirurgie-oro-maxilo-faciala',
  'urgente-dentare',
])

export function getServicePhotoPath(slug: string): string | null {
  return SERVICE_PHOTOS.has(slug) ? `/images/services/${slug}.webp` : null
}

export function hasServicePhoto(slug: string): boolean {
  return SERVICE_PHOTOS.has(slug)
}
