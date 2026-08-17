import { AWARDS, CERTIFICATIONS, EDUCATION } from '../../data/credentials';
import styles from './Credentials.module.css';

export function Credentials() {
  return (
    <>
      <section className={`container ${styles.certSection}`}>
        <div className="eyebrow">03a — Credentials</div>
        <h2 className={styles.title}>Proof, not promises.</h2>

        <div className={styles.certList}>
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className={styles.certRow}>
              <span className={styles.certIssuer}>{cert.issuer}</span>
              <span className={styles.certName}>{cert.name}</span>
              <span className={styles.certKind}>{cert.kind}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.recognition}`}>
        <div className={styles.sectionLabel}>Recognition</div>
        <div className={styles.awardGrid}>
          {AWARDS.map((award) => (
            <div key={award.title} className={styles.awardCard}>
              <div className={styles.awardNum} aria-hidden="true">
                {award.num}
              </div>
              <div className={styles.awardTitle}>{award.title}</div>
              <div className={styles.awardKind}>{award.kind}</div>
              <p className={styles.awardBody}>{award.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.sectionLabel} style={{ margin: '44px 0 18px' }}>
          Education
        </div>
        <div className={styles.education}>
          <span className={styles.eduBadge} aria-hidden="true">
            {EDUCATION.badge}
          </span>
          <div className={styles.eduText}>
            <div className={styles.eduDegree}>{EDUCATION.degree}</div>
            <div className={styles.eduSchool}>{EDUCATION.school}</div>
          </div>
          <span className={styles.eduPeriod}>{EDUCATION.period}</span>
        </div>
      </section>
    </>
  );
}
