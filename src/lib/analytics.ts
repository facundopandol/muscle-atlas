import { muscleMap } from '../data/muscles'
import { exerciseKey } from './exerciseKey'
import { loadPersonalRecords, loadSessions } from './trainingStorage'
import type {
  DashboardStats,
  ExerciseHistoryEntry,
  MuscleRecoveryInfo,
  PersonalRecord,
  RecoveryStatus,
} from '../types'

function daysBetween(from: string, to: Date): number {
  const a = new Date(from + 'T12:00:00')
  const b = new Date(to)
  a.setHours(12, 0, 0, 0)
  b.setHours(12, 0, 0, 0)
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

function recoveryFromDays(days: number | null): RecoveryStatus {
  if (days === null) return 'never'
  if (days <= 2) return 'fresh'
  if (days <= 4) return 'recent'
  if (days <= 7) return 'moderate'
  return 'long'
}

function recoveryPercent(status: RecoveryStatus): number {
  switch (status) {
    case 'fresh':
      return 55
    case 'recent':
      return 72
    case 'moderate':
      return 88
    case 'long':
      return 96
    case 'never':
      return 100
  }
}

export function recoveryScoreForMuscle(muscleId: string, reference = new Date()): number {
  const info = getMuscleRecovery(muscleId, reference)
  switch (info.status) {
    case 'fresh':
      return 20
    case 'recent':
      return 45
    case 'moderate':
      return 65
    case 'long':
      return 85
    case 'never':
      return 0
  }
}

export function getMuscleRecovery(muscleId: string, reference = new Date()): MuscleRecoveryInfo {
  const sessions = loadSessions()
  let lastDate: string | null = null
  let weeklySets = 0

  const weekAgo = new Date(reference)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weekFrom = weekAgo.toISOString().slice(0, 10)

  for (const session of sessions) {
    const hitsMuscle =
      session.muscleIds.includes(muscleId) ||
      session.exercises.some((e) => e.muscleId === muscleId)
    if (!hitsMuscle) continue

    if (!lastDate || session.date > lastDate) lastDate = session.date

    if (session.date >= weekFrom) {
      for (const ex of session.exercises) {
        if (ex.muscleId === muscleId) weeklySets += ex.sets.length
      }
    }
  }

  const daysSince = lastDate ? daysBetween(lastDate, reference) : null
  const status = recoveryFromDays(daysSince)
  const muscle = muscleMap.get(muscleId)

  return {
    muscleId,
    status,
    lastTrainedDate: lastDate,
    daysSince,
    weeklySets,
    recoveryPercent: recoveryPercent(status),
    exerciseCount: muscle?.exercises.length ?? 0,
  }
}

export function formatLastTrained(info: MuscleRecoveryInfo): string {
  if (!info.lastTrainedDate || info.daysSince === null) return 'Nunca entrenado'
  if (info.daysSince === 0) return 'Hoy'
  if (info.daysSince === 1) return 'Ayer'
  return `Hace ${info.daysSince} días`
}

export const RECOVERY_LABELS: Record<RecoveryStatus, string> = {
  fresh: 'Entrenado hace 1–2 días',
  recent: 'Hace varios días',
  moderate: 'Hace ~1 semana',
  long: 'Hace más de una semana',
  never: 'Sin entrenar',
}

export const RECOVERY_COLORS: Record<RecoveryStatus, string> = {
  fresh: '#c0392b',
  recent: '#e07030',
  moderate: '#d4a017',
  long: '#5a9a6e',
  never: '#9ca3af',
}

export function getDashboardStats(reference = new Date()): DashboardStats {
  const sessions = loadSessions()
  const prs = loadPersonalRecords()

  const monthStart = new Date(reference.getFullYear(), reference.getMonth(), 1)
  const monthFrom = monthStart.toISOString().slice(0, 10)
  const monthTo = reference.toISOString().slice(0, 10)

  const monthSessions = sessions.filter((s) => s.date >= monthFrom && s.date <= monthTo)
  const monthPrs = prs.filter((p) => p.date >= monthFrom && p.date <= monthTo)

  let totalSets = 0
  let totalVolumeKg = 0

  for (const s of monthSessions) {
    for (const ex of s.exercises) {
      for (const set of ex.sets) {
        totalSets += 1
        totalVolumeKg += set.weightKg * set.reps
      }
    }
  }

  const recentPrs = [...prs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return {
    workoutsThisMonth: monthSessions.length,
    totalSets,
    totalVolumeKg: Math.round(totalVolumeKg),
    prsThisMonth: monthPrs.length,
    recentPrs,
  }
}

export function getExerciseHistory(
  muscleId: string,
  exerciseName: string,
  equipment: import('../types').Equipment,
): ExerciseHistoryEntry[] {
  const key = exerciseKey(muscleId, exerciseName, equipment)
  const entries: ExerciseHistoryEntry[] = []

  for (const session of loadSessions()) {
    for (const ex of session.exercises) {
      if (exerciseKey(ex.muscleId, ex.exerciseName, ex.equipment) !== key) continue
      if (ex.sets.length === 0) continue

      let best = ex.sets[0]
      for (const s of ex.sets) {
        if (s.weightKg * s.reps > best.weightKg * best.reps) best = s
      }

      entries.push({
        date: session.date,
        weightKg: best.weightKg,
        reps: best.reps,
        sets: ex.sets.length,
        sessionId: session.id,
      })
    }
  }

  return entries.sort((a, b) => b.date.localeCompare(a.date))
}

export function compareWithPreviousPr(
  key: string,
  current: PersonalRecord,
): PersonalRecord | null {
  const sessions = loadSessions()
  let prev: PersonalRecord | null = null

  for (const session of sessions) {
    if (session.id === current.sessionId) continue
    for (const ex of session.exercises) {
      if (exerciseKey(ex.muscleId, ex.exerciseName, ex.equipment) !== key) continue
      for (const set of ex.sets) {
        const score = set.weightKg * set.reps
        const prevScore = prev ? prev.weightKg * prev.reps : 0
        if (score > prevScore && set.weightKg > 0) {
          prev = {
            key,
            exerciseName: ex.exerciseName,
            muscleId: ex.muscleId,
            equipment: ex.equipment,
            weightKg: set.weightKg,
            reps: set.reps,
            date: session.date,
            sessionId: session.id,
          }
        }
      }
    }
  }

  return prev
}

export function formatVolume(kg: number): string {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1).replace('.0', '')} t`
  return `${kg.toLocaleString('es-ES')} kg`
}

export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y.slice(2)}`
}
