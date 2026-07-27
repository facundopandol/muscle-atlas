import type { MuscleDetailConfig, MuscleHead } from '../types'

function head(
  id: string,
  name: string,
  description: string,
  howToTrain: string,
  exerciseHints: string[] = [],
): MuscleHead {
  return { id, name, description, howToTrain, paths: [], exerciseHints }
}

/**
 * Detalle por músculo. Las `heads` alimentan la jerarquía de Explorar (cards).
 * Pecho y deltoides ya están partidos en músculos aparte → sin cabezas anidadas.
 */
export const muscleDetailMap = new Map<string, MuscleDetailConfig>([
  [
    'biceps',
    {
      muscleId: 'biceps',
      title: 'Bíceps y braquial',
      subtitle: 'Dos cabezas del bíceps más el braquial.',
      overlayViewBox: '620 340 180 280',
      mirrorCenterX: 700,
      bilateral: false,
      detailVisual: 'arm-front',
      heads: [
        head(
          'biceps-long',
          'Cabeza larga',
          'Porción externa (lateral). Nace en el tubérculo supraglenoideo y cruza el hombro. Da el “pico” lateral.',
          'Curls con el brazo detrás del cuerpo (curl inclinado) estiran más la cabeza larga. También curls con agarre un poco más cerrado.',
          ['Curl inclinado', 'Curl concentrado', 'Curl de bíceps'],
        ),
        head(
          'biceps-short',
          'Cabeza corta',
          'Porción interna (medial). Nace en el proceso coracoideo. Aporta el pico interno al flexionar el codo.',
          'Curls con codos adelantados (banco Scott / predicador). También curls con agarre un poco más abierto.',
          ['Curl en banco Scott', 'Curl en máquina Scott', 'Curl de bíceps'],
        ),
        head(
          'brachialis',
          'Braquial',
          'Músculo aparte debajo del bíceps. Solo flexiona el codo (sin supinar) y “empuja” el bíceps hacia afuera.',
          'Curl martillo (agarre neutro) y curls con barra Z. Codos fijos, sin balancear el torso.',
          ['Curl martillo'],
        ),
      ],
    },
  ],
  [
    'triceps',
    {
      muscleId: 'triceps',
      title: 'Tríceps',
      subtitle: 'Tres cabezas: larga, lateral y medial.',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 331.5,
      heads: [
        head(
          'triceps-long',
          'Cabeza larga',
          'La única que cruza el hombro. Nace en la escápula. Se estira más con el brazo por encima de la cabeza.',
          'Extensiones overhead y press francés. Codos altos, sin abrirlos.',
          [
            'Extensión de tríceps por encima de la cabeza',
            'Press francés',
          ],
        ),
        head(
          'triceps-lateral',
          'Cabeza lateral',
          'La “herradura” externa del brazo. Muy visible de perfil.',
          'Pushdowns, patadas y fondos con torso erguido. Extensión completa del codo.',
          ['Extensiones en polea', 'Patada de tríceps', 'Fondos en paralelas'],
        ),
        head(
          'triceps-medial',
          'Cabeza medial',
          'Más profunda, hacia el interior del codo. Aporta estabilidad en la extensión.',
          'Press cerrado y fondos en banco. Agarre estrecho, codos pegados al cuerpo.',
          ['Press cerrado', 'Fondos en banco'],
        ),
      ],
    },
  ],
  [
    'forearms',
    {
      muscleId: 'forearms',
      title: 'Antebrazos',
      subtitle: 'Flexores, extensores y braquiorradial.',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 340,
      heads: [
        head(
          'forearm-flexors',
          'Flexores',
          'Cara interna del antebrazo. Cierran la muñeca y refuerzan el agarre.',
          'Curl de muñeca con palmas arriba. Rango completo, sin soltar al final.',
          ['Curl de muñeca', 'Curl de muñeca en polea'],
        ),
        head(
          'forearm-extensors',
          'Extensores',
          'Cara externa. Abren la muñeca y equilibran el entrenamiento de flexores.',
          'Curl de muñeca inverso (palmas abajo).',
          [
            'Curl de muñeca inverso',
            'Curl de muñeca inverso con mancuerna',
            'Curl de muñeca inverso en polea',
          ],
        ),
        head(
          'brachioradialis',
          'Braquiorradial',
          'Borde radial del antebrazo. Flexiona el codo con agarre neutro.',
          'Curl martillo. Codos fijos, sin balanceo.',
          ['Curl martillo'],
        ),
      ],
    },
  ],
  [
    'upper-chest',
    {
      muscleId: 'upper-chest',
      title: 'Pectoral clavicular',
      subtitle: 'Porción superior · ya es una zona propia en Explorar.',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [],
    },
  ],
  [
    'mid-chest',
    {
      muscleId: 'mid-chest',
      title: 'Pectoral esternal',
      subtitle: 'Porción central · ya es una zona propia en Explorar.',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [],
    },
  ],
  [
    'lower-chest',
    {
      muscleId: 'lower-chest',
      title: 'Pectoral costal',
      subtitle: 'Porción inferior · ya es una zona propia en Explorar.',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [],
    },
  ],
  [
    'front-deltoid',
    {
      muscleId: 'front-deltoid',
      title: 'Deltoides anterior',
      subtitle: 'Cabeza anterior · ya es un músculo propio en Explorar.',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [],
    },
  ],
  [
    'side-deltoid',
    {
      muscleId: 'side-deltoid',
      title: 'Deltoides lateral',
      subtitle: 'Cabeza media · ya es un músculo propio en Explorar.',
      overlayViewBox: '0 0 680 729',
      mirrorCenterX: 342,
      heads: [],
    },
  ],
  [
    'rear-deltoid',
    {
      muscleId: 'rear-deltoid',
      title: 'Deltoides posterior',
      subtitle: 'Cabeza posterior · ya es un músculo propio en Explorar.',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 332,
      heads: [],
    },
  ],
  [
    'lats',
    {
      muscleId: 'lats',
      title: 'Dorsales',
      subtitle: 'Un músculo amplio; énfasis por movimiento, no por cabezas.',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 332,
      heads: [],
    },
  ],
  [
    'trapezius',
    {
      muscleId: 'trapezius',
      title: 'Trapecio',
      subtitle: 'Tres porciones: superior, media e inferior.',
      overlayViewBox: '0 0 663 750',
      mirrorCenterX: 332,
      heads: [
        head(
          'traps-upper',
          'Porción superior',
          'Desde la nuca hacia el hombro. Eleva la escápula.',
          'Encogimientos. Subí los hombros recto, sin rotar.',
          ['Encogimientos', 'Encogimientos en máquina', 'Remo al mentón'],
        ),
        head(
          'traps-middle',
          'Porción media',
          'Entre las escápulas. Retracción escapular.',
          'Remo Pendlay y face pulls con escápulas juntas al final.',
          ['Remo Pendlay', 'Face pull'],
        ),
        head(
          'traps-lower',
          'Porción inferior',
          'Hacia la mitad de la espalda. Deprime y estabiliza la escápula.',
          'Face pulls y carries con hombros abajo y atrás.',
          ['Face pull', 'Farmer walk'],
        ),
      ],
    },
  ],
  [
    'abs',
    {
      muscleId: 'abs',
      title: 'Abdominales',
      subtitle: 'Recto abdominal y énfasis superior / inferior / anti-extensión.',
      overlayViewBox: '0 0 291 337',
      mirrorCenterX: 145.5,
      bilateral: false,
      heads: [
        head(
          'abs-upper',
          'Recto superior',
          'Porción alta del recto abdominal. Flexión de tronco hacia abajo.',
          'Crunches y crunch en polea. El movimiento sale de la cintura, no del cuello.',
          ['Crunch en polea'],
        ),
        head(
          'abs-lower',
          'Recto inferior',
          'Porción baja. Elevación de pelvis / piernas.',
          'Elevación de piernas colgado o en máquina. Sin balanceo.',
          ['Elevación de piernas colgado'],
        ),
        head(
          'abs-deep',
          'Estabilidad / anti-extensión',
          'Trabajo isométrico y de control (transverso y recto juntos).',
          'Plancha y ab wheel. Espalda neutra, sin hundir la lumbar.',
          ['Plancha frontal', 'Ab wheel'],
        ),
      ],
    },
  ],
  [
    'obliques',
    {
      muscleId: 'obliques',
      title: 'Oblicuos',
      subtitle: 'Externos e internos · rotación y flexión lateral.',
      overlayViewBox: '0 0 291 337',
      mirrorCenterX: 145.5,
      heads: [
        head(
          'obliques-external',
          'Oblicuo externo',
          'Capa superficial. Rotación del tronco y flexión lateral.',
          'Crunches oblicuos, Russian twist y wood chop. Controlá el rango.',
          [
            'Crunch oblicuo en polea',
            'Russian twist',
            'Wood chop con landmine',
            'Crunch oblicuo en suelo',
            'Crunch oblicuo de pie en polea',
          ],
        ),
        head(
          'obliques-internal',
          'Oblicuo interno',
          'Capa más profunda. Trabaja junto al externo en rotación y estabilidad.',
          'Plancha lateral y rotaciones controladas; priorizá control sobre peso.',
          ['Plancha lateral', 'Bicicleta en el suelo', 'Russian twist'],
        ),
      ],
    },
  ],
  [
    'glutes',
    {
      muscleId: 'glutes',
      title: 'Glúteos',
      subtitle: 'Todos los ejercicios de glúteos en un solo listado.',
      overlayViewBox: '0 0 663 862',
      mirrorCenterX: 332,
      heads: [],
    },
  ],
  [
    'calves',
    {
      muscleId: 'calves',
      title: 'Pantorrillas',
      subtitle: 'Todos los ejercicios de pantorrillas en un solo listado.',
      overlayViewBox: '0 0 663 862',
      mirrorCenterX: 332,
      heads: [],
    },
  ],
  [
    'quadriceps',
    {
      muscleId: 'quadriceps',
      title: 'Cuádriceps',
      subtitle: 'Todos los ejercicios del cuádriceps en un solo listado.',
      overlayViewBox: '0 0 680 817',
      mirrorCenterX: 340,
      heads: [],
    },
  ],
  [
    'hamstrings',
    {
      muscleId: 'hamstrings',
      title: 'Isquiotibiales',
      subtitle: 'Todos los ejercicios de isquios en un solo listado.',
      overlayViewBox: '0 0 663 862',
      mirrorCenterX: 331.5,
      heads: [],
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

/** Solo diagrama de brazo (bíceps): cabezas clickeables sobre la imagen. */
export function hasClickableHeads(muscleId: string): boolean {
  const config = muscleDetailMap.get(muscleId)
  if (!config || config.heads.length === 0) return false
  return config.detailVisual === 'arm-front' || config.detailVisual === 'arm-back'
}
