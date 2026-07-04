import type { BodyView } from '../../types'
import { getMuscleById, getMusclesForView, type MuscleAnatomy } from './anatomy'

/** @deprecated Usar anatomy.ts directamente — reexport por compatibilidad. */
export type MuscleZone = MuscleAnatomy

export const frontMuscleZones = getMusclesForView('front')
export const backMuscleZones = getMusclesForView('back')

export function getZonesForView(view: BodyView): MuscleAnatomy[] {
  return getMusclesForView(view)
}

export function getZoneById(view: BodyView, id: string): MuscleAnatomy | undefined {
  return getMuscleById(view, id)
}
