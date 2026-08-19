import { useCallback, useEffect, useRef, useState, type MouseEvent, type UIEvent } from 'react';
import { createPortal } from 'react-dom';

import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '../../components/Icons';
import type { PubmatEvent } from '../../data/pubmats';
import { useDismissable } from '../../hooks/useDismissable';
import styles from './Lightbox.module.css';

interface LightboxProps {
  event: PubmatEvent | null;
  onClose: () => void;
}

/**
 * The inside of a folder: the event's pieces stacked vertically in a
 * scroll-snapped column, with a crimson progress rail underneath. A wheel, a
 * touch flick, the arrow keys and the buttons all move the same track, so
 * paging through a folder is the same gesture as scrolling the page.
 */
export function Lightbox({ event, onClose }: LightboxProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  useDismissable(event !== null, onClose);

  // Only pieces with artwork are pageable — a pending slot has nothing to show
  // at full size.
  const shot = event?.pieces.filter((piece) => piece.img !== null) ?? [];
  const total = shot.length;

  /** Back to the first piece whenever a different folder opens. */
  useEffect(() => {
    setAt(0);
    trackRef.current?.scrollTo({ top: 0 });
    // A lone piece never scrolls, so its rail is filled rather than empty.
    if (barRef.current) barRef.current.style.width = total < 2 ? '100%' : '0%';
  }, [event, total]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || total === 0) return;

      const next = (index + total) % total;
      track.scrollTo({ top: next * track.clientHeight, behavior: 'smooth' });
    },
    [total],
  );

  /**
   * Scroll position is the source of truth: it drives the progress rail through
   * the ref every frame, and only commits to state when the slide changes.
   */
  const onScroll = (scrollEvent: UIEvent<HTMLDivElement>) => {
    const track = scrollEvent.currentTarget;
    const span = track.scrollHeight - track.clientHeight;
    const progress = span > 0 ? track.scrollTop / span : 0;

    if (barRef.current) {
      barRef.current.style.width = `${total < 2 ? 100 : progress * 100}%`;
    }

    const index = Math.round(track.scrollTop / track.clientHeight);
    setAt((current) => (current === index ? current : index));
  };

  useEffect(() => {
    if (total < 2) return;

    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'ArrowDown' || keyEvent.key === 'PageDown') goTo(at + 1);
      if (keyEvent.key === 'ArrowUp' || keyEvent.key === 'PageUp') goTo(at - 1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [at, goTo, total]);

  if (!event || total === 0) return null;

  const piece = shot[Math.min(at, total - 1)];

  /** Clicking the matting around a piece closes, the way a backdrop would. */
  const onSlideClick = (clickEvent: MouseEvent<HTMLDivElement>) => {
    if (clickEvent.target === clickEvent.currentTarget) onClose();
  };

  // Portalled to <body>: the page wrapper animates transform, which creates a
  // stacking context the overlay's z-index could not escape — the fixed nav
  // would paint on top of it.
  return createPortal(
    <div className={styles.overlay}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <CloseIcon />
      </button>

      <div
        ref={trackRef}
        className={`hide-sb ${styles.track}`}
        onScroll={onScroll}
        role="group"
        aria-label={`${event.title} — ${total} pieces`}
      >
        {shot.map((slide) => (
          <div key={slide.label} className={styles.slide} onClick={onSlideClick}>
            <img className={styles.image} src={slide.img ?? ''} alt={slide.label} />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => goTo(at - 1)}
            aria-label="Previous piece"
          >
            <ChevronUpIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => goTo(at + 1)}
            aria-label="Next piece"
          >
            <ChevronDownIcon />
          </button>
        </>
      )}

      <div className={styles.foot}>
        <div className={styles.caption}>
          <span className={styles.captionTitle}>{event.title}</span>
          <span className={styles.captionPiece}>{piece.label}</span>
          <span className={styles.captionYear}>{event.year}</span>
          {total > 1 && (
            <span className={styles.counter}>
              {at + 1} / {total}
            </span>
          )}
        </div>

        {total > 1 && (
          <div className={styles.dots} role="tablist" aria-label="Pieces">
            {shot.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                role="tab"
                aria-selected={index === at}
                aria-label={slide.label}
                className={`${styles.dot} ${index === at ? styles.dotOn : ''}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div ref={barRef} className={styles.progressBar} />
      </div>
    </div>,
    document.body,
  );
}
