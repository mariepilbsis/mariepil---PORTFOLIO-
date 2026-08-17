import { useEffect, useState } from 'react';

/**
 * Tracks a media query. Used where a layout change needs different markup
 * rather than different CSS — the work reel, which swaps its scroll-driven
 * horizontal stage for a plain vertical stack on narrow screens.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
