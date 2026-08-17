import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PROJECTS } from '../../data/projects';
import { PUBMATS } from '../../data/pubmats';
import { CaseModal } from './CaseModal';
import { Lightbox } from './Lightbox';
import { PubmatGallery } from './PubmatGallery';
import { WorkReel } from './WorkReel';

export function Work() {
  const [openCase, setOpenCase] = useState(-1);
  const [lightbox, setLightbox] = useState(-1);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  const jumpToPubmats = useCallback(() => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /** Arriving at /work#pubmats lands directly on the gallery. */
  useEffect(() => {
    if (hash !== '#pubmats') return;
    galleryRef.current?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <div className="pg">
      <WorkReel onOpenCase={setOpenCase} onJumpToPubmats={jumpToPubmats} />

      <div ref={galleryRef}>
        <PubmatGallery onOpen={setLightbox} />
      </div>

      <CaseModal
        project={openCase >= 0 ? PROJECTS[openCase] : null}
        onClose={() => setOpenCase(-1)}
      />
      <Lightbox
        pubmat={lightbox >= 0 ? PUBMATS[lightbox] : null}
        onClose={() => setLightbox(-1)}
      />
    </div>
  );
}
