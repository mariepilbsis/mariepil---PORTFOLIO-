import { useEffect } from 'react';

/**
 * Escape-to-close plus a body scroll lock, shared by the case modal and the
 * pubmat lightbox. Also restores focus to whatever opened the overlay.
 */
export function useDismissable(isOpen: boolean, onDismiss: () => void): void {
  useEffect(() => {
    if (!isOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [isOpen, onDismiss]);
}
