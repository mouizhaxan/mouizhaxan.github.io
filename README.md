# Mouiz ul Hassan — Portfolio

Architecture portfolio site. Vite + React + TypeScript, built to a static `dist/`
folder and hosted on GitHub Pages.

---

## Running it locally

```bash
npm install     # once, after cloning
npm run dev     # http://localhost:5173 — edits reload instantly
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` at http://localhost:4173 — check this before pushing |
| `npm run typecheck` | Catch typos in the content file without building |

Needs Node 20.19 or newer (`node -v` to check).

---

## Editing the site

**Almost everything lives in one file: [`src/data/site.ts`](src/data/site.ts).**
Text, dates, numbers, links, proficiency levels, project details and image paths
are all there. Change a value, save, and the browser updates.

What's in it:

| Export | Controls |
| --- | --- |
| `profile` | Name, email, WhatsApp, LinkedIn, Instagram, CV link, the About paragraphs, the tool chips |
| `heroWords` | The big animated opening statement, word by word |
| `stats` | The four figures (GPA, ECTS, years, certifications) |
| `cvGroups` | The CV timeline — work, volunteering, education |
| `software` | The proficiency dials (level 1–5) |
| `capabilities` | The outlined capability tags |
| `languages` | The language grid |
| `certificates` | The scrolling certificate row |
| `projects` | The project carousel and its modal |
| `contact`, `footer` | Section headings and footer text |
| `carousel` | Autoplay on/off, speed, card spacing |

Colours live in two places that mirror each other: the named constants at the
top of `site.ts` (used in JS) and the CSS variables in
[`src/styles/tokens.css`](src/styles/tokens.css) (used in stylesheets). Change
both if you re-colour the site.

---

## Adding images

Anything in `public/` is served from the site root, so `public/certs/rhino.jpg`
is referenced as `/certs/rhino.jpg`. Every image slot shows a designed
placeholder until you fill it — nothing breaks while they're empty.

**A project cover** — drop the image in `public/projects/`, then set `cover` on
that project:

```ts
{ id: 'museum', …, cover: '/projects/museum-cover.jpg' }
```

**Project presentation boards** (the scrolling pane in the project modal) —
export each board as an image into `public/projects/`, then list them in order:

```ts
sheets: [
  '/projects/museum-01.jpg',
  '/projects/museum-02.jpg',
],
pdf: '/projects/museum-full.pdf',   // optional download link
```

Boards are laid out A4 landscape (297 × 210), so export at that ratio.

**A certificate** — drop the scan in `public/certs/`, then set `src`:

```ts
{ id: 'rhino', …, src: '/certs/rhino.jpg' }
```

**A CV document** (internship certificate, transcript, experience letter) — drop
it in `public/docs/`, then set `src` on that row in `cvGroups`.

**A new CV PDF** — replace `public/cv/Mouiz_CV_2026.pdf`, or add the new file and
update `profile.cv`.

---

## Publishing

Push to `main`. The workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site
and publishes it — watch it in the repo's **Actions** tab.

**One-time setup** in the repo: **Settings → Pages → Build and deployment →
Source: GitHub Actions.**

The repo must be named `<your-username>.github.io` for the current
configuration. If you ever host it under a different repo name, change one line
in [`vite.config.ts`](vite.config.ts):

```ts
base: '/your-repo-name/',
```

Without that, every stylesheet and image 404s on the live site.

---

## Notes

- **The contact form does not send email.** GitHub Pages is static, so there's no
  server to receive a post. Submitting offers a pre-filled mail link instead, so
  a visitor's message isn't lost. To make it send on its own, sign up at
  [web3forms.com](https://web3forms.com) or [formspree.io](https://formspree.io)
  and follow the comment at the top of
  [`src/components/contact/ContactForm.tsx`](src/components/contact/ContactForm.tsx).
- **`_canvas-source/`** holds the original Claude Design canvas the site was
  built from, plus the earlier design screenshots. It's git-ignored and not part
  of the build — reference material only. Delete it whenever you like.
- Motion (the hero animation, scroll reveals, carousel autoplay, the certificate
  ticker) turns itself off for visitors who've asked their system to reduce
  motion.
