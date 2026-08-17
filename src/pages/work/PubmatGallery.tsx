import { useMemo, useState } from 'react';

import { EmptySlot } from '../../components/EmptySlot';
import { PUBMAT_KINDS, PUBMATS, type PubmatKind } from '../../data/pubmats';
import ui from '../../styles/ui.module.css';
import styles from './PubmatGallery.module.css';

export function PubmatGallery({ onOpen }: { onOpen: (index: number) => void }) {
  const [kind, setKind] = useState<PubmatKind>('All');

  const counts = useMemo(() => {
    const map = new Map<PubmatKind, number>([['All', PUBMATS.length]]);
    for (const pubmat of PUBMATS) {
      map.set(pubmat.kind, (map.get(pubmat.kind) ?? 0) + 1);
    }
    return map;
  }, []);

  // Keep the original index so the lightbox opens the right entry.
  const shown = PUBMATS.map((pubmat, index) => ({ pubmat, index })).filter(
    ({ pubmat }) => kind === 'All' || pubmat.kind === kind,
  );

  return (
    <section id="pubmats" className={`container ${styles.section}`}>
      <div className="eyebrow">01 — Pubmats · {PUBMATS.length} pieces</div>

      <h2 className={styles.title}>
        Layout work, <span className={styles.titleAccent}>by type</span>
      </h2>

      <p className={styles.intro}>
        Publication materials designed as Head Layout Artist and Multimedia &amp; Publications Head
        for the Information Systems Synergy Society.
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
        {shown.map(({ pubmat, index }) => (
          <div key={pubmat.title} className={styles.card}>
            <div className={styles.frame}>
              {pubmat.img ? (
                <button
                  type="button"
                  className={styles.zoom}
                  style={{ backgroundImage: `url(${pubmat.img})` }}
                  aria-label={`View ${pubmat.title}`}
                  onClick={() => onOpen(index)}
                />
              ) : (
                <EmptySlot label={pubmat.title} />
              )}
            </div>

            <div className={styles.caption}>
              <div>
                <div className={styles.cardTitle}>{pubmat.title}</div>
                <div className={styles.cardEvent}>{pubmat.event}</div>
              </div>
              <span className={styles.cardYear}>{pubmat.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
