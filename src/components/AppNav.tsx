import type { AppSection } from '../types'
import './AppNav.css'

interface AppNavProps {
  section: AppSection
  onSectionChange: (section: AppSection) => void
  routineCount?: number
  variant?: 'top' | 'bottom'
}

const SECTIONS: Array<{ id: AppSection; label: string; short: string }> = [
  { id: 'dashboard', label: 'Inicio', short: 'Inicio' },
  { id: 'explore', label: 'Explorar', short: 'Explorar' },
  { id: 'routines', label: 'Entrenar', short: 'Entrenar' },
  { id: 'progress', label: 'Progreso', short: 'Progreso' },
]

export function AppNav({
  section,
  onSectionChange,
  routineCount = 0,
  variant = 'top',
}: AppNavProps) {
  return (
    <nav
      className={`app-nav app-nav--${variant}`}
      aria-label="Secciones principales"
    >
      {SECTIONS.map(({ id, label, short }) => (
        <button
          key={id}
          type="button"
          className={`app-nav__btn${section === id ? ' app-nav__btn--active' : ''}`}
          aria-current={section === id ? 'page' : undefined}
          onClick={() => onSectionChange(id)}
        >
          <span className="app-nav__label app-nav__label--full">{label}</span>
          <span className="app-nav__label app-nav__label--short">{short}</span>
          {id === 'routines' && routineCount > 0 && (
            <span className="app-nav__badge" aria-label={`${routineCount} ejercicios en rutina`}>
              {routineCount}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}
