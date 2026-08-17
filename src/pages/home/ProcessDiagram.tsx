import { PROCESS_CURVE, PROCESS_FLOW } from '../../data/home';
import styles from './ProcessDiagram.module.css';

/** The S-curve process flow that sits in the right half of the hero. */
export function ProcessDiagram() {
  return (
    <div className={styles.diagram}>
      <div className={styles.rule} aria-hidden="true" />

      <svg viewBox="0 0 400 452" preserveAspectRatio="none" className={styles.curve} aria-hidden="true">
        <path
          d={PROCESS_CURVE}
          fill="none"
          stroke="#E23048"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className={styles.curvePath}
        />
      </svg>

      <ul className={styles.nodes}>
        {PROCESS_FLOW.map((node) => (
          <li
            key={node.label}
            className={`${styles.node} ${node.reverse ? styles.nodeReverse : ''}`}
            style={{ left: node.left, top: node.top }}
          >
            <span
              className={`${styles.dot} ${node.active ? styles.dotActive : ''}`}
              aria-hidden="true"
            />
            <span className={styles.label} style={{ color: node.color }}>
              {node.label}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.sparkA} aria-hidden="true" />
      <div className={styles.sparkB} aria-hidden="true" />
    </div>
  );
}
