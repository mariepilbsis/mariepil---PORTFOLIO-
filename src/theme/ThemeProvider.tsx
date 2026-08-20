import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  readInitialTheme,
  readStoredTheme,
  readSystemTheme,
  THEME_STORAGE_KEY,
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from './theme-context';

/** Mobile browser chrome is painted from <meta name="theme-color">. */
const THEME_COLOR: Record<Theme, string> = {
  dark: '#0c0908',
  light: '#f4efec',
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  /**
   * Nobody has touched the toggle yet, so the OS still decides. Using the
   * toggle ends this for good — see the persist effect below.
   */
  const [followSystem, setFollowSystem] = useState(() => readStoredTheme() === null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  useEffect(() => {
    if (!followSystem) return;

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const sync = () => setTheme(readSystemTheme());
    mql.addEventListener('change', sync);

    return () => mql.removeEventListener('change', sync);
  }, [followSystem]);

  /*
   * Only an explicit choice is stored. The previous version wrote on mount,
   * which meant a first visit silently froze whatever the OS happened to say
   * at that moment — a visitor on a light desktop who never opened the toggle
   * was pinned to light, and their evening switch to dark was ignored.
   */
  useEffect(() => {
    if (followSystem) return;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* Private mode or blocked storage — the theme just won't persist. */
    }
  }, [theme, followSystem]);

  const toggleTheme = useCallback(() => {
    setFollowSystem(false);
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
