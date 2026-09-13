import { useScrollPast } from '../hooks/useScrollPast'
import styles from './BackToTop.module.css'

export function BackToTop() {
  const visible = useScrollPast(500)

  return (
    <a
      href="#top"
      className={`${styles.top} ${visible ? styles.visible : ''}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      ↑
    </a>
  )
}
