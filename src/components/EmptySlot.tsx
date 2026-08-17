import styles from './EmptySlot.module.css';

/**
 * Graceful empty state for artwork the client has not supplied yet — the
 * case-study screenshots and the nine pubmats still marked `img: null`.
 * Replaces the prototype's drag-and-drop `image-slot` element.
 */
export function EmptySlot({ label }: { label: string }) {
  return (
    <div className={styles.slot}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2" />
        <circle cx="8.6" cy="10" r="1.6" />
        <path d="M3.4 16.6l4.8-4.2 4 3.4 3.2-2.6 5.2 4.4" />
      </svg>
      <span className={styles.label}>{label}</span>
      <span className={styles.note}>artwork to follow</span>
    </div>
  );
}
