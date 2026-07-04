import { useMemo, useState } from 'react'
import { BodyDiagram } from './components/BodyDiagram'
import { MuscleDetailView } from './components/MuscleDetailView'
import { MusclePanel } from './components/MusclePanel'
import { MuscleSearch } from './components/MuscleSearch'
import { AppNav } from './components/AppNav'
import { BodyHalfFilterBar } from './components/BodyHalfFilter'
import { RoutineBuilder } from './components/RoutineBuilder'
import { ProgressView } from './components/ProgressView'
import type { SearchResult } from './lib/searchIndex'
import { muscleMatchesBodyHalf } from './lib/bodyHalf'
import { getDefaultHeadId, getMuscleDetail } from './data/muscleHeads'
import { muscleMap } from './data/muscles'
import type { AppMode, AppSection, BodyHalfFilter, BodyView, ExerciseFocus } from './types'
import './App.css'

function App() {
  const [section, setSection] = useState<AppSection>('explore')
  const [bodyHalfFilter, setBodyHalfFilter] = useState<BodyHalfFilter>('all')
  const [view, setView] = useState<BodyView>('front')
  const [mode, setMode] = useState<AppMode>({ type: 'body' })
  const [hoveredMuscleId, setHoveredMuscleId] = useState<string | null>(null)
  const [exerciseFocus, setExerciseFocus] = useState<ExerciseFocus | null>(null)
  const [progressRefresh, setProgressRefresh] = useState(0)

  const detailMuscleId = mode.type === 'detail' ? mode.muscleId : null
  const activeHeadId = mode.type === 'detail' ? mode.headId : null

  const previewMuscleId = mode.type === 'body' ? hoveredMuscleId : detailMuscleId
  const displayMuscle = previewMuscleId ? muscleMap.get(previewMuscleId) ?? null : null

  const detailConfig = detailMuscleId ? getMuscleDetail(detailMuscleId) : undefined
  const activeHead = detailConfig?.heads.find((h) => h.id === activeHeadId) ?? detailConfig?.heads[0] ?? null

  const viewMuscles = useMemo(
    () =>
      [...muscleMap.values()].filter(
        (m) => m.view === view && muscleMatchesBodyHalf(m.id, bodyHalfFilter),
      ),
    [view, bodyHalfFilter],
  )

  function openMuscleDetail(muscleId: string, requiredView?: BodyView) {
    const muscle = muscleMap.get(muscleId)
    const nextView = requiredView ?? muscle?.view ?? 'front'
    setSection('explore')
    setView(nextView)
    setExerciseFocus(null)
    setHoveredMuscleId(null)
    const defaultHead = getDefaultHeadId(muscleId)
    setMode({ type: 'detail', muscleId, headId: defaultHead })
  }

  function handleSearchSelect(result: SearchResult) {
    setSection('explore')
    setView(result.view)
    setExerciseFocus(
      result.exerciseName || result.equipment
        ? { exerciseName: result.exerciseName, equipment: result.equipment }
        : null,
    )
    const defaultHead = getDefaultHeadId(result.muscleId)
    setMode({ type: 'detail', muscleId: result.muscleId, headId: defaultHead })
  }

  function handleBackToBody() {
    setMode({ type: 'body' })
    setExerciseFocus(null)
  }

  function handleHeadSelect(headId: string) {
    if (mode.type !== 'detail') return
    setMode({ ...mode, headId })
  }

  function handleMuscleSelectFromMap(muscleId: string, requiredView: BodyView) {
    openMuscleDetail(muscleId, requiredView)
  }

  function handleSectionChange(next: AppSection) {
    setSection(next)
    if (next !== 'explore') {
      setMode({ type: 'body' })
      setExerciseFocus(null)
      setHoveredMuscleId(null)
    }
  }

  const subtitleBySection: Record<AppSection, string> = {
    explore:
      'Cuerpo anatómico realista: pasa el cursor, filtra por tren superior o inferior, y haz clic para ver cabezas y ejercicios.',
    routines: 'Elige 1 a 3 grupos musculares por día y genera una rutina con ejercicios sugeridos.',
    progress: 'Compara tus entrenamientos semana a semana o mes a mes.',
  }

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Anatomía interactiva</p>
          <h1>Muscle Atlas</h1>
          <p className="app__subtitle">{subtitleBySection[section]}</p>
          {section === 'explore' && <MuscleSearch onSelectResult={handleSearchSelect} />}
          <AppNav section={section} onSectionChange={handleSectionChange} />
        </div>
      </header>

      <main className={`app__main${section !== 'explore' ? ' app__main--single' : ''}`}>
        {section === 'explore' && (
          <>
            <section className="app__diagram-section">
              <BodyHalfFilterBar value={bodyHalfFilter} onChange={setBodyHalfFilter} />

              <div className="view-controls">
                <button
                  type="button"
                  className={`view-btn${view === 'front' ? ' view-btn--active' : ''}`}
                  onClick={() => setView('front')}
                  disabled={mode.type === 'detail'}
                >
                  Vista frontal
                </button>
                <button
                  type="button"
                  className={`view-btn${view === 'back' ? ' view-btn--active' : ''}`}
                  onClick={() => setView('back')}
                  disabled={mode.type === 'detail'}
                >
                  Vista posterior
                </button>
              </div>

              {mode.type === 'body' ? (
                <BodyDiagram
                  view={view}
                  bodyHalfFilter={bodyHalfFilter}
                  hoveredMuscleId={hoveredMuscleId}
                  onMuscleHover={setHoveredMuscleId}
                  onMuscleSelect={handleMuscleSelectFromMap}
                />
              ) : (
                <MuscleDetailView
                  muscleId={mode.muscleId}
                  activeHeadId={mode.headId}
                  onHeadSelect={handleHeadSelect}
                  onBack={handleBackToBody}
                />
              )}

              {mode.type === 'body' && (
                <div className="muscle-chips" aria-label="Acceso rápido">
                  {viewMuscles.map((muscle) => (
                    <button
                      key={muscle.id}
                      type="button"
                      className={`muscle-chip${hoveredMuscleId === muscle.id ? ' muscle-chip--active' : ''}`}
                      onMouseEnter={() => setHoveredMuscleId(muscle.id)}
                      onMouseLeave={() => setHoveredMuscleId(null)}
                      onClick={() => openMuscleDetail(muscle.id, muscle.view)}
                    >
                      {muscle.name}
                    </button>
                  ))}
                </div>
              )}
            </section>

            <MusclePanel
              muscle={displayMuscle}
              activeHead={mode.type === 'detail' ? activeHead : null}
              pinned={mode.type === 'detail'}
              preview={mode.type === 'body' && hoveredMuscleId !== null}
              exerciseFocus={exerciseFocus}
            />
          </>
        )}

        {section === 'routines' && (
          <RoutineBuilder
            bodyHalfFilter={bodyHalfFilter}
            onBodyHalfChange={setBodyHalfFilter}
            onWorkoutSaved={() => setProgressRefresh((k) => k + 1)}
          />
        )}

        {section === 'progress' && <ProgressView key={progressRefresh} />}
      </main>
    </div>
  )
}

export default App
