/** Photo overlay badge content shown on the hero photo. Derived per-member
 *  so doctors, assistants and receptionists each get a relevant label.
 *
 *  Returns a pair of translation keys (relative to the `team.badges` namespace)
 *  rather than strings, so callers resolve them with the current locale. */
export function getMemberBadgeKeys(
  name: string,
  role: string,
): { titleKey: string; subtitleKey: string } {
  const isDoctor = name.trim().toLowerCase().startsWith('dr.')
  const r = role.toLowerCase()
  if (isDoctor) {
    if (r.includes('coordonator')) return { titleKey: 'doctorTitle', subtitleKey: 'doctorCoordinator' }
    if (r.includes('specialist')) return { titleKey: 'doctorTitle', subtitleKey: 'doctorSpecialist' }
    return { titleKey: 'doctorTitle', subtitleKey: 'doctorDefault' }
  }
  if (r.includes('recept')) return { titleKey: 'receptionTitle', subtitleKey: 'receptionSubtitle' }
  if (r.includes('coordonator')) return { titleKey: 'assistantTitle', subtitleKey: 'assistantCoordinator' }
  if (r.includes('asistent')) return { titleKey: 'assistantTitle', subtitleKey: 'assistantDefault' }
  return { titleKey: 'teamTitle', subtitleKey: 'teamSubtitle' }
}

/** Resolve a member badge using a `team.badges` translator function.
 *  Call sites that already have `getTranslations()` can pass `t` directly:
 *    const badgeT = await getTranslations('team.badges')
 *    const badge = getMemberBadge(name, role, badgeT) */
export function getMemberBadge(
  name: string,
  role: string,
  t: (key: string) => string,
): { title: string; subtitle: string } {
  const { titleKey, subtitleKey } = getMemberBadgeKeys(name, role)
  return { title: t(titleKey), subtitle: t(subtitleKey) }
}

/** Trim a bio down to the first 1–2 sentences for hero teasers.
 *  The full bio still lives on the data; this is just a presentation helper. */
export function shortBio(bio: string, maxSentences = 2): string {
  if (!bio) return ''
  // Match sentences ending in . ! ? followed by space or end-of-string
  const matches = bio.match(/[^.!?]+[.!?]+(\s|$)/g)
  if (!matches || matches.length === 0) return bio.trim()
  return matches.slice(0, maxSentences).join('').trim()
}

/** Split a full name into [bold, italic] halves for the team-member headline. */
export function splitName(name: string): { bold: string; italic: string } {
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 0) return { bold: name, italic: '' }
  if (parts.length === 1) return { bold: parts[0]!, italic: '' }
  const mid = Math.ceil(parts.length / 2)
  return {
    bold: parts.slice(0, mid).join(' '),
    italic: parts.slice(mid).join(' '),
  }
}

/** Doctor video state for the "Sfaturi video" section on /echipa/[slug].
 *  - 'video' → a published YouTube short
 *  - 'comingSoon' → keep the section visible with a placeholder
 *  - null → hide the section entirely */
export type DoctorVideoState =
  | { kind: 'video'; videoId: string; doctorName: string; doctorRole: string; posterSrc?: string }
  | { kind: 'comingSoon'; doctorName: string; doctorRole: string; posterSrc?: string }
  | null

export function getDoctorVideoForSlug(
  slug: string,
  doctorName: string,
  doctorRole: string,
): DoctorVideoState {
  const videos: Record<string, { videoId: string; posterSrc?: string }> = {
    'razvan-petric': {
      videoId: 'ZQnkXaijIXs',
      posterSrc: '/images/stomatolog-satu-mare.png',
    },
    'denisa-ghirasim': {
      videoId: 'KuxT2zKlrao',
      posterSrc: '/images/team/dr-ghirasim-denisa-stefania.webp',
    },
    'giovana-tincu': {
      videoId: '1YaS-sdkYog',
      posterSrc: '/images/team/dr-tincu-giovana.webp',
    },
  }
  const comingSoonSlugs: Record<string, { posterSrc?: string }> = {}
  const cfg = videos[slug]
  if (cfg) {
    return {
      kind: 'video',
      videoId: cfg.videoId,
      doctorName,
      doctorRole,
      ...(cfg.posterSrc ? { posterSrc: cfg.posterSrc } : {}),
    }
  }
  const soon = comingSoonSlugs[slug]
  if (soon) {
    return {
      kind: 'comingSoon',
      doctorName,
      doctorRole,
      ...(soon.posterSrc ? { posterSrc: soon.posterSrc } : {}),
    }
  }
  return null
}
