import { useEffect, useRef } from 'react'
import { ExerciseCard } from './ExerciseCard'
import type { ExerciseFocus, Muscle, MuscleHead } from '../types'
import './MusclePanel.css'

interface MusclePanelProps {
  muscle: Muscle | null
  activeHead?: MuscleHead | null
  pinned: boolean
  preview?: boolean
  exerciseFocus?: ExerciseFocus | null
}

export function MusclePanel({ muscle, activeHead, pinned, preview, exerciseFocus }: MusclePanelProps) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!muscle || !exerciseFocus?.exerciseName) return

    const slug = exerciseFocus.exerciseName.replace(/\s+/g, '-').toLowerCase()
    const el = document.getElementById(`exercise-${slug}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [muscle, exerciseFocus])

  if (!muscle) {
    return (
      <aside className="muscle-panel muscle-panel--empty">
        <div className="muscle-panel__placeholder">
          <span className="muscle-panel__icon" aria-hidden="true">
            ◉
          </span>
          <h2>Explora el cuerpo</h2>
          <p>
            Pasa el cursor sobre una zona (brazo, pecho, pierna…) y elige un músculo. Verás la vista
            ampliada con sus cabezas y ejercicios.
          </p>
        </div>
      </aside>
    )
  }

  const exercises = muscle.exercises.filter((exercise) => {
    if (!activeHead?.exerciseHints?.length) return true
    return activeHead.exerciseHints.some(
      (hint) => exercise.name.toLowerCase().includes(hint.toLowerCase()) || hint.toLowerCase().includes(exercise.name.toLowerCase()),
    )
  })

  const shownExercises = exercises.length > 0 ? exercises : muscle.exercises

  return (
    <aside className={`muscle-panel${pinned ? ' muscle-panel--pinned' : ''}`}>
      <header className="muscle-panel__header">
        <span className="muscle-panel__badge">
          {pinned ? 'Músculo activo' : preview ? 'Vista previa' : 'Selección'}
        </span>
        <h2>{activeHead ? activeHead.name : muscle.name}</h2>
        <p>{activeHead ? activeHead.description : muscle.description}</p>
        {activeHead && (
          <div className="muscle-panel__head-train">
            <strong>Cómo trabajarlo</strong>
            <p>{activeHead.howToTrain}</p>
          </div>
        )}
      </header>

      <section className="muscle-panel__exercises">
        <h3>
          {activeHead ? `Ejercicios para ${activeHead.name.toLowerCase()}` : 'Ejercicios recomendados'}
        </h3>
        <ul ref={listRef}>
          {shownExercises.map((exercise) => {
            const isHighlighted =
              exerciseFocus?.exerciseName === exercise.name ||
              (!exerciseFocus?.exerciseName &&
                !!exerciseFocus?.equipment &&
                exercise.variants.some((v) => v.equipment === exerciseFocus.equipment))

            return (
              <ExerciseCard
                key={exercise.name}
                exercise={exercise}
                focus={exerciseFocus}
                highlighted={isHighlighted}
              />
            )
          })}
        </ul>
      </section>

      <p className="muscle-panel__attribution">
        GIFs por{' '}
        <a href="https://github.com/JahelCuadrado/ExerciseGymGifsDB" target="_blank" rel="noreferrer">
          ExerciseGymGifsDB
        </a>
      </p>
    </aside>
  )
}
