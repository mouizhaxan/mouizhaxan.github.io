import { contact } from '../../data/site'
import { ContactCards } from './ContactCards'
import { ContactForm } from './ContactForm'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal className={styles.grid}>
          <div className={styles.intro}>
            <h2 className={styles.heading}>
              {contact.heading} <em>{contact.headingEm}</em>.
            </h2>
            <p className={styles.blurb}>{contact.blurb}</p>
            <ContactCards />
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
