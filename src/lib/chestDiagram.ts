import type { BodyDiagram, BodyView, MusclePath } from '@musclemap/assets'
import type { MuscleMapSex } from '@musclemap/core'
import { getBodyDiagram } from '@musclemap/assets'

/**
 * Pectoral mayor en 3 porciones anatómicas (abanico desde la inserción):
 * - Clavicular: fibras desde la clavícula (~20%)
 * - Esternal / central: fibras desde el esternón, el grueso (~55–60%)
 * - Costal / inferior: hacia las costillas (~20–25%)
 *
 * Contorno = CHEST_LEFT/RIGHT original de MuscleMap.
 * Las divisiones convergen en la inserción lateral (húmero), no en franjas
 * horizontales — eso evitaba el “ladder” de segmentos apilados.
 *
 * Bordes compartidos usan los mismos puntos (con solape mínimo) para no
 * dejar huecos blancos entre porciones.
 */

/** Inserción lateral aproximada (convergencia del abanico). */
const INS_L = { x: 372, y: 398 }
const INS_R = { x: 652, y: 398 }

/** Clavicular izquierda — cuña superior hacia la clavícula */
const CHEST_UPPER_LEFT_D = [
  `M451.9 321.5`,
  `C445.4 321.1 439.2 321 433 320.9`,
  `C427.2 321.3 422 322.7 416.7 324.2`,
  `C412 326.7 408.2 328.9 404.4 331.1`,
  `C401.5 332.9 399.3 334.6 397.1 336.3`,
  `C395.5 338 392.7 340.8 389.8 343.7`,
  `C385.7 347.8 382.3 352.1 378.9 356.4`,
  `C376.2 360.9 373.5 365.5 370.8 370.2`,
  `C369.5 378 370.2 388 ${INS_L.x} ${INS_L.y}`,
  // divisor clavicular↔esternal (inserción → esternón alto)
  `C410 372 458 352 506.4 348`,
  `C505.5 353.6 503.8 349.4 502.1 345.3`,
  `C499.3 340.9 495.9 337.4 492.6 334`,
  `C488.9 331.5 482.6 329.1 476.2 326.6`,
  `C467.3 324.3 459.6 322.9 451.9 321.5Z`,
].join('')

/** Esternal / central izquierda — masa principal */
const CHEST_MID_LEFT_D = [
  `M${INS_L.x} ${INS_L.y}`,
  // mismo divisor hacia esternón alto (sentido inverso + solape)
  `C410 372 458 352 506.4 348`,
  `C506.7 360 507 380 506.8 400`,
  `C506.7 412 506.5 420 506.1 424`,
  // divisor esternal↔costal (esternón bajo → inserción)
  `C470 418 420 408 ${INS_L.x} ${INS_L.y}Z`,
].join('')

/** Costal / inferior izquierda */
const CHEST_LOWER_LEFT_D = [
  `M${INS_L.x} ${INS_L.y}`,
  `C420 408 470 418 506.1 424`,
  `C506.1 420.7 504.9 426.9 503.6 433`,
  `C501.7 437.3 499.1 440.9 496.4 444.6`,
  `C493 447.7 487.6 450.6 482.2 453.5`,
  `C474.9 456.1 468.5 457.6 462.1 459.1`,
  `C456.5 459.4 451 459.4 445.4 459.4`,
  `C439.8 459.2 434.5 458.5 429.1 457.7`,
  `C424 456.6 419.3 454.9 414.6 453.2`,
  `C410.2 450.9 406.3 448.2 402.5 445.5`,
  `C399.2 442.4 395.6 438.4 392.1 434.4`,
  `C388.3 429.4 384.9 424.8 381.6 420.3`,
  `C378.8 416.1 376 411.9 373.3 407.7`,
  `C370.7 403.4 368.5 399.2 ${INS_L.x} ${INS_L.y}Z`,
].join('')

/** Clavicular derecha */
const CHEST_UPPER_RIGHT_D = [
  `M579 321.4`,
  `C590.1 321.4 601.1 323.4 612.7 328.3`,
  `C622.7 334.5 631.2 341.9 638.7 350.1`,
  `C642.4 354.6 645.8 359.6 649.2 365.1`,
  `C652.6 370.6 655 378 656.5 386`,
  `C655.5 392 ${INS_R.x} ${INS_R.y}`,
  `C614 372 566 352 517.5 348`,
  `C518 357.8 519.8 351.1 521.1 347.2`,
  `C525.9 340.4 535 332.1 548.8 326.5`,
  `C558.8 324 569.3 322.4 579 321.4Z`,
].join('')

/** Esternal / central derecha */
const CHEST_MID_RIGHT_D = [
  `M${INS_R.x} ${INS_R.y}`,
  `C614 372 566 352 517.5 348`,
  `C516.7 360 516.4 380 516.2 400`,
  `C515.9 412 516.3 420 516.7 424`,
  `C554 418 604 408 ${INS_R.x} ${INS_R.y}Z`,
].join('')

/** Costal / inferior derecha */
const CHEST_LOWER_RIGHT_D = [
  `M${INS_R.x} ${INS_R.y}`,
  `C604 408 554 418 516.7 424`,
  `C517.7 428.3 520.3 432.8 521.9 436.7`,
  `C525.2 440.3 528.4 443.9 533.3 447.3`,
  `C538.1 449.9 542.9 452.5 547.6 454.4`,
  `C552.3 455.6 557 456.9 561.7 457.6`,
  `C566.3 458.1 570.8 458.6 575.3 458.9`,
  `C579.8 459.1 584.3 459.2 588.7 459.2`,
  `C593.7 458.5 598.7 457.7 604.1 456.2`,
  `C608.8 454.1 613.5 452 617.4 449.4`,
  `C620.3 447.2 623.2 444.9 625 443.2`,
  `C629.3 437.5 633.5 431.9 640.2 422.5`,
  `C644.6 415.8 649 409 651.1 405`,
  `C653.2 400.9 655 396 ${INS_R.x} ${INS_R.y}Z`,
].join('')

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
