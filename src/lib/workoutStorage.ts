import { muscleMap } from '../data/muscles'
import type { CompletedWorkout, MuscleTrainingStats, PeriodComparison, WorkoutDayPlan } from '../types'

const STORAGE_KEY = 'muscle-atlas-workouts-v1'

interface Store {
  completed: CompletedWorkout[]
}

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { completed: [] }
    const parsed = JSON.parse(raw) as Store
    return { completed: Array.isArray(parsed.completed) ? parsed.completed : [] }
  } catch {
    return { completed: [] }
  }
}

function writeStore(store: Store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function loadCompletedWorkouts(): CompletedWorkout[] {
  return readStore().completed.sort((a, b) => b.date.localeCompare(a.date))
}

export function saveCompletedWorkout(plan: WorkoutDayPlan, date = new Date()): CompletedWorkout {
  const entry: CompletedWorkout = {
    id: crypto.randomUUID(),
    date: date.toISOString().slice(0, 10),
    label: plan.label,
    muscleIds: plan.muscleIds,
    exercises: plan.exercises.map((e) => ({
      muscleId: e.muscleId,
      exerciseName: e.exerciseName,
      equipment: e.equipment,
      sets: e.sets,
      reps: e.reps,
    })),
  }

  const store = readStore()
  store.completed.unshift(entry)
  writeStore(store)
  return entry
}

export function deleteCompletedWorkout(id: string) {
  const store = readStore()
  store.completed = store.completed.filter((w) => w.id !== id)
  writeStore(store)
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

function aggregateStats(workouts: CompletedWorkout[]): MuscleTrainingStats[] {
  const map = new Map<string, { sessions: number; exercises: number }>()

  for (const w of workouts) {
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
  const all = loadCompletedWorkouts()

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
