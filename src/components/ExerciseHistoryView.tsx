import { useMemo } from 'react'
import { getExerciseHistory, formatDateShort } from '../lib/analytics'
import type { Equipment } from '../types'
import './ExerciseHistoryView.css'

interface ExerciseHistoryViewProps {
  muscleId: string
  exerciseName: string
  equipment: Equipment
  onClose: () => void
}

export function ExerciseHistoryView({
  muscleId,
  exerciseName,
  equipment,
  onClose,
}: ExerciseHistoryViewProps) {
  const history = useMemo(
    () => getExerciseHistory(muscleId, exerciseName, equipment),
    [muscleId, exerciseName, equipment],
  )

  const chartPoints = useMemo(() => {
    const sorted = [...history].reverse().slice(-12)
    if (sorted.length === 0) return []
    const maxW = Math.max(...sorted.map((h) => h.weightKg), 1)
    const w = 280
    const h = 100
    const pad = 8
    return sorted.map((entry, i) => ({
      x: pad + (i / Math.max(sorted.length - 1, 1)) * (w - pad * 2),
      y: h - pad - (entry.weightKg / maxW) * (h - pad * 2),
      entry,
    }))
  }, [history])

  const polyline = chartPoints.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div className="exercise-history">
      <header className="exercise-history__header">
        <div>
          <h3>{exerciseName}</h3>
          <p>Historial de fuerza</p>
        </div>
        <button type="button" className="exercise-history__close" onClick={onClose}>
          Cerrar
        </button>
      </header>

      {history.length === 0 ? (
        <p className="exercise-history__empty">Todavía no hay registros para este ejercicio.</p>
      ) : (
        <>
          <div className="exercise-history__chart-wrap">
            <svg viewBox="0 0 280 100" className="exercise-history__chart" aria-hidden>
              <polyline points={polyline} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
              {chartPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="var(--accent)" />
              ))}
            </svg>
            <p className="exercise-history__chart-label">Evolución del peso (kg)</p>
          </div>

          <table className="exercise-history__table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Kg</th>
                <th>Reps</th>
                <th>Series</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={`${row.sessionId}-${row.date}`}>
                  <td>{formatDateShort(row.date)}</td>
                  <td>{row.weightKg}</td>
                  <td>{row.reps}</td>
                  <td>{row.sets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
