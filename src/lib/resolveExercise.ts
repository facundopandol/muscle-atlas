import { muscleMap } from '../data/muscles'
import type { Equipment, Exercise, ExerciseVariant } from '../types'

export function findCatalogExercise(
  muscleId: string,
  exerciseName: string,
): Exercise | undefined {
  return muscleMap.get(muscleId)?.exercises.find((e) => e.name === exerciseName)
}

export function resolveExerciseVariant(
  muscleId: string,
  exerciseName: string,
  equipment: Equipment,
): ExerciseVariant | undefined {
  const exercise = findCatalogExercise(muscleId, exerciseName)
  if (!exercise) return undefined
  return (
    exercise.variants.find((v) => v.equipment === equipment) ?? exercise.variants[0]
  )
}
