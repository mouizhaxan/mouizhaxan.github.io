import type { ReactNode } from 'react'
import { COBALT, CRIMSON, profile } from '../../data/site'
import { InstagramIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '../ui/Icon'
import styles from './ContactCards.module.css'

interface Card {
  href: string
  external?: boolean
  label: string
  value: string
  colour: string
  icon: ReactNode
}

const WHATSAPP_GREEN = '#128c7e'
const INSTAGRAM_PINK = '#c13584'

export function ContactCards() {
  const cards: Card[] = [
    {
      href: `mailto:${profile.email}`,
      label: 'Gmail',
      value: profile.email,
      colour: CRIMSON,
      icon: <MailIcon />,
    },
    {
      href: profile.whatsappLink,
      external: true,
      label: 'WhatsApp',
      value: profile.whatsappNumber,
      colour: WHATSAPP_GREEN,
      icon: <WhatsAppIcon />,
    },
    {
      href: profile.linkedin,
      external: true,
      label: 'LinkedIn',
      value: profile.linkedinLabel,
      colour: COBALT,
      icon: <LinkedInIcon />,
    },
    {
      href: profile.instagram,
      external: true,
      label: 'Instagram',
      value: profile.instagramLabel,
      colour: INSTAGRAM_PINK,
      icon: <InstagramIcon />,
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <a
          key={card.label}
          href={card.href}
          className={styles.card}
          {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className={styles.icon} style={{ background: card.colour }}>
            {card.icon}
          </span>
          <span className={styles.text}>
            <span className={styles.label}>{card.label}</span>
            <span className={styles.value}>{card.value}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
