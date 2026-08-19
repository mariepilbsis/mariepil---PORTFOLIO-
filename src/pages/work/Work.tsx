import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PROJECTS } from '../../data/projects';
import { usePageMeta } from '../../hooks/usePageMeta';
import { PUBMAT_EVENTS } from '../../data/pubmats';
import { CaseModal } from './CaseModal';
import { Lightbox } from './Lightbox';
import { PubmatGallery } from './PubmatGallery';
import { WorkReel } from './WorkReel';

export function Work() {
  const [openCase, setOpenCase] = useState(-1);
  const [lightbox, setLightbox] = useState(-1);
  const { hash } = useLocation();

  usePageMeta({
    title: 'Work & Pubmats',
    description:
      'Publication materials, brochures and brand marks designed for IS³ and client work, plus SmartStock — an AI inventory platform designed end to end, then built and deployed.',
  });

  /**
   * Stable identities. The overlays key their escape/scroll-lock/focus-trap
   * effect on the close handler, so a fresh arrow function on every render of
   * this page would tear that effect down and rebuild it mid-interaction —
   * yanking focus back out of the open overlay.
   */
  const closeCase = useCallback(() => setOpenCase(-1), []);
  const closeLightbox = useCallback(() => setLightbox(-1), []);

  /** Arriving at /work#pubmats or /work#systems lands on that section. */
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <div className="pg">
      {/* Pubmats lead — it is the deepest body of work — with the systems
          reel following as the second act. */}
      <PubmatGallery onOpen={setLightbox} />

      <WorkReel onOpenCase={setOpenCase} />

      <CaseModal project={openCase >= 0 ? PROJECTS[openCase] : null} onClose={closeCase} />
      {/* Keyed by folder so each one opens as a fresh mount — see Lightbox. */}
      <Lightbox
        key={lightbox}
        event={lightbox >= 0 ? PUBMAT_EVENTS[lightbox] : null}
        onClose={closeLightbox}
      />
    </div>
  );
}
