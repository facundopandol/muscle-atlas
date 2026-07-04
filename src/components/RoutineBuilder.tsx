import { useMemo, useState } from 'react'
import { muscles } from '../data/muscles'
import { buildWorkoutPlan } from '../lib/routines'
import { saveCompletedWorkout } from '../lib/workoutStorage'
import { muscleMatchesBodyHalf } from '../lib/bodyHalf'
import { EQUIPMENT_LABELS } from '../types'
import type { BodyHalfFilter, WorkoutDayPlan } from '../types'
import { BodyHalfFilterBar } from './BodyHalfFilter'
import './RoutineBuilder.css'

interface RoutineBuilderProps {
  bodyHalfFilter: BodyHalfFilter
  onBodyHalfChange: (filter: BodyHalfFilter) => void
  onWorkoutSaved?: () => void
}

const MAX_MUSCLES = 3

export function RoutineBuilder({ bodyHalfFilter, onBodyHalfChange, onWorkoutSaved }: RoutineBuilderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [dayLabel, setDayLabel] = useState('')
  const [plan, setPlan] = useState<WorkoutDayPlan | null>(null)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)

  const availableMuscles = useMemo(
    () => muscles.filter((m) => muscleMatchesBodyHalf(m.id, bodyHalfFilter)),
    [bodyHalfFilter],
  )

  function toggleMuscle(muscleId: string) {
    setSavedMsg(null)
    setPlan(null)
    setSelectedIds((prev) => {
      if (prev.includes(muscleId)) return prev.filter((id) => id !== muscleId)
      if (prev.length >= MAX_MUSCLES) return prev
      return [...prev, muscleId]
    })
  }

  function handleBuild() {
    if (selectedIds.length === 0) return
    setPlan(buildWorkoutPlan(selectedIds, dayLabel))
    setSavedMsg(null)
  }

  function handleSave() {
    if (!plan) return
    saveCompletedWorkout(plan)
    setSavedMsg(`Rutina guardada — ${plan.exercises.length} ejercicios registrados.`)
    setPlan(null)
    setSelectedIds([])
    setDayLabel('')
    onWorkoutSaved?.()
  }

  return (
    <div className="routine-builder">
      <header className="routine-builder__header">
        <h2>Armar rutina del día</h2>
        <p>Elige 1 a 3 grupos musculares y te sugerimos ejercicios con series y repeticiones.</p>
      </header>

      <BodyHalfFilterBar value={bodyHalfFilter} onChange={onBodyHalfChange} />

      <div className="routine-builder__picker">
        <p className="routine-builder__picker-label">
          Grupos seleccionados: {selectedIds.length}/{MAX_MUSCLES}
        </p>
        <div className="routine-builder__muscles" role="group" aria-label="Grupos musculares">
          {availableMuscles.map((muscle) => {
            const selected = selectedIds.includes(muscle.id)
            const disabled = !selected && selectedIds.length >= MAX_MUSCLES
            return (
              <button
                key={muscle.id}
                type="button"
                className={`routine-builder__muscle${selected ? ' routine-builder__muscle--selected' : ''}`}
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

      <label className="routine-builder__label">
        Nombre del día (opcional)
        <input
          type="text"
          className="routine-builder__input"
          placeholder="Ej. Push, Pierna, Brazo…"
          value={dayLabel}
          onChange={(e) => setDayLabel(e.target.value)}
        />
      </label>

      <button
        type="button"
        className="routine-builder__build"
        disabled={selectedIds.length === 0}
        onClick={handleBuild}
      >
        Armar rutina
      </button>

      {plan && (
        <section className="routine-builder__plan" aria-label="Rutina generada">
          <h3>{plan.label}</h3>
          <ul className="routine-builder__exercises">
            {plan.exercises.map((ex) => (
              <li key={`${ex.muscleId}-${ex.exerciseName}`}>
                <span className="routine-builder__ex-muscle">{ex.muscleName}</span>
                <strong>{ex.exerciseName}</strong>
                <span className="routine-builder__ex-meta">
                  {ex.sets}×{ex.reps} · {EQUIPMENT_LABELS[ex.equipment]}
                </span>
              </li>
            ))}
          </ul>
          <button type="button" className="routine-builder__save" onClick={handleSave}>
            Marcar como entrenamiento completado
          </button>
        </section>
      )}

      {savedMsg && <p className="routine-builder__toast">{savedMsg}</p>}
    </div>
  )
}
