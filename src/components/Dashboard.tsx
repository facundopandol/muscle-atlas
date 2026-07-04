import { useMemo } from 'react'
import { getDashboardStats, formatVolume, formatDateShort } from '../lib/analytics'
import { compareWithPreviousPr } from '../lib/analytics'
import { EQUIPMENT_LABELS } from '../types'
import './Dashboard.css'

interface DashboardProps {
  onStartWorkout: () => void
  onExplore: () => void
  refreshKey: number
}

export function Dashboard({ onStartWorkout, onExplore, refreshKey }: DashboardProps) {
  const stats = useMemo(() => getDashboardStats(), [refreshKey])

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h2>Tu entrenamiento</h2>
        <p>Resumen del mes y progreso reciente.</p>
      </header>

      <div className="dashboard__stats">
        <article className="dashboard__stat">
          <span className="dashboard__stat-value">{stats.workoutsThisMonth}</span>
          <span className="dashboard__stat-label">Entrenamientos este mes</span>
        </article>
        <article className="dashboard__stat">
          <span className="dashboard__stat-value">{stats.totalSets}</span>
          <span className="dashboard__stat-label">Series realizadas</span>
        </article>
        <article className="dashboard__stat">
          <span className="dashboard__stat-value">{formatVolume(stats.totalVolumeKg)}</span>
          <span className="dashboard__stat-label">Peso movido</span>
        </article>
        <article className="dashboard__stat dashboard__stat--accent">
          <span className="dashboard__stat-value">{stats.prsThisMonth}</span>
          <span className="dashboard__stat-label">PR obtenidos</span>
        </article>
      </div>

      <div className="dashboard__actions">
        <button type="button" className="dashboard__btn dashboard__btn--primary" onClick={onStartWorkout}>
          Registrar entrenamiento
        </button>
        <button type="button" className="dashboard__btn dashboard__btn--secondary" onClick={onExplore}>
          Explorar cuerpo
        </button>
      </div>

      {stats.recentPrs.length > 0 && (
        <section className="dashboard__prs">
          <h3>Récords recientes</h3>
          <ul>
            {stats.recentPrs.map((pr) => {
              const prev = compareWithPreviousPr(pr.key, pr)
              return (
                <li key={`${pr.key}-${pr.date}`} className="dashboard__pr">
                  <div className="dashboard__pr-main">
                    <strong>{pr.exerciseName}</strong>
                    <span className="dashboard__pr-badge">PR</span>
                  </div>
                  <p className="dashboard__pr-value">
                    {pr.weightKg} kg × {pr.reps}
                    <span className="dashboard__pr-date">{formatDateShort(pr.date)}</span>
                  </p>
                  {prev && (
                    <p className="dashboard__pr-prev">
                      Anterior: {prev.weightKg} kg × {prev.reps} ({EQUIPMENT_LABELS[prev.equipment]})
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <section className="dashboard__legend">
        <h3>Mapa de recuperación</h3>
        <ul className="dashboard__legend-list">
          <li><span className="dashboard__dot dashboard__dot--fresh" /> Entrenado hace 1–2 días</li>
          <li><span className="dashboard__dot dashboard__dot--recent" /> Hace varios días</li>
          <li><span className="dashboard__dot dashboard__dot--moderate" /> Hace ~1 semana</li>
          <li><span className="dashboard__dot dashboard__dot--long" /> Hace más de una semana</li>
          <li><span className="dashboard__dot dashboard__dot--never" /> Sin entrenar</li>
        </ul>
        <p className="dashboard__legend-hint">En Explorar, el cuerpo se colorea según cuándo entrenaste cada zona.</p>
      </section>
    </div>
  )
}
