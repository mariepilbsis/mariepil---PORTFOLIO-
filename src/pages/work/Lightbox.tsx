import type { Pubmat } from '../../data/pubmats';
import { useDismissable } from '../../hooks/useDismissable';
import styles from './Lightbox.module.css';

interface LightboxProps {
  pubmat: Pubmat | null;
  onClose: () => void;
}

export function Lightbox({ pubmat, onClose }: LightboxProps) {
  useDismissable(pubmat !== null, onClose);

  if (!pubmat?.img) return null;

  const caption = `${pubmat.title} · ${pubmat.year}`;

  return (
    <div className={styles.overlay}>
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close" />
      <img className={styles.image} src={pubmat.img} alt={caption} />
      <div className={styles.caption}>{caption}</div>
    </div>
  );
}
