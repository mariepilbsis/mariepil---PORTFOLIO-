import { usePageMeta } from '../../hooks/usePageMeta';
import { Constellation } from './Constellation';
import { Credentials } from './Credentials';
import { SplitPie } from './SplitPie';
import { Timeline } from './Timeline';
import styles from './About.module.css';

export function About() {
  usePageMeta({
    title: 'About & Experience',
    description:
      'The two halves — design and engineering — plus the full skill constellation, roles shipped, certifications and awards behind the portfolio.',
  });

  return (
    <div className="pg">
      {/* The page opens on the eyebrow and the pie by design, so there is no
          visible page title to promote. Screen readers still need one h1 to
          announce what this page is. */}
      <h1 className="sr-only">About &amp; Experience</h1>
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
