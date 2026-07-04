import { useMemo, useState } from 'react'
import type { MuscleGroup, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import { getBodyDiagram } from '@musclemap/assets'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure } from '@musclemap/react'
import type { BodyView, BodyHalfFilter } from '../types'
import { recoveryScoreForMuscle } from '../lib/analytics'
import {
  GROUPS_WITH_SUBMENU,
  mmGroupToMuscleId,
  muscleIdToMmGroup,
  MUSCLE_HIGHLIGHT_COLOR,
  groupRequiredView,
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

function SubmenuPicker({
  title,
  options,
  anchor,
  onSelect,
  onClose,
}: {
  title: string
  options: Array<{ muscleId: string; label: string }>
  anchor: { x: number; y: number }
  onSelect: (muscleId: string) => void
  onClose: () => void
}) {
  return (
    <div
      className="region-menu"
      style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
      onMouseLeave={onClose}
    >
      <p className="region-menu__title">{title}</p>
      <ul className="region-menu__list">
        {options.map((opt) => (
          <li key={opt.muscleId}>
            <button type="button" className="region-menu__btn" onClick={() => onSelect(opt.muscleId)}>
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
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
  const [submenu, setSubmenu] = useState<{
    group: MuscleGroup
    anchor: { x: number; y: number }
  } | null>(null)

  const mmView = view === 'front' ? 'FRONT' : 'BACK'
  const mmRegion = bodyHalfToMmRegion(bodyHalfFilter)
  const diagram = getBodyDiagram('MALE', mmView)
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

  const recoveryValues = useMemo((): MuscleMapValues => {
    const values: MuscleMapValues = {}
    for (const group of visibleGroups) {
      const muscleId = mmGroupToMuscleId(group)
      if (!muscleId || !muscleMatchesBodyHalf(muscleId, bodyHalfFilter)) continue
      values[group] = { score: recoveryScoreForMuscle(muscleId) }
    }
    return values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleGroups, bodyHalfFilter, refreshKey])

  const highlightValues = useMemo((): MuscleMapValues => {
    const group = hoveredGroup ?? activeGroup
    if (!group) return recoveryValues
    return { ...recoveryValues, [group]: { score: 100 } }
  }, [hoveredGroup, activeGroup, recoveryValues])

  function handleHover(group: MuscleGroup | null) {
    setHoveredGroup(group)
    if (!group) {
      onMuscleHover(null)
      return
    }
    const muscleId = mmGroupToMuscleId(group)
    if (muscleId && !muscleMatchesBodyHalf(muscleId, bodyHalfFilter)) {
      onMuscleHover(null)
      return
    }
    onMuscleHover(muscleId)
  }

  function handleSelect(group: MuscleGroup) {
    const submenuOptions = GROUPS_WITH_SUBMENU[group]
    if (submenuOptions) {
      setSubmenu({ group, anchor: { x: 50, y: 42 } })
      return
    }

    const muscleId = mmGroupToMuscleId(group)
    if (!muscleId || !muscleMatchesBodyHalf(muscleId, bodyHalfFilter)) return
    onMuscleSelect(muscleId, groupRequiredView(group))
  }

  function handleSubmenuSelect(muscleId: string) {
    setSubmenu(null)
    const requiredView = muscleId.includes('chest')
      ? 'front'
      : groupRequiredView(submenu?.group ?? 'CHEST')
    onMuscleSelect(muscleId, requiredView)
  }

  return (
    <div className={`body-diagram body-diagram--${view} body-diagram--musclemap`}>
      <div className="body-diagram__stage">
        <BodyFigure
          diagram={diagram}
          cropViewBox={cropViewBox}
          values={highlightValues}
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

        {submenu && GROUPS_WITH_SUBMENU[submenu.group] && (
          <SubmenuPicker
            title={submenu.group === 'CHEST' ? 'Pectorales' : 'Elegir músculo'}
            options={GROUPS_WITH_SUBMENU[submenu.group]!}
            anchor={submenu.anchor}
            onSelect={handleSubmenuSelect}
            onClose={() => setSubmenu(null)}
          />
        )}
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
