import type { MuscleGroup, MuscleMapRegion, MuscleMapValues } from '@musclemap/core'
import type { PartValues } from '@musclemap/react'
import {
  getMuscleDetailMmConfig,
  highlightChestParts,
  muscleIdToChestParts,
} from './muscleMapBridge'

/** Crop "x y w h" más cerrado para distinguir músculos de espalda. */
const MUSCLE_CROPS: Partial<Record<string, string>> = {
  trapezius: '290 50 440 420',
  lats: '200 250 620 540',
}

/**
 * Paths MuscleMap por cabeza de trapecio.
 * El atlas no tiene superior/medio/inferior: usamos TRAPEZIUS (nuca),
 * TRAPEZIUS_L/R (entre omóplatos) y romboides para la porción baja.
 */
const HEAD_HIGHLIGHTS: Record<
  string,
  { parts: string[]; crop?: string; groups?: MuscleGroup[] }
> = {
  'traps-upper': {
    parts: ['TRAPEZIUS'],
    crop: '310 40 400 360',
  },
  'traps-middle': {
    parts: ['TRAPEZIUS_LEFT', 'TRAPEZIUS_RIGHT'],
    crop: '290 180 440 340',
  },
  'traps-lower': {
    parts: ['RHOMBOID_LEFT', 'RHOMBOID_RIGHT', 'TRAPEZIUS_LEFT', 'TRAPEZIUS_RIGHT'],
    crop: '300 250 420 400',
  },
}

export interface ExploreThumbVisual {
  view: 'FRONT' | 'BACK'
  region: MuscleMapRegion
  values: MuscleMapValues
  partValues: PartValues
  cropViewBox?: string
}

/** Resuelve highlight + crop para una card de músculo o cabeza. */
export function getExploreMuscleVisual(
  muscleId: string,
  headId?: string | null,
): ExploreThumbVisual | null {
  const mm = getMuscleDetailMmConfig(muscleId)
  if (!mm) return null

  const view = mm.view === 'BACK' ? 'BACK' : 'FRONT'
  const region = mm.region
  const chestParts = muscleIdToChestParts(muscleId)

  if (chestParts.length > 0) {
    return {
      view,
      region,
      values: {},
      partValues: highlightChestParts({}, muscleId, 100),
    }
  }

  if (headId && HEAD_HIGHLIGHTS[headId]) {
    const spec = HEAD_HIGHLIGHTS[headId]
    const partValues: PartValues = {}
    for (const partId of spec.parts) {
      partValues[partId] = { score: 100 }
    }
    const values: MuscleMapValues = {}
    for (const group of spec.groups ?? []) {
      values[group] = { score: 100 }
    }
    return {
      view,
      region,
      values,
      partValues,
      cropViewBox: spec.crop ?? MUSCLE_CROPS[muscleId],
    }
  }

  return {
    view,
    region,
    values: { [mm.group]: { score: 100 } },
    partValues: {},
    cropViewBox: MUSCLE_CROPS[muscleId],
  }
}
