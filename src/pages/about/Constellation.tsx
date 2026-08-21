import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';

import { SKILL_CATEGORIES, SKILL_NODES, type SkillCategory } from '../../data/skills';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ui from '../../styles/ui.module.css';
import styles from './Constellation.module.css';

export function Constellation() {
  const [cat, setCat] = useState<SkillCategory>('All');
  const layerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  // The global reduced-motion rule only shortens CSS animations; a transform
  // written from JS ignores it entirely, so the drift is opted out here.
  const stillness = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Below this the positioned field cannot hold its labels apart — see the note
  // on .grid in the stylesheet.
  const isNarrow = useMediaQuery('(max-width: 640px)');

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const counts = useMemo(() => {
    const map = new Map<SkillCategory, number>([['All', SKILL_NODES.length]]);
    for (const node of SKILL_NODES) {
      map.set(node.cat, (map.get(node.cat) ?? 0) + 1);
    }
    return map;
  }, []);

  /** Polyline through the active set — empty while "All" is selected. */
  const path = useMemo(() => {
    if (cat === 'All') return '';
    return SKILL_NODES.filter((node) => node.cat === cat)
      .map((node, index) => `${index === 0 ? 'M' : 'L'}${node.x} ${node.y}`)
      .join(' ');
  }, [cat]);

  const activeCount = counts.get(cat) ?? 0;
  const catLabel =
    cat === 'All' ? `all ${SKILL_NODES.length} skills` : `${cat.toLowerCase()} — ${activeCount} nodes`;

  /**
   * Parallax: the whole node layer drifts against the pointer. Pointer moves
   * arrive far faster than frames, so the write is deferred to the next one.
   */
  const onTilt = (event: MouseEvent<HTMLDivElement>) => {
    if (stillness || isNarrow || frameRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const layer = layerRef.current;
      if (layer) layer.style.transform = `translate3d(${-dx * 26}px, ${-dy * 18}px, 0)`;
    });
  };

  return (
    <section className={styles.band} onMouseMove={onTilt}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.fade} aria-hidden="true" />

      <div className={styles.head}>
        <div className={styles.eyebrow}>
          <span>02 — Constellation</span>
          <span className="eyebrow-muted">{catLabel}</span>
          {!stillness && !isNarrow && (
            <span className={styles.hint}>
              <span className={styles.hintDot} aria-hidden="true" />
              Move cursor to tilt
            </span>
          )}
        </div>

        <h2 className={styles.title}>Skill Constellation</h2>

        <div className={styles.chips} role="group" aria-label="Filter skills by category">
          {SKILL_CATEGORIES.map((name) => {
            const active = name === cat;
            return (
              <button
                key={name}
                type="button"
                className={`${ui.filterChip} ${active ? ui.filterChipActive : ''}`}
                aria-pressed={active}
                onClick={() => setCat(name)}
              >
                <span className={ui.filterChipFill} aria-hidden="true" />
                <span className={ui.filterChipLabel}>
                  {name} ({counts.get(name) ?? 0})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isNarrow ? (
        <ul className={styles.grid}>
          {SKILL_NODES.map((node) => {
            const on = cat === 'All' || node.cat === cat;
            return (
              <li
                key={node.label}
                className={`${ui.chip} ${styles.gridChip} ${on ? '' : styles.gridChipOff}`}
              >
                <span className={ui.chipDot} aria-hidden="true" />
                {node.label}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.field}>
          <div ref={layerRef} className={styles.layer}>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className={styles.links}
              aria-hidden="true"
            >
              <path
                d={path}
                fill="none"
                stroke="var(--acc)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                opacity="0.85"
                className={styles.linkPath}
              />
            </svg>

            {SKILL_NODES.map((node) => {
              const on = cat === 'All' || node.cat === cat;
              return (
                <div
                  key={node.label}
                  className={`${styles.node} ${on ? '' : styles.nodeOff}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span
                    className={`${styles.nodeDot} ${on && cat !== 'All' ? styles.nodeDotLit : ''}`}
                    aria-hidden="true"
                  />
                  <span className={styles.nodeLabel}>{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
