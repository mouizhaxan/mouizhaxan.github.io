import { useEffect, useState } from 'react'
import { profile } from '../data/site'
import { CloseIcon, DownloadIcon, MenuIcon } from './ui/Icon'
import styles from './Nav.module.css'

const SECTIONS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile sheet as soon as the layout is wide enough for the bar.
  useEffect(() => {
    if (!menuOpen) return
    const query = window.matchMedia('(min-width: 861px)')
    const close = () => query.matches && setMenuOpen(false)
    query.addEventListener('change', close)
    return () => query.removeEventListener('change', close)
  }, [menuOpen])

  return (
    <>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#top" className={styles.brand}>
          {profile.name}
        </a>

        <div className={styles.links}>
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className={styles.link}>
              {s.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="#projects" className={`${styles.btn} ${styles.btnGhost} ${styles.portfolioBtn}`}>
            Portfolio <DownloadIcon />
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnSolid}`}
          >
            CV <DownloadIcon />
          </a>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.sheet}>
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className={styles.sheetLink}
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
