import { useEffect, useMemo, useState } from 'react'
import { carousel, projectHeadlines, projects as allProjects } from '../../data/site'
import type { Tab } from '../../data/types'
import { useCarousel } from '../../hooks/useCarousel'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ProjectCarousel } from './ProjectCarousel'
import { ProjectModal } from './ProjectModal'
import styles from './Projects.module.css'

interface Props {
  /** True while a modal elsewhere on the page is open — holds autoplay. */
  externalModalOpen?: boolean
}

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'edu', label: 'Educational' },
  { id: 'pro', label: 'Professional' },
]

export function Projects({ externalModalOpen = false }: Props) {
  // A shared link (#project-<id>) opens straight into that project.
  const [linked] = useState(() =>
    allProjects.find((p) => window.location.hash === `#project-${p.id}`),
  )
  const [tab, setTab] = useState<Tab>(linked?.tab ?? 'edu')
  const [modalOpen, setModalOpen] = useState(false)
  const [hovering, setHovering] = useState(false)
  const reduced = usePrefersReducedMotion()

  const list = useMemo(() => allProjects.filter((p) => p.tab === tab), [tab])

  const { index, step, goTo } = useCarousel({
    length: list.length,
    autoplay: carousel.autoplay && !reduced,
    intervalMs: carousel.intervalMs,
    paused: hovering || modalOpen || externalModalOpen,
  })

  useEffect(() => {
    if (!linked) return
    goTo(list.indexOf(linked))
    setModalOpen(true)
    document.getElementById('projects')?.scrollIntoView()
    // Runs once, on arrival from a shared link.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Arrow keys drive the carousel while no modal is open. (The modal handles
  // its own keys, and Escape is owned by Modal.)
  useEffect(() => {
    if (modalOpen || externalModalOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [step, modalOpen, externalModalOpen])

  const switchTab = (next: Tab) => {
    setTab(next)
    goTo(0)
  }

  return (
    <section id="projects" className={styles.section}>
      <div data-reveal className={styles.head}>
        <h2 className={styles.headline}>{projectHeadlines[tab]}</h2>
        <div className={styles.tabs} role="tablist" aria-label="Project category">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => switchTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <ProjectCarousel
        projects={list}
        index={index}
        onStep={step}
        onGoTo={goTo}
        onOpen={() => setModalOpen(true)}
        onPauseChange={setHovering}
      />

      <ProjectModal
        project={list[index]}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
