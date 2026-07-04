import type { AppSection } from '../types'
import './AppNav.css'

interface AppNavProps {
  section: AppSection
  onSectionChange: (section: AppSection) => void
}

const SECTIONS: Array<{ id: AppSection; label: string }> = [
  { id: 'dashboard', label: 'Inicio' },
  { id: 'explore', label: 'Explorar' },
  { id: 'routines', label: 'Entrenar' },
  { id: 'progress', label: 'Progreso' },
]

export function AppNav({ section, onSectionChange }: AppNavProps) {
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
        </button>
      ))}
    </nav>
  )
}
