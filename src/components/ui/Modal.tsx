import { useEffect, useRef, type ReactNode } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  /** The accessible name — usually the document or project title. */
  label: string
  /** Use the wide, full-height shell for the project modal. */
  wide?: boolean
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

/**
 * Backdrop + panel shell shared by the document, certificate and project
 * modals. Handles Escape, click-outside, body scroll lock, focus trapping and
 * returning focus to whatever opened it.
 */
export function Modal({ open, onClose, label, wide = false, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useBodyScrollLock(open)

  // Remember what had focus, move focus into the panel, and put it back on close.
  useEffect(() => {
    if (!open) return
    openerRef.current = document.activeElement as HTMLElement | null

    const panel = panelRef.current
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panel)?.focus()

    return () => openerRef.current?.focus?.()
  }, [open])

  // Escape closes; Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const items = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((el) => el.offsetParent !== null)
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={`${styles.backdrop} ${wide ? styles.backdropDark : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={`${styles.panel} ${wide ? styles.panelWide : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  )
}

/** The square ✕ used in the modal headers. */
export function ModalClose({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.close} ${className ?? ''}`}
      aria-label="Close"
    >
      ✕
    </button>
  )
}
