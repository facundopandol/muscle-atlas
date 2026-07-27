import { useMemo } from 'react'
import type { MuscleGroup, MuscleMapRegion, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure } from '@musclemap/react'
import type { PartValues } from '@musclemap/react'
import { CHEST_PART_IDS, getAtlasBodyDiagram } from '../lib/chestDiagram'
import { getExploreMuscleVisual } from '../lib/exploreThumbVisual'
import { MUSCLE_HIGHLIGHT_COLOR } from '../lib/muscleMapBridge'
import { BicepsHeadThumb } from './BicepsHeadThumb'
import './AnatomyThumb.css'

interface GroupVisualConfig {
  view: 'FRONT' | 'BACK'
  region: MuscleMapRegion
  highlightGroups: MuscleGroup[]
  highlightChest?: boolean
}

const GROUP_VISUALS: Record<string, GroupVisualConfig> = {
  chest: {
    view: 'FRONT',
    region: 'UPPER_BODY',
    highlightGroups: [],
    highlightChest: true,
  },
  shoulders: {
    view: 'FRONT',
    region: 'UPPER_BODY',
    highlightGroups: ['SHOULDERS_FRONT', 'SHOULDERS_SIDE'],
  },
  arms: {
    view: 'FRONT',
    region: 'UPPER_BODY',
    highlightGroups: ['BICEPS', 'FOREARMS'],
  },
  back: {
    view: 'BACK',
    region: 'UPPER_BODY',
    highlightGroups: ['LATS', 'TRAPEZIUS'],
  },
  core: {
    view: 'FRONT',
    region: 'CORE',
    highlightGroups: ['CORE', 'OBLIQUES'],
  },
  legs: {
    view: 'FRONT',
    region: 'LOWER_BODY',
    highlightGroups: ['QUADS'],
  },
  glutes: {
    view: 'BACK',
    region: 'LOWER_BODY',
    highlightGroups: ['GLUTES'],
  },
  calves: {
    view: 'BACK',
    region: 'LOWER_BODY',
    highlightGroups: ['CALVES'],
  },
}

type AnatomyThumbProps =
  | { kind: 'group'; groupId: string }
  | { kind: 'muscle'; muscleId: string; headId?: string | null }

function ThumbFrame({
  view,
  region,
  values,
  partValues,
  idPrefix,
  cropViewBox: cropOverride,
}: {
  view: 'FRONT' | 'BACK'
  region: MuscleMapRegion
  values: MuscleMapValues
  partValues: PartValues
  idPrefix: string
  cropViewBox?: string
}) {
  const diagram = useMemo(() => getAtlasBodyDiagram('MALE', view), [view])
  const visibleGroups = useMemo(
    () => new Set(getVisibleMuscleGroups(view, region)),
    [view, region],
  )
  const cropViewBox = cropOverride ?? diagram.regionBox?.[region]
  const bg = view === 'FRONT' ? maleFront : maleBack

  return (
    <div className="anatomy-thumb" aria-hidden="true">
      <BodyFigure
        diagram={diagram}
        cropViewBox={cropViewBox}
        values={values}
        partValues={partValues}
        colorModel="RECOVERY_RISK"
        monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
        monochromeBaseColor="#b0a89a"
        visibleGroups={visibleGroups}
        glow={false}
        idPrefix={idPrefix}
        width={200}
        backgroundImage={bg}
        backgroundGrayscale
        backgroundOpacity={0.4}
        backgroundBrightness={1.15}
        activeGroup={null}
        onHover={() => {}}
        onSelect={() => {}}
      />
    </div>
  )
}

/** Miniatura anatómica para cards de grupo, músculo o cabeza en Explorar. */
export function AnatomyThumb(props: AnatomyThumbProps) {
  if (props.kind === 'group') {
    const config = GROUP_VISUALS[props.groupId]
    if (!config) {
      return <div className="anatomy-thumb anatomy-thumb--empty" aria-hidden="true" />
    }

    const values: MuscleMapValues = {}
    for (const group of config.highlightGroups) {
      values[group] = { score: 100 }
    }

    const partValues: PartValues = {}
    if (config.highlightChest) {
      for (const partId of CHEST_PART_IDS) {
        partValues[partId] = { score: 100 }
      }
    }

    return (
      <ThumbFrame
        view={config.view}
        region={config.region}
        values={values}
        partValues={partValues}
        idPrefix={`explore-g-${props.groupId}`}
      />
    )
  }

  const { muscleId, headId } = props

  // Bíceps: el atlas no tiene paths por cabeza → usamos clips del brazo derecho.
  if (muscleId === 'biceps') {
    return <BicepsHeadThumb headId={headId} />
  }

  const visual = getExploreMuscleVisual(muscleId, headId)
  if (!visual) {
    return <div className="anatomy-thumb anatomy-thumb--empty" aria-hidden="true" />
  }

  const suffix = headId ? `-${headId}` : '-all'
  return (
    <ThumbFrame
      view={visual.view}
      region={visual.region}
      values={visual.values}
      partValues={visual.partValues}
      cropViewBox={visual.cropViewBox}
      idPrefix={`explore-m-${muscleId}${suffix}`}
    />
  )
}

export function GroupMuscleThumb({ groupId }: { groupId: string }) {
  return <AnatomyThumb kind="group" groupId={groupId} />
}
