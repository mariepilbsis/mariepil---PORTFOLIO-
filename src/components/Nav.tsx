import { NavLink, useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '../data/navigation';
import { SITE } from '../data/site';
import { useTheme } from '../theme/theme-context';
import { MoonIcon, SunIcon } from './Icons';
import ui from '../styles/ui.module.css';
import styles from './Nav.module.css';

export function Nav() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.wrap}>
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
            aria-label="Toggle light and dark theme"
            title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
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
