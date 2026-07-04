import { useEffect, useMemo, useState } from 'react'
import { muscles } from '../data/muscles'
import { buildWorkoutPlan } from '../lib/routines'
import { saveSession } from '../lib/trainingStorage'
import { muscleMatchesBodyHalf } from '../lib/bodyHalf'
import { loadFavorites } from '../lib/trainingStorage'
import { exerciseKey } from '../lib/exerciseKey'
import { EQUIPMENT_LABELS } from '../types'
import type { BodyHalfFilter, Equipment, LoggedExercise, LoggedSet, PersonalRecord } from '../types'
import { BodyHalfFilterBar } from './BodyHalfFilter'
import './WorkoutLogger.css'

interface WorkoutLoggerProps {
  bodyHalfFilter: BodyHalfFilter
  onBodyHalfChange: (filter: BodyHalfFilter) => void
  onWorkoutSaved?: (newPrs: PersonalRecord[]) => void
  initialMuscleIds?: string[]
}

const MAX_MUSCLES = 3

function emptySet(): LoggedSet {
  return { weightKg: 0, reps: 0, restSec: 90 }
}

function planToLogged(plan: ReturnType<typeof buildWorkoutPlan>): LoggedExercise[] {
  return plan.exercises.map((ex) => {
    const setCount = parseInt(ex.sets, 10) || 3
    const repNum = parseInt(ex.reps.split('-')[0], 10) || 10
    return {
      id: crypto.randomUUID(),
      muscleId: ex.muscleId,
      exerciseName: ex.exerciseName,
      equipment: ex.equipment,
      sets: Array.from({ length: setCount }, () => ({ weightKg: 0, reps: repNum, restSec: 90 })),
      notes: '',
    }
  })
}

export function WorkoutLogger({
  bodyHalfFilter,
  onBodyHalfChange,
  onWorkoutSaved,
  initialMuscleIds = [],
}: WorkoutLoggerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialMuscleIds)
  const [dayLabel, setDayLabel] = useState('')
  const [exercises, setExercises] = useState<LoggedExercise[]>([])
  const [savedMsg, setSavedMsg] = useState<string | null>(null)
  const [newPrs, setNewPrs] = useState<PersonalRecord[]>([])

  const favorites = useMemo(() => loadFavorites(), [savedMsg])

  useEffect(() => {
    if (initialMuscleIds.length === 0) return
    setSelectedIds(initialMuscleIds)
    const plan = buildWorkoutPlan(initialMuscleIds, dayLabel)
    setExercises(planToLogged(plan))
    // Solo al montar con músculos preseleccionados desde Explorar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const availableMuscles = useMemo(
    () => muscles.filter((m) => muscleMatchesBodyHalf(m.id, bodyHalfFilter)),
    [bodyHalfFilter],
  )

  function toggleMuscle(muscleId: string) {
    setSavedMsg(null)
    setNewPrs([])
    setExercises([])
    setSelectedIds((prev) => {
      if (prev.includes(muscleId)) return prev.filter((id) => id !== muscleId)
      if (prev.length >= MAX_MUSCLES) return prev
      return [...prev, muscleId]
    })
  }

  function handleBuild() {
    if (selectedIds.length === 0) return
    const plan = buildWorkoutPlan(selectedIds, dayLabel)
    setExercises(planToLogged(plan))
    setSavedMsg(null)
    setNewPrs([])
  }

  function updateSet(exId: string, setIdx: number, field: keyof LoggedSet, value: number) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex
        const sets = ex.sets.map((s, i) => (i === setIdx ? { ...s, [field]: value } : s))
        return { ...ex, sets }
      }),
    )
  }

  function addSet(exId: string) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex
        const last = ex.sets[ex.sets.length - 1] ?? emptySet()
        return { ...ex, sets: [...ex.sets, { ...last }] }
      }),
    )
  }

  function removeSet(exId: string, setIdx: number) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId || ex.sets.length <= 1) return ex
        return { ...ex, sets: ex.sets.filter((_, i) => i !== setIdx) }
      }),
    )
  }

  function updateNotes(exId: string, notes: string) {
    setExercises((prev) => prev.map((ex) => (ex.id === exId ? { ...ex, notes } : ex)))
  }

  function updateEquipment(exId: string, equipment: Equipment) {
    setExercises((prev) => prev.map((ex) => (ex.id === exId ? { ...ex, equipment } : ex)))
  }

  function handleSave() {
    if (exercises.length === 0) return
    const label = dayLabel.trim() || exercises.map((e) => e.exerciseName).slice(0, 2).join(' + ')
    const session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      label,
      muscleIds: selectedIds,
      exercises,
      completedAt: new Date().toISOString(),
    }
    const prs = saveSession(session)
    setNewPrs(prs)
    setSavedMsg(`Entrenamiento guardado — ${exercises.length} ejercicios, ${prs.length} PR${prs.length === 1 ? '' : 's'} nuevo${prs.length === 1 ? '' : 's'}.`)
    setExercises([])
    setSelectedIds([])
    setDayLabel('')
    onWorkoutSaved?.(prs)
  }

  return (
    <div className="workout-logger">
      <header className="workout-logger__header">
        <h2>Registrar entrenamiento</h2>
        <p>Elegí músculos, armá la rutina y cargá peso, series y repeticiones.</p>
      </header>

      <BodyHalfFilterBar value={bodyHalfFilter} onChange={onBodyHalfChange} />

      {exercises.length === 0 ? (
        <>
          <div className="workout-logger__picker">
            <p className="workout-logger__picker-label">
              Grupos: {selectedIds.length}/{MAX_MUSCLES}
            </p>
            <div className="workout-logger__muscles" role="group">
              {availableMuscles.map((muscle) => {
                const selected = selectedIds.includes(muscle.id)
                const disabled = !selected && selectedIds.length >= MAX_MUSCLES
                return (
                  <button
                    key={muscle.id}
                    type="button"
                    className={`workout-logger__muscle${selected ? ' workout-logger__muscle--selected' : ''}`}
                    aria-pressed={selected}
                    disabled={disabled}
                    onClick={() => toggleMuscle(muscle.id)}
                  >
                    {muscle.name}
                  </button>
                )
              })}
            </div>
          </div>

          <label className="workout-logger__label">
            Nombre del día (opcional)
            <input
              type="text"
              className="workout-logger__input"
              placeholder="Ej. Push, Pierna, Brazo…"
              value={dayLabel}
              onChange={(e) => setDayLabel(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="workout-logger__build"
            disabled={selectedIds.length === 0}
            onClick={handleBuild}
          >
            Armar rutina
          </button>
        </>
      ) : (
        <section className="workout-logger__session">
          <div className="workout-logger__session-head">
            <h3>{dayLabel.trim() || 'Sesión de hoy'}</h3>
            <button
              type="button"
              className="workout-logger__back"
              onClick={() => setExercises([])}
            >
              Cambiar músculos
            </button>
          </div>

          {exercises.map((ex) => {
            const fav = favorites.has(exerciseKey(ex.muscleId, ex.exerciseName, ex.equipment))
            return (
              <article key={ex.id} className="workout-logger__exercise">
                <header className="workout-logger__ex-head">
                  <div>
                    <span className="workout-logger__ex-muscle">
                      {muscles.find((m) => m.id === ex.muscleId)?.name}
                    </span>
                    <strong>
                      {ex.exerciseName}
                      {fav && <span className="workout-logger__fav" title="Favorito"> ★</span>}
                    </strong>
                  </div>
                  <select
                    className="workout-logger__equip"
                    value={ex.equipment}
                    onChange={(e) => updateEquipment(ex.id, e.target.value as Equipment)}
                  >
                    {(Object.keys(EQUIPMENT_LABELS) as Equipment[]).map((eq) => (
                      <option key={eq} value={eq}>
                        {EQUIPMENT_LABELS[eq]}
                      </option>
                    ))}
                  </select>
                </header>

                <table className="workout-logger__table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Kg</th>
                      <th>Reps</th>
                      <th>Desc.</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {ex.sets.map((set, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <input
                            type="number"
                            min={0}
                            step={0.5}
                            value={set.weightKg || ''}
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'weightKg', parseFloat(e.target.value) || 0)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min={0}
                            value={set.reps || ''}
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'reps', parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min={0}
                            step={15}
                            value={set.restSec ?? ''}
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'restSec', parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="workout-logger__remove-set"
                            onClick={() => removeSet(ex.id, idx)}
                            aria-label="Quitar serie"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button type="button" className="workout-logger__add-set" onClick={() => addSet(ex.id)}>
                  + Serie
                </button>

                <label className="workout-logger__notes">
                  Notas
                  <input
                    type="text"
                    placeholder="Técnica, sensaciones…"
                    value={ex.notes ?? ''}
                    onChange={(e) => updateNotes(ex.id, e.target.value)}
                  />
                </label>
              </article>
            )
          })}

          <button type="button" className="workout-logger__save" onClick={handleSave}>
            Guardar entrenamiento
          </button>
        </section>
      )}

      {newPrs.length > 0 && (
        <section className="workout-logger__prs">
          <h3>¡Nuevos récords!</h3>
          <ul>
            {newPrs.map((pr) => (
              <li key={pr.key}>
                <strong>{pr.exerciseName}</strong> — {pr.weightKg} kg × {pr.reps}
              </li>
            ))}
          </ul>
        </section>
      )}

      {savedMsg && <p className="workout-logger__toast">{savedMsg}</p>}
    </div>
  )
}
