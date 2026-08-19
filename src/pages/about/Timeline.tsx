import { useEffect, useRef } from 'react';

import { TIMELINE } from '../../data/timeline';
import ui from '../../styles/ui.module.css';
import styles from './Timeline.module.css';

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll-driven rail. The dot and the crimson fill are written straight to
   * the DOM rather than through state so the listener stays cheap.
   *
   * Coalesced into a frame: reading getBoundingClientRect forces layout, and
   * scroll can fire many times between paints, so measuring per event meant
   * paying for layouts nobody ever saw.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rail = railRef.current;
      const dot = dotRef.current;
      const fill = fillRef.current;
      if (!rail || !dot || !fill) return;

      const rect = rail.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.45 - rect.top) / Math.max(1, rect.height)),
      );
      const travel = Math.max(0, rect.height - 16);

      dot.style.transform = `translate3d(0, ${p * travel}px, 0)`;
      fill.style.height = `${p * travel}px`;
    };

    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    measure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={railRef} className={styles.rail}>
      <div className={styles.track} aria-hidden="true" />
      <div ref={fillRef} className={styles.fill} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />

      <ol className={styles.list}>
        {TIMELINE.map((entry) => (
          <li key={`${entry.org}-${entry.role}`} className={styles.row}>
            <span
              className={`${styles.marker} ${entry.now ? styles.markerNow : ''}`}
              aria-hidden="true"
            />

            <div>
              <div className={`${styles.tag} ${entry.now ? styles.tagNow : ''}`}>{entry.tag}</div>
              <div className={styles.org}>{entry.org}</div>
              {entry.dates !== entry.tag && <div className={styles.dates}>{entry.dates}</div>}
            </div>

            <div className={styles.body}>
              <div className={styles.roleLine}>
                <span className={styles.role}>{entry.role}</span>
                {entry.now && <span className={styles.now}>now</span>}
              </div>
              <p className={styles.copy}>{entry.body}</p>
              <div className={styles.chips}>
                {entry.chips.map((chip) => (
                  <span key={chip} className={ui.chip}>
                    <span className={ui.chipDot} aria-hidden="true" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
