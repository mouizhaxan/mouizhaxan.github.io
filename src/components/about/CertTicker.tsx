import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { certificates } from '../../data/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { MediaFrame } from '../ui/MediaFrame'
import { Modal, ModalClose } from '../ui/Modal'
import styles from './CertTicker.module.css'

interface Props {
  onOpenChange?: (open: boolean) => void
}

/** Seconds for one full lap of the list. */
const LAP_SECONDS = 40
/** Pixels a press must travel before it counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5

/**
 * An endlessly scrolling row of certificates that can also be dragged with the
 * mouse or a finger. The list is rendered twice so the offset can wrap by one
 * copy's width and loop seamlessly; the second copy is hidden from assistive tech.
 */
export function CertTicker({ onOpenChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const reduced = usePrefersReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const press = useRef<{ id: number; startX: number; startOffset: number } | null>(null)
  const moved = useRef(false)
  const running = useRef(false)

  running.current = !hovered && !dragging && !reduced && openId === null

  // Drives the scroll and applies every offset change, including drags.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now

      // One copy's width: from the first card to the first card of the duplicate.
      const cards = track.children as HTMLCollectionOf<HTMLElement>
      const lap = cards[certificates.length]
        ? cards[certificates.length].offsetLeft - cards[0].offsetLeft
        : 0

      if (lap > 0) {
        if (running.current) offset.current -= (lap / LAP_SECONDS) * dt
        offset.current %= lap
        if (offset.current > 0) offset.current -= lap
        track.style.transform = `translateX(${offset.current}px)`
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    press.current = { id: e.pointerId, startX: e.clientX, startOffset: offset.current }
    moved.current = false
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current
    if (!p || p.id !== e.pointerId) return
    const dx = e.clientX - p.startX
    if (!moved.current) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      moved.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    offset.current = p.startOffset + dx
  }

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (press.current?.id !== e.pointerId) return
    press.current = null
    setDragging(false)
  }

  // A drag that ends over a card must not open it.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (!moved.current) return
    e.preventDefault()
    e.stopPropagation()
    moved.current = false
  }

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
        className={`${styles.viewport} ${dragging ? styles.dragging : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className={styles.track}>
          {loop.map((cert, i) => {
            const duplicate = i >= certificates.length
            return (
              <button
                key={`${cert.id}-${i}`}
                type="button"
                className={styles.card}
                onClick={() => show(cert.id)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                tabIndex={duplicate ? -1 : 0}
                aria-hidden={duplicate || undefined}
              >
                <span className={styles.thumb}>
                  {cert.src ? (
                    <img src={cert.src} alt="" loading="lazy" draggable={false} />
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
