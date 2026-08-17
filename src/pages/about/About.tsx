import { Constellation } from './Constellation';
import { Credentials } from './Credentials';
import { SplitPie } from './SplitPie';
import { Timeline } from './Timeline';
import styles from './About.module.css';

export function About() {
  return (
    <div className="pg">
      {/* The old "01 — About" intro now opens the home page, alongside the
          identity card it used to sit next to here. */}
      <section className={`container ${styles.halves}`}>
        <div className={`eyebrow ${styles.halvesEyebrow}`}>01 — Two halves</div>
        <SplitPie />
      </section>

      <Constellation />

      <section className={`container ${styles.experience}`}>
        <div className="eyebrow">03 — Experience</div>
        <h2 className={styles.sectionTitle}>
          Where I&rsquo;ve <span className={styles.italicAccent}>shipped</span>
        </h2>
        <Timeline />
      </section>

      <Credentials />
    </div>
  );
}
