/** Grupos del selector en Entrenar, alineados con la anatomía de Explorar. */
export const MUSCLE_PICKER_GROUPS: Array<{
  id: string
  label: string
  muscleIds: string[]
}> = [
  {
    id: 'chest',
    label: 'Pecho',
    muscleIds: ['upper-chest', 'mid-chest', 'lower-chest'],
  },
  {
    id: 'shoulders',
    label: 'Hombros',
    muscleIds: ['front-deltoid', 'side-deltoid', 'rear-deltoid'],
  },
  {
    id: 'arms',
    label: 'Brazos',
    muscleIds: ['biceps', 'triceps', 'forearms'],
  },
  {
    id: 'back',
    label: 'Espalda',
    muscleIds: ['lats', 'trapezius'],
  },
  {
    id: 'core',
    label: 'Core',
    muscleIds: ['abs', 'obliques'],
  },
  {
    id: 'legs',
    label: 'Piernas',
    muscleIds: ['quadriceps', 'hamstrings'],
  },
  {
    id: 'glutes',
    label: 'Glúteos',
    muscleIds: ['glutes'],
  },
  {
    id: 'calves',
    label: 'Pantorrillas',
    muscleIds: ['calves'],
  },
]
