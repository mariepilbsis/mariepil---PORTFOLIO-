import styles from './BackgroundGrid.module.css';

/** Fixed, non-interactive 78px crimson grid behind every page. */
export function BackgroundGrid() {
  return <div className={styles.grid} aria-hidden="true" />;
}
