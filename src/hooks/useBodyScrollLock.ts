import { useEffect } from 'react'

/**
 * Freezes the page behind an open modal. Several modals can exist at once, so
 * the lock is reference-counted — the class only comes off when the last one
 * closes.
 */
let locks = 0

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    locks += 1
    document.body.classList.add('modal-open')

    return () => {
      locks -= 1
      if (locks <= 0) {
        locks = 0
        document.body.classList.remove('modal-open')
      }
    }
  }, [active])
}
