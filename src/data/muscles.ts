import type { Muscle } from '../types'

export const muscles: Muscle[] = [
  {
    id: 'upper-chest',
    name: 'Pectoral superior',
    description: 'Fibra clavicular del pectoral mayor. Responde bien a ángulos inclinados.',
    view: 'front',
    exercises: [
      {
        name: 'Press inclinado',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'pectorals/dumbbell-incline-bench-press.gif',
            illustration: 'incline-press',
            formGuide:
              'Banco a 30-45°. Baja las mancuernas al pecho superior con codos a 45°. Empuja sin bloquear los codos arriba.',
            tip: 'Banco a 30-45°',
          },
          {
            equipment: 'barbell',
            gifFile: 'pectorals/barbell-incline-bench-press.gif',
            illustration: 'incline-press',
            formGuide:
              'Agarre ligeramente más ancho que los hombros. Baja la barra al pecho alto con control. Pies firmes en el suelo.',
          },
          {
            equipment: 'cable',
            gifFile: 'pectorals/cable-incline-bench-press.gif',
            illustration: 'incline-press',
            formGuide:
              'Banco inclinado entre poleas bajas. Empuja en arco convergente. Mantén tensión constante en todo el recorrido.',
          },
        ],
      },
      {
        name: 'Aperturas inclinadas',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'pectorals/dumbbell-incline-fly.gif',
            illustration: 'incline-fly',
            formGuide:
              'Ligera flexión de codo fija. Abre en arco amplio hasta sentir estiramiento. Junta arriba sin chocar las mancuernas.',
            tip: 'Mantén ligera flexión de codo',
          },
          {
            equipment: 'cable',
            gifFile: 'pectorals/cable-incline-fly.gif',
            illustration: 'incline-fly',
            formGuide:
              'Poleas bajas, banco inclinado. Abre los brazos siguiendo el ángulo del banco. Controla la fase excéntrica.',
          },
          {
            equipment: 'machine',
            gifFile: 'pectorals/lever-seated-fly.gif',
            illustration: 'incline-fly',
            formGuide:
              'Ajusta el asiento para que los brazos queden alineados con el pecho superior. Junta los agarres con control, sin rebotar.',
          },
        ],
      },
      {
        name: 'Fondos en paralelas',
        sets: '3',
        reps: '8-12',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'pectorals/chest-dip-on-dip-pull-up-cage.gif',
            illustration: 'dip',
            formGuide:
              'Inclina el torso hacia adelante para enfatizar el pecho. Baja hasta que los hombros queden bajo los codos. Empuja sin balanceo.',
          },
          {
            equipment: 'machine',
            gifFile: 'pectorals/assisted-chest-dip-kneeling.gif',
            illustration: 'dip',
            formGuide:
              'Máquina de fondos asistidos. Misma mecánica que en paralelas, con menos peso corporal. Ideal para progresar.',
          },
        ],
      },
      {
        name: 'Press inclinado en multipower',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'pectorals/smith-incline-bench-press.gif',
            illustration: 'incline-press',
            formGuide:
              'Banco inclinado bajo la barra guiada. Baja al pecho alto con codos a 45°. Empuja en línea recta sin despegar la espalda del banco.',
          },
          {
            equipment: 'machine',
            gifFile: 'pectorals/lever-incline-chest-press.gif',
            illustration: 'incline-press',
            formGuide:
              'Ajusta el asiento para alinear los agarres con el pecho superior. Empuja convergiendo ligeramente sin bloquear los codos.',
          },
        ],
      },
      {
        name: 'Cruces en polea media',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'pectorals/cable-middle-fly.gif',
            illustration: 'cable-fly',
            formGuide:
              'Poleas a la altura del pecho, paso adelante para estabilidad. Junta las manos al frente en arco amplio. Mantén ligera flexión de codo.',
          },
          {
            equipment: 'cable',
            gifFile: 'pectorals/cable-standing-fly.gif',
            illustration: 'cable-fly',
            formGuide:
              'De pie entre poleas medias. Abre y cierra los brazos con el pecho alto. Controla la fase excéntrica sin dejar que el peso te abra de golpe.',
          },
        ],
      },
      {
        name: 'Press inclinado en máquina',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'pectorals/lever-incline-chest-press.gif',
            illustration: 'incline-press',
            formGuide:
              'Espalda pegada al respaldo, banco a 30-45°. Empuja los agarres hacia arriba y adelante. Aprieta el pecho superior al final del recorrido.',
          },
        ],
      },
    ],
  },
  {
    id: 'lower-chest',
    name: 'Pectoral inferior',
    description: 'Porción esternal inferior. Se enfatiza con movimientos en declive.',
    view: 'front',
    exercises: [
      {
        name: 'Press en declive',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'pectorals/barbell-decline-bench-press.gif',
            illustration: 'decline-press',
            formGuide:
              'Asegura bien los pies. Baja la barra al pecho inferior con codos a 45°. Empuja en línea recta sin rebotar.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'pectorals/dumbbell-decline-fly.gif',
            illustration: 'decline-press',
            formGuide:
              'Mancuernas a la altura del pecho bajo. Empuja convergiendo ligeramente. Controla la bajada en 2-3 segundos.',
          },
        ],
      },
      {
        name: 'Aperturas / cruces',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'pectorals/cable-low-fly.gif',
            illustration: 'cable-fly',
            formGuide:
              'Poleas altas, paso adelante para estabilidad. Junta las manos abajo y adelante en arco. Pecho alto y core activo.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'pectorals/dumbbell-fly.gif',
            illustration: 'cable-fly',
            formGuide:
              'En banco plano o declive. Abre los brazos con codos semiflexionados. Siente el estiramiento en la parte baja del pecho.',
          },
          {
            equipment: 'machine',
            gifFile: 'pectorals/lever-seated-fly.gif',
            illustration: 'cable-fly',
            formGuide:
              'Pecho contra el respaldo. Empuja los brazos hacia el centro en arco. No dejes que el peso te abra de golpe.',
          },
        ],
      },
      {
        name: 'Fondos en paralelas',
        sets: '3',
        reps: '8-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'pectorals/assisted-chest-dip-kneeling.gif',
            illustration: 'dip',
            formGuide:
              'Torso ligeramente inclinado. Baja controlado y sube sin bloquear bruscamente. Activa el pecho inferior al empujar.',
          },
        ],
      },
      {
        name: 'Press plano con barra',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'pectorals/barbell-bench-press.gif',
            illustration: 'decline-press',
            formGuide:
              'Banco plano, agarre al ancho de hombros. Baja la barra al pecho con codos a 45°. Empuja en línea recta apretando el pecho al final.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'pectorals/dumbbell-bench-press.gif',
            illustration: 'decline-press',
            formGuide:
              'Mancuernas en banco plano. Baja hasta sentir estiramiento en el pecho. Empuja convergiendo sin perder control de los hombros.',
          },
        ],
      },
      {
        name: 'Pullover con mancuerna',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'pectorals/dumbbell-pullover.gif',
            illustration: 'cable-fly',
            formGuide:
              'Acostado en banco, mancuerna sujeta con ambas manos. Baja el peso detrás de la cabeza con codos semiflexionados. Sube en arco hasta el pecho.',
          },
        ],
      },
      {
        name: 'Press en declive en máquina',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'pectorals/lever-decline-chest-press.gif',
            illustration: 'decline-press',
            formGuide:
              'Ajusta el asiento para que los agarres queden a la altura del pecho inferior. Empuja sin bloquear los codos. Controla la bajada en 2-3 segundos.',
          },
        ],
      },
    ],
  },
  {
    id: 'front-deltoid',
    name: 'Deltoides anterior',
    description: 'Parte frontal del hombro. Clave en empujes verticales y frontales.',
    view: 'front',
    exercises: [
      {
        name: 'Press militar',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-seated-shoulder-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'Core apretado y glúteos activos. Empuja por encima de la cabeza sin arquear la espalda. Baja hasta la altura de las orejas.',
          },
          {
            equipment: 'barbell',
            gifFile: 'delts/barbell-seated-overhead-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'Pies al ancho de hombros. Barra desde el pecho alto, empuja vertical. Aprieta glúteos para proteger la lumbar.',
          },
          {
            equipment: 'machine',
            gifFile: 'delts/lever-shoulder-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'Espalda pegada al respaldo. Empuja sin bloquear los codos. Ajusta el asiento para que los agarres queden a la altura de los hombros.',
          },
        ],
      },
      {
        name: 'Elevaciones frontales',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-front-raise.gif',
            illustration: 'front-raise',
            formGuide:
              'Eleva al frente hasta la altura de los hombros. Evita balancear el cuerpo. Baja lento resistiendo la gravedad.',
          },
          {
            equipment: 'cable',
            gifFile: 'delts/cable-front-raise.gif',
            illustration: 'front-raise',
            formGuide:
              'Polea baja, de espaldas al aparato. Eleva con brazo recto o ligera flexión. Mantén el torso estable.',
          },
        ],
      },
      {
        name: 'Press Arnold',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-arnold-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'Inicia con palmas hacia ti a la altura del mentón. Rota las muñecas mientras empujas arriba. Invierte al bajar.',
          },
        ],
      },
      {
        name: 'Press militar de pie',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-standing-overhead-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'De pie con core firme. Empuja las mancuernas por encima de la cabeza sin arquear la lumbar. Baja hasta la altura de las orejas.',
          },
          {
            equipment: 'barbell',
            gifFile: 'delts/barbell-seated-overhead-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'Barra desde el pecho alto, de pie. Empuja vertical con glúteos y abdomen apretados. No uses impulso de las piernas.',
          },
        ],
      },
      {
        name: 'Elevaciones frontales con barra',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'delts/barbell-front-raise.gif',
            illustration: 'front-raise',
            formGuide:
              'Agarre al ancho de hombros, brazos casi rectos. Eleva la barra al frente hasta la altura de los hombros. Baja lento sin balancear.',
          },
        ],
      },
      {
        name: 'Push press',
        sets: '3',
        reps: '8-10',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-push-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'Flexiona ligeramente las rodillas y empuja el peso arriba usando impulso controlado de piernas. Bloquea arriba con brazos extendidos.',
          },
          {
            equipment: 'machine',
            gifFile: 'delts/lever-military-press.gif',
            illustration: 'overhead-press',
            formGuide:
              'En máquina de press militar. Empuja con fuerza desde el pecho alto. Mantén la espalda apoyada en el respaldo.',
          },
        ],
      },
    ],
  },
  {
    id: 'biceps',
    name: 'Bíceps braquial',
    description: 'Flexión de codo y supinación. Trabaja cabeza larga y corta.',
    view: 'front',
    exercises: [
      {
        name: 'Curl de bíceps',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'biceps/barbell-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Codos pegados al cuerpo. Sube la barra sin mover los codos adelante. Aprieta arriba 1 segundo y baja controlado.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-alternate-biceps-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Supina la muñeca al subir. Evita el impulso con la espalda. Alterna brazos con ritmo constante.',
          },
          {
            equipment: 'cable',
            gifFile: 'biceps/cable-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Polea baja, codos fijos a los costados. Flexiona hasta máxima contracción. La polea mantiene tensión en todo el recorrido.',
          },
        ],
      },
      {
        name: 'Curl en banco Scott',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'biceps/barbell-preacher-curl.gif',
            illustration: 'preacher-curl',
            formGuide:
              'Axilas apoyadas en el banco. Baja sin hiperextender el codo. Sube sin despegar los brazos del apoyo.',
            tip: 'Enfatiza la cabeza corta',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-preacher-curl.gif',
            illustration: 'preacher-curl',
            formGuide:
              'Un brazo a la vez en el banco Scott. Control total en la bajada. No uses impulso de la cadera.',
          },
        ],
      },
      {
        name: 'Curl martillo',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-hammer-curl.gif',
            illustration: 'hammer-curl',
            formGuide:
              'Agarre neutro (palmas enfrentadas). Sube sin rotar la muñeca. Trabaja bíceps y braquial anterior.',
          },
          {
            equipment: 'cable',
            gifFile: 'biceps/cable-hammer-curl-with-rope.gif',
            illustration: 'hammer-curl',
            formGuide:
              'Cuerda en polea baja, agarre neutro. Flexiona manteniendo los codos fijos. Aprieta arriba.',
          },
        ],
      },
      {
        name: 'Curl inclinado',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-incline-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Banco inclinado 45°, brazos colgando. Sube sin mover los codos adelante. Enfatiza la cabeza larga del bíceps.',
            tip: 'Estira bien la cabeza larga',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-prone-incline-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Pecho apoyado en banco inclinado. Flexiona con codos fijos detrás del cuerpo. Controla la bajada sin dejar caer el peso.',
          },
        ],
      },
      {
        name: 'Curl concentrado',
        sets: '3',
        reps: '12-15 por brazo',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-concentration-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Sentado, codo apoyado en el muslo interno. Sube la mancuerna sin balancear el torso. Aprieta el bíceps arriba 1 segundo.',
          },
          {
            equipment: 'cable',
            gifFile: 'biceps/cable-concentration-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Polea baja, inclinado con codo fijo contra la rodilla. Flexiona hasta máxima contracción. La polea mantiene tensión constante.',
          },
        ],
      },
      {
        name: 'Curl en máquina Scott',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'biceps/lever-preacher-curl.gif',
            illustration: 'preacher-curl',
            formGuide:
              'Brazos apoyados en el banco Scott de la máquina. Flexiona sin despegar los codos del apoyo. Baja lento hasta casi extender.',
          },
        ],
      },
    ],
  },
  {
    id: 'forearms',
    name: 'Antebrazos',
    description: 'Flexores, extensores y braquiorradial. Agarre y estabilidad de muñeca.',
    view: 'front',
    exercises: [
      {
        name: 'Curl de muñeca',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'forearms/barbell-wrist-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Antebrazos apoyados en los muslos, palmas arriba. Flexiona la muñeca subiendo la barra. Baja controlado sin soltar.',
            tip: 'Rango completo de movimiento',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'forearms/dumbbell-wrist-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Mancuerna en cada mano, antebrazos apoyados. Sube y baja solo la muñeca, codos quietos.',
          },
        ],
      },
      {
        name: 'Curl de muñeca inverso',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'forearms/barbell-reverse-wrist-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Palmas hacia abajo, antebrazos apoyados. Extiende la muñeca hacia arriba trabajando los extensores.',
          },
        ],
      },
      {
        name: 'Curl martillo',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'biceps/dumbbell-hammer-curl.gif',
            illustration: 'hammer-curl',
            formGuide:
              'Agarre neutro, codos fijos. Trabaja braquiorradial y antebrazo. Alterna o simultáneo.',
          },
        ],
      },
      {
        name: 'Curl de muñeca en polea',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'forearms/cable-wrist-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Sentado frente a polea baja, antebrazos apoyados en los muslos. Flexiona la muñeca subiendo el agarre. Baja controlado.',
          },
        ],
      },
      {
        name: 'Curl de muñeca inverso con mancuerna',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'forearms/dumbbell-reverse-wrist-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Antebrazos apoyados, palmas hacia abajo. Extiende la muñeca hacia arriba trabajando los extensores del antebrazo.',
          },
        ],
      },
      {
        name: 'Curl de muñeca inverso en polea',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'forearms/cable-reverse-wrist-curl.gif',
            illustration: 'bicep-curl',
            formGuide:
              'Polea baja con agarre prono. Flexiona la muñeca hacia arriba con antebrazos apoyados. Tensión constante en todo el recorrido.',
          },
        ],
      },
    ],
  },
  {
    id: 'abs',
    name: 'Abdominales',
    description: 'Recto abdominal. Controla la flexión de tronco y estabilidad.',
    view: 'front',
    exercises: [
      {
        name: 'Crunch en polea',
        sets: '4',
        reps: '12-20',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'abs/cable-kneeling-crunch.gif',
            illustration: 'cable-crunch',
            formGuide:
              'Arrodíllate frente a la polea. Flexiona el tronco llevando los codos hacia las rodillas. El movimiento sale de la cintura.',
          },
          {
            equipment: 'bodyweight',
            gifFile: 'abs/crunch-floor.gif',
            illustration: 'cable-crunch',
            formGuide:
              'Acostado, rodillas flexionadas. Eleva los hombros del suelo sin tirar del cuello. Exhala al subir.',
          },
          {
            equipment: 'machine',
            gifFile: 'abs/lever-seated-crunch.gif',
            illustration: 'cable-crunch',
            formGuide:
              'Ajusta la almohadilla a la altura del pecho. Flexiona el tronco contra la resistencia. Controla la vuelta.',
          },
        ],
      },
      {
        name: 'Elevación de piernas colgado',
        sets: '3',
        reps: '10-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/hanging-leg-raise.gif',
            illustration: 'hanging-leg-raise',
            formGuide:
              'Cuelga con hombros activos. Eleva las piernas sin balanceo. Baja sin perder tensión en el core.',
          },
          {
            equipment: 'machine',
            gifFile: 'abs/lever-seated-leg-raise-crunch.gif',
            illustration: 'hanging-leg-raise',
            formGuide:
              'En máquina de elevación de piernas sentado. Eleva las rodillas hacia el pecho. Espalda pegada al respaldo.',
          },
        ],
      },
      {
        name: 'Plancha frontal',
        sets: '3',
        reps: '30-60 s',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/front-plank-with-twist.gif',
            illustration: 'plank',
            formGuide:
              'Cuerpo en línea recta de cabeza a talones. Core y glúteos apretados. No dejes caer la cadera.',
          },
        ],
      },
      {
        name: 'Ab wheel',
        sets: '3',
        reps: '8-12',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/wheel-rollerout.gif',
            illustration: 'ab-wheel',
            formGuide:
              'Rodillas en el suelo al empezar. Rueda adelante con espalda neutra. Solo avanza lo que puedas controlar al volver.',
          },
        ],
      },
      {
        name: 'Sit-up en banco declinado',
        sets: '3',
        reps: '12-20',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/decline-sit-up.gif',
            illustration: 'cable-crunch',
            formGuide:
              'Pies anclados en banco declinado. Flexiona el tronco subiendo los hombros. Baja controlado sin dejar caer el peso de la cabeza.',
          },
        ],
      },
      {
        name: 'Crunch en banco declinado',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/decline-crunch.gif',
            illustration: 'cable-crunch',
            formGuide:
              'Banco declinado, manos cruzadas en el pecho. Eleva los hombros sin tirar del cuello. Exhala al subir y aprieta el abdomen.',
          },
        ],
      },
      {
        name: 'Rodillas al pecho colgado',
        sets: '3',
        reps: '10-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/hanging-oblique-knee-raise.gif',
            illustration: 'hanging-leg-raise',
            formGuide:
              'Cuelga con hombros activos. Lleva las rodillas al pecho sin balanceo. Baja lento manteniendo tensión en el core.',
          },
        ],
      },
    ],
  },
  {
    id: 'obliques',
    name: 'Oblicuos',
    description: 'Rotación y flexión lateral del tronco.',
    view: 'front',
    exercises: [
      {
        name: 'Crunch oblicuo en polea',
        sets: '3',
        reps: '12-15 por lado',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'abs/cable-standing-crunch.gif',
            illustration: 'oblique-crunch',
            formGuide:
              'De lado a la polea, tira llevando el codo hacia la cadera contraria. Gira desde el tronco, no solo con los brazos.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'abs/dumbbell-side-bend.gif',
            illustration: 'oblique-crunch',
            formGuide:
              'De pie, mancuerna en una mano. Inclínate lateralmente sin rotar el torso de frente. Subcontractilado del lado opuesto.',
          },
        ],
      },
      {
        name: 'Plancha lateral',
        sets: '3',
        reps: '30-45 s por lado',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/bodyweight-incline-side-plank.gif',
            illustration: 'side-plank',
            formGuide:
              'Codo bajo el hombro, cuerpo en línea recta lateral. Cadera elevada sin hundirse. Respira con control.',
          },
        ],
      },
      {
        name: 'Russian twist',
        sets: '3',
        reps: '16-20 total',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'abs/russian-twist.gif',
            illustration: 'russian-twist',
            formGuide:
              'Torso inclinado 45°. Rota el peso de lado a lado desde el tronco. Pies apoyados o elevados según tu nivel.',
          },
          {
            equipment: 'cable',
            gifFile: 'abs/cable-seated-twist.gif',
            illustration: 'russian-twist',
            formGuide:
              'Sentado frente a polea media. Rota el tronco llevando el agarre de lado a lado. Cadera quieta.',
          },
          {
            equipment: 'bodyweight',
            gifFile: 'abs/band-bicycle-crunch.gif',
            illustration: 'russian-twist',
            formGuide:
              'Sin peso extra. Mismas rotaciones controladas. Enfócate en la contracción oblicua en cada lado.',
          },
        ],
      },
      {
        name: 'Bicicleta en el suelo',
        sets: '3',
        reps: '20-30 total',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/band-bicycle-crunch.gif',
            illustration: 'bicycle-crunch',
            formGuide:
              'Manos detrás de la cabeza sin tirar del cuello. Lleva el codo al rodillo contrario. Extensión completa de la pierna que baja.',
          },
        ],
      },
      {
        name: 'Wood chop con landmine',
        sets: '3',
        reps: '12 por lado',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'abs/landmine-180.gif',
            illustration: 'oblique-crunch',
            formGuide:
              'Barra anclada en landmine. Rota el tronco llevando el peso de arriba a abajo en diagonal. La fuerza sale de los oblicuos, no de los brazos.',
          },
        ],
      },
      {
        name: 'Crunch oblicuo en suelo',
        sets: '3',
        reps: '15 por lado',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'abs/oblique-crunch-v-2.gif',
            illustration: 'oblique-crunch',
            formGuide:
              'Acostado, rodillas flexionadas a un lado. Eleva el hombro contrario hacia la rodilla. Aprieta el oblicuo en cada repetición.',
          },
        ],
      },
      {
        name: 'Crunch oblicuo de pie en polea',
        sets: '3',
        reps: '12-15 por lado',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'abs/cable-standing-crunch.gif',
            illustration: 'oblique-crunch',
            formGuide:
              'De lado a la polea alta. Flexiona el tronco llevando el codo hacia la cadera opuesta. Mantén la cadera quieta durante todo el movimiento.',
          },
        ],
      },
    ],
  },
  {
    id: 'quadriceps',
    name: 'Cuádriceps',
    description: 'Grupo frontal del muslo. Extensión de rodilla.',
    view: 'front',
    exercises: [
      {
        name: 'Sentadilla',
        sets: '4',
        reps: '6-10',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'quads/barbell-wide-squat.gif',
            illustration: 'squat',
            formGuide:
              'Barra en trapecio alto. Pies al ancho de hombros. Baja hasta muslos paralelos, rodillas en línea con los dedos.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'quads/dumbbell-goblet-squat.gif',
            illustration: 'squat',
            formGuide:
              'Mancuerna al pecho. Codos dentro. Baja manteniendo el torso erguido. Ideal para aprender el patrón de sentadilla.',
          },
          {
            equipment: 'machine',
            gifFile: 'quads/smith-chair-squat.gif',
            illustration: 'squat',
            formGuide:
              'Barra en multipower. Pies ligeramente adelantados. Baja con espalda apoyada en la barra guiada. Controla la subida.',
          },
        ],
      },
      {
        name: 'Prensa de piernas',
        sets: '4',
        reps: '10-15',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'quads/lever-alternate-leg-press.gif',
            illustration: 'leg-press',
            formGuide:
              'Pies al ancho de hombros en la plataforma. Baja hasta 90° sin despegar la lumbar. Empuja sin bloquear las rodillas.',
          },
        ],
      },
      {
        name: 'Extensión de cuádriceps',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'quads/lever-leg-extension.gif',
            illustration: 'leg-extension',
            formGuide:
              'Rodilla al borde del asiento. Extiende sin lanzar el peso. Pausa arriba y baja en 2 segundos.',
          },
        ],
      },
      {
        name: 'Zancadas',
        sets: '3',
        reps: '12 por pierna',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'glutes/dumbbell-lunge.gif',
            illustration: 'lunge',
            formGuide:
              'Paso largo, rodilla trasera casi al suelo. Torso erguido, rodilla delantera no pasa la punta del pie.',
          },
          {
            equipment: 'barbell',
            gifFile: 'quads/barbell-split-squat-v-2.gif',
            illustration: 'lunge',
            formGuide:
              'Barra en la espalda, paso adelante fijo. Baja vertical. Mantén el peso en el talón delantero.',
          },
        ],
      },
      {
        name: 'Sentadilla sissy',
        sets: '3',
        reps: '10-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'quads/sissy-squat.gif',
            illustration: 'squat',
            formGuide:
              'Inclínate hacia atrás manteniendo rodillas adelante. Baja hasta sentir estiramiento en cuádriceps. Sube apretando el muslo frontal.',
          },
        ],
      },
      {
        name: 'Subida al cajón',
        sets: '3',
        reps: '10 por pierna',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'glutes/dumbbell-step-up.gif',
            illustration: 'lunge',
            formGuide:
              'Cajón a la altura de la rodilla. Sube con todo el pie apoyado y empuja con el talón. Baja controlado sin impulso de la pierna trasera.',
          },
          {
            equipment: 'barbell',
            gifFile: 'glutes/barbell-step-up.gif',
            illustration: 'lunge',
            formGuide:
              'Barra en la espalda, sube al cajón con una pierna. Mantén el torso erguido. Alterna piernas con ritmo constante.',
          },
        ],
      },
      {
        name: 'Sentadilla overhead',
        sets: '3',
        reps: '8-10',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'quads/barbell-overhead-squat.gif',
            illustration: 'squat',
            formGuide:
              'Barra extendida sobre la cabeza con brazos bloqueados. Baja en sentadilla manteniendo el torso erguido. Core firme durante todo el recorrido.',
          },
        ],
      },
    ],
  },
  {
    id: 'rear-deltoid',
    name: 'Deltoides posterior',
    description: 'Parte trasera del hombro. Equilibra la postura y el empuje.',
    view: 'back',
    exercises: [
      {
        name: 'Pájaros / aperturas posteriores',
        sets: '4',
        reps: '12-15',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-rear-fly.gif',
            illustration: 'rear-fly',
            formGuide:
              'Inclinado con espalda plana. Abre los brazos en arco lateral hasta la altura de los hombros. Aprieta escápulas arriba.',
          },
          {
            equipment: 'cable',
            gifFile: 'delts/cable-standing-cross-over-high-reverse-fly.gif',
            illustration: 'rear-fly',
            formGuide:
              'Poleas cruzadas a la altura de los hombros. Abre los brazos hacia atrás. Mantén el pecho quieto.',
          },
          {
            equipment: 'machine',
            gifFile: 'delts/lever-seated-reverse-fly.gif',
            illustration: 'rear-fly',
            formGuide:
              'Pecho contra el apoyo. Empuja hacia atrás con codos semiflexionados. Controla la vuelta sin dejar caer el peso.',
          },
        ],
      },
      {
        name: 'Face pull',
        sets: '4',
        reps: '15-20',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'delts/cable-standing-face-pull.gif',
            illustration: 'face-pull',
            formGuide:
              'Cuerda a la altura del rostro. Tira hacia la frente separando las manos. Codos altos, escápulas juntas al final.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-rear-fly.gif',
            illustration: 'face-pull',
            formGuide:
              'Inclinado, brazos semiextendidos hacia atrás. Similar al pájaro pero con énfasis en rotación externa del hombro.',
          },
        ],
      },
      {
        name: 'Remo invertido',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'upper-back/inverted-row.gif',
            illustration: 'inverted-row',
            formGuide:
              'Cuerpo rígido como una tabla. Tira el pecho hacia las manos apretando escápulas. Baja sin hundir las caderas.',
          },
          {
            equipment: 'cable',
            gifFile: 'upper-back/cable-seated-row.gif',
            illustration: 'inverted-row',
            formGuide:
              'Variante sentado en polea alta. Tira al pecho con agarre amplio. Enfatiza deltoides posterior y trapecio medio.',
          },
        ],
      },
      {
        name: 'Elevaciones posteriores en banco inclinado',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-incline-rear-lateral-raise.gif',
            illustration: 'rear-fly',
            formGuide:
              'Pecho apoyado en banco inclinado. Abre los brazos lateralmente hasta la altura de los hombros. Aprieta escápulas arriba.',
          },
        ],
      },
      {
        name: 'Remo en polea agarre amplio',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'upper-back/cable-seated-wide-grip-row.gif',
            illustration: 'seated-row',
            formGuide:
              'Sentado con agarre amplio. Tira al pecho alto llevando los codos hacia atrás. Enfatiza deltoides posterior y espalda media.',
          },
        ],
      },
      {
        name: 'Remo a un brazo inclinado',
        sets: '3',
        reps: '12 por brazo',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'upper-back/dumbbell-one-arm-bent-over-row.gif',
            illustration: 'inverted-row',
            formGuide:
              'Inclinado con espalda plana, mano libre apoyada. Tira la mancuerna hacia la cadera apretando el deltoides posterior al final.',
          },
        ],
      },
    ],
  },
  {
    id: 'trapezius',
    name: 'Trapecio',
    description: 'Desde la nuca hasta la espalda media. Eleva y retrae escápulas.',
    view: 'back',
    exercises: [
      {
        name: 'Encogimientos',
        sets: '4',
        reps: '10-15',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'traps/barbell-shrug.gif',
            illustration: 'shrug',
            formGuide:
              'Barra al frente o detrás. Eleva los hombros recto hacia arriba, sin rotar. Pausa arriba y baja lento.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'traps/dumbbell-shrug.gif',
            illustration: 'shrug',
            formGuide:
              'De pie con mancuernas a los lados. Encoge solo los hombros. Evita hacer círculos con los hombros.',
          },
          {
            equipment: 'cable',
            gifFile: 'traps/cable-shrug.gif',
            illustration: 'shrug',
            formGuide:
              'Polea baja entre las piernas. Encoge los hombros hacia las orejas. Tensión constante en todo el recorrido.',
          },
        ],
      },
      {
        name: 'Remo al mentón',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'delts/barbell-upright-row.gif',
            illustration: 'upright-row',
            formGuide:
              'Agarre al ancho de hombros. Tira la barra cerca del cuerpo hasta el mentón. Codos siempre más altos que las muñecas.',
          },
          {
            equipment: 'cable',
            gifFile: 'delts/cable-upright-row.gif',
            illustration: 'upright-row',
            formGuide:
              'Barra en polea baja. Tira hacia el mentón con codos altos. No uses impulso de la espalda.',
          },
        ],
      },
      {
        name: 'Farmer walk',
        sets: '3',
        reps: '30-40 m',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'delts/dumbbell-single-arm-overhead-carry.gif',
            illustration: 'farmer-walk',
            formGuide:
              'Pesos pesados a los lados. Hombros atrás y abajo, core firme. Camina con pasos cortos y controlados.',
          },
          {
            equipment: 'barbell',
            gifFile: 'traps/barbell-shrug.gif',
            illustration: 'farmer-walk',
            formGuide:
              'Usa la barra como carga para caminar (trap bar si está disponible). Postura erguida, pasos firmes.',
          },
        ],
      },
      {
        name: 'Encogimientos en máquina',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'traps/lever-shrug.gif',
            illustration: 'shrug',
            formGuide:
              'Hombros bajo las almohadillas de la máquina. Eleva los hombros recto hacia arriba. Pausa arriba y baja lento.',
          },
        ],
      },
      {
        name: 'Remo Pendlay',
        sets: '4',
        reps: '6-8',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'upper-back/barbell-pendlay-row.gif',
            illustration: 'barbell-row',
            formGuide:
              'Barra en el suelo entre repeticiones. Torso paralelo al suelo. Tira explosivo al abdomen y baja la barra con control.',
          },
        ],
      },
      {
        name: 'Face pull',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'delts/cable-standing-face-pull.gif',
            illustration: 'face-pull',
            formGuide:
              'Cuerda a la altura del rostro. Tira hacia la frente separando las manos. Codos altos, escápulas juntas al final del recorrido.',
          },
        ],
      },
    ],
  },
  {
    id: 'lats',
    name: 'Dorsales',
    description: 'Anchura de espalda. Tracción vertical y horizontal.',
    view: 'back',
    exercises: [
      {
        name: 'Dominadas',
        sets: '4',
        reps: '6-12',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'lats/pull-up.gif',
            illustration: 'pull-up',
            formGuide:
              'Agarre más ancho que los hombros. Activa escápulas al iniciar. Sube hasta que la barbilla pase la barra sin balanceo.',
          },
          {
            equipment: 'machine',
            gifFile: 'lats/assisted-pull-up.gif',
            illustration: 'pull-up',
            formGuide:
              'Máquina de dominadas asistidas. Misma técnica que la dominada libre, con menos carga. Baja controlado.',
          },
        ],
      },
      {
        name: 'Jalón al pecho',
        sets: '4',
        reps: '10-12',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'lats/cable-bar-lateral-pulldown.gif',
            illustration: 'lat-pulldown',
            formGuide:
              'Pecho alto, ligera inclinación atrás. Tira la barra al pecho alto llevando los codos hacia abajo.',
          },
          {
            equipment: 'machine',
            gifFile: 'lats/reverse-grip-machine-lat-pulldown.gif',
            illustration: 'lat-pulldown',
            formGuide:
              'Agarre supino en la máquina. Tira al pecho apretando dorsales. Controla la subida sin soltar tensión.',
          },
        ],
      },
      {
        name: 'Remo con barra',
        sets: '4',
        reps: '8-10',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'upper-back/barbell-bent-over-row.gif',
            illustration: 'barbell-row',
            formGuide:
              'Bisagra de cadera con espalda neutra. Tira la barra al ombligo apretando escápulas. No redondees la espalda.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'upper-back/dumbbell-bent-over-row.gif',
            illustration: 'barbell-row',
            formGuide:
              'Inclinado con espalda plana. Tira la mancuerna al costado. Codo pegado al cuerpo al subir.',
          },
          {
            equipment: 'cable',
            gifFile: 'upper-back/cable-one-arm-bent-over-row.gif',
            illustration: 'barbell-row',
            formGuide:
              'Polea baja, inclinado. Tira el agarre hacia la cadera. Mantén el torso quieto.',
          },
        ],
      },
      {
        name: 'Remo en polea',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'upper-back/cable-low-seated-row.gif',
            illustration: 'seated-row',
            formGuide:
              'Pecho erguido, sin balancear el torso. Tira el agarre al abdomen. Aprieta 1 segundo al final.',
          },
          {
            equipment: 'machine',
            gifFile: 'upper-back/lever-seated-row.gif',
            illustration: 'seated-row',
            formGuide:
              'Pecho contra el apoyo. Tira los codos hacia atrás. Controla la fase excéntrica por completo.',
          },
        ],
      },
      {
        name: 'Jalón al pecho agarre supino',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'lats/cable-underhand-pulldown.gif',
            illustration: 'lat-pulldown',
            formGuide:
              'Agarre supino al ancho de hombros. Tira la barra al pecho alto llevando los codos hacia abajo. Aprieta dorsales al final.',
          },
        ],
      },
      {
        name: 'Pullover en polea',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'lats/cable-straight-arm-pulldown.gif',
            illustration: 'lat-pulldown',
            formGuide:
              'Brazos casi rectos, ligera flexión de codo fija. Empuja la barra hacia abajo en arco amplio. El movimiento sale de los dorsales, no de los tríceps.',
          },
        ],
      },
      {
        name: 'Remo con mancuerna a un brazo',
        sets: '3',
        reps: '10-12 por brazo',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'upper-back/dumbbell-one-arm-bent-over-row.gif',
            illustration: 'barbell-row',
            formGuide:
              'Rodilla y mano apoyadas en banco. Tira la mancuerna al costado apretando el dorsal. Codo pegado al cuerpo al subir.',
          },
        ],
      },
    ],
  },
  {
    id: 'triceps',
    name: 'Tríceps',
    description: 'Extensión de codo. Tres cabezas: larga, lateral y medial.',
    view: 'back',
    exercises: [
      {
        name: 'Press francés',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'triceps/barbell-lying-triceps-extension-skull-crusher.gif',
            illustration: 'skull-crusher',
            formGuide:
              'Brazos perpendiculares al suelo. Baja la barra hacia la frente flexionando solo los codos. Extiende sin mover los hombros.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'triceps/dumbbell-lying-triceps-extension.gif',
            illustration: 'skull-crusher',
            formGuide:
              'Mancuernas en agarre neutro. Baja a los lados de la cabeza. Los codos apuntan al techo sin abrirse.',
          },
        ],
      },
      {
        name: 'Extensiones en polea',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'triceps/cable-pushdown.gif',
            illustration: 'tricep-pushdown',
            formGuide:
              'Codos pegados al cuerpo. Empuja hacia abajo hasta extensión completa. No inclines el torso para ayudarte.',
          },
          {
            equipment: 'machine',
            gifFile: 'triceps/lever-triceps-extension.gif',
            illustration: 'tricep-pushdown',
            formGuide:
              'Ajusta el asiento para alinear el eje con el codo. Extiende sin despegar los brazos del apoyo.',
          },
        ],
      },
      {
        name: 'Fondos en banco',
        sets: '3',
        reps: '10-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'triceps/bench-dip-knees-bent.gif',
            illustration: 'bench-dip',
            formGuide:
              'Manos en el banco detrás de ti. Baja flexionando codos hacia atrás. Hombros abajo, no encogidos.',
          },
        ],
      },
      {
        name: 'Patada de tríceps',
        sets: '3',
        reps: '12-15 por brazo',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'triceps/dumbbell-kickback.gif',
            illustration: 'tricep-kickback',
            formGuide:
              'Inclinado con codo fijo a 90°. Extiende el antebrazo hacia atrás hasta línea recta. Aprieta el tríceps arriba.',
          },
          {
            equipment: 'cable',
            gifFile: 'triceps/cable-kickback.gif',
            illustration: 'tricep-kickback',
            formGuide:
              'Polea baja, inclinado hacia adelante. Extiende el brazo hacia atrás manteniendo el codo alto y fijo.',
          },
        ],
      },
      {
        name: 'Fondos en paralelas',
        sets: '3',
        reps: '8-12',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'triceps/triceps-dip.gif',
            illustration: 'bench-dip',
            formGuide:
              'Torso erguido para enfatizar tríceps. Baja hasta 90° en los codos. Empuja sin balanceo ni abrir los codos.',
          },
        ],
      },
      {
        name: 'Press cerrado',
        sets: '4',
        reps: '8-10',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'triceps/barbell-close-grip-bench-press.gif',
            illustration: 'skull-crusher',
            formGuide:
              'Agarre al ancho de hombros en banco plano. Baja la barra al pecho manteniendo los codos pegados al cuerpo. Empuja enfocando el tríceps.',
          },
        ],
      },
      {
        name: 'Extensión de tríceps por encima de la cabeza',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'triceps/dumbbell-standing-triceps-extension.gif',
            illustration: 'skull-crusher',
            formGuide:
              'De pie o sentado, mancuerna con ambas manos detrás de la cabeza. Extiende los codos sin mover los hombros. Baja controlado.',
          },
          {
            equipment: 'cable',
            gifFile: 'triceps/cable-incline-triceps-extension.gif',
            illustration: 'tricep-pushdown',
            formGuide:
              'Polea baja detrás de ti, inclinado hacia adelante. Extiende los brazos hacia adelante. Enfatiza la cabeza larga del tríceps.',
          },
        ],
      },
    ],
  },
  {
    id: 'glutes',
    name: 'Glúteos',
    description: 'Extensión de cadera y estabilidad pélvica.',
    view: 'back',
    exercises: [
      {
        name: 'Hip thrust',
        sets: '4',
        reps: '8-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'glutes/barbell-glute-bridge.gif',
            illustration: 'hip-thrust',
            formGuide:
              'Espalda alta en el banco, barra sobre la cadera. Empuja la cadera arriba apretando glúteos. Pausa arriba con rodillas a 90°.',
          },
          {
            equipment: 'machine',
            gifFile: 'glutes/lever-hip-extension-v-2.gif',
            illustration: 'hip-thrust',
            formGuide:
              'Ajusta el respaldo y el apoyo de pies. Empuja con la cadera hasta extensión completa. Aprieta glúteos arriba.',
          },
        ],
      },
      {
        name: 'Puente de glúteos',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'glutes/glute-bridge-march.gif',
            illustration: 'glute-bridge',
            formGuide:
              'Pies al ancho de cadera. Eleva la cadera hasta alinear rodillas-cadera-hombros. Aprieta arriba sin arquear de más.',
          },
          {
            equipment: 'barbell',
            gifFile: 'glutes/barbell-glute-bridge-two-legs-on-bench-male.gif',
            illustration: 'glute-bridge',
            formGuide:
              'Espalda en el suelo, pies en banco. Barra sobre la cadera. Empuja hacia arriba con control.',
          },
        ],
      },
      {
        name: 'Patada de glúteo',
        sets: '3',
        reps: '15 por pierna',
        variants: [
          {
            equipment: 'cable',
            gifFile: 'glutes/cable-standing-hip-extension.gif',
            illustration: 'glute-kickback',
            formGuide:
              'De pie, tobillera en polea baja. Patada hacia atrás sin arquear la espalda. El movimiento sale de la cadera.',
          },
          {
            equipment: 'machine',
            gifFile: 'glutes/lever-hip-extension-v-2.gif',
            illustration: 'glute-kickback',
            formGuide:
              'Ajusta el apoyo y la almohadilla. Extiende la pierna hacia atrás con control. No uses impulso.',
          },
        ],
      },
      {
        name: 'Sentadilla búlgara',
        sets: '3',
        reps: '10 por pierna',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'quads/barbell-split-squat-v-2.gif',
            illustration: 'bulgarian-split',
            formGuide:
              'Pie trasero elevado en banco. Baja la rodilla trasera hacia el suelo. Torso ligeramente inclinado.',
          },
          {
            equipment: 'barbell',
            gifFile: 'quads/barbell-split-squat-v-2.gif',
            illustration: 'bulgarian-split',
            formGuide:
              'Barra en la espalda, pie trasero en banco. Baja vertical manteniendo el equilibrio. Énfasis en glúteo y cuádriceps.',
          },
        ],
      },
      {
        name: 'Peso muerto convencional',
        sets: '4',
        reps: '5-8',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'glutes/barbell-deadlift.gif',
            illustration: 'romanian-deadlift',
            formGuide:
              'Pies al ancho de cadera, agarre mixto o doble prono. Empuja el suelo con las piernas y extiende cadera al subir. Espalda neutra en todo momento.',
          },
        ],
      },
      {
        name: 'Abducción de cadera en máquina',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'abductors/lever-seated-hip-abduction.gif',
            illustration: 'glute-kickback',
            formGuide:
              'Sentado en máquina de abducción. Abre las piernas contra la resistencia. Aprieta el glúteo medio al final del recorrido.',
          },
        ],
      },
      {
        name: 'Subida al cajón con barra',
        sets: '3',
        reps: '8 por pierna',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'glutes/barbell-step-up.gif',
            illustration: 'bulgarian-split',
            formGuide:
              'Barra en la espalda alta. Sube al cajón con una pierna empujando con el glúteo. Baja controlado sin impulso.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'glutes/dumbbell-step-up.gif',
            illustration: 'bulgarian-split',
            formGuide:
              'Mancuernas a los lados. Paso completo sobre el cajón. Mantén el torso erguido y el core activo.',
          },
        ],
      },
    ],
  },
  {
    id: 'hamstrings',
    name: 'Isquiotibiales',
    description: 'Parte posterior del muslo. Flexión de rodilla y extensión de cadera.',
    view: 'back',
    exercises: [
      {
        name: 'Peso muerto rumano',
        sets: '4',
        reps: '8-10',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'hamstrings/barbell-straight-leg-deadlift.gif',
            illustration: 'romanian-deadlift',
            formGuide:
              'Rodillas ligeramente flexionadas. Empuja la cadera atrás bajando la barra por las piernas. Espalda neutra.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'glutes/dumbbell-romanian-deadlift.gif',
            illustration: 'romanian-deadlift',
            formGuide:
              'Mancuernas a los lados. Bisagra de cadera manteniendo la espalda recta. Siente el estiramiento en isquios.',
          },
        ],
      },
      {
        name: 'Curl femoral',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'hamstrings/lever-lying-leg-curl.gif',
            illustration: 'leg-curl',
            formGuide:
              'Caderas pegadas al banco. Flexiona llevando los talones al glúteo. Baja lento sin levantar la cadera.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'hamstrings/dumbbell-lying-femoral.gif',
            illustration: 'leg-curl',
            formGuide:
              'Tumbado boca abajo, mancuerna entre los pies. Flexiona la rodilla llevando el peso al glúteo. Controla la bajada.',
          },
        ],
      },
      {
        name: 'Good morning',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'hamstrings/barbell-good-morning.gif',
            illustration: 'good-morning',
            formGuide:
              'Barra en trapecio. Bisagra de cadera con espalda rígida. Baja hasta sentir tensión en isquios. Sube apretando glúteos.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'glutes/dumbbell-romanian-deadlift.gif',
            illustration: 'good-morning',
            formGuide:
              'Mancuerna sujeta al pecho o a un lado. Bisagra de cadera con espalda neutra. Alternativa más accesible al good morning.',
          },
        ],
      },
      {
        name: 'Nordic curl',
        sets: '3',
        reps: '6-10',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'hamstrings/inverse-leg-curl-bench-support.gif',
            illustration: 'nordic-curl',
            formGuide:
              'Rodillas ancladas, cuerpo recto. Baja controlando con isquios. Usa las manos al final si es necesario.',
          },
        ],
      },
      {
        name: 'Curl femoral sentado',
        sets: '3',
        reps: '12-15',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'hamstrings/lever-seated-leg-curl.gif',
            illustration: 'leg-curl',
            formGuide:
              'Sentado con rodillas al borde del asiento. Flexiona llevando los talones hacia abajo. Aprieta isquios arriba y baja lento.',
          },
        ],
      },
      {
        name: 'Curl femoral de rodillas',
        sets: '3',
        reps: '10-12',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'hamstrings/lever-kneeling-leg-curl.gif',
            illustration: 'leg-curl',
            formGuide:
              'De rodillas en la máquina, tobillos anclados. Flexiona llevando los talones al glúteo. Mantén las caderas extendidas.',
          },
        ],
      },
      {
        name: 'Elevación glúteo-isquio (GHR)',
        sets: '3',
        reps: '8-12',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'hamstrings/glute-ham-raise.gif',
            illustration: 'nordic-curl',
            formGuide:
              'Rodillas apoyadas en la plataforma, tobillos fijos. Baja el torso con control y sube usando isquios y glúteos. No arquees la espalda.',
          },
        ],
      },
    ],
  },
  {
    id: 'calves',
    name: 'Pantorrillas',
    description: 'Gastrocnemio y sóleo. Elevación de talón.',
    view: 'back',
    exercises: [
      {
        name: 'Elevación de talones de pie',
        sets: '4',
        reps: '12-20',
        variants: [
          {
            equipment: 'barbell',
            gifFile: 'calves/barbell-standing-calf-raise.gif',
            illustration: 'calf-raise',
            formGuide:
              'Punta de los pies en un escalón. Baja el talón para estirar y sube lo más alto posible. Pausa arriba 1 segundo.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'calves/dumbbell-standing-calf-raise.gif',
            illustration: 'calf-raise',
            formGuide:
              'Mancuernas a los lados. Sube sobre la punta de los pies. Rango completo de movimiento sin rebotes.',
          },
          {
            equipment: 'machine',
            gifFile: 'calves/lever-standing-calf-raise.gif',
            illustration: 'calf-raise',
            formGuide:
              'Hombros bajo las almohadillas. Eleva los talones al máximo. Controla la bajada en 2-3 segundos.',
          },
        ],
      },
      {
        name: 'Elevación de talones sentado',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'calves/lever-seated-calf-raise.gif',
            illustration: 'calf-raise-seated',
            formGuide:
              'Sentado con peso sobre las rodillas. Enfatiza el sóleo. Rango completo sin rebotes.',
          },
          {
            equipment: 'dumbbell',
            gifFile: 'calves/dumbbell-seated-calf-raise.gif',
            illustration: 'calf-raise-seated',
            formGuide:
              'Sentado en banco, mancuernas sobre las rodillas. Eleva los talones al máximo. Pausa arriba.',
          },
        ],
      },
      {
        name: 'Elevación en prensa',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'calves/sled-45-calf-press.gif',
            illustration: 'calf-press',
            formGuide:
              'Solo la punta de los pies en la plataforma. Empuja con los talones sin flexionar las rodillas.',
          },
        ],
      },
      {
        name: 'Saltos de pantorrilla',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'calves/bodyweight-standing-calf-raise.gif',
            illustration: 'calf-jump',
            formGuide:
              'Pies al ancho de cadera. Salta usando solo los tobillos, rodillas casi fijas. Aterriza suave en la punta del pie.',
          },
        ],
      },
      {
        name: 'Elevación de talones a una pierna',
        sets: '3',
        reps: '12-15 por pierna',
        variants: [
          {
            equipment: 'dumbbell',
            gifFile: 'calves/dumbbell-single-leg-calf-raise.gif',
            illustration: 'calf-raise',
            formGuide:
              'Un pie en escalón, mancuerna en la mano del mismo lado. Sube lo más alto posible y baja hasta estirar. Alterna piernas.',
          },
        ],
      },
      {
        name: 'Elevación de talones tipo burro',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'bodyweight',
            gifFile: 'calves/donkey-calf-raise.gif',
            illustration: 'calf-raise',
            formGuide:
              'Inclinado con apoyo en banco, pies en escalón. Eleva los talones al máximo. Rango completo sin rebotes.',
          },
          {
            equipment: 'machine',
            gifFile: 'calves/lever-donkey-calf-raise.gif',
            illustration: 'calf-raise',
            formGuide:
              'Máquina de elevación tipo burro. Empuja con los talones hasta la máxima contracción. Controla la bajada en 2-3 segundos.',
          },
        ],
      },
      {
        name: 'Prensa de pantorrillas en máquina',
        sets: '3',
        reps: '15-20',
        variants: [
          {
            equipment: 'machine',
            gifFile: 'calves/lever-calf-press.gif',
            illustration: 'calf-press',
            formGuide:
              'Solo la punta de los pies en la plataforma. Empuja con los talones sin flexionar las rodillas. Pausa arriba en cada repetición.',
          },
        ],
      },
    ],
  },
]

export const muscleMap = new Map(muscles.map((m) => [m.id, m]))
