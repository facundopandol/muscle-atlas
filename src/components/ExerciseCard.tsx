import { useEffect, useState } from 'react'
import { ExerciseIllustration } from './ExerciseIllustration'
import { EQUIPMENT_LABELS, type Exercise, type ExerciseFocus } from '../types'
import { gifUrl } from '../lib/gifs'
import './ExerciseCard.css'

interface ExerciseCardProps {
  exercise: Exercise
  focus?: ExerciseFocus | null
  highlighted?: boolean
}

export function ExerciseCard({ exercise, focus, highlighted }: ExerciseCardProps) {
  const [variantIndex, setVariantIndex] = useState(0)
  const [gifFailed, setGifFailed] = useState(false)

  const variant = exercise.variants[variantIndex]
  const hasMultipleVariants = exercise.variants.length > 1

  useEffect(() => {
    if (!focus) return

    const nameMatches = !focus.exerciseName || focus.exerciseName === exercise.name
    if (!nameMatches) return

    const idx = exercise.variants.findIndex((v) =>
      focus.equipment ? v.equipment === focus.equipment : true,
    )
    if (idx >= 0) {
      setVariantIndex(idx)
      setGifFailed(false)
    }
  }, [focus, exercise])

  function selectVariant(index: number) {
    setVariantIndex(index)
    setGifFailed(false)
  }

  return (
    <li
      id={`exercise-${exercise.name.replace(/\s+/g, '-').toLowerCase()}`}
      className={`exercise-card${highlighted ? ' exercise-card--highlighted' : ''}`}
    >
      <div className="exercise-card__media">
        {!gifFailed ? (
          <img
            src={gifUrl(variant.gifFile)}
            alt={`Demostración: ${exercise.name} con ${EQUIPMENT_LABELS[variant.equipment]}`}
            className="exercise-card__gif"
            loading="lazy"
            onError={() => setGifFailed(true)}
          />
        ) : (
          <ExerciseIllustration id={variant.illustration} title={exercise.name} />
        )}
        <span className="exercise-card__media-label">
          {gifFailed ? 'Ilustración' : 'GIF · forma correcta'}
        </span>
      </div>

      <div className="exercise-card__body">
        <div className="exercise-card__title">{exercise.name}</div>
        <div className="exercise-card__meta">
          <span>{exercise.sets} series</span>
          <span>{exercise.reps} reps</span>
        </div>

        {hasMultipleVariants && (
          <div className="equipment-picker" role="group" aria-label="Equipo para este ejercicio">
            {exercise.variants.map((v, i) => (
              <button
                key={v.gifFile}
                type="button"
                className={`equipment-picker__btn${i === variantIndex ? ' equipment-picker__btn--active' : ''}`}
                onClick={() => selectVariant(i)}
                aria-pressed={i === variantIndex}
              >
                {EQUIPMENT_LABELS[v.equipment]}
              </button>
            ))}
          </div>
        )}

        {!hasMultipleVariants && (
          <span className="exercise-card__equipment-tag">
            {EQUIPMENT_LABELS[variant.equipment]}
          </span>
        )}

        <p className="exercise-card__form">{variant.formGuide}</p>
        {variant.tip && <p className="exercise-card__tip">{variant.tip}</p>}
      </div>
    </li>
  )
}
