import { useMemo, type MouseEvent, type PointerEvent } from 'react'
import type { MuscleGroup, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import maleBack from '@musclemap/assets/bodies/male-back.webp'
import { BodyFigure } from '@musclemap/react'
import type { MuscleHead } from '../types'
import {
  BICEPS_HEAD_CLIPS,
  BICEPS_RIGHT_D,
  BICEPS_SPLIT_LINE,
} from '../lib/armAnatomy'
import { getAtlasBodyDiagram } from '../lib/chestDiagram'
import { MUSCLE_HIGHLIGHT_COLOR } from '../lib/muscleMapBridge'
import './ArmHeadsDiagram.css'

interface ArmHeadsDiagramProps {
  heads: MuscleHead[]
  activeHeadId: string | null
  onHeadSelect: (headId: string) => void
  /** Vista del brazo: frente (bíceps) o espalda (tríceps). */
  side?: 'front' | 'back'
}

/** Crop del atlas centrado en el brazo derecho (viewBox MuscleMap 1024×1536). */
const ARM_CROP = {
  front: '620 340 180 280',
  back: '620 340 180 280',
} as const

function selectHead(onHeadSelect: (id: string) => void, headId: string) {
  return (e: MouseEvent | PointerEvent) => {
    e.stopPropagation()
    onHeadSelect(headId)
  }
}

/** Brazo del atlas: ilumina porciones del path real del músculo, no óvalos aparte. */
export function ArmHeadsDiagram({
  heads,
  activeHeadId,
  onHeadSelect,
  side = 'front',
}: ArmHeadsDiagramProps) {
  const mmView = side === 'back' ? 'BACK' : 'FRONT'
  const diagram = useMemo(() => getAtlasBodyDiagram('MALE', mmView), [mmView])
  const cropViewBox = ARM_CROP[side]
  const [vbW, vbH] = cropViewBox.split(/\s+/).map(Number).slice(2)

  const focusGroup: MuscleGroup = side === 'back' ? 'TRICEPS' : 'BICEPS'

  const musclePathD = useMemo(() => {
    if (side === 'front') return BICEPS_RIGHT_D
    return diagram.muscles.find((m) => m.id === 'TRICEPS_RIGHT')?.d
  }, [diagram, side])

  const visibleGroups = useMemo(
    () => new Set(getVisibleMuscleGroups(mmView, 'UPPER_BODY')) as Set<MuscleGroup>,
    [mmView],
  )

  /** Sin tinte de grupo: solo las cabezas iluminan el contorno real. */
  const values: MuscleMapValues = {
    BICEPS: { score: 0 },
    TRICEPS: { score: 0 },
    FOREARMS: { score: 0 },
    SHOULDERS_FRONT: { score: 0 },
    SHOULDERS_SIDE: { score: 0 },
  }

  const useBicepsClips = side === 'front'

  return (
    <div className="arm-diagram arm-diagram--atlas">
      <div className="arm-diagram__visual" style={{ aspectRatio: `${vbW} / ${vbH}` }}>
        <BodyFigure
          diagram={diagram}
          cropViewBox={cropViewBox}
          values={values}
          colorModel="LOAD"
          monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
          monochromeBaseColor="#9ca3af"
          visibleGroups={visibleGroups}
          activeGroup={focusGroup}
          glow={false}
          idPrefix={`arm-${side}`}
          width={380}
          backgroundImage={side === 'back' ? maleBack : maleFront}
          backgroundGrayscale
          backgroundOpacity={0.72}
          backgroundBrightness={1.2}
          onHover={() => undefined}
          onSelect={() => undefined}
        />

        <svg
          className="arm-diagram__overlay"
          viewBox={cropViewBox}
          preserveAspectRatio="xMidYMid meet"
          aria-label={side === 'front' ? 'Cabezas del bíceps' : 'Cabezas del tríceps'}
        >
          {useBicepsClips && musclePathD && (
            <defs>
              {heads.map((head) => {
                const region = BICEPS_HEAD_CLIPS[head.id]
                if (!region) return null
                return (
                  <clipPath key={`clip-${head.id}`} id={`biceps-head-${head.id}`}>
                    <path d={region} />
                  </clipPath>
                )
              })}
            </defs>
          )}

          {/* Contorno guía del músculo (sin relleno) para anclar la lectura */}
          {musclePathD && (
            <path className="arm-diagram__muscle-outline" d={musclePathD} aria-hidden />
          )}

          {useBicepsClips && musclePathD
            ? heads.map((head) => {
                const isActive = head.id === activeHeadId
                const hasClip = Boolean(BICEPS_HEAD_CLIPS[head.id])
                return (
                  <g
                    key={head.id}
                    clipPath={hasClip ? `url(#biceps-head-${head.id})` : undefined}
                  >
                    <path
                      className={`arm-diagram__head${isActive ? ' arm-diagram__head--active' : ''}`}
                      d={musclePathD}
                      role="button"
                      tabIndex={0}
                      aria-label={head.name}
                      aria-pressed={isActive}
                      onPointerDown={selectHead(onHeadSelect, head.id)}
                      onClick={selectHead(onHeadSelect, head.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onHeadSelect(head.id)
                        }
                      }}
                    />
                  </g>
                )
              })
            : heads.map((head) => {
                const isActive = head.id === activeHeadId
                return head.paths.map((d, i) => (
                  <path
                    key={`${head.id}-${i}`}
                    className={`arm-diagram__head${isActive ? ' arm-diagram__head--active' : ''}`}
                    d={d}
                    role="button"
                    tabIndex={0}
                    aria-label={head.name}
                    aria-pressed={isActive}
                    onPointerDown={selectHead(onHeadSelect, head.id)}
                    onClick={selectHead(onHeadSelect, head.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onHeadSelect(head.id)
                      }
                    }}
                  />
                ))
              })}

          {useBicepsClips && (
            <path className="arm-diagram__split" d={BICEPS_SPLIT_LINE} aria-hidden />
          )}
        </svg>
      </div>
      <p className="arm-diagram__caption">
        {side === 'front'
          ? 'Brazo derecho · iluminá cada porción del bíceps real'
          : 'Brazo derecho · vista posterior'}
      </p>
    </div>
  )
}
