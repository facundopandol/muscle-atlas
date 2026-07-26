import type { MuscleDetailConfig } from '../types'

/** Paths en coordenadas relativas al crop MuscleMap (origen = esquina del regionBox). */
export const muscleDetailMap = new Map<string, MuscleDetailConfig>([
  [
    'biceps',
    {
      muscleId: 'biceps',
      title: 'Bíceps y braquial',
      subtitle: 'Brazo derecho del atlas. La luz sigue el contorno real del bíceps.',
      overlayViewBox: '620 340 180 280',
      mirrorCenterX: 700,
      bilateral: false,
      detailVisual: 'arm-front',
      heads: [
        {
          id: 'biceps-long',
          name: 'Cabeza larga',
          description:
            'Porción externa (lateral) del bíceps. Nace en el tubérculo supraglenoideo de la escápula y cruza el hombro. Da el “pico” lateral del brazo.',
          howToTrain:
            'Curls con el brazo detrás del cuerpo (curl inclinado) estiran más la cabeza larga. También curls con agarre un poco más cerrado.',
          // Paths no se usan en arm-front: el highlight clippea BICEPS_RIGHT del atlas.
          paths: [],
          exerciseHints: ['Curl inclinado', 'Curl concentrado', 'Curl de bíceps'],
        },
        {
          id: 'biceps-short',
          name: 'Cabeza corta',
          description:
            'Porción interna (medial) del bíceps. Nace en el proceso coracoideo. Aporta el pico interno al flexionar el codo.',
          howToTrain:
            'Curls con codos adelantados (banco Scott / predicador) aíslan mejor la cabeza corta. También curls con agarre un poco más abierto.',
          paths: [],
          exerciseHints: ['Curl en banco Scott', 'Curl en máquina Scott', 'Curl de bíceps'],
        },
        {
          id: 'brachialis',
          name: 'Braquial',
          description:
            'No es una cabeza del bíceps: es un músculo aparte debajo del bíceps. Solo flexiona el codo (sin supinar) y “empuja” el bíceps hacia afuera.',
          howToTrain:
            'Curl martillo (agarre neutro) y curls con barra Z. Codos fijos, sin balancear el torso.',
          paths: [],
          exerciseHints: ['Curl martillo'],
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
          exerciseHints: [
            'Press francés',
            'Extensión de tríceps por encima de la cabeza',
            'Fondos en paralelas',
          ],
        },
        {
          id: 'triceps-lateral',
          name: 'Cabeza lateral',
          description: 'Cara externa del brazo. Aporta la línea lateral del tríceps.',
          howToTrain:
            'Extensiones en polea con barra recta o cuerda, y patadas de tríceps. Codos pegados al cuerpo; empuja hacia abajo o atrás sin abrir los codos.',
          paths: [
            'M 135 375 C 155 395 168 440 165 490 C 155 545 140 565 125 530 C 120 480 125 420 135 375 Z',
          ],
          exerciseHints: ['Extensiones en polea', 'Patada de tríceps'],
        },
        {
          id: 'triceps-medial',
          name: 'Cabeza medial',
          description: 'Cara interna del brazo. Se activa en todo el rango, especialmente en extensión completa.',
          howToTrain:
            'Press cerrado y fondos en banco con codos pegados. Enfócate en la extensión completa del codo.',
          paths: [
            'M 105 480 C 102 520 110 555 125 565 C 145 560 150 520 145 485 C 135 465 115 465 105 480 Z',
          ],
          exerciseHints: ['Press cerrado', 'Fondos en banco'],
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
    'upper-chest',
    {
      muscleId: 'upper-chest',
      title: 'Pectoral clavicular',
      subtitle: 'Porción superior · fibras desde la clavícula',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [
        {
          id: 'upper-chest-press',
          name: 'Press inclinado',
          description: 'Fibras claviculares con empuje. El ángulo de 30–45° carga el pecho alto.',
          howToTrain:
            'Press inclinado con barra, mancuernas o máquina. Banco a 30–45°, codos a ~45° y empuje sin rebotar.',
          paths: [
            'M 230 285 C 210 290 195 305 190 325 C 195 345 215 355 240 348 C 255 335 260 305 250 290 Z',
          ],
          exerciseHints: [
            'Press inclinado',
            'Press inclinado en multipower',
            'Press inclinado en máquina',
          ],
        },
        {
          id: 'upper-chest-fly',
          name: 'Aperturas altas',
          description: 'Estiramiento y aducción del pecho clavicular. Más aislamiento que el press.',
          howToTrain:
            'Aperturas inclinadas. Mantén ligera flexión de codo y junta al pecho alto.',
          paths: [
            'M 195 300 C 175 315 165 340 175 360 C 195 375 225 370 240 350 C 235 325 215 305 195 300 Z',
          ],
          exerciseHints: ['Aperturas inclinadas'],
        },
        {
          id: 'upper-chest-dip',
          name: 'Fondos pecho',
          description: 'Empuje compuesto con torso inclinado. También trabaja pecho clavicular-esternal.',
          howToTrain:
            'Fondos en paralelas con torso inclinado hacia adelante. Baja hasta sentir estiramiento y empuja sin balanceo.',
          paths: [
            'M 225 340 C 205 350 195 370 205 390 C 225 400 250 390 255 365 C 250 350 240 340 225 340 Z',
          ],
          exerciseHints: ['Fondos en paralelas'],
        },
      ],
    },
  ],
  [
    'mid-chest',
    {
      muscleId: 'mid-chest',
      title: 'Pectoral esternal',
      subtitle: 'Porción central · fibras desde el esternón (el grueso del pecho)',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [
        {
          id: 'mid-chest-press',
          name: 'Press plano',
          description: 'Porción esternal/central. El press de banca plano carga el grueso del pecho.',
          howToTrain:
            'Press plano con barra o mancuernas. Codos a ~45°, baja al pecho y empuja sin rebotar.',
          paths: [
            'M 235 325 C 210 330 195 350 200 375 C 215 390 250 388 265 365 C 270 340 255 325 235 325 Z',
          ],
          exerciseHints: ['Press plano'],
        },
        {
          id: 'mid-chest-fly',
          name: 'Aperturas / cruces',
          description: 'Aislamiento de la porción esternal. Estira y junta las fibras centrales.',
          howToTrain:
            'Aperturas planas y cruces en polea media. Ligera flexión de codo y juntá al frente a la altura del pecho.',
          paths: [
            'M 200 340 C 180 355 175 380 190 400 C 215 410 250 400 260 375 C 250 350 225 340 200 340 Z',
          ],
          exerciseHints: ['Aperturas planas', 'Cruces en polea media'],
        },
      ],
    },
  ],
  [
    'lower-chest',
    {
      muscleId: 'lower-chest',
      title: 'Pectoral costal',
      subtitle: 'Porción inferior · hacia las costillas',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [
        {
          id: 'lower-chest-press',
          name: 'Press declive',
          description: 'Porción costal. Ángulos en declive enfatizan el pecho bajo.',
          howToTrain:
            'Press en declive con barra, mancuernas o máquina. Codos a ~45° y empuje controlado.',
          paths: [
            'M 235 365 C 210 370 195 390 200 415 C 215 430 245 428 260 410 C 265 385 255 365 235 365 Z',
          ],
          exerciseHints: ['Press en declive', 'Press en declive en máquina'],
        },
        {
          id: 'lower-chest-fly',
          name: 'Cruces bajos',
          description: 'Aducción hacia abajo y adelante. Estira la porción costal del pectoral.',
          howToTrain:
            'Cruces en polea alta hacia abajo. Junta las manos abajo-adelante manteniendo pecho alto.',
          paths: [
            'M 200 380 C 180 395 175 420 190 440 C 215 450 245 440 255 415 C 245 390 220 380 200 380 Z',
          ],
          exerciseHints: ['Cruces en polea baja'],
        },
        {
          id: 'lower-chest-stretch',
          name: 'Fondos y pullover',
          description: 'Estiramiento largo del pectoral y empuje compuesto con torso inclinado.',
          howToTrain:
            'Fondos con torso inclinado y pullover con mancuerna. En el pullover baja detrás de la cabeza con codos semiflexionados.',
          paths: [
            'M 230 405 C 210 415 205 440 220 455 C 245 460 270 445 270 420 C 255 405 240 400 230 405 Z',
          ],
          exerciseHints: ['Fondos en paralelas', 'Pullover con mancuerna'],
        },
      ],
    },
  ],
  [
    'front-deltoid',
    {
      muscleId: 'front-deltoid',
      title: 'Deltoides anterior',
      subtitle: 'Haz clic en cada zona del hombro frontal',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [
        {
          id: 'front-delt-press',
          name: 'Press overhead',
          description: 'Empuje vertical. El deltoides anterior es el motor principal del press militar.',
          howToTrain:
            'Press militar sentado o de pie, Press Arnold y push press. Core firme, sin arquear la lumbar.',
          paths: [
            'M 145 340 C 120 350 105 375 110 400 C 130 415 160 405 170 380 C 165 355 155 340 145 340 Z',
          ],
          exerciseHints: ['Press militar', 'Press Arnold', 'Press militar de pie', 'Push press'],
        },
        {
          id: 'front-delt-raise',
          name: 'Elevaciones frontales',
          description: 'Aislamiento del deltoides anterior. Elevación del brazo al frente.',
          howToTrain:
            'Elevaciones frontales con mancuernas, polea o barra. Subí hasta la altura de los hombros sin balancear el torso.',
          paths: [
            'M 165 360 C 145 375 140 400 155 420 C 180 430 200 410 195 385 C 185 365 175 355 165 360 Z',
          ],
          exerciseHints: ['Elevaciones frontales', 'Elevaciones frontales con barra'],
        },
      ],
    },
  ],
  [
    'side-deltoid',
    {
      muscleId: 'side-deltoid',
      title: 'Deltoides lateral',
      subtitle: 'Haz clic en cada zona del hombro lateral',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [
        {
          id: 'side-delt-raise',
          name: 'Elevaciones laterales',
          description: 'Cabeza media del deltoides. Da el ancho de hombros visto de frente.',
          howToTrain:
            'Elevaciones laterales con mancuernas o polea. Subí hasta casi paralelo al suelo, meñique ligeramente arriba, sin encoger trapecios.',
          paths: [
            'M 195 270 C 175 275 160 295 165 320 C 180 340 210 335 220 310 C 215 285 205 270 195 270 Z',
          ],
          exerciseHints: ['Elevaciones laterales', 'Elevaciones laterales en polea'],
        },
        {
          id: 'side-delt-upright',
          name: 'Remo al mentón / máquina',
          description: 'Empuje o tirón vertical que también carga la cabeza media.',
          howToTrain:
            'Remo al mentón con agarre amplio y elevaciones en máquina. Codos altos, sin tirar con la lumbar.',
          paths: [
            'M 210 300 C 190 310 185 335 200 355 C 225 365 245 345 240 320 C 230 300 220 295 210 300 Z',
          ],
          exerciseHints: ['Remo al mentón amplio', 'Elevaciones laterales en máquina'],
        },
      ],
    },
  ],
  [
    'rear-deltoid',
    {
      muscleId: 'rear-deltoid',
      title: 'Deltoides posterior',
      subtitle: 'Haz clic en cada zona del hombro posterior',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 332,
      heads: [
        {
          id: 'rear-delt-fly',
          name: 'Aperturas posteriores',
          description: 'Aislamiento del deltoides posterior. Equilibra el pecho y mejora la postura.',
          howToTrain:
            'Pájaros con mancuernas, polea o máquina, y elevaciones posteriores en banco inclinado. Espalda plana y escápulas controladas.',
          paths: [
            'M 200 275 C 180 285 170 310 180 335 C 200 350 230 340 235 310 C 225 285 210 275 200 275 Z',
          ],
          exerciseHints: ['Pájaros / aperturas posteriores', 'Elevaciones posteriores en banco inclinado'],
        },
        {
          id: 'rear-delt-face-pull',
          name: 'Face pull',
          description: 'Tirón a la cara con rotación externa. Deltoides posterior + manguito rotador.',
          howToTrain:
            'Face pull con cuerda a la altura del rostro. Separá las manos al final, codos altos y escápulas juntas.',
          paths: [
            'M 215 300 C 195 315 190 340 205 360 C 230 370 255 350 250 320 C 240 300 225 295 215 300 Z',
          ],
          exerciseHints: ['Face pull'],
        },
        {
          id: 'rear-delt-row',
          name: 'Remo alto',
          description: 'Tirones horizontales con codos abiertos. Trabaja posterior y espalda media.',
          howToTrain:
            'Remo invertido, remo en polea agarre amplio y remo a un brazo. Tirás al pecho alto llevando los codos atrás.',
          paths: [
            'M 225 320 C 205 335 205 365 225 380 C 250 385 270 360 260 335 C 245 320 235 315 225 320 Z',
          ],
          exerciseHints: [
            'Remo invertido',
            'Remo en polea agarre amplio',
            'Remo a un brazo inclinado',
          ],
        },
      ],
    },
  ],
  [
    'lats',
    {
      muscleId: 'lats',
      title: 'Dorsales',
      subtitle: 'Haz clic en cada zona de la espalda ancha',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 332,
      heads: [
        {
          id: 'lats-vertical',
          name: 'Jalón vertical',
          description: 'Tracción de arriba hacia el pecho. Da ancho al dorsal.',
          howToTrain:
            'Dominadas y jalón al pecho (prono o supino). Pecho alto, tirás los codos hacia abajo y atrás.',
          paths: [
            'M 175 160 C 160 200 165 250 180 280 C 210 290 245 270 250 230 C 245 180 210 155 175 160 Z',
          ],
          exerciseHints: ['Dominadas', 'Jalón al pecho', 'Jalón al pecho agarre supino'],
        },
        {
          id: 'lats-row',
          name: 'Remo horizontal',
          description: 'Tracción al torso. Grosor de espalda y dorsal medio.',
          howToTrain:
            'Remo con barra, remo en polea y remo a un brazo. Espalda neutra y tirás al abdomen/costado.',
          paths: [
            'M 190 220 C 175 255 180 300 200 330 C 230 340 260 315 255 275 C 250 240 220 215 190 220 Z',
          ],
          exerciseHints: ['Remo con barra', 'Remo en polea', 'Remo con mancuerna a un brazo'],
        },
        {
          id: 'lats-pullover',
          name: 'Pullover',
          description: 'Aislamiento del dorsal con brazos casi rectos.',
          howToTrain:
            'Pullover en polea con brazos extendidos. El movimiento sale de los dorsales, no de los tríceps.',
          paths: [
            'M 210 250 C 195 275 200 310 220 330 C 245 335 265 310 255 280 C 245 255 225 245 210 250 Z',
          ],
          exerciseHints: ['Pullover en polea'],
        },
      ],
    },
  ],
  [
    'trapezius',
    {
      muscleId: 'trapezius',
      title: 'Trapecio',
      subtitle: 'Haz clic en cada zona del trapecio',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 332,
      heads: [
        {
          id: 'traps-upper',
          name: 'Trapecio superior',
          description: 'Elevación de escápulas. La “bola” entre cuello y hombro.',
          howToTrain:
            'Encogimientos con barra, mancuernas o máquina, y farmer walk. Elevá los hombros sin rotarlos.',
          paths: [
            'M 250 90 C 230 95 210 110 215 135 C 230 155 280 155 300 135 C 305 110 280 90 250 90 Z',
          ],
          exerciseHints: ['Encogimientos', 'Encogimientos en máquina', 'Farmer walk'],
        },
        {
          id: 'traps-mid',
          name: 'Trapecio medio',
          description: 'Retracción escapular. Espalda alta y postura.',
          howToTrain:
            'Remo al mentón, remo Pendlay y face pull. Tirás juntando escápulas con codos altos.',
          paths: [
            'M 255 130 C 235 145 230 175 250 195 C 280 205 320 190 325 160 C 315 135 285 125 255 130 Z',
          ],
          exerciseHints: ['Remo al mentón', 'Remo Pendlay', 'Face pull'],
        },
      ],
    },
  ],
  [
    'abs',
    {
      muscleId: 'abs',
      title: 'Abdominales',
      subtitle: 'Haz clic en cada zona del recto abdominal',
      overlayViewBox: '0 0 291 337',
      mirrorCenterX: 145.5,
      bilateral: false,
      heads: [
        {
          id: 'abs-upper',
          name: 'Abdomen alto',
          description: 'Flexión de tronco. Crunches y sit-ups cargan más la parte superior.',
          howToTrain:
            'Crunch en polea, crunch/sit-up en banco declinado. El movimiento sale de la cintura, sin tirar del cuello.',
          paths: [
            'M 120 40 C 110 45 105 70 115 95 C 130 110 160 105 170 80 C 165 50 145 35 120 40 Z',
          ],
          exerciseHints: [
            'Crunch en polea',
            'Sit-up en banco declinado',
            'Crunch en banco declinado',
          ],
        },
        {
          id: 'abs-lower',
          name: 'Abdomen bajo',
          description: 'Elevación de piernas y flexión de cadera con core estable.',
          howToTrain:
            'Elevación de piernas colgado y rodillas al pecho. Sin balanceo; el control sale del abdomen.',
          paths: [
            'M 125 100 C 115 115 115 150 130 175 C 150 185 175 170 175 140 C 170 115 150 100 125 100 Z',
          ],
          exerciseHints: ['Elevación de piernas colgado', 'Rodillas al pecho colgado'],
        },
        {
          id: 'abs-stability',
          name: 'Estabilidad',
          description: 'Anti-extensión. Mantener el tronco rígido bajo carga.',
          howToTrain:
            'Plancha frontal y ab wheel. Espalda neutra y solo avanzá lo que puedas controlar.',
          paths: [
            'M 130 160 C 120 175 125 210 145 230 C 170 235 190 210 180 180 C 170 160 150 155 130 160 Z',
          ],
          exerciseHints: ['Plancha frontal', 'Ab wheel'],
        },
      ],
    },
  ],
  [
    'obliques',
    {
      muscleId: 'obliques',
      title: 'Oblicuos',
      subtitle: 'Haz clic en cada zona lateral del tronco',
      overlayViewBox: '0 0 291 337',
      mirrorCenterX: 145.5,
      heads: [
        {
          id: 'obliques-rotate',
          name: 'Rotación',
          description: 'Giro del tronco. Oblicuos internos y externos en rotación.',
          howToTrain:
            'Russian twist, wood chop y bicicleta. Rotá desde el tronco, cadera lo más quieta posible.',
          paths: [
            'M 55 80 C 40 95 40 140 55 170 C 75 180 100 160 95 120 C 90 95 75 80 55 80 Z',
          ],
          exerciseHints: ['Russian twist', 'Wood chop con landmine', 'Bicicleta en el suelo'],
        },
        {
          id: 'obliques-lateral',
          name: 'Flexión lateral',
          description: 'Inclinación de lado. Plancha lateral y crunch oblicuo.',
          howToTrain:
            'Plancha lateral, crunch oblicuo en polea/suelo e inclinaciones. No gires de frente; el movimiento es de costado.',
          paths: [
            'M 70 120 C 55 140 55 185 75 210 C 100 220 125 195 115 155 C 105 130 90 120 70 120 Z',
          ],
          exerciseHints: [
            'Plancha lateral',
            'Crunch oblicuo en polea',
            'Crunch oblicuo en suelo',
            'Crunch oblicuo de pie en polea',
          ],
        },
      ],
    },
  ],
  [
    'glutes',
    {
      muscleId: 'glutes',
      title: 'Glúteos',
      subtitle: 'Haz clic en cada zona del glúteo',
      overlayViewBox: '0 0 663 862',
      mirrorCenterX: 332,
      heads: [
        {
          id: 'glutes-max',
          name: 'Glúteo mayor',
          description: 'Extensión de cadera. El motor principal de hip thrust y puentes.',
          howToTrain:
            'Hip thrust, puente de glúteos y peso muerto. Empujá la cadera arriba y apretá arriba 1 segundo.',
          paths: [
            'M 200 55 C 180 70 175 110 195 140 C 220 155 255 140 260 100 C 250 70 225 50 200 55 Z',
          ],
          exerciseHints: ['Hip thrust', 'Puente de glúteos', 'Peso muerto convencional'],
        },
        {
          id: 'glutes-med',
          name: 'Glúteo medio / abducción',
          description: 'Estabilidad de cadera y abducción. “Side booty”.',
          howToTrain:
            'Patada de glúteo y abducción de cadera en máquina. El movimiento sale de la cadera, sin arquear la lumbar.',
          paths: [
            'M 230 70 C 215 85 215 120 235 145 C 260 155 285 130 275 95 C 260 70 245 65 230 70 Z',
          ],
          exerciseHints: ['Patada de glúteo', 'Abducción de cadera en máquina'],
        },
        {
          id: 'glutes-uni',
          name: 'Unilateral',
          description: 'Una pierna a la vez. Equilibrio y transferencia a la vida real.',
          howToTrain:
            'Sentadilla búlgara y subida al cajón. Torso estable y empuje con el glúteo de la pierna de apoyo.',
          paths: [
            'M 210 110 C 195 125 200 160 225 175 C 250 180 270 155 255 125 C 240 110 225 105 210 110 Z',
          ],
          exerciseHints: ['Sentadilla búlgara', 'Subida al cajón con barra'],
        },
      ],
    },
  ],
  [
    'calves',
    {
      muscleId: 'calves',
      title: 'Pantorrillas',
      subtitle: 'Haz clic en cada zona de la pantorrilla',
      overlayViewBox: '0 0 663 862',
      mirrorCenterX: 332,
      heads: [
        {
          id: 'calves-gastro',
          name: 'Gastrocnemio',
          description: 'Cabeza visible de la pantorrilla. Se enfatiza de pie, con rodilla extendida.',
          howToTrain:
            'Elevación de talones de pie, a una pierna y saltos. Rango completo: bajá el talón y subí al máximo.',
          paths: [
            'M 220 280 C 205 295 205 340 220 375 C 240 390 265 370 260 330 C 255 295 240 275 220 280 Z',
          ],
          exerciseHints: [
            'Elevación de talones de pie',
            'Elevación de talones a una pierna',
            'Saltos de pantorrilla',
          ],
        },
        {
          id: 'calves-soleus',
          name: 'Sóleo',
          description: 'Más profundo, bajo el gastrocnemio. Se enfatiza con rodilla flexionada.',
          howToTrain:
            'Elevación de talones sentado y en prensa. Rodillas flexionadas para priorizar el sóleo.',
          paths: [
            'M 230 320 C 215 340 220 385 240 410 C 260 420 280 390 270 350 C 260 325 245 315 230 320 Z',
          ],
          exerciseHints: ['Elevación de talones sentado', 'Elevación en prensa'],
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
