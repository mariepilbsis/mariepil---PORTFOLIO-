import { SITE } from '../data/site';
import { ArrowUpIcon, LinkedInIcon, MailIcon } from './Icons';
import ui from '../styles/ui.module.css';
import styles from './Footer.module.css';

export function Footer() {
  // Stamped at render rather than hardcoded, so the footer cannot quietly go
  // stale on New Year's Day.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.avatar} aria-hidden="true">
          {SITE.initials}
        </span>
        <span className={styles.line}>
          © {year} · {SITE.footerLine}
        </span>

        <div className={styles.actions}>
          <a
            className={ui.iconBtn}
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            title="Email"
          >
            <MailIcon />
          </a>
          <a
            className={ui.iconBtn}
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <button
            type="button"
            className={ui.iconBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
