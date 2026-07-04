import { useMemo, type MouseEvent, type PointerEvent } from 'react'
import type { MuscleGroup, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import { getBodyDiagram } from '@musclemap/assets'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure } from '@musclemap/react'
import type { MuscleHead } from '../types'
import { getMuscleDetail, hasClickableHeads } from '../data/muscleHeads'
import { muscleMap } from '../data/muscles'
import {
  getDetailCropViewBox,
  getMuscleDetailMmConfig,
  MUSCLE_HIGHLIGHT_COLOR,
} from '../lib/muscleMapBridge'
import './MuscleDetailView.css'

interface MuscleDetailViewProps {
  muscleId: string
  activeHeadId: string | null
  onHeadSelect: (headId: string) => void
  onBack: () => void
}

const FIGURE_WIDTH = 340

function mirrorTransform(centerX: number) {
  return `translate(${centerX}, 0) scale(-1, 1) translate(${-centerX}, 0)`
}

function selectHead(onHeadSelect: (id: string) => void, headId: string) {
  return (e: MouseEvent | PointerEvent) => {
    e.stopPropagation()
    onHeadSelect(headId)
  }
}

function HeadHitAreas({
  heads,
  activeHeadId,
  mirrorCenterX,
  bilateral,
  onHeadSelect,
}: {
  heads: MuscleHead[]
  activeHeadId: string | null
  mirrorCenterX: number
  bilateral: boolean
  onHeadSelect: (headId: string) => void
}) {
  return (
    <g className="head-hit-layer">
      {heads.map((head) => {
        const isActive = head.id === activeHeadId
        const className = `head-hit${isActive ? ' head-hit--active' : ''}`

        return head.paths.map((d, i) => (
          <g key={`${head.id}-${i}`}>
            <path
              className={className}
              d={d}
              role="button"
              tabIndex={0}
              aria-label={head.name}
              onPointerDown={selectHead(onHeadSelect, head.id)}
              onClick={selectHead(onHeadSelect, head.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onHeadSelect(head.id)
                }
              }}
            />
            {bilateral && (
              <path
                className={className}
                d={d}
                transform={mirrorTransform(mirrorCenterX)}
                role="button"
                tabIndex={0}
                aria-label={`${head.name} (lado derecho)`}
                onPointerDown={selectHead(onHeadSelect, head.id)}
                onClick={selectHead(onHeadSelect, head.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onHeadSelect(head.id)
                  }
                }}
              />
            )}
          </g>
        ))
      })}
    </g>
  )
}

export function MuscleDetailView({ muscleId, activeHeadId, onHeadSelect, onBack }: MuscleDetailViewProps) {
  const config = getMuscleDetail(muscleId)
  const muscle = muscleMap.get(muscleId)
  const mmConfig = getMuscleDetailMmConfig(muscleId)
  const cropViewBox = getDetailCropViewBox(muscleId)
  const activeHead = config?.heads.find((h) => h.id === activeHeadId) ?? config?.heads[0] ?? null
  const clickableHeads = hasClickableHeads(muscleId)

  const cropParts = useMemo(() => {
    if (!cropViewBox) return null
    const [vbX, vbY, vbW, vbH] = cropViewBox.split(/\s+/).map(Number)
    return { vbX, vbY, vbW, vbH }
  }, [cropViewBox])

  const overlaySize = useMemo(() => {
    if (!cropParts) return { width: FIGURE_WIDTH, height: FIGURE_WIDTH }
    return {
      width: FIGURE_WIDTH,
      height: FIGURE_WIDTH * (cropParts.vbH / cropParts.vbW),
    }
  }, [cropParts])

  const diagram = useMemo(() => {
    if (!mmConfig) return null
    return getBodyDiagram('MALE', mmConfig.view === 'FRONT' ? 'FRONT' : 'BACK')
  }, [mmConfig])

  const mirrorCenterX = useMemo(() => {
    if (!diagram || !cropParts) return config?.mirrorCenterX ?? FIGURE_WIDTH / 2
    return diagram.centerX - cropParts.vbX
  }, [diagram, cropParts, config?.mirrorCenterX])

  const visibleGroups = useMemo((): ReadonlySet<MuscleGroup> => {
    if (!mmConfig) return new Set<MuscleGroup>()
    return new Set(getVisibleMuscleGroups(mmConfig.view, mmConfig.region))
  }, [mmConfig])

  const backgroundValues = useMemo((): MuscleMapValues => {
    if (!mmConfig) return {}
    return { [mmConfig.group]: { score: 28 } }
  }, [mmConfig])

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
              (clickableHeads
                ? 'Haz clic en una cabeza del diagrama'
                : muscle?.description ?? 'Vista ampliada del músculo')}
          </p>
        </div>
      </div>

      <div className="muscle-detail__stage">
        {mmConfig && diagram && cropViewBox ? (
          <div className="muscle-detail__visual" style={{ height: overlaySize.height }}>
            <BodyFigure
              diagram={diagram}
              cropViewBox={cropViewBox}
              values={backgroundValues}
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
              onSelect={() => undefined}
            />

            {config && clickableHeads && cropParts && (
              <svg
                className="muscle-detail__overlay"
                viewBox={cropViewBox}
                width={overlaySize.width}
                height={overlaySize.height}
                preserveAspectRatio="xMidYMid meet"
                aria-label="Cabezas musculares seleccionables"
              >
                <g transform={`translate(${cropParts.vbX}, ${cropParts.vbY})`}>
                  <HeadHitAreas
                    heads={config.heads}
                    activeHeadId={activeHead?.id ?? null}
                    mirrorCenterX={mirrorCenterX}
                    bilateral
                    onHeadSelect={onHeadSelect}
                  />
                </g>
              </svg>
            )}
          </div>
        ) : (
          <p className="muscle-detail__fallback-msg">Vista ampliada no disponible.</p>
        )}

        {activeHead && <HeadInfoCard head={activeHead} />}
      </div>

      {config && config.heads.length > 1 && (
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
