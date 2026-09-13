import { useEffect } from 'react'

/**
 * Fades every `[data-reveal]` element up as it first enters the viewport, then
 * stops watching it. Elements are staggered in groups of four, matching the
 * original design canvas.
 *
 * Call once from App. It re-scans whenever `deps` change, so elements that
 * appear later (a tab switch, a modal close) still get their reveal.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in)')
    if (targets.length === 0) return

    // No IntersectionObserver (or motion is off): just show everything.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
