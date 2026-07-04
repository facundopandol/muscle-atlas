import type { AppSection } from '../types'
import './AppNav.css'

interface AppNavProps {
  section: AppSection
  onSectionChange: (section: AppSection) => void
  routineCount?: number
}

const SECTIONS: Array<{ id: AppSection; label: string }> = [
  { id: 'dashboard', label: 'Inicio' },
  { id: 'explore', label: 'Explorar' },
  { id: 'routines', label: 'Entrenar' },
  { id: 'progress', label: 'Progreso' },
]

export function AppNav({ section, onSectionChange, routineCount = 0 }: AppNavProps) {
  return (
    <nav className="app-nav" aria-label="Secciones principales">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`app-nav__btn${section === id ? ' app-nav__btn--active' : ''}`}
          aria-current={section === id ? 'page' : undefined}
          onClick={() => onSectionChange(id)}
        >
          {label}
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
