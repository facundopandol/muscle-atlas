import type { ExerciseCategory, ExerciseLevel, MovementPattern } from '../types'

const LEVEL_OVERRIDES: Record<string, ExerciseLevel> = {
  'Fondos en paralelas': 'intermediate',
  'Dominadas': 'intermediate',
  'Peso muerto rumano': 'intermediate',
  'Sentadilla búlgara': 'intermediate',
  'Hip thrust': 'intermediate',
}

const PATTERN_KEYWORDS: Array<{ pattern: MovementPattern; words: string[] }> = [
  { pattern: 'push', words: ['press', 'empuje', 'fondos', 'dip', 'extension', 'extensión', 'overhead', 'militar'] },
  { pattern: 'pull', words: ['remo', 'row', 'dominada', 'pull', 'curl', 'jalón', 'face pull', 'encogimiento'] },
  { pattern: 'squat', words: ['sentadilla', 'squat', 'prensa', 'zancada', 'lunge', 'extension de pierna'] },
  { pattern: 'hinge', words: ['peso muerto', 'deadlift', 'hip thrust', 'good morning', 'isquio', 'curl femoral'] },
  { pattern: 'core', words: ['abdominal', 'crunch', 'plancha', 'plank', 'oblicuo', 'rueda', 'elevación de piernas'] },
]

const ISOLATION_KEYWORDS = [
  'curl',
  'extension',
  'extensión',
  'apertura',
  'fly',
  'elevación',
  'raise',
  'kickback',
  'pantorrilla',
  'calf',
]

export function inferExerciseMeta(exerciseName: string): {
  level: ExerciseLevel
  pattern: MovementPattern
  category: ExerciseCategory
} {
  const lower = exerciseName.toLowerCase()
  const level = LEVEL_OVERRIDES[exerciseName] ?? 'beginner'

  let pattern: MovementPattern = 'isolation'
  for (const { pattern: p, words } of PATTERN_KEYWORDS) {
    if (words.some((w) => lower.includes(w))) {
      pattern = p
      break
    }
  }

  const category: ExerciseCategory = ISOLATION_KEYWORDS.some((w) => lower.includes(w))
    ? 'isolation'
    : 'compound'

  return { level, pattern, category }
}

export const LEVEL_LABELS: Record<ExerciseLevel, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

export const PATTERN_LABELS: Record<MovementPattern, string> = {
  push: 'Empuje',
  pull: 'Tirón',
  hinge: 'Bisagra',
  squat: 'Sentadilla',
  core: 'Core',
  isolation: 'Aislamiento',
}

export const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  compound: 'Compuesto',
  isolation: 'Aislado',
}
