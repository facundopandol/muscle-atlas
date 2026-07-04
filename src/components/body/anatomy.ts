import type { BodyView } from '../../types'

export interface MuscleAnatomy {
  id: string
  label: string
  /** Contornos anatómicos del músculo — misma forma visible e interactiva. */
  paths: string[]
  /** Líneas de fibras / detalle (solo decoración). */
  fibers?: string[]
}

/** Orden de capas: primero atrás, último delante. */
export const frontMuscles: MuscleAnatomy[] = [
  {
    id: 'quadriceps',
    label: 'Cuádriceps',
    paths: [
      // Pierna izq — vasto lateral
      'M 186 290 C 194 308 196 358 190 408 C 186 432 180 444 174 438 C 172 395 178 338 182 298 C 184 292 186 290 186 290 Z',
      // Pierna izq — recto femoral
      'M 182 290 C 176 328 172 378 170 416 C 176 424 184 420 188 396 C 190 352 188 312 182 290 Z',
      // Pierna izq — vasto medial
      'M 166 316 C 162 350 164 386 172 410 C 178 403 180 376 176 343 C 172 318 168 308 166 316 Z',
      // Pierna der — vasto lateral
      'M 214 290 C 206 308 204 358 210 408 C 214 432 220 444 226 438 C 228 395 222 338 218 298 C 216 292 214 290 214 290 Z',
      // Pierna der — recto femoral
      'M 218 290 C 224 328 228 378 230 416 C 224 424 216 420 212 396 C 210 352 212 312 218 290 Z',
      // Pierna der — vasto medial
      'M 234 316 C 238 350 236 386 228 410 C 222 403 220 376 224 343 C 228 318 232 308 234 316 Z',
    ],
    fibers: [
      'M 178 302 L 184 388',
      'M 188 308 L 186 395',
      'M 210 302 L 216 388',
      'M 220 308 L 212 395',
    ],
  },
  {
    id: 'obliques',
    label: 'Oblicuos',
    paths: [
      'M 154 212 C 164 206 176 204 182 208 C 184 238 180 262 168 268 C 156 262 150 238 154 212 Z',
      'M 246 212 C 236 206 224 204 218 208 C 216 238 220 262 232 268 C 244 262 250 238 246 212 Z',
    ],
    fibers: ['M 160 218 L 172 258', 'M 240 218 L 228 258'],
  },
  {
    id: 'abs',
    label: 'Abdominales',
    paths: [
      'M 188 208 C 200 206 212 208 C 214 218 212 222 C 200 224 188 222 C 186 218 188 208 Z',
      'M 188 222 C 200 220 212 222 C 214 232 212 236 C 200 238 188 236 C 186 232 188 222 Z',
      'M 188 236 C 200 234 212 236 C 214 246 212 250 C 200 252 188 250 C 186 246 188 236 Z',
      'M 188 250 C 200 248 212 250 C 214 260 212 264 C 200 266 188 264 C 186 260 188 250 Z',
    ],
    fibers: ['M 200 210 L 200 262'],
  },
  {
    id: 'lower-chest',
    label: 'Pectoral inferior',
    paths: [
      // Abanico esternal izq — porción inferior
      'M 200 158 C 188 160 176 166 170 178 C 166 190 170 202 180 208 C 190 210 198 200 200 188 C 200 174 200 158 200 158 Z',
      // Abanico esternal der
      'M 200 158 C 212 160 224 166 230 178 C 234 190 230 202 220 208 C 210 210 202 200 200 188 C 200 174 200 158 200 158 Z',
    ],
    fibers: [
      'M 182 168 Q 190 188 196 200',
      'M 218 168 Q 210 188 204 200',
    ],
  },
  {
    id: 'upper-chest',
    label: 'Pectoral superior',
    paths: [
      // Cabeza clavicular izq — abanico desde clavícula
      'M 200 126 C 186 124 174 128 168 136 C 162 144 164 154 174 158 C 184 160 194 150 198 140 C 200 132 200 126 200 126 Z',
      // Cabeza clavicular der
      'M 200 126 C 214 124 226 128 232 136 C 238 144 236 154 226 158 C 216 160 206 150 202 140 C 200 132 200 126 200 126 Z',
    ],
    fibers: [
      'M 176 132 Q 188 142 194 152',
      'M 224 132 Q 212 142 206 152',
    ],
  },
  {
    id: 'biceps',
    label: 'Bíceps',
    paths: [
      'M 100 162 C 70 164 40 162 28 158 L 26 168 C 42 176 68 178 92 174 C 104 170 106 166 100 162 Z',
      'M 300 162 C 330 164 360 162 372 158 L 374 168 C 358 176 332 178 308 174 C 296 170 294 166 300 162 Z',
    ],
    fibers: ['M 88 164 Q 58 166 34 162', 'M 312 164 Q 342 166 366 162'],
  },
  {
    id: 'front-deltoid',
    label: 'Deltoides anterior',
    paths: [
      'M 148 126 C 126 132 108 146 100 162 C 108 168 122 160 136 146 C 142 134 146 128 148 126 Z',
      'M 252 126 C 274 132 292 146 300 162 C 292 168 278 160 264 146 C 258 134 254 128 252 126 Z',
    ],
    fibers: ['M 132 138 L 108 158', 'M 268 138 L 292 158'],
  },
]

export const backMuscles: MuscleAnatomy[] = [
  {
    id: 'calves',
    label: 'Pantorrillas',
    paths: [
      'M 170 460 C 164 476 162 496 168 510 C 176 516 186 510 190 494 C 192 478 186 464 170 460 Z',
      'M 230 460 C 236 476 238 496 232 510 C 224 516 214 510 210 494 C 208 478 214 464 230 460 Z',
    ],
    fibers: ['M 176 468 L 180 502', 'M 224 468 L 220 502'],
  },
  {
    id: 'hamstrings',
    label: 'Isquiotibiales',
    paths: [
      // Izq — bíceps femoral (lateral)
      'M 180 316 C 172 358 168 408 172 448 C 176 462 184 466 190 456 C 194 418 198 368 196 322 C 192 316 186 314 180 316 Z',
      // Izq — semitendinoso (medial)
      'M 174 316 C 166 352 162 398 166 438 C 170 452 178 456 184 446 C 186 408 188 358 186 322 C 182 316 178 314 174 316 Z',
      // Der — bíceps femoral
      'M 220 316 C 228 358 232 408 228 448 C 224 462 216 466 210 456 C 206 418 202 368 204 322 C 208 316 214 314 220 316 Z',
      // Der — semitendinoso
      'M 226 316 C 234 352 238 398 234 438 C 230 452 222 456 216 446 C 214 408 212 358 214 322 C 218 316 222 314 226 316 Z',
    ],
    fibers: ['M 182 328 L 178 420', 'M 190 332 L 186 415', 'M 218 328 L 222 420', 'M 210 332 L 214 415'],
  },
  {
    id: 'glutes',
    label: 'Glúteos',
    paths: [
      'M 168 270 C 160 292 166 314 184 322 C 196 318 200 294 196 276 C 188 270 176 268 168 270 Z',
      'M 232 270 C 240 292 234 314 216 322 C 204 318 200 294 204 276 C 212 270 224 268 232 270 Z',
    ],
    fibers: ['M 178 282 Q 186 302 188 312', 'M 222 282 Q 214 302 212 312'],
  },
  {
    id: 'lats',
    label: 'Dorsales',
    paths: [
      'M 154 170 C 148 210 152 248 162 258 L 198 262 L 200 168 C 182 166 164 168 154 170 Z',
      'M 246 170 C 252 210 248 248 238 258 L 202 262 L 200 168 C 218 166 236 168 246 170 Z',
    ],
    fibers: ['M 168 182 Q 158 220 164 248', 'M 232 182 Q 242 220 236 248'],
  },
  {
    id: 'trapezius',
    label: 'Trapecio',
    paths: ['M 168 116 L 232 116 L 250 146 L 200 176 L 150 146 Z'],
    fibers: ['M 200 122 L 200 168', 'M 178 128 L 200 148 L 222 128'],
  },
  {
    id: 'triceps',
    label: 'Tríceps',
    paths: [
      'M 100 162 C 68 160 38 158 28 158 L 26 168 C 40 174 66 176 94 174 C 106 170 104 166 100 162 Z',
      'M 300 162 C 332 160 362 158 372 158 L 374 168 C 360 174 334 176 306 174 C 294 170 296 166 300 162 Z',
    ],
    fibers: ['M 88 164 L 32 160', 'M 312 164 L 368 160'],
  },
  {
    id: 'rear-deltoid',
    label: 'Deltoides posterior',
    paths: [
      'M 148 126 C 126 132 108 146 100 162 C 108 168 122 160 136 146 C 142 134 146 128 148 126 Z',
      'M 252 126 C 274 132 292 146 300 162 C 292 168 278 160 264 146 C 258 134 254 128 252 126 Z',
    ],
    fibers: ['M 132 138 L 108 158', 'M 268 138 L 292 158'],
  },
]

export function getMusclesForView(view: BodyView): MuscleAnatomy[] {
  return view === 'front' ? frontMuscles : backMuscles
}

export function getMuscleById(view: BodyView, id: string): MuscleAnatomy | undefined {
  return getMusclesForView(view).find((m) => m.id === id)
}
