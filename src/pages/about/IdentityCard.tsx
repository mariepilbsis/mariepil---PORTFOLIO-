import portrait from '../../assets/portrait.webp';
import { IDENTITY_ROWS } from '../../data/about';
import { SITE } from '../../data/site';
import styles from './IdentityCard.module.css';

export function IdentityCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>identity.card</span>
        <span className={styles.verified}>
          <span className={styles.verifiedDot} aria-hidden="true" />
          verified
        </span>
      </div>

      <div className={styles.portraitFrame}>
        <img className={styles.portrait} src={portrait} alt={SITE.name} width="400" height="352" />
      </div>

      <dl className={styles.rows}>
        {IDENTITY_ROWS.map((row) => (
          <div key={row.key} className={styles.row}>
            <dt className={styles.rowKey}>{row.key}</dt>
            <dd className={`${styles.rowValue} ${row.accent ? styles.rowAccent : ''}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
