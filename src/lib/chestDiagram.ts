import type { BodyDiagram, BodyView, MusclePath } from '@musclemap/assets'
import type { MuscleMapSex } from '@musclemap/core'
import { getBodyDiagram } from '@musclemap/assets'

/**
 * Pectoral mayor en 3 porciones anatómicas (abanico):
 * - Clavicular (superior): fibras desde la clavícula (~20% del volumen)
 * - Esternal / central: fibras desde el esternón, el grueso del pecho (~60%)
 * - Costal / inferior: porción baja hacia las costillas (~20%)
 *
 * Contorno basado en el CHEST_LEFT/RIGHT original de MuscleMap
 * (bbox izq x 364–507, y 321–459).
 */

/** Clavicular izquierda */
const CHEST_UPPER_LEFT_D =
  'M445.4 321.1C433 320.9 422 322.7 412 326.7C404.4 331.1 397.1 336.3 392.7 340.8C389.8 343.7 385.7 347.8 382.3 352.1L505.5 353.6C503.8 349.4 499.3 340.9 492.6 334C482.6 329.1 467.3 324.3 451.9 321.5C448 321.1 445.4 321.1 445.4 321.1Z'

/** Esternal / central izquierda — masa principal del pectoral */
const CHEST_MID_LEFT_D =
  'M382.3 356C376.2 360.9 370.8 370.2 366.4 378.5C363.9 384.2 364.8 390.6 368.5 399.2C373.3 407.7 381.6 420.3 388.3 429.4L506.1 426.9C506.7 412.7 507 390.3 506.4 366.7C490 365 450 362 410 360C395 358 386 357 382.3 356Z'

/** Costal / inferior izquierda */
const CHEST_LOWER_LEFT_D =
  'M388.3 433C392.1 434.4 399.2 442.4 406.3 448.2C414.6 453.2 424 456.6 434.5 458.5C445.4 459.4 456.5 459.4 468.5 457.6C482.2 453.5 493 447.7 499.1 440.9C503.6 433 505.5 428 506.1 426.9L388.3 429.4C388.3 430.5 388.3 431.8 388.3 433Z'

/** Clavicular derecha */
const CHEST_UPPER_RIGHT_D =
  'M579 321.4C590.1 321.4 601.1 323.4 612.7 328.3C622.7 334.5 631.2 341.9 638.7 350.1C642.4 354.6 646 358 649.2 361.5L517.3 362.9C518 357.8 519.8 351.1 521.1 347.2C525.9 340.4 535 332.1 548.8 326.5C558.8 324 569.3 322.4 579 321.4Z'

/** Esternal / central derecha */
const CHEST_MID_RIGHT_D =
  'M649.2 365C652.6 370.6 656 376.6 659.2 384.6C659.2 389.6 655.2 396.8 649 409C644.6 415.8 640.2 422.5 633.5 428.5L516.7 426.5C515.8 408.2 515.9 391.7 516.4 374.2C516.7 368 517.3 362.9 517.3 362.9C540 364 580 366 620 368C635 368 645 367 649.2 365Z'

/** Costal / inferior derecha */
const CHEST_LOWER_RIGHT_D =
  'M633.5 432C629.3 437.5 623.2 444.9 613.5 452C604.1 456.2 593.7 458.5 579.8 459.1C566.3 458.1 552.3 455.6 538.1 449.9C528.4 443.9 521.9 436.7 517.7 428.5L516.7 426.5C520 428 525 432 633.5 432Z'

export const CHEST_PART_IDS = [
  'CHEST_UPPER_LEFT',
  'CHEST_UPPER_RIGHT',
  'CHEST_MID_LEFT',
  'CHEST_MID_RIGHT',
  'CHEST_LOWER_LEFT',
  'CHEST_LOWER_RIGHT',
] as const

export type ChestPartId = (typeof CHEST_PART_IDS)[number]

const CHEST_SPLIT_MUSCLES: MusclePath[] = [
  { group: 'CHEST', side: 'CENTER', id: 'CHEST_UPPER_LEFT', d: CHEST_UPPER_LEFT_D },
  { group: 'CHEST', side: 'CENTER', id: 'CHEST_UPPER_RIGHT', d: CHEST_UPPER_RIGHT_D },
  { group: 'CHEST', side: 'CENTER', id: 'CHEST_MID_LEFT', d: CHEST_MID_LEFT_D },
  { group: 'CHEST', side: 'CENTER', id: 'CHEST_MID_RIGHT', d: CHEST_MID_RIGHT_D },
  { group: 'CHEST', side: 'CENTER', id: 'CHEST_LOWER_LEFT', d: CHEST_LOWER_LEFT_D },
  { group: 'CHEST', side: 'CENTER', id: 'CHEST_LOWER_RIGHT', d: CHEST_LOWER_RIGHT_D },
]

/** Reemplaza el pecho único por clavicular / esternal / costal. */
export function patchChestSplit(diagram: BodyDiagram): BodyDiagram {
  if (diagram.view !== 'FRONT') return diagram
  const withoutChest = diagram.muscles.filter((m) => m.group !== 'CHEST')
  return { ...diagram, muscles: [...withoutChest, ...CHEST_SPLIT_MUSCLES] }
}

export function getAtlasBodyDiagram(sex: MuscleMapSex, view: BodyView): BodyDiagram {
  return patchChestSplit(getBodyDiagram(sex, view))
}
