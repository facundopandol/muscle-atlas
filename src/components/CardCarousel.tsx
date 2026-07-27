import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import './ExploreCards.css'

export interface CarouselSlide {
  key: string
  label: string
  description: string
  meta?: string
  /** Miniatura / imagen dentro de la card. */
  visual?: ReactNode
  /** Título en acento (naranja) y mayúsculas. */
  accentLabel?: boolean
  active?: boolean
  variant?: 'half' | 'muted' | 'default'
  onSelect: () => void
}

interface CardCarouselProps {
  title: string
  subtitle: string
  slides: CarouselSlide[]
  /** Cambia al cambiar de nivel para volver a la primera card. */
  resetKey: string
}

export function CardCarousel({ title, subtitle, slides, resetKey }: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startScroll: number
    moved: boolean
  } | null>(null)
  const suppressClickRef = useRef(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    const el = trackRef.current
    if (el) el.scrollTo({ left: 0, behavior: 'auto' })
  }, [resetKey])

  function goTo(i: number) {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(slides.length - 1, i))
    const width = el.clientWidth
    el.scrollTo({ left: clamped * width, behavior: 'smooth' })
    setIndex(clamped)
  }

  function syncIndexFromScroll() {
    const el = trackRef.current
    if (!el || el.clientWidth <= 0) return
    const next = Math.round(el.scrollLeft / el.clientWidth)
    setIndex(Math.max(0, Math.min(slides.length - 1, next)))
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let frame = 0
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncIndexFromScroll)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
    }
  }, [slides.length, resetKey])

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    // Touch ya scrollea nativo; mouse/pen arrastran el carrusel.
    if (e.pointerType === 'touch') return
    const el = trackRef.current
    if (!el) return
    suppressClickRef.current = false
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    }
    el.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    const el = trackRef.current
    if (!drag || !el || drag.pointerId !== e.pointerId) return
    const dx = e.clientX - drag.startX
    if (Math.abs(dx) > 6) {
      drag.moved = true
      suppressClickRef.current = true
    }
    el.scrollLeft = drag.startScroll - dx
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    const el = trackRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const moved = drag.moved
    dragRef.current = null
    if (!el) return
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    if (!moved) return
    const width = el.clientWidth || 1
    goTo(Math.round(el.scrollLeft / width))
  }

  return (
    <div className="explore-carousel">
      <header className="explore-cards__header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <p className="explore-carousel__hint" aria-hidden="true">
        Deslizá ← →
      </p>

      <div
        ref={trackRef}
        className="explore-carousel__track"
        role="listbox"
        aria-label={title}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            goTo(index + 1)
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            goTo(index - 1)
          } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            slides[index]?.onSelect()
          }
        }}
      >
        {slides.map((slide) => (
          <button
            key={slide.key}
            type="button"
            role="option"
            aria-selected={slide.active ?? false}
            className={[
              'explore-card',
              'explore-carousel__slide',
              slide.visual ? 'explore-card--with-visual' : '',
              slide.variant === 'half' ? 'explore-card--half' : '',
              slide.variant === 'muted' ? 'explore-card--muted' : '',
              slide.active ? 'explore-card--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={(e) => {
              if (suppressClickRef.current) {
                e.preventDefault()
                suppressClickRef.current = false
                return
              }
              slide.onSelect()
            }}
          >
            <span
              className={`explore-card__label${slide.accentLabel ? ' explore-card__label--accent' : ''}`}
            >
              {slide.label}
            </span>
            {slide.visual && <div className="explore-card__visual">{slide.visual}</div>}
            <span className="explore-card__desc">{slide.description}</span>
            {slide.meta && <span className="explore-card__meta">{slide.meta}</span>}
          </button>
        ))}
      </div>

      <div className="explore-carousel__footer">
        <button
          type="button"
          className="explore-carousel__nav"
          aria-label="Anterior"
          disabled={index <= 0}
          onClick={() => goTo(index - 1)}
        >
          ‹
        </button>

        <div className="explore-carousel__dots" role="tablist" aria-label="Posición">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a ${slide.label}`}
              className={`explore-carousel__dot${i === index ? ' explore-carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="explore-carousel__nav"
          aria-label="Siguiente"
          disabled={index >= slides.length - 1}
          onClick={() => goTo(index + 1)}
        >
          ›
        </button>
      </div>

      <p className="explore-carousel__counter">
        {index + 1} / {slides.length}
      </p>
    </div>
  )
}

interface ExploreShellProps {
  crumbs: Array<{ label: string; go?: () => void }>
  onBack?: () => void
  children: ReactNode
}

export function ExploreShell({ crumbs, onBack, children }: ExploreShellProps) {
  return (
    <section className="explore-cards">
      <nav className="explore-cards__crumbs" aria-label="Navegación">
        {crumbs.map((c, i) => (
          <span key={`${c.label}-${i}`} className="explore-cards__crumb">
            {i > 0 && <span className="explore-cards__sep">/</span>}
            {c.go && i < crumbs.length - 1 ? (
              <button type="button" className="explore-cards__crumb-btn" onClick={c.go}>
                {c.label}
              </button>
            ) : (
              <span className="explore-cards__crumb-current">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      {onBack && (
        <button type="button" className="explore-cards__back" onClick={onBack}>
          ← Atrás
        </button>
      )}

      {children}
    </section>
  )
}
