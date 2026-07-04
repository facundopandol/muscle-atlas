/** Líneas de construcción al estilo boceto de Da Vinci. */
export function VitruvianSketch() {
  return (
    <g className="vitruvian-sketch" aria-hidden="true">
      <line x1="200" y1="52" x2="200" y2="498" className="vitruvian-sketch__line" />
      <line x1="58" y1="285" x2="342" y2="285" className="vitruvian-sketch__line" />
      <line x1="58" y1="52" x2="342" y2="498" className="vitruvian-sketch__line vitruvian-sketch__line--faint" />
      <line x1="342" y1="52" x2="58" y2="498" className="vitruvian-sketch__line vitruvian-sketch__line--faint" />
      <circle cx="200" cy="285" r="4" className="vitruvian-sketch__navel" />
      <line x1="38" y1="152" x2="362" y2="152" className="vitruvian-sketch__arm-axis" />
    </g>
  )
}
