/* ===========================================================================
   ALL SITE CONTENT LIVES HERE.
   Edit the text, dates, numbers and image paths below — you should never need
   to open a component file for a routine update. Save and the dev server
   reloads instantly.

   Image paths are relative to the `public/` folder, so '/projects/foo.jpg'
   means `public/projects/foo.jpg`. Leave a path out and the site renders a
   designed placeholder instead of a broken image.
   =========================================================================== */

import type {
  Certificate,
  CvGroup,
  HeroWord,
  Language,
  Profile,
  Project,
  Software,
  Stat,
} from './types'

/* --- The four accents. Mirrored in src/styles/tokens.css. ----------------- */

export const CRIMSON = '#b42730'
export const COBALT = '#12436e'
export const EMERALD = '#12925f'
export const CORK = '#c69a6c'
export const CORK_DARK = '#7a552c'
export const GREY = '#6b6866'

/* --- Who you are ---------------------------------------------------------- */

export const profile: Profile = {
  name: 'Mouiz ul Hassan',
  role: 'Architect · BIM',
  email: 'mouizhaxan@gmail.com',
  whatsappNumber: '+92 335 0556446',
  whatsappLink: 'https://wa.me/923350556446',
  linkedin: 'https://linkedin.com/in/mouizhaxan',
  linkedinLabel: '/in/mouizhaxan',
  instagram: 'https://instagram.com/mouizhaxan',
  instagramLabel: '@mouizhaxan',
  cv: '/cv/Mouiz_CV_2026.pdf',
  portrait: '/assets/portrait.png',
  aboutHeading: 'Heritage, data, and the public realm.',
  aboutLead:
    'My work sits at the intersection of heritage and innovation — translating computational workflows into civic form. From drafting rooms in Pakistan to studios in Italy, and now the urban fabric of Azerbaijan, I design public buildings that earn their place slowly: through material weight, climatic fit, and care for the thresholds a city leaves behind.',
  aboutSecondary:
    'As a BIM-fluent architect-in-training (ISO 19650, Revit, Rhino), I bridge abstract vision and constructible reality.',
  tools: [
    'Revit',
    'AutoCAD',
    'Rhino',
    'SketchUp',
    'Rayon',
    'Lumion',
    'Enscape',
    'Illustrator',
    'Photoshop',
  ],
}

/* --- The animated hero statement ------------------------------------------
   Each entry animates in after `delay` seconds. `mark` paints a colour wipe
   behind the phrase; `em` renders it grey and italic. To reword the statement,
   edit the `text` values and keep the delays climbing steadily.
   -------------------------------------------------------------------------- */

export const heroWords: HeroWord[] = [
  { text: 'Architecture', delay: 0.05 },
  { text: 'as', delay: 0.11 },
  { text: 'the', delay: 0.17, em: true },
  { text: 'art', delay: 0.23, em: true },
  { text: 'of', delay: 0.29, em: true },
  { text: 'navigating', delay: 0.35, em: true },
  { text: 'complex', delay: 0.41 },
  { text: 'constraints', delay: 0.5, mark: CRIMSON },
  { text: 'to', delay: 0.62 },
  { text: 'produce', delay: 0.68 },
  { text: 'meaningful', delay: 0.74 },
  { text: 'cultural landmarks', delay: 0.84, mark: EMERALD },
  { text: 'for', delay: 0.98 },
  { text: 'the', delay: 1.04 },
  { text: 'public realm', delay: 1.12, mark: COBALT },
  { text: '.', delay: 1.26, tight: true },
]

/* --- The four figures under the About panel ------------------------------- */

export const stats: Stat[] = [
  { value: '93.84', label: 'GPA / 100 · Grade A', colour: CRIMSON },
  { value: '240', label: 'ECTS · B.Arch', colour: COBALT },
  { value: '5', label: 'Years in practice', colour: EMERALD },
  { value: '6', label: 'Certifications', colour: CORK },
]

/* --- CV timeline. Clicking a row opens its document modal. ----------------
   Add a scan with e.g. src: '/docs/core-construction.jpg'
   -------------------------------------------------------------------------- */

export const cvGroups: CvGroup[] = [
  {
    title: 'Work experience',
    colour: CRIMSON,
    rows: [
      {
        id: 'azer',
        date: 'Feb — May 2026',
        place: 'Baku, Azerbaijan',
        title: 'Architectural Intern — Azermemarlayihe State General Design Institute',
        sub: 'Housing and public infrastructure under AzDTN standards; a comprehensive residential complex as primary design objective.',
        doc: 'Internship certificate',
        src: '',
      },
      {
        id: 'core',
        date: 'Feb — Mar 2025',
        place: 'Baku, Azerbaijan',
        title: 'Architectural Intern — Core Construction LLC',
        sub: 'Technical drafting, 3D modelling, furniture and MEP layouts, on-site drawing revisions.',
        doc: 'Internship certificate',
        src: '',
      },
      {
        id: 'attock',
        date: 'Jan 2021 — Oct 2022',
        place: 'Islamabad, Pakistan',
        title: 'Draftsman (Arch & MEP) — Attock Construction & Finishing Services',
        sub: 'False ceilings in 2D and 3D for residential and commercial projects; MEP drawings in AutoCAD.',
        doc: 'Experience letter',
        src: '',
      },
    ],
  },
  {
    title: 'Volunteering',
    colour: EMERALD,
    rows: [
      {
        id: 'wuf',
        date: 'May 2026',
        place: 'Baku, Azerbaijan',
        title: 'Hospitality Team — UN-Habitat World Urban Forum 13',
        sub: 'Supporting delegates and guests at the world’s foremost conference on sustainable urban development.',
        doc: 'Certificate of participation',
        src: '',
      },
    ],
  },
  {
    title: 'Education',
    colour: COBALT,
    rows: [
      {
        id: 'beu',
        date: 'Sep 2022 — Jun 2026',
        place: 'Baku, Azerbaijan',
        title: 'Bachelor of Architecture — Baku Engineering University',
        sub: 'GPA 93.84 / 100 · Grade A · 240 ECTS · Architectural design and theory. Erasmus+ exchange semester, Politecnico di Torino, Feb — Jun 2024.',
        doc: 'Transcript',
        src: '',
      },
    ],
  },
]

/* --- Software proficiency dials (level 1 – 5) ----------------------------- */

export const software: Software[] = [
  { name: 'AutoCAD', level: 5 },
  { name: 'Revit', level: 5 },
  { name: 'Rhino', level: 4 },
  { name: 'Rayon Design', level: 4 },
  { name: 'SketchUp', level: 5 },
  { name: 'Lumion', level: 4 },
  { name: 'Enscape', level: 4 },
  { name: 'Illustrator', level: 4 },
  { name: 'Photoshop', level: 4 },
  { name: 'InDesign', level: 3 },
  { name: 'MS Office', level: 4 },
  { name: 'Autodesk ACC', level: 3 },
]

export const capabilities: string[] = [
  'Spatial planning',
  'Conceptual design',
  'Technical drawings',
  'Submission drawings',
  'Parametric modelling',
  'BIM management · ISO 19650',
  'Urban morphology',
  '3D visualisation',
  'Sustainable design',
  'MEP coordination',
  'Critical thinking',
  'Problem solving',
]

export const languages: Language[] = [
  { name: 'Urdu', level: 'Native', colour: EMERALD },
  { name: 'English', level: 'C1 · IELTS 7.5', colour: COBALT },
  { name: 'Hindi', level: 'C1', colour: CRIMSON },
  { name: 'Azerbaijani', level: 'A2', colour: CORK_DARK },
]

/* --- Certificates. Add a scan with e.g. src: '/certs/rhino.jpg' ----------- */

export const certificates: Certificate[] = [
  {
    id: 'rhino',
    date: 'Feb 2026',
    title: 'Introduction to Rhino 8',
    issuer: 'Rhino3D.Education',
    src: '',
  },
  {
    id: 'bim',
    date: 'Feb 2026',
    title: 'End-to-End BIM Workflow Using Revit and ACC',
    issuer: 'Autodesk',
    src: '',
  },
  {
    id: 'iso3',
    date: 'Feb 2026',
    title: 'Level 3 Information Manager — ISO 19650 Expert',
    issuer: 'Plannerly',
    src: '',
  },
  {
    id: 'iso12',
    date: 'Jan 2026',
    title: 'Level 1 & 2 Information Manager — Basics to Advanced',
    issuer: 'Plannerly',
    src: '',
  },
  {
    id: 'revit',
    date: 'Aug 2025',
    title: 'Revit Architecture + MEP Essentials',
    issuer: 'SourceCAD',
    src: '',
  },
  {
    id: 'autocad',
    date: 'Feb 2025',
    title: 'AutoCAD 2D + 3D Essentials',
    issuer: 'SourceCAD',
    src: '',
  },
]

/* --- Projects -------------------------------------------------------------
   `tab` puts a project under Educational or Professional.
   `cover`  — the card image, e.g. '/projects/museum-cover.jpg'
   `sheets` — presentation boards shown in the modal, in order
   Omit either and a designed placeholder takes its place.
   -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: 'museum',
    tab: 'edu',
    title: 'Caspian Oil & Gas Museum',
    tagline: 'The strata of heritage.',
    year: '2025',
    programme: 'Museum',
    location: 'Baku, Azerbaijan',
    area: '30,000 m²',
    palette: COBALT,
    role: 'Design author (academic)',
    tools: 'Revit, Rhino, Enscape',
    status: 'Conceptual',
    description:
      'A rhythmic intervention in Baku’s White City that translates Azerbaijan’s energy history into a vertical architectural language — its stratified façade bridging industrial past and sustainable future.',
    cover: '/projects/museum/cover.jpg',
    sheets: Array.from(
      { length: 20 },
      (_, i) => `/projects/museum/board-${String(i + 1).padStart(2, '0')}.jpg`,
    ),
    pdf: '/projects/01_Museum.pdf',
  },
  {
    id: 'school',
    tab: 'edu',
    title: 'Baku Kindergarten & Primary School',
    tagline: 'A child’s first architectural experience.',
    year: '2024',
    programme: 'School',
    location: 'Baku, Azerbaijan',
    area: '23,600 m²',
    palette: EMERALD,
    role: 'Design author (academic)',
    tools: 'AutoCAD, SketchUp, Lumion',
    status: 'Conceptual',
    description:
      'A school scaled to small bodies — guided by light, colour and movement, where learning happens through play. A protected world of courtyards that encourages exploration and early growth.',
    cover: '',
    sheets: [],
  },
  {
    id: 'kyosei',
    tab: 'edu',
    title: 'Kyo-Sei House',
    tagline: 'A symbiotic community on the Japanese coast.',
    year: '2025',
    programme: 'Mixed-use',
    location: 'Ehime, Japan',
    area: '250 m²',
    palette: CORK,
    role: 'Design author (academic)',
    tools: 'Rhino, Enscape',
    status: 'Conceptual',
    description:
      'A compact mixed-use building where ground-floor coworking meets upper-level residence — climate-responsive, with cross-ventilated terraces bridging private life and professional collaboration.',
    cover: '',
    sheets: [],
  },
  {
    id: 'prism',
    tab: 'pro',
    title: 'Prism Tower',
    tagline: 'A sculptural landmark of tapered geometry.',
    year: '2026',
    programme: 'Tower',
    location: 'Baku, Azerbaijan',
    area: '21,000 m²',
    palette: CRIMSON,
    role: 'Architectural intern',
    tools: 'Revit, AutoCAD',
    status: 'Ongoing',
    description:
      'A high-rise defined by tapered geometric form and fluid spatial transitions — organising a complex programme into light-filled volumes, its perforated skin mediating between city landscape and private sanctuary.',
    cover: '',
    sheets: [],
  },
  {
    id: 'farmhouse',
    tab: 'pro',
    title: 'Kotla Farmhouse',
    tagline: 'A private house on open ground.',
    year: '2024',
    programme: 'Residential',
    location: 'Kotla, Pakistan',
    area: '—',
    palette: GREY,
    role: 'Drafting & 3D modelling',
    tools: 'AutoCAD, SketchUp',
    status: 'Professional',
    description:
      'A private farmhouse: plans, working drawings and 3D visualisation, with interior and MEP layouts coordinated for construction.',
    cover: '',
    sheets: [],
  },
]

/* --- Section copy --------------------------------------------------------- */

export const projectHeadlines: Record<'edu' | 'pro', string> = {
  edu: 'Selected university studio projects.',
  pro: 'Selected work from professional practice.',
}

export const contact = {
  heading: 'Let’s build something',
  headingEm: 'for the public',
  blurb: 'Open to architectural roles, collaborations and competition teams from 2026.',
}

export const footer = {
  copyright: '© 2026 · All rights reserved',
  madeBy: 'Made with',
}

/* --- Carousel behaviour --------------------------------------------------- */

export const carousel = {
  /** Advance on its own. Set to false for a static, click-only carousel. */
  autoplay: true,
  /** Milliseconds between automatic steps. */
  intervalMs: 3400,
  /** Desired pixel gap between card centres (clamped to the viewport width). */
  spacing: 560,
}
