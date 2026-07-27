import type { BodyHalfFilter } from '../types'
import { MUSCLE_PICKER_GROUPS } from './muscleGroups'

export type ExploreHalf = 'upper' | 'lower'

export interface ExploreGroup {
  id: string
  label: string
  description: string
  half: ExploreHalf
  muscleIds: string[]
}

/** Jerarquía Explorar: tren → grupo → músculo → (opcional) cabezas → ejercicios. */
export const EXPLORE_HALVES: Array<{
  id: ExploreHalf
  label: string
  description: string
}> = [
  {
    id: 'upper',
    label: 'Tren superior',
    description: 'Pecho, hombros, espalda, brazos y core',
  },
  {
    id: 'lower',
    label: 'Tren inferior',
    description: 'Piernas, glúteos y pantorrillas',
  },
]

const GROUP_META: Record<string, { description: string; half: ExploreHalf }> = {
  chest: { description: 'Tres porciones: superior, esternal e inferior', half: 'upper' },
  shoulders: { description: 'Tres cabezas: anterior, lateral y posterior', half: 'upper' },
  arms: { description: 'Bíceps, tríceps y antebrazos', half: 'upper' },
  back: { description: 'Dorsales y trapecio', half: 'upper' },
  core: { description: 'Recto abdominal y oblicuos', half: 'upper' },
  legs: { description: 'Cuádriceps e isquiotibiales', half: 'lower' },
  glutes: { description: 'Extensión de cadera y estabilidad', half: 'lower' },
  calves: { description: 'Elevación de talón · gemelos y sóleo', half: 'lower' },
}

export const EXPLORE_GROUPS: ExploreGroup[] = MUSCLE_PICKER_GROUPS.map((g) => ({
  id: g.id,
  label: g.label,
  muscleIds: g.muscleIds,
  description: GROUP_META[g.id]?.description ?? '',
  half: GROUP_META[g.id]?.half ?? 'upper',
}))

export function groupsForHalf(half: ExploreHalf): ExploreGroup[] {
  return EXPLORE_GROUPS.filter((g) => g.half === half)
}

export function getExploreGroup(groupId: string): ExploreGroup | undefined {
  return EXPLORE_GROUPS.find((g) => g.id === groupId)
}

export function halfFromBodyFilter(filter: BodyHalfFilter): ExploreHalf | null {
  if (filter === 'upper' || filter === 'lower') return filter
  return null
}
