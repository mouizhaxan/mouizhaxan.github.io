import { stats } from '../../data/site'
import styles from './StatGrid.module.css'

export function StatGrid() {
  return (
    <div data-reveal className={styles.grid}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <span className={styles.value} style={{ color: s.colour }}>
            {s.value}
          </span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
