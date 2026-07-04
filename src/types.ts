export type BodyView = 'front' | 'back'

export type BodyHalfFilter = 'all' | 'upper' | 'lower'

export type AppSection = 'dashboard' | 'explore' | 'routines' | 'progress'

export type Equipment = 'dumbbell' | 'machine' | 'barbell' | 'cable' | 'bodyweight'

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  dumbbell: 'Mancuernas',
  machine: 'Máquina',
  barbell: 'Barra',
  cable: 'Polea',
  bodyweight: 'Peso corporal',
}

export type ExerciseIllustrationId =
  | 'incline-press'
  | 'incline-fly'
  | 'decline-press'
  | 'dip'
  | 'cable-fly'
  | 'overhead-press'
  | 'front-raise'
  | 'bicep-curl'
  | 'preacher-curl'
  | 'hammer-curl'
  | 'cable-crunch'
  | 'hanging-leg-raise'
  | 'plank'
  | 'ab-wheel'
  | 'oblique-crunch'
  | 'side-plank'
  | 'russian-twist'
  | 'bicycle-crunch'
  | 'squat'
  | 'leg-press'
  | 'leg-extension'
  | 'lunge'
  | 'rear-fly'
  | 'face-pull'
  | 'inverted-row'
  | 'shrug'
  | 'upright-row'
  | 'farmer-walk'
  | 'pull-up'
  | 'lat-pulldown'
  | 'barbell-row'
  | 'seated-row'
  | 'skull-crusher'
  | 'tricep-pushdown'
  | 'bench-dip'
  | 'tricep-kickback'
  | 'hip-thrust'
  | 'glute-bridge'
  | 'glute-kickback'
  | 'bulgarian-split'
  | 'romanian-deadlift'
  | 'leg-curl'
  | 'good-morning'
  | 'nordic-curl'
  | 'calf-raise'
  | 'calf-raise-seated'
  | 'calf-press'
  | 'calf-jump'

export interface ExerciseVariant {
  equipment: Equipment
  formGuide: string
  /** Path relativo en ExerciseGymGifsDB, ej. pectorals/dumbbell-fly.gif */
  gifFile: string
  illustration: ExerciseIllustrationId
  tip?: string
}

export interface Exercise {
  name: string
  sets: string
  reps: string
  variants: ExerciseVariant[]
}

export interface ExerciseFocus {
  exerciseName?: string
  equipment?: Equipment
}

export interface Muscle {
  id: string
  name: string
  description: string
  view: BodyView
  exercises: Exercise[]
}

export interface MuscleHead {
  id: string
  name: string
  description: string
  howToTrain: string
  /** Zonas clicables en el viewBox del overlay (coord. del crop MuscleMap). */
  paths: string[]
  fibers?: string[]
  exerciseHints?: string[]
}

export interface MuscleDetailConfig {
  muscleId: string
  title: string
  subtitle: string
  /** viewBox del overlay — coincide con el crop de MuscleMap. */
  overlayViewBox: string
  /** Eje X para espejar zonas al brazo/pierna derecha. */
  mirrorCenterX: number
  heads: MuscleHead[]
}

export type AppMode =
  | { type: 'body' }
  | { type: 'detail'; muscleId: string; headId: string | null }

export interface RoutineExercise {
  muscleId: string
  muscleName: string
  exerciseName: string
  equipment: Equipment
  sets: string
  reps: string
}

export interface WorkoutDayPlan {
  id: string
  label: string
  muscleIds: string[]
  exercises: RoutineExercise[]
  createdAt: string
}

export interface CompletedWorkout {
  id: string
  date: string
  label: string
  muscleIds: string[]
  exercises: Array<{
    muscleId: string
    exerciseName: string
    equipment: Equipment
    sets: string
    reps: string
  }>
}

export interface MuscleTrainingStats {
  muscleId: string
  muscleName: string
  sessions: number
  exercises: number
}

export interface PeriodComparison {
  period: 'week' | 'month'
  currentLabel: string
  previousLabel: string
  current: {
    workouts: number
    muscleStats: MuscleTrainingStats[]
  }
  previous: {
    workouts: number
    muscleStats: MuscleTrainingStats[]
  }
}

export type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced'

export type MovementPattern = 'push' | 'pull' | 'hinge' | 'squat' | 'core' | 'isolation'

export type ExerciseCategory = 'compound' | 'isolation'

export interface LoggedSet {
  weightKg: number
  reps: number
  restSec?: number
}

export interface LoggedExercise {
  id: string
  muscleId: string
  exerciseName: string
  equipment: Equipment
  sets: LoggedSet[]
  notes?: string
}

export interface WorkoutSession {
  id: string
  date: string
  label: string
  muscleIds: string[]
  exercises: LoggedExercise[]
  completedAt: string
}

export interface PersonalRecord {
  key: string
  exerciseName: string
  muscleId: string
  equipment: Equipment
  weightKg: number
  reps: number
  date: string
  sessionId: string
}

export type RecoveryStatus = 'fresh' | 'recent' | 'moderate' | 'long' | 'never'

export interface MuscleRecoveryInfo {
  muscleId: string
  status: RecoveryStatus
  lastTrainedDate: string | null
  daysSince: number | null
  weeklySets: number
  recoveryPercent: number
  exerciseCount: number
}

export interface DashboardStats {
  workoutsThisMonth: number
  totalSets: number
  totalVolumeKg: number
  prsThisMonth: number
  recentPrs: PersonalRecord[]
}

export interface ExerciseHistoryEntry {
  date: string
  weightKg: number
  reps: number
  sets: number
  sessionId: string
}
