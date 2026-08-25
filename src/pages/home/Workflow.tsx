import { useEffect, useRef } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { WORKFLOW, WORKFLOW_STEPS } from '../../data/about';
import styles from './Workflow.module.css';

/** Diameter of the travelling dot, in px — kept in step with .dot in the CSS. */
const DOT = 13;

/** The breakpoint at which the rail stands up on its end. Matches the CSS. */
const STACKED = '(max-width: 760px)';

/**
 * The three workflow steps, strung along a rail: a numbered node per step, a
 * static track through all three, and a crimson fill with a glowing head that
 * sweeps the track as the section crosses the viewport.
 *
 * The rail runs left to right on a desk and top to bottom on a phone, so the
 * axis has to be known in JS as well as CSS — hence useMediaQuery rather than
 * a media query alone.
 */
export function Workflow() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const stacked = useMediaQuery(STACKED);

  /**
   * Coalesced into a frame: reading getBoundingClientRect forces layout, and
   * scroll fires many times between paints. Written straight to the DOM rather
   * than through state, so the listener stays cheap.
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
        Math.max(0, (window.innerHeight * 0.62 - rect.top) / Math.max(1, rect.height)),
      );
      const travel = Math.max(0, (stacked ? rect.height : rect.width) - DOT);
      const run = `${p * travel}px`;

      // The axis not being driven is cleared back to its CSS value — 1px, the
      // thickness of the track — rather than left holding a stale length.
      dot.style.transform = stacked ? `translate3d(0, ${run}, 0)` : `translate3d(${run}, 0, 0)`;
      fill.style.height = stacked ? run : '';
      fill.style.width = stacked ? '' : run;
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
  }, [stacked]);

  return (
    <section className={styles.workflow}>
      <div className={styles.head}>
        <h2 className={styles.title}>{WORKFLOW.title}</h2>
        <p className={styles.lead}>{WORKFLOW.lead}</p>
      </div>

      <div ref={railRef} className={styles.rail}>
        <div className={styles.track} aria-hidden="true" />
        <div ref={fillRef} className={styles.fill} aria-hidden="true" />
        <div ref={dotRef} className={styles.dot} aria-hidden="true" />

        <ol className={styles.list}>
          {WORKFLOW_STEPS.map((step) => (
            <li key={step.num} className={styles.step}>
              {/* The tag below already says "Step 01", so the node is decoration. */}
              <span className={styles.node} aria-hidden="true">
                {step.num}
              </span>

              <span className={styles.tag}>
                <span className={styles.tagWord}>Step</span>
                <span className={styles.tagNum}>{step.num}</span>
              </span>

              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
