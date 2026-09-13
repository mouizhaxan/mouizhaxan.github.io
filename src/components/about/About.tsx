import { profile } from '../../data/site'
import { Capabilities } from './Capabilities'
import { CertTicker } from './CertTicker'
import { CvTimeline } from './CvTimeline'
import { Languages } from './Languages'
import { SoftwareDials } from './SoftwareDials'
import { StatGrid } from './StatGrid'
import styles from './About.module.css'

interface Props {
  /** Bubbles up whether any About modal is open, so the carousel can pause. */
  onModalChange?: (open: boolean) => void
}

export function About({ onModalChange }: Props) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.stack}>
        {/* Portrait + introduction */}
        <div data-reveal className={styles.intro}>
          <div className={styles.portrait}>
            <img src={profile.portrait} alt={profile.name} />
          </div>

          <div className={styles.panel}>
            <span className="kicker">About</span>
            <h2 className={styles.heading}>{profile.aboutHeading}</h2>
            <p className={styles.lead}>{profile.aboutLead}</p>
            <p className={styles.secondary}>{profile.aboutSecondary}</p>

            <div className={styles.chips}>
              {profile.tools.map((tool) => (
                <span key={tool} className={styles.chip}>
                  {tool}
                </span>
              ))}
            </div>

            <div className={styles.ctas}>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${styles.ctaSolid}`}
              >
                Download CV
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${styles.ctaQuiet}`}
              >
                LinkedIn ↗
              </a>
              <a href={`mailto:${profile.email}`} className={`${styles.cta} ${styles.ctaQuiet}`}>
                Email
              </a>
            </div>
          </div>
        </div>

        <StatGrid />

        <CvTimeline onOpenChange={onModalChange} />

        {/* Dials beside capabilities + languages */}
        <div data-reveal className={styles.skills}>
          <div className={styles.card}>
            <SoftwareDials />
          </div>
          <div className={styles.column}>
            <div className={styles.card}>
              <Capabilities />
            </div>
            <div className={styles.card}>
              <Languages />
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div data-reveal className={styles.certsBlock}>
          <div className={styles.certsHead}>
            <span className="kicker">Certifications</span>
            <span className={styles.certsNote}>Click a card to view the certificate</span>
          </div>
          <CertTicker onOpenChange={onModalChange} />
        </div>
      </div>
    </section>
  )
}
