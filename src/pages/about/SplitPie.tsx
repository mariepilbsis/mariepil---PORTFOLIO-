import { PART_BUSINESS, PART_CODE, PART_DESIGN } from '../../data/about';
import styles from './SplitPie.module.css';

/**
 * 50/30/20 split across the designer, analyst and developer parts.
 *
 * Wedges run clockwise from twelve o'clock — developer 0-72°, analyst 72-180°,
 * designer 180-360° — which keeps the red half on the left and the developer
 * wedge upper-right, where each sat when this was a two-way split. Every wedge
 * is nudged out along its own bisector, so the splits read as an exploded pie
 * rather than a drawn-on line. The three offsets are not equal: a uniform nudge
 * opens each seam by an amount that depends on the angle between its wedges, so
 * the gaps came out 11.2, 12.7 and 14.5 units wide. Solving for equal gaps
 * instead — 0.809k, k and 1.376k out, for k = 7 — opens all three by 11.3.
 *
 * Labels sit on their bisector where the wedge is wide enough to hold them; see
 * the note on the developer one, which is not.
 *
 * Each wedge and its label share a <g>, so the label rides the same offset as
 * the slice it names instead of drifting toward the seam.
 */
export function SplitPie() {
  return (
    <div className={styles.split}>
      <div className={styles.pieWrap}>
        <svg
          viewBox="0 0 240 240"
          width="300"
          height="300"
          role="img"
          aria-label="Designer 50 percent, business analyst 30 percent, developer 20 percent"
        >
          <g transform="translate(-5.7,0)">
            <path d="M120 120 L120 232 A112 112 0 1 1 120 8 Z" className={styles.sliceDesigner} />
            <text x="60" y="113" textAnchor="middle" className={`${styles.label} ${styles.labelDesigner}`}>
              Designer
            </text>
            <text
              x="60"
              y="131"
              textAnchor="middle"
              className={`${styles.label} ${styles.labelDesigner} ${styles.pct}`}
            >
              50%
            </text>
          </g>

          {/* Two lines for the name: "Business Analyst" set on one would run past
              the arc at every radius this wedge is wide enough to hold it. */}
          <g transform="translate(5.7,4.1)">
            <path d="M120 120 L226.5 85.4 A112 112 0 0 1 120 232 Z" className={styles.sliceAnalyst} />
            <text x="177" y="147" textAnchor="middle" className={`${styles.label} ${styles.labelAnalyst}`}>
              Business
            </text>
            <text x="177" y="165" textAnchor="middle" className={`${styles.label} ${styles.labelAnalyst}`}>
              Analyst
            </text>
            <text
              x="177"
              y="183"
              textAnchor="middle"
              className={`${styles.label} ${styles.labelAnalyst} ${styles.pct}`}
            >
              30%
            </text>
          </g>

          {/* At 20% this wedge is only 72° wide, and "Developer" is nearly as wide
              as the widest horizontal run inside it. On the bisector the word
              clears the arc but comes within a degree of the upright cut, close
              enough that a wider rendering of the font would cross it, so it
              sits pushed toward the 72° edge. It is the one label not centred
              on its bisector. */}
          <g transform="translate(5.7,-7.8)">
            <path d="M120 120 L120 8 A112 112 0 0 1 226.5 85.4 Z" className={styles.sliceCoder} />
            <text x="164" y="71" textAnchor="middle" className={`${styles.label} ${styles.labelCoder}`}>
              Developer
            </text>
            <text
              x="164"
              y="88"
              textAnchor="middle"
              className={`${styles.label} ${styles.labelCoder} ${styles.pct}`}
            >
              20%
            </text>
          </g>
        </svg>
      </div>

      <div className={styles.columns}>
        <div className={styles.side}>
          <h2 className={styles.heading}>Design &amp; User Experience</h2>
          <ul className={styles.list}>
            {PART_DESIGN.map((item) => (
              <li key={item} className={styles.item}>
                <span className={styles.diamond} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.side}>
          <h2 className={styles.heading}>Engineering &amp; Implementation</h2>
          <ul className={styles.list}>
            {PART_CODE.map((item) => (
              <li key={item} className={styles.item}>
                <span className={styles.diamond} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.side}>
          <h2 className={styles.heading}>Business Analysis</h2>
          <ul className={styles.list}>
            {PART_BUSINESS.map((item) => (
              <li key={item} className={styles.item}>
                <span className={styles.diamond} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
