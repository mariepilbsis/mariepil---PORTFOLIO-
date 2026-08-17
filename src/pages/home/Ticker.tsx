import { TICKER_ITEMS } from '../../data/home';
import styles from './Ticker.module.css';

/** Full-bleed marquee. The list is duplicated so the -50% translate loops seamlessly. */
export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
