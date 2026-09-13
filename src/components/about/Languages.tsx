import { languages } from '../../data/site'
import styles from './Languages.module.css'

export function Languages() {
  return (
    <div className={styles.wrap}>
      <span className="kicker">Languages</span>
      <div className={styles.grid}>
        {languages.map((lang) => (
          <div key={lang.name} className={styles.item}>
            <span className={styles.name} style={{ color: lang.colour }}>
              {lang.name}
            </span>
            <span className={styles.level}>{lang.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
