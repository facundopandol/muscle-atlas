import { useMemo } from 'react'
import type { MuscleGroup, MuscleMapValues } from '@musclemap/core'
import { getVisibleMuscleGroups } from '@musclemap/core'
import maleFront from '@musclemap/assets/bodies/male-front.webp'
import { BodyFigure } from '@musclemap/react'
import { BICEPS_HEAD_CLIPS, BICEPS_RIGHT_D, BICEPS_SPLIT_LINE } from '../lib/armAnatomy'
import { getAtlasBodyDiagram } from '../lib/chestDiagram'
import { MUSCLE_HIGHLIGHT_COLOR } from '../lib/muscleMapBridge'
import './BicepsHeadThumb.css'

const ARM_CROP = '620 340 180 280'
const HEAD_ORDER = ['biceps-short', 'biceps-long', 'brachialis'] as const

interface BicepsHeadThumbProps {
  /** Cabeza activa; null = todas iluminadas (Ver todos). */
  headId?: string | null
}

/** Miniatura del brazo con porciones reales del bíceps (clip del path MuscleMap). */
export function BicepsHeadThumb({ headId = null }: BicepsHeadThumbProps) {
  const diagram = useMemo(() => getAtlasBodyDiagram('MALE', 'FRONT'), [])
  const visibleGroups = useMemo(
    () => new Set(getVisibleMuscleGroups('FRONT', 'UPPER_BODY')) as Set<MuscleGroup>,
    [],
  )

  const values: MuscleMapValues = {
    BICEPS: { score: 0 },
    FOREARMS: { score: 0 },
    SHOULDERS_FRONT: { score: 0 },
    SHOULDERS_SIDE: { score: 0 },
  }

  const uid = headId ?? 'all'
  const showHeads = headId ? [headId] : [...HEAD_ORDER]

  return (
    <div className="biceps-head-thumb" aria-hidden="true">
      <BodyFigure
        diagram={diagram}
        cropViewBox={ARM_CROP}
        values={values}
        colorModel="LOAD"
        monochromeColor={MUSCLE_HIGHLIGHT_COLOR}
        monochromeBaseColor="#b0a89a"
        visibleGroups={visibleGroups}
        activeGroup={null}
        glow={false}
        idPrefix={`biceps-thumb-${uid}`}
        width={200}
        backgroundImage={maleFront}
        backgroundGrayscale
        backgroundOpacity={0.45}
        backgroundBrightness={1.15}
        onHover={() => {}}
        onSelect={() => {}}
      />

      <svg className="biceps-head-thumb__overlay" viewBox={ARM_CROP} preserveAspectRatio="xMidYMid meet">
        <defs>
          {HEAD_ORDER.map((id) => {
            const region = BICEPS_HEAD_CLIPS[id]
            if (!region) return null
            return (
              <clipPath key={id} id={`biceps-thumb-${uid}-clip-${id}`}>
                <path d={region} />
              </clipPath>
            )
          })}
        </defs>

        <path className="biceps-head-thumb__outline" d={BICEPS_RIGHT_D} />

        {showHeads.map((id) => {
          const hasClip = Boolean(BICEPS_HEAD_CLIPS[id])
          const isFocus = !headId || headId === id
          return (
            <g
              key={id}
              clipPath={hasClip ? `url(#biceps-thumb-${uid}-clip-${id})` : undefined}
            >
              <path
                className={`biceps-head-thumb__portion${isFocus ? ' biceps-head-thumb__portion--on' : ''}`}
                d={BICEPS_RIGHT_D}
              />
            </g>
          )
        })}

        <path className="biceps-head-thumb__split" d={BICEPS_SPLIT_LINE} />
      </svg>
    </div>
  )
}
