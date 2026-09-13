import { useCallback, useEffect, useState } from 'react'

interface Options {
  /** How many cards are in the deck. */
  length: number
  /** Advance on a timer. */
  autoplay: boolean
  /** Milliseconds between automatic steps. */
  intervalMs: number
  /** Hold the timer — hover, an open modal, reduced motion. */
  paused: boolean
}

/**
 * Index state for the project carousel: wrap-around stepping plus an autoplay
 * timer that restarts whenever the deck or the pause state changes.
 */
export function useCarousel({ length, autoplay, intervalMs, paused }: Options) {
  const [index, setIndex] = useState(0)

  // A shorter deck (switching tabs) must never leave the index out of range.
  useEffect(() => {
    setIndex((i) => (length === 0 ? 0 : i % length))
  }, [length])

  const step = useCallback(
    (delta: number) => {
      if (length === 0) return
      setIndex((i) => (i + delta + length) % length)
    },
    [length],
  )

  const goTo = useCallback(
    (i: number) => {
      if (length === 0) return
      setIndex(((i % length) + length) % length)
    },
    [length],
  )

  useEffect(() => {
    if (!autoplay || paused || length < 2) return
    const id = window.setInterval(() => step(1), intervalMs)
    return () => window.clearInterval(id)
  }, [autoplay, paused, length, intervalMs, step])

  return { index, step, goTo }
}
