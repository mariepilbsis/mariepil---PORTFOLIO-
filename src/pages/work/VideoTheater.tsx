import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon, CollapseIcon, ExpandIcon } from '../../components/Icons';
import type { Project } from '../../data/projects';
import { useDismissable } from '../../hooks/useDismissable';
import ui from '../../styles/ui.module.css';
import styles from './VideoTheater.module.css';

interface VideoTheaterProps {
  project: Project;
  onClose: () => void;
}

/**
 * The walkthrough at full size with the case study beside it. The 620px case
 * sheet shrank the clip to a strip barely wider than a phone, which is a poor
 * way to read a dashboard UI — here the footage takes the whole viewport minus
 * one column, and the column keeps the problem, process and tools in view
 * while it plays, so nobody has to close the video to remember what they are
 * looking at.
 *
 * Opening the case study is the whole gesture: the clip starts on its own and
 * the browser's own fullscreen is asked for at the same time. That request is
 * made on the whole theater rather than on the <video>, so the description
 * column comes along instead of being replaced by the browser's black player
 * shell — and it is only ever a request, so a browser that turns it down
 * leaves the overlay filling the viewport, which is the same picture minus the
 * address bar.
 */
export function VideoTheater({ project, onClose }: VideoTheaterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isFull, setIsFull] = useState(false);

  useDismissable(true, onClose, rootRef);

  useEffect(() => {
    closeRef.current?.focus();

    // Both of these ride on the click that opened the case study. A browser
    // that refuses the unmuted autoplay leaves the poster and the controls
    // sitting there, which is a fine place to land; one that refuses
    // fullscreen leaves the overlay covering the viewport.
    videoRef.current?.play().catch(() => {});
    void rootRef.current?.requestFullscreen().catch(() => {});
  }, []);

  /** Escape leaves fullscreen before it reaches the dismiss handler, and the
      user can also leave through the browser's own affordance — so the button
      follows the document rather than its own state. */
  useEffect(() => {
    const sync = () => setIsFull(document.fullscreenElement !== null);
    document.addEventListener('fullscreenchange', sync);
    return () => {
      document.removeEventListener('fullscreenchange', sync);
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    };
  }, []);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else {
      void rootRef.current?.requestFullscreen().catch(() => {});
    }
  }, []);

  // Portalled to <body> — see the note in Lightbox.tsx.
  return createPortal(
    <div
      ref={rootRef}
      className={styles.theater}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} walkthrough`}
    >
      <div className={styles.stage}>
        {/* TODO(a11y): this clip has narration and no captions, which locks
            out deaf and hard-of-hearing visitors and anyone watching muted.
            Needs a WebVTT transcript added as
            <track kind="captions" srcLang="en" src="/captions.vtt" default />,
            after which jsx-a11y/media-has-caption goes back to error. The
            warning is left standing rather than suppressed. */}
        <video
          ref={videoRef}
          className={styles.video}
          src={project.video}
          poster={project.cover}
          controls
          playsInline
          preload="auto"
        />

        <div className={styles.chrome}>
          <button
            type="button"
            className={`${ui.iconBtn} ${styles.chromeBtn}`}
            onClick={toggleFull}
            aria-label={isFull ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFull ? <CollapseIcon /> : <ExpandIcon />}
          </button>
          <button
            ref={closeRef}
            type="button"
            className={`${ui.iconBtn} ${styles.chromeBtn}`}
            onClick={onClose}
            aria-label="Close walkthrough"
          >
            <CloseIcon size={17} />
          </button>
        </div>
      </div>

      <aside className={styles.aside}>
        <div className={styles.meta}>{project.meta}</div>
        <h2 className={styles.name}>{project.name}</h2>
        <p className={styles.blurb}>{project.blurb}</p>

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
            <span key={tool} className={ui.chip}>
              <span className={ui.chipDot} aria-hidden="true" />
              {tool}
            </span>
          ))}
        </div>
      </aside>
    </div>,
    document.body,
  );
}
