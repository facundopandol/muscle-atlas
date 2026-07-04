import type { MuscleDetailConfig } from '../types'

/** Paths en coordenadas relativas al crop MuscleMap (origen = esquina del regionBox). */
export const muscleDetailMap = new Map<string, MuscleDetailConfig>([
  [
    'biceps',
    {
      muscleId: 'biceps',
      title: 'Bíceps braquial',
      subtitle: 'Haz clic en cada cabeza del brazo',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 340,
      heads: [
        {
          id: 'biceps-long',
          name: 'Cabeza larga',
          description: 'Origen en el tubérculo supraglenoideo. Cruza el hombro y el codo.',
          howToTrain:
            'Prioriza curls con brazos detrás del cuerpo (curl inclinado, curl en banco inclinado) para estirar la cabeza larga. Los curls con agarre supino también la activan bien.',
          paths: [
            'M 120 370 C 118 400 120 430 128 460 C 135 490 145 498 148 475 C 145 430 140 390 132 372 Z',
          ],
          exerciseHints: ['Curl de bíceps', 'Curl inclinado', 'Curl concentrado'],
        },
        {
          id: 'biceps-short',
          name: 'Cabeza corta',
          description: 'Origen en el proceso coracoideo. Aporta el pico al flexionar el codo.',
          howToTrain:
            'Usa curls con codos adelantados (curl predicador, curl en banco Scott) para aislar la cabeza corta y maximizar el pico del bíceps.',
          paths: [
            'M 148 368 C 165 385 175 420 172 465 C 165 500 148 505 135 485 C 135 430 140 385 148 368 Z',
          ],
          exerciseHints: ['Curl predicador', 'Curl de bíceps', 'Curl martillo'],
        },
        {
          id: 'brachialis',
          name: 'Braquial',
          description: 'Bajo el bíceps. Pura flexión de codo, sin supinación.',
          howToTrain:
            'Curls con agarre neutro o martillo, y curls con barra Z. Mantén los codos fijos y evita balancear el torso.',
          paths: [
            'M 125 445 C 120 465 128 490 148 500 C 170 495 178 475 172 455 C 160 442 138 440 125 445 Z',
          ],
          exerciseHints: ['Curl martillo', 'Curl de bíceps'],
        },
      ],
    },
  ],
  [
    'triceps',
    {
      muscleId: 'triceps',
      title: 'Tríceps',
      subtitle: 'Haz clic en cada cabeza del brazo',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 331.5,
      heads: [
        {
          id: 'triceps-long',
          name: 'Cabeza larga',
          description: 'Única cabeza que cruza el hombro. Origen en el tubérculo infraglenoideo.',
          howToTrain:
            'Press francés, extensiones por encima de la cabeza y fondos en paralelas con torso vertical. Los movimientos con brazo elevado estiran y activan más la cabeza larga.',
          paths: [
            'M 100 378 C 95 420 98 470 108 510 C 120 530 135 520 140 480 C 138 430 128 385 115 375 Z',
          ],
          exerciseHints: ['Press francés', 'Extensiones en polea'],
        },
        {
          id: 'triceps-lateral',
          name: 'Cabeza lateral',
          description: 'Cara externa del brazo. Aporta la línea lateral del tríceps.',
          howToTrain:
            'Extensiones en polea con barra recta o cuerda, codos pegados al cuerpo. Empuja hacia abajo sin abrir los codos.',
          paths: [
            'M 135 375 C 155 395 168 440 165 490 C 155 545 140 565 125 530 C 120 480 125 420 135 375 Z',
          ],
          exerciseHints: ['Extensiones en polea', 'Press francés'],
        },
        {
          id: 'triceps-medial',
          name: 'Cabeza medial',
          description: 'Cara interna del brazo. Se activa en todo el rango, especialmente en extensión completa.',
          howToTrain:
            'Press de banca agarre cerrado, extensiones con agarre invertido y fondos con codos pegados. Enfócate en la extensión completa del codo.',
          paths: [
            'M 105 480 C 102 520 110 555 125 565 C 145 560 150 520 145 485 C 135 465 115 465 105 480 Z',
          ],
          exerciseHints: ['Press de banca agarre cerrado', 'Extensiones en polea'],
        },
      ],
    },
  ],
  [
    'forearms',
    {
      muscleId: 'forearms',
      title: 'Antebrazos',
      subtitle: 'Haz clic en cada zona del antebrazo',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 340,
      heads: [
        {
          id: 'forearm-flexors',
          name: 'Flexores',
          description: 'Cara interna del antebrazo. Flexión de muñeca y dedos.',
          howToTrain:
            'Curl de muñeca en pronación con barra o mancuernas, sobre un banco. Controla la bajada y evita rebotar.',
          paths: [
            'M 52 492 C 48 540 55 600 72 670 C 88 688 105 680 110 640 C 108 580 100 520 90 495 Z',
          ],
          exerciseHints: ['Curl de muñeca'],
        },
        {
          id: 'forearm-extensors',
          name: 'Extensores',
          description: 'Cara externa del antebrazo. Extensión de muñeca.',
          howToTrain:
            'Curl de muñeca inverso con barra. Agarre prono, codos apoyados en los muslos, sube y baja solo la muñeca.',
          paths: [
            'M 105 492 C 115 540 125 600 130 670 C 120 690 100 685 95 640 C 98 580 100 520 105 492 Z',
          ],
          exerciseHints: ['Curl de muñeca inverso'],
        },
        {
          id: 'brachioradialis',
          name: 'Braquiorradial',
          description: 'Músculo del borde externo del antebrazo, visible al flexionar con agarre neutro.',
          howToTrain:
            'Curls martillo y curl con agarre neutro. El brazo ligeramente adelantado aumenta su activación.',
          paths: [
            'M 90 488 C 85 520 88 550 100 565 C 130 558 140 530 135 500 C 125 488 105 485 90 488 Z',
          ],
          exerciseHints: ['Curl martillo'],
        },
      ],
    },
  ],
  [
    'quadriceps',
    {
      muscleId: 'quadriceps',
      title: 'Cuádriceps',
      subtitle: 'Haz clic en cada cabeza del muslo',
      overlayViewBox: '0 0 680 817',
      mirrorCenterX: 340,
      heads: [
        {
          id: 'quad-rectus',
          name: 'Recto femoral',
          description: 'Vientre central. Cruza cadera y rodilla. Extiende la pierna y flexiona la cadera.',
          howToTrain:
            'Sentadillas, extensiones de cuádriceps y zancadas. El recto femoral trabaja más con la cadera flexionada (sentadilla profunda, sissy squat).',
          paths: [
            'M 245 62 C 242 160 248 260 255 345 C 268 355 278 340 282 300 C 278 180 268 80 258 62 Z',
          ],
          exerciseHints: ['Sentadilla', 'Extensiones de cuádriceps', 'Zancadas'],
        },
        {
          id: 'quad-vastus-lateralis',
          name: 'Vasto lateral',
          description: 'Cara externa del muslo. Aporta la línea lateral del cuádriceps.',
          howToTrain:
            'Sentadillas con pies al ancho de hombros, prensa con pies bajos en la plataforma, extensiones de cuádriceps con pies ligeramente hacia fuera.',
          paths: [
            'M 275 65 C 282 170 288 270 292 340 C 285 355 272 352 265 320 C 268 200 272 100 275 65 Z',
          ],
          exerciseHints: ['Sentadilla', 'Prensa de piernas', 'Extensiones de cuádriceps'],
        },
        {
          id: 'quad-vastus-medialis',
          name: 'Vasto medial',
          description: 'Lágrima interna sobre la rodilla. Crucial para estabilidad patelar.',
          howToTrain:
            'Sentadillas profundas, extensiones de cuádriceps en el último 30° de extensión y zancadas búlgaras. Enfócate en extensión completa controlada.',
          paths: [
            'M 212 65 C 208 150 210 250 218 340 C 228 355 240 350 245 320 C 242 200 235 100 228 65 Z',
          ],
          exerciseHints: ['Sentadilla', 'Extensiones de cuádriceps'],
        },
      ],
    },
  ],
  [
    'hamstrings',
    {
      muscleId: 'hamstrings',
      title: 'Isquiotibiales',
      subtitle: 'Haz clic en cada cabeza del muslo posterior',
      overlayViewBox: '0 0 663 862',
      mirrorCenterX: 331.5,
      heads: [
        {
          id: 'ham-biceps-femoris',
          name: 'Bíceps femoral',
          description: 'Cabeza externa del isquio. Extiende la cadera y flexiona la rodilla.',
          howToTrain:
            'Peso muerto rumano, curl femoral y buenos días. Mantén la espalda neutra y siente el estiramiento en la parte posterior externa del muslo.',
          paths: [
            'M 268 218 C 275 300 280 385 288 460 C 298 485 302 465 298 420 C 292 330 285 260 278 218 Z',
          ],
          exerciseHints: ['Peso muerto rumano', 'Curl femoral'],
        },
        {
          id: 'ham-semitendinosus',
          name: 'Semitendinoso',
          description: 'Cabeza interna del isquio. Participa en flexión de rodilla y extensión de cadera.',
          howToTrain:
            'Curl femoral sentado o tumbado con pies hacia dentro, zancadas búlgaras y nordic curl asistido.',
          paths: [
            'M 188 215 C 182 300 186 380 195 460 C 210 485 228 478 235 440 C 230 340 225 260 220 215 Z',
          ],
          exerciseHints: ['Curl femoral', 'Peso muerto rumano'],
        },
        {
          id: 'ham-semimembranosus',
          name: 'Semimembranoso',
          description: 'Cabeza interna profunda. Estabiliza la rodilla en movimientos de bisagra.',
          howToTrain:
            'Peso muerto rumano con rodillas ligeramente flexionadas, curl femoral y sentadilla búlgara con torso inclinado.',
          paths: [
            'M 238 225 C 232 310 235 390 245 465 C 258 488 270 475 275 430 C 268 340 262 270 255 225 Z',
          ],
          exerciseHints: ['Peso muerto rumano', 'Curl femoral'],
        },
      ],
    },
  ],
])

export function getMuscleDetail(muscleId: string): MuscleDetailConfig | undefined {
  return muscleDetailMap.get(muscleId)
}

export function getDefaultHeadId(muscleId: string): string | null {
  const config = muscleDetailMap.get(muscleId)
  return config?.heads[0]?.id ?? null
}

export function hasClickableHeads(muscleId: string): boolean {
  const config = muscleDetailMap.get(muscleId)
  return Boolean(config && config.heads.length > 0)
}
