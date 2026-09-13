import styles from './MediaFrame.module.css'

interface MediaFrameProps {
  /** Path under public/, e.g. '/certs/rhino.jpg'. Empty renders the placeholder. */
  src?: string
  alt: string
  /** Caption shown in the placeholder, e.g. 'Transcript'. */
  caption: string
  /** Where to drop the file to fill this slot — shown under the caption. */
  hint?: string
  /** Accent used for the placeholder rule. */
  colour?: string
  /** CSS aspect-ratio for the frame. Defaults to 4/3. */
  ratio?: string
}

/**
 * A document slot. Shows the scan when one exists, and a designed placeholder
 * — ruled grid, accent bar, caption — when it doesn't.
 */
export function MediaFrame({
  src,
  alt,
  caption,
  hint,
  colour = 'var(--ink-3)',
  ratio = '4 / 3',
}: MediaFrameProps) {
  return (
    <div className={styles.frame} style={{ aspectRatio: ratio }}>
      {src ? (
        <img className={styles.image} src={src} alt={alt} loading="lazy" />
      ) : (
        <>
          <span className={styles.grid} aria-hidden />
          <div className={styles.placeholder}>
            <span className={styles.rule} style={{ background: colour }} aria-hidden />
            <span className={styles.caption}>{caption}</span>
            {hint && <span className={styles.hint}>{hint}</span>}
          </div>
        </>
      )}
    </div>
  )
}
