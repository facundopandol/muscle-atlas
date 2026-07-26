import { useMemo } from 'react'
import type { MuscleGroup, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure, type PartValues } from '@musclemap/react'
import type { MuscleHead } from '../types'
import { getMuscleDetail } from '../data/muscleHeads'
import { muscleMap } from '../data/muscles'
import { getAtlasBodyDiagram } from '../lib/chestDiagram'
import {
  buildChestPartValues,
  chestPartToMuscleId,
  getDetailCropViewBox,
  getMuscleDetailMmConfig,
  highlightChestParts,
  MUSCLE_HIGHLIGHT_COLOR,
} from '../lib/muscleMapBridge'
import { ArmHeadsDiagram } from './ArmHeadsDiagram'
import './MuscleDetailView.css'

interface MuscleDetailViewProps {
  muscleId: string
  activeHeadId: string | null
  onHeadSelect: (headId: string) => void
  /** Cambia a otra porción muscular (ej. clavicular → esternal) desde el diagrama. */
  onMuscleSelect?: (muscleId: string) => void
  onBack: () => void
}

const FIGURE_WIDTH = 340

export function MuscleDetailView({
  muscleId,
  activeHeadId,
  onHeadSelect,
  onMuscleSelect,
  onBack,
}: MuscleDetailViewProps) {
  const config = getMuscleDetail(muscleId)
  const muscle = muscleMap.get(muscleId)
  const mmConfig = getMuscleDetailMmConfig(muscleId)
  const cropViewBox = getDetailCropViewBox(muscleId)
  const activeHead = config?.heads.find((h) => h.id === activeHeadId) ?? config?.heads[0] ?? null
  const useArmSchematic =
    config?.detailVisual === 'arm-front' || config?.detailVisual === 'arm-back'
  const chestInteractive = mmConfig?.group === 'CHEST' && !!onMuscleSelect

  const cropParts = useMemo(() => {
    if (!cropViewBox) return null
    const [vbX, vbY, vbW, vbH] = cropViewBox.split(/\s+/).map(Number)
    return { vbX, vbY, vbW, vbH }
  }, [cropViewBox])

  const diagram = useMemo(() => {
    if (!mmConfig) return null
    return getAtlasBodyDiagram('MALE', mmConfig.view === 'FRONT' ? 'FRONT' : 'BACK')
  }, [mmConfig])

  const visibleGroups = useMemo((): ReadonlySet<MuscleGroup> => {
    if (!mmConfig) return new Set<MuscleGroup>()
    return new Set(getVisibleMuscleGroups(mmConfig.view, mmConfig.region))
  }, [mmConfig])

  const backgroundValues = useMemo((): MuscleMapValues => {
    if (!mmConfig) return {}
    if (mmConfig.group === 'CHEST') return {}
    return { [mmConfig.group]: { score: 28 } }
  }, [mmConfig])

  const chestPartValues = useMemo((): PartValues => {
    if (mmConfig?.group !== 'CHEST') return {}
    const base = buildChestPartValues(() => 28)
    return highlightChestParts(base, muscleId, 88)
  }, [mmConfig, muscleId])

  function handlePartSelect(_group: MuscleGroup, partId?: string) {
    if (!chestInteractive) return
    const next = chestPartToMuscleId(partId)
    if (next && next !== muscleId) onMuscleSelect?.(next)
  }

  return (
    <div className="muscle-detail">
      <div className="muscle-detail__toolbar">
        <button type="button" className="muscle-detail__back" onClick={onBack}>
          ← Volver al cuerpo
        </button>
        <div className="muscle-detail__titles">
          <h2>{config?.title ?? muscle?.name ?? muscleId}</h2>
          <p>
            {config?.subtitle ??
              muscle?.description ??
              'Vista ampliada del músculo'}
          </p>
        </div>
      </div>

      <div className="muscle-detail__stage">
        {useArmSchematic && config ? (
          <ArmHeadsDiagram
            heads={config.heads}
            activeHeadId={activeHead?.id ?? null}
            onHeadSelect={onHeadSelect}
            side={config.detailVisual === 'arm-back' ? 'back' : 'front'}
          />
        ) : mmConfig && diagram && cropViewBox ? (
          <div
            className={`muscle-detail__visual${chestInteractive ? '' : ' muscle-detail__visual--static'}`}
            style={
              cropParts
                ? { aspectRatio: `${cropParts.vbW} / ${cropParts.vbH}` }
                : undefined
            }
          >
            <BodyFigure
              diagram={diagram}
              cropViewBox={cropViewBox}
              values={backgroundValues}
              partValues={chestPartValues}
              colorModel="LOAD"
              monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
              monochromeBaseColor="#9ca3af"
              visibleGroups={visibleGroups}
              activeGroup={mmConfig.group}
              glow
              idPrefix={`detail-${muscleId}`}
              width={FIGURE_WIDTH}
              backgroundImage={mmConfig.view === 'FRONT' ? maleFront : maleBack}
              backgroundGrayscale
              backgroundOpacity={0.4}
              backgroundBrightness={1.2}
              onHover={() => undefined}
              onSelect={handlePartSelect}
            />
          </div>
        ) : (
          <p className="muscle-detail__fallback-msg">Vista ampliada no disponible.</p>
        )}

        {useArmSchematic && activeHead && <HeadInfoCard head={activeHead} />}
      </div>

      {useArmSchematic && config && config.heads.length > 1 && (
        <div className="muscle-detail__head-chips" role="tablist" aria-label="Cabezas musculares">
          {config.heads.map((head) => (
            <button
              key={head.id}
              type="button"
              role="tab"
              aria-selected={head.id === activeHead?.id}
              className={`muscle-detail__chip${head.id === activeHead?.id ? ' muscle-detail__chip--active' : ''}`}
              onClick={() => onHeadSelect(head.id)}
            >
              {head.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function HeadInfoCard({ head }: { head: MuscleHead }) {
  return (
    <div className="muscle-detail__head-card">
      <span className="muscle-detail__head-badge">Músculo activo</span>
      <h3>{head.name}</h3>
      <p>{head.description}</p>
      <div className="muscle-detail__train">
        <strong>Cómo trabajarlo</strong>
        <p>{head.howToTrain}</p>
      </div>
    </div>
  )
}
