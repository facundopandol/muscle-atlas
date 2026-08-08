import { useEffect, useMemo, useState } from 'react'
import { MUSCLE_PICKER_GROUPS } from '../data/muscleGroups'
import { muscleMap, muscles } from '../data/muscles'
import { buildWorkoutPlan } from '../lib/routines'
import {
  saveSession,
  loadDayRoutine,
  clearDayRoutine,
  removeFromDayRoutine,
  loadFavorites,
  addToDayRoutine,
} from '../lib/trainingStorage'
import { muscleMatchesBodyHalf } from '../lib/bodyHalf'
import { exerciseKey } from '../lib/exerciseKey'
import { findCatalogExercise, resolveExerciseVariant } from '../lib/resolveExercise'
import { gifUrl } from '../lib/gifs'
import { EQUIPMENT_LABELS } from '../types'
import type {
  BodyHalfFilter,
  DayRoutineItem,
  Equipment,
  Exercise,
  LoggedExercise,
  LoggedSet,
  PersonalRecord,
} from '../types'
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

function catalogToLogged(muscleId: string, exercise: Exercise, equipment: Equipment): LoggedExercise {
  const setCount = parseInt(exercise.sets, 10) || 3
  const repNum = parseInt(exercise.reps.split('-')[0], 10) || 10
  const variant =
    exercise.variants.find((v) => v.equipment === equipment) ?? exercise.variants[0]
  return {
    id: crypto.randomUUID(),
    muscleId,
    exerciseName: exercise.name,
    equipment: variant.equipment,
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
  const [addingExercise, setAddingExercise] = useState(false)
  const [pickerMuscleId, setPickerMuscleId] = useState<string | null>(null)
  const [gifFailedIds, setGifFailedIds] = useState<Set<string>>(() => new Set())

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

  const sessionKeys = useMemo(
    () => new Set(exercises.map((e) => exerciseKey(e.muscleId, e.exerciseName, e.equipment))),
    [exercises],
  )

  const addPickerMuscles = useMemo(() => {
    const preferred = selectedIds
      .map((id) => muscleMap.get(id))
      .filter((m): m is NonNullable<typeof m> => Boolean(m))
    const rest = availableMuscles.filter((m) => !selectedIds.includes(m.id))
    return [...preferred, ...rest]
  }, [availableMuscles, selectedIds])

  const pickerExercises = useMemo(() => {
    if (!pickerMuscleId) return []
    return muscleMap.get(pickerMuscleId)?.exercises ?? []
  }, [pickerMuscleId])

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
    setFromDayRoutine(false)
    setSavedMsg(null)
    setNewPrs([])
  }

  function handleClearRoutine() {
    clearDayRoutine()
    setExercises([])
    setSelectedIds([])
    setFromDayRoutine(false)
    setDayLabel('')
    setSavedMsg(null)
    setNewPrs([])
    setAddingExercise(false)
    setPickerMuscleId(null)
    onRoutineChange?.()
  }

  function removeExercise(exId: string) {
    setExercises((prev) => {
      const next = prev.filter((ex) => ex.id !== exId)
      const removed = prev.find((ex) => ex.id === exId)
      if (removed) {
        removeFromDayRoutine(exerciseKey(removed.muscleId, removed.exerciseName, removed.equipment))
        onRoutineChange?.()
      }
      setSelectedIds(muscleIdsFromExercises(next))
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
  }

  function updateNotes(exId: string, notes: string) {
    setExercises((prev) => prev.map((ex) => (ex.id === exId ? { ...ex, notes } : ex)))
  }

  function updateEquipment(exId: string, equipment: Equipment) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex
        const catalog = findCatalogExercise(ex.muscleId, ex.exerciseName)
        const allowed = catalog?.variants.some((v) => v.equipment === equipment)
        if (!allowed && catalog) return ex
        setGifFailedIds((ids) => {
          const next = new Set(ids)
          next.delete(exId)
          return next
        })
        return { ...ex, equipment }
      }),
    )
  }

  function openAddPicker() {
    setAddingExercise(true)
    setPickerMuscleId(selectedIds[0] ?? availableMuscles[0]?.id ?? null)
  }

  function handleAddExercise(muscleId: string, exercise: Exercise, equipment: Equipment) {
    const key = exerciseKey(muscleId, exercise.name, equipment)
    if (sessionKeys.has(key)) return

    addToDayRoutine({
      muscleId,
      exerciseName: exercise.name,
      equipment,
      sets: exercise.sets,
      reps: exercise.reps,
    })
    setExercises((prev) => [...prev, catalogToLogged(muscleId, exercise, equipment)])
    setFromDayRoutine(true)
    setAddingExercise(false)
    onRoutineChange?.()
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
    setSavedMsg(
      `Entrenamiento guardado — ${exercises.length} ejercicios, ${prs.length} PR${prs.length === 1 ? '' : 's'} nuevo${prs.length === 1 ? '' : 's'}.`,
    )
    clearDayRoutine()
    setFromDayRoutine(false)
    setExercises([])
    setSelectedIds([])
    setDayLabel('')
    setAddingExercise(false)
    setPickerMuscleId(null)
    onRoutineChange?.()
    onWorkoutSaved?.(prs)
  }

  function markGifFailed(exId: string) {
    setGifFailedIds((prev) => new Set(prev).add(exId))
  }

  return (
    <div className="workout-logger">
      <header className="workout-logger__header">
        <h2>Registrar entrenamiento</h2>
        <p>
          {exercises.length === 0
            ? 'Elegí ejercicios en Explorar o armá por músculos, y registrá peso y reps acá.'
            : 'GIF de referencia arriba; cargá kilos y reps abajo. Podés sumar más ejercicios sin salir.'}
        </p>
      </header>

      {exercises.length === 0 && (
        <BodyHalfFilterBar value={bodyHalfFilter} onChange={onBodyHalfChange} />
      )}

      {exercises.length === 0 ? (
        <>
          {draftCount === 0 && (
            <p className="workout-logger__hint">
              Tip: en Explorar elegí el músculo y tocá «Agregar a rutina del día».
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
            Armar rutina
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
            <button type="button" className="workout-logger__back" onClick={handleClearRoutine}>
              {fromDayRoutine ? 'Limpiar' : 'Cambiar'}
            </button>
          </div>

          <div className="workout-logger__feed">
            {exercises.map((ex) => {
              const fav = favorites.has(exerciseKey(ex.muscleId, ex.exerciseName, ex.equipment))
              const variant = resolveExerciseVariant(ex.muscleId, ex.exerciseName, ex.equipment)
              const catalog = findCatalogExercise(ex.muscleId, ex.exerciseName)
              const gifFailed = gifFailedIds.has(ex.id)
              const equipOptions =
                catalog?.variants.map((v) => v.equipment) ??
                (Object.keys(EQUIPMENT_LABELS) as Equipment[])

              return (
                <article key={ex.id} className="workout-logger__exercise">
                  <div className="workout-logger__demo">
                    {variant && !gifFailed ? (
                      <img
                        src={gifUrl(variant.gifFile)}
                        alt={`Demostración: ${ex.exerciseName}`}
                        className="workout-logger__gif"
                        loading="lazy"
                        onError={() => markGifFailed(ex.id)}
                      />
                    ) : variant ? (
                      <ExerciseIllustration id={variant.illustration} title={ex.exerciseName} />
                    ) : (
                      <div className="workout-logger__demo-empty" aria-hidden="true" />
                    )}
                    <span className="workout-logger__demo-label">
                      {gifFailed || !variant ? 'Sin GIF' : 'Demo'}
                    </span>
                  </div>

                  <header className="workout-logger__ex-head">
                    <div>
                      <span className="workout-logger__ex-muscle">
                        {muscles.find((m) => m.id === ex.muscleId)?.name}
                      </span>
                      <strong>
                        {ex.exerciseName}
                        {fav && (
                          <span className="workout-logger__fav" title="Favorito">
                            {' '}
                            ★
                          </span>
                        )}
                      </strong>
                    </div>
                    <button
                      type="button"
                      className="workout-logger__remove-ex"
                      onClick={() => removeExercise(ex.id)}
                      aria-label="Quitar ejercicio"
                    >
                      Quitar
                    </button>
                  </header>

                  {equipOptions.length > 1 ? (
                    <div className="workout-logger__equip-row" role="group" aria-label="Equipo">
                      {equipOptions.map((eq) => (
                        <button
                          key={eq}
                          type="button"
                          className={`workout-logger__equip-chip${ex.equipment === eq ? ' workout-logger__equip-chip--active' : ''}`}
                          aria-pressed={ex.equipment === eq}
                          onClick={() => updateEquipment(ex.id, eq)}
                        >
                          {EQUIPMENT_LABELS[eq]}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="workout-logger__equip-tag">
                      {EQUIPMENT_LABELS[ex.equipment]}
                    </span>
                  )}

                  {variant?.formGuide && (
                    <p className="workout-logger__form">{variant.formGuide}</p>
                  )}

                  <div className="workout-logger__sets">
                    <div className="workout-logger__sets-head" aria-hidden="true">
                      <span>#</span>
                      <span>Kg</span>
                      <span>Reps</span>
                      <span>Desc.</span>
                      <span />
                    </div>
                    {ex.sets.map((set, idx) => (
                      <div key={idx} className="workout-logger__set-row">
                        <span className="workout-logger__set-num">{idx + 1}</span>
                        <label className="workout-logger__set-field">
                          <span className="visually-hidden">Kg serie {idx + 1}</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step={0.5}
                            value={set.weightKg || ''}
                            placeholder="0"
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'weightKg', parseFloat(e.target.value) || 0)
                            }
                          />
                        </label>
                        <label className="workout-logger__set-field">
                          <span className="visually-hidden">Reps serie {idx + 1}</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            value={set.reps || ''}
                            placeholder="0"
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'reps', parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </label>
                        <label className="workout-logger__set-field">
                          <span className="visually-hidden">Descanso serie {idx + 1}</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={15}
                            value={set.restSec ?? ''}
                            placeholder="90"
                            onChange={(e) =>
                              updateSet(ex.id, idx, 'restSec', parseInt(e.target.value, 10) || 0)
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className="workout-logger__remove-set"
                          onClick={() => removeSet(ex.id, idx)}
                          aria-label={`Quitar serie ${idx + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
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
                </article>
              )
            })}
          </div>

          {!addingExercise ? (
            <button type="button" className="workout-logger__add-exercise" onClick={openAddPicker}>
              + Sumar ejercicio
            </button>
          ) : (
            <div className="workout-logger__add-panel">
              <div className="workout-logger__add-panel-head">
                <h4>Sumar ejercicio</h4>
                <button
                  type="button"
                  className="workout-logger__back"
                  onClick={() => setAddingExercise(false)}
                >
                  Cerrar
                </button>
              </div>

              <p className="workout-logger__add-hint">Elegí músculo y tocá el ejercicio.</p>

              <div className="workout-logger__add-muscles" role="listbox" aria-label="Músculo">
                {addPickerMuscles.map((muscle) => (
                  <button
                    key={muscle.id}
                    type="button"
                    role="option"
                    aria-selected={pickerMuscleId === muscle.id}
                    className={`workout-logger__add-muscle${pickerMuscleId === muscle.id ? ' workout-logger__add-muscle--active' : ''}`}
                    onClick={() => setPickerMuscleId(muscle.id)}
                  >
                    {muscle.name}
                  </button>
                ))}
              </div>

              <ul className="workout-logger__add-list">
                {pickerExercises.map((exercise) => {
                  const defaultEq = exercise.variants[0]?.equipment
                  if (!defaultEq) return null
                  const already = exercise.variants.every((v) =>
                    sessionKeys.has(exerciseKey(pickerMuscleId!, exercise.name, v.equipment)),
                  )
                  return (
                    <li key={exercise.name} className="workout-logger__add-item">
                      <div>
                        <strong>{exercise.name}</strong>
                        <span>
                          {exercise.sets} × {exercise.reps}
                        </span>
                      </div>
                      <div className="workout-logger__add-item-actions">
                        {exercise.variants.map((v) => {
                          const key = exerciseKey(pickerMuscleId!, exercise.name, v.equipment)
                          const inSession = sessionKeys.has(key)
                          return (
                            <button
                              key={v.equipment}
                              type="button"
                              className="workout-logger__add-eq"
                              disabled={inSession}
                              onClick={() =>
                                pickerMuscleId &&
                                handleAddExercise(pickerMuscleId, exercise, v.equipment)
                              }
                            >
                              {inSession ? '✓ ' : '+ '}
                              {EQUIPMENT_LABELS[v.equipment]}
                            </button>
                          )
                        })}
                      </div>
                      {already && (
                        <p className="workout-logger__add-done">Ya está en la sesión</p>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

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
