import type { CSSProperties } from 'react'
import { COBALT, CORK, CORK_DARK, CRIMSON, EMERALD, capabilities } from '../../data/site'
import styles from './Capabilities.module.css'

/** [outline colour, ink colour] pairs, cycled across the tags. */
const ACCENTS: Array<[string, string]> = [
  [CRIMSON, CRIMSON],
  [COBALT, COBALT],
  [EMERALD, '#0e7a4f'],
  [CORK, CORK_DARK],
]

export function Capabilities() {
  return (
    <div className={styles.wrap}>
      <span className="kicker">Capabilities</span>
      <div className={styles.tags}>
        {capabilities.map((label, n) => {
          const [border, ink] = ACCENTS[(n * 5 + 2) % 4]
          return (
            <span
              key={label}
              className={styles.tag}
              style={
                {
                  color: ink,
                  boxShadow: `inset 0 0 0 1.5px ${border}`,
                  '--tag-ink': ink,
                } as CSSProperties
              }
            >
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
