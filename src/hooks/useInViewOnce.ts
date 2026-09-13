import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref to attach to an element and a flag that flips to true the first
 * time that element scrolls into view — and stays true. Used to trigger the
 * software dials filling in exactly once.
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold])

  return [ref, inView] as const
}
