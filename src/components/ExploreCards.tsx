import { getMuscleDetail } from '../data/muscleHeads'
import {
  EXPLORE_HALVES,
  getExploreGroup,
  groupsForHalf,
  type ExploreHalf,
} from '../data/exploreHierarchy'
import { muscleMap } from '../data/muscles'
import type { MuscleHead } from '../types'
import { CardCarousel, ExploreShell, type CarouselSlide } from './CardCarousel'
import { AnatomyThumb } from './AnatomyThumb'
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

function levelKey(level: ExploreLevel): string {
  if (level.step === 'half') return 'half'
  if (level.step === 'groups') return `groups-${level.half}`
  if (level.step === 'muscles') return `muscles-${level.half}-${level.groupId}`
  return `heads-${level.half}-${level.groupId}-${level.muscleId}`
}

export function ExploreCards({
  level,
  selectedMuscleId,
  selectedHeadId,
  onLevelChange,
  onSelectMuscle,
  onSelectHead,
}: ExploreCardsProps) {
  const crumbs: Array<{ label: string; go?: () => void }> = [
    { label: 'Explorar', go: () => onLevelChange({ step: 'half' }) },
  ]

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

  let title = ''
  let subtitle = ''
  let slides: CarouselSlide[] = []

  if (level.step === 'half') {
    title = '¿Qué vas a entrenar?'
    subtitle = 'Deslizá las cards y tocá para elegir tren superior o inferior.'
    slides = EXPLORE_HALVES.map((half) => ({
      key: half.id,
      label: half.label,
      description: half.description,
      variant: 'half',
      onSelect: () => onLevelChange({ step: 'groups', half: half.id }),
    }))
  } else if (level.step === 'groups') {
    title = 'Grupos musculares'
    subtitle = 'Deslizá y tocá un grupo para ver sus músculos.'
    slides = groupsForHalf(level.half).map((group) => ({
      key: group.id,
      label: group.label,
      description: group.description,
      accentLabel: true,
      visual: <AnatomyThumb kind="group" groupId={group.id} />,
      onSelect: () =>
        onLevelChange({ step: 'muscles', half: level.half, groupId: group.id }),
    }))
  } else if (level.step === 'muscles') {
    const group = getExploreGroup(level.groupId)
    title = group?.label ?? 'Músculos'
    subtitle = 'Deslizá y elegí el músculo. Si tiene cabezas, el siguiente paso las muestra.'
    slides = (group?.muscleIds ?? []).flatMap((muscleId) => {
      const muscle = muscleMap.get(muscleId)
      if (!muscle) return []
      const detail = getMuscleDetail(muscleId)
      const heads = headsForMuscle(muscleId)
      return [
        {
          key: muscleId,
          label: detail?.title ?? muscle.name,
          description: muscle.description,
          accentLabel: true,
          visual: <AnatomyThumb kind="muscle" muscleId={muscleId} />,
          active: selectedMuscleId === muscleId,
          onSelect: () => {
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
          },
        } satisfies CarouselSlide,
      ]
    })
  } else {
    const muscle = muscleMap.get(level.muscleId)
    title = muscle?.name ?? 'Zonas'
    subtitle = 'Deslizá y tocá la cabeza o zona. Los ejercicios salen en el panel.'
    slides = [
      ...headsForMuscle(level.muscleId).map(
        (head): CarouselSlide => ({
          key: head.id,
          label: head.name,
          description: head.description,
          accentLabel: true,
          visual: (
            <AnatomyThumb kind="muscle" muscleId={level.muscleId} headId={head.id} />
          ),
          active: selectedMuscleId === level.muscleId && selectedHeadId === head.id,
          onSelect: () => onSelectHead(level.muscleId, head.id),
        }),
      ),
      {
        key: 'all',
        label: 'Ver todos',
        description: 'Todos los ejercicios de este músculo',
        variant: 'muted',
        accentLabel: true,
        visual: <AnatomyThumb kind="muscle" muscleId={level.muscleId} />,
        active: selectedMuscleId === level.muscleId && !selectedHeadId,
        onSelect: () => onSelectMuscle(level.muscleId),
      },
    ]
  }

  return (
    <ExploreShell
      crumbs={crumbs}
      onBack={
        level.step === 'half'
          ? undefined
          : () => {
              if (level.step === 'heads') {
                onLevelChange({
                  step: 'muscles',
                  half: level.half,
                  groupId: level.groupId,
                })
              } else if (level.step === 'muscles') {
                onLevelChange({ step: 'groups', half: level.half })
              } else {
                onLevelChange({ step: 'half' })
              }
            }
      }
    >
      <CardCarousel
        title={title}
        subtitle={subtitle}
        slides={slides}
        resetKey={levelKey(level)}
      />
    </ExploreShell>
  )
}
