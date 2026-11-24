/** Per-service dental icons (files in /public/icons, tinted via CSS mask). Used by the hero orbit and the Pe scurt card. */
// Custom dental icons from /public/icons (tinted tan via CSS mask), three per service
export const ORBIT_ICONS: Record<string, [string, string, string]> = {
  'implanturi-dentare': ['024-dental-implant', '057-implants', '110-tooth'],
  ortodontie: ['038-braces', '010-smile', '110-tooth'],
  'albire-dentara': ['008-white-teeth', '010-smile', '011-toothpaste'],
  detartraj: ['007-tooth-cleaning', '014-toothbrush', '080-floss'],
  pedodontie: ['035-baby', '010-smile', '014-toothbrush'],
  'urgente-dentare': ['003-toothache', '097-calendar', '035-support'],
  'chirurgie-oro-maxilo-faciala': ['110-tooth', '036-anesthesia', '089-dentist-chair'],
  endodontie: ['092-broken-tooth-1', '110-tooth', '036-anesthesia'],
  'coroane-dentare': ['091-crown', '110-tooth', '010-smile'],
  protetica: ['091-crown', '015-denture', '057-implants'],
  'fatete-dentare': ['008-white-teeth', '010-smile', '091-crown'],
  'consultatie-stomatologica': ['082-clipboard', '089-dentist-chair', '110-tooth'],
  'estetica-dentara': ['010-smile', '008-white-teeth', '073-heart'],
  'stomatologie-generala': ['110-tooth', '014-toothbrush', '089-dentist-chair'],
}
export const DEFAULT_ORBIT_ICONS: [string, string, string] = ['110-tooth', '010-smile', '014-toothbrush']

export function getServiceIcons(slug: string): [string, string, string] {
  return ORBIT_ICONS[slug] ?? DEFAULT_ORBIT_ICONS
}
