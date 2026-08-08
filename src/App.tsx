import { useMemo, useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { ExploreCards, type ExploreLevel } from './components/ExploreCards'
import { MusclePanel } from './components/MusclePanel'
import { MuscleSearch } from './components/MuscleSearch'
import { AppNav } from './components/AppNav'
import { WorkoutLogger } from './components/WorkoutLogger'
import { ProgressView } from './components/ProgressView'
import type { SearchResult } from './lib/searchIndex'
import { getMuscleBodyHalf } from './lib/bodyHalf'
import { getMuscleDetail } from './data/muscleHeads'
import { EXPLORE_GROUPS } from './data/exploreHierarchy'
import { muscleMap } from './data/muscles'
import { getDayRoutineCount } from './lib/trainingStorage'
import type { AppSection, BodyHalfFilter, ExerciseFocus } from './types'
import './App.css'

function findGroupForMuscle(muscleId: string) {
  return EXPLORE_GROUPS.find((g) => g.muscleIds.includes(muscleId))
}

function App() {
  const [section, setSection] = useState<AppSection>('dashboard')
  const [exploreLevel, setExploreLevel] = useState<ExploreLevel>({ step: 'half' })
  const [selectedMuscleId, setSelectedMuscleId] = useState<string | null>(null)
  const [selectedHeadId, setSelectedHeadId] = useState<string | null>(null)
  const [exerciseFocus, setExerciseFocus] = useState<ExerciseFocus | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [routineRefreshKey, setRoutineRefreshKey] = useState(0)
  const [routineMuscleIds, setRoutineMuscleIds] = useState<string[]>([])

  const dayRoutineCount = useMemo(
    () => getDayRoutineCount(),
    [routineRefreshKey, refreshKey],
  )

  const displayMuscle = selectedMuscleId ? muscleMap.get(selectedMuscleId) ?? null : null
  const detailConfig = selectedMuscleId ? getMuscleDetail(selectedMuscleId) : undefined
  const headOptions = detailConfig?.heads ?? []
  const activeHead = headOptions.find((h) => h.id === selectedHeadId) ?? null

  const bodyHalfFilter: BodyHalfFilter =
    exploreLevel.step === 'half' ? 'all' : exploreLevel.half

  function bumpRefresh() {
    setRefreshKey((k) => k + 1)
  }

  function bumpRoutineRefresh() {
    setRoutineRefreshKey((k) => k + 1)
  }

  function clearMuscleSelection() {
    setSelectedMuscleId(null)
    setSelectedHeadId(null)
    setExerciseFocus(null)
  }

  function handleLevelChange(level: ExploreLevel) {
    setExploreLevel(level)
    if (level.step === 'half' || level.step === 'groups') {
      clearMuscleSelection()
      return
    }
    if (level.step === 'muscles') {
      // Al subir de cabezas a músculos, limpiar cabeza pero no forzar músculo
      setSelectedHeadId(null)
      setExerciseFocus(null)
    }
  }

  function handleSelectMuscle(muscleId: string) {
    setSelectedMuscleId(muscleId)
    setSelectedHeadId(null)
    setExerciseFocus(null)
  }

  function handleSelectHead(muscleId: string, headId: string) {
    setSelectedMuscleId(muscleId)
    setSelectedHeadId(headId)
    setExerciseFocus(null)
  }

  function handleSearchSelect(result: SearchResult) {
    setSection('explore')
    const group = findGroupForMuscle(result.muscleId)
    const half = getMuscleBodyHalf(result.muscleId)
    if (group) {
      const heads = getMuscleDetail(result.muscleId)?.heads ?? []
      if (heads.length > 0) {
        setExploreLevel({
          step: 'heads',
          half,
          groupId: group.id,
          muscleId: result.muscleId,
        })
      } else {
        setExploreLevel({ step: 'muscles', half, groupId: group.id })
      }
    } else {
      setExploreLevel({ step: 'half' })
    }

    setSelectedMuscleId(result.muscleId)
    setSelectedHeadId(null)
    setExerciseFocus(
      result.exerciseName || result.equipment
        ? { exerciseName: result.exerciseName, equipment: result.equipment }
        : null,
    )
  }

  function handleStartRoutine(muscleId: string) {
    setRoutineMuscleIds([muscleId])
    setSection('routines')
  }

  function handleSectionChange(next: AppSection) {
    setSection(next)
    if (next !== 'explore') {
      setExerciseFocus(null)
    }
  }

  const subtitleBySection: Record<AppSection, string> = {
    dashboard: 'Tu resumen de entrenamiento, récords y mapa de recuperación.',
    explore:
      'Elegí el músculo y sumá ejercicios a la rutina del día. Después registrá en Entrenar.',
    routines:
      'Registrá peso, series y reps con demo GIF. Podés sumar más ejercicios sin salir.',
    progress: 'Compara tus entrenamientos semana a semana o mes a mes.',
  }

  const showSidePanel = section === 'explore'

  return (
    <div className="app">
      <header className={`app__header${section !== 'dashboard' ? ' app__header--narrow' : ''}`}>
        <div>
          <p className="app__eyebrow">Anatomía interactiva</p>
          <h1>Muscle Atlas</h1>
          <p className="app__subtitle">{subtitleBySection[section]}</p>
          {(section === 'explore' || section === 'dashboard') && (
            <MuscleSearch onSelectResult={handleSearchSelect} />
          )}
          <AppNav
            variant="top"
            section={section}
            onSectionChange={handleSectionChange}
            routineCount={dayRoutineCount}
          />
        </div>
      </header>

      <main
        className={`app__main${
          section === 'explore'
            ? ' app__main--explore'
            : !showSidePanel
              ? ' app__main--single'
              : ''
        }`}
      >
        {section === 'dashboard' && (
          <Dashboard
            refreshKey={refreshKey}
            onStartWorkout={() => setSection('routines')}
          />
        )}

        {section === 'explore' && (
          <>
            <section className="app__explore-cards-section">
              <ExploreCards
                level={exploreLevel}
                selectedMuscleId={selectedMuscleId}
                selectedHeadId={selectedHeadId}
                onLevelChange={handleLevelChange}
                onSelectMuscle={handleSelectMuscle}
                onSelectHead={handleSelectHead}
              />
            </section>

            <MusclePanel
              muscle={displayMuscle}
              activeHead={activeHead}
              headOptions={[]}
              pinned={Boolean(selectedMuscleId)}
              preview={false}
              exerciseFocus={exerciseFocus}
              refreshKey={refreshKey}
              onStartRoutine={selectedMuscleId ? handleStartRoutine : undefined}
              onDayRoutineChange={bumpRoutineRefresh}
              onGoToWorkout={() => setSection('routines')}
            />
          </>
        )}

        {section === 'routines' && (
          <WorkoutLogger
            bodyHalfFilter={bodyHalfFilter}
            onBodyHalfChange={(filter) => {
              if (filter === 'upper' || filter === 'lower') {
                setExploreLevel({ step: 'groups', half: filter })
              } else {
                setExploreLevel({ step: 'half' })
              }
            }}
            initialMuscleIds={routineMuscleIds}
            routineRefreshKey={routineRefreshKey}
            onRoutineChange={bumpRoutineRefresh}
            onWorkoutSaved={() => {
              bumpRefresh()
              bumpRoutineRefresh()
              setRoutineMuscleIds([])
            }}
          />
        )}

        {section === 'progress' && <ProgressView key={refreshKey} refreshKey={refreshKey} />}
      </main>

      <AppNav
        variant="bottom"
        section={section}
        onSectionChange={handleSectionChange}
        routineCount={dayRoutineCount}
      />
    </div>
  )
}

export default App
