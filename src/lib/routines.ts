import { getMuscleDetail } from '../data/muscleHeads'
import { muscleMap } from '../data/muscles'
import type { Equipment, Exercise, Muscle, RoutineExercise, WorkoutDayPlan } from '../types'

const PREFERRED_EQUIPMENT: Equipment[] = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight']

function pickVariant(exercise: { variants: Array<{ equipment: Equipment }> }) {
  for (const eq of PREFERRED_EQUIPMENT) {
    const found = exercise.variants.find((v) => v.equipment === eq)
    if (found) return found
  }
  return exercise.variants[0]
}

function hintMatches(exerciseName: string, hint: string): boolean {
  const a = exerciseName.toLowerCase()
  const b = hint.toLowerCase()
  return a.includes(b) || b.includes(a)
}

/** Elige ejercicios cubriendo distintas cabezas/zonas cuando existen. */
function pickExercisesForMuscle(muscle: Muscle): Exercise[] {
  const detail = getMuscleDetail(muscle.id)
  const heads = detail?.heads ?? []
  if (heads.length === 0) return muscle.exercises.slice(0, 2)

  const picked: Exercise[] = []
  const used = new Set<string>()

  for (const head of heads) {
    const hints = head.exerciseHints ?? []
    const match = muscle.exercises.find(
      (ex) => !used.has(ex.name) && hints.some((h) => hintMatches(ex.name, h)),
    )
    if (match) {
      picked.push(match)
      used.add(match.name)
    }
  }

  for (const ex of muscle.exercises) {
    if (picked.length >= Math.max(2, heads.length)) break
    if (used.has(ex.name)) continue
    picked.push(ex)
    used.add(ex.name)
  }

  return picked.slice(0, Math.max(2, Math.min(heads.length, 3)))
}

/** Arma una rutina con ejercicios por músculo (prioriza distintas cabezas/zonas). */
export function buildWorkoutPlan(muscleIds: string[], label?: string): WorkoutDayPlan {
  const exercises: RoutineExercise[] = []

  for (const muscleId of muscleIds) {
    const muscle = muscleMap.get(muscleId)
    if (!muscle) continue

    for (const ex of pickExercisesForMuscle(muscle)) {
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
