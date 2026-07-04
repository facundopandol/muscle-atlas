import type { Equipment } from '../types'

export function exerciseKey(muscleId: string, exerciseName: string, equipment: Equipment): string {
  return `${muscleId}::${exerciseName}::${equipment}`
}

export function parseExerciseKey(key: string): {
  muscleId: string
  exerciseName: string
  equipment: Equipment
} | null {
  const parts = key.split('::')
  if (parts.length !== 3) return null
  return {
    muscleId: parts[0],
    exerciseName: parts[1],
    equipment: parts[2] as Equipment,
  }
}
