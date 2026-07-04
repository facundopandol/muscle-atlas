import type { ReactNode } from 'react'
import type { ExerciseIllustrationId } from '../types'
import './ExerciseIllustration.css'

interface ExerciseIllustrationProps {
  id: ExerciseIllustrationId
  title: string
}

/** Figura esquemática reutilizable para las ilustraciones. */
function Figure({
  children,
  x = 0,
  y = 0,
}: {
  children: ReactNode
  x?: number
  y?: number
}) {
  return (
    <g transform={`translate(${x},${y})`} className="exercise-illus__figure">
      {children}
    </g>
  )
}

function Head({ cx = 50, cy = 12 }: { cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r="8" className="exercise-illus__head" />
}

function Limb({ d }: { d: string }) {
  return <path d={d} className="exercise-illus__limb" fill="none" strokeWidth="3" strokeLinecap="round" />
}

function Bench({ y = 55 }: { y?: number }) {
  return (
    <>
      <rect x="10" y={y} width="80" height="4" rx="1" className="exercise-illus__equipment" />
      <line x1="20" y1={y + 4} x2="20" y2={y + 18} className="exercise-illus__equipment" strokeWidth="2" />
      <line x1="80" y1={y + 4} x2="80" y2={y + 18} className="exercise-illus__equipment" strokeWidth="2" />
    </>
  )
}

const illustrations: Record<ExerciseIllustrationId, ReactNode> = {
  'incline-press': (
    <>
      <Bench y={48} />
      <Figure y={8}>
        <Head cx={50} cy={28} />
        <Limb d="M 50 36 L 50 48" />
        <Limb d="M 50 42 L 30 50 M 50 42 L 70 50" />
        <rect x="22" y="46" width="56" height="3" rx="1" className="exercise-illus__bar" />
      </Figure>
    </>
  ),
  'incline-fly': (
    <>
      <Bench y={48} />
      <Figure y={8}>
        <Head cx={50} cy={28} />
        <Limb d="M 50 36 L 50 48" />
        <Limb d="M 50 40 L 25 55 M 50 40 L 75 55" />
        <circle cx="25" cy="55" r="4" className="exercise-illus__weight" />
        <circle cx="75" cy="55" r="4" className="exercise-illus__weight" />
      </Figure>
    </>
  ),
  'decline-press': (
    <>
      <Bench y={52} />
      <Figure y={12}>
        <Head cx={50} cy={38} />
        <Limb d="M 50 46 L 50 54" />
        <Limb d="M 50 48 L 28 58 M 50 48 L 72 58" />
        <rect x="20" y="56" width="60" height="3" rx="1" className="exercise-illus__bar" />
      </Figure>
    </>
  ),
  dip: (
    <>
      <line x1="25" y1="20" x2="25" y2="70" className="exercise-illus__equipment" strokeWidth="3" />
      <line x1="75" y1="20" x2="75" y2="70" className="exercise-illus__equipment" strokeWidth="3" />
      <Figure>
        <Head />
        <Limb d="M 50 20 L 50 38" />
        <Limb d="M 50 24 L 25 28 M 50 24 L 75 28" />
        <Limb d="M 50 38 L 42 65 M 50 38 L 58 65" />
      </Figure>
    </>
  ),
  'cable-fly': (
    <>
      <line x1="50" y1="5" x2="50" y2="20" className="exercise-illus__equipment" strokeWidth="2" />
      <Figure y={15}>
        <Head />
        <Limb d="M 50 20 L 50 45" />
        <Limb d="M 50 28 L 28 50 M 50 28 L 72 50" />
        <line x1="28" y1="50" x2="50" y2="5" className="exercise-illus__cable" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="72" y1="50" x2="50" y2="5" className="exercise-illus__cable" strokeWidth="1" strokeDasharray="2 2" />
      </Figure>
    </>
  ),
  'overhead-press': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 50" />
      <Limb d="M 50 28 L 35 15 M 50 28 L 65 15" />
      <rect x="28" y="10" width="44" height="3" rx="1" className="exercise-illus__bar" />
      <Limb d="M 50 50 L 42 72 M 50 50 L 58 72" />
    </Figure>
  ),
  'front-raise': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 50" />
      <Limb d="M 50 30 L 50 12" />
      <circle cx="50" cy="10" r="4" className="exercise-illus__weight" />
      <Limb d="M 50 30 L 38 12" />
      <Limb d="M 50 50 L 42 72 M 50 50 L 58 72" />
    </Figure>
  ),
  'bicep-curl': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 55" />
      <Limb d="M 50 30 L 38 22" />
      <Limb d="M 38 22 L 34 38" />
      <circle cx="34" cy="40" r="4" className="exercise-illus__weight" />
      <Limb d="M 50 55 L 42 75 M 50 55 L 58 75" />
    </Figure>
  ),
  'preacher-curl': (
    <>
      <path d="M 30 55 L 30 40 Q 50 35 70 55" className="exercise-illus__equipment" fill="none" strokeWidth="3" />
      <Figure x={-5}>
        <Head cx={55} cy={22} />
        <Limb d="M 55 30 L 55 42" />
        <Limb d="M 55 34 L 48 48" />
        <circle cx="46" cy="50" r="4" className="exercise-illus__weight" />
      </Figure>
    </>
  ),
  'hammer-curl': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 55" />
      <Limb d="M 50 30 L 62 35" />
      <Limb d="M 62 35 L 62 48" />
      <rect x="58" y="48" width="8" height="10" rx="2" className="exercise-illus__weight" />
      <Limb d="M 50 55 L 42 75 M 50 55 L 58 75" />
    </Figure>
  ),
  'cable-crunch': (
    <>
      <line x1="50" y1="5" x2="50" y2="25" className="exercise-illus__cable" strokeWidth="1.5" strokeDasharray="2 2" />
      <Figure y={30}>
        <Head cx={60} cy={10} />
        <Limb d="M 60 18 L 40 35" />
        <Limb d="M 40 35 L 70 55" />
        <Limb d="M 40 35 L 25 55 M 70 55 L 85 55" />
      </Figure>
    </>
  ),
  'hanging-leg-raise': (
    <>
      <line x1="20" y1="8" x2="80" y2="8" className="exercise-illus__bar" strokeWidth="4" />
      <Figure>
        <Limb d="M 50 8 L 50 25" />
        <Head cx={50} cy={33} />
        <Limb d="M 50 25 L 50 45" />
        <Limb d="M 50 45 L 38 30 M 50 45 L 62 30" />
      </Figure>
    </>
  ),
  plank: (
    <Figure y={35}>
      <Head cx={20} cy={20} />
      <Limb d="M 28 22 L 75 22" />
      <Limb d="M 50 22 L 50 38" />
      <Limb d="M 75 22 L 88 38" />
      <line x1="10" y1="42" x2="90" y2="42" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'ab-wheel': (
    <Figure y={25}>
      <Head cx={30} cy={20} />
      <Limb d="M 38 22 L 65 30" />
      <Limb d="M 65 30 L 65 38" />
      <circle cx="72" cy="42" r="6" className="exercise-illus__wheel" />
      <line x1="10" y1="50" x2="90" y2="50" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'oblique-crunch': (
    <Figure y={30}>
      <Head cx={35} cy={15} />
      <Limb d="M 42 20 L 60 40" />
      <Limb d="M 60 40 L 80 55" />
      <path d="M 55 35 Q 70 25 75 40" className="exercise-illus__arrow" fill="none" strokeWidth="1.5" markerEnd="url(#arrow)" />
    </Figure>
  ),
  'side-plank': (
    <Figure y={30}>
      <Head cx={25} cy={25} />
      <Limb d="M 33 27 L 70 35" />
      <Limb d="M 45 30 L 45 55" />
      <line x1="10" y1="58" x2="90" y2="58" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'russian-twist': (
    <Figure y={35}>
      <Head cx={50} cy={15} />
      <Limb d="M 50 23 L 50 40" />
      <Limb d="M 50 30 L 30 35 M 50 30 L 70 35" />
      <circle cx="65" cy="38" r="6" className="exercise-illus__weight" />
      <path d="M 65 30 A 15 15 0 0 1 35 30" className="exercise-illus__arrow" fill="none" strokeWidth="1.5" />
    </Figure>
  ),
  'bicycle-crunch': (
    <Figure y={35}>
      <Head cx={30} cy={25} />
      <Limb d="M 38 27 L 55 35" />
      <Limb d="M 55 35 L 70 20" />
      <Limb d="M 55 35 L 40 50" />
      <line x1="10" y1="58" x2="90" y2="58" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  squat: (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 38" />
      <rect x="30" y="12" width="40" height="3" rx="1" className="exercise-illus__bar" />
      <Limb d="M 50 38 L 35 58 M 50 38 L 65 58" />
      <Limb d="M 35 58 L 32 72 M 65 58 L 68 72" />
      <line x1="10" y1="74" x2="90" y2="74" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'leg-press': (
    <>
      <rect x="15" y="40" width="70" height="25" rx="3" className="exercise-illus__equipment" opacity="0.5" />
      <Figure y={10}>
        <Head cx={50} cy={35} />
        <Limb d="M 50 43 L 50 55" />
        <Limb d="M 50 55 L 38 40 M 50 55 L 62 40" />
      </Figure>
    </>
  ),
  'leg-extension': (
    <>
      <Bench y={50} />
      <Figure y={5}>
        <Head cx={50} cy={30} />
        <Limb d="M 50 38 L 50 50" />
        <Limb d="M 50 50 L 50 30" />
        <circle cx="50" cy="28" r="4" className="exercise-illus__weight" />
      </Figure>
    </>
  ),
  lunge: (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 42" />
      <Limb d="M 50 42 L 30 65 M 50 42 L 68 58" />
      <Limb d="M 30 65 L 28 75 M 68 58 L 72 72" />
      <line x1="10" y1="76" x2="90" y2="76" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'rear-fly': (
    <Figure y={15}>
      <Head cx={50} cy={25} />
      <Limb d="M 50 33 L 50 50" />
      <Limb d="M 50 38 L 25 42 M 50 38 L 75 42" />
      <circle cx="22" cy="42" r="4" className="exercise-illus__weight" />
      <circle cx="78" cy="42" r="4" className="exercise-illus__weight" />
      <path d="M 30 42 L 70 42" className="exercise-illus__arrow" strokeWidth="1" strokeDasharray="3 2" />
    </Figure>
  ),
  'face-pull': (
    <>
      <line x1="85" y1="30" x2="85" y2="70" className="exercise-illus__equipment" strokeWidth="2" />
      <Figure>
        <Head />
        <Limb d="M 50 20 L 50 45" />
        <Limb d="M 50 28 L 72 35" />
        <line x1="72" y1="35" x2="85" y2="35" className="exercise-illus__cable" strokeWidth="1.5" strokeDasharray="2 2" />
      </Figure>
    </>
  ),
  'inverted-row': (
    <>
      <line x1="15" y1="15" x2="85" y2="15" className="exercise-illus__bar" strokeWidth="3" />
      <Figure y={20}>
        <Head cx={50} cy={30} />
        <Limb d="M 50 38 L 50 50" />
        <Limb d="M 50 40 L 25 15 M 50 40 L 75 15" />
        <Limb d="M 50 50 L 42 65 M 50 50 L 58 65" />
      </Figure>
    </>
  ),
  shrug: (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 50" />
      <path d="M 35 22 Q 50 14 65 22" className="exercise-illus__arrow" fill="none" strokeWidth="1.5" />
      <Limb d="M 50 30 L 35 55 M 50 30 L 65 55" />
      <circle cx="32" cy="57" r="4" className="exercise-illus__weight" />
      <circle cx="68" cy="57" r="4" className="exercise-illus__weight" />
    </Figure>
  ),
  'upright-row': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 55" />
      <Limb d="M 50 35 L 38 25 M 50 35 L 62 25" />
      <rect x="30" y="20" width="40" height="3" className="exercise-illus__bar" />
      <path d="M 50 35 L 50 18" className="exercise-illus__arrow" strokeWidth="1" strokeDasharray="2 2" />
    </Figure>
  ),
  'farmer-walk': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 55" />
      <Limb d="M 50 30 L 35 58 M 50 30 L 65 58" />
      <rect x="28" y="56" width="14" height="10" rx="2" className="exercise-illus__weight" />
      <rect x="58" y="56" width="14" height="10" rx="2" className="exercise-illus__weight" />
      <path d="M 20 70 L 80 70" className="exercise-illus__arrow" strokeWidth="1.5" markerEnd="url(#arrow)" />
    </Figure>
  ),
  'pull-up': (
    <>
      <line x1="20" y1="10" x2="80" y2="10" className="exercise-illus__bar" strokeWidth="4" />
      <Figure>
        <Limb d="M 50 10 L 50 22" />
        <Head cx={50} cy={30} />
        <Limb d="M 50 22 L 50 48" />
        <Limb d="M 50 48 L 42 68 M 50 48 L 58 68" />
      </Figure>
    </>
  ),
  'lat-pulldown': (
    <>
      <line x1="50" y1="5" x2="50" y2="15" className="exercise-illus__equipment" strokeWidth="2" />
      <Figure y={10}>
        <Head cx={50} cy={25} />
        <Limb d="M 50 33 L 50 55" />
        <Limb d="M 50 35 L 35 20 M 50 35 L 65 20" />
        <rect x="28" y="16" width="44" height="3" className="exercise-illus__bar" />
        <line x1="50" y1="18" x2="50" y2="5" className="exercise-illus__cable" strokeWidth="1.5" strokeDasharray="2 2" />
      </Figure>
    </>
  ),
  'barbell-row': (
    <Figure y={20}>
      <Head cx={35} cy={25} />
      <Limb d="M 43 27 L 65 35" />
      <Limb d="M 55 33 L 55 50" />
      <Limb d="M 55 35 L 78 38" />
      <rect x="72" y="36" width="16" height="3" className="exercise-illus__bar" />
      <line x1="10" y1="55" x2="90" y2="55" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'seated-row': (
    <>
      <line x1="5" y1="40" x2="5" y2="70" className="exercise-illus__equipment" strokeWidth="2" />
      <Figure>
        <Head cx={55} cy={25} />
        <Limb d="M 55 33 L 55 50" />
        <Limb d="M 55 38 L 30 40" />
        <line x1="30" y1="40" x2="5" y2="40" className="exercise-illus__cable" strokeWidth="1.5" strokeDasharray="2 2" />
      </Figure>
    </>
  ),
  'skull-crusher': (
    <>
      <Bench y={48} />
      <Figure y={8}>
        <Head cx={50} cy={28} />
        <Limb d="M 50 36 L 50 48" />
        <Limb d="M 50 40 L 42 22 M 50 40 L 58 22" />
        <rect x="35" y="18" width="30" height="3" className="exercise-illus__bar" />
      </Figure>
    </>
  ),
  'tricep-pushdown': (
    <>
      <line x1="50" y1="5" x2="50" y2="20" className="exercise-illus__equipment" strokeWidth="2" />
      <Figure y={15}>
        <Head />
        <Limb d="M 50 20 L 50 45" />
        <Limb d="M 50 28 L 50 55" />
        <line x1="50" y1="28" x2="50" y2="8" className="exercise-illus__cable" strokeWidth="1.5" strokeDasharray="2 2" />
      </Figure>
    </>
  ),
  'bench-dip': (
    <>
      <Bench y={50} />
      <Figure y={5}>
        <Head cx={50} cy={30} />
        <Limb d="M 50 38 L 50 48" />
        <Limb d="M 50 40 L 30 50 M 50 40 L 70 50" />
        <Limb d="M 50 48 L 42 68 M 50 48 L 58 68" />
      </Figure>
    </>
  ),
  'tricep-kickback': (
    <Figure y={15}>
      <Head cx={35} cy={25} />
      <Limb d="M 43 27 L 60 35" />
      <Limb d="M 55 33 L 55 48" />
      <Limb d="M 55 38 L 78 32" />
      <circle cx="80" cy="30" r="4" className="exercise-illus__weight" />
    </Figure>
  ),
  'hip-thrust': (
    <>
      <Bench y={48} />
      <Figure y={20}>
        <Head cx={30} cy={35} />
        <Limb d="M 38 37 L 55 42" />
        <Limb d="M 55 42 L 75 38" />
        <rect x="68" y="36" width="20" height="4" className="exercise-illus__bar" />
        <Limb d="M 55 42 L 55 55" />
      </Figure>
    </>
  ),
  'glute-bridge': (
    <Figure y={35}>
      <Head cx={25} cy={30} />
      <Limb d="M 33 32 L 55 28" />
      <Limb d="M 55 28 L 75 35" />
      <Limb d="M 55 28 L 55 45" />
      <line x1="10" y1="50" x2="90" y2="50" className="exercise-illus__ground" strokeWidth="1" />
      <path d="M 55 35 L 55 25" className="exercise-illus__arrow" strokeWidth="1.5" />
    </Figure>
  ),
  'glute-kickback': (
    <Figure y={25}>
      <Head cx={30} cy={30} />
      <Limb d="M 38 32 L 55 35" />
      <Limb d="M 55 35 L 55 50" />
      <Limb d="M 55 50 L 75 38" />
      <line x1="10" y1="55" x2="90" y2="55" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'bulgarian-split': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 42" />
      <Limb d="M 50 42 L 32 65 M 50 42 L 72 50" />
      <Limb d="M 72 50 L 75 30" />
      <rect x="70" y="22" width="10" height="8" className="exercise-illus__equipment" opacity="0.6" />
      <line x1="10" y1="72" x2="90" y2="72" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'romanian-deadlift': (
    <Figure y={10}>
      <Head cx={45} cy={15} />
      <Limb d="M 45 23 L 55 40" />
      <Limb d="M 55 40 L 55 58" />
      <Limb d="M 55 42 L 75 55" />
      <rect x="68" y="53" width="16" height="3" className="exercise-illus__bar" />
      <line x1="10" y1="65" x2="90" y2="65" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'leg-curl': (
    <>
      <Bench y={48} />
      <Figure y={5}>
        <Head cx={50} cy={30} />
        <Limb d="M 50 38 L 50 50" />
        <Limb d="M 50 50 L 38 38" />
        <circle cx="36" cy="36" r="4" className="exercise-illus__weight" />
      </Figure>
    </>
  ),
  'good-morning': (
    <Figure y={15}>
      <Head cx={40} cy={15} />
      <Limb d="M 40 23 L 58 35" />
      <Limb d="M 58 35 L 58 55" />
      <rect x="48" y="30" width="20" height="3" className="exercise-illus__bar" />
      <line x1="10" y1="60" x2="90" y2="60" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'nordic-curl': (
    <Figure y={20}>
      <Head cx={50} cy={20} />
      <Limb d="M 50 28 L 50 42" />
      <Limb d="M 50 42 L 42 58 M 50 42 L 58 58" />
      <line x1="10" y1="62" x2="90" y2="62" className="exercise-illus__ground" strokeWidth="1" />
      <path d="M 50 28 Q 70 40 50 55" className="exercise-illus__arrow" fill="none" strokeWidth="1.5" />
    </Figure>
  ),
  'calf-raise': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 55" />
      <Limb d="M 50 55 L 42 72 M 50 55 L 58 72" />
      <path d="M 42 68 L 42 62 M 58 68 L 58 62" className="exercise-illus__arrow" strokeWidth="1.5" />
      <line x1="10" y1="74" x2="90" y2="74" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
  'calf-raise-seated': (
    <>
      <Bench y={50} />
      <Figure y={5}>
        <Head cx={50} cy={30} />
        <Limb d="M 50 38 L 50 50" />
        <Limb d="M 50 50 L 42 58 M 50 50 L 58 58" />
        <path d="M 42 56 L 42 50 M 58 56 L 58 50" className="exercise-illus__arrow" strokeWidth="1.5" />
      </Figure>
    </>
  ),
  'calf-press': (
    <>
      <rect x="15" y="40" width="70" height="25" rx="3" className="exercise-illus__equipment" opacity="0.5" />
      <Figure y={10}>
        <Head cx={50} cy={35} />
        <Limb d="M 50 43 L 50 52" />
        <Limb d="M 50 52 L 42 38 M 50 52 L 58 38" />
      </Figure>
    </>
  ),
  'calf-jump': (
    <Figure>
      <Head />
      <Limb d="M 50 20 L 50 48" />
      <Limb d="M 50 48 L 42 58 M 50 48 L 58 58" />
      <path d="M 35 65 L 50 50 L 65 65" className="exercise-illus__arrow" fill="none" strokeWidth="1.5" />
      <line x1="10" y1="72" x2="90" y2="72" className="exercise-illus__ground" strokeWidth="1" />
    </Figure>
  ),
}

export function ExerciseIllustration({ id, title }: ExerciseIllustrationProps) {
  return (
    <figure className="exercise-illus" aria-label={`Ilustración: ${title}`}>
      <svg viewBox="0 0 100 80" className="exercise-illus__svg" role="img">
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="exercise-illus__arrow-head" />
          </marker>
        </defs>
        <rect width="100" height="80" className="exercise-illus__bg" rx="6" />
        {illustrations[id]}
      </svg>
      <figcaption className="exercise-illus__caption">Posición correcta</figcaption>
    </figure>
  )
}
