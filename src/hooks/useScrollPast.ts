import { useEffect, useState } from 'react'

/** True once the page has scrolled further than `threshold` pixels. */
export function useScrollPast(threshold = 500) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}
