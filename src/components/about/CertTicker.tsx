import { useState } from 'react'
import { certificates } from '../../data/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { MediaFrame } from '../ui/MediaFrame'
import { Modal, ModalClose } from '../ui/Modal'
import styles from './CertTicker.module.css'

interface Props {
  onOpenChange?: (open: boolean) => void
}

/**
 * An endlessly scrolling row of certificates. The list is rendered twice so the
 * track can translate exactly -50% and loop seamlessly; the second copy is
 * hidden from assistive tech.
 */
export function CertTicker({ onOpenChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const open = certificates.find((c) => c.id === openId)

  const show = (id: string) => {
    setOpenId(id)
    onOpenChange?.(true)
  }

  const close = () => {
    setOpenId(null)
    onOpenChange?.(false)
  }

  const loop = [...certificates, ...certificates]

  return (
    <>
      <div
        className={styles.viewport}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={styles.track}
          style={{ animationPlayState: paused || reduced ? 'paused' : 'running' }}
        >
          {loop.map((cert, i) => {
            const duplicate = i >= certificates.length
            return (
              <button
                key={`${cert.id}-${i}`}
                type="button"
                className={styles.card}
                onClick={() => show(cert.id)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                tabIndex={duplicate ? -1 : 0}
                aria-hidden={duplicate || undefined}
              >
                <span className={styles.thumb}>
                  {cert.src ? (
                    <img src={cert.src} alt="" loading="lazy" />
                  ) : (
                    <span className={styles.thumbLabel}>Certificate</span>
                  )}
                  <span className={styles.issuer}>{cert.issuer}</span>
                </span>
                <span className={styles.body}>
                  <span className={styles.date}>{cert.date}</span>
                  <span className={styles.title}>{cert.title}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <Modal open={!!open} onClose={close} label={open?.title ?? 'Certificate'}>
        {open && (
          <>
            <div className={styles.modalHead}>
              <div className={styles.modalMeta}>
                <span className={styles.modalKicker}>
                  {open.issuer} · {open.date}
                </span>
                <span className={styles.modalTitle}>{open.title}</span>
              </div>
              <ModalClose onClick={close} />
            </div>
            <div className={styles.modalBody}>
              <MediaFrame
                src={open.src}
                alt={`${open.title} — ${open.issuer}`}
                caption="Certificate"
                hint={`Add the scan at public/certs/${open.id}.jpg, then set src: '/certs/${open.id}.jpg' on this certificate in src/data/site.ts`}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  )
}
