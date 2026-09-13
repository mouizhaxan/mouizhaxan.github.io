import { useMemo, useState } from 'react'
import { cvGroups } from '../../data/site'
import type { CvRow } from '../../data/types'
import { ExternalIcon } from '../ui/Icon'
import { MediaFrame } from '../ui/MediaFrame'
import { Modal, ModalClose } from '../ui/Modal'
import styles from './CvTimeline.module.css'

type OpenRow = CvRow & { group: string; colour: string }

interface Props {
  /** Lets About know a modal is up, so the carousel autoplay can pause. */
  onOpenChange?: (open: boolean) => void
}

export function CvTimeline({ onOpenChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)

  // Flatten once so a row can be looked up by id with its group colour attached.
  const rowsById = useMemo(() => {
    const map = new Map<string, OpenRow>()
    cvGroups.forEach((g) =>
      g.rows.forEach((r) => map.set(r.id, { ...r, group: g.title, colour: g.colour })),
    )
    return map
  }, [])

  const open = openId ? rowsById.get(openId) : undefined

  const show = (id: string) => {
    setOpenId(id)
    onOpenChange?.(true)
  }

  const close = () => {
    setOpenId(null)
    onOpenChange?.(false)
  }

  return (
    <>
      <div data-reveal className={styles.timeline}>
        {cvGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <div className={styles.groupHead}>
              <span className={styles.groupRule} style={{ background: group.colour }} />
              <span className={styles.groupTitle}>{group.title}</span>
            </div>

            {group.rows.map((row) => (
              <button key={row.id} type="button" className={styles.row} onClick={() => show(row.id)}>
                <span className={styles.meta}>
                  <span className={styles.date}>{row.date}</span>
                  <span className={styles.place}>{row.place}</span>
                </span>
                <span className={styles.body}>
                  <span className={styles.title}>{row.title}</span>
                  <span className={styles.sub}>{row.sub}</span>
                  <span className={styles.docChip} style={{ color: group.colour }}>
                    <ExternalIcon />
                    View {row.doc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <Modal open={!!open} onClose={close} label={open?.title ?? 'Document'}>
        {open && (
          <>
            <div className={styles.modalHead}>
              <div className={styles.modalMeta}>
                <span className={styles.modalKicker}>
                  <span style={{ background: open.colour }} />
                  {open.group} · {open.date}
                </span>
                <span className={styles.modalTitle}>{open.title}</span>
                <span className={styles.modalDoc}>{open.doc}</span>
              </div>
              <ModalClose onClick={close} />
            </div>
            <div className={styles.modalBody}>
              <MediaFrame
                src={open.src}
                alt={`${open.doc} — ${open.title}`}
                caption={open.doc}
                colour={open.colour}
                hint={`Add a scan at public/docs/${open.id}.jpg, then set src: '/docs/${open.id}.jpg' on this entry in src/data/site.ts`}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  )
}
