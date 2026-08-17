import { BIO, PRINCIPLES } from '../../data/about';
import { Constellation } from './Constellation';
import { Credentials } from './Credentials';
import { IdentityCard } from './IdentityCard';
import { SplitPie } from './SplitPie';
import { Timeline } from './Timeline';
import styles from './About.module.css';

export function About() {
  return (
    <div className="pg">
      <section className={`container ${styles.intro}`}>
        <div className="eyebrow">01 — About</div>

        <div className={styles.grid}>
          <IdentityCard />

          <div>
            <h2 className={styles.h2}>
              {BIO.headingLine1}
              <br />
              {BIO.headingLine2}
            </h2>

            <p className={styles.pullQuote}>
              {BIO.pullQuoteLead}
              <span className={styles.pullQuoteTail}>{BIO.pullQuoteTail}</span>
            </p>

            <p className={styles.body}>{BIO.body}</p>

            <div className={styles.principles}>
              {PRINCIPLES.map((principle) => (
                <div key={principle.num} className={styles.principle}>
                  <div className={styles.principleNum}>{principle.num}</div>
                  <div className={styles.principleTitle}>{principle.title}</div>
                  <p className={styles.principleBody}>{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.halves}`}>
        <div className={`eyebrow ${styles.halvesEyebrow}`}>01a — Two halves</div>
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
