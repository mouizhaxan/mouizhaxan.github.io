import { useRef, type CSSProperties } from 'react'
import { CRIMSON, carousel } from '../../data/site'
import type { Project } from '../../data/types'
import { useViewportWidth } from '../../hooks/useViewportWidth'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectCarousel.module.css'

interface Props {
  projects: Project[]
  index: number
  onStep: (delta: number) => void
  onGoTo: (index: number) => void
  onOpen: () => void
  onPauseChange: (paused: boolean) => void
}

/** How far a finger must travel before it counts as a swipe. */
const SWIPE_THRESHOLD = 48

export function ProjectCarousel({
  projects,
  index,
  onStep,
  onGoTo,
  onOpen,
  onPauseChange,
}: Props) {
  const vw = useViewportWidth()
  const touchStartX = useRef<number | null>(null)

  const count = projects.length
  const narrow = vw < 760

  // Distance between card centres, and how far back the neighbours sit. The
  // depth is flattened on small screens so off-centre cards don't clip.
  const gap = Math.max(180, Math.min(carousel.spacing, vw * 0.44))
  const depth = narrow ? 70 : 140
  const tilt = narrow ? -10 : -16

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    onPauseChange(true)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    onPauseChange(false)
    if (start === null) return

    const delta = e.changedTouches[0].clientX - start
    if (Math.abs(delta) > SWIPE_THRESHOLD) onStep(delta < 0 ? 1 : -1)
  }

  return (
    <>
      <div
        className={styles.stage}
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        {projects.map((project, i) => {
          // Signed distance from the front card, wrapped so the deck is a loop.
          let off = i - index
          if (count > 2) {
            if (off > count / 2) off -= count
            else if (off < -count / 2) off += count
          }
          const away = Math.abs(off)
          const active = off === 0

          const style: CSSProperties = {
            height: 'min(600px, 86vw)',
            transform: `translateX(calc(-50% + ${off * gap}px)) translateZ(${-away * depth}px) scale(${
              1 - away * 0.06
            }) rotateY(${off * tilt}deg)`,
            opacity: away > 2 ? 0 : 1 - away * 0.3,
            filter: active
              ? 'grayscale(0) saturate(1)'
              : `grayscale(${Math.min(1, away * 0.85)}) brightness(${1 + away * 0.04})`,
            zIndex: 10 - away,
            pointerEvents: away > 2 ? 'none' : 'auto',
            boxShadow: active
              ? '0 8px 20px rgba(27,26,25,.12), 0 34px 76px rgba(27,26,25,.22)'
              : '0 2px 6px rgba(27,26,25,.05), 0 14px 34px rgba(27,26,25,.09)',
            transition:
              'transform 1.25s cubic-bezier(.34,.02,.2,1), opacity 1.1s ease, box-shadow 1.1s ease, filter 1.35s ease',
          }

          return (
            <ProjectCard
              key={project.id}
              project={project}
              position={i + 1}
              style={style}
              active={active}
              onClick={() => (active ? onOpen() : onGoTo(i))}
            />
          )
        })}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              className={styles.dot}
              style={{
                width: i === index ? 34 : 10,
                background: i === index ? CRIMSON : 'rgba(27,26,25,.2)',
              }}
              onClick={() => onGoTo(i)}
              aria-label={`Go to ${project.title}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <div className={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowQuiet}`}
            onClick={() => onStep(-1)}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowSolid}`}
            onClick={() => onStep(1)}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>
    </>
  )
}
