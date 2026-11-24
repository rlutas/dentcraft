/**
 * Service photos availability map.
 *
 * 3D illustrations (GPT Image 2.6 via Higgsfield, 24 Nov 2026), one per service,
 * same style: warm cream background, soft studio light. Add new slugs here.
 * Returns the public path to the photo, or null if no photo exists yet.
 */
const SERVICE_PHOTOS = new Set([
  'implanturi-dentare',
  'estetica-dentara',
  'ortodontie',
  'protetica',
  'stomatologie-generala',
  'pedodontie',
  'endodontie',
  'chirurgie-oro-maxilo-faciala',
  'urgente-dentare',
  'consultatie-stomatologica',
  'coroane-dentare',
  'fatete-dentare',
  'albire-dentara',
  'detartraj',
])

export function getServicePhotoPath(slug: string): string | null {
  return SERVICE_PHOTOS.has(slug) ? `/images/services/${slug}.webp` : null
}

export function hasServicePhoto(slug: string): boolean {
  return SERVICE_PHOTOS.has(slug)
}
