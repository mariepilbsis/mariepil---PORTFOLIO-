import { HALF_CODE, HALF_DESIGN } from '../../data/about';
import styles from './SplitPie.module.css';

/**
 * 60/40 donut split between the designer and coder halves. The two slices are
 * offset by ±9/4px so the split reads as an exploded pie.
 */
export function SplitPie() {
  return (
    <div className={styles.split}>
      <div className={styles.side}>
        <h2 className={`${styles.heading} ${styles.headingRight}`}>Design &amp; User Experience</h2>
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
          aria-label="Designer 60 percent, developer 40 percent"
        >
          <path
            d="M120 120 L120 8 A112 112 0 1 0 185.8 210.6 Z"
            transform="translate(-9,4)"
            className={styles.sliceDesigner}
          />
          <path
            d="M120 120 L185.8 210.6 A112 112 0 0 0 120 8 Z"
            transform="translate(9,-4)"
            className={styles.sliceCoder}
          />
          {/* Each label sits on its own slice's bisector — 252° for the designer
              wedge, 72° for the developer one — at a radius where the widest
              line still clears the arc. The developer label used to sit off its
              bisector at a radius its own width could not fit in, so the tail
              of the word hung past the arc and onto the page behind it. */}
          <text x="58" y="137" textAnchor="middle" className={`${styles.label} ${styles.labelDesigner}`}>
            Designer
          </text>
          <text
            x="58"
            y="157"
            textAnchor="middle"
            className={`${styles.label} ${styles.labelDesigner} ${styles.pct}`}
          >
            60%
          </text>
          <text x="184" y="94" textAnchor="middle" className={`${styles.label} ${styles.labelCoder}`}>
            Developer
          </text>
          <text
            x="184"
            y="114"
            textAnchor="middle"
            className={`${styles.label} ${styles.labelCoder} ${styles.pct}`}
          >
            40%
          </text>
        </svg>
      </div>

      <div className={styles.side}>
        <h2 className={styles.heading}>Engineering &amp; Implementation</h2>
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
