import { useMemo, useState } from 'react';

import { EmptySlot } from '../../components/EmptySlot';
import {
  coverOf,
  PUBMAT_EVENTS,
  PUBMAT_KINDS,
  PUBMAT_PIECE_COUNT,
  type PubmatKind,
} from '../../data/pubmats';
import ui from '../../styles/ui.module.css';
import styles from './PubmatGallery.module.css';

export function PubmatGallery({ onOpen }: { onOpen: (index: number) => void }) {
  const [kind, setKind] = useState<PubmatKind>('All');

  const counts = useMemo(() => {
    const map = new Map<PubmatKind, number>([['All', PUBMAT_EVENTS.length]]);
    for (const event of PUBMAT_EVENTS) {
      map.set(event.kind, (map.get(event.kind) ?? 0) + 1);
    }
    return map;
  }, []);

  // Keep the original index so the lightbox opens the right event. Folders lead
  // and single pieces follow; inside each group the cards run A–Z by title.
  const shown = PUBMAT_EVENTS.map((event, index) => ({ event, index }))
    .filter(({ event }) => kind === 'All' || event.kind === kind)
    .sort(
      (a, b) =>
        Number(a.event.pieces.length === 1) - Number(b.event.pieces.length === 1) ||
        a.event.title.localeCompare(b.event.title),
    );

  return (
    <section id="pubmats" className={`container ${styles.section}`}>
      <div className="eyebrow">
        01 — Pubmats · {PUBMAT_EVENTS.length} events · {PUBMAT_PIECE_COUNT} pieces
      </div>

      {/* The page-level heading for /work — the systems reel below opens at h2. */}
      <h1 className={styles.title}>
        Selected Work <span className={styles.titleAccent}>&amp; Publications</span>
      </h1>

      <p className={styles.intro}>
        Visual systems and digital media designed as Multimedia and Publications Head for the
        Information Systems Synergy Society, alongside client projects. Click into any collection to
        explore the full output.
      </p>

      <div className={styles.filters} role="group" aria-label="Filter pubmats by type">
        {PUBMAT_KINDS.map((value) => {
          const active = value === kind;
          return (
            <button
              key={value}
              type="button"
              className={`${ui.filterChip} ${ui.filterChipLg} ${active ? ui.filterChipActive : ''}`}
              aria-pressed={active}
              onClick={() => setKind(value)}
            >
              <span className={ui.filterChipFill} aria-hidden="true" />
              <span className={ui.filterChipLabel}>
                {value} ({counts.get(value) ?? 0})
              </span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p className={styles.empty}>No {kind.toLowerCase()} filed here yet — coming soon.</p>
      )}

      <div className={styles.grid}>
        {shown.map(({ event, index }) => {
          const cover = coverOf(event);
          const multi = event.pieces.length > 1;

          return (
            // The stack edge peeks out behind the card, so a folder reads as a
            // folder before it is opened.
            <div key={event.title} className={`${styles.card} ${multi ? styles.cardStacked : ''}`}>
              <div className={styles.frame}>
                {cover?.img ? (
                  // A real <img>, not a background: only a background could not
                  // be lazy-loaded, and the covers were pulling 5 MB of
                  // full-size artwork on first paint. The frame already
                  // reserves a square, so there is nothing to shift.
                  <button
                    type="button"
                    className={styles.zoom}
                    aria-label={`Open ${event.title} — ${event.pieces.length} pieces`}
                    onClick={() => onOpen(index)}
                  >
                    <picture>
                      <source srcSet={cover.thumb} type="image/webp" />
                      <img
                        className={styles.zoomImg}
                        src={cover.thumbJpg}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </button>
                ) : (
                  <EmptySlot label={event.title} />
                )}

                {multi && (
                  <span className={styles.count}>
                    {event.pieces.length} pieces
                  </span>
                )}
              </div>

              <div className={styles.caption}>
                <div>
                  <div className={styles.cardTitle}>{event.title}</div>
                  <div className={styles.cardEvent}>{event.event}</div>
                </div>
                <span className={styles.cardYear}>{event.year}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
