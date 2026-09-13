import { useState, type FormEvent } from 'react'
import { profile } from '../../data/site'
import styles from './ContactForm.module.css'

/**
 * The contact form is decorative — GitHub Pages is static, so there is no
 * server to post to. Rather than swallow a visitor's message, submitting flips
 * the button and offers a pre-filled mail link carrying what they typed, so
 * nothing is lost.
 *
 * To make it send on its own instead, sign up for a free form service
 * (web3forms.com or formspree.io), then POST `new FormData(e.currentTarget)`
 * to the endpoint they give you, in place of the `setSent(true)` below.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  const mailto =
    `mailto:${profile.email}` +
    `?subject=${encodeURIComponent(`Portfolio enquiry — ${name || 'Hello'}`)}` +
    `&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          Name
          <input
            className={styles.input}
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          Email
          <input
            className={styles.input}
            type="email"
            required
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label className={styles.field}>
        Message
        <textarea
          className={styles.textarea}
          required
          placeholder="Tell me about the project"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <button type="submit" className={styles.submit} disabled={sent}>
        {sent ? 'Ready — one more step' : 'Send message'}
      </button>

      {sent && (
        <p className={styles.note} role="status">
          This form isn’t wired to a mail server yet.{' '}
          <a href={mailto}>Open this message in your mail app</a> — it’s already filled in — or
          write to <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
        </p>
      )}
    </form>
  )
}
