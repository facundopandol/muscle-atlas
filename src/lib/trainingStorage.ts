import { muscleMap } from '../data/muscles'
import { exerciseKey } from './exerciseKey'
import type {
  CompletedWorkout,
  DayRoutineItem,
  LoggedExercise,
  LoggedSet,
  MuscleTrainingStats,
  PeriodComparison,
  PersonalRecord,
  WorkoutDayPlan,
  WorkoutSession,
} from '../types'

const STORAGE_V1 = 'muscle-atlas-workouts-v1'
const STORAGE_V2 = 'muscle-atlas-training-v2'

interface TrainingStore {
  sessions: WorkoutSession[]
  favorites: string[]
  prs: PersonalRecord[]
  dayRoutine?: {
    date: string
    label?: string
    items: DayRoutineItem[]
  }
}

function readStore(): TrainingStore {
  try {
    const raw = localStorage.getItem(STORAGE_V2)
    if (raw) {
      const parsed = JSON.parse(raw) as TrainingStore
      return {
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
        prs: Array.isArray(parsed.prs) ? parsed.prs : [],
        dayRoutine: normalizeDayRoutine(parsed.dayRoutine),
      }
    }
    migrateFromV1()
    return readStore()
  } catch {
    return { sessions: [], favorites: [], prs: [] }
  }
}

function writeStore(store: TrainingStore) {
  localStorage.setItem(STORAGE_V2, JSON.stringify(store))
}

function migrateFromV1() {
  try {
    const raw = localStorage.getItem(STORAGE_V1)
    if (!raw) return
    const parsed = JSON.parse(raw) as { completed: CompletedWorkout[] }
    if (!Array.isArray(parsed.completed) || parsed.completed.length === 0) return

    const sessions: WorkoutSession[] = parsed.completed.map((w) => ({
      id: w.id,
      date: w.date,
      label: w.label,
      muscleIds: w.muscleIds,
      completedAt: `${w.date}T12:00:00.000Z`,
      exercises: w.exercises.map((ex) => {
        const setCount = parseInt(ex.sets, 10) || 3
        const repNum = parseInt(ex.reps.split('-')[0], 10) || 10
        const sets: LoggedSet[] = Array.from({ length: setCount }, () => ({
          weightKg: 0,
          reps: repNum,
        }))
        return {
          id: crypto.randomUUID(),
          muscleId: ex.muscleId,
          exerciseName: ex.exerciseName,
          equipment: ex.equipment,
          sets,
        }
      }),
    }))

    localStorage.setItem(STORAGE_V2, JSON.stringify({ sessions, favorites: [], prs: [] }))
  } catch {
    /* ignore */
  }
}

export function loadSessions(): WorkoutSession[] {
  return readStore().sessions.sort((a, b) => b.date.localeCompare(a.date))
}

export function saveSession(session: WorkoutSession): PersonalRecord[] {
  const store = readStore()
  store.sessions.unshift(session)
  const newPrs = detectNewPrs(session, store.prs)
  store.prs = mergePrs(store.prs, newPrs)
  writeStore(store)
  return newPrs
}

function setScore(weightKg: number, reps: number): number {
  return weightKg * reps + weightKg * 0.1
}

function detectNewPrs(session: WorkoutSession, existing: PersonalRecord[]): PersonalRecord[] {
  const newPrs: PersonalRecord[] = []
  const bestMap = new Map(existing.map((p) => [p.key, p]))

  for (const ex of session.exercises) {
    const key = exerciseKey(ex.muscleId, ex.exerciseName, ex.equipment)
    let bestSet: LoggedSet | null = null
    for (const s of ex.sets) {
      if (!bestSet || setScore(s.weightKg, s.reps) > setScore(bestSet.weightKg, bestSet.reps)) {
        bestSet = s
      }
    }
    if (!bestSet || bestSet.weightKg <= 0) continue

    const prev = bestMap.get(key)
    const score = setScore(bestSet.weightKg, bestSet.reps)
    const prevScore = prev ? setScore(prev.weightKg, prev.reps) : 0

    if (score > prevScore) {
      newPrs.push({
        key,
        exerciseName: ex.exerciseName,
        muscleId: ex.muscleId,
        equipment: ex.equipment,
        weightKg: bestSet.weightKg,
        reps: bestSet.reps,
        date: session.date,
        sessionId: session.id,
      })
    }
  }

  return newPrs
}

function mergePrs(existing: PersonalRecord[], incoming: PersonalRecord[]): PersonalRecord[] {
  const map = new Map(existing.map((p) => [p.key, p]))
  for (const pr of incoming) {
    const prev = map.get(pr.key)
    if (!prev || setScore(pr.weightKg, pr.reps) > setScore(prev.weightKg, prev.reps)) {
      map.set(pr.key, pr)
    }
  }
  return [...map.values()]
}

export function loadPersonalRecords(): PersonalRecord[] {
  return readStore().prs
}

export function getPrForExercise(key: string): PersonalRecord | null {
  return readStore().prs.find((p) => p.key === key) ?? null
}

export function loadFavorites(): Set<string> {
  return new Set(readStore().favorites)
}

export function toggleFavorite(key: string): boolean {
  const store = readStore()
  const set = new Set(store.favorites)
  if (set.has(key)) {
    set.delete(key)
  } else {
    set.add(key)
  }
  store.favorites = [...set]
  writeStore(store)
  return set.has(key)
}

export function isFavorite(key: string): boolean {
  return readStore().favorites.includes(key)
}

function todayDate(): string {
  return new Date().toISOString().slice(0, 10)
}

function normalizeDayRoutine(
  raw: TrainingStore['dayRoutine'],
): TrainingStore['dayRoutine'] {
  if (!raw || raw.date !== todayDate() || !Array.isArray(raw.items)) return undefined
  return {
    date: raw.date,
    label: raw.label,
    items: raw.items.filter((item) => item.muscleId && item.exerciseName && item.equipment),
  }
}

export function loadDayRoutine(): DayRoutineItem[] {
  const routine = readStore().dayRoutine
  if (!routine || routine.date !== todayDate()) return []
  return routine.items
}

export function getDayRoutineCount(): number {
  return loadDayRoutine().length
}

export function addToDayRoutine(item: DayRoutineItem): boolean {
  const store = readStore()
  const date = todayDate()
  const current =
    store.dayRoutine?.date === date ? store.dayRoutine.items : []
  const key = exerciseKey(item.muscleId, item.exerciseName, item.equipment)
  if (current.some((i) => exerciseKey(i.muscleId, i.exerciseName, i.equipment) === key)) {
    return false
  }
  store.dayRoutine = { date, label: store.dayRoutine?.label, items: [...current, item] }
  writeStore(store)
  return true
}

export function removeFromDayRoutine(key: string) {
  const store = readStore()
  if (!store.dayRoutine || store.dayRoutine.date !== todayDate()) return
  store.dayRoutine = {
    ...store.dayRoutine,
    items: store.dayRoutine.items.filter(
      (i) => exerciseKey(i.muscleId, i.exerciseName, i.equipment) !== key,
    ),
  }
  if (store.dayRoutine.items.length === 0) {
    delete store.dayRoutine
  }
  writeStore(store)
}

export function clearDayRoutine() {
  const store = readStore()
  delete store.dayRoutine
  writeStore(store)
}

/** Compat con ProgressView y código legacy. */
export function loadCompletedWorkouts(): CompletedWorkout[] {
  return loadSessions().map((s) => ({
    id: s.id,
    date: s.date,
    label: s.label,
    muscleIds: s.muscleIds,
    exercises: s.exercises.map((ex) => ({
      muscleId: ex.muscleId,
      exerciseName: ex.exerciseName,
      equipment: ex.equipment,
      sets: String(ex.sets.length),
      reps: ex.sets.length > 0 ? String(ex.sets[0].reps) : '0',
    })),
  }))
}

function startOfWeek(d: Date): Date {
  const copy = new Date(d)
  const day = copy.getDay()
  const diff = day === 0 ? -6 : 1 - day
  copy.setDate(copy.getDate() + diff)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function aggregateStats(sessions: WorkoutSession[]): MuscleTrainingStats[] {
  const map = new Map<string, { sessions: number; exercises: number }>()

  for (const w of sessions) {
    for (const muscleId of w.muscleIds) {
      const prev = map.get(muscleId) ?? { sessions: 0, exercises: 0 }
      prev.sessions += 1
      map.set(muscleId, prev)
    }
    for (const ex of w.exercises) {
      const prev = map.get(ex.muscleId) ?? { sessions: 0, exercises: 0 }
      prev.exercises += 1
      map.set(ex.muscleId, prev)
    }
  }

  return [...map.entries()]
    .map(([muscleId, stats]) => ({
      muscleId,
      muscleName: muscleMap.get(muscleId)?.name ?? muscleId,
      sessions: stats.sessions,
      exercises: stats.exercises,
    }))
    .sort((a, b) => b.sessions - a.sessions)
}

export function getPeriodComparison(
  period: 'week' | 'month',
  referenceDate = new Date(),
): PeriodComparison {
  const all = loadSessions()

  const currentStart =
    period === 'week' ? startOfWeek(referenceDate) : startOfMonth(referenceDate)
  const currentEnd = new Date(referenceDate)
  currentEnd.setHours(23, 59, 59, 999)

  const previousStart = new Date(currentStart)
  if (period === 'week') {
    previousStart.setDate(previousStart.getDate() - 7)
  } else {
    previousStart.setMonth(previousStart.getMonth() - 1)
  }
  const previousEnd = new Date(currentStart)
  previousEnd.setDate(previousEnd.getDate() - 1)
  previousEnd.setHours(23, 59, 59, 999)

  const curFrom = formatDate(currentStart)
  const curTo = formatDate(currentEnd)
  const prevFrom = formatDate(previousStart)
  const prevTo = formatDate(previousEnd)

  const currentWorkouts = all.filter((w) => w.date >= curFrom && w.date <= curTo)
  const previousWorkouts = all.filter((w) => w.date >= prevFrom && w.date <= prevTo)

  const label =
    period === 'week'
      ? `Semana del ${currentStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
      : currentStart.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  const previousLabel =
    period === 'week'
      ? `Semana del ${previousStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
      : previousStart.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  return {
    period,
    currentLabel: label,
    previousLabel,
    current: {
      workouts: currentWorkouts.length,
      muscleStats: aggregateStats(currentWorkouts),
    },
    previous: {
      workouts: previousWorkouts.length,
      muscleStats: aggregateStats(previousWorkouts),
    },
  }
}

export function getMuscleScore(muscleId: string, stats: MuscleTrainingStats[]): number {
  const row = stats.find((s) => s.muscleId === muscleId)
  if (!row || row.sessions === 0) return 0
  return Math.min(100, row.sessions * 35 + row.exercises * 8)
}

export function deleteSession(id: string) {
  const store = readStore()
  store.sessions = store.sessions.filter((s) => s.id !== id)
  writeStore(store)
}

/** @deprecated Usar saveSession */
export function saveCompletedWorkout(plan: WorkoutDayPlan, date = new Date()): WorkoutSession {
  const exercises: LoggedExercise[] = plan.exercises.map((ex) => {
    const setCount = parseInt(ex.sets, 10) || 3
    const repNum = parseInt(ex.reps.split('-')[0], 10) || 10
    const sets: LoggedSet[] = Array.from({ length: setCount }, () => ({
      weightKg: 0,
      reps: repNum,
    }))
    return {
      id: crypto.randomUUID(),
      muscleId: ex.muscleId,
      exerciseName: ex.exerciseName,
      equipment: ex.equipment,
      sets,
    }
  })

  const session: WorkoutSession = {
    id: plan.id || crypto.randomUUID(),
    date: date.toISOString().slice(0, 10),
    label: plan.label,
    muscleIds: plan.muscleIds,
    exercises,
    completedAt: date.toISOString(),
  }
  saveSession(session)
  return session
}
