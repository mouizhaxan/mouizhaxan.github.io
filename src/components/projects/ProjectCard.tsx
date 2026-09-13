import type { CSSProperties } from 'react'
import type { Project } from '../../data/types'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  /** 1-based position within the current tab, rendered as 01, 02, … */
  position: number
  /** Positioning + 3D transform computed by the carousel. */
  style: CSSProperties
  /** True when this is the front card — it opens rather than steps. */
  active: boolean
  onClick: () => void
}

export function ProjectCard({ project, position, style, active, onClick }: Props) {
  const number = String(position).padStart(2, '0')
  const kind = project.tab === 'edu' ? 'Educational' : 'Professional'

  return (
    <button
      type="button"
      className={styles.card}
      style={style}
      onClick={onClick}
      tabIndex={active ? 0 : -1}
      aria-label={active ? `Open ${project.title}` : `Go to ${project.title}`}
    >
      <span className={styles.media}>
        {project.cover ? (
          <img src={project.cover} alt="" />
        ) : (
          <span
            className={styles.placeholder}
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.palette} 0%, ${project.palette} 45%, rgba(0,0,0,.35) 100%)`,
            }}
          />
        )}

        <span
          className={styles.numeral}
          style={{ color: project.cover ? project.palette : 'rgba(255,255,255,.3)' }}
        >
          {number}
        </span>

        <span className={styles.chips}>
          <span className={styles.chip}>{kind}</span>
          <span className={styles.chip}>{project.programme}</span>
        </span>

        <span className={styles.bar} style={{ background: project.palette }}>
          {project.location} · {project.year} · {project.area}
        </span>
      </span>

      <span className={styles.meta}>
        <span className={styles.metaText}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.tagline}>{project.tagline}</span>
        </span>
        <span className={styles.open}>Open →</span>
      </span>
    </button>
  )
}
