import { useEffect, useMemo, useRef, useState } from 'react'
import { ExerciseCard } from './ExerciseCard'
import { ExerciseHistoryView } from './ExerciseHistoryView'
import { formatLastTrained, getMuscleRecovery, RECOVERY_LABELS } from '../lib/analytics'
import { exerciseKey } from '../lib/exerciseKey'
import { loadFavorites, addToDayRoutine, loadDayRoutine, toggleFavorite } from '../lib/trainingStorage'
import type { Equipment, ExerciseFocus, Muscle, MuscleHead } from '../types'
import './MusclePanel.css'

interface MusclePanelProps {
  muscle: Muscle | null
  activeHead?: MuscleHead | null
  pinned: boolean
  preview?: boolean
  exerciseFocus?: ExerciseFocus | null
  refreshKey?: number
  onOpenDetail?: () => void
  onStartRoutine?: (muscleId: string) => void
  onDayRoutineChange?: () => void
  onGoToWorkout?: () => void
}

export function MusclePanel({
  muscle,
  activeHead,
  pinned,
  preview,
  exerciseFocus,
  refreshKey = 0,
  onOpenDetail,
  onStartRoutine,
  onDayRoutineChange,
  onGoToWorkout,
}: MusclePanelProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites())
  const [routineKeys, setRoutineKeys] = useState<Set<string>>(() => {
    return new Set(
      loadDayRoutine().map((i) => exerciseKey(i.muscleId, i.exerciseName, i.equipment)),
    )
  })
  const [addMsg, setAddMsg] = useState<string | null>(null)
  const [historyTarget, setHistoryTarget] = useState<{
    exerciseName: string
    equipment: Equipment
  } | null>(null)

  useEffect(() => {
    setFavorites(loadFavorites())
    setRoutineKeys(
      new Set(
        loadDayRoutine().map((i) => exerciseKey(i.muscleId, i.exerciseName, i.equipment)),
      ),
    )
  }, [refreshKey, muscle?.id])

  useEffect(() => {
    if (!muscle || !exerciseFocus?.exerciseName) return
    const slug = exerciseFocus.exerciseName.replace(/\s+/g, '-').toLowerCase()
    document.getElementById(`exercise-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [muscle, exerciseFocus])

  const recovery = useMemo(
    () => (muscle ? getMuscleRecovery(muscle.id) : null),
    [muscle, refreshKey],
  )

  const shownExercises = useMemo(() => {
    if (!muscle) return []
    let list = muscle.exercises.filter((exercise) => {
      if (!activeHead?.exerciseHints?.length) return true
      return activeHead.exerciseHints.some(
        (hint) =>
          exercise.name.toLowerCase().includes(hint.toLowerCase()) ||
          hint.toLowerCase().includes(exercise.name.toLowerCase()),
      )
    })
    return list.length > 0 ? list : muscle.exercises
  }, [muscle, activeHead])

  function handleToggleFavorite(exerciseName: string, equipment: Equipment) {
    if (!muscle) return
    const key = exerciseKey(muscle.id, exerciseName, equipment)
    toggleFavorite(key)
    setFavorites(loadFavorites())
  }

  function handleAddToRoutine(exerciseName: string, equipment: Equipment, sets: string, reps: string) {
    if (!muscle) return
    const added = addToDayRoutine({
      muscleId: muscle.id,
      exerciseName,
      equipment,
      sets,
      reps,
    })
    if (added) {
      const key = exerciseKey(muscle.id, exerciseName, equipment)
      setRoutineKeys((prev) => new Set([...prev, key]))
      setAddMsg(`${exerciseName} agregado a tu rutina del día`)
      onDayRoutineChange?.()
    }
  }

  useEffect(() => {
    if (!addMsg) return
    const t = window.setTimeout(() => setAddMsg(null), 2500)
    return () => window.clearTimeout(t)
  }, [addMsg])

  if (!muscle) {
    return (
      <aside className="muscle-panel muscle-panel--empty">
        <div className="muscle-panel__placeholder">
          <span className="muscle-panel__icon" aria-hidden="true">◉</span>
          <h2>Explora el cuerpo</h2>
          <p>
            Los músculos se colorean según cuándo los entrenaste. Haz clic en una zona para ver
            volumen, recuperación y armar tu rutina.
          </p>
        </div>
      </aside>
    )
  }

  if (historyTarget) {
    return (
      <aside className="muscle-panel">
        <ExerciseHistoryView
          muscleId={muscle.id}
          exerciseName={historyTarget.exerciseName}
          equipment={historyTarget.equipment}
          onClose={() => setHistoryTarget(null)}
        />
      </aside>
    )
  }

  return (
    <aside className={`muscle-panel${pinned ? ' muscle-panel--pinned' : ''}`}>
      <header className="muscle-panel__header">
        <span className="muscle-panel__badge">
          {pinned ? 'Músculo activo' : preview ? 'Vista previa' : 'Selección'}
        </span>
        <h2>{activeHead ? activeHead.name : muscle.name}</h2>

        {recovery && (
          <div className="muscle-panel__insights">
            <div className="muscle-panel__insight-row">
              <span>Ejercicios</span>
              <strong>{recovery.exerciseCount}</strong>
            </div>
            <div className="muscle-panel__insight-row">
              <span>Último entrenado</span>
              <strong>{formatLastTrained(recovery)}</strong>
            </div>
            <div className="muscle-panel__insight-row">
              <span>Volumen semanal</span>
              <strong>{recovery.weeklySets} series</strong>
            </div>
            <div className="muscle-panel__insight-row">
              <span>Recuperación</span>
              <strong>{recovery.recoveryPercent} %</strong>
            </div>
            <p className={`muscle-panel__recovery-tag muscle-panel__recovery-tag--${recovery.status}`}>
              {RECOVERY_LABELS[recovery.status]}
            </p>
          </div>
        )}

        <div className="muscle-panel__actions">
          {onStartRoutine && (
            <button type="button" className="muscle-panel__action-btn" onClick={() => onStartRoutine(muscle.id)}>
              Armar rutina
            </button>
          )}
          {onOpenDetail && (
            <button type="button" className="muscle-panel__action-btn muscle-panel__action-btn--ghost" onClick={onOpenDetail}>
              Ver anatomía
            </button>
          )}
        </div>

        {routineKeys.size > 0 && onGoToWorkout && (
          <div className="muscle-panel__routine-banner">
            <span>
              {routineKeys.size} ejercicio{routineKeys.size === 1 ? '' : 's'} en tu rutina del día
            </span>
            <button type="button" className="muscle-panel__routine-go" onClick={onGoToWorkout}>
              Ir a Entrenar
            </button>
          </div>
        )}

        {addMsg && <p className="muscle-panel__toast">{addMsg}</p>}

        {activeHead && <p className="muscle-panel__desc">{activeHead.description}</p>}
        {!activeHead && <p className="muscle-panel__desc">{muscle.description}</p>}
      </header>

      <section className="muscle-panel__exercises">
        <h3>Ejercicios ({shownExercises.length})</h3>
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
                muscleId={muscle.id}
                focus={exerciseFocus}
                highlighted={isHighlighted}
                isFavorite={exercise.variants.some((v) =>
                  favorites.has(exerciseKey(muscle.id, exercise.name, v.equipment)),
                )}
                isInRoutine={(eq) => routineKeys.has(exerciseKey(muscle.id, exercise.name, eq))}
                onToggleFavorite={(eq) => handleToggleFavorite(exercise.name, eq)}
                onViewHistory={(eq) => setHistoryTarget({ exerciseName: exercise.name, equipment: eq })}
                onAddToRoutine={(eq) => handleAddToRoutine(exercise.name, eq, exercise.sets, exercise.reps)}
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
