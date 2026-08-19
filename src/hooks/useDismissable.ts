import { useEffect, type RefObject } from 'react';

/** Everything that can hold focus inside an overlay, in document order. */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Overlay plumbing shared by the case modal and the pubmat lightbox: escape to
 * close, a body scroll lock, focus restored to whatever opened it, and — when
 * given a container — a focus trap.
 *
 * The trap matters because both overlays cover the page rather than replace it.
 * Without it, tabbing walks straight out of the dialog and into the nav and
 * cards still sitting behind the backdrop, which a sighted mouse user never
 * sees but a keyboard or screen-reader user lands in with no way to tell.
 */
export function useDismissable(
  isOpen: boolean,
  onDismiss: () => void,
  containerRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!isOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss();
        return;
      }

      if (event.key !== 'Tab') return;

      const container = containerRef?.current;
      if (!container) return;

      const targets = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (targets.length === 0) {
        // Nothing to land on — keep focus on the container rather than letting
        // it escape to the page underneath.
        event.preventDefault();
        container.focus();
        return;
      }

      const first = targets[0];
      const last = targets[targets.length - 1];
      const active = document.activeElement;

      // Wrap at both ends, and pull focus back in if it has drifted outside.
      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !container.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [isOpen, onDismiss, containerRef]);
}
