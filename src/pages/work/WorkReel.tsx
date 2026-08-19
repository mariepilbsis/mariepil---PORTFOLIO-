import { useEffect, useRef, useState, type UIEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmptySlot } from '../../components/EmptySlot';
import { PROJECTS, type Project } from '../../data/projects';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ui from '../../styles/ui.module.css';
import styles from './WorkReel.module.css';

interface WorkReelProps {
  onOpenCase: (index: number) => void;
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

        {/* Named for what the click actually does: a project with a
            walkthrough opens into the player, not into a reading sheet. */}
        <button
          type="button"
          className={`${ui.btn} ${ui.outline} ${ui.sm} ${styles.caseBtn}`}
          onClick={() => onOpenCase(index)}
        >
          {project.video ? 'Play walkthrough ↗' : 'Case study ↗'}
        </button>
      </div>

      <div className={styles.shot}>
        {project.cover ? (
          // Thumbnail, lazily — the card is small and sits below the fold.
          <picture>
            <source srcSet={project.coverThumb} type="image/webp" />
            <img
              className={styles.shotImg}
              src={project.coverThumbJpg ?? project.cover}
              alt={`${project.name} screenshot`}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ) : (
          <EmptySlot label={`${project.name} cover`} />
        )}
      </div>
    </>
  );
}

/** The reel closes the page now that the gallery runs above it. */
function EndPanel() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.endLabel}>End of reel</div>
      <p className={styles.endCopy}>Pubmats up top, systems here — that is the full shelf.</p>
      <button
        type="button"
        className={`${ui.btn} ${ui.primary} ${ui.lg} ${styles.endBtn}`}
        onClick={() => navigate('/contact')}
      >
        Start a project ↗
      </button>
    </>
  );
}

export function WorkReel({ onOpenCase }: WorkReelProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isNarrow = useMediaQuery('(max-width: 900px)');
  const [hasTravel, setHasTravel] = useState(true);

  /**
   * The runway is what the reader scrolls through to drive the track sideways,
   * so it has to be as tall as the sideways distance actually is — not a fixed
   * 280vh. With two projects on a 1440px screen the panels (1240px) already fit
   * the stage, so there is nothing to travel, and a hardcoded runway meant
   * scrolling three screen-heights past a stage that never moved.
   */
  useEffect(() => {
    if (isNarrow) return;

    const track = trackRef.current;
    const stage = stageRef.current;
    const scroller = scrollerRef.current;
    if (!track || !stage || !scroller) return;

    const runway = scroller.firstElementChild as HTMLElement | null;
    if (!runway) return;

    const measure = () => {
      const travel = Math.max(0, track.scrollWidth - stage.clientWidth);
      runway.style.height = `${scroller.clientHeight + travel}px`;
      setHasTravel(travel > 0);

      if (travel === 0) {
        track.style.transform = 'translate3d(0,0,0)';
        if (barRef.current) barRef.current.style.width = '0%';
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(stage);
    measure();

    return () => observer.disconnect();
  }, [isNarrow]);

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
      <div className="eyebrow">02 — Systems &amp; Projects</div>
      <h2 className={styles.title}>
        My <span className={styles.titleAccent}>Work</span>
      </h2>
    </div>
  );

  // Under 900px the sticky horizontal stage becomes a plain vertical stack.
  if (isNarrow) {
    return (
      <section id="systems" className={styles.stack}>
        {header}
        <div className={styles.stackList}>
          {PROJECTS.map((project, index) => (
            <article key={`${project.num}-${project.name}`} className={styles.stackCard}>
              <ProjectCard project={project} index={index} onOpenCase={onOpenCase} />
            </article>
          ))}
          <article className={`${styles.stackCard} ${styles.stackEnd}`}>
            <EndPanel />
          </article>
        </div>
      </section>
    );
  }

  return (
    <div
      id="systems"
      ref={scrollerRef}
      className={`hide-sb ${styles.scroller}`}
      onScroll={onScroll}
    >
      <div className={styles.runway}>
        <div className={styles.sticky}>
          {header}

          <div ref={stageRef} className={styles.stage}>
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
                <EndPanel />
              </div>
            </div>

            {/* Both of these promise sideways motion, so neither belongs on a
                stage that already fits. */}
            {hasTravel && (
              <>
                <div className={styles.progress} aria-hidden="true">
                  <div ref={barRef} className={styles.progressBar} />
                </div>
                <div className={styles.scrollHint} aria-hidden="true">
                  Scroll<span className={styles.scrollArrow}>→</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
