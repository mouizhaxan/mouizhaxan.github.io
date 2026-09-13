import { useEffect, useState } from 'react'

/**
 * The current window width, used by the carousel to work out how far apart the
 * cards should sit. Starts at a sensible desktop width so the first paint on
 * the server-less build is never zero.
 */
export function useViewportWidth() {
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  )

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width
}
