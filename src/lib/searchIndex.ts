import { muscles } from '../data/muscles'
import { EQUIPMENT_LABELS, type BodyView, type Equipment } from '../types'

export interface SearchResult {
  muscleId: string
  muscleName: string
  view: BodyView
  exerciseName?: string
  equipment?: Equipment
  matchLabel: string
}

const EQUIPMENT_ALIASES: Record<Equipment, string[]> = {
  dumbbell: ['mancuerna', 'mancuernas', 'dumbbell'],
  machine: ['maquina', 'máquina', 'machine', 'aparato'],
  barbell: ['barra', 'barbell', 'barra olimpica', 'olímpica'],
  cable: ['polea', 'poleas', 'cable', 'cables'],
  bodyweight: ['peso corporal', 'corporal', 'bodyweight', 'sin equipo'],
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
}

function matchesQuery(haystack: string, query: string): boolean {
  return normalize(haystack).includes(normalize(query))
}

function equipmentFromQuery(query: string): Equipment | null {
  const q = normalize(query)
  for (const [equipment, aliases] of Object.entries(EQUIPMENT_ALIASES) as [Equipment, string[]][]) {
    if (aliases.some((alias) => q.includes(normalize(alias)) || normalize(EQUIPMENT_LABELS[equipment]).includes(q))) {
      return equipment
    }
    if (q === normalize(EQUIPMENT_LABELS[equipment])) return equipment
  }
  return null
}

/** Busca por nombre de músculo, ejercicio o tipo de equipo. */
export function searchAtlas(query: string): SearchResult[] {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const results: SearchResult[] = []
  const seen = new Set<string>()
  const equipmentFilter = equipmentFromQuery(trimmed)

  for (const muscle of muscles) {
    const muscleHit =
      matchesQuery(muscle.name, trimmed) ||
      matchesQuery(muscle.id, trimmed) ||
      matchesQuery(muscle.description, trimmed)

    if (muscleHit) {
      const key = `muscle:${muscle.id}`
      if (!seen.has(key)) {
        seen.add(key)
        results.push({
          muscleId: muscle.id,
          muscleName: muscle.name,
          view: muscle.view,
          matchLabel: 'Músculo',
        })
      }
    }

    for (const exercise of muscle.exercises) {
      const exerciseHit = matchesQuery(exercise.name, trimmed)

      for (const variant of exercise.variants) {
        const equipmentLabel = EQUIPMENT_LABELS[variant.equipment]
        const equipmentHit =
          equipmentFilter === variant.equipment ||
          matchesQuery(equipmentLabel, trimmed) ||
          EQUIPMENT_ALIASES[variant.equipment].some((alias) => matchesQuery(alias, trimmed))

        if (!exerciseHit && !equipmentHit) continue

        const key = `ex:${muscle.id}:${exercise.name}:${variant.equipment}`
        if (seen.has(key)) continue
        seen.add(key)

        let matchLabel = 'Ejercicio'
        if (equipmentHit && !exerciseHit) {
          matchLabel = `Equipo: ${equipmentLabel}`
        } else if (equipmentHit) {
          matchLabel = `${exercise.name} · ${equipmentLabel}`
        }

        results.push({
          muscleId: muscle.id,
          muscleName: muscle.name,
          view: muscle.view,
          exerciseName: exercise.name,
          equipment: variant.equipment,
          matchLabel,
        })
      }
    }
  }

  return results.sort((a, b) => {
    if (a.matchLabel === 'Músculo' && b.matchLabel !== 'Músculo') return -1
    if (b.matchLabel === 'Músculo' && a.matchLabel !== 'Músculo') return 1
    return a.muscleName.localeCompare(b.muscleName, 'es')
  })
}

export const EQUIPMENT_QUICK_FILTERS: { equipment: Equipment; label: string }[] = [
  { equipment: 'dumbbell', label: 'Mancuernas' },
  { equipment: 'machine', label: 'Máquina' },
  { equipment: 'barbell', label: 'Barra' },
  { equipment: 'cable', label: 'Polea' },
  { equipment: 'bodyweight', label: 'Peso corporal' },
]
