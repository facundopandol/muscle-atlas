import type { MuscleGroup, MuscleMapRegion, MuscleMapView } from '@musclemap/core'
import { MUSCLE_GROUP_META } from '@musclemap/core'
import { getBodyDiagram } from '@musclemap/assets'
import type { BodyView } from '../types'

/** Etiquetas en español para tooltip MuscleMap. */
export const MM_LABELS_ES: Partial<Record<MuscleGroup, string>> = {
  CHEST: 'Pectorales',
  BACK_UPPER: 'Espalda alta',
  BACK_LOWER: 'Espalda baja',
  TRAPEZIUS: 'Trapecio',
  RHOMBOIDS: 'Romboides',
  LATS: 'Dorsales',
  SHOULDERS_FRONT: 'Deltoides anterior',
  SHOULDERS_SIDE: 'Deltoides lateral',
  SHOULDERS_REAR: 'Deltoides posterior',
  BICEPS: 'Bíceps',
  TRICEPS: 'Tríceps',
  FOREARMS: 'Antebrazos',
  CORE: 'Abdominales',
  OBLIQUES: 'Oblicuos',
  GLUTES: 'Glúteos',
  QUADS: 'Cuádriceps',
  HAMSTRINGS: 'Isquiotibiales',
  CALVES: 'Pantorrillas',
  HIP_FLEXORS: 'Flexores de cadera',
  ADDUCTORS: 'Aductores',
  ABDUCTORS: 'Abductores',
}

const GROUP_TO_MUSCLE: Partial<Record<MuscleGroup, string>> = {
  CHEST: 'upper-chest',
  SHOULDERS_FRONT: 'front-deltoid',
  SHOULDERS_SIDE: 'front-deltoid',
  SHOULDERS_REAR: 'rear-deltoid',
  BICEPS: 'biceps',
  TRICEPS: 'triceps',
  FOREARMS: 'forearms',
  CORE: 'abs',
  OBLIQUES: 'obliques',
  QUADS: 'quadriceps',
  HAMSTRINGS: 'hamstrings',
  CALVES: 'calves',
  GLUTES: 'glutes',
  TRAPEZIUS: 'trapezius',
  LATS: 'lats',
  RHOMBOIDS: 'lats',
  BACK_UPPER: 'trapezius',
}

/** Grupos que abren un sub-menú (varios músculos nuestros). */
export const GROUPS_WITH_SUBMENU: Partial<Record<MuscleGroup, Array<{ muscleId: string; label: string }>>> = {
  CHEST: [
    { muscleId: 'upper-chest', label: 'Pectoral superior' },
    { muscleId: 'lower-chest', label: 'Pectoral inferior' },
  ],
}

export function mmGroupToMuscleId(group: MuscleGroup): string | null {
  return GROUP_TO_MUSCLE[group] ?? null
}

export function muscleIdToMmGroup(muscleId: string): MuscleGroup | null {
  const map: Record<string, MuscleGroup> = {
    'upper-chest': 'CHEST',
    'lower-chest': 'CHEST',
    'front-deltoid': 'SHOULDERS_FRONT',
    'rear-deltoid': 'SHOULDERS_REAR',
    biceps: 'BICEPS',
    triceps: 'TRICEPS',
    forearms: 'FOREARMS',
    abs: 'CORE',
    obliques: 'OBLIQUES',
    quadriceps: 'QUADS',
    hamstrings: 'HAMSTRINGS',
    calves: 'CALVES',
    glutes: 'GLUTES',
    trapezius: 'TRAPEZIUS',
    lats: 'LATS',
  }
  return map[muscleId] ?? null
}

export function groupRequiredView(group: MuscleGroup): BodyView {
  const visibility = MUSCLE_GROUP_META[group].visibility
  if (visibility === 'FRONT') return 'front'
  if (visibility === 'BACK') return 'back'
  return 'front'
}

export function bodyViewToMm(view: BodyView): MuscleMapView {
  return view === 'front' ? 'FRONT' : 'BACK'
}

export interface MuscleDetailMmConfig {
  group: MuscleGroup
  view: MuscleMapView
  region: MuscleMapRegion
}

export function getMuscleDetailMmConfig(muscleId: string): MuscleDetailMmConfig | null {
  const group = muscleIdToMmGroup(muscleId)
  if (!group) return null

  const regionByMuscle: Record<string, MuscleMapRegion> = {
    biceps: 'UPPER_BODY',
    triceps: 'UPPER_BODY',
    forearms: 'UPPER_BODY',
    'front-deltoid': 'UPPER_BODY',
    'rear-deltoid': 'UPPER_BODY',
    'upper-chest': 'UPPER_BODY',
    'lower-chest': 'UPPER_BODY',
    trapezius: 'UPPER_BODY',
    lats: 'UPPER_BODY',
    abs: 'CORE',
    obliques: 'CORE',
    quadriceps: 'LOWER_BODY',
    hamstrings: 'LOWER_BODY',
    calves: 'LOWER_BODY',
    glutes: 'LOWER_BODY',
  }

  const visibility = MUSCLE_GROUP_META[group].visibility
  let view: MuscleMapView = 'FRONT'
  if (visibility === 'BACK') view = 'BACK'
  else if (visibility === 'BOTH') {
    view = ['triceps', 'rear-deltoid', 'hamstrings', 'calves', 'glutes', 'trapezius', 'lats'].includes(
      muscleId,
    )
      ? 'BACK'
      : 'FRONT'
  }

  return {
    group,
    view,
    region: regionByMuscle[muscleId] ?? 'FULL_BODY',
  }
}

export function getDetailCropViewBox(muscleId: string): string | undefined {
  const mm = getMuscleDetailMmConfig(muscleId)
  if (!mm) return undefined
  const diagram = getBodyDiagram('MALE', mm.view === 'FRONT' ? 'FRONT' : 'BACK')
  return diagram.regionBox?.[mm.region]
}

/** Color naranja tipo GIF de ejercicio. */
export const MUSCLE_HIGHLIGHT_COLOR = '#e07030'
