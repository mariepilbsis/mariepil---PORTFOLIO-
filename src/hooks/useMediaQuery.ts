import { useCallback, useSyncExternalStore } from 'react';

/**
 * Tracks a media query. Used where a layout change needs different markup
 * rather than different CSS — the work reel, which swaps its scroll-driven
 * horizontal stage for a plain vertical stack on narrow screens, and the
 * constellation, which drops its pointer parallax under reduced motion.
 *
 * useSyncExternalStore rather than useState + useEffect: matchMedia is exactly
 * the external store it exists for, and subscribing this way avoids the render
 * pass with a stale value that the effect version paid on every mount.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // No server render here, but useSyncExternalStore requires the third argument.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
