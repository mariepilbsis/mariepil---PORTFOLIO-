import { useMemo, useState } from 'react';

import { EmptySlot } from '../../components/EmptySlot';
import { PUBMAT_YEARS, PUBMATS, type PubmatYear } from '../../data/pubmats';
import ui from '../../styles/ui.module.css';
import styles from './PubmatGallery.module.css';

export function PubmatGallery({ onOpen }: { onOpen: (index: number) => void }) {
  const [year, setYear] = useState<PubmatYear>('All');

  const counts = useMemo(() => {
    const map = new Map<PubmatYear, number>([['All', PUBMATS.length]]);
    for (const pubmat of PUBMATS) {
      map.set(pubmat.year, (map.get(pubmat.year) ?? 0) + 1);
    }
    return map;
  }, []);

  // Keep the original index so the lightbox opens the right entry.
  const shown = PUBMATS.map((pubmat, index) => ({ pubmat, index })).filter(
    ({ pubmat }) => year === 'All' || pubmat.year === year,
  );

  return (
    <section id="pubmats" className={`container ${styles.section}`}>
      <div className="eyebrow">02 — Pubmats · {PUBMATS.length} pieces</div>

      <h2 className={styles.title}>
        Layout work, <span className={styles.titleAccent}>by year</span>
      </h2>

      <p className={styles.intro}>
        Publication materials designed as Head Layout Artist and Multimedia &amp; Publications Head
        for the Information Systems Synergy Society.
      </p>

      <div className={styles.filters} role="group" aria-label="Filter pubmats by year">
        {PUBMAT_YEARS.map((value) => {
          const active = value === year;
          return (
            <button
              key={value}
              type="button"
              className={`${ui.filterChip} ${ui.filterChipLg} ${active ? ui.filterChipActive : ''}`}
              aria-pressed={active}
              onClick={() => setYear(value)}
            >
              <span className={ui.filterChipFill} aria-hidden="true" />
              <span className={ui.filterChipLabel}>
                {value} ({counts.get(value) ?? 0})
              </span>
            </button>
          );
        })}
      </div>

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
