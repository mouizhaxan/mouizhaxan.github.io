import { Fragment } from 'react'
import { heroWords } from '../data/site'
import styles from './Hero.module.css'

/**
 * The opening statement. Each word rises into place on a stagger; the three
 * key phrases get a colour wipe painted in behind them.
 */
export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <h1 className={styles.statement}>
        {heroWords.map((w, i) => (
          <Fragment key={`${w.text}-${i}`}>
            {i > 0 && !w.tight && ' '}
            {w.mark ? (
              <mark
                className={styles.mark}
                style={{
                  backgroundImage: `linear-gradient(${w.mark}, ${w.mark})`,
                  animationDelay: `${w.delay}s`,
                }}
              >
                {w.text}
              </mark>
            ) : (
              <span
                className={`${styles.word} ${w.em ? styles.em : ''}`}
                style={{ animationDelay: `${w.delay}s` }}
              >
                {w.text}
              </span>
            )}
          </Fragment>
        ))}
      </h1>
    </section>
  )
}
