import { footer, profile } from '../data/site'
import { HeartIcon } from './ui/Icon'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.made}>
          {footer.madeBy} <HeartIcon /> by {profile.name}
        </span>
        <span className={styles.copy}>{footer.copyright}</span>
        <div className={styles.links}>
          <a href="#about" className={styles.link}>
            About
          </a>
          <a href="#projects" className={styles.link}>
            Projects
          </a>
          <a href={`mailto:${profile.email}`} className={styles.link}>
            Imprint
          </a>
        </div>
      </div>
    </footer>
  )
}
