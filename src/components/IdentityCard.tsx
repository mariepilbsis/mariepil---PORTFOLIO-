import { useRef, useState } from 'react';

import portrait from '../assets/portrait.webp';
import { IDENTITY_ROWS, PROFILE_MEDIA } from '../data/about';
import { SITE } from '../data/site';
import { PauseIcon, PlayIcon } from './Icons';
import styles from './IdentityCard.module.css';

/** Portrait + data rows. Anchors the home hero and reappears nowhere else. */
export function IdentityCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const hasVideo = PROFILE_MEDIA.video !== '';

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>identity.card</span>
        <span className={styles.verified}>
          <span className={styles.verifiedDot} aria-hidden="true" />
          verified
        </span>
      </div>

      <div className={styles.portraitFrame}>
        <img className={styles.portrait} src={portrait} alt={SITE.name} width="400" height="352" />

        {/* Sits over the portrait and fades in on play, so the photo is what
            the card rests on and the video is what it does. */}
        {hasVideo && (
          <>
            <video
              ref={videoRef}
              className={`${styles.video} ${playing ? styles.videoOn : ''}`}
              src={PROFILE_MEDIA.video}
              poster={portrait}
              muted
              loop
              playsInline
              preload="metadata"
              onEnded={() => setPlaying(false)}
            />

            <button
              type="button"
              className={styles.mediaToggle}
              aria-label={playing ? 'Pause the intro video' : 'Play the intro video'}
              onClick={toggle}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          </>
        )}
      </div>

      <dl className={styles.rows}>
        {IDENTITY_ROWS.map((row) => (
          <div key={row.key} className={styles.row}>
            <dt className={styles.rowKey}>{row.key}</dt>
            <dd className={`${styles.rowValue} ${row.accent ? styles.rowAccent : ''}`}>
              {breakOnSeparators(row.value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Lets a middot-separated value break only between one part and the next.
 *
 * The card right-aligns these in a narrow column, so a long value wraps. Left
 * alone it broke at whatever space happened to fall near the edge and stranded
 * a bare word on its own line. Every space inside a part becomes non-breaking,
 * as does the one before each separator, which leaves exactly one break
 * opportunity per separator and keeps the middot on the line it follows.
 *
 * A value with no separator comes back unchanged.
 */
function breakOnSeparators(value: string): string {
  return value
    .split(' · ')
    .map((part) => part.replace(/ /g, ' '))
    .join(' · ');
}
