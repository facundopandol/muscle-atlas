import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  EQUIPMENT_QUICK_FILTERS,
  searchAtlas,
  type SearchResult,
} from '../lib/searchIndex'
import { EQUIPMENT_LABELS, type Equipment } from '../types'
import './MuscleSearch.css'

interface MuscleSearchProps {
  onSelectResult: (result: SearchResult) => void
}

export function MuscleSearch({ onSelectResult }: MuscleSearchProps) {
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => searchAtlas(query), [query])

  useEffect(() => {
    if (query.trim().length >= 2) setIsOpen(true)
  }, [query])

  function handleSelect(result: SearchResult) {
    onSelectResult(result)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
  }

  function handleEquipmentFilter(equipment: Equipment) {
    const label = EQUIPMENT_LABELS[equipment]
    setQuery(label)
    setIsOpen(true)
  }

  const showResults = isOpen && query.trim().length >= 2

  return (
    <div className="muscle-search">
      <label className="muscle-search__label" htmlFor="muscle-search-input">
        Buscar músculo o equipo
      </label>
      <div className="muscle-search__input-wrap">
        <input
          ref={inputRef}
          id="muscle-search-input"
          type="search"
          className="muscle-search__input"
          placeholder="Ej. bíceps, polea, prensa, dorsales…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
          role="combobox"
          aria-expanded={showResults}
          aria-controls={listId}
          aria-autocomplete="list"
        />
        {query && (
          <button
            type="button"
            className="muscle-search__clear"
            onClick={() => {
              setQuery('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      <div className="muscle-search__filters" role="group" aria-label="Filtrar por equipo">
        {EQUIPMENT_QUICK_FILTERS.map(({ equipment, label }) => (
          <button
            key={equipment}
            type="button"
            className="muscle-search__filter-chip"
            onClick={() => handleEquipmentFilter(equipment)}
          >
            {label}
          </button>
        ))}
      </div>

      {showResults && (
        <ul id={listId} className="muscle-search__results" role="listbox">
          {results.length === 0 ? (
            <li className="muscle-search__empty">No hay resultados para «{query}»</li>
          ) : (
            results.slice(0, 12).map((result) => (
              <li key={`${result.muscleId}-${result.exerciseName ?? ''}-${result.equipment ?? ''}`}>
                <button
                  type="button"
                  className="muscle-search__result"
                  role="option"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(result)}
                >
                  <span className="muscle-search__result-muscle">{result.muscleName}</span>
                  <span className="muscle-search__result-meta">
                    {result.exerciseName && <span>{result.exerciseName}</span>}
                    {result.equipment && (
                      <span className="muscle-search__result-equipment">
                        {EQUIPMENT_LABELS[result.equipment]}
                      </span>
                    )}
                  </span>
                  <span className="muscle-search__result-hint">
                    Trabaja: <strong>{result.muscleName}</strong>
                    {' · '}
                    {result.matchLabel}
                  </span>
                </button>
              </li>
            ))
          )}
          {results.length > 12 && (
            <li className="muscle-search__more">
              +{results.length - 12} resultados más — afina la búsqueda
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
