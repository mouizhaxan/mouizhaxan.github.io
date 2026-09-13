import { COBALT, CORK, CRIMSON, EMERALD, software } from '../../data/site'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import styles from './SoftwareDials.module.css'

/* Dial geometry — a 5-segment ring drawn with dash offsets on one circle. */
const R = 16
const CIRC = 2 * Math.PI * R
const SEGMENT = CIRC / 5
const DASH = SEGMENT - 4.2 // the gap between segments
const TRACK = '#e7e6e4'

const ACCENTS = [CRIMSON, COBALT, EMERALD, CORK]

export function SoftwareDials() {
  // Fill the dials in the first time the grid scrolls into view.
  const [ref, lit] = useInViewOnce<HTMLDivElement>(0.25)

  return (
    <div className={styles.wrap}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span className="kicker">Software</span>
        <span className={styles.scale}>Proficiency 1 — 5</span>
      </div>

      <div ref={ref} className={styles.grid}>
        {software.map((tool, n) => {
          const colour = ACCENTS[(n * 3 + 1) % 4]

          return (
            <div key={tool.name} className={styles.dial}>
              <div className={styles.ring}>
                <svg viewBox="0 0 40 40" width="58" height="58" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => {
                    const filled = i < tool.level
                    const pending = filled && !lit
                    return (
                      <circle
                        key={i}
                        cx="20"
                        cy="20"
                        r={R}
                        fill="none"
                        strokeWidth="3.4"
                        stroke={filled ? colour : TRACK}
                        strokeDasharray={`${DASH.toFixed(2)} ${(CIRC - DASH).toFixed(2)}`}
                        strokeDashoffset={(-i * SEGMENT).toFixed(2)}
                        style={{
                          opacity: pending ? 0 : 1,
                          transform: pending ? 'scale(.72)' : 'none',
                          transformOrigin: '20px 20px',
                          transition: `opacity .45s ease ${n * 60 + i * 110}ms, transform .5s var(--ease) ${
                            n * 60 + i * 110
                          }ms`,
                        }}
                      />
                    )
                  })}
                </svg>
                <span className={styles.level}>{lit ? tool.level : 0}</span>
              </div>
              <span className={styles.name}>{tool.name}</span>
              <span className="visually-hidden">Proficiency {tool.level} of 5</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
