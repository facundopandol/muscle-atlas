import { getMuscleDetail } from '../data/muscleHeads'
import {
  EXPLORE_HALVES,
  getExploreGroup,
  groupsForHalf,
  type ExploreHalf,
} from '../data/exploreHierarchy'
import { muscleMap } from '../data/muscles'
import type { MuscleHead } from '../types'
import './ExploreCards.css'

export type ExploreLevel =
  | { step: 'half' }
  | { step: 'groups'; half: ExploreHalf }
  | { step: 'muscles'; half: ExploreHalf; groupId: string }
  | { step: 'heads'; half: ExploreHalf; groupId: string; muscleId: string }

interface ExploreCardsProps {
  level: ExploreLevel
  selectedMuscleId: string | null
  selectedHeadId: string | null
  onLevelChange: (level: ExploreLevel) => void
  onSelectMuscle: (muscleId: string) => void
  onSelectHead: (muscleId: string, headId: string) => void
}

function headsForMuscle(muscleId: string): MuscleHead[] {
  return getMuscleDetail(muscleId)?.heads ?? []
}

export function ExploreCards({
  level,
  selectedMuscleId,
  selectedHeadId,
  onLevelChange,
  onSelectMuscle,
  onSelectHead,
}: ExploreCardsProps) {
  const crumbs: Array<{ label: string; go?: () => void }> = [{ label: 'Explorar', go: () => onLevelChange({ step: 'half' }) }]

  if (level.step !== 'half') {
    const halfMeta = EXPLORE_HALVES.find((h) => h.id === level.half)
    crumbs.push({
      label: halfMeta?.label ?? level.half,
      go: () => onLevelChange({ step: 'groups', half: level.half }),
    })
  }

  if (level.step === 'muscles' || level.step === 'heads') {
    const group = getExploreGroup(level.groupId)
    crumbs.push({
      label: group?.label ?? level.groupId,
      go: () => onLevelChange({ step: 'muscles', half: level.half, groupId: level.groupId }),
    })
  }

  if (level.step === 'heads') {
    const muscle = muscleMap.get(level.muscleId)
    crumbs.push({ label: muscle?.name ?? level.muscleId })
  }

  return (
    <section className="explore-cards">
      <nav className="explore-cards__crumbs" aria-label="Navegación">
        {crumbs.map((c, i) => (
          <span key={`${c.label}-${i}`} className="explore-cards__crumb">
            {i > 0 && <span className="explore-cards__sep">/</span>}
            {c.go && i < crumbs.length - 1 ? (
              <button type="button" className="explore-cards__crumb-btn" onClick={c.go}>
                {c.label}
              </button>
            ) : (
              <span className="explore-cards__crumb-current">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      {level.step !== 'half' && (
        <button
          type="button"
          className="explore-cards__back"
          onClick={() => {
            if (level.step === 'heads') {
              onLevelChange({ step: 'muscles', half: level.half, groupId: level.groupId })
            } else if (level.step === 'muscles') {
              onLevelChange({ step: 'groups', half: level.half })
            } else {
              onLevelChange({ step: 'half' })
            }
          }}
        >
          ← Atrás
        </button>
      )}

      {level.step === 'half' && (
        <>
          <header className="explore-cards__header">
            <h2>¿Qué vas a entrenar?</h2>
            <p>Elegí tren superior o inferior. Después vas bajando por grupo y músculo.</p>
          </header>
          <div className="explore-cards__grid">
            {EXPLORE_HALVES.map((half) => (
              <button
                key={half.id}
                type="button"
                className="explore-card explore-card--half"
                onClick={() => onLevelChange({ step: 'groups', half: half.id })}
              >
                <span className="explore-card__label">{half.label}</span>
                <span className="explore-card__desc">{half.description}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {level.step === 'groups' && (
        <>
          <header className="explore-cards__header">
            <h2>Grupos musculares</h2>
            <p>Tocá un grupo para ver sus músculos.</p>
          </header>
          <div className="explore-cards__grid">
            {groupsForHalf(level.half).map((group) => (
              <button
                key={group.id}
                type="button"
                className="explore-card"
                onClick={() =>
                  onLevelChange({ step: 'muscles', half: level.half, groupId: group.id })
                }
              >
                <span className="explore-card__label">{group.label}</span>
                <span className="explore-card__desc">{group.description}</span>
                <span className="explore-card__meta">{group.muscleIds.length} músculos</span>
              </button>
            ))}
          </div>
        </>
      )}

      {level.step === 'muscles' && (
        <>
          <header className="explore-cards__header">
            <h2>{getExploreGroup(level.groupId)?.label ?? 'Músculos'}</h2>
            <p>Elegí el músculo. Si tiene cabezas o zonas, las vas a ver en el siguiente paso.</p>
          </header>
          <div className="explore-cards__grid">
            {(getExploreGroup(level.groupId)?.muscleIds ?? []).map((muscleId) => {
              const muscle = muscleMap.get(muscleId)
              if (!muscle) return null
              const detail = getMuscleDetail(muscleId)
              const heads = headsForMuscle(muscleId)
              const active = selectedMuscleId === muscleId
              return (
                <button
                  key={muscleId}
                  type="button"
                  className={`explore-card${active ? ' explore-card--active' : ''}`}
                  onClick={() => {
                    if (heads.length > 0) {
                      onLevelChange({
                        step: 'heads',
                        half: level.half,
                        groupId: level.groupId,
                        muscleId,
                      })
                      onSelectMuscle(muscleId)
                      return
                    }
                    onSelectMuscle(muscleId)
                  }}
                >
                  <span className="explore-card__label">{detail?.title ?? muscle.name}</span>
                  <span className="explore-card__desc">
                    {heads.length > 0
                      ? `${heads.length} zonas · ${muscle.exercises.length} ejercicios`
                      : `${muscle.exercises.length} ejercicios`}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {level.step === 'heads' && (
        <>
          <header className="explore-cards__header">
            <h2>{muscleMap.get(level.muscleId)?.name ?? 'Zonas'}</h2>
            <p>Elegí la cabeza o zona. Los ejercicios aparecen a la derecha.</p>
          </header>
          <div className="explore-cards__grid">
            {headsForMuscle(level.muscleId).map((head) => {
              const active = selectedMuscleId === level.muscleId && selectedHeadId === head.id
              return (
                <button
                  key={head.id}
                  type="button"
                  className={`explore-card${active ? ' explore-card--active' : ''}`}
                  onClick={() => onSelectHead(level.muscleId, head.id)}
                >
                  <span className="explore-card__label">{head.name}</span>
                  <span className="explore-card__desc">{head.description}</span>
                </button>
              )
            })}
            <button
              type="button"
              className={`explore-card explore-card--muted${
                selectedMuscleId === level.muscleId && !selectedHeadId ? ' explore-card--active' : ''
              }`}
              onClick={() => onSelectMuscle(level.muscleId)}
            >
              <span className="explore-card__label">Ver todos</span>
              <span className="explore-card__desc">Todos los ejercicios de este músculo</span>
            </button>
          </div>
        </>
      )}
    </section>
  )
}
