// Maps Romanian team-member role strings (from fallback data or Sanity) to
// translated labels. If the role is not recognized, the original string is
// returned unchanged.

const ROLE_KEY_MAP: Record<string, string> = {
  'medic stomatolog coordonator': 'coordinator',
  'medic stomatolog principal': 'principal',
  'medic stomatolog pediatru': 'pediatric',
  'medic stomatolog': 'dentist',
  'specialist parodontolog': 'periodontologist',
  'medic specialist parodontolog': 'periodontologist',
  'asistent medical coordonator': 'assistantCoordinator',
  'asistent medical': 'assistant',
  'recepționer': 'receptionist',
  'receptionist': 'receptionist',
}

export function translateTeamRole(
  role: string | undefined | null,
  t: (key: string) => string
): string {
  if (!role) return ''
  const key = ROLE_KEY_MAP[role.trim().toLowerCase()]
  if (!key) return role
  try {
    return t(`team.roles.${key}`)
  } catch {
    return role
  }
}
