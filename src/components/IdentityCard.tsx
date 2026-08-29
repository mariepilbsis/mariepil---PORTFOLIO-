import { useCallback, useEffect, useRef, useState } from 'react';

import portrait from '../assets/portrait.webp';
import { IDENTITY_ROWS, PROFILE_MEDIA } from '../data/about';
import { SITE } from '../data/site';
import { CloseIcon, PlayIcon } from './Icons';
import styles from './IdentityCard.module.css';

/** Portrait + data rows. Anchors the home hero and reappears nowhere else. */
export function IdentityCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  /** The intro is up — on the screen, or in the frame if fullscreen was refused. */
  const [active, setActive] = useState(false);

  const hasVideo = PROFILE_MEDIA.video !== '';

  /** Back to the photo — and back to the top of the clip, not where it stopped. */
  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setActive(false);
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;

    setActive(true);
    // Both of these ride the click that asked for them: sound because the click
    // is the gesture that grants it, the screen for the same reason. A browser
    // that turns either down leaves the clip running in the card, which is why
    // the frame below it still has a crop worth looking at.
    video.play().catch(() => {});
    enterFullscreen(video);
  };

  /* Leaving fullscreen — Escape, the player's own button, the phone's Done — is
     how the intro gets closed, so the card follows the screen back to the
     photo rather than keeping its own idea of what is playing. */
  useEffect(() => {
    if (!active) return;

    const video = videoRef.current;
    if (!video) return;

    const onExit = () => {
      if (!document.fullscreenElement) stop();
    };

    document.addEventListener('fullscreenchange', onExit);
    // iPhone Safari runs its own fullscreen player and reports the way out on
    // the element rather than through the document.
    video.addEventListener('webkitendfullscreen', stop);

    return () => {
      document.removeEventListener('fullscreenchange', onExit);
      video.removeEventListener('webkitendfullscreen', stop);
    };
  }, [active, stop]);

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
        <img className={styles.portrait} src={portrait} alt={SITE.name} width="400" height="460" />

        {/* The photo is what the card rests on and the intro is what it does.
            Nothing runs on hover: this is a spoken minute and three quarters,
            and sound nobody asked for is the one thing a hero must not do. */}
        {hasVideo && (
          <>
            {/* TODO(a11y): the intro is narrated and has no captions, which
                locks out deaf and hard-of-hearing visitors and anyone watching
                muted. Needs a WebVTT transcript added as
                <track kind="captions" srcLang="en" src="/intro.vtt" default />,
                after which jsx-a11y/media-has-caption goes back to error. The
                warning is left standing rather than suppressed. */}
            <video
              ref={videoRef}
              className={`${styles.video} ${active ? styles.videoOn : ''}`}
              src={PROFILE_MEDIA.video}
              poster={portrait}
              controls={active}
              controlsList="nodownload"
              playsInline
              preload="metadata"
              onEnded={stop}
            />

            {active ? (
              /* Only ever reachable on the fallback path: when fullscreen is
                 granted the screen covers this, and coming back out of it has
                 already put the photo up. Top-right, clear of the control bar
                 along the bottom edge. */
              <button
                type="button"
                className={styles.closeVideo}
                aria-label="Close the intro and show the photo"
                onClick={stop}
              >
                <CloseIcon size={17} />
              </button>
            ) : (
              <button
                type="button"
                className={styles.playVideo}
                aria-label={`Play ${SITE.name}'s intro video full screen`}
                onClick={play}
              >
                <PlayIcon size={22} />
              </button>
            )}
          </>
        )}
      </div>

      <dl className={styles.rows}>
        {IDENTITY_ROWS.map((row) => (
          <div key={row.key} className={styles.row}>
            <dt className={styles.rowKey}>{row.key}</dt>
            <dd className={styles.rowValue}>{breakOnSeparators(row.value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Asks for the whole screen, and settles for the card if it is turned down.
 *
 * iPhone Safari will not put an arbitrary element in fullscreen, but it will
 * put a <video> there through a method of its own. That is the second try
 * rather than the first, since everything else implements the standard one and
 * reports back through the document.
 */
function enterFullscreen(video: HTMLVideoElement) {
  if (video.requestFullscreen) {
    void video.requestFullscreen().catch(() => {});
    return;
  }

  const iosFullscreen = (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void })
    .webkitEnterFullscreen;
  iosFullscreen?.call(video);
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
    .map((part) => part.replace(/ /g, '\u00a0'))
    .join('\u00a0· ');
}
