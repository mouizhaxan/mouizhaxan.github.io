import type { Project } from '../../data/types'
import { DownloadIcon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import styles from './ProjectModal.module.css'

interface Props {
  project: Project | undefined
  open: boolean
  /** e.g. "02 / 03" */
  counter: string
  onClose: () => void
  onStep: (delta: number) => void
}

export function ProjectModal({ project, open, counter, onClose, onStep }: Props) {
  const facts = project
    ? [
        ['Location', project.location],
        ['Area', project.area],
        ['Year', project.year],
        ['Status', project.status],
        ['Role', project.role],
        ['Tools', project.tools],
      ]
    : []

  return (
    <Modal open={open && !!project} onClose={onClose} label={project?.title ?? 'Project'} wide>
      {project && (
        <div className={styles.layout}>
          <div className={styles.info}>
            <div className={styles.kickerRow}>
              <span className={styles.kind} style={{ background: project.palette }}>
                {project.tab === 'edu' ? 'Educational' : 'Professional'}
              </span>
              <span className={styles.programme}>
                {project.programme} · {project.year}
              </span>
              <button
                type="button"
                className={styles.closeMobile}
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className={styles.titleBlock}>
              <h3 className={styles.title}>{project.title}</h3>
              <div className={styles.tagline}>{project.tagline}</div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.facts}>
              {facts.map(([label, value]) => (
                <div key={label} className={styles.fact}>
                  <div className={styles.factLabel}>{label}</div>
                  <div className={styles.factValue}>{value}</div>
                </div>
              ))}
            </div>

            <div className={styles.nav}>
              <span className="kicker">{counter}</span>
              <div className={styles.navButtons}>
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.navQuiet}`}
                  onClick={() => onStep(-1)}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.navSolid}`}
                  onClick={() => onStep(1)}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className={styles.boards}>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
              ✕
            </button>

            <div className={styles.sheetStack}>
              {project.sheets && project.sheets.length > 0 ? (
                project.sheets.map((sheet, i) => (
                  <img
                    key={sheet}
                    className={styles.sheet}
                    src={sheet}
                    alt={`${project.title} — board ${i + 1}`}
                    loading="lazy"
                  />
                ))
              ) : (
                <div className={styles.sheetEmpty}>
                  Presentation boards
                  <span className={styles.sheetHint}>
                    Export each A4-landscape board as an image into{' '}
                    <code>public/projects/</code>, then list them under{' '}
                    <code>sheets</code> for this project in <code>src/data/site.ts</code>.
                  </span>
                </div>
              )}

              {project.pdf && (
                <a
                  className={styles.pdfLink}
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Full PDF <DownloadIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
