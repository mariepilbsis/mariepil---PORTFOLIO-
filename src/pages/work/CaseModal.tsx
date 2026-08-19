import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { EmptySlot } from '../../components/EmptySlot';
import type { Project } from '../../data/projects';
import { useDismissable } from '../../hooks/useDismissable';
import ui from '../../styles/ui.module.css';
import styles from './CaseModal.module.css';

interface CaseModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseModal({ project, onClose }: CaseModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The sheet, not the overlay, is the trap: the backdrop button behind it
  // closes on click and should not be a Tab stop.
  useDismissable(project !== null, onClose, sheetRef);

  useEffect(() => {
    if (project) closeRef.current?.focus();
  }, [project]);

  if (!project) return null;

  // Portalled to <body> — see the note in Lightbox.tsx.
  return createPortal(
    <div className={styles.overlay}>
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close" />

      <div
        ref={sheetRef}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
      >
        <div className={styles.header}>
          <span className={styles.meta}>{project.meta}</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close case study"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div id="case-modal-title" className={styles.name}>
            {project.name}
          </div>
          <p className={styles.blurb}>{project.blurb}</p>

          <div className={`${styles.shot} ${project.video ? styles.shotVideo : ''}`}>
            {project.video ? (
              // preload="metadata" so opening the case study costs a few KB of
              // headers, not the whole walkthrough.
              //
              // TODO(a11y): this clip has narration and no captions, which
              // locks out deaf and hard-of-hearing visitors and anyone
              // watching muted. Needs a WebVTT transcript added as
              // <track kind="captions" srcLang="en" src="/captions.vtt" default />,
              // after which jsx-a11y/media-has-caption goes back to error.
              <video
                className={styles.shotPlayer}
                src={project.video}
                poster={project.cover}
                controls
                playsInline
                preload="metadata"
              />
            ) : project.cover ? (
              <img
                className={styles.shotImg}
                src={project.cover}
                alt={`${project.name} screenshots`}
              />
            ) : (
              <EmptySlot label={`${project.name} screenshots`} />
            )}
          </div>

          <div className={styles.label}>Problem</div>
          <p className={styles.problem}>{project.problem}</p>

          <div className={styles.label}>Process</div>
          <ol className={styles.process}>
            {project.process.map((step, index) => (
              <li key={step} className={styles.step}>
                <span className={styles.stepNum}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.stepLabel}>{step}</span>
              </li>
            ))}
          </ol>

          <div className={styles.label}>Tools used</div>
          <div className={styles.tools}>
            {project.toolList.map((tool) => (
              <span key={tool} className={`${ui.chip} ${ui.chipLg}`}>
                <span className={ui.chipDot} aria-hidden="true" />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
