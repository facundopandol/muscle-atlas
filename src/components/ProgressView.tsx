import { useMemo, useState } from 'react'
import type { MuscleMapValues } from '@musclemap/core'
import { getBodyDiagram } from '@musclemap/assets'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure } from '@musclemap/react'
import { getVisibleMuscleGroups } from '@musclemap/core'
import { muscleIdToMmGroup, MUSCLE_HIGHLIGHT_COLOR } from '../lib/muscleMapBridge'
import { getMuscleScore, getPeriodComparison, loadCompletedWorkouts } from '../lib/workoutStorage'
import { muscles } from '../data/muscles'
import './ProgressView.css'

type Period = 'week' | 'month'

interface ProgressViewProps {
  refreshKey?: number
}

export function ProgressView({ refreshKey = 0 }: ProgressViewProps) {
  const [period, setPeriod] = useState<Period>('week')
  const [localRefresh, setLocalRefresh] = useState(0)
  const effectiveRefresh = refreshKey + localRefresh

  const comparison = useMemo(() => getPeriodComparison(period), [period, effectiveRefresh])
  const history = useMemo(() => loadCompletedWorkouts().slice(0, 8), [effectiveRefresh])

  const currentValues = useMemo((): MuscleMapValues => {
    const values: MuscleMapValues = {}
    for (const stat of comparison.current.muscleStats) {
      const group = muscleIdToMmGroup(stat.muscleId)
      if (!group) continue
      const score = getMuscleScore(stat.muscleId, comparison.current.muscleStats)
      const prev = values[group]?.score ?? 0
      if (score > prev) values[group] = { score }
    }
    return values
  }, [comparison.current.muscleStats])

  const previousValues = useMemo((): MuscleMapValues => {
    const values: MuscleMapValues = {}
    for (const stat of comparison.previous.muscleStats) {
      const group = muscleIdToMmGroup(stat.muscleId)
      if (!group) continue
      const score = getMuscleScore(stat.muscleId, comparison.previous.muscleStats)
      const prev = values[group]?.score ?? 0
      if (score > prev) values[group] = { score }
    }
    return values
  }, [comparison.previous.muscleStats])

  const frontDiagram = getBodyDiagram('MALE', 'FRONT')
  const backDiagram = getBodyDiagram('MALE', 'BACK')
  const visibleFront = new Set(getVisibleMuscleGroups('FRONT', 'FULL_BODY'))
  const visibleBack = new Set(getVisibleMuscleGroups('BACK', 'FULL_BODY'))

  const allMuscleIds = muscles.map((m) => m.id)
  const comparisonRows = allMuscleIds
    .map((muscleId) => {
      const name = muscles.find((m) => m.id === muscleId)?.name ?? muscleId
      const cur = comparison.current.muscleStats.find((s) => s.muscleId === muscleId)?.sessions ?? 0
      const prev = comparison.previous.muscleStats.find((s) => s.muscleId === muscleId)?.sessions ?? 0
      return { muscleId, name, cur, prev, delta: cur - prev }
    })
    .filter((r) => r.cur > 0 || r.prev > 0)
    .sort((a, b) => b.cur - a.cur)

  return (
    <div className="progress-view">
      <header className="progress-view__header">
        <h2>Tu progreso</h2>
        <p>Compara cuántas veces entrenaste cada zona esta semana o este mes.</p>
      </header>

      <div className="progress-view__period" role="tablist" aria-label="Periodo de comparación">
        <button
          type="button"
          role="tab"
          aria-selected={period === 'week'}
          className={`progress-view__period-btn${period === 'week' ? ' progress-view__period-btn--active' : ''}`}
          onClick={() => setPeriod('week')}
        >
          Semanal
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={period === 'month'}
          className={`progress-view__period-btn${period === 'month' ? ' progress-view__period-btn--active' : ''}`}
          onClick={() => setPeriod('month')}
        >
          Mensual
        </button>
        <button type="button" className="progress-view__refresh" onClick={() => setLocalRefresh((k) => k + 1)}>
          Actualizar
        </button>
      </div>

      <div className="progress-view__summary">
        <div className="progress-view__card">
          <span className="progress-view__card-label">{comparison.currentLabel}</span>
          <strong className="progress-view__card-value">{comparison.current.workouts}</strong>
          <span className="progress-view__card-sub">entrenamientos</span>
        </div>
        <div className="progress-view__card progress-view__card--muted">
          <span className="progress-view__card-label">{comparison.previousLabel}</span>
          <strong className="progress-view__card-value">{comparison.previous.workouts}</strong>
          <span className="progress-view__card-sub">entrenamientos</span>
        </div>
        <div className="progress-view__card">
          <span className="progress-view__card-label">Diferencia</span>
          <strong
            className={`progress-view__card-value${
              comparison.current.workouts >= comparison.previous.workouts
                ? ' progress-view__card-value--up'
                : ' progress-view__card-value--down'
            }`}
          >
            {comparison.current.workouts >= comparison.previous.workouts ? '+' : ''}
            {comparison.current.workouts - comparison.previous.workouts}
          </strong>
          <span className="progress-view__card-sub">vs periodo anterior</span>
        </div>
      </div>

      <div className="progress-view__maps">
        <div className="progress-view__map-block">
          <h3>Periodo actual</h3>
          <div className="progress-view__map-row">
            <BodyFigure
              diagram={frontDiagram}
              values={currentValues}
              colorModel="LOAD"
              monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
              monochromeBaseColor="#9ca3af"
              visibleGroups={visibleFront}
              activeGroup={null}
              glow
              idPrefix="progress-cur-front"
              width={140}
              backgroundImage={maleFront}
              backgroundGrayscale
              backgroundOpacity={0.35}
              onHover={() => undefined}
              onSelect={() => undefined}
            />
            <BodyFigure
              diagram={backDiagram}
              values={currentValues}
              colorModel="LOAD"
              monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
              monochromeBaseColor="#9ca3af"
              visibleGroups={visibleBack}
              activeGroup={null}
              glow
              idPrefix="progress-cur-back"
              width={140}
              backgroundImage={maleBack}
              backgroundGrayscale
              backgroundOpacity={0.35}
              onHover={() => undefined}
              onSelect={() => undefined}
            />
          </div>
        </div>
        <div className="progress-view__map-block">
          <h3>Periodo anterior</h3>
          <div className="progress-view__map-row">
            <BodyFigure
              diagram={frontDiagram}
              values={previousValues}
              colorModel="LOAD"
              monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
              monochromeBaseColor="#9ca3af"
              visibleGroups={visibleFront}
              activeGroup={null}
              glow
              idPrefix="progress-prev-front"
              width={140}
              backgroundImage={maleFront}
              backgroundGrayscale
              backgroundOpacity={0.35}
              onHover={() => undefined}
              onSelect={() => undefined}
            />
            <BodyFigure
              diagram={backDiagram}
              values={previousValues}
              colorModel="LOAD"
              monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
              monochromeBaseColor="#9ca3af"
              visibleGroups={visibleBack}
              activeGroup={null}
              glow
              idPrefix="progress-prev-back"
              width={140}
              backgroundImage={maleBack}
              backgroundGrayscale
              backgroundOpacity={0.35}
              onHover={() => undefined}
              onSelect={() => undefined}
            />
          </div>
        </div>
      </div>

      {comparisonRows.length > 0 ? (
        <section className="progress-view__table-wrap">
          <h3>Comparación por músculo</h3>
          <table className="progress-view__table">
            <thead>
              <tr>
                <th>Músculo</th>
                <th>Actual</th>
                <th>Anterior</th>
                <th>Δ</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.muscleId}>
                  <td>{row.name}</td>
                  <td>{row.cur}</td>
                  <td>{row.prev}</td>
                  <td className={row.delta > 0 ? 'progress-view__up' : row.delta < 0 ? 'progress-view__down' : ''}>
                    {row.delta > 0 ? `+${row.delta}` : row.delta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <p className="progress-view__empty">
          Aún no hay entrenamientos registrados. Arma una rutina en la pestaña Rutinas y márcala como completada.
        </p>
      )}

      {history.length > 0 && (
        <section className="progress-view__history">
          <h3>Últimos entrenamientos</h3>
          <ul>
            {history.map((w) => (
              <li key={w.id}>
                <time dateTime={w.date}>
                  {new Date(w.date + 'T12:00:00').toLocaleDateString('es-ES', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </time>
                <span>{w.label}</span>
                <span className="progress-view__history-meta">{w.exercises.length} ejercicios</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
