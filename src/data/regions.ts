import type { BodyView } from '../types'

export interface RegionMuscleOption {
  muscleId: string
  label: string
  /** Si el músculo requiere cambiar de vista al seleccionarlo. */
  view: BodyView
}

export interface BodyRegion {
  id: string
  label: string
  view: BodyView
  paths: string[]
  /** Punto donde aparece el menú (coords viewBox 400×560). */
  menuAnchor: { x: number; y: number }
  muscles: RegionMuscleOption[]
}

const armMusclesFront: RegionMuscleOption[] = [
  { muscleId: 'biceps', label: 'Bíceps', view: 'front' },
  { muscleId: 'forearms', label: 'Antebrazos', view: 'front' },
  { muscleId: 'triceps', label: 'Tríceps', view: 'back' },
]

const armMusclesBack: RegionMuscleOption[] = [
  { muscleId: 'triceps', label: 'Tríceps', view: 'back' },
  { muscleId: 'forearms', label: 'Antebrazos', view: 'back' },
  { muscleId: 'biceps', label: 'Bíceps', view: 'front' },
]

export const frontRegions: BodyRegion[] = [
  {
    id: 'arm-left',
    label: 'Brazo izquierdo',
    view: 'front',
    paths: ['M 148 126 C 108 140 48 152 22 162 L 22 172 L 98 176 L 148 148 Z'],
    menuAnchor: { x: 72, y: 168 },
    muscles: armMusclesFront,
  },
  {
    id: 'arm-right',
    label: 'Brazo derecho',
    view: 'front',
    paths: ['M 252 126 C 292 140 352 152 378 162 L 378 172 L 302 176 L 252 148 Z'],
    menuAnchor: { x: 328, y: 168 },
    muscles: armMusclesFront,
  },
  {
    id: 'shoulders',
    label: 'Hombros',
    view: 'front',
    paths: ['M 148 118 C 128 122 108 132 100 148 L 148 152 L 252 152 L 300 148 C 292 132 272 122 252 118 Z'],
    menuAnchor: { x: 200, y: 138 },
    muscles: [{ muscleId: 'front-deltoid', label: 'Deltoides anterior', view: 'front' }],
  },
  {
    id: 'chest',
    label: 'Pecho',
    view: 'front',
    paths: ['M 158 128 C 152 145 152 195 168 210 L 232 210 C 248 195 248 145 242 128 C 220 118 180 118 158 128 Z'],
    menuAnchor: { x: 200, y: 172 },
    muscles: [
      { muscleId: 'upper-chest', label: 'Pectoral superior', view: 'front' },
      { muscleId: 'lower-chest', label: 'Pectoral inferior', view: 'front' },
    ],
  },
  {
    id: 'core',
    label: 'Core',
    view: 'front',
    paths: ['M 158 212 C 154 235 156 265 168 278 L 232 278 C 244 265 246 235 242 212 L 200 208 Z'],
    menuAnchor: { x: 200, y: 248 },
    muscles: [
      { muscleId: 'abs', label: 'Abdominales', view: 'front' },
      { muscleId: 'obliques', label: 'Oblicuos', view: 'front' },
    ],
  },
  {
    id: 'legs',
    label: 'Piernas',
    view: 'front',
    paths: [
      'M 162 288 C 148 360 152 440 168 510 L 192 512 L 200 288 Z',
      'M 238 288 C 252 360 248 440 232 510 L 208 512 L 200 288 Z',
    ],
    menuAnchor: { x: 200, y: 400 },
    muscles: [{ muscleId: 'quadriceps', label: 'Cuádriceps', view: 'front' }],
  },
]

export const backRegions: BodyRegion[] = [
  {
    id: 'arm-left',
    label: 'Brazo izquierdo',
    view: 'back',
    paths: ['M 148 126 C 108 140 48 152 22 162 L 22 172 L 98 176 L 148 148 Z'],
    menuAnchor: { x: 72, y: 168 },
    muscles: armMusclesBack,
  },
  {
    id: 'arm-right',
    label: 'Brazo derecho',
    view: 'back',
    paths: ['M 252 126 C 292 140 352 152 378 162 L 378 172 L 302 176 L 252 148 Z'],
    menuAnchor: { x: 328, y: 168 },
    muscles: armMusclesBack,
  },
  {
    id: 'shoulders-back',
    label: 'Hombros',
    view: 'back',
    paths: ['M 148 118 C 128 122 108 132 100 148 L 148 152 L 252 152 L 300 148 C 292 132 272 122 252 118 Z'],
    menuAnchor: { x: 200, y: 138 },
    muscles: [{ muscleId: 'rear-deltoid', label: 'Deltoides posterior', view: 'back' }],
  },
  {
    id: 'upper-back',
    label: 'Espalda alta',
    view: 'back',
    paths: ['M 152 116 L 248 116 L 252 168 L 200 178 L 148 168 Z'],
    menuAnchor: { x: 200, y: 152 },
    muscles: [
      { muscleId: 'trapezius', label: 'Trapecio', view: 'back' },
      { muscleId: 'lats', label: 'Dorsales', view: 'back' },
    ],
  },
  {
    id: 'glutes',
    label: 'Glúteos',
    view: 'back',
    paths: ['M 162 268 C 158 295 172 322 200 326 C 228 322 242 295 238 268 L 200 262 Z'],
    menuAnchor: { x: 200, y: 298 },
    muscles: [{ muscleId: 'glutes', label: 'Glúteos', view: 'back' }],
  },
  {
    id: 'legs-back',
    label: 'Piernas',
    view: 'back',
    paths: [
      'M 162 288 C 148 360 152 440 168 510 L 192 512 L 200 288 Z',
      'M 238 288 C 252 360 248 440 232 510 L 208 512 L 200 288 Z',
    ],
    menuAnchor: { x: 200, y: 400 },
    muscles: [
      { muscleId: 'hamstrings', label: 'Isquiotibiales', view: 'back' },
      { muscleId: 'calves', label: 'Pantorrillas', view: 'back' },
    ],
  },
]

export function getRegionsForView(view: BodyView): BodyRegion[] {
  return view === 'front' ? frontRegions : backRegions
}

export function getRegionById(view: BodyView, id: string): BodyRegion | undefined {
  return getRegionsForView(view).find((r) => r.id === id)
}
