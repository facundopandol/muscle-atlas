import type { BodyHalfFilter } from '../types'
import { BODY_HALF_LABELS } from '../lib/bodyHalf'
import './BodyHalfFilter.css'

interface BodyHalfFilterProps {
  value: BodyHalfFilter
  onChange: (value: BodyHalfFilter) => void
}

const OPTIONS: BodyHalfFilter[] = ['all', 'upper', 'lower']

export function BodyHalfFilterBar({ value, onChange }: BodyHalfFilterProps) {
  return (
    <div className="body-half-filter" role="group" aria-label="Filtrar por tren corporal">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`body-half-filter__btn${value === opt ? ' body-half-filter__btn--active' : ''}`}
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
        >
          {BODY_HALF_LABELS[opt]}
        </button>
      ))}
    </div>
  )
}
