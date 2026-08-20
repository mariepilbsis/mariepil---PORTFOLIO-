import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '../data/navigation';
import { SITE } from '../data/site';
import { useTheme } from '../theme/theme-context';
import { MoonIcon, SunIcon } from './Icons';
import ui from '../styles/ui.module.css';
import styles from './Nav.module.css';

/** Clearance between the bottom of the nav pill and the start of page content. */
const NAV_GAP = 14;

export function Nav() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const wrapRef = useRef<HTMLElement>(null);

  /**
   * The pill wraps to two or three rows on narrow screens, so the spacer that
   * holds content clear of the fixed nav has to track its real height rather
   * than assume the desktop 92px.
   */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const apply = () => {
      document.documentElement.style.setProperty('--nav-h', `${el.offsetHeight + NAV_GAP}px`);
    };

    const observer = new ResizeObserver(apply);
    observer.observe(el);
    apply();

    return () => observer.disconnect();
  }, []);

  /*
   * Names the destination, not the control: an icon-only button whose name
   * never changes leaves a screen reader with no way to tell which theme is
   * on. Same string in the tooltip, so pointer and assistive users read the
   * same promise.
   */
  const nextTheme = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  return (
    <header ref={wrapRef} className={styles.wrap}>
      <div className={styles.pill}>
        <button type="button" className={styles.brand} onClick={() => navigate('/')}>
          <span className={styles.avatar}>{SITE.initials}</span>
          <span className={styles.brandName}>{SITE.name}</span>
        </button>

        <nav className={styles.links} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              {item.label}
              <span className={styles.underline} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={nextTheme}
            title={nextTheme}
          >
            <span
              className={styles.themeIcon}
              style={{ opacity: theme === 'light' ? 0 : 1 }}
              aria-hidden="true"
            >
              <SunIcon />
            </span>
            <span
              className={styles.themeIcon}
              style={{ opacity: theme === 'light' ? 1 : 0 }}
              aria-hidden="true"
            >
              <MoonIcon />
            </span>
          </button>

          <button
            type="button"
            className={`${ui.btn} ${ui.primary} ${ui.md}`}
            onClick={() => navigate('/contact')}
          >
            Let&rsquo;s talk
          </button>
        </div>
      </div>
    </header>
  );
}
