import { useEffect, useRef, useState } from 'react';

import { SITE } from '../../data/site';
import { usePageMeta } from '../../hooks/usePageMeta';
import ui from '../../styles/ui.module.css';
import styles from './Contact.module.css';

export function Contact() {
  usePageMeta({
    title: 'Contact',
    description:
      'Get in touch with Gay Marie R. Pil — Creative Virtual Assistant and Multimedia Lead, available for visual content, digital asset and content operations work.',
  });

  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      /* Clipboard blocked — still show the confirmation, the address is on screen. */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`pg ${styles.page}`}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          Get in touch
        </div>

        <h1 className={styles.h1}>
          Ready to build
          <br />
          <span className={styles.h1Accent}>something together?</span>
        </h1>

        <p className={styles.copy}>
          Open to freelance, contract, and internship work in Design &amp; Operations Virtual
          Assistance, e-commerce support, business analytics, UI/UX, front-end, or digital
          marketing.
        </p>

        <div className={styles.actions}>
          <a
            className={`${ui.btn} ${ui.primary} ${ui.glow} ${ui.xxl}`}
            href={`mailto:${SITE.email}`}
          >
            Email me →
          </a>
          <a
            className={`${ui.btn} ${ui.ghost} ${ui.xxl}`}
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {/* Falls back to an inert pill if SITE.resume is ever cleared. */}
          {SITE.resume ? (
            <a
              className={`${ui.btn} ${ui.dashed} ${ui.xxl}`}
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé (PDF)
            </a>
          ) : (
            <span
              className={`${ui.btn} ${ui.dashed} ${ui.xxl} ${styles.pending}`}
              aria-disabled="true"
              title="Résumé coming soon"
            >
              Résumé (PDF)
            </span>
          )}
        </div>

        <button
          type="button"
          className={`${ui.btn} ${ui.mono} ${styles.copyBtn}`}
          onClick={copyEmail}
        >
          <span className={styles.prompt} aria-hidden="true">
            $
          </span>
          {copied ? 'copied to clipboard ✓' : `copy ${SITE.email}`}
        </button>
        <span className="sr-only" role="status">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>

        <div className={styles.meta}>
          <span>phone: {SITE.phone}</span>
          <span>base: {SITE.base}</span>
          <span>
            status: <span className={styles.metaAccent}>open to work</span>
          </span>
        </div>
      </div>
    </div>
  );
}
