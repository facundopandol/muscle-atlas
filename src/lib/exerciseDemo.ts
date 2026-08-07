import { muscleMap } from '../data/muscles'
import type { Equipment, Exercise, ExerciseVariant } from '../types'

export interface ExerciseDemo {
  exercise: Exercise
  variant: ExerciseVariant
}

/** Resuelve demo (GIF / guía) para un ejercicio logueado. */
export function resolveExerciseDemo(
  muscleId: string,
  exerciseName: string,
  equipment: Equipment,
): ExerciseDemo | null {
  const muscle = muscleMap.get(muscleId)
  if (!muscle) return null
  const exercise = muscle.exercises.find((e) => e.name === exerciseName)
  if (!exercise) return null
  const variant =
    exercise.variants.find((v) => v.equipment === equipment) ?? exercise.variants[0]
  if (!variant) return null
  return { exercise, variant }
}
