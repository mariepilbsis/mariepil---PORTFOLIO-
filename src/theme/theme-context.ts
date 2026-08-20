import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'gm-theme';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/**
 * The visitor's own choice, or null if they have never used the toggle. The
 * null case is meaningful: it is what lets the site keep following the OS.
 */
export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    /* Private mode or blocked storage — treat it as no choice made. */
    return null;
  }
}

export function readSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * The initial theme. index.html already resolved and applied this before first
 * paint, so read it back off <html> and only fall through to the stored value
 * or the OS preference if that attribute is missing.
 */
export function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';

  const applied = document.documentElement.getAttribute('data-theme');
  if (applied === 'light' || applied === 'dark') return applied;

  return readStoredTheme() ?? readSystemTheme();
}
