import { useState } from 'react'
import type { Project } from '../../data/types'
import { DownloadIcon, ShareIcon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import styles from './ProjectModal.module.css'
import { ZoomableSheet } from './ZoomableSheet'

interface Props {
  project: Project | undefined
  open: boolean
  onClose: () => void
}

/** A link that opens straight into this project (see the hash handling in Projects). */
export function projectLink(project: Project) {
  return `${window.location.origin}${window.location.pathname}#project-${project.id}`
}

export function ProjectModal({ project, open, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  // The native share sheet where there is one; otherwise copy the link.
  const share = async (p: Project) => {
    const url = projectLink(p)
    if (navigator.share) {
      try {
        await navigator.share({ title: p.title, text: p.tagline, url })
      } catch {
        // Dismissed — nothing to do.
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

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
            <div className={styles.toolbar}>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                ✕
              </button>

              <div className={styles.actions}>
                {project.pdf && (
                  <a
                    className={styles.action}
                    href={project.pdf}
                    download
                    aria-label="Download PDF"
                    title="Download PDF"
                  >
                    <DownloadIcon size={15} />
                  </a>
                )}
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => share(project)}
                  aria-label="Share project"
                  title="Share"
                >
                  {copied ? 'Link copied' : <ShareIcon size={15} />}
                </button>
              </div>
            </div>

            <div className={styles.titleBlock}>
              <div className={styles.meta}>
                <span className={styles.kind} style={{ background: project.palette }}>
                  {project.tab === 'edu' ? 'Educational' : 'Professional'}
                </span>
                <span className={styles.programme}>
                  {project.programme} · {project.year}
                </span>
              </div>
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
          </div>

          <div className={styles.boards}>
            <div className={styles.sheetStack}>
              {project.sheets && project.sheets.length > 0 ? (
                project.sheets.map((sheet, i) => (
                  <ZoomableSheet
                    key={sheet}
                    src={sheet}
                    alt={`${project.title} — board ${i + 1}`}
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
