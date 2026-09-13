/** Shapes for everything in site.ts. Edit content there, not here. */

export type Tab = 'edu' | 'pro'

export interface Profile {
  name: string
  role: string
  email: string
  whatsappNumber: string
  whatsappLink: string
  linkedin: string
  linkedinLabel: string
  instagram: string
  instagramLabel: string
  cv: string
  portrait: string
  aboutHeading: string
  aboutLead: string
  aboutSecondary: string
  tools: string[]
}

/** One word or highlighted phrase in the animated hero statement. */
export interface HeroWord {
  text: string
  /** Seconds of animation delay, matching the original stagger. */
  delay: number
  /** A highlighted phrase — the colour the wipe paints behind it. */
  mark?: string
  /** Renders in grey italic, like "the art of navigating". */
  em?: boolean
  /** No leading space before this token (used for the final full stop). */
  tight?: boolean
}

export interface Stat {
  value: string
  label: string
  colour: string
}

export interface CvRow {
  id: string
  date: string
  place: string
  title: string
  sub: string
  /** The label on the "View …" chip, e.g. "Transcript". */
  doc: string
  /** Optional scan, e.g. '/docs/beu-transcript.jpg'. Empty shows a placeholder. */
  src?: string
}

export interface CvGroup {
  title: string
  colour: string
  rows: CvRow[]
}

export interface Software {
  name: string
  /** 1 – 5; drives how many of the five dial segments light up. */
  level: number
}

export interface Language {
  name: string
  level: string
  colour: string
}

export interface Certificate {
  id: string
  date: string
  title: string
  issuer: string
  /** Optional scan, e.g. '/certs/rhino.jpg'. Empty shows a placeholder. */
  src?: string
}

export interface Project {
  id: string
  tab: Tab
  title: string
  tagline: string
  year: string
  programme: string
  location: string
  area: string
  /** One of the four accents — tints the cover, the chip and the footer bar. */
  palette: string
  role: string
  tools: string
  status: string
  description: string
  /** Optional cover image, e.g. '/projects/museum-cover.jpg'. */
  cover?: string
  /** Optional A4-landscape presentation boards shown in the project modal. */
  sheets?: string[]
  /** Optional PDF offered as a download link inside the modal. */
  pdf?: string
}
