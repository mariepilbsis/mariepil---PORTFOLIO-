import { useEffect, useRef, type UIEvent } from 'react';

import { EmptySlot } from '../../components/EmptySlot';
import { PROJECTS, type Project } from '../../data/projects';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ui from '../../styles/ui.module.css';
import styles from './WorkReel.module.css';

interface WorkReelProps {
  onOpenCase: (index: number) => void;
  onJumpToPubmats: () => void;
}

function ProjectCard({
  project,
  index,
  onOpenCase,
}: {
  project: Project;
  index: number;
  onOpenCase: (index: number) => void;
}) {
  return (
    <>
      <div>
        <div className={styles.cardHead}>
          <div className={styles.index}>{project.num}</div>
          <div className={styles.identity}>
            <div className={styles.name}>{project.name}</div>
            <div className={styles.meta}>{project.meta}</div>
          </div>
        </div>

        <div className={styles.tools}>
          <div className={styles.toolsTitle}>Tools and features</div>
          <p className={styles.toolsBody}>{project.tools}</p>
        </div>

        <button
          type="button"
          className={`${ui.btn} ${ui.outline} ${ui.sm} ${styles.caseBtn}`}
          onClick={() => onOpenCase(index)}
        >
          Case study ↗
        </button>
      </div>

      <div className={styles.shot}>
        {project.cover ? (
          <img className={styles.shotImg} src={project.cover} alt={`${project.name} screenshot`} />
        ) : (
          <EmptySlot label={`${project.name} cover`} />
        )}
      </div>
    </>
  );
}

function EndPanel({ onJumpToPubmats }: { onJumpToPubmats: () => void }) {
  return (
    <>
      <div className={styles.endLabel}>End of reel</div>
      <p className={styles.endCopy}>The pubmats live in the gallery next door.</p>
      <button
        type="button"
        className={`${ui.btn} ${ui.primary} ${ui.lg} ${styles.endBtn}`}
        onClick={onJumpToPubmats}
      >
        Down to the pubmats ↓
      </button>
    </>
  );
}

export function WorkReel({ onOpenCase, onJumpToPubmats }: WorkReelProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isNarrow = useMediaQuery('(max-width: 900px)');

  /**
   * Vertical scroll inside the container drives a horizontal translate on the
   * track. Written straight to the refs — no state, no re-render per frame.
   */
  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const track = trackRef.current;
    if (!track?.parentElement) return;

    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    const travel = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);

    track.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
    if (barRef.current) barRef.current.style.width = `${p * 100}%`;
  };

  /** Reset the track whenever the layout mode flips. */
  useEffect(() => {
    if (trackRef.current) trackRef.current.style.transform = 'translate3d(0,0,0)';
    if (barRef.current) barRef.current.style.width = '0%';
  }, [isNarrow]);

  const header = (
    <div className={styles.header}>
      <div className="eyebrow">01 — Systems &amp; Projects</div>
      <h2 className={styles.title}>
        My <span className={styles.titleAccent}>Work</span>
      </h2>
    </div>
  );

  // Under 900px the sticky horizontal stage becomes a plain vertical stack.
  if (isNarrow) {
    return (
      <section className={styles.stack}>
        {header}
        <div className={styles.stackList}>
          {PROJECTS.map((project, index) => (
            <article key={`${project.num}-${project.name}`} className={styles.stackCard}>
              <ProjectCard project={project} index={index} onOpenCase={onOpenCase} />
            </article>
          ))}
          <article className={`${styles.stackCard} ${styles.stackEnd}`}>
            <EndPanel onJumpToPubmats={onJumpToPubmats} />
          </article>
        </div>
      </section>
    );
  }

  return (
    <div className={`hide-sb ${styles.scroller}`} onScroll={onScroll}>
      <div className={styles.runway}>
        <div className={styles.sticky}>
          {header}

          <div className={styles.stage}>
            <div ref={trackRef} className={styles.track}>
              {PROJECTS.map((project, index) => (
                <article
                  key={`${project.num}-${project.name}`}
                  className={`${styles.panel} ${index % 2 === 0 ? '' : styles.panelReverse}`}
                >
                  <ProjectCard project={project} index={index} onOpenCase={onOpenCase} />
                </article>
              ))}

              <div className={styles.endPanel}>
                <EndPanel onJumpToPubmats={onJumpToPubmats} />
              </div>
            </div>

            <div className={styles.progress} aria-hidden="true">
              <div ref={barRef} className={styles.progressBar} />
            </div>
            <div className={styles.scrollHint} aria-hidden="true">
              Scroll<span className={styles.scrollArrow}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
