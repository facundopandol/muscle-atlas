import { useMemo, useState } from 'react'
import type { MuscleGroup, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure } from '@musclemap/react'
import type { PartValues } from '@musclemap/react'
import type { BodyView, BodyHalfFilter } from '../types'
import { recoveryScoreForMuscle } from '../lib/analytics'
import { getAtlasBodyDiagram } from '../lib/chestDiagram'
import {
  buildChestPartValues,
  chestPartToMuscleId,
  groupRequiredView,
  highlightChestParts,
  mmGroupToMuscleId,
  muscleIdToMmGroup,
  MUSCLE_HIGHLIGHT_COLOR,
} from '../lib/muscleMapBridge'
import { bodyHalfToMmRegion, muscleMatchesBodyHalf } from '../lib/bodyHalf'
import './BodyDiagram.css'

interface BodyDiagramProps {
  view: BodyView
  bodyHalfFilter: BodyHalfFilter
  selectedMuscleId: string | null
  hoveredMuscleId: string | null
  refreshKey?: number
  onMuscleHover: (muscleId: string | null) => void
  onMuscleSelect: (muscleId: string, requiredView: BodyView) => void
}

export function BodyDiagram({
  view,
  bodyHalfFilter,
  selectedMuscleId,
  hoveredMuscleId,
  refreshKey = 0,
  onMuscleHover,
  onMuscleSelect,
}: BodyDiagramProps) {
  const [hoveredGroup, setHoveredGroup] = useState<MuscleGroup | null>(null)
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null)

  const mmView = view === 'front' ? 'FRONT' : 'BACK'
  const mmRegion = bodyHalfToMmRegion(bodyHalfFilter)
  const diagram = getAtlasBodyDiagram('MALE', mmView)
  const visibleGroups = useMemo(
    () => new Set(getVisibleMuscleGroups(mmView, mmRegion)),
    [mmView, mmRegion],
  )
  const cropViewBox = bodyHalfFilter === 'all' ? undefined : diagram.regionBox?.[mmRegion]

  const activeGroup = useMemo(() => {
    if (hoveredGroup) return hoveredGroup
    const muscleId = hoveredMuscleId ?? selectedMuscleId
    if (!muscleId) return null
    return muscleIdToMmGroup(muscleId)
  }, [hoveredGroup, hoveredMuscleId, selectedMuscleId])

  const chestPartValues = useMemo((): PartValues => {
    if (!visibleGroups.has('CHEST') || !muscleMatchesBodyHalf('upper-chest', bodyHalfFilter)) {
      return {}
    }
    return buildChestPartValues(recoveryScoreForMuscle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleGroups, bodyHalfFilter, refreshKey])

  const recoveryValues = useMemo((): MuscleMapValues => {
    const values: MuscleMapValues = {}
    for (const group of visibleGroups) {
      if (group === 'CHEST') continue
      const muscleId = mmGroupToMuscleId(group)
      if (!muscleId || !muscleMatchesBodyHalf(muscleId, bodyHalfFilter)) continue
      values[group] = { score: recoveryScoreForMuscle(muscleId) }
    }
    return values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleGroups, bodyHalfFilter, refreshKey])

  const highlightPartValues = useMemo((): PartValues => {
    const hoveredMuscleFromPart = chestPartToMuscleId(hoveredPartId ?? undefined)
    if (hoveredMuscleFromPart) {
      return highlightChestParts(chestPartValues, hoveredMuscleFromPart)
    }

    const highlightMuscleId = hoveredMuscleId ?? selectedMuscleId
    if (highlightMuscleId === 'upper-chest' || highlightMuscleId === 'lower-chest') {
      return highlightChestParts(chestPartValues, highlightMuscleId)
    }

    return chestPartValues
  }, [chestPartValues, hoveredPartId, hoveredMuscleId, selectedMuscleId])

  const highlightValues = useMemo((): MuscleMapValues => {
    const group = hoveredGroup ?? activeGroup
    if (!group || group === 'CHEST') return recoveryValues
    return { ...recoveryValues, [group]: { score: 100 } }
  }, [hoveredGroup, activeGroup, recoveryValues])

  function handleHover(group: MuscleGroup | null, partId?: string) {
    setHoveredGroup(group)
    setHoveredPartId(partId ?? null)
    if (!group) {
      onMuscleHover(null)
      return
    }
    const muscleId = mmGroupToMuscleId(group, partId)
    if (!muscleId || !muscleMatchesBodyHalf(muscleId, bodyHalfFilter)) {
      onMuscleHover(null)
      return
    }
    onMuscleHover(muscleId)
  }

  function handleSelect(group: MuscleGroup, partId?: string) {
    const muscleId = mmGroupToMuscleId(group, partId)
    if (!muscleId || !muscleMatchesBodyHalf(muscleId, bodyHalfFilter)) return
    onMuscleSelect(muscleId, groupRequiredView(group))
  }

  return (
    <div className={`body-diagram body-diagram--${view} body-diagram--musclemap`}>
      <div className="body-diagram__stage">
        <BodyFigure
          diagram={diagram}
          cropViewBox={cropViewBox}
          values={highlightValues}
          partValues={highlightPartValues}
          colorModel="RECOVERY_RISK"
          monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
          monochromeBaseColor="#9ca3af"
          visibleGroups={visibleGroups}
          activeGroup={activeGroup}
          glow
          idPrefix={`atlas-${view}`}
          width={300}
          backgroundImage={view === 'front' ? maleFront : maleBack}
          backgroundGrayscale
          backgroundOpacity={0.42}
          backgroundBrightness={1.18}
          onHover={handleHover}
          onSelect={handleSelect}
        />
      </div>

      <p className="body-diagram__hint">
        Colores = recuperación · Clic para seleccionar · Armar rutina desde el panel
      </p>
      <p className="body-diagram__credit">
        Anatomía por{' '}
        <a href="https://github.com/Jsplice/MuscleMap" target="_blank" rel="noreferrer">
          MuscleMap
        </a>{' '}
        (MIT)
      </p>
    </div>
  )
}
