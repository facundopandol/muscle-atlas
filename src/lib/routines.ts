import { muscleMap } from '../data/muscles'
import type { Equipment, RoutineExercise, WorkoutDayPlan } from '../types'

const PREFERRED_EQUIPMENT: Equipment[] = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight']

function pickVariant(exercise: { variants: Array<{ equipment: Equipment }> }) {
  for (const eq of PREFERRED_EQUIPMENT) {
    const found = exercise.variants.find((v) => v.equipment === eq)
    if (found) return found
  }
  return exercise.variants[0]
}

/** Arma una rutina con 2 ejercicios por músculo (máx. 6 si son 3 grupos). */
export function buildWorkoutPlan(muscleIds: string[], label?: string): WorkoutDayPlan {
  const exercises: RoutineExercise[] = []

  for (const muscleId of muscleIds) {
    const muscle = muscleMap.get(muscleId)
    if (!muscle) continue

    const picks = muscle.exercises.slice(0, 2)
    for (const ex of picks) {
      const variant = pickVariant(ex)
      exercises.push({
        muscleId,
        muscleName: muscle.name,
        exerciseName: ex.name,
        equipment: variant.equipment,
        sets: ex.sets,
        reps: ex.reps,
      })
    }
  }

  return {
    id: crypto.randomUUID(),
    label: label?.trim() || defaultDayLabel(muscleIds),
    muscleIds,
    exercises,
    createdAt: new Date().toISOString(),
  }
}

function defaultDayLabel(muscleIds: string[]): string {
  const names = muscleIds
    .map((id) => muscleMap.get(id)?.name)
    .filter(Boolean)
    .slice(0, 3)
  return names.join(' + ') || 'Rutina del día'
}
