import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { FitIcon, ZoomInIcon, ZoomOutIcon } from '../ui/Icon'
import styles from './ZoomableSheet.module.css'

interface Props {
  src: string
  alt: string
}

interface View {
  scale: number
  x: number
  y: number
}

interface Point {
  x: number
  y: number
}

const MIN_SCALE = 1
const MAX_SCALE = 6
/** How much one press of a zoom button multiplies the scale. */
const STEP = 1.5
const FIT: View = { scale: 1, x: 0, y: 0 }

/** A client position relative to the centre of `el`. */
function pointIn(el: HTMLElement, clientX: number, clientY: number): Point {
  const r = el.getBoundingClientRect()
  return { x: clientX - r.left - r.width / 2, y: clientY - r.top - r.height / 2 }
}

/** Zoom to `scale`, keeping the point `at` fixed under the cursor or fingers. */
function zoomTo(view: View, scale: number, at: Point): View {
  const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
  const k = next / view.scale
  return { scale: next, x: at.x - (at.x - view.x) * k, y: at.y - (at.y - view.y) * k }
}

/** Stop the board from being dragged out of its frame. */
function clampTo(view: View, stage: HTMLElement | null): View {
  if (!stage) return view
  const maxX = (stage.clientWidth * (view.scale - 1)) / 2
  const maxY = (stage.clientHeight * (view.scale - 1)) / 2
  return {
    scale: view.scale,
    x: Math.min(maxX, Math.max(-maxX, view.x)),
    y: Math.min(maxY, Math.max(-maxY, view.y)),
  }
}

/**
 * A presentation board that zooms in place. Buttons, double-click, ctrl + wheel
 * (or a trackpad pinch) and touch pinch zoom; drag pans once zoomed. A plain
 * wheel or swipe still scrolls the list of boards.
 */
export function ZoomableSheet({ src, alt }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Map<number, Point>())
  const pinch = useRef<{ distance: number; mid: Point; view: View } | null>(null)
  const [view, setView] = useState<View>(FIT)
  const [dragging, setDragging] = useState(false)

  const update = useCallback(
    (fn: (v: View) => View) => setView((v) => clampTo(fn(v), stageRef.current)),
    [],
  )

  const zoomBy = useCallback(
    (factor: number, at: Point = { x: 0, y: 0 }) => update((v) => zoomTo(v, v.scale * factor, at)),
    [update],
  )

  // React registers wheel listeners as passive, which can't stop the list scrolling.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      zoomBy(Math.exp(-delta * 0.01), pointIn(stage, e.clientX, e.clientY))
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [zoomBy])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      pinch.current = {
        distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
        mid: pointIn(e.currentTarget, (a.x + b.x) / 2, (a.y + b.y) / 2),
        view,
      }
    }
    setDragging(view.scale > 1)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    const start = pinch.current
    if (start && pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      const mid = pointIn(e.currentTarget, (a.x + b.x) / 2, (a.y + b.y) / 2)
      const ratio = Math.hypot(a.x - b.x, a.y - b.y) / start.distance
      const zoomed = zoomTo(start.view, start.view.scale * ratio, start.mid)
      update(() => ({
        ...zoomed,
        x: zoomed.x + mid.x - start.mid.x,
        y: zoomed.y + mid.y - start.mid.y,
      }))
      return
    }

    const dx = e.clientX - prev.x
    const dy = e.clientY - prev.y
    update((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
  }

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) setDragging(false)
  }

  const onDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    const at = pointIn(e.currentTarget, e.clientX, e.clientY)
    update((v) => (v.scale > 1 ? FIT : zoomTo(v, 2.5, at)))
  }

  const stageClass = [styles.stage, view.scale > 1 && styles.zoomed, dragging && styles.dragging]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.sheet}>
      <div
        ref={stageRef}
        className={stageClass}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onDoubleClick={onDoubleClick}
      >
        <img
          className={styles.image}
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        />
      </div>

      <div className={styles.tools}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => zoomBy(1 / STEP)}
          disabled={view.scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          <ZoomOutIcon size={16} />
        </button>
        <span className={styles.percent}>{Math.round(view.scale * 100)}%</span>
        <button
          type="button"
          className={styles.btn}
          onClick={() => zoomBy(STEP)}
          disabled={view.scale >= MAX_SCALE}
          aria-label="Zoom in"
        >
          <ZoomInIcon size={16} />
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => setView(FIT)}
          disabled={view.scale === 1}
          aria-label="Reset zoom"
        >
          <FitIcon size={16} />
        </button>
      </div>
    </div>
  )
}
