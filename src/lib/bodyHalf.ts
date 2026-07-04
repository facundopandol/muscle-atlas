import type { MuscleMapRegion } from '@musclemap/core'
import type { BodyHalfFilter } from '../types'

/** Clasificación tren superior / inferior para filtros y rutinas. */
const MUSCLE_BODY_HALF: Record<string, 'upper' | 'lower'> = {
  'upper-chest': 'upper',
  'lower-chest': 'upper',
  'front-deltoid': 'upper',
  'rear-deltoid': 'upper',
  biceps: 'upper',
  triceps: 'upper',
  forearms: 'upper',
  trapezius: 'upper',
  lats: 'upper',
  abs: 'upper',
  obliques: 'upper',
  quadriceps: 'lower',
  hamstrings: 'lower',
  glutes: 'lower',
  calves: 'lower',
}

export function getMuscleBodyHalf(muscleId: string): 'upper' | 'lower' {
  return MUSCLE_BODY_HALF[muscleId] ?? 'upper'
}

export function muscleMatchesBodyHalf(muscleId: string, filter: BodyHalfFilter): boolean {
  if (filter === 'all') return true
  return getMuscleBodyHalf(muscleId) === filter
}

export function bodyHalfToMmRegion(filter: BodyHalfFilter): MuscleMapRegion {
  if (filter === 'upper') return 'UPPER_BODY'
  if (filter === 'lower') return 'LOWER_BODY'
  return 'FULL_BODY'
}

export const BODY_HALF_LABELS: Record<BodyHalfFilter, string> = {
  all: 'Cuerpo completo',
  upper: 'Tren superior',
  lower: 'Tren inferior',
}
