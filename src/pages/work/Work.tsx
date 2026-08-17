import { useEffect, useState } from 'react';
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
  const { hash } = useLocation();

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
