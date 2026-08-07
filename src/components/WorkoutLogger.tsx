import { useEffect, useMemo, useState } from 'react'
import { MUSCLE_PICKER_GROUPS } from '../data/muscleGroups'
import { muscles, muscleMap } from '../data/muscles'
import { buildWorkoutPlan } from '../lib/routines'
import { saveSession, loadDayRoutine, clearDayRoutine, removeFromDayRoutine, loadFavorites } from '../lib/trainingStorage'
import { muscleMatchesBodyHalf } from '../lib/bodyHalf'
import { exerciseKey } from '../lib/exerciseKey'
import { resolveExerciseDemo } from '../lib/exerciseDemo'
import { gifUrl } from '../lib/gifs'
import { EQUIPMENT_LABELS } from '../types'
import type { BodyHalfFilter, DayRoutineItem, Equipment, LoggedExercise, LoggedSet, PersonalRecord } from '../types'
import { BodyHalfFilterBar } from './BodyHalfFilter'
import { ExerciseIllustration } from './ExerciseIllustration'
import './WorkoutLogger.css'

interface WorkoutLoggerProps {
  bodyHalfFilter: BodyHalfFilter
  onBodyHalfChange: (filter: BodyHalfFilter) => void
  onWorkoutSaved?: (newPrs: PersonalRecord[]) => void
  initialMuscleIds?: string[]
  routineRefreshKey?: number
  onRoutineChange?: () => void
}

const MAX_MUSCLES = 3

function emptySet(): LoggedSet {
  return { weightKg: 0, reps: 0, restSec: 90 }
}

function dayRoutineToLogged(items: DayRoutineItem[]): LoggedExercise[] {
  return items.map((item) => {
    const setCount = parseInt(item.sets, 10) || 3
    const repNum = parseInt(item.reps.split('-')[0], 10) || 10
    return {
      id: crypto.randomUUID(),
      muscleId: item.muscleId,
      exerciseName: item.exerciseName,
      equipment: item.equipment,
      sets: Array.from({ length: setCount }, () => ({ weightKg: 0, reps: repNum, restSec: 90 })),
      notes: '',
    }
  })
}

function muscleIdsFromExercises(exercises: LoggedExercise[]): string[] {
  return [...new Set(exercises.map((e) => e.muscleId))]
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

function exerciseToLogged(
  muscleId: string,
  exerciseName: string,
  equipment: Equipment,
  sets: string,
  reps: string,
): LoggedExercise {
  const setCount = parseInt(sets, 10) || 3
  const repNum = parseInt(reps.split('-')[0], 10) || 10
  return {
    id: crypto.randomUUID(),
    muscleId,
    exerciseName,
    equipment,
    sets: Array.from({ length: setCount }, () => ({ weightKg: 0, reps: repNum, restSec: 90 })),
    notes: '',
  }
}

export function WorkoutLogger({
  bodyHalfFilter,
  onBodyHalfChange,
  onWorkoutSaved,
  initialMuscleIds = [],
  routineRefreshKey = 0,
  onRoutineChange,
}: WorkoutLoggerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialMuscleIds)
  const [dayLabel, setDayLabel] = useState('')
  const [exercises, setExercises] = useState<LoggedExercise[]>([])
  const [fromDayRoutine, setFromDayRoutine] = useState(false)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)
  const [newPrs, setNewPrs] = useState<PersonalRecord[]>([])
  const [doneSets, setDoneSets] = useState<Record<string, boolean>>({})
  const [gifFailed, setGifFailed] = useState<Record<string, boolean>>({})
  const [addOpen, setAddOpen] = useState(false)
  const [addMuscleId, setAddMuscleId] = useState<string | null>(null)

  const favorites = useMemo(() => loadFavorites(), [savedMsg])
  const draftCount = useMemo(() => loadDayRoutine().length, [routineRefreshKey, savedMsg])

  useEffect(() => {
    const draft = loadDayRoutine()
    if (draft.length > 0) {
      const logged = dayRoutineToLogged(draft)
      setExercises(logged)
      setSelectedIds(muscleIdsFromExercises(logged))
      setFromDayRoutine(true)
      return
    }
    if (initialMuscleIds.length === 0) return
    setSelectedIds(initialMuscleIds)
    const plan = buildWorkoutPlan(initialMuscleIds, dayLabel)
    setExercises(planToLogged(plan))
    setFromDayRoutine(false)
    // Solo al montar con músculos preseleccionados desde Explorar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const draft = loadDayRoutine()
    if (draft.length === 0) return

    setExercises((prev) => {
      if (prev.length === 0) return dayRoutineToLogged(draft)

      const existingKeys = new Set(
        prev.map((e) => exerciseKey(e.muscleId, e.exerciseName, e.equipment)),
      )
      const newItems = draft.filter(
        (item) => !existingKeys.has(exerciseKey(item.muscleId, item.exerciseName, item.equipment)),
      )
      if (newItems.length === 0) return prev
      return [...prev, ...dayRoutineToLogged(newItems)]
    })
    setFromDayRoutine(true)
    setSavedMsg(null)
    setNewPrs([])
  }, [routineRefreshKey])

  useEffect(() => {
    if (exercises.length === 0) return
    setSelectedIds(muscleIdsFromExercises(exercises))
  }, [exercises])

  const availableMuscles = useMemo(
    () => muscles.filter((m) => muscleMatchesBodyHalf(m.id, bodyHalfFilter)),
    [bodyHalfFilter],
  )

  const pickerGroups = useMemo(() => {
    const byId = new Map(availableMuscles.map((m) => [m.id, m]))
    return MUSCLE_PICKER_GROUPS.map((group) => ({
      ...group,
      muscles: group.muscleIds
        .map((id) => byId.get(id))
        .filter((m): m is (typeof availableMuscles)[number] => Boolean(m)),
    })).filter((g) => g.muscles.length > 0)
  }, [availableMuscles])

  const addMuscleOptions = useMemo(() => {
    const preferred = selectedIds
      .map((id) => muscleMap.get(id))
      .filter((m): m is NonNullable<typeof m> => Boolean(m))
    if (preferred.length > 0) return preferred
    return availableMuscles
  }, [selectedIds, availableMuscles])

  const addMuscle = addMuscleId ? muscleMap.get(addMuscleId) ?? null : null
  const existingKeys = useMemo(
    () => new Set(exercises.map((e) => exerciseKey(e.muscleId, e.exerciseName, e.equipment))),
    [exercises],
  )

  function toggleMuscle(muscleId: string) {
    setSavedMsg(null)
    setNewPrs([])
    setExercises([])
    setDoneSets({})
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
    setFromDayRoutine(false)
    setDoneSets({})
    setGifFailed({})
    setAddOpen(false)
    setAddMuscleId(null)
    setSavedMsg(null)
    setNewPrs([])
  }

  function handleClearRoutine() {
    clearDayRoutine()
    setExercises([])
    setSelectedIds([])
    setFromDayRoutine(false)
    setDayLabel('')
    setDoneSets({})
    setGifFailed({})
    setAddOpen(false)
    setAddMuscleId(null)
    setSavedMsg(null)
    setNewPrs([])
    onRoutineChange?.()
  }

  function removeExercise(exId: string) {
    setExercises((prev) => {
      const next = prev.filter((ex) => ex.id !== exId)
      const removed = prev.find((ex) => ex.id === exId)
      if (removed && fromDayRoutine) {
        removeFromDayRoutine(exerciseKey(removed.muscleId, removed.exerciseName, removed.equipment))
        onRoutineChange?.()
      }
      setSelectedIds(muscleIdsFromExercises(next))
      return next
    })
    setDoneSets((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(next)) {
        if (key.startsWith(`${exId}:`)) delete next[key]
      }
      return next
    })
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
    setDoneSets((prev) => {
      const next = { ...prev }
      delete next[`${exId}:${setIdx}`]
      return next
    })
  }

  function updateNotes(exId: string, notes: string) {
    setExercises((prev) => prev.map((ex) => (ex.id === exId ? { ...ex, notes } : ex)))
  }

  function updateEquipment(exId: string, equipment: Equipment) {
    setExercises((prev) => prev.map((ex) => (ex.id === exId ? { ...ex, equipment } : ex)))
    setGifFailed((prev) => {
      const next = { ...prev }
      delete next[exId]
      return next
    })
  }

  function toggleSetDone(exId: string, setIdx: number) {
    const key = `${exId}:${setIdx}`
    setDoneSets((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleAddExercise(muscleId: string, exerciseName: string, equipment: Equipment, sets: string, reps: string) {
    const key = exerciseKey(muscleId, exerciseName, equipment)
    if (existingKeys.has(key)) return
    setExercises((prev) => [...prev, exerciseToLogged(muscleId, exerciseName, equipment, sets, reps)])
    setAddOpen(true)
    setAddMuscleId(muscleId)
    setSavedMsg(null)
    setNewPrs([])
  }

  function handleSave() {
    if (exercises.length === 0) return
    const label = dayLabel.trim() || exercises.map((e) => e.exerciseName).slice(0, 2).join(' + ')
    const session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      label,
      muscleIds: muscleIdsFromExercises(exercises),
      exercises,
      completedAt: new Date().toISOString(),
    }
    const prs = saveSession(session)
    setNewPrs(prs)
    setSavedMsg(`Entrenamiento guardado — ${exercises.length} ejercicios, ${prs.length} PR${prs.length === 1 ? '' : 's'} nuevo${prs.length === 1 ? '' : 's'}.`)
    clearDayRoutine()
    setFromDayRoutine(false)
    setExercises([])
    setSelectedIds([])
    setDayLabel('')
    setDoneSets({})
    setGifFailed({})
    setAddOpen(false)
    setAddMuscleId(null)
    onRoutineChange?.()
    onWorkoutSaved?.(prs)
  }

  return (
    <div className="workout-logger">
      <header className="workout-logger__header">
        <h2>Tu sesión</h2>
        <p>
          Lista de ejercicios de arriba a abajo: demo grande, registro de series y sumá más en el mismo
          flujo.
        </p>
      </header>

      {exercises.length === 0 && (
        <BodyHalfFilterBar value={bodyHalfFilter} onChange={onBodyHalfChange} />
      )}

      {exercises.length === 0 ? (
        <>
          {draftCount === 0 && (
            <p className="workout-logger__hint">
              Tip: en Explorar podés agregar ejercicios, o armá la sesión acá por músculos.
            </p>
          )}

          <div className="workout-logger__picker">
            <p className="workout-logger__picker-label">
              Grupos: {selectedIds.length}/{MAX_MUSCLES}
            </p>
            <div className="workout-logger__groups">
              {pickerGroups.map((group) => (
                <div key={group.id} className="workout-logger__group">
                  <p className="workout-logger__group-label">{group.label}</p>
                  <div className="workout-logger__muscles" role="group" aria-label={group.label}>
                    {group.muscles.map((muscle) => {
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
              ))}
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
            Empezar sesión
          </button>
        </>
      ) : (
        <section className="workout-logger__session">
          <div className="workout-logger__session-head">
            <div>
              <h3>{dayLabel.trim() || 'Rutina del día'}</h3>
              <p className="workout-logger__session-source">
                {exercises.length} ejercicio{exercises.length === 1 ? '' : 's'}
                {fromDayRoutine ? ' · desde Explorar' : ''}
              </p>
            </div>
            <button
              type="button"
              className="workout-logger__back"
              onClick={handleClearRoutine}
            >
              {fromDayRoutine ? 'Limpiar rutina' : 'Cambiar músculos'}
            </button>
          </div>

          <ol className="workout-logger__stack">
            {exercises.map((ex, order) => {
              const fav = favorites.has(exerciseKey(ex.muscleId, ex.exerciseName, ex.equipment))
              const demo = resolveExerciseDemo(ex.muscleId, ex.exerciseName, ex.equipment)
              const failed = gifFailed[ex.id]
              const muscleName = muscles.find((m) => m.id === ex.muscleId)?.name

              return (
                <li key={ex.id} className="workout-logger__exercise">
                  <div className="workout-logger__ex-order" aria-hidden="true">
                    {order + 1}
                  </div>

                  <header className="workout-logger__ex-head">
                    <div>
                      <span className="workout-logger__ex-muscle">{muscleName}</span>
                      <strong>
                        {ex.exerciseName}
                        {fav && <span className="workout-logger__fav" title="Favorito"> ★</span>}
                      </strong>
                    </div>
                    <div className="workout-logger__ex-actions">
                      <select
                        className="workout-logger__equip"
                        value={ex.equipment}
                        onChange={(e) => updateEquipment(ex.id, e.target.value as Equipment)}
                        aria-label="Equipo"
                      >
                        {(Object.keys(EQUIPMENT_LABELS) as Equipment[]).map((eq) => (
                          <option key={eq} value={eq}>
                            {EQUIPMENT_LABELS[eq]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="workout-logger__remove-ex"
                        onClick={() => removeExercise(ex.id)}
                        aria-label="Quitar ejercicio"
                      >
                        Quitar
                      </button>
                    </div>
                  </header>

                  <div className="workout-logger__demo">
                    {demo && !failed ? (
                      <img
                        src={gifUrl(demo.variant.gifFile)}
                        alt={`Demostración: ${ex.exerciseName}`}
                        className="workout-logger__gif"
                        loading="lazy"
                        onError={() => setGifFailed((prev) => ({ ...prev, [ex.id]: true }))}
                      />
                    ) : demo ? (
                      <div className="workout-logger__illustration">
                        <ExerciseIllustration id={demo.variant.illustration} title={ex.exerciseName} />
                      </div>
                    ) : (
                      <div className="workout-logger__demo-fallback">Sin demo</div>
                    )}
                    {demo && (
                      <p className="workout-logger__form-guide">{demo.variant.formGuide}</p>
                    )}
                  </div>

                  <div className="workout-logger__sets" role="list">
                    <div className="workout-logger__sets-head" aria-hidden="true">
                      <span />
                      <span>Kg</span>
                      <span>Reps</span>
                      <span>Desc.</span>
                      <span />
                    </div>
                    {ex.sets.map((set, idx) => {
                      const setKey = `${ex.id}:${idx}`
                      const done = Boolean(doneSets[setKey])
                      return (
                        <div
                          key={idx}
                          className={`workout-logger__set-row${done ? ' workout-logger__set-row--done' : ''}`}
                          role="listitem"
                        >
                          <button
                            type="button"
                            className={`workout-logger__set-check${done ? ' workout-logger__set-check--on' : ''}`}
                            aria-pressed={done}
                            aria-label={done ? `Serie ${idx + 1} hecha` : `Marcar serie ${idx + 1}`}
                            onClick={() => toggleSetDone(ex.id, idx)}
                          >
                            {idx + 1}
                          </button>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step={0.5}
                            className="workout-logger__num"
                            value={set.weightKg || ''}
                            placeholder="0"
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'weightKg', parseFloat(e.target.value) || 0)
                            }
                          />
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            className="workout-logger__num"
                            value={set.reps || ''}
                            placeholder="0"
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'reps', parseInt(e.target.value, 10) || 0)
                            }
                          />
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={15}
                            className="workout-logger__num workout-logger__num--rest"
                            value={set.restSec ?? ''}
                            placeholder="90"
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'restSec', parseInt(e.target.value, 10) || 0)
                            }
                          />
                          <button
                            type="button"
                            className="workout-logger__remove-set"
                            onClick={() => removeSet(ex.id, idx)}
                            aria-label="Quitar serie"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>

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
                </li>
              )
            })}
          </ol>

          <div className="workout-logger__add-block">
            {!addOpen ? (
              <button
                type="button"
                className="workout-logger__add-open"
                onClick={() => {
                  setAddOpen(true)
                  setAddMuscleId(addMuscleOptions[0]?.id ?? null)
                }}
              >
                + Agregar ejercicio
              </button>
            ) : (
              <div className="workout-logger__add-panel">
                <div className="workout-logger__add-panel-head">
                  <h4>Agregar al final de la lista</h4>
                  <button
                    type="button"
                    className="workout-logger__back"
                    onClick={() => {
                      setAddOpen(false)
                      setAddMuscleId(null)
                    }}
                  >
                    Cerrar
                  </button>
                </div>

                <p className="workout-logger__add-label">Músculo</p>
                <div className="workout-logger__add-muscles" role="group" aria-label="Elegir músculo">
                  {addMuscleOptions.map((muscle) => (
                    <button
                      key={muscle.id}
                      type="button"
                      className={`workout-logger__muscle${addMuscleId === muscle.id ? ' workout-logger__muscle--selected' : ''}`}
                      aria-pressed={addMuscleId === muscle.id}
                      onClick={() => setAddMuscleId(muscle.id)}
                    >
                      {muscle.name}
                    </button>
                  ))}
                </div>

                {addMuscle && (
                  <ul className="workout-logger__add-list">
                    {addMuscle.exercises.map((exercise) => {
                      const variant = exercise.variants[0]
                      if (!variant) return null
                      const key = exerciseKey(addMuscle.id, exercise.name, variant.equipment)
                      const already = existingKeys.has(key)
                      return (
                        <li key={exercise.name} className="workout-logger__add-item">
                          <img
                            src={gifUrl(variant.gifFile)}
                            alt=""
                            className="workout-logger__add-thumb"
                            loading="lazy"
                          />
                          <div className="workout-logger__add-item-body">
                            <strong>{exercise.name}</strong>
                            <span>
                              {EQUIPMENT_LABELS[variant.equipment]} · {exercise.sets}×{exercise.reps}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="workout-logger__add-pick"
                            disabled={already}
                            onClick={() =>
                              handleAddExercise(
                                addMuscle.id,
                                exercise.name,
                                variant.equipment,
                                exercise.sets,
                                exercise.reps,
                              )
                            }
                          >
                            {already ? 'Ya está' : 'Sumar'}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

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
