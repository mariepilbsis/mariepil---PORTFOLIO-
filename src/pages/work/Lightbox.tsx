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
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [at, setAt] = useState(0);

  useDismissable(event !== null, onClose, overlayRef);

  // Only pieces with artwork are pageable — a pending slot has nothing to show
  // at full size.
  const shot = event?.pieces.filter((piece) => piece.img !== null) ?? [];
  const total = shot.length;

  /**
   * Work keys this component by the open folder, so a different folder arrives
   * as a fresh mount with `at` already back at 0 — no reset-on-prop-change
   * effect, and no render pass showing the previous folder's slide number.
   */
  useEffect(() => {
    // Focus moves into the overlay so the arrow keys and Escape act on the
    // folder rather than on the gallery still sitting behind it.
    if (event) closeRef.current?.focus();
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
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${event.title} — ${total} ${total === 1 ? 'piece' : 'pieces'}`}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      <div ref={trackRef} className={`hide-sb ${styles.track}`} onScroll={onScroll}>
        {shot.map((slide, index) => (
          <div
            key={slide.label}
            className={styles.slide}
            onClick={onSlideClick}
            role="presentation"
          >
            {/* A folder can hold five full-size pieces. Only the one the folder
                opens on is worth fetching up front; the rest arrive as they
                scroll into the track. */}
            <img
              className={styles.image}
              src={slide.img ?? ''}
              alt={slide.label}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
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

        {/* Plain buttons, not a tablist: there are no tabpanels here, and a
            tablist role would have a screen reader announce an interface that
            does not exist. */}
        {total > 1 && (
          <div className={styles.dots} role="group" aria-label="Jump to piece">
            {shot.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                aria-current={index === at ? 'true' : undefined}
                aria-label={`${slide.label} (${index + 1} of ${total})`}
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
