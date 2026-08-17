import { HALF_CODE, HALF_DESIGN } from '../../data/about';
import styles from './SplitPie.module.css';

/**
 * 60/40 donut split between the designer and coder halves. The two slices are
 * offset by ±6/3px so the split reads as an exploded pie.
 */
export function SplitPie() {
  return (
    <div className={styles.split}>
      <div className={styles.side}>
        <h3 className={`${styles.heading} ${styles.headingRight}`}>Part designer</h3>
        <ul className={`${styles.list} ${styles.listRight}`}>
          {HALF_DESIGN.map((item) => (
            <li key={item} className={styles.item}>
              {item}
              <span className={styles.diamond} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.pieWrap}>
        <svg
          viewBox="0 0 240 240"
          width="264"
          height="264"
          role="img"
          aria-label="Designer 60 percent, coder 40 percent"
        >
          <path
            d="M120 120 L120 8 A112 112 0 1 0 185.8 210.6 Z"
            transform="translate(-6,3)"
            className={styles.sliceDesigner}
          />
          <path
            d="M120 120 L185.8 210.6 A112 112 0 0 0 120 8 Z"
            transform="translate(6,-3)"
            strokeWidth="1"
            className={styles.sliceCoder}
          />
          <text
            x="52"
            y="152"
            textAnchor="middle"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="18"
            fontWeight="700"
            className={styles.labelDesigner}
          >
            Designer
          </text>
          <text
            x="188"
            y="104"
            textAnchor="middle"
            fontFamily="'Instrument Sans', sans-serif"
            fontSize="18"
            fontWeight="700"
            className={styles.labelCoder}
          >
            Coder
          </text>
        </svg>
      </div>

      <div className={styles.side}>
        <h3 className={styles.heading}>Part coder</h3>
        <ul className={styles.list}>
          {HALF_CODE.map((item) => (
            <li key={item} className={styles.item}>
              <span className={styles.diamond} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
